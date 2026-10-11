# 주석을 읽으며 실행하는 Python 기초 예제

이 모음은 기존 필수 활동과 별도로 골라 연습하는 자료입니다. 12개를 하루에 모두 끝내야 하는 과제가 아닙니다. 숫자만 고치는 연습 다음에는 예제를 가리고 직접 작성하고, 오류를 한 곳씩 고친 뒤 수정 이유를 설명하세요. 자료는 교육용 가상 주문·센서 기록이며 실제 장비나 안전 기준을 대신하지 않습니다.

## 저장과 실행부터

예제 ZIP을 풀고 `course` 폴더를 여세요. `samples`에는 `.py` 파일이 있습니다. `.py`는 Python 코드 파일의 확장자입니다. 탐색기에서 확장자 표시를 켜고 `.py.txt`로 저장되지 않았는지 확인하세요. `#` 뒤의 주석은 설명이며 실행하지 않습니다. 터미널 명령·예상 출력은 코드에 복사하지 않습니다.

1. `course` 폴더의 주소 표시줄에 `powershell`을 입력하고 Enter를 누릅니다.
2. 터미널에 `python --version`을 입력합니다. 명령을 찾을 수 없으면 Windows에서는 `py --version`을 확인하고, 사용할 수 있는 명령에 맞춰 아래 `python`을 `py`로 바꿉니다. 둘 다 없으면 수업 준비 안내에서 Python 설치를 확인합니다.
3. 첫 예제로 `python -X utf8 samples/B01_normal.py`를 실행합니다. `-X utf8`은 한글 입출력을 UTF-8로 처리하는 옵션입니다.
4. 바꿀 때는 파일을 새 이름으로 저장하세요. 여기서는 normal·broken·starter가 **같은 samples 폴더**에 있어야 합니다. 특히 심화는 `samples/data`와 `sample_helpers.py`를 같이 둡니다.
5. 파일을 찾을 수 없다는 안내는 먼저 저장 위치와 이름을 확인합니다. 코드 문제와 Python 설치 문제를 구별하세요.

`normal`은 완성 예, `broken`은 의도한 오류, `starter`는 TODO를 직접 채우는 파일입니다. starter는 완성 전 실행 시 오류나 다른 출력이 날 수 있습니다. TODO 아래의 `pass`는 아무 일도 하지 않는 표시이며, `if False:`·`elif False:`는 해당 가지를 건너뛰는 임시 조건입니다. TODO 요구에 맞는 코드로 교체하세요. 오류 파일 중에는 실행은 끝나지만 결과가 틀린 경우도 있습니다.

## 폴더 안내

`samples/data`는 입력 원본, `samples/work`는 실행 결과가 저장되는 폴더입니다. 파일 저장 예제를 다시 실행하면 같은 이름의 **work 결과 파일**을 덮어씁니다. data 원본은 수정하기 전에 별도 사본을 만드세요. 추가 패키지 설치·계정·API 키·실물 센서는 필요하지 않습니다.

## 연습 순서

| 번호 | 예제 | 살펴볼 개념 |
|---|---|---|
| B01 | 주문 금액과 남은 예산 계산 | 변수, 정수, 사칙연산, f 문자열 |
| B02 | 입고·출고 순서와 값 추적 | 대입 순서, 이전 값, 독립된 숫자 |
| B03 | 글자로 받은 숫자와 미측정 구별 | str, int, float, None, type, is |
| B04 | 센서 이름과 메모 정리 | strip, upper, replace, len, 슬라이싱, in |
| B05 | 온도 경계와 조건의 순서 | if, elif, else, 비교, and, 불리언 |
| B06 | 수량 입력을 받고 잘못된 입력 안내 | input, int, try/except, ValueError |
| B07 | 미측정과 0을 구분해 평균 계산 | for, continue, 누적, 개수, 나눗셈 |
| B08 | 날짜별 누적 생산량 표 만들기 | range, len, 위치, 누적, f 문자열 |
| B09 | 남은 주문을 묶음 단위로 처리 | while, 종료 조건, min, 누적 |
| B10 | 목록을 고치기 전에 원본 복사 | 리스트, copy, append, 위치 대입 |
| B11 | 상품 이름으로 재고 찾아 수정 | 딕셔너리, 키, get, in, items |
| B12 | 센서 기록을 한 건씩 분류 | 리스트 안의 딕셔너리, None, 조건, 집계 |

## 예제 코드와 직접 풀 문제


<details><summary>B01 · 주문 금액과 남은 예산 계산 — 코드·오류·직접 작성</summary>

### B01 · 주문 금액과 남은 예산 계산

**먼저 읽을 개념:** 변수, 정수, 사칙연산, f 문자열

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B01 · 주문 금액과 남은 예산 계산
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 변수, 정수, 사칙연산, f 문자열
# 실행: course 폴더에서 python -X utf8 samples/B01_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# [1] 업무 메모를 값으로 옮깁니다. 이름은 값의 뜻이 드러나게 붙입니다.
item_name = "작업 장갑"
unit_price = 2500  # 한 켤레 가격. 돈은 이 예제에서 정수 원으로 계산합니다.
quantity = 4
budget = 15000
# [2] =는 오른쪽 계산 결과를 왼쪽 이름에 저장합니다.
# *는 곱하기입니다. 수량은 가격에 더하는 값이 아닙니다.
subtotal = unit_price * quantity
# 할인 금액은 가격에서 빼고, 배송비는 다시 더합니다.
discount = 1000
delivery_fee = 2000
total = subtotal - discount + delivery_fee
remaining = budget - total
# [3] f를 붙이면 {이름} 자리에 현재 값이 들어갑니다.
print(f"상품: {item_name}")
print(f"상품 금액: {subtotal}원")
print(f"결제 금액: {total}원")
print(f"남은 예산: {remaining}원")
# [4] 수량을 5로 바꿀 때 결제 13500원, 남은 예산 1500원인지 확인하세요.
# 따옴표 안에 quantity를 넣으면 이름의 값이 아니라 글자 자체가 됩니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B01_normal.py
```

예상 출력:

```text
상품: 작업 장갑
상품 금액: 10000원
결제 금액: 11000원
남은 예산: 4000원
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B01 오류 코드 펼치기</summary>

