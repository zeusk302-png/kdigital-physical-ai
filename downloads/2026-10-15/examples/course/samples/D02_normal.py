# D02 · 기본값과 이름을 지정해 함수 호출
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 인수, 기본값, 키워드 인수, 지역 변수
# 실행: course 폴더에서 python -X utf8 samples/D02_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

def calculate_total(price, quantity, delivery=0):
    # price와 quantity는 호출할 때마다 새로 받는 함수 안의 이름입니다.
    # delivery를 생략하면 기본값 0을 사용합니다.
    subtotal = price * quantity
    total = subtotal + delivery
    return total

# 같은 계산 규칙을 서로 다른 입력에 적용합니다.
pickup = calculate_total(2000, 3)
shipped = calculate_total(2000, 3, delivery=1000)
# 이름을 지정하면 인수 순서를 바꿔도 뜻이 드러납니다.
named = calculate_total(quantity=2, price=1500, delivery=500)
print(f"방문 수령: {pickup}")
print(f"배송: {shipped}")
print(f"다른 주문: {named}")
# subtotal은 함수 안의 지역 변수이므로 바깥에서 바로 읽을 수 없습니다.
# 반환값을 pickup처럼 받아 다음 업무에서 사용하세요.
# 직접 작성: 할인 금액 discount=0을 인수로 더하고 계산하세요.
