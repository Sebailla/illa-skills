# Vanilla HTML/CSS/JS Component Templates

Complete component templates using pure HTML, CSS (with CSS variables), and vanilla JavaScript. Responsive, accessible, and compatible with all 9 design styles.

---

## Table of Contents

1. [Setup & Architecture](#1-setup--architecture)
2. [CSS Variables & Design Tokens](#2-css-variables--design-tokens)
3. [Button Component](#3-button-component)
4. [Form Components](#4-form-components)
5. [Modal Component](#5-modal-component)
6. [Card Component](#6-card-component)
7. [Navigation](#7-navigation)
8. [Animation Patterns](#8-animation-patterns)

---

## 1. Setup & Architecture

### File Structure

```
src/
├── components/
│   ├── button/
│   │   ├── button.css
│   │   └── button.js
│   ├── form/
│   │   ├── form.css
│   │   └── form.js
│   └── modal/
│       ├── modal.css
│       └── modal.js
├── styles/
│   ├── tokens.css          # Design tokens
│   ├── base.css            # Reset & base
│   ├── utilities.css       # Utility classes
│   └── styles.css          # Main entry point
└── index.html
```

### CSS Entry Point

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="styles/tokens.css">
  <link rel="stylesheet" href="styles/base.css">
  <link rel="stylesheet" href="styles/utilities.css">
  <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
  <!-- Content -->
  <script type="module" src="app.js"></script>
</body>
</html>
```

### Base CSS Reset

```css
/* styles/base.css */

/* Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Remove default styles */
button,
input,
select,
textarea {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: none;
}

a {
  color: inherit;
  text-decoration: none;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* Focus visible */
:focus-visible {
  outline: 2px solid var(--color-focus, #0066cc);
  outline-offset: 2px;
}

/* Reduced motion */
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

---

## 2. CSS Variables & Design Tokens

### Complete Token System

```css
/* styles/tokens.css */

/* ===== DESIGN TOKENS ===== */
:root {
  /* Colors - Semantic */
  --color-primary: #0066cc;
  --color-primary-hover: #0052a3;
  --color-primary-light: #3b82f6;
  --color-primary-dark: #1d4ed8;
  
  --color-surface: #ffffff;
  --color-surface-elevated: #f9fafb;
  --color-surface-overlay: rgba(0, 0, 0, 0.5);
  
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  --color-text-disabled: #d1d5db;
  --color-text-inverse: #ffffff;
  
  --color-border: #e5e7eb;
  --color-border-focus: #0066cc;
  --color-border-error: #dc2626;
  
  --color-success: #16a34a;
  --color-warning: #ca8a04;
  --color-error: #dc2626;
  --color-info: #0284c7;
  
  /* Grayscale Scale */
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
  
  /* Typography */
  --font-family-display: 'Space Grotesk', system-ui, sans-serif;
  --font-family-body: 'Inter', system-ui, sans-serif;
  --font-family-mono: 'JetBrains Mono', ui-monospace, monospace;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  
  /* Spacing (4px base) */
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  
  /* Transitions */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  /* Z-index */
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-backdrop: 1300;
  --z-modal: 1400;
  --z-tooltip: 1500;
}

/* ===== RESPONSIVE BREAKPOINTS ===== */
/* Mobile-first: styles apply to mobile, media queries add for larger screens */

/* sm: 640px - Large phones */
@media (min-width: 640px) {
  :root {
    /* Adjust for tablet */
  }
}

/* md: 768px - Tablets */
@media (min-width: 768px) {
  :root {
    /* Adjust for tablet */
  }
}

/* lg: 1024px - Laptops */
@media (min-width: 1024px) {
  :root {
    /* Adjust for desktop */
  }
}

/* xl: 1280px - Desktops */
@media (min-width: 1280px) {
  :root {
    /* Adjust for large desktop */
  }
}

/* ===== DARK MODE ===== */
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #0a0a0a;
    --color-surface-elevated: #171717;
    --color-text: #fafafa;
    --color-text-secondary: #a3a3a3;
    --color-border: #262626;
  }
}

/* ===== TOUCH TARGETS ===== */
/* Minimum 24px, 44px for mobile touch */
@media (pointer: coarse) {
  :root {
    --touch-target-min: 44px;
  }
}
```

### Utility Classes

```css
/* styles/utilities.css */

/* ===== DISPLAY ===== */
.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }

/* ===== FLEX ===== */
.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }
.gap-1 { gap: var(--space-1); }
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }

/* ===== SPACING ===== */
/* Padding */
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-4 { padding: var(--space-4); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }

.px-2 { padding-left: var(--space-2); padding-right: var(--space-2); }
.px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }
.px-6 { padding-left: var(--space-6); padding-right: var(--space-6); }
.py-2 { padding-top: var(--space-2); padding-bottom: var(--space-2); }
.py-4 { padding-top: var(--space-4); padding-bottom: var(--space-4); }
.py-8 { padding-top: var(--space-8); padding-bottom: var(--space-8); }

/* Margin */
.m-auto { margin: auto; }
.mx-auto { margin-left: auto; margin-right: auto; }
.my-4 { margin-top: var(--space-4); margin-bottom: var(--space-4); }

/* ===== TYPOGRAPHY ===== */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
.text-4xl { font-size: var(--font-size-4xl); }

.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }

.leading-tight { line-height: var(--line-height-tight); }
.leading-normal { line-height: var(--line-height-normal); }
.leading-relaxed { line-height: var(--line-height-relaxed); }

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

/* ===== COLORS ===== */
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-muted { color: var(--color-text-muted); }
.text-error { color: var(--color-error); }
.text-success { color: var(--color-success); }

.bg-surface { background-color: var(--color-surface); }
.bg-elevated { background-color: var(--color-surface-elevated); }
.bg-primary { background-color: var(--color-primary); }
.bg-error { background-color: var(--color-error); }

/* ===== BORDERS ===== */
.rounded-sm { border-radius: var(--radius-sm); }
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }
.rounded-full { border-radius: var(--radius-full); }

.border { border: 1px solid var(--color-border); }
.border-2 { border-width: 2px; }

/* ===== SHADOWS ===== */
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }

/* ===== TRANSITIONS ===== */
.transition { transition: all var(--duration-normal) var(--ease-out); }
.transition-colors { transition: color var(--duration-normal), background-color var(--duration-normal); }
.transition-transform { transition: transform var(--duration-normal) var(--ease-out); }

/* ===== SCREEN READER ===== */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

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

---

## 3. Button Component

### Button CSS

```css
/* components/button/button.css */

/* ===== BUTTON BASE ===== */
.btn {
  /* Display & Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  
  /* Typography */
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  
  /* Spacing */
  padding: var(--space-3) var(--space-4);
  min-height: 44px; /* Touch target */
  min-width: 44px;
  
  /* Border & Shape */
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  
  /* Colors */
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  
  /* Effects */
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  
  /* Transition */
  transition: 
    background-color var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
  
  /* Disabled */
  disabled: {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

/* ===== BUTTON VARIANTS ===== */

/* Primary */
.btn--primary {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.btn--primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

/* Secondary */
.btn--secondary {
  background-color: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn--secondary:hover:not(:disabled) {
  background-color: var(--color-gray-100);
  border-color: var(--color-gray-300);
}

/* Ghost */
.btn--ghost {
  background-color: transparent;
  color: var(--color-text);
  box-shadow: none;
}

.btn--ghost:hover:not(:disabled) {
  background-color: var(--color-gray-100);
}

/* Outline */
.btn--outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn--outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

/* Destructive */
.btn--destructive {
  background-color: var(--color-error);
  color: var(--color-text-inverse);
}

.btn--destructive:hover:not(:disabled) {
  background-color: #b91c1c;
}

/* ===== BUTTON SIZES ===== */

.btn--sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-xs);
  min-height: 36px;
}

.btn--lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--font-size-base);
  min-height: 52px;
}

.btn--icon {
  padding: var(--space-3);
  min-width: 44px;
}

/* ===== BUTTON STATES ===== */

/* Focus */
.btn:focus-visible {
  outline: 2px solid var(--color-focus, var(--color-primary));
  outline-offset: 2px;
}

/* Hover */
.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Active */
.btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* ===== LOADING STATE ===== */

.btn--loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.btn--loading::after {
  content: '';
  position: absolute;
  width: 1em;
  height: 1em;
  top: 50%;
  left: 50%;
  margin-top: -0.5em;
  margin-left: -0.5em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: btn-spinner 0.6s linear infinite;
}

@keyframes btn-spinner {
  to { transform: rotate(360deg); }
}

/* ===== ICON ===== */

.btn__icon {
  width: 1.25em;
  height: 1.25em;
  flex-shrink: 0;
}

/* ===== RESPONSIVE ===== */

@media (max-width: 640px) {
  .btn {
    min-height: 48px; /* Larger touch targets on mobile */
    padding: var(--space-4) var(--space-6);
  }
}
```

### Button HTML

```html
<!-- HTML -->
<button class="btn btn--primary" type="button">
  Primary Button
</button>

<button class="btn btn--secondary btn--sm" type="button">
  Small Secondary
</button>

<button class="btn btn--primary btn--lg" type="button">
  Large Primary
</button>

<button class="btn btn--ghost" type="button">
  <svg class="btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
  With Icon
</button>

<button class="btn btn--destructive" type="button" disabled>
  Disabled
</button>

<!-- Loading state -->
<button class="btn btn--primary btn--loading" type="button" aria-busy="true">
  <span class="sr-only">Loading</span>
</button>
```

### Button JavaScript

```javascript
// components/button/button.js

/**
 * Initialize button behaviors
 */
export function initButtons() {
  // Add loading state on click for form submission
  document.querySelectorAll('button[data-submit]').forEach(button => {
    button.addEventListener('click', handleSubmitClick);
  });
}

/**
 * Handle form submit button
 */
function handleSubmitClick(event) {
  const button = event.currentTarget;
  const form = button.closest('form');
  
  if (!form) return;
  
  // Add loading state
  button.classList.add('btn--loading');
  button.setAttribute('aria-busy', 'true');
  
  // Check form validity
  if (!form.checkValidity()) {
    button.classList.remove('btn--loading');
    button.removeAttribute('aria-busy');
    return;
  }
  
  // Remove loading after timeout (for demo)
  setTimeout(() => {
    button.classList.remove('btn--loading');
    button.removeAttribute('aria-busy');
  }, 2000);
}

/**
 * Create button programmatically
 */
export function createButton(options = {}) {
  const {
    label = 'Button',
    variant = 'primary',
    size = 'default',
    icon = null,
    loading = false,
    disabled = false,
    onClick = null
  } = options;
  
  const button = document.createElement('button');
  button.className = `btn btn--${variant}`;
  if (size !== 'default') button.classList.add(`btn--${size}`);
  if (loading) button.classList.add('btn--loading');
  if (icon) {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'btn__icon';
    iconSpan.textContent = icon;
    button.appendChild(iconSpan);
  }
  button.textContent = label;
  
  if (disabled) button.disabled = true;
  if (onClick) button.addEventListener('click', onClick);
  
  return button;
}
```

---

## 4. Form Components

### Form CSS

```css
/* components/form/form.css */

/* ===== FORM FIELD ===== */
.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* ===== LABELS ===== */
.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.form-label__required {
  color: var(--color-error);
  margin-left: var(--space-1);
}

/* ===== HINTS ===== */
.form-hint {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* ===== INPUTS ===== */
.form-input {
  /* Layout */
  display: block;
  width: 100%;
  
  /* Spacing */
  padding: var(--space-3) var(--space-4);
  min-height: 44px; /* Touch target */
  
  /* Typography */
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  
  /* Border & Shape */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  
  /* Colors */
  background-color: var(--color-surface);
  color: var(--color-text);
  
  /* Placeholder */
  --placeholder-color: var(--color-text-muted);
  &::placeholder {
    color: var(--placeholder-color);
  }
  
  /* Focus */
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
  }
  
  /* Disabled */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--color-gray-100);
  }
}

/* ===== INPUT STATES ===== */

/* Error state */
.form-input--error {
  border-color: var(--color-error);
  
  &:focus {
    border-color: var(--color-error);
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
  }
}

/* Success state */
.form-input--success {
  border-color: var(--color-success);
  
  &:focus {
    border-color: var(--color-success);
    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.15);
  }
}

/* ===== TEXTAREA ===== */
.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* ===== ERROR MESSAGE ===== */
.form-error {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size-sm);
  color: var(--color-error);
}

.form-error__icon {
  width: 1em;
  height: 1em;
  flex-shrink: 0;
}

/* ===== FORM LAYOUT ===== */
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form--inline {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-4);
}

.form--inline .form-field {
  flex: 1;
  min-width: 200px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .form {
    gap: var(--space-4);
  }
  
  .form-input {
    min-height: 48px; /* Larger for mobile */
  }
}
```

### Form HTML

```html
<!-- Basic Form -->
<form class="form" action="/submit" method="POST">
  <!-- Email Field -->
  <div class="form-field">
    <label for="email" class="form-label">
      Email Address
      <span class="form-label__required" aria-hidden="true">*</span>
    </label>
    <input 
      type="email" 
      id="email" 
      name="email"
      class="form-input" 
      placeholder="you@example.com"
      required
      autocomplete="email"
      aria-required="true"
    />
  </div>
  
  <!-- Password Field with Error -->
  <div class="form-field">
    <label for="password" class="form-label">
      Password
    </label>
    <input 
      type="password" 
      id="password" 
      name="password"
      class="form-input form-input--error" 
      autocomplete="current-password"
      aria-describedby="password-error"
      aria-invalid="true"
    />
    <p id="password-error" class="form-error" role="alert">
      <svg class="form-error__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4M12 16h.01"/>
      </svg>
      Password must be at least 8 characters
    </p>
  </div>
  
  <!-- Textarea -->
  <div class="form-field">
    <label for="message" class="form-label">Message</label>
    <textarea 
      id="message" 
      name="message"
      class="form-input form-textarea" 
      rows="4"
      placeholder="Your message..."
    ></textarea>
  </div>
  
  <!-- Submit Button -->
  <button type="submit" class="btn btn--primary btn--lg">
    Send Message
  </button>
</form>
```

### Form JavaScript

```javascript
// components/form/form.js

/**
 * Form validation and handling
 */
export class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = {};
    this.errors = {};
    
    this.init();
  }
  
  init() {
    // Collect fields
    this.form.querySelectorAll('[data-validate]').forEach(input => {
      const name = input.name;
      this.fields[name] = {
        element: input,
        rules: input.dataset.validate?.split('|') || [],
        errorElement: document.getElementById(`${name}-error`)
      };
    });
    
    // Add submit handler
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    
    // Add blur handlers
    Object.entries(this.fields).forEach(([name, field]) => {
      field.element.addEventListener('blur', () => this.validateField(name));
      field.element.addEventListener('input', () => this.clearError(name));
    });
  }
  
  validateField(name) {
    const field = this.fields[name];
    if (!field) return true;
    
    const value = field.element.value;
    let error = null;
    
    // Required
    if (field.rules.includes('required') && !value.trim()) {
      error = 'This field is required';
    }
    
    // Email
    if (field.rules.includes('email') && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Please enter a valid email address';
      }
    }
    
    // Min length
    const minRule = field.rules.find(r => r.startsWith('min:'));
    if (minRule) {
      const min = parseInt(minRule.split(':')[1]);
      if (value.length < min) {
        error = `Must be at least ${min} characters`;
      }
    }
    
    // Password strength
    if (field.rules.includes('password') && value) {
      if (value.length < 8) {
        error = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(value)) {
        error = 'Password must contain an uppercase letter';
      } else if (!/[0-9]/.test(value)) {
        error = 'Password must contain a number';
      }
    }
    
    // Show/hide error
    if (error) {
      this.showError(name, error);
      return false;
    } else {
      this.clearError(name);
      return true;
    }
  }
  
  showError(name, message) {
    const field = this.fields[name];
    field.element.classList.add('form-input--error');
    field.element.setAttribute('aria-invalid', 'true');
    field.element.setAttribute('aria-describedby', `${name}-error`);
    
    if (field.errorElement) {
      field.errorElement.textContent = message;
      field.errorElement.classList.remove('hidden');
    }
  }
  
  clearError(name) {
    const field = this.fields[name];
    field.element.classList.remove('form-input--error');
    field.element.removeAttribute('aria-invalid');
    field.element.removeAttribute('aria-describedby');
    
    if (field.errorElement) {
      field.errorElement.classList.add('hidden');
    }
  }
  
  handleSubmit(event) {
    let isValid = true;
    
    // Validate all fields
    Object.keys(this.fields).forEach(name => {
      if (!this.validateField(name)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      event.preventDefault();
      
      // Focus first error
      const firstError = this.form.querySelector('.form-input--error');
      if (firstError) {
        firstError.focus();
      }
    }
  }
}

// Initialize forms
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    new FormValidator(form);
  });
});
```

---

## 5. Modal Component

### Modal CSS

```css
/* components/modal/modal.css */

