# 작은 완성 코드 네 개 · 모든 줄과 실제 출력

이 코드는 배포한 자료를 읽거나 작은 값을 관찰하는 예제입니다. 함수·반복문·내포를 처음 작성하지 않습니다. 웹 편집 화면은 Python 실행기가 아닙니다.

Python이 준비된 PC에서 foundations 폴더를 기준으로 `python -X utf8 code/A07_types.py`처럼 실행합니다. 수정 복사본은 `python -X utf8 work/A07_types.py`처럼 work 경로를 지정합니다. 읽기 코드는 data·code·work 폴더 배치를 유지하면 다른 현재 폴더에서 실행해도 입력을 찾습니다.

`type(...).__name__`은 종류를 관찰하기 위한 제공 표현입니다. 뜻을 읽으며 사용하고 외워서 새로 작성할 필요는 없습니다. JSON은 number를 하나의 범주로 제공하며 Python의 int·float와 동일한 분류 체계는 아닙니다.

## A07_types.py

```python
employee_id = "001"
temperature = 22.5
active = True
measured_at = "2026-10-08 10:00"
print(employee_id, type(employee_id).__name__)
print(temperature, type(temperature).__name__)
print(active, type(active).__name__)
print(measured_at, type(measured_at).__name__)
print(22, type(22).__name__)
print("22.5", type("22.5").__name__)
```

| 줄 | 뜻 |
| ---: | --- |
| 1 | employee_id라는 이름에 글자 001을 연결합니다. 따옴표 덕분에 앞의 0도 보존합니다. |
| 2 | temperature에 소수가 있는 숫자 22.5를 연결합니다. |
| 3 | active에 참을 뜻하는 Python 불리언 True를 연결합니다. |
| 4 | 시각 의미가 있는 값을 이 코드에서는 문자열로 저장합니다. 날짜 전용 자료형을 만든 줄이 아닙니다. |
| 5 | 식별자 값과 종류 이름을 출력합니다. type은 종류를 확인하고 __name__은 그 종류의 이름을 보여 줍니다. 쉼표로 나눈 두 출력 사이에는 공백이 붙습니다. |
| 6 | 온도 값과 float라는 종류 이름을 출력합니다. |
| 7 | 가동 상태와 bool이라는 종류 이름을 출력합니다. |
| 8 | 날짜 글자와 str이라는 종류 이름을 출력합니다. |
| 9 | 정수 22의 값과 int라는 종류 이름을 출력합니다. |
| 10 | 따옴표 안 22.5와 str이라는 종류 이름을 출력합니다. 화면의 숫자 모양만으로 자료형을 구별하지 않습니다. |

실제 실행한 원본 코드의 전체 출력:

```text
001 str
22.5 float
True bool
2026-10-08 10:00 str
22 int
22.5 str
```

학생 수정: employee_id의 "001"만 "002"로 바꿉니다. 첫 출력은 `002 str`로 달라지고 나머지는 같습니다.

## A11_structures.py

```python
temperatures = [22.5, 24.0, 23.5]
reading = {"sensor_id": "S01", "temperature_c": 22.5}
print(temperatures[0])
print(len(temperatures))
print(reading["sensor_id"])
print(reading["temperature_c"])
temperatures[1] = 25.0
print(temperatures[1])
```

| 줄 | 뜻 |
| ---: | --- |
| 1 | 대괄호로 세 온도를 순서가 있는 리스트에 담습니다. 항목은 쉼표로 구분합니다. |
| 2 | 중괄호로 항목 이름과 값의 딕셔너리를 만듭니다. 콜론은 키와 값을 연결하고 쉼표는 두 쌍을 구분합니다. |
| 3 | 대괄호 안 위치 번호 0으로 첫 온도를 찾아 출력합니다. 번호는 0부터 시작합니다. |
| 4 | len은 리스트에 들어 있는 값의 개수를 알려 줍니다. 여기서는 3입니다. |
| 5 | 대괄호 안 문자열 키 sensor_id로 S01을 찾아 출력합니다. |
| 6 | temperature_c 키로 연결된 온도 22.5를 찾아 출력합니다. |
| 7 | 위치 번호 1인 둘째 온도만 25.0으로 바꿉니다. 항목 개수는 유지됩니다. |
| 8 | 바뀐 둘째 온도를 출력합니다. |

