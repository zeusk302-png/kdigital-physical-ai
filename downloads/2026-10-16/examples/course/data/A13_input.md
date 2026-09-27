# A13 · 원격 이름과 로컬 공유 저장소

bare 저장소는 일반 작업 파일을 편집하는 폴더 없이 Git 기록을 받는 용도로 사용합니다. ../shared.git를 origin으로 연결하고 main을 보냅니다. 네트워크 주소가 아닌 로컬 상대 경로입니다.

## 전체 시연 코드


```powershell
git init --bare -b main ../shared.git
git remote add origin ../shared.git
git remote -v
git push -u origin main
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
