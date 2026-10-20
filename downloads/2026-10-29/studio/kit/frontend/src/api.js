// HTTP 오류 응답도 fetch 자체는 성공할 수 있으므로 response.ok를 따로 검사합니다.
export async function readEvents(minutes,device,signal){
  const query=new URLSearchParams({minutes:String(minutes),device});
  const response=await fetch('/api/events?'+query,{signal,cache:'no-store'});
  if(!response.ok)throw Error('조회 실패: HTTP '+response.status);
  return response.json();
}
