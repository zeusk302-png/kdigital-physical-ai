# A12 · 브랜치와 병합의 흐름

docs-example 브랜치에서 사용 예를 추가한 뒤 main으로 돌아와 비교합니다. 변경을 반영할지 결정한 뒤 병합합니다. 브랜치는 폴더 전체를 수동 복사한 것과는 다릅니다.

## 전체 시연 코드


```powershell
git switch -c docs-example
git add README.md
git commit -m "Add reading example"
git switch main
git diff main docs-example -- README.md
git merge --no-ff docs-example -m "Merge reading example"
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
