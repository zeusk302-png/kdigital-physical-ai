// P04: 외부전원 미보유 조건의 모터 배선 학습. 기본 빌드는 구동을 차단합니다.
#include "pins.h"
#include <Servo.h>
#include "protocol.h"
const bool MOTOR_POWER_CONFIRMED=false; // 검증한 별도 5V 전원이 생긴 후 강사 확인으로 변경.
const byte coils[4]={PIN_IN1,PIN_IN2,PIN_IN3,PIN_IN4};
const byte sequence[8][4]={{1,0,0,0},{1,1,0,0},{0,1,0,0},{0,1,1,0},
                         {0,0,1,0},{0,0,1,1},{0,0,0,1},{1,0,0,1}};
Servo servo;
bool armed=false;
int remaining=0,servoAngle=90,phase=0;
unsigned long lastStep=0,lastState=0;
void releaseCoils() {for(byte i=0;i<4;i++) digitalWrite(coils[i],LOW);}
void safeStop() {remaining=0;releaseCoils();servo.detach();armed=false;}
void snapshot(unsigned int request) {
  stateStart(request);Serial.print(F(",\"motor_power_confirmed\":"));Serial.print(MOTOR_POWER_CONFIRMED?F("true"):F("false"));
  Serial.print(F(",\"armed\":"));Serial.print(armed?F("true"):F("false"));
  Serial.print(F(",\"step_remaining\":"));Serial.print(remaining);
  Serial.print(F(",\"servo_target_deg\":"));if(armed) Serial.print(servoAngle);else Serial.print(F("null"));
  Serial.print(F(",\"pot_raw\":"));Serial.print(analogRead(PIN_POT));
  Serial.print(F(",\"stop_pressed\":"));Serial.print(digitalRead(PIN_BUTTON)==LOW?F("true"):F("false"));Serial.println('}');
}
bool command(unsigned int request,const char *name,char *args) {
  long value;
  if(!strcmp(name,"ARM") && integer(args,0,1,value)) {
    if(!value) {safeStop();applied(request);return true;}
    if(!MOTOR_POWER_CONFIRMED || digitalRead(PIN_BUTTON)==LOW) {errorReply(request,F("power_or_stop"));return false;}
    armed=true;servoAngle=90;servo.write(servoAngle);servo.attach(PIN_SERVO);applied(request);return true;
  }
  if(!armed) {errorReply(request,F("not_armed"));return false;}
  if(!strcmp(name,"SERVO") && integer(args,30,150,value)) {servoAngle=value;servo.write(servoAngle);applied(request);return true;}
  if(!strcmp(name,"STEP") && integer(args,-128,128,value)) {
    if(remaining) {errorReply(request,F("busy"));return false;}
    remaining=value;applied(request);return true; // 목표 적용 응답입니다. 완료는 step_remaining=0으로 확인합니다.
  }
  errorReply(request,F("unsupported_or_range"));return false;
}
void setup() {
  Serial.begin(115200);pinMode(PIN_BUTTON,INPUT_PULLUP);
  for(byte i=0;i<4;i++) {digitalWrite(coils[i],LOW);pinMode(coils[i],OUTPUT);}
  safeStop();lastContact=millis();
}
void loop() {
  readCommands();unsigned long now=millis();
  // 통신 두절·물리 정지 버튼은 소프트웨어 정지입니다. 전원 차단 장치를 대신하지 않습니다.
  if(armed && (now-lastContact>2000 || digitalRead(PIN_BUTTON)==LOW)) safeStop();
  if(armed && remaining && now-lastStep>=5) {
    lastStep=now;int direction=remaining>0?1:-1;phase=(phase+direction+8)%8;
    for(byte i=0;i<4;i++) digitalWrite(coils[i],sequence[phase][i]?HIGH:LOW);
    remaining-=direction;if(!remaining) releaseCoils();
  }
  if(now-lastState>=1000) {lastState=now;snapshot(0);}
}
