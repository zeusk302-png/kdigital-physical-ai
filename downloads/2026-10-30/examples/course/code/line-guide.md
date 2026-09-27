# 완성 코드 전체와 모든 줄의 뜻

실행 위치는 이 날짜의 `examples/course` 폴더입니다. 파일을 저장하는 일과 Python으로 실행하는 일을 구분합니다. 새 함수를 처음부터 설계하기보다 입력·처리·출력과 한 값 수정을 먼저 확인합니다.

코드의 작은 수정을 할 때는 code 파일을 work 폴더에 같은 이름으로 복사하고 `python -X utf8 work/파일이름.py`로 실행합니다. data·code·work의 상대 배치를 유지하면 제공 경로가 이어집니다. 설정 파일을 바꾸는 활동은 해당 work/settings.json만 수정합니다.

## 01_compare_options.py

조건: Python3 표준 라이브러리만 사용합니다. 네트워크·계정은 필요 없습니다.

실행: `python -X utf8 code/01_compare_options.py`

```python
import json
from pathlib import Path
root = Path(__file__).resolve().parent.parent
plan = json.loads((root / "data" / "options.json").read_text(encoding="utf-8"))
weights = plan["weights"]
for option in plan["options"]:
    score = 0
    for criterion, weight in weights.items():
        score = score + option[criterion] * weight
    print(option["id"], round(score, 2))
```

| 줄 | 코드의 뜻 |

|---:|---|

| 1 | JSON을 읽는 도구를 가져옵니다. |

| 2 | 파일 경로 도구를 가져옵니다. |

| 3 | 코드 위치에서 course 폴더를 찾습니다. |

| 4 | 후보 점수와 가중치 파일을 읽어 딕셔너리로 풉니다. |

| 5 | 기준별 중요도를 꺼냅니다. |

| 6 | 후보 하나씩 계산합니다. |

| 7 | 이번 후보의 합계를 0으로 시작합니다. |

| 8 | 기준 이름과 그 가중치를 한 쌍씩 읽습니다. |

| 9 | 점수×가중치를 더해 합계를 갱신합니다. |

| 10 | 후보 ID와 소수 둘째 자리까지의 합계를 출력합니다. |

예상 또는 실제 확인 결과:

```text
A 4.65
B 3.45
C 3.85
```

한 값 바꾸기: work에 복사한 코드에서 options.json을 options_equal.json으로 바꾸면 세 기준의 같은 가중치 결과4.67·3.33·4.00입니다.

오류 해결: JSON 필드 이름과 큰따옴표를 확인합니다. 점수는 교육용 판단이며 수치가 객관적 확률이라는 뜻은 아닙니다.

## 02_check_evidence.py

조건: Python3만 사용하며 제공된 가상 관찰 기록을 비교합니다. 기획한 대시보드를 구현·실행하는 코드가 아닙니다.

실행: `python -X utf8 code/02_check_evidence.py`

```python
import json
from pathlib import Path
root = Path(__file__).resolve().parent.parent
cases = json.loads((root / "data" / "test_observations.json").read_text(encoding="utf-8"))
passed = 0
for case in cases:
    actual = case["actual"]
    if actual is None:
        result = "NOT_RUN"
    elif actual == case["expected"]:
        result = "PASS"
        passed = passed + 1
    else:
        result = "FAIL"
    print(case["id"], result)
print("passed:", passed, "/", len(cases))
```

| 줄 | 코드의 뜻 |

|---:|---|

| 1 | JSON을 읽는 도구를 가져옵니다. |

| 2 | 파일 경로 도구를 가져옵니다. |

| 3 | course 폴더를 찾습니다. |

| 4 | 가상의 시험 관찰 기록을 읽습니다. 실제 제품을 실행하는 줄은 없습니다. |

| 5 | 통과 수를 0으로 시작합니다. |

| 6 | 시험 기록을 한 건씩 읽습니다. |

| 7 | 관찰 결과 actual을 꺼냅니다. |

| 8 | None이면 관찰값이 없는 미실행으로 구분합니다. |

| 9 | 미실행 상태 이름을 정합니다. |

| 10 | 관찰값과 미리 정한 기대값이 같은지 비교합니다. |

| 11 | 같으면 통과 상태 이름을 정합니다. |

| 12 | 통과 수를 하나 늘립니다. |

| 13 | 값은 있지만 기대값과 다를 때입니다. |

| 14 | 실패 상태 이름을 정합니다. |

| 15 | 시험 ID와 판단을 출력합니다. |

| 16 | 통과 수와 전체 건수를 출력합니다. |

예상 또는 실제 확인 결과:

```text
T01 PASS
T02 FAIL
T03 NOT_RUN
T04 PASS
passed: 2 / 4
```

한 값 바꾸기: 입력을 test_observations_retest.json으로 바꾸면4건PASS입니다. 새 파일은 재시험했다고 가정한 별도 교육 사례이며 실제 제품 통과 증거가 아닙니다.

오류 해결: None을0이나빈문자와 같게 취급하지 않습니다. expected를 actual에 맞춰 고치지 말고 관찰과 결함 원인을 남깁니다.
