# A17 · 새 안내 변경을 스스로 기록하기

새 요구는 README에 ‘Missing values stay unknown.’를 추가해 미측정을 추측하지 않는다는 안내를 보강하는 것입니다. 프로그램 코드의 실제 동작을 바꾸었다고 주장하지 않습니다.

## 전체 시연 코드


```powershell
git status --short
git diff -- README.md
git add README.md
git diff --staged
git commit -m "Explain missing-value policy"
git log --oneline -1
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
