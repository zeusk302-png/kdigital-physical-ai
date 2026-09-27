raw = "뜨거움"
try:
    value = float(raw)
    print(value)
except ValueError:
    print("숫자 확인 필요:", raw)
