document.addEventListener('DOMContentLoaded', () => {
  // Splash Screen (se necessário)
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
  const images = [
    '/images/logo/Backpech-P-L-NB.png',
    // Adicione outras imagens importantes aqui
  ];

  images.forEach(src => {
    new Image().src = src;
  });
});

// Redimensionamento
window.addEventListener('resize', () => {
  // Lógica de redimensionamento será tratada no carousel.js
});