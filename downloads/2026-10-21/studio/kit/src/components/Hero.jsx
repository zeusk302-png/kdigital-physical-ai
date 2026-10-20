import React from 'react';
// 부모가 title을 전달합니다. 중괄호 안의 이름은 변수 값으로 바뀝니다.
export default function Hero({ title }) {
  return <section className="hero"><div><p className="eyebrow">YOUR NEIGHBORHOOD, TOGETHER</p><h1>{title}</h1><p>혼자 나서기 어려웠던 산책, 이번 토요일에는 함께 걸어요. 처음 오는 사람도 편하게 참여하는 동네 산책 모임입니다.</p><a className="button" href="#contact">모임 알아보기</a></div><img src={`${import.meta.env.BASE_URL}images/walk.svg`} width="600" height="420" alt="나무 사이 산책길 삽화" /></section>;
}
