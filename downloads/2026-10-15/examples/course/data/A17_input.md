# A17 · 정상·빈 입력·잘못된 입력 비교

readings.csv4건 / bad_readings.csv6건 / empty_readings.csv헤더만 / missing_readings.csv미측정2건.
work/A16_log_checker.py 파일 안 source 줄의 따옴표 속 CSV 이름 한 곳만 바꿉니다. .py 파일 이름은 유지합니다.

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____


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
