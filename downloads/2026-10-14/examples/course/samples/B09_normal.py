# B09 · 남은 주문을 묶음 단위로 처리
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: while, 종료 조건, min, 누적
# 실행: course 폴더에서 python -X utf8 samples/B09_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 더 해보기: for 반복을 읽은 뒤 while의 종료 조건을 확인합니다.
remaining = 7
batch_size = 3
round_number = 0
processed_total = 0
while remaining > 0:
    # min은 두 수 중 작은 수를 선택합니다. 남은 1개를 3개로 세지 않습니다.
    current = min(batch_size, remaining)
    round_number = round_number + 1
    processed_total = processed_total + current
    remaining = remaining - current
    print(f"{round_number}회: 처리 {current}, 남음 {remaining}")
print(f"총 처리: {processed_total}")
# 7 → 4 → 1 → 0으로 줄어드는 값이 while을 끝나게 합니다.
# batch_size는 양수여야 합니다. 0으로 바꾸면 남은 수량이 줄지 않습니다.
# 무한 반복이 생기면 터미널에서 Ctrl+C로 멈추고 감소 줄을 점검하세요.
# 수량을 8로 바꾸면 3개, 3개, 2개를 처리합니다.
