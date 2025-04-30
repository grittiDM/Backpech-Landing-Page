// Pré-carregar imagens importantes
function preloadImages() {
  const images = [
    '/images/logo/Backpech-P-L-NB.png',
    '/images/background.png',
    // Adicione outras imagens importantes aqui
  ];
  images.forEach(src => {
    new Image().src = src;
  });
}

// Animação de fade-in para elementos ao entrar na tela
function fadeInOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    observer.observe(el);
  });
}

// Scroll suave para âncoras internas
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Toast de boas-vindas para novos visitantes
function showWelcomeToast() {
  if (!localStorage.getItem('bp-welcome')) {
    const toast = document.createElement('div');
    toast.textContent = '👋 Bem-vindo à Backpech!';
    toast.className = 'fixed bottom-6 right-6 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 fade-in';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => toast.remove(), 600);
    }, 3500);
    localStorage.setItem('bp-welcome', '1');
  }
}

// Atualização do ano no footer
function updateYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  preloadImages();
  fadeInOnScroll();
  smoothScroll();
  showWelcomeToast();
  updateYear();
});