/* Electrical positions, teaching steps and downloadable code share data.json. */
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let data,lab,step=0,stages=[],completed={};
try{completed=JSON.parse(localStorage.getItem('uno-kit-completed')||'{}');}catch{}
const columns='ABCDEFGHIJ'.split('');
const X={A:510,B:538,C:566,D:594,E:622,F:738,G:766,H:794,I:822,J:850};
let minRow=1,maxRow=30,rowPitch=24;
const Y=n=>110+(n-minRow)*rowPitch;
const pinCoords={};
for(let d=0;d<8;d++)pinCoords['D'+d]=[197.972-d*7.2,7.2];
for(let d=8;d<14;d++)pinCoords['D'+d]=[136.051-(d-8)*7.2,7.2];
for(let a=0;a<6;a++)pinCoords['A'+a]=[161.972+a*7.2,144];
Object.assign(pinCoords,{'5V':[125.972,144],'3V3':[118.772,144],GND:[133.172,144]});
function point(id){if(id.startsWith('U:')){const p=pinCoords[id.slice(2)];if(!p)throw Error('Unknown UNO pin '+id);return[25+p[0]*340/212.372,230+p[1]*340/212.372];}const m=id.match(/^([A-J])(\d+)$/);if(!m)throw Error('Unknown hole '+id);return[X[m[1]],Y(+m[2])];}
function label(id){return id.replace('U:','UNO ');}
function photo(p){return `<svg viewBox="${p.crop.join(' ')}" role="img" aria-label="${esc(p.name)} 실물 상품 사진"><image href="assets/seller-kit.jpg" width="680" height="7345"/></svg>`;}
function partCard(p){return `<button class="part" data-part="${p.id}" aria-label="${esc(p.name)} 사진 확대">${photo(p)}<strong>${esc(p.name)}</strong><span>${p.lab} · 사진 확대 / 실습 열기</span></button>`;}
function photoEvents(root=document){root.querySelectorAll('[data-part]').forEach(b=>b.onclick=()=>{const p=data.parts[+b.dataset.part];$('#photo-title').textContent=p.name;$('#photo-large').innerHTML=photo(p);$('#photo-description').textContent=p.description;$('#photo-lab').href=`?lab=${p.lab}#workbench`;$('#photo-dialog').showModal();});}
function inventory(){const term=$('#part-search').value.trim().toLowerCase();const ps=data.parts.filter(p=>(p.name+' '+p.description).toLowerCase().includes(term));$('#part-grid').innerHTML=ps.map(partCard).join('');$('#no-parts').hidden=!!ps.length;photoEvents($('#part-grid'));}
function status(message){$('#toast').textContent=message;$('#toast').style.display='block';setTimeout(()=>$('#toast').style.display='none',2500);}
function dot(id,color='#d57832'){const[x,y]=point(id);return `<circle cx="${x}" cy="${y}" r="10" fill="white" stroke="${color}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="3" fill="${color}"/><rect x="${x-37}" y="${y-36}" width="74" height="21" rx="4" fill="${color}"/><text x="${x}" y="${y-21}" text-anchor="middle" fill="white" font-size="12" font-weight="700">${esc(label(id))}</text>`;}
function component(c,i,active,visiblePins=null){
 const pins=Object.entries(c.pins),coords=pins.map(([_,h])=>point(h));
 let s=`<g opacity="${active?1:.78}">`;
 if(c.kind==='resistor'&&coords.length===2){const[a,b]=coords,m=[(a[0]+b[0])/2,(a[1]+b[1])/2];const angle=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;s+=`<path d="M${a.join(' ')} L${b.join(' ')}" stroke="#909c8e" stroke-width="4"/><g transform="translate(${m.join(' ')}) rotate(${angle})"><rect x="-22" y="-8" width="44" height="16" rx="5" fill="#e5d1a4" stroke="#a18e65"/>${(c.name.includes("10k")?["#79503b","#222","#d87828","#b39b50"]:c.name.includes("2.2k")?["#c74538","#c74538","#c74538","#b39b50"]:c.name.includes("3.3k")?["#d87828","#d87828","#c74538","#b39b50"]:["#79503b","#222","#c74538","#b39b50"]).map((color,i)=>`<path d="M${-14+i*9} -8V8" stroke="${color}" stroke-width="4"/>`).join("")}</g><text x="${m[0]+10}" y="${m[1]-14}" font-size="12" fill="#3f5c49">${esc(c.name)}</text>`;
 }else if(c.kind==='led'&&coords.length===2){const[a,b]=coords;s+=`<path d="M${a.join(' ')} H661 V${a[1]-26} M${b.join(' ')} H682 V${a[1]-26}" fill="none" stroke="#929c8b" stroke-width="4"/><path d="M651 ${a[1]-26} V${a[1]-38} a20 20 0 0 1 40 0 V${a[1]-26}Z" fill="#d75c48" stroke="#a74635"/><text x="704" y="${a[1]-24}" font-size="12">${esc(c.name)}</text>`;
 }else if(c.kind==='button'){const ys=coords.map(p=>p[1]),top=Math.min(...ys),bottom=Math.max(...ys);s+=`<rect x="613" y="${top-8}" width="134" height="${bottom-top+16}" rx="5" fill="#839488" stroke="#405a47" stroke-width="2"/><circle cx="680" cy="${(top+bottom)/2}" r="19" fill="#313f35"/><text x="680" y="${bottom+28}" text-anchor="middle" font-size="12">택트 스위치</text>`;
 }else if(c.kind==='dip'){const ys=coords.map(p=>p[1]),top=Math.min(...ys),bottom=Math.max(...ys);s+=`<rect x="636" y="${top-12}" width="88" height="${bottom-top+24}" rx="5" fill="#2c3c32"/><path d="M668 ${top-12}a12 12 0 0 0 24 0" fill="#afb6aa"/><text x="680" y="${(top+bottom)/2}" fill="white" font-size="12" text-anchor="middle" transform="rotate(90 680 ${(top+bottom)/2})">74HC595</text>`;
 }else{
  // Labels are a pin breakout, not a claimed physical header order. The real part is shown above.
  for(const[p,h]of pins){if(visiblePins&&!visiblePins.includes(p))continue;const[x,y]=point(h);const right=x>=700;s+=`<path d="M${x} ${y}H${right?922:930}" stroke="${c.kind==='supply'?'#b7793f':'#789582'}" stroke-width="2" stroke-dasharray="4 3"/><text x="940" y="${y+4}" font-size="11" fill="#405b4a">${esc(p)}</text>`;}
 }
 for(const[p,h]of pins){if(visiblePins&&!visiblePins.includes(p))continue;const[x,y]=point(h);s+=`<rect x="${x-5}" y="${y-5}" width="10" height="10" rx="2" fill="${active?'#d57832':'#446b51'}"/><title>${esc(c.name+' '+p+' → '+h)}</title>`;}
 return s+'</g>';
}
function diagram(){
 const mainPart=lab.components.find(c=>c.part!==null&&c.part!==undefined&&!["resistor","led"].includes(c.kind));
 const bottom=Y(maxRow)+46, height=Math.max(mainPart?890:650,bottom+45);
 let s=`<svg viewBox="0 0 1100 ${height}" xmlns="http://www.w3.org/2000/svg" font-family="Pretendard,Malgun Gothic,sans-serif" role="img" aria-label="${esc(lab.title)} ${step+1}단계 배선도"><rect width="1100" height="${height}" fill="white"/><text x="28" y="38" font-size="17" fill="#31583f" font-weight="700">Arduino UNO · USB 왼쪽</text><text x="480" y="38" font-size="17" fill="#31583f" font-weight="700">빵판 가운데 단자 · 숫자 줄을 맞추세요</text><image href="assets/uno.svg" x="25" y="230" width="340" height="242.07"/><rect x="470" y="70" width="422" height="${bottom-70}" rx="12" fill="#f1f0e7" stroke="#d6dacd"/><rect x="649" y="85" width="62" height="${bottom-100}" rx="5" fill="#d8d8ca"/>`;
 if(lab.gate)s+=`<text x="480" y="60" font-size="13" fill="#a45b27">조건부 배선도 · 추가 준비·모델 확인을 먼저 읽으세요.</text>`;
 for(const c of columns)s+=`<text x="${X[c]}" y="93" text-anchor="middle" font-size="16" fill="#4a6550">${c}</text>`;
 for(let r=minRow;r<=maxRow;r++){
  for(const side of ['ABCDE','FGHIJ'])s+=`<rect x="${X[side[0]]-10}" y="${Y(r)-8}" width="132" height="16" rx="6" fill="#dbe5ca" opacity=".8"/>`;
  s+=`<text x="454" y="${Y(r)+5}" text-anchor="end" font-size="13" fill="#677b68">${r}</text><text x="910" y="${Y(r)+5}" font-size="13" fill="#677b68">${r}</text>`;
 for(const c of columns)s+=`<rect data-hole="${c+r}" tabindex="0" role="button" aria-label="${c+r} 연결 묶음 확인" x="${X[c]-5}" y="${Y(r)-5}" width="10" height="10" rx="1.5" fill="#7c8879"/>`;
 }
 s+=`<text x="680" y="${bottom+23}" text-anchor="middle" font-size="13" fill="#5b715c">A–E 한 묶음 / F–J 한 묶음 · 가운데 홈은 연결되지 않아요</text>`;
 const done=stages.slice(0,step),now=stages[step-1];
 for(let i=0;i<lab.components.length;i++){
  const items=done.filter(t=>t.ci===i);if(!items.length)continue;
  s+=component(lab.components[i],i,now?.ci===i,items.some(t=>t.type==='component')?null:items.map(t=>t.pin));
 }
 const count=done.filter(t=>t.type==='wire').length;
 for(let i=0;i<count;i++){
  const l=lab.lines[i],[a,b]=[point(l.a),point(l.b)],current=i===count-1;
  const power=l.a.includes('5V')||l.a.includes('3V3'),ground=l.a.includes('GND');
  const color=current?'#d57832':ground?'#42564b':power?'#bb6250':'#5c8294';
  let d;
  if(l.a.startsWith('U:')){const lane=392+(i%7)*8;const offset=a[1]<300?130-(i%5)*17:510+(i%5)*17;d=`M${a.join(' ')}V${offset}H${lane}V${b[1]}H${b[0]}`;}
  else d=`M${a.join(' ')}H${a[0]-(10+(i%4)*6)}V${b[1]}H${b[0]}`;
  s+=`<path d="${d}" fill="none" stroke="${color}" opacity="${current?1:.55}" stroke-width="${current?5:3}" stroke-linecap="round" stroke-linejoin="round"/>`;
  if(current)s+=dot(l.a)+dot(l.b);
 }
 if(now?.type==='pin')s+=dot(now.hole);
 if(now?.type==='component'){for(const h of Object.values(lab.components[now.ci].pins))s+=dot(h);}
 const main=lab.components.find(c=>c.part!==null&&c.part!==undefined&&c.kind!=='resistor'&&c.kind!=='led');
 if(main){const p=data.parts[main.part],crop=p.crop;s+=`<svg x="30" y="560" width="285" height="240" viewBox="${crop.join(' ')}"><image href="assets/seller-kit.jpg" width="680" height="7345"/></svg><text x="30" y="825" font-size="13" fill="#637b67">${esc(main.name)} · 실물 외형 참고</text>`;}
 s+=`<text x="30" y="520" font-size="12" fill="#637b67">주황: 이번 단계 / 흐린 선: 앞 단계</text><text x="30" y="542" font-size="12" fill="#637b67">모듈 핀 이름은 오른쪽에 펼쳐 표시합니다.</text>`;
 return s+'</svg>';
}
function stepInfo(){if(step===0)return{title:'USB와 외부 전원을 빼고 방향을 맞추세요.',text:lab.orientation,why:'먼저 부품 이름과 그림의 구멍 번호를 확인합니다. 모듈 그림의 줄 간격은 실물 핀 간격이 아닙니다.',a:'USB 분리',b:'방향 확인'};
 const current=stages[step-1];
 if(current.type==='pin'){const c=lab.components[current.ci];return{title:`${c.name} · ${current.pin}`,text:c.kind==='raw'?`${current.pin} 다리를 빵판 ${current.hole}에 꽂습니다. 다리가 같은 숫자 줄에 모이지 않도록 방향과 간격을 확인합니다.`:`${current.pin} 핀에 암–수 점퍼선의 구멍 쪽을 꽂고, 핀 쪽을 빵판 ${current.hole}에 꽂습니다.`,why:lab.pin_explanations?.[current.ci+':'+current.pin]||'실물 핀 이름과 위치를 확인합니다.',a:current.pin,b:current.hole};}
 if(current.type==='component'){const c=lab.components[current.ci];return{title:c.name+'을 놓으세요.',text:Object.entries(c.pins).map(([p,h])=>`${p} → ${h}`).join(' / '),why:c.kind==='resistor'?'저항의 방향은 없지만 양 끝은 서로 다른 연결 묶음이어야 합니다. 값도 함께 확인하세요.':'몸체 방향·극성과 각 다리의 구멍을 확인합니다. 지금은 전원을 넣지 않습니다.',a:Object.values(c.pins)[0],b:Object.values(c.pins).at(-1)};}
 const l=lab.lines[current.wi];return{title:l.text,text:`출발 ${label(l.a)} → 도착 ${label(l.b)}. 다른 선을 옮기지 않고 이 한 선을 추가합니다.`,why:l.why+' '+Object.entries(l.alternatives||{}).map(([h,hs])=>hs.length?`${h} 대신 빈 ${hs.join('·')}도 같은 연결입니다.`:'').join(' '),a:label(l.a),b:label(l.b)};}
