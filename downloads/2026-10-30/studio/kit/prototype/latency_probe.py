"""실제 HTTP 요청의 응답 시간과 실패를 기록합니다. 결과를 미리 채우지 않습니다."""
import argparse,time,statistics,math
from urllib.request import urlopen
from urllib.error import URLError

def main():
    p=argparse.ArgumentParser();p.add_argument('url');p.add_argument('--count',type=int,default=10)
    a=p.parse_args()
    if not 1<=a.count<=50:p.error('count는1~50입니다.')
    times=[];failures=[]
    for i in range(a.count):
        start=time.perf_counter()
        try:
            with urlopen(a.url,timeout=5) as response:
                response.read();status=response.status
            elapsed=(time.perf_counter()-start)*1000
            times.append(elapsed);print(i+1,status,f'{elapsed:.2f}ms')
        except (URLError,OSError) as error:failures.append(str(error));print(i+1,'실패',error)
        time.sleep(.1)
    print('성공',len(times),'실패',len(failures))
    if times:
        print('중앙값(ms)',round(statistics.median(times),2))
        print('표본 p95(ms)',round(sorted(times)[math.ceil(.95*len(times))-1],2))
    print('HTTP 성공과 실제 사용자 과업 성공은 별도로 확인합니다.')
if __name__=='__main__':main()
