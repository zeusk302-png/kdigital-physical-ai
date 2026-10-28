(() => {
  'use strict';
  const el=id=>document.getElementById(id),modules=window.STANDARDS_COURSE.modules;
  const interactions={pending:['요청 #8 LED 켜기 · 응답 대기','아직 적용 결과를 알 수 없습니다. 해당 요청 응답과 다음 상태를 확인합니다.'],ack:['요청 #8 · 보드 코드 적용 응답','프로그램 응답입니다. 보드 보고 상태와 실제 LED를 따로 확인합니다.'],timeout:['요청 #8 · 응답 시간 초과 · 적용 여부 미확인','자동 재전송하지 않습니다. 연결·보드 상태와 실제 출력을 확인합니다.'],rejected:['요청 #8 · 명령 거절 · 기준 순서 확인','켜짐 기준이 꺼짐 기준보다 작게 고친 뒤 다시 요청합니다.']};
  function interaction(){const s=interactions[el('interaction-state').value];el('interaction-message').textContent=s[0];el('interaction-next').textContent=s[1];}
  el('interaction-state').addEventListener('change',interaction);interaction();
  const information={normal:['밝기 raw320/1023 · 온도24.3 °C · 습도48 %','정상 수신 예 · PC 마지막 정상 수신14:22:10'],null:['밝기 raw320/1023 · 온도 — · 습도 —','온습도 센서값 없음 · 밝기는 정상 수신 예'],stale:['밝기 — · 온도 — · 습도 —','전체 수신 중단 · 마지막 정상 수신14:22:10 · 과거 기록과 구별']};
  function info(){const s=information[el('information-state').value];el('information-values').textContent=s[0];el('information-time').textContent=s[1];}
  el('information-state').addEventListener('change',info);info();
  // Relative luminance of opaque sRGB colors; do not round before comparison.
  function luminance(hex){const c=hex.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;}
  function contrast(){const fg=el('foreground').value,bg=el('background').value,a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);el('contrast-sample').style.color=fg;el('contrast-sample').style.backgroundColor=bg;el('contrast-result').textContent=ratio.toFixed(4)+' : 1 · 일반 본문4.5:1 조건 '+(ratio>=4.5?'충족':'미달');el('contrast-result').dataset.ratio=String(ratio);el('contrast-colors').textContent='글자 '+fg+' / 배경 '+bg+' · 반올림 전 값으로 판정';}
  for(const id of ['foreground','background'])el(id).addEventListener('input',contrast);
  for(const [id,fg,bg] of [['preset-gray','#777777','#ffffff'],['preset-black','#000000','#ffffff'],['preset-same','#ffffff','#ffffff']])el(id).addEventListener('click',()=>{el('foreground').value=fg;el('background').value=bg;contrast();});
  contrast();
  for(const prefix of ['','focus-'])el(prefix+'keyboard-demo').addEventListener('click',()=>{el(prefix+'keyboard-result').textContent='확인 동작이 실행되었습니다. 입력 수단과 초점 표시를 직접 기록하세요.';});
  if(matchMedia('(max-width:700px)').matches)document.querySelector('.toc-panel').open=false;
  // Keep earlier shared links useful while leaving every article on this page.
  const u=new URL(location.href),requested=u.searchParams.get('standard'),m=modules.find(m=>m.id===requested);
  if(m&&(!u.hash||u.hash==='#workbench')){
    const value=Number(u.searchParams.get('step')),n=Number.isInteger(value)&&value>0?Math.min(value,m.steps.length):1;
    u.hash=m.id+'-'+String(n).padStart(2,'0');history.replaceState(null,'',u);
    requestAnimationFrame(()=>el(u.hash.slice(1))?.scrollIntoView({block:'start'}));
  }
  const tocLinks=[...document.querySelectorAll('#standard-overview a')];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      const seen=entries.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if(!seen)return;
      for(const a of tocLinks){if(a.hash==='#'+seen.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}
    },{rootMargin:'0px 0px -70% 0px',threshold:0});
    for(const section of document.querySelectorAll('.standard-module,.reference-article'))observer.observe(section);
  }
})();
