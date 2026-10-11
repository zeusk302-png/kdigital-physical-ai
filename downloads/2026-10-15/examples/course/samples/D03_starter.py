# D03 · 중첩 자료를 고칠 때 원본 보존
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: 얕은 복사, 깊은 복사, deepcopy
# 실행: course 폴더에서 python -X utf8 samples/D03_starter.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# copy는 Python에 기본으로 들어 있는 모듈입니다. 별도 설치하지 않습니다.
from copy import deepcopy
original = [{"id": "S01", "tags": ["입구"]}]
# 원본 안에 딕셔너리와 목록이 들어 있어 내부까지 복사해야 합니다.
# TODO: 내부 자료까지 별도로 복사하세요.
pass  # 이 줄을 필요한 코드로 바꾸세요.
working[0]["tags"].append("점검")
working[0]["id"] = "S99"
print(f"원본 번호: {original[0]['id']}")
print(f"원본 태그: {original[0]['tags']}")
print(f"작업 번호: {working[0]['id']}")
print(f"작업 태그: {working[0]['tags']}")
# original.copy()는 가장 바깥 목록만 새로 만듭니다.
# 내부 딕셔너리는 공유하므로 원본 번호와 태그가 함께 바뀔 수 있습니다.
# 실제 파일을 지우지 않고 메모리 안의 원본과 작업 사본을 비교합니다.
# 직접 작성: 태그를 두 개 추가하고 원본 태그 길이가 1인지 확인하세요.
