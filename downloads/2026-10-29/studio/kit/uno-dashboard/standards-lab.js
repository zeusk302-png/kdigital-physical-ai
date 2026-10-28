(() => {
  'use strict';
  const el=id=>document.getElementById(id), modules=window.STANDARDS_COURSE.modules;
  let moduleIndex=0, stepIndex=0;
  const link=(text,href)=>{const a=document.createElement('a');a.textContent=text;a.href=href;return a;};
  function destination(mi,si){const u=new URL(location.href);u.search='';u.searchParams.set('standard',modules[mi].id);u.searchParams.set('step',String(si+1));u.hash='workbench';return u;}
  function readLocation(){
    const q=new URLSearchParams(location.search), legacy=location.hash.slice(1);
    let id=q.get('standard')||legacy;
    if(legacy==='contrast'&&!q.has('standard'))id='W22';
    moduleIndex=Math.max(0,modules.findIndex(m=>m.id===id));
    const n=Number(q.get('step'));
    stepIndex=Number.isInteger(n)&&n>0?Math.min(n-1,modules[moduleIndex].steps.length-1):0;
    if(legacy==='contrast'&&!q.has('step'))stepIndex=modules[moduleIndex].steps.findIndex(s=>s.demo==='contrast');
  }
  function navigate(mi,si,{focus=true}={}){
    moduleIndex=mi;stepIndex=si;history.pushState(null,'',destination(mi,si));render();
    if(focus)el('step-title').focus({preventScroll:true});
    if(matchMedia('(max-width:680px)').matches&&focus)el('step-title').scrollIntoView({block:'start'});
  }
  function navLink(a,mi,si){a.href=destination(mi,si).href;a.addEventListener('click',e=>{if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();navigate(mi,si);});return a;}
  function render(){
    const m=modules[moduleIndex],s=m.steps[stepIndex];
    el('standard-overview').replaceChildren();
    modules.forEach((item,i)=>{
      const a=navLink(document.createElement('a'),i,0),small=document.createElement('small'),title=document.createElement('strong'),sub=document.createElement('span');
      small.textContent=item.label;title.textContent=item.title;sub.textContent=item.steps.length+'단계 · '+item.topics.length+'개 핵심 관점';
      a.append(small,title,sub);if(i===moduleIndex)a.setAttribute('aria-current','page');el('standard-overview').append(a);
    });
    el('step-list').replaceChildren();
    m.steps.forEach((item,i)=>{const a=navLink(document.createElement('a'),moduleIndex,i),n=document.createElement('span'),title=document.createElement('span');n.className='step-number';n.textContent=String(i+1).padStart(2,'0');title.textContent=item.title;a.append(n,title);if(i===stepIndex)a.setAttribute('aria-current','step');el('step-list').append(a);});
    el('standard-label').textContent=m.label;
    el('module-title').textContent=m.question;
    el('module-scope').textContent=m.scope;
    el('topic-map').replaceChildren(...m.topics.map(t=>{const span=document.createElement('span');span.textContent=t;return span;}));
    el('step-count').textContent='STEP '+String(stepIndex+1).padStart(2,'0')+' / '+String(m.steps.length).padStart(2,'0');
    for(const [id,key] of [['step-title','title'],['step-term','term'],['step-explanation','explanation'],['step-before','before'],['step-after','after'],['step-task','task'],['step-answer','answer']])el(id).textContent=s[key];
    el('answer').open=false;
    el('step-visual').replaceChildren();
    if(stepIndex===0&&s.demo!=='process'){const img=document.createElement('img');img.src='standard-'+m.id+'.svg';img.alt=m.id==='S11'?'사용자와 상황, 과업, 완료 근거를 효과성·효율성·만족도로 살피는 그림':m.id==='S110'?'화면 요청, 코드 응답, 보드 보고 상태, 실제 점등 관찰을 구별하는 그림':m.id==='S112'?'이름과 출처, 값과 범위, 시간 의미, 현재 수신 상태를 구별하는 그림':'인식·운용·이해·견고성의 네 관점과 적용 예';el('step-visual').append(img);const mobile=document.createElement('div');mobile.className='mobile-map';const title=document.createElement('p');title.className='visual-title';title.textContent=m.visual.title;const cards=document.createElement('div');cards.className='flow';for(const [a,b] of m.visual.cards){const card=document.createElement('div'),strong=document.createElement('strong');strong.textContent=a;card.append(strong,document.createElement('br'),document.createTextNode(b));cards.append(card);}const caption=document.createElement('p');caption.className='demo-note';caption.textContent=m.visual.caption;mobile.append(title,cards,caption);el('step-visual').append(mobile);}
    if(s.demo==='process'){
      const flow=document.createElement('div');flow.className='flow';flow.setAttribute('aria-label','상황 이해에서 평가와 수정으로 이어지는 네 활동');
      ['상황 이해','요구 정의','설계안 만들기','평가·다시 수정'].forEach((t,i)=>{const d=document.createElement('div'),b=document.createElement('b');b.textContent=String(i+1).padStart(2,'0');d.append(b,document.createTextNode(t));flow.append(d);});el('step-visual').append(flow);
    }
    renderDemo(s.demo);
    const before=modules.slice(0,moduleIndex).reduce((n,m)=>n+m.steps.length,0),total=modules.reduce((n,m)=>n+m.steps.length,0);
    el('position').textContent=(before+stepIndex+1)+' / '+total+' 전체 단계';
    el('previous-step').disabled=moduleIndex===0&&stepIndex===0;
    el('next-step').disabled=moduleIndex===modules.length-1&&stepIndex===m.steps.length-1;
    el('previous-step').textContent=stepIndex===0&&moduleIndex>0?'← 이전 기준':'← 이전';
    el('next-step').textContent=stepIndex===m.steps.length-1&&moduleIndex<modules.length-1?'다음 기준 →':'다음 →';
    for(const name of ['previous','next'])el(name+'-step-top').disabled=el(name+'-step').disabled;
    el('source-links').replaceChildren(...m.sources.map(source=>{const li=document.createElement('li'),a=link(source.title,source.url);a.target='_blank';a.rel='noopener';li.append(a);return li;}));
    document.title=m.title+' · '+s.title+' | 표준 단계별 수업';
  }
  const interactions={pending:['요청 #8 LED 켜기 · 응답 대기','아직 적용 결과를 알 수 없습니다. 해당 요청 응답과 다음 상태를 확인합니다.'],ack:['요청 #8 · 보드 코드 적용 응답','프로그램 응답입니다. 보드 보고 상태와 실제 LED를 따로 확인합니다.'],timeout:['요청 #8 · 응답 시간 초과 · 적용 여부 미확인','자동 재전송하지 않습니다. 연결·보드 상태와 실제 출력을 확인합니다.'],rejected:['요청 #8 · 명령 거절 · 기준 순서 확인','켜짐 기준이 꺼짐 기준보다 작게 고친 뒤 다시 요청합니다.']};
  const information={normal:['밝기 raw320/1023 · 온도24.3 °C · 습도48 %','정상 수신 예 · PC 마지막 정상 수신14:22:10'],null:['밝기 raw320/1023 · 온도 — · 습도 —','온습도 센서값 없음 · 밝기는 정상 수신 예'],stale:['밝기 — · 온도 — · 습도 —','전체 수신 중단 · 마지막 정상 수신14:22:10 · 과거 기록과 구별']};
  // WCAG relative luminance for opaque sRGB. Compare the unrounded ratio.
  function luminance(hex){const c=hex.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;}
  function renderDemo(kind){
    const box=el('demo-area');box.replaceChildren();box.hidden=!kind||kind==='process';if(box.hidden)return;
    if(kind==='interaction'||kind==='information'){
      const interaction=kind==='interaction',selectId=interaction?'interaction-state':'information-state',messageId=interaction?'interaction-message':'information-values',detailId=interaction?'interaction-next':'information-time',data=interaction?interactions:information;
      const label=document.createElement('label'),select=document.createElement('select'),message=document.createElement('p'),detail=document.createElement('p'),note=document.createElement('p');
      label.htmlFor=selectId;label.append(document.createTextNode(interaction?'명령 상황':'수신 상황'));select.id=selectId;
      const names=interaction?{pending:'명령 응답 대기',ack:'해당 요청의 적용 응답',timeout:'응답 시간 초과',rejected:'명령 거절'}:{normal:'정상 수신',null:'온습도 센서만 실패',stale:'전체 수신 중단'};
      for(const [value,text] of Object.entries(names)){const o=document.createElement('option');o.value=value;o.textContent=text;select.append(o);}
      label.append(select);message.id=messageId;message.className='outcome';message.setAttribute('role','status');detail.id=detailId;note.className='demo-note';note.textContent='문구를 비교하는 연습 예제 · 실제 USB 명령·측정 없음';
      const update=()=>{message.textContent=data[select.value][0];detail.textContent=data[select.value][1];};select.addEventListener('change',update);box.append(label,message,detail,note);update();return;
    }
    if(kind==='contrast'){
      box.innerHTML='<h4>두 색의 일반 본문 대비</h4><div class="color-controls"><label for="foreground">글자색<input id="foreground" type="color" value="#777777"></label><label for="background">배경색<input id="background" type="color" value="#ffffff"></label><button type="button" id="preset-gray">회색/흰색</button><button type="button" id="preset-black">검정/흰색</button><button type="button" id="preset-same">같은 색</button></div><p id="contrast-sample">대시보드 본문 · 센서의 이름과 상태를 읽어 보세요.</p><p id="contrast-result" class="outcome" role="status"></p><p id="contrast-colors"></p>';
      const update=()=>{const fg=el('foreground').value,bg=el('background').value,a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);el('contrast-sample').style.color=fg;el('contrast-sample').style.backgroundColor=bg;el('contrast-result').textContent=ratio.toFixed(4)+' : 1 · 일반 본문4.5:1 조건 '+(ratio>=4.5?'충족':'미달');el('contrast-result').dataset.ratio=String(ratio);el('contrast-colors').textContent='글자 '+fg+' / 배경 '+bg+' · 반올림 전 값으로 판정';};
      for(const id of ['foreground','background'])el(id).addEventListener('input',update);
      for(const [id,fg,bg] of [['preset-gray','#777777','#ffffff'],['preset-black','#000000','#ffffff'],['preset-same','#ffffff','#ffffff']])el(id).addEventListener('click',()=>{el('foreground').value=fg;el('background').value=bg;update();});update();return;
    }
    if(kind==='keyboard'){
      box.innerHTML='<h4>키보드로 직접 조작</h4><p>Tab으로 버튼을 선택하고 초점 테두리를 본 뒤 Enter 또는 Space로 실행합니다. Shift+Tab으로 되돌아갑니다.</p><button type="button" id="keyboard-demo">키보드로 확인하기</button><p id="keyboard-result" role="status">아직 실행하지 않음</p>';
      el('keyboard-demo').addEventListener('click',()=>{el('keyboard-result').textContent='확인 동작이 실행되었습니다. 입력 수단과 초점 표시를 직접 기록하세요.';});
    }
  }
  el('previous-step').addEventListener('click',()=>{if(stepIndex>0)navigate(moduleIndex,stepIndex-1);else if(moduleIndex>0)navigate(moduleIndex-1,modules[moduleIndex-1].steps.length-1);});
  el('next-step').addEventListener('click',()=>{if(stepIndex<modules[moduleIndex].steps.length-1)navigate(moduleIndex,stepIndex+1);else if(moduleIndex<modules.length-1)navigate(moduleIndex+1,0);});
  for(const name of ['previous','next'])el(name+'-step-top').addEventListener('click',()=>el(name+'-step').click());
  addEventListener('popstate',()=>{readLocation();render();});
  addEventListener('hashchange',()=>{if(location.hash!=='#workbench'){readLocation();render();}});
  if(matchMedia('(max-width:680px)').matches)document.querySelector('.step-contents').open=false;
  readLocation();render();
})();
