// DHT11 · 온도와 습도
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

#include <DHT.h> // 라이브러리 관리자에서 DHT sensor library by Adafruit 설치
DHT dht(2, DHT11); // 첫 값은 DATA 핀, 두 번째는 센서 종류입니다.
void setup() { Serial.begin(9600); dht.begin(); }
void loop() {
  delay(2000); // DHT11을 너무 자주 읽지 않습니다.
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  if (isnan(temperature) || isnan(humidity)) { // NaN은 읽기에 실패한 값입니다.
    Serial.println("DHT read failed");
    return; // 이번 loop 실행만 끝내고 다음 읽기를 기다립니다.
  }
  Serial.print("temperature_c="); Serial.print(temperature);
  Serial.print(", humidity_pct="); Serial.println(humidity);
}
