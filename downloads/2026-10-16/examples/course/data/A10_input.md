# A10 · 스테이징 취소와 작업 내용 유지

README에 Practice note.를 추가해 add한 뒤 --staged로 선택을 취소합니다. staged 비교는 비고 작업 diff에는 문장이 남습니다.

## 전체 시연 코드


```powershell
git add README.md
git diff --staged
git restore --staged README.md
git diff --staged
git diff -- README.md
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
