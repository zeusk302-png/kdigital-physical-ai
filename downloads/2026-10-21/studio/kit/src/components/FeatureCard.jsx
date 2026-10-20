import React from 'react';
// 같은 모양의 부품에 서로 다른 내용(props)을 전달해 재사용합니다.
export default function FeatureCard({ title, text }) {
  return <article className="card"><h3>{title}</h3><p>{text}</p></article>;
}