/* ===== MODAL BACKDROP ===== */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal-backdrop);
  
  /* Background */
  background-color: var(--color-surface-overlay);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  
  /* Animation */
  opacity: 0;
  visibility: hidden;
  transition: 
    opacity var(--duration-normal) var(--ease-out),
    visibility var(--duration-normal);
}

.modal-backdrop--visible {
  opacity: 1;
  visibility: visible;
}

/* ===== MODAL CONTAINER ===== */
.modal {
  position: fixed;
  z-index: var(--z-modal);
  
  /* Positioning */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  /* Size */
  width: calc(100% - var(--space-8));
  max-width: 32rem; /* max-w-lg */
  max-height: calc(100vh - var(--space-8));
  
  /* Appearance */
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-border);
  
  /* Content */
  padding: var(--space-6);
  
  /* Animation */
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -50%) scale(0.95);
  transition: 
    opacity var(--duration-normal) var(--ease-out),
    visibility var(--duration-normal),
    transform var(--duration-normal) var(--ease-out);
}

.modal--visible {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}

/* ===== MODAL SIZES ===== */
.modal--sm { max-width: 24rem; }
.modal--lg { max-width: 42rem; }
.modal--xl { max-width: 56rem; }
.modal--full {
  max-width: calc(100vw - var(--space-8));
  max-height: calc(100vh - var(--space-8));
}

