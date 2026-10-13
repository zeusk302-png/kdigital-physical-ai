# D07 · CSV 저장과 다시 읽어서 확인하기
# ====================================================================
# 이 파일은 사람이 읽는 설명과 컴퓨터가 실행할 코드를 함께 담습니다.
# # 뒤는 주석입니다. 코드에 초록색이 표시되는지는 편집기 설정에 따라 다릅니다.
# 저장: course/advanced/D07_broken.py
# 실행: course 폴더의 터미널에서 python -X utf8 advanced/D07_broken.py
# 편집기에 명령을 적지 않습니다. 코드 수정 후 Ctrl+S로 저장합니다.
# 파일 전체는 실행 가능하며, data와 함수 파일은 advanced 폴더에 함께 둡니다.
# 입력 파일 data는 읽고, 생성 결과는 work에 저장합니다.
#
# 무엇을 배우나요?
# CSV는 행과 열을 가진 표를 텍스트 파일로 나타내는 형식입니다. 셀 안에 쉼표나 따옴표가 있으면 직접 문자열을 이어
# 붙이는 방식으로는 열이 깨질 수 있습니다. csv 모듈에 저장을 맡기고 다시 읽어 값이 보존됐는지 확인합니다.
#
# 구성요소와 기호
# DictWriter: 딕셔너리 기록을 지정한 열 순서로 저장합니다.
# fieldnames: 출력 CSV에 들어갈 열 이름과 순서를 정합니다.
# writeheader와 writerows: 열 이름 한 줄을 쓰고, 여러 기록을 씁니다.
# newline="": CSV 모듈이 줄바꿈을 처리하도록 파일을 엽니다.
# 재읽기와 변환: 저장한 뒤 DictReader로 읽고 필요한 수량은 int로 바꿔 합계를 비교합니다.
# None과 빈칸: CSV에서는 None이 빈 문자열로 저장되어 원래의 빈 문자열과 구분이 사라질 수 있습니다.
#
# 이 단원의 첫 예제 실행을 따라가기
# 품목 "볼트, 소형"에는 쉼표가 들어 있습니다. DictWriter가 필요한 따옴표 처리를 합니다. DictReader로
# 다시 읽으면 하나의 name 값으로 돌아오고 quantity는 문자열 "3"이 됩니다.
#
# 한 부분 바꾸고 확인하기
# 두 번째 예제에 이름에 따옴표가 든 제품을 추가하세요. 원래 이름과 재읽은 이름이 같고 수량 합계가 증가하는지 비교하세요.

# D07 · 쉼표·따옴표·빈값을 CSV로 저장
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: DictWriter, writeheader, writerows, 재읽기
# 실행: course 폴더에서 python -X utf8 advanced/D07_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import csv
from pathlib import Path
base = Path(__file__).resolve().parent
output_dir = base / "work"
output_dir.mkdir(exist_ok=True)  # 폴더가 있으면 그대로 사용합니다.
output_path = output_dir / "D07_orders.csv"
rows = [
    {"id": "001", "item": "볼트, 소형", "quantity": 0, "note": '담당자 "김"'},
    {"id": "002", "item": "너트", "quantity": None, "note": ""},
]
# w는 같은 이름의 출력 파일을 덮어씁니다. work 파일만 대상으로 합니다.
with output_path.open("w", encoding="utf-8-sig", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["id", "item", "quantity", "note"])
    pass  # 열 이름을 쓰지 않은 경우  # 열 이름 한 줄을 먼저 씁니다.
    writer.writerows(rows)  # 쉼표와 큰따옴표 처리는 라이브러리에 맡깁니다.
# 저장했다고 끝내지 않고 다시 읽어 값이 유지되는지 확인합니다.
with output_path.open(encoding="utf-8-sig", newline="") as file:
    saved = list(csv.DictReader(file))
print(f"저장 기록: {len(saved)}")
print(f"첫 상품: {saved[0]['item']}")
print(f"첫 메모: {saved[0]['note']}")
print(f"둘째 수량 빈칸: {saved[1]['quantity'] == ''}")
# None은 csv writer에서 빈 문자열로 기록됩니다. 0은 '0'으로 남습니다.
# 직접 작성: 메모에 '창고, 안쪽'을 넣고 재읽기 결과를 확인하세요.
