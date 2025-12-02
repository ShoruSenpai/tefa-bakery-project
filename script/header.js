// Global header navigation behavior (used on all pages)
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('#primary-nav');

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
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Mobile logo switching functionality
  const polijeLogo = document.querySelector('.polije-logo-svg');
  const tefaLogo = document.querySelector('.tefa-logo-svg');

  if (polijeLogo && tefaLogo) {
    // Store original image sources
    const originalPolijeSrc = polijeLogo.getAttribute('src');
    const originalTefaSrc = tefaLogo.getAttribute('src');
    
    // Determine path prefix based on current image src (more reliable)
    const getPathPrefix = () => {
      // Check if current src uses '../' prefix (indicates we're in pages directory)
      if (originalPolijeSrc && originalPolijeSrc.startsWith('../')) {
        return '../';
      }
      return '';
    };

    const pathPrefix = getPathPrefix();
    const mobilePolijePath = pathPrefix + 'assets/faviconPolije.png';
    const mobileTefaPath = pathPrefix + 'assets/favicon.ico';

    const updateLogosForMobile = () => {
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // Switch to mobile logos
        polijeLogo.setAttribute('src', mobilePolijePath);
        tefaLogo.setAttribute('src', mobileTefaPath);
      } else {
        // Restore original logos
        polijeLogo.setAttribute('src', originalPolijeSrc);
        tefaLogo.setAttribute('src', originalTefaSrc);
      }
    };

    // Update logos on load
    updateLogosForMobile();

    // Update logos on resize
    window.addEventListener('resize', updateLogosForMobile);
  }

  // Set active navigation menu item based on current page
  const setActiveNavItem = () => {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || '';
    
    // Remove active class from all menu items first
    navMenu.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');
      link.parentElement.classList.remove('active');
    });

    // Check each navigation link to see if it matches the current page
    navMenu.querySelectorAll('a').forEach(link => {
      const linkHref = link.getAttribute('href');
      if (!linkHref) return;
      
      // Normalize the href (remove ../ and ./)
      const normalizedHref = linkHref.replace(/^\.\.\//, '').replace(/^\.\//, '');
      const linkPage = normalizedHref.split('/').pop() || normalizedHref;
      
      // Check if current page matches this link
      let isActive = false;
      
      // Case 1: Exact match
      if (currentPage === linkPage) {
        isActive = true;
      }
      // Case 2: Both are index.html or empty (Beranda)
      else if ((currentPage === '' || currentPage === 'index.html') && 
               (linkPage === '' || linkPage === 'index.html')) {
        isActive = true;
      }
      // Case 3: Current path ends with the link page
      else if (currentPath.endsWith(linkPage) || currentPath.endsWith(linkPage + '/')) {
        isActive = true;
      }
      
      if (isActive) {
        link.classList.add('active');
        link.parentElement.classList.add('active');
      }
    });
  };

  // Set active menu on page load
  setActiveNavItem();
});



