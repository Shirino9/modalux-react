import { CATS, fmt } from '../data';

export default function Card({ p, fav, onFav, onOpen, onAdd }) {
  const direct = !CATS[p.cat].sizes.length; // o'lchamsiz mahsulot to'g'ridan-to'g'ri savatga tushadi

  return (
    <article className="card rv" onClick={() => onOpen(p.id)}>
      <div className="tile" style={{ '--bgh': p.bgh }}>
        {p.old
          ? <span className="badge">-{Math.round((1 - p.price / p.old) * 100)}%</span>
          : p.isNew && <span className="badge new">Yangi</span>}
        <button
          className={'fav' + (fav ? ' on' : '')}
          aria-label="Sevimlilar"
          onClick={e => { e.stopPropagation(); onFav(p.id); }}
        >♥</button>
        <span className="emo">{p.e}</span>
        <button
          className="quick"
          onClick={e => { if (direct) { e.stopPropagation(); onAdd(p.id, null, p.col[0]); } }}
        >
          {direct ? "Savatga qo'shish" : "O'lchamni tanlash"}
        </button>
      </div>
      <h3>{p.n}</h3>
      <p className="pr">
        <b>{fmt(p.price)}</b>
        {p.old > 0 && <s>{fmt(p.old)}</s>}
      </p>
    </article>
  );
}
