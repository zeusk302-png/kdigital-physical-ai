# B06 · 수량 입력을 받고 잘못된 입력 안내
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: input, int, try/except, ValueError
# 실행: course 폴더에서 python -X utf8 samples/B06_starter.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 더 해보기: 조건문과 자료형 변환을 읽은 뒤 진행합니다.
# input은 키보드로 입력한 내용을 언제나 문자열로 돌려줍니다.
raw = input("수량(0 이상 정수): ")
# try는 실패할 수 있는 변환을 시도하는 묶음입니다.
try:
    # TODO: 입력값을 정수로 변환하세요.
    pass  # 이 줄을 필요한 코드로 바꾸세요.
except ValueError:
    # int로 바꿀 수 없는 글자나 소수 입력만 이곳에서 안내합니다.
    print("정수로 입력하세요.")
else:
    # 변환 성공과 업무 규칙 통과는 다른 검사입니다.
    if quantity < 0:
        print("수량은 0 이상이어야 합니다.")
    else:
        unit_price = 2000
        print(f"수량: {quantity}")
        print(f"금액: {quantity * unit_price}원")
# 3, 0, -1, abc, 2.5를 각각 실행해 메시지를 비교하세요.
# 예외를 넓게 숨기지 않고 예상한 ValueError만 처리합니다.
# 이 코드는 한 번 안내하고 종료합니다. 자동으로 다시 묻지 않습니다.
