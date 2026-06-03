# Theme Builder — Interactive Design System Configuration

Guide for building custom theme systems using CSS custom properties and Tailwind v4. Generate color palettes, typography scales, spacing systems, and export production-ready CSS.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Color Palette](#2-color-palette)
3. [Typography System](#3-typography-system)
4. [Spacing Scale](#4-spacing-scale)
5. [Border & Radius](#5-border--radius)
6. [Shadow System](#6-shadow-system)
7. [Dark Mode](#7-dark-mode)
8. [Component Tokens](#8-component-tokens)
9. [Tailwind v4 Integration](#9-tailwind-v4-integration)
10. [Export & Output](#10-export--output)

---

## 1. Overview

### Theme Architecture

```
Theme System
├── Color Palette (hues, scales, semantic colors)
├── Typography (font sizes, weights, line heights)
├── Spacing (scale values, component-specific)
├── Border & Radius (sizes, widths)
├── Shadows (elevation levels)
└── Semantic Tokens (semantic meaning → implementation)
```

### CSS Custom Properties Structure

```css
:root {
  /* ═══════════════════════════════════════════════════
     COLOR TOKENS (Generated from palette)
     ═══════════════════════════════════════════════════ */
  
  /* Hue: 220 (Blue) */
  --color-blue-50: #eff6ff;
  --color-blue-100: #dbeafe;
  --color-blue-200: #bfdbfe;
  --color-blue-300: #93c5fd;
  --color-blue-400: #60a5fa;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4-ed8;
  --color-blue-800: #1e40af;
  --color-blue-900: #1e3a8a;
  --color-blue-950: #172554;

  /* ═══════════════════════════════════════════════════
     SEMANTIC TOKENS (Used in components)
     ═══════════════════════════════════════════════════ */
  
  --color-background: var(--color-white);
  --color-foreground: var(--color-gray-900);
  --color-primary: var(--color-blue-600);
  --color-primary-foreground: var(--color-white);
  --color-secondary: var(--color-gray-100);
  --color-secondary-foreground: var(--color-gray-900);
  --color-muted: var(--color-gray-100);
  --color-muted-foreground: var(--color-gray-500);
  --color-accent: var(--color-gray-100);
  --color-accent-foreground: var(--color-gray-900);
  --color-destructive: var(--color-red-600);
  --color-destructive-foreground: var(--color-white);
  --color-border: var(--color-gray-200);
  --color-ring: var(--color-blue-600);
}
```

---

## 2. Color Palette

### Step 1: Choose Base Hue(s)

```
Primary Hue: 220 (Blue) — Most common choice for tech/web
              ↓
Alternative Hues:
  0 (Red)     — Destructive, alerts
  25 (Orange) — Warning, energy
  145 (Green) — Success, growth
  270 (Purple) — Creative, premium
  185 (Teal)  — Medical, trust
```

### Step 2: Generate White/Black Scale

```css
/* White scale (tint) */
--color-white: #ffffff;
--color-slate-50: #f8fafc;
--color-slate-100: #f1f5f9;
--color-slate-200: #e2e8f0;

/* Black scale (shade) */
--color-slate-800: #1e293b;
--color-slate-900: #0f172a;
--color-slate-950: #020617;
--color-black: #000000;
```

### Step 3: Choose Gray Hue

| Gray Type | Best For | Avoid When |
|-----------|----------|------------|
| **Neutral (0°)** | Professional, corporate | Warm contexts |
| **Cool Gray (215°)** | Tech, SaaS | Healthcare, wellness |
| **Warm Gray (30°)** | Editorial, luxury | Tech, modern |
| **Slate (215°)** | Modern UI, dashboards | N/A (very versatile) |

### Step 4: Generate Full Palette (Example: Slate + Blue)

```css
/* ═══════════════════════════════════════════════════════════════════
   SLATE (Gray) — 11 steps
   ═══════════════════════════════════════════════════════════════════ */
:root {
  --slate-50: #f8fafc;
  --slate-100: #f1f5f9;
  --slate-200: #e2e8f0;
  --slate-300: #cbd5e1;
  --slate-400: #94a3b8;
  --slate-500: #64748b;
  --slate-600: #475569;
  --slate-700: #334155;
  --slate-800: #1e293b;
  --slate-900: #0f172a;
  --slate-950: #020617;
}

/* ═══════════════════════════════════════════════════════════════════
   BLUE (Primary) — 11 steps
   ═══════════════════════════════════════════════════════════════════ */
:root {
  --blue-50: #eff6ff;
  --blue-100: #dbeafe;
  --blue-200: #bfdbfe;
  --blue-300: #93c5fd;
  --blue-400: #60a5fa;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  --blue-800: #1e40af;
  --blue-900: #1e3a8a;
  --blue-950: #172554;
}

/* ═══════════════════════════════════════════════════════════════════
   RED (Destructive) — 11 steps
   ═══════════════════════════════════════════════════════════════════ */
:root {
  --red-50: #fef2f2;
  --red-100: #fee2e2;
  --red-200: #fecaca;
  --red-300: #fca5a5;
  --red-400: #f87171;
  --red-500: #ef4444;
  --red-600: #dc2626;
  --red-700: #b91c1c;
  --red-800: #991b1b;
  --red-900: #7f1d1d;
  --red-950: #450a0a;
}

/* ═══════════════════════════════════════════════════════════════════
   GREEN (Success) — 11 steps
   ═══════════════════════════════════════════════════════════════════ */
:root {
  --green-50: #f0fdf4;
  --green-100: #dcfce7;
  --green-200: #bbf7d0;
  --green-300: #86efac;
  --green-400: #4ade80;
  --green-500: #22c55e;
  --green-600: #16a34a;
  --green-700: #15803d;
  --green-800: #166534;
  --green-900: #14532d;
  --green-950: #052e16;
}

/* ═══════════════════════════════════════════════════════════════════
   AMBER (Warning) — 11 steps
   ═══════════════════════════════════════════════════════════════════ */
:root {
  --amber-50: #fffbeb;
  --amber-100: #fef3c7;
  --amber-200: #fde68a;
  --amber-300: #fcd34d;
  --amber-400: #fbbf24;
  --amber-500: #f59e0b;
  --amber-600: #d97706;
  --amber-700: #b45309;
  --amber-800: #92400e;
  --amber-900: #78350f;
  --amber-950: #451a03;
}
```

### Step 5: Define Semantic Tokens

```css
:root {
  /* Background & Foreground */
  --background: 0 0% 100%;           /* hsl(0, 0%, 100%) */
  --foreground: 222 47% 11%;         /* hsl(222, 47%, 11%) */

  /* Primary — Blue */
  --primary: 217 91% 60%;             /* hsl(217, 91%, 60%) = #3b82f6 */
  --primary-foreground: 0 0% 100%;

  /* Secondary — Slate */
  --secondary: 210 40% 96%;           /* hsl(210, 40%, 96.1%) */
  --secondary-foreground: 222 47% 11%;

  /* Muted */
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;

  /* Accent */
  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;

  /* Destructive — Red */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  /* Success — Green */
  --success: 142 71% 45%;
  --success-foreground: 0 0% 100%;

  /* Warning — Amber */
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 0%;

  /* Border & Input */
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 217 91% 60%;

  /* Card */
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;

  /* Popover */
  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;
}
```

---

## 3. Typography System

### Font Selection Decision Tree

```
    ┌─────────────────────────────┐
    │  What's the primary use?   │
    └─────────────┬───────────────┘
                  │
      ┌───────────┼───────────┐
      ▼           ▼           ▼
   ┌──────┐  ┌───────┐  ┌───────┐
   │  Text/Body  │  UI/Interface │  Display/Brand │
   └──────┘  └───────┘  └───────┘
       │           │           │
       ▼           ▼           ▼
   ┌───────────┐  ┌─────────┐  ┌──────────┐
   │  Serif or │  │ Clean   │  │ Display  │
   │  Grotesque│  │ Sans    │  │ or Mono  │
   └───────────┘  └─────────┘  └──────────┘
```

### Recommended Font Pairings

```css
:root {
  /* ─────────────────────────────────────────────────────────────
     HEADING + BODY PAIRINGS
     ───────────────────────────────────────────────────────────── */
  
  /* 1. Inter + Inter (Modern, Clean) */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-heading: 'Inter', system-ui, sans-serif;
  
  /* 2. Geist + Geist (Vercel-style) */
  --font-sans: 'Geist', system-ui, sans-serif;
  --font-heading: 'Geist', system-ui, sans-serif;
  
  /* 3. DM Sans + DM Sans (Friendly, Rounded) */
  --font-sans: 'DM Sans', system-ui, sans-serif;
  --font-heading: 'DM Sans', system-ui, sans-serif;
  
  /* 4. Outfit + Outfit (Geometric, Modern) */
  --font-sans: 'Outfit', system-ui, sans-serif;
  --font-heading: 'Outfit', system-ui, sans-serif;
  
  /* 5. Playfair Display + Source Sans 3 (Editorial) */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-sans: 'Source Sans 3', system-ui, sans-serif;

  /* ─────────────────────────────────────────────────────────────
     MONOSPACE
     ───────────────────────────────────────────────────────────── */
  
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Type Scale (Tailwind v4 Defaults)

```css
:root {
  /* Font Size → Line Height → Letter Spacing */
  --text-xs:   0.75rem;    /* 12px */   --leading-xs:   1rem;       /* 16px */
  --text-sm:   0.875rem;   /* 14px */   --leading-sm:   1.25rem;    /* 20px */
  --text-base: 1rem;       /* 16px */   --leading-base: 1.5rem;     /* 24px */
  --text-lg:   1.125rem;   /* 18px */   --leading-lg:   1.75rem;    /* 28px */
  --text-xl:   1.25rem;    /* 20px */   --leading-xl:   1.75rem;    /* 28px */
  --text-2xl:  1.5rem;     /* 24px */   --leading-2xl:  2rem;       /* 32px */
  --text-3xl:  1.875rem;   /* 30px */   --leading-3xl:  2.25rem;    /* 36px */
  --text-4xl:  2.25rem;    /* 36px */   --leading-4xl:  2.5rem;     /* 40px */
  --text-5xl:  3rem;       /* 48px */   --leading-5xl:  1.2;        /* tight */
  --text-6xl:  3.75rem;    /* 60px */   --leading-6xl:  1.1;        /* tighter */
  --text-7xl:  4.5rem;     /* 72px */   --leading-7xl:  1.1;
  --text-8xl:  6rem;       /* 96px */   --leading-8xl:  1;
  --text-9xl:  8rem;       /* 128px */  --leading-9xl:  0.9;

  /* Font Weight */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### Variable Fonts (with font-variation-settings)

> ⚠️ **IMPORTANT:** Variable fonts require `font-variation-settings` for axis control, not CSS custom properties in `font-family`.

```css
:root {
  /* ─────────────────────────────────────────────────────────────
     VARIABLE FONT — Correct approach
     ───────────────────────────────────────────────────────────── */
  
  /* Font-family only declares the font */
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  
  /* For variable fonts, use @font-face with font-variation-settings */
}

/* @font-face declaration for variable fonts */
@font-face {
  font-family: 'Inter Variable';
  font-display: swap;
  font-weight: 100 900;
  font-named-instance: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2');
}

/* Usage with CSS custom properties for static weights */
.weight-regular { font-variation-settings: 'wght' 400; }
.weight-medium  { font-variation-settings: 'wght' 500; }
.weight-semibold  { font-variation-settings: 'wght' 600; }
.weight-bold    { font-variation-settings: 'wght' 700; }
```

---

## 4. Spacing Scale

### Base Spacing Values

```css
:root {
  /* ═══════════════════════════════════════════════════
     SPACING SCALE (4px base unit)
     Uses px for precision, rem for accessibility
     ═══════════════════════════════════════════════════ */
  
  --space-0: 0px;
  --space-px: 1px;
  
  --space-0-5: 0.125rem;   /* 2px */
  --space-1: 0.25rem;      /* 4px */
  --space-1-5: 0.375rem;   /* 6px */
  --space-2: 0.5rem;       /* 8px */
  --space-2_5: 0.625rem;   /* 10px */
  --space-3: 0.75rem;      /* 12px */
  --space-3_5: 0.875rem;   /* 14px */
  --space-4: 1rem;         /* 16px */
  --space-5: 1.25rem;      /* 20px */
  --space-6: 1.5rem;       /* 24px */
  --space-7: 1.75rem;      /* 28px */
  --space-8: 2rem;         /* 32px */
  --space-9: 2.25rem;      /* 36px */
  --space-10: 2.5rem;     /* 40px */
  --space-11: 2.75rem;     /* 44px */
  --space-12: 3rem;        /* 48px */
  --space-14: 3.5rem;      /* 56px */
  --space-16: 4rem;        /* 64px */
  --space-20: 5rem;        /* 80px */
  --space-24: 6rem;        /* 96px */
  --space-28: 7rem;        /* 112px */
  --space-32: 8rem;        /* 128px */
  --space-36: 9rem;        /* 144px */
  --space-40: 10rem;       /* 160px */
  --space-44: 11rem;      /* 176px */
  --space-48: 12rem;       /* 192px */
  --space-52: 13rem;      /* 208px */
  --space-56: 14rem;      /* 224px */
  --space-60: 15rem;      /* 240px */
  --space-64: 16rem;      /* 256px */
  --space-72: 18rem;      /* 288px */
  --space-80: 20rem;      /* 320px */
  --space-96: 24rem;      /* 384px */

  /* ─────────────────────────────────────────────────────────────
     SEMANTIC SPACING (Component-specific)
     ───────────────────────────────────────────────────────────── */
  
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;

  --sidebar-width: 280px;
  --header-height: 64px;
}
```

---

## 5. Border & Radius

### Border Widths

```css
:root {
  /* Border Width */
  --border-widths-0: 0px;
  --border-widths-1: 1px;
  --border-widths-2: 2px;
  --border-widths-4: 4px;
  --border-widths-8: 8px;

  /* Default border-color */
  --border: var(--color-slate-200);
  --border-input: var(--color-slate-300);
}
```

### Border Radius

```css
:root {
  /* ═══════════════════════════════════════════════════
     BORDER RADIUS (8px base unit)
     ═══════════════════════════════════════════════════ */
  
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px — subtle rounding */
  --radius: 0.375rem; /* 6px — default */
  --radius-md: 0.5rem;     /* 8px — card padding */
  --radius-lg: 0.75rem;    /* 12px — buttons, inputs */
  --radius-xl: 1rem;       /* 16px — modals */
  --radius-2xl: 1.5rem;   /* 24px — large cards */
  --radius-3xl: 2rem;     /* 32px — featured sections */
  
  /* Full radius (pills, avatars) */
  --radius-full: 9999px;

  /* ═══════════════════════════════════════════════════
     RADIUS TOKENS (Semantic)
     ═══════════════════════════════════════════════════ */
  
  --radius-button: var(--radius-lg);
  --radius-input: var(--radius-md);
  --radius-card: var(--radius-xl);
  --radius-modal: var(--radius-2xl);
  --radius-badge: var(--radius-full);
  --radius-avatar: var(--radius-full);
  --radius-tooltip: var(--radius-sm);
}
```

---

## 6. Shadow System

### Shadow Scales

```css
:root {
  /* ═══════════════════════════════════════════════════
     SHADOW SYSTEM (4 levels)
     ═══════════════════════════════════════════════════ */
  
  /* sm — Subtle, cards at rest */
  --shadow-sm: 
    0 1px 2px 0 rgb(0 0 0 / 0.05);
  
  /* DEFAULT — Cards, dropdowns */
  --shadow: 
    0 1px 3px 0 rgb(0 0 0 / 0.1), 
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  
  /* md — Elevated cards, floating elements */
  --shadow-md: 
    0 4px 6px -1px rgb(0 0 0 / 0.1), 
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  
  /* lg — Modals, popovers */
  --shadow-lg: 
    0 10px 15px -3px rgb(0 0 0 / 0.1), 
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  
  /* xl — Large overlays */
  --shadow-xl: 
    0 20px 25px -5px rgb(0 0 0 / 0.1), 
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* 2xl — Maximum elevation */
  --shadow-2xl: 
    0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  /* inner — Input focus, inset elements */
  --shadow-inner: 
    inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

  /* ═══════════════════════════════════════════════════
     SHADOW COLOR VARIANTS
     ═══════════════════════════════════════════════════ */
  
  /* Colored shadows (on colored backgrounds) */
  --shadow-primary: 0 4px 14px 0 rgb(59 130 246 / 0.4);
  --shadow-destructive: 0 4px 14px 0 rgb(220 38 38 / 0.4);
  --shadow-success: 0 4px 14px 0 rgb(34 197 94 / 0.4);
}
```

---

## 7. Dark Mode

> ⚠️ **Note:** The following section has been **expanded** to cover more patterns, themes, and implementation examples. For the complete dark mode guide including additional color schemes and accessibility patterns, see the [DARK-MODE.md](./DARK-MODE.md) file.

### Quick Reference: Dark Mode Options

| Option | Best For | User Control | Implementation |
|--------|----------|--------------|----------------|
| **Option A: prefers-color-scheme** | Automatic system preference | None (automatic) | CSS only |
| **Option B: data-theme class** | User toggle with persistence | Full control | CSS + JS |
| **Option C: CSS color-mix** | Automatic with manual override | Limited | CSS only |
| **Option D: Tailwind darkMode** | Tailwind v4 projects | Configurable | Tailwind config |

```css
/* ═══════════════════════════════════════════════════════════════════
   OPTION A: CSS prefers-color-scheme (Automatic)
   ═══════════════════════════════════════════════════════════════════ */

@media (prefers-color-scheme: dark) {
  :root {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    --primary: 217 91% 60%;
    --primary-foreground: 0 0% 100%;
    /* ... */
  }
}

/* ═══════════════════════════════════════════════════════════════════
   OPTION B: Class-based toggle
   ═══════════════════════════════════════════════════════════════════ */

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  /* ... */
}

/* ═══════════════════════════════════════════════════════════════════
   OPTION C: data-theme attribute (Best for user preference storage)
   ═══════════════════════════════════════════════════════════════════ */

[data-theme="dark"] {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  /* ... */
}

[data-theme="light"] {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  /* ... */
}

/* ═══════════════════════════════════════════════════════════════════
   OPTION D: CSS color-mix for automatic dark mode
   ═══════════════════════════════════════════════════════════════════ */

:root {
  /* Base colors */
  --raw-primary: 217 91% 60%;
  
  /* Light mode (default) */
  --primary: var(--raw-primary);
  --primary-foreground: 0 0% 100%;
  
  /* Dark mode with color-mix */
  @media (prefers-color-scheme: dark) {
    :root {
      --primary: color-mix(in oklab, var(--raw-primary), black 30%);
      --primary-foreground: 0 0% 100%;
    }
  }
}
```

### Dark Mode Toggle Implementation

```javascript
// Toggle with data-theme
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// Initialize from localStorage
function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', theme);
}

initTheme();
```

---

## 8. Component Tokens

### Button Tokens

```css
:root {
  /* Button Sizes */
  --button-height-xs: 2rem;     /* 32px */
  --button-height-sm: 2.5rem;   /* 40px */
  --button-height-md: 2.75rem;  /* 44px — minimum touch target */
  --button-height-lg: 3rem;     /* 48px */
  --button-height-xl: 3.5rem;   /* 56px */

  /* Button Padding */
  --button-padding-xs: 0.5rem 0.75rem;
  --button-padding-sm: 0.5rem 1rem;
  --button-padding-md: 0.625rem 1.25rem;
  --button-padding-lg: 0.75rem 1.5rem;
  --button-padding-xl: 1rem 2rem;

  /* Button Typography */
  --button-font-size-xs: 0.75rem;
  --button-font-size-sm: 0.8125rem;
  --button-font-size-md: 0.875rem;
  --button-font-size-lg: 1rem;
  --button-font-size-xl: 1.125rem;
  
  --button-font-weight: 500;
  --button-leading: 1;
  
  /* Button Radius */
  --button-radius: var(--radius-lg);
}

/* Button Variants */
:root {
  /* Primary */
  --button-primary-bg: var(--color-primary);
  --button-primary-color: var(--color-primary-foreground);
  --button-primary-border: transparent;
  --button-primary-hover-bg: var(--color-primary-hover);
  
  /* Secondary */
  --button-secondary-bg: var(--color-secondary);
  --button-secondary-color: var(--color-secondary-foreground);
  --button-secondary-border: transparent;
  
  /* Outline */
  --button-outline-bg: transparent;
  --button-outline-color: var(--color-foreground);
  --button-outline-border: var(--color-border);
  
  /* Ghost */
  --button-ghost-bg: transparent;
  --button-ghost-color: var(--color-foreground);
  --button-ghost-hover-bg: var(--color-accent);
  
  /* Destructive */
  --button-destructive-bg: var(--color-destructive);
  --button-destructive-color: var(--color-destructive-foreground);
}
```

### Input Tokens

```css
:root {
  /* Input Height */
  --input-height-sm: 2rem;      /* 32px */
  --input-height-md: 2.5rem;    /* 40px */
  --input-height-lg: 3rem;      /* 48px */

  /* Input Padding */
  --input-padding-sm: 0.5rem 0.75rem;
  --input-padding-md: 0.625rem 0.875rem;
  --input-padding-lg: 0.75rem 1rem;

  /* Input Typography */
  --input-font-size: 0.875rem;
  --input-line-height: 1.5;
  --input-placeholder-color: var(--color-muted-foreground);

  /* Input Border: */
  --input-border: var(--color-border);
  --input-border-hover: var(--color-border-hover, var(--color-slate-300));
  --input-border-focus: var(--color-ring);
  --input-ring-width: 2px;
  --input-ring-offset: 2px;

  /* Input Radius */
  --input-radius: var(--radius-md);

  /* Input States */
  --input-bg: var(--color-background);
  --input-disabled-bg: var(--color-muted);
  --input-disabled-opacity: 0.5;
  
  /* Input Error */
  --input-error-border: var(--color-destructive);
  --input-error-ring: var(--color-destructive);
}
```

### Card Tokens

```css
:root {
  /* Card Padding */
  --card-padding-sm: 1rem;
  --card-padding-md: 1.5rem;
  --card-padding-lg: 2rem;

  /* Card Radius */
  --card-radius: var(--radius-xl);

  /* Card Border */
  --card-border: var(--color-border);
  --card-border-width: 1px;

  /* Card Shadow */
  --card-shadow: var(--shadow);
  --card-shadow-hover: var(--shadow-md);

  /* Card Background */
  --card-bg: var(--color-card);
  --card-color: var(--color-card-foreground);
}
```

---

## 9. Tailwind v4 Integration

### CSS File (themes.css)

```css
@import "tailwindcss";

/* ═══════════════════════════════════════════════════════════════════
   THEME TOKENS — Your custom theme
   ═══════════════════════════════════════════════════════════════════ */

@theme {
  /* Colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--foreground);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Font families */
  --font-sans: var(--font-sans);
  --font-serif: var(--font-serif);
  --font-mono: var(--font-mono);

  /* Radius */
  --radius-sm: var(--radius-sm);
  --radius-DEFAULT: var(--radius);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-2xl: var(--radius-2xl);
  --radius-3xl: var(--radius-3xl);
  --radius-full: var(--radius-full);
}

/* ═══════════════════════════════════════════════════════════════════
   CUSTOM PROPERTIES — Keep for JS access
   ═══════════════════════════════════════════════════════════════════ */

:root {
  /* Colors (HSL for manipulation) */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  /* ... more tokens */
}
```

### Theme Presets (Optional)

```css
/* Preset: Midnight */
[data-theme="midnight"] {
  --background: 222 47% 7%;
  --foreground: 210 40% 98%;
  --primary: 199 89% 48%;
  --card: 222 47% 11%;
  --card-foreground: 210 40% 98%;
}

/* Preset: Forest */
[data-theme="forest"] {
  --background: 160 60% 10%;
  --foreground: 160 30% 98%;
  --primary: 142 70% 45%;
  --card: 160 60% 14%;
  --card-foreground: 160 30% 98%;
}

/* Preset: Sunset */
[data-theme="sunset"] {
  --background: 30 100% 98%;
  --foreground: 30 10% 10%;
  --primary: 25 95% 53%;
  --card: 30 100% 99%;
  --card-foreground: 30 10% 10%;
}
```

---

## 10. Export & Output

### Complete Theme CSS (Copy/Paste Ready)

```css
/* ═══════════════════════════════════════════════════════════════════
   THEME TOKENS — Generated Theme
   v1.0.0 | 2026-06-02
   
   Usage:
   1. Copy this file to your project
   2. Import in your main CSS entry point
   3. Customize values as needed
   ═══════════════════════════════════════════════════════════════════ */

/* ================================================================
   FONTS
   ================================================================ */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* ================================================================
   CUSTOM PROPERTIES
   ================================================================ */
:root {
  /* ─── Colors (Base Palette) ─── */
  --slate-50: #f8fafc;
  --slate-100: #f1f5f9;
  --slate-200: #e2e8f0;
  --slate-300: #cbd5e1;
  --slate-400: #94a3b8;
  --slate-500: #64748b;
  --slate-600: #475569;
  --slate-700: #334155;
  --slate-800: #1e293b;
  --slate-900: #0f172a;
  --slate-950: #020617;

  --blue-50: #eff6ff;
  --blue-100: #dbeafe;
  --blue-200: #bfdbfe;
  --blue-300: #93c5fd;
  --blue-400: #60a5fa;
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  --blue-800: #1e40af;
  --blue-900: #1e3a8a;
  --blue-950: #172554;

  /* ─── Semantic Tokens (Light Mode) ─── */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;
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

  /* ─── Typography ─── */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;

  /* ─── Spacing ─── */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;

  /* ─── Radius ─── */
  --radius: 0.375rem;
}

/* ================================================================
   DARK MODE
   ================================================================ */
@media (prefers-color-scheme: dark) {
  :root {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    --card: 222 47% 11%;
    --card-foreground: 210 40% 98%;
    --popover: 222 47% 11%;
    --popover-foreground: 210 40% 98%;
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
}

/* ================================================================
   BASE STYLES
   ================================================================ */
*, *::before, *::after {
  border-color: hsl(var(--border));
}
```

---

## Quick Reference

### Token Categories

| Category | Purpose | Tokens |
|----------|---------|--------|
| **Colors** | Base palette + semantic | 50+ colors |
| **Typography** | Font settings | 3 families, sizes, weights |
| **Spacing** | Layout gaps | 30+ space values |
| **Border** | Widths + radius | 8 radius + 4 widths |
| **Shadows** | Elevation | 8 shadow levels |
| **Components** | Component-specific | 20+ component tokens |

### Theme Checklist

- [ ] Minimum 3 hues (gray, primary, destructive)
- [ ] 50/900 contrast ratios verified
- [ ] Semantic tokens named by purpose
- [ ] Dark mode covers all semantic tokens
- [ ] Touch targets ≥ 44px
- [ ] Focus indicators visible in all states

---

Last updated: 2026-06-03 (v1.6.3)