# 전체 코드와 모든 줄의 뜻

이 문서는 완성 예제를 읽고 지정한 한 값 또는 작은 부분을 바꾸기 위한 안내입니다. 함수·서버·앱 전체를 빈 파일에서 작성하는 것은 필수 과제가 아닙니다. work의 작업본은 같은 구조를 사용합니다. 생성된 번들과 의존성 잠금 파일은 사람이 작성한 교육 코드와 구분합니다.

## 실행 위치와 확인

ZIP을 풀고 **course 폴더를 현재 작업 폴더**로 선택합니다. Python 파일은 UTF-8입니다. 개인 실행·강사 실행 관찰·기록된 결과 비교를 답칸에 구별해 씁니다.

```text
python code/check_cases.py code/baseline.py
python code/check_cases.py code/proposal_a.py
python code/check_cases.py code/reviewed.py
python code/check_cases.py work/classifier.py
```

아래 stdout은 실제 실행 기록입니다. baseline과 proposal_a는 실패를 배우기 위한 예이므로 종료 코드 1이 예상입니다. work/classifier.py의 경계 비교를 `>`에서 `>=`로만 바꾸면 경계 사례는 개선되지만 미측정과 자료형 문제가 남습니다. 두 문제를 같은 것으로 보지 않습니다.

### baseline.py 실제 전체 stdout · 종료 1

```text
zero PASS 정상
below PASS 정상
boundary FAIL 정상
above PASS 주의
missing FAIL 정상
text FAIL TypeError
boolean FAIL 정상
negative FAIL 정상
high FAIL 주의
통과 3/9
```

### proposal_a.py 실제 전체 stdout · 종료 1

```text
zero PASS 정상
below FAIL 주의
boundary PASS 주의
above PASS 주의
missing FAIL 정상
text FAIL TypeError
boolean FAIL 정상
negative FAIL 정상
high FAIL 주의
통과 3/9
```

### reviewed.py 실제 전체 stdout · 종료 0

```text
zero PASS 정상
below PASS 정상
boundary PASS 주의
above PASS 주의
missing PASS 미측정
text PASS 입력 오류
boolean PASS 입력 오류
negative PASS 입력 오류
high PASS 입력 오류
통과 9/9
```

## baseline.py

```python
def classify(value, threshold=28):
    if value is None:
        return "정상"
    if value > threshold:
        return "주의"
    return "정상"
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 값 value와 기본 경계값 threshold=28을 받는 함수를 정의합니다. 아직 실행 결과를 출력하지 않습니다. |
| 2 | 아직 측정하지 않은 None인지 먼저 확인합니다. 0과 다른 상태입니다. |
| 3 | 조건에 따라 "정상" 값을 반환하고 이번 함수 호출을 끝냅니다. 반환과 화면 출력은 별개입니다. |
| 4 | 경계값보다 큰 경우만 선택합니다. 이 초기 코드에서는 정확히 28을 놓칩니다. |
| 5 | 조건에 따라 "주의" 값을 반환하고 이번 함수 호출을 끝냅니다. 반환과 화면 출력은 별개입니다. |
| 6 | 조건에 따라 "정상" 값을 반환하고 이번 함수 호출을 끝냅니다. 반환과 화면 출력은 별개입니다. |

## check_cases.py

```python
import importlib.util
import json
import sys
from pathlib import Path
root = Path(__file__).resolve().parent.parent
target = Path(sys.argv[1]).resolve()
spec = importlib.util.spec_from_file_location("candidate", target)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
cases = json.loads((root / "data" / "cases.json").read_text(encoding="utf-8"))
passed = 0
for case in cases:
    try:
        actual = module.classify(case["value"])
    except Exception as error:
        actual = type(error).__name__
    ok = actual == case["expected"]
    passed += int(ok)
    print(case["id"], "PASS" if ok else "FAIL", actual)
