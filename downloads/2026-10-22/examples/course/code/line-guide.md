# 완성 코드 전체와 모든 줄의 뜻

실행 위치는 이 날짜의 `examples/course` 폴더입니다. 파일을 저장하는 일과 Python으로 실행하는 일을 구분합니다. 새 함수를 처음부터 설계하기보다 입력·처리·출력과 한 값 수정을 먼저 확인합니다.

코드의 작은 수정을 할 때는 code 파일을 work 폴더에 같은 이름으로 복사하고 `python -X utf8 work/파일이름.py`로 실행합니다. data·code·work의 상대 배치를 유지하면 제공 경로가 이어집니다. 설정 파일을 바꾸는 활동은 해당 work/settings.json만 수정합니다.

## 01_inspect.py

조건: Python 3와 OpenCV가 설치된 PC. 카메라나 GUI 창을 열지 않는 파일 입력 예제입니다.

실행: `python -X utf8 code/01_inspect.py`

```python
import cv2
from pathlib import Path
root = Path(__file__).resolve().parent.parent
source = root / "data" / "parts.png"
image = cv2.imread(str(source))
if image is None:
    raise ValueError("이미지를 읽지 못했습니다: " + str(source))
print("shape:", image.shape)
print("BGR:", image[40, 30].tolist())
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
saved = cv2.imwrite(str(root / "work" / "gray.png"), gray)
if not saved:
    raise OSError("출력 파일을 저장하지 못했습니다")
print("gray:", gray.shape)
```

| 줄 | 코드의 뜻 |

|---:|---|

| 1 | OpenCV 라이브러리를 cv2 이름으로 가져옵니다. |

| 2 | 파일 경로를 다루는 Path 도구를 가져옵니다. |

| 3 | 코드 파일 위치에서 두 단계 위 course 폴더를 찾습니다. |

| 4 | 입력 파일 parts.png의 전체 경로를 만듭니다. |

| 5 | 문자열 경로에서 컬러 이미지를 읽습니다. |

| 6 | 읽기 실패로 값이 None인지 검사합니다. |

| 7 | 실패하면 파일 경로를 포함한 오류로 멈춥니다. |

| 8 | 높이·너비·채널 수를 출력합니다. |

| 9 | y=40, x=30의 BGR 값을 일반 목록으로 출력합니다. |

| 10 | BGR 세 채널을 회색조 한 채널로 바꿉니다. |

| 11 | work에 회색조 이미지를 저장하고 성공 여부를 받습니다. |

| 12 | 저장 실패 여부를 검사합니다. |

| 13 | 실패하면 폴더나 쓰기 권한을 확인할 오류를 냅니다. |

| 14 | 회색조의 높이와 너비를 출력합니다. |

예상 또는 실제 확인 결과:

```text
shape: (240, 320, 3)
BGR: [220, 220, 220]
gray: (240, 320)
```

한 값 바꾸기: parts.png를 empty.png로 바꾸면 크기는 같고 지정 픽셀 값은 [0, 0, 0]입니다.

오류 해결: ModuleNotFoundError이면 설치 환경을 확인합니다. 읽기 오류면 압축을 풀고 data 폴더와 파일 철자를 확인합니다.

## 02_count.py

조건: Python 3와 OpenCV가 설치된 PC. 카메라나 GUI 창을 열지 않는 파일 입력 예제입니다.

실행: `python -X utf8 code/02_count.py`

```python
import cv2
import json
from pathlib import Path
root = Path(__file__).resolve().parent.parent
config = json.loads((root / "work" / "settings.json").read_text(encoding="utf-8"))
source = root / "data" / config["image"]
image = cv2.imread(str(source))
if image is None:
    raise ValueError("입력 이미지를 확인하세요: " + str(source))
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
used, mask = cv2.threshold(gray, config["threshold"], 255, cv2.THRESH_BINARY)
contours, hierarchy = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
kept = []
for contour in contours:
    if cv2.contourArea(contour) >= config["min_area"]:
        kept.append(contour)
preview = image.copy()
for contour in kept:
    x, y, width, height = cv2.boundingRect(contour)
    cv2.rectangle(preview, (x, y), (x + width - 1, y + height - 1), (0, 0, 255), 2)
if not cv2.imwrite(str(root / "work" / "mask.png"), mask):
    raise OSError("mask 저장 실패")
if not cv2.imwrite(str(root / "work" / "detected.png"), preview):
    raise OSError("detected 저장 실패")
report = {"image": config["image"], "threshold": used, "count": len(kept)}
(root / "work" / "report.json").write_text(json.dumps(report, ensure_ascii=False), encoding="utf-8")
print(json.dumps(report, ensure_ascii=False))
```

