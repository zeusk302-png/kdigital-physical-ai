# A09 · JSON 결과를 새 파일로 저장하기

건수 4와 미측정 1을 JSON으로 저장합니다. ensure_ascii=False는 한글을 읽기 쉬운 모양으로 남기고 indent=2는 들여쓰기를 넣습니다. 저장한 파일을 다시 읽어 값이 같은지 봅니다.

## 전체 시연 코드


```python
import json
from pathlib import Path
base = Path(__file__).resolve().parent.parent
summary = {"건수": 4, "미측정": 1}
text = json.dumps(summary, ensure_ascii=False, indent=2)
target = base / "work" / "output_summary.json"
target.write_text(text, encoding="utf-8")
loaded = json.loads(target.read_text(encoding="utf-8"))
print(loaded["건수"], loaded["미측정"])
```

## 작성할 답

- 실행 전 예상 또는 판단: _____
- 그렇게 판단한 근거: _____
- 확인할 값·위치: _____
