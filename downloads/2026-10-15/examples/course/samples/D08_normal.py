# D08 · JSON을 읽고 값의 종류 검사
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: json.load, bool, 숫자, None, type
# 실행: course 폴더에서 python -X utf8 samples/D08_normal.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import json
from pathlib import Path
base = Path(__file__).resolve().parent
with (base / "data" / "devices.json").open(encoding="utf-8") as file:
    devices = json.load(file)  # JSON null은 None, true/false는 True/False가 됩니다.
for record in devices:
    # 'false'라는 문자열은 비어 있지 않아 bool('false')가 True입니다.
    active = record["active"]
    if type(active) is not bool:
        print(f"{record['id']}: active 종류 오류")
        continue
    temperature = record["temperature_c"]
    # bool도 int의 일종이므로 bool 온도는 별도로 제외합니다.
    if temperature is not None and type(temperature) not in (int, float):
        print(f"{record['id']}: 온도 종류 오류")
        continue
    print(f"{record['id']}: 사용 {active}, 온도 {temperature}")
# 키를 찾는 []와 숫자 위치를 찾는 []는 받는 자료의 종류가 다릅니다.
# 직접 작성: 필수 키가 없는 기록에 '키 누락' 메시지를 추가하세요.
# JSON 문법이 맞아도 업무 약속의 자료형까지 맞는 것은 아닙니다.
