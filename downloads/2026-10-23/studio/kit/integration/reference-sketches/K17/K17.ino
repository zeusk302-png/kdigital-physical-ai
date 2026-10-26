// RTC · 껐다 켜도 시간 기억
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

#include <ThreeWire.h>
#include <RtcDS1302.h>
ThreeWire bus(7, 6, 8); // 순서: IO(DAT), SCLK(CLK), CE(RST)
RtcDS1302<ThreeWire> rtc(bus);
void setup() {
  Serial.begin(9600); rtc.Begin();
  rtc.SetIsWriteProtected(false); rtc.SetIsRunning(true);
  // 처음 시간을 넣을 때만 true로 바꾸고, 설정 후 다시 false로 업로드합니다.
  const bool SET_TIME_ONCE = false;
  if (SET_TIME_ONCE) rtc.SetDateTime(RtcDateTime(__DATE__, __TIME__));
  // 일부 DS1302 모듈의 충전 회로는 별도 하드웨어입니다. 코드로 배터리 안전을 보장하지 않습니다.
}
void loop() {
  if (!rtc.IsDateTimeValid()) { Serial.println("Set RTC time first"); delay(1000); return; }
  RtcDateTime t = rtc.GetDateTime();
  char text[24];
  snprintf(text, sizeof(text), "%04u-%02u-%02u %02u:%02u:%02u",
           t.Year(),t.Month(),t.Day(),t.Hour(),t.Minute(),t.Second());
  Serial.println(text); delay(1000);
}
