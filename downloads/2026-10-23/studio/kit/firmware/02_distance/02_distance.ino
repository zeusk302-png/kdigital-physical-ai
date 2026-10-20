// XIAO ESP32-S3 전용 예제입니다. UNO 핀 번호와 섞지 않습니다.
// HC-SR04 VCC→5V, GND→GND, TRIG→D2.
// ECHO→상단1k옴→D3 접점→하단2k옴→GND로 분압합니다.
// ECHO 5V를 XIAO GPIO에 바로 연결하지 않습니다.
const int LED_PIN=D0, TRIG_PIN=D2, ECHO_PIN=D3;
unsigned long previous=0, sequence=0;
bool warning=false;
void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN,OUTPUT); pinMode(TRIG_PIN,OUTPUT); pinMode(ECHO_PIN,INPUT);
  digitalWrite(TRIG_PIN,LOW);
}
void loop() {
  unsigned long now=millis();
  if(now-previous<200)return;
  previous=now;
  digitalWrite(TRIG_PIN,LOW); delayMicroseconds(2);
  digitalWrite(TRIG_PIN,HIGH); delayMicroseconds(10); digitalWrite(TRIG_PIN,LOW);
  // 30ms 안에 응답이 없으면 0입니다. 무제한 기다리지 않습니다.
  unsigned long duration=pulseIn(ECHO_PIN,HIGH,30000UL);
  float cm=duration*0.0343f/2.0f;  // 소리의 왕복이므로 2로 나눕니다.
  bool valid=duration>0 && cm>=2.0f && cm<=400.0f;
  // 20cm 미만에서 켜고 25cm 초과에서 끕니다. 경계 깜박임을 줄입니다.
  if(valid) {
    if(cm<20)warning=true;
    else if(cm>25)warning=false;
  }
  digitalWrite(LED_PIN,valid && warning ? HIGH : LOW);
  // 센서 실패를 숫자 0cm로 보내지 않고 null과 fault 상태로 구별합니다.
  Serial.print("{\"seq\":");Serial.print(sequence++);
  Serial.print(",\"uptime_ms\":");Serial.print(now);
  Serial.print(",\"kind\":\"distance_cm\",\"value\":");
  if(valid)Serial.print(cm,2);else Serial.print("null");
  Serial.print(",\"status\":\"");
  Serial.print(!valid?"fault":warning?"warning":"normal");
  Serial.println("\"}");
}
