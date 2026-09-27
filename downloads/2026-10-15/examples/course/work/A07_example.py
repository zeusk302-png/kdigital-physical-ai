from pathlib import Path
base = Path(__file__).resolve().parent.parent
source = base / "data" / "notice.txt"
text = source.read_text(encoding="utf-8")
print(text.strip())
