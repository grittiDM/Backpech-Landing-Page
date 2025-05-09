function preloadImages(images) {
  images.forEach(src => {
    new Image().src = src;
  });
}

// Menu Mobile: Acessibilidade e controle de foco
function setupMobileMenu() {
  const openBtn = document.querySelector('button[aria-label="Abrir Menu Principal"], button span.sr-only:contains("Abrir Menu Principal")')?.parentElement;
  const menu = document.querySelector('div[role="dialog"].lg\\:hidden');
  const closeBtn = menu?.querySelector('button, [aria-label="Fechar Menu Principal"]');

  if (!openBtn || !menu || !closeBtn) return;

  // Inicialmente esconde o menu
  menu.setAttribute('aria-hidden', 'true');
  menu.hidden = true;

  openBtn.addEventListener('click', () => {
    menu.hidden = false;
    menu.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
    document.body.classList.add('overflow-hidden');
  });

  closeBtn.addEventListener('click', () => {
    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
    openBtn.focus();
    document.body.classList.remove('overflow-hidden');
  });

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (!menu.hidden && e.key === 'Escape') {
      menu.hidden = true;
      menu.setAttribute('aria-hidden', 'true');
      openBtn.focus();
      document.body.classList.remove('overflow-hidden');
    }
  });
}

// Animação de fade-in para elementos ao entrar na tela
function fadeInOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  let observedCount = elements.length;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
          observedCount--;
          if (observedCount === 0) {
            observer.disconnect();
          }
        });
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
      const rawHref = this.getAttribute('href');
      // Only allow simple IDs (alphanumeric, underscore, hyphen)
      const match = /^#([\w-]+)$/.exec(rawHref);
      if (match) {
        const safeSelector = `#${match[1]}`;
        const target = document.querySelector(safeSelector);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
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
      requestAnimationFrame(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.remove(), 600);
      });
    }, 3500);
    localStorage.setItem('bp-welcome', '1');
  }
}

// Atualização do ano no footer
function updateYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

// Inicialização centralizada
document.addEventListener('DOMContentLoaded', () => {
  preloadImages([
    '/images/logo/Backpech-P-L-NB.png',
    '/images/background.png',
    // Adicione outras imagens importantes aqui
  ]);
  fadeInOnScroll();
  smoothScroll();
  showWelcomeToast();
  updateYear();
  setupMobileMenuToggle();
});
