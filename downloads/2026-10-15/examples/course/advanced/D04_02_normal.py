# D04 · 순서·번호·두 목록을 함께 처리하기
# ====================================================================
# 이 파일은 사람이 읽는 설명과 컴퓨터가 실행할 코드를 함께 담습니다.
# # 뒤는 주석입니다. 코드에 초록색이 표시되는지는 편집기 설정에 따라 다릅니다.
# 저장: course/advanced/D04_02_normal.py
# 실행: course 폴더의 터미널에서 python -X utf8 advanced/D04_02_normal.py
# 편집기에 명령을 적지 않습니다. 코드 수정 후 Ctrl+S로 저장합니다.
# 파일 전체는 실행 가능하며, data와 함수 파일은 advanced 폴더에 함께 둡니다.
# 입력 파일 data는 읽고, 생성 결과는 work에 저장합니다.
#
# 무엇을 배우나요?
# 기록에 순번을 붙이거나 제품 이름 목록과 수량 목록을 함께 처리할 수 있습니다. 번호가 필요한 반복에는 enumerate,
# 두 목록을 짝지을 때는 zip을 사용합니다. 짝이 없는 자료를 놓치지 않도록 길이를 먼저 확인합니다.
#
# 구성요소와 기호
# enumerate: 목록의 위치 번호와 값을 한 번에 줍니다. start=1은 표시 번호를 1부터 시작합니다.
# zip: 각 목록의 같은 위치 값을 묶습니다. 기본 동작에서는 짧은 목록이 끝나면 멈춥니다.
# 튜플과 나누어 받기: 번호와 값처럼 묶인 결과를 index, value로 나누어 받습니다. 여기서는 묶음 읽기만
# 사용합니다.
# len: 목록의 값 개수입니다. 짝짓기 전에 두 길이가 같은지 확인합니다.
# sorted: 정렬한 새 목록을 반환합니다. 원본 목록의 순서는 유지됩니다.
#
# 이 단원의 첫 예제 실행을 따라가기
# 이름이 3개, 수량이 2개면 세 번째 이름과 짝이 될 수량이 없습니다. 길이 검사에서 중지하면 누락을 숨기지 않습니다.
# 길이가 맞을 때만 zip으로 각 이름과 수량을 꺼냅니다.
#
# 한 부분 바꾸고 확인하기
# 두 번째 예제에서 수량 하나를 삭제하세요. 부분 주문을 계산하지 않고 목록 길이 오류만 출력하는지 확인하세요.

def make_orders(names, quantities):
    # zip만 사용하면 짧은 목록 이후의 이름을 놓칠 수 있습니다.
    if len(names) != len(quantities):
        raise ValueError("목록 길이 오류")
    orders = []
    # name, quantity는 묶인 두 값을 각각 받습니다.
    for name, quantity in zip(names, quantities):
        orders.append({"name": name, "quantity": quantity})
    return orders

orders = make_orders(["볼트", "너트"], [3, 5])
# 내부 위치와 별개로 출력 순번은 1부터 표시합니다.
for number, order in enumerate(orders, start=1):
    print(f"{number}. {order['name']}: {order['quantity']}개")
try:
    make_orders(["볼트", "너트"], [3])
except ValueError as error:
    # as error는 잡은 오류를 이 이름으로 읽게 합니다.
    print(error)
