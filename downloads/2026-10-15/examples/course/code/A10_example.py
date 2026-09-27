def parse_temperature(raw):
    if raw == "":
        return None
    return float(raw)
print(parse_temperature("22.5"))
print(parse_temperature(""))
print(parse_temperature("0.0"))
