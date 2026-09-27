# A17 · 수업용 센서 요약 완성 예제

S01의 22.5는 정상, S02의 25.0은 확인, S03의 None은 미측정입니다. 상태 문자열을 status라는 이름에 넣은 뒤 공통 print 한 곳에서 센서명과 함께 출력합니다.

## 전체 시연 코드


```python
records = [
    {"sensor_id": "S01", "temperature_c": 22.5},
    {"sensor_id": "S02", "temperature_c": 25.0},
    {"sensor_id": "S03", "temperature_c": None},
]
limit = 24.0
for record in records:
    temperature_c = record["temperature_c"]
    if temperature_c is None:
        status = "미측정"
    elif temperature_c > limit:
        status = "확인"
    else:
        status = "정상"
    print(record["sensor_id"], status)
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
