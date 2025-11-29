// Data untuk detail gambar
        const galleryData = {
            1: {
                title: "Kunjungan",
                image: "../assets/images/dummy-image-square.webp",
                description: "Gambar kegiatan kunjungan siswa smk negeri jember ke Tefa Coffe and Bakery",
                date: "March 2024",
                location: "Tefa coffe and bakery"
            },
            2: {
                title: "Artisan Bread Making",
                image: "../assets/images/dummy-image-square.webp",
                description: "Proses pembuatan roti artisan oleh siswa TEFA Bakery",
                date: "April 2024",
                location: "Tefa coffe and bakery"
            },
            3: {
                title: "Coffee Barista",
                image: "../assets/images/dummy-image-square.webp",
                description: "Pelatihan barista untuk siswa dalam menyajikan kopi berkualitas",
                date: "Mei 2024",
                location: "Tefa coffe and bakery"
            },
            4: {
                title: "Cafe Exterior",
                image: "../assets/images/dummy-image-square.webp",
                description: "Tampilan luar cafe TEFA Bakery & Coffee yang menarik",
                date: "Juni 2024",
                location: "Tefa coffe and bakery"
            },
            5: {
                title: "Pastry Display",
                image: "../assets/images/dummy-image-square.webp",
                description: "Display pastry yang dibuat oleh siswa TEFA Bakery",
                date: "Juli 2024",
                location: "Tefa coffe and bakery"
            },
            6: {
                title: "Dessert Plating",
                image: "../assets/images/dummy-image-square.webp",
                description: "Teknik plating dessert yang diajarkan kepada siswa",
                date: "Agustus 2024",
                location: "Tefa coffe and bakery"
            }
        };

        // Gallery animations and interactions
        document.addEventListener('DOMContentLoaded', function() {
            const galleryPopup = document.getElementById('galleryPopup');
            const popupClose = document.getElementById('popupClose');
            const popupTitle = document.getElementById('popupTitle');
            const popupImage = document.getElementById('popupImage');
            const popupDescription = document.getElementById('popupDescription');
            const popupDate = document.getElementById('popupDate');
            const popupLocation = document.getElementById('popupLocation');
            const popupLike = document.getElementById('popupLike');
            const popupShare = document.getElementById('popupShare');

            // Fungsi untuk membuka popup
            function openPopup(galleryId) {
                const data = galleryData[galleryId];
                if (data) {
                    popupTitle.textContent = data.title;
                    popupImage.src = data.image;
                    popupImage.alt = data.title;
                    popupDescription.textContent = data.description;
                    popupDate.textContent = data.date;
                    popupLocation.textContent = data.location;
                    galleryPopup.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Reset like button state
                    popupLike.classList.remove('liked');
                    popupLike.innerHTML = '<i class="bi bi-heart"></i><span>Like</span>';
                }
            }

            // Fungsi untuk menutup popup
            function closePopup() {
                galleryPopup.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Event listener untuk gallery items
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const galleryId = this.getAttribute('data-id');
                    openPopup(galleryId);
                });

                // Keyboard accessibility
                item.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const galleryId = this.getAttribute('data-id');
                        openPopup(galleryId);
                    }
                });
            });

            // Event listener untuk tombol close
            popupClose.addEventListener('click', closePopup);

            // Event listener untuk menutup popup dengan menekan ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && galleryPopup.classList.contains('active')) {
                    closePopup();
                }
            });

            // Event listener untuk menutup popup dengan mengklik di luar konten
            galleryPopup.addEventListener('click', function(e) {
                if (e.target === galleryPopup) {
                    closePopup();
                }
            });

            // Event listener untuk tombol like
            popupLike.addEventListener('click', function() {
                this.classList.toggle('liked');
                if (this.classList.contains('liked')) {
                    this.innerHTML = '<i class="bi bi-heart-fill"></i><span>Liked</span>';
                } else {
                    this.innerHTML = '<i class="bi bi-heart"></i><span>Like</span>';
                }
            });

            // Event listener untuk tombol share
            popupShare.addEventListener('click', function() {
                // Di sini bisa ditambahkan logika untuk berbagi
                if (navigator.share) {
                    navigator.share({
                        title: popupTitle.textContent,
                        text: popupDescription.textContent,
                        url: window.location.href
                    })
                    .catch(console.error);
                } else {
                    // Fallback untuk browser yang tidak mendukung Web Share API
                    alert('Fitur berbagi akan diimplementasikan di sini');
                }
            });

            // Enhanced gallery image interaction
            galleryItems.forEach(item => {
                const image = item.querySelector('.gallery-image');

                item.addEventListener('mouseenter', () => {
                    if (image) {
                        image.style.transform = 'scale(1.05)';
                    }
                });

                item.addEventListener('mouseleave', () => {
                    if (image) {
                        image.style.transform = 'scale(1)';
                    }
                });
            });

            // Smooth anchor scroll
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    const target = document.querySelector(href);
                    
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
});