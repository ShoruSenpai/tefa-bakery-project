// Smooth scroll, animation effects, dan penyesuaian carousel produk di beranda
document.addEventListener('DOMContentLoaded', function() {
            // Add animation to elements on scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px 100px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

      
            // Observe all cards and sections - simpler without testimonials
            const elements = document.querySelectorAll('.card, .container-4');
            elements.forEach(el => observer.observe(el));

            // Counter animation for stats
            const counters = document.querySelectorAll('.text-wrapper-2');
            let hasAnimated = false;

            const animateCounters = () => {
                if (hasAnimated) return;
                hasAnimated = true;

                counters.forEach(counter => {
                    const text = counter.innerText;
                    const finalValue = parseInt(text);
                    const increment = finalValue / 30;

                    let currentValue = 0;
                    const updateCounter = () => {
                        currentValue += increment;
                        if (currentValue < finalValue) {
                            counter.innerText = Math.floor(currentValue) + '+';
                            setTimeout(updateCounter, 50);
                        } else {
                            counter.innerText = text;
                        }
                    };
                    updateCounter();
                });
            };

            // Trigger counter animation when stats section is visible
            const statsSection = document.querySelector('.about');
                if (statsSection) {
                    const statsObserver = new IntersectionObserver(function(entries) {
                        if (entries[0].isIntersecting) {
                            animateCounters();
                            statsObserver.unobserve(statsSection);
                        }
                    }, { threshold: 0.5 });
                    statsObserver.observe(statsSection);
                }

            // Ripple effect on buttons
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;

                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    ripple.classList.add('ripple');

                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                });
            });

            // Mouse move effect for cards - smooth and responsive
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    // Disable 3D effect on mobile/tablet for better performance
                    if (window.innerWidth < 768) return;

                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                });
            });

            // ============================
            // Featured Products Carousel: pengelompokan produk
            // ============================
            const featuredCarousel = document.querySelector('#featuredProductsCarousel');
            if (featuredCarousel) {
                const inner = featuredCarousel.querySelector('.carousel-inner');
                if (inner) {
                    const originalCols = Array.from(inner.querySelectorAll('.row > .col.d-flex'));
                    if (originalCols.length > 0) {
                        const templates = originalCols.map(col => col.cloneNode(true));
                        let currentGroupSize = null;

                        const buildSlides = (groupSize) => {
                            inner.innerHTML = '';

                            for (let i = 0; i < templates.length; i += groupSize) {
                                const item = document.createElement('div');
                                item.className = 'carousel-item';
                                if (i === 0) item.classList.add('active');

                                const row = document.createElement('div');
                                // xs-sm: 2 produk per baris, lg: 3 per baris
                                row.className = 'row row-cols-2 row-cols-lg-3 g-4 justify-content-center';

                                templates.slice(i, i + groupSize).forEach(col => {
                                    row.appendChild(col.cloneNode(true));
                                });

                                item.appendChild(row);
                                inner.appendChild(item);
                            }
                        };

                        const updateGrouping = () => {
                            const width = window.innerWidth;
                            const groupSize = width < 768 ? 2 : 3; // mobile: 2 produk/slide, desktop: 3 produk/slide
                            if (groupSize === currentGroupSize) return;
                            currentGroupSize = groupSize;
                            buildSlides(groupSize);
                        };

                        // Bangun slide sekali berdasarkan lebar awal (hindari rebuild saat resize di mobile)
                        updateGrouping();
                    }
                }
            }
        });