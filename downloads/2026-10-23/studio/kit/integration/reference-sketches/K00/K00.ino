// 처음 연결 · 설치와 업로드
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

void setup() {
  pinMode(LED_BUILTIN, OUTPUT); // 보드 위 L 표시 LED를 출력으로 사용합니다.
  Serial.begin(9600); // 도구 → 시리얼 모니터도 같은 속도로 맞춥니다.
}
void loop() {
  digitalWrite(LED_BUILTIN, HIGH); // 보드 안 LED를 켭니다. 외부 배선은 없습니다.
  Serial.println("UNO ready");
  delay(500); // 밀리초: 1000이 1초입니다.
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
