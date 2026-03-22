# Glyphwind Design System — Agent Reference

> This document is the authoritative reference for AI agents generating UI code, components, or styles using Glyphwind. Read it fully before producing any output.

---

## 1. What Is Glyphwind?

Glyphwind is a framework-agnostic design system built on Tailwind CSS v3 and CSS custom properties. It follows an "Analog Digitalist" aesthetic — high contrast, radical reduction, monochromatic with a single signal red accent. Inspired by Nothing Tech's design language.

**Key traits:**
- Monochromatic surfaces (black/white only) with one red accent
- Tonal elevation — no drop shadows, no gradients
- Ghost borders — never 100% opaque
- Space Grotesk for all UI text; Space Mono for data/numbers
- Doto font reserved for special display components only (clocks, counters)
- 4px base grid for all spacing

---

## 2. File Structure

```
design-system/
├── tailwind.config.js   — Full token system (colors, typography, spacing, animations)
├── globals.css          — CSS custom properties (both themes) + component classes
└── index.html           — Standalone living style guide (open in browser, no build step)
```

**To integrate into a project:**
1. Copy `tailwind.config.js` → project root
2. Copy `globals.css` into your project and add `@import './globals.css';` to the **very top** of your entry stylesheet
3. Install required Tailwind plugins: `npm install tailwindcss-animate`
4. Add Google Fonts import (see §6)

---

## 3. Theme System

Theme is controlled by a class on the `<html>` element.

```html
<html class="dark">   <!-- dark mode  -->
<html>                <!-- light mode (default) -->
```

Toggle with JS:
```js
document.documentElement.classList.toggle('dark')
```

Both themes share identical CSS variable names — the `.dark` class overrides values. Never hardcode hex colors in components.

---

## 4. Design Tokens — CSS Custom Properties

Tokens are stored as **raw HSL channels** (no `hsl()` wrapper in the variable value).
Usage: `hsl(var(--token-name))` — always wrap with `hsl()`.
Opacity variants: `hsl(var(--token-name) / 0.5)` — standard CSS Level 4 syntax.

```css
/* Correct */
background: hsl(var(--surface-card));
color: hsl(var(--ink-muted));

/* Opacity variants — use hsl() alpha or color-mix() */
background: hsl(var(--signal) / 0.12);
background: color-mix(in srgb, hsl(var(--signal)) 12%, transparent);
```

> **shadcn/ui & React Aria:** Both libraries call `hsl(var(--x))` internally. Glyphwind tokens are stored as raw HSL so shadcn components work with zero configuration. No aliases or workarounds needed.

### 4.1 Surface Scale (Backgrounds)

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--background` | `#FCFCFC` | `#000000` | Page canvas |
| `--surface` | `#FCFCFC` | `#000000` | Base layer |
| `--surface-low` | `#F6F3F2` | `#0E0E0E` | Section backgrounds |
| `--surface-card` | `#FFFFFF` | `#1B1B1B` | Cards, modals, sidebars |
| `--surface-high` | `#E8E5E4` | `#1F1F1F` | Hover state, active rows |
| `--surface-highest` | `#E5E2E1` | `#242424` | Highest interactive layer |

CSS utility classes: `.bg-surface`, `.bg-surface-low`, `.bg-surface-card`, `.bg-surface-high`, `.bg-surface-highest`
Short aliases: `.bg-base`, `.bg-low`, `.bg-card`, `.bg-high`, `.bg-highest`
Tailwind (if configured): `bg-surface`, `bg-surface-low`, `bg-surface-card`, `bg-surface-high`, `bg-surface-highest`

### 4.2 Text Scale (Ink)

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--foreground` / `--ink` | `#1B1B1B` | `#FFFFFF` | Primary text |
| `--ink-muted` | `#5E5E5E` | `#999999` | Secondary, metadata |
| `--ink-subtle` | `#999999` | `#4D4D4D` | Tertiary, placeholders |
| `--ink-ghost` | `#C7C7C7` | `#292929` | Barely visible hints |

Color utility classes: `.c-fg`, `.c-muted`, `.c-subtle`, `.c-signal`
Background utilities: `.bg-foreground`, `.bg-ink-subtle`, `.bg-ink-ghost`

### 4.3 Signal Red (Accent)

| Token | Light hex | Dark hex | Usage |
|---|---|---|---|
| `--signal` | `#BB0307` | `#FF4132` | LED dot, destructive, critical |
| `--signal-foreground` | `#FFFFFF` | `#FFFFFF` | Text on signal red |

