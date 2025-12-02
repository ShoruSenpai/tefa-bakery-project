// Produk page animations and hover interactions (page-scoped)
document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // IntersectionObserver to add page-scoped animation classes
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // If the whole product grid becomes visible, stagger its child cards
            if (entry.target.matches('.our-product .container-5')) {
                const childCards = entry.target.querySelectorAll('.card, .card-2, .card-3, .card-4, .card-5, .card-6, .card-7, .card-8');
                childCards.forEach((c, i) => setTimeout(() => {
                    c.classList.add('animate-on-scroll', 'prod-in-view');
                }, i * 80));
            } else {
                entry.target.classList.add('animate-on-scroll', 'prod-in-view');
            }

            obs.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    // Targets to animate on scroll (scoped to .our-product)
    const selectors = [
        '.our-product .text-wrapper-2',
        '.our-product .from-humble',
        '.our-product .container-4',
        '.our-product .container-5',
        '.our-product .container-20',
        '.our-product .container-19 .button-5',
        '.our-product .button-8'
    ];

    const targets = document.querySelectorAll(selectors.join(','));
    // If user prefers reduced motion, add classes without animations but still allow layout
    if (prefersReducedMotion) {
        targets.forEach(t => {
            t.classList.add('animate-on-scroll', 'prod-in-view');
        });
    } else {
        targets.forEach(t => observer.observe(t));
    }

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
