"""명령 검사 → 실행 → 정지 → 상태 기록. 예외나 Ctrl+C에도 정지를 요청합니다."""
import time
from .commands import validate_sequence


def run(commands, adapter, wait=time.sleep):
    # 시퀀스 전체를 먼저 검사하므로 마지막 명령 오타로 앞부분이 먼저 움직이지 않습니다.
    state = {'mode': 'dryrun' if adapter.__class__.__name__ == 'DryRun' else 'hardware',
             'status': 'ready', 'completed': 0, 'feedback': 'command-only'}
    try:
        checked = validate_sequence(commands)
        for command in checked:
            state['status'] = command['action']
            adapter.execute(command)
            if command['action'] != 'stop':
                wait(command['seconds'])
            adapter.stop()  # 다음 명령 전에 주행 출력을 끕니다.
            state['completed'] += 1
        state['status'] = 'completed'
        return state
    finally:
        # 프로그램 강제 종료·전원 상실까지 보장하는 하드웨어 비상정지가 아닙니다.
        try:
            adapter.stop()
        finally:
            adapter.close()
