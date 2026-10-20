import sys,tempfile,unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'tools'))
from plan_check import inspect,REQUIRED

class PlanTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        self.root=Path(self.tmp.name);(self.root/'docs').mkdir()
        for name in REQUIRED:self.write(name,'# 내용\n'+('설계와 근거를 실제로 확인하여 기록합니다. '*4))
        self.write('requirements','| R01 | 행동 | 조건 | 결과 | 오류 |\n'+'실제 요구 설명 '*10)
        self.write('validation','| T01 | R01 | 입력 | 기대 | 결과 |\n'+'실제 시험 설명 '*10)
        self.write('roadmap','| W01 | R01 | 결과 | 담당 | 완료 |\n'+'실제 작업 설명 '*10)
    def write(self,name,text):(self.root/'docs'/f'{name}.md').write_text(text,encoding='utf-8')
    def test_connected(self):self.assertEqual(inspect(self.root),[])
    def test_missing(self):
        (self.root/'docs/problem.md').unlink()
        self.assertTrue(any('빠진 문서' in x for x in inspect(self.root)))
    def test_placeholder(self):
        self.write('problem','[작성]')
        self.assertTrue(any('미작성' in x for x in inspect(self.root)))
    def test_orphan(self):
        self.write('validation','| T01 | R99 |\n'+'시험 내용 '*10)
        issues=inspect(self.root)
        self.assertTrue(any('연결 없음' in x for x in issues));self.assertTrue(any('없는 요구' in x for x in issues))
    def test_duplicate(self):
        self.write('requirements','| R01 | 첫째 |\n| R01 | 둘째 |\n'+'상세 요구 '*10)
        self.assertIn('중복 요구번호',inspect(self.root))
if __name__=='__main__':unittest.main()
