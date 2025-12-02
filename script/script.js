// Fungsi Filter dan Paginasi Produk
document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua tombol filter
    const filterButtons = document.querySelectorAll('.btn-filter');
    // Ambil semua kartu produk
    const productCards = document.querySelectorAll('[data-category]');

    // Elemen paginasi - gunakan ID spesifik untuk menghindari mempengaruhi header
    const prevButton = document.querySelector('.icon-wrapper[aria-label="Previous page"]');
    const nextButton = document.querySelector('.button-7[aria-label="Next page"]');
    const pageNumberContainer = document.querySelector('.container-19');
    const showingText = document.querySelector('#pagination-text');

    // Status halaman saat ini
    let currentPage = 1;
    let currentFilter = 'all';

    // Hitung jumlah produk per halaman
    // Desktop: 2 baris penuh (menyesuaikan jumlah kolom)
    // Mobile: tetap 4 produk (2 kolom x 2 baris)
    function getProductsPerPage() {
        const width = window.innerWidth;
        if (width >= 1440) return 8; // 4 kolom x 2 baris
        if (width >= 1024) return 6; // 3 kolom x 2 baris
        // Tablet & mobile: 2 kolom x 2 baris = 4 produk
        return 4;
    }

    // Ambil produk yang terlihat (setelah filter)
    function getVisibleProducts() {
        return Array.from(productCards).filter(card => {
            const cardCategory = card.getAttribute('data-category');
            if (currentFilter === 'all') {
                return true;
            }
            return cardCategory === currentFilter;
        });
    }

    // Perbarui tombol paginasi
    function updatePaginationButtons() {
        const visibleProducts = getVisibleProducts();
        const totalProducts = visibleProducts.length;
        const productsPerPage = getProductsPerPage();
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        // Hapus tombol nomor halaman yang ada
        if (pageNumberContainer) {
            pageNumberContainer.innerHTML = '';

            // Helper: buat tombol halaman
            const createPageButton = (page) => {
                const isActive = page === currentPage;
                const btn = document.createElement('button');
                btn.className = isActive ? 'button-5 active' : 'button-6';

                const span = document.createElement('span');
                span.className = isActive ? 'text-wrapper-29' : 'text-wrapper-pagination';
                span.textContent = page;
                btn.appendChild(span);

                btn.addEventListener('click', function() {
                    if (currentPage === page) return;
                    currentPage = page;
                    showCurrentPage();
                });

                return btn;
            };

            // Helper: buat elemen "..." (ellipsis)
            const createDots = () => {
                const dots = document.createElement('span');
                dots.className = 'pagination-dots';
                dots.textContent = '…';
                return dots;
            };

            // Jika halaman sedikit, tampilkan semua
            if (totalPages <= 5) {
                for (let i = 1; i <= totalPages; i++) {
                    pageNumberContainer.appendChild(createPageButton(i));
                }
            } else {
                // Pola: 1 ... (current-1, current, current+1) ... total
                pageNumberContainer.appendChild(createPageButton(1));

                if (currentPage > 3) {
                    pageNumberContainer.appendChild(createDots());
                }

                const start = Math.max(2, currentPage - 1);
                const end = Math.min(totalPages - 1, currentPage + 1);

                for (let i = start; i <= end; i++) {
                    pageNumberContainer.appendChild(createPageButton(i));
                }

                if (currentPage < totalPages - 2) {
                    pageNumberContainer.appendChild(createDots());
                }

                pageNumberContainer.appendChild(createPageButton(totalPages));
            }
        }

        // Perbarui tombol prev/next
        if (prevButton) {
            prevButton.style.opacity = currentPage === 1 ? '0.4' : '1';
            prevButton.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';
        }

        if (nextButton) {
            nextButton.style.opacity = currentPage >= totalPages ? '0.4' : '1';
            nextButton.style.cursor = currentPage >= totalPages ? 'not-allowed' : 'pointer';
        }

        // Perbarui teks informasi
        if (showingText) {
            const start = totalProducts === 0 ? 0 : (currentPage - 1) * productsPerPage + 1;
            const end = Math.min(currentPage * productsPerPage, totalProducts);
            showingText.textContent = `Menampilkan ${start}-${end} dari ${totalProducts} produk`;
        }
    }

    // Tampilkan produk untuk halaman saat ini
    function showCurrentPage() {
        const visibleProducts = getVisibleProducts();
        const productsPerPage = getProductsPerPage();
        const totalPages = Math.ceil(visibleProducts.length / productsPerPage);

        // Pastikan currentPage berada dalam rentang yang valid
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }
        if (currentPage < 1) {
            currentPage = 1;
        }

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;

        // Sembunyikan semua produk terlebih dahulu
        productCards.forEach(card => {
            card.style.display = 'none';
        });

        // Tampilkan produk untuk halaman saat ini
        visibleProducts.slice(startIndex, endIndex).forEach(card => {
            card.style.display = '';
        });

        updatePaginationButtons();
    }

    // Fungsi filter
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Ambil nilai filter dari atribut data-filter
            const filterValue = this.getAttribute('data-filter');

            // Hapus class active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Tambahkan class active ke tombol yang diklik
            this.classList.add('active');

            // Perbarui filter saat ini dan reset ke halaman 1
            currentFilter = filterValue;
            currentPage = 1;

            // Tampilkan produk yang difilter dengan paginasi
            showCurrentPage();
        });
    });

    // Klik tombol paginasi sekarang ditangani di updatePaginationButtons()

    // Tombol sebelumnya
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                showCurrentPage();
            }
        });
    }

    // Tombol selanjutnya
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const visibleProducts = getVisibleProducts();
            const productsPerPage = getProductsPerPage();
            const totalPages = Math.ceil(visibleProducts.length / productsPerPage);

            if (currentPage < totalPages) {
                currentPage++;
                showCurrentPage();
            }
        });
    }

    // Tangani perubahan ukuran jendela untuk menghitung ulang produk per halaman
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Jangan reset ke halaman 1 agar tidak terasa "refresh" saat address bar mobile muncul/hilang
            showCurrentPage();
        }, 250);
    });

    // Klik kartu = klik tombol Preview (khusus mobile)
    const isMobile = () => window.innerWidth <= 576;
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            if (!isMobile()) return;
            const previewBtn = card.querySelector('.button-4');
            if (previewBtn) {
                previewBtn.click();
            }
        });
    });

    // Muat awal
    showCurrentPage();
});