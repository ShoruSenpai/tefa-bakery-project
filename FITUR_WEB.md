# 📋 Dokumentasi Fitur Website TEFA Bakery & Coffee

## 🎯 Ringkasan
Website TEFA Bakery & Coffee adalah website resmi untuk Teaching Factory Politeknik Negeri Jember yang menampilkan produk bakery dan kopi berkualitas tinggi. Website ini dibangun dengan teknologi modern dan responsif untuk semua perangkat.

---

## 🏠 Halaman Utama (index.html)

### 1. **Hero Section**
- **Judul dan Deskripsi**: Menampilkan branding TEFA Bakery & Coffee
- **Call-to-Action Buttons**: 
  - "Lihat Produk" - mengarah ke halaman produk
  - "Hubungi Kami" - mengarah ke halaman kontak
- **Hero Image**: Gambar utama dengan animasi slide-in

### 2. **About Section (Tentang)**
- **Judul**: "Berinovasi Bersama Generasi"
- **Deskripsi**: Penjelasan tentang TEFA Bakery
- **Statistik Counter Animation**:
  - 26+ Years (tahun pengalaman)
  - 50+ Product (jumlah produk)
  - 1000+ Happy Customers (pelanggan puas)
- **Gambar**: Foto tentang TEFA dengan animasi

### 3. **Featured Products Section (Produk Unggulan)**
- **Product Slider**: 
  - Infinite loop slider dengan auto-play (3 detik)
  - Navigasi prev/next button
  - Pause on hover
  - Menampilkan 6 produk unggulan
- **Product Cards**:
  - Gambar produk
  - Badge kategori (Roti Manis, Roti Spesial)
  - Rating dengan bintang
  - Harga
  - Button "Keranjang" (desktop only, hidden di mobile)
- **Responsive**: 
  - Desktop: 3 kolom
  - Tablet: 2 kolom
  - Mobile: 2 kolom

### 4. **Testimonials Section (Kepuasan Pelanggan)**
- **Header**: Judul dan deskripsi
- **Testimonial Cards**: 3 kartu testimoni dengan:
  - Rating bintang
  - Quote/testimoni
  - Nama dan role pelanggan
- **Gradient Background**: Setiap card memiliki warna gradient berbeda

---

## 🛍️ Halaman Produk (produk.html)

### 1. **Filter Produk**
- **Kategori Filter**:
  - Semua Produk
  - Roti
  - Minuman Panas
  - Minuman Dingin
- **Active State**: Tombol filter aktif memiliki styling berbeda
- **Hover Effect**: Efek hover pada tombol filter

### 2. **Grid Produk**
- **Layout Responsif**:
  - **Desktop (≥1024px)**: 4 kolom (8 produk per 2 baris)
  - **Tablet (768px-1023px)**: 3 kolom (6 produk per 2 baris)
  - **Mobile (<768px)**: 2 kolom (4 produk per 2 baris)
- **Product Cards**:
  - Gambar produk dengan fallback
  - Badge kategori
  - Rating dengan bintang
  - Nama produk
  - Deskripsi singkat
  - Harga
  - Button "Keranjang" (hidden di mobile)

### 3. **Paginasi**
- **Dynamic Pagination**: 
  - Menyesuaikan jumlah produk per halaman berdasarkan ukuran layar
  - Mobile: 4 produk per halaman
  - Desktop: 8 produk per halaman (4 kolom x 2 baris)
- **Navigation**:
  - Previous/Next buttons
  - Page number buttons
  - Text informasi "Menampilkan X-Y dari Z produk"
- **Filter Integration**: Paginasi bekerja dengan filter kategori

### 4. **3D Tilt Effect** (Desktop Only)
- **Hover Effect**: Kartu produk memiliki efek 3D tilt saat hover
- **Mouse Tracking**: Mengikuti pergerakan mouse untuk efek 3D
- **Disabled on Mobile**: Untuk performa yang lebih baik

---

## 📸 Halaman Galeri (galeri.html)
- **Photo Gallery**: Menampilkan koleksi foto produk dan aktivitas
- **Lightbox/Modal**: Preview gambar dalam ukuran besar
- **Grid Layout**: Responsif dengan berbagai ukuran layar

