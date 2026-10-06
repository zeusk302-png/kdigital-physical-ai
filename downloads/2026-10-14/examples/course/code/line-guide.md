# Python 기초 · 값과 실행 흐름

2026-10-14 · Python 기초

10/8에 읽었던 온도와 식별자를 Python 값으로 옮깁니다. 파일 저장과 실행을 구별하고 변수·자료형·연산·조건·반복을 짧은 코드에서 확인한 뒤 수업용 점검표를 완성합니다.

계정이나 실제 장비 없이 합성 자료로 진행합니다.

각 코드의 전체 내용, 모든 줄의 의미와 전체 예상 출력을 모았습니다. work 사본을 수정하며 원본 code는 그대로 둡니다.

## A02 · 첫 출력과 주석

### 전체 코드


```python
# 화면에 수업 시작을 표시합니다.
print("Python 점검 시작")
print("S01", 22.5)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `# 화면에 수업 시작을 표시합니다.` | 사람을 위한 설명이며 실행 결과를 만들지 않습니다. |
| 2 | `print("Python 점검 시작")` | 문자열 한 개를 화면에 보여 줍니다. |
| 3 | `print("S01", 22.5)` | 문자열과 숫자를 쉼표로 나누어 한 줄에 출력합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A02_print.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A02_print.py
```

원본 코드의 예상 출력:


```text
Python 점검 시작
S01 22.5
```

작은 수정: `Python 점검 시작`를 `오늘의 점검 시작`로 바꿉니다.

수정 후 예상 출력:


```text
오늘의 점검 시작
S01 22.5
```


오류 해결: python을 찾지 못하면 설치를 혼자 진행하지 말고 강사에게 환경을 확인합니다. 그동안 제공된 출력과 수정안을 비교하고 개인 실행 미완료를 표시합니다.
## A04 · 변수는 값에 붙인 이름

### 전체 코드


```python
location = "입구"
temperature_c = 22.5
print(location)
print(temperature_c)
print("location")
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `location = "입구"` | 장소 문자열을 location이라는 이름에 연결합니다. |
| 2 | `temperature_c = 22.5` | 숫자 22.5를 temperature_c라는 이름에 연결합니다. |
| 3 | `print(location)` | 이름이 가리키는 장소 값을 보여 줍니다. |
| 4 | `print(temperature_c)` | 이름이 가리키는 온도 값을 보여 줍니다. |
| 5 | `print("location")` | 따옴표 안의 글자 location을 그대로 보여 줍니다. |

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
입구
22.5
location
```

작은 수정: `입구`를 `창고`로 바꿉니다.

수정 후 예상 출력:


```text
창고
22.5
location
```


오류 해결: NameError가 나오면 대문자·소문자와 밑줄을 비교하고 그 이름에 값을 연결한 줄이 먼저 실행되는지 확인합니다.
## A05 · 다시 대입하면 현재 값이 바뀐다

### 전체 코드


```python
temperature_c = 22.5
print(temperature_c)
temperature_c = 24.0
print(temperature_c)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `temperature_c = 22.5` | 처음 온도를 22.5로 정합니다. |
| 2 | `print(temperature_c)` | 현재 값을 출력합니다. |
| 3 | `temperature_c = 24.0` | 같은 이름에 새 값 24.0을 연결합니다. |
| 4 | `print(temperature_c)` | 새로 연결된 현재 값을 출력합니다. |

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
22.5
24.0
```

작은 수정: `24.0`를 `25.0`로 바꿉니다.

수정 후 예상 출력:


```text
22.5
25.0
```


오류 해결: 값이 예상과 다르면 실행 순서대로 현재 값을 다시 써 봅니다. 편집기의 위치와 실제 실행 순서를 건너뛰지 않습니다.
## A06 · 이름 오류를 근거로 고치기

### 전체 코드


```python
sensor_id = "S01"
temperature_c = 22.5
print(sensor_id, temperature_c)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `sensor_id = "S01"` | 센서를 구별할 문자열을 정합니다. |
| 2 | `temperature_c = 22.5` | 섭씨 온도 값을 정합니다. |
| 3 | `print(sensor_id, temperature_c)` | 두 이름이 가리키는 값을 함께 출력합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A06_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A06_example.py
```

원본 코드의 예상 출력:


```text
S01 22.5
```


오류 해결: 철자 차이를 찾지 못하면 이름을 한 글자씩 비교합니다. 영문 대소문자와 밑줄도 이름의 일부입니다.
## A07 · 숫자 더하기와 문자열 연결

### 전체 코드


```python
count = 3
text_count = "3"
print(count + 2)
print(text_count + "2")
print(type(count).__name__, type(text_count).__name__)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `count = 3` | 숫자 3을 저장합니다. |
| 2 | `text_count = "3"` | 글자 3을 저장합니다. |
| 3 | `print(count + 2)` | 숫자끼리 덧셈합니다. |
| 4 | `print(text_count + "2")` | 문자열끼리 이어 붙입니다. |
| 5 | `print(type(count).__name__, type(text_count).__name__)` | 두 값의 자료형 이름을 확인합니다. |

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
5
32
int str
```


오류 해결: 화면에서 따옴표 없이 32가 보이면 type 출력도 함께 확인합니다. 표시 모양만으로 자료형을 판단하지 않습니다.
## A08 · 수치 문자열을 숫자로 변환하기

### 전체 코드


```python
raw = "22.5"
temperature_c = float(raw)
print(raw, type(raw).__name__)
print(temperature_c, type(temperature_c).__name__)
print(temperature_c + 1)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `raw = "22.5"` | 받은 원문 글자를 저장합니다. |
| 2 | `temperature_c = float(raw)` | 숫자로 해석한 결과를 새 이름에 연결합니다. |
| 3 | `print(raw, type(raw).__name__)` | 원문의 값과 문자열 자료형을 확인합니다. |
| 4 | `print(temperature_c, type(temperature_c).__name__)` | 변환 결과와 실수 자료형을 확인합니다. |
| 5 | `print(temperature_c + 1)` | 변환한 숫자에 1을 더합니다. |

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
22.5 str
22.5 float
23.5
```

작은 수정: `"22.5"`를 `"24.0"`로 바꿉니다.

수정 후 예상 출력:


```text
24.0 str
24.0 float
25.0
```


오류 해결: ValueError가 보이면 입력 문자열을 먼저 확인합니다. °C 같은 단위 글자가 붙었는지, 빈칸인지 구별하고 확인되지 않은 값을 만들어 채우지 않습니다.
## A09 · 연산과 괄호로 작은 계산 만들기

### 전체 코드


```python
total = 22.5 + 24.0 + 23.5
count = 3
average = total / count
print(total)
print(round(average, 2))
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `total = 22.5 + 24.0 + 23.5` | 확인된 온도 세 값의 합을 계산합니다. |
| 2 | `count = 3` | 계산에 사용한 값의 개수를 저장합니다. |
| 3 | `average = total / count` | 합을 개수로 나눕니다. |
| 4 | `print(total)` | 합계를 출력합니다. |
| 5 | `print(round(average, 2))` | 평균을 소수 둘째 자리까지 반올림해 출력합니다. |

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
70.0
23.33
```

작은 수정: `count = 3`를 `count = 2`로 바꿉니다.

수정 후 예상 출력:


```text
70.0
35.0
```


오류 해결: ZeroDivisionError가 생기면 분모가 왜 0인지 먼저 확인합니다. 임의로 1을 넣어 원인을 숨기지 않습니다.
## A10 · 비교 결과는 참 또는 거짓

### 전체 코드


```python
temperature_c = 24.0
limit = 24.0
print(temperature_c > limit)
print(temperature_c >= limit)
print(temperature_c == limit)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `temperature_c = 24.0` | 비교할 측정값을 정합니다. |
| 2 | `limit = 24.0` | 수업용 기준을 정합니다. |
| 3 | `print(temperature_c > limit)` | 기준을 초과했는지 묻습니다. |
| 4 | `print(temperature_c >= limit)` | 기준 이상인지 묻습니다. |
| 5 | `print(temperature_c == limit)` | 기준과 같은지 묻습니다. |

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
False
True
True
```

작은 수정: `temperature_c = 24.0`를 `temperature_c = 23.9`로 바꿉니다.

수정 후 예상 출력:


```text
False
False
False
```


오류 해결: True/False를 외우기보다 ‘왼쪽 값이 오른쪽 기준보다 큰가?’라는 질문을 실제 숫자로 다시 읽습니다.
## A11 · if와 else로 출력 선택하기

### 전체 코드


```python
temperature_c = 23.5
limit = 24.0
if temperature_c > limit:
    print("확인")
