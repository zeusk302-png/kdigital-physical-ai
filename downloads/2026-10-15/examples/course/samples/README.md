# 주석을 읽으며 실행하는 Python 심화 예제

이 모음은 기존 필수 활동과 별도로 골라 연습하는 자료입니다. 12개를 하루에 모두 끝내야 하는 과제가 아닙니다. 숫자만 고치는 연습 다음에는 예제를 가리고 직접 작성하고, 오류를 한 곳씩 고친 뒤 수정 이유를 설명하세요. 자료는 교육용 가상 주문·센서 기록이며 실제 장비나 안전 기준을 대신하지 않습니다.

## 저장과 실행부터

예제 ZIP을 풀고 `course` 폴더를 여세요. `samples`에는 `.py` 파일이 있습니다. `.py`는 Python 코드 파일의 확장자입니다. 탐색기에서 확장자 표시를 켜고 `.py.txt`로 저장되지 않았는지 확인하세요. `#` 뒤의 주석은 설명이며 실행하지 않습니다. 터미널 명령·예상 출력은 코드에 복사하지 않습니다.

1. `course` 폴더의 주소 표시줄에 `powershell`을 입력하고 Enter를 누릅니다.
2. 터미널에 `python --version`을 입력합니다. 명령을 찾을 수 없으면 Windows에서는 `py --version`을 확인하고, 사용할 수 있는 명령에 맞춰 아래 `python`을 `py`로 바꿉니다. 둘 다 없으면 수업 준비 안내에서 Python 설치를 확인합니다.
3. 첫 예제로 `python -X utf8 samples/D01_normal.py`를 실행합니다. `-X utf8`은 한글 입출력을 UTF-8로 처리하는 옵션입니다.
4. 바꿀 때는 파일을 새 이름으로 저장하세요. 여기서는 normal·broken·starter가 **같은 samples 폴더**에 있어야 합니다. 특히 심화는 `samples/data`와 `sample_helpers.py`를 같이 둡니다.
5. 파일을 찾을 수 없다는 안내는 먼저 저장 위치와 이름을 확인합니다. 코드 문제와 Python 설치 문제를 구별하세요.

`normal`은 완성 예, `broken`은 의도한 오류, `starter`는 TODO를 직접 채우는 파일입니다. starter는 완성 전 실행 시 오류나 다른 출력이 날 수 있습니다. TODO 아래의 `pass`는 아무 일도 하지 않는 표시이며, `if False:`·`elif False:`는 해당 가지를 건너뛰는 임시 조건입니다. TODO 요구에 맞는 코드로 교체하세요. 오류 파일 중에는 실행은 끝나지만 결과가 틀린 경우도 있습니다.

## 폴더 안내

`samples/data`는 입력 원본, `samples/work`는 실행 결과가 저장되는 폴더입니다. 파일 저장 예제를 다시 실행하면 같은 이름의 **work 결과 파일**을 덮어씁니다. data 원본은 수정하기 전에 별도 사본을 만드세요. 추가 패키지 설치·계정·API 키·실물 센서는 필요하지 않습니다.

## 연습 순서

| 번호 | 예제 | 살펴볼 개념 |
|---|---|---|
| D01 | 반복되는 온도 판단을 함수로 묶기 | def, 매개변수, return, 조기 반환 |
| D02 | 기본값과 이름을 지정해 함수 호출 | 인수, 기본값, 키워드 인수, 지역 변수 |
| D03 | 중첩 자료를 고칠 때 원본 보존 | 얕은 복사, 깊은 복사, deepcopy |
| D04 | 두 목록을 짝지을 때 누락 찾기 | len, zip, enumerate, 길이 검수 |
| D05 | 숫자 변환 실패와 미측정 분리 | strip, 예외 처리, None, 튜플 |
| D06 | 파일 위치를 정하고 CSV 읽기 | Path, `__file__`, with, DictReader, UTF-8 |
| D07 | 쉼표·따옴표·빈값을 CSV로 저장 | DictWriter, writeheader, writerows, 재읽기 |
| D08 | JSON을 읽고 값의 종류 검사 | json.load, bool, 숫자, None, type |
| D09 | 번호 중복과 잘못된 기록을 따로 모으기 | 집합 set, 목록, 검수 순서, continue |
| D10 | 구역별 합계·개수·평균 집계 | 딕셔너리 누적, 중첩 값, None, 평균 |
| D11 | 다른 파일의 함수를 가져와 사용 | 모듈, import, 함수 재사용, 입력 계약 |
| D12 | CSV 검수부터 JSON 보고서까지 | 함수, CSV, 자료형, 오류 목록, JSON 저장 |

## 예제 코드와 직접 풀 문제


<details><summary>D01 · 반복되는 온도 판단을 함수로 묶기 — 코드·오류·직접 작성</summary>

### D01 · 반복되는 온도 판단을 함수로 묶기

**먼저 읽을 개념:** def, 매개변수, return, 조기 반환

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D01 · 반복되는 온도 판단을 함수로 묶기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: def, 매개변수, return, 조기 반환
# 실행: course 폴더에서 python -X utf8 samples/D01_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 함수는 입력을 받아 결과를 돌려주는 이름 붙은 코드 묶음입니다.
def classify_temperature(temperature):
    # None은 비교 전에 처리합니다. None >= 28은 할 수 없습니다.
    if temperature is None:
        return "미측정"  # 여기서 함수 실행이 끝납니다.
    if temperature >= 28:
        return "경고"
    if temperature >= 25:
        return "주의"
    return "정상"

# 함수를 정의하는 것만으로 결과는 출력되지 않습니다. 아래에서 호출합니다.
for value in [None, 0, 25, 28]:
    result = classify_temperature(value)
    print(f"{value}: {result}")
# print는 화면에 보여 주고 return은 호출한 코드에 값을 줍니다.
# 두 일을 섞지 않아야 다른 함수에서도 결과를 이용할 수 있습니다.
# 경고 임계값을 29로 바꾸면 28의 결과는 주의가 됩니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D01_normal.py
```

예상 출력:

```text
None: 미측정
0: 정상
25: 주의
28: 경고
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D01 오류 코드 펼치기</summary>

