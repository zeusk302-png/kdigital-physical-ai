import cv2
capture = cv2.VideoCapture(0)
try:
    if not capture.isOpened():
        raise RuntimeError("카메라 열기 실패: 권한, 점유, 장치 번호를 확인하세요")
    while True:
        ok, frame = capture.read()
        if not ok:
            print("프레임 읽기 실패: 종료합니다")
            break
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        cv2.imshow("camera-gray", gray)
        if cv2.waitKey(1) & 255 == ord("q"):
            break
finally:
    capture.release()
    cv2.destroyAllWindows()
