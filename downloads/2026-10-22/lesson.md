# 2026-10-22 · OpenCV + 웹캠 실습

컴퓨터는 사진을 의미가 붙은 사물 목록으로 바로 읽지 않습니다. 이번 수업은 배열의 위치와 색 값에서 시작해, 어떤 조건의 영역을 남겼는지 설명할 수 있는 작은 영상 처리를 만듭니다. 규칙 기반 영상 처리와 학습한 AI 모델의 분류를 혼동하지 않습니다.

## 수업의 출발점

10/8의 데이터 구조와 10/14~15의 변수·조건·반복을 복습합니다. 배열은 줄과 칸으로 값을 담는 방식이며, OpenCV는 이미지 읽기와 변환을 제공하는 라이브러리입니다. import는 그 도구를 코드에서 쓰도록 가져오는 문장이고 설치와 실행은 별도 단계입니다. 파일 입력을 기본으로 사용하며 실제 카메라는 운영 조건이 갖춰진 경우의 선택 경로로 둡니다.

## 읽는 방법

개념을 읽고 예시의 근거를 찾은 뒤, 활동지에 예상과 결과를 적어 보세요.

## A01 · 이미지는 작은 값들의 격자

픽셀은 이미지에서 한 위치의 색이나 밝기를 담는 최소 단위입니다. 모눈종이의 칸과 비슷하지만 실제 물체의 고정 길이를 뜻하지는 않습니다.

값의 배열을 이해하면 색이 바뀌거나 좌표가 어긋난 이유를 설명할 수 있습니다. 이미지 파일의 이름만으로 내용과 크기를 알 수 없습니다.

### 입력에서 살펴볼 예

4×3 회색조 예
0 0 255 255
0 80 80 255
0 0 0 0

가로 4칸, 세로 3칸입니다. 0은 어둡고 255는 밝습니다.
이 예의 배열은 높이 3, 너비 4입니다.

### 구분해야 할 반례

픽셀 한 칸이 현실의 1mm라는 뜻은 아닙니다. 촬영 거리와 렌즈, 해상도에 따라 대응 길이가 달라집니다.

스스로 설명할 질문: 가로·세로와 실제 길이를 왜 구분해야 하나요?

활동 연결: [입력](examples/course/data/A01_input.md) · [기록 양식](examples/course/work/A01_worksheet.md)

## A02 · 좌표와 BGR 채널

좌표는 위치를 가리키는 번호이고 채널은 한 픽셀의 색 성분입니다. 이 수업의 OpenCV 컬러 입력은 파랑·초록·빨강 순서인 BGR입니다.

배열은 image[y,x]로 읽으므로 화면의 x,y 설명과 순서를 구분해야 합니다. 채널 순서를 바꾸면 빨강과 파랑의 해석이 바뀝니다.

### 입력에서 살펴볼 예

좌표: x=2, y=1
픽셀: [0, 0, 255]
컬러 shape: (240,320,3)

image[1,2]에서 BGR 값 [0,0,255]는 빨강입니다.
shape는 높이 240, 너비 320, 채널 3입니다.

### 구분해야 할 반례

[0,0,255]를 모든 도구에서 파랑으로 읽지는 않습니다. RGB와 BGR은 채널 약속이 다릅니다.

스스로 설명할 질문: image[40,30]은 어느 x,y를 가리키나요?

활동 연결: [입력](examples/course/data/A02_input.md) · [기록 양식](examples/course/work/A02_worksheet.md)

## A03 · 파일과 프레임의 차이

프레임은 영상에서 한 시점의 이미지입니다. 책의 한 장을 차례로 넘기는 것처럼 여러 프레임을 시간 순서로 보면 움직임을 볼 수 있습니다.

파일 입력은 같은 장면을 반복해서 시험하기 쉽습니다. 웹캠 입력은 매번 장면과 밝기가 달라질 수 있으므로 처리 규칙과 수집 조건을 따로 확인합니다.

### 입력에서 살펴볼 예

parts.png: 한 장면
empty.png: 물체 없는 장면
holdout.png: 새 배치 장면

세 파일을 순서대로 읽어도 실제 카메라 속도 검증은 아닙니다.
실시간 영상은 장치·시간·처리 지연을 추가로 확인합니다.

### 구분해야 할 반례

프레임 3장을 읽었다고 고유 물체 3개를 찾았다는 뜻은 아닙니다. 같은 물체가 여러 프레임에 반복될 수 있습니다.