```python
# B01 · 주문 금액과 남은 예산 계산
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 변수, 정수, 사칙연산, f 문자열
# 실행: course 폴더에서 python -X utf8 samples/B01_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# [1] 업무 메모를 값으로 옮깁니다. 이름은 값의 뜻이 드러나게 붙입니다.
item_name = "작업 장갑"
unit_price = 2500  # 한 켤레 가격. 돈은 이 예제에서 정수 원으로 계산합니다.
quantity = 4
budget = 15000
# [2] =는 오른쪽 계산 결과를 왼쪽 이름에 저장합니다.
# *는 곱하기입니다. 수량은 가격에 더하는 값이 아닙니다.
subtotal = unit_price + quantity
# 할인 금액은 가격에서 빼고, 배송비는 다시 더합니다.
discount = 1000
delivery_fee = 2000
total = subtotal - discount + delivery_fee
remaining = budget - total
# [3] f를 붙이면 {이름} 자리에 현재 값이 들어갑니다.
print(f"상품: {item_name}")
print(f"상품 금액: {subtotal}원")
print(f"결제 금액: {total}원")
print(f"남은 예산: {remaining}원")
# [4] 수량을 5로 바꿀 때 결제 13500원, 남은 예산 1500원인지 확인하세요.
# 따옴표 안에 quantity를 넣으면 이름의 값이 아니라 글자 자체가 됩니다.
```

</details>

실행: `python -X utf8 samples/B01_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B01 수정 이유 확인하기</summary>

가격과 수량을 더하면 2504가 됩니다. 한 개 가격을 수량만큼 곱합니다. 수정한 파일을 `B01_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

상품 금액을 계산하는 줄을 작성하세요. `B01_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B01_normal.py) · [오류 예](B01_broken.py) · [직접 작성 파일](B01_starter.py) · [예상 출력](B01_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B02 · 입고·출고 순서와 값 추적 — 코드·오류·직접 작성</summary>

### B02 · 입고·출고 순서와 값 추적

**먼저 읽을 개념:** 대입 순서, 이전 값, 독립된 숫자

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B02 · 입고·출고 순서와 값 추적
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 대입 순서, 이전 값, 독립된 숫자
# 실행: course 폴더에서 python -X utf8 samples/B02_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 첫 재고와 작업 시작 시점의 재고를 따로 기억합니다.
stock = 8
opening_stock = stock  # 숫자 8을 다른 이름에도 저장합니다.
print(f"시작: {stock}")
# 오른쪽 stock은 이 줄이 실행되기 직전의 값 8입니다.
incoming = 3
stock = stock + incoming
print(f"입고 후: {stock}")
# 앞 줄에서 바뀐 11을 이용해 출고 수량을 뺍니다.
outgoing = 2
stock = stock - outgoing
print(f"출고 후: {stock}")
# 숫자는 이후 stock을 바꿔도 opening_stock이 같이 바뀌지 않습니다.
change = stock - opening_stock
print(f"시작 기록: {opening_stock}")
print(f"순변화: {change}")
# 종이에 각 줄 실행 후 stock을 8 → 11 → 9로 적어 보세요.
# outgoing을 5로 바꾸면 마지막 재고는 6, 순변화는 -2입니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B02_normal.py
```

예상 출력:

```text
시작: 8
입고 후: 11
출고 후: 9
시작 기록: 8
순변화: 1
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B02 오류 코드 펼치기</summary>

```python
# B02 · 입고·출고 순서와 값 추적
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 대입 순서, 이전 값, 독립된 숫자
# 실행: course 폴더에서 python -X utf8 samples/B02_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 첫 재고와 작업 시작 시점의 재고를 따로 기억합니다.
stock = 8
opening_stock = stock  # 숫자 8을 다른 이름에도 저장합니다.
print(f"시작: {stock}")
# 오른쪽 stock은 이 줄이 실행되기 직전의 값 8입니다.
incoming = 3
stock = stock + incoming
print(f"입고 후: {stock}")
# 앞 줄에서 바뀐 11을 이용해 출고 수량을 뺍니다.
outgoing = 2
stock = opening_stock - outgoing
print(f"출고 후: {stock}")
# 숫자는 이후 stock을 바꿔도 opening_stock이 같이 바뀌지 않습니다.
change = stock - opening_stock
print(f"시작 기록: {opening_stock}")
print(f"순변화: {change}")
# 종이에 각 줄 실행 후 stock을 8 → 11 → 9로 적어 보세요.
# outgoing을 5로 바꾸면 마지막 재고는 6, 순변화는 -2입니다.
```

</details>

실행: `python -X utf8 samples/B02_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B02 수정 이유 확인하기</summary>

