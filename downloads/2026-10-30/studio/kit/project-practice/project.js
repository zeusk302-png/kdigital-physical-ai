(() => {
  'use strict';
  if(matchMedia('(max-width:700px)').matches)document.querySelector('.toc-panel').open=false;
  if(!('IntersectionObserver' in window))return;
  const links=[...document.querySelectorAll('#project-toc a')];
  const observer=new IntersectionObserver(entries=>{
    const first=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
    if(!first)return;
    for(const a of links){if(a.hash==='#'+first.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}
  },{rootMargin:'0px 0px -70% 0px',threshold:0});
  for(const section of document.querySelectorAll('.project-chapter h2,.project-chapter h3,.project-chapter h4'))observer.observe(section);
})();
