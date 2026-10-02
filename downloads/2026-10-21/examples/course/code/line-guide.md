# 전체 코드와 모든 줄의 뜻

이 문서는 완성 예제를 읽고 지정한 한 값 또는 작은 부분을 바꾸기 위한 안내입니다. 함수·서버·앱 전체를 빈 파일에서 작성하는 것은 필수 과제가 아닙니다. work의 작업본은 같은 구조를 사용합니다. 생성된 번들과 의존성 잠금 파일은 사람이 작성한 교육 코드와 구분합니다.

## 실행 위치와 확인

ZIP을 풀고 **course 폴더를 현재 작업 폴더**로 선택합니다. Python 파일은 UTF-8입니다. 개인 실행·강사 실행 관찰·기록된 결과 비교를 답칸에 구별해 씁니다.

브라우저로 `static/index.html`을 열면 22.5와 “아직 확인하지 않았습니다.”가 보입니다. 버튼을 누르면 “입구의 가상 값을 확인했습니다.”로 바뀝니다. work/static/data.js의 값을 24.5로 바꾼 뒤 저장·새로고침·클릭하면 24.5가 보입니다.

`react/index.html`은 제공 번들을 사용하므로 인터넷과 패키지 설치 없이 열 수 있습니다. 처음 22.5, 버튼 한 번 뒤 23, 새로고침 뒤 다시 22.5입니다. work/react/data.js의 온도를 24.5로 바꾸면 초기값 24.5, 클릭 뒤 25입니다. 원본 JSX를 바꾸는 선택 활동은 Node·pnpm이 준비된 경우 work/react에서 `pnpm install` 뒤 `pnpm run build`가 필요합니다.

```text
python code/mcp_client.py
```

### MCP 실제 전체 stdout

요청 여섯 줄 중 initialized 알림에는 응답이 없어 아래 다섯 줄이 나옵니다. id 2는 목록, 3은 S01, 4는 S02 미측정, 5는 존재하지 않는 센서입니다.

```json
{"jsonrpc": "2.0", "id": 1, "result": {"protocolVersion": "2025-11-25", "capabilities": {"tools": {}}, "serverInfo": {"name": "class-sensor", "version": "1.0.0"}}}
{"jsonrpc": "2.0", "id": 2, "result": {"tools": [{"name": "get_reading", "description": "가상 센서 기록 읽기", "inputSchema": {"type": "object", "properties": {"sensor_id": {"type": "string"}}, "required": ["sensor_id"], "additionalProperties": false}}]}}
{"jsonrpc": "2.0", "id": 3, "result": {"content": [{"type": "text", "text": "{\"sensor_id\": \"S01\", \"temperature_c\": 22.5, \"unit\": \"C\"}"}], "isError": false}}
{"jsonrpc": "2.0", "id": 4, "result": {"content": [{"type": "text", "text": "{\"sensor_id\": \"S02\", \"temperature_c\": null, \"unit\": \"C\"}"}], "isError": false}}
{"jsonrpc": "2.0", "id": 5, "result": {"content": [{"type": "text", "text": "Unknown sensor"}], "isError": true}}
```

MCP는 2025-11-25 명시 버전의 제한된 STDIO 교육 예제입니다. 최신 전체 규격·HTTP·인증·AI 호스트 연결을 구현한 예가 아닙니다. 고정 클라이언트와 실제 로컬 서버 프로세스가 통신합니다.

## mcp_client.py

