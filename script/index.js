  // Smooth scroll and animation effects
  document.addEventListener('DOMContentLoaded', function() {
      // Featured Products Slider
      const slider = document.getElementById('slider');
      if (slider) {
          let cards = document.querySelectorAll('.slider .product-card');
          if (cards.length > 0) {
              // Get gap from computed style
              const sliderStyle = window.getComputedStyle(slider);
              const gap = parseInt(sliderStyle.gap) || 24;

              let cardWidth = 0;
              let index = 3;
              let isMoving = false;

              function calculateCardWidth() {
                  cards = document.querySelectorAll('.slider .product-card');
                  if (cards.length > 0 && cards[0].offsetWidth > 0) {
                      cardWidth = cards[0].offsetWidth + gap;
                  }
              }

              // Clone 3 di awal & 3 di akhir
              function setupClones() {
                  const first = [];
                  const last = [];
                  const originalCards = document.querySelectorAll('.slider .product-card');

                  for (let i = 0; i < 3; i++) {
                      if (originalCards[i]) first.push(originalCards[i].cloneNode(true));
                      if (originalCards[originalCards.length - 1 - i]) last.push(originalCards[originalCards.length - 1 - i].cloneNode(true));
                  }

                  last.reverse().forEach((n) => slider.prepend(n));
                  first.forEach((n) => slider.append(n));

                  cards = document.querySelectorAll('.slider .product-card');
                  calculateCardWidth();
                  slider.style.transform = `translateX(${-index * cardWidth}px)`;
              }

              setupClones();

              // Update card width on resize
              function updateCardWidth() {
                  calculateCardWidth();
                  if (cardWidth > 0) {
                      slider.style.transform = `translateX(${-index * cardWidth}px)`;
                  }
              }

              // Wait for images to load before calculating
              window.addEventListener('load', () => {
                  setTimeout(() => {
                      calculateCardWidth();
                      if (cardWidth > 0) {
                          slider.style.transform = `translateX(${-index * cardWidth}px)`;
                      }
                  }, 200);
              });

              // Debounce resize for better performance
              let resizeTimeout;
              window.addEventListener('resize', () => {
                  clearTimeout(resizeTimeout);
                  resizeTimeout = setTimeout(() => {
                      calculateCardWidth();
                      if (cardWidth > 0) {
                          slider.style.transform = `translateX(${-index * cardWidth}px)`;
                      }
                  }, 150);
              });

              // NEXT
              function next() {
                  if (isMoving) return;
                  isMoving = true;
                  index++;
                  slider.style.transition = '0.8s ease';
                  slider.style.transform = `translateX(${-index * cardWidth}px)`;
              }

              // PREV
              function prev() {
                  if (isMoving) return;
                  isMoving = true;
                  index--;
                  slider.style.transition = '0.8s ease';
                  slider.style.transform = `translateX(${-index * cardWidth}px)`;
              }

              // LOOPING TANPA DELAY - Improved infinite loop
              slider.addEventListener('transitionend', () => {
                  if (index >= cards.length - 3) {
                      slider.style.transition = 'none';
                      index = 3;
                      slider.style.transform = `translateX(${-index * cardWidth}px)`;
                      // Force reflow to ensure transition reset
                      void slider.offsetWidth;
                  }
                  if (index <= 2) {
                      slider.style.transition = 'none';
                      index = cards.length - 4;
                      slider.style.transform = `translateX(${-index * cardWidth}px)`;
                      // Force reflow to ensure transition reset
                      void slider.offsetWidth;
                  }
                  isMoving = false;
              });

              // Tombol
              const nextBtn = document.getElementById('nextBtn');
              const prevBtn = document.getElementById('prevBtn');
              if (nextBtn) nextBtn.onclick = next;
              if (prevBtn) prevBtn.onclick = prev;

              // Auto slide dengan infinite loop
              let autoSlideInterval = setInterval(() => {
                  if (!isMoving) {
                      next();
                  }
              }, 3000);

              // Pause auto slide on hover
              const sliderContainer = slider.closest('.slider-container');
              if (sliderContainer) {
                  sliderContainer.addEventListener('mouseenter', () => {
                      clearInterval(autoSlideInterval);
                  });
                  sliderContainer.addEventListener('mouseleave', () => {
                      autoSlideInterval = setInterval(() => {
                          if (!isMoving) {
                              next();
                          }
                      }, 3000);
                  });
              }

              // Click handler for product cards (mobile - no button)
              const productCards = document.querySelectorAll('.slider .product-card');
              productCards.forEach(card => {
                  card.addEventListener('click', function(e) {
                      // Don't trigger if clicking on button (desktop)
                      if (e.target.closest('.product-card__btn')) {
                          return;
                      }
                      // Handle preview action
                      const previewBtn = this.querySelector('.product-card__btn');
                      if (previewBtn) {
                          previewBtn.click();
                      }
                  });
              });
          }
      }
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


      // Observe all cards and sections - exclude product cards in slider (they have their own animations)
      const elements = document.querySelectorAll('.card:not(.slider .product-card), .container-4');
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

      // Mouse move effect for other cards (not slider cards)
      // Product cards in slider already have CSS hover effects
      const otherCards = document.querySelectorAll('.card:not(.slider .product-card)');
      otherCards.forEach(card => {
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

  });