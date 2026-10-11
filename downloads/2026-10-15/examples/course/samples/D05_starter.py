# D05 · 숫자 변환 실패와 미측정 분리
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: strip, 예외 처리, None, 튜플
# 실행: course 폴더에서 python -X utf8 samples/D05_starter.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

def parse_temperature(raw):
    # (값, 문제)를 한 쌍으로 반환합니다. 문제가 없으면 두 번째 값은 None입니다.
    text = raw.strip()
    if text == "":
        return None, None  # 빈칸은 미측정이지 입력 오류가 아닙니다.
    try:
        value = float(text)
    except ValueError:
        # TODO: 변환 실패의 이유를 두 번째 반환값으로 남기세요.
        pass  # 이 줄을 필요한 코드로 바꾸세요.
    return value, None

for raw in ["22.5", "0", "", "오류"]:
    value, issue = parse_temperature(raw)
    if issue is not None:
        print(f"[{raw}]: 입력 오류")
    elif value is None:
        print(f"[{raw}]: 미측정")
    else:
        print(f"[{raw}]: {value}")
# 빈칸과 '오류'를 모두 None 하나로 반환하면 원인을 잃습니다.
# 이 단계에서는 온도의 현실적 범위까지 검사하지 않습니다.
# 직접 작성: '-2.5'와 ' 24 '도 숫자로 읽히는지 확인하세요.
