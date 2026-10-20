"""실제 수신 → 검사 → SQLite → 조회 → React 화면의 입구입니다."""
from pathlib import Path
from datetime import datetime,timezone
import os,time
from fastapi import FastAPI,HTTPException,Query
from fastapi.staticfiles import StaticFiles
from .models import Event
from .store import Store

ROOT=Path(__file__).resolve().parents[2]

def create_app(db_path=None):
    app=FastAPI(title="나의 웹 대시보드")
    store=Store(db_path or os.environ.get("STUDIO_DB",str(ROOT/"runtime/events.sqlite3")))
    app.state.store=store

    @app.post("/api/events",status_code=201)
    def receive(event:Event):
        try:
            created=store.append(event,time.time())
        except ValueError as error:
            raise HTTPException(409,str(error))
        return {"created":created,"event_id":event.event_id}

    @app.get("/api/events")
    def history(minutes:int=Query(60,ge=1,le=10080),device:str=""):
        now=time.time()
        rows=store.query(now-minutes*60,now,device)
        truncated=len(rows)>5000;rows=rows[:5000]
        # 최신값은 도착 순서가 아니라 측정 시각으로 결정합니다.
        latest={}
        for row in rows:
            key=(row["device_id"],row["kind"])
            if key not in latest:latest[key]=row
        nums=[r["value"] for r in rows if r["value"] is not None]
        warnings=sum(r["level"]=="warning" for r in rows)
        last=max((r["received_at"] for r in rows),default=None)
        return {"server_time":now,"minutes":minutes,"device":device,"rows":rows,
                "latest":list(latest.values()),"count":len(rows),"warnings":warnings,
                "average":sum(nums)/len(nums) if nums else None,
                "last_received_at":last,"truncated":truncated}

    # 이 앱은 별도 프런트 서버 없이 같은 주소로 파일을 제공합니다.
    app.mount("/",StaticFiles(directory=ROOT/"web",html=True),name="web")
    return app

app=create_app()
