// LM35DZ · 전압을 섭씨로
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

void setup() { Serial.begin(9600); }
void loop() {
  int raw = analogRead(A0); // 0~1023의 ADC 값
  float volts = raw * (5.0 / 1023.0); // 기준전압을 5.0V로 두는 근삿값
  float celsius = volts * 100.0; // 10mV/°C = 0.01V/°C
  Serial.print("raw="); Serial.print(raw);
  Serial.print(", temperature_c="); Serial.println(celsius, 1);
  delay(500);
}
