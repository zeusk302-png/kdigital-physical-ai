# 걸음 · 나만의 랜딩페이지 실습

완성 골격+TODO로 배우는 단일 실행가능 프로젝트입니다. 자기 콘텐츠로 수정한 원본이 학생 결과물입니다. HTML판과 React판은 같은 주제의 독립 입구이며 공유 CSS와 검사 함수를 씁니다. 서로 다른 원본에 제목이 있으므로 두 화면을 각각 고쳐 비교합니다.

## 실행
이 kit 폴더 전체를 별도 개인 작업 폴더에 복사하고 에디터에서 엽니다. Windows PowerShell에서 pwd와 dir로 package.json 위치를 확인합니다. Node22.12+ 또는24, npm, 설치 권한과 최초 인터넷이 필요합니다.

```powershell
node --version
npm.cmd ci
npm.cmd run dev
```

출력된 localhost 주소의 /는 HTML판, /react.html은 React판입니다. 실행창을 열어 둡니다. 종료 Ctrl+C. 파일을 저장하면 dev 화면에 반영됩니다.

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

preview는 다시 출력된 주소를 엽니다. 소스를 수정하면 build를 다시 해야 preview가 갱신됩니다. dist는 배포 산출물이며 직접 편집하지 않습니다. 설치 불가 시 reference-static/index.html을 열어 HTML/CSS/JS를 실습합니다. React 실행·빌드는 이 대체 경로로 검증되지 않습니다.

## 원본 위치
- index.html: 제목·섹션·장점·내부 링크
- src/styles/tokens.css / layout.css: 색·간격·반응형
- src/vanilla.js: HTML 메뉴·폼 사건
- src/validate.js: 두 판이 공유하는 입력 검사
- src/App.jsx / components/: React 내용·부품·state
- public/images/: 공개할 권리가 있는 이미지
- docs/: 기획·디자인·검수·배포·추가 과제

코드 주석과 lessons의 해당 단원을 함께 읽습니다. 문의는 검사만 하며 통신하지 않습니다. 실제 개인정보를 넣지 않습니다. 최소 길이 변경 시 자동시험 경계 입력도 함께 고쳐 요구와 시험을 맞춥니다.

## Git
개인 폴더에서 git status로 저장소 범위를 확인합니다. 독립 폴더일 때 git init → git add . → git status → git diff --cached → git commit 순으로 기록합니다. 원본·잠금파일·문서·허가된 이미지는 포함하고 node_modules·dist·실제.env·개인자료는 제외합니다. 이미 기록된 비밀은 ignore만으로 제거되지 않습니다. 게시 방법은 docs/deploy.md입니다.

## 복구
ENOENT: 현재 폴더 확인. npm.ps1 정책 오류: npm.cmd 사용. 이미지404: 대소문자·경로 확인. 흰 화면: 터미널과 Console 첫 오류. 화면 그대로: dev/preview 주소·저장 파일 확인. 포트 충돌: 터미널에 출력된 실제 주소 사용. MCP 미연결: 수동 개발자 도구 검수를 계속하고 미실행 기록.

Windows에서 npm ci가 esbuild.exe EPERM으로 실패하면 실행 중인 이 프로젝트 dev 서버를 Ctrl+C로 종료한 뒤 다시 설치합니다. 서버가 파일을 사용 중일 수 있으며 시스템 정책을 임의로 바꾸지 않습니다.
