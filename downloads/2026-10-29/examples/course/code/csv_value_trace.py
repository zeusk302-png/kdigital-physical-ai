import csv
import io
import json
import math
source = "sensor_id,temperature_c\nS05,0\nS06,\nS07,24.0\n"
rows = []
for row in csv.DictReader(io.StringIO(source)):
    text = row["temperature_c"].strip()
    value = None if text == "" else float(text)
    if value is not None and (not math.isfinite(value) or not 0 <= value <= 50):
        raise ValueError("온도 범위 오류")
    rows.append({"sensor_id": row["sensor_id"], "temperature_c": value})
print(json.dumps(rows, ensure_ascii=False))
