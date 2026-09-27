# A08 · CSV를 이름표가 있는 행으로 읽기

입력은 S01의 22.5,S02의 25.0,S03의 빈 온도,S04의 0.0 네 건입니다. 첫 온도의 화면 모양은 숫자 같지만 type은 str입니다.

## 전체 시연 코드


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

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
