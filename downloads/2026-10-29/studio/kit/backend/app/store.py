"""SQLite 저장·중복·시간 조회. SQL 값은 문자열 붙이기가 아닌 ?로 전달합니다."""
import sqlite3
from pathlib import Path
from contextlib import contextmanager

class Store:
    def __init__(self,path):
        self.path=Path(path)
        self.path.parent.mkdir(parents=True,exist_ok=True)
        with self.connect() as db:
            db.execute("""CREATE TABLE IF NOT EXISTS events(
                event_id TEXT PRIMARY KEY, device_id TEXT NOT NULL,
                kind TEXT NOT NULL, value REAL, occurred_at REAL NOT NULL,
                received_at REAL NOT NULL, level TEXT NOT NULL)""")
            db.execute("CREATE INDEX IF NOT EXISTS event_time ON events(occurred_at)")

    @contextmanager
    def connect(self):
        db=sqlite3.connect(self.path)
        db.row_factory=sqlite3.Row
        try:
            with db:
                yield db
        finally:
            db.close()

    def append(self,event,received_at):
        values=(event.event_id,event.device_id,event.kind,event.value,
                event.occurred_at.timestamp(),received_at,event.level)
        with self.connect() as db:
            old=db.execute("SELECT * FROM events WHERE event_id=?",(event.event_id,)).fetchone()
            if old:
                # 같은 ID·다른 내용은 충돌입니다. 재전송과 구분합니다.
                if tuple(old)[0:5]+tuple(old)[6:] != values[0:5]+values[6:]:
                    raise ValueError("같은 event_id의 내용이 다릅니다.")
                return False
            db.execute("INSERT INTO events VALUES(?,?,?,?,?,?,?)",values)
        return True

    def query(self,start,end,device=""):
        sql="SELECT * FROM events WHERE occurred_at>=? AND occurred_at<=?"
        args=[start,end]
        if device:
            sql+=" AND device_id=?";args.append(device)
        # 교육용 조회는 최근5000건. 잘린 사실도 응답에서 알립니다.
        sql+=" ORDER BY occurred_at DESC,event_id DESC LIMIT 5001"
        with self.connect() as db:
            return [dict(row) for row in db.execute(sql,args)]
