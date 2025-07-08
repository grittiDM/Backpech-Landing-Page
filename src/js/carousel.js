document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    // Se não houver track, não é um carrossel válido, então pulamos.
    if (!track) return;

    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let currentIndex = 0;
    let autoPlayInterval = null;

    // Se não houver slides, não há nada a fazer.
    if (slides.length === 0) return;

    // --- Criação dos Indicadores (Dots) ---
    let dotsContainer = carousel.querySelector('.carousel-dots');
    if (!dotsContainer) {
      dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots flex justify-center gap-2 mt-4';
      // Insere os dots depois do wrapper do track, para melhor estrutura
      track.parentElement.insertAdjacentElement('afterend', dotsContainer);
    }
    dotsContainer.innerHTML = ''; // Limpa dots existentes
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = 'w-3 h-3 rounded-full bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-bp-gray-800 focus:ring-bp-blue transition-colors';
      dot.setAttribute('aria-label', `Ir para slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    // --- Funções Principais ---

    // Atualiza a posição do track e o estado dos dots/slides
    const updateCarousel = () => {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      // Atualiza os dots
      dotsContainer.childNodes.forEach((dot, idx) => {
        dot.classList.toggle('bg-primary', idx === currentIndex);
        dot.classList.toggle('bg-gray-400', idx !== currentIndex);
      });

      // Atualiza acessibilidade dos slides
      slides.forEach((slide, idx) => {
        slide.setAttribute('aria-hidden', idx !== currentIndex);
        slide.setAttribute('tabindex', idx === currentIndex ? '0' : '-1');
      });
    };

    // Navega para um slide específico
    const goToSlide = (idx, isResize = false) => {
      // Para o autoplay ao navegar manualmente
      if (!isResize) stopAutoplay();
      
      // Lógica de loop
      if (idx < 0) {
        currentIndex = slides.length - 1;
      } else if (idx >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = idx;
      }
      
      updateCarousel();

      // Reinicia o autoplay se não for um redimensionamento
      if (!isResize) startAutoplay();
    };

    // --- Event Listeners ---

    // Botões de Navegação
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Swipe para mobile
    let startX = 0;
    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      stopAutoplay(); // Pausa ao tocar
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (endX < startX - 50) { // Swipe para a esquerda
        goToSlide(currentIndex + 1);
      } else if (endX > startX + 50) { // Swipe para a direita
        goToSlide(currentIndex - 1);
      } else {
        startAutoplay(); // Reinicia se não houve swipe suficiente
      }
    });

    // Autoplay com pausa ao passar o mouse
    function startAutoplay() {
      // Limpa qualquer intervalo anterior para evitar múltiplos timers
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


    // Navegação por Teclado (Acessibilidade)
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

    // Recalcular ao redimensionar a janela
    window.addEventListener('resize', () => goToSlide(currentIndex, true));

    // --- Inicialização ---
    goToSlide(0, true); // Inicializa na posição correta
    startAutoplay();
  });
});