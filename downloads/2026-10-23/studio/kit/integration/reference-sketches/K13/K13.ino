// 조이스틱 · X·Y·누름 읽기
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

void setup() { Serial.begin(9600); pinMode(2, INPUT_PULLUP); }
void loop() {
  int x = analogRead(A0); // 좌우 위치
  int y = analogRead(A1); // 앞뒤 위치
  bool pressed = digitalRead(2) == LOW; // 누름은 LOW
  Serial.print("x="); Serial.print(x);
  Serial.print(", y="); Serial.print(y);
  Serial.print(", pressed="); Serial.println(pressed);
  delay(100);
}
