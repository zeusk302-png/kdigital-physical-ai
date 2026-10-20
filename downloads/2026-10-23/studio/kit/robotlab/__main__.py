"""PC: python -m robotlab sequence.json. --hardware를 주지 않으면 모의 실행입니다."""
import argparse
import json
import signal
import sys
from pathlib import Path
from .adapters import DryRun, AdeeptDrive
from .commands import validate_sequence
from .runner import run


def main():
    # Windows 터미널과 기록 파일에서도 한국어 오류를 UTF-8로 읽도록 맞춥니다.
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, 'reconfigure'):
            stream.reconfigure(encoding='utf-8')
    parser = argparse.ArgumentParser(description='RaspTank 수업 명령 실행')
    parser.add_argument('sequence', type=Path)
    parser.add_argument('--hardware', action='store_true')
    parser.add_argument('--board', choices=['green', 'purple'])
    parser.add_argument('--vendor-file')
    parser.add_argument('--sha256')
    parser.add_argument('--confirmed', action='store_true')
    args = parser.parse_args()
    # 파일 읽기와 검사를 하드웨어 생성보다 먼저 끝냅니다.
    commands = validate_sequence(json.loads(args.sequence.read_text(encoding='utf-8')))
    if args.hardware and any(c['action'] == 'servo' for c in commands):
        parser.error('실물 servo 미보정: 모의 실행만 허용합니다')
    if args.hardware and not all((args.board, args.vendor_file, args.sha256, args.confirmed)):
        parser.error('board/vendor-file/sha256/confirmed가 모두 필요합니다')
    def interrupted(signum, frame):
        raise KeyboardInterrupt('중단 신호를 받았습니다')
    signal.signal(signal.SIGTERM, interrupted)
    adapter = AdeeptDrive(args.board, args.vendor_file, args.sha256, args.confirmed) if args.hardware else DryRun()
    try:
        state = run(commands, adapter)
        print(json.dumps(state, ensure_ascii=False))
        if isinstance(adapter, DryRun):
            print(json.dumps(adapter.events, ensure_ascii=False))
    except KeyboardInterrupt:
        print('중단: 정지 요청 후 종료. 실물 정지 여부는 관찰해야 합니다')
        raise SystemExit(130)


if __name__ == '__main__':
    main()
