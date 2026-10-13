# 함께 사용하는 함수 모음. sample_helpers.py로 같은 폴더에 저장합니다.
# import는 이 파일의 함수 이름을 다른 코드에서 사용할 수 있게 합니다.
# 함수 정의만 있으며 파일을 가져오는 순간 입력이나 파일 저장은 하지 않습니다.
import math

def normalize_active(raw):
    # CSV의 상태 글자를 Python 불리언으로 바꿉니다. bool(raw)를 쓰지 않습니다.
    text = raw.strip().lower()
    if text == "true":
        return True
    if text == "false":
        return False
    raise ValueError("true 또는 false가 필요합니다")

def summarize_values(values):
    total = 0
    count = 0
    missing = 0
    for value in values:
        if value is None:
            missing += 1
            continue
        # True/False, 문자열, 무한대와 NaN은 평균에 넣지 않습니다.
        # math.isfinite는 유한한 숫자인지 검사합니다.
        if type(value) not in (int, float) or not math.isfinite(value):
            raise ValueError("유한한 숫자 또는 None이 필요합니다")
        total += value
        count += 1
    average = None if count == 0 else round(total / count, 2)
    return {"count": count, "missing": missing, "average": average}
