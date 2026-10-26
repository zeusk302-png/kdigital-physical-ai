// 부저 · 짧은 소리 만들기
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

void setup() { pinMode(8, OUTPUT); }
void loop() {
  tone(8, 1000, 150); // 8번 핀에서 1000Hz를 150ms 냅니다.
  delay(1000); // 다음 소리까지 기다립니다.
  noTone(8); // 소리 출력을 멈춥니다.
}
