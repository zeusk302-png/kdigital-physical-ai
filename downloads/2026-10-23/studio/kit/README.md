# RaspTank 명령 프로젝트

기본 실행은 PC의 모의 실행이며 외부 패키지가 필요 없습니다. Python 3.10 이상을 사용합니다. 실제 장치 라이브러리는 포함하지 않았습니다. 학생 PC에서 제조사 setup.py를 실행하지 않습니다.

1. 압축을 풀고 이 README와 robotlab 폴더가 함께 있는 kit 폴더를 엽니다.
2. PC 터미널에서 `python --version`으로 실행기를 확인합니다.
3. `python -m robotlab sequence.json`을 실행합니다.
4. `python -m robotlab servo-dryrun.json`으로 서보 명령 설계를 확인합니다.
5. `python -m unittest discover -s tests -v`로 정상·잘못된 입력·중단을 확인합니다.

`mode`가 dryrun인지 읽으세요. completed는 처리한 명령 개수이며 실제 목표 도달 피드백이 아닙니다. sequence.json을 my-sequence.json으로 복사해 학생 버전을 만드세요. `python -m robotlab my-sequence.json`으로 바뀐 파일을 실행합니다.

파일 역할: commands.py는 입력 검사, adapters.py는 모의·제조사 번역, runner.py는 실행·정지, __main__.py는 명령줄입니다. JSON은 명령 데이터이고 Python 파일은 명령을 처리하는 코드입니다.

실물 경로는 [하드웨어 준비](docs/hardware.md)를 먼저 읽습니다. 제조사 파일을 임의 실행하거나 GPIO·서보 범위를 생성하지 않습니다. 초록·보라색의 계약이 다르며 실물 서보는 현재 보정되지 않아 자동 실행을 막았습니다. 실물 실행은 준비된 Pi에서 강사와 함께 단계별로 확인합니다.

Git에는 robotlab/, tests/, 문서, 예제 JSON, pyproject.toml을 올립니다. vendor/, runtime/, .venv/, 실제 .env와 hardware.local.json은 제외합니다. `git status --short`를 보고 다음 커밋의 내용을 확인합니다. 문서의 localhost와 로컬 경로는 학생 PC 상황에 맞춰 확인합니다.
