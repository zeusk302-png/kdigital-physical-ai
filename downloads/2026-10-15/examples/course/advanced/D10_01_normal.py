# D10 · 항목별로 묶어서 합계·평균 구하기
# ====================================================================
# 이 파일은 사람이 읽는 설명과 컴퓨터가 실행할 코드를 함께 담습니다.
# # 뒤는 주석입니다. 코드에 초록색이 표시되는지는 편집기 설정에 따라 다릅니다.
# 저장: course/advanced/D10_01_normal.py
# 실행: course 폴더의 터미널에서 python -X utf8 advanced/D10_01_normal.py
# 편집기에 명령을 적지 않습니다. 코드 수정 후 Ctrl+S로 저장합니다.
# 파일 전체는 실행 가능하며, data와 함수 파일은 advanced 폴더에 함께 둡니다.
# 입력 파일 data는 읽고, 생성 결과는 work에 저장합니다.
#
# 무엇을 배우나요?
# 전체 평균 하나만으로는 어느 구역에 값이 몰려 있는지 알기 어렵습니다. 같은 구역 기록을 묶고 각 묶음의 합계·측정
# 개수·미측정 개수를 따로 계산합니다. 딕셔너리의 키를 구역 이름으로 사용합니다.
#
# 구성요소와 기호
# 그룹 딕셔너리: groups["A"]처럼 구역마다 누적 자료를 저장합니다.
# 초기화: 새 구역을 처음 만났을 때 합계·개수·미측정을 0으로 시작합니다.
# 누적: 정상 측정 한 건은 개수 1과 그 값을 합계에 더합니다.
# 미측정: None은 측정 개수와 합계에서 제외하고 미측정 개수만 늘립니다.
# 평균과 빈 그룹: 측정 개수가 0이면 나누지 않고 평균을 None으로 둡니다.
#
# 이 단원의 첫 예제 실행을 따라가기
# A의 10과 12가 들어오면 합계 22, 개수 2가 되어 평균은 11입니다. B가 None만 가지면 측정 개수는 0이므로
# 평균을 계산하지 않습니다.
#
# 한 부분 바꾸고 확인하기
# 두 번째 예제에 A의 None과 C의 0을 추가하세요. A의 평균은 그대로이고 미측정 수가 늘며 C의 평균은 0.0인지
# 확인하세요.

# D10 · 구역별 합계·개수·평균 집계
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 딕셔너리 누적, 중첩 값, None, 평균
# 실행: course 폴더에서 python -X utf8 advanced/D10_01_normal.py
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
    groups[zone]["count"] += 1
for zone, group in groups.items():
    if group["count"] == 0:
        average = None
    else:
        average = group["sum"] / group["count"]
    print(f"{zone}: 측정 {group['count']}, 미측정 {group['missing']}, 평균 {average}")
# 미측정은 분모에서 제외합니다. 0은 측정 개수에 포함합니다.
# 직접 작성: 구역 C에 None만 한 건 넣고 평균이 None인지 확인하세요.
