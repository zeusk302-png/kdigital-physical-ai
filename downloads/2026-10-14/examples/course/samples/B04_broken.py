# B04 · 센서 이름과 메모 정리
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: strip, upper, replace, len, 슬라이싱, in
# 실행: course 폴더에서 python -X utf8 samples/B04_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 원본은 따로 남겨 두고 정리한 값을 새 이름에 저장합니다.
raw_id = "  s01  "
raw_note = " 입구 / 점검 필요 "
# 점(.)은 이 값이 제공하는 기능을 골라 쓰는 표시입니다.
# strip은 양끝 공백만 지웁니다. 값 사이 공백까지 모두 지우지 않습니다.
sensor_id = raw_id.upper()
note = raw_note.strip().replace(" / ", " · ")
# [시작:끝]은 시작부터 끝 직전까지 고릅니다. 위치는 0부터 셉니다.
prefix = sensor_id[0:1]
digits = sensor_id[1:3]
needs_check = "점검" in note
print(f"원본: [{raw_id}]")
print(f"정리: {sensor_id}")
print(f"글자 수: {len(sensor_id)}")
print(f"구분: {prefix} / 번호: {digits}")
print(f"메모: {note}")
print(f"점검 표시: {needs_check}")
# raw_id를 ' s12 '로 바꾸면 S12와 번호 12가 보여야 합니다.
# strip()의 괄호를 빼면 정리된 값 대신 기능 자체를 가리키게 됩니다.
