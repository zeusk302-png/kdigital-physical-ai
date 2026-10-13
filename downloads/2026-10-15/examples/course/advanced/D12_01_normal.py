# D12 · CSV 검사에서 JSON 보고서까지 연결하기
# ====================================================================
# 이 파일은 사람이 읽는 설명과 컴퓨터가 실행할 코드를 함께 담습니다.
# # 뒤는 주석입니다. 코드에 초록색이 표시되는지는 편집기 설정에 따라 다릅니다.
# 저장: course/advanced/D12_01_normal.py
# 실행: course 폴더의 터미널에서 python -X utf8 advanced/D12_01_normal.py
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

# D12 · CSV 검수부터 JSON 보고서까지
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 함수, CSV, 자료형, 오류 목록, JSON 저장
# 실행: course 폴더에서 python -X utf8 advanced/D12_01_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import csv
import json
import math
from pathlib import Path
from sample_helpers import normalize_active, summarize_values

def load_records(path):
    # 파일 읽기와 업무 검수를 다른 함수로 나눕니다.
    with path.open(encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        required = {"sensor_id", "temperature_c", "active"}
        if not required.issubset(reader.fieldnames or []):
            raise ValueError("sensor_id, temperature_c, active 열이 필요합니다")
        return list(reader)

def validate_rows(rows):
    accepted = []
    issues = []
    seen = set()
    for line_number, row in enumerate(rows, start=2):
        # CSV 첫 줄은 열 이름이므로 데이터 줄 번호는 2부터 시작합니다.
        # 열이 넘치면 None 키, 부족하면 None 값이 생깁니다. 빈 문자열과 다릅니다.
        wrong_shape = None in row
        for value in row.values():
            if value is None:
                wrong_shape = True
        if wrong_shape:
            issues.append({"line": line_number, "reason": "열 개수 오류"})
            continue
        sensor_id = row["sensor_id"].strip()
        if sensor_id == "":
            issues.append({"line": line_number, "reason": "번호 누락"})
            continue
        # 원본에 번호가 반복되면 뒤쪽 기록을 임의로 덮어쓰지 않습니다.
        if sensor_id in seen:
            issues.append({"line": line_number, "reason": "번호 중복"})
            continue
        seen.add(sensor_id)
        raw = row["temperature_c"].strip()
        try:
            temperature = None if raw == "" else float(raw)
            # float('NaN')은 변환에 성공하지만 정상 측정값으로 쓰면 안 됩니다.
            if temperature is not None and not math.isfinite(temperature):
                raise ValueError("유한한 온도가 필요합니다")
            active = normalize_active(row["active"])
        except ValueError:
            # 문제 원문과 줄 번호를 남겨 담당자가 다시 확인할 수 있게 합니다.
            issues.append({"line": line_number, "reason": "온도 또는 상태 오류", "raw": row})
            continue
        accepted.append({"id": sensor_id, "temperature": temperature, "active": active})
    return accepted, issues

def make_report(records, issues, input_count):
    values = []
    alerts = []
    for record in records:
        temperature = record["temperature"]
        values.append(temperature)
        # 교육용 기준입니다. 실제 장비 제어 명령을 보내지 않습니다.
        if record["active"] and temperature is not None and temperature >= 28:
            alerts.append(record["id"])
    return {"input_count": input_count, "accepted_count": len(records),
            "summary": summarize_values(values), "alerts": alerts, "issues": issues}

base = Path(__file__).resolve().parent
rows = load_records(base / "data" / "inspection.csv")
accepted, issues = validate_rows(rows)
report = make_report(accepted, issues, len(rows))
output_dir = base / "work"
output_dir.mkdir(exist_ok=True)
output_path = output_dir / "D12_report.json"
# ensure_ascii=False는 한글을 그대로 저장하고 indent=2는 들여쓰기를 줍니다.
with output_path.open("w", encoding="utf-8") as file:
    json.dump(report, file, ensure_ascii=False, indent=2, allow_nan=False)
# 저장한 파일을 다시 읽습니다. None은 파일 안에서 null로 바뀝니다.
with output_path.open(encoding="utf-8") as file:
    saved = json.load(file)
print(f"입력: {saved['input_count']} / 사용: {saved['accepted_count']} / 문제: {len(saved['issues'])}")
print(f"측정: {saved['summary']['count']} / 미측정: {saved['summary']['missing']}")
print(f"평균: {saved['summary']['average']}")
print(f"경고: {saved['alerts']}")
# 직접 작성: 경고 임계값을 함수의 인수로 받아 28과 31의 결과를 비교하세요.
# 평균 계산은 이 예제에서 비활성 장치의 유효 측정값도 포함하는 약속입니다.
# 입력 CSV는 그대로 두고 work/D12_report.json만 다시 저장합니다.
