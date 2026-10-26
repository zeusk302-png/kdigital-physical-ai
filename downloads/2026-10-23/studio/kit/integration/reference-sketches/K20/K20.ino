// 릴레이 · LED 회로를 접점으로 끊기
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

const int RELAY = 7;
const int ON = LOW; // LOW 활성 모듈 기준. 실제 모듈 설명과 클릭 동작을 확인합니다.
const int OFF = HIGH;
void setup() {
  digitalWrite(RELAY, OFF); // 출력 모드로 바꾸기 전 기본 꺼짐값을 준비합니다.
  pinMode(RELAY, OUTPUT);
}
void loop() {
  digitalWrite(RELAY, ON); delay(1500);
  digitalWrite(RELAY, OFF); delay(1500);
}
