# 10/8 학생 자료 · 데이터 기초부터

이번 수업은 **데이터의 의미·종류·자료형·구조를 이해한 뒤 CSV와 JSON으로 표현하는 수업**입니다. 코드를 처음 보는 비전공자를 기준으로 작성했습니다. 먼저 [foundations 안내](foundations/README.md)를 읽습니다.

## 자료를 보는 순서

1. 압축을 풀고 foundations/README.md를 엽니다.
2. 수업의 A01~A24 번호에 맞춰 data의 개념 카드와 원문을 읽습니다.
3. work의 양식에 분류 근거·예상 결과·직접 작성한 데이터를 남깁니다.
4. 코드가 나오는 활동에서는 code의 완성 예와 줄별 해설을 함께 봅니다.
5. CSV·JSON은 형식 검사 후 원문·규칙·의미까지 비교합니다.

| 위치 | 용도 |
| --- | --- |
| foundations/data | 개념 분류 카드, 비교 사례, 표·CSV·JSON 원문, 종합 과제 |
| foundations/work | 학생이 직접 작성하는 답칸과 작업 양식 |
| foundations/code | 짧은 완성 Python 코드 네 개와 설명 |

데이터 전체가 정형인지, 값의 의미가 범주인지 수량인지, 컴퓨터가 문자열인지 숫자로 저장하는지는 서로 다른 질문입니다. 파일 확장자나 값의 겉모양 하나만으로 모두 판단하지 않습니다.

## 준비된 PC에서 Python 실행하기

아래는 **이 README가 있는 폴더**에서 터미널을 연 경우입니다. 실행 명령을 Python 코드 파일이나 CSV 안에 적지 않습니다.

~~~powershell
python -X utf8 foundations/code/A07_types.py
python -X utf8 foundations/code/A11_structures.py
python -X utf8 foundations/code/A16_read_csv.py
python -X utf8 foundations/code/A20_read_json.py
~~~

Python이 준비되지 않았으면 강사에게 알리고 코드의 출력 예상·비교 활동을 계속합니다. 웹에는 Python 실행기가 없습니다. 웹으로 CSV·JSON을 직접 작성하고 확인하는 활동과 Python 개인 실행은 구별합니다.

## 원문과 결과 보관

받은 data의 원문은 보존하고 work의 작업 사본을 편집합니다. 웹에서 내려받은 파일은 다시 열어 확인하고 활동에서 지정한 이름으로 보관합니다. 내려받기가 지원되지 않으면 입력 내용을 복사해 텍스트 편집기에 붙여넣고 UTF-8로 저장합니다.

미측정·0·False·문자열을 구별합니다. 형식이 잘 읽히더라도 원문이나 데이터 사전과 다른 값이 있을 수 있습니다. 모르는 값은 추측해 채우지 않습니다.

이번 학생 묶음에는 현행 foundations 자료만 들어 있습니다. 강사 정답과 상세 검증 로그는 제외했습니다. 계정·유료 API·실물 장비는 기본 활동에 필요하지 않으며 예제는 모두 합성 자료입니다.

360분은 개념 설명·비교·직접 적용·풀이를 위한 운영 배정입니다.