| 줄 | 코드의 뜻 |

|---:|---|

| 1 | OpenCV를 가져옵니다. |

| 2 | 설정과 결과를 JSON으로 읽고 쓰는 도구를 가져옵니다. |

| 3 | 경로 도구 Path를 가져옵니다. |

| 4 | course 폴더의 위치를 찾습니다. |

| 5 | 학생 작업 폴더의 설정 파일을 UTF-8로 읽고 딕셔너리로 풉니다. |

| 6 | 설정의 image 이름을 data 폴더 경로와 연결합니다. |

| 7 | 입력 이미지를 BGR로 읽습니다. |

| 8 | 이미지 읽기가 실패했는지 확인합니다. |

| 9 | 실패 시 다음 영상 처리를 실행하지 않고 멈춥니다. |

| 10 | 임계값 비교에 쓸 회색조로 바꿉니다. |

| 11 | 기준보다 큰 픽셀을 255, 나머지를 0으로 만듭니다. |

| 12 | 흰 영역의 바깥 윤곽선을 찾습니다. 내부 구멍은 별도 계수하지 않습니다. |

| 13 | 남길 윤곽선의 빈 리스트를 만듭니다. |

| 14 | 윤곽선을 하나씩 확인하는 반복입니다. |

| 15 | 윤곽선 면적이 설정한 최소 면적 이상인지 비교합니다. |

| 16 | 조건을 만족한 윤곽선을 목록에 추가합니다. |

| 17 | 표시용 복사본을 만들어 읽은 원본 배열을 보존합니다. |

| 18 | 남긴 윤곽선을 하나씩 표시합니다. |

| 19 | 둘러싸는 사각형의 시작 좌표와 너비·높이를 받습니다. |

| 20 | 빨간 BGR 사각형 테두리를 복사본에 그립니다. |

| 21 | 마스크를 저장하고 성공 여부를 검사합니다. |

| 22 | 저장에 실패하면 오류로 멈춥니다. |

| 23 | 표시 결과를 저장하고 성공 여부를 검사합니다. |

| 24 | 저장에 실패하면 오류로 멈춥니다. |

| 25 | 파일 이름·임계값·남긴 영역 수를 결과 딕셔너리로 만듭니다. |

| 26 | 결과를 JSON 문자열로 바꿔 report.json에 기록합니다. |

| 27 | 같은 결과를 터미널에도 출력합니다. |

예상 또는 실제 확인 결과:

```text
{"image": "parts.png", "threshold": 100.0, "count": 2}
```

한 값 바꾸기: work/settings.json의 threshold만 100에서 60으로 바꾸면 count가 3이 됩니다. min_area는 100을 유지합니다.

오류 해결: 설정의 큰따옴표·쉼표 오류는 JSON 오류입니다. 면적 조건과 밝기 조건을 한 번에 바꾸지 말고 원본 설정부터 복구합니다.

## 03_replay.py

조건: Python 3와 OpenCV가 설치된 PC. 카메라나 GUI 창을 열지 않는 파일 입력 예제입니다.

실행: `python -X utf8 code/03_replay.py`

```python
import cv2
from pathlib import Path
root = Path(__file__).resolve().parent.parent
for name in ["parts.png", "empty.png", "holdout.png"]:
    frame = cv2.imread(str(root / "data" / name))
    if frame is None:
        raise ValueError("프레임을 읽을 수 없습니다: " + name)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    used, mask = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY)
    contours, hierarchy = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    count = 0
    for contour in contours:
        if cv2.contourArea(contour) >= 100:
            count = count + 1
    print(name, count)
```

| 줄 | 코드의 뜻 |

|---:|---|

| 1 | 영상 처리 도구를 가져옵니다. |

| 2 | 파일 경로 도구를 가져옵니다. |

| 3 | course 폴더를 찾습니다. |