**Rule:** Signal red must occupy <1% of total screen real estate. Use only for:
- The `.dot` LED indicator
- Destructive action buttons (`.btn-critical`)
- Critical/error states
- Live status badges

CSS utility classes: `.bg-signal`, `.c-signal`
Tailwind (if configured): `bg-signal`, `text-signal`, `border-signal`

### 4.4 Borders

| Token | Light HSL | Dark HSL |
|---|---|---|
| `--border` | `0 0% 11% / 0.09` | `0 0% 100% / 0.08` |
| `--ring` | `0 0% 11%` | `0 0% 83%` |

**Rule:** Never use 100% opaque borders. `--border` includes alpha — use `hsl(var(--border))`.

Ghost border as box-shadow (preferred for cards): `box-shadow: inset 0 0 0 1px hsl(var(--border))`

### 4.5 Semi-transparent Backgrounds (Critical Pattern)

**Use `hsl(var(--token) / opacity)` or `color-mix()`. Never hardcode rgba fallbacks.**

```css
/* CORRECT — alpha in hsl() */
background: hsl(var(--surface-card) / 0.8);

/* CORRECT — color-mix() */
background: color-mix(in srgb, hsl(var(--surface-card)) 80%, transparent);

/* WRONG — hardcoded fallback ignores light theme */
background: rgba(27, 27, 27, 0.8);
```

### 4.6 shadcn/ui Aliases

All tokens use raw HSL, so shadcn components calling `hsl(var(--primary))` etc. work out of the box. The full alias set is included in `globals.css`:

| shadcn token | Maps to |
|---|---|
| `--primary` | foreground color |
| `--primary-foreground` | background color |
| `--secondary` | `--surface-low` |
| `--muted` | `--surface-low` |
| `--muted-foreground` | `--ink-muted` |
| `--accent` | `--signal` |
| `--destructive` | `--signal` |
| `--card` | `--surface-card` |
| `--popover` | `--surface-low` |
| `--radius` | `0.25rem` (4px) — default radius |
| `--radius-sm` | `0.125rem` (2px) |
| `--radius-md` | `0.25rem` (4px) |
| `--radius-lg` | `0.375rem` (6px) |
| `--radius-full` | `9999px` |

---

## 5. Typography

### 5.1 Font Families

| Family | Fonts | Use for |
|---|---|---|
| `font-sans` | Space Grotesk → Inter → system-ui | All UI text, body, labels, buttons |
| `font-mono` | Space Mono → Roboto Mono | Data values, code, numbers, timestamps |
| `font-dot` | Doto → Space Mono | **Special display components only** (see §5.4) |

Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Doto:wght@100..900&display=swap" rel="stylesheet" />
```

### 5.2 Type Scale (globals.css classes)

| Class | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `.t-display` | fluid 40–80px | 700 | -0.03em | Hero statements, max 3 words |
| `.t-h1` | 32px | 600 | -0.02em | Section headings |
| `.t-h2` | 24px | 600 | -0.018em | Sub-headings |
| `.t-h3` | 20px | 600 | -0.01em | Card titles |
| `.t-h4` | 17px | 500 | -0.005em | Component titles |
| `.t-body-lg` | 16px | 400 | — | Lead paragraphs |
| `.t-body` | 14px | 400 | — | Body copy |
| `.t-body-sm` | 13px | 400 | — | Secondary body |
| `.t-label` | 10px | 500 | 0.10em | Uppercase labels (default) |
| `.t-label-md` | 11px | 500 | 0.09em | Compact labels |
| `.t-mono` | inherit | — | -0.01em | Space Mono + tabular-nums |

**Rules:**
- Display type: Space Grotesk only, max 3 words, never in body flow
- Labels: Always uppercase (`text-transform: uppercase`), always tracked
- Numbers/data: Always Space Mono with `font-variant-numeric: tabular-nums`
- No italic except code

### 5.3 Numeric / Data Display

For any number that changes or aligns vertically (prices, metrics, timestamps):
```html
<span class="t-mono">1,204</span>
```
Or standalone utility: `.mono-nums` (Space Mono + tabular-nums, defined in globals.css)

### 5.4 Dot Display (Doto) — Special Components Only

Use the `.dot-display` class family. **Never for body copy, navigation, or buttons.**

```html
<!-- Sizes -->
<span class="dot-display dot-display-xs">00:00</span>   <!-- 12px — inline labels -->
<span class="dot-display dot-display-sm">142ms</span>    <!-- 16px — compact metrics -->
<span class="dot-display dot-display-md">1,204 /s</span> <!-- 24px — dashboard values -->
<span class="dot-display dot-display-lg">99.98%</span>   <!-- 40px — hero clock/counter -->
<span class="dot-display dot-display-xl">23:59</span>    <!-- 64px — full display -->

