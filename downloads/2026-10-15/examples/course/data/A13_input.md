# A13 · 범위 규칙을 함수에서 확인하기

23.5는 반환하고 51.0은 범위 확인 필요를 알립니다.0과 50은 허용 경계입니다. 이 범위는 실습의 입력 약속이며 실제 장비 안전 기준이 아닙니다.

## 전체 시연 코드


```python
def checked_temperature(raw):
    value = float(raw)
    if value < 0 or value > 50:
        raise ValueError("범위 확인 필요")
    return value
print(checked_temperature("23.5"))
```

## 고의 오류 비교

정상 코드에서 다음 부분을 바꾼 경우를 비교합니다. 원본은 보존합니다.


```python
"51.0"
```

예상 오류 종류: ValueError
## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
