# A15 · 반복 안에서 조건 확인과 개수 세기

22.5, 24.0, 25.0에서 ‘24.0 초과’는 마지막 한 건입니다. 24.0은 같은 값이므로 포함하지 않습니다. >를 >=로 바꾸면 두 건이 됩니다.

## 전체 시연 코드


```python
temperatures = [22.5, 24.0, 25.0]
count = 0
for temperature_c in temperatures:
    if temperature_c > 24.0:
        count = count + 1
print("확인 건수", count)
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
