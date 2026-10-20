// 모듈의 전원 허용값·풀업 전압을 먼저 확인합니다. I2C 신호는 3.3V 기준입니다.
// SDA→D4(GPIO5), SCL→D5(GPIO6), GND 공통. 전원은 확인한 모듈 사양에 맞춥니다.
// Library Manager: Adafruit MPU6050 및 의존 라이브러리를 설치합니다.
#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
Adafruit_MPU6050 mpu;
bool ready=false;
unsigned long previous=0,sequence=0;
void setup(){
 Serial.begin(115200);
 Wire.begin(D4,D5);
 ready=mpu.begin(0x68,&Wire);  // AD0 상태에 따라 주소가 다르면 스캐너로 확인합니다.
 if(ready){mpu.setAccelerometerRange(MPU6050_RANGE_2_G);}
}
void loop(){
 unsigned long now=millis();if(now-previous<200)return;previous=now;
 sensors_event_t acceleration,gyro,temperature;
 bool ok=ready && mpu.getEvent(&acceleration,&gyro,&temperature);
 Serial.print("{\"seq\":");Serial.print(sequence++);
 Serial.print(",\"uptime_ms\":");Serial.print(now);
 Serial.print(",\"kind\":\"accel_x_m_s2\",\"value\":");
 if(ok)Serial.print(acceleration.acceleration.x,3);else Serial.print("null");
 Serial.println(ok?",\"status\":\"normal\"}":",\"status\":\"fault\"}");
 // 가속도에는 중력이 포함됩니다. 이 값만 두 번 적분해 이동 거리라 부르지 않습니다.
}
