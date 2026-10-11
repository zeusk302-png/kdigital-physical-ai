# B10 · 목록을 고치기 전에 원본 복사
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 리스트, copy, append, 위치 대입
# 실행: course 폴더에서 python -X utf8 samples/B10_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

original = [2, 4, 6]
# 이름만 바꾸는 것과 별도 목록을 만드는 것은 다릅니다.
working = original.copy()
# 첫 항목은 [0]입니다. 첫 값만 3으로 바꿉니다.
working[0] = 3
# append는 목록의 끝에 새 값을 하나 붙입니다.
working.append(8)
print(f"원본: {original}")
print(f"작업: {working}")
print(f"원본 개수: {len(original)}")
print(f"작업 개수: {len(working)}")
# working = original로 쓰면 두 이름이 같은 목록을 가리킵니다.
# 이 예제는 숫자만 있는 한 층짜리 목록입니다.
# 딕셔너리가 들어 있는 중첩 목록은 copy만으로 내부 값까지 분리되지 않습니다.
# 내부 복사는 심화의 D03에서 따로 비교합니다.
