# Python 심화 · 함수와 파일 검사

2026-10-15 · Python 심화

반복하는 일을 함수로 묶고 CSV를 읽어 JSON으로 저장합니다. 값이 없거나 잘못된 경우도 함께 처리해 봅니다.

**수업은 50분씩 6교시입니다. 중식은 11:50~13:00입니다.** 원본은 그대로 두고 work 폴더의 파일에서 안내한 부분을 고칩니다. 계정이나 실제 장비 없이 연습용 자료를 사용합니다.

현재 실행 명령 예시는 course 폴더 기준입니다. Windows PowerShell과 다른 OS에서는 파일을 찾고 저장하는 화면이 다를 수 있습니다. 설치는 강사가 확인하며, 실행할 수 없을 때는 동일 입력으로 예상·수동 추적을 작성합니다.

## A01 · 같은 업무를 함수로 묶는 이유

**목적:** 같은 조건식을 여러 곳에 복사하면 한 곳만 수정하고 다른 곳을 놓칠 수 있습니다. 반복되는 규칙을 모으면 변경 위치를 찾기 쉽습니다. 첫 코드부터 모든 줄을 함수로 만들 필요는 없습니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A01_input.md](examples/course/data/A01_input.md)
- [A01_notes.md](examples/course/work/A01_notes.md)

**단계**

1. 같은 부분과 다른 값을 구별합니다.
2. 공통 작업에 temperature_status라는 이름을 붙입니다.
3. 받을 값과 결과의 뜻을 문장으로 씁니다.
4. 기준 변경 때 수정할 위치를 비교합니다.

**예상 결과:** 공통 규칙·온도 입력·상태 결과를 구별합니다.

**확인 방법:** 줄 수가 짧으면 함수가 필요 없다고 단정할 수 있나요?

**오류 해결:** 입력 카드 한 장을 받고 상태 카드 한 장을 돌려주는 역할극으로 그립니다.

## A02 · def로 정의하고 이름으로 호출하기

**목적:** 위에서 아래로 읽는 원리는 유지하지만 함수 본문은 호출할 때 실행됩니다. 정의 위치와 실제 실행 시점을 나누어 보면 출력 순서가 이해됩니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A02_input.md](examples/course/data/A02_input.md)
- [A02_example.py](examples/course/code/A02_example.py)
- [A02_notes.md](examples/course/work/A02_notes.md)
- [A02_example.py](examples/course/work/A02_example.py)

**단계**

1. 정의와 호출을 표시합니다.
2. 실제 출력 순서를 씁니다.
3. 호출을 한 번 더 넣어 예상합니다.
4. 정의 횟수와 본문 실행 횟수를 설명합니다.

**예상 결과:** 정의 한 번·호출 두 번이면 안내 출력 두 번.

**확인 방법:** 정의만 하고 호출하지 않으면 본문 출력은 나오나요?

**오류 해결:** 본문 출력이 예상과 다르면 print가 함수 안에 들여써져 있는지 확인합니다.

## A03 · 매개변수와 실제 인자

**목적:** 고정 값을 함수 안에서 매번 바꾸는 대신 호출값을 달리해 같은 작업을 사용합니다. 함수 안 이름이 어디서 값을 받는지 알아야 전달한 값을 추적할 수 있습니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A03_input.md](examples/course/data/A03_input.md)
- [A03_example.py](examples/course/code/A03_example.py)
- [A03_notes.md](examples/course/work/A03_notes.md)
- [A03_example.py](examples/course/work/A03_example.py)

**단계**

1. 전달값과 받을 이름을 짝짓습니다.
2. 둘째 입력을 S03·0.0으로 바꿉니다.
3. 값 하나가 부족한 호출과 정상 호출을 비교합니다.
4. 함수 내부를 고치지 않고 결과가 달라지는 이유를 씁니다.

**예상 결과:** 둘째 출력 S03 0.0. 인자 부족은 TypeError.

**확인 방법:** value는 모든 호출에서 같은 값을 뜻하나요?

**오류 해결:** 받을 값 개수와 전달한 값 개수·순서를 비교합니다.

## A04 · print와 return의 차이

