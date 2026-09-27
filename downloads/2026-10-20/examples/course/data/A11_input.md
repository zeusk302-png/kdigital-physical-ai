# A11 입력과 관찰 조건

작업본의 value > threshold를 value >= threshold로 바꾸면 28의 결과가 정상에서 주의로 달라집니다.

비교할 반례: 기본 threshold를 27로 내리는 것은 같은 수정이 아닙니다. 27.9까지 주의가 되어 규칙을 바꿉니다.

참고 파일: [classifier.py](../work/classifier.py), [cases.json](../data/cases.json)
