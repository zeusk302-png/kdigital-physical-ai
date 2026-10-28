/* P01 Web Serial starter. UI text/style are editable; protocol and pin contract stay fixed.
   Real serial access only happens after the user's connection click. No automatic retry. */
(() => {
  'use strict';
  const el = id => document.getElementById(id);
  let port = null, reader = null, writer = null, reading = null, closing = false;
  let mode = 'none', lastState = null, lastTime = 0, request = 0, pending = null;
  let records = [], log = [], demoTimer = null, demoStep = 0, demoLed = 0, demoAuto = false;
  let demoLow = 350, demoHigh = 450, session = 0;
  const commandButtons = [...document.querySelectorAll('[data-command]'), el('threshold-button')];
  function say(text) { el('notice').textContent = text; }
  function trace(text) { log.push(text); log = log.slice(-16); el('log').textContent = log.join('\n'); }
  function fresh() { return !!lastState && Date.now() - lastTime < 4000; }
  function render() {
    const valid = fresh(), active = mode !== 'none';
    el('source').textContent = mode === 'demo' ? '연습 데이터 · 실제 측정 아님' : mode === 'serial' ? '실제 USB 입력' : '입력 없음';
    el('connection').textContent = !active ? '연결 전 / 해제됨' : valid ? (mode === 'demo' ? '연습 중' : 'P01 수신 중') : '정상 P01 데이터 대기 / 오래됨';
    el('connect').disabled = active || closing;
    el('demo').disabled = active || closing;
    el('disconnect').disabled = !active || closing;
    commandButtons.forEach(b => { b.disabled = !valid || !!pending || closing; });
    const number = (key, digits = 0) => valid && lastState[key] !== null ? Number(lastState[key]).toFixed(digits) : '—';
    el('temperature').textContent = number('temperature_c', 1);
    el('humidity').textContent = number('humidity_pct', 1);
    el('light').textContent = number('light_raw'); el('pot').textContent = number('pot_raw');
    el('led-state').textContent = '보드 보고 상태: ' + (valid ? (lastState.led ? '켜짐' : '꺼짐') : '—');
    el('inputs').textContent = valid ? `버튼: ${lastState.button_pressed ? '눌림' : '놓임'} · LCD: ${lastState.lcd_ready ? '초기화 응답 있음' : '초기화 실패'} · 자동: ${lastState.auto ? '사용' : '해제'}` : '버튼: — · LCD: — · 자동: —';
    el('last').textContent = lastTime ? '마지막 정상 수신: ' + new Date(lastTime).toLocaleTimeString() + (valid ? '' : ' · 현재값으로 사용하지 마세요') : '마지막 정상 수신: 없음';
  }
  function validState(s) {
    const raw = v => Number.isInteger(v) && v >= 0 && v <= 1023;
    const optional = (v, min, max) => v === null || (typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max);
    return s && s.v === 1 && s.type === 'state' && s.profile === 'P01' &&
      Number.isInteger(s.request) && s.request >= 0 && s.request <= 65535 && Number.isInteger(s.ms) && s.ms >= 0 &&
      raw(s.pot_raw) && raw(s.light_raw) && (s.led === 0 || s.led === 1) &&
      typeof s.auto === 'boolean' && typeof s.button_pressed === 'boolean' && typeof s.lcd_ready === 'boolean' &&
      optional(s.temperature_c, -50, 100) && optional(s.humidity_pct, 0, 100);
  }
  function ingest(line) {
    let s; try { s = JSON.parse(line); } catch { trace('형식 오류: JSON 한 줄을 확인하세요'); return; }
    if (!s || typeof s !== 'object' || Array.isArray(s)) { trace('거절: JSON 객체가 필요합니다'); return; }
    if (s.type === 'state') {
      if (!validState(s)) { lastState = null; render(); trace('거절: P01 필드·자료형·범위 확인'); return; }
      lastState = s; lastTime = Date.now(); records.push({time:lastTime, value:s.light_raw}); records = records.slice(-60);
      const span = lastTime - records[0].time;
      const points = records.map(p => `${span ? (p.time-records[0].time)/span*600 : 0},${180-p.value/1023*180}`).join(' ');
      el('line').setAttribute('points',points);
      el('range').textContent = `${new Date(records[0].time).toLocaleTimeString()} ~ ${new Date(lastTime).toLocaleTimeString()} · ${records.length}개 (새로고침 시 초기화)`;
      render();
    } else if ((s.type === 'ack' || s.type === 'error') && pending && s.v === 1 && s.request === pending.id) {
      if (s.type === 'ack' && s.applied !== true) return;
      clearTimeout(pending.timer);
      el('command-result').textContent = s.type === 'ack' ? `${mode === 'demo' ? '연습 응답' : '보드 적용 응답'} #${s.request} · 실제 출력도 확인하세요` : `명령 거절 #${s.request}: ${String(s.code || 'unknown')}`;
      pending = null; render();
    }
    trace('← ' + JSON.stringify(s));
  }
  function emitDemo() {
    demoStep++; const light = Math.round(500 + 300 * Math.sin(demoStep/4));
    if (demoAuto) { if (light < demoLow) demoLed = 1; else if (light > demoHigh) demoLed = 0; }
    ingest(JSON.stringify({v:1,type:'state',profile:'P01',request:0,ms:demoStep*1000,pot_raw:(demoStep*79)%1024,light_raw:light,
      temperature_c:demoStep%12===0?null:24.3,humidity_pct:demoStep%12===0?null:48.0,led:demoLed,auto:demoAuto,button_pressed:demoStep%4===0,lcd_ready:true}));
  }
  async function command(text) {
    if (!fresh() || pending || closing || mode === 'none') return;
    const id = request = request % 65535 + 1, currentSession = session;
    pending = {id, timer:setTimeout(() => {
      if (session !== currentSession || !pending || pending.id !== id) return;
      pending = null; el('command-result').textContent = '응답 시간 초과 · 적용 여부 미확인. 자동 재전송하지 않습니다.'; render();
    }, 2500)};
    el('command-result').textContent = `전송 중 #${id}: ${text}`; render(); trace(`→ ${id} ${text}`);
    try {
      if (mode === 'demo') {
        const parts = text.split(' ');
        if (parts[0] === 'LED') { demoAuto = false; demoLed = +parts[1]; }
        if (parts[0] === 'AUTO') demoAuto = true;
        if (parts[0] === 'STOP') { demoAuto = false; demoLed = 0; }
        if (parts[0] === 'THRESH') { demoLow = +parts[1]; demoHigh = +parts[2]; }
        setTimeout(() => { if (session === currentSession && mode === 'demo') { ingest(JSON.stringify({v:1,type:'ack',request:id,applied:true})); emitDemo(); } },200);
      } else { await writer.write(new TextEncoder().encode(`${id} ${text}\n`)); }
    } catch (error) {
      if (pending?.id === id) { clearTimeout(pending.timer); pending = null; }
      el('command-result').textContent = '전송 실패 · 적용 여부 미확인: ' + error.message; render();
    }
  }
  async function readLoop(myReader) {
    let buffer = '', dropping = false; const decoder = new TextDecoder();
    try {
      while (!closing) {
        const {value,done} = await myReader.read(); if (done) break;
        for (const char of decoder.decode(value,{stream:true})) {
          if (char === '\n') { if (!dropping && buffer.trim()) ingest(buffer.trim()); buffer = ''; dropping = false; }
          else if (!dropping) { buffer += char; if (buffer.length > 2048) { trace('너무 긴 수신 줄 거절'); dropping = true; buffer = ''; } }
        }
      }
    } catch (error) { if (!closing) say('USB 수신 중단: ' + error.message); }
    finally { myReader.releaseLock(); }
    if (!closing) { await cleanup(false); say('USB 수신이 끝났습니다. 연결을 확인하고 다시 연결하세요.'); }
  }
  async function cleanup(waitForReader = true) {
    if (closing) return;
    closing = true; session++; clearInterval(demoTimer); demoTimer = null;
    if (pending) { clearTimeout(pending.timer); pending = null; el('command-result').textContent = '연결 종료 · 명령 적용 여부 미확인'; }
    if (reader && waitForReader) { try { await reader.cancel(); await reading; } catch {} }
    reader = null; reading = null;
    if (writer) { try { writer.releaseLock(); } catch {} writer = null; }
    if (port) { try { await port.close(); } catch {} port = null; }
    mode = 'none'; lastState = null; closing = false; render();
  }
  el('connect').addEventListener('click', async () => {
    if (!navigator.serial || !window.isSecureContext) { say('Web Serial 지원 Chrome/Edge에서 HTTPS 또는 localhost로 여세요. 연습 데이터로 화면 제작은 계속할 수 있습니다.'); return; }
    if (mode !== 'none' || closing) return;
    closing = true; render();
    try {
      port = await navigator.serial.requestPort(); await port.open({baudRate:115200});
      writer = port.writable.getWriter(); reader = port.readable.getReader();
      mode = 'serial'; closing = false; session++; records = []; lastState = null; lastTime = 0; el('line').setAttribute('points','');
      say('115200 연결됨. UNO 재시작 후 P01 데이터를 기다립니다. 수신 뒤 제어 버튼이 활성화됩니다.');
      reading = readLoop(reader); render();
    } catch (error) { closing = false; await cleanup(); say('연결하지 못했습니다: ' + error.message + ' · 시리얼 모니터와 다른 연결 탭을 닫고 재시도하세요.'); }
  });
  el('demo').addEventListener('click', () => {
    if (mode !== 'none' || closing) return;
    session++; mode = 'demo'; records = []; demoStep = 0; demoLed = 0; demoAuto = false; demoLow = 350; demoHigh = 450;
    say('연습 데이터입니다. 12회마다 센서 실패(null)도 표현합니다. 실제 배선·센서·LED는 검증하지 않습니다.');
    emitDemo(); demoTimer = setInterval(emitDemo,1000); render();
  });
  el('disconnect').addEventListener('click', async () => { await cleanup(); say('연결 해제. 현재값은 숨기고 과거 그래프는 남깁니다. 실제 보드를 끄려면 연결된 동안 STOP 또는 전원 분리를 확인하세요.'); });
  document.querySelectorAll('[data-command]').forEach(b => b.addEventListener('click', () => command(b.dataset.command)));
  el('threshold').addEventListener('submit', event => {
    event.preventDefault(); const low = Number(el('low').value), high = Number(el('high').value);
    if (!Number.isInteger(low) || !Number.isInteger(high) || low < 0 || high > 1023 || low >= high) { el('command-result').textContent = '0 ≤ 켜짐 기준 < 꺼짐 기준 ≤ 1023으로 입력하세요.'; return; }
    command(`THRESH ${low} ${high}`);
  });
  setInterval(render,500); render();
})();
