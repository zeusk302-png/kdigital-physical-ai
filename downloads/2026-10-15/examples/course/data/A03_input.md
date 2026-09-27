# A03 · 매개변수와 실제 인자

sensor_id와 value는 받을 이름입니다. 첫 호출에서 S01·22.5가 연결되고 다음 호출에서는 S02·25.0이 연결됩니다. 각 호출은 서로 다른 값으로 같은 본문을 사용합니다.

## 전체 시연 코드


```python
def show_temperature(sensor_id, value):
    print(sensor_id, value)
show_temperature("S01", 22.5)
show_temperature("S02", 25.0)
```

## 고의 오류 비교

정상 코드에서 다음 부분을 바꾼 경우를 비교합니다. 원본은 보존합니다.


```python
show_temperature("S02")
```

예상 오류 종류: TypeError
## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
