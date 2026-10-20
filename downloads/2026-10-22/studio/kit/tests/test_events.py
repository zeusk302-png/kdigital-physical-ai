import unittest
from src.events import EventEngine
from src.tracker import Observation


def item(tid, x, y=0.8):
    return Observation(tid, (x-.02, y-.1, x+.02, y))


class EventTests(unittest.TestCase):
    def setUp(self):
        self.engine = EventEngine((.3, .2, .8, .95), .5, .02, 3)

    def update(self, n, items):
        return self.engine.update(n, items)

    def test_staying_is_not_repeated_entry(self):
        self.update(0, [item(1, .1)])
        events, _ = self.update(1, [item(1, .4)])
        self.assertEqual([e['type'] for e in events], ['entered'])
        self.assertEqual(self.update(2, [item(1, .4)])[0], [])

    def test_exit_reentry_is_new_event(self):
        self.update(0, [item(1, .4)])
        self.update(1, [item(1, .1)])
        self.assertEqual(self.update(2, [item(1, .4)])[0][0]['type'], 'entered')

    def test_same_frame_duplicate_is_warning(self):
        events, warnings = self.update(0, [item(1, .4), item(1, .4)])
        self.assertEqual(len(events), 1)
        self.assertEqual(warnings, ['duplicate_id:1'])

    def test_expired_id_is_new_observation_not_certified_entry(self):
        self.update(0, [item(1, .1)])
        events, warnings = self.update(4, [item(1, .4)])
        self.assertEqual(events[0]['type'], 'first_seen_inside')
        self.assertEqual(warnings, ['lost_id:1'])

    def test_short_gap_remembers_state(self):
        self.update(0, [item(1, .4)])
        self.update(1, [])
        self.assertEqual(self.update(2, [item(1, .4)])[0], [])

    def test_boundary_jitter_is_not_crossing(self):
        self.update(0, [item(1, .47)])
        for n, x in enumerate([.49, .51, .50], 1):
            self.assertFalse(any(e['type']=='crossed' for e in self.update(n, [item(1, x)])[0]))
        crossed = self.update(4, [item(1, .54)])[0]
        self.assertEqual(crossed[0]['direction'], 'left_to_right')

    def test_replaced_id_not_same_person(self):
        self.update(0, [item(1, .4)])
        events, _ = self.update(1, [item(99, .4)])
        self.assertEqual(events[0]['type'], 'first_seen_inside')

    def test_no_detections_expire_memory(self):
        self.update(0, [item(1, .4)])
        self.assertEqual(self.update(4, [])[1], ['lost_id:1'])
        self.assertEqual(self.engine.states, {})


if __name__ == '__main__':
    unittest.main()
