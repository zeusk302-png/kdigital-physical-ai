# 강의실 웹의 로컬 글꼴·아이콘

2026-09-27에 공식 저장소의 고정 버전에서 가져왔다. 실행 중 외부 CDN 요청 없이 강의 웹과 함께 배포하는 파일이다. 최신 버전이라는 뜻은 아니다.

| 구성 | 고정 버전 | 파일 | 라이선스 |
|---|---|---|---|
| Pretendard Variable | 1.3.9 | `pretendard/PretendardVariable.woff2` | SIL Open Font License 1.1 |
| Lucide SVG | 0.468.0 | `lucide/*.svg` 8개 | ISC, Feather 유래 부분 MIT |

Pretendard 글꼴 바이너리와 SVG 파일은 원본 그대로다. `pretendard/pretendard.css`는 공식 CSS의 글꼴 경로만 로컬 파일로 연결하고 설명 주석을 붙인 파일이다. 저작권 고지와 라이선스 파일을 이 디렉터리와 함께 배포한다. 글꼴 파일을 단독 상품으로 판매하지 않으며, 글꼴을 수정한다면 Reserved Font Name 조건을 별도로 확인해야 한다.

## 빌드 연결

`tools/web/vendor` 전체를 배포 웹의 `assets/vendor`로 복사한다. 이 보조 작업에서는 공통 빌드 파일과 app/index/style 파일을 수정하지 않았다.

페이지에서 다음 로컬 스타일을 불러온다.

```html
<link rel="stylesheet" href="assets/vendor/pretendard/pretendard.css">
```

본문 CSS 예:

```css
font-family: "Pretendard Variable", Pretendard, "Malgun Gothic", system-ui, sans-serif;
```

가변 굵기는 공식 CSS와 같은 `45 920` 범위다. 실제 이진 파일의 축을 별도 분석한 것은 아니다. `font-display: swap`을 유지하며, 글꼴을 읽는 동안에도 시스템 글꼴로 본문을 표시한다. 파일 크기는 2,057,688바이트다.

## 아이콘 용도

| 파일 | 권장 용도 |
|---|---|
| `book-open.svg` | 강의·교안 |
| `search.svg` | 강의 검색 |
| `menu.svg` | 모바일 목차 열기 |
| `x.svg` | 목차 닫기 |
| `copy.svg` | 코드·입력 복사 |
| `download.svg` | 자료 내려받기 |
| `chevron-down.svg` | 활동 선택·접힌 목차 |
| `arrow-right.svg` | 다음 강의·활동 |

SVG는 모두 24×24 좌표계다. 단순 장식으로 글자 옆에 넣을 때는 `alt=""`인 이미지 또는 `aria-hidden="true"`인 SVG를 사용한다. 아이콘만 있는 버튼은 버튼 자체에 `aria-label`로 실제 행동 이름을 붙인다. 외부 SVG를 `<img>`로 넣으면 부모의 `currentColor`를 직접 물려받지 않으므로, 색을 바꾸려면 신뢰할 수 있는 이 로컬 SVG의 도형을 인라인으로 넣거나 CSS 마스크 방식을 사용한다. 글자 레이블을 아이콘으로 모두 대체하지 않는다.

## 출처와 검사 범위

- [Pretendard 공식 프로젝트](https://github.com/orioncactus/pretendard)
- [Pretendard 1.3.9 라이선스](https://github.com/orioncactus/pretendard/blob/v1.3.9/LICENSE)
- [Pretendard 1.3.9 공식 변수 글꼴 CSS](https://github.com/orioncactus/pretendard/blob/v1.3.9/dist/web/variable/pretendardvariable.css)
- [Lucide 0.468.0 공식 아이콘 디렉터리](https://github.com/lucide-icons/lucide/tree/0.468.0/icons)
- [Lucide 0.468.0 라이선스](https://github.com/lucide-icons/lucide/blob/0.468.0/LICENSE)
- [Feather 4.29.2 MIT 라이선스](https://github.com/feathericons/feather/blob/v4.29.2/LICENSE)
- [Lucide 접근성 안내](https://lucide.dev/how-to/accessibility)

파일별 공식 원본 URL, 크기, SHA-256, 변경 여부는 `manifest.json`에 있다. WOFF2 시그니처·헤더의 파일 길이·테이블 수와 SVG 8개의 XML/좌표계/스크립트 부재를 확인했다. 이 단계에서는 브라우저의 실제 폰트 적용, 모든 한글 글리프, 보조기기 동작을 검증하지 않았다. 글꼴 설치나 npm 패키지 설치는 수행하지 않았다.