function renderStep(){
 const info=stepInfo(),total=stages.length;
 $('#wiring').innerHTML=diagram();$('#step-count').textContent=`STEP ${step+1} / ${total+1}`;$('#step-title').textContent=info.title;$('#step-description').textContent=info.text;const facts=info.why.split(/(?<=[다요])\.\s+/u);$('#step-why').textContent=facts[0]+(facts.length>1?'.':'');$('#step-reason').innerHTML=facts.map(t=>`<p>${esc(t.replace(/\.$/,''))}.</p>`).join('');$('#endpoint-a').textContent=info.a;$('#endpoint-b').textContent=info.b;
 $('#prev-step').disabled=step===0;$('#next-step').disabled=step===total;
 $('#step-dots').innerHTML=Array.from({length:total+1},(_,i)=>`<button data-step="${i}" aria-label="${i===0?'준비':i+'단계'}" ${i===step?'aria-current="step"':''}>${i===0?'준비':i}</button>`).join('');
 document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>goStep(+b.dataset.step));
 document.querySelectorAll('.connection-table tbody tr').forEach((r,i)=>r.classList.toggle('current',stages[step-1]?.wi===i));
 $('#wiring').querySelectorAll('[data-hole]').forEach(h=>{const fn=()=>{const id=h.dataset.hole,row=+id.slice(1),group=columns.indexOf(id[0])<5?columns.slice(0,5):columns.slice(5);$('#wiring').querySelectorAll('[data-hole]').forEach(x=>{x.setAttribute('fill',group.includes(x.dataset.hole[0])&&+x.dataset.hole.slice(1)===row?'#d57832':'#7c8879');});const peers=group.map(c=>c+row),targets=lab.components.flatMap(c=>Object.entries(c.pins).filter(([p,h])=>peers.includes(h)&&!p.includes('비움')).map(([p,h])=>`${c.name} ${p}(${h})`));$('#hole-explanation').textContent=`${id}는 ${peers.join(' · ')}와 같은 금속판입니다. ${targets.length?'이 묶음의 부품: '+targets.join(', '):'이 회로의 부품 다리는 이 묶음에 놓지 않습니다.'} 옆 숫자 줄이나 가운데 홈 건너편은 안에서 이어지지 않습니다.`;};h.onclick=fn;h.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn();}};});
 const u=new URL(location.href);u.searchParams.set('lab',lab.id);u.searchParams.set('step',step);history.replaceState(null,'',u);}
