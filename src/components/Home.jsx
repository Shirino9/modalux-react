import { useEffect, useState } from 'react';
import Hero from './Hero';
import Card from './Card';
import { CATS, NAV, P, inCat } from '../data';
import { useReveal } from '../hooks';

// Kun tugashigacha qolgan vaqt
function useCountdown() {
  const calc = () => {
    const n = new Date(), e = new Date(n);
    e.setHours(23, 59, 59, 999);
    const s = Math.floor((e - n) / 1000), z = v => String(v).padStart(2, '0');
    return `${z((s / 3600) | 0)}:${z(((s % 3600) / 60) | 0)}:${z(s % 60)}`;
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

export default function Home({ favs, onFav, onOpen, onAdd }) {
  const timer = useCountdown();
  useReveal();

  return (
    <main>
      <Hero />

      <section className="sec">
        <div className="sec-h"><h2>Kategoriyalar</h2></div>
        <div className="cats">
          {NAV.map(k => (
            <a key={k} className="cat rv" href={`#/c/${k}`} style={{ '--h': CATS[k].h }}>
              <span className="go">→</span>
              <span className="big">{CATS[k].e}</span>
              <h3>{CATS[k].t}</h3>
              <p>{inCat(k).length} ta mahsulot</p>
            </a>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="sec-h">
          <h2>Yangi kelganlar</h2>
          <a href="#/c/yangi">Hammasini ko'rish</a>
        </div>
        <div className="grid">
          {P.filter(p => p.isNew).slice(0, 4).map(p => (
            <Card key={p.id} p={p} fav={favs.has(p.id)} onFav={onFav} onOpen={onOpen} onAdd={onAdd} />
          ))}
        </div>

        <div className="promo rv">
          <div>
            <h2>Hafta chegirmalari -30% gacha</h2>
            <div className="timer">{timer}</div>
            <a className="btn gold" href="#/c/sale">Chegirmalarni ko'rish</a>
          </div>
        </div>
      </section>
    </main>
  );
}
