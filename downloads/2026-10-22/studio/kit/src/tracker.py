"""추적기 호출과 결과 변환. 추적 ID는 주민번호처럼 영구적인 번호가 아닙니다."""
from dataclasses import dataclass


@dataclass(frozen=True)
class Observation:
    track_id: int
    xyxy: tuple
    class_id: int = 0
    confidence: float = 1.0


def track_frame(model, frame, conf=0.35, imgsz=640, classes=(0,)):
    # persist=True: 다음 사진도 같은 영상의 이어지는 장면이라고 알려 줍니다.
    # 기본 추적기는 버전에 따라 달라질 수 있어 ByteTrack을 명시합니다.
    result = model.track(frame, persist=True, tracker='bytetrack.yaml',
                         conf=conf, imgsz=imgsz, classes=list(classes),
                         device='cpu', verbose=False)[0]
    observations = []
    if result.boxes is not None and result.boxes.id is not None:
        for box, tid, cls, score in zip(result.boxes.xyxy.cpu().tolist(),
                result.boxes.id.cpu().tolist(), result.boxes.cls.cpu().tolist(),
                result.boxes.conf.cpu().tolist()):
            observations.append(Observation(int(tid), tuple(box), int(cls), float(score)))
    # 아직 ID를 받지 못한 검출은 화면에는 보이지만 사건 판정에서는 제외합니다.
    return result, observations
