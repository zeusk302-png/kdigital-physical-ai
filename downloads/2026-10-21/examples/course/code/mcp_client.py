import json
import subprocess
import sys
from pathlib import Path
root = Path(__file__).resolve().parent.parent
requests = (root / "data" / "requests.jsonl").read_text(encoding="utf-8")
result = subprocess.run([sys.executable, "-X", "utf8", str(root / "code" / "mcp_server.py")], input=requests, text=True, encoding="utf-8", capture_output=True, timeout=10, check=True)
for line in result.stdout.splitlines():
    response = json.loads(line)
    print(json.dumps(response, ensure_ascii=False))
