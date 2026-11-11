import { applyTheme, getTheme, otherTheme } from './theme.js';
import { ThemeIcon } from './themeIcon.js';

const DURATION_MS = 1850;
const EASING = 'cubic-bezier(0.25, 0.08, 0.45, 1)';
const CSS_FADE_S = 0.45;
const MASK_STYLE_ID = 'ink-vt-mask-style';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/**
 * Generates an organic ink-blot SVG mask (multi-lobe silhouette + gated tendrils +
 * scattered droplets + paper-fibre turbulence displacement) centered at (800, 800)
 * in a 1600×1600 viewBox.
 */
function buildInkMaskDataUrl() {
  const size = 1600;
  const cx = size / 2;
  const cy = size / 2;
  const baseR = 540;
  const minRatio = 0.80; // guaranteed minimum radius relative to baseR
  const N = 200;

  // Random per-click phases & seed for organic variety every toggle
  const p1 = Math.random() * Math.PI * 2;
  const p2 = Math.random() * Math.PI * 2;
  const p3 = Math.random() * Math.PI * 2;
  const p4 = Math.random() * Math.PI * 2;
  const tp1 = Math.random() * Math.PI * 2;
  const tp2 = Math.random() * Math.PI * 2;
  const seed = Math.floor(Math.random() * 9000) + 1;

  const pts = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const lobe =
      1 +
      0.11 * Math.sin(a * 3 + p1) +
      0.08 * Math.cos(a * 5 + p2) +
      0.05 * Math.sin(a * 8 + p3) +
      0.03 * Math.cos(a * 15 + p4);

    // Gated pointed tendrils along a few directions
    const gate = Math.max(0, Math.sin(a * 2 + tp1) * 0.6 + Math.cos(a * 3 + tp2) * 0.4);
    const spike = Math.pow(Math.max(0, Math.sin(a * 7 + p2)), 8) * 0.22 * gate;
    const r = baseR * Math.max(minRatio, lobe + spike);
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }

  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < N; i++) {
    const p0 = pts[i];
    const p1Pt = pts[(i + 1) % N];
    const mx = ((p0[0] + p1Pt[0]) / 2).toFixed(1);
    const my = ((p0[1] + p1Pt[1]) / 2).toFixed(1);
    d += ` Q ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} ${mx} ${my}`;
  }
  d += ' Z';

  // Isolated micro-droplets / speckles just ahead of the frontier
  let speckles = '';
  const speckleCount = 26;
  for (let i = 0; i < speckleCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const dist = baseR * (1.05 + Math.random() * 0.24);
    const sx = (cx + Math.cos(a) * dist).toFixed(1);
    const sy = (cy + Math.sin(a) * dist).toFixed(1);
    const sr = (2.2 + Math.random() * 5.2).toFixed(1);
    speckles += `<circle cx="${sx}" cy="${sy}" r="${sr}" fill="white"/>`;
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">` +
    `<defs>` +
    `<filter id="ink-f" x="-25%" y="-25%" width="150%" height="150%">` +
    `<feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="5" seed="${seed}" result="n"/>` +
    `<feDisplacementMap in="SourceGraphic" in2="n" scale="68" xChannelSelector="R" yChannelSelector="G" result="d"/>` +
    `<feGaussianBlur in="d" stdDeviation="0.6"/>` +
    `</filter>` +
    `</defs>` +
    `<g filter="url(#ink-f)">` +
    `<path d="${d}" fill="white"/>` +
    speckles +
    `</g>` +
    `</svg>`;

  return {
    url: `data:image/svg+xml,${encodeURIComponent(svg)}`,
    // Effective guaranteed solid radius fraction of the SVG box
    solidFraction: (baseR * minRatio * 0.99) / size,
  };
}

function preloadMask() {
  const mask = buildInkMaskDataUrl();
  const img = new Image();
  img.src = mask.url;
  const ready = img.decode().catch(() => {});
  return { ...mask, ready };
}

/**
 * Orchestrates the theme transition using the browser's View Transitions API
 * masked by an organic procedural ink-bleed SVG. Because both old and new
 * snapshots come straight from the browser compositor, zero DOM elements can
 * ever shift or misalign during the animation.
 */
