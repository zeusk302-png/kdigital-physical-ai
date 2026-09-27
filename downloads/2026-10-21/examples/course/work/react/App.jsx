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
