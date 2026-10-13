# D07 · CSV 저장과 다시 읽어서 확인하기
# ====================================================================
# 이 파일은 사람이 읽는 설명과 컴퓨터가 실행할 코드를 함께 담습니다.
# # 뒤는 주석입니다. 코드에 초록색이 표시되는지는 편집기 설정에 따라 다릅니다.
# 저장: course/advanced/D07_02_normal.py
# 실행: course 폴더의 터미널에서 python -X utf8 advanced/D07_02_normal.py
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

import csv
from pathlib import Path

base = Path(__file__).resolve().parent
output_dir = base / "work"
output_dir.mkdir(exist_ok=True)
path = output_dir / "orders.csv"
orders = [{"name": "볼트, 소형", "quantity": 3},
          {"name": '너트 "표준"', "quantity": 5}]

with path.open("w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "quantity"])
    writer.writeheader()  # 첫 행에 열 이름을 씁니다.
    writer.writerows(orders)  # 셀 안 쉼표·따옴표는 모듈이 처리합니다.

with path.open(encoding="utf-8", newline="") as file:
    saved = list(csv.DictReader(file))
total = 0
for row in saved:
    total += int(row["quantity"])  # 읽은 수량은 문자열입니다.
    print(f"{row['name']}: {row['quantity']}")
print(f"수량 합계: {total}")
