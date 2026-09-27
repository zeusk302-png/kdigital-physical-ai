# A10 · 미측정과 잘못된 숫자의 구별

빈 문자열은 None, "0.0"은 숫자 0.0, "뜨거움"은 ValueError입니다. 먼저 빈 문자열인지 확인하고 나머지에 숫자 변환을 적용합니다.

## 전체 시연 코드


```python
def parse_temperature(raw):
    if raw == "":
        return None
    return float(raw)
print(parse_temperature("22.5"))
print(parse_temperature(""))
print(parse_temperature("0.0"))
```

## 고의 오류 비교

정상 코드에서 다음 부분을 바꾼 경우를 비교합니다. 원본은 보존합니다.


```python
parse_temperature("뜨거움")
```

예상 오류 종류: ValueError
## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
