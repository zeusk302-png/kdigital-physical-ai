import React,{useState,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {readEvents} from './api.js';

const style=`*{box-sizing:border-box}body{margin:0;background:#f3f5f2;color:#17332f;font:16px/1.7 system-ui,sans-serif}main{max-width:1180px;margin:auto;padding:32px 20px}h1{font-size:32px;margin:0}header p{color:#576c66}.controls{display:flex;flex-wrap:wrap;gap:16px;margin:24px 0}input,select,button{font:inherit;padding:9px;border:1px solid #b9ccc0;border-radius:6px}label{display:grid;gap:5px}.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.card,.chart{background:white;padding:22px;border:1px solid #d6e2d8;border-radius:12px}.card strong{display:block;font-size:30px;color:#087b67}.notice{padding:14px;border-radius:6px;background:#e3eee5}.failed{background:#ffe3dc;color:#803222}svg{width:100%;height:220px}.chart{margin:20px 0}table{width:100%;border-collapse:collapse;background:white}th,td{text-align:left;padding:12px;border-bottom:1px solid #dce4df}.scroll{overflow:auto}.muted{color:#65766f;font-size:13px}@media(max-width:600px){.kpis{grid-template-columns:1fr}h1{font-size:26px}main{padding:20px 14px}}`;

function Trend({rows}){
  // 이 실습은 한 장치·한 종류를 선택했을 때만 한 선을 그립니다.
  const kinds=new Set(rows.map(r=>r.device_id+' / '+r.kind));
  if(kinds.size>1)return <p>여러 종류의 수치를 섞어 선을 그리지 않습니다. 장치·종류를 좁혀 보세요.</p>;
  // 수치가 없는 사건 기록은 분당 사건 수로 집계해 그립니다. 추적 ID를 평균내지 않습니다.
  const numeric=rows.filter(r=>r.value!==null);
  let points;
  if(!numeric.length&&rows.length){
    const buckets=new Map();for(const row of rows){const at=Math.floor(row.occurred_at/60)*60;buckets.set(at,(buckets.get(at)||0)+1);}
    points=[...buckets].sort((a,b)=>a[0]-b[0]).map(([occurred_at,value])=>({occurred_at,value}));
  }else points=numeric.slice().reverse();
  if(points.length<2)return <p>선택 범위에 서로 다른 시점의 기록이 더 쌓이면 추세가 나타납니다.</p>;
  const vals=points.map(r=>r.value),low=Math.min(...vals),high=Math.max(...vals);
  const first=points[0].occurred_at,last=points.at(-1).occurred_at;
  const line=points.map(r=>`${20+((r.occurred_at-first)/(last-first||1))*860},${180-((r.value-low)/(high-low||1))*150}`).join(' ');
  return <><p className="muted">{kinds.values().next().value} · 최솟값 {low} / 최댓값 {high} · 수신 건수 간격이 아닌 실제 시각 간격</p><svg viewBox="0 0 900 210" role="img" aria-label="선택된 기록의 시계열 추세"><line x1="20" x2="880" y1="180" y2="180" stroke="#bccfc2"/><polyline points={line} fill="none" stroke="#087b67" strokeWidth="3"/></svg></>;
}

function App(){
  const [minutes,setMinutes]=useState(60),[device,setDevice]=useState(''),[kind,setKind]=useState('');
  const [data,setData]=useState(null),[error,setError]=useState(''),[loading,setLoading]=useState(true),[now,setNow]=useState(Date.now()/1000);
  useEffect(()=>{
    // 다음 요청은 앞 요청이 끝난 뒤 예약합니다. 요청 중첩을 막습니다.
    let stopped=false,timer;const controller=new AbortController();
    async function tick(){
      try{const value=await readEvents(minutes,device,controller.signal);if(!stopped){setData(value);setError('');setNow(Date.now()/1000);}}
      catch(e){if(!stopped&&e.name!=='AbortError')setError(e.message);}
      finally{if(!stopped){setLoading(false);timer=setTimeout(tick,1000);}}
    }
    setLoading(true);tick();
    return()=>{stopped=true;clearTimeout(timer);controller.abort();};
  },[minutes,device]);
  const rows=(data?.rows||[]).filter(r=>!kind||r.kind===kind);
  const types=[...new Set((data?.rows||[]).map(r=>r.kind))];
  const nums=rows.filter(r=>r.value!==null).map(r=>r.value);
  const homogeneous=new Set(rows.map(r=>r.device_id+' / '+r.kind)).size<=1;
  const average=nums.length&&homogeneous?(nums.reduce((a,b)=>a+b,0)/nums.length).toFixed(2):'—';
  const lastReceived=rows.length?Math.max(...rows.map(r=>r.received_at)):null;
  const stale=lastReceived!==null&&now-lastReceived>10;
  return <main><style>{style}</style><header><p>나의 프로그램 · 실제 수신 기록</p><h1>웹 대시보드</h1><p>YOLO나 로봇 프로그램의 사건을 연결하세요. 입력을 보내기 전에는 빈 화면이 정상입니다.</p></header>
    <section className="controls" aria-label="조회 범위"><label>시간 범위<select value={minutes} onChange={e=>setMinutes(Number(e.target.value))}><option value="5">최근5분</option><option value="60">최근1시간</option><option value="1440">최근24시간</option></select></label><label>장치 ID<input value={device} onChange={e=>setDevice(e.target.value)} placeholder="전체 또는 실제 ID"/></label><label>사건 종류<select value={kind} onChange={e=>setKind(e.target.value)}><option value="">전체</option>{types.map(t=><option key={t}>{t}</option>)}</select></label></section>
    <p role="status" className={'notice '+(error?'failed':'')}>{error?'연결 실패 · 마지막 성공 기록을 유지합니다. '+error:loading?'불러오는 중':!rows.length?'선택 범위에 기록이 없습니다.':stale?'조회 연결은 정상 · 새 수신 기록이10초 이상 없습니다.':'조회 연결 정상 · 수신 기록 확인'}</p>
    <section className="kpis"><div className="card">선택 범위 기록<strong>{rows.length}</strong></div><div className="card">주의 사건<strong>{rows.filter(r=>r.level==='warning').length}</strong></div><div className="card">숫자 평균<strong>{average}</strong><small>같은 장치·종류의 숫자만</small></div></section>
    {data?.truncated&&<p className="notice">조회 한도를 넘었습니다. 최근5000건 범위이며 시간 범위를 좁혀 주세요.</p>}
    <section className="chart"><h2>추세</h2><Trend rows={rows}/></section>
    <section><h2>사건 이력</h2><p className="muted">최근200건 표시 / KPI는 조회된 전체 범위. 시각은 브라우저 현지 시각입니다.</p><div className="scroll"><table><thead><tr><th>측정 시각</th><th>장치</th><th>종류</th><th>값</th><th>단계</th></tr></thead><tbody>{rows.slice(0,200).map(r=><tr key={r.event_id}><td>{new Date(r.occurred_at*1000).toLocaleString()}</td><td>{r.device_id}</td><td>{r.kind}</td><td>{r.value===null?'미측정':r.value}</td><td>{r.level}</td></tr>)}</tbody></table></div></section>
  </main>;
}
createRoot(document.getElementById('root')).render(<App/>);
