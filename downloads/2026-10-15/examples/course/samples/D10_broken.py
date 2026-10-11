# D10 · 구역별 합계·개수·평균 집계
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 딕셔너리 누적, 중첩 값, None, 평균
# 실행: course 폴더에서 python -X utf8 samples/D10_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

records = [
    {"zone": "A", "temperature": 22},
    {"zone": "A", "temperature": 0},
    {"zone": "B", "temperature": None},
    {"zone": "B", "temperature": 30},
]
groups = {}
for record in records:
    zone = record["zone"]
    if zone not in groups:
        groups[zone] = {"sum": 0, "count": 0, "missing": 0}
    temperature = record["temperature"]
    if temperature is None:
        groups[zone]["missing"] += 1  # += 1은 현재 값에 1을 더해 저장합니다.
        continue
    groups[zone]["sum"] += temperature
    groups[zone]["count"] += 2
for zone, group in groups.items():
    if group["count"] == 0:
        average = None
    else:
        average = group["sum"] / group["count"]
    print(f"{zone}: 측정 {group['count']}, 미측정 {group['missing']}, 평균 {average}")
# 미측정은 분모에서 제외합니다. 0은 측정 개수에 포함합니다.
# 직접 작성: 구역 C에 None만 한 건 넣고 평균이 None인지 확인하세요.
