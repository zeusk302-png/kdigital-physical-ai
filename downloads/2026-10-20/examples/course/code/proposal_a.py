def classify(value, threshold=27):
    if value is None:
        value = 0
    if value >= threshold:
        return "주의"
    return "정상"
