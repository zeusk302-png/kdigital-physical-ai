# A14 · CSV 비교 세 사례

1. 위치 이름에 쉼표가 있다: quoted_location.csv의 `"창고, 안쪽"`은 한 필드다. 쉼표만 세는 것으로 필드 수를 판단하지 않는다. 이 위치는 따옴표 설명용 별도 예시다.
2. blank_temperature.csv는 미측정, zero_temperature.csv는 실제 0.0 측정이다. 온도 칸의 의미를 보존한다.
3. text_identifiers.csv의 employee_id 001은 이름표다. 숫자로 바꿔 1로 저장하면 앞의 0이 사라진다. CSV에는 자료형 선언이 없으므로 사전과 읽는 프로그램의 처리가 중요하다.
