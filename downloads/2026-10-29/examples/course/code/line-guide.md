# 전체 코드와 모든 줄의 뜻

이 문서는 완성 예제를 읽고 지정한 한 값 또는 작은 부분을 바꾸기 위한 안내입니다. 함수·서버·앱 전체를 빈 파일에서 작성하는 것은 필수 과제가 아닙니다. work의 작업본은 같은 구조를 사용합니다. 생성된 번들과 의존성 잠금 파일은 사람이 작성한 교육 코드와 구분합니다.

## 실행 위치와 확인

ZIP을 풀고 **course 폴더를 현재 작업 폴더**로 선택합니다. Python 파일은 UTF-8입니다. 개인 실행·강사 실행 관찰·기록된 결과 비교를 답칸에 구별해 씁니다.

브라우저로 `code/index.html`을 열면 고정 시각 10:10의 가상 기록 5건·센서 4개가 보입니다. 입구 필터는 기록 2건·최신값 22.8·숫자 이력 평균 22.65입니다. 창고의 null은 미측정이고 평균은 계산 안 함입니다. 시각은 모두 한국 시각으로 표시합니다.

### 로컬 API 실제 실행 순서

첫 터미널에서 실행하고 유지합니다. 8780이 다른 프로그램에 쓰이면 그 프로그램을 종료하지 말고 강사에게 알립니다.

```text
python code/server.py
```

실제 시작 stdout:

```text
교육용 서버: http://127.0.0.1:8780/?source=api
```

같은 course 위치의 두 번째 터미널에서 실행합니다. 초기 5건인 새 서버를 기준으로 한 번 실행한 실제 결과입니다.

```text
python code/send_sample.py
```

```text
201
{"accepted": 1, "count": 6}
```

브라우저에서 `http://127.0.0.1:8780/?source=api`를 열거나 API 다시 읽기를 누르면 새 기록을 확인합니다. 반복 송신하면 count가 더 늘어납니다. 서버 터미널의 접근 기록은 stderr이며 요청 시각에 따라 달라집니다. Ctrl+C로 본인이 실행한 예제 서버만 종료합니다. 메모리 저장이므로 재시작하면 초기 5건입니다.

오류 해결: 연결 거부는 서버 실행·8780 주소를 확인합니다. HTTP 400은 입력의 다섯 키·자료형·0~50 범위·시간대 표시를 봅니다. 화면의 수신 실패는 이전 값 유지라는 뜻이며 최신 수신 성공으로 기록하지 않습니다.

## app.js

