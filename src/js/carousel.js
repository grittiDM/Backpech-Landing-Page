document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    // CORREÇÃO: Adiciona a declaração da variável 'controlsContainer'
    const controlsContainer = carousel.querySelector('.carousel-controls');
    let currentIndex = 0;
    let autoPlayInterval = null;

    if (slides.length === 0) return;

    // --- Criação dos Indicadores (Dots) ---
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots flex justify-center items-center gap-2';

    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = 'w-3 h-3 rounded-full bg-bp-gray400 dark:bg-bp-gray600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-bp-gray-800 focus:ring-bp-blue transition-colors';
      dot.setAttribute('aria-label', `Ir para slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    // Insere os dots dentro do container de controles, entre os botões
    if (controlsContainer && prevBtn) {
      prevBtn.insertAdjacentElement('afterend', dotsContainer);
    } else {
      // Fallback caso a estrutura antiga ainda seja usada em algum lugar
      track.parentElement.insertAdjacentElement('afterend', dotsContainer);
    }

    // --- Funções Principais ---

    const updateCarousel = () => {
      // Garante que o slide[0] existe antes de tentar ler sua largura
      if (slides.length === 0 || !slides[0]) return;
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      // Lógica de atualização dos dots melhorada
      if (dotsContainer) {
        dotsContainer.childNodes.forEach((dot, idx) => {
          // Remove todas as classes de cor de estado
          dot.classList.remove('bg-bp-gray800', 'dark:bg-bp-gray100', 'bg-bp-gray400', 'dark:bg-bp-gray600');

          if (idx === currentIndex) {
            // Adiciona classes de dot ativo
            dot.classList.add('bg-bp-gray800', 'dark:bg-bp-gray100');
            dot.setAttribute('aria-current', 'true');
          } else {
            // Adiciona classes de dot inativo
            dot.classList.add('bg-bp-gray400', 'dark:bg-bp-gray600');
            dot.removeAttribute('aria-current');
          }
        });
      }

      // Atualiza acessibilidade dos slides
      slides.forEach((slide, idx) => {
        slide.setAttribute('aria-hidden', idx !== currentIndex);
        slide.setAttribute('tabindex', idx === currentIndex ? '0' : '-1');
      });
    };

    const goToSlide = (idx, isResize = false) => {
      if (!isResize) stopAutoplay();
      
      if (idx < 0) {
        currentIndex = slides.length - 1;
      } else if (idx >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = idx;
      }
      
      updateCarousel();

      if (!isResize) startAutoplay();
    };

    // --- Event Listeners ---

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    let startX = 0;
    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (endX < startX - 50) {
        goToSlide(currentIndex + 1);
      } else if (endX > startX + 50) {
        goToSlide(currentIndex - 1);
      } else {
        startAutoplay();
      }
    });

    function startAutoplay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    }
    function stopAutoplay() {
      clearInterval(autoPlayInterval);
    }
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      }
    });

    window.addEventListener('resize', () => goToSlide(currentIndex, true));

    // --- Inicialização ---
    goToSlide(0, true);
    startAutoplay();
  });
});