import cv2
from pathlib import Path
root = Path(__file__).resolve().parent.parent
source = root / "data" / "parts.png"
image = cv2.imread(str(source))
if image is None:
    raise ValueError("이미지를 읽지 못했습니다: " + str(source))
print("shape:", image.shape)
print("BGR:", image[40, 30].tolist())
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
saved = cv2.imwrite(str(root / "work" / "gray.png"), gray)
if not saved:
    raise OSError("출력 파일을 저장하지 못했습니다")
print("gray:", gray.shape)
