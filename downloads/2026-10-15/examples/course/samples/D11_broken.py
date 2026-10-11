# D11 · 다른 파일의 함수를 가져와 사용
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 모듈, import, 함수 재사용, 입력 계약
# 실행: course 폴더에서 python -X utf8 samples/D11_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# sample_helpers.py를 이 파일과 같은 samples 폴더에 둡니다.
# 설치가 필요한 외부 패키지가 아니라 같이 제공된 Python 파일입니다.
from sample_helpers import normalize_active, summarize_values
values = [22.5, 0, None, 30]
summary = summarize_values([])
print(f"측정: {summary['count']}")
print(f"미측정: {summary['missing']}")
print(f"평균: {summary['average']}")
# 함수가 받아들이는 값의 범위도 확인합니다. 대소문자와 공백을 정리합니다.
print(f"상태: {normalize_active(' FALSE ')}")
try:
    normalize_active("unknown")
except ValueError as error:
    print(f"잘못된 상태: {error}")
# 파일명을 json.py나 csv.py로 붙이면 기본 모듈과 이름이 겹칠 수 있습니다.
# ModuleNotFoundError가 나면 sample_helpers.py의 위치와 철자를 확인하세요.
# 직접 작성: values를 []로 바꿔 평균이 None인지 확인하세요.
