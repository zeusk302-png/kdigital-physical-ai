"""네트워크에서 받을 한 사건의 형식입니다. 값 누락과 0을 구분합니다."""
from datetime import datetime, timezone, timedelta
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, field_validator

class Event(BaseModel):
    # 알 수 없는 필드를 조용히 버리지 않고 잘못된 요청으로 안내합니다.
    model_config = ConfigDict(extra="forbid")
    event_id: str = Field(min_length=1,max_length=120)
    device_id: str = Field(min_length=1,max_length=80)
    kind: str = Field(min_length=1,max_length=80)
    value: float | None = None
    occurred_at: datetime
    level: Literal["info", "warning"] = "info"

    @field_validator("event_id", "device_id", "kind")
    @classmethod
    def nonblank(cls, value):
        value=value.strip()
        if not value:
            raise ValueError("빈 식별자는 사용할 수 없습니다.")
        return value

    @field_validator("value", mode="before")
    @classmethod
    def numeric(cls,value):
        # bool은 숫자처럼 보일 수 있으나 측정값 True를 허용하지 않습니다.
        import math
        if value is not None and (type(value) not in (int,float) or not math.isfinite(value)):
            raise ValueError("측정값은 유한한 숫자 또는 null이어야 합니다.")
        return value

    @field_validator("occurred_at")
    @classmethod
    def with_timezone(cls,value):
        if value.tzinfo is None:
            raise ValueError("시각에는 시간대가 필요합니다.")
        if value > datetime.now(timezone.utc)+timedelta(seconds=30):
            raise ValueError("미래 시각입니다. 장치 시계를 확인하세요.")
        return value.astimezone(timezone.utc)