<!-- Color variants -->
<span class="dot-display dot-display-lg dot-display-muted">v2.4.1</span>
<span class="dot-display dot-display-lg dot-display-signal">LIVE</span>
```

Approved use cases: clocks, uptime percentages, request counters, latency readouts, build/version stamps, hero display headlines (decorative, 3 words max).

Doto has variable weight (100–900). Default is 400. Use 700 for emphasis, 100 for ghost.

---

## 6. Spacing

4px base grid. All spacing is a multiple of 4px.

| Tailwind value | px | Common use |
|---|---|---|
| `1` | 4px | Tight gaps |
| `2` | 8px | Icon-to-label gap |
| `3` | 12px | Button internal padding |
| `4` | 16px | Gutter minimum |
| `6` | 24px | Card padding |
| `8` | 32px | Section internal gap |
| `12` | 48px | Component gap |
| `16` | 64px | Section gap minimum |
| `32` | 128px | Hero breathing room |

---

## 7. Border Radius

| Token | Class | px | Use |
|---|---|---|---|
| `--radius-sm` | `.radius-sm` | 2px | Badges, tight UI |
| `--radius-md` | `.radius-md` | 4px | Cards, inputs — default |
| `--radius-lg` | `.radius-lg` | 6px | Maximum for containers |
| `--radius-full` | `.radius-full` | 9999px | Dots only |

**Buttons use `border-radius: 3px` explicitly** — slightly sharper than cards to feel more mechanical. This is baked into `.btn`, not a utility class.

**Never exceed 6px on structural elements.**

---

## 8. Component Classes

All defined in `globals.css`.

### 8.1 Buttons

```html
<!-- Variants -->
<button class="btn btn-primary">Label</button>
<button class="btn btn-secondary">Label</button>
<button class="btn btn-ghost">Label</button>
<button class="btn btn-critical">Delete</button>

<!-- Sizes (combine with variant) -->
<button class="btn btn-primary btn-xs">XS</button>
<button class="btn btn-primary btn-sm">SM</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">LG</button>
<button class="btn btn-primary btn-xl">XL</button>

<!-- Icon-only button (must include title for accessibility) -->
<button class="btn btn-secondary btn-icon" title="Settings">
  <svg .../>
</button>

<!-- States -->
<button class="btn btn-primary btn-loading">
  <span class="btn-spinner"></span> Saving
</button>
<button class="btn btn-secondary btn-toggle-on">Active</button>
<button class="btn btn-primary" disabled>Disabled</button>
```

Button rules:
- Press feedback is automatic via `:active { transform: translateY(1px) }` in globals
- Loading state: add `btn-loading` class + `<span class="btn-spinner"></span>` element
- Toggle on state: add `btn-toggle-on` class
- Disabled: native HTML `disabled` attribute, not a class

### 8.2 Inputs

```html
<!-- Default -->
<label class="input-label">Field Name</label>
<input class="input" type="text" placeholder="Placeholder" />
<span class="input-hint">Helper text</span>

<!-- Error state -->
<input class="input error" type="text" />
<span class="input-error-msg">Error message</span>

<!-- Disabled -->
<input class="input" disabled />

<!-- Monospace — for tokens, API keys -->
<input class="input t-mono" type="text" placeholder="sk_live_..." />
```

### 8.3 Cards

```html
<!-- Static card -->
<div class="card">Content</div>

<!-- Clickable / hoverable card -->
<div class="card card-hover">Content</div>

<!-- Flush — no padding, wraps a table or image -->
<div class="card card-flush">Content</div>

<!-- Floating card (ambient shadow) -->
<div class="card card-float">Content</div>

<!-- Critical / signal state -->
<div class="card card-signal">
  <div class="row-sm">
    <span class="dot dot-sm animate-led-fast"></span>
    <span class="t-label c-signal">Critical</span>
  </div>
  <div class="t-body c-muted">Alert description.</div>
  <button class="btn btn-critical btn-sm mt-4">Acknowledge</button>
</div>
```

Card rules:
- No dividers inside cards — use spacing (`gap-6`, `mt-6`) between items
- No drop shadows except `card-float` which uses a 64px ambient diffusion

### 8.4 Badges

```html
<span class="badge badge-default">Default</span>
<span class="badge badge-outline">Outline</span>
<span class="badge badge-active">
  <span class="dot dot-sm"></span> Live
