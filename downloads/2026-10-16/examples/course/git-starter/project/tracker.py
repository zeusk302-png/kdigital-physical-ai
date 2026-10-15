"""할 일 목록의 처리 규칙. 화면과 나누면 입력 오류를 확인하기 쉽습니다."""
def add_task(tasks, text):
    # strip()은 문장 앞뒤의 공백을 없앱니다.
    cleaned = text.strip()
    if not cleaned:
        # 빈 문자열을 목록에 넣지 않고 호출한 화면에 이유를 알려 줍니다.
        raise ValueError("할 일을 입력하세요.")
    tasks.append(cleaned)
    return cleaned

def remove_task(tasks, index):
    # 잘못된 위치를 지우면 다른 항목이 사라질 수 있으므로 범위를 확인합니다.
    if index < 0 or index >= len(tasks):
        raise ValueError("완료할 항목을 선택하세요.")
    return tasks.pop(index)
