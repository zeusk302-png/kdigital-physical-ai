def classify(value, threshold=28):
    if value is None:
        return "미측정"
    if type(value) not in (int, float):
        return "입력 오류"
    if not 0 <= value <= 50:
        return "입력 오류"
    if value >= threshold:
        return "주의"
    return "정상"
