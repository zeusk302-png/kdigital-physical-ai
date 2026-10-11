# D01 · 반복되는 온도 판단을 함수로 묶기
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: def, 매개변수, return, 조기 반환
# 실행: course 폴더에서 python -X utf8 samples/D01_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 함수는 입력을 받아 결과를 돌려주는 이름 붙은 코드 묶음입니다.
def classify_temperature(temperature):
    # None은 비교 전에 처리합니다. None >= 28은 할 수 없습니다.
    if temperature is None:
        print("미측정")  # 여기서 함수 실행이 끝납니다.
    if temperature >= 28:
        return "경고"
    if temperature >= 25:
        return "주의"
    return "정상"

# 함수를 정의하는 것만으로 결과는 출력되지 않습니다. 아래에서 호출합니다.
for value in [None, 0, 25, 28]:
    result = classify_temperature(value)
    print(f"{value}: {result}")
# print는 화면에 보여 주고 return은 호출한 코드에 값을 줍니다.
# 두 일을 섞지 않아야 다른 함수에서도 결과를 이용할 수 있습니다.
# 경고 임계값을 29로 바꾸면 28의 결과는 주의가 됩니다.
