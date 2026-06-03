# Dark Mode — Comprehensive Implementation Guide

Expanded dark mode patterns, color schemes, accessibility, and implementation examples.

**Version:** 1.5.0
**Last updated:** 2026-06-03 (v1.6.3)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Color Schemes](#2-color-schemes)
3. [Implementation Patterns](#3-implementation-patterns)
4. [Accessibility](#4-accessibility)
5. [Component Patterns](#5-component-patterns)
6. [Theme Presets](#6-theme-presets)
7. [Tailwind v4 Dark Mode](#7-tailwind-v4-dark-mode)

---

## 1. Overview

### What is Dark Mode?

Dark mode inverts the visual hierarchy of an interface — light text on dark backgrounds instead of dark text on light backgrounds. This creates:

- **Reduced eye strain** in low-light environments
- **Lower power consumption** on OLED screens
- **Improved readability** for some users
- **Aesthetic option** for user preference

### Dark Mode Considerations

| Consideration | Description |
|--------------|-------------|
| **Contrast ratios** | Must maintain WCAG AA (4.5:1 for text) |
| **Saturation** | Colors may appear more vivid in dark mode |
| **Elevation** | Use lighter shades for elevated surfaces |
| **Focus states** | Ensure focus indicators remain visible |
| **Images/Icons** | May need separate dark versions |
| **Brand colors** | May need adjustment for dark backgrounds |

---

## 2. Color Schemes

### Scheme 1: Slate Dark (Recommended)

```css
/* Light Mode */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 217 91% 60%;
}

/* Dark Mode (Slate) */
[data-theme="dark"] {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --card: 222 47% 14%;
  --card-foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 217 19% 27%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217 19% 27%;
  --muted-foreground: 215 20% 65%;
  --accent: 217 19% 27%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62% 50%;
  --destructive-foreground: 0 0% 100%;
  --border: 217 19% 27%;
  --input: 217 19% 27%;
  --ring: 217 91% 60%;
}
```

### Scheme 2: Zinc Dark

```css
/* Light Mode */
:root {
  --background: 0 0% 100%;
  --foreground: 240 5% 17%;
  --card: 0 0% 100%;
  --card-foreground: 240 5% 17%;
  --primary: 240 4% 46%;
  --primary-foreground: 0 0% 100%;
  --secondary: 240 5% 96%;
  --secondary-foreground: 240 5% 17%;
  --muted: 240 5% 96%;
  --muted-foreground: 240 4% 46%;
  --accent: 240 5% 96%;
  --accent-foreground: 240 5% 17%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --border: 240 6% 90%;
  --input: 240 6% 90%;
  --ring: 240 4% 46%;
}

/* Dark Mode (Zinc) */
[data-theme="dark"] {
  --background: 240 6% 10%;
  --foreground: 240 5% 98%;
  --card: 240 6% 12%;
  --card-foreground: 240 5% 98%;
  --primary: 240 5% 64%;
  --primary-foreground: 0 0% 100%;
  --secondary: 240 4% 20%;
  --secondary-foreground: 240 5% 98%;
  --muted: 240 4% 20%;
  --muted-foreground: 240 4% 64%;
  --accent: 240 4% 20%;
  --accent-foreground: 240 5% 98%;
  --destructive: 0 62% 40%;
  --destructive-foreground: 0 0% 100%;
  --border: 240 4% 20%;
  --input: 240 4% 20%;
  --ring: 240 5% 64%;
}
```

### Scheme 3: Blue Dark (Tech/SaaS)

```css
/* Light Mode */
:root {
  --background: 199 89% 97%;
  --foreground: 221 83% 8%;
  --card: 0 0% 100%;
  --card-foreground: 221 83% 8%;
  --primary: 199 89% 48%;
  --primary-foreground: 0 0% 100%;
  --secondary: 214 76% 96%;
  --secondary-foreground: 221 83% 8%;
  --muted: 214 76% 96%;
  --muted-foreground: 215 16% 47%;
  --accent: 214 76% 96%;
  --accent-foreground: 221 83% 8%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --border: 214 76% 91%;
  --input: 214 76% 91%;
  --ring: 199 89% 48%;
}

/* Dark Mode (Blue) */
[data-theme="dark"] {
  --background: 222 47% 6%;
  --foreground: 210 40% 98%;
  --card: 222 47% 10%;
  --card-foreground: 210 40% 98%;
  --primary: 199 89% 55%;
  --primary-foreground: 0 0% 100%;
  --secondary: 217 27% 17%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217 27% 17%;
  --muted-foreground: 215 20% 55%;
  --accent: 217 27% 17%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62% 45%;
  --destructive-foreground: 0 0% 100%;
  --border: 217 27% 20%;
  --input: 217 27% 20%;
  --ring: 199 89% 55%;
}
```

### Scheme 4: Emerald Dark (Nature/Growth)

```css
/* Light Mode */
:root {
  --background: 160 60% 96%;
  --foreground: 160 30% 10%;
  --card: 0 0% 100%;
  --card-foreground: 160 30% 10%;
  --primary: 142 70% 45%;
  --primary-foreground: 0 0% 100%;
  --secondary: 160 40% 92%;
  --secondary-foreground: 160 30% 10%;
  --muted: 160 40% 92%;
  --muted-foreground: 160 15% 40%;
  --accent: 160 40% 92%;
  --accent-foreground: 160 30% 10%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --border: 160 30% 88%;
  --input: 160 30% 88%;
  --ring: 142 70% 45%;
}

/* Dark Mode (Emerald) */
[data-theme="dark"] {
  --background: 160 50% 6%;
  --foreground: 160 30% 98%;
  --card: 160 50% 10%;
  --card-foreground: 160 30% 98%;
  --primary: 142 70% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 160 40% 15%;
  --secondary-foreground: 160 30% 98%;
  --muted: 160 40% 15%;
  --muted-foreground: 160 20% 60%;
  --accent: 160 40% 15%;
  --accent-foreground: 160 30% 98%;
  --destructive: 0 62% 45%;
  --destructive-foreground: 0 0% 100%;
  --border: 160 40% 18%;
  --input: 160 40% 18%;
  --ring: 142 70% 50%;
}
```

### Scheme 5: Violet Dark (Creative/Premium)

```css
/* Light Mode */
:root {
  --background: 270 50% 97%;
  --foreground: 280 60% 10%;
  --card: 0 0% 100%;
  --card-foreground: 280 60% 10%;
  --primary: 270 70% 55%;
  --primary-foreground: 0 0% 100%;
  --secondary: 270 40% 94%;
  --secondary-foreground: 280 60% 10%;
  --muted: 270 40% 94%;
  --muted-foreground: 270 20% 45%;
  --accent: 270 40% 94%;
  --accent-foreground: 280 60% 10%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --border: 270 30% 90%;
  --input: 270 30% 90%;
  --ring: 270 70% 55%;
}

/* Dark Mode (Violet) */
[data-theme="dark"] {
  --background: 280 40% 6%;
  --foreground: 270 50% 98%;
  --card: 280 40% 10%;
  --card-foreground: 270 50% 98%;
  --primary: 270 75% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 280 35% 15%;
  --secondary-foreground: 270 50% 98%;
  --muted: 280 35% 15%;
  --muted-foreground: 270 25% 60%;
  --accent: 280 35% 15%;
  --accent-foreground: 270 50% 98%;
  --destructive: 0 62% 45%;
  --destructive-foreground: 0 0% 100%;
  --border: 280 35% 20%;
  --input: 280 35% 20%;
  --ring: 270 75% 60%;
}
```

---

## 3. Implementation Patterns

### Pattern A: CSS media query (Automatic)

```css
/* Light mode as default */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  /* ... */
}

/* Dark mode based on system preference */
@media (prefers-color-scheme: dark) {
  :root {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    --primary: 217 91% 60%;
    /* ... */
  }
}
```

### Pattern B: Class-based toggle

```css
/* Light mode */
.light {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  /* ... */
}

/* Dark mode */
.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  /* ... */
}
```

```tsx
// React toggle
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={isDark ? 'dark' : 'light'}
    >
      Toggle Theme
    </button>
  );
}
```

### Pattern C: data-theme attribute (Best practice)

```css
/* Light mode */
[data-theme="light"] {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  /* ... */
}

/* Dark mode */
[data-theme="dark"] {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  /* ... */
}
```

```tsx
// React with localStorage
function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

### Pattern D: CSS color-mix (Automatic with manual override)

```css
:root {
  /* Base hue values */
  --hue-primary: 217;
  --sat-primary: 91%;
  --light-primary: 60%;
  
  /* Light mode (default) */
  --primary: hsl(var(--hue-primary) var(--sat-primary) var(--light-primary));
  --primary-foreground: 0 0% 100%;
}

/* Dark mode with color-mix */
@media (prefers-color-scheme: dark) {
  :root {
    --primary: color-mix(in oklch, 
      hsl(var(--hue-primary) var(--sat-primary) var(--light-primary)),
      hsl(0 0% 0%) 30%
    );
    --primary-foreground: 0 0% 100%;
  }
}
```

---

## 4. Accessibility

### Contrast Requirements

| Element | WCAG AA | WCAG AAA |
|---------|---------|----------|
| Normal text | 4.5:1 | 7:1 |
| Large text (18px+) | 3:1 | 4.5:1 |
| UI components | 3:1 | N/A |

### Testing Checklist

```bash
# Use browser DevTools to check contrast
# Chrome: Inspect element → Computed → color

# Use axe-core for automated testing
npx playwright install chromium
npx playwright test --grep "a11y"
```

### Focus Visibility in Dark Mode

```css
/* Always visible focus in dark mode */
.dark [tabindex]:focus-visible,
.dark button:focus-visible,
.dark a:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Ensure ring color works on dark backgrounds */
.dark {
  --ring: 217 91% 60%; /* Bright blue for visibility */
}
```

### Reduced Motion

```css
/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode with reduced motion */
@media (prefers-color-scheme: dark) {
  :root {
    /* Instant theme switch, no transition */
    --theme-transition: none;
  }
}
```

### High Contrast Mode Support

```css
/* Support Windows High Contrast Mode */
@media (forced-colors: active) {
  .dark {
    --background: Canvas;
    --foreground: CanvasText;
    --primary: LinkText;
    --border: ButtonBorder;
  }
  
  /* Keep essential elements visible */
  .dark button,
  .dark input {
    forced-color-adjust: none;
  }
}
```

---

## 5. Component Patterns

### Button States (Dark Mode)

```css
/* Light Mode */
.btn-primary {
  background: hsl(217 91% 60%);
  color: hsl(0 0% 100%);
  border: 1px solid transparent;
}

.btn-primary:hover {
  background: hsl(217 91% 50%);
}

.btn-primary:focus-visible {
  outline: 2px solid hsl(217 91% 60%);
  outline-offset: 2px;
}

/* Dark Mode */
[data-theme="dark"] .btn-primary {
  background: hsl(217 91% 65%);
  color: hsl(0 0% 100%);
}

[data-theme="dark"] .btn-primary:hover {
  background: hsl(217 91% 55%);
}
```

### Card Patterns (Dark Mode)

```css
/* Light Mode */
.card {
  background: hsl(0 0% 100%);
  border: 1px solid hsl(214 32% 91%);
  color: hsl(222 47% 11%);
}

/* Dark Mode */
[data-theme="dark"] .card {
  background: hsl(222 47% 14%);
  border: 1px solid hsl(217 19% 27%);
  color: hsl(210 40% 98%);
}

/* Elevated card (more contrast) */
[data-theme="dark"] .card-elevated {
  background: hsl(222 47% 18%);
  border: 1px solid hsl(217 19% 25%);
}
```

### Input Patterns (Dark Mode)

```css
/* Light Mode */
.input {
  background: hsl(0 0% 100%);
  border: 1px solid hsl(214 32% 91%);
  color: hsl(222 47% 11%);
}

.input::placeholder {
  color: hsl(215 16% 47%);
}

.input:focus {
  border-color: hsl(217 91% 60%);
  outline: none;
  box-shadow: 0 0 0 2px hsl(217 91% 60% / 0.2);
}

/* Dark Mode */
[data-theme="dark"] .input {
  background: hsl(222 47% 14%);
  border: 1px solid hsl(217 19% 27%);
  color: hsl(210 40% 98%);
}

[data-theme="dark"] .input::placeholder {
  color: hsl(215 20% 65%);
}

[data-theme="dark"] .input:focus {
  border-color: hsl(217 91% 60%);
  box-shadow: 0 0 0 2px hsl(217 91% 60% / 0.3);
}
```

### Navigation Patterns (Dark Mode)

```css
/* Light Mode */
.nav {
  background: hsl(0 0% 100%);
  border-bottom: 1px solid hsl(214 32% 91%);
}

.nav-link {
  color: hsl(222 47% 11%);
}

.nav-link:hover {
  background: hsl(210 40% 96%);
}

/* Dark Mode */
[data-theme="dark"] .nav {
  background: hsl(222 47% 11%);
  border-bottom: 1px solid hsl(217 19% 27%);
}

[data-theme="dark"] .nav-link {
  color: hsl(210 40% 98%);
}

[data-theme="dark"] .nav-link:hover {
  background: hsl(217 19% 27%);
}
```

### Glass/Transparency in Dark Mode

```css
/* Light Mode (light glass) */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Dark Mode (dark glass) */
[data-theme="dark"] .glass {
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 6. Theme Presets

### Midnight Theme

```css
[data-theme="midnight"] {
  --background: 240 10% 5%;
  --foreground: 240 5% 98%;
  --card: 240 10% 8%;
  --card-foreground: 240 5% 98%;
  --primary: 199 89% 55%;
  --primary-foreground: 0 0% 100%;
  --secondary: 240 10% 15%;
  --secondary-foreground: 240 5% 98%;
  --muted: 240 10% 15%;
  --muted-foreground: 240 4% 55%;
  --accent: 240 10% 15%;
  --accent-foreground: 240 5% 98%;
  --destructive: 0 62% 50%;
  --destructive-foreground: 0 0% 100%;
  --border: 240 10% 18%;
  --input: 240 10% 18%;
  --ring: 199 89% 55%;
}
```

### Forest Theme

```css
[data-theme="forest"] {
  --background: 160 60% 8%;
  --foreground: 160 30% 96%;
  --card: 160 60% 12%;
  --card-foreground: 160 30% 96%;
  --primary: 142 70% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 160 50% 15%;
  --secondary-foreground: 160 30% 96%;
  --muted: 160 50% 15%;
  --muted-foreground: 160 25% 60%;
  --accent: 160 50% 15%;
  --accent-foreground: 160 30% 96%;
  --destructive: 0 62% 50%;
  --destructive-foreground: 0 0% 100%;
  --border: 160 50% 20%;
  --input: 160 50% 20%;
  --ring: 142 70% 50%;
}
```

### Sunset Theme

```css
[data-theme="sunset"] {
  --background: 30 100% 97%;
  --foreground: 30 10% 10%;
  --card: 0 0% 100%;
  --card-foreground: 30 10% 10%;
  --primary: 25 95% 55%;
  --primary-foreground: 0 0% 100%;
  --secondary: 30 80% 94%;
  --secondary-foreground: 30 10% 10%;
  --muted: 30 80% 94%;
  --muted-foreground: 30 10% 40%;
  --accent: 30 80% 94%;
  --accent-foreground: 30 10% 10%;
  --destructive: 0 72% 50%;
  --destructive-foreground: 0 0% 100%;
  --border: 30 40% 88%;
  --input: 30 40% 88%;
  --ring: 25 95% 55%;
}
```

### Ocean Theme

```css
[data-theme="ocean"] {
  --background: 210 50% 5%;
  --foreground: 210 40% 98%;
  --card: 210 50% 10%;
  --card-foreground: 210 40% 98%;
  --primary: 195 90% 55%;
  --primary-foreground: 210 50% 5%;
  --secondary: 210 40% 15%;
  --secondary-foreground: 210 40% 98%;
  --muted: 210 40% 15%;
  --muted-foreground: 210 30% 60%;
  --accent: 210 40% 15%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62% 50%;
  --destructive-foreground: 0 0% 100%;
  --border: 210 40% 20%;
  --input: 210 40% 20%;
  --ring: 195 90% 55%;
}
```

---

## 7. Tailwind v4 Dark Mode

> ⚠️ **Important:** The configuration below is for **Tailwind v3**. For Tailwind v4, use CSS-first configuration.

### Tailwind v3 Configuration (Legacy)

```css
/* tailwind.config.js */
module.exports = {
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        /* ... */
      },
    },
  },
}
```

### Tailwind v4 Configuration (Current)

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Light mode colors */
  --color-background: 0 0% 100%;
  --color-foreground: 222 47% 11%;
  --color-primary: 217 91% 60%;
  
  /* Dark mode via color-scheme */
  --color-scheme: light dark;
}

/* Dark mode toggle class */
.dark {
  color-scheme: dark;
}

/* Or use media query */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: 222 47% 11%;
    --color-foreground: 210 40% 98%;
    --color-primary: 217 91% 65%;
  }
}
```

### Usage with Tailwind

```html
<!-- Light mode (default) -->
<div class="bg-background text-foreground">
  <button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
    Primary
  </button>
</div>

<!-- Dark mode (add 'dark' class to html) -->
<html class="dark">
  <div class="bg-background text-foreground">
    <button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
      Primary
    </button>
  </div>
</html>
```

### Tailwind Dark Mode Variants

```html
<!-- Apply dark mode styles conditionally -->
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
  Adaptive text
</div>

<!-- Hover states -->
<button class="
  bg-blue-600 hover:bg-blue-700
  dark:bg-blue-500 dark:hover:bg-blue-600
">
  Adaptive button
</button>

<!-- Focus states -->
<button class="
  bg-blue-600 focus:ring-blue-500
  dark:bg-blue-500 dark:focus:ring-blue-400
">
  Focus adaptive
</button>
```

### Tailwind with CSS Variables

```css
/* Define CSS variables in both themes */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 217 91% 60%;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --primary: 217 91% 60%;
}

/* Use Tailwind's ring utilities */
button {
  @apply bg-primary text-white ring-offset-background;
}

button:focus-visible {
  @apply outline-none ring-2 ring-primary ring-offset-2;
}

/* Dark mode auto-applies with class strategy */
.dark button {
  @apply ring-offset-background-dark;
}
```

---

## Checklist

- [ ] Define all semantic tokens for both modes
- [ ] Test contrast ratios (4.5:1 minimum)
- [ ] Verify focus states visible
- [ ] Check images/icons for dark mode compatibility
- [ ] Test reduced motion preference
- [ ] Support system preference (prefers-color-scheme)
- [ ] Persist user preference in localStorage
- [ ] Test with color blindness simulation
- [ ] Verify elevated surfaces use lighter shades
- [ ] Test high contrast mode

---

Last updated: 2026-06-03 (v1.6.3)