# Glyphwind

A precision-engineered, framework-agnostic design system built on Tailwind CSS. Glyphwind delivers an **Analog Digitalist** aesthetic — high contrast, radical reduction, and a mechanical precision feel — through a comprehensive token system, semantic CSS custom properties, and production-ready component classes.

**Version:** 1.0.0 &nbsp;|&nbsp; **Tailwind:** 3.4.17 &nbsp;|&nbsp; **License:** MIT

---

## Philosophy

- **Monochromatic foundation** — Black and white only, with one signal red accent (<1% screen area)
- **No drop shadows** — Depth through tonal surface layering, not blur effects
- **4px base grid** — All spacing, radius, and geometry are multiples of 4px
- **Semantic tokens** — CSS custom properties everywhere; never hardcoded hex values
- **Motion restraint** — No decorative animation; only state-change signals (max 300ms)
- **Zero-config shadcn/ui compatibility** — Token names match shadcn expectations out of the box

---

## What's Included

| File | Purpose |
|------|---------|
| `globals.css` | All CSS custom properties (light + dark themes) + component classes |
| `tailwind.config.js` | Tailwind theme extension with token mappings |
| `index.html` | Standalone living style guide — no build step required |
| `AGENTS.md` | Authoritative developer + AI agent reference guide |
| `versions/index.json` | Version metadata and changelog |

---

## Quick Start

### Plain HTML (CDN)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="globals.css" />
  <script src="https://cdn.tailwindcss.com/3.4.17"></script>
</head>
<body class="bg-background text-foreground">
  <button class="btn btn-primary">Get Started</button>
</body>
</html>
```

### React / Vite

```bash
npm install tailwindcss tailwindcss-animate
```

1. Copy `tailwind.config.js` to your project root (rename to `tailwind.config.cjs` if needed)
2. Import `globals.css` in your entry file:

```tsx
// main.tsx
import './globals.css'
```

### Next.js (App Router)

```tsx
// app/layout.tsx
import './globals.css'
```

Replace the generated `tailwind.config.js` and `globals.css` with the Glyphwind versions.

### shadcn/ui

```bash
npx shadcn-ui@latest init
```

Replace the generated `globals.css` and `tailwind.config.js` with the Glyphwind versions. All shadcn CSS variable names are preserved — components work without modification.

### Vue / Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/assets/globals.css']
})
```

---

## Color System

Glyphwind uses raw HSL channels as CSS custom properties. Always wrap in `hsl()`:

```css
color: hsl(var(--ink));
background: hsl(var(--surface-card));
border-color: hsl(var(--border) / 0.5); /* with opacity */
```

### Surface Scale

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--background` | #FCFCFC | #000000 | Page canvas |
| `--surface-low` | #F6F3F2 | #0E0E0E | Section backgrounds |
| `--surface-card` | #FFFFFF | #1B1B1B | Cards, modals |
| `--surface-high` | #E8E5E4 | #1F1F1F | Hover states |

### Text Scale

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--ink` | #1B1B1B | #FFFFFF | Primary text |
| `--ink-muted` | #5E5E5E | #999999 | Secondary text |
| `--ink-subtle` | #999999 | #4D4D4D | Placeholders |

### Accent

Signal red (`--signal`) is used sparingly — LED dots, destructive actions, critical alerts only.

---

## Typography

Three font families via Google Fonts:

| Family | Fonts | Use |
|--------|-------|-----|
| `font-sans` | Space Grotesk → system-ui | All UI text (default) |
| `font-mono` | Space Mono → Roboto Mono | Data, code, numbers |
| `font-dot` | Doto | Clocks, counters, version stamps only |

```html
<h1 class="t-display">System Online</h1>
<h2 class="t-h1">Dashboard</h2>
<p class="t-body">Body copy here.</p>
<span class="t-label">Status</span>
<code class="t-mono">v1.0.0</code>

<!-- Doto display — numbers/clocks only -->
<span class="dot-display dot-display-lg">99.9%</span>
```

