# A15 입력과 관찰 조건

python code/mcp_client.py는 서버를 실행해 S01의 22.5,S02의 null,S99의 도구 오류를 받습니다.

비교할 반례: S02의 null은 통신 실패가 아닙니다. S99의 isError:true와 값 없음은 서로 다릅니다.

참고 파일: [mcp_client.py](../code/mcp_client.py), [mcp_server.py](../code/mcp_server.py), [requests.jsonl](../data/requests.jsonl), [readings.json](../data/readings.json)