**목적:** 결과를 JSON에 저장하거나 집계하려면 함수가 값을 돌려줘야 합니다. 화면 글자를 다른 코드가 저절로 변수에 담지는 않습니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A04_input.md](examples/course/data/A04_input.md)
- [A04_example.py](examples/course/code/A04_example.py)
- [A04_notes.md](examples/course/work/A04_notes.md)
- [A04_example.py](examples/course/work/A04_example.py)

**단계**

1. 출력과 반환의 경로를 구별합니다.
2. result가 값을 받는 위치를 찾습니다.
3. offset을 2.0으로 바꿔 예상합니다.
4. 두 출력의 관계를 확인합니다.

**예상 결과:** 24.5를 반환하고 다음 계산은 25.5.

**확인 방법:** 화면에 보인 값은 언제나 같은 함수의 반환값인가요?

**오류 해결:** None이 보이면 return이 있는지, 특정 경로에서 반환 없이 끝나는지 확인합니다.

## A05 · 조건을 담은 상태 함수

**목적:** 상태 규칙과 출력 위치를 나누면 같은 결과를 화면이나 파일에 사용할 수 있습니다. 함수가 입력값을 바꾸는지 새 결과만 만드는지도 설명합니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A05_input.md](examples/course/data/A05_input.md)
- [A05_example.py](examples/course/code/A05_example.py)
- [A05_notes.md](examples/course/work/A05_notes.md)
- [A05_example.py](examples/course/work/A05_example.py)

**단계**

1. 입력별 도달하는 return을 표시합니다.
2. 마지막 입력을 24.0으로 바꿉니다.
3. 상태 문자열만 생기는지 입력이 바뀌는지 설명합니다.
4. None 확인을 먼저 하는 이유를 씁니다.

**예상 결과:** 정상·미측정·정상. 같은 값은 초과가 아닙니다.

**확인 방법:** return 뒤의 코드를 같은 호출이 모두 실행하나요?

**오류 해결:** 미측정 오류는 숫자 비교보다 None 검사가 앞인지 확인합니다.

## A06 · 예상 사례표로 함수 확인하기

**목적:** 프로그램이 보여 준 결과를 그대로 정답으로 적으면 잘못된 코드도 통과합니다. 실행 전에 업무 규칙에서 기대값을 정해야 합니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A06_input.md](examples/course/data/A06_input.md)
- [A06_notes.md](examples/course/work/A06_notes.md)

**단계**

1. 24.0 초과 규칙을 문장으로 적습니다.
2. 다섯 기대값을 먼저 채웁니다.
3. A05 호출값을 바꾸어 대조합니다.
4. 통과한 범위와 남은 입력 종류를 나눕니다.

**예상 결과:** 정상/정상/확인/미측정/정상과 판단 이유.

**확인 방법:** 20과 30만 확인하면 놓칠 수 있는 실수는 무엇인가요?

**오류 해결:** 기대값이 애매하면 코드 대신 초과라는 업무 문구를 먼저 읽습니다.

## A07 · 파일 경로와 텍스트 읽기

추가 원문·작업 파일:

- [A07_input.md](examples/course/data/A07_input.md)
- [A07_example.py](examples/course/code/A07_example.py)
- [notice.txt](examples/course/data/notice.txt)
- [A07_notes.md](examples/course/work/A07_notes.md)
- [A07_example.py](examples/course/work/A07_example.py)

**목적:** 터미널을 다른 곳에서 열어도 같은 자료를 읽도록 준비합니다. 긴 준비 줄을 외우기보다 code·work·data의 상대 배치를 이해하는 것이 목적입니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A07_input.md](examples/course/data/A07_input.md)
- [A07_example.py](examples/course/code/A07_example.py)
- [A07_notes.md](examples/course/work/A07_notes.md)
- [A07_example.py](examples/course/work/A07_example.py)

**단계**

1. code·work·data 배치를 그립니다.
2. 실제 파일명을 확인합니다.
3. 같은 코드가 다른 현재 위치에서도 읽는지 비교합니다.
4. 없는 파일의 오류와 내용 오류를 구별합니다.

**예상 결과:** 안내 한 줄 출력. 없는 파일명은 FileNotFoundError.

**확인 방법:** data만 다른 곳으로 옮겨도 자동으로 찾나요?

**오류 해결:** 압축 안에서 열었는지, 확장자가 두 번 붙었는지, course의 배치가 유지됐는지 확인합니다.

## A08 · CSV를 이름표가 있는 행으로 읽기

추가 원문·작업 파일:

