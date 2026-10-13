# D12 · CSV 검사에서 JSON 보고서까지 연결하기
# ====================================================================
# 이 파일은 사람이 읽는 설명과 컴퓨터가 실행할 코드를 함께 담습니다.
# # 뒤는 주석입니다. 코드에 초록색이 표시되는지는 편집기 설정에 따라 다릅니다.
# 저장: course/advanced/D12_02_normal.py
# 실행: course 폴더의 터미널에서 python -X utf8 advanced/D12_02_normal.py
# 편집기에 명령을 적지 않습니다. 코드 수정 후 Ctrl+S로 저장합니다.
# 파일 전체는 실행 가능하며, data와 함수 파일은 advanced 폴더에 함께 둡니다.
# 입력 파일 data는 읽고, 생성 결과는 work에 저장합니다.
#
# 무엇을 배우나요?
# 파일 읽기·값 검사·집계·저장을 각각 배웠다면 이제 하나의 작업으로 연결합니다. 원본은 유지하고 사용할 기록과 오류를
# 나누어 결과 파일을 만듭니다. 완성 프로그램은 짧은 기능들을 함수로 나누어 조립합니다.
#
# 구성요소와 기호
# 읽기 → 검사 → 집계 → 저장: 각 단계의 함수가 어떤 값을 받아 무엇을 반환하는지 먼저 정합니다.
# 열 구조 검사: 필수 열과 열 개수를 확인해야 잘못된 표를 정상 자료로 오해하지 않습니다.
# 중복과 변환: 번호·숫자·참거짓을 각각 정한 규칙으로 검사합니다.
# 결과 보고서: 입력 수·채택 수·미측정 수·평균·오류 사유를 함께 저장합니다.
# 재읽기와 검산: 저장한 JSON을 다시 읽고 화면 요약과 일치하는지 확인합니다.
# 원본 보존: data는 읽기 전용으로 다루고 결과는 work에 저장합니다.
#
# 이 단원의 첫 예제 실행을 따라가기
# 첫 예제는 CSV 7행을 읽어 4행을 채택하고 3행의 문제를 분리합니다. 채택된 4행 중 하나는 미측정이므로 평균에는 측정
# 3개만 사용합니다. 경고 목록과 오류 목록을 JSON에 함께 저장합니다.
#
# 한 부분 바꾸고 확인하기
# 입력 원본의 사본에서 측정 하나를 빈칸으로 바꿔 실행하세요. 입력 행 수와 채택 수는 유지되고 측정 수·평균만 달라지는지
# 확인하세요. 다음에는 번호를 중복시켜 오류 수 변화를 비교하세요.

import csv
import json
from pathlib import Path

def load_rows(path):
    with path.open(encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        if reader.fieldnames != ["name", "quantity"]:
            raise ValueError("name, quantity 열이 필요합니다")
        return list(reader)

def inspect(rows):
    accepted = []
    issues = []
    seen = set()
    for number, row in enumerate(rows, start=2):
        # 첫 줄은 열 이름이라 실제 자료의 파일 줄은 2부터 시작합니다.
        wrong_shape = None in row
        # 열이 부족하면 None 값이 생깁니다. 각 열을 반복해서 확인합니다.
        for value in row.values():
            if value is None:
                wrong_shape = True
        if wrong_shape:
            issues.append({"line": number, "reason": "열 개수 오류"})
            continue
        name = row["name"].strip()
        if name == "" or name in seen:
            issues.append({"line": number, "reason": "이름 누락 또는 중복"})
            continue
        try:
            quantity = int(row["quantity"])
            if quantity < 0:
                raise ValueError("음수 수량")
        except ValueError:
            issues.append({"line": number, "reason": "수량 오류"})
            continue
        seen.add(name)
        accepted.append({"name": name, "quantity": quantity})
    return accepted, issues

def make_report(accepted, issues):
    total = 0
    low_stock = []
    for row in accepted:
        total += row["quantity"]
        if row["quantity"] < 3:
            low_stock.append(row["name"])
    return {"accepted": len(accepted), "total": total,
            "low_stock": low_stock, "issues": issues}

base = Path(__file__).resolve().parent
rows = load_rows(base / "data" / "stock.csv")
accepted, issues = inspect(rows)
report = make_report(accepted, issues)
output_dir = base / "work"
output_dir.mkdir(exist_ok=True)
path = output_dir / "stock_report.json"
with path.open("w", encoding="utf-8") as file:
    json.dump(report, file, ensure_ascii=False, indent=2, allow_nan=False)
with path.open(encoding="utf-8") as file:
    saved = json.load(file)
print(f"정상: {saved['accepted']} / 수량 합계: {saved['total']}")
print(f"부족: {saved['low_stock']}")
print(f"오류: {len(saved['issues'])}")