```javascript
let rows = structuredClone(window.FIXTURE);
let now = Date.parse("2026-10-29T10:10:00+09:00");
const locationBox = document.querySelector("#location");
const message = document.querySelector("#message");
const valueText = value => value === null ? "미측정" : String(value);
const timeText = value => new Date(value).toLocaleString("ko-KR", { timeZone: "Asia/Seoul", hour12: false });
function addRow(target, values) {
  const tr = document.createElement("tr");
  for (const value of values) { const td = document.createElement("td"); td.textContent = value; tr.append(td); }
  target.append(tr);
}
function render() {
  const view = DashboardModel.summarize(rows, locationBox.value, now);
  const latest = document.querySelector("#latest"); latest.replaceChildren();
  const history = document.querySelector("#history"); history.replaceChildren();
  const chart = document.querySelector("#chart"); chart.replaceChildren();
  view.latest.forEach(row => addRow(latest, [row.sensor_id, row.location, valueText(row.temperature_c), timeText(row.measured_at), DashboardModel.status(row, now)]));
  for (const row of view.history) {
    addRow(history, [row.sensor_id, valueText(row.temperature_c), timeText(row.measured_at)]);
    const bar = document.createElement("div"); bar.className = "bar";
    bar.style.height = (typeof row.temperature_c === "number" ? Math.max(1, row.temperature_c * 3) : 20) + "px";
    bar.textContent = row.sensor_id + " " + valueText(row.temperature_c);
    if (row.temperature_c === null) bar.classList.add("missing");
    chart.append(bar);
  }
  document.querySelector("#summary").textContent = `기록 ${view.history.length}건 · 센서 ${view.latest.length}개 · 유효 숫자 이력 평균 ${view.average === null ? "계산 안 함" : (Math.round((view.average + Number.EPSILON) * 100) / 100).toFixed(2) + " ℃"} · 확인 기준 ${timeText(now)} (한국시각)`;
  if (!view.history.length) message.textContent = "선택한 장소의 데이터가 없습니다.";
}
locationBox.addEventListener("change", () => { message.textContent = "장소 필터를 적용했습니다."; render(); });
document.querySelector("#next").addEventListener("click", () => {
  now += 10000; rows.push({ sensor_id: "S01", location: "입구", temperature_c: 23.3, measured_at: new Date(now).toISOString(), active: true });
  message.textContent = "모의 입력을 화면 메모리에 추가했습니다. 서버 저장은 아닙니다."; render();
});
document.querySelector("#pause").addEventListener("click", () => { now += 70000; message.textContent = "새 기록 없이 확인 시각만 70초 이동했습니다."; render(); });
async function readApi() {
  try {
    const response = await fetch("/api/readings");
    if (!response.ok) throw new Error("HTTP " + response.status);
    const incoming = await response.json();
    if (!Array.isArray(incoming) || !incoming.every(DashboardModel.valid)) throw new Error("입력 구조 오류");
    rows = incoming; message.textContent = "로컬 API 기록을 읽었습니다."; render();
  } catch (error) { message.textContent = "수신 실패: 이전 화면 값을 유지합니다. " + error.message; }
}
document.querySelector("#refresh").addEventListener("click", readApi);
message.textContent = "고정된 가상 자료를 읽었습니다. 실시간 수신이 아닙니다.";
render();
if (new URLSearchParams(location.search).get("source") === "api") readApi();
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 제공 fixture를 복사해 화면에서 바꿀 rows를 만듭니다. 원본 파일은 변하지 않습니다. |
| 2 | 시연의 확인 시각을 2026년 10월 29일 한국 시각 10:10으로 고정합니다. |
| 3 | 장소 선택 요소를 찾습니다. |
| 4 | 안내 문장을 표시할 요소를 찾습니다. |
| 5 | null은 미측정, 다른 값은 글자로 바꾸는 짧은 함수입니다. |
| 6 | 시각을 Asia/Seoul 기준의 24시간 표시로 바꿉니다. Z와 +09:00 입력도 같은 시간대로 보입니다. |
| 7 | 표에 한 행을 추가하는 함수를 선언합니다. |
| 8 | 새 tr, 즉 표의 한 행을 만듭니다. |
| 9 | 각 값을 td 셀의 글자로 넣고 행에 붙입니다. 입력을 HTML로 해석하지 않습니다. |
| 10 | 완성한 행을 대상 표 본문에 붙입니다. |
| 11 | 행 추가 함수를 닫습니다. |
| 12 | 현재 데이터와 설정으로 화면을 다시 그리는 함수를 선언합니다. |
| 13 | 장소 필터와 고정 확인 시각으로 요약을 계산합니다. |
| 14 | 최신값 표 본문을 찾고 이전 행을 비웁니다. |
| 15 | 이력 표 본문을 찾고 이전 행을 비웁니다. |
| 16 | 막대 영역을 찾고 이전 막대를 비웁니다. |
| 17 | 센서별 최신값의 이름·위치·온도·한국 시각·상태를 표에 씁니다. |
| 18 | 선택한 장소의 모든 이력을 하나씩 읽습니다. |
| 19 | 이력 표에 이름·온도·한국 시각을 씁니다. |
| 20 | 막대 하나를 만들고 bar 모양 규칙을 적용합니다. |
| 21 | 숫자이면 온도에 비례하는 높이를 줍니다. 0도 찾을 수 있도록 최소 1px, 미측정은 구별용 20px입니다. |
| 22 | 막대 안에 센서 이름과 실제 값을 글자로 씁니다. |
| 23 | null에는 missing 모양을 덧붙입니다. 막대 높이가 실제 미측정 온도라는 뜻은 아닙니다. |
| 24 | 막대를 영역에 붙입니다. |
| 25 | 이력 반복을 닫습니다. |
| 26 | 기록 수·센서 수·이력 평균·한국 확인 시각을 씁니다. 평균이 없으면 단위 없이 계산 안 함을 표시합니다. |
| 27 | 해당 장소의 기록이 없으면 빈 결과임을 안내합니다. |
| 28 | 화면 그리기 함수를 닫습니다. |
| 29 | 장소를 바꾸면 안내 문장과 필터 결과를 다시 표시합니다. |
| 30 | 모의 기록 추가 버튼의 클릭 처리를 등록합니다. |
| 31 | 확인 시각을 10초 옮기고 S01의 가상 23.3 기록을 메모리에 추가합니다. |
| 32 | 서버 저장이 아니라는 안내를 쓰고 화면을 갱신합니다. |
| 33 | 모의 추가 버튼 처리를 닫습니다. |
| 34 | 멈춤 버튼은 새 입력 없이 확인 시각만 70초 옮기고 상태를 다시 계산합니다. |
| 35 | 로컬 API를 비동기로 읽는 함수를 선언합니다. |
| 36 | 통신 또는 해석 실패를 잡을 구간을 시작합니다. |
| 37 | 현재 서버의 /api/readings에 GET 요청을 보내 응답을 기다립니다. |
| 38 | HTTP 성공 상태가 아니면 오류로 처리합니다. fetch는 404 자체만으로 예외를 던지지 않습니다. |
| 39 | 응답 본문을 JSON으로 해석합니다. |
| 40 | 목록이며 모든 기록의 기본 형식이 맞는지 확인합니다. |
| 41 | 정상 응답만 rows에 넣고 성공 안내와 화면을 갱신합니다. |
| 42 | 실패하면 기존 rows를 유지한 채 실패 이유를 안내합니다. 이전 값이 최신이라고 보증하지 않습니다. |
| 43 | API 읽기 함수를 닫습니다. |
| 44 | API 다시 읽기 버튼에 읽기 함수를 연결합니다. |
| 45 | 첫 화면이 고정 가상 자료라는 사실을 알립니다. |
| 46 | 첫 화면을 그립니다. |
| 47 | 주소에 source=api가 있으면 처음에 로컬 API도 읽습니다. |

## fixture.js

```javascript
window.FIXTURE = [
  {
    "sensor_id": "S01",
    "location": "입구",
    "temperature_c": 22.5,
    "measured_at": "2026-10-29T10:09:50+09:00",
    "active": true
  },
  {
    "sensor_id": "S02",
    "location": "창고",
    "temperature_c": null,
    "measured_at": "2026-10-29T10:09:55+09:00",
    "active": true
  },
  {
    "sensor_id": "S03",
    "location": "실습실",
    "temperature_c": 29.0,
    "measured_at": "2026-10-29T10:08:00+09:00",
    "active": true
  },
  {
    "sensor_id": "S04",
    "location": "복도",
    "temperature_c": 0.0,
    "measured_at": "2026-10-29T10:09:58+09:00",
    "active": false
  },
  {
    "sensor_id": "S01",
    "location": "입구",
    "temperature_c": 22.8,
    "measured_at": "2026-10-29T10:10:00+09:00",
    "active": true
  }
];
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 브라우저에서 읽을 가상 기록 목록을 window.FIXTURE에 넣기 시작합니다. |
| 2 | 관찰 한 건의 객체 경계를 표시합니다. 쉼표는 다음 관찰과 구분합니다. |
| 3 | 이 관찰을 식별할 센서 이름입니다. 같은 센서의 여러 관찰은 같은 이름을 쓸 수 있습니다. |
| 4 | 관찰한 장소입니다. 장소 필터가 이 값을 비교합니다. |
| 5 | 섭씨 온도입니다. null은 미측정, 0은 실제 숫자 0입니다. |
| 6 | 이 관찰의 ISO 기록 시각입니다. +09:00은 한국의 UTC 오프셋입니다. |
| 7 | 센서 활성 여부입니다. false는 정지 상태 판단에 사용합니다. |
| 8 | 관찰 한 건의 객체 경계를 표시합니다. 쉼표는 다음 관찰과 구분합니다. |
| 9 | 관찰 한 건의 객체 경계를 표시합니다. 쉼표는 다음 관찰과 구분합니다. |
| 10 | 이 관찰을 식별할 센서 이름입니다. 같은 센서의 여러 관찰은 같은 이름을 쓸 수 있습니다. |
| 11 | 관찰한 장소입니다. 장소 필터가 이 값을 비교합니다. |
| 12 | 섭씨 온도입니다. null은 미측정, 0은 실제 숫자 0입니다. |
| 13 | 이 관찰의 ISO 기록 시각입니다. +09:00은 한국의 UTC 오프셋입니다. |
| 14 | 센서 활성 여부입니다. false는 정지 상태 판단에 사용합니다. |
| 15 | 관찰 한 건의 객체 경계를 표시합니다. 쉼표는 다음 관찰과 구분합니다. |
| 16 | 관찰 한 건의 객체 경계를 표시합니다. 쉼표는 다음 관찰과 구분합니다. |
| 17 | 이 관찰을 식별할 센서 이름입니다. 같은 센서의 여러 관찰은 같은 이름을 쓸 수 있습니다. |
| 18 | 관찰한 장소입니다. 장소 필터가 이 값을 비교합니다. |
| 19 | 섭씨 온도입니다. null은 미측정, 0은 실제 숫자 0입니다. |
| 20 | 이 관찰의 ISO 기록 시각입니다. +09:00은 한국의 UTC 오프셋입니다. |
| 21 | 센서 활성 여부입니다. false는 정지 상태 판단에 사용합니다. |
| 22 | 관찰 한 건의 객체 경계를 표시합니다. 쉼표는 다음 관찰과 구분합니다. |
| 23 | 관찰 한 건의 객체 경계를 표시합니다. 쉼표는 다음 관찰과 구분합니다. |
| 24 | 이 관찰을 식별할 센서 이름입니다. 같은 센서의 여러 관찰은 같은 이름을 쓸 수 있습니다. |
| 25 | 관찰한 장소입니다. 장소 필터가 이 값을 비교합니다. |
| 26 | 섭씨 온도입니다. null은 미측정, 0은 실제 숫자 0입니다. |
| 27 | 이 관찰의 ISO 기록 시각입니다. +09:00은 한국의 UTC 오프셋입니다. |
| 28 | 센서 활성 여부입니다. false는 정지 상태 판단에 사용합니다. |
| 29 | 관찰 한 건의 객체 경계를 표시합니다. 쉼표는 다음 관찰과 구분합니다. |
| 30 | 관찰 한 건의 객체 경계를 표시합니다. 쉼표는 다음 관찰과 구분합니다. |
| 31 | 이 관찰을 식별할 센서 이름입니다. 같은 센서의 여러 관찰은 같은 이름을 쓸 수 있습니다. |
| 32 | 관찰한 장소입니다. 장소 필터가 이 값을 비교합니다. |
| 33 | 섭씨 온도입니다. null은 미측정, 0은 실제 숫자 0입니다. |
| 34 | 이 관찰의 ISO 기록 시각입니다. +09:00은 한국의 UTC 오프셋입니다. |
| 35 | 센서 활성 여부입니다. false는 정지 상태 판단에 사용합니다. |
| 36 | 관찰 한 건의 객체 경계를 표시합니다. 쉼표는 다음 관찰과 구분합니다. |
| 37 | 목록과 대입문을 마칩니다. |

