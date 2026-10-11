# B11 · 상품 이름으로 재고 찾아 수정
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 딕셔너리, 키, get, in, items
# 실행: course 폴더에서 python -X utf8 samples/B11_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# {}는 이름표와 값을 묶는 딕셔너리입니다. 여기서 이름표는 상품명입니다.
inventory = {"볼트": 5, "너트": 0}
item = "볼트"
incoming = 3
inventory[item] = inventory[item] + incoming
# get(키, 기본값)은 키가 없을 때 기본값을 돌려줍니다.
# 미등록 상품의 기본값은 None으로 두어 재고 0과 구별합니다.
missing = inventory.get("와셔", None)
print(f"볼트 재고: {inventory['볼트']}")
print(f"너트 등록: {'너트' in inventory}")
print(f"너트 재고: {inventory['너트']}")
print(f"와셔 미등록: {missing is None}")
# items는 키와 값을 한 쌍씩 꺼냅니다. 두 이름으로 받습니다.
for name, stock in inventory.items():
    print(f"{name}: {stock}")
# get의 기본값을 0으로 바꾸면 미등록과 품절을 구별할 수 없습니다.
# 직접 작성: 상품이 등록되어 있는지 먼저 확인하는 출고 코드를 만드세요.
