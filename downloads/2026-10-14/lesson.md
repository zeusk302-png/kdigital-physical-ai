# Python 기초 · 개념부터 직접 작성까지

print부터 함수까지 개념 순서대로 읽습니다. 처음 나오는 기호는 해당 단원의 구성요소에서 확인하세요. 코드의 길이보다 각 줄의 뜻을 이해하고 새 문제를 작성하는 것이 목표입니다.

## 처음 실행할 때

학생 예제 ZIP을 모두 추출하고 `course` 폴더를 여세요. 주소 표시줄에 `powershell`을 입력하면 그 폴더에서 터미널이 열립니다. 편집기에서는 `.py` 파일을 열고 Ctrl+S로 저장합니다.

```text
python --version
python -X utf8 concepts/C01_01_normal.py
```

`python` 명령이 없고 `py`가 있으면 명령 앞을 `py`로 바꾸세요. 실행 준비가 되지 않았다면 제공 출력으로 먼저 따라 읽고 설치 상태를 강사와 확인하세요. 명령과 예상 출력은 Python 파일에 복사하지 않습니다.

## 개념 목차

| 단원 | 배울 내용 | 예제 |
|---|---|---|
| C01 | [파일을 저장하고 실행하기](#/sessions/2026-10-14/lesson?concept=C01) | 첫 파일 실행 · 실행 순서 확인 |
| C02 | [print와 주석](#/sessions/2026-10-14/lesson?concept=C02) | 글자·숫자·빈 줄 · 여러 값과 주석 |
| C03 | [숫자·자료형·계산](#/sessions/2026-10-14/lesson?concept=C03) | 자료형과 연산 비교 · 온도와 타이머 계산 |
| C04 | [변수와 대입](#/sessions/2026-10-14/lesson?concept=C04) | 값에 이름 붙이기 · 재고 변화 추적 |
| C05 | [문자열과 출력 형식](#/sessions/2026-10-14/lesson?concept=C05) | 길이와 위치 · 값을 넣은 안내문 |
| C06 | [input과 형변환](#/sessions/2026-10-14/lesson?concept=C06) | 문자열 연결과 숫자 덧셈 · 입력받는 온도 변환기 |
| C07 | [문자열 정리](#/sessions/2026-10-14/lesson?concept=C07) | 명령 글자 정리 · 금액과 할인율 정리 |
| C08 | [비교와 참·거짓](#/sessions/2026-10-14/lesson?concept=C08) | 경계값 비교 · 여러 조건 결합 |
| C09 | [if·else·elif 조건문](#/sessions/2026-10-14/lesson?concept=C09) | 짝수·홀수 · 점수 등급 |
| C10 | [리스트에 여러 값 담기](#/sessions/2026-10-14/lesson?concept=C10) | 읽기·수정·추가 · 원본과 작업본 |
| C11 | [for와 range 반복](#/sessions/2026-10-14/lesson?concept=C11) | 값마다 합격 판정 · 구구단 한 단 |
| C12 | [반복하며 합계·개수·평균 구하기](#/sessions/2026-10-14/lesson?concept=C12) | 누적과 조건 개수 · 빈 목록도 처리하는 요약 |
| C13 | [딕셔너리와 이름으로 찾기](#/sessions/2026-10-14/lesson?concept=C13) | 메뉴 가격표와 주문 합계 · 품목별 개수 |
| C14 | [while·break·continue](#/sessions/2026-10-14/lesson?concept=C14) | 재고가 있는 동안 판매 · 종료 명령까지 입력 |
| C15 | [잘못된 입력과 예외 처리](#/sessions/2026-10-14/lesson?concept=C15) | 한 번 변환 시도 · 정상 입력까지 다시 묻기 |
| C16 | [함수·매개변수·return](#/sessions/2026-10-14/lesson?concept=C16) | 온도 변환 함수 · 출력과 반환 비교 |
| C17 | [입력부터 요약까지 종합하기](#/sessions/2026-10-14/lesson?concept=C17) | 숫자 입력 함수 · 측정 숫자 요약 프로그램 |

## 읽고 연습하는 순서

개념 설명 → 구성요소 → 주석 예제 → 실행 과정 → 직접 작성 → 오류 수정 순서입니다. 모든 예제를 한 번에 복사하기보다 한 단원씩 실행하고 결과를 기록하세요. 딕셔너리·while·예외·함수·종합 단원은 앞의 조건·리스트·반복을 이해한 뒤 이어서 학습합니다.

[제출 과제 3개 보기](#/sessions/2026-10-14/assignments) · [추가 실습 문제](#/sessions/2026-10-14/practice-problems) · [실습 파일 받기](student-examples.zip)

## 참고한 공개 자료

개념 순서와 설명 방식을 참고했습니다. 예제와 과제는 이 수업을 위해 작성하거나 일상 계산을 변형했습니다.

- [혼자 공부하는 파이썬 목차](https://lms.hanbit.co.kr/books/B1681646737?code=B1681646737)
- [점프 투 파이썬](https://wikidocs.net/book/1)
- [파이썬 코딩 도장](https://dojang.io/course/view.php?id=7)
- [Python for Everybody](https://www.py4e.com/html3/03-conditional)
- [CS50P 예외 처리](https://cs50.harvard.edu/python/weeks/3/)
