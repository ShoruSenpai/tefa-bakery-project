// Smooth scroll and animation effects
document.addEventListener('DOMContentLoaded', function () {
  // Add animation to elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 100px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections - simpler without testimonials
  const elements = document.querySelectorAll('.card, .container-4');
  elements.forEach((el) => observer.observe(el));

  // Counter animation for stats
  const counters = document.querySelectorAll('.text-wrapper-2');
  let hasAnimated = false;

  const animateCounters = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    counters.forEach((counter) => {
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
    const statsObserver = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          animateCounters();
          statsObserver.unobserve(statsSection);
        }
      },
      { threshold: 0.5 }
    );
    statsObserver.observe(statsSection);
  }

  // Ripple effect on buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
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
  cards.forEach((card) => {
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
      card.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
});

// corousel featured products

const slider = document.getElementById('slider');
let cards = document.querySelectorAll('.card');

let cardWidth = cards[0].offsetWidth + 20; // 20 = gap
let index = 3;
let isMoving = false;

// === Clone 3 di awal & 3 di akhir ===
function setupClones() {
  const first = [];
  const last = [];

  for (let i = 0; i < 3; i++) {
    first.push(cards[i].cloneNode(true));
    last.push(cards[cards.length - 1 - i].cloneNode(true));
  }

  last.reverse().forEach((n) => slider.prepend(n));
  first.forEach((n) => slider.append(n));
}

setupClones();
cards = document.querySelectorAll('.card');

slider.style.transform = `translateX(${-index * cardWidth}px)`;

// === NEXT ===
function next() {
  if (isMoving) return;
  isMoving = true;

  index++;
  slider.style.transition = '0.8s ease';
  slider.style.transform = `translateX(${-index * cardWidth}px)`;
}

// === PREV ===
function prev() {
  if (isMoving) return;
  isMoving = true;

  index--;
  slider.style.transition = '.8s ease';
  slider.style.transform = `translateX(${-index * cardWidth}px)`;
}

// === LOOPING TANPA DELAY ===
slider.addEventListener('transitionend', () => {
  if (index >= cards.length - 3) {
    slider.style.transition = 'none';
    index = 3;
    slider.style.transform = `translateX(${-index * cardWidth}px)`;
  }

  if (index <= 2) {
    slider.style.transition = 'none';
    index = cards.length - 4;
    slider.style.transform = `translateX(${-index * cardWidth}px)`;
  }

  isMoving = false;
});

// Tombol
document.getElementById('nextBtn').onclick = next;
document.getElementById('prevBtn').onclick = prev;

// Auto slide
setInterval(next, 3000);
