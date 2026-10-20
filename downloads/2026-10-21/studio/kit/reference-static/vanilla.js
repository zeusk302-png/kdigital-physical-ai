// 순수 검사 함수: 입력으로 안내 결과만 돌려주고 통신·화면 변경은 하지 않습니다.
// trim()은 앞뒤 공백을 제거합니다. 한글도 문자열로 받습니다.
function validateContact({ name = '', email = '', message = '' }) {
  if (!name.trim()) return { ok:false, message:'이름을 입력하세요.' };
  // 간단한 형식 검사이며 실제 주소의 존재 확인은 아닙니다.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return { ok:false, message:'이메일 형식을 확인하세요.' };
  // TODO: 10을20으로 바꾸고19자와20자의 결과를 비교합니다.
  if (message.trim().length < 10) return { ok:false, message:'내용을10자 이상 입력하세요.' };
  return { ok:true, message:'입력 확인 완료. 연습 화면이며 전송하지 않았습니다.' };
}


// # 뒤 이름은 HTML id와 정확히 같아야 합니다.
const button = document.querySelector('#menu-button');
const navigation = document.querySelector('#navigation');
button.addEventListener('click', () => {
  const wasOpen = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!wasOpen));
  navigation.classList.toggle('is-open', !wasOpen);
});
// 링크로 이동한 뒤 모바일 메뉴를 닫아 다음 내용을 가리지 않습니다.
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('is-open'); button.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault(); // 브라우저의 기본 페이지 이동을 멈춥니다.
  const values = Object.fromEntries(new FormData(event.currentTarget));
  const result = validateContact(values); // HTML·React판이 같은 검사 함수를 씁니다.
  document.querySelector('#form-status').textContent = result.message;
});
