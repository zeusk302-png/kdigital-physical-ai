import importlib.util
import json
import sys
from pathlib import Path
root = Path(__file__).resolve().parent.parent
target = Path(sys.argv[1]).resolve()
spec = importlib.util.spec_from_file_location("candidate", target)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
cases = json.loads((root / "data" / "cases.json").read_text(encoding="utf-8"))
passed = 0
for case in cases:
    try:
        actual = module.classify(case["value"])
    except Exception as error:
        actual = type(error).__name__
    ok = actual == case["expected"]
    passed += int(ok)
    print(case["id"], "PASS" if ok else "FAIL", actual)
print(f"통과 {passed}/{len(cases)}")
raise SystemExit(0 if passed == len(cases) else 1)
