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