입고 후 현재 재고 대신 시작 재고를 쓰면 입고 3개가 계산에서 빠집니다. 수정한 파일을 `B02_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

현재 재고에서 출고 수량을 빼세요. `B02_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B02_normal.py) · [오류 예](B02_broken.py) · [직접 작성 파일](B02_starter.py) · [예상 출력](B02_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B03 · 글자로 받은 숫자와 미측정 구별 — 코드·오류·직접 작성</summary>

### B03 · 글자로 받은 숫자와 미측정 구별

**먼저 읽을 개념:** str, int, float, None, type, is

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B03 · 글자로 받은 숫자와 미측정 구별
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: str, int, float, None, type, is
# 실행: course 폴더에서 python -X utf8 samples/B03_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 파일이나 입력창에서 받은 3은 계산용 숫자가 아니라 문자열일 수 있습니다.
raw_quantity = "3"
raw_temperature = "22.5"
raw_missing = ""  # 빈 글자입니다. 확인된 숫자 0과 다릅니다.
# int는 정수 글자, float는 소수 글자를 계산용 숫자로 바꿉니다.
quantity = int(raw_quantity)
temperature = float(raw_temperature)
# 비어 있을 때 float("")를 실행하면 ValueError가 납니다.
if raw_missing == "":
    missing_temperature = None  # 이 수업의 미측정 표시입니다.
else:
    missing_temperature = float(raw_missing)
print(f"원문 종류: {type(raw_quantity).__name__}")
print(f"수량 합계: {quantity + 2}")
print(f"온도: {temperature}")
print(f"미측정 여부: {missing_temperature is None}")
# __name__은 type이 돌려준 종류의 이름만 읽는 속성입니다.
# 숫자 0을 넣으면 미측정 여부는 False여야 합니다.
# 'None'은 글자이며 None은 값입니다. 따옴표 유무를 비교하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B03_normal.py
```

예상 출력:

```text
원문 종류: str
수량 합계: 5
온도: 22.5
미측정 여부: True
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B03 오류 코드 펼치기</summary>

```python
# B03 · 글자로 받은 숫자와 미측정 구별
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: str, int, float, None, type, is
# 실행: course 폴더에서 python -X utf8 samples/B03_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 파일이나 입력창에서 받은 3은 계산용 숫자가 아니라 문자열일 수 있습니다.
raw_quantity = "3"
raw_temperature = "22.5"
raw_missing = ""  # 빈 글자입니다. 확인된 숫자 0과 다릅니다.
# int는 정수 글자, float는 소수 글자를 계산용 숫자로 바꿉니다.
quantity = raw_quantity
temperature = float(raw_temperature)
# 비어 있을 때 float("")를 실행하면 ValueError가 납니다.
if raw_missing == "":
    missing_temperature = None  # 이 수업의 미측정 표시입니다.
else:
    missing_temperature = float(raw_missing)
print(f"원문 종류: {type(raw_quantity).__name__}")
print(f"수량 합계: {quantity + 2}")
print(f"온도: {temperature}")
print(f"미측정 여부: {missing_temperature is None}")
# __name__은 type이 돌려준 종류의 이름만 읽는 속성입니다.
# 숫자 0을 넣으면 미측정 여부는 False여야 합니다.
# 'None'은 글자이며 None은 값입니다. 따옴표 유무를 비교하세요.
```

</details>

실행: `python -X utf8 samples/B03_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B03 수정 이유 확인하기</summary>

문자열에 정수 2를 더하면 TypeError가 납니다. 먼저 int로 바꿉니다. 수정한 파일을 `B03_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

수량 글자를 정수로 바꾸세요. `B03_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B03_normal.py) · [오류 예](B03_broken.py) · [직접 작성 파일](B03_starter.py) · [예상 출력](B03_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B04 · 센서 이름과 메모 정리 — 코드·오류·직접 작성</summary>

### B04 · 센서 이름과 메모 정리

**먼저 읽을 개념:** strip, upper, replace, len, 슬라이싱, in

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B04 · 센서 이름과 메모 정리
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: strip, upper, replace, len, 슬라이싱, in
# 실행: course 폴더에서 python -X utf8 samples/B04_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 원본은 따로 남겨 두고 정리한 값을 새 이름에 저장합니다.
raw_id = "  s01  "
raw_note = " 입구 / 점검 필요 "
# 점(.)은 이 값이 제공하는 기능을 골라 쓰는 표시입니다.
# strip은 양끝 공백만 지웁니다. 값 사이 공백까지 모두 지우지 않습니다.
sensor_id = raw_id.strip().upper()
note = raw_note.strip().replace(" / ", " · ")
# [시작:끝]은 시작부터 끝 직전까지 고릅니다. 위치는 0부터 셉니다.
prefix = sensor_id[0:1]
digits = sensor_id[1:3]
needs_check = "점검" in note
print(f"원본: [{raw_id}]")
print(f"정리: {sensor_id}")
print(f"글자 수: {len(sensor_id)}")
print(f"구분: {prefix} / 번호: {digits}")
print(f"메모: {note}")
print(f"점검 표시: {needs_check}")
# raw_id를 ' s12 '로 바꾸면 S12와 번호 12가 보여야 합니다.
# strip()의 괄호를 빼면 정리된 값 대신 기능 자체를 가리키게 됩니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B04_normal.py
```

예상 출력:

```text
원본: [  s01  ]
정리: S01
글자 수: 3
구분: S / 번호: 01
메모: 입구 · 점검 필요
점검 표시: True
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B04 오류 코드 펼치기</summary>

```python
# B04 · 센서 이름과 메모 정리
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: strip, upper, replace, len, 슬라이싱, in
# 실행: course 폴더에서 python -X utf8 samples/B04_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 원본은 따로 남겨 두고 정리한 값을 새 이름에 저장합니다.
raw_id = "  s01  "
raw_note = " 입구 / 점검 필요 "
# 점(.)은 이 값이 제공하는 기능을 골라 쓰는 표시입니다.
# strip은 양끝 공백만 지웁니다. 값 사이 공백까지 모두 지우지 않습니다.
sensor_id = raw_id.upper()
note = raw_note.strip().replace(" / ", " · ")
# [시작:끝]은 시작부터 끝 직전까지 고릅니다. 위치는 0부터 셉니다.
prefix = sensor_id[0:1]
digits = sensor_id[1:3]
needs_check = "점검" in note
print(f"원본: [{raw_id}]")
print(f"정리: {sensor_id}")
print(f"글자 수: {len(sensor_id)}")
print(f"구분: {prefix} / 번호: {digits}")
print(f"메모: {note}")
print(f"점검 표시: {needs_check}")
# raw_id를 ' s12 '로 바꾸면 S12와 번호 12가 보여야 합니다.
# strip()의 괄호를 빼면 정리된 값 대신 기능 자체를 가리키게 됩니다.
```

</details>

실행: `python -X utf8 samples/B04_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B04 수정 이유 확인하기</summary>

양끝 공백을 제거하지 않아 길이와 번호 위치가 달라집니다. 수정한 파일을 `B04_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

양끝 공백 제거와 대문자 변환을 연결하세요. `B04_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B04_normal.py) · [오류 예](B04_broken.py) · [직접 작성 파일](B04_starter.py) · [예상 출력](B04_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B05 · 온도 경계와 조건의 순서 — 코드·오류·직접 작성</summary>

### B05 · 온도 경계와 조건의 순서

**먼저 읽을 개념:** if, elif, else, 비교, and, 불리언

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B05 · 온도 경계와 조건의 순서
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: if, elif, else, 비교, and, 불리언
# 실행: course 폴더에서 python -X utf8 samples/B05_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 교육용 규칙입니다. 실제 설비의 안전 기준으로 사용하지 않습니다.
temperatures = [0, 25, 28, 30]
for temperature in temperatures:
    # 큰 기준을 먼저 검사해야 30도도 '주의'로 끝나는 일을 피합니다.
    if temperature >= 28:
        status = "경고"
    elif temperature >= 25:
        status = "주의"
    else:
        status = "정상"
    print(f"{temperature}도: {status}")
# and는 두 조건이 모두 True일 때만 True입니다.
active = False
temperature = 30
alert = active and temperature >= 28
print(f"비활성 장치 알림: {alert}")
# 경계값 24.9, 25, 27.9, 28을 넣어 네 결과를 예상해 보세요.
# >=는 경계값 자체를 포함하고 >는 포함하지 않습니다.
# 들여쓰기는 if나 for에 속하는 코드 범위를 표시합니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B05_normal.py
```

예상 출력:

```text
0도: 정상
25도: 주의
28도: 경고
30도: 경고
비활성 장치 알림: False
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B05 오류 코드 펼치기</summary>

```python
# B05 · 온도 경계와 조건의 순서
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: if, elif, else, 비교, and, 불리언
# 실행: course 폴더에서 python -X utf8 samples/B05_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 교육용 규칙입니다. 실제 설비의 안전 기준으로 사용하지 않습니다.
temperatures = [0, 25, 28, 30]
for temperature in temperatures:
    # 큰 기준을 먼저 검사해야 30도도 '주의'로 끝나는 일을 피합니다.
    if temperature > 28:
        status = "경고"
    elif temperature >= 25:
        status = "주의"
    else:
        status = "정상"
    print(f"{temperature}도: {status}")
# and는 두 조건이 모두 True일 때만 True입니다.
active = False
temperature = 30
alert = active and temperature >= 28
print(f"비활성 장치 알림: {alert}")
# 경계값 24.9, 25, 27.9, 28을 넣어 네 결과를 예상해 보세요.
# >=는 경계값 자체를 포함하고 >는 포함하지 않습니다.
# 들여쓰기는 if나 for에 속하는 코드 범위를 표시합니다.
```

</details>

실행: `python -X utf8 samples/B05_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B05 수정 이유 확인하기</summary>

28도 자체가 경고에서 빠져 주의가 됩니다. 경계를 포함하는 >=를 씁니다. 수정한 파일을 `B05_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

28도 이상인지 검사하는 조건을 작성하세요. `B05_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B05_normal.py) · [오류 예](B05_broken.py) · [직접 작성 파일](B05_starter.py) · [예상 출력](B05_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B06 · 수량 입력을 받고 잘못된 입력 안내 — 코드·오류·직접 작성</summary>

### B06 · 수량 입력을 받고 잘못된 입력 안내

**먼저 읽을 개념:** input, int, try/except, ValueError

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B06 · 수량 입력을 받고 잘못된 입력 안내
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: input, int, try/except, ValueError
# 실행: course 폴더에서 python -X utf8 samples/B06_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 더 해보기: 조건문과 자료형 변환을 읽은 뒤 진행합니다.
# input은 키보드로 입력한 내용을 언제나 문자열로 돌려줍니다.
raw = input("수량(0 이상 정수): ")
# try는 실패할 수 있는 변환을 시도하는 묶음입니다.
try:
    quantity = int(raw)
except ValueError:
    # int로 바꿀 수 없는 글자나 소수 입력만 이곳에서 안내합니다.
    print("정수로 입력하세요.")
else:
    # 변환 성공과 업무 규칙 통과는 다른 검사입니다.
    if quantity < 0:
        print("수량은 0 이상이어야 합니다.")
    else:
        unit_price = 2000
        print(f"수량: {quantity}")
        print(f"금액: {quantity * unit_price}원")
# 3, 0, -1, abc, 2.5를 각각 실행해 메시지를 비교하세요.
# 예외를 넓게 숨기지 않고 예상한 ValueError만 처리합니다.
# 이 코드는 한 번 안내하고 종료합니다. 자동으로 다시 묻지 않습니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B06_normal.py
```

수량 안내가 나타나면 `3`을 입력하고 Enter를 누릅니다. 아래는 프로그램이 출력한 글자이며 터미널이 표시하는 입력값 자체는 생략했습니다.

예상 출력:

```text
수량(0 이상 정수): 수량: 3
금액: 6000원
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B06 오류 코드 펼치기</summary>

```python
# B06 · 수량 입력을 받고 잘못된 입력 안내
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: input, int, try/except, ValueError
# 실행: course 폴더에서 python -X utf8 samples/B06_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 더 해보기: 조건문과 자료형 변환을 읽은 뒤 진행합니다.
# input은 키보드로 입력한 내용을 언제나 문자열로 돌려줍니다.
raw = input("수량(0 이상 정수): ")
# try는 실패할 수 있는 변환을 시도하는 묶음입니다.
try:
    quantity = float(raw)
except ValueError:
    # int로 바꿀 수 없는 글자나 소수 입력만 이곳에서 안내합니다.
    print("정수로 입력하세요.")
else:
    # 변환 성공과 업무 규칙 통과는 다른 검사입니다.
    if quantity < 0:
        print("수량은 0 이상이어야 합니다.")
    else:
        unit_price = 2000
        print(f"수량: {quantity}")
        print(f"금액: {quantity * unit_price}원")
# 3, 0, -1, abc, 2.5를 각각 실행해 메시지를 비교하세요.
# 예외를 넓게 숨기지 않고 예상한 ValueError만 처리합니다.
# 이 코드는 한 번 안내하고 종료합니다. 자동으로 다시 묻지 않습니다.
```

</details>

실행: `python -X utf8 samples/B06_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B06 수정 이유 확인하기</summary>

소수를 허용해 정수 수량 약속을 깨고 출력도 3.0이 됩니다. 수정한 파일을 `B06_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

입력값을 정수로 변환하세요. `B06_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B06_normal.py) · [오류 예](B06_broken.py) · [직접 작성 파일](B06_starter.py) · [예상 출력](B06_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B07 · 미측정과 0을 구분해 평균 계산 — 코드·오류·직접 작성</summary>

### B07 · 미측정과 0을 구분해 평균 계산

**먼저 읽을 개념:** for, continue, 누적, 개수, 나눗셈

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B07 · 미측정과 0을 구분해 평균 계산
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: for, continue, 누적, 개수, 나눗셈
# 실행: course 폴더에서 python -X utf8 samples/B07_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

readings = [22.5, None, 0, 25.5]
total = 0
valid_count = 0
missing_count = 0
# 처음에는 합계도 개수도 0입니다. 반복마다 현재 값을 기록하세요.
for temperature in readings:
    if temperature is None:
        missing_count = missing_count + 1
        continue  # 이번 값의 나머지 계산을 건너뜁니다.
    # 0은 미측정이 아니므로 합계와 개수에 포함합니다.
    total = total + temperature
    valid_count = valid_count + 1
# 값이 하나도 없으면 0으로 나눌 수 없습니다.
if valid_count == 0:
    print("평균: 계산할 측정값 없음")
else:
    average = total / valid_count
    print(f"평균: {average:.1f}")  # :.1f는 소수 한 자리로 출력합니다.
print(f"측정: {valid_count} / 미측정: {missing_count}")
# [None, None]과 [0]으로 바꿔 두 상황을 구별해 보세요.
# 주석을 읽고 total과 valid_count의 변화 표를 직접 작성하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B07_normal.py
```

예상 출력:

```text
평균: 16.0
측정: 3 / 미측정: 1
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B07 오류 코드 펼치기</summary>

```python
# B07 · 미측정과 0을 구분해 평균 계산
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: for, continue, 누적, 개수, 나눗셈
# 실행: course 폴더에서 python -X utf8 samples/B07_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

readings = [22.5, None, 0, 25.5]
total = 0
valid_count = 0
missing_count = 0
# 처음에는 합계도 개수도 0입니다. 반복마다 현재 값을 기록하세요.
for temperature in readings:
    if not temperature:
        missing_count = missing_count + 1
        continue  # 이번 값의 나머지 계산을 건너뜁니다.
    # 0은 미측정이 아니므로 합계와 개수에 포함합니다.
    total = total + temperature
    valid_count = valid_count + 1
# 값이 하나도 없으면 0으로 나눌 수 없습니다.
if valid_count == 0:
    print("평균: 계산할 측정값 없음")
else:
    average = total / valid_count
    print(f"평균: {average:.1f}")  # :.1f는 소수 한 자리로 출력합니다.
print(f"측정: {valid_count} / 미측정: {missing_count}")
# [None, None]과 [0]으로 바꿔 두 상황을 구별해 보세요.
# 주석을 읽고 total과 valid_count의 변화 표를 직접 작성하세요.
```

</details>

실행: `python -X utf8 samples/B07_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B07 수정 이유 확인하기</summary>

not 0도 True이므로 0을 미측정으로 제외합니다. None만 골라야 합니다. 수정한 파일을 `B07_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

미측정 값 None만 골라내세요. `B07_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B07_normal.py) · [오류 예](B07_broken.py) · [직접 작성 파일](B07_starter.py) · [예상 출력](B07_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B08 · 날짜별 누적 생산량 표 만들기 — 코드·오류·직접 작성</summary>

### B08 · 날짜별 누적 생산량 표 만들기

**먼저 읽을 개념:** range, len, 위치, 누적, f 문자열

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B08 · 날짜별 누적 생산량 표 만들기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: range, len, 위치, 누적, f 문자열
# 실행: course 폴더에서 python -X utf8 samples/B08_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

daily_counts = [3, 5, 2, 4]
cumulative = 0
# range(4)는 0, 1, 2, 3을 줍니다. 끝값 4 자체는 포함하지 않습니다.
for index in range(len(daily_counts)):
    count = daily_counts[index]
    cumulative = cumulative + count
    # 사람에게 보여 주는 일차는 1부터, 리스트 위치는 0부터입니다.
    day = index + 1
    print(f"{day}일차: 당일 {count}, 누적 {cumulative}")
target = 15
remaining = target - cumulative
if remaining < 0:
    remaining = 0  # 목표를 넘었으면 남은 양은 0입니다.
print(f"목표까지: {remaining}")
# 마지막 값 4를 6으로 바꾸면 누적 16, 목표까지 0입니다.
# len은 값의 개수를 구하고 []는 그 위치의 값을 읽습니다.
# daily_counts[4]는 값이 4개인 이 목록의 범위를 벗어납니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B08_normal.py
```

예상 출력:

```text
1일차: 당일 3, 누적 3
2일차: 당일 5, 누적 8
3일차: 당일 2, 누적 10
4일차: 당일 4, 누적 14
목표까지: 1
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B08 오류 코드 펼치기</summary>

```python
# B08 · 날짜별 누적 생산량 표 만들기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: range, len, 위치, 누적, f 문자열
# 실행: course 폴더에서 python -X utf8 samples/B08_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

daily_counts = [3, 5, 2, 4]
cumulative = 0
# range(4)는 0, 1, 2, 3을 줍니다. 끝값 4 자체는 포함하지 않습니다.
for index in range(len(daily_counts)):
    count = daily_counts[index]
    cumulative = count
    # 사람에게 보여 주는 일차는 1부터, 리스트 위치는 0부터입니다.
    day = index + 1
    print(f"{day}일차: 당일 {count}, 누적 {cumulative}")
target = 15
remaining = target - cumulative
if remaining < 0:
    remaining = 0  # 목표를 넘었으면 남은 양은 0입니다.
print(f"목표까지: {remaining}")
# 마지막 값 4를 6으로 바꾸면 누적 16, 목표까지 0입니다.
# len은 값의 개수를 구하고 []는 그 위치의 값을 읽습니다.
# daily_counts[4]는 값이 4개인 이 목록의 범위를 벗어납니다.
```

</details>

실행: `python -X utf8 samples/B08_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B08 수정 이유 확인하기</summary>

이전 누적량을 버리고 오늘 생산량으로 덮어씁니다. 수정한 파일을 `B08_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

이전 누적량에 오늘 생산량을 더하세요. `B08_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B08_normal.py) · [오류 예](B08_broken.py) · [직접 작성 파일](B08_starter.py) · [예상 출력](B08_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B09 · 남은 주문을 묶음 단위로 처리 — 코드·오류·직접 작성</summary>

### B09 · 남은 주문을 묶음 단위로 처리

**먼저 읽을 개념:** while, 종료 조건, min, 누적

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B09 · 남은 주문을 묶음 단위로 처리
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: while, 종료 조건, min, 누적
# 실행: course 폴더에서 python -X utf8 samples/B09_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 더 해보기: for 반복을 읽은 뒤 while의 종료 조건을 확인합니다.
remaining = 7
batch_size = 3
round_number = 0
processed_total = 0
while remaining > 0:
    # min은 두 수 중 작은 수를 선택합니다. 남은 1개를 3개로 세지 않습니다.
    current = min(batch_size, remaining)
    round_number = round_number + 1
    processed_total = processed_total + current
    remaining = remaining - current
    print(f"{round_number}회: 처리 {current}, 남음 {remaining}")
print(f"총 처리: {processed_total}")
# 7 → 4 → 1 → 0으로 줄어드는 값이 while을 끝나게 합니다.
# batch_size는 양수여야 합니다. 0으로 바꾸면 남은 수량이 줄지 않습니다.
# 무한 반복이 생기면 터미널에서 Ctrl+C로 멈추고 감소 줄을 점검하세요.
# 수량을 8로 바꾸면 3개, 3개, 2개를 처리합니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B09_normal.py
```

예상 출력:

```text
1회: 처리 3, 남음 4
2회: 처리 3, 남음 1
3회: 처리 1, 남음 0
총 처리: 7
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B09 오류 코드 펼치기</summary>

```python
# B09 · 남은 주문을 묶음 단위로 처리
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: while, 종료 조건, min, 누적
# 실행: course 폴더에서 python -X utf8 samples/B09_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 더 해보기: for 반복을 읽은 뒤 while의 종료 조건을 확인합니다.
remaining = 7
batch_size = 3
round_number = 0
processed_total = 0
while remaining > 0:
    # min은 두 수 중 작은 수를 선택합니다. 남은 1개를 3개로 세지 않습니다.
    current = batch_size
    round_number = round_number + 1
    processed_total = processed_total + current
    remaining = remaining - current
    print(f"{round_number}회: 처리 {current}, 남음 {remaining}")
print(f"총 처리: {processed_total}")
# 7 → 4 → 1 → 0으로 줄어드는 값이 while을 끝나게 합니다.
# batch_size는 양수여야 합니다. 0으로 바꾸면 남은 수량이 줄지 않습니다.
# 무한 반복이 생기면 터미널에서 Ctrl+C로 멈추고 감소 줄을 점검하세요.
# 수량을 8로 바꾸면 3개, 3개, 2개를 처리합니다.
```

</details>

실행: `python -X utf8 samples/B09_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B09 수정 이유 확인하기</summary>

마지막 남은 한 개도 세 개로 세어 총 처리량이 9가 됩니다. 수정한 파일을 `B09_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

묶음 크기와 남은 수량 중 작은 값을 선택하세요. `B09_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B09_normal.py) · [오류 예](B09_broken.py) · [직접 작성 파일](B09_starter.py) · [예상 출력](B09_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B10 · 목록을 고치기 전에 원본 복사 — 코드·오류·직접 작성</summary>

### B10 · 목록을 고치기 전에 원본 복사

**먼저 읽을 개념:** 리스트, copy, append, 위치 대입

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B10 · 목록을 고치기 전에 원본 복사
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 리스트, copy, append, 위치 대입
# 실행: course 폴더에서 python -X utf8 samples/B10_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

original = [2, 4, 6]
# 이름만 바꾸는 것과 별도 목록을 만드는 것은 다릅니다.
working = original.copy()
# 첫 항목은 [0]입니다. 첫 값만 3으로 바꿉니다.
working[0] = 3
# append는 목록의 끝에 새 값을 하나 붙입니다.
working.append(8)
print(f"원본: {original}")
print(f"작업: {working}")
print(f"원본 개수: {len(original)}")
print(f"작업 개수: {len(working)}")
# working = original로 쓰면 두 이름이 같은 목록을 가리킵니다.
# 이 예제는 숫자만 있는 한 층짜리 목록입니다.
# 딕셔너리가 들어 있는 중첩 목록은 copy만으로 내부 값까지 분리되지 않습니다.
# 내부 복사는 심화의 D03에서 따로 비교합니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B10_normal.py
```

예상 출력:

```text
원본: [2, 4, 6]
작업: [3, 4, 6, 8]
원본 개수: 3
작업 개수: 4
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B10 오류 코드 펼치기</summary>

```python
# B10 · 목록을 고치기 전에 원본 복사
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 리스트, copy, append, 위치 대입
# 실행: course 폴더에서 python -X utf8 samples/B10_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

original = [2, 4, 6]
# 이름만 바꾸는 것과 별도 목록을 만드는 것은 다릅니다.
working = original
# 첫 항목은 [0]입니다. 첫 값만 3으로 바꿉니다.
working[0] = 3
# append는 목록의 끝에 새 값을 하나 붙입니다.
working.append(8)
print(f"원본: {original}")
print(f"작업: {working}")
print(f"원본 개수: {len(original)}")
print(f"작업 개수: {len(working)}")
# working = original로 쓰면 두 이름이 같은 목록을 가리킵니다.
# 이 예제는 숫자만 있는 한 층짜리 목록입니다.
# 딕셔너리가 들어 있는 중첩 목록은 copy만으로 내부 값까지 분리되지 않습니다.
# 내부 복사는 심화의 D03에서 따로 비교합니다.
```

</details>

실행: `python -X utf8 samples/B10_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B10 수정 이유 확인하기</summary>

두 이름이 같은 목록을 가리켜 원본까지 수정됩니다. 수정한 파일을 `B10_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

작업용 목록을 별도로 복사하세요. `B10_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B10_normal.py) · [오류 예](B10_broken.py) · [직접 작성 파일](B10_starter.py) · [예상 출력](B10_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B11 · 상품 이름으로 재고 찾아 수정 — 코드·오류·직접 작성</summary>

### B11 · 상품 이름으로 재고 찾아 수정

**먼저 읽을 개념:** 딕셔너리, 키, get, in, items

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B11 · 상품 이름으로 재고 찾아 수정
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 딕셔너리, 키, get, in, items
# 실행: course 폴더에서 python -X utf8 samples/B11_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# {}는 이름표와 값을 묶는 딕셔너리입니다. 여기서 이름표는 상품명입니다.
inventory = {"볼트": 5, "너트": 0}
item = "볼트"
incoming = 3
inventory[item] = inventory[item] + incoming
# get(키, 기본값)은 키가 없을 때 기본값을 돌려줍니다.
# 미등록 상품의 기본값은 None으로 두어 재고 0과 구별합니다.
missing = inventory.get("와셔", None)
print(f"볼트 재고: {inventory['볼트']}")
print(f"너트 등록: {'너트' in inventory}")
print(f"너트 재고: {inventory['너트']}")
print(f"와셔 미등록: {missing is None}")
# items는 키와 값을 한 쌍씩 꺼냅니다. 두 이름으로 받습니다.
for name, stock in inventory.items():
    print(f"{name}: {stock}")
# get의 기본값을 0으로 바꾸면 미등록과 품절을 구별할 수 없습니다.
# 직접 작성: 상품이 등록되어 있는지 먼저 확인하는 출고 코드를 만드세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B11_normal.py
```

예상 출력:

```text
볼트 재고: 8
너트 등록: True
너트 재고: 0
와셔 미등록: True
볼트: 8
너트: 0
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B11 오류 코드 펼치기</summary>

```python
# B11 · 상품 이름으로 재고 찾아 수정
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 딕셔너리, 키, get, in, items
# 실행: course 폴더에서 python -X utf8 samples/B11_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# {}는 이름표와 값을 묶는 딕셔너리입니다. 여기서 이름표는 상품명입니다.
inventory = {"볼트": 5, "너트": 0}
item = "볼트"
incoming = 3
inventory[item] = inventory[item] + incoming
# get(키, 기본값)은 키가 없을 때 기본값을 돌려줍니다.
# 미등록 상품의 기본값은 None으로 두어 재고 0과 구별합니다.
missing = inventory.get("와셔", 0)
print(f"볼트 재고: {inventory['볼트']}")
print(f"너트 등록: {'너트' in inventory}")
print(f"너트 재고: {inventory['너트']}")
print(f"와셔 미등록: {missing is None}")
# items는 키와 값을 한 쌍씩 꺼냅니다. 두 이름으로 받습니다.
for name, stock in inventory.items():
    print(f"{name}: {stock}")
# get의 기본값을 0으로 바꾸면 미등록과 품절을 구별할 수 없습니다.
# 직접 작성: 상품이 등록되어 있는지 먼저 확인하는 출고 코드를 만드세요.
```

</details>

실행: `python -X utf8 samples/B11_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B11 수정 이유 확인하기</summary>

미등록 상품을 품절 0으로 취급해 의미가 달라집니다. 수정한 파일을 `B11_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

미등록일 때 None을 돌려받으세요. `B11_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B11_normal.py) · [오류 예](B11_broken.py) · [직접 작성 파일](B11_starter.py) · [예상 출력](B11_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>B12 · 센서 기록을 한 건씩 분류 — 코드·오류·직접 작성</summary>

### B12 · 센서 기록을 한 건씩 분류

**먼저 읽을 개념:** 리스트 안의 딕셔너리, None, 조건, 집계

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# B12 · 센서 기록을 한 건씩 분류
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 리스트 안의 딕셔너리, None, 조건, 집계
# 실행: course 폴더에서 python -X utf8 samples/B12_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 목록에는 여러 기록, 각 {}에는 기록 한 건의 이름표와 값이 있습니다.
records = [
    {"id": "S01", "temperature": 22.5, "active": True},
    {"id": "S02", "temperature": 0, "active": True},
    {"id": "S03", "temperature": None, "active": True},
    {"id": "S04", "temperature": 30, "active": False},
]
normal_count = 0
for record in records:
    sensor_id = record["id"]
    temperature = record["temperature"]
    # 비활성인지, 미측정인지, 온도 기준을 넘었는지 순서대로 판단합니다.
    if not record["active"]:
        status = "비활성"
    elif temperature is None:
        status = "미측정"
    elif temperature >= 28:
        status = "경고"
    else:
        status = "정상"
        normal_count = normal_count + 1
    print(f"{sensor_id}: {status}")
print(f"정상 기록: {normal_count}")
# S04를 active=True로 바꾸면 경고여야 합니다.
# S02의 0은 확인된 온도입니다. if not temperature로 판별하지 않습니다.
# 직접 작성: 정상·경고·미측정·비활성 개수를 각각 출력하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/B12_normal.py
```

예상 출력:

```text
S01: 정상
S02: 정상
S03: 미측정
S04: 비활성
정상 기록: 2
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>B12 오류 코드 펼치기</summary>

```python
# B12 · 센서 기록을 한 건씩 분류
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 리스트 안의 딕셔너리, None, 조건, 집계
# 실행: course 폴더에서 python -X utf8 samples/B12_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 목록에는 여러 기록, 각 {}에는 기록 한 건의 이름표와 값이 있습니다.
records = [
    {"id": "S01", "temperature": 22.5, "active": True},
    {"id": "S02", "temperature": 0, "active": True},
    {"id": "S03", "temperature": None, "active": True},
    {"id": "S04", "temperature": 30, "active": False},
]
normal_count = 0
for record in records:
    sensor_id = record["id"]
    temperature = record["temperature"]
    # 비활성인지, 미측정인지, 온도 기준을 넘었는지 순서대로 판단합니다.
    if not record["active"]:
        status = "비활성"
    elif not temperature:
        status = "미측정"
    elif temperature >= 28:
        status = "경고"
    else:
        status = "정상"
        normal_count = normal_count + 1
    print(f"{sensor_id}: {status}")
print(f"정상 기록: {normal_count}")
# S04를 active=True로 바꾸면 경고여야 합니다.
# S02의 0은 확인된 온도입니다. if not temperature로 판별하지 않습니다.
# 직접 작성: 정상·경고·미측정·비활성 개수를 각각 출력하세요.
```

</details>

실행: `python -X utf8 samples/B12_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>B12 수정 이유 확인하기</summary>

0도까지 미측정으로 분류하고 정상 개수가 줄어듭니다. 수정한 파일을 `B12_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

미측정만 골라내는 조건을 작성하세요. `B12_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](B12_normal.py) · [오류 예](B12_broken.py) · [직접 작성 파일](B12_starter.py) · [예상 출력](B12_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

파일 형식 참고: [Python CSV 공식 문서](https://docs.python.org/3/library/csv.html) · [Python JSON 공식 문서](https://docs.python.org/3/library/json.html).