```python
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
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | JSON 응답을 읽고 다시 글자로 만들 도구입니다. |
| 2 | 별도 프로그램을 실행하고 입출력을 주고받는 도구입니다. |
| 3 | 현재 실행 중인 Python의 경로를 얻습니다. |
| 4 | 파일 경로를 다루는 도구입니다. |
| 5 | course 폴더를 기준 경로로 정합니다. |
| 6 | requests.jsonl의 요청 여섯 줄을 글자로 읽습니다. 알림 한 줄은 응답이 없습니다. |
| 7 | 같은 Python으로 서버를 실행하고 요청을 표준입력에 넣습니다. 출력은 모아서 받고 10초를 넘으면 중단합니다. |
| 8 | 서버가 출력한 각 줄을 차례로 읽습니다. |
| 9 | 한 줄을 JSON 응답으로 해석합니다. |
| 10 | 한글을 유지한 응답을 화면에 출력합니다. 이 클라이언트는 LLM이 아닌 고정 요청 재생기입니다. |

## mcp_server.py

```python
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
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | JSON 메시지를 읽고 쓰는 도구입니다. |
| 2 | 표준입력을 읽기 위해 sys를 가져옵니다. |
| 3 | 입력 파일 경로를 다루는 도구입니다. |
| 4 | course/data/readings.json을 읽어 센서 이름으로 찾을 수 있는 사전을 만듭니다. |
| 5 | 아직 도구 호출을 받을 준비가 되지 않았다고 표시합니다. |
| 6 | initialize 요청을 아직 받지 않았다고 표시합니다. |
| 7 | 표준입력으로 들어오는 각 메시지 한 줄을 차례로 읽습니다. |
| 8 | JSON 해석 오류가 생길 수 있는 구간을 시작합니다. |
| 9 | 한 줄을 Python 객체로 해석합니다. |
| 10 | JSON 문법이 깨졌을 때 이 구간으로 이동합니다. |
| 11 | 해석 오류 -32700 응답을 표준출력으로 즉시 내보냅니다. |
| 12 | 깨진 줄 처리를 마치고 다음 줄로 넘어갑니다. |
| 13 | 객체 형태와 jsonrpc 버전 표시를 확인합니다. |
| 14 | 잘못된 요청 봉투이면 -32600 응답을 내보냅니다. |
| 15 | 다음 메시지를 읽습니다. |
| 16 | 응답과 요청을 짝지을 id를 얻습니다. |
| 17 | 실행할 메서드 이름을 얻습니다. |
| 18 | 정상 결과를 아직 정하지 않았다고 표시합니다. |
| 19 | 오류도 아직 정하지 않았다고 표시합니다. |
| 20 | 메서드가 initialize인지 확인합니다. |
| 21 | 초기화 요청을 받았다는 상태를 저장합니다. |
| 22 | 명시 버전 2025-11-25, 지원 기능, 교육용 서버 이름과 버전을 돌려줄 결과로 만듭니다. |
| 23 | 클라이언트의 초기화 완료 알림인지 확인합니다. |
| 24 | 앞서 초기화 요청을 받은 경우에만 준비 상태를 켭니다. |
| 25 | 알림에는 응답하지 않고 다음 메시지로 넘어갑니다. |
| 26 | id가 없는 다른 알림인지 확인합니다. |
| 27 | 이 작은 예제에서는 다른 알림을 처리하지 않습니다. |
| 28 | 준비가 끝나지 않았는지 확인합니다. |
| 29 | 도구를 사용하기 전에 초기화하라는 오류를 준비합니다. |
| 30 | 연결 생존 확인인 ping인지 확인합니다. |
| 31 | ping에는 빈 결과 객체를 줍니다. |
| 32 | 도구 목록 요청인지 확인합니다. |
| 33 | get_reading 도구 이름·설명·필수 문자열 sensor_id·추가 항목 금지라는 입력 규칙을 제공합니다. |
| 34 | 실제 도구 호출인지 확인합니다. |
| 35 | 호출의 params 객체를 가져옵니다. |
| 36 | params가 사전(dict)일 때만 arguments를 읽습니다. null이나 배열이면 None을 둡니다. |
| 37 | arguments가 사전일 때만 sensor_id를 읽습니다. 잘못된 자료형이면 None을 둡니다. |
| 38 | params와 arguments가 사전인지 먼저 확인한 뒤 도구 이름·입력 키·문자열을 검사합니다. or는 왼쪽 조건이 참이면 뒤의 .get()을 실행하지 않습니다. |
| 39 | 입력 규칙이 틀리면 -32602 오류를 준비합니다. 이 응답 뒤에도 다음 입력 줄 처리를 계속합니다. |
| 40 | 센서 이름은 문자열이지만 제공 자료에 없는지 확인합니다. |
| 41 | 도구 실행 실패를 isError=true로 표시합니다. JSON-RPC 자체 오류와 구별합니다. |
| 42 | 센서 이름이 있는 정상 경우입니다. |
| 43 | 해당 기록을 JSON 글자로 감싸 text 콘텐츠에 넣고 isError=false로 반환합니다. S02는 null을 유지합니다. |
| 44 | 위에서 처리하지 않은 메서드입니다. |
| 45 | 메서드를 찾지 못했다는 -32601 오류를 준비합니다. |
| 46 | 요청 id를 그대로 가진 응답 봉투를 만듭니다. |
| 47 | 오류가 있으면 error, 아니면 result에 넣습니다. |
| 48 | 응답 한 줄을 표준출력에 즉시 씁니다. 일반 안내 문구를 이 통신 통로에 섞지 않습니다. |

