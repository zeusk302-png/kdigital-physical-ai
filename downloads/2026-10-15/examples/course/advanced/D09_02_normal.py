# D09 · 중복·누락·잘못된 기록 따로 모으기
# ====================================================================
# 이 파일은 사람이 읽는 설명과 컴퓨터가 실행할 코드를 함께 담습니다.
# # 뒤는 주석입니다. 코드에 초록색이 표시되는지는 편집기 설정에 따라 다릅니다.
# 저장: course/advanced/D09_02_normal.py
# 실행: course 폴더의 터미널에서 python -X utf8 advanced/D09_02_normal.py
# 편집기에 명령을 적지 않습니다. 코드 수정 후 Ctrl+S로 저장합니다.
# 파일 전체는 실행 가능하며, data와 함수 파일은 advanced 폴더에 함께 둡니다.
# 입력 파일 data는 읽고, 생성 결과는 work에 저장합니다.
#
# 무엇을 배우나요?
# 기록을 검사할 때 원본을 덮어쓰거나 문제가 난 행을 조용히 버리면 나중에 이유를 알기 어렵습니다. 사용할 기록과 문제
# 기록을 나누고, 원본 위치와 사유를 함께 남깁니다.
#
# 구성요소와 기호
# set: 이미 본 번호를 저장하는 집합입니다. 같은 값은 한 번만 들어갑니다.
# in과 add: 이미 있는지 확인하고 새 값을 집합에 기록합니다.
# continue: 현재 행의 처리를 끝내고 다음 행으로 넘어갑니다.
# 검사 순서: 번호 누락·중복·값 오류처럼 어느 규칙을 먼저 적용할지 정합니다.
# 오류 기록: 번호, 원본 줄, 사유를 함께 보관하면 수정할 위치를 찾기 쉽습니다.
#
# 이 단원의 첫 예제 실행을 따라가기
# 첫 S01을 확인한 뒤 seen에 넣습니다. 두 번째 S01은 이미 있으므로 중복 사유를 남기고 다음 기록으로 넘어갑니다.
# 빈 번호는 집합에 넣기 전에 누락으로 분리합니다.
#
# 한 부분 바꾸고 확인하기
# 첫 예제의 두 번째 S01을 S06으로 바꾸세요. 사용 기록 수가 늘고 중복 사유가 사라지는지 확인하세요.

def validate_products(rows):
    accepted = []
    issues = []
    seen = set()
    for number, row in enumerate(rows, start=1):
        name = row["name"].strip()
        if name == "":
            issues.append(f"{number}: 이름 누락")
            continue
        if name in seen:
            issues.append(f"{number}: 이름 중복")
            continue
        if row["quantity"] < 0:
            issues.append(f"{number}: 음수 수량")
            continue
        # 정상으로 채택한 이름만 기록한다는 약속입니다.
        seen.add(name)
        accepted.append(row)
    return accepted, issues

rows = [{"name": "볼트", "quantity": 3}, {"name": "볼트", "quantity": 4},
        {"name": "", "quantity": 2}, {"name": "너트", "quantity": -1},
        {"name": "너트", "quantity": 5}]
accepted, issues = validate_products(rows)
print(f"정상: {len(accepted)} / 오류: {len(issues)}")
for issue in issues:
    print(issue)
