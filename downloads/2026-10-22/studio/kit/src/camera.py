"""USB 웹캠과 영상 파일의 입구를 한곳에서 관리합니다."""
from pathlib import Path

def open_input(source, backend='auto'):
    """입력: 카메라 번호 문자열 또는 파일 경로. 출력: 열린 VideoCapture."""
    import cv2
    # 숫자 0은 카메라 번호지만 문자열 '0'은 파일 이름이 될 수 있습니다.
    # 터미널 인자는 문자열이므로 숫자로 바꿔서 OpenCV에 전달합니다.
    if str(source).isdecimal():
        index = int(source)
        # Windows에서 기본 방식이 실패할 때만 dshow 또는 msmf를 비교합니다.
        api = {'auto': cv2.CAP_ANY, 'dshow': cv2.CAP_DSHOW,
               'msmf': cv2.CAP_MSMF}[backend]
        capture = cv2.VideoCapture(index, api)
    else:
        file = Path(source)
        if not file.is_file():
            raise FileNotFoundError(f'영상 파일을 찾을 수 없습니다: {file.resolve()}')
        capture = cv2.VideoCapture(str(file))
    if not capture.isOpened():
        capture.release()
        raise RuntimeError('입력을 열지 못했습니다. 번호·권한·다른 앱 사용 여부를 확인하세요.')
    return capture
