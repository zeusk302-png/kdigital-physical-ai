// RFID · 카드와 열쇠고리 읽기
// 보드: Arduino Uno / 시리얼 모니터: 9600 baud
// USB를 뽑고 배선한 뒤, 아래 연결표와 코드의 핀 번호를 대조하세요.

#include <SPI.h>
#include <MFRC522.h>
MFRC522 reader(10,9); // SS, RST
void setup() { Serial.begin(9600); SPI.begin(); reader.PCD_Init(); }
void loop() {
  if (!reader.PICC_IsNewCardPresent() || !reader.PICC_ReadCardSerial()) return;
  Serial.print("UID:");
  for (byte i=0;i<reader.uid.size;i++) {
    Serial.print(' ');
    if (reader.uid.uidByte[i]<16) Serial.print('0'); // 두 자리 16진수로 맞춥니다.
    Serial.print(reader.uid.uidByte[i],HEX);
  }
  Serial.println(); reader.PICC_HaltA(); reader.PCD_StopCrypto1();
}
