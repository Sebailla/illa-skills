# CSS Patterns - Tailwind v4 & Design Tokens

Complete CSS architecture using Tailwind v4 CSS-first configuration, responsive design patterns, and systematic design tokens.

---

## Table of Contents

1. [Tailwind v4 Configuration](#1-tailwind-v4-configuration)
2. [Design Tokens (CSS Variables)](#2-design-tokens-css-variables)
3. [Color System](#3-color-system)
4. [Typography System](#4-typography-system)
5. [Spacing System](#5-spacing-system)
6. [Shadow & Elevation](#6-shadow--elevation)
7. [Border & Radius](#7-border--radius)
8. [Responsive Breakpoints](#8-responsive-breakpoints)
9. [Animation & Motion](#9-animation--motion)
10. [Dark Mode](#10-dark-mode)
11. [Accessibility Patterns](#11-accessibility-patterns)

---

## 1. Tailwind v4 Configuration

> ⚠️ **IMPORTANT:** The `@theme` CSS-first configuration shown below is **Tailwind v4 only**. 
> Projects using Tailwind v3 must use `tailwind.config.ts` with the JS configuration approach.
> See [MIGRATION.md](./MIGRATION.md) for upgrade instructions.

### CSS-First Config (New in v4)

```css
/* src/app.css - Main CSS file */
@import "tailwindcss";

/* Your custom theme */
@theme {
  /* Colors */
  --color-primary: #0066cc;
  --color-primary-hover: #0052a3;
  --color-secondary: #6b7280;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  
  /* Font Families */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Animations */
  --animate-fade-in: fade-in 0.3s ease-out;
  --animate-slide-up: slide-up 0.3s ease-out;
}

/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

### Tailwind Config (Alternative JS approach)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066cc',
          hover: '#0052a3',
          light: '#3b82f6',
          dark: '#1d4ed8',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

---

## 2. Design Tokens (CSS Variables)

### Complete Token System

```css
/* ============================================
   DESIGN TOKENS - Single Source of Truth
   ============================================ */

:root {
  /* ===== COLORS ===== */
  /* Primary */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;
  
  /* Neutral */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;
  
  /* Semantic Colors */
  --color-success: #16a34a;
  --color-warning: #ca8a04;
  --color-error: #dc2626;
  --color-info: #0284c7;
  
  /* Surface Colors */
  --color-surface: #ffffff;
  --color-surface-elevated: #f9fafb;
  --color-surface-overlay: rgba(0, 0, 0, 0.5);
  
  /* Text Colors */
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  --color-text-disabled: #d1d5db;
  --color-text-inverse: #ffffff;
  
  /* Border Colors */
  --color-border: #e5e7eb;
  --color-border-focus: #2563eb;
  --color-border-error: #dc2626;
  
  /* ===== TYPOGRAPHY ===== */
  /* Font Families */
  --font-family-display: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  --font-family-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-family-mono: 'JetBrains Mono', ui-monospace, 'Fira Code', monospace;
  
  /* Font Sizes */
  --font-size-xs: 0.75rem;       /* 12px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;      /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;       /* 24px */
  --font-size-3xl: 1.875rem;     /* 30px */
  --font-size-4xl: 2.25rem;      /* 36px */
  --font-size-5xl: 3rem;         /* 48px */
  --font-size-6xl: 3.75rem;      /* 60px */
  --font-size-7xl: 4.5rem;       /* 72px */
  
  /* Font Weights */
  --font-weight-thin: 100;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;
  
  /* Line Heights */
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
  
  /* ===== SPACING ===== */
  /* Base: 4px */
  --space-0: 0;
  --space-1: 0.25rem;     /* 4px */
  --space-2: 0.5rem;      /* 8px */
  --space-3: 0.75rem;     /* 12px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-8: 2rem;        /* 32px */
  --space-10: 2.5rem;     /* 40px */
  --space-12: 3rem;       /* 48px */
  --space-14: 3.5rem;     /* 56px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-32: 8rem;       /* 128px */
  
  /* ===== BORDERS ===== */
  /* Border Width */
  --border-width-0: 0;
  --border-width-1: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;
  
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 9999px;
  
  /* ===== SHADOWS ===== */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  
  /* ===== TRANSITIONS ===== */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  /* ===== Z-INDEX ===== */
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-backdrop: 1300;
  --z-modal: 1400;
  --z-popover: 1500;
  --z-tooltip: 1600;
  
  /* ===== CONTAINER ===== */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}
```

### Tailwind Classes Mapping

```html
<!-- Typography -->
<h1 class="font-display text-5xl font-bold tracking-tight">
  Headline
</h1>
<p class="font-body text-base text-gray-600 leading-relaxed">
  Body text
</p>
<code class="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
  code
</code>

<!-- Spacing -->
<div class="p-4 m-2 gap-4">
  <!-- padding 16px, margin 8px, gap 16px -->
</div>

<!-- Colors -->
<button class="bg-primary-600 text-white hover:bg-primary-700">
  Primary Button
</button>

<!-- Shadows -->
<div class="shadow-md hover:shadow-lg">
  Card with shadow
</div>

<!-- Border Radius -->
<button class="rounded-lg px-4 py-2">
  Rounded button
</button>
```

---

## 3. Color System

### Tailwind Color Configuration

```css
@theme {
  /* Semantic Colors */
  --color-primary: #0066cc;
  --color-primary-hover: #0052a3;
  --color-on-primary: #ffffff;
  
  /* Neutral Scale - With contrast verification */
  --color-gray-50: #f9fafb;    /* text on gray-900: 17:1 ✓ */
  --color-gray-100: #f3f4f6;   /* text on gray-900: 15:1 ✓ */
  --color-gray-200: #e5e7eb;   /* text on gray-900: 13:1 ✓ */
  --color-gray-300: #d1d5db;   /* text on gray-900: 10:1 ✓ */
  --color-gray-400: #9ca3af;   /* text on white: 4.5:1 ✓ */
  --color-gray-500: #6b7280;   /* text on white: 5.7:1 ✓ */
  --color-gray-600: #4b5563;   /* text on white: 7:1 ✓ */
  --color-gray-700: #374151;   /* text on white: 10:1 ✓ */
  --color-gray-800: #1f2937;   /* text on white: 14:1 ✓ */
  --color-gray-900: #111827;   /* text on white: 16:1 ✓ */
  --color-gray-950: #030712;   /* text on white: 21:1 ✓ */
  
  /* Brand Colors - WCAG compliant on white */
  --color-blue-500: #3b82f6;   /* contrast: 4.6:1 ✓ */
  --color-blue-600: #2563eb;   /* contrast: 5.2:1 ✓ */
  --color-blue-700: #1d4ed8;   /* contrast: 6.4:1 ✓ */
  
  /* Semantic */
  --color-success: #16a34a;    /* contrast: 4.6:1 on white */
  --color-warning: #ca8a04;    /* contrast: 4.9:1 on white */
  --color-error: #dc2626;      /* contrast: 4.6:1 on white */
  --color-info: #0284c7;       /* contrast: 5.3:1 on white */
}
```

### Color Usage Patterns

```html
<!-- Text Colors -->
<p class="text-gray-900">Primary text (16:1 contrast)</p>
<p class="text-gray-600">Secondary text (7:1 contrast)</p>
<p class="text-gray-500">Muted text (5.7:1 contrast)</p>

<!-- Background Colors -->
<div class="bg-white">Surface</div>
<div class="bg-gray-50">Elevated surface</div>
<div class="bg-gray-100">Subtle background</div>

<!-- Interactive Colors -->
<button class="bg-blue-600 text-white hover:bg-blue-700">
  Primary action
</button>

<!-- Semantic Colors -->
<div class="text-green-600 bg-green-50">Success message</div>
<div class="text-red-600 bg-red-50">Error message</div>
<div class="text-yellow-700 bg-yellow-50">Warning message</div>
```

### Contrast Checker Reference

| Foreground | Background | Ratio | WCAG Level |
|------------|------------|-------|------------|
| gray-900 (#111827) | white | 16:1 | AAA |
| gray-700 (#374151) | white | 10:1 | AAA |
| gray-600 (#4b5563) | white | 7:1 | AAA |
| gray-500 (#6b7280) | white | 5.7:1 | AA |
| gray-400 (#9ca3af) | white | 4.5:1 | AA |
| gray-300 (#d1d5db) | gray-900 | 10:1 | AAA |

---

## 4. Typography System

### Fluid Typography with clamp()

```css
/* Tailwind v4 @theme configuration */
@theme {
  --text-display-xl: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  --text-display-lg: clamp(2rem, 4vw + 0.5rem, 3.5rem);
  --text-display-md: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
  --text-display-sm: clamp(1.5rem, 2vw + 0.5rem, 2rem);
  
  --text-prose-xl: clamp(1.125rem, 1vw + 0.75rem, 1.25rem);
  --text-prose-lg: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
  --text-prose-base: clamp(0.9375rem, 0.25vw + 0.875rem, 1rem);
}
```

### Typography Scale

```html
<!-- Display / Hero -->
<h1 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
  Display Heading
</h1>

<!-- Headings -->
<h2 class="text-4xl md:text-5xl font-bold tracking-tight">
  Heading 2
</h2>
<h3 class="text-3xl md:text-4xl font-semibold">
  Heading 3
</h3>
<h4 class="text-2xl md:text-3xl font-semibold">
  Heading 4
</h4>

<!-- Body -->
<p class="text-lg md:text-xl leading-relaxed">
  Large body text
</p>
<p class="text-base md:text-lg leading-relaxed">
  Standard body text
</p>
<p class="text-sm md:text-base leading-relaxed">
  Small body text
</p>

<!-- UI Text -->
<span class="text-sm font-medium">UI Label</span>
<span class="text-xs font-semibold tracking-wider uppercase">Caption</span>
```

### Typography with Tailwind

```html
<!-- Font Families -->
<p class="font-display">Display font (headlines)</p>
<p class="font-body">Body font (paragraphs)</p>
<p class="font-mono">Mono font (code)</p>

<!-- Font Sizes -->
<p class="text-xs">Extra small (12px)</p>
<p class="text-sm">Small (14px)</p>
<p class="text-base">Base (16px)</p>
<p class="text-lg">Large (18px)</p>
<p class="text-xl">Extra large (20px)</p>
<p class="text-2xl">2XL (24px)</p>
<p class="text-3xl">3XL (30px)</p>
<p class="text-4xl">4XL (36px)</p>
<p class="text-5xl">5XL (48px)</p>

<!-- Font Weights -->
<p class="font-light">Light (300)</p>
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semibold (600)</p>
<p class="font-bold">Bold (700)</p>

<!-- Line Heights -->
<p class="leading-none">No leading (1)</p>
<p class="leading-tight">Tight (1.25)</p>
<p class="leading-snug">Snug (1.375)</p>
<p class="leading-normal">Normal (1.5)</p>
<p class="leading-relaxed">Relaxed (1.625)</p>
<p class="leading-loose">Loose (2)</p>

<!-- Letter Spacing -->
<p class="tracking-tighter">Tighter (-0.05em)</p>
<p class="tracking-tight">Tight (-0.025em)</p>
<p class="tracking-normal">Normal (0)</p>
<p class="tracking-wide">Wide (0.025em)</p>
<p class="tracking-wider">Wider (0.05em)</p>
<p class="tracking-widest">Widest (0.1em)</p>
```

### Prose Typography (Long-form content)

```html
<article class="prose prose-lg prose-slate max-w-none">
  <!-- Automatically styles: h1-h6, p, ul, ol, blockquote, code, etc. -->
  <h1>Article Title</h1>
  <p>Paragraph text with proper line height and spacing.</p>
  <h2>Section Heading</h2>
  <ul>
    <li>List item</li>
    <li>List item</li>
  </ul>
  <blockquote>Quoted text</blockquote>
  <code>Inline code</code>
  <pre><code>Code block</code></pre>
</article>
```

---

## 5. Spacing System

### Base-4 Grid

```css
@theme {
  /* All spacing in multiples of 4px */
  --space-0: 0;
  --space-1: 0.25rem;     /* 4px */
  --space-2: 0.5rem;      /* 8px */
  --space-3: 0.75rem;     /* 12px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-8: 2rem;        /* 32px */
  --space-10: 2.5rem;     /* 40px */
  --space-12: 3rem;       /* 48px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-32: 8rem;       /* 128px */
  --space-40: 10rem;      /* 160px */
  --space-48: 12rem;      /* 192px */
  --space-56: 14rem;      /* 224px */
  --space-64: 16rem;      /* 256px */
}
```

### Spacing Usage

```html
<!-- Padding -->
<div class="p-4">Padding all sides (16px)</div>
<div class="px-4 py-2">Padding x (16px) y (8px)</div>
<div class="pt-8 pb-4">Padding top bottom</div>

<!-- Margins -->
<div class="m-4">Margin all sides</div>
<div class="mx-auto">Horizontal centering</div>
<div class="my-8">Vertical margin</div>

<!-- Gap (flex/grid) -->
<div class="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="grid grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Space between -->
<div class="flex justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

<div class="space-y-8">
  <section>Section 1</section>
  <section>Section 2</section>
  <section>Section 3</section>
</div>
```

### Common Spacing Patterns

```html
<!-- Page container -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>

<!-- Section spacing -->
<section class="py-16 md:py-24 lg:py-32">
  <!-- Section content -->
</section>

<!-- Component internal spacing -->
<div class="p-4 md:p-6 lg:p-8">
  <!-- Content -->
</div>

<!-- Form spacing -->
<div class="space-y-4">
  <input class="w-full" />
  <input class="w-full" />
  <button class="w-full">Submit</button>
</div>
```

---

## 6. Shadow & Elevation

### Elevation Scale

```css
@theme {
  /* No shadow - flat design */
  --shadow-none: none;
  
  /* Subtle - for resting elements */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
  /* Default - for cards, buttons */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  
  /* Elevated - for dropdowns, modals */
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  
  /* High - for dialogs, overlays */
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  
  /* Extreme - for tooltips, popovers */
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  /* Inset - for inputs, wells */
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
```

### Shadow Usage

```html
<!-- Cards -->
<div class="bg-white rounded-lg shadow-sm">
  Basic card
</div>

<div class="bg-white rounded-xl shadow-md hover:shadow-lg">
  Interactive card
</div>

<!-- Buttons -->
<button class="shadow-sm hover:shadow-md active:shadow-inner">
  Button with shadow
</button>

<!-- Modals -->
<div class="shadow-2xl">
  Modal overlay
</div>

<!-- Dropdowns -->
<div class="shadow-lg border border-gray-200">
  Dropdown menu
</div>
```

### Colored Shadows (for brand colors)

```css
/* Primary colored shadow */
.shadow-primary {
  box-shadow: 0 4px 6px -1px rgba(0, 102, 204, 0.1),
              0 2px 4px -2px rgba(0, 102, 204, 0.1);
}

/* Large primary shadow */
.shadow-primary-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 102, 204, 0.15),
              0 4px 6px -4px rgba(0, 102, 204, 0.1);
}

/* Glow effect */
.shadow-glow {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}
```

---

## 7. Border & Radius

### Border Radius Scale

```css
@theme {
  --radius-none: 0;
  --radius-sm: 4px;        /* Small elements, inputs */
  --radius-md: 8px;        /* Buttons, cards */
  --radius-lg: 12px;       /* Modals, large cards */
  --radius-xl: 16px;        /* Feature cards */
  --radius-2xl: 24px;      /* Large containers */
  --radius-3xl: 32px;      /* Hero sections */
  --radius-full: 9999px;   /* Pills, avatars */
}
```

### Border Radius Usage

```html
<!-- Small - inputs, badges -->
<input class="rounded-sm" />
<span class="rounded-sm px-2 py-1">Badge</span>

<!-- Medium - buttons, small cards -->
<button class="rounded-md px-4 py-2">Button</button>
<div class="rounded-md p-4">Card</div>

<!-- Large - modals, feature cards -->
<div class="rounded-xl p-6">Large card</div>
<dialog class="rounded-2xl">Modal</dialog>

<!-- Extra large - hero sections -->
<div class="rounded-3xl p-8">Hero container</div>

<!-- Full - pills, avatars, circular buttons -->
<button class="rounded-full px-6 py-3">Pill button</button>
<div class="w-12 h-12 rounded-full">Avatar</div>
```

### Border Width

```html
<!-- Border all sides -->
<div class="border">Default border</div>
<div class="border-2">Thick border</div>
<div class="border-4">Very thick border</div>

<!-- Border specific sides -->
<div class="border-t">Top border only</div>
<div class="border-b">Bottom border only</div>
<div class="border-x">Left and right borders</div>
<div class="border-y">Top and bottom borders</div>

<!-- Border colors -->
<div class="border-gray-200">Gray border</div>
<div class="border-blue-500">Blue border</div>
<div class="border-transparent">No visual border</div>

<!-- Combined -->
<div class="border border-gray-200 rounded-lg">
  Bordered card
</div>
```

---

## 8. Responsive Breakpoints

### Tailwind Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Mobile-First Responsive Patterns

```html
<!-- Mobile (default), tablet and up (md:), desktop and up (lg:) -->

<!-- Typography -->
<h1 class="text-3xl md:text-4xl lg:text-5xl">
  Responsive heading
</h1>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Flexbox -->
<div class="flex flex-col md:flex-row gap-4">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Padding/Margin -->
<div class="p-4 md:p-6 lg:p-8">
  Responsive padding
</div>

<!-- Visibility -->
<div class="hidden md:block">Hidden on mobile, visible on tablet+</div>
<div class="block md:hidden">Visible on mobile, hidden on tablet+</div>

<!-- Text alignment -->
<p class="text-center md:text-left lg:text-center">
  Responsive alignment
</p>
```

### Container Queries (Modern)

> ⚠️ **Browser Support:** Container queries require modern browsers (Chrome 105+, Firefox 110+, Safari 16+). Also requires Tailwind v3.5+ with `@tailwindcss/container-queries` plugin.

```html
<!-- Container queries for component-based responsiveness -->
<div class="card-container">
  <div class="@container">
    <div class="@md:flex @lg:grid">
      <!-- Content adapts to container size, not viewport -->
    </div>
  </div>
</div>
```

### Touch Targets (Mobile)

```html
<!-- Minimum touch target: 44x44px -->
<button class="min-h-11 min-w-11 px-4 py-2">
  Touch-friendly button
</button>

<!-- Mobile-specific spacing -->
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  <!-- Larger touch areas on mobile -->
</div>
```

---

## 9. Animation & Motion

### Tailwind Animation Classes

```css
@theme {
  /* Custom animations */
  --animate-fade-in: fade-in 0.3s ease-out;
  --animate-fade-out: fade-out 0.3s ease-in;
  --animate-slide-up: slide-up 0.3s ease-out;
  --animate-slide-down: slide-down 0.3s ease-out;
  --animate-scale-in: scale-in 0.2s ease-out;
  --animate-spin-slow: spin 3s linear infinite;
  
  /* Keyframes */
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
}
```

### Animation Utilities

```html
<!-- Fade animations -->
<div class="animate-fade-in">Fades in</div>
<div class="animate-fade-out">Fades out</div>

<!-- Slide animations -->
<div class="animate-slide-up">Slides up</div>
<div class="animate-slide-down">Slides down</div>

<!-- Scale animations -->
<div class="animate-scale-in">Scales in</div>

<!-- Spin (loading) -->
<div class="animate-spin">Spinning</div>
<div class="animate-pulse">Pulsing</div>
<div class="animate-bounce">Bouncing</div>
```

### Transition Utilities

```html
<!-- Property transitions -->
<div class="transition-all">Transitions all properties</div>
<div class="transition-colors">Transitions colors only</div>
<div class="transition-transform">Transitions transform only</div>
<div class="transition-opacity">Transitions opacity only</div>

<!-- Duration -->
<div class="duration-150">Fast (150ms)</div>
<div class="duration-200">Normal (200ms)</div>
<div class="duration-300">Slow (300ms)</div>
<div class="duration-500">Very slow (500ms)</div>

<!-- Easing -->
<div class="ease-linear">Linear</div>
<div class="ease-in">Ease in</div>
<div class="ease-out">Ease out</div>
<div class="ease-in-out">Ease in and out</div>

<!-- Combined -->
<button class="transition-all duration-200 ease-out hover:scale-105 hover:shadow-lg">
  Hover effect button
</button>
```

### Hover/Active/Focus States

```html
<!-- Hover -->
<button class="hover:bg-blue-700">Hover state</button>

<!-- Focus -->
<button class="focus:ring-2 focus:ring-blue-500">Focus state</button>

<!-- Active -->
<button class="active:bg-blue-800">Active state</button>

<!-- Combined -->
<button class="
  bg-blue-600
  hover:bg-blue-700
  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  active:bg-blue-800
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Button with all states
</button>
```

### Reduced Motion

```css
/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```html
<!-- Tailwind reduced motion -->
<div class="motion-reduce:transition-none motion-reduce:hover:transform-none">
  Respects reduced motion
</div>
```

---

## 10. Dark Mode

### Dark Mode Configuration

```css
/* Tailwind v4 - enable dark mode */
@theme {
  /* Use class strategy for manual toggle */
  color-scheme: dark;
}

/* Or use media strategy for automatic */
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #0a0a0a;
    --color-text: #fafafa;
  }
}
```

### Dark Mode Colors

```css
@theme {
  /* Dark mode specific colors */
  --color-dark-surface: #0a0a0a;
  --color-dark-surface-elevated: #171717;
  --color-dark-border: #262626;
  --color-dark-text: #fafafa;
  --color-dark-text-secondary: #a3a3a3;
}
```

### Dark Mode Usage

```html
<!-- Automatic (prefers-color-scheme) -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  Automatically adapts to system preference
</div>

<!-- Manual toggle (class strategy) -->
<div class="dark bg-gray-900 text-gray-100">
  <!-- Requires manual .dark class on parent -->
</div>

<!-- Using data-theme attribute -->
<div class="data-[theme=dark]:bg-gray-900">
  Custom toggle implementation
</div>
```

### Dark Mode Patterns

```html
<!-- Card component -->
<div class="
  bg-white dark:bg-gray-900
  border-gray-200 dark:border-gray-800
  text-gray-900 dark:text-gray-100
  rounded-xl shadow-sm dark:shadow-none
">
  Card content
</div>

<!-- Button -->
<button class="
  bg-blue-600 text-white
  dark:bg-blue-500 dark:text-gray-900
  hover:bg-blue-700 dark:hover:bg-blue-400
">
  Button
</button>

<!-- Input -->
<input class="
  bg-white dark:bg-gray-800
  border-gray-300 dark:border-gray-700
  text-gray-900 dark:text-gray-100
  placeholder-gray-400 dark:placeholder-gray-500
  focus:border-blue-500 dark:focus:border-blue-400
  focus:ring-blue-500 dark:focus:ring-blue-400
">
```

---

## 11. Accessibility Patterns

### Focus Visible

```css
@theme {
  /* Custom focus styles */
  --ring-offset-width: 2px;
  --ring-offset-color: #ffffff;
  --ring-width: 2px;
  --ring-color: #3b82f6;
}

/* Never remove outline without replacement */
:focus-visible {
  outline: 2px solid var(--ring-color);
  outline-offset: 2px;
}

/* Custom focus ring */
.focus-ring {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
```

### Focus Usage

```html
<!-- Tailwind focus ring -->
<button class="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Button with focus ring
</button>

<!-- Custom focus style -->
<button class="focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
  Custom focus
</button>

<!-- Outline removal without replacement (BAD) -->
<button class="outline-none">BAD - no focus indicator</button>

<!-- Outline removal WITH replacement (GOOD) -->
<button class="outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
  GOOD - ring replaces outline
</button>
```

### Screen Reader Only

```css
/* Hide visually but keep accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Show on focus (for skip links) */
.sr-only-focusable:focus,
.sr-only-focusable:focus-within {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Touch Target Size

```css
/* Minimum touch target: 24x24px CSS, 44x44px mobile */
@theme {
  --touch-target-min: 24px;
  --touch-target-mobile: 44px;
}

/* Ensure interactive elements meet size requirements */
button,
a,
[role="button"],
[role="link"],
input,
select,
textarea {
  min-height: var(--touch-target-min);
  min-width: var(--touch-target-min);
}

@media (pointer: coarse) {
  button,
  a,
  [role="button"] {
    min-height: var(--touch-target-mobile);
    min-width: var(--touch-target-mobile);
  }
}
```

---

## Complete Component Example

```html
<!-- Complete Button Component with all design tokens -->
<button
  type="button"
  class="
    /* Base */
    inline-flex items-center justify-center
    gap-2
    
    /* Typography */
    font-medium
    text-sm
    
    /* Padding & Size */
    px-4 py-2.5
    min-h-11 min-w-11
    
    /* Border & Radius */
    border border-transparent
    rounded-lg
    
    /* Colors */
    bg-blue-600 text-white
    hover:bg-blue-700
    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    active:bg-blue-800
    disabled:opacity-50 disabled:cursor-not-allowed
    
    /* Shadow */
    shadow-sm
    hover:shadow-md
    active:shadow-sm
    
    /* Transition */
    transition-all duration-200 ease-in-out
    
    /* Dark mode */
    dark:bg-blue-500 dark:text-gray-900
    dark:hover:bg-blue-400
    dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900
    dark:active:bg-blue-600
    
    /* Reduced motion */
    motion-reduce:transition-none
  "
>
  <!-- Icon -->
  <svg class="w-4 h-4" aria-hidden="true">
    <path d="..." />
  </svg>
  
  <!-- Text -->
  <span>Button Text</span>
</button>
```

---

## CSS Custom Properties Export

```typescript
// tokens.ts - Export for use in JavaScript/TypeScript
export const tokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      // ... etc
    },
    // ...
  },
  fontFamily: {
    display: "'Space Grotesk', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    // ... etc
  },
  // ... etc
};
```

---

## Utility Classes Quick Reference

| Utility | CSS Output |
|---------|-----------|
| `w-full` | `width: 100%` |
| `h-full` | `height: 100%` |
| `min-h-screen` | `min-height: 100vh` |
| `flex` | `display: flex` |
| `grid` | `display: grid` |
| `hidden` | `display: none` |
| `block` | `display: block` |
| `inline-flex` | `display: inline-flex` |
| `gap-4` | `gap: 1rem` |
| `p-4` | `padding: 1rem` |
| `m-4` | `margin: 1rem` |
| `rounded-lg` | `border-radius: 0.5rem` |
| `shadow-md` | `box-shadow: ...` |
| `text-center` | `text-align: center` |
| `font-bold` | `font-weight: 700` |
| `text-xl` | `font-size: 1.25rem` |
| `transition-all` | `transition: all` |
| `duration-200` | `transition-duration: 200ms` |

---

Last updated: 2026-06-03 (v1.6.3)