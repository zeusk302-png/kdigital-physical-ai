# 나의 웹캠 영상 인식 프로그램

kit 폴더를 VS Code로 열고 아래 명령을 PowerShell에 한 줄씩 입력합니다. Python 3.12 64비트와 최초 인터넷이 필요합니다. 설치 설명·오류 해결은 교안 V01부터 읽습니다.

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
$env:YOLO_CONFIG_DIR="$PWD/runtime"
.\.venv\Scripts\python.exe prepare.py
.\.venv\Scripts\python.exe -m examples.01_camera --source 0
.\.venv\Scripts\python.exe -m examples.02_snapshot --source 0
.\.venv\Scripts\python.exe -m examples.03_detect --source 0 --classes 0
.\.venv\Scripts\python.exe -m src.main --source 0 --show --output runtime/results/my01
```

각 프로그램을 Q로 종료한 뒤 다음 프로그램을 실행합니다. 카메라 앱·Zoom·Teams 등은 닫습니다. 내장 카메라가 열리면 --source 1을 확인하고, Windows 입력 문제는 --backend dshow를 비교합니다. 사진 저장 예제는 S, 종료는 Q입니다. 모델은 YOLO11n이며 GPU가 필수가 아닙니다.

## 영상 파일 경로

runtime/input/clip.mp4에 사용 권한 있는 영상을 두고 --source runtime/input/clip.mp4를 사용합니다. src.main에서 --show를 빼면 화면 없이 저장하며, --limit 120으로 처리 프레임을 제한할 수 있습니다. 웹캠 실행과 파일 실행은 구분해 기록합니다. 출력 폴더는 실행마다 새 이름을 사용합니다.

```powershell
.\.venv\Scripts\python.exe -m src.main --source runtime/input/clip.mp4 --limit 120 --output runtime/results/file01
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

## 파일 책임

- examples/: 카메라·사진 저장·검출의 단계별 주석 예제
- src/camera.py: 입력 열기·카메라 번호·백엔드
- detector.py / tracker.py: 모델 추론·추적 결과 변환
- zones.py / events.py: 좌표·이전 상태·사건
- drawing.py / main.py: 표시·저장·전체 실행
- configs/: 점수·대상·구역 설정
- docs/experiment.md: 실제 결과·실패·비교·자기 기능

runtime과 .venv, 가중치·개인 영상은 Git에 넣지 않습니다. src·examples·configs·의존성·tests·docs는 올립니다. GitHub Pages는 Python 웹캠 서버가 아니며 소개 페이지와 실행 프로그램은 구별합니다. YOLO·OpenCV는 공개 라이선스 조건을 따르며 상용 배포 단계에서는 사용하는 구성의 조건을 별도로 확인합니다.
