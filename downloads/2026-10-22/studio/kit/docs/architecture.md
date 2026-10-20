# 파일과 입력·출력 계약
detector.load_model(weights) → YOLO 객체, detector.detect(model,frame,conf,imgsz,classes) → 사진 Results.
tracker.track_frame(...) → Results, Observation 목록. 매 프레임 동일 model을 사용하며 persist=True/bytetrack.yaml을 명시한다.
zones.bottom_center(xyxy) → 아래 가운데 대표점, inside(point,zone) → 경계 포함 여부, side(point,line_x,margin) → -1/0/1.
events.EventEngine.update(frame_index,observations) → 사건 목록, 경고 문자열 목록. 사건 판정 좌표는 0~1이다. 중복ID는 프레임 안에서 건너뛰고 경고한다. max_gap보다 오래 소실된 ID는 지운다. 짧은 소실은 이전 상태를 유지한다. 최초 안쪽 관찰과 관찰된 진입을 구분한다.
main은 프레임 읽기→추적→좌표 정규화→사건→그리기→저장 순서를 연결하고 finally에서 자원을 해제한다. 검출·추적 ID는 사람 영구 식별이 아니며 경보는 화면 대표점의 규칙 결과이다.

events.jsonl 한 줄 예:
```json
{"frame_index":10,"observed_at":"2026-10-22T01:00:00+00:00","video_seconds":0.4,"events":[{"type":"entered","track_id":2}],"warnings":[],"track_ids":[2]}
```
observed_at은 처리 시각, video_seconds는 영상 내부 시각이다. 웹캠은 video_seconds=null. 사건 type은 entered/first_seen_inside/crossed이며 crossed는 direction을 추가한다. events=[]는 새 사건이 없다는 뜻이다. warnings는 duplicate_id:2, lost_id:2 같은 경고다.
대시보드 연결 시 이벤트 배열만 추출하고 실행세션ID:프레임:배열순번으로 고유한 event_id를 만든다. track_id를 실제 고유 인원 수로 집계하지 않는다. 송신 어댑터는 다음 수업 범위다.