/* ===== MODAL HEADER ===== */
.modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.modal__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

.modal__description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}

/* ===== CLOSE BUTTON ===== */
.modal__close {
  /* Display */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  /* Size */
  width: 2rem;
  height: 2rem;
  padding: 0;
  
  /* Appearance */
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  
  /* Hover */
  transition: background-color var(--duration-fast);
  
  &:hover {
    background-color: var(--color-gray-100);
    color: var(--color-text);
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}

.modal__close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* ===== MODAL BODY ===== */
.modal__body {
  margin-bottom: var(--space-6);
}

/* ===== MODAL FOOTER ===== */
.modal__footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

@media (min-width: 640px) {
  .modal__footer {
    flex-direction: row;
    justify-content: flex-end;
    gap: var(--space-3);
  }
  
  .modal__footer > * {
    min-width: auto;
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .modal {
    width: calc(100% - var(--space-4));
    padding: var(--space-4);
    border-radius: var(--radius-lg);
  }
}
```

### Modal HTML

```html
<!-- Modal Trigger -->
<button 
  class="btn btn--primary"
  data-modal-trigger="confirm-dialog"
  aria-haspopup="dialog"
>
  Open Dialog
</button>

<!-- Modal -->
<div 
  id="confirm-dialog" 
  class="modal-backdrop"
  role="dialog"
  aria-modal="true"
  aria-labelledby="confirm-dialog-title"
  aria-describedby="confirm-dialog-desc"
  hidden
>
  <div class="modal modal--sm">
    <div class="modal__header">
      <div>
        <h2 id="confirm-dialog-title" class="modal__title">Confirm Action</h2>
        <p id="confirm-dialog-desc" class="modal__description">
          Are you sure you want to proceed?
        </p>
      </div>
      <button 
        class="modal__close" 
        data-modal-close
        aria-label="Close dialog"
      >
        <svg class="modal__close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
    
    <div class="modal__body">
      <p>This action cannot be undone.</p>
    </div>
    
    <div class="modal__footer">
      <button class="btn btn--ghost" data-modal-close>Cancel</button>
      <button class="btn btn--destructive" data-action="confirm">Delete</button>
    </div>
  </div>
</div>
```

### Modal JavaScript

```javascript
// components/modal/modal.js

/**
 * Modal Controller
 */
export class Modal {
  constructor(element) {
    this.element = element;
    this.modal = element.querySelector('.modal');
    this.closeButtons = element.querySelectorAll('[data-modal-close]');
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    // Close buttons
    this.closeButtons.forEach(button => {
      button.addEventListener('click', () => this.close());
    });
    
    // Backdrop click
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.close();
      }
    });
    
    // Escape key
    this.handleEscape = (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    };
    document.addEventListener('keydown', this.handleEscape);
    
    // Focus trap setup
    this.focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
  }
  
  open() {
    this.isOpen = true;
    this.element.hidden = false;
    
    // Animation
    requestAnimationFrame(() => {
      this.element.classList.add('modal-backdrop--visible');
      this.modal.classList.add('modal--visible');
    });
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first focusable element
    const focusable = this.modal.querySelector(this.focusableSelectors);
    if (focusable) {
      focusable.focus();
    }
    
    // Store previous focus
    this.previousFocus = document.activeElement;
  }
  
  close() {
    this.isOpen = false;
    this.element.classList.remove('modal-backdrop--visible');
    this.modal.classList.remove('modal--visible');
    
    // Unlock body scroll
    document.body.style.overflow = '';
    
    // Restore focus
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
    
    // Hide after animation
    setTimeout(() => {
      this.element.hidden = true;
    }, 200);
  }
  
  // Focus trap
  handleTab(e) {
    if (e.key !== 'Tab') return;
    
    const focusable = this.modal.querySelectorAll(this.focusableSelectors);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  
  destroy() {
    document.removeEventListener('keydown', this.handleEscape);
  }
}

