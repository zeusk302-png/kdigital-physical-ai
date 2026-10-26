// 빵판 읽기 · 저항과 LED
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

const int LED_PIN = 8; // UNO에서 8이라고 적힌 소켓입니다.
void setup() {
  pinMode(LED_PIN, OUTPUT); // 전압을 내보내는 역할로 정합니다.
}
void loop() {
  digitalWrite(LED_PIN, HIGH); // 8번에 HIGH를 내보내 LED를 켭니다.
  delay(1000); // 켜진 상태를 1초 유지합니다.
  digitalWrite(LED_PIN, LOW); // 8번을 LOW로 바꿔 LED를 끕니다.
  delay(1000);
}
