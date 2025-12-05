// Data untuk detail gambar
        const galleryData = {
            1: {
                title: "Kunjungan",
                image: "../assets/asset tefa/IMG-20251201-WA0012.jpg",
                description: "Kunjungan dari Politeknik Darussalam Blokagung Banyuwangi ke Tefa Bakery & Coffee",
                date: "16 Oktober 2025",
                location: "Tefa Bakery & Coffee"
            },
            2: {
                title: "Kunjungan Dinas Peternakan",
                image: "../assets/asset tefa/IMG-20251201-WA0016.jpg",
                description: "Kunjungan dari Dinas Peternakan Provinsi Jawa Timur, Melihat Pabrik dan Kegiatan Produksi Tefa Bakery & Coffee",
                date: "25 September 2025",
                location: "Tefa Bakery & Coffee"
            },
            3: {
                title: "Observasi Mahasiswa Jurusan TI",
                image: "../assets/asset tefa/IMG_20250902_150333 - (1).jpg",
                description: "Mahasiswa Jurusan TI Prodi Teknik Informatika melakukan Observasi ke Tefa Bakery & Coffee",
                date: "03 September 2025",
                location: "Tefa Bakery & Coffee"
            },
            4: {
                title: "Kunjungan TK Nailul Maram",
                image: "../assets/asset tefa/IMG-20251201-WA0014.jpg",
                description: "Tefa Bakery & Coffee menerima kunjungan dari TK Nailul Maram untuk edukasi tentang bakery dan kopi",
                date: "21 Oktober 2025",
                location: "Tefa Bakery & Coffee"
            },
            5: {
                title: "Pelatihan Barista Kopi",
                image: "../assets/asset tefa/IMG-20251201-WA0013.jpg",
                description: "Pelatihan Barista kopi di Tefa Bakery & Coffee di buka langsung Oleh Kepala Dinas Tenaga Kerja Kabupaten Jember Ibu Yuliana Harimurti, SE.,MSI.,",
                date: "03 November 2025",
                location: "Tefa Bakery & Coffee"
            },
            6: {
                title: "Kunjungan Perum Bulog",
                image: "../assets/asset tefa/foto prbd.jpg",
                description: "Kunjungan dari Perum Bulog ke Tefa Bakery & Coffee didampingi Direktur Politeknik Negeri Jember Bapak Saiful Anwar, S.Tp,.M.P",
                date: "19 September 2025",
                location: "Tefa Bakery & Coffee"
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
                    popupLike.classList.remove('Menyukai');
                    popupLike.innerHTML = '<i class="bi bi-heart"></i><span>Suka</span>';
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
                    this.innerHTML = '<i class="bi bi-heart-fill"></i><span>Menyukai</span>';
                } else {
                    this.innerHTML = '<i class="bi bi-heart"></i><span>Suka</span>';
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

            // Scroll animations with direction detection
            const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Track scroll direction
            let lastScrollY = window.scrollY || window.pageYOffset;
            let scrollDirection = 'down';

            // Update scroll direction
            function updateScrollDirection() {
                const currentScrollY = window.scrollY || window.pageYOffset;
                scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
                lastScrollY = currentScrollY;
            }

            // Throttled scroll handler
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) {
                    window.cancelAnimationFrame(scrollTimeout);
                }
                scrollTimeout = window.requestAnimationFrame(updateScrollDirection);
            }, { passive: true });

            // Intersection Observer untuk animasi scroll dengan direction detection
            const observerOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -80px 0px'
            };

            const galleryObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !prefersReducedMotion) {
                        const element = entry.target;
                        let animationType = element.dataset.animation || 'fadeInUp';
                        const delay = element.dataset.delay || '0';

                        // Adjust animation based on scroll direction
                        if (scrollDirection === 'up') {
                            if (animationType === 'fadeInUp') {
                                animationType = 'fadeInDown';
                            } else if (animationType === 'fadeInDown') {
                                animationType = 'fadeInUp';
                            } else if (animationType === 'slideInLeft') {
                                animationType = 'slideInRight';
                            } else if (animationType === 'slideInRight') {
                                animationType = 'slideInLeft';
                            }
                        }

                        element.style.opacity = '0';
                        element.style.animation = 'none';
                        void element.offsetWidth;
                        
                        const duration = window.innerWidth < 768 ? '0.6s' : '0.8s';
                        element.style.animation = `${animationType} ${duration} ease-out ${delay}s forwards`;
                        galleryObserver.unobserve(element);
                    } else if (entry.isIntersecting && prefersReducedMotion) {
                        entry.target.style.opacity = '1';
                        galleryObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe gallery items
            galleryItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.dataset.animation = 'scaleIn';
                item.dataset.delay = (index * 0.1).toString();
                galleryObserver.observe(item);
            });

            // Observe header section
            const galleryHeader = document.querySelector('.div-wrapper, .from-humble-wrapper');
            if (galleryHeader) {
                galleryHeader.style.opacity = '0';
                galleryHeader.dataset.animation = 'fadeInDown';
                galleryHeader.dataset.delay = '0';
                galleryObserver.observe(galleryHeader);
            }
});