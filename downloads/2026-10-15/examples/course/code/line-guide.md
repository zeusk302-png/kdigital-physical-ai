# Python 심화 · 함수와 파일 검사

2026-10-15 · Python 심화

전날의 변수·조건·반복을 다시 읽고 반복 업무를 함수로 묶습니다. CSV를 읽어 JSON 결과를 저장하며 미측정과 잘못된 값을 구별하는 작은 로그 검사기를 사용하고 검수합니다.

계정이나 실제 장비 없이 합성 자료로 진행합니다.

각 코드의 전체 내용, 모든 줄의 의미와 전체 예상 출력을 모았습니다. work 사본을 수정하며 원본 code는 그대로 둡니다.

## A02 · def로 정의하고 이름으로 호출하기

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


오류 해결: 본문 출력이 예상과 다르면 print가 함수 안에 들여써져 있는지 확인합니다.
## A03 · 매개변수와 실제 인자

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


오류 해결: 받을 값 개수와 전달한 값 개수·순서를 비교합니다.
## A04 · print와 return의 차이

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


오류 해결: None이 보이면 return이 있는지, 특정 경로에서 반환 없이 끝나는지 확인합니다.
## A05 · 조건을 담은 상태 함수

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


오류 해결: 미측정 오류는 숫자 비교보다 None 검사가 앞인지 확인합니다.
## A07 · 파일 경로와 텍스트 읽기

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


오류 해결: 압축 안에서 열었는지, 확장자가 두 번 붙었는지, course의 배치가 유지됐는지 확인합니다.
## A08 · CSV를 이름표가 있는 행으로 읽기

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


오류 해결: KeyError는 실제 헤더와 키를 비교합니다. 공백·인코딩도 실제 원문을 확인한 뒤 판단합니다.
## A09 · JSON 결과를 새 파일로 저장하기

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


오류 해결: 쓰기 권한이 없으면 강사와 저장 위치를 확인합니다. 원자료를 출력 주소로 바꾸지 않습니다.
## A10 · 미측정과 잘못된 숫자의 구별

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


오류 해결: None과 문자열 "None"은 다릅니다. 후자는 숫자로 읽으면 실패합니다.
## A12 · try와 except로 예상 오류 기록

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


오류 해결: 오류를 숨기려고 except의 범위를 무조건 넓히지 않습니다.
## A13 · 범위 규칙을 함수에서 확인하기

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


오류 해결: or를 and로 바꿨다면 두 조건의 뜻을 읽습니다. 동시에 0보다 작고 50보다 큰 값은 찾을 수 없습니다.
## A16 · 로그 검사기 전체 흐름

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


오류 해결: 한 행의 원문→함수→분류를 먼저 추적합니다. 여러 곳을 동시에 바꾸지 않습니다.
