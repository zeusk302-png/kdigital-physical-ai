import { validateContact } from './validate.js';
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
