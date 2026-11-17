# 📱 Todo List App Async (Expo React Native)

Aplikasi **Todo List Asinkron** yang dibangun menggunakan **React Native** dan **Expo** berdasarkan modul materi **Week 8: Studi Kasus & Penugasan Praktik Pemrograman Mobile**.

---

## 🎨 Palet Warna Desain (Custom Theme)

Aplikasi ini menggunakan palet warna khusus:

| Warna | Hex | Penerapan UI |
|---|---|---|
| **Sage Green** | `#ABC270` | Ikon centang tugas selesai (*completed*), aksen keberhasilan |
| **Warm Yellow** | `#FEC868` | Ikon reload, highlight statistik, aksen teks header |
| **Warm Coral / Peach** | `#FDA769` | Tombol **"+ Tambah"** (CTA utama), indikator loading, tab aktif |
| **Deep Espresso Brown** | `#463C33` | Background header melengkung, tipografi teks utama, ikon kontras tinggi |
| **Soft Warm Cream** | `#FBF9F5` | Background layar aplikasi (hangat dan nyaman di mata) |
| **Card White** | `#FFFFFF` | Latar kartu tugas dan form input |

---

## 🌟 6 Fitur Wajib Praktikum (Siklus CRUD Async Penuh)

1. **Tampilkan Data API (GET)**: Mengambil 10 daftar tugas awal dari server REST API menggunakan `fetch()` & `async/await` di dalam React Hook `useEffect()`.
2. **Loading Indicator**: Menampilkan `<ActivityIndicator />` saat aplikasi menunggu respons asinkron dari server.
3. **Menambahkan Todo (POST)**: Form input teks untuk memasukkan tugas baru dan mengirim data ke REST API melalui metode `POST`.
4. **Ubah Status Tugas (PATCH)**: Menyediakan tombol centang/toggle untuk menandai tugas selesai/belum secara dinamis melalui server via metode `PATCH`.
5. **Error Handling**: Blok `try...catch` lengkap untuk menangani kegagalan koneksi atau respons API dan memberikan pesan umpan balik menggunakan `Alert.alert()`.
6. **Refresh Data**: Menyediakan fungsi *reload* cepat melalui tombol di header serta gesture *Pull-to-Refresh* (`RefreshControl`).
7. *(Bonus)* **Hapus Tugas (DELETE)**: Menghapus tugas dari server dan daftar via metode `DELETE` dengan konfirmasi popup.

---

## 🌐 Endpoint REST API (JSONPlaceholder)

- **Host**: `https://jsonplaceholder.typicode.com`
- `GET /todos?_limit=10` : Mengambil 10 data awal
- `POST /todos` : Simulasi menambah data tugas
- `PATCH /todos/:id` : Simulasi update status selesai
- `DELETE /todos/:id` : Simulasi hapus tugas

> *Catatan: JSONPlaceholder adalah mock online REST API. Permintaan asinkron nyata dikirimkan ke server, dan UI memperbarui state lokal secara konsisten sehingga langsung terlihat interaktif di layar smartphone.*

---

## 📁 Struktur Berkas

```text
├── App.js                     # Root aplikasi, Navigasi Bottom Tab, SafeArea
├── app.json                   # Konfigurasi proyek Expo
├── package.json               # Dependensi & script aplikasi
├── src/
│   ├── api/
│   │   └── todoApi.js         # Fungsi fetch GET, POST, PATCH, DELETE
│   ├── components/
│   │   ├── Header.js          # Header melengkung & counter tugas
│   │   ├── TodoInput.js       # Form input tugas & tombol "+ Tambah"
│   │   ├── TodoItem.js        # Kartu tugas (centang, teks, tombol hapus)
│   │   └── LoadingSpinner.js  # Komponen indikator loading
│   ├── screens/
│   │   ├── HomeScreen.js      # Layar utama daftar todo
│   │   └── SettingsScreen.js  # Layar pengaturan, spesifikasi API & reset data
│   └── theme/
│       └── colors.js          # Konstanta palet warna
```

---

## 🚀 Cara Menjalankan Aplikasi di Smartphone (Expo Go)

1. **Buka Terminal / PowerShell** pada folder proyek ini.
2. Jalankan perintah:
   ```bash
   npx expo start
   ```
3. Buka aplikasi **Expo Go** di smartphone fisik Anda (unduh di Google Play Store atau Apple App Store).
4. Pindai (scan) **QR Code** yang muncul di terminal (untuk Android via Expo Go, untuk iOS via aplikasi Kamera bawaan).
5. Aplikasi Todo List siap diuji coba langsung di ponsel!
