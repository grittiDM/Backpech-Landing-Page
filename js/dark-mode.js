// Variável para controlar logs de debug, pode ser setada para false em produção
const DEBUG_MODE = true; // Mude para false em produção

function log(...args) {
  if (DEBUG_MODE) {
    console.log(...args);
  }
}

log('dark-mode.js loaded');

const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Mobile theme toggle elements
const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

// CSS classes for highlighting icons (ensure these are defined in your CSS from input.css)
const activeClass = 'theme-icon-active';
const inactiveClass = 'theme-icon-inactive';

log('Desktop Elements:', { themeToggleBtn, themeToggleDarkIcon, themeToggleLightIcon });
log('Mobile Elements:', { themeToggleBtnMobile, themeToggleDarkIconMobile, themeToggleLightIconMobile });

// Verifica a existência dos ícones uma vez
if (!themeToggleLightIcon) {
  console.warn('Light theme icon (#theme-toggle-light-icon) not found. Icon styles may not apply.');
}
if (!themeToggleDarkIcon) {
  console.warn('Dark theme icon (#theme-toggle-dark-icon) not found. Icon styles may not apply.');
}
if (!themeToggleLightIconMobile) {
  console.warn('Mobile Light theme icon (#theme-toggle-light-icon-mobile) not found. Icon styles may not apply.');
}
if (!themeToggleDarkIconMobile) {
  console.warn('Mobile Dark theme icon (#theme-toggle-dark-icon-mobile) not found. Icon styles may not apply.');
}

// Function to apply the current theme and update icon styles
function applyTheme(isDark) {
  log(`Applying theme: ${isDark ? 'dark' : 'light'}`);
  document.documentElement.classList.toggle('dark', isDark);

  if (themeToggleLightIcon) {
    themeToggleLightIcon.classList.toggle(activeClass, !isDark); // Active if not dark
    themeToggleLightIcon.classList.toggle(inactiveClass, isDark); // Inactive if dark
    log(`Desktop Light icon set to: ${!isDark ? 'active' : 'inactive'}`);
  }
  if (themeToggleDarkIcon) {
    themeToggleDarkIcon.classList.toggle(activeClass, isDark);    // Active if dark
    themeToggleDarkIcon.classList.toggle(inactiveClass, !isDark); // Inactive if not dark
    log(`Desktop Dark icon set to: ${isDark ? 'active' : 'inactive'}`);
  }

  // Apply to mobile icons
  if (themeToggleLightIconMobile) {
    themeToggleLightIconMobile.classList.toggle(activeClass, !isDark);
    themeToggleLightIconMobile.classList.toggle(inactiveClass, isDark);
    log(`Mobile Light icon set to: ${!isDark ? 'active' : 'inactive'}`);
  }
  if (themeToggleDarkIconMobile) {
    themeToggleDarkIconMobile.classList.toggle(activeClass, isDark);
    themeToggleDarkIconMobile.classList.toggle(inactiveClass, !isDark);
    log(`Mobile Dark icon set to: ${isDark ? 'active' : 'inactive'}`);
  }

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  log('HTML classList after applyTheme:', document.documentElement.classList);
}

// Function to determine the initial theme
function determineInitialTheme() {
  log('Determining initial theme...');
  let isDark;
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    isDark = storedTheme === 'dark';
    log('Found theme in localStorage:', storedTheme);
  } else {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    log('No theme in localStorage, system preference isDark:', isDark);
  }
  applyTheme(isDark);
}

// Function to toggle the theme
function toggleTheme() {
  const isCurrentlyDark = document.documentElement.classList.contains('dark');
  log('Toggling theme. Currently dark:', isCurrentlyDark);
  applyTheme(!isCurrentlyDark);
}

// Event listener for the toggle button
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    log('Theme toggle button clicked');
    toggleTheme();
  });
  log('Event listener added to theme toggle button.');
} else {
  console.error('CRITICAL: Theme toggle button #theme-toggle not found. Toggle will not work.');
}
// Event listener for the mobile toggle button
if (themeToggleBtnMobile) {
  themeToggleBtnMobile.addEventListener('click', () => {
    log('Mobile theme toggle button clicked');
    toggleTheme();
  });
  log('Event listener added to mobile theme toggle button.');
} else {
  console.warn('Mobile theme toggle button #theme-toggle-mobile not found. Mobile toggle will not work.');
}

// Listen for changes in system preference
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', event => {
  log('System theme preference changed. New preference isDark:', event.matches);
  // Only apply system preference if no theme is explicitly set by the user
  if (!localStorage.getItem('theme')) {
    log('Applying system theme change because no user preference is set.');
    applyTheme(event.matches);
  } else {
    log('Ignoring system theme change because user preference is set in localStorage.');
  }
});
log('Event listener for system theme changes added.');

// Apply the initial theme when the script loads
determineInitialTheme();