## index.html

```html
<!doctype html>
<html lang="ko">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>가상 센서 현황판</title><link rel="stylesheet" href="style.css"></head>
<body><main>
<h1>가상 센서 현황판</h1>
<p>교육용 합성 데이터 · 실제 장비 연결 없음</p>
<label>장소 <select id="location"><option>전체</option><option>입구</option><option>창고</option><option>실습실</option><option>복도</option></select></label>
<button id="next">모의 기록 한 건 추가</button><button id="pause">70초 수신 멈춤 가정</button><button id="refresh">API 다시 읽기</button>
<p id="message" role="status"></p><p id="summary"></p>
<h2>센서별 마지막 기록</h2><table><thead><tr><th>센서</th><th>위치</th><th>온도 ℃</th><th>기록 시각(한국)</th><th>상태</th></tr></thead><tbody id="latest"></tbody></table>
<h2>선택한 장소의 이력</h2><p>막대 높이는 온도이며 간격은 시간 간격을 뜻하지 않습니다. 자세한 값은 아래 표와 같습니다.</p>
<div id="chart" aria-label="이력 막대와 값"></div>
<table><thead><tr><th>센서</th><th>온도 ℃</th><th>기록 시각(한국)</th></tr></thead><tbody id="history"></tbody></table>
</main><script src="fixture.js"></script><script src="model.js"></script><script src="app.js"></script></body>
</html>
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | HTML 문서 선언입니다. |
| 2 | 한국어 문서를 엽니다. |
| 3 | UTF-8·화면 너비·탭 제목·CSS 연결을 지정합니다. |
| 4 | 본문과 중심 내용 영역을 엽니다. |
| 5 | 화면 제목을 씁니다. |
| 6 | 합성 데이터라는 조건을 표시합니다. |
| 7 | 필터 이름과 선택지를 만듭니다. 선택값은 JavaScript에서 읽습니다. |
| 8 | 모의 입력·70초 경과·API 읽기 버튼을 각각 만듭니다. |
| 9 | 통신 안내와 요약을 표시할 빈 문단 두 개입니다. |
| 10 | 최신값 표의 다섯 열과 JavaScript가 채울 본문을 만듭니다. 시각은 한국 기준입니다. |
| 11 | 이력 영역 제목과 막대 간격이 시간 간격이 아니라는 설명입니다. |
| 12 | 막대와 값이 들어갈 영역입니다. |
| 13 | 이력의 세 열과 값을 채울 표 본문입니다. |
| 14 | 내용을 닫고 fixture, 계산 규칙, 화면 동작 순으로 읽습니다. |
| 15 | 문서를 닫습니다. |

## model.js

```javascript
function valid(row) {
  return row && typeof row.sensor_id === "string" && typeof row.location === "string" &&
    typeof row.active === "boolean" && Number.isFinite(Date.parse(row.measured_at)) &&
    (row.temperature_c === null || (typeof row.temperature_c === "number" && Number.isFinite(row.temperature_c) && row.temperature_c >= 0 && row.temperature_c <= 50));
}
function status(row, now) {
  if (!valid(row) || Date.parse(row.measured_at) > now) return "입력 오류";
  if (row.temperature_c === null) return "미측정";
  if (!row.active) return "정지";
  if (now - Date.parse(row.measured_at) > 60000) return "오래됨";
  return row.temperature_c >= 28 ? "주의" : "정상";
}
function summarize(rows, location, now) {
  const visible = rows.filter(row => location === "전체" || row.location === location);
  const latest = new Map();
  for (const row of visible) {
    const previous = latest.get(row.sensor_id);
    if (!previous || Date.parse(row.measured_at) >= Date.parse(previous.measured_at)) latest.set(row.sensor_id, row);
  }
  const numbers = visible.filter(row => valid(row) && Date.parse(row.measured_at) <= now).map(row => row.temperature_c).filter(value => value !== null);
  return { history: visible, latest: [...latest.values()], average: numbers.length ? numbers.reduce((sum, value) => sum + value, 0) / numbers.length : null, states: [...latest.values()].map(row => status(row, now)) };
}
const DashboardModel = { valid, status, summarize };
if (typeof module !== "undefined") module.exports = DashboardModel;
globalThis.DashboardModel = DashboardModel;
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 기록 한 건의 기본 자료형과 범위를 검사하는 valid 함수를 선언합니다. |
| 2 | 기록이 존재하고 센서 이름과 장소가 문자열인지 검사합니다. |
| 3 | active가 불리언이며 기록 시각을 해석할 수 있는지 검사합니다. |
| 4 | 온도가 null이거나 0~50의 유한한 숫자인지 검사합니다. 문자열 숫자는 통과하지 않습니다. |
| 5 | valid 함수를 닫습니다. |
| 6 | 기록과 확인 시각으로 상태 글자를 만드는 함수를 선언합니다. |
| 7 | 잘못된 기록 또는 확인 시각보다 미래인 기록은 입력 오류입니다. |
| 8 | 온도가 null이면 미측정입니다. 0은 여기에 해당하지 않습니다. |
| 9 | active가 false이면 정지입니다. |
| 10 | 마지막 기록이 60초보다 오래되었으면 오래됨입니다. 정확히 60초는 포함하지 않습니다. |
| 11 | 남은 기록은 28 이상이면 주의, 그 아래면 정상입니다. |
| 12 | status 함수를 닫습니다. |
| 13 | 기록 목록·장소·확인 시각을 받아 화면에 필요한 요약을 만드는 함수입니다. |
| 14 | 전체 또는 선택한 장소에 해당하는 기록만 visible에 남깁니다. |
| 15 | 센서 이름별 마지막 기록을 담을 Map을 만듭니다. |
| 16 | 필터에 남은 기록을 하나씩 읽습니다. |
| 17 | 같은 센서에서 이미 저장한 기록을 찾습니다. |
| 18 | 기록이 없거나 현재 기록 시각이 더 늦으면 교체합니다. 같은 시각이면 뒤에 읽은 기록을 씁니다. |
| 19 | 기록을 읽는 반복을 닫습니다. |
| 20 | 기본 형식이 맞고 확인 시각 이후가 아닌 이력에서 온도를 꺼내 null을 제외합니다. 과거·정지 기록의 유효한 숫자와 0은 유지합니다. |
| 21 | 전체 이력·센서별 마지막 값·유효 숫자 이력 평균·각 최신 상태를 반환합니다. 평균은 최신값만의 평균이 아닙니다. |
| 22 | summarize 함수를 닫습니다. |
| 23 | 세 함수를 DashboardModel이라는 한 묶음에 넣습니다. |
| 24 | Node 환경이면 이 묶음을 외부 검사 프로그램에서도 쓸 수 있게 합니다. |
| 25 | 브라우저와 공통 실행 환경에서 접근할 전역 이름으로도 등록합니다. |

