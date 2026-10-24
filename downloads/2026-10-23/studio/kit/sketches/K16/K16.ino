// 적외선 리모컨 · 버튼 코드 읽기
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

#include <IRremote.hpp> // IRremote 4.x의 API입니다.
void setup() {
  Serial.begin(9600);
  IrReceiver.begin(2, DISABLE_LED_FEEDBACK); // OUT → D2
}
void loop() {
  if (IrReceiver.decode()) { // 받은 신호가 있을 때만 읽습니다.
    IrReceiver.printIRResultShort(&Serial); // 프로토콜·주소·명령을 표시합니다.
    IrReceiver.resume(); // 다음 신호를 받을 수 있게 준비합니다.
  }
}
