const root = document.documentElement;

export function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function getTheme() {
  return root.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function otherTheme(theme) {
  return theme === 'dark' ? 'light' : 'dark';
}

/** Instantly applies a theme to the live DOM, persists it, and syncs toggle ARIA state. */
export function applyTheme(theme, toggle, persist = true) {
  root.dataset.theme = theme;
  if (persist) {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage failures (e.g. private browsing restrictions).
    }
  }
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light paper theme' : 'Switch to dark theme',
    );
  }
}
