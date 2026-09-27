import json
from pathlib import Path
source = Path(__file__).resolve().parent.parent / "data" / "nested_sensor.json"
data = json.loads(source.read_text(encoding="utf-8"))
print(data["sensor"]["sensor_id"])
print(data["readings"][0]["temperature_c"], type(data["readings"][0]["temperature_c"]).__name__)
print(data["readings"][1]["temperature_c"], type(data["readings"][1]["temperature_c"]).__name__)
print(data["readings"][0]["active"], type(data["readings"][0]["active"]).__name__)
