// theme.js

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
  } else {
    document.documentElement.classList.remove('light-theme');
  }

  localStorage.setItem('theme', theme);
}

function loadTheme() {
  const theme = localStorage.getItem('theme') || 'dark';
  applyTheme(theme);
}

document.addEventListener('DOMContentLoaded', function () {
  loadTheme();
});

const themeSelect = document.getElementById('themeSelect');
if (themeSelect) {
  themeSelect.addEventListener('change', function () {
    applyTheme(this.value);
  });
}