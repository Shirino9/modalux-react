import { useState } from 'react';
import { CATS, P, fmt } from '../data';

// App'da key={id} beriladi, shuning uchun har yangi mahsulotda tanlovlar tozalanadi
export default function ProductModal({ id, open, onClose, onAdd, onWarn }) {
  const p = id == null ? null : P[id];
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(p ? p.col[0] : null);

  const add = () => {
    if (CATS[p.cat].sizes.length && !size) return onWarn("Avval o'lchamni tanlang");
    onAdd(p.id, size, color);
    onClose();
  };

  return (
    <div className={'modal' + (open ? ' show' : '')}>
      {p && (
        <>
          <button className="x" onClick={onClose}>✕</button>
          <div className="tile" style={{ '--bgh': p.bgh }}>
            <span className="emo" style={{ fontSize: 150 }}>{p.e}</span>
          </div>
          <div className="mi">
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>{CATS[p.cat].t}</p>
            <h2>{p.n}</h2>
            <p className="pr"><b>{fmt(p.price)}</b>{p.old > 0 && <s>{fmt(p.old)}</s>}</p>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
              Yumshoq, sifatli mato. Kundalik kiyish uchun qulay. 14 kun ichida almashtirish mumkin.
            </p>

            <div>
              <h4>Rang</h4>
              <div className="dots">
                {p.col.map(k => (
                  <button key={k} className={'dot' + (color === k ? ' on' : '')} style={{ background: k }} onClick={() => setColor(k)} />
                ))}
              </div>
            </div>

            {CATS[p.cat].sizes.length > 0 && (
              <div>
                <h4>O'lcham</h4>
                <div className="chips">
                  {CATS[p.cat].sizes.map(s => (
                    <button key={s} className={'chip' + (size === s ? ' on' : '')} disabled={!p.sz.includes(s)} onClick={() => setSize(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <button className="btn" style={{ marginTop: 'auto' }} onClick={add}>Savatga qo'shish</button>
          </div>
        </>
      )}
    </div>
  );
}
