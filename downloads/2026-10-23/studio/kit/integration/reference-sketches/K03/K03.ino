// 세 가지 LED · 신호등 만들기
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

const int RED = 8, YELLOW = 9, GREEN = 10;
// 같은 모양의 일을 함수로 묶어 어느 LED를 켤지 전달합니다.
void showLight(int activePin) {
  digitalWrite(RED, activePin == RED);
  digitalWrite(YELLOW, activePin == YELLOW);
  digitalWrite(GREEN, activePin == GREEN);
}
void setup() {
  pinMode(RED, OUTPUT); pinMode(YELLOW, OUTPUT); pinMode(GREEN, OUTPUT);
}
void loop() {
  showLight(RED); delay(2000);
  showLight(GREEN); delay(2000);
  showLight(YELLOW); delay(700);
}
