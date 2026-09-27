# A11 · if와 else로 출력 선택하기

23.5는 기준 24.0을 넘지 않으므로 else 쪽의 정상이 출력됩니다. 25.0을 넣으면 if 쪽의 확인이 출력됩니다. 두 print를 모두 실행하는 코드와 차이를 비교합니다.

## 전체 시연 코드


```python
temperature_c = 23.5
limit = 24.0
if temperature_c > limit:
    print("확인")
else:
    print("정상")
```

## 고의 오류 비교

정상 코드에서 다음 부분을 바꾼 경우를 비교합니다. 원본은 보존합니다.


```python
print("확인")
```

예상 오류 종류: IndentationError
## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
