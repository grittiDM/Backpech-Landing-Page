document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
  
    carousels.forEach(carousel => {
      const track = carousel.querySelector('.carousel-track');
      const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
      const prevBtn = carousel.parentElement.querySelector('.carousel-prev');
      const nextBtn = carousel.parentElement.querySelector('.carousel-next');
      let currentIndex = 0;
      let autoPlayInterval = null;
  
      // Criar indicadores (dots)
      let dotsContainer = carousel.querySelector('.carousel-dots');
      if (!dotsContainer) {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots flex justify-center gap-2 mt-2';
        carousel.appendChild(dotsContainer);
      }
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'w-3 h-3 rounded-full bg-gray-400 focus:outline-none';
        dot.setAttribute('aria-label', `Ir para slide ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
      });
  
      // Atualiza a posição do track
      const updateCarousel = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        dotsContainer.childNodes.forEach((dot, idx) => {
          dot.classList.toggle('bg-primary', idx === currentIndex);
          dot.classList.toggle('bg-gray-400', idx !== currentIndex);
        });
        setSlideFocus();
      };
  
      // Define qual slide está em foco (acessibilidade)
      const setSlideFocus = () => {
        slides.forEach((slide, idx) => {
          slide.setAttribute('tabindex', idx === currentIndex ? '0' : '-1');
          slide.setAttribute('aria-hidden', idx !== currentIndex);
        });
      };
  
      // Navegação
      const goToSlide = idx => {
        currentIndex = (idx + slides.length) % slides.length;
        updateCarousel();
      };
  
      prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
      nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  
      // Swipe para mobile
      let startX = 0;
      track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
      });
      track.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        if (endX < startX - 30) goToSlide(currentIndex + 1);
        if (endX > startX + 30) goToSlide(currentIndex - 1);
      });
  
      // Autoplay com pausa ao hover
      function startAutoplay() {
        autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
      }
      function stopAutoplay() {
        clearInterval(autoPlayInterval);
      }
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
  
      // Teclado (acessibilidade)
      carousel.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
        if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
      });
  
      // Inicializa
      updateCarousel();
      setSlideFocus();
      startAutoplay();
    });
  });