function goStep(n){step=n;renderStep();}
function renderLab(id){
 lab=data.labs.find(l=>l.id===id)||data.labs[0];stages=[];
 lab.components.forEach((c,ci)=>{if(['module','supply','raw'].includes(c.kind))Object.entries(c.pins).filter(([pin])=>!pin.includes('비움')).forEach(([pin,hole])=>stages.push({type:'pin',ci,pin,hole}));else stages.push({type:'component',ci});});
 lab.lines.forEach((l,wi)=>stages.push({type:'wire',wi}));
 const q=Number(new URLSearchParams(location.search).get('step')||0);step=Number.isInteger(q)?Math.min(Math.max(q,0),stages.length):0;
 const holes=[...lab.components.flatMap(c=>Object.values(c.pins)),...lab.lines.flatMap(l=>[l.a,l.b])].filter(h=>!h.startsWith('U:')).map(h=>+h.slice(1));
 minRow=holes.length?Math.max(1,Math.min(...holes)-2):1;maxRow=holes.length?Math.min(30,Math.max(...holes)+2):15;rowPitch=Math.min(44,680/(maxRow-minRow||1));
 $('#lab-list').innerHTML=data.labs.map(l=>`<a href="?lab=${l.id}#workbench" ${l.id===lab.id?'aria-current="page"':''}><small>${l.id}${completed[l.id]?' ✓':''}</small><span>${esc(l.title)}</span></a>`).join('');
 const table=lab.lines.map((l,i)=>`<tr><td>${i+1}</td><td>${esc(label(l.a))}</td><td>${esc(label(l.b))}</td><td>${esc(l.why)}</td></tr>`).join('');
 const i=data.labs.indexOf(lab),references=(lab.refs||[]).map((href,n)=>`<li><a href="${esc(href)}" target="_blank" rel="noopener">${href.startsWith('assets/')?'판매처 핀표·참고 자료':new URL(href).hostname} ${n+1} ↗</a></li>`).join('');
 $('#lab-content').innerHTML=`<p class="eyebrow">${lab.id} · INDIVIDUAL PRACTICE</p><h2 class="lab-title">${esc(lab.title)}</h2><p class="concept">${esc(lab.concept)}</p>${lab.gate?`<div class="warning"><strong>이 부품은 연결 전에 확인할 것이 있어요.</strong>${esc(lab.gate)}</div>`:''}<h3>실물 부품부터 찾으세요.</h3><div class="lab-parts">${lab.parts.map(n=>partCard(data.parts[n])).join('')}</div><div class="orientation"><b>방향과 핀을 먼저 확인하세요.</b><br>${esc(lab.orientation)}</div>
 <section class="circuit-explanation"><h3>왜 이 위치에 연결하나요?</h3>${(lab.circuit_notes||[]).map(t=>`<p>${esc(t)}</p>`).join('')}<a href="#breadboard-basics">금속판·전류 경로·틀린 배선 비교하기 ↑</a></section>
 <div class="diagram-header"><h3>한 단계씩 연결하세요.</h3><button id="expand-diagram" class="plain-button">배선도 크게 보기 ↗</button></div><p class="legend">연두색 띠 한 개가 같은 금속판의 다섯 구멍입니다. 서로 다른 띠는 분리돼 있습니다. 설명을 위한 색이며 실제 빵판의 표시가 아닙니다. 구멍을 누르면 연결된 부품도 아래에서 확인할 수 있습니다. 그림이 넓으면 가로로 이동하세요. 사진과 펼친 핀 그림을 함께 확인합니다.</p>
 <div class="assembly"><div class="diagram-scroll" id="wiring"></div><div class="step-card"><p class="eyebrow" id="step-count"></p><h3 id="step-title"></h3><p id="step-description"></p><p class="step-why" id="step-why"></p><div class="endpoint"><span id="endpoint-a"></span><span id="endpoint-b"></span></div><div class="step-controls"><button id="prev-step">← 이전</button><button id="next-step">다음 →</button></div></div></div><section class="connection-reason" id="connection-reason"><h3>이번 단계의 연결 원리</h3><div id="step-reason"></div></section><div id="hole-explanation" class="hole-explanation" role="status" aria-live="polite">그림의 구멍을 누르면 같은 금속판과 이 회로의 연결 대상을 보여 줍니다.</div><div class="step-dots" id="step-dots" aria-label="연결 단계 선택"></div>
 <details class="pin-placement"><summary>부품 다리·핀의 전체 위치 보기</summary><div class="table-scroll"><table class="connection-table"><thead><tr><th>부품</th><th>다리·핀 이름</th><th>빵판 구멍</th></tr></thead><tbody>${lab.components.flatMap(c=>Object.entries(c.pins).map(([p,h])=>`<tr><td>${esc(c.name)}</td><td>${esc(p)}</td><td>${p.includes("비움")?"연결하지 않음":esc(h)}</td></tr>`)).join("")}</tbody></table></div></details>
 ${lab.lines.length?`<h3>전체 연결표</h3><div class="table-scroll"><table class="connection-table"><thead><tr><th>선</th><th>출발</th><th>도착</th><th>왜 연결하나요?</th></tr></thead><tbody>${table}</tbody></table></div>`:'<p>이 항목은 외부 배선을 추가하지 않습니다. 설치·부품 확인 절차를 진행합니다.</p>'}
 <section class="checklist"><h3>전원을 넣기 전, 하나씩 확인하세요.</h3>${data.checks.map((t,n)=>`<label><input type="checkbox" class="safety-check">${esc(t)}</label>`).join('')}${lab.gate?`<label><input type="checkbox" class="safety-check">위의 추가 준비·모델·전원 조건도 충족했습니다.</label>`:''}<p class="ready" id="ready-status">확인을 마친 뒤에만 전원을 연결합니다. 화면 체크가 실제 배선 검사를 대신하지 않습니다.</p></section>
 ${lab.code?`<div class="code-header"><h3>코드를 넣고 실행하세요.</h3><button id="copy-code" class="main-button">코드 복사</button></div><p>새 스케치 → 붙여넣기 → <b>${lab.id}/${lab.id}.ino</b> 저장 → Arduino Uno·실제 COM 선택 → ✓ 검증 → → 업로드 → 시리얼 모니터 <b>9600</b>.</p>${lab.library?`<p><b>라이브러리 관리자:</b> ${esc(lab.library)}</p>`:''}<pre><code>${lab.code.split('\n').map(l=>l.trimStart().startsWith('//')?`<span class="comment">${esc(l)}</span>`:esc(l)).join('\n')}</code></pre><div class="code-links"><a download href="../sketches/${lab.id}/${lab.id}.ino">.ino 파일 내려받기 ↓</a><a href="?lab=K00#workbench">설치·업로드 다시 보기</a></div>`:''}
 <div class="result-grid"><section><h3>이렇게 나오면 됩니다.</h3><p>${esc(lab.expected)}</p></section><section><h3>이제 직접 바꿔 보세요.</h3><p>${esc(lab.change)}</p></section></div><section class="troubleshoot"><h3>잘 안될 때</h3><p>${esc(lab.errors)}</p></section>${references?`<details><summary>이 부품의 핀표·공식 설명</summary><ul>${references}</ul></details>`:''}<div class="complete"><input type="checkbox" id="lab-complete" ${completed[lab.id]?'checked':''}><label for="lab-complete">이 부품을 직접 확인하고 결과를 기록했습니다.</label></div><small>체크 기록은 이 브라우저에만 저장되며 과제 제출이 아닙니다.</small><nav class="lab-footer">${i?`<a href="?lab=${data.labs[i-1].id}#workbench">← ${esc(data.labs[i-1].title)}</a>`:'<a href="#inventory">구성품 전체</a>'}${i<data.labs.length-1?`<a href="?lab=${data.labs[i+1].id}#workbench">${esc(data.labs[i+1].title)} →</a>`:'<a href="#inventory">구성품 대조·정리 ↑</a>'}</nav>`;
 photoEvents($('#lab-content'));renderStep();$('#prev-step').onclick=()=>goStep(step-1);$('#next-step').onclick=()=>goStep(step+1);
 $('#expand-diagram').onclick=()=>{$('#diagram-large').innerHTML=diagram();$('#diagram-dialog').showModal();};
 document.querySelectorAll('.safety-check').forEach(c=>c.onchange=()=>{const ready=[...document.querySelectorAll('.safety-check')].every(c=>c.checked);$('#ready-status').textContent=ready?'화면의 확인 항목을 모두 체크했습니다. 실제 모델·배선·전원도 마지막으로 대조하세요.':'확인을 마친 뒤에만 전원을 연결합니다. 화면 체크가 실제 배선 검사를 대신하지 않습니다.';$('#ready-status').classList.toggle('ok',ready);});
 if(lab.code)$('#copy-code').onclick=async()=>{try{await navigator.clipboard.writeText(lab.code);status('코드를 복사했습니다. Arduino IDE에 붙여넣으세요.');}catch{status('복사가 허용되지 않았습니다. 아래 코드를 선택해 Ctrl+C로 복사하세요.');}};
 $('#lab-complete').onchange=e=>{completed[lab.id]=e.target.checked;try{localStorage.setItem('uno-kit-completed',JSON.stringify(completed));}catch{}status(e.target.checked?'이 브라우저에 완료 표시를 저장했습니다.':'완료 표시를 해제했습니다.');};
}
async function init(){
 try{const r=await fetch('data.json?v=13802a2b72677467');if(!r.ok)throw Error(r.status);data=await r.json();$('#breadboard-basics').innerHTML=BreadboardTheory.render();BreadboardTheory.bind($('#breadboard-basics'));$('#part-total').textContent=`${data.parts.length}개 품목`;inventory();$('#part-search').oninput=inventory;$('#sources').innerHTML=data.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)} ↗</a>`).join('');renderLab(new URLSearchParams(location.search).get('lab')||'K01');if(['#workbench','#breadboard-basics'].includes(location.hash))$(location.hash).scrollIntoView();}
 catch(e){$('#lab-content').innerHTML='<p>실습 데이터를 불러오지 못했습니다. 인터넷 연결을 확인하고 새로고침하세요. ZIP으로 받았다면 파일을 직접 더블클릭하는 대신 웹 서버 또는 수업 홈페이지에서 열어 주세요.</p>';console.error(e);}
 document.querySelectorAll('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
}
init();
