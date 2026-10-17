// Inlined before stylesheets so a saved light preference applies before first paint.
try {
  if (localStorage.getItem('haowu-theme') === 'light') {
    document.documentElement.dataset.theme = 'light';
    document.querySelector('meta[name="theme-color"]').content = '#d4d0c6';
  }
} catch {
  // Storage may be unavailable; the default dark theme still works.
}
