import { useEffect, useState } from 'react';

// "#/c/ayollar" -> "c/ayollar"
export function useHash() {
  const get = () => location.hash.replace(/^#\/?/, '');
  const [h, setH] = useState(get);
  useEffect(() => {
    const f = () => setH(get());
    addEventListener('hashchange', f);
    return () => removeEventListener('hashchange', f);
  }, []);
  return h;
}

// .rv elementlar ekranga kirganda silliq paydo bo'ladi
export function useReveal(dep) {
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(x => {
        if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.rv:not(.in)').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