스스로 설명할 질문: 파일 재생과 실제 웹캠 검증은 무엇이 다른가요?

활동 연결: [입력](examples/course/data/A03_input.md) · [기록 양식](examples/course/work/A03_worksheet.md)

## A04 · 이미지 파일 읽기와 실패

imread는 파일을 이미지 배열로 읽는 함수입니다. 성공한 배열과 실패한 None을 구분한 뒤 다음 처리를 해야 합니다.

읽지 못한 파일을 회색조로 바꾸려고 하면 원인과 멀리 떨어진 오류가 날 수 있습니다. 입구에서 실패를 확인하면 경로·파일 이름을 먼저 복구할 수 있습니다.

### 입력에서 살펴볼 예

01_inspect.py 전체
data/parts.png
예상 shape (240,320,3)

코드가 파일을 찾고 배열 크기와 픽셀 값을 출력합니다.
회색조 결과는 work/gray.png에 저장합니다.

### 구분해야 할 반례

저장만 누르면 Python 코드가 실행되는 것은 아닙니다. 터미널에서 제공 명령을 실행하고 결과 파일 시각과 내용을 확인합니다.

스스로 설명할 질문: None 확인을 색 변환보다 먼저 하는 이유는 무엇인가요?

활동 연결: [입력](examples/course/data/A04_input.md) · [기록 양식](examples/course/work/A04_worksheet.md)

### 01_inspect.py 전체

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

실행 조건: Python 3와 OpenCV가 설치된 PC. 카메라나 GUI 창을 열지 않는 파일 입력 예제입니다.

실행 폴더: examples/course

명령: `python -X utf8 code/01_inspect.py`

결과:

```text
shape: (240, 320, 3)
BGR: [220, 220, 220]
gray: (240, 320)
```

각 줄의 뜻은 [코드 해설](examples/course/code/line-guide.md)에 있습니다.

작은 수정: parts.png를 empty.png로 바꾸면 크기는 같고 지정 픽셀 값은 [0, 0, 0]입니다.

오류 복구: ModuleNotFoundError이면 설치 환경을 확인합니다. 읽기 오류면 압축을 풀고 data 폴더와 파일 철자를 확인합니다.

## A05 · 관심 영역과 크기

관심 영역 ROI는 이미지에서 이번 문제에 필요한 부분입니다. 책에서 필요한 문단을 고르는 것처럼 분석할 범위를 먼저 정합니다.

배경까지 처리하면 관계없는 밝은 물체도 함께 잡힐 수 있습니다. 잘라내기와 크기 변경은 목적과 좌표를 바꾸므로 원본 크기를 기록해야 합니다.

### 입력에서 살펴볼 예

원본 shape (240,320,3)
ROI: image[20:80,10:70]
resize 목표: (160,120)

슬라이스 끝 번호는 포함하지 않아 ROI는 60×60입니다.
resize의 크기 인자는 너비 160, 높이 120입니다.

### 구분해야 할 반례

자르기는 범위를 버리고 크기 변경은 전체를 새 격자로 만듭니다. 둘을 같은 작업으로 설명하면 좌표와 검출 면적이 어긋납니다.

스스로 설명할 질문: ROI 자르기와 resize는 어떤 정보를 바꾸나요?

활동 연결: [입력](examples/course/data/A05_input.md) · [기록 양식](examples/course/work/A05_worksheet.md)

## A06 · 회색조의 얻는 것과 잃는 것

회색조는 색 성분을 밝기 한 값으로 표현한 이미지입니다. 색을 구분하는 문제인지 밝은 영역을 찾는 문제인지에 따라 사용할지 정합니다.

밝기 기준으로 물체 영역을 찾는 이번 예에서는 한 채널 비교가 쉽습니다. 그러나 밝기가 비슷한 빨강과 초록을 구분하려면 색 정보를 보존한 방법이 필요합니다.

### 입력에서 살펴볼 예

BGR: 빨강[0,0,255], 초록[0,255,0], 파랑[255,0,0]
회색조: 76,150,29
별도 색 견본 파일을 비교합니다.

세 채널을 한 밝기로 요약합니다. 빨강·초록·파랑 견본은76·150·29로 변환됩니다.
검출용 parts.png는 처음부터 세 채널 값이 같으므로 변환 전후 외관이 같습니다.

### 구분해야 할 반례

