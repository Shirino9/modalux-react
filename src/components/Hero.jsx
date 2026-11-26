import { useEffect, useRef } from 'react';
import { P } from '../data';

const WORDS = ['Bepul yetkazib berish', '-30% chegirma', 'Yangi kolleksiya', 'Oson almashtirish', 'Click • Payme • Uzum'];
const ORBIT = [
  ['0deg', 'aksessuarlar', '👜'],
  ['90deg', 'ayollar', '👗'],
  ['180deg', 'erkaklar', '👔'],
  ['270deg', 'bolalar', '🧸'],
];

export default function Hero() {
  const stage = useRef(null);

  // Sichqoncha harakatiga qarab sahna biroz og'adi (parallax)
  useEffect(() => {
    const f = e => {
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      if (stage.current)
        stage.current.style.transform = `translate(${x * 14}px,${y * 10}px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg)`;
    };
    addEventListener('mousemove', f);
    return () => removeEventListener('mousemove', f);
  }, []);

  return (
    <section className="hero">
      <div className="big-word">MODALUX</div>
      <div className="glow" />

      <div className="stage" ref={stage}>
        {/* Aylanma yozuv */}
        <svg className="ring" viewBox="0 0 400 400" aria-hidden="true">
          <defs><path id="c" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0" /></defs>
          <text><textPath href="#c">YANGI KOLLEKSIYA ✦ MODALUX ✦ -30% CHEGIRMA ✦ BEPUL YETKAZIB BERISH ✦</textPath></text>
        </svg>

        {/* Aylanib yuruvchi buyumlar */}
        <div className="orbit">
          {ORBIT.map(([a, k, e]) => (
            <div className="item" key={k} style={{ '--a': a }}>
              <a className="ic" href={`#/c/${k}`}><span>{e}</span></a>
            </div>
          ))}
        </div>

        {/* Markaziy krossovka */}
        <a className="shoe-wrap" href="#/c/poyabzal" aria-label="Poyabzal">
          <svg className="shoe" viewBox="0 0 400 260">
            <defs>
              <linearGradient id="up" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f3d99b" /><stop offset=".55" stopColor="#d9b26a" /><stop offset="1" stopColor="#8f6a2c" />
              </linearGradient>
              <linearGradient id="sole" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#cfcac0" />
              </linearGradient>
            </defs>
            <path d="M30 185 C30 130 55 105 90 98 L128 62 C150 48 172 66 192 92 L262 112 C325 128 368 152 372 190 L372 200 L30 200 Z" fill="url(#up)" />
            <path d="M70 168 C150 150 250 150 345 178" stroke="#1a1405" strokeWidth="10" strokeLinecap="round" fill="none" opacity=".85" />
            <g stroke="#1a1405" strokeWidth="5" strokeLinecap="round" opacity=".7">
              <line x1="150" y1="78" x2="176" y2="96" /><line x1="170" y1="68" x2="196" y2="88" /><line x1="192" y1="86" x2="214" y2="102" />
            </g>
            <rect x="22" y="192" width="360" height="40" rx="20" fill="url(#sole)" />
            <path d="M40 212 H364" stroke="#b9b3a6" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
          </svg>
        </a>
      </div>

      <div className="copy">
        <h1>Uslubingiz — sizning imzoingiz</h1>
        <p>Ayollar, erkaklar va bolalar uchun yangi kolleksiya. Tez yetkazib berish va oson almashtirish.</p>
        <a className="btn" href="#/c/yangi">Yangi kolleksiya</a>
      </div>

      <div className="stat"><b>{P.length}+</b>mahsulot<br />Butun O'zbekiston bo'ylab yetkazamiz</div>

      <div className="marquee">
        <div className="track">
          {[...WORDS, ...WORDS].map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </div>
    </section>
  );
}
