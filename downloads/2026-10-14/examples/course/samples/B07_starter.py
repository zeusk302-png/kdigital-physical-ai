# B07 · 미측정과 0을 구분해 평균 계산
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: for, continue, 누적, 개수, 나눗셈
# 실행: course 폴더에서 python -X utf8 samples/B07_starter.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

readings = [22.5, None, 0, 25.5]
total = 0
valid_count = 0
missing_count = 0
# 처음에는 합계도 개수도 0입니다. 반복마다 현재 값을 기록하세요.
for temperature in readings:
    # TODO: 미측정 값 None만 골라내세요.
    if False:  # 이 줄을 필요한 코드로 바꾸세요.
        missing_count = missing_count + 1
        continue  # 이번 값의 나머지 계산을 건너뜁니다.
    # 0은 미측정이 아니므로 합계와 개수에 포함합니다.
    total = total + temperature
    valid_count = valid_count + 1
# 값이 하나도 없으면 0으로 나눌 수 없습니다.
if valid_count == 0:
    print("평균: 계산할 측정값 없음")
else:
    average = total / valid_count
    print(f"평균: {average:.1f}")  # :.1f는 소수 한 자리로 출력합니다.
print(f"측정: {valid_count} / 미측정: {missing_count}")
# [None, None]과 [0]으로 바꿔 두 상황을 구별해 보세요.
# 주석을 읽고 total과 valid_count의 변화 표를 직접 작성하세요.