실제 실행한 원본 코드의 전체 출력:

```text
22.5
3
S01
22.5
25.0
```

학생 수정: 7행의 25.0만 26.0으로 바꿉니다. 마지막 출력만 `26.0`이 됩니다.

## A16_read_csv.py

```python
import csv
from pathlib import Path
source = Path(__file__).resolve().parent.parent / "data" / "base_readings.csv"
with source.open(encoding="utf-8", newline="") as file:
    rows = list(csv.reader(file))
print(rows[0])
print(rows[1])
print(rows[1][2], type(rows[1][2]).__name__)
```

| 줄 | 뜻 |
| ---: | --- |
| 1 | CSV의 따옴표와 구분자를 읽는 표준 모듈 csv를 가져옵니다. 새 설치가 필요하지 않습니다. |
| 2 | 파일 위치를 다루는 표준 도구 Path를 가져옵니다. |
| 3 | 이 코드 파일의 실제 위치에서 두 단계 위 foundations 폴더를 찾고 data/base_readings.csv를 지정합니다. __file__은 현재 코드 파일 경로, parent는 위 폴더입니다. /는 이 표현에서 경로 조각을 잇습니다. |
| 4 | UTF-8로 파일을 엽니다. newline=""은 csv 도구가 줄바꿈을 처리하도록 맡깁니다. with는 아래 들여쓴 작업 뒤 파일을 닫도록 하는 완성 문법입니다. |
| 5 | 앞의 네 칸 들여쓰기는 파일을 연 동안 수행할 구간임을 나타냅니다. csv.reader가 읽은 각 행을 list로 모읍니다. 새 반복문을 작성하는 줄은 아닙니다. |
| 6 | 위치 번호 0의 행, 즉 헤더 목록을 출력합니다. |
| 7 | 위치 번호 1의 행, 즉 첫 데이터 기록의 목록을 출력합니다. |
| 8 | 첫 기록의 위치 번호 2인 온도 필드와 그 자료형 이름을 출력합니다. 이 reader는 필드를 문자열로 읽습니다. |

실제 실행한 원본 코드의 전체 출력:

```text
['sensor_id', 'location', 'temperature_c', 'measured_at', 'active']
['S01', '입구', '22.5', '2026-10-08 10:00', 'true']
22.5 str
```

## A20_read_json.py

```python
import json
from pathlib import Path
source = Path(__file__).resolve().parent.parent / "data" / "nested_sensor.json"
data = json.loads(source.read_text(encoding="utf-8"))
print(data["sensor"]["sensor_id"])
print(data["readings"][0]["temperature_c"], type(data["readings"][0]["temperature_c"]).__name__)
print(data["readings"][1]["temperature_c"], type(data["readings"][1]["temperature_c"]).__name__)
print(data["readings"][0]["active"], type(data["readings"][0]["active"]).__name__)
```

| 줄 | 뜻 |
| ---: | --- |
| 1 | JSON을 읽는 Python 표준 모듈 json을 가져옵니다. 새 설치가 필요하지 않습니다. |
| 2 | 파일 경로를 다루는 표준 도구 Path를 가져옵니다. |
| 3 | 코드 파일 위치를 기준으로 foundations/data/nested_sensor.json을 지정합니다. 터미널의 현재 폴더가 달라도 이 상대 배치가 유지되면 찾을 수 있습니다. |
| 4 | 파일을 UTF-8 문자열로 읽고 json.loads가 그 JSON 문장을 Python 객체로 해석합니다. 여기서 loads의 s는 문자열을 읽는 쪽이라고 기억하면 됩니다. |
| 5 | 바깥 sensor 키 다음 안쪽 sensor_id 키를 따라가 S02를 출력합니다. |
| 6 | readings 목록의 0번 객체에서 온도를 찾고 값과 Python 종류를 출력합니다. 원문 number 24.0은 기본 해석에서 float가 됩니다. |
| 7 | readings의 1번 온도를 찾습니다. JSON null은 Python None으로 읽히며 종류 이름은 NoneType입니다. |
| 8 | 첫 관찰의 가동 상태를 출력합니다. JSON true는 Python True가 되고 종류 이름은 bool입니다. |

실제 실행한 원본 코드의 전체 출력:

```text
S02
24.0 float
None NoneType
True bool
```
