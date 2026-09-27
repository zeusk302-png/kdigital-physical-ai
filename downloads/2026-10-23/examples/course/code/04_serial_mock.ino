void setup() {
  Serial.begin(115200);
}
void loop() {
  Serial.println("{\"sensor_id\":\"S01\",\"temperature_c\":28.0}");
  delay(1000);
}
