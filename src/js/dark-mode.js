const toggle = document.querySelector('.dark-mode-toggle');
const html = document.documentElement;

toggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// Verificar preferência ao carregar
if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark');
}