import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from datetime import datetime
root = Path(__file__).resolve().parent.parent
records = json.loads((root / "data" / "readings.json").read_text(encoding="utf-8"))
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(root / "code"), **kwargs)
    def send_json(self, status, value):
        body = json.dumps(value, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
    def do_GET(self):
        if self.path == "/api/readings":
            self.send_json(200, records)
        else:
            super().do_GET()
    def do_POST(self):
        if self.path != "/api/readings":
            self.send_json(404, {"error": "unknown path"})
            return
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if not 0 < size <= 4096:
                raise ValueError("size")
            row = json.loads(self.rfile.read(size))
            assert set(row) == {"sensor_id", "location", "temperature_c", "measured_at", "active"}
            assert isinstance(row["sensor_id"], str) and isinstance(row["location"], str)
            assert type(row["active"]) is bool
            value = row["temperature_c"]
            assert value is None or (type(value) in (int, float) and 0 <= value <= 50)
            assert datetime.fromisoformat(row["measured_at"]).tzinfo is not None
        except (ValueError, TypeError, AssertionError, KeyError):
            self.send_json(400, {"error": "invalid reading"})
            return
        records.append(row)
        self.send_json(201, {"accepted": 1, "count": len(records)})
if __name__ == "__main__":
    print("교육용 서버: http://127.0.0.1:8780/?source=api", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 8780), Handler).serve_forever()
