# A02 · 연습 저장소와 로컬 작성자 설정

course의 work 아래 git-lab을 만들고 그 안에서 시작합니다. main은 첫 브랜치 이름입니다. user.email은 실습용 .invalid 주소를 쓰며 실제 GitHub 계정 인증을 수행하지 않습니다.

## 전체 시연 코드


```powershell
New-Item -ItemType Directory -Path work/git-lab
Set-Location work/git-lab
git init -b main
git config --local user.name "실습자"
git config --local user.email "learner@example.invalid"
git rev-parse --show-toplevel
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
