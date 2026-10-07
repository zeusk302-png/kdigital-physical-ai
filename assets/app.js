/* Static, offline-capable course viewer. No account or network API required. */
(() => {
  'use strict';
  const data = window.COURSE_DATA;
  const loaded=new Map(),pending=new Map();
  async function loadSession(date){
    const summary=data.sessions.find(s=>s.date===date);if(!summary)return null;
    if(loaded.has(date))return loaded.get(date);
    if(!pending.has(date))pending.set(date,fetch(summary.detail_url).then(r=>{if(!r.ok)throw Error('수업 자료를 불러오지 못했습니다.');return r.json();}).then(s=>{loaded.set(date,s);return s;}).finally(()=>pending.delete(date)));
    return pending.get(date);
  }
  let renderVersion=0;
  const main = document.querySelector('#main');
  const sidebar = document.querySelector('#sidebar');
  const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = s => `#/sessions/${s.date}`;
  const inline = value => e(value).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>');
  const list = items => `<ul>${(items || []).map(x => `<li>${inline(typeof x === 'object' ? x.text || x.title || [x.path || x.url,x.scope].filter(Boolean).join(' — ') : x)}</li>`).join('')}</ul>`;
  const icon = name => `<img class="icon" src="assets/vendor/lucide/${name}.svg" alt="" width="20" height="20">`;
  const storeKey = 'physical-ai-course-progress-v1';
  let completed = [];
  try { const value = JSON.parse(localStorage.getItem(storeKey) || '[]'); if (Array.isArray(value)) completed = value.filter(d => data.sessions.some(s => s.date === d && s.ready)); } catch {}
  let lastLesson = null;
  try { const value = localStorage.getItem('physical-ai-last-lesson'); if (/^#\/sessions\/2026-10-\d{2}(?:\/(?:start|overview|lesson|workbook|practice|glossary|assessment|files|activity-A\d{2}))?(?:\?[^#]*)?$/.test(value || '') && data.sessions.some(s => value.startsWith(url(s)))) lastLesson = value; } catch {}
  let resourceDate = data.sessions[0].date;
  function notify(message) { const n = document.querySelector('#notice'); n.textContent = message; setTimeout(() => n.textContent = '', 2200); }
  function header(label, title, desc) { return `<div class="eyebrow">${e(label)}</div><h1>${e(title)}</h1>${desc ? `<p class="intro">${e(desc)}</p>` : ''}`; }
  function nav(route) {
    sidebar.innerHTML = `<button class="rail-close" type="button" aria-label="메뉴 닫기">${icon('x')}</button><a class="brand" href="#/"><span class="brand-icon">${icon('book-open')}</span><span>피지컬AI 강의실<small>K-DIGITAL TRAINING</small></span></a><p class="rail-caption">2026년 2기 · Track A</p><nav aria-label="주요 메뉴">${[['#/','book-open','전체 수업'],['#/prepare','arrow-right','시작 전 준비'],['#/data-lab','copy','데이터 실습실'],['#/resources','download','자료']].map(([href,i,t])=>`<a href="${href}" ${route===href?'aria-current="page"':''}>${icon(i)}${t}</a>`).join('')}</nav><p class="nav-label">10월 · 날짜별 수업</p><nav class="session-nav" aria-label="날짜별 강의">${data.sessions.map(s=>`<a href="${url(s)}" ${route.startsWith(url(s))?'aria-current="page"':''}><span class="nav-no">${String(s.session_number).padStart(2,'0')}</span><span class="nav-copy">${e(s.topic)}<small>${s.date.slice(5).replace('-','/')} (${s.weekday})</small></span></a>`).join('')}</nav><p class="rail-caption">10:00–17:00 · 중식 11:50–13:00<br>수록 강의 10일 · 하루 6교시</p>`;
  }
  function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}
  function dateState(s){const now=today();return s.date===now?'오늘':s.date<now?'지난 수업':'예정';}
  function rows(sessions) { return sessions.map(s=>`<article class="course-row"><div class="course-card-top"><span class="chapter-tag">수업 ${String(s.session_number).padStart(2,'0')}</span><span class="date-stamp">${s.date.slice(5).replace('-','.')} <small>${s.weekday} · ${dateState(s)}</small></span></div><h3><a href="${url(s)}">${e(s.topic)}</a></h3><p>${e(s.summary)}</p><div class="row-state"><span>50분씩 6교시${completed.includes(s.date)?' · 학습 완료':''}</span><a href="${url(s)}">오늘 할 일 ${icon('arrow-right')}</a></div></article>`).join(''); }

  function home() {
    const now=today(),current=data.sessions.find(s=>s.date>=now)||data.sessions.at(-1);
    const days=Math.round((Date.parse(current.date+'T00:00:00+09:00')-Date.parse(now+'T00:00:00+09:00'))/86400000);
    const label=days===0?'오늘 수업':days>0?`다음 수업 · D-${days}`:'마지막 수업 돌아보기';
    const groups=[['데이터 기초',['08']],['코드와 작업 기록',['14','15','16']],['웹과 센서',['20','21','22','23','29']],['프로젝트 기획',['30']]];
    return `<section class="home-heading"><div><div class="eyebrow">2026년 2기 · K-Digital Training</div><h1>피지컬AI,<br><em>기초부터 실습까지.</em></h1><p class="intro">데이터를 읽고, 코드를 실행하고, 결과를 확인합니다. 수업 날짜를 선택하면 오늘 할 일부터 볼 수 있습니다.</p></div></section><section class="home-start"><div class="start-copy"><span class="eyebrow">${label} · ${current.date.slice(5).replace('-','/')} (${current.weekday})</span><h2>${e(current.topic)}</h2><p>${e(current.summary)}</p><div class="actions"><a class="button" href="${url(current)}">오늘 할 일 보기 ${icon('arrow-right')}</a>${lastLesson&&lastLesson!==url(current)?`<a class="button secondary" href="${e(lastLesson)}">최근에 본 내용</a>`:''}</div></div><div class="start-guide"><span class="eyebrow">수업을 보는 순서</span><ol><li><span>01</span><div><strong>오늘 할 일</strong><small>필수 활동과 필요한 파일을 확인합니다.</small></div></li><li><span>02</span><div><strong>교안 읽고 직접 해보기</strong><small>설명과 예제를 본 뒤 활동을 엽니다.</small></div></li><li><span>03</span><div><strong>결과 확인하기</strong><small>예상과 실제를 비교하고 설명합니다.</small></div></li></ol></div></section><div class="progress-info"><span>나의 학습 기록 <strong>${completed.length} / 10</strong></span><progress value="${completed.length}" max="10" aria-label="나의 학습 기록"></progress><span class="text-note">이 브라우저에 저장</span></div><section><div class="section-head"><h2>전체 수업</h2><span class="text-note">10:00–17:00 · 중식 11:50–13:00</span></div><label class="search-box">${icon('search')}<span class="visually-hidden">강의 검색</span><input id="search" type="search" placeholder="주제 또는 날짜 검색"></label><p id="result-count" class="text-note" role="status">10개 수업</p><div id="course-list" class="stage-list">${groups.map(([title,dates])=>`<section class="course-stage"><h3>${title}</h3><div class="stage-cards">${rows(data.sessions.filter(s=>dates.includes(s.date.slice(-2))))}</div></section>`).join('')}</div></section>`;
  }

  function blocks(s) { return `<ol class="flow">${(s.blocks || []).map(b=>`<li><div><h3>${e(b.title || b.topic || b.name)} <small class="text-note">${b.minutes || b.duration_minutes || 50}분</small></h3><p>${e(b.activity || b.description || (Array.isArray(b.activities)?b.activities.join(' · '):b.activities) || '')}</p>${b.output || b.result ? `<p><strong>확인할 결과</strong> ${e(b.output || b.result)}</p>`:''}</div></li>`).join('')}</ol>`; }
  function downloads(s) {
    const primary=s.downloads.filter(d=>/student-examples.zip$|.pdf$/.test(d.href)),more=s.downloads.filter(d=>!primary.includes(d));
    const render=items=>`<ul class="download-list">${items.map(d=>{const type=d.href.split('.').pop().toLowerCase();return `<li><a href="${e(d.href)}" download><span class="file-type ${e(type)}">${type==='pptx'?'PPT':e(type.toUpperCase())}</span><span class="file-info"><strong>${e(d.title)}</strong><small>${e(d.description)}</small></span>${icon('download')}</a></li>`;}).join('')}</ul>`;
    return render(primary)+`<details class="extra-downloads"><summary>PPT와 원문 파일 더 보기</summary>${render(more)}</details>`;
  }

  function tabs(s, active) { const key=active==='files'?'files':['lesson','glossary','assessment'].includes(active)?'lesson':'today';return `<nav class="tabs" aria-label="수업 메뉴">${[['today','오늘 할 일'],['lesson','교안'],['files','자료']].map(([k,label])=>`<a href="${url(s)}/${k}" ${k===key?'aria-current="page"':''}>${label}</a>`).join('')}</nav><div class="reading-progress" aria-hidden="true"><span></span></div>`; }
  function card(s,a){return `<article class="activity-card ${a.current_required?'required':'optional'}"><span class="eyebrow">${a.id} · ${a.current_required?'필수':'더 해보기'}</span><h3><a href="${url(s)}/activity-${a.id}">${e(a.title)}</a></h3><p>${inline(a.purpose)}</p><p class="text-note">남길 결과: ${inline(a.student_output)}</p><a href="${url(s)}/activity-${a.id}">직접 해보기 →</a></article>`;}
  function todayPage(s){const times=['10:00–10:50','11:00–11:50','13:00–13:50','14:00–14:50','15:00–15:50','16:00–16:50'];return `<section class="today-intro"><h2>오늘 필수 활동 ${s.required_count}개</h2><p>아래 순서대로 설명을 듣고 직접 해 봅시다. 더 해보기는 먼저 마쳤을 때 선택하세요.</p><div class="actions"><a class="button secondary" href="${url(s)}/start">처음 실행하는 방법</a><a class="button secondary" href="${url(s)}/files">실습 파일 준비</a></div><label class="filter-toggle"><input id="essential-only" type="checkbox" checked>필수 활동만 보기</label><p class="text-note">50분 수업 뒤 10분 휴식 · 중식 11:50–13:00 · 16:50–17:00 파일 저장과 마무리</p></section>${s.study_plan.map((p,i)=>{const m=s.workbook.modules[i],required=m.activities.filter(a=>a.current_required),optional=m.activities.filter(a=>!a.current_required);return `<section class="period-section"><div class="period-heading"><span class="chapter-tag">${i+1}교시 · ${times[i]}</span><h2>${e(m.title)}</h2></div><p class="period-allocation">설명 15분 → 시연 8분 → 직접 해보기 20분 → 풀이 7분</p><p class="text-note">함께 볼 예: ${p.demonstration.map(a=>e(a.title)).join(' · ')}</p><a class="concept-link" href="${url(s)}/lesson?period=${i+1}">이 교시의 설명과 예제 읽기 →</a><div class="activity-grid">${required.map(a=>card(s,a)).join('')}</div><details class="optional-practice" hidden><summary>더 해보기 · ${optional.length}개</summary><div class="activity-grid">${optional.map(a=>card(s,a)).join('')}</div></details></section>`;}).join('')}<section><h2>마지막에 확인할 것</h2>${assessmentTable(s)}<a href="${url(s)}/assessment">확인 문제 풀기 →</a></section>`;}
  function assessmentTable(s){const a=s.assessment;return `<p>남길 결과: ${a.submission.map(inline).join(' / ')}</p><div class="table-wrap"><table><thead><tr><th>확인할 것</th><th>배점</th><th>충족 기준</th><th>일부 충족</th></tr></thead><tbody>${a.criteria.map(c=>`<tr><td>${e(c.title)}</td><td>${c.points}점</td><td>${e(c.full)}</td><td>${e(c.partial)}</td></tr>`).join('')}</tbody></table></div><p class="text-note">${e(a.scoring)}</p>`;}

  function lesson(s, tab) {
    const activityId=tab?.startsWith('activity-')?tab.slice(9):null;
    const active = (['today','start','overview','lesson','workbook','practice','glossary','assessment','files'].includes(tab)||s.activity_pages?.[activityId]) && (s.ready || tab==='overview') ? tab : (s.ready?'today':'overview');
    let content = '';
    if(activityId && s.activity_pages?.[activityId]) content=activityPage(s,activityId);
    else if(['today','workbook','overview','practice'].includes(active)) content=todayPage(s);
    else if(active === 'overview') {
      content = `${beginnerSupport(s)}<h2 id="objectives">이번 수업의 목표</h2>${list(s.objectives)}<h2 id="flow">오늘 배울 내용</h2><p class="text-note">설명과 시연을 본 뒤 직접 연습하고 결과를 함께 확인합니다. 아래 시간은 수업 계획이며 진행에 따라 조정됩니다.</p>${blocks(s)}<h2 id="outcome">결과물과 준비</h2>${list(s.deliverables)}${list(s.prerequisites)}${s.ready?`<div class="actions"><a class="button" href="${url(s)}/lesson">교안으로 이어가기 ↗</a><a class="button secondary" href="${url(s)}/files">자료 내려받기</a></div>`:`<div class="notice-box"><strong>상세 자료 제작 전</strong><p>현재 페이지는 제작 가정을 포함한 수업 구성안입니다. 교안 본문, PPT, 예제 코드의 제작·검증을 이어갈 예정입니다.</p>${list(s.gaps)}</div>`}`;
    } else if (active === 'files') content = `<h2>PPT·교안·예제 코드</h2><p>예제 묶음을 내려받아 압축을 푼 뒤 README의 순서대로 실행합니다.</p>${downloads(s)}${(s.practice_demos??[]).length?`<h3>브라우저 예제</h3><ul>${s.practice_demos.map(d=>`<li><a href="${e(d.href)}" target="_blank" rel="noopener">${e(d.title)} ↗</a></li>`).join('')}</ul>`:''}`;
    else {
      content=s.pages?.[active] || '<p>자료를 불러오지 못했습니다.</p>';
      if(active==='assessment')content=`<h2>오늘 배운 내용 확인</h2>${assessmentTable(s)}<h2>세 가지 확인 질문</h2>${list(s.assessment.questions)}${content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/,'').trim()?`<details><summary>더 해보기 · 추가 확인 문제</summary>${content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/,'')}</details>`:''}`;
      if(active==='lesson')content=`<div class="lesson-tools"><a href="${url(s)}/glossary">용어와 코드 기호</a><a href="${url(s)}/assessment">확인 문제</a></div>${content}`;
      if(active==='start'&&s.date==='2026-10-08') content=content.replace('<h2>오늘은 이 순서로 배웁니다</h2>',conceptMap()+'<h2>오늘은 이 순서로 배웁니다</h2>');
    }
    const idx = data.sessions.findIndex(item=>item.date===s.date), prev=data.sessions[idx-1],next=data.sessions[idx+1];
    return `<header class="lesson-header">${header(`수업 ${String(s.session_number).padStart(2,'0')} · 과정 ${s.course_day}일차`,s.topic,s.summary)}<div class="meta-line"><span><strong>${s.date.slice(5).replace('-','월 ')}일 (${s.weekday})</strong></span><span>10:00–17:00 · 50분씩 6교시</span><span>필수 활동 ${s.required_count}개</span></div></header>${tabs(s,activityId?'workbook':active)}<div class="lesson-layout"><nav class="toc" aria-label="이 페이지 목차"></nav><article class="lesson-article">${content}${active==='start'?`<div class="actions"><a class="button" href="${url(s)}/lesson">교안 읽기 ${icon('arrow-right')}</a><a class="button secondary" href="${url(s)}/workbook">활동 시작하기</a></div>`:''}</article></div>${s.ready?`<label class="complete-label"><input id="completed" type="checkbox" ${completed.includes(s.date)?'checked':''}>이 수업의 필수 실습을 마쳤어요 <small>내 브라우저에 기록</small></label>`:''}<nav class="lesson-nav" aria-label="이전 다음 강의"><a href="${prev?url(prev):'#/prepare'}">← ${prev?e(prev.topic):'시작 전 준비'}</a>${next?`<a href="${url(next)}">${e(next.topic)} →</a>`:'<a href="#/">전체 수업 →</a>'}</nav>`;
  }



  const conceptCases=[
    {label:'직원 표의 사번 "001"',structure:'구조: 정형 데이터의 한 필드',structureText:'사번·이름·부서라는 공통 열이 있는 직원 표의 값입니다.',meaning:'의미: 명목 범주형 식별자',meaningText:'사람을 구별하는 이름표입니다. 001과 002를 더해 003이라는 사람을 얻는 것이 아닙니다.',storage:'표현: 문자열',storageText:'앞의 0을 보존하고 계산할 수량과 구별합니다. 숫자처럼 보여도 컴퓨터 숫자로 바꿀 이유는 없습니다.'},
    {label:'센서 표의 섭씨 온도 22.5',structure:'구조: 정형 데이터의 한 필드',structureText:'센서·시각·온도 열에 맞춰 기록한 측정값입니다.',meaning:'의미: 연속형 수치',meaningText:'측정한 양입니다. 소수 첫째 자리까지 기록해도 온도 자체가 개수로 세는 이산량이 되지는 않습니다.',storage:'표현: 저장 방식에 따라 다름',storageText:'JSON에서는 숫자, Python 예제에서는 float로 표현합니다. CSV를 기본 설정으로 읽은 값은 문자열일 수 있습니다.'},
    {label:'자유롭게 쓴 고객 후기 한 문장',structure:'구조: 본문 내용은 비정형',structureText:'좋았던 점·날짜·요청 등이 자유 문장에 섞여 있어 필요한 항목을 찾아 정리해야 합니다.',meaning:'의미: 문장 속 여러 관찰과 의견',meaningText:'문장 전체를 곧바로 하나의 수치나 범주라고 단정하지 않습니다. 추출할 항목과 목적을 먼저 정합니다.',storage:'표현: 문자열',storageText:'컴퓨터가 문자열로 저장한다고 해서 그 내용이 모두 명목 범주형이라는 뜻은 아닙니다.'}
  ];
  function conceptCards(c){return ['structure','meaning','storage'].map((key,i)=>`<article><span class="eyebrow">관점 ${i+1}</span><h3>${e(c[key])}</h3><p>${e(c[key+'Text'])}</p></article>`).join('');}
  function conceptMap(){return `<section class="concept-map"><h2>같은 데이터, 서로 다른 세 관점</h2><p>“정형”, “범주형”, “문자열”은 서로 경쟁하는 답이 아닙니다. 각각 다른 질문에 답합니다.</p><label for="concept-case">비교할 사례</label><select id="concept-case">${conceptCases.map((c,i)=>`<option value="${i}">${e(c.label)}</option>`).join('')}</select><div class="concept-grid" id="concept-cards" aria-live="polite">${conceptCards(conceptCases[0])}</div></section>`;}
  function workbookPage(s){
    if(!s.workbook)return '<p>활동 자료를 준비 중입니다.</p>';
    return `<h2>개념을 이해하고 적용하는 ${s.activity_count??24}개 활동</h2><p>활동을 열어 예상 결과를 먼저 적어 보세요. 직접 작성하거나 값을 바꾼 뒤, 확인 질문으로 결과를 점검합니다.</p><div class="actions">${s.date==='2026-10-08'?'<a class="button" href="#/data-lab">CSV·JSON 작업 화면 ↗</a>':''}<a class="button secondary" href="${url(s)}/files">자료 내려받기</a></div>${s.workbook.modules.map(m=>`<section class="workbook-module"><h2>${e(m.title)} <small>${m.minutes}분</small></h2><div class="activity-grid">${m.activities.map(a=>`<article class="activity-card"><span class="eyebrow">${a.id} · ${a.current_required?'필수':'추가·복습'}</span><h3><a href="${url(s)}/activity-${a.id}">${e(a.title)}</a></h3><p>${e(a.purpose)}</p><p class="text-note">작성할 결과: ${e(a.student_output)}</p><a href="${url(s)}/activity-${a.id}">활동 열기 →</a></article>`).join('')}</div></section>`).join('')}`;
  }
  function activityPage(s,id){
    const current=s.workbook.modules.flatMap(m=>m.activities).find(a=>a.id===id);
    const activities=s.workbook.modules.flatMap(m=>m.activities).filter(a=>current?.current_required?a.current_required:true), idx=activities.findIndex(a=>a.id===id), a=activities[idx];
    const links=[...(a?.source_files||[]),...(a?.work_files||[])].map(file=>`<li><a href="downloads/${s.date}/${e(file)}" download>${e(file.split('/').pop())} ↓</a></li>`).join('');
    return `<div class="actions"><a class="button secondary" href="${url(s)}/today">← 오늘 할 일</a><a class="button secondary" href="${url(s)}/lesson?activity=${e(id)}">이 활동의 개념·코드 해설</a><a class="button" href="${url(s)}/files">예제 묶음과 자료 열기 ↗</a></div>${s.date==='2026-10-08'&&a.work_files.some(f=>/\.(csv|json)$/.test(f))?`<p class="lab-entry"><a href="#/data-lab?activity=${id}">CSV·JSON 실습실에서 작성하기 ${icon('arrow-right')}</a><small>활동에 맞는 저장 파일 이름을 미리 채웁니다.</small></p>`:''}${s.activity_pages[id]}${links?`<h3>이 활동의 파일</h3><ul>${links}</ul>`:''}<nav class="lesson-nav" aria-label="이전 다음 활동">${idx>0?`<a href="${url(s)}/activity-${activities[idx-1].id}">← ${activities[idx-1].id}</a>`:'<span></span>'}${idx<activities.length-1?`<a href="${url(s)}/activity-${activities[idx+1].id}">${activities[idx+1].id} →</a>`:`<a href="${url(s)}/assessment">확인 문제 →</a>`}</nav>`;
  }
  function beginnerSupport(s) {
    const b=s.beginner_support;if(!b)return '';
    return `<section><h2>먼저 이렇게 이해합니다</h2><p>${e(b.analogy)}</p>${b.plain_terms?.length?`<div class="table-wrap"><table><thead><tr><th>처음 만나는 말</th><th>쉬운 뜻</th></tr></thead><tbody>${b.plain_terms.map(t=>`<tr><td>${e(t.term)}</td><td>${e(t.meaning)}</td></tr>`).join('')}</tbody></table></div>`:''}<p><strong>먼저 해 보기</strong><br>${e(b.manual_task)}</p><p><strong>확인할 것</strong><br>${e(b.minimum_success)}</p>${b.optional_extension?`<details><summary>먼저 마쳤다면</summary><p>${e(b.optional_extension)}</p></details>`:''}</section>`;
  }

  const sensorCSV='sensor_id,location,temperature_c,measured_at,active\nS01,입구,22.5,2026-10-08 10:00,true\nS02,창고,24.0,2026-10-08 10:00,true\nS03,실습실,23.5,2026-10-08 10:00,true';
  let csvDraft=sensorCSV;
  let csvFilename='readings_work.csv',jsonFilename='readings_work.json';
  let jsonDraft='[\n  {"sensor_id":"S01","location":"입구","temperature_c":22.5,"measured_at":"2026-10-08 10:00","active":true},\n  {"sensor_id":"S02","location":"창고","temperature_c":null,"measured_at":"2026-10-08 10:05","active":true}\n]';
  function dataLab(){return `${header('DATA LAB · CSV & JSON','데이터 실습실','활동지의 원문을 붙여넣거나 직접 작성하고, 수정 전 예상과 수정 후 결과를 비교합니다. 설치와 로그인은 필요하지 않습니다.')}<div class="lesson-article"><p class="notice-box">이 화면은 형식을 확인하는 도구입니다. 올바른 형식이어도 온도·단위·중복 등 내용이 틀릴 수 있습니다. 데이터 사전과 활동지로 별도 검수하세요. 입력은 현재 탭에서 처리하며 새로고침 전에 파일로 내려받습니다. 내려받기가 지원되지 않는 브라우저에서는 입력 복사 후 편집기에 붙여넣고 UTF-8로 저장하세요.</p><section class="lab"><h2>CSV를 작성하고 표와 비교하기</h2><p>첫 줄은 열 이름입니다. 기록 한 건을 한 줄에 적고, 한 값 안에 쉼표가 있으면 그 값 전체를 큰따옴표로 감쌉니다.</p><label for="csv-input">CSV 입력</label><textarea id="csv-input" spellcheck="false">${e(csvDraft)}</textarea>${saveField('csv')}<div class="actions"><button class="button" id="csv-check">표로 보기</button><button class="button secondary" id="csv-comma">쉼표가 든 위치 예시</button><button class="button secondary" id="csv-save">CSV 파일로 내려받기</button><button class="button secondary" id="csv-copy">CSV 입력 복사</button></div><div id="csv-result" class="lab-output" role="status">열과 기록은 각각 몇 개인가요? 먼저 예상하고 표로 보기를 누르세요.</div><p>행을 추가한 뒤 기록 수가 늘었는지, 빈칸이 0으로 바뀌지 않았는지 확인합니다. 확인 결과만으로 실제 측정값이 맞다고 단정하지 않습니다.</p></section>${jsonLab()}<div class="actions"><a class="button secondary" href="#/sessions/2026-10-08/workbook">24개 활동 목록으로 ↗</a></div></div>`;}
  function saveText(name,value){const blob=new Blob([value],{type:'text/plain;charset=utf-8'}),href=URL.createObjectURL(blob),a=document.createElement('a');a.href=href;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(href),10000);notify('파일 내려받기를 요청했습니다. 저장된 파일과 내용 검수 결과를 확인하세요.');}
  function saveField(format){return `<div class="save-field"><label for="${format}-filename">저장할 파일 이름</label><input id="${format}-filename" type="text" value="${e(format==='csv'?csvFilename:jsonFilename)}" spellcheck="false" aria-describedby="${format}-file-hint ${format}-file-error"><small id="${format}-file-hint">활동지의 이름을 사용하세요. 예: ${format==='csv'?'A13_three.csv':'A17_object.json'}. 내려받은 파일은 예제의 work 폴더로 옮깁니다.</small><p id="${format}-file-error" class="field-error" role="status"></p></div>`;}
  function downloadName(format){const input=main.querySelector(`#${format}-filename`),name=input.value.trim(),error=main.querySelector(`#${format}-file-error`);if(!name||/[\\/:*?"<>|\x00-\x1f]/.test(name)||!name.toLowerCase().endsWith('.'+format)||name.startsWith('.')){error.textContent=`폴더 경로 없이 .${format}로 끝나는 파일 이름을 적어 주세요. 예: ${format==='csv'?'A13_three.csv':'A17_object.json'}`;input.setAttribute('aria-invalid','true');input.focus();return null;}error.textContent='';input.removeAttribute('aria-invalid');if(format==='csv')csvFilename=name;else jsonFilename=name;return name;}
  function resourceFiles(s){return `<div class="resource-heading"><div><span class="eyebrow">${s.date.slice(5).replace('-','/')} · 수업 ${String(s.session_number).padStart(2,'0')}</span><h2>${e(s.topic)}</h2></div><a class="button secondary" href="${url(s)}">수업 열기 ${icon('arrow-right')}</a></div><p>예제 묶음을 먼저 내려받아 압축을 풀고 README를 읽으세요. 교안과 실습지는 강의실에서도 바로 읽을 수 있습니다.</p>${downloads(s)}`;}
  // Teaching CSV parser: comma separator, quoted fields, doubled quotes and CR/LF.
  function parseCSV(raw){
    const input=raw.replace(/^\uFEFF/,'');if(!input.trim())throw new Error('내용이 비어 있습니다. 예시처럼 열 이름과 기록을 적어 주세요.');
    const rows=[];let row=[],field='',quoted=false,closed=false;
    for(let i=0;i<input.length;i++){
      const c=input[i];
      if(quoted){if(c==='"'){if(input[i+1]==='"'){field+='"';i++;}else{quoted=false;closed=true;}}else field+=c;continue;}
      if(c==='"'){if(field!==''||closed)throw new Error('큰따옴표는 값의 처음과 끝을 감싸야 합니다.');quoted=true;}
      else if(c===','){row.push(field);field='';closed=false;}
      else if(c==='\n'||c==='\r'){if(c==='\r'&&input[i+1]==='\n')i++;row.push(field);rows.push(row);row=[];field='';closed=false;}
      else{if(closed)throw new Error('닫는 큰따옴표 다음에는 쉼표나 줄바꿈이 와야 합니다.');field+=c;}
    }
    if(quoted)throw new Error('닫는 큰따옴표가 빠져 있습니다. 값을 감싼 큰따옴표를 확인해 주세요.');
    if(row.length||field!==''||closed){row.push(field);rows.push(row);}
    const headers=rows[0];if(!headers||headers.some(h=>!h.trim()))throw new Error('첫 줄에는 빈칸 없이 열 이름을 적어 주세요.');
    if(new Set(headers).size!==headers.length)throw new Error('같은 열 이름이 반복됩니다. 항목 이름을 구분해 주세요.');
    for(let n=1;n<rows.length;n++)if(rows[n].length!==headers.length)throw new Error(`${n}번째 기록의 칸은 ${rows[n].length}개입니다. 첫 줄의 ${headers.length}개와 비교하고 쉼표·큰따옴표를 확인해 주세요.`);
    return {headers,records:rows.slice(1)};
  }
  function csvEvents(){
    const button=main.querySelector('#csv-check');if(!button)return;
    function run(){const output=main.querySelector('#csv-result');try{const {headers,records}=parseCSV(main.querySelector('#csv-input').value);const blanks=records.flat().filter(v=>v==='').length;output.className='lab-output';output.innerHTML=`<p>열 ${headers.length}개 · 데이터 기록 ${records.length}개 <small>(첫 줄의 열 이름은 기록 수에서 제외)</small></p><div class="table-wrap" tabindex="0" role="region" aria-label="CSV 결과 표 · 좌우로 스크롤할 수 있습니다"><table><thead><tr>${headers.map(h=>`<th scope="col">${e(h)}</th>`).join('')}</tr></thead><tbody>${records.map(r=>`<tr>${r.map(v=>`<td>${v===''?'<em>빈값</em>':e(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${blanks?`<p>빈값 ${blanks}개를 찾았습니다. 빈값은 숫자 0과 다릅니다.</p>`:''}`;}catch(error){output.className='lab-output error';output.textContent=error.message;}}
    button.addEventListener('click',run);main.querySelector('#csv-input').addEventListener('input',ev=>csvDraft=ev.target.value);main.querySelector('#csv-comma').addEventListener('click',()=>{csvDraft='sensor_id,location,temperature_c,measured_at,active\nS01,"창고, 안쪽",22.5,2026-10-08 10:00,true';main.querySelector('#csv-input').value=csvDraft;run();});main.querySelector('#csv-save').addEventListener('click',()=>{csvDraft=main.querySelector('#csv-input').value;try{parseCSV(csvDraft);const name=downloadName('csv');if(name)saveText(name,csvDraft);}catch(error){run();notify('파일로 저장하기 전에 표시된 형식 오류를 확인하세요.');}});
  }


  function jsonLab(){return `<section class="lab"><h2>JSON을 작성하고 값의 종류 확인하기</h2><p>키와 글자는 큰따옴표로 감싸고, 숫자·true·false·null은 감싸지 않습니다. CSV의 빈 측정값을 JSON으로 옮길 때 이 수업에서는 null을 사용합니다.</p><label for="json-input">JSON 입력</label><textarea id="json-input" spellcheck="false">${e(jsonDraft)}</textarea>${saveField('json')}<div class="actions"><button class="button" id="json-check">구조 확인</button><button class="button secondary" id="json-save">JSON 파일로 내려받기</button><button class="button secondary" id="json-copy">JSON 입력 복사</button></div><div class="lab-output" id="json-output" role="status">배열 안의 두 번째 기록에서 temperature_c는 어떤 값인가요?</div><p class="text-note">파싱 성공은 문법 확인입니다. 기록 누락이나 잘못된 온도를 자동으로 정답 판정하지 않습니다.</p></section>`;}
  function prepare(){return `${header('수업 준비','첫 수업을 시작하기 전에','코딩 경험이 없어도 데이터의 뜻과 종류부터 함께 배웁니다. 프로그램 설치와 개인 실행은 강사의 안내에 따라 진행합니다.')}<div class="lesson-article"><div class="actions"><a class="button" href="#/sessions/2026-10-08/start">처음 시작 안내 읽기 ↗</a><a class="button secondary" href="#/data-lab">설치 없이 데이터 보기</a></div><h2>10/8에 필요한 것</h2><ol><li>브라우저와 텍스트 편집기를 사용할 수 있는 PC를 준비합니다.</li><li><a href="#/sessions/2026-10-08/files">10/8 예제 묶음</a>을 내려받아 압축을 풉니다.</li><li>Python이 준비된 PC에서는 묶음의 README에 있는 명령으로 실행합니다.</li><li>설치가 어려우면 <a href="#/data-lab">CSV·JSON 작업 화면</a>에서 직접 작성·변환·검수합니다. PC 사용이 어렵다면 같은 원문으로 종이 활동을 수행합니다.</li></ol><blockquote>설치가 어려우면 데이터 실습실에서 연습할 수 있습니다. 이후 수업에서는 제공 코드와 강사 시연을 비교하며 활동을 진행하세요.</blockquote><h2>파일과 실행 위치</h2><p><a href="#/sessions/2026-10-14/start">Windows에서 처음 Python을 실행하는 방법</a>에는 폴더 찾기, 터미널 열기, 현재 위치 확인과 첫 실행을 순서대로 안내합니다.</p><p>다운로드한 예제 폴더를 편집기로 열고, README의 파일명과 명령을 같은 위치에서 확인합니다. 결과를 직접 바꿔 보고 예상과 일치하는지 적습니다.</p><h2>계정과 장비가 필요한 수업</h2><div class="table-wrap"><table><thead><tr><th>수업</th><th>확인할 조건</th><th>대체 경로</th></tr></thead><tbody><tr><td>Git/GitHub</td><td>Git 설치, GitHub 로그인·원격 접근</td><td>로컬 저장소에서 변경 이력 실습</td></tr><tr><td>AI 코드에이전트 / MCP</td><td>교육용 도구·계정·권한·비용 지원</td><td>제공한 코드와 응답을 읽고 검증</td></tr><tr><td>OpenCV + 웹캠</td><td>카메라 모델·수량·접근 권한</td><td>제공 이미지와 프레임 파일</td></tr><tr><td>전자회로·ESP32</td><td>보드·부품·핀·전압 확인</td><td>배선 개념·모의 데이터 실습</td></tr></tbody></table></div><p>구체적인 장비와 도구가 정해지면 해당 날짜의 준비 항목을 확정합니다.</p><h2>자료를 읽는 순서</h2><p>데이터 기초 안내에서 의미와 종류를 먼저 이해하고, 교안과 활동지에서 사례를 분류한 뒤 CSV·JSON을 직접 작성합니다. PPT는 강사의 설명을 따라갈 때, 예제 코드는 실행 결과를 확인할 때 사용합니다.</p><div class="actions"><a class="button" href="#/sessions/2026-10-08">첫 수업으로 이동 ↗</a></div></div>`;}
  function resources(){const selected=loaded.get(resourceDate)||data.sessions[0];return `${header('수업 자료','필요한 자료를 한곳에서','수업 날짜를 고른 뒤 PPT, 교안, 실습 파일을 내려받으세요.')}<div class="resource-picker"><label for="resource-date">자료를 볼 수업</label><select id="resource-date">${data.sessions.filter(s=>s.downloads?.length).map(s=>`<option value="${s.date}" ${s.date===selected.date?'selected':''}>${s.date.slice(5).replace('-','/')} · ${e(s.topic)}</option>`).join('')}</select></div><section id="resource-files" class="resource-panel" aria-live="polite">${resourceFiles(selected)}</section><div class="resource-help"><h2>어떤 파일을 열면 될까요?</h2><div class="concept-grid"><article><h3>강의 내용을 볼 때</h3><p>웹 교안으로 설명과 예제를 읽습니다. PPT는 강사의 설명을 따라갈 때 사용합니다.</p></article><article><h3>직접 실습할 때</h3><p>예제 ZIP을 풀고 README부터 읽습니다. 원본을 보존하고 work 폴더의 작업본을 수정합니다.</p></article><article><h3>결과를 제출할 때</h3><p>활동지에 적힌 파일명과 결과를 확인합니다. 직접 실행했는지, 제공 출력과 비교했는지도 적습니다.</p></article></div></div>`;}
  function enhance(s) {
    const docTitle=main.querySelector('.lesson-article>h1');
    if(s&&docTitle){const title=document.createElement('p');title.className='visually-hidden';title.textContent=docTitle.textContent;docTitle.replaceWith(title);}
    if(s){
      const article=main.querySelector('.lesson-article');
      for(const child of [...article.children]){
        if(/^H[1-6]$/.test(child.tagName))break;
        if(child.tagName==='P'&&[`${s.date} · ${s.topic}`,s.summary].includes(child.textContent.trim()))child.remove();
      }
      if(article.querySelector('h1')){
        for(const h of [...article.querySelectorAll('h1,h2,h3,h4,h5')]){
          const next=document.createElement('h'+(Number(h.tagName.slice(1))+1));next.innerHTML=h.innerHTML;
          for(const attr of h.attributes)next.setAttribute(attr.name,attr.value);h.replaceWith(next);
        }
        article.classList.add('has-chapters');
      }
    }
    main.querySelectorAll('.lesson-article table').forEach(t=>{
      let w=t.parentElement;
      if(!w.classList.contains('table-wrap')){w=document.createElement('div');w.className='table-wrap';t.before(w);w.append(t);}
      w.tabIndex=0;w.setAttribute('role','region');w.setAttribute('aria-label','표 · 좌우로 스크롤할 수 있습니다');
    });
    if(s && location.hash.split('?')[0].endsWith('/lesson')){
      const article=main.querySelector('.lesson-article');
      const required=new Set(s.study_plan.flatMap(p=>p.required));
      for(const h of [...article.querySelectorAll('h2,h3')]){
        const id=h.textContent.trim().match(/^(A\d{2})\b/)?.[1];
        if(!id)continue;
        h.id='concept-'+id;
        if(required.has(id))continue;
        const details=document.createElement('details');details.className='optional-lesson';
        const summary=document.createElement('summary');summary.textContent='함께 볼 예 · '+h.textContent;
        const depth=Number(h.tagName.slice(1));let sibling=h.nextElementSibling;const nodes=[h];
        while(sibling){if(/^H[1-6]$/.test(sibling.tagName)&&Number(sibling.tagName.slice(1))<=depth)break;nodes.push(sibling);sibling=sibling.nextElementSibling;}
        h.before(details);details.append(summary);for(const node of nodes)details.append(node);
      }
    }
    main.querySelectorAll('pre').forEach(pre=>{
      const code=pre.querySelector('code');if(!code)return;
      const language=[...code.classList].find(c=>c.startsWith('language-'))?.slice(9)||'text';
      const names={python:'Python',py:'Python',json:'JSON',csv:'CSV',bash:'실행 명령',sh:'실행 명령',powershell:'PowerShell',text:'예시 / 출력',html:'HTML',css:'CSS',javascript:'JavaScript',js:'JavaScript'};
      pre.dataset.language=names[language]||language;pre.tabIndex=0;pre.setAttribute('aria-label',`${names[language]||language} 코드 또는 예시`);
      const btn=document.createElement('button');btn.type='button';btn.className='copy-code';btn.innerHTML=icon('copy')+'복사';btn.setAttribute('aria-label','코드 복사');
      btn.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(code.textContent);btn.textContent='복사됨';notify('코드를 복사했습니다.');}catch{btn.textContent='직접 선택';notify('복사를 사용할 수 없습니다. 코드를 선택해 복사하세요.');}});pre.append(btn);
    });
    const toc=main.querySelector('.toc');
    if(toc){
      const headings=[...main.querySelectorAll('.lesson-article h2,.lesson-article.has-chapters h3')];
      toc.innerHTML=`<details><summary><span>이 페이지 목차 <span class="toc-count">${headings.length}</span></span>${icon('chevron-down')}</summary><div class="toc-links"></div></details>`;
      const links=toc.querySelector('.toc-links');
      headings.forEach((h,i)=>{if(!h.id)h.id=`section-${i}`;const a=document.createElement('a');a.href=`${location.hash.split('?')[0]}?section=${h.id}`;a.textContent=h.textContent;
        a.addEventListener('click',ev=>{ev.preventDefault();if(!window.matchMedia('(min-width: 1200px)').matches)toc.querySelector('details').open=false;h.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});h.tabIndex=-1;h.focus({preventScroll:true});});links.append(a);});
      if(headings.length<2)toc.hidden=true;
      toc.querySelector('details').open=window.matchMedia('(min-width: 1200px)').matches;
      window.tocObserver=new IntersectionObserver(entries=>{const visible=entries.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(visible)toc.querySelectorAll('a').forEach(a=>{if(a.href.endsWith('section='+visible.target.id))a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});},{rootMargin:'-110px 0px -55% 0px'});headings.forEach(h=>window.tocObserver.observe(h));
    }
    const check=main.querySelector('#completed'); if(check)check.addEventListener('change',()=>{completed=completed.filter(d=>d!==s.date);if(check.checked)completed.push(s.date);try{localStorage.setItem(storeKey,JSON.stringify(completed));notify('학습 기록을 저장했습니다.');}catch{notify('브라우저 저장이 제한되어 이번 화면에서만 표시합니다.');}});
    const input=main.querySelector('#search');if(input)input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();const found=data.sessions.filter(s=>`${s.topic} ${s.date} ${s.date.slice(5).replace('-','/')} ${s.module}`.toLowerCase().includes(q));main.querySelector('#course-list').innerHTML=found.length?rows(found):'<p>일치하는 수업이 없습니다. 주제나 날짜를 다시 입력해 주세요.</p>';main.querySelector('#result-count').textContent=`${found.length}개 수업`;});
    const conceptSelect=main.querySelector('#concept-case');if(conceptSelect)conceptSelect.addEventListener('change',()=>{const c=conceptCases[Number(conceptSelect.value)];if(c)main.querySelector('#concept-cards').innerHTML=conceptCards(c);});
    const resourceSelect=main.querySelector('#resource-date');if(resourceSelect)resourceSelect.addEventListener('change',async()=>{resourceDate=resourceSelect.value;const date=resourceDate;const panel=main.querySelector('#resource-files');panel.innerHTML='<p>자료를 불러오는 중입니다…</p>';try{const s=await loadSession(date);if(resourceDate===date&&panel.isConnected)panel.innerHTML=resourceFiles(s);}catch{panel.innerHTML='<p>연결을 확인하고 다른 날짜를 선택한 뒤 다시 시도하세요.</p>';}});
    for(const format of ['csv','json']){const name=main.querySelector(`#${format}-filename`);if(name)name.addEventListener('input',()=>{if(format==='csv')csvFilename=name.value;else jsonFilename=name.value;});}
    const essential=main.querySelector('#essential-only');if(essential)essential.addEventListener('change',()=>main.querySelectorAll('.optional-practice').forEach(d=>d.hidden=essential.checked));
    csvEvents();
    for(const format of ['csv','json']){const copy=main.querySelector(`#${format}-copy`);if(copy)copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(main.querySelector(`#${format}-input`).value);notify('입력 내용을 복사했습니다. 편집기에 붙여넣어 UTF-8 파일로 저장할 수 있습니다.');}catch{notify('복사를 사용할 수 없습니다. 입력칸의 내용을 직접 선택해 복사하세요.');}});}

    const jsonButton=main.querySelector('#json-check');
    if(jsonButton){
      const input=main.querySelector('#json-input');input.addEventListener('input',()=>jsonDraft=input.value);
      function inspect(){const out=main.querySelector('#json-output');try{const value=JSON.parse(input.value);const type=v=>v===null?'null':Array.isArray(v)?'배열':({object:'객체',number:'숫자',string:'문자열',boolean:'불리언'})[typeof v];const lines=[`올바른 JSON 형식입니다. 최상위: ${type(value)}`];function walk(v,path,depth){if(lines.length>=60||depth>6)return;if(v!==null&&typeof v==='object'){for(const [k,x]of Object.entries(v)){if(lines.length>=60)break;const label=Array.isArray(v)?`${path}[${k}]`:`${path}.${k}`;lines.push(`${label}: ${type(x)}${x===null||typeof x!=='object'?` = ${JSON.stringify(x)}`:Array.isArray(x)?` (${x.length}개)`:''}`);walk(x,label,depth+1);}}}walk(value,'자료',0);out.className='lab-output';out.textContent=lines.join('\n');return true;}catch(err){out.className='lab-output error';out.textContent=`JSON 문법을 확인해 주세요.\n${err.message}\n키와 문자열의 큰따옴표, 마지막 항목 뒤 쉼표를 확인합니다.`;return false;}}
      jsonButton.addEventListener('click',inspect);main.querySelector('#json-save').addEventListener('click',()=>{jsonDraft=input.value;if(inspect()){const name=downloadName('json');if(name)saveText(name,jsonDraft);}else notify('파일로 저장하기 전에 표시된 형식 오류를 확인하세요.');});
    }

  }
  async function render() {
    const version=++renderVersion;
    if(window.tocObserver)window.tocObserver.disconnect();
    let route=location.hash.split('?')[0]||'#/';if(route==='#main'){main.focus();return;}
    const parts=route.slice(2).split('/');let s;
    main.dataset.page=parts[0]==='sessions'?'session':route==='#/'?'home':parts[0];
    const labActivity=new URLSearchParams(location.hash.split('?')[1]||'').get('activity');if(route==='#/data-lab'&&labActivity){const activity=(await loadSession(data.sessions[0].date)).workbook.modules.flatMap(m=>m.activities).find(a=>a.id===labActivity);if(activity){csvFilename=activity.work_files.find(f=>f.endsWith('.csv'))?.split('/').pop()||csvFilename;jsonFilename=activity.work_files.find(f=>f.endsWith('.json'))?.split('/').pop()||jsonFilename;}}
    try {
    if(parts[0]==='sessions')s=await loadSession(parts[1]);
    if(route==='#/resources')await loadSession(resourceDate);
    if(version!==renderVersion)return;
    }catch(error){if(version===renderVersion){nav(route);main.innerHTML=`<h1>자료를 불러오지 못했습니다</h1><p>인터넷 연결을 확인하고 다시 눌러 주세요.</p><button class="button" onclick="location.reload()">다시 불러오기</button>`;}return;}
    nav(route);if(route==='#/'||route==='#')main.innerHTML=home();else if(route==='#/prepare')main.innerHTML=prepare();else if(route==='#/resources')main.innerHTML=resources();else if(route==='#/data-lab')main.innerHTML=dataLab();else if(parts[0]==='sessions' && s)main.innerHTML=lesson(s,parts[2]||(s.ready?'today':'overview'));else main.innerHTML=`${header('페이지 찾기','요청한 강의를 찾지 못했습니다.','목차에서 날짜를 다시 선택해 주세요.')}<a class="button" href="#/">과정 홈</a>`;
    document.title=`${s?s.topic:route==='#/prepare'?'시작 전 준비':route==='#/resources'?'자료':route==='#/data-lab'?'데이터 실습실':'전체 수업'} · 피지컬AI 강의실`;
    document.querySelector('#page-context').textContent=s?s.topic:route==='#/prepare'?'시작 전 준비':route==='#/resources'?'자료':route==='#/data-lab'?'데이터 실습실':'전체 수업';
    if(s){lastLesson=location.hash;try{localStorage.setItem('physical-ai-last-lesson',lastLesson);}catch{}}
    enhance(s);closeMenu(false);window.scrollTo(0,0);main.focus({preventScroll:true});
    const activeTab=main.querySelector('.tabs [aria-current=page]');if(activeTab){const tabbar=activeTab.parentElement;tabbar.scrollLeft=Math.max(0,activeTab.offsetLeft-tabbar.offsetLeft-(tabbar.clientWidth-activeTab.clientWidth)/2);}
    const query=new URLSearchParams(location.hash.split('?')[1]||''),activity=query.get('activity'),section=query.get('section');
    const period=query.get('period');
    if(period){const candidates=[...main.querySelectorAll('h2,h3')];const heading=candidates.find(h=>new RegExp('^'+period+'[교구]').test(h.textContent.trim()));if(heading)heading.scrollIntoView();}
    const target=activity?[...main.querySelectorAll('.lesson-article h2,.lesson-article h3')].find(h=>h.textContent.trim().startsWith(activity+' ')):section?document.getElementById(section):null;
    if(target){const folded=target.closest('details');if(folded)folded.open=true;target.scrollIntoView();target.tabIndex=-1;target.focus({preventScroll:true});}
  }
  function closeMenu(returnFocus=true){
    const wasOpen=sidebar.classList.contains('open');sidebar.classList.remove('open');
    document.querySelector('#menu-button').setAttribute('aria-expanded','false');
    document.querySelector('#menu-scrim').hidden=true;
    document.querySelector('.shell').inert=false;document.body.style.overflow='';
    sidebar.inert=window.matchMedia('(max-width: 800px)').matches;
    if(wasOpen&&returnFocus)document.querySelector('#menu-button').focus();
  }
  document.querySelector('#menu-button').addEventListener('click',()=>{
    if(sidebar.classList.contains('open')){closeMenu();return;}
    sidebar.inert=false;sidebar.classList.add('open');document.querySelector('#menu-button').setAttribute('aria-expanded','true');
    document.querySelector('#menu-scrim').hidden=false;document.querySelector('.shell').inert=true;document.body.style.overflow='hidden';
    sidebar.querySelector('.rail-close').focus();
  });
  document.querySelector('#menu-scrim').addEventListener('click',()=>closeMenu());
  document.addEventListener('keydown',ev=>{
    if(!sidebar.classList.contains('open'))return;
    if(ev.key==='Escape'){ev.preventDefault();closeMenu();}
    if(ev.key==='Tab'){
      const focusable=[...sidebar.querySelectorAll('button,a')],first=focusable[0],last=focusable[focusable.length-1];
      if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus();}
      else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus();}
    }
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change',()=>closeMenu(false));
  sidebar.addEventListener('click',ev=>{if(ev.target.closest('.rail-close'))closeMenu();else if(ev.target.closest('a'))closeMenu();});
  window.addEventListener('scroll',()=>{const bar=main.querySelector('.reading-progress span'),article=main.querySelector('.lesson-article');if(bar&&article){const start=article.offsetTop,total=Math.max(1,article.offsetHeight-innerHeight+120);bar.style.width=Math.min(100,Math.max(0,(scrollY-start+120)/total*100))+'%';}},{passive:true});
  window.addEventListener('hashchange',render);render();
})();
