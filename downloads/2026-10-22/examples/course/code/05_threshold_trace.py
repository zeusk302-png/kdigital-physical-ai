import cv2
import numpy as np
gray = np.array([[80, 100, 101, 220]], dtype=np.uint8)
used, mask = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY)
print("threshold:", used)
print("mask:", mask.tolist())
