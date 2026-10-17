const year = document.querySelector('#archive-year');
const picker = document.querySelector('.year-picker');
const groups = [...document.querySelectorAll('.archive-year')];
const status = document.querySelector('#filter-status');
function filter() {
  const visible = groups.filter(group => !year.value || group.dataset.year === year.value);
  const keepFocus = document.activeElement === year;
  const heading = visible[0].querySelector('.year-heading');
  if (picker.parentElement !== heading) heading.append(picker);
  for (const group of groups) group.hidden = !visible.includes(group);
  const count = visible.reduce((sum, group) => sum + group.querySelectorAll('.archive-row').length, 0);
  status.textContent = `${count} ${count === 1 ? 'note' : 'notes'} shown${year.value ? ` for ${year.value}` : ' across all years'}.`;
  if (keepFocus) year.focus({ preventScroll: true });
}
year.addEventListener('change', filter);
picker.hidden = false;
