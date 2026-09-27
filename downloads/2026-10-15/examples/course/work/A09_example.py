import json
from pathlib import Path
base = Path(__file__).resolve().parent.parent
summary = {"건수": 4, "미측정": 1}
text = json.dumps(summary, ensure_ascii=False, indent=2)
target = base / "work" / "output_summary.json"
target.write_text(text, encoding="utf-8")
loaded = json.loads(target.read_text(encoding="utf-8"))
print(loaded["건수"], loaded["미측정"])
