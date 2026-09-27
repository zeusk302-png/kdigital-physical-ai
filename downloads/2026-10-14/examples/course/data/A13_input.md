# A13 · 리스트와 위치로 여러 값 담기

temperatures[0]은 첫 값 22.5이고 len은 3입니다. 마지막 위치 번호는 2이지 3이 아닙니다. 개수와 위치 번호를 서로 다른 질문으로 적습니다.

## 전체 시연 코드


```python
temperatures = [22.5, 24.0, 23.5]
print(temperatures[0])
print(len(temperatures))
temperatures.append(25.0)
print(len(temperatures))
print(temperatures[3])
```

## 고의 오류 비교

정상 코드에서 다음 부분을 바꾼 경우를 비교합니다. 원본은 보존합니다.


```python
print(temperatures[3])
```

예상 오류 종류: IndexError
## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
