# D06 · 파일 위치를 정하고 CSV 읽기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: Path, __file__, with, DictReader, UTF-8
# 실행: course 폴더에서 python -X utf8 samples/D06_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import csv
from pathlib import Path
# __file__은 지금 실행하는 .py의 위치입니다. 터미널의 현재 폴더와 다릅니다.
base = Path(__file__).resolve().parent
input_path = base / "data" / "readings.csv"  # /는 경로를 이어 붙입니다.
# with를 벗어나면 파일을 닫습니다. newline=""은 CSV 줄바꿈 처리에 사용합니다.
with input_path.open(encoding="utf-8-sig", newline="") as file:
    rows = list(csv.DictReader(file))  # 첫 줄의 열 이름이 딕셔너리의 키가 됩니다.
print(f"기록 수: {len(rows)}")
for row in rows:
    raw = row["temperature_c"]
    # CSV에서 읽은 수량·온도도 처음에는 문자열입니다.
    temperature = float(raw)
    # 위 표현은 '조건이면 앞 값, 아니면 뒤 값'인 짧은 조건 표현입니다.
    print(f"{row['sensor_id']}: {temperature}")
print(f"첫 번호 종류: {type(rows[0]['sensor_id']).__name__}")
# 원본 data 파일에는 쓰지 않습니다. .open에 w를 넣지 마세요.
# 다른 폴더에서 실행해도 __file__ 기준 data 경로는 같습니다.
# 직접 작성: 미측정 개수를 계산해 마지막에 출력하세요.
