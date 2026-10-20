"""10/22의 실제 프레임 로그에서 사건만 골라 전송합니다. 검출 프레임을 새 사람 수로 세지 않습니다."""
import argparse,json,time
from pathlib import Path
from urllib.error import HTTPError,URLError
from forward_jsonl import send

def convert(frame,session,device):
    for index,event in enumerate(frame.get('events',[])):
        kind=event['type']
        yield {'event_id':f'{session}:{frame["frame_index"]}:{index}',
               'device_id':device,'kind':kind,'value':None,
               'occurred_at':frame['observed_at'],
               'level':'warning' if kind in ('entered','crossed') else 'info'}

def main():
    p=argparse.ArgumentParser()
    p.add_argument('path',type=Path,help='10/22에서 실제 생성한 events.jsonl')
    p.add_argument('--session',required=True,help='같은 실행·재전송은 동일 세션 이름')
    p.add_argument('--device',default='yolo-camera')
    p.add_argument('--url',default='http://127.0.0.1:8895/api/events')
    p.add_argument('--follow',action='store_true')
    args=p.parse_args()
    with args.path.open(encoding='utf-8') as stream:
        while True:
            position=stream.tell();line=stream.readline()
            if not line:
                if not args.follow:break
                time.sleep(.25);continue
            if not line.endswith('\n') and args.follow:
                stream.seek(position);time.sleep(.25);continue
            frame=json.loads(line)
            # 같은 줄 일부만 성공했어도 재전송 ID가 같아 DB에 중복되지 않습니다.
            try:
                for event in convert(frame,args.session,args.device):
                    print(event['event_id'],send(args.url,event),flush=True)
            except HTTPError as error:
                if 400<=error.code<500:raise SystemExit(error.read().decode('utf-8'))
                stream.seek(position);time.sleep(2)
            except (URLError,OSError) as error:
                print('같은 사건 재시도',error,flush=True)
                stream.seek(position);time.sleep(2)

if __name__=='__main__':
    try:main()
    except KeyboardInterrupt:print('전송 종료')