```python
# D01 · 반복되는 온도 판단을 함수로 묶기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: def, 매개변수, return, 조기 반환
# 실행: course 폴더에서 python -X utf8 samples/D01_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 함수는 입력을 받아 결과를 돌려주는 이름 붙은 코드 묶음입니다.
def classify_temperature(temperature):
    # None은 비교 전에 처리합니다. None >= 28은 할 수 없습니다.
    if temperature is None:
        print("미측정")  # 여기서 함수 실행이 끝납니다.
    if temperature >= 28:
        return "경고"
    if temperature >= 25:
        return "주의"
    return "정상"

# 함수를 정의하는 것만으로 결과는 출력되지 않습니다. 아래에서 호출합니다.
for value in [None, 0, 25, 28]:
    result = classify_temperature(value)
    print(f"{value}: {result}")
# print는 화면에 보여 주고 return은 호출한 코드에 값을 줍니다.
# 두 일을 섞지 않아야 다른 함수에서도 결과를 이용할 수 있습니다.
# 경고 임계값을 29로 바꾸면 28의 결과는 주의가 됩니다.
```

</details>

실행: `python -X utf8 samples/D01_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D01 수정 이유 확인하기</summary>

출력만 하고 함수를 끝내지 않아 None과 숫자를 비교하다 TypeError가 납니다. 수정한 파일을 `D01_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

미측정이라는 결과를 돌려주고 함수를 끝내세요. `D01_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D01_normal.py) · [오류 예](D01_broken.py) · [직접 작성 파일](D01_starter.py) · [예상 출력](D01_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D02 · 기본값과 이름을 지정해 함수 호출 — 코드·오류·직접 작성</summary>

### D02 · 기본값과 이름을 지정해 함수 호출

**먼저 읽을 개념:** 인수, 기본값, 키워드 인수, 지역 변수

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D02 · 기본값과 이름을 지정해 함수 호출
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 인수, 기본값, 키워드 인수, 지역 변수
# 실행: course 폴더에서 python -X utf8 samples/D02_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

def calculate_total(price, quantity, delivery=0):
    # price와 quantity는 호출할 때마다 새로 받는 함수 안의 이름입니다.
    # delivery를 생략하면 기본값 0을 사용합니다.
    subtotal = price * quantity
    total = subtotal + delivery
    return total

# 같은 계산 규칙을 서로 다른 입력에 적용합니다.
pickup = calculate_total(2000, 3)
shipped = calculate_total(2000, 3, delivery=1000)
# 이름을 지정하면 인수 순서를 바꿔도 뜻이 드러납니다.
named = calculate_total(quantity=2, price=1500, delivery=500)
print(f"방문 수령: {pickup}")
print(f"배송: {shipped}")
print(f"다른 주문: {named}")
# subtotal은 함수 안의 지역 변수이므로 바깥에서 바로 읽을 수 없습니다.
# 반환값을 pickup처럼 받아 다음 업무에서 사용하세요.
# 직접 작성: 할인 금액 discount=0을 인수로 더하고 계산하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D02_normal.py
```

예상 출력:

```text
방문 수령: 6000
배송: 7000
다른 주문: 3500
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D02 오류 코드 펼치기</summary>

```python
# D02 · 기본값과 이름을 지정해 함수 호출
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 인수, 기본값, 키워드 인수, 지역 변수
# 실행: course 폴더에서 python -X utf8 samples/D02_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

def calculate_total(price, quantity, delivery=0):
    # price와 quantity는 호출할 때마다 새로 받는 함수 안의 이름입니다.
    # delivery를 생략하면 기본값 0을 사용합니다.
    subtotal = price * quantity
    total = subtotal - delivery
    return total

# 같은 계산 규칙을 서로 다른 입력에 적용합니다.
pickup = calculate_total(2000, 3)
shipped = calculate_total(2000, 3, delivery=1000)
# 이름을 지정하면 인수 순서를 바꿔도 뜻이 드러납니다.
named = calculate_total(quantity=2, price=1500, delivery=500)
print(f"방문 수령: {pickup}")
print(f"배송: {shipped}")
print(f"다른 주문: {named}")
# subtotal은 함수 안의 지역 변수이므로 바깥에서 바로 읽을 수 없습니다.
# 반환값을 pickup처럼 받아 다음 업무에서 사용하세요.
# 직접 작성: 할인 금액 discount=0을 인수로 더하고 계산하세요.
```

</details>

실행: `python -X utf8 samples/D02_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D02 수정 이유 확인하기</summary>