회색조가 모든 영상 문제에서 더 좋은 입력은 아닙니다. 신호등 색을 구별해야 하는 업무에서 밝기만 보면 다른 색을 혼동할 수 있습니다.

스스로 설명할 질문: 회색조를 쓰면 어떤 질문에는 답하기 어려워지나요?

활동 연결: [입력](examples/course/data/A06_input.md) · [기록 양식](examples/course/work/A06_worksheet.md)

## A07 · 임계값과 이진 마스크

임계값은 값을 나누는 기준이고 마스크는 처리할 영역을 표시한 배열입니다. 출입 기준표처럼 픽셀마다 기준 통과 여부를 정합니다.

THRESH_BINARY에서 밝기가 기준보다 크면 255, 작거나 같으면 0입니다. 결과의 흰색은 조건을 만족한 위치이며 물체의 의미를 이미 알아냈다는 뜻은 아닙니다.

### 입력에서 살펴볼 예

밝기 80,100,101,220
threshold=100
THRESH_BINARY, 최대값255

80과 100은 0입니다.
101과 220은 255입니다.
같은 100을 포함하는 쪽을 주의합니다.

### 구분해야 할 반례

threshold=100이라고 밝기 100도 흰색이 되지 않습니다. 이 API의 비교는 기준보다 큰 값에 최대값을 줍니다.

스스로 설명할 질문: 밝기 100과 101이 서로 다른 결과가 되는 이유는 무엇인가요?

활동 연결: [입력](examples/course/data/A07_input.md) · [기록 양식](examples/course/work/A07_worksheet.md)

## A08 · 윤곽선과 면적 조건

윤곽선은 연결된 영역의 경계를 따라가는 점들의 목록입니다. 경계 안의 면적은 픽셀 좌표계에서 계산하며 실제 물체의 이름을 알려 주지는 않습니다.

밝은 먼지처럼 작은 영역을 제외하려면 최소 면적 조건을 함께 씁니다. 경계가 합쳐진 두 물체는 하나의 영역으로 나올 수 있으므로 개수의 해석을 제한해야 합니다.

### 입력에서 살펴볼 예

마스크: 큰 밝은 영역 2개
작은 밝은 영역 1개
min_area=100

작은 영역의 윤곽선 면적은 16으로 제외합니다.
남은 영역을 세면 기본 예에서는 2입니다.

### 구분해야 할 반례

윤곽선 한 개가 언제나 실제 물체 한 개는 아닙니다. 물체가 붙으면 경계가 합쳐지고 그림자나 반사도 영역을 만들 수 있습니다.

스스로 설명할 질문: 검출 영역 수를 부품 개수라고 바로 확정하면 안 되는 경우는 무엇인가요?

활동 연결: [입력](examples/course/data/A08_input.md) · [기록 양식](examples/course/work/A08_worksheet.md)

## A09 · 설정 파일로 전체 처리 읽기

처리 파이프라인은 입력부터 결과까지 순서대로 이어진 작업입니다. 파일 읽기·회색조·마스크·윤곽선·표시·기록의 연결을 말합니다.

단계를 나누면 결과가 틀렸을 때 어떤 중간 결과를 볼지 정할 수 있습니다. 설정을 코드 밖 JSON에 두면 밝기 기준과 면적 기준을 구분해서 바꿀 수 있습니다.

### 입력에서 살펴볼 예

02_count.py
settings: image=parts.png
threshold=100, min_area=100

기본 출력 count는 2입니다.
work에 mask.png, detected.png, report.json을 저장합니다.

### 구분해야 할 반례

프로그램이 정상 종료했다는 사실만으로 검출이 맞는 것은 아닙니다. 입력·마스크·표시된 박스와 원문 조건을 함께 봐야 합니다.

스스로 설명할 질문: 개수가 이상하면 어떤 중간 결과부터 보겠습니까?

활동 연결: [입력](examples/course/data/A09_input.md) · [기록 양식](examples/course/work/A09_worksheet.md)

### 02_count.py 전체

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

실행 조건: Python 3와 OpenCV가 설치된 PC. 카메라나 GUI 창을 열지 않는 파일 입력 예제입니다.

실행 폴더: examples/course

명령: `python -X utf8 code/02_count.py`

결과:

```text
{"image": "parts.png", "threshold": 100.0, "count": 2}
```

각 줄의 뜻은 [코드 해설](examples/course/code/line-guide.md)에 있습니다.

