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

// Keep equation markup untouched; add a hint only when its scroll area overflows.
const equations = [...document.querySelectorAll('.article-body .math-display')];
const equationHints = equations.map((equation, index) => {
  const hint = document.createElement('span');
  hint.className = 'math-scroll-hint';
  hint.lang = 'zh-CN';
  hint.textContent = '↔ 横向滚动查看完整公式';
  hint.hidden = true;
  let id = `equation-scroll-hint-${index}`;
  while (document.getElementById(id)) id += '-hint';
  hint.id = id;
  equation.after(hint);
  return { equation, hint, description: equation.getAttribute('aria-describedby') };
});
let equationFrame = 0;
function refreshEquationHints() {
  equationFrame = 0;
  equationHints.forEach(({ equation, hint, description }) => {
    const overflowing = equation.clientWidth > 0 && equation.scrollWidth > equation.clientWidth + 1;
    hint.hidden = !overflowing;
    if (overflowing) equation.setAttribute('aria-describedby', [description, hint.id].filter(Boolean).join(' '));
    else if (description) equation.setAttribute('aria-describedby', description);
    else equation.removeAttribute('aria-describedby');
  });
}
function scheduleEquationHints() {
  if (!equationFrame) equationFrame = requestAnimationFrame(refreshEquationHints);
}
if (equations.length) {
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(scheduleEquationHints);
    equations.forEach(equation => observer.observe(equation));
  }
  window.addEventListener('resize', scheduleEquationHints, { passive: true });
  document.fonts.ready.then(scheduleEquationHints);
  scheduleEquationHints();
}