// Initialize modals from triggers
document.addEventListener('DOMContentLoaded', () => {
  // Create modals from triggers
  document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
    const modalId = trigger.dataset.modalTrigger;
    const modal = document.getElementById(modalId);
    
    if (modal) {
      trigger.addEventListener('click', () => {
        const modalController = new Modal(modal);
        modalController.open();
      });
    }
  });
  
  // Initialize existing modals
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    new Modal(modal);
  });
});

// Export for programmatic use
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    const controller = new Modal(modal);
    controller.open();
    return controller;
  }
  return null;
}
```

---

## 6. Card Component

### Card CSS

```css
/* components/card/card.css */

/* ===== CARD BASE ===== */
.card {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Appearance */
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  
  /* Overflow */
  overflow: hidden;
  
  /* Transition */
  transition: 
    box-shadow var(--duration-normal) var(--ease-out),
    transform var(--duration-normal) var(--ease-out);
}

/* ===== CARD VARIANTS ===== */

/* Elevated */
.card--elevated {
  border-color: transparent;
  box-shadow: var(--shadow-md);
}

/* Outline */
.card--outline {
  border-width: 2px;
}

/* Ghost */
.card--ghost {
  border-color: transparent;
  background-color: transparent;
}

/* ===== INTERACTIVE CARD ===== */
.card--interactive {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.card--interactive:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card--interactive:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ===== CARD SECTIONS ===== */

.card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.card__header {
  padding: var(--space-6);
  padding-bottom: 0;
}

.card__badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.card__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-top: var(--space-2);
}

