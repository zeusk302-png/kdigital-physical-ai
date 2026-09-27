# A12 · 미측정과 경계값의 세 갈래

None이면 미측정, 숫자 25.0이면 확인, 24.0이면 정상입니다. 기준은 ‘24.0 초과’이므로 같은 값은 정상 쪽입니다. 숫자 비교는 값이 있는 경우에만 진행됩니다.

## 전체 시연 코드


```python
temperature_c = None
if temperature_c is None:
    print("미측정")
elif temperature_c > 24.0:
    print("확인")
else:
    print("정상")
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
