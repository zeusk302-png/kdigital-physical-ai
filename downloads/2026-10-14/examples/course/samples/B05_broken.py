# B05 · 온도 경계와 조건의 순서
# 파일 전체를 복사해 UTF-8로 저장합니다. # 뒤의 글은 실행하지 않는 주석입니다.
# 배울 내용: if, elif, else, 비교, and, 불리언
# 실행: course 폴더에서 python -X utf8 samples/B05_broken.py
# print(...)의 괄호는 출력할 값을 묶고, 문자열 양끝 따옴표는 글자의 범위를 나타냅니다.
# 먼저 입력값을 보고 결과를 예상한 다음, 실제 출력과 비교하세요.

# 교육용 규칙입니다. 실제 설비의 안전 기준으로 사용하지 않습니다.
temperatures = [0, 25, 28, 30]
for temperature in temperatures:
    # 큰 기준을 먼저 검사해야 30도도 '주의'로 끝나는 일을 피합니다.
    if temperature > 28:
        status = "경고"
    elif temperature >= 25:
        status = "주의"
    else:
        status = "정상"
    print(f"{temperature}도: {status}")
# and는 두 조건이 모두 True일 때만 True입니다.
active = False
temperature = 30
alert = active and temperature >= 28
print(f"비활성 장치 알림: {alert}")
# 경계값 24.9, 25, 27.9, 28을 넣어 네 결과를 예상해 보세요.
# >=는 경계값 자체를 포함하고 >는 포함하지 않습니다.
# 들여쓰기는 if나 for에 속하는 코드 범위를 표시합니다.