.card__description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}

.card__body {
  padding: var(--space-6);
  flex: 1;
}

.card__footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .card__header,
  .card__body,
  .card__footer {
    padding: var(--space-4);
  }
}
```

### Card HTML

```html
<!-- Basic Card -->
<article class="card">
  <img class="card__image" src="image.jpg" alt="Card image">
  <div class="card__header">
    <span class="card__badge">New</span>
    <h3 class="card__title">Card Title</h3>
    <p class="card__description">Card description text</p>
  </div>
  <div class="card__body">
    <p>Additional content goes here.</p>
  </div>
  <div class="card__footer">
    <button class="btn btn--ghost btn--sm">Cancel</button>
    <button class="btn btn--primary btn--sm">Action</button>
  </div>
</article>

<!-- Interactive Card (Link) -->
<a href="/product/123" class="card card--interactive card--elevated">
  <img class="card__image" src="product.jpg" alt="Product image">
  <div class="card__header">
    <span class="card__badge">$99</span>
    <h3 class="card__title">Product Name</h3>
    <p class="card__description">Product description</p>
  </div>
</a>

<!-- Interactive Card (Click) -->
<div class="card card--interactive card--elevated" role="button" tabindex="0" onclick="handleCardClick()">
  <div class="card__body">
    <h3 class="card__title">Clickable Card</h3>
    <p class="card__description">Click anywhere on this card</p>
  </div>
