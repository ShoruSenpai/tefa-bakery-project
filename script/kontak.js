// Contact page animations and interactions
        document.addEventListener('DOMContentLoaded', function() {
            // Intersection Observer untuk animasi scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px 50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe contact cards dan form
            const infoCards = document.querySelectorAll('.info-card');
            infoCards.forEach(card => observer.observe(card));

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