# 설치·모델 운영과 복구
Python 3.12 64bit를 기준으로 README 명령을 순서대로 실행한다. pip 설치가 끝나지 않았으면 추론을 시작하지 않는다. 설치 실패 학생의 개념 과제는 동료 화면으로 이어간다.
직접 의존성은 requirements.txt에 고정했다. 추가 간접 의존성은 pip가 해석하므로 이 파일은 모든 OS를 보증하는 완전 잠금 파일이 아니다. 실제 교실 이미지에서 설치 후 pip freeze를 별도 runtime/install-lock.txt로 보관한다. 설치 검사 pip check를 실행한다.
이 제작 환경은 Python 3.12.7과 기존 torch 2.11.0+cu128/torchvision 0.26.0+cu128을 공유하는 검증용 가상환경을 사용했고 추론은 device=cpu로 강제했다. 학생의 깨끗한 가상환경 전체 재설치는 미확인이다. GPU 설정은 필수 경로에 포함하지 않는다.
prepare.py가 공식 Ultralytics assets의 yolo11n.pt를 runtime/models로 받는다. 38명 동시 다운로드 전 네트워크를 확인하고 권한 있는 사전배포를 준비한다. 파일 해시 확인: Get-FileHash runtime/models/yolo11n.pt -Algorithm SHA256. 동일 해시는 파일 일치 근거이며 현장 인식 품질 보증이 아니다.
모델 없음 오류는 prepare를 실행하고 정확한 작업 위치를 확인한다. ModuleNotFoundError는 .venv의 Python으로 실행했는지 확인한다. JSONDecodeError는 쉼표·큰따옴표·UTF-8 저장을 확인한다. 영상 열기 실패는 경로·손상·코덱·권한을 확인한다. 카메라 열기 실패는 다른 앱 종료→OS 카메라 권한→번호 0/1 확인 순서로 복구한다. 첫 카메라 영상이 나오지 않으면 파일 경로로 학습을 계속한다.
공식 출처 확인 2026-10-20: https://docs.ultralytics.com/modes/predict/ 와 https://docs.ultralytics.com/modes/track/ . 최신 문서는 기본 모델/추적기가 바뀔 수 있어 수업은 YOLO11n·ByteTrack·ultralytics 8.4.63을 명시한다. 버전 출처 https://pypi.org/project/ultralytics/8.4.63/ . 모델/코드의 배포·상용 이용에는 각 공식 라이선스를 확인한다.
