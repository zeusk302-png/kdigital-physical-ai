# Python 기초 · 개념별 실습과 과제

압축을 모두 추출하고 course 폴더에서 실행하세요. 최신 학습 경로는 concepts/C01.md부터 C17.md까지입니다. 설명·구성요소·주석 예제·직접 작성·오류 수정 순서로 배웁니다.

- [개념별 예제 설명](concepts/README.md): print부터 함수까지 17개 단원. _normal.py는 완성 예, _broken.py는 의도한 오류, _starter.py는 직접 채우는 연습입니다.
- [추가 실습 문제](assignments/README.md): 제출하지 않는 단원 연습 14개입니다.
- [제출 과제 3개](homework/README.md): HW01~HW03만 별도로 제출합니다. 파일명은 수강생이름_HW01.py 형식입니다.
- [추가 주석 예제](samples/README.md): 주문·재고·센서 응용을 더 연습할 때 사용합니다.

## 저장과 실행

탐색기의 course 폴더 주소 표시줄에 powershell을 입력합니다. 편집기에서 .py 파일을 열고 Ctrl+S로 저장한 뒤 같은 파일을 실행합니다.

```text
python --version
python -X utf8 concepts/C01_01_normal.py
```

python 대신 py 명령만 사용할 수 있다면 앞부분을 py로 바꿉니다. 파일 확장자가 .py.txt인지 확인하세요. 코드와 터미널 명령은 서로 다른 위치에 입력합니다.

입력이 필요한 예제는 해당 C번호.md에 키보드 입력 순서가 있습니다. 여러 줄 입력은 한 줄씩 입력하고 Enter를 누릅니다. 무한 반복은 터미널에서 Ctrl+C로 중지합니다.

## 추가 실습 실행

```text
python -X utf8 assignments/P02.py
```

과제 답안은 완성 코드가 없는 작성용 파일입니다. 문제에서 정한 입력 순서와 출력 형식을 지킵니다. 채점용 코드는 input에 안내 문구를 붙이지 않습니다. 예시 외 입력도 시험하세요.

## 이전 연습 자료

code·work·debug·foundations 폴더와 activity-guide.md는 앞서 제공한 추가 연습 자료입니다. 최신 개념별 수업은 concepts를 먼저 사용합니다. 입력 data 원본을 바꾸기 전에 사본을 만드세요.
