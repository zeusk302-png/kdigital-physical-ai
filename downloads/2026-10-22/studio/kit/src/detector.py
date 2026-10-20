"""사진 한 장에서 객체의 종류, 점수, 위치를 얻습니다."""
from pathlib import Path


def load_model(weights):
    """다운로드는 준비 단계에서만 합니다. 실행 중 몰래 받지 않습니다."""
    from ultralytics import YOLO
    if not Path(weights).is_file():
        raise FileNotFoundError('가중치 없음: README의 prepare 명령을 먼저 실행하세요.')
    return YOLO(weights)


def detect(model, frame, conf=0.35, imgsz=640, classes=(0,)):
    # model.predict는 결과 목록을 줍니다. [0]은 첫 사진의 결과입니다.
    return model.predict(frame, conf=conf, imgsz=imgsz, classes=list(classes),
                         device='cpu', verbose=False)[0]