| 4 | 세 파일을 주어진 순서로 처리합니다. 실제 시간 간격은 만들지 않습니다. |

| 5 | 현재 이름의 파일을 프레임 배열로 읽습니다. |

| 6 | 프레임 읽기 실패 여부를 검사합니다. |

| 7 | 실패한 파일 이름을 알려 주며 멈춥니다. |

| 8 | 현재 프레임을 회색조로 바꿉니다. |

| 9 | 밝기 기준 100으로 이진 마스크를 만듭니다. |

| 10 | 프레임의 바깥 윤곽선을 찾습니다. |

| 11 | 이 프레임의 개수를 0으로 새로 시작합니다. |

| 12 | 각 윤곽선을 확인합니다. |

| 13 | 면적 100 이상인 영역만 남깁니다. |

| 14 | 조건을 만족할 때 이번 프레임 개수를 1 늘립니다. |

| 15 | 현재 파일 이름과 이번 프레임 개수를 출력합니다. |

예상 또는 실제 확인 결과:

```text
parts.png 2
empty.png 0
holdout.png 3
```

한 값 바꾸기: 목록 순서만 바꾸면 출력 순서만 달라집니다. 이것은 프레임별 개수이며 고유 물체 누적 수가 아닙니다.

오류 해결: 이전 프레임 개수가 다음 프레임에 더해지면 count = 0이 반복문 안에 있는지 확인합니다.

## 04_webcam.py

조건: 선택 실습: 강사가 확인한 웹캠·권한·GUI 지원 OpenCV와 사용자 동의가 있는 촬영 범위. 이번 제작에서는 실제 카메라를 열지 않았습니다.

실행: `python -X utf8 code/04_webcam.py`

```python
import cv2
capture = cv2.VideoCapture(0)
try:
    if not capture.isOpened():
        raise RuntimeError("카메라 열기 실패: 권한, 점유, 장치 번호를 확인하세요")
    while True:
        ok, frame = capture.read()
        if not ok:
            print("프레임 읽기 실패: 종료합니다")
            break
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        cv2.imshow("camera-gray", gray)
        if cv2.waitKey(1) & 255 == ord("q"):
            break
finally:
    capture.release()
    cv2.destroyAllWindows()
```

| 줄 | 코드의 뜻 |

|---:|---|

| 1 | OpenCV를 가져옵니다. |

| 2 | 장치 번호 0을 열려고 시도합니다. 실제 번호는 환경에 따라 다릅니다. |

| 3 | 오류가 나도 정리 구간이 실행되도록 묶습니다. |

| 4 | 카메라 열기 성공 여부를 확인합니다. |

| 5 | 실패 이유를 확인하도록 오류로 멈춥니다. |

| 6 | 끝내는 조건을 만날 때까지 반복합니다. |

| 7 | 성공 여부 ok와 프레임 배열을 받습니다. |

| 8 | 현재 프레임 읽기가 실패했는지 검사합니다. |

| 9 | 실패를 화면에 알립니다. |

| 10 | 반복을 끝내 정리 구간으로 이동합니다. |

| 11 | 한 프레임을 회색조로 바꿉니다. |

| 12 | 로컬 GUI 창에 현재 프레임을 보입니다. |

| 13 | 창 이벤트를 처리하고 q 키인지 확인합니다. 255는 키 값의 하위 부분을 고릅니다. |

| 14 | q이면 반복을 끝냅니다. |

| 15 | 정상 종료와 오류 모두에서 실행할 정리 구간입니다. |

| 16 | 열었던 카메라 자원을 해제합니다. |

| 17 | OpenCV가 만든 GUI 창을 닫습니다. |

예상 또는 실제 확인 결과:

```text
예상: 회색조 창이 갱신되고 창이 활성화된 상태에서 q를 누르면 종료.
실제 장치·창 실행은 미수행. 모의 캡처로 열기 실패·읽기 실패·q 종료와 release 호출을 검증.
```

한 값 바꾸기: 0을 임의 번호로 계속 바꾸기 전에 운영체제의 카메라 목록과 권한을 확인합니다. 기본 실습은 03_replay.py로 대신합니다.

오류 해결: 장치 점유 프로그램을 종료하고 권한·번호를 확인합니다. GUI가 없는 환경에서는 imshow 대신 파일 경로로 진행합니다.
