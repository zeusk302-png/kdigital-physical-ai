// 4×4 키패드 · 행과 열
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

// 판매처 표: 윗줄 버튼은 핀4, 다음줄3, 다음줄2, 맨아래줄1입니다.
const byte rows[4] = {5,4,3,2}; // 물리핀4,3,2,1 → UNO D5,D4,D3,D2
const byte cols[4] = {6,7,8,9}; // 물리핀5,6,7,8 → UNO D6,D7,D8,D9
const char keys[4][4] = {{'1','2','3','A'},{'4','5','6','B'},
                         {'7','8','9','C'},{'*','0','#','D'}};
char previous = 0;
void setup() {
  Serial.begin(9600);
  for (byte c=0;c<4;c++) pinMode(cols[c], INPUT_PULLUP);
  for (byte r=0;r<4;r++) pinMode(rows[r], INPUT); // 선택하지 않은 행은 출력하지 않습니다.
}
void loop() {
  char found = 0;
  for (byte r=0;r<4;r++) {
    digitalWrite(rows[r], LOW); pinMode(rows[r], OUTPUT);
    delayMicroseconds(20); // 입력이 안정될 짧은 시간
    for (byte c=0;c<4;c++) if (digitalRead(cols[c])==LOW) found=keys[r][c];
    pinMode(rows[r], INPUT); // 읽은 행을 다시 해제합니다.
  }
  if (found && found!=previous) Serial.println(found);
  previous=found; delay(30); // 누르고 있는 동안 무한히 같은 글자를 찍지 않습니다.
}
