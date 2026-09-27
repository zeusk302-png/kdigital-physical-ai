import json
from pathlib import Path
from urllib.request import Request, urlopen
root = Path(__file__).resolve().parent.parent
body = (root / "data" / "new_reading.json").read_bytes()
request = Request("http://127.0.0.1:8780/api/readings", data=body, headers={"Content-Type": "application/json"}, method="POST")
with urlopen(request, timeout=5) as response:
    print(response.status)
    print(json.dumps(json.load(response), ensure_ascii=False))
