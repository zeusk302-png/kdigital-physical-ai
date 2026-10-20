"""실행 위치 kit: python -m src.main --source runtime/input/clip.mp4"""
import argparse
import json
from pathlib import Path
from time import perf_counter
from datetime import datetime, timezone
from .detector import load_model, detect
from .tracker import track_frame
from .events import EventEngine
from .drawing import annotate


def run(args):
    import cv2
    cfg = json.loads(Path(args.config).read_text(encoding='utf-8'))
    if not 0 <= cfg['conf'] <= 1 or cfg['imgsz'] <= 0:
        raise ValueError('conf는 0~1, imgsz는 양수여야 합니다.')
    if not (0 <= cfg['zone'][0] < cfg['zone'][2] <= 1 and
            0 <= cfg['zone'][1] < cfg['zone'][3] <= 1):
        raise ValueError('zone은 0~1 좌표이며 왼쪽/위쪽 < 오른쪽/아래쪽입니다.')
    if not 0 <= cfg['line_x'] <= 1 or cfg['margin'] < 0 or cfg['max_gap'] < 1:
        raise ValueError('선/여유영역/소실 프레임 설정을 확인하세요.')
    model = load_model(args.weights)
    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=True)
    if args.image:
        image = cv2.imread(args.source)
        if image is None:
            raise ValueError('사진을 읽을 수 없습니다. 경로/확장자를 확인하세요.')
        result = detect(model, image, cfg['conf'], cfg['imgsz'], cfg['classes'])
        result.save(filename=str(output / 'image.jpg'))
        boxes = result.boxes
        print(json.dumps({'detections': len(boxes), 'classes': boxes.cls.tolist(),
                          'scores': boxes.conf.tolist()}, ensure_ascii=False))
        return
    source = int(args.source) if args.source.isdecimal() else args.source
    capture = cv2.VideoCapture(source)
    writer = None
    frames, process_seconds = 0, []
    engine = EventEngine(cfg['zone'], cfg['line_x'], cfg['margin'], cfg['max_gap'])
    started = perf_counter()
    try:
        if not capture.isOpened():
            raise RuntimeError('입력 열기 실패: 파일 경로 또는 카메라 번호/권한 확인')
        source_fps = capture.get(cv2.CAP_PROP_FPS)
        # 일부 웹캠은 FPS를 주지 않습니다. 저장 재생률의 대체값만 25로 둡니다.
        save_fps = source_fps if 0 < source_fps < 240 else 25
        with (output / 'events.jsonl').open('w', encoding='utf-8') as log:
            while args.limit == 0 or frames < args.limit:
                ok, frame = capture.read()  # ok=False면 파일 끝 또는 카메라 읽기 실패
                if not ok:
                    if isinstance(source, int):
                        raise RuntimeError('카메라 프레임 읽기 실패')
                    break
                tick = perf_counter()
                result, observations = track_frame(model, frame, cfg['conf'],
                                                    cfg['imgsz'], cfg['classes'])
                h, w = frame.shape[:2]
                # 원래 픽셀 좌표를 0~1 비율로 바꾸어 해상도가 달라도 설정을 유지합니다.
                from .tracker import Observation
                normalized = [Observation(o.track_id,
                    (o.xyxy[0]/w, o.xyxy[1]/h, o.xyxy[2]/w, o.xyxy[3]/h),
                    o.class_id, o.confidence) for o in observations]
                events, warnings = engine.update(frames, normalized)
                record = {'frame_index': frames, 'observed_at': datetime.now(timezone.utc).isoformat(),
                          'video_seconds': frames/save_fps if not isinstance(source, int) else None,
                          'events': events, 'warnings': warnings,
                          'track_ids': [o.track_id for o in normalized]}
                log.write(json.dumps(record, ensure_ascii=False) + '\n')
                drawn = annotate(result, cfg, events, frames)
                if writer is None:
                    writer = cv2.VideoWriter(str(output/'annotated.mp4'),
                        cv2.VideoWriter_fourcc(*'mp4v'), save_fps, (w, h))
                    if not writer.isOpened():
                        raise RuntimeError('동영상 저장기를 열 수 없습니다.')
                writer.write(drawn)
                process_seconds.append(perf_counter() - tick)
                frames += 1
                if args.show:
                    cv2.imshow('Vision Studio - Q to stop', drawn)
                    if cv2.waitKey(1) & 0xFF == ord('q'):
                        break
        if frames == 0:
            raise RuntimeError('읽은 프레임이 0개입니다. 손상/빈 동영상인지 확인하세요.')
        elapsed = perf_counter() - started
        # 전체 처리 FPS는 읽기/그리기/저장까지 포함합니다. 입력 FPS와 구별하세요.
        report = {'frames': frames, 'elapsed_seconds': elapsed, 'processing_fps': frames/elapsed,
                  'mean_pipeline_ms': 1000*sum(process_seconds)/frames,
                  'source_fps': source_fps, 'config': cfg, 'source': str(source)}
        (output/'metrics.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
        print(json.dumps(report, ensure_ascii=False))
    finally:
        capture.release()  # 예외가 생겨도 카메라를 다음 프로그램에 돌려줍니다.
        if writer is not None:
            writer.release()  # 파일 끝 정보를 써야 재생 가능한 영상이 됩니다.
        if args.show:
            cv2.destroyAllWindows()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='YOLO 검출/추적/구역 사건 프로그램')
    parser.add_argument('--source', required=True, help='동영상 경로 또는 웹캠 번호 0')
    parser.add_argument('--image', action='store_true')
    parser.add_argument('--weights', default='runtime/models/yolo11n.pt')
    parser.add_argument('--config', default='configs/default.json')
    parser.add_argument('--output', default='runtime/results/run1')
    parser.add_argument('--limit', type=int, default=0, help='0이면 끝까지, 양수면 해당 프레임 수')
    parser.add_argument('--show', action='store_true', help='GUI 가능한 PC에서만 사용')
    run(parser.parse_args())