작은 수정: work/settings.json의 threshold만 100에서 60으로 바꾸면 count가 3이 됩니다. min_area는 100을 유지합니다.

오류 복구: 설정의 큰따옴표·쉼표 오류는 JSON 오류입니다. 면적 조건과 밝기 조건을 한 번에 바꾸지 말고 원본 설정부터 복구합니다.

## A10 · 한 조건만 바꾸는 비교

비교 실험은 바꾼 조건과 고정한 조건을 구분해 결과 차이의 원인을 살피는 활동입니다. 사진 두 장을 비교할 때 조명까지 함께 바뀌면 이유를 단정하기 어렵습니다.

threshold와 min_area를 동시에 바꾸면 어느 조건 때문에 개수가 달라졌는지 알기 어렵습니다. 기본값을 적고 한 값씩 수정한 뒤 원래 값으로 돌립니다.

### 입력에서 살펴볼 예

실험1 threshold100, area100
실험2 threshold60, area100
실험3 threshold100, area2000

개수 예상은 2,3,1입니다.
실험3은 두 번째 큰 영역만 남깁니다.

### 구분해야 할 반례

실험2 결과가 좋아 보인다고 모든 카메라 조건에서 60이 최적이라는 뜻은 아닙니다. 비교에 쓰지 않은 조명과 배경에서도 확인해야 합니다.

스스로 설명할 질문: 어느 값을 고정해야 변경의 영향을 설명할 수 있나요?

활동 연결: [입력](examples/course/data/A10_input.md) · [기록 양식](examples/course/work/A10_worksheet.md)

## A11 · 실패한 검출에서 배우기

오검출은 대상이 아닌 영역을 대상으로 판단한 경우이고 미검출은 실제 목표를 놓친 경우입니다. 먼저 업무에서 무엇을 대상이라고 정했는지 있어야 두 오류를 셀 수 있습니다.

빈 장면, 어두운 장면, 붙은 장면을 따로 시험하면 기본 이미지에서 보이지 않던 한계를 확인할 수 있습니다. 사람의 원문 판정과 알고리즘 출력은 서로 다른 근거입니다.

### 입력에서 살펴볼 예

empty.png: 대상0
dim.png: 같은2개가 어두워짐
touching.png: 실제2개가 붙음

기준100에서 empty=0, dim=0, touching=1입니다.
붙은 영역 한 개가 실제 부품 두 개일 수 있습니다.

### 구분해야 할 반례

전체 결과를 정확도 한 숫자로만 쓰면 어떤 장면에서 실패했는지 숨길 수 있습니다. 작은 수업 샘플의 통과율도 현장 성능 증명은 아닙니다.

스스로 설명할 질문: 빈 장면 통과와 어두운 장면 실패를 어떻게 따로 기록하나요?

활동 연결: [입력](examples/course/data/A11_input.md) · [기록 양식](examples/course/work/A11_worksheet.md)

## A12 · 새 입력으로 규칙 확인

보류 입력은 기준을 정할 때 미리 맞춰 보지 않은 입력입니다. 연습 문제의 답에만 맞춘 규칙인지 확인할 기회를 줍니다.

같은 그림의 숫자만 외우면 다른 배치에서 틀려도 놓치기 쉽습니다. 새 입력에서는 먼저 기대 결과와 이유를 쓰고 그다음 같은 설정을 적용합니다.

### 입력에서 살펴볼 예

holdout.png
밝은 분리 영역3개
threshold100, area100 유지

새 위치에 놓인 세 영역이 남습니다.
입력 배치가 바뀌어도 이번 조건에서는 3입니다.

### 구분해야 할 반례

새 입력 한 장에서 성공했다고 색과 조명 변화까지 모두 해결한 것은 아닙니다. 검증한 변화가 위치뿐인지 밝기·겹침도 포함하는지 기록합니다.

스스로 설명할 질문: 이번 보류 입력이 확인한 변화와 확인하지 못한 변화는 무엇인가요?

활동 연결: [입력](examples/course/data/A12_input.md) · [기록 양식](examples/course/work/A12_worksheet.md)

## A13 · 프레임을 순서대로 처리

반복은 같은 처리 규칙을 여러 입력에 차례로 적용하는 방법입니다. 프레임마다 개수를 다시 세는 일과 시간 전체의 고유 물체를 추적하는 일은 다릅니다.

