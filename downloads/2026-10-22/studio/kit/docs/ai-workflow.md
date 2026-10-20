# AI에 수정 맡기고 내가 확인하기
먼저 파일을 저장하고 정상 실행 명령과 결과를 기록한다. AI가 읽을 파일과 고칠 파일을 구분한다.

```text
AGENTS.md와 docs/architecture.md, src/events.py, tests를 읽어.
구역 안에서 계속 머무를 때 entered가 반복되면 안 돼.
검출 모델·ByteTrack·로그 필드 이름은 바꾸지 마.
원인과 수정 계획을 먼저 설명하고 events.py와 tests 범위만 수정해.
밖→안, 머무름, 퇴장 후 재진입, 첫 관찰이 안쪽,
짧은 ID 소실, 긴 소실, 같은 프레임 중복 ID를 시험해.
모의 시험·실제 YOLO 영상·실제 웹캠에서 확인한 결과를 구분해 보고해.
```

변경 뒤 확인: git diff에서 허용하지 않은 파일 변경이 있는지 읽는다. 시험 삭제·모든 예외 무시·상수 결과 반환처럼 오류를 감추는 수정은 되돌린다. unittest를 실행한 다음 자기 영상에서 원래 문제 장면과 새 장면을 각각 재실행한다. 어떤 줄이 왜 바뀌었는지 자기 말로 3문장을 쓴다.
설명만으로 실행 성공을 인정하지 않는다. AI가 '완료'라고 말하면 명령·출력·파일을 직접 확인한다. 얼굴이 찍힌 영상이나 인증값을 프롬프트에 첨부하지 않고 오류 문자열과 필요한 코드만 제공한다.

로컬 Git 기록 예(새 독립 프로젝트일 때만 init):
```powershell
git init
git status
git add src configs tests docs README.md AGENTS.md requirements.txt .gitignore prepare.py
git diff --cached
git commit -m "feat: add zone event checks"
git check-ignore runtime/models/yolo11n.pt
git ls-files
```
마지막 명령 결과에 runtime·.venv·원본 영상·가중치가 보이지 않는지 확인한다. 이 명령은 GitHub 게시를 수행하지 않는다.
