def temperature_status(value):
    if value is None:
        return "미측정"
    if value > 24.0:
        return "확인"
    return "정상"
print(temperature_status(22.5))
print(temperature_status(None))
print(temperature_status(25.0))