## send_sample.py

```python
import json
from pathlib import Path
from urllib.request import Request, urlopen
root = Path(__file__).resolve().parent.parent
body = (root / "data" / "new_reading.json").read_bytes()
request = Request("http://127.0.0.1:8780/api/readings", data=body, headers={"Content-Type": "application/json"}, method="POST")
with urlopen(request, timeout=5) as response:
    print(response.status)
    print(json.dumps(json.load(response), ensure_ascii=False))
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | JSON 응답을 읽고 출력하는 도구입니다. |
| 2 | 입력 파일 경로를 다룹니다. |
| 3 | HTTP 요청을 만드는 Request와 보내는 urlopen을 가져옵니다. |
| 4 | course 폴더를 기준으로 정합니다. |
| 5 | 새 가상 기록 파일을 바이트로 읽습니다. |
| 6 | localhost 8780의 API에 JSON 본문을 POST하는 요청을 만듭니다. |
| 7 | 최대 5초 기다려 응답을 받고 사용 후 연결을 정리합니다. |
| 8 | 성공 상태 201을 출력합니다. |
| 9 | 응답 JSON을 한글을 유지한 글자로 출력합니다. |

## server.py

```python
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
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | JSON 요청과 응답을 처리할 도구입니다. |
| 2 | 정적 파일 응답 처리기와 여러 요청을 처리하는 교육용 HTTP 서버를 가져옵니다. |
| 3 | 파일 경로를 다루는 도구입니다. |
| 4 | 기록 시각을 해석할 datetime을 가져옵니다. |
| 5 | course 폴더 경로입니다. |
| 6 | 초기 가상 기록을 메모리 목록으로 읽습니다. 이후 수정은 이 파일에 저장하지 않습니다. |
| 7 | 기본 HTTP 처리기를 확장한 Handler를 선언합니다. |
| 8 | 요청 처리기의 초기화 방법을 정의합니다. |
| 9 | 정적 파일 제공 위치를 course/code로 정해 기본 초기화에 전달합니다. |
| 10 | JSON 응답을 보내는 보조 함수를 정의합니다. |
| 11 | 한글을 유지한 JSON을 UTF-8 바이트로 만듭니다. |
| 12 | HTTP 상태 번호를 보냅니다. |
| 13 | 본문이 UTF-8 JSON이라는 헤더를 보냅니다. |
| 14 | 본문의 바이트 수를 헤더로 보냅니다. |
| 15 | 헤더 작성을 끝냅니다. |
| 16 | 본문 바이트를 응답 통로에 씁니다. |
| 17 | GET 읽기 요청을 처리하는 메서드입니다. |
| 18 | 정확한 API 주소인지 비교합니다. |
| 19 | 200 상태와 현재 기록 목록을 보냅니다. |
| 20 | 다른 주소인 경우입니다. |
| 21 | 기본 정적 파일 읽기 기능으로 처리합니다. |
| 22 | POST 추가 요청을 처리하는 메서드입니다. |
| 23 | 정해진 API 주소가 아닌지 확인합니다. |
| 24 | 다른 주소이면 404 오류를 보냅니다. |
| 25 | 그 요청 처리를 끝냅니다. |
| 26 | 입력 검사 중 발생할 오류를 잡을 구간입니다. |
| 27 | Content-Length 헤더를 정수 바이트 수로 읽습니다. |
| 28 | 입력 크기가 1~4096바이트인지 검사합니다. |
| 29 | 벗어나면 ValueError를 발생시킵니다. |
| 30 | 정한 길이만큼 본문을 읽어 JSON으로 해석합니다. |
| 31 | 키가 다섯 개의 정한 이름과 정확히 일치하는지 검사합니다. |
| 32 | 센서 이름과 장소가 문자열인지 검사합니다. |
| 33 | active가 정확히 불리언 자료형인지 검사합니다. |
| 34 | 온도를 value라는 이름으로 꺼냅니다. |
| 35 | null 또는 0~50 숫자인지 검사합니다. bool은 숫자로 허용하지 않습니다. |
| 36 | ISO 시각을 해석하고 시간대가 명시됐는지 검사합니다. |
| 37 | 문법·자료형·assert·키 오류가 나면 여기에서 처리합니다. |
| 38 | 400 상태와 잘못된 기록이라는 응답을 보냅니다. |
| 39 | 틀린 기록은 추가하지 않고 요청을 끝냅니다. |
| 40 | 검사를 통과한 기록을 메모리 목록에 추가합니다. |
| 41 | 201 상태와 추가 수 1·전체 수를 응답합니다. |
| 42 | 이 파일을 직접 실행했을 때만 서버를 시작합니다. |
| 43 | 교육용 서버의 실제 주소를 즉시 출력합니다. |
| 44 | 127.0.0.1의 8780 포트에서 요청을 기다립니다. Ctrl+C로 이 예제만 종료합니다. |

