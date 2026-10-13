# 계산용 함수 파일입니다. 실행 파일과 같은 폴더에 둡니다.
def delivery_fee(amount):
    # 반환값을 다른 계산에 쓸 수 있도록 화면 출력과 분리합니다.
    return 0 if amount >= 30000 else 3000

def payment(amount):
    return amount + delivery_fee(amount)

# 이 파일을 직접 실행할 때만 아래 시연을 실행합니다.
# 다른 파일에서 import하면 함수 정의만 준비하고 시연은 건너뜁니다.
if __name__ == "__main__":
    print(f"모듈 시연: {payment(25000)}")
