import json
from pathlib import Path
root = Path(__file__).resolve().parent.parent
source = root / "data" / "sensor_samples.json"
samples = json.loads(source.read_text(encoding="utf-8"))
for sample in samples:
    value = sample["temperature_c"]
    if value is None:
        state = "missing"
    elif type(value) not in (int, float):
        state = "invalid"
    elif value >= 28.0:
        state = "alert"
    else:
        state = "normal"
    print(sample["seq"], value, state)
