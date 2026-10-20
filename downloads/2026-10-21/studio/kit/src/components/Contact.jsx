import React, { useState } from 'react';
import { validateContact } from '../validate.js';
export default function Contact() {
  const [message, setMessage] = useState(''); // 검사 결과만 state에 보관합니다.
  function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setMessage(validateContact(values).message); // 서버 요청은 하지 않습니다.
  }
  return <section id="contact"><h2>문의 입력 연습</h2><p>서버로 전송되지 않습니다. 실제 개인정보 대신 가상 값을 사용하세요.</p><form noValidate onSubmit={submit}>
    <label htmlFor="name">이름<input id="name" name="name" autoComplete="off" /></label>
    <label htmlFor="email">이메일<input id="email" name="email" type="email" autoComplete="off" /></label>
    <label htmlFor="message">내용<textarea id="message" name="message" /></label>
    <button type="submit">입력 확인하기</button><p className="message" role="status" aria-live="polite">{message}</p>
  </form></section>;
}
