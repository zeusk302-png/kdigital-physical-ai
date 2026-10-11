# D12 · CSV 검수부터 JSON 보고서까지
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 함수, CSV, 자료형, 오류 목록, JSON 저장
# 실행: course 폴더에서 python -X utf8 samples/D12_normal.py
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
