/* ===== RAW COFFEE - KERANJANG ===== */
const CART_KEY = 'rawCart';

const Cart = {
    get() {
        try {
            const raw = localStorage.getItem(CART_KEY);
            if (raw !== null) return JSON.parse(raw) || [];
        } catch (e) {}
        // cadangan kalau localStorage diblokir browser
        try {
            if (window.name.indexOf('RAWCART:') === 0) return JSON.parse(window.name.slice(8)) || [];
        } catch (e) {}
        return [];
    },
    save(items) {
        const s = JSON.stringify(items);
        try { localStorage.setItem(CART_KEY, s); } catch (e) {}
        window.name = 'RAWCART:' + s;
        Cart.updateBadge();
    },
    add(item) {
        const items = Cart.get();
        const found = items.find(i => i.id === item.id);
        if (found) found.qty++;
        else items.push({ ...item, qty: 1 });
        Cart.save(items);
    },
    setQty(id, qty) {
        let items = Cart.get();
        items = qty <= 0
            ? items.filter(i => i.id !== id)
            : items.map(i => i.id === id ? { ...i, qty } : i);
        Cart.save(items);
    },
    clear() { Cart.save([]); },
    count() { return Cart.get().reduce((s, i) => s + i.qty, 0); },
    subtotal() { return Cart.get().reduce((s, i) => s + i.price * i.qty, 0); },
    updateBadge() {
        const n = Cart.count();
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = n;
            el.style.display = n ? 'flex' : 'none';
        });
    }
};

function rupiah(n) {
    return 'Rp ' + Number(n).toLocaleString('id-ID');
}

function showToast(msg) {
    let t = document.querySelector('.toast');
    if (!t) {
        t = document.createElement('div');
        t.className = 'toast';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => t.classList.remove('show'), 1800);
}

document.addEventListener('DOMContentLoaded', () => {
    Cart.updateBadge();

    // tombol "Tambah" di kartu menu
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            Cart.add({
                id: btn.dataset.id,
                name: btn.dataset.name,
                price: Number(btn.dataset.price),
                img: btn.dataset.img
            });
            showToast(btn.dataset.name + ' masuk keranjang');
        });
    });
});
