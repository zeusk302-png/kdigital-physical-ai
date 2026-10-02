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
