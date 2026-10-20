"""실물과 모의 실행을 나눕니다. 파일을 읽는 행위와 import/실행은 다릅니다."""
import hashlib
import importlib.util
import platform
from pathlib import Path


class DryRun:
    """장치 없이 명령과 상태 변경을 남깁니다. 실물 센서 피드백이 아닙니다."""
    def __init__(self):
        self.events = []

    def execute(self, command):
        self.events.append(command.copy())

    def stop(self):
        self.events.append({'action': 'stop'})

    def close(self):
        pass


class AdeeptDrive:
    """공식 move.py만 연결합니다. 생성 시 setup()이 전기 출력을 초기화합니다."""
    def __init__(self, board, vendor_file, expected_sha256, confirmed=False):
        if not confirmed or board not in ('green', 'purple'):
            raise ValueError('실물 확인 및 green/purple 선택이 필요합니다')
        if platform.system() != 'Linux':
            raise RuntimeError('실물 어댑터는 준비된 Raspberry Pi에서만 실행합니다')
        path = Path(vendor_file).resolve()
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        if len(expected_sha256) != 64 or digest != expected_sha256:
            raise ValueError('강사가 검토한 공식 파일 해시와 일치하지 않습니다')
        spec = importlib.util.spec_from_file_location('reviewed_adeept_move', path)
        self.module = importlib.util.module_from_spec(spec)
        self.board = board
        # import 뒤 setup 전에 실패하면 통전 성공이라고 표시하지 않습니다.
        spec.loader.exec_module(self.module)
        try:
            self.module.setup()
            self.module.motorStop()
        except BaseException:
            # 초기화가 일부만 끝났을 수도 있습니다. 정지도 실패할 수 있으므로 원인 확인 필수.
            try:
                self.module.motorStop()
            except Exception:
                pass
            raise

    def execute(self, command):
        action = command['action']
        if action == 'servo':
            raise ValueError('실물 서보는 기구 보정 전 연결하지 않습니다. docs/hardware.md 참조')
        if action == 'stop':
            self.stop()
        elif self.board == 'green':
            direction = action if action in ('forward', 'backward') else 'no'
            turn = action if action in ('left', 'right') else 'no'
            self.module.move(command['speed'], direction, turn)
        else:
            direction = -1 if action == 'backward' else 1
            turn = action if action in ('left', 'right') else 'mid'
            self.module.move(command['speed'], direction, turn)

    def stop(self):
        self.module.motorStop()

    def close(self):
        self.module.destroy()
