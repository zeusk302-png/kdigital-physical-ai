# 화면 설계 완성 시연 예

```text
[입력 파일: loans_sample.csv] [검수: 정상]
대여ID | 물품ID | 상태        | 갱신시각
L001   | I01    | returned    | 2026-10-30 10:00
L002   | I02    | checked_out | 2026-10-30 10:05
L003   | I03    | unknown     | 2026-10-30 10:10

[입력 파일: loans_missing.csv] [검수: 확인 필요]
L004 | I04 | unknown | (시각 없음)
이유: updated_at 누락. 원문 보존, 담당자 확인 대기.

[입력 파일: loans_duplicate.csv] [읽기 거부]
이유: loan_id L005 중복. 정상목록을 만들지 않음.
```

이 문서는 화면 설계 예이며 동작하는 대시보드 실행 결과가 아닙니다. 기본안은 상태를 자동 정정하지 않습니다.
