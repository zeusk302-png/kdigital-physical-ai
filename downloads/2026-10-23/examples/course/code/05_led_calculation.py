supply_v = 3.3
led_v = 2.0
resistance_ohm = 330
if resistance_ohm <= 0 or supply_v < led_v:
    raise ValueError("계산 가정을 확인하세요")
current_ma = (supply_v - led_v) / resistance_ohm * 1000
print("assumed_LED_mA:", round(current_ma, 2))
