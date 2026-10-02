import json
import sys
from pathlib import Path
readings = json.loads((Path(__file__).resolve().parent.parent / "data" / "readings.json").read_text(encoding="utf-8"))
ready = False
initialized = False
for line in sys.stdin:
    try:
        message = json.loads(line)
    except json.JSONDecodeError:
        print(json.dumps({"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": "Parse error"}}), flush=True)
        continue
    if not isinstance(message, dict) or message.get("jsonrpc") != "2.0":
        print(json.dumps({"jsonrpc": "2.0", "id": None, "error": {"code": -32600, "message": "Invalid request"}}), flush=True)
        continue
    request_id = message.get("id")
    method = message.get("method")
    result = None
    error = None
    if method == "initialize":
        initialized = True
        result = {"protocolVersion": "2025-11-25", "capabilities": {"tools": {}}, "serverInfo": {"name": "class-sensor", "version": "1.0.0"}}
    elif method == "notifications/initialized":
        ready = initialized
        continue
    elif request_id is None:
        continue
    elif not ready:
        error = {"code": -32600, "message": "Initialize first"}
    elif method == "ping":
        result = {}
    elif method == "tools/list":
        result = {"tools": [{"name": "get_reading", "description": "가상 센서 기록 읽기", "inputSchema": {"type": "object", "properties": {"sensor_id": {"type": "string"}}, "required": ["sensor_id"], "additionalProperties": False}}]}
    elif method == "tools/call":
        params = message.get("params", {})
        arguments = params.get("arguments", {}) if isinstance(params, dict) else None
        sensor = arguments.get("sensor_id") if isinstance(arguments, dict) else None
        if not isinstance(params, dict) or not isinstance(arguments, dict) or params.get("name") != "get_reading" or set(arguments) != {"sensor_id"} or not isinstance(sensor, str):
            error = {"code": -32602, "message": "Invalid tool arguments"}
        elif sensor not in readings:
            result = {"content": [{"type": "text", "text": "Unknown sensor"}], "isError": True}
        else:
            result = {"content": [{"type": "text", "text": json.dumps(readings[sensor], ensure_ascii=False)}], "isError": False}
    else:
        error = {"code": -32601, "message": "Method not found"}
    response = {"jsonrpc": "2.0", "id": request_id}
    response["error" if error else "result"] = error if error else result
    print(json.dumps(response, ensure_ascii=False), flush=True)
