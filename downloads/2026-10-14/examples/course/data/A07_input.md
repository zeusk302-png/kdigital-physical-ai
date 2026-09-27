# A07 · 숫자 더하기와 문자열 연결

3 + 2는 5이고 "3" + "2"는 글자 32입니다. 10/8의 사번 001처럼 앞의 0을 유지해야 하는 이름표는 문자열이 적절할 수 있으므로 모든 숫자 모양을 변환하지 않습니다.

## 전체 시연 코드


```python
count = 3
text_count = "3"
print(count + 2)
print(text_count + "2")
print(type(count).__name__, type(text_count).__name__)
```

## 고의 오류 비교

정상 코드에서 다음 부분을 바꾼 경우를 비교합니다. 원본은 보존합니다.


```python
print(text_count + 2)
```

예상 오류 종류: TypeError
## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
