import csv
from pathlib import Path
source = Path(__file__).resolve().parent.parent / "data" / "base_readings.csv"
with source.open(encoding="utf-8", newline="") as file:
    rows = list(csv.reader(file))
print(rows[0])
print(rows[1])
print(rows[1][2], type(rows[1][2]).__name__)
