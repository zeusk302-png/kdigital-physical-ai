// D0 → 저항 330옴 → LED 긴 다리, LED 짧은 다리 → GND.
// D1 → 버튼 → GND. 내부 풀업이므로 안 누름 HIGH, 누름 LOW입니다.
const int LED_PIN = D0;
const int BUTTON_PIN = D1;
void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}
void loop() {
  bool pressed = digitalRead(BUTTON_PIN) == LOW;
  digitalWrite(LED_PIN, pressed ? HIGH : LOW);
  Serial.println(pressed ? "pressed" : "released");
  delay(100);  // 첫 예제의 관찰 간격입니다. 후속 센서는 millis로 주기를 관리합니다.
}
