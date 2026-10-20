"""실제 USB 시리얼 한 줄을 검사해 대시보드가 읽는 JSONL로 저장합니다."""
import argparse,json,math,uuid
from pathlib import Path
from datetime import datetime,timezone

def parse_reading(line, device_id, session, now=None):
    """입력: 펌웨어 한 줄. 출력: 표준 Event. 잘못된 입력은 ValueError."""
    reading=json.loads(line)
    if not isinstance(reading,dict):raise ValueError('한 줄은 객체여야 합니다.')
    if set(reading)!={'seq','uptime_ms','kind','value','status'}:raise ValueError('필드가 다릅니다.')
    for key in ['seq','uptime_ms']:
        if type(reading[key]) is not int or reading[key]<0:raise ValueError('순번·가동시간 오류')
    kind=reading['kind'];value=reading['value'];status=reading['status']
    if kind not in {'distance_cm','accel_x_m_s2'}:raise ValueError('알 수 없는 측정 종류')
    if status not in {'normal','warning','fault'}:raise ValueError('상태 오류')
    if status=='fault':
        if value is not None:raise ValueError('fault 측정값은 null이어야 합니다.')
    else:
        if type(value) not in (int,float) or not math.isfinite(value):raise ValueError('유한한 숫자가 필요합니다.')
        if kind=='distance_cm' and not 2<=value<=400:raise ValueError('거리 범위 오류')
        if kind=='accel_x_m_s2' and abs(value)>25:raise ValueError('2G 설정 범위 확인')
    # 보드 millis는 벽시계가 아닙니다. PC가 실제 수신한 UTC 시각을 기록합니다.
    at=now or datetime.now(timezone.utc)
    if at.tzinfo is None:raise ValueError('시간대가 필요합니다.')
    return dict(event_id=f'{device_id}:{session}:{reading["seq"]}',device_id=device_id,
                kind=kind,value=value,occurred_at=at.isoformat(),
                level='info' if status=='normal' else 'warning')

def main():
    import serial  # 설치한 pyserial의 모듈 이름입니다.
    p=argparse.ArgumentParser();p.add_argument('--port',required=True)
    p.add_argument('--device',default='team01-xiao');p.add_argument('--output',default='runtime/readings.jsonl')
    args=p.parse_args();target=Path(args.output);target.parent.mkdir(parents=True,exist_ok=True)
    session=uuid.uuid4().hex[:12];last_sequence=None
    # 시리얼 모니터를 닫은 뒤 실행합니다. 두 앱이 같은 COM 포트를 동시에 열지 않습니다.
    with serial.Serial(args.port,115200,timeout=1) as port,target.open('a',encoding='utf-8') as output:
        print('실제 시리얼 수집 시작. 종료 Ctrl+C.')
        while True:
            raw=port.readline(2049)
            if not raw:continue
            if len(raw)>2048 or not raw.endswith(b'\n'):
                # 너무 긴 줄·잘린 줄의 나머지를 버려 다음 프레임 경계에서 다시 읽습니다.
                if not raw.endswith(b'\n'):port.read_until(b'\n',65536)
                print('잘린 줄 제외');continue
            try:
                line=raw.decode('utf-8').strip();reading=json.loads(line)
                seq=reading.get('seq') if isinstance(reading,dict) else None
                if type(seq) is not int:raise ValueError('순번 오류')
                # 보드 재부팅 또는 순번 초기화 시 별도 세션을 부여해 ID 충돌을 막습니다.
                if last_sequence is not None and seq<=last_sequence:session=uuid.uuid4().hex[:12]
                event=parse_reading(line,args.device,session)
                last_sequence=seq
                output.write(json.dumps(event,ensure_ascii=False)+'\n');output.flush()
                print(event,flush=True)
            except (UnicodeError,ValueError,TypeError,AttributeError) as error:
                print('형식 오류 줄 제외:',error,flush=True)

if __name__=='__main__':
    try:main()
    except KeyboardInterrupt:print('수집 종료')
