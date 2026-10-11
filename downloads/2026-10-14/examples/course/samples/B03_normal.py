# B03 · 글자로 받은 숫자와 미측정 구별
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: str, int, float, None, type, is
# 실행: course 폴더에서 python -X utf8 samples/B03_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 파일이나 입력창에서 받은 3은 계산용 숫자가 아니라 문자열일 수 있습니다.
raw_quantity = "3"
raw_temperature = "22.5"
raw_missing = ""  # 빈 글자입니다. 확인된 숫자 0과 다릅니다.
# int는 정수 글자, float는 소수 글자를 계산용 숫자로 바꿉니다.
quantity = int(raw_quantity)
temperature = float(raw_temperature)
# 비어 있을 때 float("")를 실행하면 ValueError가 납니다.
if raw_missing == "":
    missing_temperature = None  # 이 수업의 미측정 표시입니다.
else:
    missing_temperature = float(raw_missing)
print(f"원문 종류: {type(raw_quantity).__name__}")
print(f"수량 합계: {quantity + 2}")
print(f"온도: {temperature}")
print(f"미측정 여부: {missing_temperature is None}")
# __name__은 type이 돌려준 종류의 이름만 읽는 속성입니다.
# 숫자 0을 넣으면 미측정 여부는 False여야 합니다.
# 'None'은 글자이며 None은 값입니다. 따옴표 유무를 비교하세요.
