import cv2
import json
from pathlib import Path
root = Path(__file__).resolve().parent.parent
config = json.loads((root / "work" / "settings.json").read_text(encoding="utf-8"))
source = root / "data" / config["image"]
image = cv2.imread(str(source))
if image is None:
    raise ValueError("입력 이미지를 확인하세요: " + str(source))
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
used, mask = cv2.threshold(gray, config["threshold"], 255, cv2.THRESH_BINARY)
contours, hierarchy = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
kept = []
for contour in contours:
    if cv2.contourArea(contour) >= config["min_area"]:
        kept.append(contour)
preview = image.copy()
for contour in kept:
    x, y, width, height = cv2.boundingRect(contour)
    cv2.rectangle(preview, (x, y), (x + width - 1, y + height - 1), (0, 0, 255), 2)
if not cv2.imwrite(str(root / "work" / "mask.png"), mask):
    raise OSError("mask 저장 실패")
if not cv2.imwrite(str(root / "work" / "detected.png"), preview):
    raise OSError("detected 저장 실패")
report = {"image": config["image"], "threshold": used, "min_area": config["min_area"], "count": len(kept)}
(root / "work" / "report.json").write_text(json.dumps(report, ensure_ascii=False), encoding="utf-8")
print(json.dumps(report, ensure_ascii=False))