- [A08_input.md](examples/course/data/A08_input.md)
- [A08_example.py](examples/course/code/A08_example.py)
- [readings.csv](examples/course/data/readings.csv)
- [A08_notes.md](examples/course/work/A08_notes.md)
- [A08_example.py](examples/course/work/A08_example.py)

**목적:** 열 번호를 외우기보다 temperature_c라는 이름으로 읽으면 처리할 항목이 드러납니다. 실제 헤더가 약속과 맞아야 같은 이름으로 읽을 수 있습니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A08_input.md](examples/course/data/A08_input.md)
- [A08_example.py](examples/course/code/A08_example.py)
- [A08_notes.md](examples/course/work/A08_notes.md)
- [A08_example.py](examples/course/work/A08_example.py)

**단계**

1. 헤더와 키의 대응을 표시합니다.
2. 헤더를 제외한 네 건을 셉니다.
3. 온도의 값 모양과 자료형을 나눠 적습니다.
4. 빈 온도가 어떤 문자열일지 예상합니다.

**예상 결과:** 4 / S01 /22.5 str. 헤더는 데이터가 아닙니다.

**확인 방법:** 빈 셀은 자동으로 None이 되나요?

**오류 해결:** KeyError는 실제 헤더와 키를 비교합니다. 공백·인코딩도 실제 원문을 확인한 뒤 판단합니다.

## A09 · JSON 결과를 새 파일로 저장하기

추가 원문·작업 파일:

- [A09_input.md](examples/course/data/A09_input.md)
- [A09_example.py](examples/course/code/A09_example.py)
- [A09_notes.md](examples/course/work/A09_notes.md)
- [A09_example.py](examples/course/work/A09_example.py)
- [output_summary.json](examples/course/work/output_summary.json)

**목적:** 화면 출력만 있으면 다음 사람이 결과를 재사용하기 어렵습니다. 입력 원자료를 덮어쓰지 않도록 work의 결과 경로를 명확히 정합니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A09_input.md](examples/course/data/A09_input.md)
- [A09_example.py](examples/course/code/A09_example.py)
- [A09_notes.md](examples/course/work/A09_notes.md)
- [A09_example.py](examples/course/work/A09_example.py)

**단계**

1. data와 work의 역할을 구별합니다.
2. 실행 후 output_summary.json을 엽니다.
3. 건수만 5로 바꾸고 다시 실행합니다.
4. 파일 저장 줄과 화면 출력 줄을 표시합니다.

**예상 결과:** 처음 4 1, 수정 후 5 1. 저장 파일의 숫자도 바뀝니다.

**확인 방법:** print와 write_text는 같은 행동인가요?

**오류 해결:** 쓰기 권한이 없으면 강사와 저장 위치를 확인합니다. 원자료를 출력 주소로 바꾸지 않습니다.

## A10 · 미측정과 잘못된 숫자의 구별

**목적:** 모든 변환 실패를 None으로 바꾸면 누락과 잘못된 기록을 구별하지 못합니다. 원문과 실패 이유를 남겨야 확인 요청을 할 수 있습니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A10_input.md](examples/course/data/A10_input.md)
- [A10_example.py](examples/course/code/A10_example.py)
- [A10_notes.md](examples/course/work/A10_notes.md)
- [A10_example.py](examples/course/work/A10_example.py)

**단계**

1. 원문·반환값·업무 의미를 표로 적습니다.
2. 뜨거움과 빈칸의 차이를 설명합니다.
3. 오류 원문과 종류를 기록합니다.
4. 실제값이 미확인일 때 남길 질문을 씁니다.

**예상 결과:** 22.5/None/0.0을 구별하며 글자는 ValueError.

**확인 방법:** 잘못된 숫자를 미측정으로 바꾸면 무엇을 잃나요?

**오류 해결:** None과 문자열 "None"은 다릅니다. 후자는 숫자로 읽으면 실패합니다.

## A11 · 오류의 위치·종류·원값

**목적:** 파일 없음·키 없음·숫자 변환 실패는 다음 행동이 다릅니다. 이름만 암기하기보다 실패한 작업과 입력을 연결합니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A11_input.md](examples/course/data/A11_input.md)
- [A11_notes.md](examples/course/work/A11_notes.md)

**단계**