## react/App.jsx

```jsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
function SensorCard({ location }) {
  const [temperature, setTemperature] = useState(window.SENSOR.temperature_c);
  return <section>
    <h2>{location} 센서</h2>
    <p aria-live="polite">가상 온도: {temperature} ℃</p>
    <button onClick={() => setTemperature(temperature + 0.5)}>0.5 올린 모의값</button>
  </section>;
}
function App() {
  return <main><h1>React 센서 안내판</h1>
    <SensorCard location={window.SENSOR.location} />
    <p>새로고침하면 제공 데이터의 처음 값으로 돌아갑니다.</p>
  </main>;
}
createRoot(document.getElementById("root")).render(<App />);
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | React와 상태를 기억하는 useState를 가져옵니다. JSX는 이 원본에서만 사용하고 브라우저에는 번들을 줍니다. |
| 2 | React 화면을 실제 HTML 위치에 연결할 createRoot를 가져옵니다. |
| 3 | location을 입력으로 받는 SensorCard 화면 부품을 선언합니다. |
| 4 | 온도 상태와 바꾸는 함수를 만듭니다. 처음 값은 data.js에서 읽습니다. |
| 5 | 부품이 보여 줄 section 영역을 반환하기 시작합니다. |
| 6 | 부모가 전달한 장소 이름을 제목에 표시합니다. 중괄호는 JavaScript 값을 넣는 자리입니다. |
| 7 | 온도 상태를 문장에 표시하고 값의 변화를 보조기기에 알립니다. |
| 8 | 클릭하면 현재 온도에 0.5를 더해 상태를 바꿉니다. React가 바뀐 값을 화면에 반영합니다. |
| 9 | section과 반환식을 닫습니다. |
| 10 | SensorCard 함수를 닫습니다. |
| 11 | 전체 화면을 묶는 App 부품을 선언합니다. |
| 12 | main과 화면 제목을 반환하기 시작합니다. |
| 13 | SensorCard를 한 개 쓰고 data.js의 장소를 location 입력으로 전달합니다. |
| 14 | 새로고침 시 메모리 상태가 초기화된다는 설명을 표시합니다. |
| 15 | main과 반환식을 닫습니다. |
| 16 | App 함수를 닫습니다. |
| 17 | id가 root인 HTML 요소에 React 루트를 만들고 App을 표시합니다. |

## react/build.mjs

```javascript
import { build } from "esbuild";
await build({ entryPoints: ["App.jsx"], bundle: true, minify: true, outfile: "app.bundle.js", define: { "process.env.NODE_ENV": '"production"' } });
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 개발 환경에서 여러 소스를 묶는 esbuild의 build 함수를 가져옵니다. |
| 2 | App.jsx를 시작으로 의존 파일을 묶고 production 조건으로 줄여 app.bundle.js를 만듭니다. 제공 번들을 여는 학생은 이 명령을 실행할 필요가 없습니다. |

## react/data.js

```javascript
window.SENSOR = { sensor_id: "S01", location: "입구", temperature_c: 22.5 };
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | window.SENSOR라는 초기 자료에 센서 이름·장소·온도를 담습니다. work 복사본의 값 하나를 바꾸고 저장·새로고침합니다. |

## react/index.html

```html
<!doctype html>
<html lang="ko">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>React 센서 안내판</title><link rel="stylesheet" href="style.css"></head>
<body><div id="root"></div><script src="data.js"></script><script src="app.bundle.js"></script></body>
</html>
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | HTML 문서라는 선언입니다. |
| 2 | 문서 언어를 한국어로 정합니다. |
| 3 | 문자 인코딩·작은 화면 설정·탭 제목·CSS 파일을 지정합니다. |
| 4 | React가 들어갈 root 요소를 만들고 초기 데이터, 만들어 둔 실행 번들 순서로 읽습니다. |
| 5 | 문서를 닫습니다. |

