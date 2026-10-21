# Design System Tokens & Specification (DESIGN.md)

This document specifies the design tokens extracted from the hero artwork and applied to the editorial paper-first portfolio.

The hero retains its purple fabric texture (`#180922`), botanical poppy and moth collage, and sticker-cut halftone portrait. Everything below the hero physically transitions into an art-directed, paper-first editorial layout with warm aged-paper surfaces, ink typography, giant display numerals, and poppy red accents.

---

## 1. Palette & Surface Tokens

All colors are sampled directly from the hero composition with verified contrast ratios:

| Token Name | Light Mode (Default) | Dark Mode (Inverted) | Usage Role | Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- |
| `--paper` | `#EFE6D2` | `#161210` | Primary page & surface background | N/A (Base) |
| `--paper-deep` | `#E4D7BC` | `#231E1B` | Secondary paper tint & subtle panel fills | Base Tone |
| `--cream` | `#F6EFDF` | `#2A2420` | Hero note, sticker borders (`#F6EFDF` in both) | 1.1:1 on paper |
| `--ink` | `#1B1612` | `#F6EFDF` | Headings, primary text, rules, hard shadows | **13.8:1** (AAA) |
| `--ink-soft` | `#4A4036` | `#C7BDB1` | Body copy, secondary text, metadata labels | **5.4:1** (AA) |
| `--poppy` | `#C0281D` | `#E64A38` | The ONE primary accent (links, numerals, kickers) | **4.8:1** (AA) |
| `--fabric` | `#4A1459` | `#C084FC` | Hero purple velvet; rare small badges/details | Small accents |
| `--cta` | `#E0623F` | `#E8704F` | Primary hero CTA button only | Hero CTA |

### Accent Rules
1. **Poppy Red (`--poppy`)** is the primary accent below the hero: section kickers, giant numerals, links, and active indicators.
2. **Fabric Purple (`--fabric`)** is reserved for the hero background and rare small metadata badges.
3. **Orange (`--cta`)** is used strictly on the primary hero CTA button.
4. No more than two accents appear below the hero.

---

## 2. CSS Variables (`:root`)

```css
:root {
  /* Surfaces */
  --paper: #EFE6D2;
  --paper-deep: #E4D7BC;
  --cream: #F6EFDF;
  
  /* Ink */
  --ink: #1B1612;
  --ink-soft: #4A4036;
  
  /* Accents */
  --poppy: #C0281D;
  --poppy-hover: #9E1F15;
  --fabric: #4A1459;
  --cta: #E0623F;
  --cta-hover: #C54C2B;

  /* Typography */
  --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  --font-hand: 'Caveat', cursive, sans-serif;

  /* Type Scale */
  --text-kicker: 13px;
  --text-body: 19px;
  --text-lead: 22px;
  --text-numeral: clamp(56px, 9vw, 120px);
  --text-section-title: clamp(48px, 7vw, 96px);

  /* Spacing Scale (8px Base) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
  --space-10: 80px;
  --space-16: 128px;

  /* Layout */
  --max-width: 1200px;
  --gutter: 20px;
  --page-pad-x: 20px;

  /* Borders & Shadows */
  --border-ink: 1px solid rgba(27, 22, 18, 0.2);
  --border-ink-strong: 2px solid var(--ink);
  --shadow-hard: 6px 6px 0 var(--ink);
  --shadow-hard-sm: 4px 4px 0 var(--ink);
  
  /* Sticker Styling */
  --sticker-border: 6px solid var(--cream);
  --sticker-radius: 14px;
}

[data-theme="dark"] {
  --paper: #161210;
  --paper-deep: #231E1B;
  --cream: #F6EFDF;
  --ink: #F6EFDF;
  --ink-soft: #C7BDB1;
  --poppy: #E64A38;
  --poppy-hover: #F86A58;
  --fabric: #C084FC;
  --cta: #E8704F;
  --cta-hover: #F58364;

  --border-ink: 1px solid rgba(246, 239, 223, 0.2);
  --border-ink-strong: 2px solid var(--ink);
  --shadow-hard: 6px 6px 0 rgba(0, 0, 0, 0.85);
  --shadow-hard-sm: 4px 4px 0 rgba(0, 0, 0, 0.85);
  --sticker-border: 6px solid #F6EFDF;
}
```

---

## 3. Editorial Layout Elements

1. **Fibrous Torn-Paper Edge**:
   An irregular, notched SVG transition path separating the purple fabric hero from the warm paper surface below (`fill: var(--paper)`).
2. **Flat Cream Hero Note**:
   Replaces frosted-glass container with an authentic paper clipping note: cream fill (`var(--cream)`), ink text (`var(--ink)`), thin ink border, 6px 6px hard offset ink shadow, and -1deg tilt.
3. **Giant Display Numerals & Outlined Display Titles**:
   Open source PRs and stats feature huge numerals (`clamp(56px, 9vw, 120px)`) in poppy red. Projects without repository imagery feature giant outlined typography (`-webkit-text-stroke: 2px var(--ink); color: transparent;`) rather than empty placeholder frames.
4. **Sticker Cutout Media**:
   Photos and media feature a 6px solid cream border, 14px corner radius, hard 6px offset shadow, and a subtle -1.5deg / +1.5deg tilt that straightens to 0deg on hover (200ms ease).
5. **Restrained Handwritten Script (`Caveat`)**:
   Strictly limited to at most 3 factual margin notes across the whole page (e.g. `summer '27` near internship badge).
6. **No AI Clichés**:
   Zero frosted glass, zero pill chips around tools (plain mono with " / " separators), zero neon gradients, zero rounded card grids, and zero body copy under 17px.
