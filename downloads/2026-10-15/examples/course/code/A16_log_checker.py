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
