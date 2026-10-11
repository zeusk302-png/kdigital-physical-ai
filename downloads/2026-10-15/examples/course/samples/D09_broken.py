# D09 · 번호 중복과 잘못된 기록을 따로 모으기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 집합 set, 목록, 검수 순서, continue
# 실행: course 폴더에서 python -X utf8 samples/D09_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

records = [
    {"id": "S01", "temperature": 22.5},
    {"id": "S02", "temperature": 0},
    {"id": "S01", "temperature": 24},
    {"id": "", "temperature": 20},
    {"id": "S03", "temperature": None},
]
seen = set()  # {}는 빈 딕셔너리입니다. 빈 집합은 set()으로 만듭니다.
accepted = []
issues = []
for record in records:
    sensor_id = record["id"]
    if sensor_id == "":
        issues.append("번호 누락")
        continue
    if sensor_id in seen:
        issues.append(f"중복 {sensor_id}")
        continue
    pass  # 처리한 번호를 기억하지 않은 경우  # 처리한 식별자를 기억합니다.
    accepted.append(record)
print(f"받은 기록: {len(records)}")
print(f"사용 기록: {len(accepted)}")
for issue in issues:
    print(f"문제: {issue}")
# 여기서는 '한 센서당 한 기록'이라는 교육용 약속을 사용합니다.
# 실제 시간별 측정 로그는 같은 센서 번호가 반복될 수 있습니다.
# 직접 작성: 문제 목록에 원본 줄 번호도 넣으세요.
