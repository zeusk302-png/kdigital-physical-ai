values = [27.8, 28.1, 27.9, 28.2, 27.4, None, 28.3]
alert = False
for value in values:
    if value is None:
        print("missing", "no command")
        continue
    if value >= 28.0:
        alert = True
    elif value <= 27.5:
        alert = False
    print(value, alert)
