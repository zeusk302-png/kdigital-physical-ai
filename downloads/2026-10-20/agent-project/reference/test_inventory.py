"""원본 자료 대신 임시 폴더를 사용합니다. py -m unittest -v"""
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from inventory import Inventory


class InventoryTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.path = Path(self.temp.name) / "equipment.json"
        self.path.write_text(json.dumps([{"id":"A", "name":"카메라", "total":2, "available":1}]), encoding="utf-8")
        self.store = Inventory(self.path)

    def test_checkout_persists(self):
        self.store.checkout("A")
        self.assertEqual(Inventory(self.path).find("A")["available"], 0)

    def test_zero_unchanged(self):
        self.store.checkout("A")
        before = self.path.read_bytes()
        with self.assertRaises(ValueError):
            self.store.checkout("A")
        self.assertEqual(self.store.find("A")["available"], 0)
        self.assertEqual(self.path.read_bytes(), before)

    def test_return_limit(self):
        self.store.give_back("A")
        with self.assertRaises(ValueError):
            self.store.give_back("A")
        self.assertEqual(self.store.find("A")["available"], 2)

    def test_unknown_and_blank(self):
        before = self.path.read_bytes()
        for item_id in ("unknown", ""):
            with self.assertRaises(ValueError):
                self.store.checkout(item_id)
        self.assertEqual(self.path.read_bytes(), before)

    def test_invalid_json_preserved(self):
        self.path.write_text("{bad json", encoding="utf-8")
        before = self.path.read_bytes()
        with self.assertRaises(ValueError):
            Inventory(self.path)
        self.assertEqual(self.path.read_bytes(), before)

    def test_invalid_quantity(self):
        for quantity in (-1, 3, "1", True):
            self.path.write_text(json.dumps([{"id":"A", "name":"카메라", "total":2, "available":quantity}]), encoding="utf-8")
            with self.assertRaises(ValueError):
                Inventory(self.path)

    def test_save_failure_rolls_back(self):
        before = self.path.read_bytes()
        with patch.object(self.store, "save", side_effect=OSError("저장 실패")):
            with self.assertRaises(OSError):
                self.store.checkout("A")
        self.assertEqual(self.store.find("A")["available"], 1)
        self.assertEqual(self.path.read_bytes(), before)


if __name__ == "__main__":
    unittest.main()
