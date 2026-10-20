"""실행 위치 kit: python -m examples.01_camera --source 0
화면은 Q로 종료합니다. 파일 입력은 --source runtime/input/clip.mp4입니다.
"""
import argparse
import cv2
from src.camera import open_input

def main(args):
    capture = open_input(args.source, args.backend)
    frames = 0  # 지금까지 실제로 읽은 프레임 수입니다.
    try:
        # limit=0이면 제한 없이 계속합니다. 영상 파일은 끝에서 종료합니다.
        while args.limit == 0 or frames < args.limit:
            ok, frame = capture.read()  # 성공 여부와 사진 배열, 두 값을 돌려줍니다.
            if not ok:
                if args.source.isdecimal():
                    raise RuntimeError('카메라 읽기 실패: USB 연결과 다른 앱을 확인하세요.')
                break  # 영상 파일의 마지막 프레임을 읽었습니다.
            height, width = frame.shape[:2]  # 높이·너비 순서에 주의합니다.
            frames += 1
            if not args.no_show:
                cv2.putText(frame, f'{width}x{height} frame={frames}', (20, 35),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                cv2.imshow('01 Camera - Q to stop', frame)
                # 창을 클릭한 뒤 Q를 누릅니다. waitKey는 창의 키 입력도 처리합니다.
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
        if frames == 0:
            raise RuntimeError('읽은 프레임이 없습니다.')
        print(f'읽은 프레임: {frames}')
    finally:
        # 오류가 나도 다음 프로그램이 카메라를 쓸 수 있도록 반환합니다.
        capture.release()
        if not args.no_show:
            cv2.destroyAllWindows()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', default='0')
    parser.add_argument('--backend', choices=['auto','dshow','msmf'], default='auto')
    parser.add_argument('--limit', type=int, default=0)
    parser.add_argument('--no-show', action='store_true')
    main(parser.parse_args())
