import unittest,json
from datetime import datetime,timezone
from pc.collect import parse_reading
from pc.robot_pulse import pulse
class Tests(unittest.TestCase):
 def row(self,**changes):
  d=dict(seq=1,uptime_ms=100,kind='distance_cm',value=20,status='normal');d.update(changes);return json.dumps(d)
 def test_zero_not_valid_distance(self):
  with self.assertRaises(ValueError):parse_reading(self.row(value=0),'d','s')
 def test_fault_keeps_missing(self):
  self.assertIsNone(parse_reading(self.row(value=None,status='fault'),'d','s')['value'])
 def test_boolean_rejected(self):
  with self.assertRaises(ValueError):parse_reading(self.row(value=True),'d','s')
 def test_same_session_dedup_identity(self):
  self.assertEqual(parse_reading(self.row(),'d','s')['event_id'],'d:s:1')
 def test_pc_timestamp(self):
  at=datetime(2026,10,20,tzinfo=timezone.utc)
  self.assertEqual(parse_reading(self.row(),'d','s',at)['occurred_at'],at.isoformat())
 def test_finally_stops_every_motor(self):
  class Driver:
   calls=[]
   def Ctrl_Car(self,mid,direction,speed):
    self.calls.append((mid,speed))
    if speed:raise OSError('test communication failure')
  car=Driver()
  with self.assertRaises(OSError):pulse(car,0,30,.01)
  self.assertEqual(car.calls[-4:],[(0,0),(1,0),(2,0),(3,0)])
 def test_duration_rejected(self):
  with self.assertRaises(ValueError):pulse(None,0,30,3)
