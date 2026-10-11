# D04 · 두 목록을 짝지을 때 누락 찾기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: len, zip, enumerate, 길이 검수
# 실행: course 폴더에서 python -X utf8 samples/D04_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

def show_pairs(ids, values):
    # zip은 더 짧은 목록이 끝나면 멈춥니다. 먼저 개수를 비교합니다.
    if len(ids) < len(values):
        print("번호와 측정값의 개수가 다릅니다.")
        return
    # enumerate는 순번도 줍니다. start=1은 사람이 읽는 번호입니다.
    for number, pair in enumerate(zip(ids, values), start=1):
        sensor_id, temperature = pair  # 한 쌍을 두 이름으로 나눠 받습니다.
        print(f"{number}. {sensor_id}: {temperature}")

show_pairs(["S01", "S02"], [0, 22.5])
show_pairs(["S01", "S02", "S03"], [0, 22.5])
# 둘째 호출에서 S03이 조용히 사라지는 것을 길이 검사로 막습니다.
# 순번 number는 데이터의 고유 식별자 sensor_id를 대신하지 않습니다.
# 직접 작성: 빈 목록 두 개와 길이 하나만 다른 목록을 시험하세요.
