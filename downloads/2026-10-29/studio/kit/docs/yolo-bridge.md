# 10/22 실제 YOLO 로그 연결

10/22 프로젝트가 실제 실행해 만든 runtime/results/실행이름/events.jsonl을 사용합니다.
손으로 사건을 만들어 채우지 않습니다. YOLO 프로그램은 별도 터미널에서 실행합니다.

```powershell
py adapters/yolo_to_api.py 실제경로/events.jsonl --session my-run-01 --follow
```

장치 필터에 yolo-camera, 종류에는 entered 또는 crossed를 골라 봅니다.
frame_index는 프레임 번호, track_id는 추적 ID이므로 수량 평균으로 사용하지 않습니다.
이 어댑터는 events 배열 안의 사건만 전달하고 수치 value는 null로 둡니다.
first_seen_inside는 처음 보인 순간 이미 구역 안이었다는 뜻이며 진입을 직접 관찰했다는
뜻으로 바꾸지 않습니다. 같은 session의 같은 사건은 재전송해도 한 건으로 남습니다.

occurred_at는 로그의 observed_at를 보존합니다. 과거 로그를 다시 읽었다면 현재1시간
범위에 안 보일 수 있으니 조회 범위와 실제 시각을 확인합니다. 수신 시각을 덮어써서
새 사건으로 꾸미지 않습니다. 이 수업은 영상 안의 실제 인원 수를 증명하는 시스템이 아닙니다.
