"""기획의 문서 연결을 보조 점검합니다. 사업성·근거의 진실성을 자동 판정하지 않습니다."""
from pathlib import Path
import argparse,re

REQUIRED=('problem','research','requirements','user-flow','data-design','architecture','validation','roadmap','risks')
def inspect(root):
    root=Path(root);issues=[];texts={}
    for name in REQUIRED:
        file=root/'docs'/f'{name}.md'
        if not file.is_file():issues.append(f'빠진 문서: {file.name}');continue
        text=file.read_text(encoding='utf-8');texts[name]=text
        if '[작성]' in text:issues.append(f'미작성 표시: {file.name}')
        if len(text.strip())<40:issues.append(f'내용 확인 필요: {file.name}')
    reqs=re.findall(r'^\|\s*(R\d+)\s*\|',texts.get('requirements',''),re.M)
    if not reqs:issues.append('요구번호가 없습니다: R01 형식')
    if len(reqs)!=len(set(reqs)):issues.append('중복 요구번호')
    for name,code in [('validation','시험'),('roadmap','작업')]:
        refs=set(re.findall(r'\bR\d+\b',texts.get(name,'')))
        for missing in sorted(set(reqs)-refs):issues.append(f'{code} 연결 없음: {missing}')
        for unknown in sorted(refs-set(reqs)):issues.append(f'{code}에 없는 요구 참조: {unknown}')
    return issues

def main():
    p=argparse.ArgumentParser();p.add_argument('root',nargs='?',default='.')
    issues=inspect(p.parse_args().root)
    print('\n'.join(issues) if issues else '문서 연결 점검 통과. 근거·설계·실행은 별도로 검토하세요.')
    return 1 if issues else 0
if __name__=='__main__':raise SystemExit(main())
