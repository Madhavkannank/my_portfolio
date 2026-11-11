import { InkTransition } from './inkTransition.js';
import { applyTheme, getInitialTheme } from './theme.js';

const toggle = document.getElementById('theme-toggle');
applyTheme(getInitialTheme(), toggle, false);

const params = new URLSearchParams(location.search);
const ink = new InkTransition(toggle, { viewTransitions: params.get('vt') !== '0' });

toggle?.addEventListener('click', (e) => {
  // detail === 0 means a keyboard-activated click (Enter/Space): spread from the button.
  void ink.toggle(e.detail === 0 ? undefined : { x: e.clientX, y: e.clientY });
});

const TEXT_ENTRY =
  'input:not([type="range"]):not([type="checkbox"]):not([type="button"]), textarea, select, [contenteditable="true"]';

window.addEventListener('keydown', (e) => {
  if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
  const target = e.target;
  if (target instanceof Element && target.closest(TEXT_ENTRY)) return;

  if (e.key.toLowerCase() === 't') {
    void ink.toggle();
    e.preventDefault();
  }
});
