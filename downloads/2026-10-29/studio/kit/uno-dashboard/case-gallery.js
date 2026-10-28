(() => {
  'use strict';
  const cases=window.DASHBOARD_CASES,el=id=>document.getElementById(id),grid=el('case-grid'),dialog=el('case-detail');
  const key='kdigital-dashboard-cases-v1';let selected=new Set(),memos={},current=null,canSave=true;
  try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved){selected=new Set(Array.isArray(saved.selected)?saved.selected.filter(id=>cases.some(c=>c.id===id)):[]);memos=saved.memos&&typeof saved.memos==='object'?saved.memos:{};}}catch{canSave=false;}
  const text=(tag,value,className)=>{const n=document.createElement(tag);n.textContent=value;if(className)n.className=className;return n;};
  function save(){try{localStorage.setItem(key,JSON.stringify({selected:[...selected],memos}));canSave=true;}catch{canSave=false;}updateStatus();}
  function updateStatus(){el('case-status').textContent=`선택 ${selected.size}개 · ${canSave?'선택·메모는 이 브라우저에 저장합니다.':'브라우저 저장이 제한됩니다. MD로 내려받아 보관하세요.'}`;}
  function detail(c){
    current=c;el('case-detail-label').textContent=c.id+' · '+c.category;el('case-detail-title').textContent=c.title;
    el('case-detail-image').src=c.preview;el('case-detail-image').alt=c.title+' 공식 공개 자료 축소 화면';el('case-image-caption').textContent=c.preview_note;
    const list=el('case-detail-notes');list.replaceChildren();
    for(const [title,key] of [['사용자가 할 판단','purpose'],['화면 구성','layout'],['배울 원칙','principle'],['P01에 적용','transfer'],['적용 범위','caution'],['학생 질문','question']])list.append(text('dt',title),text('dd',c[key]));
    const refs=text('dd','');for(const s of c.standards||[]){const a=text('a',s.label);a.href='standards-lab.html#'+s.id;refs.append(a,document.createTextNode(' · '));}list.append(text('dt','관련 기준 · 관찰 관점'),refs);
    for(const [title,key] of [['관찰 포인트','standard_observation'],['내 화면 수정 과제','standard_change_task'],['확인할 근거','standard_evidence']])list.append(text('dt',title),text('dd',c[key]||'수업 적용표 참고'));
    el('case-source').href=c.source_url;el('case-original').href=c.source_image_url;el('case-memo').value=typeof memos[c.id]==='string'?memos[c.id]:'';
    dialog.showModal();
  }
  function render(){
    const q=el('case-search').value.trim().toLowerCase(),category=el('case-category').value,only=el('case-picked-only').checked;
    const found=cases.filter(c=>(category==='all'||c.category===category)&&(!only||selected.has(c.id))&&[...Object.values(c),...(c.standards||[]).map(s=>s.label)].join(' ').toLowerCase().includes(q));
    grid.replaceChildren();
    for(const c of found){
      const card=text('article','', 'case-card');card.id=c.id;
      const preview=text('button','','case-preview');preview.type='button';preview.setAttribute('aria-label',c.title+' 상세 보기');
      const img=document.createElement('img');img.src=c.preview;img.alt=c.title+' 공식 공개 자료 축소 화면';img.width=768;img.height=480;img.loading='lazy';preview.append(img,text('span','화면·해설 크게 보기'));preview.addEventListener('click',()=>detail(c));
      const body=text('div','','case-body');body.append(text('p',c.id+' · '+c.category,'case-kicker'),text('h2',c.title),text('p',c.purpose),text('p','디자인 원칙: '+c.principle),text('p','내 키트에 적용: '+c.transfer,'transfer'));
      body.append(text('p','관련 기준: '+(c.standards||[]).map(s=>s.label).join(' / ')));
      const actions=text('div','','case-actions'),label=text('label','');const input=document.createElement('input');input.type='checkbox';input.checked=selected.has(c.id);input.dataset.case=c.id;input.addEventListener('change',()=>{if(input.checked)selected.add(c.id);else selected.delete(c.id);save();if(only)render();});label.append(input,document.createTextNode('스케치에 참고'));
      const open=text('button','질문·적용 범위 보기');open.type='button';open.addEventListener('click',()=>detail(c));actions.append(label,open);body.append(actions);
      const source=text('p','','case-source-line'),link=text('a','공식 출처 ↗');link.href=c.source_url;link.target='_blank';link.rel='noopener';source.append(link,document.createTextNode(' · 확인 '+c.checked_on));body.append(source);card.append(preview,body);grid.append(card);
    }
    el('case-count').textContent=`전체 20개 중 ${found.length}개 표시`;el('case-empty').hidden=found.length!==0;updateStatus();
  }
  for(const id of ['case-search','case-category','case-picked-only'])el(id).addEventListener('input',render);
  el('close-case').addEventListener('click',()=>dialog.close());
  el('case-memo').addEventListener('input',()=>{if(current){memos[current.id]=el('case-memo').value;save();}});
  el('export-cases').addEventListener('click',()=>{
    const chosen=cases.filter(c=>selected.has(c.id));
    if(!chosen.length){el('case-status').textContent='스케치에 참고할 사례를 먼저 선택하세요.';return;}
    const content=['# 내가 고른 대시보드 사례','',...chosen.flatMap(c=>['## '+c.id+' · '+c.title,'','공식 출처: '+c.source_url,'','배울 원칙: '+c.principle,'','P01 적용 아이디어: '+c.transfer,'','적용 범위: '+c.caution,'','관련 기준(관찰 관점): '+(c.standards||[]).map(s=>s.label+' '+s.url).join(' / '),'','관찰 포인트: '+c.standard_observation,'','내 화면 수정 과제: '+c.standard_change_task,'','확인할 근거: '+c.standard_evidence,'','나의 메모: '+(memos[c.id]||'아직 작성하지 않음'), '']),
      '## AI에게 전달할 조건','','선택한 원칙을 내 스케치와 실제 부품에 맞게 적용합니다. P01 핀·115200·JSON·DOM id·data-command는 유지하고 원시값·실제 측정·연습 자료를 구별합니다.',''].join('\n');
    const url=URL.createObjectURL(new Blob([content],{type:'text/markdown;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='나의-대시보드-참고사례.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);el('case-status').textContent=`선택한 ${chosen.length}개 사례와 메모를 MD로 내려받았습니다.`;
  });
  render();const hash=location.hash.slice(1),initial=cases.find(c=>c.id===hash);if(initial)detail(initial);
})();
