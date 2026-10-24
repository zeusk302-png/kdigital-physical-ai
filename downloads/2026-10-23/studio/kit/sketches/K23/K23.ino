// 74HC595 · 선 세 개로 출력 늘리기
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

const int DATA=11, LATCH=12, CLOCK=13;
void setup() { pinMode(DATA,OUTPUT); pinMode(LATCH,OUTPUT); pinMode(CLOCK,OUTPUT); }
void writeByte(byte value) {
  digitalWrite(LATCH,LOW); // 8비트를 준비하는 동안 출력을 고정합니다.
  shiftOut(DATA,CLOCK,MSBFIRST,value); // 상위 비트부터 보냅니다.
  digitalWrite(LATCH,HIGH); // 준비한 값을 Q0~Q7에 반영합니다.
}
void loop() { writeByte(1); delay(1000); writeByte(0); delay(1000); }
