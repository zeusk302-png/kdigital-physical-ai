# 데이터 계약

| 필드 | 의미·타입 | 규칙 |
|---|---|---|
| loan_id | 대여 한 건의 문자열키 | 비어 있지 않고 파일 내 유일 |
| item_id | 물품 문자열식별자 | 비어있지않음,다른 대여에 반복 가능 |
| status | 상태문자열 | checked_out/returned/unknown |
| updated_at | 갱신 시각 문자열 | YYYY-MM-DD HH:MM,누락시review |
| review_note | 확인 메모 문자열 | 원문 메모,빈칸가능 |

표현은 UTF-8 CSV입니다. CSV 파싱 후 모든 값은 문자열로 시작합니다. updated_at이 없는 경우 원문을 보존하고 검수 표시에 review를 더하며 status를 임의로 returned로 바꾸지 않습니다. 중복 loan_id는 파일 읽기를 reject합니다. 이것은 교육용 계약이며 실제 업무 규칙은 당사자 확인이 필요합니다.
