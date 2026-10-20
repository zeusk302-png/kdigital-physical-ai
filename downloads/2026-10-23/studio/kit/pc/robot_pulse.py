"""라즈봇V2 제조사 Ctrl_Car를 사용한 제한된 모터 시험. 기본은 모의 출력입니다."""
import argparse,importlib.util,time
from pathlib import Path

def pulse(car,motor,speed,seconds):
    if motor not in range(4) or type(speed) is not int or not 0<=speed<=50:
        raise ValueError('시험 범위: motor 0~3, speed 0~50')
    if not 0<seconds<=0.5:raise ValueError('시험 시간은 0초 초과 0.5초 이하')
    try:
        car.Ctrl_Car(motor,0,speed)
        time.sleep(seconds)
    finally:
        # 한 모터의 정지가 실패해도 나머지 정지 호출은 계속 시도합니다.
        failures=[]
        for mid in range(4):
            try:car.Ctrl_Car(mid,0,0)
            except Exception as error:failures.append(error)
        if failures:raise RuntimeError('모터 정지 통신 실패. 물리 전원을 차단하세요.') from failures[0]

class Preview:
    def Ctrl_Car(self,*args):print('DRYRUN Ctrl_Car',args)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--motor',type=int,default=0)
    p.add_argument('--speed',type=int,default=30);p.add_argument('--seconds',type=float,default=.2)
    p.add_argument('--real',action='store_true');p.add_argument('--driver',type=Path)
    a=p.parse_args();car=Preview()
    if a.real:
        if not a.driver or not a.driver.is_file():p.error('실제 Pi의 확인한 제조사 드라이버 .py 경로가 필요합니다.')
        spec=importlib.util.spec_from_file_location('verified_raspbot_driver',a.driver.resolve())
        module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
        car=module.Raspbot()
    pulse(car,a.motor,a.speed,a.seconds)