---

## ℹ️ Halaman Tentang (tentang.html)
- **Sejarah**: Informasi tentang TEFA Bakery
- **Visi & Misi**: Kartu visi dan misi dengan icon
- **Quote Section**: Kutipan inspiratif
- **Animasi**: Scroll animations untuk setiap section

---

## 📞 Halaman Kontak (kontak.html)

### 1. **Contact Cards**
- **Layout Responsif**:
  - **Desktop**: Auto-fit grid
  - **Mobile**: 2 kolom (2 baris)
- **Info Cards**:
  - **Instagram**: @tefasippolije dengan link
  - **Jam Operasional**: Senin-Sabtu 08.00-16.00 WIB
  - **Facebook**: tefa.sip dengan link
  - **WhatsApp**: +62 8233-3497-811 dengan link langsung
- **Icon**: Setiap card memiliki icon Bootstrap Icons

### 2. **Map Section**
- **Google Maps Embed**: Peta lokasi TEFA Bakery
- **Address**: Jl. Tawang Mangu No. 68, Pintu Masuk Belakang Polije
- **Map Actions**: Tombol untuk membuka di Google Maps

### 3. **Contact Form**
- **Form Fields**: 
  - Nama
  - Email
  - Subject
  - Pesan
- **Submit Button**: Tombol kirim dengan validasi

---

## 🎨 Fitur Desain & Animasi

### 1. **Scroll Animations**
- **Direction Detection**: 
  - Deteksi arah scroll (up/down)
  - Animasi berbeda untuk scroll up vs scroll down
- **Animation Types**:
  - `fadeInUp`: Fade in dari bawah
  - `fadeInDown`: Fade in dari atas
  - `slideInLeft`: Slide dari kiri
  - `slideInRight`: Slide dari kanan
  - `scaleIn`: Scale dari kecil ke besar
- **Performance**:
  - **Desktop**: Durasi 0.8s
  - **Mobile**: Durasi 0.6s (lebih cepat untuk performa)
- **Accessibility**: Mendukung `prefers-reduced-motion`

### 2. **Hover Effects**
- **Product Cards**: 
  - Transform translateY pada hover
  - Box shadow yang lebih besar
  - Image scale effect
- **Buttons**: 
  - Ripple effect pada click
  - Transform translateY
  - Shadow enhancement
- **Navigation Links**: Smooth transitions

### 3. **Counter Animation**
- **Stats Counter**: Animasi counter untuk statistik (26+, 50+, 1000+)
- **Trigger**: Otomatis saat section visible di viewport
- **Smooth Increment**: Counter naik secara bertahap

---

## 📱 Responsive Design

### 1. **Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px
- **Large Desktop**: ≥ 1440px

### 2. **Mobile Optimizations**
- **Navigation**: 
  - Hamburger menu
  - Logo switching (mobile vs desktop)
  - Auto-close menu saat klik link
- **Layout Adjustments**:
  - Stacked layout untuk mobile
  - Reduced padding dan spacing
  - Hidden elements (button keranjang di produk slider mobile)
- **Performance**:
  - Reduced animation duration
  - Disabled 3D effects
  - Optimized image loading

### 3. **Desktop Features**
- **Enhanced Interactions**:
  - 3D tilt effects
  - Parallax effects (jika diaktifkan)
  - Hover animations
- **Layout**:
  - Multi-column grids
  - Side-by-side layouts
  - Larger spacing

---

## 🧭 Navigation Features

### 1. **Header Navigation**
- **Sticky Header**: Header tetap di atas saat scroll
- **Active State**: Highlight menu item sesuai halaman aktif
- **Mobile Menu**: 
  - Hamburger button
  - Slide-in menu
  - Auto-close functionality
- **Logo Display**:
  - Desktop: TEFA logo + Polije logo (kanan)
  - Mobile: TEFA logo + Polije logo (sebelah)

### 2. **Smooth Scroll**
- **Anchor Links**: Smooth scroll ke section tertentu
- **Navigation Links**: Transisi halus antar halaman