파일 목록을 재생하면 카메라 없이도 반복·초기화·출력 순서를 확인할 수 있습니다. 루프 안에서 count를 0으로 다시 만드는 이유를 설명할 수 있어야 합니다.

### 입력에서 살펴볼 예

03_replay.py
parts, empty, holdout 순서
기대 영역 수 2,0,3

파일 이름과 해당 프레임의 개수가 줄마다 나옵니다.
2+0+3을 고유 부품 총수로 해석하지 않습니다.

### 구분해야 할 반례

카메라가 초당 30프레임을 준다고 프로그램도 반드시 초당30번 처리를 끝내는 것은 아닙니다. 처리시간과 장치의 출력속도는 별도로 측정해야 합니다.

스스로 설명할 질문: count=0을 반복문 밖으로 옮기면 어떤 문제가 생기나요?

활동 연결: [입력](examples/course/data/A13_input.md) · [기록 양식](examples/course/work/A13_worksheet.md)

### 03_replay.py 전체

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

실행 조건: Python 3와 OpenCV가 설치된 PC. 카메라나 GUI 창을 열지 않는 파일 입력 예제입니다.

실행 폴더: examples/course

명령: `python -X utf8 code/03_replay.py`

결과:

```text
parts.png 2
empty.png 0
holdout.png 3
```

각 줄의 뜻은 [코드 해설](examples/course/code/line-guide.md)에 있습니다.

작은 수정: 목록 순서만 바꾸면 출력 순서만 달라집니다. 이것은 프레임별 개수이며 고유 물체 누적 수가 아닙니다.

오류 복구: 이전 프레임 개수가 다음 프레임에 더해지면 count = 0이 반복문 안에 있는지 확인합니다.

## A14 · 웹캠 열기와 종료

카메라 캡처는 장치에서 프레임을 받아오는 연결입니다. 장비를 빌려 쓰듯 열기와 사용 뒤 반환이 한 묶음이어야 합니다.

다른 앱이 카메라를 쓰거나 권한이 없으면 열기가 실패할 수 있습니다. 열기 성공과 매 프레임 읽기 성공을 따로 검사하고 모든 종료 경로에서 자원을 해제합니다.

### 입력에서 살펴볼 예

04_webcam.py
열기 확인 isOpened
프레임 확인 read
종료 q와 finally

기본 제작은 카메라를 열지 않았습니다.
코드 읽기와 모의 실패 경로를 비교합니다.

### 구분해야 할 반례

장치 번호0이 항상 원하는 카메라라는 보장은 없습니다. 번호를 무작정 바꿔 촬영하기 전에 장치·권한·촬영 범위를 강사가 확인합니다.

스스로 설명할 질문: 열기는 성공했는데 read가 실패할 수 있을까요?

활동 연결: [입력](examples/course/data/A14_input.md) · [기록 양식](examples/course/work/A14_worksheet.md)

### 04_webcam.py 전체

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

실행 조건: 선택 실습: 강사가 확인한 웹캠·권한·GUI 지원 OpenCV와 사용자 동의가 있는 촬영 범위. 이번 제작에서는 실제 카메라를 열지 않았습니다.

실행 폴더: examples/course

명령: `python -X utf8 code/04_webcam.py`

결과:

```text
예상: 회색조 창이 갱신되고 창이 활성화된 상태에서 q를 누르면 종료.
실제 장치·창 실행은 미수행. 모의 캡처로 열기 실패·읽기 실패·q 종료와 release 호출을 검증.
```

각 줄의 뜻은 [코드 해설](examples/course/code/line-guide.md)에 있습니다.

작은 수정: 0을 임의 번호로 계속 바꾸기 전에 운영체제의 카메라 목록과 권한을 확인합니다. 기본 실습은 03_replay.py로 대신합니다.

오류 복구: 장치 점유 프로그램을 종료하고 권한·번호를 확인합니다. GUI가 없는 환경에서는 imshow 대신 파일 경로로 진행합니다.

## A15 · 시연과 실제 장비 검증

검증 경계는 무엇을 직접 실행했고 무엇을 조건으로 남겼는지 나누는 선입니다. 파일과 모의 캡처가 통과한 사실은 실제 하드웨어 동작과 구별해서 기록합니다.

장비가 없는 날에도 실패 흐름을 읽고 시험할 수 있습니다. 다만 드라이버·카메라 권한·실제 GUI·지연은 현장에서 확인할 항목으로 남겨야 합니다.

### 입력에서 살펴볼 예

