# A06 · 이름 오류를 근거로 고치기

아래 정상 예는 sensor_id와 temperature_c를 각각 정의한 뒤 출력합니다. 고의 오류 카드에는 print(temperature)가 있으며, 정의된 이름은 temperature_c뿐입니다.

## 전체 시연 코드


```python
sensor_id = "S01"
temperature_c = 22.5
print(sensor_id, temperature_c)
```

## 고의 오류 비교

정상 코드에서 다음 부분을 바꾼 경우를 비교합니다. 원본은 보존합니다.


```python
print(sensor_id, temperature)
```

예상 오류 종류: NameError
## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
