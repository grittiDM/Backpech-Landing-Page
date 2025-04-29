document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevBtn = carousel.parentElement.querySelector('.carousel-prev');
        const nextBtn = carousel.parentElement.querySelector('.carousel-next');

        let currentIndex = 0;
        let slidesToShow = 1;
        let slideWidth = 0;

        function updateSlidesToShow() {
            const width = window.innerWidth;
            if (width >= 1024) { // lg breakpoint
                slidesToShow = 3;
            } else if (width >= 768) { // md breakpoint
                slidesToShow = 2;
            } else { // sm breakpoint
                slidesToShow = 1;
            }
            slideWidth = track.offsetWidth / slidesToShow;
        }

        function updateCarousel() {
            updateSlidesToShow();
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

            // Atualiza classes de foco
            slides.forEach((slide, index) => {
                const isFocused = index >= currentIndex && index < currentIndex + slidesToShow;
                slide.classList.toggle('focused', isFocused);
                slide.classList.toggle('opacity-80', !isFocused);
            });
        }

        function goToPrev() {
            currentIndex = Math.max(0, currentIndex - slidesToShow);
            updateCarousel();
        }

        function goToNext() {
            currentIndex = Math.min(slides.length - slidesToShow, currentIndex + slidesToShow);
            updateCarousel();
        }

        // Event listeners
        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);

        // Inicialização
        updateCarousel();

        // Redimensionamento responsivo
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCarousel();
            }, 250);
        });
    });
});