</div>
```

---

## 7. Navigation

### Navigation CSS

```css
/* components/navigation/navigation.css */

/* ===== SKIP LINK ===== */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  z-index: var(--z-fixed);
  
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  
  transition: top var(--duration-fast);
}

.skip-link:focus {
  top: var(--space-4);
}

/* ===== NAV BAR ===== */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  
  padding: var(--space-4) var(--space-6);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  
  /* Sticky header */
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.nav__logo {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
}

/* ===== NAV LINKS ===== */
.nav__links {
  display: none;
  align-items: center;
  gap: var(--space-1);
  list-style: none;
}

@media (min-width: 768px) {
  .nav__links {
    display: flex;
  }
}

.nav__link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  
  transition: 
    color var(--duration-fast),
    background-color var(--duration-fast);
}

.nav__link:hover {
  color: var(--color-text);
  background-color: var(--color-gray-100);
}

.nav__link--active {
  color: var(--color-text);
  background-color: var(--color-gray-100);
  font-weight: var(--font-weight-semibold);
}

.nav__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 var(--space-1);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-full);
}

/* ===== MOBILE MENU ===== */
.nav__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text);
  
  @media (min-width: 768px) {
    display: none;
  }
}

.nav__toggle-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.nav__mobile {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4);
}

.nav__mobile--open {
  display: block;
}

