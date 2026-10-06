# Git/GitHub · 변경을 비교하고 기록하기

2026-10-16 · Git/GitHub

파일 저장과 Git 기록을 구별하고 연습용 README의 한 변경을 상태·비교·스테이징·커밋으로 추적합니다. 로컬 공유 저장소로 보내기·받기를 확인하고 GitHub 리뷰는 계정 없는 제공 자료로 연습합니다.

계정이나 실제 장비 없이 합성 자료로 진행합니다.

각 코드의 전체 내용, 모든 줄의 의미와 전체 예상 출력을 모았습니다. work 사본을 수정하며 원본 code는 그대로 둡니다.

## A02 · 연습 저장소와 로컬 작성자 설정

### 전체 명령


```powershell
New-Item -ItemType Directory -Path work/git-lab
Set-Location work/git-lab
git init -b main
git config --local user.name "실습자"
git config --local user.email "learner@example.invalid"
git rev-parse --show-toplevel
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `New-Item -ItemType Directory -Path work/git-lab` | 연습 전용 폴더를 만듭니다. |
| 2 | `Set-Location work/git-lab` | 그 폴더로 현재 위치를 옮깁니다. |
| 3 | `git init -b main` | main으로 시작하는 로컬 저장소를 만듭니다. |
| 4 | `git config --local user.name "실습자"` | 이번 저장소의 작성자 이름을 정합니다. |
| 5 | `git config --local user.email "learner@example.invalid"` | 실습용 작성자 주소를 정합니다. |
| 6 | `git rev-parse --show-toplevel` | 저장소 최상위 주소가 git-lab인지 확인합니다. |

### 실행 위치와 확인

처음 위치는 압축을 푼 course 폴더입니다. Windows PowerShell 예시이며 다른 OS의 폴더 생성·이동은 강사 안내를 따릅니다. git-lab이 이미 있으면 새 복사본의 빈 폴더를 사용합니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
Initialized empty Git repository in .../work/git-lab/.git/
.../work/git-lab
```


오류 해결: git 명령이 없으면 강사가 설치 상태를 확인합니다. 제공한 명령·상태 카드로 수동 추적하고 개인 실행은 미완료로 표시합니다.
## A03 · status로 현재 상태 읽기

### 전체 명령


```powershell
git status
git status --short
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git status` | 자세한 현재 상태를 읽습니다. |
| 2 | `git status --short` | 같은 상태를 짧은 기호로 확인합니다. |

### 실행 위치와 확인

현재 위치: work/git-lab. 먼저 원자료 initial_README.md를 README.md로 복사하여 저장합니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
?? README.md
```


오류 해결: README가 안 보이면 저장한 경로와 파일 확장자를 확인합니다. 다른 폴더의 파일을 보고 있을 수 있습니다.
## A05 · add는 현재 변경을 선택한다

### 전체 명령


```powershell
git add README.md
git status --short
git diff --staged
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git add README.md` | README의 현재 상태를 선택합니다. |
| 2 | `git status --short` | 선택 상태를 짧게 읽습니다. |
| 3 | `git diff --staged` | 이번 기록에 들어갈 내용을 비교합니다. |

### 실행 위치와 확인

현재 위치: work/git-lab. README가 저장되어 있고 첫 커밋 전 상태입니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
A  README.md
선택한 README 전체 내용이 추가 줄로 보입니다.
```


오류 해결: staged에 예상 밖 내용이 있으면 커밋 전에 파일 경로와 비교를 확인합니다.
## A06 · commit과 변경 이력

### 전체 명령


```powershell
git commit -m "Add checker guide"
git log --oneline
git status --short
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git commit -m "Add checker guide"` | 선택한 상태를 메시지와 함께 기록합니다. |
| 2 | `git log --oneline` | 짧은 커밋 이력을 봅니다. |
| 3 | `git status --short` | 기록 뒤 남은 변경이 있는지 확인합니다. |

### 실행 위치와 확인

현재 위치: work/git-lab. A05에서 README를 스테이징했습니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
<짧은해시> Add checker guide
status --short는 남은 변경이 없으면 빈 출력입니다.
```


오류 해결: 작성자 오류는 로컬 user.name과user.email 설정을 확인합니다. 글로벌 설정을 임의로 바꾸지 않습니다.
## A07 · 한 목적의 변경과 메시지

### 전체 명령


```powershell
git diff
git add README.md
git diff --staged
git commit -m "Clarify run folder"
git log --oneline -2
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git diff` | 작업 변경을 확인합니다. |
| 2 | `git add README.md` | 의도한 파일을 선택합니다. |
| 3 | `git diff --staged` | 선택한 내용을 다시 봅니다. |
| 4 | `git commit -m "Clarify run folder"` | 목적이 드러나는 메시지로 기록합니다. |
| 5 | `git log --oneline -2` | 최근 두 기록을 확인합니다. |

### 실행 위치와 확인

현재 위치 work/git-lab. 편집기로 README의 Run checker. 한 줄을 Run checker from course.로 바꾸고 저장합니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
<둘째해시> Clarify run folder
<첫째해시> Add checker guide
```


