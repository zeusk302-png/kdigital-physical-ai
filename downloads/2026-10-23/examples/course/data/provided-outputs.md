# 실제 실행 출력

## 01_ohm.py

```text
current_mA: 10.0
```

종료코드: 0

## 01_ohm.py

```text
current_mA: 5.0
```

종료코드: 0

## 01_ohm.py

```text
```

종료코드: 1

## 02_sensor_replay.py

```text
1 27.5 normal
2 28.0 alert
3 None missing
4 0.0 normal
5 29.0 invalid
```

종료코드: 0

## 02_sensor_replay.py

```text
1 27.5 normal
2 28.0 normal
3 None missing
4 0.0 normal
5 29.0 invalid
```

종료코드: 0

## 02_sensor_replay.py

```text
1 0.0 normal
2 27.9 normal
3 28.0 alert
4 None missing
5 28.1 invalid
```

종료코드: 0

## 02_sensor_replay.py

```text
1 27.9 normal
2 28.0 alert
3 28.1 alert
4 None missing
5 28.0 invalid
6 True invalid
```

종료코드: 0

## 02_sensor_replay.py

```text
```

종료코드: 1

## 02_sensor_replay.py

```text
```

종료코드: 1

## 03_hysteresis.py

```text
27.8 False
28.1 True
27.9 True
28.2 True
27.4 False
missing no command
28.3 True
```

종료코드: 0

## 03_hysteresis.py

```text
27.8 False
28.1 True
27.9 False
28.2 True
27.4 False
missing no command
28.3 True
```

종료코드: 0

실물 ESP32는 실행하지 않았습니다.