"""실제 강의 DB 대신 임시 폴더에서 API와 DB 계약을 시험합니다."""
import tempfile,unittest
from pathlib import Path
from datetime import datetime,timezone,timedelta
from fastapi.testclient import TestClient
from app.main import create_app

class ApiTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        self.db=Path(self.tmp.name)/"events.sqlite3"
        self.client=TestClient(create_app(self.db))
        self.event={"event_id":"one","device_id":"robot-a","kind":"speed",
                    "value":0,"occurred_at":datetime.now(timezone.utc).isoformat(),"level":"info"}

    def test_empty(self):
        body=self.client.get('/api/events').json()
        self.assertEqual(body['count'],0);self.assertIsNone(body['average'])

    def test_zero_and_persistence(self):
        self.assertEqual(self.client.post('/api/events',json=self.event).status_code,201)
        other=TestClient(create_app(self.db))
        body=other.get('/api/events').json()
        self.assertEqual(body['count'],1);self.assertEqual(body['average'],0)

    def test_duplicate_and_conflict(self):
        self.client.post('/api/events',json=self.event)
        self.assertFalse(self.client.post('/api/events',json=self.event).json()['created'])
        self.assertEqual(self.client.post('/api/events',json={**self.event,'value':4}).status_code,409)
        self.assertEqual(self.client.get('/api/events').json()['count'],1)

    def test_invalid(self):
        for change in [{'value':True},{'value':'3'},{'device_id':' '},
                       {'occurred_at':'2026-01-01T00:00:00'}, {'extra':'bad'}]:
            self.assertEqual(self.client.post('/api/events',json={**self.event,**change}).status_code,422)

    def test_null_not_zero(self):
        self.client.post('/api/events',json={**self.event,'value':None})
        self.assertIsNone(self.client.get('/api/events').json()['average'])

    def test_out_of_order(self):
        self.client.post('/api/events',json=self.event)
        past={**self.event,'event_id':'past','value':99,
              'occurred_at':(datetime.now(timezone.utc)-timedelta(minutes=2)).isoformat()}
        self.client.post('/api/events',json=past)
        self.assertEqual(self.client.get('/api/events').json()['latest'][0]['value'],0)

    def test_device_filter(self):
        self.client.post('/api/events',json=self.event)
        self.assertEqual(self.client.get('/api/events?device=other').json()['count'],0)
        self.assertEqual(self.client.get('/api/events?minutes=0').status_code,422)

if __name__=='__main__':unittest.main()
