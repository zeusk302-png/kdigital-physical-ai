# D06 · 파일 위치·텍스트 읽기·CSV 읽기
# ====================================================================
# 이 파일은 사람이 읽는 설명과 컴퓨터가 실행할 코드를 함께 담습니다.
# # 뒤는 주석입니다. 코드에 초록색이 표시되는지는 편집기 설정에 따라 다릅니다.
# 저장: course/advanced/D06_01_normal.py
# 실행: course 폴더의 터미널에서 python -X utf8 advanced/D06_01_normal.py
# 편집기에 명령을 적지 않습니다. 코드 수정 후 Ctrl+S로 저장합니다.
# 파일 전체는 실행 가능하며, data와 함수 파일은 advanced 폴더에 함께 둡니다.
# 입력 파일 data는 읽고, 생성 결과는 work에 저장합니다.
#
# 무엇을 배우나요?
# 변수 안 자료는 실행이 끝나면 다음 실행에서 그대로 사용할 수 없습니다. 파일은 다음에 다시 읽을 수 있도록 값을
# 저장합니다. 먼저 텍스트 파일의 경로·읽기·닫기를 이해하고, 표 형태의 CSV를 읽습니다.
#
# 구성요소와 기호
# Path와 경로: 파일 위치를 나타냅니다. / 연산자로 폴더와 파일 이름을 이어 붙입니다.
# __file__와 parent: 현재 실행한 Python 파일의 위치와 그 파일이 들어 있는 폴더입니다. 터미널 위치와
# 다를 수 있습니다.
# open과 모드: r은 읽기, w는 새로 쓰기 또는 덮어쓰기입니다. 원본 data에 w를 사용하지 않습니다.
# with와 encoding: with 블록이 끝나면 파일을 닫습니다. UTF-8은 한글을 읽고 쓰는 문자 표현 방식입니다.
# DictReader: CSV 첫 줄의 열 이름을 딕셔너리 키로 읽습니다. 숫자처럼 보여도 기본적으로 문자열입니다.
# FileNotFoundError: 파일이 없거나 경로가 다르면 생깁니다. 먼저 이름·확장자·위치를 확인합니다.
#
# 이 단원의 첫 예제 실행을 따라가기
# __file__에서 Python 파일 폴더를 찾고 data/readings.csv 경로를 만듭니다. 첫 행은 열 이름으로
# 사용하고 다음 행을 딕셔너리로 읽습니다. "22.5"를 숫자 계산에 쓰려면 float 변환이 필요합니다.
#
# 한 부분 바꾸고 확인하기
# 두 번째 예제를 course 폴더와 그 상위 폴더에서 각각 실행하세요. work에 저장되는 결과 위치가 같은지 확인하세요.

# D06 · 파일 위치를 정하고 CSV 읽기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: Path, __file__, with, DictReader, UTF-8
# 실행: course 폴더에서 python -X utf8 advanced/D06_01_normal.py
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
    temperature = None if raw == "" else float(raw)
    # 위 표현은 '조건이면 앞 값, 아니면 뒤 값'인 짧은 조건 표현입니다.
    print(f"{row['sensor_id']}: {temperature}")
print(f"첫 번호 종류: {type(rows[0]['sensor_id']).__name__}")
# 원본 data 파일에는 쓰지 않습니다. .open에 w를 넣지 마세요.
# 다른 폴더에서 실행해도 __file__ 기준 data 경로는 같습니다.
# 직접 작성: 미측정 개수를 계산해 마지막에 출력하세요.
