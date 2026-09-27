# A07 · 파일 경로와 텍스트 읽기

course/code 또는 course/work의 코드에서 parent.parent는 course입니다. 그 아래 data/notice.txt를 읽습니다. UTF-8은 한글을 글자로 해석하는 인코딩 약속입니다.

## 전체 시연 코드


```python
from pathlib import Path
base = Path(__file__).resolve().parent.parent
source = base / "data" / "notice.txt"
text = source.read_text(encoding="utf-8")
print(text.strip())
```

## 고의 오류 비교

정상 코드에서 다음 부분을 바꾼 경우를 비교합니다. 원본은 보존합니다.


```python
"missing.txt"
```

예상 오류 종류: FileNotFoundError
## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
