# 본인 GitHub Pages에 게시
본인 계정·저장소 권한·이미지 권리를 먼저 확인합니다. 자동 게시 파일은 여기 설명으로만 제공합니다. 본인 저장소에 아래 내용을 .github/workflows/pages.yml로 직접 저장하면 main push 때 게시됩니다. 원본을 푸시하고 Settings → Pages → Source: GitHub Actions를 선택합니다. Actions 성공 뒤 공개URL에서 index와 react.html, 이미지·CSS·키보드·폼을 확인합니다.

```yaml
name: Publish landing
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
        id: deployment
```

브랜치 이름이 main인지 먼저 확인합니다. 저장소 루트에 package.json이 있어야 이 예제가 그대로 작동합니다. 프로젝트 하위폴더에 넣었다면 실행위치와 artifact 경로를 함께 조정해야 합니다. 로컬 npm preview는 공개 게시 증거가 아닙니다.
