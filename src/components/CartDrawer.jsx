import { P, fmt } from '../data';

export default function CartDrawer({ cart, open, onClose, onQty, onOrder }) {
  const total = cart.reduce((a, i) => a + P[i.id].price * i.q, 0);

  return (
    <aside className={'drawer' + (open ? ' show' : '')}>
      <div className="dh">
        <h2>Savat</h2>
        <button style={{ fontSize: 20 }} onClick={onClose}>✕</button>
      </div>

      <div className="dl">
        {cart.length === 0 && <p className="empty" style={{ padding: '60px 0' }}>Savat bo'sh. Mahsulot qo'shing.</p>}
        {cart.map(i => {
          const p = P[i.id];
          return (
            <div className="ci" key={i.k}>
              <div className="t" style={{ '--bgh': p.bgh }}>{p.e}</div>
              <div className="m">
                <b>{p.n}</b>
                <small>{i.size ? `O'lcham: ${i.size} • ` : ''}<span style={{ color: i.color }}>●</span></small>
                <span className="qty">
                  <button onClick={() => onQty(i.k, -1)}>−</button>
                  {i.q}
                  <button onClick={() => onQty(i.k, 1)}>+</button>
                </span>
              </div>
              <b style={{ fontSize: 14 }}>{fmt(p.price * i.q)}</b>
            </div>
          );
        })}
      </div>

      <div className="df">
        <div className="tot"><span>Jami</span><b>{fmt(total)}</b></div>
        <button className="btn" disabled={!cart.length} onClick={onOrder}>Buyurtma berish</button>
      </div>
    </aside>
  );
}
