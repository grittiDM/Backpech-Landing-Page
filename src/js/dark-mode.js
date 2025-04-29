// dark-mode.js
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.dark-mode-toggle');
  const html = document.documentElement;
  
  // Verificar preferência do sistema ou localStorage
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  // Aplicar tema salvo ou preferência do sistema
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
    document.body.style.backgroundColor = ''; // Reset para usar as cores do Tailwind
  } else {
    html.classList.remove('dark');
    document.body.style.backgroundColor = '';
  }
  
  // Botão toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      document.body.style.backgroundColor = ''; // Garantir que o Tailwind controle as cores
    });
  }

  // Ouvinte para mudanças de preferência do sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      document.body.style.backgroundColor = '';
    }
  });
});