/* ===== RAW COFFEE - CHECKOUT ===== */
const TAX_RATE = 0.10;
let lastOrder = null;

function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function renderCheckout() {
    const items = Cart.get();
    const content = document.getElementById('checkout-content');
    const empty = document.getElementById('checkout-empty');

    if (!items.length) {
        content.hidden = true;
        empty.hidden = false;
        return;
    }
    content.hidden = false;
    empty.hidden = true;

    document.getElementById('checkout-items').innerHTML = items.map(i => `
        <div class="co-item" data-id="${esc(i.id)}">
            <img src="${esc(i.img)}" alt="${esc(i.name)}">
            <div class="co-item-info">
                <h3>${esc(i.name)}</h3>
                <span>${rupiah(i.price)}</span>
            </div>
            <div class="co-qty">
                <button type="button" data-act="dec" aria-label="Kurangi">&minus;</button>
                <span>${i.qty}</span>
                <button type="button" data-act="inc" aria-label="Tambah">+</button>
            </div>
            <button type="button" class="co-remove" data-act="del" aria-label="Hapus">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    const sub = Cart.subtotal();
    const tax = Math.round(sub * TAX_RATE);
    document.getElementById('sum-sub').textContent = rupiah(sub);
    document.getElementById('sum-tax').textContent = rupiah(tax);
    document.getElementById('sum-total').textContent = rupiah(sub + tax);
}

// 1 = Sedang Diproses, 2 = Siap Di-Pickup, 3 = Pesanan Selesai
function setStatus(n) {
    document.querySelectorAll('#co-steps .co-step').forEach((el, i) => {
        el.classList.toggle('current', i === n - 1);
    });
}

function showSuccess(order) {
    lastOrder = order;
    document.querySelector('.checkout-title').hidden = true;
    document.querySelector('.checkout-sub').hidden = true;
    document.getElementById('checkout-content').hidden = true;
    document.getElementById('checkout-success').hidden = false;

    document.getElementById('st-title').textContent = order.tipe === 'Dine In' ? 'Dine In' : 'Pickup';
    document.getElementById('st-no').textContent = 'Pesanan ' + order.no;
    document.getElementById('st-items').innerHTML = order.items.map(i => `
        <div class="st-item">
            <img src="${esc(i.img)}" alt="${esc(i.name)}">
            <span class="st-item-info">
                <strong>${esc(i.name)}</strong>
                <small>${i.qty} x ${rupiah(i.price)}</small>
            </span>
            <span>${rupiah(i.price * i.qty)}</span>
        </div>
    `).join('');
    document.getElementById('st-total').textContent = rupiah(order.total);
    document.getElementById('st-info').textContent =
        order.cabang + (order.tipe === 'Dine In' ? ' · Meja ' + order.meja : '') + ' · ' + order.bayar;

        setStatus(1);
    setTimeout(() => setStatus(2), 30000); // 30 detik
    setTimeout(() => setStatus(3), 30000); // 30 detik lagi
    window.scrollTo({ top: 0 });
}

function downloadStruk() {
    const o = lastOrder;
    if (!o) return;
    const row = (a, b) => a.padEnd(24) + b;
    const garis = '------------------------------';
    const lines = [
        'RAW COFFEE', 'Struk ' + o.no, o.waktu, garis,
        'Nama   : ' + o.nama,
        'Tipe   : ' + o.tipe + (o.tipe === 'Dine In' ? ' (Meja ' + o.meja + ')' : ''),
        'Cabang : ' + o.cabang, garis,
        ...o.items.map(i => row(i.name + ' x' + i.qty, rupiah(i.price * i.qty))),
        garis,
        row('Subtotal', rupiah(o.sub)),
        row('Pajak 10%', rupiah(o.tax)),
        row('TOTAL', rupiah(o.total)),
        '', 'Pembayaran: ' + o.bayar
    ];
    if (o.catatan) lines.push('Catatan: ' + o.catatan);
    lines.push('', 'Terima kasih!');

    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    a.download = 'struk-' + o.no + '.txt';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    // pasang form lebih dulu supaya tidak pernah dikirim bawaan browser
    document.getElementById('checkout-form').addEventListener('submit', e => {
        e.preventDefault();
        const f = e.target;
        const err = document.getElementById('co-error');
        const nama = f.nama.value.trim();
        const wa = f.wa.value.trim();
        const tipe = f.tipe.value;
        const meja = f.meja.value.trim();

        const fail = (msg, field) => {
            err.textContent = msg;
            err.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (field) field.focus();
        };

        const items = Cart.get();
        if (!items.length) return fail('Keranjang masih kosong.');
        if (!nama) return fail('Nama wajib diisi.', f.nama);
        if (!/^(\+62|62|0)8[0-9]{7,12}$/.test(wa.replace(/[\s-]/g, '')))
            return fail('Nomor WhatsApp tidak valid. Contoh: 081234567890', f.wa);
        if (tipe === 'Dine In' && !meja)
            return fail('Nomor meja wajib diisi untuk Dine In.', f.meja);
        err.textContent = '';

        const sub = Cart.subtotal();
        const tax = Math.round(sub * TAX_RATE);

        const order = {
            no: 'RAW-' + Date.now().toString().slice(-6),
            nama, wa, tipe, meja,
            cabang: f.cabang.value,
            bayar: f.bayar.value,
            catatan: f.catatan.value.trim(),
            items, sub, tax,
            total: sub + tax,
            waktu: new Date().toLocaleString('id-ID')
        };

        Cart.clear();
        showSuccess(order);
    });

    document.getElementById('btn-struk').addEventListener('click', downloadStruk);

    renderCheckout();

    // tombol + / - / hapus
    document.getElementById('checkout-items').addEventListener('click', e => {
        const btn = e.target.closest('button[data-act]');
        if (!btn) return;
        const id = btn.closest('.co-item').dataset.id;
        const item = Cart.get().find(i => i.id === id);
        if (!item) return;
        if (btn.dataset.act === 'inc') Cart.setQty(id, item.qty + 1);
        if (btn.dataset.act === 'dec') Cart.setQty(id, item.qty - 1);
        if (btn.dataset.act === 'del') Cart.setQty(id, 0);
        renderCheckout();
    });

    // nomor meja hanya untuk dine in
    const mejaWrap = document.getElementById('meja-wrap');
    document.querySelectorAll('input[name="tipe"]').forEach(r => {
        r.addEventListener('change', () => {
            const dipilih = document.querySelector('input[name="tipe"]:checked').value;
            mejaWrap.style.display = dipilih === 'Dine In' ? 'block' : 'none';
        });
    });
});
