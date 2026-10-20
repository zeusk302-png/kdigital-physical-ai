# API 계약

POST /api/events는 event_id, device_id, kind, value, occurred_at, level을 받습니다.
event_id는 같은 사건 재전송에도 같은 값입니다. 새 사건은 새 ID를 만듭니다.
value는 유한한 숫자 또는 null, occurred_at는 시간대가 있는 ISO8601입니다.
level은 info 또는 warning입니다. JSON은 통신 형식이며 손으로 몇 건을 채우는 과제가 아닙니다.
새 사건은201, 같은 내용 재전송은 created:false, 같은 ID의 내용 충돌은409,
잘못된 자료는422입니다. 같은 ID에 바뀐 수치를 계속 보내지 않습니다.

GET /api/events?minutes=60&device=로봇ID 로 범위를 조회합니다.
query의 device를 생략하면 전체입니다. 최근5000건 한도를 넘으면 truncated가 참입니다.
최신값은 received_at(수신 시각)이 아니라 occurred_at(발생 시각)으로 선택합니다.
브라우저는 같은 장치·종류의 값만 평균과 한 줄 차트로 보여 줍니다.

## 실제 발생 사건을 보내는 코드 위치

YOLO에서는 구역 진입을 판정한 순간, 로봇에서는 명령·상태를 확인한 순간에
전송 함수를 호출합니다. 같은 프레임·같은 사건의 재시도는 ID를 유지하세요.
측정하지 않은 값을0으로 만들지 않습니다. 검출 신뢰도와 온도를 같은 지표로 합치지 않습니다.
