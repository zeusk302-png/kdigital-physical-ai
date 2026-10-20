"""수업 전에 가중치를 명시적으로 다운로드합니다. 현재 작업 폴더는 kit입니다."""
from pathlib import Path
from urllib.request import urlretrieve

if __name__ == '__main__':
    target = Path('runtime/models/yolo11n.pt')
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists():
        urlretrieve('https://github.com/ultralytics/assets/releases/download/v8.3.0/yolo11n.pt', target)
    print(target.resolve())
