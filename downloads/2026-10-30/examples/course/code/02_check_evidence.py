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