모의1: 열기 실패
모의2: 프레임 실패
모의3: 정상 프레임 후 q

세 경로 모두 release 호출을 확인합니다.
실제 카메라 영상 품질과 속도는 미확인입니다.

### 구분해야 할 반례

함수가 호출되었다는 기록만으로 실제 장치가 물리적으로 해제됐다고 주장하지 않습니다. 모의 객체는 코드의 경로만 대신합니다.

스스로 설명할 질문: 모의 시험에서 확인한 사실을 한 문장으로 제한해 말해 보세요.

활동 연결: [입력](examples/course/data/A15_input.md) · [기록 양식](examples/course/work/A15_worksheet.md)

## A16 · 검출 요구를 문장으로 정하기

요구사항은 어떤 입력에서 어떤 결과를 기대하는지 정한 약속입니다. 잘 찾는 프로그램처럼 모호한 표현 대신 조건과 확인 기준을 함께 씁니다.

이번 작은 작업은 밝은 분리 영역을 세는 규칙입니다. 색상 분류·사람 인식·실제 부품 품질검사까지 한 번에 수행한다고 쓰면 검증 범위를 벗어납니다.

### 입력에서 살펴볼 예

새 의뢰: 검은 받침 위 밝은 표식 수
대상: 분리된 영역, 면적100이상
제외: 실제 mm측정·붙은 물체 분리

입력 조건과 결과 항목을 먼저 씁니다.
빈장면·새배치·어두운장면을 시험에 포함합니다.

### 구분해야 할 반례

요구에 없는 실제 부품 종류 이름을 알고리즘 결과에 붙이지 않습니다. 영역의 밝기·면적 조건만으로 재질이나 불량 원인을 알 수 없습니다.

스스로 설명할 질문: 이번 코드로 약속할 수 있는 결과와 약속하기 어려운 것은 무엇인가요?

활동 연결: [입력](examples/course/data/A16_input.md) · [기록 양식](examples/course/work/A16_worksheet.md)

## A17 · 새 설정으로 결과 패키지 만들기

결과 패키지는 원본 이름, 설정, 출력, 확인한 사실을 함께 남긴 묶음입니다. 그림 하나만 보내면 어떤 조건으로 만들었는지 재현하기 어렵습니다.

다음 사람이 같은 결과를 확인하려면 입력과 설정이 필요합니다. 오류 입력에서는 그럴듯한 빈 결과를 성공으로 저장하지 않고 실패 이유를 분리해 남깁니다.

### 입력에서 살펴볼 예

종합 입력: holdout.png
threshold=100, min_area=100
추가 시험: missing.png

정상 입력의 기대 count는 3입니다.
없는 파일은 읽기 오류로 종료해야 합니다.

### 구분해야 할 반례

입력을 못 읽은 상태와 정상적으로 물체가 없는 상태는 다릅니다. 둘 다 count0으로 기록하면 센서 장애를 빈 공간으로 오해할 수 있습니다.

스스로 설명할 질문: 입력 실패와 정상 빈장면을 어떤 항목으로 구별할까요?

활동 연결: [입력](examples/course/data/A17_input.md) · [기록 양식](examples/course/work/A17_worksheet.md)

## A18 · 결과를 근거로 설명하기

인수인계는 다음 사람이 작업을 이어갈 수 있도록 입력과 확인 결과, 남은 한계를 전달하는 일입니다. 기능 소개와 실제 검증 결과를 구분해 말합니다.

PPT 장면이나 출력 숫자만 보여 주는 발표보다 어느 조건에서 성공·실패했는지를 설명해야 수정 방향을 정할 수 있습니다. 기록의 날짜와 사용 설정도 함께 남깁니다.

### 입력에서 살펴볼 예

최종 설명3문장
1 입력과 규칙
2 직접 확인한 결과
3 미검증 장비 조건

파일 입력은 실제 실행 근거를 제시합니다.
카메라·GUI·현장 성능은 미실행 경계로 설명합니다.

### 구분해야 할 반례

완성 코드가 있다는 이유로 실시간 품질검사 시스템이 완성됐다고 말하지 않습니다. 교육용 합성 입력과 현장 운영은 검증 범위가 다릅니다.

스스로 설명할 질문: 확인한 사실과 다음 검증을 각각 한 문장으로 말할 수 있나요?

활동 연결: [입력](examples/course/data/A18_input.md) · [기록 양식](examples/course/work/A18_worksheet.md)
