# D08 · JSON 구조·자료형·저장과 읽기
# ====================================================================
# 이 파일은 사람이 읽는 설명과 컴퓨터가 실행할 코드를 함께 담습니다.
# # 뒤는 주석입니다. 코드에 초록색이 표시되는지는 편집기 설정에 따라 다릅니다.
# 저장: course/advanced/D08_broken.py
# 실행: course 폴더의 터미널에서 python -X utf8 advanced/D08_broken.py
# 편집기에 명령을 적지 않습니다. 코드 수정 후 Ctrl+S로 저장합니다.
# 파일 전체는 실행 가능하며, data와 함수 파일은 advanced 폴더에 함께 둡니다.
# 입력 파일 data는 읽고, 생성 결과는 work에 저장합니다.
#
# 무엇을 배우나요?
# JSON은 이름표와 값, 목록을 중첩해 표현할 수 있는 파일 형식입니다. Python 딕셔너리와 비슷해 보여도 파일 속
# 문법은 다릅니다. 읽은 뒤 숫자·문자열·참거짓을 검사하고, 결과를 파일로 저장해 다시 확인합니다.
#
# 구성요소와 기호
# object와 array: JSON의 객체는 Python dict, 배열은 list로 읽습니다.
# true·false·null: JSON에서는 소문자, Python에서는 True·False·None으로 나타납니다.
# load와 loads: load는 열린 파일에서, loads는 문자열에서 JSON을 읽습니다.
# dump와 dumps: dump는 열린 파일에, dumps는 JSON 문자열로 결과를 만듭니다.
# ensure_ascii와 indent: 한글을 읽기 쉽게 유지하고 들여쓰기를 넣습니다.
# bool과 int 검사: Python의 bool은 int의 하위 종류이므로 isinstance(True, int)는
# True입니다. 수량 정수만 허용하려면 type(value) is int로 확인할 수 있습니다.
#
# 이 단원의 첫 예제 실행을 따라가기
# JSON 문자열의 true는 Python True로, null은 None으로 읽습니다. "3"은 문자열로 남습니다. 수량
# 3과 True를 같은 정수로 인정하지 않도록 정확한 타입과 범위를 확인합니다.
#
# 한 부분 바꾸고 확인하기
# 두 번째 예제에서 수량 3을 "3"과 true로 각각 바꾸세요. 검사 결과가 어떻게 달라지는지 확인하고 숫자 3으로
# 복구하세요.

# D08 · JSON을 읽고 값의 종류 검사
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: json.load, bool, 숫자, None, type
# 실행: course 폴더에서 python -X utf8 advanced/D08_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

import json
from pathlib import Path
base = Path(__file__).resolve().parent
with (base / "data" / "devices.json").open(encoding="utf-8") as file:
    devices = json.load(file)  # JSON null은 None, true/false는 True/False가 됩니다.
for record in devices:
    # 'false'라는 문자열은 비어 있지 않아 bool('false')가 True입니다.
    active = bool(record["active"])
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
