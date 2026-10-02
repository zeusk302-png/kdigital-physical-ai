# Python 심화 · 함수와 파일 검사

2026-10-15 · Python 심화

반복하는 일을 함수로 묶고 CSV를 읽어 JSON으로 저장합니다. 값이 없거나 잘못된 경우도 함께 처리해 봅니다.

원본은 그대로 두고 work 폴더의 지정한 파일을 수정하세요. 계정이나 실제 장비 없이 합성 자료로 진행합니다.

# 1구간 · 반복 업무와 함수

## A01 · 같은 업무를 함수로 묶는 이유

**개념.** 함수는 한 가지 일을 이름 붙여 묶은 코드입니다. 매번 같은 안내 절차를 읽는 대신 ‘온도 상태 확인’이라는 작업을 정해 두고 필요한 값으로 부를 수 있습니다. 무엇을 입력하고 무엇을 결과로 돌려줄지 먼저 정합니다.

**왜 필요한가.** 같은 조건식을 여러 곳에 복사하면 한 곳만 수정하고 다른 곳을 놓칠 수 있습니다. 반복되는 규칙을 모으면 변경 위치를 찾기 쉽습니다. 첫 코드부터 모든 줄을 함수로 만들 필요는 없습니다.

**함께 보는 예.** 온도 22.5·25.0·24.0을 각각 24.0과 비교합니다. 공통 작업은 비교하여 상태를 정하는 과정이며 달라지는 것은 입력 온도입니다. 같은 업무 이름에 다른 입력을 줄 수 있습니다.

**헷갈리는 경우.** 이름이 check라고 해서 검증을 모두 수행하는 것은 아닙니다. 본문이 실제로 어떤 조건을 보는지 읽어야 합니다. 함수 이름은 약속을 설명하지만 정확성을 보장하지 않습니다.

### 제공 입력


```text
세 업무: 22.5와24.0 비교 / 25.0과24.0 비교 / 24.0과24.0 비교.
답칸: 공통 작업 / 달라지는 입력 / 결과 / 이름 제안.
```


### 학생 적용

1. 같은 부분과 다른 값을 구별합니다.
2. 공통 작업에 temperature_status라는 이름을 붙입니다.
3. 받을 값과 결과의 뜻을 문장으로 씁니다.
4. 기준 변경 때 수정할 위치를 비교합니다.

예상 결과: 공통 규칙·온도 입력·상태 결과를 구별합니다.

확인 질문: 줄 수가 짧으면 함수가 필요 없다고 단정할 수 있나요?

막혔을 때: 입력 카드 한 장을 받고 상태 카드 한 장을 돌려주는 역할극으로 그립니다.

