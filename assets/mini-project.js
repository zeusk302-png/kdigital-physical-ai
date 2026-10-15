import {AXES,validMission,drawMission,missionText,aiPrompt,currentMission,programGuide} from './mini-project-data.js?v=6472e093c74b';
const ENDPOINT='https://ylgedlgpyuejuyykhxvt.supabase.co/functions/v1/kdigital-mini-project';
const STORE='physical-ai-mini-project-v1';
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const path='#/sessions/2026-10-15';

export function render(){
 return `<div class="mini-project" id="mini-project"><header class="mini-heading"><span class="eyebrow">Python · 4시간 개인 프로젝트</span><h1>파이썬 미니 프로젝트</h1><p>우연히 만난 단어를, 내가 만드는 프로그램으로.</p><p class="mini-description">장르·주어·공간·돌발 상황을 각각 독립적으로 뽑습니다. 어색한 조합도 나만의 뜻으로 해석할 수 있어요. 네 요소를 프로그램에 담고, 돌발 상황까지 해결해 보세요.</p><div class="mini-steps"><a href="${path}/mini-project?section=mini-draw">01 미션 뽑기</a><a href="${path}/mini-project?section=mini-upload">02 캡처 등록</a><a href="${path}/mini-project?section=mini-gallery">03 익명 갤러리</a><a href="${path}/mini-project?section=mini-guide">04 만들기</a></div></header>
 <section id="mini-draw" class="mini-panel"><div class="mini-section-title"><div><span class="eyebrow">01 · 각 돌림판은 서로 독립적입니다</span><h2>나의 조합 뽑기</h2></div><span class="mini-badge">돌발 상황도 필수</span></div><label class="mini-genre-label" for="mini-genre">장르 <select id="mini-genre"><option value="">장르도 무작위로</option>${AXES[0].values.map(v=>`<option>${escape(v)}</option>`).join('')}</select></label><p class="text-note">장르를 직접 골라도 나머지 단어와 돌발 상황의 후보는 그대로입니다. 마음에 드는 항목은 고정하고 다시 뽑을 수 있습니다.</p><div class="mini-wheel-grid">${AXES.map((a,i)=>`<article class="mini-wheel-card ${a.key==='incident'?'incident':''}"><div class="mini-wheel-label"><span>${String(i+1).padStart(2,'0')} · ${a.label}</span><label><input type="checkbox" data-lock="${a.key}" aria-label="${a.label} 고정"> 고정</label></div><div class="mini-reel" data-reel="${a.key}"><span class="mini-reel-ring" aria-hidden="true"></span><strong data-value="${a.key}">?</strong></div><button type="button" class="mini-reroll" data-roll="${a.key}">${a.label}만 다시 뽑기</button></article>`).join('')}</div><div class="actions"><button class="button" id="mini-spin" type="button">돌림판 돌리기</button><button class="button secondary" id="mini-copy-prompt" type="button" disabled>AI 요청문 복사</button><button class="button secondary" id="mini-copy-brief" type="button" disabled>미션 설명 복사</button></div><p id="mini-draw-status" role="status">네 돌림판을 돌려 나만의 출발점을 정하세요.</p><div id="mini-program-guide" class="mini-program-guide" aria-live="polite"><h3>이 조합으로 무엇을 만들까요?</h3><p>돌림판을 돌리면 이곳에 프로그램 아이디어, 화면 구성, 기능 3개와 돌발 상황 해결 힌트가 나옵니다.</p></div></section>
 <section id="mini-upload" class="mini-panel"><div class="mini-section-title"><div><span class="eyebrow">02 · 만들기 전에 등록하세요</span><h2>돌림판 캡처 올리기</h2></div><span class="mini-badge">로그인·이름 입력 없음</span></div><div class="mini-upload-layout"><div><p>결과 이미지를 만들거나 직접 캡처한 파일을 선택하세요. 등록하면 아래 갤러리에 익명으로 공개됩니다.</p><div class="actions"><button id="mini-capture" class="button secondary" type="button" disabled>결과 이미지 만들기</button><a id="mini-download" class="button secondary" download="파이썬_미니프로젝트_미션.png" hidden>이미지 저장</a></div><label for="mini-file">직접 캡처한 이미지 선택 <span class="text-note">PNG·JPG·WebP · 2MB 이하</span></label><input id="mini-file" type="file" accept="image/png,image/jpeg,image/webp"><label for="mini-caption">이 조합을 어떻게 해석할 건가요? <span class="text-note">선택 · 120자</span></label><textarea id="mini-caption" maxlength="120" rows="3" placeholder="예: 로봇이 도서관에서 책을 찾는 게임"></textarea><p class="text-note">캡처와 설명에는 이름·연락처·브라우저 정보를 넣지 마세요. 결과 이미지 만들기를 쓰면 미션 카드만 담깁니다.</p><button id="mini-publish" class="button" type="button" disabled>익명 갤러리에 등록</button><p id="mini-upload-status" role="status">미션을 뽑고 캡처를 준비하세요. 이 브라우저의 미션 한 개를 등록합니다. 등록하면 조합이 확정되며 이 조합으로 제작합니다.</p></div><div class="mini-image-preview"><img id="mini-preview" alt="선택한 돌림판 캡처 미리보기" hidden><p id="mini-preview-empty">미션 캡처 미리보기</p></div></div></section>
 <section id="mini-gallery" class="mini-panel mini-gallery-panel"><div class="mini-section-title"><div><span class="eyebrow">03 · 이름 없이, 서로 다른 출발점</span><h2>우리 반 미션 갤러리</h2><p id="mini-gallery-count">수강생 38명 · 등록된 미션을 불러오는 중</p></div><button id="mini-refresh" class="button secondary" type="button">갤러리 새로고침</button></div><label for="mini-gallery-filter">장르별 보기 <select id="mini-gallery-filter"><option value="">전체 장르</option>${AXES[0].values.map(v=>`<option>${escape(v)}</option>`).join('')}</select></label><p id="mini-gallery-status" role="status"></p><div id="mini-gallery-items" class="mini-gallery-grid"></div></section>
 <section id="mini-guide" class="mini-panel"><span class="eyebrow">04 · 내 해석으로 프로그램 만들기</span><h2>조합의 뜻은 여러분이 정합니다</h2><p>고양이는 주인공일 수도, 사용자의 별명일 수도 있습니다. 공간은 배경·화면·자료가 모이는 곳으로 해석해도 됩니다. 돌발 상황도 이야기·게임 규칙·데이터 문제·사용 조건 중 원하는 방식으로 해석합니다.</p><p><strong>네 요소 중 하나를 빼지 않고, 어디에 반영했는지 설명할 수 있어야 합니다.</strong> 예쁜 화면과 함께 실제로 눌러 사용할 수 있는 기능을 만드세요.</p><div class="mini-guide-grid"><article><h3>먼저 정할 것</h3><ol><li>만들 프로그램을 한 문장으로 쓰기</li><li>핵심 기능 3개 정하기</li><li>입력칸·버튼·결과가 보이는 화면 그리기</li><li>돌발 상황을 일으킬 방법과 해결 결과 정하기</li></ol></article><article><h3>AI와 함께 만드는 순서</h3><ol><li>미션 요청문을 복사하고 아이디어 비교하기</li><li>가장 작은 실행 가능한 화면부터 만들기</li><li>기능 하나씩 추가하고 직접 실행하기</li><li>오류 화면·입력·예상 결과를 설명하며 수정하기</li></ol></article></div><h3>4시간 운영 · 휴식 포함</h3><div class="table-wrap"><table><thead><tr><th>활동</th><th>시간</th><th>남길 결과</th></tr></thead><tbody><tr><td>실행 준비·공통 UI 확인</td><td>20분</td><td>버튼이 동작하는 첫 화면</td></tr><tr><td>돌림판·캡처 등록·설계</td><td>20분</td><td>갤러리 미션과 기능 3개</td></tr><tr><td>핵심 기능 만들기</td><td>70분</td><td>직접 조작할 수 있는 첫 버전</td></tr><tr><td>돌발 상황 재현·해결</td><td>50분</td><td>문제 상황과 해결된 동작</td></tr><tr><td>시험·직접 수정</td><td>30분</td><td>다른 입력 3개와 변경 기능</td></tr><tr><td>짝과 시연·전체 사례 공유</td><td>20분</td><td>서로 3분 시연 후 사례 공유</td></tr><tr><td>중간 휴식 10분 × 3회</td><td>30분</td><td>저장 확인 후 휴식</td></tr><tr><th>합계</th><th>240분</th><td>개인 Python 프로그램</td></tr></tbody></table></div><h3>시연할 때 확인할 것</h3><ul><li>내 조합의 네 요소가 각각 어디에 들어갔는지 설명합니다.</li><li>UI에서 핵심 기능 3개를 직접 실행합니다.</li><li>돌발 상황을 재현하고, 해결된 결과까지 보여줍니다.</li><li>스스로 바꾼 기능 하나와 시험한 입력 3개를 설명합니다.</li></ul><p>UI 도구는 수업에서 실행 가능한 환경에 맞춰 선택합니다. 아직 배우지 않은 표현은 AI에게 설명과 주석을 요청하고, 실행 위치와 필요한 설치도 확인하세요.</p><div class="actions"><a class="button secondary" href="${path}/lesson">심화 12개 개념 찾아보기</a><a class="button secondary" href="${path}/assignments">심화 과제 3개</a></div></section></div>`;
}