---

## 🎯 Interactive Features

### 1. **Product Filtering**
- **Real-time Filter**: Filter produk berdasarkan kategori
- **Visual Feedback**: Active state pada tombol filter
- **Pagination Integration**: Paginasi otomatis update setelah filter

### 2. **Product Slider**
- **Infinite Loop**: Slider berputar tanpa batas
- **Auto-play**: Otomatis slide setiap 3 detik
- **Pause on Hover**: Pause saat mouse hover
- **Manual Control**: Prev/Next buttons
- **Touch Support**: Support untuk touch/swipe di mobile

### 3. **Click Handlers**
- **Mobile Product Cards**: Click pada card trigger button action
- **Desktop**: Button terpisah untuk aksi

---

## 🎨 Styling Features

### 1. **Color Scheme**
- **Primary Brown**: #6b4423, #8b6f47
- **Accent Gold**: #c68a44, #fbbf24
- **Background**: #FAF7F2, #F5E6D3
- **White**: #ffffff

### 2. **Typography**
- **Headings**: Quicksand-Medium, Poppins-Bold
- **Body**: Poppins-Regular
- **Responsive Font Sizes**: Menggunakan clamp() untuk fluid typography

### 3. **Components**
- **Cards**: Rounded corners (24px), shadow, border
- **Buttons**: Rounded (50px), hover effects, ripple
- **Badges**: Pill-shaped, colored backgrounds

---

## ⚡ Performance Features

### 1. **Optimizations**
- **Lazy Loading**: Images dengan loading="lazy"
- **Debounced Events**: Resize dan scroll events di-debounce
- **RequestAnimationFrame**: Untuk smooth animations
- **Passive Event Listeners**: Untuk scroll events

### 2. **Accessibility**
- **ARIA Labels**: Label untuk screen readers
- **Keyboard Navigation**: Support keyboard navigation
- **Reduced Motion**: Respect user preferences
- **Semantic HTML**: Proper HTML structure

---

## 🔧 Technical Stack

### 1. **Frontend**
- **HTML5**: Semantic markup
- **CSS3**: 
  - Custom properties
  - Flexbox & Grid
  - Animations & Transitions
- **JavaScript (Vanilla)**: 
  - ES6+ features
  - Intersection Observer API
  - Event delegation

### 2. **Libraries**
- **Bootstrap 5.3.2**: Grid system & components
- **Bootstrap Icons 1.11.0**: Icon library

### 3. **Browser Support**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📊 Fitur Utama Summary

✅ **Responsive Design** - Mobile, Tablet, Desktop  
✅ **Product Filtering** - Filter by category  
✅ **Pagination** - Dynamic pagination  
✅ **Infinite Slider** - Auto-play product slider  
✅ **Scroll Animations** - Direction-aware animations  
✅ **3D Effects** - Hover tilt effects (desktop)  
✅ **Counter Animation** - Stats counter  
✅ **Contact Form** - Form dengan validasi  
✅ **Google Maps** - Embedded map  
✅ **Social Media Links** - Instagram, Facebook, WhatsApp  
✅ **Mobile Menu** - Hamburger navigation  
✅ **Smooth Scroll** - Smooth page transitions  
✅ **Accessibility** - ARIA labels, keyboard nav  
✅ **Performance** - Optimized animations & loading  

---

## 🚀 Cara Menggunakan

### Navigasi
1. Gunakan menu header untuk berpindah halaman
2. Klik logo untuk kembali ke beranda
3. Gunakan smooth scroll untuk section tertentu

### Produk
1. Gunakan filter untuk melihat kategori tertentu
2. Gunakan paginasi untuk melihat lebih banyak produk
3. Klik button "Keranjang" untuk aksi (desktop)
4. Klik card untuk aksi (mobile)

### Kontak
1. Klik icon social media untuk membuka profil
2. Klik WhatsApp untuk chat langsung
3. Isi form kontak untuk mengirim pesan
4. Gunakan tombol map untuk membuka di Google Maps

---

**Dibuat dengan ❤️ untuk TEFA Bakery & Coffee - Politeknik Negeri Jember**

