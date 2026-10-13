# Python 심화 · 개념별 교안

함수를 다시 정리한 뒤 여러 기록·파일·CSV·JSON을 처리하는 프로그램을 만듭니다. 한 개념씩 설명 → 실행 → 값 변경 → 직접 작성 → 오류 복구 순서로 연습하세요.

## 실행 준비

실습 ZIP을 모두 추출하고 `course/advanced` 폴더를 확인하세요. `data`와 두 함수 파일도 함께 있어야 합니다. `.py`는 Python 코드, `.csv`는 표 데이터, `.json`은 구조를 가진 데이터, `.md`는 설명 문서입니다.

편집기에서 Python 파일을 열고 Ctrl+S로 저장합니다. `course` 폴더의 주소 표시줄에 powershell을 입력해 터미널을 열고 다음 명령을 입력하세요.

```text
python --version
python -X utf8 advanced/D01_01_normal.py
```

python 명령을 찾지 못하면 Windows에서 py 명령을 확인하세요. 파일을 찾지 못하면 저장 위치·이름·.py.txt 여부를 먼저 확인합니다. 멈추지 않는 프로그램은 터미널에서 Ctrl+C로 중지합니다. 웹의 코드 상자는 실행기가 아니며 복사한 코드는 자신의 편집기에서 실행합니다. 추가 라이브러리 설치나 로그인은 필요하지 않습니다.

## 개념 순서

- [D01 · 함수로 일을 나누고 결과 돌려받기](#/sessions/2026-10-15/lesson?concept=D01)
- [D02 · 함수 입력·기본값·변수의 범위](#/sessions/2026-10-15/lesson?concept=D02)
- [D03 · 여러 기록을 담는 구조와 원본 복사](#/sessions/2026-10-15/lesson?concept=D03)
- [D04 · 순서·번호·두 목록을 함께 처리하기](#/sessions/2026-10-15/lesson?concept=D04)
- [D05 · 입력 오류와 미측정 값을 구분하기](#/sessions/2026-10-15/lesson?concept=D05)
- [D06 · 파일 위치·텍스트 읽기·CSV 읽기](#/sessions/2026-10-15/lesson?concept=D06)
- [D07 · CSV 저장과 다시 읽어서 확인하기](#/sessions/2026-10-15/lesson?concept=D07)
- [D08 · JSON 구조·자료형·저장과 읽기](#/sessions/2026-10-15/lesson?concept=D08)
- [D09 · 중복·누락·잘못된 기록 따로 모으기](#/sessions/2026-10-15/lesson?concept=D09)
- [D10 · 항목별로 묶어서 합계·평균 구하기](#/sessions/2026-10-15/lesson?concept=D10)
- [D11 · 코드를 파일로 나누고 다시 사용하기](#/sessions/2026-10-15/lesson?concept=D11)
- [D12 · CSV 검사에서 JSON 보고서까지 연결하기](#/sessions/2026-10-15/lesson?concept=D12)

## 먼저 배울 개념과 더 읽을 개념

먼저 D01 → D02 → D05 → D06 → D07 → D08 → D09 → D11 → D12 순서로 함수·입력 검사·파일·종합 프로그램을 연결하세요. D03의 깊은 복사, D04의 짝짓기, D10의 구역별 집계는 관련 작업을 할 때 더 읽는 선택 개념입니다. D12의 전체 코드를 한 번에 외우지 말고 읽기·검사·집계·저장 함수를 하나씩 완성하세요.

[직접 작성 연습 12개](#/sessions/2026-10-15/practice-problems) · [기초부터 다시 보기](#/sessions/2026-10-14/lesson) · [제출 과제 3개](#/sessions/2026-10-14/assignments) · [실습 ZIP](student-examples.zip)

## 공식 문서

- [CSV 읽기와 쓰기](https://docs.python.org/3/library/csv.html)
- [JSON 변환](https://docs.python.org/3/library/json.html)
- [얕은 복사와 깊은 복사](https://docs.python.org/3/library/copy.html)
- [파일 경로](https://docs.python.org/3/library/pathlib.html)
