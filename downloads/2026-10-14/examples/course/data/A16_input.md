# A16 · 관찰 한 건과 점검표 구조

records는 기록 두 건의 목록입니다. 첫 기록의 sensor_id는 S01이고 temperature_c는 22.5입니다. for의 record는 이번 차례의 딕셔너리 한 개를 가리킵니다.

## 전체 시연 코드


```python
records = [
    {"sensor_id": "S01", "temperature_c": 22.5},
    {"sensor_id": "S02", "temperature_c": 24.0},
]
for record in records:
    print(record["sensor_id"], record["temperature_c"])
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