@media (min-width: 768px) {
  .nav__mobile {
    display: contents;
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .nav {
    padding: var(--space-3) var(--space-4);
  }
  
  .nav__mobile {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 80%;
    max-width: 320px;
    border-bottom: none;
    border-right: 1px solid var(--color-border);
    z-index: var(--z-modal);
    padding: var(--space-6);
  }
}
```

### Navigation HTML

```html
<!-- Skip Link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Navigation -->
<nav class="nav" role="navigation" aria-label="Main navigation">
  <a href="/" class="nav__logo">Logo</a>
  
  <!-- Desktop Links -->
  <ul class="nav__links">
    <li>
      <a href="/" class="nav__link nav__link--active">
        Home
      </a>
    </li>
    <li>
      <a href="/about" class="nav__link">
        About
      </a>
    </li>
    <li>
      <a href="/products" class="nav__link">
        Products
        <span class="nav__badge">3</span>
      </a>
    </li>
    <li>
      <a href="/contact" class="nav__link">
        Contact
      </a>
    </li>
  </ul>
  
  <!-- Mobile Toggle -->
  <button 
    class="nav__toggle" 
    aria-expanded="false" 
    aria-controls="mobile-menu"
    aria-label="Open menu"
  >
    <svg class="nav__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  </button>
  
  <!-- Mobile Menu -->
  <div id="mobile-menu" class="nav__mobile">
    <ul class="nav__links" style="display: flex; flex-direction: column;">
      <li><a href="/" class="nav__link nav__link--active">Home</a></li>
      <li><a href="/about" class="nav__link">About</a></li>
      <li><a href="/products" class="nav__link">Products</a></li>
      <li><a href="/contact" class="nav__link">Contact</a></li>
    </ul>
  </div>
</nav>

<!-- Main Content -->
<main id="main-content" tabindex="-1">
  <!-- Page content -->
</main>
```

### Navigation JavaScript

```javascript
// components/navigation/navigation.js

export function initNavigation() {
  // Mobile menu toggle
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__mobile');
  
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('nav__mobile--open');
      
      mobileMenu.classList.toggle('nav__mobile--open');
      toggle.setAttribute('aria-expanded', !isOpen);
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('nav__mobile--open')) {
        mobileMenu.classList.remove('nav__mobile--open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('nav__mobile--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  
  // Active link highlighting
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('nav__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

document.addEventListener('DOMContentLoaded', initNavigation);
```

---

## 8. Animation Patterns

### CSS Animation Utilities

```css
/* styles/animations.css */

/* ===== FADE IN ===== */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn var(--duration-normal) var(--ease-out) forwards;
}

/* ===== SLIDE UP ===== */
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp var(--duration-normal) var(--ease-out) forwards;
}

/* ===== SCALE IN ===== */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn var(--duration-normal) var(--ease-out) forwards;
}

/* ===== STAGGER DELAYS ===== */
.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 50ms; }
.stagger > *:nth-child(3) { animation-delay: 100ms; }
.stagger > *:nth-child(4) { animation-delay: 150ms; }
.stagger > *:nth-child(5) { animation-delay: 200ms; }
.stagger > *:nth-child(6) { animation-delay: 250ms; }
.stagger > *:nth-child(7) { animation-delay: 300ms; }
.stagger > *:nth-child(8) { animation-delay: 350ms; }

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up,
  .animate-scale-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

