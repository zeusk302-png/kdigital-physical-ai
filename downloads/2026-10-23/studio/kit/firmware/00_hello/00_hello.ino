// Arduino IDE의 보드 XIAO_ESP32S3, 해당 USB 포트를 선택합니다.
// USB CDC On Boot를 Enabled로 선택하고 업로드 후 115200으로 모니터를 엽니다.
unsigned long previous = 0;
void setup() { Serial.begin(115200); }
void loop() {
  unsigned long now = millis();  // 전원이 켜진 뒤 지난 밀리초입니다.
  if (now - previous >= 1000) {
    previous = now;
    Serial.print("hello uptime_ms=");
    Serial.println(now);  // println은 줄 끝을 붙여 다음 기록과 구별합니다.
  }
}
