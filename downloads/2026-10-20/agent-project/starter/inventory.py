"""장비 수량과 JSON 저장. 화면 코드 없이도 시험할 수 있습니다."""
import json
from pathlib import Path


class Inventory:
    def __init__(self, path):
        # 실행 터미널의 위치가 아니라 전달받은 파일을 사용합니다.
        self.path = Path(path)
        self.items = json.loads(self.path.read_text(encoding="utf-8"))
        self._validate()

    def _validate(self):
        # True도 int의 일종이므로 type(...) is int로 정확히 검사합니다.
        if not isinstance(self.items, list):
            raise ValueError("장비 자료는 목록이어야 합니다.")
        seen = set()
        for item in self.items:
            if not isinstance(item, dict):
                raise ValueError("각 장비는 객체여야 합니다.")
            if not all(key in item for key in ("id", "name", "total", "available")):
                raise ValueError("장비 자료의 필드가 부족합니다.")
            if not isinstance(item["id"], str) or not item["id"].strip() or item["id"] in seen:
                raise ValueError("장비 번호는 비어 있지 않은 고유 문자열이어야 합니다.")
            if not isinstance(item["name"], str) or not item["name"].strip():
                raise ValueError("장비 이름을 확인하세요.")
            total, available = item["total"], item["available"]
            if type(total) is not int or type(available) is not int:
                raise ValueError("수량은 정수여야 합니다.")
            if not 0 <= available <= total:
                raise ValueError("남은 수량은0 이상 전체 수량 이하여야 합니다.")
            seen.add(item["id"])

    def find(self, item_id):
        # 화면에서는 이름을 보여 주지만 처리할 때는 고유 번호로 찾습니다.
        for item in self.items:
            if item["id"] == item_id:
                return item
        raise ValueError("장비를 선택하거나 올바른 장비 번호를 입력하세요.")

    def save(self):
        # 임시 파일에 전부 쓴 다음 교체해 쓰기 도중 원본 손상을 줄입니다.
        self._validate()
        temp = self.path.with_suffix(".tmp")
        temp.write_text(json.dumps(self.items, ensure_ascii=False, indent=2), encoding="utf-8")
        temp.replace(self.path)

    def _change(self, item, delta):
        before = item["available"]
        item["available"] += delta
        try:
            self.save()
        except OSError:
            # 파일 저장 실패 후 화면만 바뀐 상태가 되지 않게 복구합니다.
            item["available"] = before
            raise

    def checkout(self, item_id):
        # TODO: find로 장비 찾기 → 재고0 거부 → _change(item, -1).
        # E08의 작업 요청문을 작성하고 이 함수만 구현해 보세요.
        raise NotImplementedError("대여 기능은 아직 연결 전입니다.")

    def give_back(self, item_id):
        # TODO: 전체 수량일 때 반납 거부 → _change(item, 1).
        raise NotImplementedError("반납 기능은 아직 연결 전입니다.")
