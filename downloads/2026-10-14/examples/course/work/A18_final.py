records = [
    {"sensor_id": "S01", "temperature_c": 22.5},
    {"sensor_id": "S02", "temperature_c": 25.0},
    {"sensor_id": "S03", "temperature_c": None},
]
limit = 24.0
for record in records:
    temperature_c = record["temperature_c"]
    if temperature_c is None:
        status = "미측정"
    elif temperature_c > limit:
        status = "확인"
    else:
        status = "정상"
    print(record["sensor_id"], status)