[활동 자료와 작성칸](practice-guide.md#a01--같은-업무를-함수로-묶는-이유)에서 A01를 엽니다.

## A02 · def로 정의하고 이름으로 호출하기

**개념.** def는 함수를 정의하는 문장입니다. 이름 뒤 괄호와 콜론을 쓰고 들여쓴 줄을 함수 본문으로 묶습니다. 정의만 하면 본문은 아직 실행되지 않으며 이름을 괄호와 함께 불러야 합니다.

**왜 필요한가.** 위에서 아래로 읽는 원리는 유지하지만 함수 본문은 호출할 때 실행됩니다. 정의 위치와 실제 실행 시점을 나누어 보면 출력 순서가 이해됩니다.

**함께 보는 예.** show_notice를 정의한 뒤 준비를 출력합니다. 함수 호출 때 안내가 나오고 호출에서 돌아온 뒤 끝이 나옵니다. 함수 본문의 줄 번호가 위에 있다고 가장 먼저 출력되는 것은 아닙니다.

**헷갈리는 경우.** show_notice라고 이름만 적는 것과 show_notice()로 호출하는 것은 다릅니다. 괄호는 실제 작업을 요청하는 표기입니다.

### 전체 코드


```python
def show_notice():
    print("점검을 시작합니다")
print("준비")
show_notice()
print("끝")
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `def show_notice():` | 안내하는 작업을 정의합니다. |
| 2 | `    print("점검을 시작합니다")` | 호출할 때 실행할 출력입니다. |
| 3 | `print("준비")` | 바깥에서 준비를 출력합니다. |
| 4 | `show_notice()` | 정의한 함수를 호출합니다. |
| 5 | `print("끝")` | 돌아온 뒤 끝을 출력합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A02_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A02_example.py
```

원본 코드의 예상 출력:


```text
준비
점검을 시작합니다
끝
```

작은 수정: `show_notice()
print("끝")`를 `show_notice()
show_notice()
print("끝")`로 바꿉니다.

수정 후 예상 출력:


```text
준비
점검을 시작합니다
점검을 시작합니다
끝
```


### 학생 적용

1. 정의와 호출을 표시합니다.
2. 실제 출력 순서를 씁니다.
3. 호출을 한 번 더 넣어 예상합니다.
4. 정의 횟수와 본문 실행 횟수를 설명합니다.

예상 결과: 정의 한 번·호출 두 번이면 안내 출력 두 번.

확인 질문: 정의만 하고 호출하지 않으면 본문 출력은 나오나요?

막혔을 때: 본문 출력이 예상과 다르면 print가 함수 안에 들여써져 있는지 확인합니다.

[활동 자료와 작성칸](practice-guide.md#a02--def로-정의하고-이름으로-호출하기)에서 A02를 엽니다.

## A03 · 매개변수와 실제 인자

**개념.** 매개변수는 받을 값의 이름이고 인자는 호출할 때 실제로 주는 값입니다. 양식의 ‘장소’ 칸과 거기에 넣는 ‘입구’라는 내용의 관계에 비유할 수 있습니다.

**왜 필요한가.** 고정 값을 함수 안에서 매번 바꾸는 대신 호출값을 달리해 같은 작업을 사용합니다. 함수 안 이름이 어디서 값을 받는지 알아야 전달한 값을 추적할 수 있습니다.

**함께 보는 예.** sensor_id와 value는 받을 이름입니다. 첫 호출에서 S01·22.5가 연결되고 다음 호출에서는 S02·25.0이 연결됩니다. 각 호출은 서로 다른 값으로 같은 본문을 사용합니다.

**헷갈리는 경우.** 인자의 순서를 바꾸어도 컴퓨터가 업무 의미를 추측해 바로잡지 않습니다. 센서명 위치에 숫자를 주면 잘못된 위치의 값이 출력될 수 있습니다.

### 전체 코드


```python
def show_temperature(sensor_id, value):
    print(sensor_id, value)
show_temperature("S01", 22.5)
show_temperature("S02", 25.0)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `def show_temperature(sensor_id, value):` | 센서명과 값을 받는 함수를 정의합니다. |
| 2 | `    print(sensor_id, value)` | 이번 호출에서 받은 값을 출력합니다. |
| 3 | `show_temperature("S01", 22.5)` | 첫 센서와 온도를 전달합니다. |
| 4 | `show_temperature("S02", 25.0)` | 둘째 센서와 온도를 전달합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A03_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A03_example.py
```

원본 코드의 예상 출력:


```text
S01 22.5
S02 25.0
```

작은 수정: `show_temperature("S02", 25.0)`를 `show_temperature("S03", 0.0)`로 바꿉니다.

수정 후 예상 출력:


```text
S01 22.5
S03 0.0
```


### 학생 적용

1. 전달값과 받을 이름을 짝짓습니다.
2. 둘째 입력을 S03·0.0으로 바꿉니다.
3. 값 하나가 부족한 호출과 정상 호출을 비교합니다.
4. 함수 내부를 고치지 않고 결과가 달라지는 이유를 씁니다.

예상 결과: 둘째 출력 S03 0.0. 인자 부족은 TypeError.

확인 질문: value는 모든 호출에서 같은 값을 뜻하나요?

막혔을 때: 받을 값 개수와 전달한 값 개수·순서를 비교합니다.

[활동 자료와 작성칸](practice-guide.md#a03--매개변수와-실제-인자)에서 A03를 엽니다.

# 2구간 · 함수 입력과 반환

## A04 · print와 return의 차이

**개념.** print는 값을 화면에 보여 주고 return은 함수를 부른 위치로 값을 돌려줍니다. 화면에 결과가 보였다는 사실과 다음 계산에 사용할 결과를 받았다는 사실은 다릅니다.

**왜 필요한가.** 결과를 JSON에 저장하거나 집계하려면 함수가 값을 돌려줘야 합니다. 화면 글자를 다른 코드가 저절로 변수에 담지는 않습니다.

**함께 보는 예.** add_offset은 받은 두 수를 더해 반환합니다. result가 23.5를 받고 다음 계산에서 사용합니다. 더하는 값은 수업 계산 예이며 실제 장비 교정값으로 사용하지 않습니다.

**헷갈리는 경우.** return 없이 print만 하는 함수의 반환값은 None입니다. 그 값을 숫자처럼 더하려고 하면 오류가 날 수 있습니다. 화면만 보지 말고 return의 역할을 확인합니다.

### 전체 코드


```python
def add_offset(value, offset):
    return value + offset
result = add_offset(22.5, 1.0)
print(result)
print(result + 1)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `def add_offset(value, offset):` | 두 값을 받는 작업을 정의합니다. |
| 2 | `    return value + offset` | 합을 호출한 곳으로 돌려줍니다. |
| 3 | `result = add_offset(22.5, 1.0)` | 돌아온 결과를 result에 연결합니다. |
| 4 | `print(result)` | 받은 결과를 출력합니다. |
| 5 | `print(result + 1)` | 결과를 다음 계산에 사용합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A04_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A04_example.py
```

원본 코드의 예상 출력:


```text
23.5
24.5
```

작은 수정: `22.5, 1.0`를 `22.5, 2.0`로 바꿉니다.

수정 후 예상 출력:


```text
24.5
25.5
```


### 학생 적용

1. 출력과 반환의 경로를 구별합니다.
2. result가 값을 받는 위치를 찾습니다.
3. offset을 2.0으로 바꿔 예상합니다.
4. 두 출력의 관계를 확인합니다.

예상 결과: 24.5를 반환하고 다음 계산은 25.5.

확인 질문: 화면에 보인 값은 언제나 같은 함수의 반환값인가요?

막혔을 때: None이 보이면 return이 있는지, 특정 경로에서 반환 없이 끝나는지 확인합니다.

[활동 자료와 작성칸](practice-guide.md#a04--print와-return의-차이)에서 A04를 엽니다.

## A05 · 조건을 담은 상태 함수

**개념.** 함수 안에서도 if를 사용할 수 있습니다. 입력을 받아 조건에 맞는 상태 문자열을 돌려주는 규칙을 만듭니다. return을 만나면 그 호출은 결과를 돌려주고 끝납니다.

**왜 필요한가.** 상태 규칙과 출력 위치를 나누면 같은 결과를 화면이나 파일에 사용할 수 있습니다. 함수가 입력 자체를 수정하는지 결과만 만드는지도 계약으로 구별합니다.

**함께 보는 예.** None이면 미측정,24.0 초과면 확인,나머지는 정상입니다. 앞의 return을 실행한 호출은 아래 비교로 다시 내려가지 않습니다.

**헷갈리는 경우.** 함수로 묶었다고 자료형 규칙이 없어지는 것은 아닙니다. None을 먼저 숫자와 비교하면 TypeError가 나므로 값 없음의 처리를 앞에 둡니다.

### 전체 코드


```python
def temperature_status(value):
    if value is None:
        return "미측정"
    if value > 24.0:
        return "확인"
    return "정상"
print(temperature_status(22.5))
print(temperature_status(None))
print(temperature_status(25.0))
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `def temperature_status(value):` | 값을 받는 함수를 정의합니다. |
| 2 | `    if value is None:` | 값 없음을 먼저 확인합니다. |
| 3 | `        return "미측정"` | 미측정으로 반환하고 끝냅니다. |
| 4 | `    if value > 24.0:` | 숫자의 기준 초과를 묻습니다. |
| 5 | `        return "확인"` | 초과 상태를 반환합니다. |
| 6 | `    return "정상"` | 나머지 상태를 반환합니다. |
| 7 | `print(temperature_status(22.5))` | 정상 입력을 확인합니다. |
| 8 | `print(temperature_status(None))` | 미측정 입력을 확인합니다. |
| 9 | `print(temperature_status(25.0))` | 초과 입력을 확인합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A05_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A05_example.py
```

원본 코드의 예상 출력:


```text
정상
미측정
확인
```

작은 수정: `temperature_status(25.0)`를 `temperature_status(24.0)`로 바꿉니다.

수정 후 예상 출력:


```text
정상
미측정
정상
```


### 학생 적용

1. 입력별 도달하는 return을 표시합니다.
2. 마지막 입력을 24.0으로 바꿉니다.
3. 상태 문자열만 생기는지 입력이 바뀌는지 설명합니다.
4. None 확인을 먼저 하는 이유를 씁니다.

예상 결과: 정상·미측정·정상. 같은 값은 초과가 아닙니다.

확인 질문: return 뒤의 코드를 같은 호출이 모두 실행하나요?

막혔을 때: 미측정 오류는 숫자 비교보다 None 검사가 앞인지 확인합니다.

[활동 자료와 작성칸](practice-guide.md#a05--조건을-담은-상태-함수)에서 A05를 엽니다.

## A06 · 예상 사례표로 함수 확인하기

**개념.** 검증 사례는 입력과 기대 결과를 미리 적어 실제 결과와 비교하는 한 경우입니다. 정상값뿐 아니라 경계와 값 없음의 사례도 포함합니다.

**왜 필요한가.** 프로그램이 보여 준 결과를 그대로 정답으로 적으면 잘못된 코드도 통과합니다. 실행 전에 업무 규칙에서 기대값을 정해야 합니다.

**함께 보는 예.** 23.9·24.0·24.1은 정상·정상·확인입니다. None은 미측정이고 0.0은 실제 숫자입니다. 다섯 사례는 서로 다른 실수를 확인합니다.

**헷갈리는 경우.** 다섯 사례를 통과했다고 모든 입력을 확인한 것은 아닙니다. 글자와 범위 밖 숫자는 아직 검사하지 않았다는 한계를 남깁니다.

### 제공 입력


```text
입력:23.9 /24.0 /24.1 /None /0.0.
각 행: 기대 상태 / 실제 상태 / 일치 여부 / 이 사례가 필요한 이유.
```


### 학생 적용

1. 24.0 초과 규칙을 문장으로 적습니다.
2. 다섯 기대값을 먼저 채웁니다.
3. A05 호출값을 바꾸어 대조합니다.
4. 통과한 범위와 남은 입력 종류를 나눕니다.

예상 결과: 정상/정상/확인/미측정/정상과 판단 이유.

확인 질문: 20과 30만 확인하면 놓칠 수 있는 실수는 무엇인가요?

막혔을 때: 기대값이 애매하면 코드 대신 초과라는 업무 문구를 먼저 읽습니다.

[활동 자료와 작성칸](practice-guide.md#a06--예상-사례표로-함수-확인하기)에서 A06를 엽니다.

# 3구간 · 파일을 읽고 결과 저장

## A07 · 파일 경로와 텍스트 읽기

**개념.** 경로는 파일의 저장 주소입니다. 현재 터미널 폴더와 코드 폴더는 다를 수 있습니다. Path(__file__)로 코드 위치를 찾으면 그 위치를 기준으로 자료 주소를 만들 수 있습니다.

**왜 필요한가.** 터미널을 다른 곳에서 열어도 같은 자료를 읽도록 준비합니다. 긴 준비 줄을 외우기보다 code·work·data의 상대 배치를 이해하는 것이 목적입니다.

**함께 보는 예.** course/code 또는 course/work의 코드에서 parent.parent는 course입니다. 그 아래 data/notice.txt를 읽습니다. UTF-8은 한글을 글자로 해석하는 인코딩 약속입니다.

**헷갈리는 경우.** FileNotFoundError는 주소와 이름의 문제를 먼저 확인해야 합니다. 아직 파일을 읽지 못했는데 숫자 변환을 수정해도 원인을 해결하지 못합니다.

### 전체 코드


```python
from pathlib import Path
base = Path(__file__).resolve().parent.parent
source = base / "data" / "notice.txt"
text = source.read_text(encoding="utf-8")
print(text.strip())
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `from pathlib import Path` | 파일 주소 도구를 가져옵니다. |
| 2 | `base = Path(__file__).resolve().parent.parent` | 코드의 두 상위 폴더 course를 찾습니다. |
| 3 | `source = base / "data" / "notice.txt"` | 입력 파일 주소를 만듭니다. |
| 4 | `text = source.read_text(encoding="utf-8")` | UTF-8 텍스트를 읽습니다. |
| 5 | `print(text.strip())` | 앞뒤 공백과 줄바꿈을 정리해 출력합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A07_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A07_example.py
```

원본 코드의 예상 출력:


```text
센서 점검 예제입니다.
```


### 학생 적용

1. code·work·data 배치를 그립니다.
2. 실제 파일명을 확인합니다.
3. 같은 코드가 다른 현재 위치에서도 읽는지 비교합니다.
4. 없는 파일의 오류와 내용 오류를 구별합니다.

예상 결과: 안내 한 줄 출력. 없는 파일명은 FileNotFoundError.

확인 질문: data만 다른 곳으로 옮겨도 자동으로 찾나요?

막혔을 때: 압축 안에서 열었는지, 확장자가 두 번 붙었는지, course의 배치가 유지됐는지 확인합니다.

[활동 자료와 작성칸](practice-guide.md#a07--파일-경로와-텍스트-읽기)에서 A07를 엽니다.

## A08 · CSV를 이름표가 있는 행으로 읽기

**개념.** csv.DictReader는 헤더를 키로 삼아 각 데이터 행을 딕셔너리로 읽습니다. 기본 셀값은 문자열이므로 온도 계산 전에 의미에 맞는 해석이 필요합니다.

**왜 필요한가.** 열 번호를 외우기보다 temperature_c라는 이름으로 읽으면 처리할 항목이 드러납니다. 실제 헤더가 약속과 맞아야 같은 이름으로 읽을 수 있습니다.

**함께 보는 예.** 입력은 S01의 22.5,S02의 25.0,S03의 빈 온도,S04의 0.0 네 건입니다. 첫 온도의 화면 모양은 숫자 같지만 type은 str입니다.

**헷갈리는 경우.** 헤더를 temperature로 바꾸면 temperature_c라는 키가 저절로 생기지 않습니다. DictReader가 업무상 비슷한 단어를 연결하지 않습니다.

### 전체 코드


```python
import csv
from pathlib import Path
source = Path(__file__).resolve().parent.parent / "data" / "readings.csv"
with source.open(encoding="utf-8", newline="") as file:
    rows = list(csv.DictReader(file))
print(len(rows))
print(rows[0]["sensor_id"])
print(rows[0]["temperature_c"], type(rows[0]["temperature_c"]).__name__)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `import csv` | CSV 표준 도구를 가져옵니다. |
| 2 | `from pathlib import Path` | 파일 주소 도구를 가져옵니다. |
| 3 | `source = Path(__file__).resolve().parent.parent / "data" / "readings.csv"` | 기초 CSV 주소를 만듭니다. |
| 4 | `with source.open(encoding="utf-8", newline="") as file:` | 인코딩과 CSV 줄바꿈 설정으로 엽니다. |
| 5 | `    rows = list(csv.DictReader(file))` | 각 행을 헤더 이름의 딕셔너리로 읽습니다. |
| 6 | `print(len(rows))` | 데이터 건수를 출력합니다. |
| 7 | `print(rows[0]["sensor_id"])` | 첫 기록의 센서명을 읽습니다. |
| 8 | `print(rows[0]["temperature_c"], type(rows[0]["temperature_c"]).__name__)` | 첫 온도와 실제 자료형을 출력합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A08_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A08_example.py
```

원본 코드의 예상 출력:


```text
4
S01
22.5 str
```


### 학생 적용

1. 헤더와 키의 대응을 표시합니다.
2. 헤더를 제외한 네 건을 셉니다.
3. 온도의 값 모양과 자료형을 나눠 적습니다.
4. 빈 온도가 어떤 문자열일지 예상합니다.

예상 결과: 4 / S01 /22.5 str. 헤더는 데이터가 아닙니다.

확인 질문: 빈 셀은 자동으로 None이 되나요?

막혔을 때: KeyError는 실제 헤더와 키를 비교합니다. 공백·인코딩도 실제 원문을 확인한 뒤 판단합니다.

[활동 자료와 작성칸](practice-guide.md#a08--csv를-이름표가-있는-행으로-읽기)에서 A08를 엽니다.

## A09 · JSON 결과를 새 파일로 저장하기

**개념.** json.dumps는 프로그램 값을 JSON 텍스트로 표현합니다. 그 텍스트를 경로에 써야 결과 파일이 생깁니다. 입력 읽기와 결과 저장은 별도 작업입니다.

**왜 필요한가.** 화면 출력만 있으면 다음 사람이 결과를 재사용하기 어렵습니다. 입력 원자료를 덮어쓰지 않도록 work의 결과 경로를 명확히 정합니다.

**함께 보는 예.** 건수 4와 미측정 1을 JSON으로 저장합니다. ensure_ascii=False는 한글을 읽기 쉬운 모양으로 남기고 indent=2는 들여쓰기를 넣습니다. 저장한 파일을 다시 읽어 값이 같은지 봅니다.

**헷갈리는 경우.** .json이라는 이름만으로 내용이 JSON이 되지는 않습니다. 딕셔너리 화면 문자열을 그대로 쓰기보다 JSON 변환 도구를 사용합니다.

### 전체 코드


```python
import json
from pathlib import Path
base = Path(__file__).resolve().parent.parent
summary = {"건수": 4, "미측정": 1}
text = json.dumps(summary, ensure_ascii=False, indent=2)
target = base / "work" / "output_summary.json"
target.write_text(text, encoding="utf-8")
loaded = json.loads(target.read_text(encoding="utf-8"))
print(loaded["건수"], loaded["미측정"])
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `import json` | JSON 도구를 가져옵니다. |
| 2 | `from pathlib import Path` | 주소 도구를 가져옵니다. |
| 3 | `base = Path(__file__).resolve().parent.parent` | course를 찾습니다. |
| 4 | `summary = {"건수": 4, "미측정": 1}` | 결과 객체를 만듭니다. |
| 5 | `text = json.dumps(summary, ensure_ascii=False, indent=2)` | JSON 텍스트로 표현합니다. |
| 6 | `target = base / "work" / "output_summary.json"` | work의 결과 주소를 정합니다. |
| 7 | `target.write_text(text, encoding="utf-8")` | UTF-8로 저장합니다. |
| 8 | `loaded = json.loads(target.read_text(encoding="utf-8"))` | 저장한 파일을 다시 읽어 해석합니다. |
| 9 | `print(loaded["건수"], loaded["미측정"])` | 다시 읽은 두 값을 확인합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A09_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A09_example.py
```

원본 코드의 예상 출력:


```text
4 1
```

작은 수정: `"건수": 4`를 `"건수": 5`로 바꿉니다.

수정 후 예상 출력:


```text
5 1
```


### 학생 적용

1. data와 work의 역할을 구별합니다.
2. 실행 후 output_summary.json을 엽니다.
3. 건수만 5로 바꾸고 다시 실행합니다.
4. 파일 저장 줄과 화면 출력 줄을 표시합니다.

예상 결과: 처음 4 1, 수정 후 5 1. 저장 파일의 숫자도 바뀝니다.

확인 질문: print와 write_text는 같은 행동인가요?

막혔을 때: 쓰기 권한이 없으면 강사와 저장 위치를 확인합니다. 원자료를 출력 주소로 바꾸지 않습니다.

[활동 자료와 작성칸](practice-guide.md#a09--json-결과를-새-파일로-저장하기)에서 A09를 엽니다.

# 4구간 · 오류를 단서로 읽기

## A10 · 미측정과 잘못된 숫자의 구별

**개념.** 빈값 규칙과 숫자 변환은 다른 단계입니다. 이 자료의 빈 온도는 미측정이므로 None으로 보존하고 숫자가 아닌 글자는 잘못된 입력으로 알립니다.

**왜 필요한가.** 모든 변환 실패를 None으로 바꾸면 누락과 잘못된 기록을 구별하지 못합니다. 원문과 실패 이유를 남겨야 확인 요청을 할 수 있습니다.

**함께 보는 예.** 빈 문자열은 None, "0.0"은 숫자 0.0, "뜨거움"은 ValueError입니다. 먼저 빈 문자열인지 확인하고 나머지에 숫자 변환을 적용합니다.

**헷갈리는 경우.** 빈 문자열을 0으로 대신 채우면 미측정을 실제 0℃로 바꿉니다. 계산을 편하게 하려고 확인되지 않은 값을 보충하지 않습니다.

### 전체 코드


```python
def parse_temperature(raw):
    if raw == "":
        return None
    return float(raw)
print(parse_temperature("22.5"))
print(parse_temperature(""))
print(parse_temperature("0.0"))
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `def parse_temperature(raw):` | 원문 온도를 해석하는 함수를 정의합니다. |
| 2 | `    if raw == "":` | 빈 문자열 여부를 확인합니다. |
| 3 | `        return None` | 계약에 따라 None을 반환합니다. |
| 4 | `    return float(raw)` | 나머지를 숫자로 변환합니다. |
| 5 | `print(parse_temperature("22.5"))` | 일반 숫자를 확인합니다. |
| 6 | `print(parse_temperature(""))` | 미측정을 확인합니다. |
| 7 | `print(parse_temperature("0.0"))` | 실제 0을 확인합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A10_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A10_example.py
```

원본 코드의 예상 출력:


```text
22.5
None
0.0
```


### 학생 적용

1. 원문·반환값·업무 의미를 표로 적습니다.
2. 뜨거움과 빈칸의 차이를 설명합니다.
3. 오류 원문과 종류를 기록합니다.
4. 실제값이 미확인일 때 남길 질문을 씁니다.

예상 결과: 22.5/None/0.0을 구별하며 글자는 ValueError.

확인 질문: 잘못된 숫자를 미측정으로 바꾸면 무엇을 잃나요?

막혔을 때: None과 문자열 "None"은 다릅니다. 후자는 숫자로 읽으면 실패합니다.

[활동 자료와 작성칸](practice-guide.md#a10--미측정과-잘못된-숫자의-구별)에서 A10를 엽니다.

## A11 · 오류의 위치·종류·원값

**개념.** 오류 기록은 실패한 파일과 줄, 오류 종류, 관련 값의 단서를 보여 줍니다. traceback은 호출 경로를 나타내며 마지막 줄에서 오류 종류와 설명을 찾습니다.

**왜 필요한가.** 파일 없음·키 없음·숫자 변환 실패는 다음 행동이 다릅니다. 이름만 암기하기보다 실패한 작업과 입력을 연결합니다.

**함께 보는 예.** FileNotFoundError는 주소, KeyError는 헤더와 키, ValueError는 숫자로 해석하려던 원문을 확인합니다. 근거를 보기 전에 전체 코드를 교체하지 않습니다.

**헷갈리는 경우.** float(raw)에서 실패했다고 float 도구 자체가 잘못된 것은 아닐 수 있습니다. 숫자 자리에 ‘뜨거움’이 들어온 입력 문제를 확인해야 합니다.

### 제공 입력


```text
카드1: source.read_text() / FileNotFoundError / missing.csv
카드2: row['temperature_c'] / KeyError / temperature_c
카드3: float('뜨거움') / ValueError / could not convert string to float
```


### 학생 적용

1. 실패 작업·종류·경로 또는 값을 표시합니다.
2. 사실과 추정 원인을 나눕니다.
3. 다음 확인 동작을 하나씩 정합니다.
4. 오류 단서를 보존한 전달 기록을 씁니다.

예상 결과: 주소·헤더·원값 확인을 구별합니다.

확인 질문: ValueError면 모두 같은 값으로 고쳐도 되나요?

막혔을 때: 명령·관련 줄·마지막 오류를 남깁니다. 길다는 이유로 단서를 모두 지우지 않습니다.

[활동 자료와 작성칸](practice-guide.md#a11--오류의-위치종류원값)에서 A11를 엽니다.

## A12 · try와 except로 예상 오류 기록

**개념.** try에는 실패할 수 있는 작업을 쓰고 except에는 특정 예외가 났을 때 할 일을 씁니다. 오류를 처리하는 일은 문제를 없던 일로 만드는 것이 아니라 기록과 다음 행동을 정하는 일입니다.

**왜 필요한가.** 한 값이 잘못되어도 원문과 이유를 남길 수 있습니다. 다룰 오류 종류를 좁히면 예상하지 못한 문제를 숨기지 않습니다.

**함께 보는 예.** ‘뜨거움’을 float로 읽으면 ValueError가 납니다. 그때 원문과 확인 필요 메시지를 출력합니다. 정상값 24.0을 주면 숫자를 출력합니다.

**헷갈리는 경우.** except: pass로 모든 오류를 무시하면 어떤 기록이 사라졌는지 모릅니다. 이 코드는 ValueError만 다루며 모든 오류를 복구한다고 설명하지 않습니다.

### 전체 코드


```python
raw = "뜨거움"
try:
    value = float(raw)
    print(value)
except ValueError:
    print("숫자 확인 필요:", raw)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `raw = "뜨거움"` | 수치로 읽을 원문입니다. |
| 2 | `try:` | 실패 가능 작업을 시작합니다. |
| 3 | `    value = float(raw)` | 숫자로 해석합니다. |
| 4 | `    print(value)` | 성공한 숫자를 출력합니다. |
| 5 | `except ValueError:` | 변환 오류의 처리 묶음입니다. |
| 6 | `    print("숫자 확인 필요:", raw)` | 문제 원문을 포함해 메시지를 남깁니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A12_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A12_example.py
```

원본 코드의 예상 출력:


```text
숫자 확인 필요: 뜨거움
```

작은 수정: `"뜨거움"`를 `"24.0"`로 바꿉니다.

수정 후 예상 출력:


```text
24.0
```


### 학생 적용

1. 성공과 오류의 실행 줄을 표시합니다.
2. raw를 24.0으로 바꿔 비교합니다.
3. 오류 기록과 실제값 확정을 구별합니다.
4. 원문을 메시지에 남긴 이유를 설명합니다.

예상 결과: 오류는 확인 필요, 정상값은 24.0 출력.

확인 질문: except를 실행하면 실제 온도를 알아낸 것인가요?

막혔을 때: 오류를 숨기려고 except의 범위를 무조건 넓히지 않습니다.

[활동 자료와 작성칸](practice-guide.md#a12--try와-except로-예상-오류-기록)에서 A12를 엽니다.

# 5구간 · 검사 규칙과 재확인

## A13 · 범위 규칙을 함수에서 확인하기

**개념.** 숫자로 변환할 수 있다는 것과 허용 범위 안에 있다는 것은 다른 검사입니다. 값이 0~50인지 확인하고 벗어나면 이유를 예외로 알립니다.

**왜 필요한가.** 51.0은 숫자이므로 float는 성공하지만 실습 입력 규칙에는 맞지 않습니다. 변환과 규칙 검사를 분리하여 읽어야 합니다.

**함께 보는 예.** 23.5는 반환하고 51.0은 범위 확인 필요를 알립니다.0과 50은 허용 경계입니다. 이 범위는 실습의 입력 약속이며 실제 장비 안전 기준이 아닙니다.

**헷갈리는 경우.** 51.0을 자동으로 50으로 자르면 원자료를 바꿉니다. 실제값을 모르면 원문을 보존하고 확인 요청을 남깁니다.

### 전체 코드


```python
def checked_temperature(raw):
    value = float(raw)
    if value < 0 or value > 50:
        raise ValueError("범위 확인 필요")
    return value
print(checked_temperature("23.5"))
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `def checked_temperature(raw):` | 수치 원문을 검사하는 함수를 정의합니다. |
| 2 | `    value = float(raw)` | 숫자로 해석합니다. |
| 3 | `    if value < 0 or value > 50:` | 아래 또는 위 경계를 벗어나는지 묻습니다. |
| 4 | `        raise ValueError("범위 확인 필요")` | 범위 문제를 예외로 알립니다. |
| 5 | `    return value` | 허용 숫자를 반환합니다. |
| 6 | `print(checked_temperature("23.5"))` | 정상 입력으로 확인합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A13_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A13_example.py
```

원본 코드의 예상 출력:


```text
23.5
```

작은 수정: `"23.5"`를 `"50"`로 바꿉니다.

수정 후 예상 출력:


```text
50.0
```


### 학생 적용

1. 변환과 범위 검사를 표시합니다.
2. 0·50·51.0의 기대 결과를 씁니다.
3. 경계와 오류 입력을 비교합니다.
4. 원문과 확인 이유를 남깁니다.

예상 결과: 0·50은 허용하고 51.0은 범위 오류입니다.

확인 질문: 범위 통과가 실제 센서 정확도를 증명하나요?

막혔을 때: or를 and로 바꿨다면 두 조건의 뜻을 읽습니다. 동시에 0보다 작고 50보다 큰 값은 찾을 수 없습니다.

[활동 자료와 작성칸](practice-guide.md#a13--범위-규칙을-함수에서-확인하기)에서 A13를 엽니다.

## A14 · 한 값 수정 뒤 같은 사례 재확인

**개념.** 수정 검증은 확인된 근거로 한 부분을 바꾸고 실패 사례와 기존 성공 사례를 다시 확인하는 일입니다. 오류가 사라졌는지뿐 아니라 원래 의미가 유지되는지 봅니다.

**왜 필요한가.** 한 문제를 고치며 미측정을 0으로 바꾸거나 경계를 바꿀 수 있습니다. 원문·지시·수정 위치·재확인을 함께 남겨야 이유가 전달됩니다.

**함께 보는 예.** 지시서에서 S05의 ‘뜨거움’은 23.5로 확정되었고 S06의 51.0은 미확인입니다. 전자는 근거로 수정하고 후자는 원문 이슈로 남깁니다.

**헷갈리는 경우.** 문제가 두 건이라고 둘 다null로 바꾸면 잘못된 숫자와 미측정을 합칩니다. 확인된 수정과 미확인 보류를 구별합니다.

### 제공 입력


```text
확정 지시: S05 10:05는23.5℃로 확인됨.
미확정: S06 10:05의51.0은 실제값미확인.
재확인: 정상22.5 / 빈칸 / 실제0.0 / 경계50.
```


### 학생 적용

1. 확정과 미확정 지시를 나눕니다.
2. work/correction_notes.md에 전후값과 근거를 씁니다.
3. work/bad_readings_work.csv에서 S05 한 값만 고칩니다.
4. 정상·미측정·0·범위의 재확인 표를 작성합니다.

예상 결과: S05만 23.5로 수정하고 S06원문과 확인 이유를 남깁니다.

확인 질문: 이슈 건수만 줄면 좋은 수정인가요?

막혔을 때: 확정되지 않은 실제값은 추측하지 않습니다. 어느 값이 왜 미확인인지 씁니다.

[활동 자료와 작성칸](practice-guide.md#a14--한-값-수정-뒤-같은-사례-재확인)에서 A14를 엽니다.

## A15 · 입력·처리·출력의 실행 계약

**개념.** 실행 계약은 받을 입력 파일과 결과 파일의 위치·뜻을 정한 약속입니다. 함수의 입력·반환을 프로그램 전체의 파일 수준으로 확장합니다.

**왜 필요한가.** 원본과 수정 사본 중 무엇을 읽었는지 모르면 결과 대조가 틀릴 수 있습니다. 실행 완료와 데이터 이슈가 없다는 사실도 별도입니다.

**함께 보는 예.** 검사기는 data/bad_readings.csv를 읽고 work/check_summary.json과 check_issues.json을 만듭니다.6건 중 숫자·미측정 4건을 받아들이고 2건을 이슈로 남깁니다.

**헷갈리는 경우.** 정상 종료해도 이슈는 있을 수 있습니다. 여기서 종료 코드 0은 실행 완료를 뜻하며 입력 전체가 정확하다는 증명은 아닙니다.

### 제공 입력


```text
입력6건 → 수락4건+이슈2건.
수락4건 → 수치3건+미측정1건.
미측정은 평균에서 제외, 실제0은 포함.
```


### 학생 적용

1. 세 파일의 위치를 그립니다.
2. 미측정과 실제 0의 집계 차이를 적습니다.
3. 실행 완료와 이슈 0건을 구별합니다.
4. 다음 활동의 예상 건수를 먼저 기록합니다.

예상 결과: 전체 6,수락 4,이슈 2,미측정 1,수치 3.

확인 질문: 미측정도 분모에 넣어 4로 나누면 무엇이 바뀌나요?

막혔을 때: 전체=수락+이슈, 수락=수치+미측정의 두 관계를 나누어 확인합니다.

[활동 자료와 작성칸](practice-guide.md#a15--입력처리출력의-실행-계약)에서 A15를 엽니다.

# 6구간 · 로그 검사기와 사용 안내

## A16 · 로그 검사기 전체 흐름

**개념.** 검사기는 한 행씩 온도를 해석하여 정상 수치·미측정·이슈를 나눕니다. 함수는 한 값의 규칙을 담당하고 반복문은 여러 행에 같은 규칙을 적용합니다.

**왜 필요한가.** 함수·파일·예외를 하나의 업무에 연결합니다. 긴 코드는 준비·정의·행 처리·집계·저장으로 나눠 추적합니다. 전체를 암기하거나 빈 편집기에서 다시 작성하는 것이 목표는 아닙니다.

**함께 보는 예.** 실제 수치는 22.5·25.0·0.0으로 합 47.5,개수 3,평균 15.83입니다. 빈 온도 1건은 미측정,뜨거움과 51.0은 원문 이슈로 남깁니다.0도 실제 측정이므로 평균에 포함합니다.

**헷갈리는 경우.** 평균이 낮아 보인다는 이유로 0을 빼지 않습니다. 원문과 계약을 봅니다. 이 프로그램은 온도 규칙에 집중하며 모든 필드와 실제 측정의 진위를 검사하지 않습니다.

### 전체 코드


```python
import csv
import json
from pathlib import Path

def parse_temperature(raw):
    if raw == "":
        return None
    value = float(raw)
    if value < 0 or value > 50:
        raise ValueError("범위 확인 필요")
    return value

base = Path(__file__).resolve().parent.parent
source = base / "data" / "bad_readings.csv"
with source.open(encoding="utf-8", newline="") as file:
    rows = list(csv.DictReader(file))
numbers = []
issues = []
missing = 0
for row in rows:
    try:
        value = parse_temperature(row["temperature_c"])
    except ValueError:
        issues.append({"sensor_id": row["sensor_id"], "raw": row["temperature_c"]})
        continue
    if value is None:
        missing = missing + 1
    else:
        numbers.append(value)
average = None
if len(numbers) > 0:
    average = round(sum(numbers) / len(numbers), 2)
summary = {"input": len(rows), "accepted": len(numbers) + missing,
           "missing": missing, "issues": len(issues), "average": average}
(base / "work" / "check_summary.json").write_text(
    json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
(base / "work" / "check_issues.json").write_text(
    json.dumps(issues, ensure_ascii=False, indent=2), encoding="utf-8")
print(summary["input"], summary["accepted"], summary["missing"], summary["issues"])
print(summary["average"])
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `import csv` | CSV 도구를 가져옵니다. |
| 2 | `import json` | JSON 도구를 가져옵니다. |
| 3 | `from pathlib import Path` | 경로 도구를 가져옵니다. |
| 4 | `` | 정의 부분을 나누는 빈 줄입니다. |
| 5 | `def parse_temperature(raw):` | 온도 해석 함수를 정의합니다. |
| 6 | `    if raw == "":` | 빈칸인지 확인합니다. |
| 7 | `        return None` | 미측정을 반환합니다. |
| 8 | `    value = float(raw)` | 숫자로 변환합니다. |
| 9 | `    if value < 0 or value > 50:` | 범위를 확인합니다. |
| 10 | `        raise ValueError("범위 확인 필요")` | 범위 문제를 알립니다. |
| 11 | `    return value` | 유효 숫자를 반환합니다. |
| 12 | `` | 정의와 실행을 나눕니다. |
| 13 | `base = Path(__file__).resolve().parent.parent` | course 주소를 정합니다. |
| 14 | `source = base / "data" / "bad_readings.csv"` | 입력 파일을 선택합니다. |
| 15 | `with source.open(encoding="utf-8", newline="") as file:` | 입력 파일을 엽니다. |
| 16 | `    rows = list(csv.DictReader(file))` | 헤더 키로 행을 읽습니다. |
| 17 | `numbers = []` | 숫자 목록을 준비합니다. |
| 18 | `issues = []` | 이슈 목록을 준비합니다. |
| 19 | `missing = 0` | 미측정 개수를 준비합니다. |
| 20 | `for row in rows:` | 한 행씩 처리합니다. |
| 21 | `    try:` | 해석을 시도합니다. |
| 22 | `        value = parse_temperature(row["temperature_c"])` | 이번 온도 원문을 함수에 줍니다. |
| 23 | `    except ValueError:` | 변환·범위 오류를 처리합니다. |
| 24 | `        issues.append({"sensor_id": row["sensor_id"], "raw": row["temperature_c"]})` | 센서명과 원문을 이슈로 보존합니다. |
| 25 | `        continue` | 다음 행으로 넘어갑니다. |
| 26 | `    if value is None:` | 미측정을 구별합니다. |
| 27 | `        missing = missing + 1` | 미측정 개수를 늘립니다. |
| 28 | `    else:` | 숫자인 경우입니다. |
| 29 | `        numbers.append(value)` | 수치 목록에 넣습니다. |
| 30 | `average = None` | 수치가 없을 때의 평균을 준비합니다. |
| 31 | `if len(numbers) > 0:` | 숫자가 있을 때만 계산합니다. |
| 32 | `    average = round(sum(numbers) / len(numbers), 2)` | 실제 수치 개수로 나누어 반올림합니다. |
| 33 | `summary = {"input": len(rows), "accepted": len(numbers) + missing,` | 입력·수락 건수로 요약을 시작합니다. |
| 34 | `           "missing": missing, "issues": len(issues), "average": average}` | 미측정·이슈·평균을 포함합니다. |
| 35 | `(base / "work" / "check_summary.json").write_text(` | 요약 파일 쓰기를 시작합니다. |
| 36 | `    json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")` | JSON과 UTF-8로 저장합니다. |
| 37 | `(base / "work" / "check_issues.json").write_text(` | 이슈 파일 쓰기를 시작합니다. |
| 38 | `    json.dumps(issues, ensure_ascii=False, indent=2), encoding="utf-8")` | 이슈 원문을 JSON으로 저장합니다. |
| 39 | `print(summary["input"], summary["accepted"], summary["missing"], summary["issues"])` | 집계 네 개를 보여 줍니다. |
| 40 | `print(summary["average"])` | 평균 또는 None을 보여 줍니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A16_log_checker.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A16_log_checker.py
```

원본 코드의 예상 출력:


```text
6 4 1 2
15.83
```

작은 수정: `"bad_readings.csv"`를 `"readings.csv"`로 바꿉니다.

수정 후 예상 출력:


```text
4 4 1 0
15.83
```


### 학생 적용

1. 전체 코드를 역할별 다섯 구간으로 표시합니다.
2. 건수와 평균을 손으로 먼저 확인합니다.
3. 실행 뒤 결과 JSON 두 개를 엽니다.
4. 입력 파일명만 readings.csv로 바꿔 비교합니다.

예상 결과: 오류 포함 6/4/1/2,정상 4/4/1/0. 평균은 모두 15.83.

확인 질문: continue의 역할은 무엇인가요?

막혔을 때: 한 행의 원문→함수→분류를 먼저 추적합니다. 여러 곳을 동시에 바꾸지 않습니다.

[활동 자료와 작성칸](practice-guide.md#a16--로그-검사기-전체-흐름)에서 A16를 엽니다.

### 중간 확인과 다음 활동 합류

- 함께 확인할 증거: readings.csv의 정상 숫자 한 건과 missing_readings.csv의 미측정 한 건을 따라 읽고, 0은 숫자·미측정은 평균 대상이 아님을 설명합니다.
- 남은 작업: A16의 전체 구간 표시는 A16_notes.md, 네 입력 비교는 A17_notes.md에 미완료 항목을 표시하고 이어서 완성합니다. 이미 작성한 결과를 지우지 않습니다.
- 다음 입력: 제공된 work/A16_log_checker.py를 그대로 출발점으로 사용하고 A17에서 CSV 이름만 교체합니다. 실행이 막히면 solutions/A16_answer.md와 A17_answer.md의 제공 결과를 **관찰**로 기록하고 A18 인수인계에 미완료를 남깁니다.

## A17 · 정상·빈 입력·잘못된 입력 비교

**개념.** 검사기는 서로 다른 입력 집합으로 확인합니다. 헤더만 있는 파일, 전부 미측정인 파일, 숫자 오류가 있는 파일은 다른 경계 상황입니다.

**왜 필요한가.** 수치가 하나도 없으면 평균 분모가 0입니다. 평균 None은 계산할 수치가 없다는 결과이며 실제 평균 0.0과 의미가 다릅니다.

**함께 보는 예.** empty_readings.csv는 데이터 0건, missing_readings.csv는 미측정 2건입니다. 둘 다 평균 None이지만 입력수와 미측정수는 다릅니다.

**헷갈리는 경우.** None이면 모두 실패라고 판정하지 않습니다. 입력 조건에 따라 의도한 결과일 수 있습니다. 어떤 파일로 무엇을 확인했는지 기록합니다.

### 제공 입력


```text
readings.csv4건 / bad_readings.csv6건 / empty_readings.csv헤더만 / missing_readings.csv미측정2건.
work/A16_log_checker.py 안 source 줄의 따옴표 속 CSV 이름만 바꿉니다. .py 이름은 유지합니다.
```


### 학생 적용

1. 네 입력의 기대 집계표를 씁니다.
2. work/A16_log_checker.py 안 source 줄의 따옴표 속 CSV 이름만 바꿔(.py 이름은 유지) 같은 프로그램을 실행합니다.
3. 평균None의 이유와 집계 관계를 확인합니다.
4. 헤더·다른 필드·실제 진위는 미검증으로 기록합니다.

예상 결과: empty 0/0/0/0·None, missing 2/2/2/0·None.

확인 질문: 수치가 없을 때 평균 0을 쓰면 어떤 오해가 생기나요?

막혔을 때: 이전 실행 결과 파일을 새 결과로 혼동하지 않도록 입력명·저장·실행 경로를 확인합니다.

[활동 자료와 작성칸](practice-guide.md#a17--정상빈-입력잘못된-입력-비교)에서 A17를 엽니다.

### 검사할 CSV만 바꾸기

수정 파일은 `work/A16_log_checker.py`입니다. **.py 파일 이름은 그대로 둡니다.** 코드 안 `source = base / "data" / "bad_readings.csv"` 한 줄에서 따옴표 속 CSV 이름만 바꿉니다. 예: `source = base / "data" / "readings.csv"`.

저장 후 course 폴더에서 `python -X utf8 work/A16_log_checker.py`를 실행합니다. 실행마다 `work/check_summary.json`과 `work/check_issues.json`이 덮어써지므로 **결과를 먼저 기록한 뒤** 다음 CSV로 바꿉니다.

| 따옴표 속 입력 이름 | 예상 집계·평균 | 실제 집계·평균 | 직접 실행/제공 출력 관찰 | 차이와 근거 |
| --- | --- | --- | --- | --- |
| readings.csv | _____ | _____ | _____ | _____ |
| bad_readings.csv | _____ | _____ | _____ | _____ |
| empty_readings.csv | _____ | _____ | _____ | _____ |
| missing_readings.csv | _____ | _____ | _____ | _____ |

평균을 낼 숫자가 없다는 결과와 실제 측정 0을 구분해 설명합니다.

### 중간 확인과 다음 활동 합류

- 함께 확인할 증거: readings.csv의 정상 숫자 한 건과 missing_readings.csv의 미측정 한 건을 따라 읽고, 0은 숫자·미측정은 평균 대상이 아님을 설명합니다.
- 남은 작업: A16의 전체 구간 표시는 A16_notes.md, 네 입력 비교는 A17_notes.md에 미완료 항목을 표시하고 이어서 완성합니다. 이미 작성한 결과를 지우지 않습니다.
- 다음 입력: 제공된 work/A16_log_checker.py를 그대로 출발점으로 사용하고 A17에서 CSV 이름만 교체합니다. 실행이 막히면 solutions/A16_answer.md와 A17_answer.md의 제공 결과를 **관찰**로 기록하고 A18 인수인계에 미완료를 남깁니다.

## A18 · 검사기 사용 안내와 근거 전달

**개념.** 사용 안내는 다음 사람이 같은 입력으로 같은 결과를 확인할 수 있도록 쓰는 문서입니다. 파일·명령·기대 결과·이슈의 뜻·미확인 범위를 함께 전달합니다.

**왜 필요한가.** 작성자가 없어도 검사 범위를 오해하지 않게 해야 합니다. ‘검증 완료’보다 온도 변환·범위·미측정 구별을 검사했다고 구체적으로 씁니다.

**함께 보는 예.** 안내에는 course의 실행 명령, source가 읽는 입력명, work 결과 두 개, 이슈 원문을 확인하는 방법을 씁니다. 확정 근거가 있으면 작업 사본만 고치고 재확인합니다.

**헷갈리는 경우.** 모든 필드를 검사하거나 실제 센서 정확도를 보장한다고 주장하지 않습니다. 오늘은 로컬 합성 파일의 처리이며 외부 서비스로 전송하지 않습니다.

### 제공 입력


```text
작성칸: 목적 / 필요한 파일 / 명령 / 입력 선택 / 결과 위치 / 이슈 해석 / 수정 근거 / 미확인 범위.
```


### 학생 적용

1. work/usage.md에 실행 안내를 씁니다.
2. 짝이 입력 하나의 결과를 설명하게 합니다.
3. 빠진 경로와 계약을 보완합니다.
4. 코드·입력·요약·이슈·사례표를 함께 제출합니다.

예상 결과: 재현 가능한 경로·명령·결과와 검증 범위가 분명한 안내.

확인 질문: 이슈 0건이라는 결과만 남기면 무엇이 부족한가요?

막혔을 때: 처음 실행 순서와 오류 확인 순서를 나눠 씁니다. 미확인 사실을 확정하지 않습니다.

[활동 자료와 작성칸](practice-guide.md#a18--검사기-사용-안내와-근거-전달)에서 A18를 엽니다.

## 공식 참고자료

- [controlflow.html](https://docs.python.org/3/tutorial/controlflow.html)
- [inputoutput.html](https://docs.python.org/3/tutorial/inputoutput.html)
- [errors.html](https://docs.python.org/3/tutorial/errors.html)
- [csv.html](https://docs.python.org/3/library/csv.html)
- [json.html](https://docs.python.org/3/library/json.html)
- [pathlib.html](https://docs.python.org/3/library/pathlib.html)

공식 동작은 2026-09-26 확인했습니다. 자체 합성 사례로 설명하며 현재 교실 환경이나 학습 효과를 실측한 결과는 아닙니다.
