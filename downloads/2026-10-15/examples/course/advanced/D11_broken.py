# D11 · 코드를 파일로 나누고 다시 사용하기
# ====================================================================
# 이 파일은 사람이 읽는 설명과 컴퓨터가 실행할 코드를 함께 담습니다.
# # 뒤는 주석입니다. 코드에 초록색이 표시되는지는 편집기 설정에 따라 다릅니다.
# 저장: course/advanced/D11_broken.py
# 실행: course 폴더의 터미널에서 python -X utf8 advanced/D11_broken.py
# 편집기에 명령을 적지 않습니다. 코드 수정 후 Ctrl+S로 저장합니다.
# 파일 전체는 실행 가능하며, data와 함수 파일은 advanced 폴더에 함께 둡니다.
# 입력 파일 data는 읽고, 생성 결과는 work에 저장합니다.
#
# 무엇을 배우나요?
# 한 파일에 모든 기능을 넣으면 찾고 수정하기 어려워집니다. 계산용 함수는 별도 파일에 두고 실행 파일이 가져와 사용하게
# 만들 수 있습니다. Python에서는 가져와 쓰는 코드 파일을 모듈이라고 부릅니다.
#
# 구성요소와 기호
# 모듈: 함수를 담은 .py 파일입니다. 이 수업에서는 같은 폴더에 둡니다.
# import: 파일에 있는 기능을 현재 코드에서 사용할 수 있게 합니다.
# from … import …: 특정 함수를 이름으로 가져옵니다. import 줄에는 .py 확장자를 적지 않습니다.
# __name__: 직접 실행할 때는 "__main__", 가져올 때는 모듈 이름이 됩니다.
# 실행 가드: if __name__ == "__main__": 아래 시연은 직접 실행할 때만 동작합니다.
# 이름 충돌: csv.py·json.py처럼 기본 모듈과 같은 이름을 새 파일에 붙이지 않습니다.
#
# 이 단원의 첫 예제 실행을 따라가기
# 실행 파일이 price_helpers에서 함수를 가져옵니다. 모듈의 함수 정의는 준비되지만 실행 가드 안 시연은 실행하지
# 않습니다. 실행 파일이 호출한 결과만 표시됩니다.
#
# 한 부분 바꾸고 확인하기
# price_helpers.py를 직접 실행한 결과와 두 번째 예제를 실행한 결과를 비교하세요. 가져올 때 모듈의 시연
# 문구가 나오지 않는 이유를 설명하세요.

# D11 · 다른 파일의 함수를 가져와 사용
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 모듈, import, 함수 재사용, 입력 계약
# 실행: course 폴더에서 python -X utf8 advanced/D11_broken.py
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
