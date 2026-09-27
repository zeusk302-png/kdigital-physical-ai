# A11 · 연습 파일 한 개의 작업 내용 복구

Practice note.를 백업 텍스트에 복사한 뒤 README만 복구합니다. 문구는 작업 파일에서 사라지지만 이미 만든 커밋 이력은 유지됩니다.

## 전체 시연 코드


```powershell
git diff -- README.md
git restore -- README.md
git status --short
git log --oneline -3
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
