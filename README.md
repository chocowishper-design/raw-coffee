1. Ambil screenshot
Buka websitenya (https://rawcoffee.netlify.app/ atau Live Server), lalu tekan Win + Shift + S dan pilih area yang mau difoto. Hasilnya masuk clipboard, jadi tempel dulu ke Paint (Ctrl + V) lalu simpan sebagai PNG.
Kalau mau satu section penuh dari atas sampai bawah, di Chrome tekan F12, lalu Ctrl + Shift + P, ketik screenshot, dan pilih Capture full size screenshot. File langsung terunduh.
Minimal ambil bagian utama: hero, tentang, menu, dan checkout. Tugasnya minta screenshot halaman utama dan bagian penting.
2. Simpan ke folder screenshots/
Di VS Code, klik ikon New Folder di panel Explorer (di sebelah ikon file baru), lalu beri nama screenshots.
Pindahkan file hasil screenshot ke folder itu. Bisa drag dari File Explorer ke panel Explorer VS Code.
Ganti nama file supaya sama dengan yang ada di README: hero.png, menu.png, checkout.png. Tanpa spasi dan huruf kecil semua.
3. Push ke GitHub
Karena tugas minta tiap perubahan lewat branch dan Pull Request, jangan langsung ke main. Di terminal VS Code:
bash
git checkout -b docs/screenshots
git add screenshots/
git commit -m "Tambah screenshot website"
git push -u origin docs/screenshots
Lalu buka GitHub, klik Compare & pull request, dan minta anggota lain mereview sebelum di-merge.
Kalau kamu belum nyaman dengan Git, bisa juga lewat website: di repo klik Add file → Upload files, drag folder screenshots ke situ, lalu pilih Create a new branch (jangan commit langsung ke main) sebelum klik Commit changes.
Setelah masuk, gambar akan otomatis tampil di README karena path-nya sudah screenshots/nama-file.png. Kalau gambar tidak muncul, cek lagi huruf besar/kecil dan ekstensi file-nya.
