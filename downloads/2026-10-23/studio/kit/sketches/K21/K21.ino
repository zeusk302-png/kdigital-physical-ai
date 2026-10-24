// 1자리 FND · 숫자 표시
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

const byte pins[8] = {2,3,4,5,6,7,8,9}; // A,B,C,D,E,F,G,DP 순서
const byte patterns[10] = {0x3F,0x06,0x5B,0x4F,0x66,0x6D,0x7D,0x07,0x7F,0x6F};
void setup() { for (byte p:pins) { digitalWrite(p,HIGH); pinMode(p,OUTPUT); } }
void loop() {
  for (byte number=0;number<10;number++) {
    for (byte s=0;s<8;s++) {
      bool lit = (patterns[number] >> s) & 1; // 해당 막대를 켤지 비트에서 읽습니다.
      digitalWrite(pins[s], lit ? LOW : HIGH); // 공통 애노드는 LOW가 켜짐입니다.
    }
    delay(800);
  }
}
