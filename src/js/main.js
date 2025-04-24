import './carousel.js';

// Função para pré-carregar imagens
function preloadImages() {
    const images = [
      '/images/logo/Backpech-P-L-NB.png',
      // Adicione outras imagens importantes aqui
    ];
    
    images.forEach(src => {
      new Image().src = src;
    });
  }
  
  // Inicialização quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
          splashScreen.style.display = 'none';
        }, 500);
      }, 2000);
    }
  
    // Pré-carregar imagens
    preloadImages();
  });
  
  // Handler para redimensionamento
  window.addEventListener('resize', () => {
    // Adicione aqui qualquer lógica de redimensionamento necessária
  });