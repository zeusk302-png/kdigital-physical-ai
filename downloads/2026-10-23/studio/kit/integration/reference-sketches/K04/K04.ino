// 가변저항 · 손잡이를 숫자로 읽기
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

// setup()은 업로드·리셋 직후 한 번만 실행합니다.
void setup() {
  Serial.begin(9600); // PC에 값을 보여 줄 통신 속도입니다.
}
// loop()는 전원이 들어온 동안 계속 반복합니다.
void loop() {
  int value = analogRead(A0); // UNO는 입력 전압을 0~1023 값으로 읽습니다.
  Serial.print("knob=");
  Serial.println(value); // 숫자 뒤에서 줄을 바꿉니다.

  delay(200); // 값이 너무 빠르게 지나가지 않게 0.2초 기다립니다.
}
