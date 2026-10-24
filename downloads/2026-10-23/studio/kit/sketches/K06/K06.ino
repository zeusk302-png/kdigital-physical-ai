// 볼 스위치 · 기울기 감지
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

const int SENSOR_PIN = 2; // 연결표의 신호 핀과 같습니다.
void setup() {
  pinMode(SENSOR_PIN, INPUT_PULLUP); // 내부 저항으로 미연결 때 HIGH를 유지합니다.
  Serial.begin(9600);
}
void loop() {
  bool closed = digitalRead(SENSOR_PIN) == LOW; // GND와 붙으면 LOW입니다.
  Serial.println(closed ? "closed" : "open"); // 조건에 따라 표시할 글자를 고릅니다.
  delay(50);
}
