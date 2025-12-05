// Contact page animations and interactions
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

            // Observe contact cards dan form
            const infoCards = document.querySelectorAll('.info-card');
            const contactForm = document.querySelector('.contact-form-card');
            
            infoCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.dataset.animation = 'fadeInUp';
                card.dataset.delay = (index * 0.1).toString();
                observer.observe(card);
            });

            if (contactForm) {
                contactForm.style.opacity = '0';
                contactForm.dataset.animation = 'slideInRight';
                contactForm.dataset.delay = '0.3';
                observer.observe(contactForm);
            }

            // Note: icon hover scaling removed per design (no icon hover on contact cards)

            // Form input animations
            const formInputs = document.querySelectorAll('.form-row input, .form-row textarea, .form-group input');
            
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'scale(1.01)';
                });

                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'scale(1)';
                });

                input.addEventListener('input', function() {
                    // Add visual feedback on input
                    this.style.borderColor = '#c68a44';
                });
            });

            // Submit button: simple pressed feedback (ripple removed)
            const submitBtn = document.querySelector('.contact-form-card .btn');
            if (submitBtn) {
                submitBtn.addEventListener('click', function(e) {
                    // Add a short 'pressed' class for tactile feedback instead of ripple
                    this.classList.add('pressed');
                    setTimeout(() => this.classList.remove('pressed'), 150);
                });
            }

            // Form validation animation
            const form = document.querySelector('.contact-form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Validate form
                    const inputs = this.querySelectorAll('input[required], textarea[required]');
                    let isValid = true;

                    inputs.forEach(input => {
                        if (!input.value) {
                            input.style.borderColor = '#ff6b6b';
                            input.style.animation = 'shake 0.4s ease-in-out';
                            isValid = false;
                            
                            setTimeout(() => {
                                input.style.animation = 'none';
                            }, 400);
                        } else {
                            input.style.borderColor = '#c68a44';
                        }
                    });

                    if (isValid) {
                        // Show success message
                        const btn = this.querySelector('button');
                        const originalText = btn.innerHTML;
                        btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Pesan Terkirim!';
                        btn.style.backgroundColor = '#10b981';
                        
                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.backgroundColor = '';
                            form.reset();
                        }, 2000);
                    }
                });
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

        // Add ripple animation keyframes if not in CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
        `;
        document.head.appendChild(style);