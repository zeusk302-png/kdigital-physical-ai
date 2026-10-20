"""실물 없이 잘못된 입력과 정지 경로, 리비전별 번역을 검사합니다."""
import unittest
from types import SimpleNamespace
from robotlab.commands import validate, validate_sequence
from robotlab.adapters import DryRun, AdeeptDrive
from robotlab.runner import run


class RobotTests(unittest.TestCase):
    def command(self, **changes):
        return dict({'action': 'forward', 'speed': 20, 'seconds': 0.1}, **changes)

    def test_success_and_final_stop(self):
        adapter = DryRun()
        state = run([self.command()], adapter, wait=lambda seconds: None)
        self.assertEqual(state['completed'], 1)
        self.assertEqual(state['feedback'], 'command-only')
        self.assertEqual(adapter.events[-1]['action'], 'stop')

    def test_bad_last_command_prevents_any_motion(self):
        adapter = DryRun()
        with self.assertRaises(ValueError):
            run([self.command(), {'action': 'unknown'}], adapter)
        self.assertTrue(all(e['action'] == 'stop' for e in adapter.events))

    def test_range_and_type(self):
        for changes in ({'speed': 31}, {'seconds': -1}, {'speed': True},
                        {'seconds': '0.1'}, {'speed': float('nan')}, {'pin': 2}):
            with self.subTest(changes=changes), self.assertRaises(ValueError):
                validate(self.command(**changes))

    def test_empty_long_total(self):
        for commands in ([], [self.command()] * 21, [self.command(seconds=2)] * 8):
            with self.assertRaises(ValueError):
                validate_sequence(commands)

    def test_servo_mock_contract(self):
        adapter = DryRun()
        run([{'action': 'servo', 'joint': 'arm', 'position': 0.4, 'seconds': 0.1}], adapter,
            wait=lambda seconds: None)
        self.assertEqual(adapter.events[0]['position'], 0.4)

    def test_interrupted_wait_stops(self):
        adapter = DryRun()
        def interrupt(seconds):
            raise KeyboardInterrupt()
        with self.assertRaises(KeyboardInterrupt):
            run([self.command()], adapter, wait=interrupt)
        self.assertEqual(adapter.events[-1], {'action': 'stop'})

    def test_execute_error_stops_and_closes(self):
        class Broken(DryRun):
            def execute(self, command):
                raise OSError('simulated driver error')
            def close(self):
                self.closed = True
        adapter = Broken()
        with self.assertRaises(OSError):
            run([self.command()], adapter)
        self.assertEqual(adapter.events[-1]['action'], 'stop')
        self.assertTrue(adapter.closed)

    def test_green_and_purple_mapping(self):
        # __new__는 초기화를 건너뜁니다. GPIO import나 setup을 실행하지 않습니다.
        for board, expected in [('green', (20, 'forward', 'no')),
                                ('purple', (20, 1, 'mid'))]:
            with self.subTest(board=board):
                calls = []
                adapter = AdeeptDrive.__new__(AdeeptDrive)
                adapter.board = board
                adapter.module = SimpleNamespace(move=lambda *args: calls.append(args))
                adapter.execute(self.command())
                self.assertEqual(calls, [expected])

    def test_turn_mapping(self):
        for board, expected in [('green', (20, 'no', 'left')),
                                ('purple', (20, 1, 'left'))]:
            calls = []
            adapter = AdeeptDrive.__new__(AdeeptDrive)
            adapter.board = board
            adapter.module = SimpleNamespace(move=lambda *args: calls.append(args))
            adapter.execute(self.command(action='left'))
            self.assertEqual(calls, [expected])

    def test_hardware_servo_rejected(self):
        adapter = AdeeptDrive.__new__(AdeeptDrive)
        with self.assertRaises(ValueError):
            adapter.execute({'action': 'servo'})

    def test_confirmation_required(self):
        with self.assertRaises(ValueError):
            AdeeptDrive('green', 'missing.py', '', confirmed=False)


if __name__ == '__main__':
    unittest.main()