## react/style.css

```css
body { font-family: sans-serif; margin: 0; background: #f5f1e8; color: #163332; }
main { max-width: 720px; margin: 40px auto; padding: 24px; }
h1 { font-size: 2rem; color: #126d65; }
p { line-height: 1.7; }
button { padding: 12px 20px; background: #126d65; color: white; border: 0; }
button:focus-visible { outline: 3px solid #b96a17; outline-offset: 4px; }
@media (max-width: 600px) { main { margin: 8px; } }
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 전체 글꼴·바깥 여백·배경색·글자색을 정합니다. #으로 시작하는 여섯 자리는 색 값입니다. |
| 2 | 중심 내용의 최대 너비, 바깥 여백, 안쪽 여백을 정합니다. padding 24px를 32px로 바꿔 비교합니다. |
| 3 | 큰 제목의 글자 크기와 색을 정합니다. 2rem은 기본 글자 크기의 두 배입니다. |
| 4 | 문단의 줄 간격을 글자 크기의 1.7배로 정합니다. |
| 5 | 버튼의 안쪽 여백·배경·글자색·테두리를 정합니다. |
| 6 | 키보드로 버튼에 도착했을 때 보이는 윤곽선을 정합니다. |
| 7 | 화면 너비가 600px 이하일 때 중심 영역 바깥 여백을 줄입니다. |

## static/app.js

```javascript
const button = document.querySelector("#check");
const value = document.querySelector("#temperature");
const status = document.querySelector("#status");
button.addEventListener("click", () => {
  value.textContent = window.SENSOR.temperature_c;
  status.textContent = window.SENSOR.location + "의 가상 값을 확인했습니다.";
});
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | id가 check인 버튼 요소를 찾아 button이라는 이름으로 기억합니다. |
| 2 | id가 temperature인 숫자 표시 요소를 찾습니다. |
| 3 | id가 status인 상태 문장을 찾습니다. |
| 4 | 버튼 클릭 시 실행할 일을 등록합니다. 화살표 함수는 지금 등록하고 클릭 때 실행합니다. |
| 5 | data.js의 temperature_c 값을 숫자 표시의 글자로 넣습니다. |
| 6 | 위치 이름을 포함한 확인 문장을 상태 요소에 넣습니다. |
| 7 | 클릭 처리 함수와 등록 명령을 닫습니다. |

## static/data.js

```javascript
window.SENSOR = { sensor_id: "S01", location: "입구", temperature_c: 22.5 };
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | window.SENSOR라는 초기 자료에 센서 이름·장소·온도를 담습니다. work 복사본의 값 하나를 바꾸고 저장·새로고침합니다. |

## static/index.html

```html
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>센서 안내판</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<main>
<h1>입구 센서 안내판</h1>
<p>가상 측정값: <strong id="temperature">22.5</strong> ℃</p>
<p id="status" role="status">아직 확인하지 않았습니다.</p>
<button id="check" type="button">측정값 확인</button>
<p>가상 데이터이며 실제 장비와 연결하지 않습니다.</p>
</main>
<script src="data.js"></script>
<script src="app.js"></script>
</body>
</html>
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | HTML 문서라는 선언입니다. |
| 2 | 문서 언어를 한국어로 지정하고 html 요소를 엽니다. |
| 3 | 화면 본문이 아닌 문서 설정 영역을 엽니다. |
| 4 | 한글을 포함한 글자를 UTF-8로 읽게 합니다. |
| 5 | 모바일에서 화면 너비에 맞춰 표시하도록 설정합니다. |
| 6 | 브라우저 탭에 표시할 제목입니다. |
| 7 | 같은 폴더의 style.css를 모양 규칙으로 연결합니다. |
| 8 | 문서 설정 영역을 닫습니다. |
| 9 | 화면 본문을 엽니다. |
| 10 | 이 페이지의 중심 내용을 main으로 묶습니다. |
| 11 | 가장 큰 제목입니다. 입구를 창고로 바꾸면 보이는 제목이 달라집니다. |
| 12 | 가상 측정값 문장입니다. strong의 id가 JavaScript에서 숫자 위치를 찾는 표식입니다. |
| 13 | 처리 상태 문장입니다. role=status는 상태 변화를 보조기기에 알리는 역할입니다. |
| 14 | 클릭할 버튼입니다. id=check로 찾으며 type=button은 일반 버튼임을 표시합니다. |
| 15 | 가상 데이터라는 조건을 화면에 씁니다. |
| 16 | 중심 내용 영역을 닫습니다. |
| 17 | data.js의 초기 데이터를 먼저 읽습니다. |
| 18 | app.js의 클릭 처리 코드를 그다음 읽습니다. |
| 19 | 본문을 닫습니다. |
| 20 | 문서를 닫습니다. |

