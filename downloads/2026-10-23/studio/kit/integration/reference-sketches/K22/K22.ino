// 4자리 FND · 빠르게 번갈아 켜기
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

const byte segments[8]={2,3,4,5,6,7,8,9};
const byte digits[4]={10,11,12,13};
const byte patterns[10]={0x3F,0x06,0x5B,0x4F,0x66,0x6D,0x7D,0x07,0x7F,0x6F};
const byte values[4]={1,2,3,4};
void blank() {
  for (byte p:digits) { digitalWrite(p,LOW); pinMode(p,INPUT); } // 선택하지 않은 공통 핀은 떠 있게 합니다.
  for (byte p:segments) digitalWrite(p,HIGH); // 모든 막대도 끕니다.
}
void setup() {
  for (byte p:segments) { digitalWrite(p,HIGH); pinMode(p,OUTPUT); }
  for (byte p:digits) { digitalWrite(p,LOW); pinMode(p,INPUT); }
}
void loop() {
  for (byte d=0;d<4;d++) for (byte s=0;s<7;s++) {
    blank();
    if ((patterns[values[d]] >> s) & 1) {
      digitalWrite(segments[s],LOW);
      pinMode(digits[d],OUTPUT); digitalWrite(digits[d],HIGH);
      delayMicroseconds(250); // 한 번에 한 LED만 켜는 낮은 듀티 예제입니다.
    }
  }
  blank();
}
