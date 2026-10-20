# 내 영상 인식 프로그램
이 폴더를 VS Code로 열고 터미널 위치를 먼저 확인합니다. src는 코드, configs는 숫자 설정, docs는 안내, tests는 검증입니다. runtime은 실행 시 생성하는 개인 자료 폴더입니다.

## 준비와 실행
Windows 64bit/Python 3.12/CPU가 제작 기준입니다. 인터넷·설치 권한·웹캠 모델은 현장 확인 대상입니다. 가중치 최초 다운로드가 필요하며 계정·유료 API는 필요 없습니다.
```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
$env:YOLO_CONFIG_DIR="$PWD/runtime"
.\.venv\Scripts\python.exe prepare.py
New-Item -ItemType Directory -Force runtime/input
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```
자기 사진을 runtime/input/photo.jpg에, 사용 권한 있는 동영상을 runtime/input/clip.mp4에 넣습니다. 키트에는 원본 영상이나 가중치를 넣지 않습니다.
```powershell
.\.venv\Scripts\python.exe -m src.main --image --source runtime/input/photo.jpg --output runtime/results/photo1
.\.venv\Scripts\python.exe -m src.main --source runtime/input/clip.mp4 --output runtime/results/video1 --show
.\.venv\Scripts\python.exe -m src.main --source 0 --output runtime/results/webcam1 --show
```
창에 초점을 두고 q로 종료합니다. GUI를 못 쓰면 --show를 생략합니다. 웹캠이 없으면 영상으로 진행하고 웹캠 실행 여부는 미수행으로 기록합니다. --limit 30은 30프레임만 처리합니다. --config configs/my.json으로 복사한 설정을 선택합니다.

## 결과 확인
사진은 image.jpg와 터미널 검출 목록, 영상은 annotated.mp4·events.jsonl·metrics.json을 만듭니다. 같은 output 경로는 덮어쓰므로 실행마다 이름을 바꿉니다. 저장 영상은 소리가 없습니다. 카메라 FPS를 못 읽으면 저장 재생률만 25로 대체합니다. 실제 처리 속도는 metrics를 보세요.
추적 ID는 실제 사람의 영구 식별자가 아닙니다. 처음부터 구역 안이면 first_seen_inside, 밖→안이면 entered, 선의 확정 방향이 바뀌면 crossed입니다. 소실 뒤 같은 번호도 새 관찰로 처리할 수 있습니다.

## 시험과 실행 기록
상태 규칙 시험과 실제 모델 추론·웹캠 실행은 서로 다른 확인입니다. 자기 사진·영상으로 실행하고 입력·설정·처리속도·실패를 docs/experiments.md에 기록하세요. 웹캠이 없다면 실제 웹캠 성공으로 적지 않습니다.
