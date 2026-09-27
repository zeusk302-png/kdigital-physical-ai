# A05 · 조건을 담은 상태 함수

None이면 미측정,24.0 초과면 확인,나머지는 정상입니다. 앞의 return을 실행한 호출은 아래 비교로 다시 내려가지 않습니다.

## 전체 시연 코드


```python
def temperature_status(value):
    if value is None:
        return "미측정"
    if value > 24.0:
        return "확인"
    return "정상"
print(temperature_status(22.5))
print(temperature_status(None))
print(temperature_status(25.0))
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