print(f"통과 {passed}/{len(cases)}")
raise SystemExit(0 if passed == len(cases) else 1)
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 파일 경로로 Python 모듈을 읽는 도구를 가져옵니다. |
| 2 | JSON 문서를 Python 값으로 읽는 도구입니다. |
| 3 | 명령 뒤에 쓴 파일 이름을 읽기 위해 sys를 가져옵니다. |
| 4 | 폴더와 파일 경로를 다루는 Path를 가져옵니다. |
| 5 | 현재 코드 파일의 두 단계 위인 course 폴더를 찾습니다. |
| 6 | 명령의 첫 번째 인자를 검사할 파일의 절대 경로로 바꿉니다. |
| 7 | 대상 파일을 candidate라는 임시 이름으로 읽을 준비를 합니다. |
| 8 | 그 준비 정보를 바탕으로 모듈 객체를 만듭니다. |
| 9 | 대상 파일의 코드를 실행해 classify 함수를 사용할 수 있게 합니다. |
| 10 | data/cases.json을 UTF-8 글자로 읽고 사례 목록으로 해석합니다. |
| 11 | 맞은 사례 수를 0으로 시작합니다. |
| 12 | 목록에서 사례 하나씩 꺼냅니다. 학생이 반복문을 새로 작성할 필요는 없습니다. |
| 13 | 아래 함수 호출에서 오류가 발생할 수 있으므로 보호 구간을 시작합니다. |
| 14 | 현재 사례의 value를 대상 함수에 주고 실제 결과를 받습니다. |
| 15 | 호출 중 예외가 발생하면 error라는 이름으로 받습니다. |
| 16 | 예외의 종류 이름을 실제 결과로 기록합니다. 예: TypeError. |
| 17 | 실제 결과와 사례에 미리 적힌 expected가 같은지 비교합니다. |
| 18 | True를 1, False를 0으로 바꾸어 통과 수에 더합니다. |
| 19 | 사례 이름, PASS 또는 FAIL, 실제 결과를 한 줄에 출력합니다. |
| 20 | 통과한 수와 전체 사례 수를 출력합니다. |
| 21 | 전부 맞으면 종료 코드 0, 하나라도 틀리면 1로 끝냅니다. 1은 이번 비교에서 실패가 있다는 뜻입니다. |

## proposal_a.py

```python
def classify(value, threshold=27):
    if value is None:
        value = 0
    if value >= threshold:
        return "주의"
    return "정상"
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 값 value와 기본 경계값 threshold=27을 받는 함수를 정의합니다. 아직 실행 결과를 출력하지 않습니다. |
| 2 | 아직 측정하지 않은 None인지 먼저 확인합니다. 0과 다른 상태입니다. |
| 3 | 이 잘못된 제안은 미측정을 0으로 바꿉니다. 원래 의미를 잃으므로 채택하지 않습니다. |
| 4 | 경계값과 같거나 큰 경우를 선택합니다. 28도 주의가 됩니다. |
| 5 | 조건에 따라 "주의" 값을 반환하고 이번 함수 호출을 끝냅니다. 반환과 화면 출력은 별개입니다. |
| 6 | 조건에 따라 "정상" 값을 반환하고 이번 함수 호출을 끝냅니다. 반환과 화면 출력은 별개입니다. |

## reviewed.py

```python
def classify(value, threshold=28):
    if value is None:
        return "미측정"
    if type(value) not in (int, float):
        return "입력 오류"
    if not 0 <= value <= 50:
        return "입력 오류"
    if value >= threshold:
        return "주의"
    return "정상"
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 값 value와 기본 경계값 threshold=28을 받는 함수를 정의합니다. 아직 실행 결과를 출력하지 않습니다. |
| 2 | 아직 측정하지 않은 None인지 먼저 확인합니다. 0과 다른 상태입니다. |
| 3 | 조건에 따라 "미측정" 값을 반환하고 이번 함수 호출을 끝냅니다. 반환과 화면 출력은 별개입니다. |
| 4 | 정확한 자료형이 int 또는 float인지 검사합니다. True 같은 bool은 여기서 거릅니다. |
| 5 | 조건에 따라 "입력 오류" 값을 반환하고 이번 함수 호출을 끝냅니다. 반환과 화면 출력은 별개입니다. |
| 6 | 0 이상 50 이하의 수업용 범위 밖인지 검사합니다. |
| 7 | 조건에 따라 "입력 오류" 값을 반환하고 이번 함수 호출을 끝냅니다. 반환과 화면 출력은 별개입니다. |
| 8 | 경계값과 같거나 큰 경우를 선택합니다. 28도 주의가 됩니다. |
| 9 | 조건에 따라 "주의" 값을 반환하고 이번 함수 호출을 끝냅니다. 반환과 화면 출력은 별개입니다. |
| 10 | 조건에 따라 "정상" 값을 반환하고 이번 함수 호출을 끝냅니다. 반환과 화면 출력은 별개입니다. |

## 확인 기록의 한계

코드·프로토콜·로컬 API의 실제 결과와 실제 학생 수행 시간은 다른 검증입니다. 실물 센서와 외부 AI 계정·유료 API는 사용하지 않았습니다. 