오류 해결: 예상 밖 줄바꿈 변경이 많으면 편집기 저장 방식과 전체 diff를 확인하고 그 상태로 무작정 기록하지 않습니다.
## A08 · 현재 내용과 과거 커밋 비교

### 전체 명령


```powershell
git show HEAD~1:README.md
git diff HEAD~1 HEAD -- README.md
git log --oneline -2
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git show HEAD~1:README.md` | 이전 커밋의 README 내용을 조회합니다. |
| 2 | `git diff HEAD~1 HEAD -- README.md` | 이전과 현재 커밋의 해당 파일을 비교합니다. |
| 3 | `git log --oneline -2` | 실제 비교한 기록 두 개를 확인합니다. |

### 실행 위치와 확인

현재 위치 work/git-lab. A07까지 커밋 두 개가 있어야 합니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
이전 파일에는 Run checker.
비교에는 -Run checker. / +Run checker from course.
```


오류 해결: HEAD~1 오류는 커밋 개수를 먼저 봅니다. 이력의 시작에는 부모가 없습니다.
## A09 · .gitignore와 관리 대상

### 전체 명령


```powershell
git status --short
git check-ignore -v scratch.txt
git add .gitignore
git commit -m "Ignore scratch notes"
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git status --short` | 어떤 파일이 변경 대상으로 보이는지 확인합니다. |
| 2 | `git check-ignore -v scratch.txt` | 임시 파일을 무시한 규칙을 찾습니다. |
| 3 | `git add .gitignore` | 무시 규칙 파일만 선택합니다. |
| 4 | `git commit -m "Ignore scratch notes"` | 관리 대상 규칙을 기록합니다. |

### 실행 위치와 확인

work/git-lab에 편집기로 .gitignore를 만들고 한 줄 scratch.txt를 씁니다. 임시 scratch.txt도 만듭니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
.gitignore:1:scratch.txt scratch.txt
scratch.txt는 일반 상태 목록에서 제외됩니다.
```


오류 해결: .gitignore.txt로 저장되었는지 확인합니다. 정확한 파일명과 규칙 경로를 봅니다.
## A10 · 스테이징 취소와 작업 내용 유지

### 전체 명령


```powershell
git add README.md
git diff --staged
git restore --staged README.md
git diff --staged
git diff -- README.md
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git add README.md` | 현재 변경을 선택합니다. |
| 2 | `git diff --staged` | 선택 내용을 확인합니다. |
| 3 | `git restore --staged README.md` | 다음 커밋의 선택만 취소합니다. |
| 4 | `git diff --staged` | 선택 취소 결과를 확인합니다. |
| 5 | `git diff -- README.md` | 작업 파일에 남은 편집을 확인합니다. |

### 실행 위치와 확인

work/git-lab의 README 끝에 Practice note.를 추가해 저장합니다. 현재 내용을 별도 노트에도 기록해 둡니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
staged 차이는 사라집니다.
작업 diff에는 +Practice note.가 남습니다.
```


오류 해결: 복구 명령을 외워 입력하기 전에 옵션과 대상 파일을 읽고 현재 상태를 기록합니다.
## A11 · 연습 파일 한 개의 작업 내용 복구

### 전체 명령


```powershell
git diff -- README.md
git restore -- README.md
git status --short
git log --oneline -3
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git diff -- README.md` | 복구로 없어질 작업 차이를 확인합니다. |
| 2 | `git restore -- README.md` | 지정한 README 작업 내용만 복구합니다. |
| 3 | `git status --short` | 남은 변경을 확인합니다. |
| 4 | `git log --oneline -3` | 기존 커밋 이력이 유지되는지 봅니다. |

### 실행 위치와 확인

work/git-lab이며 A10을 마친 상태입니다. Practice note.가 들어 있는 현재 README를 work/README_before_restore.txt로 복사해 보관한 뒤 진행합니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
Practice note. 작업 변경이 사라집니다.
기존 커밋은 그대로 유지됩니다.
```


오류 해결: 주소가 실제 프로젝트라면 이 연습을 수행하지 말고 별도 git-lab로 이동합니다. 백업과 대상 파일명을 먼저 확인합니다.
## A12 · 브랜치와 병합의 흐름

### 전체 명령