## static/style.css

```css
body { font-family: sans-serif; margin: 0; background: #f5f1e8; color: #163332; }
main { max-width: 720px; margin: 40px auto; padding: 24px; }
h1 { font-size: 2rem; color: #126d65; }
p { line-height: 1.7; }
button { padding: 12px 20px; background: #126d65; color: white; border: 0; }
button:focus-visible { outline: 3px solid #b96a17; outline-offset: 4px; }
@media (max-width: 600px) { main { margin: 8px; } }
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 전체 글꼴·바깥 여백·배경색·글자색을 정합니다. #으로 시작하는 여섯 자리는 색 값입니다. |
| 2 | 중심 내용의 최대 너비, 바깥 여백, 안쪽 여백을 정합니다. padding 24px를 32px로 바꿔 비교합니다. |
| 3 | 큰 제목의 글자 크기와 색을 정합니다. 2rem은 기본 글자 크기의 두 배입니다. |
| 4 | 문단의 줄 간격을 글자 크기의 1.7배로 정합니다. |
| 5 | 버튼의 안쪽 여백·배경·글자색·테두리를 정합니다. |
| 6 | 키보드로 버튼에 도착했을 때 보이는 윤곽선을 정합니다. |
| 7 | 화면 너비가 600px 이하일 때 중심 영역 바깥 여백을 줄입니다. |

## 생성 파일과 설치 파일

app.bundle.js는 React·React DOM·App.jsx를 묶은 기계 생성 실행 파일입니다. 학생은 이를 줄별로 암기하거나 편집하지 않습니다. 위 App.jsx와 data.js가 읽고 바꿀 원본입니다. package.json에는 React/React DOM 19.1.1, esbuild 0.25.9와 build 명령이 고정되어 있으며 pnpm-lock.yaml은 재설치할 의존성 버전을 기록합니다. 제공 번들을 여는 필수 경로와, 설치가 필요한 소스 재빌드 선택 경로를 구분합니다.

## 확인 기록의 한계

코드·프로토콜·로컬 API의 실제 결과와 실제 학생 수행 시간은 다른 검증입니다. 360분은 제작 배정이며 초심자 리허설 전입니다. 실물 센서와 외부 AI 계정·유료 API는 사용하지 않았습니다.


#### MCP 필수 읽기와 참고 범위

**필수:** 역할 카드에서 호스트·클라이언트·서버·데이터를 구별합니다. `requests.jsonl` 첫 세 줄의 초기화·알림·도구 목록과 네 번째 줄의 `method/id/params`를 읽습니다. `recorded_responses.json`에서 S01의 숫자, S02의 미측정, S99의 `isError`를 대조합니다. 제공 클라이언트 실행 또는 강사 실행 관찰 후 수행 방법을 표시합니다.

필수 코드 확인은 `mcp_client.py` 6~7행(입력 메시지와 서버 실행), `mcp_server.py` 16~17행(id·method), 20~22행(초기화), 34~43행(도구 요청과 결과)입니다. 구현 문법 전체를 풀이하지 않고 메시지의 역할과 입출력 대응을 확인합니다. 줄 번호는 이번 제공본 기준입니다.

**강사 참고·선택:** 서버 전체의 예외 처리, 표준 입출력, subprocess 구현과 모든 줄 해설. 전체 코드를 새로 작성하는 것은 필수가 아닙니다. 실제 AI 호스트 호출·인증·HTTP 연결은 이번 관찰 범위에 포함되지 않습니다.
