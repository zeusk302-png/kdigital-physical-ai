// LCD1602 · 화면에 값 보여 주기
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

#include <Wire.h>
#include <hd44780.h>
#include <hd44780ioClass/hd44780_I2Cexp.h>
hd44780_I2Cexp lcd; // 지원되는 I2C 백팩의 주소·핀 연결을 자동 탐색합니다.
void setup() {
  Serial.begin(9600);
  int status = lcd.begin(16, 2); // 가로 16글자, 세로 2줄
  if (status) { Serial.println("LCD init failed"); while (true) {} }
  lcd.backlight(); lcd.print("My first circuit");
}
void loop() {
  lcd.setCursor(0, 1); // 첫째 칸, 둘째 줄. 번호는 0부터 시작합니다.
  lcd.print("sec: "); lcd.print(millis()/1000);
  delay(200);
}
