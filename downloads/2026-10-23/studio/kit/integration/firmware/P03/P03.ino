// P03: 키패드와 빨강·노랑·초록 LED. 암–수 8개만 사용합니다.
#include "pins.h"
#include "protocol.h"
const byte rows[4]={PIN_ROW1,PIN_ROW2,PIN_ROW3,PIN_ROW4};
const byte cols[4]={PIN_COL1,PIN_COL2,PIN_COL3,PIN_COL4};
const char keys[4][4]={{'1','2','3','A'},{'4','5','6','B'},{'7','8','9','C'},{'*','0','#','D'}};
byte signalState=0;
char lastKey='-', previous='-', candidate='-';
unsigned long changedAt=0,lastScan=0,lastState=0;
char scanKey() {
  char found='-'; byte count=0;
  for(byte r=0;r<4;r++) {
    digitalWrite(rows[r],LOW); pinMode(rows[r],OUTPUT);
    for(byte c=0;c<4;c++) if(digitalRead(cols[c])==LOW) {found=keys[r][c];count++;}
    pinMode(rows[r],INPUT); // 선택하지 않은 행은 출력 HIGH로 구동하지 않습니다.
  }
  return count>1?'!':found; // 다중 입력은 단일 키로 확정하지 않습니다.
}
void setSignal(byte value) {
  signalState=value;
  digitalWrite(PIN_RED,value==1?HIGH:LOW);
  digitalWrite(PIN_YELLOW,value==2?HIGH:LOW);
  digitalWrite(PIN_GREEN,value==3?HIGH:LOW);
}
void safeStop() {setSignal(0);}
void snapshot(unsigned int request) {
  stateStart(request); Serial.print(F(",\"last_key\":\"")); Serial.print(lastKey);
  Serial.print(F("\",\"signal\":"));Serial.print(signalState);Serial.println('}');
}
bool command(unsigned int request,const char *name,char *args) {
  long value;
  if(!strcmp(name,"SIGNAL") && integer(args,0,3,value)) {
    setSignal(value);applied(request);return true;
  }
  errorReply(request,F("unsupported_or_range"));return false;
}
void setup() {
  Serial.begin(115200);
  for(byte i=0;i<4;i++) {pinMode(rows[i],INPUT);pinMode(cols[i],INPUT_PULLUP);}
  pinMode(PIN_RED,OUTPUT);pinMode(PIN_YELLOW,OUTPUT);pinMode(PIN_GREEN,OUTPUT);safeStop();
  lastContact=millis();
}
void loop() {
  readCommands();unsigned long now=millis();
  if(now-lastScan>=10) {
    lastScan=now;char raw=scanKey();
    if(raw!=candidate) {candidate=raw;changedAt=now;}
    if(now-changedAt>=30 && previous!=candidate) {
      previous=candidate;
      if(previous!='-' && previous!='!') {
        lastKey=previous;
        if(previous>='0' && previous<='3') setSignal(previous-'0');
        snapshot(0);
      }
    }
  }
  if(now-lastState>=1000) {lastState=now;snapshot(0);}
}
