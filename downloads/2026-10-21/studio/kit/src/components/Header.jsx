import React, { useState } from 'react';
export default function Header() {
  const [open, setOpen] = useState(false); // 처음에는 메뉴가 닫혀 있습니다.
  return <header className="site-header"><div className="container header-row">
    <a className="brand" href="#home">걸음.</a>
    <button className="menu-button" type="button" aria-expanded={open} aria-controls="react-nav" onClick={() => setOpen(!open)}>메뉴</button>
    <nav id="react-nav" className={open ? 'is-open' : ''} aria-label="주요 메뉴">
      <a href="#features" onClick={() => setOpen(false)}>모임 소개</a><a href="#faq" onClick={() => setOpen(false)}>궁금한 점</a><a href="#contact" onClick={() => setOpen(false)}>문의 연습</a>
    </nav></div></header>;
}
