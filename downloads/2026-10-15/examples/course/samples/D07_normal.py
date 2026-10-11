# D07 · 쉼표·따옴표·빈값을 CSV로 저장
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: DictWriter, writeheader, writerows, 재읽기
# 실행: course 폴더에서 python -X utf8 samples/D07_normal.py
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
    writer.writeheader()  # 열 이름 한 줄을 먼저 씁니다.
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
