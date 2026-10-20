# XIAO 센서와 라즈봇V2

firmware의 스케치는 Arduino IDE에서 같은 이름의 폴더와 함께 엽니다. pc/collect.py는 실제 USB 측정을 저장하고 pc/robot_pulse.py는 별도 라즈봇 모터 시험입니다. .venv·runtime은 제외합니다.

설치·배선·실행은 웹 교안 R01~R08과 docs/hardware-check.md를 따릅니다. PC 수집은 Serial Monitor를 닫은 뒤 실행합니다.

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pc.collect --port COM5 --device team01-xiao
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
```

COM5는 실제 포트로 바꿉니다. Ctrl+C로 종료합니다. 펌웨어와 PC 수집 형식은 한 세트입니다. 로봇 제조사 코드·모터 채널을 다른 제품에서 가져오지 않습니다.
