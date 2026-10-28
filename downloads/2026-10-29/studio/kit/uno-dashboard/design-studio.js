(() => {
  const situations = {
    normal: {status:'연습 수신 중',light:'320',temperature:'24.3 °C',humidity:'48 %',led:'보드 보고 상태: 켜짐 · 자동 사용',command:'명령 없음 · 실제 점등은 별도 확인',note:'현재값과 단위, 제어의 위치를 비교하세요.'},
    missing: {status:'연습 수신 중 · 온습도 값 없음',light:'320',temperature:'— 센서값 없음',humidity:'— 센서값 없음',led:'보드 보고 상태: 켜짐 · 자동 사용',command:'명령 없음',note:'온습도 실패와 전체 USB 중단은 다릅니다. 정상인 밝기값은 남깁니다.'},
    disconnected: {status:'USB 연결 중단 · 예시',light:'—',temperature:'—',humidity:'—',led:'현재 LED 상태: 미확인',command:'제어 비활성 · 연결 상태부터 확인',note:'현재값을 숨기고 마지막 정상 수신 시각·과거 기록을 남깁니다. 연결 해제는 STOP 명령이 아닙니다.'},
    waiting: {status:'연습 수신 중',light:'320',temperature:'24.3 °C',humidity:'48 %',led:'마지막 보드 보고 상태: 꺼짐',command:'요청 #8 LED 켜기 · 응답 대기',note:'명령을 보냈다는 사실과 보드가 적용했다는 응답은 다릅니다. 응답 전에는 켜짐으로 바꾸지 않습니다.'},
    timeout: {status:'연습 수신 중',light:'320',temperature:'24.3 °C',humidity:'48 %',led:'마지막 보드 보고 상태: 꺼짐',command:'요청 #8 응답 시간 초과 · 적용 여부 미확인',note:'응답이 없어도 명령이 전달됐을 수 있습니다. 실패나 성공으로 단정하지 않고 자동 재전송하지 않습니다.'},
  };
  const selector=document.getElementById('scenario');
  function render() {
    const s=situations[selector.value];
    for (const key of ['status','light','temperature','humidity','command']) document.querySelectorAll('.'+key).forEach(n=>n.textContent=s[key]);
    document.querySelectorAll('.led-state').forEach(n=>n.textContent=s.led);
    document.getElementById('scenario-note').textContent=s.note;
  }
  selector.addEventListener('change',render);render();
})();