1. 실패 작업·종류·경로 또는 값을 표시합니다.
2. 사실과 추정 원인을 나눕니다.
3. 다음 확인 동작을 하나씩 정합니다.
4. 오류 단서를 보존한 전달 기록을 씁니다.

**예상 결과:** 주소·헤더·원값 확인을 구별합니다.

**확인 방법:** ValueError면 모두 같은 값으로 고쳐도 되나요?

**오류 해결:** 명령·관련 줄·마지막 오류를 남깁니다. 길다는 이유로 단서를 모두 지우지 않습니다.

## A12 · try와 except로 예상 오류 기록

**목적:** 한 값이 잘못되어도 원문과 이유를 남길 수 있습니다. 다룰 오류 종류를 좁히면 예상하지 못한 문제를 숨기지 않습니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A12_input.md](examples/course/data/A12_input.md)
- [A12_example.py](examples/course/code/A12_example.py)
- [A12_notes.md](examples/course/work/A12_notes.md)
- [A12_example.py](examples/course/work/A12_example.py)

**단계**

1. 성공과 오류의 실행 줄을 표시합니다.
2. raw를 24.0으로 바꿔 비교합니다.
3. 오류 기록과 실제값 확정을 구별합니다.
4. 원문을 메시지에 남긴 이유를 설명합니다.

**예상 결과:** 오류는 확인 필요, 정상값은 24.0 출력.

**확인 방법:** except를 실행하면 실제 온도를 알아낸 것인가요?

**오류 해결:** 오류를 숨기려고 except의 범위를 무조건 넓히지 않습니다.

## A13 · 범위 규칙을 함수에서 확인하기

**목적:** 51.0은 숫자이므로 float는 성공하지만 실습 입력 규칙에는 맞지 않습니다. 변환과 규칙 검사를 분리하여 읽어야 합니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A13_input.md](examples/course/data/A13_input.md)
- [A13_example.py](examples/course/code/A13_example.py)
- [A13_notes.md](examples/course/work/A13_notes.md)
- [A13_example.py](examples/course/work/A13_example.py)

**단계**

1. 변환과 범위 검사를 표시합니다.
2. 0·50·51.0의 기대 결과를 씁니다.
3. 경계와 오류 입력을 비교합니다.
4. 원문과 확인 이유를 남깁니다.

**예상 결과:** 0·50은 허용하고 51.0은 범위 오류입니다.

**확인 방법:** 범위 통과가 실제 센서 정확도를 증명하나요?

**오류 해결:** or를 and로 바꿨다면 두 조건의 뜻을 읽습니다. 동시에 0보다 작고 50보다 큰 값은 찾을 수 없습니다.

## A14 · 한 값 수정 뒤 같은 사례 재확인

추가 원문·작업 파일:

- [A14_input.md](examples/course/data/A14_input.md)
- [bad_readings.csv](examples/course/data/bad_readings.csv)
- [A14_notes.md](examples/course/work/A14_notes.md)
- [bad_readings_work.csv](examples/course/work/bad_readings_work.csv)
- [correction_notes.md](examples/course/work/correction_notes.md)

**목적:** 한 문제를 고치며 미측정을 0으로 바꾸거나 경계를 바꿀 수 있습니다. 원문·지시·수정 위치·재확인을 함께 남겨야 이유가 전달됩니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A14_input.md](examples/course/data/A14_input.md)
- [A14_notes.md](examples/course/work/A14_notes.md)

**단계**

1. 확정과 미확정 지시를 나눕니다.
2. work/correction_notes.md에 전후값과 근거를 씁니다.
3. work/bad_readings_work.csv에서 S05 한 값만 고칩니다.
4. 정상·미측정·0·범위의 재확인 표를 작성합니다.

**예상 결과:** S05만 23.5로 수정하고 S06원문과 확인 이유를 남깁니다.

**확인 방법:** 이슈 건수만 줄면 좋은 수정인가요?

**오류 해결:** 확정되지 않은 실제값은 추측하지 않습니다. 어느 값이 왜 미확인인지 씁니다.

## A15 · 어떤 파일을 넣고 어떤 결과를 받을지 적어 봅시다

추가 원문·작업 파일:

- [A15_input.md](examples/course/data/A15_input.md)
- [bad_readings.csv](examples/course/data/bad_readings.csv)
- [A15_notes.md](examples/course/work/A15_notes.md)