else:
    print("정상")
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `temperature_c = 23.5` | 측정값을 정합니다. |
| 2 | `limit = 24.0` | 수업용 비교 기준을 정합니다. |
| 3 | `if temperature_c > limit:` | 비교가 참인지 확인하고 아래 묶음을 선택합니다. |
| 4 | `    print("확인")` | 참일 때 확인을 출력합니다. |
| 5 | `else:` | 비교가 거짓인 경우의 묶음입니다. |
| 6 | `    print("정상")` | 거짓일 때 정상을 출력합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A11_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A11_example.py
```

원본 코드의 예상 출력:


```text
정상
```

작은 수정: `23.5`를 `25.0`로 바꿉니다.

수정 후 예상 출력:


```text
확인
```


오류 해결: IndentationError가 나면 콜론 다음 줄의 공백을 원본과 비교합니다. 탭과 공백을 혼용하지 않고 제공 예의 네 칸 공백을 유지합니다.
## A12 · 미측정과 경계값의 세 갈래

### 전체 코드


```python
temperature_c = None
if temperature_c is None:
    print("미측정")
elif temperature_c > 24.0:
    print("확인")
else:
    print("정상")
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `temperature_c = None` | 측정값이 없다는 상태를 정합니다. |
| 2 | `if temperature_c is None:` | 값 없음인지 먼저 확인합니다. |
| 3 | `    print("미측정")` | 값이 없으면 미측정이라고 출력합니다. |
| 4 | `elif temperature_c > 24.0:` | 값이 있을 때 기준 초과인지 확인합니다. |
| 5 | `    print("확인")` | 초과하면 확인을 출력합니다. |
| 6 | `else:` | 나머지 측정값을 처리합니다. |
| 7 | `    print("정상")` | 나머지는 정상으로 출력합니다. |

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
미측정
```

작은 수정: `temperature_c = None`를 `temperature_c = 0.0`로 바꿉니다.

수정 후 예상 출력:


```text
정상
```


오류 해결: None을 "None"이라는 문자열로 바꾸지 않습니다. 따옴표가 붙으면 다른 값입니다.
## A13 · 리스트와 위치로 여러 값 담기

### 전체 코드


```python
temperatures = [22.5, 24.0, 23.5]
print(temperatures[0])
print(len(temperatures))
temperatures.append(25.0)
print(len(temperatures))
print(temperatures[3])
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `temperatures = [22.5, 24.0, 23.5]` | 온도 세 개를 순서대로 묶습니다. |
| 2 | `print(temperatures[0])` | 첫 값을 읽습니다. |
| 3 | `print(len(temperatures))` | 현재 개수를 출력합니다. |
| 4 | `temperatures.append(25.0)` | 목록 끝에 새 값을 덧붙입니다. |
| 5 | `print(len(temperatures))` | 추가 뒤 개수를 확인합니다. |
| 6 | `print(temperatures[3])` | 네 번째 값을 출력합니다. |

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
22.5
3
4
25.0
```

작은 수정: `append(25.0)`를 `append(26.0)`로 바꿉니다.

수정 후 예상 출력:


```text
22.5
3
4
26.0
```


오류 해결: IndexError가 나면 읽는 시점의 목록 길이와 위치 번호를 확인합니다. 뒤에서 추가된다고 앞에서 이미 존재하는 것은 아닙니다.
## A14 · for로 목록을 한 항목씩 읽기

### 전체 코드


```python
temperatures = [22.5, 24.0, 23.5]
for temperature_c in temperatures:
    print(temperature_c)
