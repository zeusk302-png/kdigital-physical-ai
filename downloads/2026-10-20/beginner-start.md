# 처음 시작하기 · AI 코드에이전트

1. ZIP을 일반 폴더에 풀고 examples/course의 data·work·code 위치를 유지합니다. 배포 ZIP은 course 폴더부터 열 수 있습니다.
2. [교안](lesson.md)에서 개념을 읽고 [실습지](practice-guide.md)의 A01부터 진행합니다.
3. work 파일만 수정하고 원본은 보존합니다. 같은 파일을 저장·다시 열어 확인합니다.
4. 개인 실행을 못 했으면 예상과 강사 실행 결과를 대조하고 확인 방법을 정확히 적습니다.

## 실행 준비

브라우저와 텍스트 편집기가 기본입니다. Python 명령의 현재 폴더는 압축을 푼 course입니다. Windows에서 python 대신 py만 있으면 강사의 확인 아래 py -3로 대체합니다.

```text
python code/check_cases.py code/baseline.py
python code/check_cases.py code/proposal_a.py
python code/check_cases.py code/reviewed.py
python code/check_cases.py work/classifier.py
```

실행하지 못하면 파일 경로·명령·오류 문구를 기록해 도움을 요청합니다. 코드 상자를 보는 것은 Python 실행이 아닙니다.

실제 AI 계정·모델·유료 API를 호출하지 않습니다. 제공 응답은 강사가 만든 비교 자료입니다. 합성 분류 규칙이며 실제 센서 안전 판단을 검증하지 않았습니다.
