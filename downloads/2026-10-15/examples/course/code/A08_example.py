import csv
from pathlib import Path
source = Path(__file__).resolve().parent.parent / "data" / "readings.csv"
with source.open(encoding="utf-8", newline="") as file:
    rows = list(csv.DictReader(file))
print(len(rows))
print(rows[0]["sensor_id"])
print(rows[0]["temperature_c"], type(rows[0]["temperature_c"]).__name__)
