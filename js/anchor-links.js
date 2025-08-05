document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os links <a> cujo href começa com '#'
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // 1. Previne o comportamento padrão do link (que causa o redirecionamento)
      e.preventDefault();

      // 2. Pega o ID do alvo a partir do atributo href (ex: '#servicos-padrao')
      const targetId = this.getAttribute('href');
      
      // 3. Encontra o elemento alvo na página usando o ID
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // 4. Rola a página suavemente até o elemento alvo
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // Alinha o topo do elemento com o topo da viewport
        });
      }
    });
  });
});