print("완료")
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `temperatures = [22.5, 24.0, 23.5]` | 읽을 값의 순서를 준비합니다. |
| 2 | `for temperature_c in temperatures:` | 한 항목씩 현재 값의 이름에 연결합니다. |
| 3 | `    print(temperature_c)` | 각 차례의 값을 출력합니다. |
| 4 | `print("완료")` | 반복이 모두 끝난 뒤 한 번 출력합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A14_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A14_example.py
```

원본 코드의 예상 출력:


```text
22.5
24.0
23.5
완료
```

작은 수정: `[22.5, 24.0, 23.5]`를 `[22.5, 24.0, 23.5, 25.0]`로 바꿉니다.

수정 후 예상 출력:


```text
22.5
24.0
23.5
25.0
완료
```


오류 해결: 출력 횟수가 다르면 들여쓰기 범위를 먼저 확인합니다. 코드 줄 수와 실행 횟수는 다를 수 있습니다.
## A15 · 반복 안에서 조건 확인과 개수 세기

### 전체 코드


```python
temperatures = [22.5, 24.0, 25.0]
count = 0
for temperature_c in temperatures:
    if temperature_c > 24.0:
        count = count + 1
print("확인 건수", count)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `temperatures = [22.5, 24.0, 25.0]` | 점검할 온도 목록을 준비합니다. |
| 2 | `count = 0` | 아직 센 기록이 없어서 0으로 시작합니다. |
| 3 | `for temperature_c in temperatures:` | 각 온도를 차례로 확인합니다. |
| 4 | `    if temperature_c > 24.0:` | 이번 온도가 기준을 초과했는지 묻습니다. |
| 5 | `        count = count + 1` | 조건이 참인 경우만 누적 개수를 하나 늘립니다. |
| 6 | `print("확인 건수", count)` | 모든 점검 뒤 최종 개수를 보여 줍니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A15_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A15_example.py
```

원본 코드의 예상 출력:


```text
확인 건수 1
```

작은 수정: `> 24.0`를 `>= 24.0`로 바꿉니다.

수정 후 예상 출력:


```text
확인 건수 2
```


오류 해결: 건수가 항상 0 또는 1이면 초기화 위치와 누적 줄의 들여쓰기를 확인합니다.
## A16 · 관찰 한 건과 점검표 구조

### 전체 코드


```python
records = [
    {"sensor_id": "S01", "temperature_c": 22.5},
    {"sensor_id": "S02", "temperature_c": 24.0},
]
for record in records:
    print(record["sensor_id"], record["temperature_c"])
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `records = [` | 기록을 담을 리스트를 시작합니다. |
| 2 | `    {"sensor_id": "S01", "temperature_c": 22.5},` | 첫 관찰을 두 키의 딕셔너리로 넣습니다. |
| 3 | `    {"sensor_id": "S02", "temperature_c": 24.0},` | 둘째 관찰을 넣습니다. |
| 4 | `]` | 리스트를 닫습니다. |
| 5 | `for record in records:` | 딕셔너리 한 개씩 읽습니다. |
| 6 | `    print(record["sensor_id"], record["temperature_c"])` | 이번 관찰의 이름표로 두 값을 찾아 출력합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A16_example.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A16_example.py
```

원본 코드의 예상 출력:


```text
S01 22.5
S02 24.0
```

작은 수정: `"temperature_c": 24.0`를 `"temperature_c": 25.0`로 바꿉니다.

수정 후 예상 출력:


```text
S01 22.5
S02 25.0
```


오류 해결: 괄호 짝을 찾기 어렵다면 먼저 리스트 외곽, 다음 각 딕셔너리 외곽을 따로 표시합니다.
## A17 · 수업용 센서 요약 완성 예제

### 전체 코드


```python
records = [
    {"sensor_id": "S01", "temperature_c": 22.5},
    {"sensor_id": "S02", "temperature_c": 25.0},
    {"sensor_id": "S03", "temperature_c": None},
]
limit = 24.0
for record in records:
    temperature_c = record["temperature_c"]
    if temperature_c is None:
        status = "미측정"
    elif temperature_c > limit:
        status = "확인"
    else:
        status = "정상"
    print(record["sensor_id"], status)
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `records = [` | 관찰 목록을 시작합니다. |
| 2 | `    {"sensor_id": "S01", "temperature_c": 22.5},` | 첫 측정 기록입니다. |
| 3 | `    {"sensor_id": "S02", "temperature_c": 25.0},` | 둘째 측정 기록입니다. |
| 4 | `    {"sensor_id": "S03", "temperature_c": None},` | 온도가 없는 셋째 기록입니다. |
| 5 | `]` | 목록을 닫습니다. |
| 6 | `limit = 24.0` | 수업용 기준을 정합니다. |
| 7 | `for record in records:` | 기록 한 건씩 처리합니다. |
| 8 | `    temperature_c = record["temperature_c"]` | 이번 기록의 온도를 읽습니다. |
| 9 | `    if temperature_c is None:` | 값 없음부터 확인합니다. |
| 10 | `        status = "미측정"` | 값이 없을 때의 상태를 정합니다. |
| 11 | `    elif temperature_c > limit:` | 값이 있으면 초과 여부를 묻습니다. |
| 12 | `        status = "확인"` | 초과한 경우의 상태를 정합니다. |
| 13 | `    else:` | 앞의 두 경우가 아닐 때의 묶음입니다. |
| 14 | `        status = "정상"` | 나머지 측정의 상태를 정합니다. |
| 15 | `    print(record["sensor_id"], status)` | 이번 센서와 판정 상태를 출력합니다. |

### 실행과 예상 출력

현재 위치가 압축을 푼 course 폴더일 때 실행합니다.


```text
python -X utf8 code/A17_sensor_summary.py
```

수정한 작업본은 다음 명령으로 실행합니다.


```text
python -X utf8 work/A17_sensor_summary.py
```

원본 코드의 예상 출력:


```text
S01 정상
S02 확인
S03 미측정
```

작은 수정: `limit = 24.0`를 `limit = 25.0`로 바꿉니다.

수정 후 예상 출력:


```text
S01 정상
S02 정상
S03 미측정
```


오류 해결: 한꺼번에 여러 곳을 수정하지 않습니다. 원본과 작업본을 나란히 보고 지정한 기준 한 곳부터 다시 비교합니다.
