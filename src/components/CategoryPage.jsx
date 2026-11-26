import { useMemo, useState } from 'react';
import Card from './Card';
import { CATS, fmt, inCat } from '../data';
import { useReveal } from '../hooks';

export default function CategoryPage({ slug, favs, onFav, onOpen, onAdd }) {
  const c = CATS[slug];
  const all = useMemo(() => inCat(slug), [slug]);
  const prices = all.map(p => p.price);
  const lo = Math.min(...prices), hi = Math.max(...prices);

  const [sort, setSort] = useState('def');
  const [max, setMax] = useState(hi);
  const [size, setSize] = useState(null);
  const [sale, setSale] = useState(false);

  const list = useMemo(() => {
    let l = all.filter(p => p.price <= max);
    if (sale) l = l.filter(p => p.old);
    if (size) l = l.filter(p => p.sz.includes(size));
    if (sort === 'asc') l = [...l].sort((a, b) => a.price - b.price);
    if (sort === 'desc') l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [all, max, sale, size, sort]);

  useReveal(list);

  return (
    <main className="page sec">
      <div className="crumbs"><a href="#/">Bosh sahifa</a> / {c.t}</div>
      <div className="ph">
        <h1>{c.e} {c.t}</h1>
        <span>{list.length} ta mahsulot</span>
      </div>

      <div className="filters">
        <label>Saralash
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="def">Tavsiya etilgan</option>
            <option value="asc">Avval arzon</option>
            <option value="desc">Avval qimmat</option>
          </select>
        </label>

        <label>Narx: gacha {fmt(max)}
          <input type="range" min={lo} max={hi} step="1000" value={max} onChange={e => setMax(+e.target.value)} />
        </label>

        {c.sizes.length > 0 && (
          <div className="chips">
            {c.sizes.map(s => (
              <button key={s} className={'chip' + (size === s ? ' on' : '')} onClick={() => setSize(size === s ? null : s)}>{s}</button>
            ))}
          </div>
        )}

        {!['sale', 'yangi'].includes(slug) && (
          <label>
            <input type="checkbox" checked={sale} onChange={e => setSale(e.target.checked)} /> Faqat chegirmadagilar
          </label>
        )}
      </div>

      <div className="grid">
        {list.length
          ? list.map(p => <Card key={p.id} p={p} fav={favs.has(p.id)} onFav={onFav} onOpen={onOpen} onAdd={onAdd} />)
          : <div className="empty">Mos mahsulot topilmadi. Filtrlarni o'zgartirib ko'ring.</div>}
      </div>
    </main>
  );
}
