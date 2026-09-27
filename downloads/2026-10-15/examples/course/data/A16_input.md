# A16 · 로그 검사기 전체 흐름

실제 수치는 22.5·25.0·0.0으로 합 47.5,개수 3,평균 15.83입니다. 빈 온도 1건은 미측정,뜨거움과 51.0은 원문 이슈로 남깁니다.0도 실제 측정이므로 평균에 포함합니다.

## 전체 시연 코드


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

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
