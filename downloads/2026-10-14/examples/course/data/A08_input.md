# A08 · 수치 문자열을 숫자로 변환하기

raw와 temperature_c를 나누어 두면 받은 원문과 해석 결과를 비교하기 쉽습니다. 출력에서는 두 값의 모양이 같아도 자료형이 str과 float로 다릅니다.

## 전체 시연 코드


```python
raw = "22.5"
temperature_c = float(raw)
print(raw, type(raw).__name__)
print(temperature_c, type(temperature_c).__name__)
print(temperature_c + 1)
```

## 고의 오류 비교

정상 코드에서 다음 부분을 바꾼 경우를 비교합니다. 원본은 보존합니다.


```python
"뜨거움"
```

예상 오류 종류: ValueError
## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
