# A14 · clone과 새 기록 받아오기

shared.git를 peer 폴더로 clone하면 README와 이력을 확인할 수 있습니다. 새 기록이 있으면 fetch 뒤 비교하고 pull --ff-only로 선형으로 반영할 수 있을 때만 진행합니다.

## 전체 시연 코드


```powershell
git clone ../shared.git ../peer
Set-Location ../peer
git log --oneline -3
git remote -v
git fetch origin
git pull --ff-only
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
