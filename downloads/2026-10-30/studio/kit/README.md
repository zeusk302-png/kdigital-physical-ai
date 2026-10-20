# 자기 프로젝트 기획 키트

문제·범위·요구·화면·데이터·구조·검증·작업을 연결하는 양식입니다.
docs의 [작성]을 본인 내용으로 바꿉니다. 실제 결과는 실행한 뒤 적고,
사용자·가격·성능을 AI가 만들어 채우게 하지 않습니다.

## 순서
problem → research → requirements/user-flow/data-design → architecture/validation
→ roadmap/risks → decisions. wireframes에 주요 화면을 넣고 prototype에 기술 검증을 둡니다.

## 자동 문서 점검
이 kit 폴더에서 `py tools/plan_check.py .`를 실행합니다.
초기 양식은 일부러 미작성 상태이므로 보완 항목이 나옵니다.
형식 점검이 통과해도 근거의 진실성·기술 가능성을 검증한 것은 아닙니다.

## 실제 요청 응답시간 측정 예
프로젝트에 HTTP가 있을 때만 사용합니다. 로컬 서버가 준비된 상태에서
`py prototype/latency_probe.py http://127.0.0.1:8895/api/events --count 10`을 실행합니다.
결과에는 실제 측정값과 실패를 기록하며 성능 목표·통과 여부는 본인이 정합니다.

## 시험
`py -m unittest discover -s tests -v`

## Git
기획·출처·설계·시제품 소스·검증 방법·결정을 올립니다.
비공개 인터뷰·인증키·개인정보·의존성·임시 출력은 제외합니다.
