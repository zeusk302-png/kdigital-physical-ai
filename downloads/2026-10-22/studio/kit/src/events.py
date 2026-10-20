"""프레임 사이 기억을 유지하고 '변하는 순간'만 사건으로 만듭니다."""
from .zones import bottom_center, inside, side


class EventEngine:
    def __init__(self, zone, line_x, margin=8, max_gap=15):
        self.zone, self.line_x = zone, line_x
        self.margin, self.max_gap = margin, max_gap
        self.states = {}

    def update(self, frame_index, observations):
        events, warnings, seen = [], [], set()
        # 오래 보이지 않은 ID는 기억에서 제거합니다. 다시 오면 신규 관찰입니다.
        for tid in list(self.states):
            if frame_index - self.states[tid]['last'] > self.max_gap:
                del self.states[tid]
                warnings.append(f'lost_id:{tid}')
        for item in observations:
            tid = item.track_id
            if tid in seen:
                warnings.append(f'duplicate_id:{tid}')
                continue  # 같은 프레임에 같은 ID가 두 번 있어도 사건을 중복 발행하지 않음
            seen.add(tid)
            point = bottom_center(item.xyxy)
            current_inside = inside(point, self.zone)
            current_side = side(point, self.line_x, self.margin)
            previous = self.states.get(tid)
            # 첫 관찰이 이미 구역 안이면 entered가 아닌 first_seen_inside입니다.
            if previous is None and current_inside:
                events.append({'type': 'first_seen_inside', 'track_id': tid})
            elif previous is not None and current_inside and not previous['inside']:
                events.append({'type': 'entered', 'track_id': tid})
            if (previous is not None and current_side and previous['side']
                    and current_side != previous['side']):
                direction = 'left_to_right' if current_side == 1 else 'right_to_left'
                events.append({'type': 'crossed', 'track_id': tid, 'direction': direction})
            # 선 주변의 0 영역에서는 직전에 확정한 쪽을 기억합니다.
            remembered_side = current_side or (previous['side'] if previous else 0)
            self.states[tid] = {'inside': current_inside, 'side': remembered_side,
                                'last': frame_index}
        return events, warnings
