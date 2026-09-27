# 2026-10-20 · AI 코드에이전트 실습 묶음

[18활동 안내](activity-guide.md)와 [평가 기준](assessment.md)을 사용합니다. data는 입력, code는 완성 시연, work는 학생의 작업 복사본입니다. 모든 데이터는 가상입니다.

## 실행

이 course 폴더를 터미널의 현재 위치로 선택합니다. ZIP 안에서 바로 편집하지 말고 먼저 압축을 풉니다. Python이 준비된 환경에서 다음 명령을 사용합니다.

```text
python code/check_cases.py code/baseline.py
python code/check_cases.py code/proposal_a.py
python code/check_cases.py code/reviewed.py
python code/check_cases.py work/classifier.py
```

[전체 소스·모든 줄·기대 결과](code/line-guide.md)를 읽습니다. 함수·서버·전체 앱을 빈 파일부터 혼자 작성하는 것이 필수 과제가 아닙니다. HTML 예제는 지정 index.html을 브라우저에서 열고, 저장 뒤 새로고침합니다.

실제 AI 계정·모델·유료 API를 호출하지 않습니다. 제공 응답은 강사가 만든 비교 자료입니다. 합성 분류 규칙이며 실제 센서 안전 판단을 검증하지 않았습니다.

18활동×20분은360분 제작 배정이며 실측 리허설 전입니다. 코드 검증 결과와 실제 수업·장비 검증을 구분합니다.

## 이 묶음의 검증

제작 환경에서 실행 관련 검사 16/16개가 통과했습니다. 전체 소스와 출력은 위 코드 해설에서 대조할 수 있습니다. 이 결과는 해당 예제의 로컬 동작이며 다른 PC 설치, 실제 학생의 360분 수행, 실물 장비·외부 AI 서비스가 검증됐다는 뜻이 아닙니다.
