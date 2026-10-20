"""S로 한 장 저장하고 Q로 종료합니다. 실행 위치는 kit입니다."""
import argparse
from datetime import datetime
from pathlib import Path
import cv2
from src.camera import open_input

def main(source, backend):
    capture = open_input(source, backend)
    folder = Path('runtime/input')
    folder.mkdir(parents=True, exist_ok=True)
    try:
        while True:
            ok, frame = capture.read()
            if not ok:
                if source.isdecimal():
                    raise RuntimeError('카메라 프레임을 읽지 못했습니다.')
                break
            # 원본 frame을 보존하고 표시용 복사본에만 안내를 그립니다.
            shown = frame.copy()
            cv2.putText(shown, 'S: save / Q: quit', (20, 35),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)
            cv2.imshow('02 Snapshot', shown)
            key = cv2.waitKey(1) & 0xFF
            if key == ord('s'):
                # 마이크로초까지 포함해 연속 저장 시 이전 파일을 덮지 않습니다.
                name = datetime.now().strftime('photo_%Y%m%d_%H%M%S_%f.jpg')
                target = folder / name
                if not cv2.imwrite(str(target), frame):
                    raise RuntimeError('사진 저장 실패: 폴더·디스크 공간을 확인하세요.')
                print('저장:', target.resolve())
            elif key == ord('q'):
                break
    finally:
        capture.release()
        cv2.destroyAllWindows()

if __name__ == '__main__':
    p=argparse.ArgumentParser()
    p.add_argument('--source',default='0')
    p.add_argument('--backend',choices=['auto','dshow','msmf'],default='auto')
    args=p.parse_args();main(args.source,args.backend)