export function mount(root,notify=()=>{}){
 let disposed=false,busy=false,selected=null,previewUrl=null,downloadUrl=null,tick=null,finish=null,items=[],retryForm=null;
 const controller=new AbortController(),signal=controller.signal;
 const q=selector=>root.querySelector(selector);
 let state={token:crypto.randomUUID(),mission:null,locks:{},genre:'',caption:'',receipt:null};
 try{const old=JSON.parse(localStorage.getItem(STORE)||'null');if(old&&/^[a-f0-9-]{36}$/.test(old.token)){state={...state,token:old.token,mission:currentMission(old.mission),locks:old.locks&&typeof old.locks==='object'?old.locks:{},genre:AXES[0].values.includes(old.genre)?old.genre:'',caption:typeof old.caption==='string'?old.caption.slice(0,120):'',receipt:old.receipt&&/^[a-f0-9-]{36}$/.test(old.receipt.id)?old.receipt:null};}}catch{}
 const save=()=>{try{localStorage.setItem(STORE,JSON.stringify(state));}catch{q('#mini-draw-status').textContent='이 브라우저에 결과를 보관하지 못했습니다. 결과 이미지를 저장하세요.';}};
 const invalidateImage=()=>{selected=null;retryForm=null;if(previewUrl)URL.revokeObjectURL(previewUrl);if(downloadUrl)URL.revokeObjectURL(downloadUrl);previewUrl=downloadUrl=null;q('#mini-preview').hidden=true;q('#mini-preview-empty').hidden=false;q('#mini-download').hidden=true;q('#mini-file').value='';};
 function showProgramGuide(){
  if(!state.mission)return;
  const guide=programGuide(state.mission);
  q('#mini-program-guide').innerHTML=`<span class="eyebrow">이 조합의 제작 가이드</span><h3>${escape(guide.title)}</h3><p>${escape(guide.premise)}</p><p class="text-note">아래는 출발 예시입니다. 다른 아이디어로 바꿔도 됩니다. 네 요소가 어디에 들어갔는지 설명해 주세요.</p><div class="mini-guide-grid"><article><h4>먼저 만들 기능 3개</h4><ol>${guide.features.map(v=>`<li>${escape(v)}</li>`).join('')}</ol><h4>화면 구성</h4><p>${escape(guide.ui)}</p></article><article><h4>돌발 상황: ${escape(guide.incident)}</h4><p><strong>일으켜 보기</strong><br>${escape(guide.reproduce)}</p><p><strong>해결 힌트</strong><br>${escape(guide.solution)}</p><p><strong>완료 확인</strong><br>일반 동작 한 번 → 돌발 상황 발생 → 해결 후 다시 사용하기까지 직접 보여 주세요.</p></article></div>`;
 }
 function sync(){
  const done=Boolean(state.receipt);showProgramGuide();
  q('#mini-genre').value=state.genre;q('#mini-genre').disabled=busy||done;
  for(const axis of AXES){q(`[data-value="${axis.key}"]`).textContent=state.mission?.[axis.key]||'?';q(`[data-lock="${axis.key}"]`).checked=Boolean(state.locks[axis.key]);q(`[data-lock="${axis.key}"]`).disabled=busy||done||!state.mission;q(`[data-roll="${axis.key}"]`).disabled=busy||done||!state.mission||(axis.key==='genre'&&Boolean(state.genre));}
  q('#mini-spin').disabled=busy||done;q('#mini-spin').textContent=busy?'돌리는 중…':state.mission?'다시 돌리기':'돌림판 돌리기';
  for(const id of ['mini-capture','mini-copy-prompt','mini-copy-brief'])q('#'+id).disabled=busy||!state.mission;
  q('#mini-caption').disabled=done||busy;q('#mini-file').disabled=done||busy;
  q('#mini-publish').disabled=done||busy||!state.mission||!selected;
  if(done){q('#mini-upload-status').textContent=`등록 완료 · 익명 프로젝트 ${String(state.receipt.display_no).padStart(3,'0')} · 등록한 조합으로 프로그램을 만들어 보세요.`;}
 }
 function spin(key=null){
  if(busy||state.receipt)return;
  const locks={...state.locks};if(key)for(const axis of AXES)locks[axis.key]=axis.key!==key||Boolean(state.locks[axis.key]);
  if(key&&locks[key]){notify('고정을 풀고 다시 뽑아 주세요.');return;}
  const next=drawMission(state.mission,locks,state.genre);
  busy=true;invalidateImage();sync();
  const moving=AXES.filter(a=>(!key||a.key===key)&&!locks[a.key]&&!(a.key==='genre'&&state.genre));
  moving.forEach(a=>q(`[data-reel="${a.key}"]`).classList.add('spinning'));
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduced)tick=setInterval(()=>moving.forEach(a=>q(`[data-value="${a.key}"]`).textContent=a.values[Math.floor(Math.random()*a.values.length)]),85);
  finish=setTimeout(()=>{clearInterval(tick);if(disposed)return;state.mission=next;busy=false;moving.forEach(a=>q(`[data-reel="${a.key}"]`).classList.remove('spinning'));save();sync();q('#mini-draw-status').textContent='조합이 나왔습니다. 돌발 상황까지 내 방식으로 해석하고 캡처를 등록하세요.';q('#mini-upload-status').textContent='결과 이미지를 만들거나 직접 캡처한 파일을 선택하세요.';},reduced?0:1050);
 }
 async function canvasBlob(canvas){return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(Error('이미지를 만들지 못했습니다.')),'image/png'));}
 function wrapped(ctx,text,x,y,width,lineHeight){let line='';for(const char of text){if(ctx.measureText(line+char).width>width){ctx.fillText(line,x,y);y+=lineHeight;line=char;}else line+=char;}ctx.fillText(line,x,y);return y+lineHeight;}
 async function capture(){
  if(!state.mission||busy)return;
  await document.fonts.ready;
  const canvas=document.createElement('canvas');canvas.width=1280;canvas.height=860;
  const ctx=canvas.getContext('2d');ctx.fillStyle='#fbfaf6';ctx.fillRect(0,0,1280,860);ctx.fillStyle='#0f766e';ctx.font='700 24px Pretendard, sans-serif';ctx.fillText('PYTHON · MINI PROJECT',64,70);ctx.fillStyle='#172a24';ctx.font='700 48px Pretendard, sans-serif';ctx.fillText('파이썬 미니 프로젝트',64,140);ctx.font='24px Pretendard, sans-serif';ctx.fillStyle='#516159';ctx.fillText('장르와 단어, 돌발 상황을 독립적으로 뽑은 나의 조합',64,190);
  AXES.forEach((a,i)=>{const x=64+(i%2)*590,y=230+Math.floor(i/2)*178;ctx.fillStyle=a.key==='incident'?'#fff0dc':'#e8f3ed';ctx.fillRect(x,y,560,154);ctx.fillStyle='#516159';ctx.font='22px Pretendard, sans-serif';ctx.fillText(a.label,x+24,y+38);ctx.fillStyle='#172a24';ctx.font='700 30px Pretendard, sans-serif';wrapped(ctx,state.mission[a.key],x+24,y+89,510,38);});
  ctx.font='700 22px Pretendard, sans-serif';ctx.fillStyle='#172a24';ctx.fillText('내 해석',64,635);ctx.font='24px Pretendard, sans-serif';wrapped(ctx,state.caption||'이 조합을 내 방식으로 해석해 프로그램을 만듭니다.',64,678,1150,34);ctx.font='20px Pretendard, sans-serif';ctx.fillStyle='#516159';ctx.fillText('네 요소 반영 · 조작 가능한 UI · 핵심 기능 3개 · 돌발 상황 해결',64,815);
  await setImage(await canvasBlob(canvas));
 }
 async function setImage(file){
  if(file.size>2097152)throw Error('2MB 이하 이미지를 선택하세요.');
  const bitmap=await createImageBitmap(file);
  const scale=Math.min(1,1600/bitmap.width,1600/bitmap.height);
  const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();
  const blob=await canvasBlob(canvas);if(blob.size>2097152)throw Error('다른 캡처를 선택하거나 결과 이미지 만들기를 사용하세요.');
  invalidateImage();selected=blob;previewUrl=URL.createObjectURL(blob);downloadUrl=URL.createObjectURL(blob);q('#mini-preview').src=previewUrl;q('#mini-preview').hidden=false;q('#mini-preview-empty').hidden=true;q('#mini-download').href=downloadUrl;q('#mini-download').hidden=false;q('#mini-upload-status').textContent='이미지가 준비됐습니다. 미션과 설명을 확인하고 익명 갤러리에 등록하세요.';sync();
 }
 function showGallery(){
  const filter=q('#mini-gallery-filter').value,shown=filter?items.filter(item=>item.mission?.genre===filter):items;
  q('#mini-gallery-count').textContent=`수강생 38명 · 등록된 미션 ${items.length}개`;
  q('#mini-gallery-items').innerHTML=shown.length?shown.map(item=>`<article class="mini-gallery-card" id="mini-gallery-${escape(item.id)}"><a href="${escape(item.image_url)}" target="_blank" rel="noopener" aria-label="익명 프로젝트 ${escape(item.display_no)} 캡처 크게 보기"><img loading="lazy" src="${escape(item.image_url)}" alt="익명 프로젝트 ${escape(item.display_no)} 돌림판 캡처"></a><div class="mini-gallery-copy"><span class="eyebrow">익명 프로젝트 ${String(item.display_no).padStart(3,'0')}</span><h3>${escape(item.mission.genre)}</h3><dl>${AXES.slice(1).map(a=>`<div><dt>${a.label}</dt><dd>${escape(item.mission[a.key])}</dd></div>`).join('')}</dl>${item.caption?`<p class="mini-gallery-caption">${escape(item.caption)}</p>`:''}</div></article>`).join(''):'<div class="mini-empty"><h3>아직 등록된 미션이 없습니다</h3><p>돌림판 결과를 캡처해 첫 미션을 올려 보세요.</p></div>';
  if(filter&&!shown.length)q('#mini-gallery-items').innerHTML='<p>이 장르에 등록된 미션이 없습니다. 전체 장르를 선택해 보세요.</p>';
 }
 async function loadGallery(){
  q('#mini-refresh').disabled=true;q('#mini-gallery-status').textContent='갤러리를 불러오는 중입니다…';
  try{const response=await fetch(ENDPOINT,{signal:AbortSignal.any([signal,AbortSignal.timeout(20000)]),cache:'no-store'});const data=await response.json();if(!response.ok||!Array.isArray(data.items))throw Error(data.error||'갤러리를 불러오지 못했습니다.');if(disposed)return;items=data.items.map(item=>({...item,mission:currentMission(item.mission)})).filter(item=>validMission(item.mission)&&typeof item.image_url==='string'&&item.image_url.startsWith('https://ylgedlgpyuejuyykhxvt.supabase.co/storage/'));showGallery();q('#mini-gallery-status').textContent='이름 없이 공개된 미션입니다. 새 등록은 새로고침으로 확인하세요.';}catch(error){if(disposed)return;q('#mini-gallery-status').textContent='갤러리를 불러오지 못했습니다. 연결을 확인하고 새로고침해 주세요.';}finally{if(!disposed)q('#mini-refresh').disabled=false;}
 }
 q('#mini-caption').value=state.caption;sync();save();
 const on=(selector,event,handler)=>q(selector).addEventListener(event,handler,{signal});
 on('#mini-spin','click',()=>spin());
 for(const link of root.querySelectorAll('.mini-steps a'))link.addEventListener('click',event=>{event.preventDefault();const id=new URLSearchParams(link.hash.split('?')[1]).get('section');q('#'+id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});},{signal});
 for(const axis of AXES){on(`[data-roll="${axis.key}"]`,'click',()=>spin(axis.key));on(`[data-lock="${axis.key}"]`,'change',event=>{state.locks[axis.key]=event.target.checked;save();});}
 on('#mini-genre','change',event=>{state.genre=event.target.value;save();});
 on('#mini-caption','input',event=>{state.caption=event.target.value;retryForm=null;save();if(selected)q('#mini-upload-status').textContent='설명을 변경했습니다. 이미지에도 반영하려면 결과 이미지를 다시 만드세요.';});
 on('#mini-capture','click',()=>capture().catch(error=>q('#mini-upload-status').textContent=error.message));
 on('#mini-file','change',event=>{const file=event.target.files[0];if(!file)return;if(!['image/png','image/jpeg','image/webp'].includes(file.type)){q('#mini-upload-status').textContent='PNG·JPG·WebP 이미지를 선택하세요.';return;}setImage(file).catch(error=>q('#mini-upload-status').textContent=error.message);});
 for(const [id,build] of [['mini-copy-prompt',aiPrompt],['mini-copy-brief',missionText]])on('#'+id,'click',async()=>{try{await navigator.clipboard.writeText(build(state.mission,state.caption));q('#'+id).textContent='복사됨';notify('복사했습니다. 사용 중인 AI나 문서에 붙여넣으세요.');}catch{notify('복사 기능을 사용할 수 없습니다. 미션 카드 내용을 직접 옮겨 적으세요.');}});
 on('#mini-refresh','click',loadGallery);on('#mini-gallery-filter','change',showGallery);
 on('#mini-publish','click',async()=>{
  if(!selected||!state.mission||busy||state.receipt)return;
  busy=true;sync();q('#mini-upload-status').textContent='등록 중입니다. 완료 표시를 기다려 주세요.';
  try{
   if(!retryForm){retryForm=new FormData();retryForm.set('token',state.token);retryForm.set('mission',JSON.stringify(state.mission));retryForm.set('caption',state.caption);retryForm.set('file',selected,'mini-project.png');}
   const response=await fetch(ENDPOINT,{method:'POST',body:retryForm,signal:AbortSignal.any([signal,AbortSignal.timeout(45000)])});const data=await response.json();
   if(!response.ok||data.status!=='received'||!data.id)throw Error(data.error||'등록 완료를 확인하지 못했습니다.');
   state.receipt={id:data.id,display_no:data.display_no};save();await loadGallery();
  }catch(error){if(!disposed)q('#mini-upload-status').textContent='등록 완료를 확인하지 못했습니다. '+error.message;}finally{busy=false;if(!disposed)sync();}
 });
 loadGallery();
 return ()=>{disposed=true;controller.abort();clearInterval(tick);clearTimeout(finish);if(previewUrl)URL.revokeObjectURL(previewUrl);if(downloadUrl)URL.revokeObjectURL(downloadUrl);};
}
