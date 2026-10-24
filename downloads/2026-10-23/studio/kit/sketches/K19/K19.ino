// 스텝모터 · 드라이버로 순서 제어
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

#include <Stepper.h>
const int STEPS_PER_REV = 2048; // 4상 구동의 시작값. 실제 모터로 회전량을 확인합니다.
Stepper motor(STEPS_PER_REV, 8, 10, 9, 11); // 라이브러리의 코일 순서에 맞춘 핀 순서
void releaseCoils() {
  for (int p=8;p<=11;p++) digitalWrite(p, LOW); // 대기 중 코일 발열을 줄입니다.
}
void setup() { motor.setSpeed(8); } // 분당 회전수의 시작값
void loop() {
  motor.step(256); releaseCoils(); delay(1000);
  motor.step(-256); releaseCoils(); delay(1000);
}
