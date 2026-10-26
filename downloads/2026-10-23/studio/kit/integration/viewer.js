/* Offline source viewer. No network calls, user accounts or physical IO. */
const kit=window.KIT_INTEGRATION;
const $=s=>document.querySelector(s);
if(location.protocol==='file:'){$('#download-links').hidden=true;$('#offline-note').hidden=false;}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let lab,step=0,showHeld=false;
function photo(p){return `<div class="part"><svg viewBox="${p.crop.join(' ')}" role="img" aria-label="${esc(p.name)}"><image href="assets/seller-kit.jpg" width="680" height="7345"/></svg><p>${esc(p.name)}</p></div>`;}
for(const prefix of ['P','K']){
 const group=document.createElement('optgroup');group.label=prefix==='P'?'함께 연결하는 통합 회로':'부품별 교체 회로';
 for(const l of kit.labs.filter(l=>l.id.startsWith(prefix))){const o=document.createElement('option');o.value=l.id;o.textContent=l.id+' · '+l.title;group.append(o);}
 $('#lab').append(group);
}
function select(id){
 lab=kit.labs.find(l=>l.id===id)||kit.labs[0];step=0;showHeld=false;$('#lab').value=lab.id;
 $('#title').textContent=lab.id+' · '+lab.title;$('#concept').textContent=lab.concept;$('#gate').textContent=lab.gate;
 $('#photos').innerHTML=lab.parts.map(id=>photo(kit.parts[id])).join('');
 $('#library').textContent='라이브러리: '+(lab.library||'추가 설치 없음');
 $('#md').href=(lab.id.startsWith('P')?'profiles/':'modules/')+lab.id+'.md';$('#svg').href='diagrams/'+lab.id+'.svg';
 $('#ino').hidden=lab.id==='K27';$('#ino').href=(lab.id.startsWith('P')?'firmware/':'reference-sketches/')+lab.id+'/'+lab.id+'.ino';
 $('#range').max=lab.operations.length;
 $('#steps').innerHTML=lab.operations.map(o=>`<li>${esc(o.title)} — ${esc(o.text)}</li>`).join('');
 $('#diagram').innerHTML=lab.svg;render();
}
function render(){
 const current=step?lab.operations[step-1]:null;
 $('#count').textContent=`준비 포함 ${step+1} / ${lab.operations.length+1}`;
 $('#stepTitle').textContent=current?current.title:'USB와 모든 전원을 분리하고 방향을 맞추세요.';
 $('#stepText').textContent=current?current.text:lab.orientation;
 $('#range').value=step;$('#prev').disabled=step===0;$('#next').disabled=step===lab.operations.length;
 for(const g of $('#diagram').querySelectorAll('[data-op]')){const n=Number(g.dataset.op);g.style.display=n<=step&&(!g.dataset.held||g.dataset.held!=='true'||showHeld)?'':'none';g.classList.toggle('focus',n===step);}
 $('#plan').textContent=showHeld?'오늘 배선만 보기':'조건부 설계도 보기';
 const url=new URL(location.href);url.searchParams.set('lab',lab.id);url.searchParams.set('step',step);
 try{history.replaceState(null,'',url);}catch{}
}
$('#prev').onclick=()=>{if(step)step--;render();};$('#next').onclick=()=>{if(step<lab.operations.length)step++;render();};
$('#complete').onclick=()=>{step=lab.operations.length;render();};$('#start').onclick=()=>{step=0;render();};
$('#plan').onclick=()=>{showHeld=!showHeld;render();};
$('#range').oninput=e=>{step=Number(e.target.value);render();};$('#lab').onchange=e=>select(e.target.value);
$('#allParts').innerHTML=kit.parts.map(photo).join('');
const initial=new URLSearchParams(location.search);select(initial.get('lab')||'P01');
const requested=Number(initial.get('step'));if(Number.isInteger(requested)&&requested>=0&&requested<=lab.operations.length){step=requested;render();}
