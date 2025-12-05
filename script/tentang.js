       // Smooth scroll and animation effects
        document.addEventListener('DOMContentLoaded', function() {
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

            const observer = new IntersectionObserver(function(entries) {
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
                        observer.unobserve(element);
                    } else if (entry.isIntersecting && prefersReducedMotion) {
                        entry.target.style.opacity = '1';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe elemen untuk scroll animation
            const elements = document.querySelectorAll('.sejarah-wrapper, .visi-misi, .section, .container-3, .card, .card-2, .visi-container, .misi-container, .visi-card, .misi-card, .section-title, .text-wrapper-5');
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                if (!el.dataset.animation) {
                    el.dataset.animation = 'fadeInUp';
                    el.dataset.delay = (index * 0.1).toString();
                }
                observer.observe(el);
            });

            // Observe header section
            const headerSection = document.querySelector('.div-wrapper, .from-humble-wrapper');
            if (headerSection) {
                headerSection.style.opacity = '0';
                headerSection.dataset.animation = 'fadeInDown';
                headerSection.dataset.delay = '0';
                observer.observe(headerSection);
            }

            // Parallax effect untuk image
            const imageSection = document.querySelector('.image-with-fallback-wrapper');
            if (imageSection) {
                window.addEventListener('scroll', () => {
                    const scrollPosition = window.pageYOffset;
                    const rect = imageSection.getBoundingClientRect();
                    
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const yTranslate = (scrollPosition - imageSection.offsetTop) * 0.3;
                        imageSection.style.transform = `translateY(${yTranslate}px)`;
                    }
                });
            }

            // Enhanced hover effect untuk cards dengan cursor tracking
            const cards = document.querySelectorAll('.card, .card-2');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    // Disable 3D effect pada mobile untuk performance
                    if (window.innerWidth < 768) return;
                    
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                });
            });

            // Icon animation on hover
            const icons = document.querySelectorAll('.icon-wrapper-visi, .icon-wrapper-misi');
            icons.forEach(icon => {
                icon.addEventListener('mouseenter', () => {
                    icon.style.animation = 'float 0.6s ease-in-out infinite';
                });

                icon.addEventListener('mouseleave', () => {
                    icon.style.animation = 'none';
                });
            });

            // Quote text reveal animation
            const quoteText = document.querySelector('.we-believe-that');
            if (quoteText) {
                const text = quoteText.textContent;
                quoteText.textContent = '';
                let index = 0;

                const typeWriter = () => {
                    if (index < text.length) {
                        quoteText.textContent += text.charAt(index);
                        index++;
                        setTimeout(typeWriter, 20);
                    }
                };

                // Trigger typewriter effect ketika quote visible
                const quoteObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && index === 0) {
                            typeWriter();
                            quoteObserver.unobserve(quoteText);
                        }
                    });
                }, { threshold: 0.5 });

                quoteObserver.observe(quoteText);
            }

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