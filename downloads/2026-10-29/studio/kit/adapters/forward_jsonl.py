"""실제 프로그램이 기록한 표준 사건 JSONL을 API로 전송합니다. 임의 가짜 자료를 만들지 않습니다."""
import argparse,json,time
from pathlib import Path
from urllib.request import Request,urlopen
from urllib.error import URLError,HTTPError

def send(url,event):
    request=Request(url,data=json.dumps(event,ensure_ascii=False).encode('utf-8'),
                    headers={'Content-Type':'application/json'},method='POST')
    with urlopen(request,timeout=5) as response:
        return json.loads(response.read())

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('path',type=Path,help='실제 수집한 표준 사건 JSONL')
    parser.add_argument('--url',default='http://127.0.0.1:8895/api/events')
    parser.add_argument('--follow',action='store_true',help='새 줄을 기다림. Ctrl+C로 종료')
    args=parser.parse_args()
    with args.path.open(encoding='utf-8') as stream:
        while True:
            position=stream.tell();line=stream.readline()
            if not line:
                if not args.follow:break
                time.sleep(.25);continue
            if not line.endswith('\n') and args.follow:
                stream.seek(position);time.sleep(.25);continue
            try:
                event=json.loads(line);result=send(args.url,event)
                print('수신 확인',result,flush=True)
            except HTTPError as error:
                if 400 <= error.code < 500:
                    raise SystemExit('요청 형식을 고친 뒤 같은 사건 ID로 다시 보내세요: '+error.read().decode('utf-8'))
                stream.seek(position);time.sleep(2)
            except (URLError,OSError) as error:
                # 실패 줄을 건너뛰지 않고 같은 위치부터 재시도합니다.
                print('전송 실패, 같은 줄 재시도:',error,flush=True)
                stream.seek(position);time.sleep(2)
            except (ValueError,TypeError) as error:
                print('형식 오류로 중단:',error,flush=True);raise

if __name__=='__main__':
    try:main()
    except KeyboardInterrupt:print('전송 종료')
