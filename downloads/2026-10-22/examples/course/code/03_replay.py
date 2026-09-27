import cv2
from pathlib import Path
root = Path(__file__).resolve().parent.parent
for name in ["parts.png", "empty.png", "holdout.png"]:
    frame = cv2.imread(str(root / "data" / name))
    if frame is None:
        raise ValueError("프레임을 읽을 수 없습니다: " + name)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    used, mask = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY)
    contours, hierarchy = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    count = 0
    for contour in contours:
        if cv2.contourArea(contour) >= 100:
            count = count + 1
    print(name, count)