/* ===== HOVER EFFECTS ===== */
.hover-lift {
  transition: transform var(--duration-normal) var(--ease-out);
}

.hover-lift:hover {
  transform: translateY(-4px);
}

.hover-scale {
  transition: transform var(--duration-fast) var(--ease-out);
}

.hover-scale:hover {
  transform: scale(1.02);
}

/* ===== LOADING SPINNER ===== */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* ===== PULSE ===== */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* ===== SHAKE ===== */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
```

### JavaScript Animation Helpers

```javascript
// lib/animation.js

/**
 * Intersection Observer for scroll animations
 */
export function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
  document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/**
 * Animate on hover
 */
export function initHoverAnimations() {
  document.querySelectorAll('[data-hover-animate]').forEach(el => {
    const config = JSON.parse(el.dataset.hoverAnimate || '{}');
    
    el.addEventListener('mouseenter', () => {
      el.style.transform = `translate(${config.x || 0}px, ${config.y || -4}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

/**
 * Reduced motion detection
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Apply reduced motion class to html
if (prefersReducedMotion()) {
  document.documentElement.classList.add('reduced-motion');
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initHoverAnimations();
});
```

---

## Component Index

```javascript
// components/index.js

// Export all components
export { initButtons, createButton } from './button/button.js';
export { FormValidator } from './form/form.js';
export { Modal, openModal } from './modal/modal.js';
export { initNavigation } from './navigation/navigation.js';
export { initScrollAnimations, initHoverAnimations } from './animation.js';
```

```javascript
// app.js - Main entry point

import {
  initButtons,
  initNavigation,
  initScrollAnimations
} from './components/index.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  initButtons();
  initNavigation();
  initScrollAnimations();
});
```

Last updated: 2026-06-03 (v1.6.3)