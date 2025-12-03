// Produk page hover interactions (page-scoped)
document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
