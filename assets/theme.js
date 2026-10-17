const themeToggle = document.querySelector('.theme-toggle');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#d4d0c6' : '#1f1f1f';
  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
}
applyTheme(document.documentElement.dataset.theme);
themeToggle.hidden = false;
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('haowu-theme', theme); } catch { /* Use the choice for this page. */ }
});
window.addEventListener('storage', event => {
  if (event.key === 'haowu-theme') applyTheme(event.newValue === 'light' ? 'light' : 'dark');
});
