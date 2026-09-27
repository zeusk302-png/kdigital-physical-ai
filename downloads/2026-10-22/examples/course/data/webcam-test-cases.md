# 카메라 없는 실패 흐름 카드

1. isOpened=False: RuntimeError 뒤 release와 창 정리.
2. isOpened=True, 첫 read=False: 안내 뒤 break, release와 창 정리.
3. read=True, q 입력: 한 프레임 변환·표시 호출 뒤 break, release와 창 정리.

실제 장치 권한·드라이버·GUI 표시·영상 품질은 이 카드와 별도로 확인한다.
