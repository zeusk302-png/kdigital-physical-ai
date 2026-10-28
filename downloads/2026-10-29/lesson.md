# 원칙에서 스케치로, 내 키트 웹 대시보드

**1~2교시는 표준과 적용·사례 비교·AI 디자인·개인 스케치, 3교시는 공통 연결, 이후 120분은 개인 제작입니다.** Zoom 개인 수업으로 진행합니다.

[P01 대시보드 열기](kit/uno-dashboard/index.html) · [처음 실행 안내](kit/uno-dashboard/README.md) · [개인 스케치 양식](kit/uno-dashboard/IDEA-SKETCH.md) · [Claude 디자인 전달 MD](kit/uno-dashboard/CLAUDE-DESIGN-HANDOFF.md)

[디자인 A/B 비교실](kit/uno-dashboard/design-studio.html) · [브라우저 개인 작성지](kit/uno-dashboard/workbook.html) · [코드 줄별 설명](kit/uno-dashboard/CODE-WALKTHROUGH.md) · [제작·실행 확인표](kit/uno-dashboard/SELF-CHECK.md)

[대시보드 실제 사례 20선](kit/uno-dashboard/case-gallery.html) · [사례 해설 MD](kit/uno-dashboard/CASEBOOK.md)

[표준 적용 실습실](kit/uno-dashboard/standards-lab.html) · [표준 해설 MD](kit/uno-dashboard/STANDARDS-GUIDE.md) · [표준 적용표](kit/uno-dashboard/STANDARDS-CHECKLIST.md)

## 오늘 만들 것

‘내 책상 환경’ 화면에서 온습도·밝기·가변저항을 확인하고 LED를 켜고 끕니다. 밝기 기준 두 개로 자동 모드도 시험합니다. 같은 P01 연결을 출발점으로 각자 사용자·정보 배치·스타일·핵심 기능을 바꿔 자기 작품으로 완성합니다. 연습 데이터와 실제 USB 입력은 화면에서 구별합니다.

## 수업 흐름

| 교시 | 설명·시연과 직접 수행 | 남길 결과 |
| --- | --- | --- |
| 1 · 10:00~10:50 | 표준과 화면 적용35분, 대표 사례 비교15분 | 기준 적용 메모·대표 사례 관찰 |
| 2 · 11:00~11:50 | 사례 탐색5분, AI 디자인10분, 스케치25분, 피드백10분 | 사용자·입출력·근거·확인 방법을 담은 스케치 |
| 중식 · 11:50~13:00 | 중식 | — |
| 3 · 13:00~13:50 | P01 파일·업로드·USB·센서 표시·LED 응답·중단 확인 | 입력→화면→명령→LED 왕복 |
| 4 · 14:00~14:50 | 개인 제작50분 | 목적에 맞는 화면과 핵심 동작 |
| 5 · 15:00~15:50 | 개인 제작50분 | 기준·자동/수동·오류 처리 |
| 6 · 16:00~16:50 | 개인 제작20분, 자기 점검10분, 일부 공유10분, 제출10분 | README·확인표·코드 ZIP |

50분×6교시 순수 수업300분입니다. 개인 제작은 4·5교시와 6교시 첫20분을 합쳐120분입니다. 16:50~17:00은 정리·질문 시간입니다. 위 시간은 운영 배정이며 실제 학생 수행시간 측정값은 아닙니다.

## 공통 연결이란

`센서 → UNO P01 → USB → 브라우저 표시`, `화면 버튼 → USB 명령 → UNO 적용 응답 → LED 확인`을 함께 수행하는 시간입니다. PC용 Chrome/Edge Web Serial을 사용합니다. API·DB 설치는 필수가 아닙니다. [배선 그림과 핀](https://zeusk302-png.github.io/kdigital-physical-ai/downloads/2026-10-23/studio/kit/integration/index.html?lab=P01)은 앞 전자회로 자료와 같습니다. 모터는 외부전원 없이 구동하지 않습니다. 모든 키트 부품을 한 UNO에 동시에 연결하지 않습니다.

## 준비와 합류

공개 예제는 HTTPS에서, 수정한 로컬 파일은 README의 localhost 서버에서 엽니다. USB 연결이 막히면 ‘연습 데이터 시작’으로 화면을 제작하고 실제 연결 미확인을 기록합니다. AI·Figma 계정·MCP 설치는 필수 조건이 아닙니다. 질문은 Zoom 채팅에 `완료 / 막힌 부분 / 다음 할 일`로 보내고 희망자 일부가 화면 공유합니다.

## 단원

[D03 · 국제표준을 내 대시보드의 판단 기준으로 적용하기](lessons/D03.md) — ISO 네 기준과 WCAG를 나쁜 화면·개선 화면·직접 확인으로 연결합니다.

[D02 · 정보·단위·색·피드백의 원칙](lessons/D02.md) — 현재값과 이력을 구별하고 잘못된 표시를 직접 고칩니다.

[D01 · 좋은 대시보드는 어떤 판단을 돕나](lessons/D01.md) — 20개 사례 중 대표 화면을 비교하고 사용자가 확인하고 행동할 내용을 찾습니다.

[D04 · Claude Design과 Figma MCP로 빠르게 다듬기](lessons/D04.md) — 스케치를 두 가지 화면으로 비교하고 기존 통신 코드를 지키며 디자인을 전달합니다.

[D05 · 내 아이디어를 한 장으로 스케치](lessons/D05.md) — 사용자·상황·입출력·화면·실패 상태를 각자 정합니다.

[D06 · 공통 연결 · 센서에서 웹으로, 웹에서 LED로](lessons/D06.md) — P01 USB 연결 예제를 함께 실행해 읽기와 제어의 왕복을 확인합니다.

[D07 · 값과 명령을 읽고 화면을 고치기](lessons/D07.md) — P01 JSON과 요청번호를 이해하고 의미를 지키며 한 값을 바꿉니다.

[D08 · 개인 제작 120분 · 내 목적의 화면 완성](lessons/D08.md) — 스케치를 구현하고 입력·판단·출력이 연결된 작품을 만듭니다.

[D09 · 자기 점검·고장 상황·복구](lessons/D09.md) — 정상만 보지 않고 센서 실패·USB 중단·응답 미확인을 확인합니다.

[D10 · 개인 제출과 다음 프로젝트로 연결](lessons/D10.md) — 실행 방법·설계 이유·확인 범위를 함께 남깁니다.
