// 도트매트릭스 · 한 점과 핀 지도
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

// 이 단계는 3.3V + 1kΩ으로 확인된 한 점을 켜는 전원 회로입니다.
// 프로그램으로 16핀을 임의 순회하지 않습니다.
void setup() { Serial.begin(9600); Serial.println("Check the documented row/column pair"); }
void loop() {} // 표시기의 행·열 핀표가 확인되기 전에는 디지털 핀을 연결하지 않습니다.
