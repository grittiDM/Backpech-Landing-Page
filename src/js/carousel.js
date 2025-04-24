// src/js/carousel.js
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const prevBtn = carousel.parentElement.querySelector('.carousel-prev');
        const nextBtn = carousel.parentElement.querySelector('.carousel-next');

        let currentIndex = 1; // Começa com o slide central em foco

        // Inicializa o carrossel
        const initCarousel = () => {
            updateCarousel();
            setSlideFocus();
        };

        // Atualiza a posição do track
        const updateCarousel = () => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        // Define qual slide está em foco
        const setSlideFocus = () => {
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.classList.add('focused');
                } else {
                    slide.classList.remove('focused');
                }
            });
        };

        // Navega para o slide anterior
        const goToPrev = () => {
            if (currentIndex <= 0) {
                currentIndex = slides.length - 1;
            } else {
                currentIndex--;
            }
            updateCarousel();
            setSlideFocus();
        };

        // Navega para o próximo slide
        const goToNext = () => {
            if (currentIndex >= slides.length - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateCarousel();
            setSlideFocus();
        };

        // Event listeners
        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);

        // Inicializa
        initCarousel();

        // Redimensionamento da janela
        window.addEventListener('resize', () => {
            updateCarousel();
        });
    });
});