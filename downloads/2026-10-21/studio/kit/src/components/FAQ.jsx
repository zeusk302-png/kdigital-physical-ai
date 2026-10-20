import React, { useState } from 'react';
export default function FAQ({ question, answer, id }) {
  const [open, setOpen] = useState(false); // TODO: true로 바꿔 첫 화면을 비교합니다.
  return <div className="faq-item">
    <button className="faq-toggle" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>{question} · {open ? '닫기' : '열기'}</button>
    <p id={id} hidden={!open}>{answer}</p>
  </div>;
}
