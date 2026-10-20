# 공식 자료와 확인 범위

조회일 2026-10-20. 아래 코드는 내용만 조회했고 실행하지 않았습니다. 고정 커밋 원문으로 API를 대조했습니다.

- [Adeept_RaspTank/server/move.py](https://raw.githubusercontent.com/adeept/Adeept_RaspTank/cd9886dfaddba06825e73bdfadc8264458ae19dc/server/move.py) / commit cd9886dfaddba06825e73bdfadc8264458ae19dc / SHA256 c0dce9cecd29b7dfeae1d059e686fe9d1ec231b6217093c8b3504817f7def9a8
- [Adeept_RaspTank/server/servo.py](https://raw.githubusercontent.com/adeept/Adeept_RaspTank/cd9886dfaddba06825e73bdfadc8264458ae19dc/server/servo.py) / commit cd9886dfaddba06825e73bdfadc8264458ae19dc / SHA256 b2949b596e28f76c77c88e8a6eb48a7f963668164357d4493480ca4f320cbbce
- [adeept_rasptank2/web/move.py](https://raw.githubusercontent.com/adeept/adeept_rasptank2/5eaaa13f6484939ad091848604dba8432b899957/web/move.py) / commit 5eaaa13f6484939ad091848604dba8432b899957 / SHA256 a4d31d498ac8a5cf5fa4c187b5a494170b0cbfcf477a71da8080b2c50883e050
- [adeept_rasptank2/examples/03_Servo.py](https://raw.githubusercontent.com/adeept/adeept_rasptank2/5eaaa13f6484939ad091848604dba8432b899957/examples/03_Servo.py) / commit 5eaaa13f6484939ad091848604dba8432b899957 / SHA256 534de173a5eeff153e8fb4178a4886aab086fef6adbddcf274d2b3569a211b41

- [제조사 리비전 안내](https://github.com/adeept/Adeept_RaspTank): 초록 전용, 보라색은 rasptank2 안내.
- [제조사 새 자료](https://www.adeept.com/learn/detail-83.html): 조립·설치 자료 선택 출발점.
- [Raspberry Pi 공식 준비](https://www.raspberrypi.com/documentation/computers/getting-started.html): 부팅 저장 장치·OS·전원·접속 준비.
- [사용자 지정 판매 제품](https://www.devicemart.co.kr/goods/view?no=15329707): ADR013 지정 근거. 이번 웹 조회는 시간 초과로 세부 구성 재검증 불가.

확인한 API: 두 주행 모듈의 setup(), move(speed,direction,turn,radius=0.6), motorStop(), destroy(). 초록 방향은 문자열, 보라 방향은 숫자이며 직진 turn은 mid로 번역합니다. 실물 방향·거리·출력·정지 성능은 아래 절차에 따라 장치에서 확인합니다. 서보는 파일 경로와 초기화/시연 구조만 검토하고 미보정 자동 연결은 제공하지 않습니다.