---

## Components

### Buttons

```html
<button class="btn btn-primary">Save</button>
<button class="btn btn-secondary">Cancel</button>
<button class="btn btn-ghost">Learn more</button>
<button class="btn btn-critical">Delete</button>

<!-- Sizes -->
<button class="btn btn-primary btn-xs">Tiny</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-xl">Hero</button>
```

### Cards

```html
<div class="card">Default card</div>
<div class="card card-hover">Clickable card</div>
<div class="card card-flush">No padding (for tables/images)</div>
<div class="card card-float">Floating overlay</div>
<div class="card card-signal">Critical/alert state</div>
```

### Inputs

```html
<label class="input-label">Email</label>
<input class="input" type="email" placeholder="you@example.com" />
<span class="input-hint">We'll never share your email.</span>

<!-- Error state -->
<input class="input error" type="email" />
<span class="input-error-msg">Invalid email address.</span>

<!-- Monospace (for tokens, API keys) -->
<input class="input t-mono" type="text" value="sk-••••••••" />
```

### Badges

```html
<span class="badge badge-default">Default</span>
<span class="badge badge-outline">Outline</span>
<span class="badge badge-active"><span class="dot dot-sm"></span> Live</span>
<span class="badge badge-dim"><span class="dot dot-sm animate-led"></span> Degraded</span>
```

### LED Dot Indicator

```html
<span class="dot dot-sm"></span>                         <!-- 4px, signal red -->
<span class="dot dot-md"></span>                         <!-- 6px -->
<span class="dot dot-lg animate-led"></span>             <!-- 8px, pulsing -->
<span class="dot dot-lg animate-led-fast"></span>        <!-- urgent/critical -->
<span class="dot dot-sm bg-ink-subtle"></span>           <!-- inactive/offline -->
```

### Dot Background Pattern

```html
<div class="bg-dots">Default</div>
<div class="bg-dots bg-dots-loose bg-dots-md">Loose medium dots</div>
<div class="bg-dots bg-dots-scroll-diag bg-dots-signal">Animated signal</div>
```

### Navigation

```html
<nav class="navbar">
  <a href="/" class="nav-link">Overview</a>
  <a href="/components" class="nav-link active">Components</a>
</nav>
```

---

## Layout Utilities

```html
<div class="row">flex row, centered, 1rem gap</div>
<div class="row-between">flex row, space-between</div>
<div class="stack">flex column</div>
<div class="cluster">flex wrap, 0.75rem gap</div>
```

---

## Theme Toggle

```js
// Toggle dark mode
document.documentElement.classList.toggle('dark')

// Persist preference
const saved = localStorage.getItem('theme')
if (saved === 'dark') document.documentElement.classList.add('dark')
```

---

## Elevation (No Shadows)

Glyphwind uses tonal layering instead of drop shadows. Each surface level is progressively lighter or darker:

```
Dark:  #000000 → #0E0E0E → #1B1B1B → #1F1F1F → #242424
Light: #FCFCFC → #F6F3F2 → #FFFFFF → #E8E5E4 → #E5E2E1
```

For floating overlays, use `.card-float` — never Tailwind's `shadow-md` or `shadow-lg`.

---

## Animation

| Class | Duration | Use |
|-------|----------|-----|
| `.animate-led` | 2.4s | Standard live status dot |
| `.animate-led-fast` | 1s | Urgent/critical/recording |
| `.animate-fade-up` | 0.18s | Toast, dropdown entrance |
| `.animate-scale-in` | 0.15s | Modal, popover entrance |

Motion rules: max 300ms for UI transitions, animate only `transform` and `opacity`.

---

## Dependencies

```bash
npm install tailwindcss-animate
```

Google Fonts (Space Grotesk, Space Mono, Doto) are loaded via CDN in `globals.css`.

---

## Browser Support

Any browser supporting CSS custom properties and `backdrop-filter`. Modern evergreen browsers recommended.

---

## License

MIT © 2026 Brijesh Chowdary Lavu
