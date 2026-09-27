# 인수 시험 계획

| ID | 요구 | 입력 | 절차 | 기대값 |
|---|---|---|---|---|
| T01 | R01 | loans_sample.csv | 읽은 후 표시 행 수 확인 | 3 |
| T02 | R02 | loans_missing.csv | 해당 기록 검수 상태 확인 | review |
| T03 | R03 | loans_duplicate.csv | 중복 키처리확인 | reject |
| T04 | R04 | sample원문복사 | 실행 전후 바이트 비교 | true |

실제 구현 후에 관찰값·실행 환경·시간·증거경로를 채웁니다. 현재 입력과 기대는 기획 산출물이고 실제 제품 시험은 미실행입니다. test_observations*.json은 비교 개념을 익히는 별도 가상 관찰 기록입니다.
