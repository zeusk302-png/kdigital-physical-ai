def classify(value, threshold=28):
    if value is None:
        return "정상"
    if value > threshold:
        return "주의"
    return "정상"
