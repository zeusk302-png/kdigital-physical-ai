# A14 입력과 관찰 조건

S02는 null이라 미측정,S04는 0과 false라 정지입니다. 서버를 끈 뒤 API 읽기는 수신 실패 문구를 보여 줍니다.

비교할 반례: 수신 실패 때 이전 값을 유지하더라도 새로 받았다고 표시하면 안 됩니다.

참고 파일: [readings.json](../data/readings.json), [app.js](../code/app.js), [server.py](../code/server.py)
