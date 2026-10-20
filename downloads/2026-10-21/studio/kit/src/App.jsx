import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import FeatureCard from './components/FeatureCard.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
// TODO: 자기 내용으로 교체하고 네 번째 카드를 추가합니다.
const features = [
  { id:'place', title:'가까운 출발점', text:'동네 공원에서 익숙한 길부터 걸어요.' },
  { id:'pace', title:'나에게 맞는 속도', text:'빠른 기록 대신 대화할 수 있는 속도로 함께해요.' },
  { id:'ready', title:'가벼운 준비', text:'편한 신발과 물 한 병을 준비해 주세요.' }
];
export default function App() {
  // Fragment(<></>)는 불필요한 상자 없이 형제 요소를 묶습니다.
  return <><Header /><main id="home" className="container">
    <Hero title="익숙한 동네에서 새로운 주말을." />
    <section id="features"><h2>부담 없이 시작하는 한 걸음</h2><div className="cards">{features.map(item => <FeatureCard key={item.id} title={item.title} text={item.text} />)}</div></section>
    <section><div className="about"><h2>걷는 시간으로 이웃을 만나요</h2><p>교육용 가상 모임 소개입니다. 실제 운영 실적을 뜻하지 않습니다. 자신의 프로젝트 내용으로 교체하세요.</p></div></section>
    <section id="faq"><h2>처음이라 궁금한 것들</h2><FAQ id="faq-first" question="처음 참여해도 되나요?" answer="처음 오는 분을 기준으로 장소와 준비물을 안내합니다." /><FAQ id="faq-rain" question="비가 오면 어떻게 하나요?" answer="실제 운영 시 별도 공지가 필요합니다. 이 페이지는 교육용 예제입니다." /></section>
    <Contact /></main><footer><div className="container">걸음 · 교육용 가상 페이지 · <a href="./index.html">HTML판 비교</a></div></footer></>;
}
