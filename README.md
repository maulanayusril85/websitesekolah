SDN Kiduldalem I Bangil — Website Sekolah Dasar
===============================================

Struktur proyek statis untuk website sekolah dasar yang responsif dan ringan.

Cara Menjalankan
----------------
- Cukup buka file `index.html` di peramban Anda (Chrome, Edge, Firefox, Safari).
- Tidak membutuhkan server atau instalasi tambahan.

Struktur Folder
---------------
- `index.html` — Halaman utama (beranda, profil, program, guru, fasilitas, berita, pendaftaran, kontak)
- `assets/css/styles.css` — Gaya dan tema
- `assets/js/main.js` — Interaksi: menu mobile & formulir kontak
- `assets/img/placeholder.svg` — Gambar ilustrasi placeholder

Kustomisasi Cepat
-----------------
- Ubah nama sekolah, alamat, dan kontak pada bagian Kontak di `index.html`.
- Sesuaikan warna lewat variabel CSS pada `:root` di `assets/css/styles.css`.
- Ganti `assets/img/placeholder.svg` dengan foto sekolah, guru, dan fasilitas Anda.

Catatan
-------
- Formulir kontak bersifat simulasi (tidak mengirim data). Hubungkan ke backend/email gateway untuk produksi.
- Navigasi mobile menggunakan tombol toggle, tanpa dependensi pihak ketiga.

Transfer ke Komputer Lain
-------------------------
- Kompres folder proyek ini (Windows: klik kanan folder → Send to → Compressed (zipped) folder), pindahkan ZIP ke komputer lain, lalu Extract.
- Buka `index.html` di browser. Tidak membutuhkan server.

Riwayat Obrolan & Perubahan
----------------------------
- Ringkasan keputusan dan perubahan tersedia di `docs/riwayat-obrolan.md`.
- Jika ingin menyertakan percakapan lengkap, tempelkan isi chat ke file tersebut atau buat `docs/obrolan-lengkap.md`.

Hosting Opsional
----------------
- Anda dapat mengunggah folder ini ke GitHub Pages/Netlify/Vercel sebagai situs statis.