</span>
<span class="badge badge-dim">
  <span class="dot dot-sm animate-led"></span> Degraded
</span>
<!-- Monospace version tag -->
<span class="badge badge-default t-mono">v1.0.4</span>
```

### 8.5 Navigation

```html
<nav class="navbar">
  <a href="/" class="nav-link">Overview</a>
  <a href="/components" class="nav-link active">Components</a>
</nav>
```

Navbar background uses `hsl(var(--surface-card) / 0.8)` with `backdrop-filter: blur(16px)` — do not override with hardcoded rgba.

### 8.6 Glyphwind Dot (LED Indicator)

```html
<!-- Sizes -->
<span class="dot dot-sm"></span>   <!-- 4px — default -->
<span class="dot dot-md"></span>   <!-- 6px -->
<span class="dot dot-lg"></span>   <!-- 8px — header REC -->

<!-- Animated pulse -->
<span class="dot dot-sm animate-led"></span>       <!-- 2.4s — standard live -->
<span class="dot dot-lg animate-led-fast"></span>  <!-- 1s — urgent/recording -->

<!-- Color override — inactive states -->
<span class="dot dot-lg bg-ink-subtle"></span>   <!-- offline -->
<span class="dot dot-lg bg-ink-ghost"></span>    <!-- disabled -->

<!-- Pair with label -->
<div class="row-sm">
  <span class="dot dot-sm animate-led"></span>
  <span class="t-label">LIVE</span>
</div>
```

Also available: `.glyphwind-dot`, `.glyphwind-dot-sm/md/lg` (verbose aliases).

Rules: Default color is signal red. Use `bg-ink-subtle` or `bg-ink-ghost` for inactive/disabled. Never decorative.

### 8.7 Data Table

```html
<!-- wrap in .table-wrap for horizontal scroll on mobile -->
<div class="table-wrap">
  <div class="card card-flush">
    <table class="table">
      <thead>
        <tr class="tr-no-border">              <!-- removes top border on first row -->
          <th class="th-inset-l">Service</th>  <!-- first col left inset -->
          <th>Status</th>
          <th class="col-num">Uptime</th>      <!-- right-align numbers -->
          <th class="col-num td-inset-r">Latency</th>  <!-- last col right inset -->
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td-inset-l font-medium">api.example.dev</td>
          <td><span class="badge badge-active"><span class="dot dot-sm"></span> Healthy</span></td>
          <td class="t-mono col-num c-fg">99.98%</td>
          <td class="t-mono col-num c-fg td-inset-r">42 ms</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

No divider lines between rows. Row hover shifts background tonal level automatically.

### 8.8 Toast / Notification

```html
<!-- Default -->
<div class="toast">
  <!-- icon svg -->
  <div>
    <div class="font-medium mb-1">Title</div>
    <div class="t-body-sm c-muted">Supporting message.</div>
  </div>
</div>

<!-- Critical / signal -->
<div class="toast toast-signal">
  <span class="dot dot-md animate-led-fast"></span>
  <div>
    <div class="font-medium c-signal mb-1">Critical Warning</div>
    <div class="t-body-sm c-muted">Alert detail.</div>
  </div>
</div>
```

### 8.9 Glass Panel

```html
<div class="glass" style="padding: 1.5rem;">
  Floating overlay content
</div>
```

Use for: overlays, popovers, floating panels. Requires `backdrop-filter` support.

### 8.10 Section Tag & Labels

```html
<!-- Above section headings -->
<span class="section-tag">Section_01</span>
<h2>Heading</h2>

<!-- General uppercase label utilities -->
<span class="label">Field label</span>      <!-- 10px -->
<span class="label-md">Larger label</span>  <!-- 11px -->
```

---

## 9. Utility Classes

| Class | Effect |
|---|---|
| `.border-ghost` | `1px solid hsl(var(--border))` — ghost border |
| `.shadow-signal` | Red ambient glow at 12% opacity |
| `.backdrop-frosted` | `blur(20px)` backdrop filter |
| `.hover\:surface-shift` | Background shifts to `--surface-high` on hover |
| `.mono-nums` | Space Mono + tabular-nums |
| `.no-select` | Disable text selection |
| `.label` | 10px uppercase tracked label |
| `.label-md` | 11px uppercase tracked label |
| `.radius-sm` | `border-radius: 2px` |
| `.radius-md` | `border-radius: 4px` |
| `.radius-lg` | `border-radius: 6px` |
| `.radius-full` | `border-radius: 9999px` |
| `.transition-fast` | All properties at 80ms + system easing |
| `.transition-default` | All properties at 150ms + system easing |
| `.transition-slow` | All properties at 300ms + system easing |

