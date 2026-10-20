"""학생이 편집할 명령의 모양과 검사 규칙. 숫자는 실물 안전 보증이 아닙니다."""
import math


def validate(command):
    # dict는 이름표와 값을 묶는 사전입니다. 모든 명령을 실행 전에 검사합니다.
    if not isinstance(command, dict):
        raise ValueError('명령은 JSON 객체여야 합니다')
    action = command.get('action')
    if action not in ('forward', 'backward', 'left', 'right', 'stop', 'servo'):
        raise ValueError('알 수 없는 action')
    required = {'action'} if action == 'stop' else (
        {'action', 'joint', 'position', 'seconds'} if action == 'servo'
        else {'action', 'speed', 'seconds'})
    if set(command) != required:
        raise ValueError('명령 필드가 없거나 불필요한 필드가 있습니다')
    for key in required - {'action', 'joint'}:
        value = command[key]
        if type(value) not in (int, float) or not math.isfinite(value):
            raise ValueError(key + ': 유한한 숫자가 필요합니다')
    if action != 'stop' and not 0.05 <= command['seconds'] <= 2:
        raise ValueError('seconds는 수업용 0.05~2 범위입니다')
    if action == 'servo':
        if command['joint'] not in ('arm', 'gripper'):
            raise ValueError('joint는 arm 또는 gripper입니다')
        if not 0 <= command['position'] <= 1:
            raise ValueError('position은 모의 위치 0~1입니다. 실제 각도가 아닙니다')
    elif action != 'stop' and not 0 <= command['speed'] <= 30:
        raise ValueError('speed는 수업용 0~30 범위입니다')
    return command.copy()


def validate_sequence(commands):
    if not isinstance(commands, list) or not 1 <= len(commands) <= 20:
        raise ValueError('시퀀스는 1~20개 명령 목록입니다')
    checked = [validate(command) for command in commands]
    if sum(command.get('seconds', 0) for command in checked) > 15:
        raise ValueError('총 동작 배정은 15초 이하여야 합니다')
    return checked
