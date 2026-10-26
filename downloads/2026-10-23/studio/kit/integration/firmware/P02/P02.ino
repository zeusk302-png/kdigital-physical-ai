// P02: 조이스틱 입력과 RGB 출력. 암–수 점퍼 9개, PWM 5/6/9를 사용합니다.
#include "pins.h"
#include "protocol.h"
const bool COMMON_ANODE=false; // 실물 공통 +형은 배선과 이 값 모두 변경해야 합니다.
byte red=0,green=0,blue=0;
unsigned long lastState=0;
void setColor(byte r,byte g,byte b) {
  red=r; green=g; blue=b;
  analogWrite(PIN_RED,COMMON_ANODE?255-r:r);
  analogWrite(PIN_GREEN,COMMON_ANODE?255-g:g);
  analogWrite(PIN_BLUE,COMMON_ANODE?255-b:b);
}
void safeStop() {setColor(0,0,0);}
void snapshot(unsigned int request) {
  stateStart(request);
  Serial.print(F(",\"joy_x_raw\":")); Serial.print(analogRead(PIN_JOY_X));
  Serial.print(F(",\"joy_y_raw\":")); Serial.print(analogRead(PIN_JOY_Y));
  Serial.print(F(",\"joy_pressed\":")); Serial.print(digitalRead(PIN_JOY_SW)==LOW?F("true"):F("false"));
  Serial.print(F(",\"rgb\":[")); Serial.print(red); Serial.print(','); Serial.print(green);
  Serial.print(','); Serial.print(blue); Serial.println(F("]}"));
}
bool command(unsigned int request,const char *name,char *args) {
  long colors[3];
  if(!strcmp(name,"RGB") && integers(args,3,0,255,colors)) {
    setColor(colors[0],colors[1],colors[2]); applied(request); return true;
  }
  errorReply(request,F("unsupported_or_range")); return false;
}
void setup() {
  pinMode(PIN_JOY_SW,INPUT_PULLUP);
  pinMode(PIN_RED,OUTPUT); pinMode(PIN_GREEN,OUTPUT); pinMode(PIN_BLUE,OUTPUT);
  safeStop(); Serial.begin(115200); lastContact=millis();
}
void loop() {
  readCommands(); unsigned long now=millis();
  if(now-lastState>=1000) {lastState=now; snapshot(0);}
}