---

## 10. Layout Primitives

| Class | Effect |
|---|---|
| `.row` | `flex` row, centered, `1rem` gap |
| `.row-sm` | `flex` row, centered, `0.625rem` gap |
| `.row-between` | `flex` row, `space-between` |
| `.stack` | `flex` column |
| `.stack-sm` | `flex` column, `0.5rem` gap |
| `.cluster` | `flex` wrap, `0.75rem` gap |
| `.cluster-sm` | `flex` wrap, `0.625rem` gap |

---

## 11. Dot Pattern

Nothing-inspired dot matrix background. All three properties are CSS custom properties — combine modifiers or override inline.

```html
<!-- Default (ghost dots, 20px gap, 1px) -->
<div class="bg-dots">

<!-- Modifiers — mix freely -->
<div class="bg-dots bg-dots-loose bg-dots-md bg-dots-signal">

<!-- Direct override -->
<div class="bg-dots" style="--dot-gap:24px; --dot-size:2px; --dot-color:hsl(var(--ink-subtle));">
```

**Spacing** (`--dot-gap`): `.bg-dots-tight` 8px · `.bg-dots-dense` 12px · default 20px · `.bg-dots-loose` 32px · `.bg-dots-sparse` 56px

**Size** (`--dot-size`): `.bg-dots-xs` 0.5px · `.bg-dots-sm` 1px · `.bg-dots-md` 1.5px · `.bg-dots-lg` 2px

**Color** (`--dot-color`): `.bg-dots-ghost` · `.bg-dots-subtle` · `.bg-dots-muted` · `.bg-dots-fg` · `.bg-dots-signal`

**Animation** (animates `background-position` — GPU-accelerated, doesn't disturb content):
- `.bg-dots-scroll-x` — scrolls right (seamless loop)
- `.bg-dots-scroll-y` — scrolls down
- `.bg-dots-scroll-diag` — drifts diagonally
- `.bg-dots-pulse` — fades dots in/out (use on separate overlay layer if element has content)
- `.bg-dots-alt` — reverses direction each cycle, combine with any scroll variant
- `.bg-dots-fast` (1.5s) · `.bg-dots-slow` (10s) — or `style="--dot-speed:2s"` for custom speed

---

## 12. Motion Tokens & Transition Utilities

### Timing Tokens

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | `80ms` | Hover, focus, color flips |
| `--duration-default` | `150ms` | State changes, backgrounds |
| `--duration-slow` | `300ms` | Layout shifts, panels |
| `--ease` | `cubic-bezier(0.4, 0, 0.2, 1)` | All transitions — precision deceleration |

### Transition Utility Classes

```html
<!-- Apply to any element needing timed state change -->
<div class="transition-fast">    <!-- background, color, transform, opacity at 80ms  -->
<div class="transition-default"> <!-- same properties at 150ms -->
<div class="transition-slow">    <!-- same properties at 300ms -->
```

### Animation Classes

| Class | Duration | Use |
|---|---|---|
| `.animate-led` | 2.4s ease-in-out infinite | Dot indicator — standard live status |
| `.animate-led-fast` | 1s ease-in-out infinite | Urgent/critical indicator, recording |
| `.animate-fade-up` | 0.18s ease-out | Entrance for toasts, dropdowns |
| `.animate-scale-in` | 0.15s ease-out | Modals, popovers, scale entrances |

Motion rules:
- Maximum duration: 300ms for UI transitions; 2.4s only for idle ambient loops
- No bounce or spring easing — use `--ease` (`cubic-bezier(0.4, 0, 0.2, 1)`)
- Entrance animations must be subtle: max 6px Y-travel, max 3% scale
- Only animate `transform` and `opacity` — never `width`, `height`, `padding`, `margin`

---

## 13. Elevation System (No Shadows)

Glyphwind uses tonal layering instead of shadows. Each surface level is a slightly lighter/darker grey.

```
Dark mode (bottom → top):
void (#000) → surface-low (#0E0E0E) → surface-card (#1B1B1B) → surface-high (#1F1F1F) → surface-highest (#242424)

Light mode (bottom → top):
surface (#FCFCFC) → surface-low (#F6F3F2) → surface-card (#FFFFFF) → surface-high (#E8E5E4) → surface-highest (#E5E2E1)
```

To imply "floating" use `card-float`. Never use `shadow-md`, `shadow-lg`, or drop shadows.

---

## 14. Framework Integration

### React / Vite

> **Important:** Modern Vite projects use `"type": "module"` in `package.json`. Because Glyphwind's `tailwind.config.js` uses CommonJS (`module.exports`), you **must rename the copied file to `tailwind.config.cjs`** so that Tailwind and the shadcn CLI can read it correctly.

```js
// 1. Copy Glyphwind's tailwind.config.js → project root as tailwind.config.cjs
// 2. Change your `components.json` to point to "tailwind.config.cjs" if using shadcn
// 3. main.tsx or index.css
import './globals.css'
```

### Next.js (App Router)

```js
// app/layout.tsx
import './globals.css'
// tailwind.config.js — replace with Glyphwind version
```

### shadcn/ui

Run `npx shadcn-ui@latest init`, then replace the generated `globals.css` and `tailwind.config.js` with Glyphwind versions. All shadcn CSS variable names are preserved — components work without modification.

### React Aria

React Aria components are unstyled primitives. Apply Glyphwind classes via `className`:

```tsx
import { Button } from 'react-aria-components'

<Button className="btn btn-primary">Save</Button>
<Button className="btn btn-secondary btn-icon" aria-label="Settings">
  <SettingsIcon />
</Button>
```

### Vue / Nuxt

```js
// nuxt.config.ts
css: ['~/assets/globals.css']
// tailwind.config.js — replace with Glyphwind version
```

### Plain HTML (CDN)

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Doto:wght@100..900&display=swap" rel="stylesheet" />
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
          mono: ['Space Mono', 'monospace'],
          dot:  ['Doto', 'Space Mono', 'monospace'],
        },
        // ... rest of token extensions
      }
    }
  }
