# B08 · 날짜별 누적 생산량 표 만들기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: range, len, 위치, 누적, f 문자열
# 실행: course 폴더에서 python -X utf8 samples/B08_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

daily_counts = [3, 5, 2, 4]
cumulative = 0
# range(4)는 0, 1, 2, 3을 줍니다. 끝값 4 자체는 포함하지 않습니다.
for index in range(len(daily_counts)):
    count = daily_counts[index]
    cumulative = count
    # 사람에게 보여 주는 일차는 1부터, 리스트 위치는 0부터입니다.
    day = index + 1
    print(f"{day}일차: 당일 {count}, 누적 {cumulative}")
target = 15
remaining = target - cumulative
if remaining < 0:
    remaining = 0  # 목표를 넘었으면 남은 양은 0입니다.
print(f"목표까지: {remaining}")
# 마지막 값 4를 6으로 바꾸면 누적 16, 목표까지 0입니다.
# len은 값의 개수를 구하고 []는 그 위치의 값을 읽습니다.
# daily_counts[4]는 값이 4개인 이 목록의 범위를 벗어납니다.
