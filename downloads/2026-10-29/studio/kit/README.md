# 웹 대시보드 실습 프로젝트

기록이 없는 빈 화면에서 시작합니다. YOLO나 ESP32의 실제 실행 결과를 연결하세요.

## 서버와 화면 실행

이 kit 폴더에서 터미널을 엽니다. 아래는 Windows PowerShell입니다.

```powershell
py -m venv .venv
.venv\Scripts\python -m pip install -r backend/requirements.txt
.venv\Scripts\python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8895
```

브라우저에서 http://127.0.0.1:8895 를 엽니다. /docs에서 요청 형식을 확인할 수 있습니다.
서버 종료는 터미널의 Ctrl+C입니다. runtime/events.sqlite3는 재시작 후에도 남습니다.

## React 소스 수정

배포 ZIP에는 생성된 web/app.js를 포함합니다. 원본은 frontend/src입니다.
소스를 수정하려면 Node.js가 필요합니다. 별도 터미널에서 다음을 실행합니다.

```powershell
cd frontend
npm ci
npm run dev
```

JSX를 저장한 뒤 브라우저를 새로고침합니다. build.mjs가 ../web/app.js를 다시 만듭니다.
서버는 첫 터미널에서 계속 실행합니다. 정적 GitHub Pages에는 이 수신 서버가 실행되지 않습니다.

## 시험

```powershell
.venv\Scripts\python -m unittest discover -s backend -v
```

## 실제 프로그램 연결

docs/api.md 계약으로 사건을 POST합니다. JSONL을 이미 기록하는 프로그램은
`py adapters/forward_jsonl.py 실제파일경로 --follow`로 전달할 수 있습니다.
YOLO나 로봇의 원래 필드와 계약이 다르면 의미를 확인해 어댑터에서 변환합니다.
이 전송기는 고장난 장치를 정상 값으로 꾸미거나 임의 기록을 만들지 않습니다.

## 직접 구현할 부분

실행 가능한 기준 프로젝트를 먼저 확인합니다. docs/challenges.md의 표시·필터·알림
기능을 직접 추가하고 tests와 실제 요청으로 검증하세요. 기준 코드를 그대로 제출하지 않습니다.

YOLO의 실제 프레임 사건 로그를 연결하려면 docs/yolo-bridge.md와 adapters/yolo_to_api.py를 사용합니다. 추적ID를 수치 평균으로 계산하지 않습니다.


## ESP32 실제 연동

[센서 연결 상세](docs/sensor-bridge.md)를 따라 서버·수집기·전송기를 각각 실행합니다. UI의 거리 기준은 장치 LED 설정과 별개입니다. frontend에서 npm test로 경계·null·혼합 장치를 시험합니다.
