hours = 12
rate_won = 30000
reserve_rate = 0.20
base_won = hours * rate_won
reserve_won = base_won * reserve_rate
total_won = base_won + reserve_won
print("assumed_total_won:", round(total_won))
