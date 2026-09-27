const button = document.querySelector("#check");
const value = document.querySelector("#temperature");
const status = document.querySelector("#status");
button.addEventListener("click", () => {
  value.textContent = window.SENSOR.temperature_c;
  status.textContent = window.SENSOR.location + "의 가상 값을 확인했습니다.";
});