</script>
<!-- Inline or link globals.css -->
```

---

## 15. Rules — What NOT to Do

| ❌ Do not | ✓ Instead |
|---|---|
| Hardcode `#000000`, `#1B1B1B`, `#FF4132` | Use `hsl(var(--surface))`, `hsl(var(--signal))` |
| Use `rgba(var(--token-rgb, fallback), 0.8)` | Use `color-mix(in srgb, hsl(var(--token)) 80%, transparent)` |
| Use `.radius-full` on containers | Max `.radius-lg` (6px) for structural elements |
| Use `shadow-md`, `shadow-lg` (drop shadows) | Use `card-float` or tonal surface shift |
| Use gradients | Never. Vignettes only if absolutely required |
| Use signal red decoratively | Only for LED dot, destructive actions, critical states |
| Use Doto font for body copy or nav | Only clocks, counters, build stamps, display headlines |
| Use `<hr>` dividers | Use spacing or background tonal shift |
| Use 100% opaque borders | Use `hsl(var(--border))` — already semi-transparent |
| Add pill shapes to cards/modals | Max 4px radius for containers |
| Use bounce/spring easing | Use `--ease` cubic-bezier |
| Put icon buttons without accessible labels | Always include `title` attribute or `aria-label` |
| Lower opacity for hover states | Shift background to next surface level (`--surface-high`) |
| Use decorative animation | Motion only for state changes: hover, loading, success, error |
| Animate width, height, padding, margin | Only animate `transform` and `opacity` |

---

## 16. Quick Component Checklist

When generating a new component with Glyphwind:

- [ ] All colors via CSS custom properties — no hardcoded hex
- [ ] Background is a surface token (`--surface`, `--surface-card`, etc.)
- [ ] Text is an ink token (`--foreground`, `--ink-muted`, etc.)
- [ ] Border uses `hsl(var(--border))` or ghost box-shadow
- [ ] Semi-transparent backgrounds use `color-mix()`, not `rgba(var(...))`
- [ ] Numbers/data use `.t-mono` or `.mono-nums`
- [ ] Hover state shifts to next surface level, not opacity change
- [ ] Radius ≤ `.radius-lg` (6px) for containers; buttons are 3px (baked into `.btn`)
- [ ] No drop shadows — use `card-float` or tonal shift only
- [ ] Signal red <1% of screen area
- [ ] Dot Display (Doto) only if it's a clock/counter/metric/stamp
- [ ] Transitions use `.transition-fast/default/slow` or token values
- [ ] Entrances use `.animate-fade-up` or `.animate-scale-in`
- [ ] Icon-only buttons have `title` or `aria-label`
- [ ] Works in both light and dark mode without hardcoded values
