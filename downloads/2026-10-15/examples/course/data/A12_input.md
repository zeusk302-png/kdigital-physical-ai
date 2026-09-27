# A12 · try와 except로 예상 오류 기록

‘뜨거움’을 float로 읽으면 ValueError가 납니다. 그때 원문과 확인 필요 메시지를 출력합니다. 정상값 24.0을 주면 숫자를 출력합니다.

## 전체 시연 코드


```python
raw = "뜨거움"
try:
    value = float(raw)
    print(value)
except ValueError:
    print("숫자 확인 필요:", raw)
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
