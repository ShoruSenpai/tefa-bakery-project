// Produk page hover interactions (page-scoped)
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

    // Scroll animations with direction detection
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
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
                scrollObserver.unobserve(element);
            } else if (entry.isIntersecting && prefersReducedMotion) {
                entry.target.style.opacity = '1';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe product section header
    const productHeader = document.querySelector('.our-product .text-wrapper-2, .our-product .from-humble');
    if (productHeader) {
        productHeader.style.opacity = '0';
        productHeader.dataset.animation = 'fadeInDown';
        productHeader.dataset.delay = '0';
        scrollObserver.observe(productHeader);
    }

    // Observe filter buttons
    const filterButtons = document.querySelectorAll('.our-product .btn-filter');
    filterButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.dataset.animation = 'scaleIn';
        btn.dataset.delay = (index * 0.1).toString();
        scrollObserver.observe(btn);
    });

    // Add simple 3D tilt on hover for larger screens, guard to avoid duplicate handlers
    const cards = document.querySelectorAll('.our-product .card, .our-product .card-2, .our-product .card-3, .our-product .card-4, .our-product .card-5, .our-product .card-6, .our-product .card-7, .our-product .card-8');
    cards.forEach(card => {
        if (card.dataset.tiltAttached === 'true') return;
        card.dataset.tiltAttached = 'true';

        // Desktop mouse-based tilt
        card.addEventListener('mousemove', (e) => {
            if (prefersReducedMotion || window.innerWidth < 768) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * 3; // slightly reduced intensity
            const rotateY = ((x - cx) / cx) * -3;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });

        // (touch interactions omitted - hover restored to original CSS behavior)
    });

    // debounce resize to avoid spamming layout
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // If reduced motion changed or layout changed, we could re-check behavior
        }, 150);
    });
    
    // Observe product cards for scroll animation
    cards.forEach((card, index) => {
        if (!card.dataset.animation) {
            card.style.opacity = '0';
            card.dataset.animation = 'fadeInUp';
            card.dataset.delay = (index * 0.05).toString();
            scrollObserver.observe(card);
        }
    });

    // Click handler for product cards (mobile - no button)
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on button (desktop)
            if (e.target.closest('.button-4')) {
                return;
            }
            // Handle preview action
            const previewBtn = this.querySelector('.button-4');
            if (previewBtn && window.innerWidth <= 768) {
                // On mobile, trigger preview action
                previewBtn.click();
            }
        });
    });
});
