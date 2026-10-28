# Raw Coffee
Website statis buat kedai kopi RAW Coffee. Kami bikin ini sebagai tugas akhir Weekly Meet Catalyst (Build Together: Collaborative Mini Project).

Link website: https://rawcoffee.netlify.app/

## Tentang Project
RAW Coffee ceritanya kedai kopi yang pakai biji kopi lokal. Websitenya berisi company profile dan katalog menu, plus halaman keranjang dan checkout yang sederhana.

Project ini dibuat buat latihan Git dan GitHub bareng tim: pakai Issues, branch, Pull Request, dan code review. Tema kedai kopi kami pilih karena gampang dibagi jadi beberapa section yang isinya beda-beda.

## Anggota Kelompok

| Nama | Username GitHub |
|------|-----------------|
| Fadilah Lutfiani | chocowishper-design |
| Fella Nur Hidayah | fen0o |
| Ainun Maulida | ainunmaulidiarah-prog |
| M. Raihan Aufa | ravaaceell |

## Isi Website
Di halaman utama ada navbar (lengkap dengan jumlah isi keranjang), hero dengan tombol Order Now dan slider foto, bagian tentang, Our Vibe & Atmosphere, cerita di balik RAW Coffee, cabang, menu, sampai kontak dan footer. Menunya punya tombol tambah ke keranjang. Halaman checkout berisi ringkasan pesanan, form pemesan, dan status pesanan. Tampilannya juga sudah responsif buat layar HP.

## Teknologi
HTML, CSS, JavaScript, Font Awesome buat ikon, dan Google Fonts (Montserrat).

## Cara Menjalankan
Clone dulu repository-nya:

```
git clone https://github.com/chocowishper-design/raw-coffee.git
```

Habis itu buka foldernya, lalu buka `index.html` di browser. Bisa juga pakai Live Server di VS Code. Butuh koneksi internet supaya ikon dan font bisa tampil.

## Struktur File
```
index.html       halaman utama
checkout.html    halaman keranjang dan checkout
copi.css         style halaman utama
checkout.css     style halaman checkout
cart.js          logika keranjang
checkout.js      logika checkout
*.jpeg, *.png    foto slider, menu, dan suasana kedai
screenshots/     dokumentasi tampilan website
```

## Pembagian Tugas

| Issue | Task | Pengerjaan | Branch |
|-------|------|------------|--------|
| #1 | Navbar, hero, slider | chocowishper-design | feature/navbar-hero |
| #2 | Tentang, vibe, cerita | fen0o | feature/about-vibe |
| #3 | Menu, cabang, keranjang | chocowishper-design, ainunmaulidiarah-prog | feature/menu-cart |
| #4 | Halaman checkout | ainunmaulidiarah-prog | feature/checkout |
| #5 | Kontak, footer, responsif | fen0o | feature/contact-footer |
| #6 | README dan screenshot | ravaaceell, chocowishper-design | docs/readme |

## Screenshot
Screenshot ada di folder `screenshots/`.

![Hero](screenshots/hero.png)
![Menu](screenshots/menu.png)
![Checkout](screenshots/checkout1.png)
![Checkout](screenshots/checkout2.png)