```powershell
git switch -c docs-example
git add README.md
git commit -m "Add reading example"
git switch main
git diff main docs-example -- README.md
git merge --no-ff docs-example -m "Merge reading example"
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git switch -c docs-example` | 새 브랜치를 만들고 이동합니다. |
| 2 | `git add README.md` | 시연에서 추가한 문구를 선택합니다. |
| 3 | `git commit -m "Add reading example"` | 그 브랜치에 기록합니다. |
| 4 | `git switch main` | 기본 브랜치로 돌아갑니다. |
| 5 | `git diff main docs-example -- README.md` | 들어올 변경을 비교합니다. |
| 6 | `git merge --no-ff docs-example -m "Merge reading example"` | 검토한 브랜치를 병합 커밋으로 반영합니다. |

### 실행 위치와 확인

강사 시연 또는 선택 실습. work/git-lab의 작업 상태가 깨끗한지 확인합니다. 브랜치 생성 뒤 README 끝에 Example: S01 22.5.를 넣고 저장합니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
main에 Example: S01 22.5.가 반영됩니다.
브랜치의 커밋과 병합 기록을 볼 수 있습니다.
```


오류 해결: 전환이 막히면 미커밋 변경 상태를 먼저 확인합니다. 강제 전환으로 밀어붙이지 않습니다.
## A13 · 원격 이름과 로컬 공유 저장소

### 전체 명령


```powershell
git init --bare -b main ../shared.git
git remote add origin ../shared.git
git remote -v
git push -u origin main
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git init --bare -b main ../shared.git` | main을 기본 브랜치로 둔 로컬 공유 저장소를 만듭니다. |
| 2 | `git remote add origin ../shared.git` | 그 로컬 경로에 origin이라는 이름을 붙입니다. |
| 3 | `git remote -v` | 보낼 대상 경로를 확인합니다. |
| 4 | `git push -u origin main` | main 기록을 로컬 공유 저장소로 보냅니다. |

### 실행 위치와 확인

현재 위치 work/git-lab. 강사가 로컬 경로 ../shared.git인지 확인합니다. 이 활동은 GitHub 접속이나 인터넷 push를 하지 않습니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
origin ../shared.git (fetch)
origin ../shared.git (push)
main 브랜치가 로컬 shared.git에 전달됩니다.
```


오류 해결: origin이 이미 있으면 기존 주소를 먼저 확인합니다. 확인 없이 다른 대상 주소로 덮어쓰지 않습니다.
## A14 · clone과 새 기록 받아오기

### 전체 명령


```powershell
git clone ../shared.git ../peer
Set-Location ../peer
git log --oneline -3
git remote -v
git fetch origin
git pull --ff-only
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git clone ../shared.git ../peer` | 로컬 공유 저장소를 새 peer 폴더로 복제합니다. |
| 2 | `Set-Location ../peer` | 다른 작업 사본으로 이동합니다. |
| 3 | `git log --oneline -3` | 가져온 이력을 확인합니다. |
| 4 | `git remote -v` | 이 사본의 공유 대상 주소를 봅니다. |
| 5 | `git fetch origin` | 새 기록을 받습니다. |
| 6 | `git pull --ff-only` | 단순 전진이 가능할 때만 현재 브랜치에 반영합니다. |

### 실행 위치와 확인

시작 위치 work/git-lab. ../peer는 새로 만들 폴더입니다. 네트워크 주소를 사용하지 않습니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
peer 폴더에서 같은 README와 이력을 확인합니다.
새 기록이 없으면 Already up to date.가 나올 수 있습니다.
```


오류 해결: bare의 기본 브랜치가 맞지 않아 비어 보이면 강사가 shared.git의 HEAD가 main인지 확인합니다. 명령 실패를 성공으로 적지 않습니다.
## A17 · 새 안내 변경을 스스로 기록하기

### 전체 명령


```powershell
git status --short
git diff -- README.md
git add README.md
git diff --staged
git commit -m "Explain missing-value policy"
git log --oneline -1
```

### 각 줄의 뜻

| 줄 | 코드 | 뜻 |
| --- | --- | --- |
| 1 | `git status --short` | 기존 변경이 있는지 봅니다. |
| 2 | `git diff -- README.md` | 새 안내 한 줄을 비교합니다. |
| 3 | `git add README.md` | 그 파일을 선택합니다. |
| 4 | `git diff --staged` | 기록할 최종 차이를 봅니다. |
| 5 | `git commit -m "Explain missing-value policy"` | 실제 문서 목적을 메시지로 남깁니다. |
| 6 | `git log --oneline -1` | 생긴 기록을 확인합니다. |

### 실행 위치와 확인

work/git-lab로 돌아와 상태를 확인합니다. README에 지정 문장을 추가하고 저장합니다. peer에서 작업하지 않도록 경로를 확인합니다.

대표 확인 결과(커밋 해시·사용자명 등은 환경마다 다름):


```text
<새해시> Explain missing-value policy
README에 Missing values stay unknown.가 포함됩니다.
```


오류 해결: 다른 변경이 섞여 있으면 그 목적을 먼저 확인하고 한 파일만 선택했다고 모든 내용이 맞다고 가정하지 않습니다.
