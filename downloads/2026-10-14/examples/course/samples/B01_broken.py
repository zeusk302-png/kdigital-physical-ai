# B01 · 주문 금액과 남은 예산 계산
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 변수, 정수, 사칙연산, f 문자열
# 실행: course 폴더에서 python -X utf8 samples/B01_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# [1] 업무 메모를 값으로 옮깁니다. 이름은 값의 뜻이 드러나게 붙입니다.
item_name = "작업 장갑"
unit_price = 2500  # 한 켤레 가격. 돈은 이 예제에서 정수 원으로 계산합니다.
quantity = 4
budget = 15000
# [2] =는 오른쪽 계산 결과를 왼쪽 이름에 저장합니다.
# *는 곱하기입니다. 수량은 가격에 더하는 값이 아닙니다.
subtotal = unit_price + quantity
# 할인 금액은 가격에서 빼고, 배송비는 다시 더합니다.
discount = 1000
delivery_fee = 2000
total = subtotal - discount + delivery_fee
remaining = budget - total
# [3] f를 붙이면 {이름} 자리에 현재 값이 들어갑니다.
print(f"상품: {item_name}")
print(f"상품 금액: {subtotal}원")
print(f"결제 금액: {total}원")
print(f"남은 예산: {remaining}원")
# [4] 수량을 5로 바꿀 때 결제 13500원, 남은 예산 1500원인지 확인하세요.
# 따옴표 안에 quantity를 넣으면 이름의 값이 아니라 글자 자체가 됩니다.