**목적:** 원본과 수정 사본 중 무엇을 읽었는지 모르면 결과 대조가 틀릴 수 있습니다. 실행 완료와 데이터 이슈가 없다는 사실도 별도입니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A15_input.md](examples/course/data/A15_input.md)
- [A15_notes.md](examples/course/work/A15_notes.md)

**단계**

1. 세 파일의 위치를 그립니다.
2. 미측정과 실제 0의 집계 차이를 적습니다.
3. 실행 완료와 이슈 0건을 구별합니다.
4. 다음 활동의 예상 건수를 먼저 기록합니다.

**예상 결과:** 전체 6,수락 4,이슈 2,미측정 1,수치 3.

**확인 방법:** 미측정도 분모에 넣어 4로 나누면 무엇이 바뀌나요?

**오류 해결:** 전체=수락+이슈, 수락=수치+미측정의 두 관계를 나누어 확인합니다.

## A16 · 로그 검사기 전체 흐름

추가 원문·작업 파일:

- [A16_input.md](examples/course/data/A16_input.md)
- [A16_log_checker.py](examples/course/code/A16_log_checker.py)
- [bad_readings.csv](examples/course/data/bad_readings.csv)
- [readings.csv](examples/course/data/readings.csv)
- [A16_notes.md](examples/course/work/A16_notes.md)
- [A16_log_checker.py](examples/course/work/A16_log_checker.py)
- [check_summary.json](examples/course/work/check_summary.json)
- [check_issues.json](examples/course/work/check_issues.json)

**목적:** 함수·파일·예외를 하나의 업무에 연결합니다. 긴 코드는 준비·정의·행 처리·집계·저장으로 나눠 추적합니다. 전체를 암기하거나 빈 편집기에서 다시 작성하는 것이 목표는 아닙니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A16_input.md](examples/course/data/A16_input.md)
- [A16_log_checker.py](examples/course/code/A16_log_checker.py)
- [A16_notes.md](examples/course/work/A16_notes.md)
- [A16_log_checker.py](examples/course/work/A16_log_checker.py)

**단계**

1. 전체 코드를 역할별 다섯 구간으로 표시합니다.
2. 건수와 평균을 손으로 먼저 확인합니다.
3. 실행 뒤 결과 JSON 두 개를 엽니다.
4. 입력 파일명만 readings.csv로 바꿔 비교합니다.

**예상 결과:** 오류 포함 6/4/1/2,정상 4/4/1/0. 평균은 모두 15.83.

**확인 방법:** continue의 역할은 무엇인가요?

**오류 해결:** 한 행의 원문→함수→분류를 먼저 추적합니다. 여러 곳을 동시에 바꾸지 않습니다.

### 중간 확인과 다음 활동 합류

- 함께 확인할 증거: readings.csv의 정상 숫자 한 건과 missing_readings.csv의 미측정 한 건을 따라 읽고, 0은 숫자·미측정은 평균 대상이 아님을 설명합니다.
- 남은 작업: A16의 전체 구간 표시는 A16_notes.md, 네 입력 비교는 A17_notes.md에 미완료 항목을 표시하고 이어서 완성합니다. 이미 작성한 결과를 지우지 않습니다.
- 다음 입력: 제공된 work/A16_log_checker.py를 그대로 출발점으로 사용하고 A17에서 CSV 이름만 교체합니다. 실행이 막히면 solutions/A16_answer.md와 A17_answer.md의 제공 결과를 **관찰**로 기록하고 A18 인수인계에 미완료를 남깁니다.

## A17 · 정상·빈 입력·잘못된 입력 비교

추가 원문·작업 파일:

- [A17_input.md](examples/course/data/A17_input.md)
- [readings.csv](examples/course/data/readings.csv)
- [bad_readings.csv](examples/course/data/bad_readings.csv)
- [empty_readings.csv](examples/course/data/empty_readings.csv)
- [missing_readings.csv](examples/course/data/missing_readings.csv)
- [A17_notes.md](examples/course/work/A17_notes.md)
- [A16_log_checker.py](examples/course/work/A16_log_checker.py)

**목적:** 수치가 하나도 없으면 평균 분모가 0입니다. 평균 None은 계산할 수치가 없다는 결과이며 실제 평균 0.0과 의미가 다릅니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A17_input.md](examples/course/data/A17_input.md)
- [A17_notes.md](examples/course/work/A17_notes.md)

