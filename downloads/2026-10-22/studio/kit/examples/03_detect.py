"""검출만 먼저 익힙니다. 추적 ID·구역 사건은 다음 단계에서 붙입니다."""
import argparse
from time import perf_counter
import cv2
from src.camera import open_input
from src.detector import load_model, detect

def main(args):
    if not 0 <= args.conf <= 1:
        raise ValueError('conf는 0~1 사이입니다.')
    # 모델은 반복문 밖에서 한 번만 읽습니다. 프레임마다 읽으면 매우 느립니다.
    model=load_model(args.weights)
    capture=open_input(args.source,args.backend)
    frames=0
    try:
        while args.limit == 0 or frames < args.limit:
            ok,frame=capture.read()
            if not ok:
                if args.source.isdecimal():
                    raise RuntimeError('카메라 읽기 실패')
                break
            tick=perf_counter()
            result=detect(model,frame,args.conf,args.imgsz,args.classes)
            # conf 점수는 정답률이 아닙니다. 이 검출에 대한 모델의 점수입니다.
            boxes=result.boxes
            for cls,score,xyxy in zip(boxes.cls.tolist(), boxes.conf.tolist(),
                                      boxes.xyxy.tolist()):
                print(model.names[int(cls)], round(score,3), [round(v) for v in xyxy])
            shown=result.plot()  # 박스와 이름을 그린 새 사진 배열입니다.
            latency_ms=(perf_counter()-tick)*1000
            cv2.putText(shown,f'detections={len(boxes)} pipeline={latency_ms:.0f}ms',
                        (20,35),cv2.FONT_HERSHEY_SIMPLEX,0.7,(0,255,0),2)
            frames+=1
            if not args.no_show:
                cv2.imshow('03 YOLO - Q to stop',shown)
                if cv2.waitKey(1)&0xFF==ord('q'):break
        if frames==0:raise RuntimeError('읽은 프레임이 없습니다.')
        print(f'처리 프레임: {frames}')
    finally:
        capture.release()
        if not args.no_show:cv2.destroyAllWindows()

if __name__=='__main__':
    p=argparse.ArgumentParser()
    p.add_argument('--source',default='0')
    p.add_argument('--backend',choices=['auto','dshow','msmf'],default='auto')
    p.add_argument('--weights',default='runtime/models/yolo11n.pt')
    p.add_argument('--conf',type=float,default=0.35)
    p.add_argument('--imgsz',type=int,default=640)
    p.add_argument('--classes',type=int,nargs='+',default=[0])
    p.add_argument('--limit',type=int,default=0)
    p.add_argument('--no-show',action='store_true')
    main(p.parse_args())
