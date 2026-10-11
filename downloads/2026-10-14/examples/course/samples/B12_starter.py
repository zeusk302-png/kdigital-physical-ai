# B12 · 센서 기록을 한 건씩 분류
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 리스트 안의 딕셔너리, None, 조건, 집계
# 실행: course 폴더에서 python -X utf8 samples/B12_starter.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 목록에는 여러 기록, 각 {}에는 기록 한 건의 이름표와 값이 있습니다.
records = [
    {"id": "S01", "temperature": 22.5, "active": True},
    {"id": "S02", "temperature": 0, "active": True},
    {"id": "S03", "temperature": None, "active": True},
    {"id": "S04", "temperature": 30, "active": False},
]
normal_count = 0
for record in records:
    sensor_id = record["id"]
    temperature = record["temperature"]
    # 비활성인지, 미측정인지, 온도 기준을 넘었는지 순서대로 판단합니다.
    if not record["active"]:
        status = "비활성"
    # TODO: 미측정만 골라내는 조건을 작성하세요.
    elif False:  # 이 줄을 필요한 코드로 바꾸세요.
        status = "미측정"
    elif temperature >= 28:
        status = "경고"
    else:
        status = "정상"
        normal_count = normal_count + 1
    print(f"{sensor_id}: {status}")
print(f"정상 기록: {normal_count}")
# S04를 active=True로 바꾸면 경고여야 합니다.
# S02의 0은 확인된 온도입니다. if not temperature로 판별하지 않습니다.
# 직접 작성: 정상·경고·미측정·비활성 개수를 각각 출력하세요.
