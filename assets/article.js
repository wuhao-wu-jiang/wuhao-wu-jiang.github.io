const widthControl = document.querySelector('.reading-width');
if (widthControl) {
  const buttons = widthControl.querySelectorAll('[data-reading-width]');
  function applyWidth(value) {
    const width = value === 'wide' ? 'wide' : 'standard';
    document.documentElement.dataset.articleWidth = width;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.readingWidth === width)));
  }
  applyWidth(document.documentElement.dataset.articleWidth);
  widthControl.hidden = false;
  buttons.forEach(button => button.addEventListener('click', () => {
    applyWidth(button.dataset.readingWidth);
    try { localStorage.setItem('haowu-article-width', button.dataset.readingWidth); } catch { /* This page still works without storage. */ }
  }));
  window.addEventListener('storage', event => {
    if (event.key === 'haowu-article-width' || event.key === null) applyWidth(event.newValue);
  });
}
