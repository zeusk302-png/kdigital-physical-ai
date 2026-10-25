/* Unpowered connection model; this is not an electrical current simulator. */
const BreadboardTheory=(()=>{
 const cols='ABCDEFGHIJ';
 const group=h=>(cols.indexOf(h[0])<5?'ABCDE':'FGHIJ').split('').map(c=>c+h.slice(1));
 const same=(a,b)=>group(a).includes(b);
 function svg(a='A10',b='E10',bridge=false){
  const x=c=>52+cols.indexOf(c)*39+(cols.indexOf(c)>4?60:0),y=r=>90+(r-8)*44;
  const g1=group(a),g2=group(b),joined=same(a,b)||bridge;
  let s='<svg viewBox="0 0 520 330" role="img" aria-label="빵판 내부 금속판과 선택한 두 구멍"><rect x="16" y="32" width="490" height="284" rx="12" fill="#f3f1e7"/><rect x="232" y="48" width="52" height="252" rx="5" fill="#d6d8ca"/>';
  for(const c of cols)s+=`<text x="${x(c)}" y="63" text-anchor="middle" font-size="16" fill="#36573e">${c}</text>`;
  for(let r=8;r<=12;r++)for(const side of ['ABCDE','FGHIJ']){
   const first=g1.includes(side[0]+r),second=g2.includes(side[0]+r),color=first?'#c7dfb2':second?(joined?'#c7dfb2':'#ecd4ad'):'#dedcc7';
   s+=`<rect x="${x(side[0])-12}" y="${y(r)-10}" width="180" height="20" rx="7" fill="${color}" stroke="#aaa98f"/>`;
   if(side==='ABCDE')s+=`<text x="22" y="${y(r)+5}" font-size="14">${r}</text>`;
   for(const c of side)s+=`<circle cx="${x(c)}" cy="${y(r)}" r="5" fill="#748173"/>`;
  }
  if(bridge)s+=`<path d="M${x(a[0])} ${y(+a.slice(1))} Q260 0 ${x(b[0])} ${y(+b.slice(1))}" fill="none" stroke="#dc8646" stroke-width="5"/>`;
  for(const[h,color]of [[a,'#245c42'],[b,joined?'#245c42':'#b27633']])s+=`<circle cx="${x(h[0])}" cy="${y(+h.slice(1))}" r="12" fill="white" stroke="${color}" stroke-width="3"/><text x="${x(h[0])}" y="${y(+h.slice(1))+5}" text-anchor="middle" font-size="11" font-weight="700" fill="${color}">${h[0]}</text>`;
  return s+'</svg>';
 }
 function mini(type){const bad=type==='bypass',open=type==='open';return `<svg viewBox="0 0 320 120" role="img" aria-label="${bad?'저항 우회':open?'단선':'닫힌 회로'}"><path d="M32 33H100M158 33H213M246 33H286V96H32V33" stroke="#628064" stroke-width="4" fill="none"/><rect x="100" y="22" width="58" height="22" rx="5" fill="#e5d1a4" stroke="#9c8255"/><text x="129" y="16" text-anchor="middle" font-size="12">저항</text><path d="M213 17L242 33L213 49Z M243 15V51" fill="#de7860" stroke="#b35b43"/><text x="227" y="70" text-anchor="middle" font-size="12">LED</text><text x="16" y="24" font-size="12">출력</text><text x="23" y="115" font-size="12">GND</text>${bad?'<path d="M95 33V68H163V33" fill="none" stroke="#c26b32" stroke-width="4"/><text x="128" y="87" text-anchor="middle" font-size="11">같은 금속판이 저항 양끝을 연결</text>':''}${open?'<rect x="70" y="88" width="45" height="16" fill="#faf9f4"/><text x="93" y="115" text-anchor="middle" font-size="11">선이 빠짐</text>':''}</svg>`;}
 function render(){return `<p class="eyebrow">BEFORE WIRING · 빵판을 읽는 법</p><h2>왜 하필 그 구멍에 꽂을까요?</h2><p class="theory-lead">겉으로는 구멍이지만, 안에는 여러 구멍을 잇는 금속판이 있습니다.<br>같은 금속판을 쓰면 선을 따로 꽂지 않아도 전기가 이어집니다.</p>
 <div class="theory-intro"><article><b>01 · 같은 숫자의 다섯 구멍</b><p><strong>A10~E10</strong>은 한 묶음입니다. <strong>F10~J10</strong>은 다른 한 묶음입니다. A10과 A11은 옆줄이라 떨어져 있습니다.</p></article><article><b>02 · 가운데 홈은 끊긴 곳</b><p>E10과 F10은 숫자가 같아도 이어져 있지 않습니다. 연결하려면 점퍼선으로 두 묶음을 이어야 합니다.</p></article><article><b>03 · 주소보다 연결 대상</b><p>저항 다리가 C15에 있어서 같은 묶음의 A15를 고릅니다. <strong>빈 B15·D15·E15도 같은 연결</strong>입니다. A16은 대체 위치가 아닙니다.</p></article></div>
 <div class="theory-explorer"><div><h3>두 구멍을 골라 안쪽을 보세요.</h3><p>연두색 띠는 내부 금속판을 설명하기 위해 그렸습니다. 실물에 보이는 색은 아닙니다.</p><div class="theory-controls"><label>첫 구멍<select id="theory-a"></select></label><label>둘째 구멍<select id="theory-b"></select></label></div><label class="theory-jumper"><input type="checkbox" id="theory-bridge">두 구멍 사이에 점퍼선 추가</label><div class="theory-presets"><button data-pair="A10,E10">같은 줄</button><button data-pair="A10,A11">다른 줄</button><button data-pair="E10,F10">홈 건너편</button></div><div id="theory-answer" role="status" aria-live="polite"></div></div><div id="theory-board"></div></div>
 <div class="theory-path"><h3>LED가 켜지는 길을 따라가세요.</h3><ol><li><b>UNO D8 → A15·C15</b><span>8번 출력이 저항 한쪽으로 들어갑니다.</span></li><li><b>저항 → C10·E10</b><span>저항을 거친 뒤 LED의 긴 다리로 갑니다.</span></li><li><b>LED → E11·A11 → GND</b><span>짧은 다리에서 보드 GND로 돌아가는 길을 만듭니다.</span></li></ol><p>출력이 HIGH일 때 전압 차이로 이 경로에 전류가 흐릅니다. GND는 이 회로의 0V 기준입니다. 빵판이 전기를 만드는 것은 아닙니다.</p><a href="?lab=K01#workbench">실제 LED 배선에서 이 길 찾기 →</a></div>
 <h3>모양은 비슷해도 결과가 다릅니다.</h3><div class="theory-compare"><article>${mini('ok')}<h4>부품을 거치는 닫힌 길</h4><p>저항과 LED를 차례로 지나 GND로 돌아갑니다. 저항은 전류를 제한하고 LED는 빛을 냅니다.</p></article><article>${mini('open')}<h4>단선 · 돌아가는 길이 없음</h4><p>이 LED 회로에서 GND 선이 빠지면 길이 끊겨 켜지지 않습니다. 코드가 맞아도 배선이 끊기면 동작하지 않습니다.</p></article><article>${mini('bypass')}<h4>저항 양끝을 같은 묶음에 꽂음</h4><p>금속판이 저항을 우회합니다. 저항을 꽂아 둔 모양이어도 전류가 제한되지 않아 부품을 손상시킬 수 있습니다.</p></article></div>
 <div class="theory-bottom"><article><h3>전원 레일은 전기를 나눠 쓰는 줄</h3><p>큰 빵판 가장자리의 +·−와 색 선은 구분 표시입니다. +에 전선을 꽂기만 해서는 5V가 되지 않습니다. 전원과 연결해야 합니다. 좌우·중간 레일이 끊긴 제품도 있습니다.</p><p>이번 그림은 <b>가운데 단자 부분</b>을 사용합니다. A~E 규칙을 긴 전원 레일에 적용하지 마세요.</p></article><article><h3>전원·신호·공통 GND</h3><p>서보의 빨강선은 외부 5V 전원, 주황선은 UNO D9의 명령 신호입니다. 갈색선과 UNO GND를 잇는 이유는 신호를 같은 기준으로 읽기 위해서입니다.</p><p>외부 +5V를 USB로 켜진 UNO 5V와 임의로 묶는다는 뜻은 아닙니다. <a href="?lab=K18#workbench">서보의 실제 경로 보기 →</a></p></article></div>
 <details class="theory-more"><summary>회로를 옮기는 법·전류와 저항·전원 없이 검사하기</summary><h3>다른 줄로 옮기려면 연결된 다리와 선도 함께</h3><p>A15를 빈 B15로 바꾸면 같은 회로입니다. A15를 A16으로 옮겼다면 C15의 저항 다리도 같은 16번 묶음으로 옮겨야 합니다. 이미 부품이 꽂힌 구멍에 선을 겹쳐 꽂지 않습니다. 도면의 선이 교차한다고 실제로 연결되는 것도 아닙니다.</p><h3>왜 저항이 필요한가요?</h3><p>전압은 두 점 사이의 차이이고, 전류는 회로를 흐르는 양입니다. 5V 출력·빨강 LED 약2V·1kΩ의 시작 예는 (5−2)/1000 ≈0.003A, 약3mA입니다. 실제 부품에 따라 달라집니다. 저항은 방향이 없고 LED는 극성이 있습니다.</p><h3>전원 단락은 실제 전원으로 시험하지 않습니다.</h3><p>5V와 GND를 부품 없이 같은 금속판으로 바로 이으면 큰 전류가 흐를 수 있습니다. 실제 배선은 USB·외부 전원을 뺀 뒤 바꿉니다.</p><h3>멀티미터가 있다면 빈 빵판부터</h3><p>전원을 모두 빼고 연속성 모드로 A10–E10(연결), A10–A11(분리), E10–F10(분리)을 확인합니다. 부품이 꽂혀 있으면 다른 경로로 이어질 수 있습니다.</p><p><a href="breadboard.md" download>원리 설명 원문 ↓</a> · <a href="https://learn.adafruit.com/breadboards-for-beginners/breadboards" target="_blank" rel="noopener">Adafruit 내부 구조 설명 ↗</a></p></details>`;}
 function bind(root){
  const q=s=>root.querySelector(s),options=Array.from({length:5},(_,i)=>8+i).flatMap(r=>cols.split('').map(c=>c+r));
  for(const id of ['#theory-a','#theory-b'])q(id).innerHTML=options.map(h=>`<option>${h}</option>`).join('');
  q('#theory-a').value='A10';q('#theory-b').value='E10';
  function update(){const a=q('#theory-a').value,b=q('#theory-b').value,bridge=q('#theory-bridge').checked&&a!==b,connected=same(a,b);q('#theory-bridge').disabled=a===b;if(a===b)q('#theory-bridge').checked=false;q('#theory-board').innerHTML=svg(a,b,bridge);q('#theory-answer').innerHTML=`<strong>${connected?'이미 안에서 연결돼 있습니다.':bridge?'점퍼선을 통해 연결됐습니다.':'안에서는 연결되지 않습니다.'}</strong><p>${connected?`${a===b?'같은 구멍을 두 번 골랐습니다. 한 구멍에 선 두 개를 겹쳐 꽂지 않습니다.':`${a} / ${b}: 두 구멍은 ${group(a).join('·')}의 같은 금속판입니다.`} ${bridge?'선이 추가돼도 연결 관계는 같습니다.':'별도 점퍼선이 필요 없습니다.'}`:`${a} 묶음(${group(a).join('·')})과 ${b} 묶음(${group(b).join('·')})은 떨어져 있습니다. ${bridge?'추가한 선이 두 묶음을 이었습니다.':'이어야 한다면 점퍼선이나 회로에서 정한 부품이 필요합니다.'}`}</p><small>전원이 없는 연결 구조 모형입니다. LED 밝기나 전류를 계산하는 실험은 아닙니다.</small>`;}
  ['#theory-a','#theory-b','#theory-bridge'].forEach(id=>q(id).onchange=update);
  root.querySelectorAll('[data-pair]').forEach(b=>b.onclick=()=>{const[a,c]=b.dataset.pair.split(',');q('#theory-a').value=a;q('#theory-b').value=c;q('#theory-bridge').checked=false;update();});update();
 }
 return{render,bind,group,same,svg};
})();