export class InkTransition {
  constructor(toggleButton, opts = {}) {
    this.toggleButton = toggleButton;
    this.icon = toggleButton ? new ThemeIcon(toggleButton) : null;
    this.icon?.set(getTheme());

    this.useVT =
      opts.viewTransitions !== false && typeof document.startViewTransition === 'function';
    this.cssFadeTimer = 0;
    this.activeTransition = null;
    this.activeAnim = null;
    this.nextMask = this.useVT ? preloadMask() : null;

    if (this.useVT) {
      // View transitions intercept top-layer hits while active; release immediately on user input
      // and forward the first click if the top-layer swallowed pointerdown onto <html>.
      let pendingTarget = null;
      const releaseOnInput = () => {
        if (this.activeTransition) this.finishActive();
      };
      window.addEventListener(
        'pointerdown',
        (e) => {
          if (!this.activeTransition) return;
          const intercepted = e.target === document.documentElement;
          this.finishActive();
          if (intercepted) {
            const el = document.elementFromPoint(e.clientX, e.clientY);
            pendingTarget = el && el !== document.documentElement ? el : null;
          }
        },
        { capture: true },
      );
      window.addEventListener(
        'click',
        (e) => {
          const target = pendingTarget;
          pendingTarget = null;
          if (target && e.target === document.documentElement) {
            e.stopPropagation();
            target.dispatchEvent(
              new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                clientX: e.clientX,
                clientY: e.clientY,
                detail: e.detail || 1,
              }),
            );
          }
        },
        { capture: true },
      );
      window.addEventListener('wheel', releaseOnInput, { capture: true, passive: true });
      window.addEventListener('touchstart', releaseOnInput, { capture: true, passive: true });
    }
  }

  async toggle(point) {
    const to = otherTheme(getTheme());

    if (reducedMotion.matches) {
      this.finishActive();
      applyTheme(to, this.toggleButton);
      this.icon?.set(to);
      return;
    }

    if (!this.useVT || document.hidden) {
      this.crossFade(to);
      return;
    }

    const center = point ?? this.toggleCenter();
    const mask = this.nextMask ?? preloadMask();
    this.nextMask = null;

    await mask.ready;

    // If another toggle happened while decoding, skip cleanly before starting.
    this.finishActive();

    this.setMaskStyle(mask.url);
    document.documentElement.dataset.inkActive = '1';

    let vt;
    try {
      vt = document.startViewTransition(() => {
        applyTheme(to, this.toggleButton);
        this.icon?.set(to);
      });
    } catch {
      delete document.documentElement.dataset.inkActive;
      this.crossFade(to);
      return;
    }

    this.activeTransition = vt;

    try {
      await vt.ready;
    } catch {
      if (this.activeTransition === vt) {
        delete document.documentElement.dataset.inkActive;
        this.activeTransition = null;
      }
      return;
    }

    if (this.activeTransition !== vt) return;

    const maxDist = farthestCorner(center);
    const startSize = 32;
    const endSize = Math.ceil(maxDist / mask.solidFraction);

    const startPos = `${(center.x - startSize / 2).toFixed(1)}px ${(center.y - startSize / 2).toFixed(1)}px`;
    const endPos = `${(center.x - endSize / 2).toFixed(1)}px ${(center.y - endSize / 2).toFixed(1)}px`;

    this.activeAnim = document.documentElement.animate(
      [
        {
          maskSize: `${startSize}px ${startSize}px`,
          maskPosition: startPos,
          WebkitMaskSize: `${startSize}px ${startSize}px`,
          WebkitMaskPosition: startPos,
        },
        {
          maskSize: `${endSize}px ${endSize}px`,
          maskPosition: endPos,
          WebkitMaskSize: `${endSize}px ${endSize}px`,
          WebkitMaskPosition: endPos,
        },
      ],
      {
        duration: DURATION_MS,
        easing: EASING,
        fill: 'forwards',
        pseudoElement: '::view-transition-new(root)',
      },
    );

    try {
      await vt.finished;
    } catch {
      // Ignore abort if skipped by a subsequent rapid click.
    } finally {
      if (this.activeTransition === vt) {
        delete document.documentElement.dataset.inkActive;
        this.clearMaskStyle();
        this.activeTransition = null;
        this.activeAnim = null;
        this.scheduleNextMask();
      }
    }
  }

  scheduleNextMask() {
    if (!this.useVT || this.nextMask) return;
    const prep = () => {
      if (!this.nextMask && !this.activeTransition) {
        this.nextMask = preloadMask();
      }
    };
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(prep, { timeout: 300 });
    } else {
      window.setTimeout(prep, 50);
    }
  }

  finishActive() {
    this.activeAnim?.cancel();
    this.activeAnim = null;
    try {
      this.activeTransition?.skipTransition();
    } catch {
      // Ignore if already finished.
    }
    this.activeTransition = null;
    this.clearMaskStyle();
    delete document.documentElement.dataset.inkActive;
  }

  clearMaskStyle() {
    const style = document.getElementById(MASK_STYLE_ID);
    if (style) style.textContent = '';
  }

  setMaskStyle(maskUrl) {
    let style = document.getElementById(MASK_STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = MASK_STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = `
      html[data-ink-active="1"]::view-transition-new(root) {
        -webkit-mask-image: url("${maskUrl}");
        mask-image: url("${maskUrl}");
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
      }
    `;
  }

  crossFade(to) {
    const root = document.documentElement;
    root.classList.add('theme-fade');
    root.style.setProperty('--theme-fade', `${CSS_FADE_S}s`);
    applyTheme(to, this.toggleButton);
    this.icon?.morphTo(to, { duration: CSS_FADE_S * 1.4, ease: 'power2.inOut', timeScale: 1 });
    window.clearTimeout(this.cssFadeTimer);
    this.cssFadeTimer = window.setTimeout(() => {
      root.classList.remove('theme-fade');
    }, CSS_FADE_S * 1000 + 50);
  }

  toggleCenter() {
    const r = this.toggleButton?.getBoundingClientRect();
    if (!r) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }
}

function farthestCorner(p) {
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  return (
    Math.max(
      Math.hypot(p.x, p.y),
      Math.hypot(w - p.x, p.y),
      Math.hypot(p.x, h - p.y),
      Math.hypot(w - p.x, h - p.y),
    ) + 16
  );
}
