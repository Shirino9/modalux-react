import { useEffect, useRef, useState } from 'react';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import { CATS, NAV, P } from './data';
import { useHash } from './hooks';

export default function App() {
  const hash = useHash();
  const m = hash.match(/^c\/(\w+)/);
  const slug = m && CATS[m[1]] ? m[1] : null;

  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mx-cart') || '[]'); } catch { return []; }
  });
  const [favs, setFavs] = useState(new Set());
  const [modalId, setModalId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [bump, setBump] = useState(0);
  const timer = useRef();

  // Savatni brauzerda saqlash
  useEffect(() => {
    try { localStorage.setItem('mx-cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  // Sahifa almashganda tepaga chiqish
  useEffect(() => { scrollTo(0, 0); }, [slug]);

  // Sichqoncha ortidan yorug' dog' (spotlight)
  useEffect(() => {
    const f = e => {
      document.documentElement.style.setProperty('--mx', e.clientX + 'px');
      document.documentElement.style.setProperty('--my', e.clientY + 'px');
    };
    addEventListener('mousemove', f);
    return () => removeEventListener('mousemove', f);
  }, []);

  const closeAll = () => { setModalOpen(false); setCartOpen(false); };
  useEffect(() => {
    const f = e => e.key === 'Escape' && closeAll();
    addEventListener('keydown', f);
    return () => removeEventListener('keydown', f);
  }, []);

  const showToast = msg => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 2200);
  };

  const addCart = (id, size, color) => {
    setCart(c => {
      const k = `${id}|${size}|${color}`;
      const x = c.find(i => i.k === k);
      return x ? c.map(i => (i === x ? { ...i, q: i.q + 1 } : i)) : [...c, { k, id, size, color, q: 1 }];
    });
    showToast(`${P[id].n} savatga qo'shildi`);
    setBump(b => b + 1);
  };

  const changeQty = (k, d) =>
    setCart(c => c.map(i => (i.k === k ? { ...i, q: i.q + d } : i)).filter(i => i.q > 0));

  const order = () => { setCart([]); closeAll(); showToast('Buyurtma qabul qilindi! 🎉'); };

  const toggleFav = id =>
    setFavs(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const openProduct = id => { setModalId(id); setModalOpen(true); };

  const shared = { favs, onFav: toggleFav, onOpen: openProduct, onAdd: addCart };

  return (
    <>
      <div className="spot" />

      <header>
        <a className="logo" href="#/">MODALU<i>X</i></a>
        <nav>
          {NAV.map(k => (
            <a key={k} href={`#/c/${k}`} className={slug === k ? 'on' : ''}>{CATS[k].t}</a>
          ))}
        </nav>
        <button key={bump} className={'cart' + (bump ? ' bump' : '')} onClick={() => setCartOpen(true)}>
          Savat ({cart.reduce((a, i) => a + i.q, 0)})
        </button>
      </header>

      {slug
        ? <CategoryPage key={slug} slug={slug} {...shared} />
        : <Home {...shared} />}

      <footer>© 2026 Modalux. To'lov: Click • Payme • Uzum • Naqd pul</footer>

      <div className={'ov' + (modalOpen || cartOpen ? ' show' : '')} onClick={closeAll} />
      <ProductModal key={modalId} id={modalId} open={modalOpen} onClose={() => setModalOpen(false)} onAdd={addCart} onWarn={showToast} />
      <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onQty={changeQty} onOrder={order} />
      <div className={'toast' + (toast ? ' show' : '')}>{toast}</div>
    </>
  );
}
