# B02 · 입고·출고 순서와 값 추적
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 대입 순서, 이전 값, 독립된 숫자
# 실행: course 폴더에서 python -X utf8 samples/B02_starter.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 첫 재고와 작업 시작 시점의 재고를 따로 기억합니다.
stock = 8
opening_stock = stock  # 숫자 8을 다른 이름에도 저장합니다.
print(f"시작: {stock}")
# 오른쪽 stock은 이 줄이 실행되기 직전의 값 8입니다.
incoming = 3
stock = stock + incoming
print(f"입고 후: {stock}")
# 앞 줄에서 바뀐 11을 이용해 출고 수량을 뺍니다.
outgoing = 2
# TODO: 현재 재고에서 출고 수량을 빼세요.
pass  # 이 줄을 필요한 코드로 바꾸세요.
print(f"출고 후: {stock}")
# 숫자는 이후 stock을 바꿔도 opening_stock이 같이 바뀌지 않습니다.
change = stock - opening_stock
print(f"시작 기록: {opening_stock}")
print(f"순변화: {change}")
# 종이에 각 줄 실행 후 stock을 8 → 11 → 9로 적어 보세요.
# outgoing을 5로 바꾸면 마지막 재고는 6, 순변화는 -2입니다.
