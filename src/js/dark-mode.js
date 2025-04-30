/**
 * dark-mode.js - dark mode persistente, detecção automática e transição suave
 */

function setDarkMode(enabled) {
  document.documentElement.classList.toggle('dark', enabled);
  localStorage.setItem('bp-darkmode', enabled ? '1' : '0');
  // Atualiza ícones
  document.getElementById('icon-moon')?.classList.toggle('hidden', enabled);
  document.getElementById('icon-sun')?.classList.toggle('hidden', !enabled);
  // Feedback divertido
  const toast = document.createElement('div');
  toast.textContent = enabled ? '🌙 Boa noite!' : '☀️ Bom dia!';
  toast.className = 'fixed top-6 right-6 bg-secondary text-white px-4 py-2 rounded-lg shadow-lg z-50 fade-in';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 600);
  }, 1200);
}

// Detecta preferência do sistema
function detectSystemDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

document.addEventListener('DOMContentLoaded', () => {
  // Transição suave
  document.documentElement.classList.add('transition-colors', 'duration-300');

  // Estado inicial
  let enabled = localStorage.getItem('bp-darkmode');
  if (enabled === null) {
    enabled = detectSystemDarkMode();
  } else {
    enabled = enabled === '1';
  }
  setDarkMode(enabled);

  // Botão de alternância
  const toggle = document.getElementById('dark-mode-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      setDarkMode(!document.documentElement.classList.contains('dark'));
    });
  }
});