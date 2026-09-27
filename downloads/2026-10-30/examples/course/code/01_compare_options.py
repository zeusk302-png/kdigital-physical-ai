import json
from pathlib import Path
root = Path(__file__).resolve().parent.parent
plan = json.loads((root / "data" / "options.json").read_text(encoding="utf-8"))
weights = plan["weights"]
for option in plan["options"]:
    score = 0
    for criterion, weight in weights.items():
        score = score + option[criterion] * weight
    print(option["id"], round(score, 2))
