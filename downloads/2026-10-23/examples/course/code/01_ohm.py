voltage_v = 3.3
resistance_ohm = 330
if resistance_ohm <= 0:
    raise ValueError("저항은 양수여야 합니다")
current_a = voltage_v / resistance_ohm
current_ma = current_a * 1000
print("current_mA:", round(current_ma, 2))