**단계**

1. 네 입력의 기대 집계표를 씁니다.
2. work/A16_log_checker.py 안 source 줄의 따옴표 속 CSV 이름만 바꿔(.py 이름은 유지) 같은 프로그램을 실행합니다.
3. 평균None의 이유와 집계 관계를 확인합니다.
4. 헤더·다른 필드·실제 진위는 미검증으로 기록합니다.

**예상 결과:** empty 0/0/0/0·None, missing 2/2/2/0·None.

**확인 방법:** 수치가 없을 때 평균 0을 쓰면 어떤 오해가 생기나요?

**오류 해결:** 이전 실행 결과 파일을 새 결과로 혼동하지 않도록 입력명·저장·실행 경로를 확인합니다.

### 검사할 CSV만 바꾸기

수정 파일은 `work/A16_log_checker.py`입니다. **.py 파일 이름은 그대로 둡니다.** 코드 안 `source = base / "data" / "bad_readings.csv"` 한 줄에서 따옴표 속 CSV 이름만 바꿉니다. 예: `source = base / "data" / "readings.csv"`.

저장 후 course 폴더에서 `python -X utf8 work/A16_log_checker.py`를 실행합니다. 실행마다 `work/check_summary.json`과 `work/check_issues.json`이 덮어써지므로 **결과를 먼저 기록한 뒤** 다음 CSV로 바꿉니다.

| 따옴표 속 입력 이름 | 예상 집계·평균 | 실제 집계·평균 | 직접 실행/제공 출력 관찰 | 차이와 근거 |
| --- | --- | --- | --- | --- |
| readings.csv | _____ | _____ | _____ | _____ |
| bad_readings.csv | _____ | _____ | _____ | _____ |
| empty_readings.csv | _____ | _____ | _____ | _____ |
| missing_readings.csv | _____ | _____ | _____ | _____ |

평균을 낼 숫자가 없다는 결과와 실제 측정 0을 구분해 설명합니다.

### 중간 확인과 다음 활동 합류

- 함께 확인할 증거: readings.csv의 정상 숫자 한 건과 missing_readings.csv의 미측정 한 건을 따라 읽고, 0은 숫자·미측정은 평균 대상이 아님을 설명합니다.
- 남은 작업: A16의 전체 구간 표시는 A16_notes.md, 네 입력 비교는 A17_notes.md에 미완료 항목을 표시하고 이어서 완성합니다. 이미 작성한 결과를 지우지 않습니다.
- 다음 입력: 제공된 work/A16_log_checker.py를 그대로 출발점으로 사용하고 A17에서 CSV 이름만 교체합니다. 실행이 막히면 solutions/A16_answer.md와 A17_answer.md의 제공 결과를 **관찰**로 기록하고 A18 인수인계에 미완료를 남깁니다.

## A18 · 검사기 사용 안내와 근거 전달

추가 원문·작업 파일:

- [A18_input.md](examples/course/data/A18_input.md)
- [A18_notes.md](examples/course/work/A18_notes.md)
- [usage.md](examples/course/work/usage.md)

**목적:** 작성자가 없어도 검사 범위를 오해하지 않게 해야 합니다. ‘검증 완료’보다 온도 변환·범위·미측정 구별을 검사했다고 구체적으로 씁니다.

**준비:** 원자료와 작업 파일을 나란히 엽니다. 원본은 보존하고 work 파일에 기록합니다. 실행 환경이 없으면 같은 입력·코드·출력으로 수동 추적합니다.

- [A18_input.md](examples/course/data/A18_input.md)
- [A18_notes.md](examples/course/work/A18_notes.md)

**단계**

1. work/usage.md에 실행 안내를 씁니다.
2. 짝이 입력 하나의 결과를 설명하게 합니다.
3. 빠진 파일 위치와 입력·결과 규칙을 추가합니다.
4. 코드·입력·요약·이슈·사례표를 함께 제출합니다.

**예상 결과:** 재현 가능한 경로·명령·결과와 검증 범위가 분명한 안내.

**확인 방법:** 이슈 0건이라는 결과만 남기면 무엇이 부족한가요?

**오류 해결:** 처음 실행 순서와 오류 확인 순서를 나눠 씁니다. 미확인 사실을 확정하지 않습니다.
