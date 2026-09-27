def checked_temperature(raw):
    value = float(raw)
    if value < 0 or value > 50:
        raise ValueError("범위 확인 필요")
    return value
print(checked_temperature("23.5"))
