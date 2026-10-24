// 서보모터 · 각도 지정
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

#include <Servo.h> // Arduino AVR 기본 Servo 라이브러리
Servo arm;
void setup() { arm.attach(9); } // 주황 신호선 → D9
void loop() {
  arm.write(70); delay(1000); // 무리한 양 끝 각도 대신 좁은 범위부터 확인합니다.
  arm.write(110); delay(1000);
}
