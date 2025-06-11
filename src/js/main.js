function preloadImages(images) {
  images.forEach(src => {
    new Image().src = src;
  });
}

// Menu Mobile: Acessibilidade e controle de foco
function setupMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (!openBtn || !menu || !closeBtn) {
    console.warn("Mobile menu elements (toggle, menu, or close button) not found. Skipping setup.");
    return;
  }

  menu.setAttribute('aria-hidden', 'true');
  menu.hidden = true;
  openBtn.setAttribute('aria-expanded', 'false');

  openBtn.addEventListener('click', () => {
    menu.hidden = false;
    menu.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
    document.body.classList.add('overflow-hidden'); // Prevent scrolling when menu is open
  });

  const closeMenuAction = () => {
    if (menu.hidden) return; // Avoid running if already closed
    menu.hidden = true;
    menu.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    // Return focus to the toggle button only if it's visible and focusable
    // This check is important if the button itself could be hidden by other means
    if (openBtn && typeof openBtn.focus === 'function') {
        openBtn.focus();
    }
    document.body.classList.remove('overflow-hidden');
  };

  closeBtn.addEventListener('click', closeMenuAction);
  document.addEventListener('keydown', (e) => {
    if (!menu.hidden && e.key === 'Escape') {
      closeMenuAction();
    }
  });
}

// Animação de fade-in para elementos ao entrar na tela
function fadeInOnScroll() {
  const elements = document.querySelectorAll('[data-animate-fade-in]'); // Use a data attribute
  let observedCount = elements.length;
  if (observedCount === 0) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add('is-visible'); // Add a class to trigger CSS animation
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
    // Initial states should ideally be in CSS for elements with [data-animate-fade-in]
    // el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    observer.observe(el);
  });
}

// Scroll suave para âncoras internas
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const rawHref = this.getAttribute('href');
      const match = /^#([\\w-]+)$/.exec(rawHref); // Allow simple IDs
      if (match) {
        const safeSelector = `#${CSS.escape(match[1])}`; // Use CSS.escape for safety
        try {
          const target = document.querySelector(safeSelector);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (error) {
          console.error("Error finding element for smooth scroll:", safeSelector, error);
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
    // Applying Tailwind classes for styling and initial animation state
    toast.className = 'fixed bottom-6 right-6 bg-bp-orange text-bp-white px-4 py-2 rounded-lg shadow-lg z-50 opacity-0 translate-y-8 transition-all duration-700 ease-out';
    document.body.appendChild(toast);

    // Force reflow to ensure the initial state is registered before transitioning
    void toast.offsetWidth;

    requestAnimationFrame(() => {
      // Transition to visible state
      toast.classList.remove('opacity-0', 'translate-y-8');
      toast.classList.add('opacity-100', 'translate-y-0');
    });

    setTimeout(() => {
      requestAnimationFrame(() => {
        // Transition to hidden state
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-8');
        setTimeout(() => toast.remove(), 700); // Remove after fade-out transition
      });
    }, 3500); // Toast visible for 3.5 seconds
    localStorage.setItem('bp-welcome', '1');
  }
}

// Atualização do ano no footer
function updateYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan && typeof yearSpan.textContent !== 'undefined') {
    yearSpan.textContent = new Date().getFullYear().toString();
  }
}

// Inicialização centralizada
document.addEventListener('DOMContentLoaded', () => {
  preloadImages([
    // Adicione aqui caminhos para imagens CRÍTICAS que devem ser carregadas imediatamente
    // Ex: '/images/logo/BP-P-NB.png', (Lembre-se de usar caminhos relativos à pasta public)
    // '/images/hero-banner.jpg',
  ]);
  setupMobileMenu();
  fadeInOnScroll();
  smoothScroll();
  showWelcomeToast();
  updateYear();
});