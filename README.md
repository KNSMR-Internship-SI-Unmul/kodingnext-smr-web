# Website Profile - Koding Next Samarinda

Website profil resmi Koding Next Samarinda yang dirancang untuk memberikan informasi lengkap mengenai program kursus robotika dan pemrograman, kurikulum pembelajaran, serta pameran hasil karya siswa secara interaktif.

## 🚀 Fitur Utama

- **Kategori Kursus:** Navigasi khusus untuk berbagai level usia:
  - **Little Koders:** 4-8 Tahun
  - **Junior Koders:** 8-16 Tahun
  - **RoboNext:** 4-16 Tahun 
- **Roadmap Pembelajaran:** Jalur belajar interaktif yang membantu calon siswa memahami tahapan materi dari level dasar hingga mahir.
- **Gambaran Proyek Siswa:** Galeri proyek terpusat yang dapat difilter berdasarkan nama modul, kategori program, rentang usia, dan nama siswa

## 🛠️ Stack Teknologi

- **Core Framework:** [React.js](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **State Management:** React Hooks (useState, useMemo, useEffect)
- **Animation:** CSS Transitions & Tailwind Animate
- **Icons:** Heroicons & Lucide Icons

## 📋 Prasyarat

Sebelum menjalankan proyek, pastikan perangkat Anda memiliki:
- Node.js v18.0.0 atau lebih baru
- npm, yarn, atau pnpm

## 🔧 Panduan Instalasi

1. **Clone repositori:**
   ```bash
   git clone [https://github.com/username/koding-next-profile.git](https://github.com/username/koding-next-profile.git)

2. **Masuk ke direktori proyek:**
   ```bash 
   cd koding-next-profile

3. Instal seluruh dependensi:
   ```bash 
   npm install

4. Jalankan aplikasi (Development):
   ```bash 
   npm run dev

5. Build untuk produksi:
   ```bash 
   npm run build

## 📁 Arsitektur Proyek
```text
web-kn/
├── public/                   # Aset statis yang tidak diproses (favicon, index.html)
├── src/                      # Folder utama kode sumber
│   ├── assets/               # Data dummy dan gambar
│   ├── components/           # Komponen React (navbar dan footer) yang bisa digunakan kembali
│   ├── pages/                # Komponen utama yang merepresentasikan rute/halaman
│   ├── services/             # Konfigurasi API dan pengambilan data
│   ├── App.jsx               # Komponen utama aplikasi
│   ├── CourseDispatcher.jsx  # komponen pengontrol navigasi internal
│   ├── index.css             # Stylesheet utama dengan Tailwind CSS
│   └── main.jsx              # Titik masuk (entry point) React
├── .gitignore                # Daftar file yang diabaikan oleh Git
├── eslint.config.js          # konfigurasi ESLint
├── index.html                # HTML utama sebagai rangka dasar (entry point)
├── package-lock.json         # Informasi dependensi yang terinstal
├── package.json              # Informasi dependensi dan skrip proyek
├── README.md                 # Dokumentasi proyek
└── .gitignore                # Daftar file yang diabaikan oleh Git
```
