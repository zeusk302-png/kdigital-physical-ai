# A09 · .gitignore와 관리 대상

scratch.txt를 무시 목록에 적고 임시 메모를 만듭니다. status에서 그 파일이 빠지고 check-ignore로 적용된 규칙을 볼 수 있습니다. .gitignore 자체는 공유할 설정으로 커밋할 수 있습니다.

## 전체 시연 코드


```powershell
git status --short
git check-ignore -v scratch.txt
git add .gitignore
git commit -m "Ignore scratch notes"
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
