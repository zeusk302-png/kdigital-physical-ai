(() => {
  'use strict';
  const ids=['project','user','problem','inputs','outputs','priority','layout','normal','failure','scope','extra','evidence-mode','next','result'];
  const checks=['check-meaning','check-response','check-offline'];
  const el=id=>document.getElementById(id),key='kdigital-dashboard-workbook-v1';
  const canvas=el('sketch'),ctx=canvas.getContext('2d');let strokes=[],current=null;
  const status=text=>el('draft-status').textContent=text;
  function paint() {
    ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.strokeStyle='#173c2c';ctx.lineCap='round';ctx.lineJoin='round';
    for(const stroke of strokes){ctx.lineWidth=stroke.width;ctx.beginPath();stroke.points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));if(stroke.points.length===1)ctx.lineTo(stroke.points[0].x+.1,stroke.points[0].y);ctx.stroke();}
  }
  function save() {
    const fields=Object.fromEntries(ids.map(id=>[id,el(id).value])),flags=Object.fromEntries(checks.map(id=>[id,el(id).checked]));
    try { localStorage.setItem(key,JSON.stringify({fields,flags,strokes}));status('이 브라우저에 자동 저장했습니다. 파일도 내려받아 보관하세요.'); }
    catch {status('브라우저 자동 저장이 제한됩니다. MD와 PNG를 내려받아 보관하세요.');}
  }
  try {
    const draft=JSON.parse(localStorage.getItem(key)||'null');
    if(draft){for(const id of ids)if(typeof draft.fields?.[id]==='string')el(id).value=draft.fields[id];for(const id of checks)el(id).checked=draft.flags?.[id]===true;
      if(Array.isArray(draft.strokes))strokes=draft.strokes.filter(s=>Number.isFinite(s.width)&&s.width>=1&&s.width<=9&&Array.isArray(s.points)).slice(-200).map(s=>({width:s.width,points:s.points.filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)).slice(0,5000)}));status('이 브라우저에 저장한 작성 내용을 불러왔습니다.');}
  } catch {status('이전 작성 내용을 불러올 수 없습니다. 다운로드로 보관해 주세요.');}
  paint();
  for(const id of [...ids,...checks])el(id).addEventListener('input',save);
  function point(event){const rect=canvas.getBoundingClientRect();return {x:Math.max(0,Math.min(canvas.width,(event.clientX-rect.left)/rect.width*canvas.width)),y:Math.max(0,Math.min(canvas.height,(event.clientY-rect.top)/rect.height*canvas.height))};}
  canvas.addEventListener('pointerdown',event=>{event.preventDefault();canvas.setPointerCapture(event.pointerId);current={width:Number(el('pen-size').value),points:[point(event)]};strokes.push(current);if(strokes.length>200)strokes.shift();paint();});
  canvas.addEventListener('pointermove',event=>{if(!current)return;current.points.push(point(event));if(current.points.length>5000)current.points.splice(1,1);paint();});
  function finish(){if(current){current=null;save();}}
  canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);
  el('undo-drawing').addEventListener('click',()=>{strokes.pop();current=null;paint();save();});
  function filename(){return (el('project').value.trim()||'나의대시보드').replace(/[<>:"/\\|?*\x00-\x1f]/g,'_').slice(0,80);}
  function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  el('download-md').addEventListener('click',()=>{
    const labels={project:'작품명',user:'사용자',problem:'해결할 상황',inputs:'실제 입력·단위',outputs:'출력·조작',priority:'핵심 정보와 이유',layout:'스타일·배치',normal:'정상 상태',failure:'실패 상태',scope:'필수 기능',extra:'추가 도전','evidence-mode':'확인 범위',next:'다음 확인',result:'예상·실제·고친 오류'};
    const lines=['# 나의 대시보드 설계·결과','',...ids.flatMap(id=>['## '+labels[id],'',el(id).value.trim()||'미작성','']),
      '## 자기 점검','',...checks.map(id=>'- ['+(el(id).checked?'x':' ')+'] '+el(id).parentElement.textContent.trim()),'',
      '## AI 구현 시 유지할 조건','','P01 핀·115200·JSON 필드·요청번호·DOM id·data-command를 유지합니다. 원시값을 lux로 바꾸지 않습니다. 연습 데이터와 실제 USB를 구별합니다. 명령 응답이 없으면 적용 여부 미확인으로 표시합니다. 스케치 PNG는 별도 첨부합니다.',''];
    download(new Blob([lines.join('\n')],{type:'text/markdown;charset=utf-8'}),filename()+'-설계.md');status('MD를 내려받았습니다. 스케치 PNG도 별도로 보관하세요.');
  });
  el('download-png').addEventListener('click',()=>canvas.toBlob(blob=>{if(blob){download(blob,filename()+'-스케치.png');status('스케치 PNG를 내려받았습니다.');}},'image/png'));
  el('print').addEventListener('click',()=>window.print());
  window.addEventListener('beforeprint',()=>document.querySelectorAll('textarea').forEach(n=>{n.style.height=n.scrollHeight+'px';}));
  window.addEventListener('afterprint',()=>document.querySelectorAll('textarea').forEach(n=>{n.style.height='';}));
})();
