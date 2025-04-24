document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.dark-mode-toggle');
  const html = document.documentElement;
  
  // Verificar preferência do sistema ou localStorage
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
  }
  
  // Botão toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
  }
});