배송비를 금액에서 빼면 배송 주문이 더 싸게 계산됩니다. 수정한 파일을 `D02_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

상품 금액에 배송비를 더하세요. `D02_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D02_normal.py) · [오류 예](D02_broken.py) · [직접 작성 파일](D02_starter.py) · [예상 출력](D02_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D03 · 중첩 자료를 고칠 때 원본 보존 — 코드·오류·직접 작성</summary>

### D03 · 중첩 자료를 고칠 때 원본 보존

**먼저 읽을 개념:** 얕은 복사, 깊은 복사, deepcopy

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D03 · 중첩 자료를 고칠 때 원본 보존
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 얕은 복사, 깊은 복사, deepcopy
# 실행: course 폴더에서 python -X utf8 samples/D03_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# copy는 Python에 기본으로 들어 있는 모듈입니다. 별도 설치하지 않습니다.
from copy import deepcopy
original = [{"id": "S01", "tags": ["입구"]}]
# 원본 안에 딕셔너리와 목록이 들어 있어 내부까지 복사해야 합니다.
working = deepcopy(original)
working[0]["tags"].append("점검")
working[0]["id"] = "S99"
print(f"원본 번호: {original[0]['id']}")
print(f"원본 태그: {original[0]['tags']}")
print(f"작업 번호: {working[0]['id']}")
print(f"작업 태그: {working[0]['tags']}")
# original.copy()는 가장 바깥 목록만 새로 만듭니다.
# 내부 딕셔너리는 공유하므로 원본 번호와 태그가 함께 바뀔 수 있습니다.
# 실제 파일을 지우지 않고 메모리 안의 원본과 작업 사본을 비교합니다.
# 직접 작성: 태그를 두 개 추가하고 원본 태그 길이가 1인지 확인하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D03_normal.py
```

예상 출력:

```text
원본 번호: S01
원본 태그: ['입구']
작업 번호: S99
작업 태그: ['입구', '점검']
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D03 오류 코드 펼치기</summary>

```python
# D03 · 중첩 자료를 고칠 때 원본 보존
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 얕은 복사, 깊은 복사, deepcopy
# 실행: course 폴더에서 python -X utf8 samples/D03_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# copy는 Python에 기본으로 들어 있는 모듈입니다. 별도 설치하지 않습니다.
from copy import deepcopy
original = [{"id": "S01", "tags": ["입구"]}]
# 원본 안에 딕셔너리와 목록이 들어 있어 내부까지 복사해야 합니다.
working = original.copy()
working[0]["tags"].append("점검")
working[0]["id"] = "S99"
print(f"원본 번호: {original[0]['id']}")
print(f"원본 태그: {original[0]['tags']}")
print(f"작업 번호: {working[0]['id']}")
print(f"작업 태그: {working[0]['tags']}")
# original.copy()는 가장 바깥 목록만 새로 만듭니다.
# 내부 딕셔너리는 공유하므로 원본 번호와 태그가 함께 바뀔 수 있습니다.
# 실제 파일을 지우지 않고 메모리 안의 원본과 작업 사본을 비교합니다.
# 직접 작성: 태그를 두 개 추가하고 원본 태그 길이가 1인지 확인하세요.
```

</details>

실행: `python -X utf8 samples/D03_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D03 수정 이유 확인하기</summary>

바깥 목록만 복사되어 내부 딕셔너리 수정이 원본에 반영됩니다. 수정한 파일을 `D03_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

내부 자료까지 별도로 복사하세요. `D03_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D03_normal.py) · [오류 예](D03_broken.py) · [직접 작성 파일](D03_starter.py) · [예상 출력](D03_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D04 · 두 목록을 짝지을 때 누락 찾기 — 코드·오류·직접 작성</summary>

### D04 · 두 목록을 짝지을 때 누락 찾기

**먼저 읽을 개념:** len, zip, enumerate, 길이 검수

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D04 · 두 목록을 짝지을 때 누락 찾기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: len, zip, enumerate, 길이 검수
# 실행: course 폴더에서 python -X utf8 samples/D04_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

def show_pairs(ids, values):
    # zip은 더 짧은 목록이 끝나면 멈춥니다. 먼저 개수를 비교합니다.
    if len(ids) != len(values):
        print("번호와 측정값의 개수가 다릅니다.")
        return
    # enumerate는 순번도 줍니다. start=1은 사람이 읽는 번호입니다.
    for number, pair in enumerate(zip(ids, values), start=1):
        sensor_id, temperature = pair  # 한 쌍을 두 이름으로 나눠 받습니다.
        print(f"{number}. {sensor_id}: {temperature}")

show_pairs(["S01", "S02"], [0, 22.5])
show_pairs(["S01", "S02", "S03"], [0, 22.5])
# 둘째 호출에서 S03이 조용히 사라지는 것을 길이 검사로 막습니다.
# 순번 number는 데이터의 고유 식별자 sensor_id를 대신하지 않습니다.
# 직접 작성: 빈 목록 두 개와 길이 하나만 다른 목록을 시험하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D04_normal.py
```

예상 출력:

```text
1. S01: 0
2. S02: 22.5
번호와 측정값의 개수가 다릅니다.
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D04 오류 코드 펼치기</summary>

```python
# D04 · 두 목록을 짝지을 때 누락 찾기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: len, zip, enumerate, 길이 검수
# 실행: course 폴더에서 python -X utf8 samples/D04_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

def show_pairs(ids, values):
    # zip은 더 짧은 목록이 끝나면 멈춥니다. 먼저 개수를 비교합니다.
    if len(ids) < len(values):
        print("번호와 측정값의 개수가 다릅니다.")
        return
    # enumerate는 순번도 줍니다. start=1은 사람이 읽는 번호입니다.
    for number, pair in enumerate(zip(ids, values), start=1):
        sensor_id, temperature = pair  # 한 쌍을 두 이름으로 나눠 받습니다.
        print(f"{number}. {sensor_id}: {temperature}")

show_pairs(["S01", "S02"], [0, 22.5])
show_pairs(["S01", "S02", "S03"], [0, 22.5])
# 둘째 호출에서 S03이 조용히 사라지는 것을 길이 검사로 막습니다.
# 순번 number는 데이터의 고유 식별자 sensor_id를 대신하지 않습니다.
# 직접 작성: 빈 목록 두 개와 길이 하나만 다른 목록을 시험하세요.
```

</details>

실행: `python -X utf8 samples/D04_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D04 수정 이유 확인하기</summary>

번호 목록이 더 길 때도 누락될 수 있는데 검사하지 않습니다. 수정한 파일을 `D04_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

두 목록의 개수가 다른지 검사하세요. `D04_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D04_normal.py) · [오류 예](D04_broken.py) · [직접 작성 파일](D04_starter.py) · [예상 출력](D04_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D05 · 숫자 변환 실패와 미측정 분리 — 코드·오류·직접 작성</summary>

### D05 · 숫자 변환 실패와 미측정 분리

**먼저 읽을 개념:** strip, 예외 처리, None, 튜플

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D05 · 숫자 변환 실패와 미측정 분리
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: strip, 예외 처리, None, 튜플
# 실행: course 폴더에서 python -X utf8 samples/D05_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

def parse_temperature(raw):
    # (값, 문제)를 한 쌍으로 반환합니다. 문제가 없으면 두 번째 값은 None입니다.
    text = raw.strip()
    if text == "":
        return None, None  # 빈칸은 미측정이지 입력 오류가 아닙니다.
    try:
        value = float(text)
    except ValueError:
        return None, "숫자가 아님"
    return value, None

for raw in ["22.5", "0", "", "오류"]:
    value, issue = parse_temperature(raw)
    if issue is not None:
        print(f"[{raw}]: 입력 오류")
    elif value is None:
        print(f"[{raw}]: 미측정")
    else:
        print(f"[{raw}]: {value}")
# 빈칸과 '오류'를 모두 None 하나로 반환하면 원인을 잃습니다.
# 이 단계에서는 온도의 현실적 범위까지 검사하지 않습니다.
# 직접 작성: '-2.5'와 ' 24 '도 숫자로 읽히는지 확인하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D05_normal.py
```

예상 출력:

```text
[22.5]: 22.5
[0]: 0.0
[]: 미측정
[오류]: 입력 오류
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D05 오류 코드 펼치기</summary>

```python
# D05 · 숫자 변환 실패와 미측정 분리
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: strip, 예외 처리, None, 튜플
# 실행: course 폴더에서 python -X utf8 samples/D05_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

def parse_temperature(raw):
    # (값, 문제)를 한 쌍으로 반환합니다. 문제가 없으면 두 번째 값은 None입니다.
    text = raw.strip()
    if text == "":
        return None, None  # 빈칸은 미측정이지 입력 오류가 아닙니다.
    try:
        value = float(text)
    except ValueError:
        return None, None
    return value, None

for raw in ["22.5", "0", "", "오류"]:
    value, issue = parse_temperature(raw)
    if issue is not None:
        print(f"[{raw}]: 입력 오류")
    elif value is None:
        print(f"[{raw}]: 미측정")
    else:
        print(f"[{raw}]: {value}")
# 빈칸과 '오류'를 모두 None 하나로 반환하면 원인을 잃습니다.
# 이 단계에서는 온도의 현실적 범위까지 검사하지 않습니다.
# 직접 작성: '-2.5'와 ' 24 '도 숫자로 읽히는지 확인하세요.
```

</details>

실행: `python -X utf8 samples/D05_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D05 수정 이유 확인하기</summary>

변환 실패를 정상적인 미측정으로 숨겨 오류 원문을 잃습니다. 수정한 파일을 `D05_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

변환 실패의 이유를 두 번째 반환값으로 남기세요. `D05_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D05_normal.py) · [오류 예](D05_broken.py) · [직접 작성 파일](D05_starter.py) · [예상 출력](D05_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D06 · 파일 위치를 정하고 CSV 읽기 — 코드·오류·직접 작성</summary>

### D06 · 파일 위치를 정하고 CSV 읽기

**먼저 읽을 개념:** Path, __file__, with, DictReader, UTF-8

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D06 · 파일 위치를 정하고 CSV 읽기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: Path, __file__, with, DictReader, UTF-8
# 실행: course 폴더에서 python -X utf8 samples/D06_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import csv
from pathlib import Path
# __file__은 지금 실행하는 .py의 위치입니다. 터미널의 현재 폴더와 다릅니다.
base = Path(__file__).resolve().parent
input_path = base / "data" / "readings.csv"  # /는 경로를 이어 붙입니다.
# with를 벗어나면 파일을 닫습니다. newline=""은 CSV 줄바꿈 처리에 사용합니다.
with input_path.open(encoding="utf-8-sig", newline="") as file:
    rows = list(csv.DictReader(file))  # 첫 줄의 열 이름이 딕셔너리의 키가 됩니다.
print(f"기록 수: {len(rows)}")
for row in rows:
    raw = row["temperature_c"]
    # CSV에서 읽은 수량·온도도 처음에는 문자열입니다.
    temperature = None if raw == "" else float(raw)
    # 위 표현은 '조건이면 앞 값, 아니면 뒤 값'인 짧은 조건 표현입니다.
    print(f"{row['sensor_id']}: {temperature}")
print(f"첫 번호 종류: {type(rows[0]['sensor_id']).__name__}")
# 원본 data 파일에는 쓰지 않습니다. .open에 w를 넣지 마세요.
# 다른 폴더에서 실행해도 __file__ 기준 data 경로는 같습니다.
# 직접 작성: 미측정 개수를 계산해 마지막에 출력하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D06_normal.py
```

예상 출력:

```text
기록 수: 3
001: 22.5
002: 0.0
003: None
첫 번호 종류: str
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D06 오류 코드 펼치기</summary>

```python
# D06 · 파일 위치를 정하고 CSV 읽기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: Path, __file__, with, DictReader, UTF-8
# 실행: course 폴더에서 python -X utf8 samples/D06_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import csv
from pathlib import Path
# __file__은 지금 실행하는 .py의 위치입니다. 터미널의 현재 폴더와 다릅니다.
base = Path(__file__).resolve().parent
input_path = base / "data" / "readings.csv"  # /는 경로를 이어 붙입니다.
# with를 벗어나면 파일을 닫습니다. newline=""은 CSV 줄바꿈 처리에 사용합니다.
with input_path.open(encoding="utf-8-sig", newline="") as file:
    rows = list(csv.DictReader(file))  # 첫 줄의 열 이름이 딕셔너리의 키가 됩니다.
print(f"기록 수: {len(rows)}")
for row in rows:
    raw = row["temperature_c"]
    # CSV에서 읽은 수량·온도도 처음에는 문자열입니다.
    temperature = float(raw)
    # 위 표현은 '조건이면 앞 값, 아니면 뒤 값'인 짧은 조건 표현입니다.
    print(f"{row['sensor_id']}: {temperature}")
print(f"첫 번호 종류: {type(rows[0]['sensor_id']).__name__}")
# 원본 data 파일에는 쓰지 않습니다. .open에 w를 넣지 마세요.
# 다른 폴더에서 실행해도 __file__ 기준 data 경로는 같습니다.
# 직접 작성: 미측정 개수를 계산해 마지막에 출력하세요.
```

</details>

실행: `python -X utf8 samples/D06_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D06 수정 이유 확인하기</summary>

빈 측정값을 float로 바꾸면 ValueError가 납니다. 수정한 파일을 `D06_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

빈칸은 None, 나머지는 float로 변환하세요. `D06_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D06_normal.py) · [오류 예](D06_broken.py) · [직접 작성 파일](D06_starter.py) · [예상 출력](D06_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D07 · 쉼표·따옴표·빈값을 CSV로 저장 — 코드·오류·직접 작성</summary>

### D07 · 쉼표·따옴표·빈값을 CSV로 저장

**먼저 읽을 개념:** DictWriter, writeheader, writerows, 재읽기

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D07 · 쉼표·따옴표·빈값을 CSV로 저장
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: DictWriter, writeheader, writerows, 재읽기
# 실행: course 폴더에서 python -X utf8 samples/D07_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import csv
from pathlib import Path
base = Path(__file__).resolve().parent
output_dir = base / "work"
output_dir.mkdir(exist_ok=True)  # 폴더가 있으면 그대로 사용합니다.
output_path = output_dir / "D07_orders.csv"
rows = [
    {"id": "001", "item": "볼트, 소형", "quantity": 0, "note": '담당자 "김"'},
    {"id": "002", "item": "너트", "quantity": None, "note": ""},
]
# w는 같은 이름의 출력 파일을 덮어씁니다. work 파일만 대상으로 합니다.
with output_path.open("w", encoding="utf-8-sig", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["id", "item", "quantity", "note"])
    writer.writeheader()  # 열 이름 한 줄을 먼저 씁니다.
    writer.writerows(rows)  # 쉼표와 큰따옴표 처리는 라이브러리에 맡깁니다.
# 저장했다고 끝내지 않고 다시 읽어 값이 유지되는지 확인합니다.
with output_path.open(encoding="utf-8-sig", newline="") as file:
    saved = list(csv.DictReader(file))
print(f"저장 기록: {len(saved)}")
print(f"첫 상품: {saved[0]['item']}")
print(f"첫 메모: {saved[0]['note']}")
print(f"둘째 수량 빈칸: {saved[1]['quantity'] == ''}")
# None은 csv writer에서 빈 문자열로 기록됩니다. 0은 '0'으로 남습니다.
# 직접 작성: 메모에 '창고, 안쪽'을 넣고 재읽기 결과를 확인하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D07_normal.py
```

예상 출력:

```text
저장 기록: 2
첫 상품: 볼트, 소형
첫 메모: 담당자 "김"
둘째 수량 빈칸: True
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D07 오류 코드 펼치기</summary>

```python
# D07 · 쉼표·따옴표·빈값을 CSV로 저장
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: DictWriter, writeheader, writerows, 재읽기
# 실행: course 폴더에서 python -X utf8 samples/D07_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import csv
from pathlib import Path
base = Path(__file__).resolve().parent
output_dir = base / "work"
output_dir.mkdir(exist_ok=True)  # 폴더가 있으면 그대로 사용합니다.
output_path = output_dir / "D07_orders.csv"
rows = [
    {"id": "001", "item": "볼트, 소형", "quantity": 0, "note": '담당자 "김"'},
    {"id": "002", "item": "너트", "quantity": None, "note": ""},
]
# w는 같은 이름의 출력 파일을 덮어씁니다. work 파일만 대상으로 합니다.
with output_path.open("w", encoding="utf-8-sig", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["id", "item", "quantity", "note"])
    pass  # 열 이름을 쓰지 않은 경우  # 열 이름 한 줄을 먼저 씁니다.
    writer.writerows(rows)  # 쉼표와 큰따옴표 처리는 라이브러리에 맡깁니다.
# 저장했다고 끝내지 않고 다시 읽어 값이 유지되는지 확인합니다.
with output_path.open(encoding="utf-8-sig", newline="") as file:
    saved = list(csv.DictReader(file))
print(f"저장 기록: {len(saved)}")
print(f"첫 상품: {saved[0]['item']}")
print(f"첫 메모: {saved[0]['note']}")
print(f"둘째 수량 빈칸: {saved[1]['quantity'] == ''}")
# None은 csv writer에서 빈 문자열로 기록됩니다. 0은 '0'으로 남습니다.
# 직접 작성: 메모에 '창고, 안쪽'을 넣고 재읽기 결과를 확인하세요.
```

</details>

실행: `python -X utf8 samples/D07_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D07 수정 이유 확인하기</summary>

첫 주문을 열 이름으로 읽어 필요한 item 키가 없어집니다. 수정한 파일을 `D07_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

열 이름을 파일의 첫 줄에 쓰세요. `D07_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D07_normal.py) · [오류 예](D07_broken.py) · [직접 작성 파일](D07_starter.py) · [예상 출력](D07_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D08 · JSON을 읽고 값의 종류 검사 — 코드·오류·직접 작성</summary>

### D08 · JSON을 읽고 값의 종류 검사

**먼저 읽을 개념:** json.load, bool, 숫자, None, type

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D08 · JSON을 읽고 값의 종류 검사
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: json.load, bool, 숫자, None, type
# 실행: course 폴더에서 python -X utf8 samples/D08_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import json
from pathlib import Path
base = Path(__file__).resolve().parent
with (base / "data" / "devices.json").open(encoding="utf-8") as file:
    devices = json.load(file)  # JSON null은 None, true/false는 True/False가 됩니다.
for record in devices:
    # 'false'라는 문자열은 비어 있지 않아 bool('false')가 True입니다.
    active = record["active"]
    if type(active) is not bool:
        print(f"{record['id']}: active 종류 오류")
        continue
    temperature = record["temperature_c"]
    # bool도 int의 일종이므로 bool 온도는 별도로 제외합니다.
    if temperature is not None and type(temperature) not in (int, float):
        print(f"{record['id']}: 온도 종류 오류")
        continue
    print(f"{record['id']}: 사용 {active}, 온도 {temperature}")
# 키를 찾는 []와 숫자 위치를 찾는 []는 받는 자료의 종류가 다릅니다.
# 직접 작성: 필수 키가 없는 기록에 '키 누락' 메시지를 추가하세요.
# JSON 문법이 맞아도 업무 약속의 자료형까지 맞는 것은 아닙니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D08_normal.py
```

예상 출력:

```text
S01: 사용 False, 온도 0
S02: active 종류 오류
S03: 사용 True, 온도 None
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D08 오류 코드 펼치기</summary>

```python
# D08 · JSON을 읽고 값의 종류 검사
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: json.load, bool, 숫자, None, type
# 실행: course 폴더에서 python -X utf8 samples/D08_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import json
from pathlib import Path
base = Path(__file__).resolve().parent
with (base / "data" / "devices.json").open(encoding="utf-8") as file:
    devices = json.load(file)  # JSON null은 None, true/false는 True/False가 됩니다.
for record in devices:
    # 'false'라는 문자열은 비어 있지 않아 bool('false')가 True입니다.
    active = bool(record["active"])
    if type(active) is not bool:
        print(f"{record['id']}: active 종류 오류")
        continue
    temperature = record["temperature_c"]
    # bool도 int의 일종이므로 bool 온도는 별도로 제외합니다.
    if temperature is not None and type(temperature) not in (int, float):
        print(f"{record['id']}: 온도 종류 오류")
        continue
    print(f"{record['id']}: 사용 {active}, 온도 {temperature}")
# 키를 찾는 []와 숫자 위치를 찾는 []는 받는 자료의 종류가 다릅니다.
# 직접 작성: 필수 키가 없는 기록에 '키 누락' 메시지를 추가하세요.
# JSON 문법이 맞아도 업무 약속의 자료형까지 맞는 것은 아닙니다.
```

</details>

실행: `python -X utf8 samples/D08_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D08 수정 이유 확인하기</summary>

문자열 false를 True로 바꾸어 자료형 오류까지 숨깁니다. 수정한 파일을 `D08_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

active의 원래 값을 그대로 검사하세요. `D08_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D08_normal.py) · [오류 예](D08_broken.py) · [직접 작성 파일](D08_starter.py) · [예상 출력](D08_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D09 · 번호 중복과 잘못된 기록을 따로 모으기 — 코드·오류·직접 작성</summary>

### D09 · 번호 중복과 잘못된 기록을 따로 모으기

**먼저 읽을 개념:** 집합 set, 목록, 검수 순서, continue

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D09 · 번호 중복과 잘못된 기록을 따로 모으기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 집합 set, 목록, 검수 순서, continue
# 실행: course 폴더에서 python -X utf8 samples/D09_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

records = [
    {"id": "S01", "temperature": 22.5},
    {"id": "S02", "temperature": 0},
    {"id": "S01", "temperature": 24},
    {"id": "", "temperature": 20},
    {"id": "S03", "temperature": None},
]
seen = set()  # {}는 빈 딕셔너리입니다. 빈 집합은 set()으로 만듭니다.
accepted = []
issues = []
for record in records:
    sensor_id = record["id"]
    if sensor_id == "":
        issues.append("번호 누락")
        continue
    if sensor_id in seen:
        issues.append(f"중복 {sensor_id}")
        continue
    seen.add(sensor_id)  # 처리한 식별자를 기억합니다.
    accepted.append(record)
print(f"받은 기록: {len(records)}")
print(f"사용 기록: {len(accepted)}")
for issue in issues:
    print(f"문제: {issue}")
# 여기서는 '한 센서당 한 기록'이라는 교육용 약속을 사용합니다.
# 실제 시간별 측정 로그는 같은 센서 번호가 반복될 수 있습니다.
# 직접 작성: 문제 목록에 원본 줄 번호도 넣으세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D09_normal.py
```

예상 출력:

```text
받은 기록: 5
사용 기록: 3
문제: 중복 S01
문제: 번호 누락
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D09 오류 코드 펼치기</summary>

```python
# D09 · 번호 중복과 잘못된 기록을 따로 모으기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 집합 set, 목록, 검수 순서, continue
# 실행: course 폴더에서 python -X utf8 samples/D09_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

records = [
    {"id": "S01", "temperature": 22.5},
    {"id": "S02", "temperature": 0},
    {"id": "S01", "temperature": 24},
    {"id": "", "temperature": 20},
    {"id": "S03", "temperature": None},
]
seen = set()  # {}는 빈 딕셔너리입니다. 빈 집합은 set()으로 만듭니다.
accepted = []
issues = []
for record in records:
    sensor_id = record["id"]
    if sensor_id == "":
        issues.append("번호 누락")
        continue
    if sensor_id in seen:
        issues.append(f"중복 {sensor_id}")
        continue
    pass  # 처리한 번호를 기억하지 않은 경우  # 처리한 식별자를 기억합니다.
    accepted.append(record)
print(f"받은 기록: {len(records)}")
print(f"사용 기록: {len(accepted)}")
for issue in issues:
    print(f"문제: {issue}")
# 여기서는 '한 센서당 한 기록'이라는 교육용 약속을 사용합니다.
# 실제 시간별 측정 로그는 같은 센서 번호가 반복될 수 있습니다.
# 직접 작성: 문제 목록에 원본 줄 번호도 넣으세요.
```

</details>

실행: `python -X utf8 samples/D09_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D09 수정 이유 확인하기</summary>

seen이 계속 비어 있어서 두 번째 S01을 중복으로 찾지 못합니다. 수정한 파일을 `D09_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

처리한 식별자를 집합에 기록하세요. `D09_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D09_normal.py) · [오류 예](D09_broken.py) · [직접 작성 파일](D09_starter.py) · [예상 출력](D09_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D10 · 구역별 합계·개수·평균 집계 — 코드·오류·직접 작성</summary>

### D10 · 구역별 합계·개수·평균 집계

**먼저 읽을 개념:** 딕셔너리 누적, 중첩 값, None, 평균

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D10 · 구역별 합계·개수·평균 집계
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 딕셔너리 누적, 중첩 값, None, 평균
# 실행: course 폴더에서 python -X utf8 samples/D10_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

records = [
    {"zone": "A", "temperature": 22},
    {"zone": "A", "temperature": 0},
    {"zone": "B", "temperature": None},
    {"zone": "B", "temperature": 30},
]
groups = {}
for record in records:
    zone = record["zone"]
    if zone not in groups:
        groups[zone] = {"sum": 0, "count": 0, "missing": 0}
    temperature = record["temperature"]
    if temperature is None:
        groups[zone]["missing"] += 1  # += 1은 현재 값에 1을 더해 저장합니다.
        continue
    groups[zone]["sum"] += temperature
    groups[zone]["count"] += 1
for zone, group in groups.items():
    if group["count"] == 0:
        average = None
    else:
        average = group["sum"] / group["count"]
    print(f"{zone}: 측정 {group['count']}, 미측정 {group['missing']}, 평균 {average}")
# 미측정은 분모에서 제외합니다. 0은 측정 개수에 포함합니다.
# 직접 작성: 구역 C에 None만 한 건 넣고 평균이 None인지 확인하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D10_normal.py
```

예상 출력:

```text
A: 측정 2, 미측정 0, 평균 11.0
B: 측정 1, 미측정 1, 평균 30.0
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D10 오류 코드 펼치기</summary>

```python
# D10 · 구역별 합계·개수·평균 집계
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 딕셔너리 누적, 중첩 값, None, 평균
# 실행: course 폴더에서 python -X utf8 samples/D10_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

records = [
    {"zone": "A", "temperature": 22},
    {"zone": "A", "temperature": 0},
    {"zone": "B", "temperature": None},
    {"zone": "B", "temperature": 30},
]
groups = {}
for record in records:
    zone = record["zone"]
    if zone not in groups:
        groups[zone] = {"sum": 0, "count": 0, "missing": 0}
    temperature = record["temperature"]
    if temperature is None:
        groups[zone]["missing"] += 1  # += 1은 현재 값에 1을 더해 저장합니다.
        continue
    groups[zone]["sum"] += temperature
    groups[zone]["count"] += 2
for zone, group in groups.items():
    if group["count"] == 0:
        average = None
    else:
        average = group["sum"] / group["count"]
    print(f"{zone}: 측정 {group['count']}, 미측정 {group['missing']}, 평균 {average}")
# 미측정은 분모에서 제외합니다. 0은 측정 개수에 포함합니다.
# 직접 작성: 구역 C에 None만 한 건 넣고 평균이 None인지 확인하세요.
```

</details>

실행: `python -X utf8 samples/D10_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D10 수정 이유 확인하기</summary>

측정 개수를 두 배로 세어 평균이 절반이 됩니다. 수정한 파일을 `D10_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

정상 측정 한 건마다 개수를 1만 늘리세요. `D10_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D10_normal.py) · [오류 예](D10_broken.py) · [직접 작성 파일](D10_starter.py) · [예상 출력](D10_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D11 · 다른 파일의 함수를 가져와 사용 — 코드·오류·직접 작성</summary>

### D11 · 다른 파일의 함수를 가져와 사용

**먼저 읽을 개념:** 모듈, import, 함수 재사용, 입력 계약

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D11 · 다른 파일의 함수를 가져와 사용
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 모듈, import, 함수 재사용, 입력 계약
# 실행: course 폴더에서 python -X utf8 samples/D11_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# sample_helpers.py를 이 파일과 같은 samples 폴더에 둡니다.
# 설치가 필요한 외부 패키지가 아니라 같이 제공된 Python 파일입니다.
from sample_helpers import normalize_active, summarize_values
values = [22.5, 0, None, 30]
summary = summarize_values(values)
print(f"측정: {summary['count']}")
print(f"미측정: {summary['missing']}")
print(f"평균: {summary['average']}")
# 함수가 받아들이는 값의 범위도 확인합니다. 대소문자와 공백을 정리합니다.
print(f"상태: {normalize_active(' FALSE ')}")
try:
    normalize_active("unknown")
except ValueError as error:
    print(f"잘못된 상태: {error}")
# 파일명을 json.py나 csv.py로 붙이면 기본 모듈과 이름이 겹칠 수 있습니다.
# ModuleNotFoundError가 나면 sample_helpers.py의 위치와 철자를 확인하세요.
# 직접 작성: values를 []로 바꿔 평균이 None인지 확인하세요.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D11_normal.py
```

예상 출력:

```text
측정: 3
미측정: 1
평균: 17.5
상태: False
잘못된 상태: true 또는 false가 필요합니다
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D11 오류 코드 펼치기</summary>

```python
# D11 · 다른 파일의 함수를 가져와 사용
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 모듈, import, 함수 재사용, 입력 계약
# 실행: course 폴더에서 python -X utf8 samples/D11_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# sample_helpers.py를 이 파일과 같은 samples 폴더에 둡니다.
# 설치가 필요한 외부 패키지가 아니라 같이 제공된 Python 파일입니다.
from sample_helpers import normalize_active, summarize_values
values = [22.5, 0, None, 30]
summary = summarize_values([])
print(f"측정: {summary['count']}")
print(f"미측정: {summary['missing']}")
print(f"평균: {summary['average']}")
# 함수가 받아들이는 값의 범위도 확인합니다. 대소문자와 공백을 정리합니다.
print(f"상태: {normalize_active(' FALSE ')}")
try:
    normalize_active("unknown")
except ValueError as error:
    print(f"잘못된 상태: {error}")
# 파일명을 json.py나 csv.py로 붙이면 기본 모듈과 이름이 겹칠 수 있습니다.
# ModuleNotFoundError가 나면 sample_helpers.py의 위치와 철자를 확인하세요.
# 직접 작성: values를 []로 바꿔 평균이 None인지 확인하세요.
```

</details>

실행: `python -X utf8 samples/D11_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D11 수정 이유 확인하기</summary>

실제 측정 목록을 전달하지 않아 결과가 모두 빈 자료로 집계됩니다. 수정한 파일을 `D11_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

실제 values 목록을 함수에 전달하세요. `D11_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D11_normal.py) · [오류 예](D11_broken.py) · [직접 작성 파일](D11_starter.py) · [예상 출력](D11_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

<details><summary>D12 · CSV 검수부터 JSON 보고서까지 — 코드·오류·직접 작성</summary>

### D12 · CSV 검수부터 JSON 보고서까지

**먼저 읽을 개념:** 함수, CSV, 자료형, 오류 목록, JSON 저장

**내 예상:** 첫 출력 _____ / 마지막 출력 _____ / 바뀌는 값 _____.

#### 1. 주석을 읽고 완성 예를 실행하세요

```python
# D12 · CSV 검수부터 JSON 보고서까지
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 함수, CSV, 자료형, 오류 목록, JSON 저장
# 실행: course 폴더에서 python -X utf8 samples/D12_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import csv
import json
import math
from pathlib import Path
from sample_helpers import normalize_active, summarize_values

def load_records(path):
    # 파일 읽기와 업무 검수를 다른 함수로 나눕니다.
    with path.open(encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        required = {"sensor_id", "temperature_c", "active"}
        if not required.issubset(reader.fieldnames or []):
            raise ValueError("sensor_id, temperature_c, active 열이 필요합니다")
        return list(reader)

def validate_rows(rows):
    accepted = []
    issues = []
    seen = set()
    for line_number, row in enumerate(rows, start=2):
        # CSV 첫 줄은 열 이름이므로 데이터 줄 번호는 2부터 시작합니다.
        # 열이 넘치면 None 키, 부족하면 None 값이 생깁니다. 빈 문자열과 다릅니다.
        wrong_shape = None in row
        for value in row.values():
            if value is None:
                wrong_shape = True
        if wrong_shape:
            issues.append({"line": line_number, "reason": "열 개수 오류"})
            continue
        sensor_id = row["sensor_id"].strip()
        if sensor_id == "":
            issues.append({"line": line_number, "reason": "번호 누락"})
            continue
        # 원본에 번호가 반복되면 뒤쪽 기록을 임의로 덮어쓰지 않습니다.
        if sensor_id in seen:
            issues.append({"line": line_number, "reason": "번호 중복"})
            continue
        seen.add(sensor_id)
        raw = row["temperature_c"].strip()
        try:
            temperature = None if raw == "" else float(raw)
            # float('NaN')은 변환에 성공하지만 정상 측정값으로 쓰면 안 됩니다.
            if temperature is not None and not math.isfinite(temperature):
                raise ValueError("유한한 온도가 필요합니다")
            active = normalize_active(row["active"])
        except ValueError:
            # 문제 원문과 줄 번호를 남겨 담당자가 다시 확인할 수 있게 합니다.
            issues.append({"line": line_number, "reason": "온도 또는 상태 오류", "raw": row})
            continue
        accepted.append({"id": sensor_id, "temperature": temperature, "active": active})
    return accepted, issues

def make_report(records, issues, input_count):
    values = []
    alerts = []
    for record in records:
        temperature = record["temperature"]
        values.append(temperature)
        # 교육용 기준입니다. 실제 장비 제어 명령을 보내지 않습니다.
        if record["active"] and temperature is not None and temperature >= 28:
            alerts.append(record["id"])
    return {"input_count": input_count, "accepted_count": len(records),
            "summary": summarize_values(values), "alerts": alerts, "issues": issues}

base = Path(__file__).resolve().parent
rows = load_records(base / "data" / "inspection.csv")
accepted, issues = validate_rows(rows)
report = make_report(accepted, issues, len(rows))
output_dir = base / "work"
output_dir.mkdir(exist_ok=True)
output_path = output_dir / "D12_report.json"
# ensure_ascii=False는 한글을 그대로 저장하고 indent=2는 들여쓰기를 줍니다.
with output_path.open("w", encoding="utf-8") as file:
    json.dump(report, file, ensure_ascii=False, indent=2, allow_nan=False)
# 저장한 파일을 다시 읽습니다. None은 파일 안에서 null로 바뀝니다.
with output_path.open(encoding="utf-8") as file:
    saved = json.load(file)
print(f"입력: {saved['input_count']} / 사용: {saved['accepted_count']} / 문제: {len(saved['issues'])}")
print(f"측정: {saved['summary']['count']} / 미측정: {saved['summary']['missing']}")
print(f"평균: {saved['summary']['average']}")
print(f"경고: {saved['alerts']}")
# 직접 작성: 경고 임계값을 함수의 인수로 받아 28과 31의 결과를 비교하세요.
# 평균 계산은 이 예제에서 비활성 장치의 유효 측정값도 포함하는 약속입니다.
# 입력 CSV는 그대로 두고 work/D12_report.json만 다시 저장합니다.
```

터미널에서 실행합니다.

```text
python -X utf8 samples/D12_normal.py
```

예상 출력:

```text
입력: 7 / 사용: 4 / 문제: 3
측정: 3 / 미측정: 1
평균: 17.5
경고: ['S04']
```

#### 2. 의도한 오류를 직접 고치세요

정상 파일과 비교하기 전에 아래 파일의 결과를 예상하세요. 실행이 성공해도 예상 출력과 다르면 문제를 찾습니다.

<details><summary>D12 오류 코드 펼치기</summary>

```python
# D12 · CSV 검수부터 JSON 보고서까지
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 함수, CSV, 자료형, 오류 목록, JSON 저장
# 실행: course 폴더에서 python -X utf8 samples/D12_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import csv
import json
import math
from pathlib import Path
from sample_helpers import normalize_active, summarize_values

def load_records(path):
    # 파일 읽기와 업무 검수를 다른 함수로 나눕니다.
    with path.open(encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        required = {"sensor_id", "temperature_c", "active"}
        if not required.issubset(reader.fieldnames or []):
            raise ValueError("sensor_id, temperature_c, active 열이 필요합니다")
        return list(reader)

def validate_rows(rows):
    accepted = []
    issues = []
    seen = set()
    for line_number, row in enumerate(rows, start=2):
        # CSV 첫 줄은 열 이름이므로 데이터 줄 번호는 2부터 시작합니다.
        # 열이 넘치면 None 키, 부족하면 None 값이 생깁니다. 빈 문자열과 다릅니다.
        wrong_shape = None in row
        for value in row.values():
            if value is None:
                wrong_shape = True
        if wrong_shape:
            issues.append({"line": line_number, "reason": "열 개수 오류"})
            continue
        sensor_id = row["sensor_id"].strip()
        if sensor_id == "":
            issues.append({"line": line_number, "reason": "번호 누락"})
            continue
        # 원본에 번호가 반복되면 뒤쪽 기록을 임의로 덮어쓰지 않습니다.
        if sensor_id in seen:
            issues.append({"line": line_number, "reason": "번호 중복"})
            continue
        seen.add(sensor_id)
        raw = row["temperature_c"].strip()
        try:
            temperature = 0 if raw == "" else float(raw)
            # float('NaN')은 변환에 성공하지만 정상 측정값으로 쓰면 안 됩니다.
            if temperature is not None and not math.isfinite(temperature):
                raise ValueError("유한한 온도가 필요합니다")
            active = normalize_active(row["active"])
        except ValueError:
            # 문제 원문과 줄 번호를 남겨 담당자가 다시 확인할 수 있게 합니다.
            issues.append({"line": line_number, "reason": "온도 또는 상태 오류", "raw": row})
            continue
        accepted.append({"id": sensor_id, "temperature": temperature, "active": active})
    return accepted, issues

def make_report(records, issues, input_count):
    values = []
    alerts = []
    for record in records:
        temperature = record["temperature"]
        values.append(temperature)
        # 교육용 기준입니다. 실제 장비 제어 명령을 보내지 않습니다.
        if record["active"] and temperature is not None and temperature >= 28:
            alerts.append(record["id"])
    return {"input_count": input_count, "accepted_count": len(records),
            "summary": summarize_values(values), "alerts": alerts, "issues": issues}

base = Path(__file__).resolve().parent
rows = load_records(base / "data" / "inspection.csv")
accepted, issues = validate_rows(rows)
report = make_report(accepted, issues, len(rows))
output_dir = base / "work"
output_dir.mkdir(exist_ok=True)
output_path = output_dir / "D12_report.json"
# ensure_ascii=False는 한글을 그대로 저장하고 indent=2는 들여쓰기를 줍니다.
with output_path.open("w", encoding="utf-8") as file:
    json.dump(report, file, ensure_ascii=False, indent=2, allow_nan=False)
# 저장한 파일을 다시 읽습니다. None은 파일 안에서 null로 바뀝니다.
with output_path.open(encoding="utf-8") as file:
    saved = json.load(file)
print(f"입력: {saved['input_count']} / 사용: {saved['accepted_count']} / 문제: {len(saved['issues'])}")
print(f"측정: {saved['summary']['count']} / 미측정: {saved['summary']['missing']}")
print(f"평균: {saved['summary']['average']}")
print(f"경고: {saved['alerts']}")
# 직접 작성: 경고 임계값을 함수의 인수로 받아 28과 31의 결과를 비교하세요.
# 평균 계산은 이 예제에서 비활성 장치의 유효 측정값도 포함하는 약속입니다.
# 입력 CSV는 그대로 두고 work/D12_report.json만 다시 저장합니다.
```

</details>

실행: `python -X utf8 samples/D12_broken.py`. 문제가 난 줄과 이전 줄의 값·종류를 확인합니다. Traceback의 마지막 줄에서 오류 종류를 읽고, 해당 파일의 줄 번호로 돌아갑니다.

<details><summary>D12 수정 이유 확인하기</summary>

미측정을 0으로 바꾸면 측정 개수와 평균이 틀립니다. 수정한 파일을 `D12_fixed.py`로 같은 samples 폴더에 저장하고 정상 예의 출력과 비교하세요.

</details>

#### 3. TODO를 채우고 새 입력으로 시험하세요

빈 측정값을 None으로 보존하세요. `D12_starter.py`를 편집기로 열어 TODO와 pass를 바꾸세요. 이후 코드 마지막의 직접 작성 문제나 입력 변경 문제도 풀어 봅니다.

[완성 예](D12_normal.py) · [오류 예](D12_broken.py) · [직접 작성 파일](D12_starter.py) · [예상 출력](D12_expected.txt)

**완료 확인:** 정상 예 실행 → 오류 찾기 → 고친 이유 설명 → TODO 완성 → 서로 다른 입력 두 가지 시험.

</details>

함께 필요한 파일: [함수 모음](sample_helpers.py) · [CSV 읽기 자료](data/readings.csv) · [JSON 종류 검사 자료](data/devices.json) · [종합 검수 자료](data/inspection.csv).

파일 형식 참고: [Python CSV 공식 문서](https://docs.python.org/3/library/csv.html) · [Python JSON 공식 문서](https://docs.python.org/3/library/json.html).
