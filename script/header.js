// Global header navigation behavior (used on all pages)
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#primary-nav');
  const responsiveLogos = document.querySelectorAll('img[data-mobile-src][data-desktop-src]');

  if (!navToggle || !navMenu) return;

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  navToggle.addEventListener('click', toggleMenu);

  // Close menu when a nav link is clicked on mobile
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Reset state on resize back to desktop
  const handleResize = () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }

    // Ganti logo untuk mobile / desktop sesuai lebar layar
    const isMobile = window.innerWidth <= 768;
    responsiveLogos.forEach(img => {
      const desktopSrc = img.getAttribute('data-desktop-src');
      const mobileSrc = img.getAttribute('data-mobile-src');
      if (isMobile && mobileSrc && img.src !== mobileSrc) {
        img.src = mobileSrc;
      } else if (!isMobile && desktopSrc && img.src !== desktopSrc) {
        img.src = desktopSrc;
      }
    });
  };

  // Inisialisasi logo saat pertama kali load
  if (responsiveLogos.length > 0) {
    handleResize();
  }

  window.addEventListener('resize', handleResize);
});



