# Tailwind CSS v3 → v4 Migration Guide

Complete guide for migrating Tailwind v3 projects to v4, covering configuration changes, breaking changes, and step-by-step instructions.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Key Breaking Changes](#2-key-breaking-changes)
3. [Step-by-Step Migration](#3-step-by-step-migration)
4. [Configuration Changes](#4-configuration-changes)
5. [CSS-First Configuration](#5-css-first-configuration)
6. [Common Issues](#6-common-issues)
7. [Verification](#7-verification)

---

## 1. Overview

### What Changed in v4

| Feature | v3 | v4 |
|---------|----|----|
| Configuration | `tailwind.config.ts` | `globals.css` with `@theme` |
| Color naming | Arbitrary values | CSS variables with `--color-*` |
| Theme extension | `theme.extend` | `@layer base` |
| Plugin API | Different | Updated |
| JIT Engine | Workbox-based | Rust-based |

### When to Migrate

✅ **Migrate if:**
- Starting a new project
- Already on Tailwind v3 with planned major refactor
- Need latest performance improvements
- Using PostCSS 8+

❌ **Don't migrate if:**
- Large existing codebase with custom config
- Using unsupported PostCSS plugins
- Tight deadline with no room for testing

---

## 2. Key Breaking Changes

### 2.1 Configuration File Removed

```typescript
// v3: tailwind.config.ts
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
      },
    },
  },
}

// v4: globals.css
@import "tailwindcss";

@theme {
  --color-primary: #0066cc;
}
```

### 2.2 Arbitrary Values Syntax

```css
/* v3 */
class="bg-[#0066cc]"
class="text-[12px]"

/* v4 - SAME, but now also works in @theme */
@theme {
  --spacing-custom: 42px;
}
```

### 2.3 CSS Variable Prefixes

```css
/* v3 */
background-color: theme('colors.blue.500');

/* v4 - Use CSS variables directly */
background-color: var(--color-blue-500);
```

### 2.4 Plugin Migration

```typescript
// v3 plugins
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

// v4 - Import in CSS
@import "tailwindcss";
@import "@tailwindcss/typography";
```

### 2.5 Dark Mode Configuration

```css
/* v3: tailwind.config.ts */
module.exports = {
  darkMode: 'class',
}

// v4: globals.css
@theme {
  color-scheme: dark;
}

/* Or use class strategy */
.dark {
  color-scheme: dark;
}
```

### 2.6 Font Family Configuration

```css
/* v3: tailwind.config.ts */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}

// v4: globals.css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

---

## 3. Step-by-Step Migration

### Step 1: Update Dependencies

```bash
# Remove v3 packages
npm uninstall tailwindcss postcss autoprefixer

# Install v4
npm install tailwindcss@latest @tailwindcss/postcss@latest postcss autoprefixer
```

### Step 2: Create New CSS Entry Point

```css
/* src/app/globals.css (Next.js) or index.css (Vite) */
@import "tailwindcss";

/* Your @theme configuration */
@theme {
  /* Colors */
  --color-primary: #0066cc;
  --color-primary-hover: #0052a3;
  
  /* Spacing */
  --spacing-18: 4.5rem;
  
  /* Fonts */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Shadows */
  --shadow-card: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  
  /* Animations */
  --animate-fade-in: fade-in 0.3s ease-out;
}

/* Base styles */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }
  
  * {
    border-color: hsl(var(--border));
  }
  
  body {
    background-color: var(--background);
    color: var(--foreground);
  }
}

/* Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Step 3: Remove tailwind.config.ts

```bash
# Delete the config file
rm tailwind.config.ts

# Or keep for compatibility (not recommended)
mv tailwind.config.ts tailwind.config.ts.bak
```

### Step 4: Migrate Theme Configuration

Extract from `tailwind.config.ts`:

```typescript
// tailwind.config.ts (v3) - extract these values
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066cc',
          hover: '#0052a3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
}
```

Convert to `@theme`:

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-primary: #0066cc;
  --color-primary-hover: #0052a3;
  
  --font-sans: 'Inter', system-ui, sans-serif;
  
  --radius-lg: 0.5rem;
}
```

### Step 5: Update PostCSS Configuration

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Step 6: Update Component Classes

Check for deprecated patterns:

```html
<!-- Update color functions -->
<!-- v3 -->
<div style="background-color: theme('colors.blue.500')">
  
<!-- v4 -->
<div style="background-color: var(--color-blue-500)">

<!-- Update arbitrary values -->
<!-- v3 -->
class="p-[12px]"

<!-- v4 - Same, but verify it works -->
class="p-[12px]"
```

---

## 4. Configuration Changes

### 4.1 Color Configuration

```css
/* v3: tailwind.config.ts */
colors: {
  primary: '#0066cc',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    // ...
  }
}

/* v4: @theme */
@theme {
  --color-primary: #0066cc;
  
  /* Semantic colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  /* etc */
}
```

### 4.2 Spacing Configuration

```css
/* v3: tailwind.config.ts */
spacing: {
  18: '4.5rem',
  88: '22rem',
}

/* v4: @theme */
@theme {
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;
  
  /* Or use arbitrary value */
  /* class="h-[4.5rem]" */
}
```

### 4.3 Typography Configuration

```css
/* v3: tailwind.config.ts */
fontSize: {
  xs: ['12px', { lineHeight: '16px' }],
}

/* v4: @theme */
@theme {
  --text-xs: 0.75rem;
  --leading-xs: 1rem;  /* Not standard, custom only */
}
```

### 4.4 Animation Configuration

```css
/* v3: tailwind.config.ts */
extend: {
  keyframes: {
    'fade-in': {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
  },
  animation: {
    'fade-in': 'fade-in 0.3s ease-out',
  },
}

/* v4: @theme */
@theme {
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  --animate-fade-in: fade-in 0.3s ease-out;
}
```

### 4.5 Dark Mode

```css
/* v3: tailwind.config.ts */
darkMode: 'class',

/* v4: globals.css */
@theme {
  color-scheme: dark;
}

/* Or use class strategy */
.dark {
  color-scheme: dark;
}
```

---

## 5. CSS-First Configuration

### 5.1 Basic Setup

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary: #0066cc;
  --color-secondary: #6b7280;
  
  /* Fonts */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  
  /* Radius */
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

### 5.2 Google Fonts

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Space Grotesk', system-ui, sans-serif;
}
```

### 5.3 Responsive Configuration

```css
/* Default breakpoints in v4: sm, md, lg, xl, 2xl */
/* Custom breakpoints */
@theme {
  --breakpoint-3xl: 1920px;
}
```

### 5.4 Using CSS Variables in JS

```typescript
// Get value from CSS
const computedStyle = getComputedStyle(document.documentElement);
const primaryColor = computedStyle.getPropertyValue('--color-primary').trim();

// Or via CSS custom properties
const styles = {
  '--color-primary': '#0066cc',
};
```

---

## 6. Common Issues

### Issue 1: Plugins Not Working

```css
/* v3 plugin usage */
plugins: [require('@tailwindcss/typography')]

/* v4 plugin usage - import in CSS */
@import "tailwindcss";
@import "@tailwindcss/typography";
```

### Issue 2: Color Function Deprecated

```typescript
// v3
const color = theme('colors.blue.500')

// v4 - Use CSS variables
const styles = {
  backgroundColor: 'var(--color-blue-500)',
}
```

### Issue 3: JIT Arbitrary Values

```css
/* v3 */
class="bg-[url('...')]"

/* v4 - Same, but verify PostCSS setup */
class="bg-[url('...')]"
```

### Issue 4: Config Not Found

```bash
# Ensure no old config
rm tailwind.config.js
rm tailwind.config.ts
```

### Issue 5: Dark Mode Not Working

```css
/* Ensure color-scheme is set */
@theme {
  color-scheme: dark;
}

/* Or use .dark class */
.dark {
  color-scheme: dark;
}
```

### Issue 6: Missing Classes

```css
/* Some v3 utilities are removed or changed */
/* Check official migration guide for list */
```

---

## 7. Verification

### Checklist

- [ ] Updated dependencies (`npm install tailwindcss@latest`)
- [ ] Created new CSS entry point with `@import "tailwindcss"`
- [ ] Migrated all `tailwind.config.ts` values to `@theme`
- [ ] Removed or renamed old config file
- [ ] Updated PostCSS configuration
- [ ] Tested dark mode functionality
- [ ] Verified animations work correctly
- [ ] Checked all custom colors in use
- [ ] Verified responsive breakpoints
- [ ] Tested with production build

### Testing Commands

```bash
# Development build
npm run dev

# Production build
npm run build

# Check for CSS errors
npm run lint:css

# Verify dark mode
# Add class="dark" to HTML element, refresh
```

### Known v4 Bugs/Workarounds

1. **TypeScript definitions may be outdated** - Check `@types/tailwindcss` if using
2. **VS Code Tailwind extension** - May need update for v4 support
3. **Third-party plugins** - May need updates for v4 compatibility

---

## Resources

- [Official Tailwind v4 Docs](https://tailwindcss.com/docs/upgrade-guide)
- [v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide#migrating-to-v4)
- [CSS-First Configuration](https://tailwindcss.com/docs/css-first-configuration)

---

## Quick Reference

| v3 | v4 |
|----|----|
| `tailwind.config.ts` | `@theme` in CSS |
| `theme()` | CSS variables |
| `darkMode: 'class'` | `color-scheme` in @theme |
| `plugins: [require(...)]` | `@import` in CSS |
| `theme.extend` | Direct in @theme |

---

Last updated: 2026-06-03 (v1.6.3)