## style.css

```css
body { background: #f5f1e8; color: #163332; font-family: sans-serif; margin: 0; }
main { max-width: 1000px; padding: 24px; margin: auto; }
button, select { padding: 10px; margin: 4px; }
table { border-collapse: collapse; width: 100%; background: white; }
th, td { border-bottom: 1px solid #cad5d0; padding: 10px; text-align: left; }
#chart { display: flex; align-items: flex-end; gap: 12px; min-height: 180px; overflow-x: auto; padding: 16px; }
.bar { background: #126d65; min-width: 90px; color: white; padding: 4px; font-size: 12px; }
.missing { background: #77521e; }
@media (max-width: 600px) { main { padding: 8px; } table { font-size: 12px; } }
button:focus-visible, select:focus-visible { outline: 3px solid #b96a17; }
```

| 줄 | 코드가 하는 일 |
| --- | --- |
| 1 | 전체 배경·글자색·글꼴·기본 바깥 여백을 정합니다. |
| 2 | 중심 영역의 최대 너비·안쪽 여백·중앙 배치를 정합니다. |
| 3 | 버튼과 선택 상자의 안쪽·바깥 여백을 정합니다. |
| 4 | 표의 경계를 합치고 너비와 배경을 정합니다. |
| 5 | 머리글과 셀의 아래 선·안쪽 여백·왼쪽 정렬을 정합니다. |
| 6 | 막대를 가로로 놓고 아래쪽으로 맞춥니다. 넘치는 가로 영역은 스크롤합니다. |
| 7 | 막대의 기본색·최소 너비·글자·안쪽 여백을 정합니다. |
| 8 | 미측정 표시에는 다른 색을 사용합니다. 글자도 함께 보여 색만으로 구분하지 않습니다. |
| 9 | 600px 이하에서는 여백과 표 글자 크기를 줄입니다. |
| 10 | 키보드로 버튼 또는 선택지에 도착했을 때 윤곽선을 표시합니다. |

## 확인 기록의 한계

코드·프로토콜·로컬 API의 실제 결과와 실제 학생 수행 시간은 다른 검증입니다. 360분은 제작 배정이며 초심자 리허설 전입니다. 실물 센서와 외부 AI 계정·유료 API는 사용하지 않았습니다.
