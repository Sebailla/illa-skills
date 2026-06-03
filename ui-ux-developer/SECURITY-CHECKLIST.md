# UI Security Checklist

Comprehensive security guidelines for CSS and UI components. Covers XSS prevention, CSP considerations, and safe patterns for dynamic styling.

---

## Table of Contents

1. [Overview](#1-overview)
2. [XSS Prevention](#2-xss-prevention)
3. [CSS Security](#3-css-security)
4. [Inline Styles](#4-inline-styles)
5. [Dynamic Values](#5-dynamic-values)
6. [CSP Considerations](#6-csp-considerations)
7. [Accessibility Security](#7-accessibility-security)
8. [Checklist](#8-checklist)

---

## 1. Overview

### Security Principles

| Principle | Description |
|-----------|-------------|
| **Never trust user input** | All dynamic values must be sanitized |
| **Defense in depth** | Multiple layers of protection |
| **Least privilege** | Minimal permissions for components |
| **Safe by default** | Assume all content is potentially malicious |

### Common Attack Vectors in UI

1. **XSS via innerHTML/innerText** - User input rendered as HTML
2. **CSS injection** - Malicious values in dynamic styles
3. **Resource hijacking** - Unsafe external resource references
4. **Clickjacking** - Hidden overlays tricking users
5. **Attribute injection** - Malicious values in data attributes

---

## 2. XSS Prevention

### Dangerous Patterns

```typescript
// ❌ NEVER do this - XSS vulnerability
element.innerHTML = userInput;
element.innerHTML = `<div>${userName}</div>`;

// ❌ NEVER do this - event handler injection
element.setAttribute('onclick', userFunction);
element.innerHTML = `<img src="x" onerror="alert(1)">`;
```

### Safe Patterns

```typescript
// ✅ Use textContent for text
element.textContent = userName;

// ✅ Use setAttribute with validation
element.setAttribute('data-id', sanitizeId(userId));

// ✅ Use classList for classes
element.classList.add('btn', 'btn-primary');

// ✅ Use style properties
element.style.color = sanitizeColor(userColor);

// ✅ Use proper escaping
import { escapeHtml } from './utils';
element.innerHTML = `<span>${escapeHtml(userName)}</span>`;
```

### HTML Escaping

```typescript
// Basic HTML escaping
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// For attributes specifically
function escapeAttribute(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
```

### React Security

```tsx
// ❌ Dangerous - allows XSS
function DangerousComponent({ userInput }: { userInput: string }) {
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
}

// ✅ Safe - uses React's built-in escaping
function SafeComponent({ userInput }: { userInput: string }) {
  return <div>{userInput}</div>;
}

// ✅ Safe - sanitize before rendering
import DOMPurify from 'dompurify';

function SanitizedComponent({ userInput }: { userInput: string }) {
  const sanitized = DOMPurify.sanitize(userInput);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

---

## 3. CSS Security

### CSS Injection Prevention

```css
/* ❌ NEVER use user input directly in styles */
.element {
  /* User input directly injected - DANGEROUS */
  color: var(--user-color);
  background-image: url('data:image/svg+xml,<svg>...</svg>');
}

/* ✅ Validate and sanitize before use */
.element {
  /* Pre-approved color values only */
  color: var(--color-primary, #0066cc);
  background-color: var(--color-safe-bg, #ffffff);
}
```

### Safe CSS Variables

```typescript
// ❌ Never use user input directly as CSS variable
const userColor = request.query.color; // attacker can inject
element.style.setProperty('--user-color', userColor);

// ✅ Use allowlist
const ALLOWED_COLORS = ['#0066cc', '#1d4ed8', '#10b981', '#ef4444'];

function getSafeColor(input: string): string {
  if (ALLOWED_COLORS.includes(input)) {
    return input;
  }
  return '#0066cc'; // default
}

element.style.setProperty('--color', getSafeColor(userColor));
```

### URL Validation

```typescript
// ❌ Dangerous - URL injection
const userBg = request.query.bg;
element.style.backgroundImage = `url(${userBg})`;

// ✅ Safe - URL validation
const ALLOWED_PATTERNS = [
  /^https:\/\/example\.com\/images\//,
  /^\/assets\//,
  /^data:image\/(png|jpg|svg\+xml);base64,/,
];

function isSafeUrl(url: string): boolean {
  return ALLOWED_PATTERNS.some(pattern => pattern.test(url));
}

// Usage
if (isSafeUrl(userProvidedUrl)) {
  element.style.backgroundImage = `url(${userProvidedUrl})`;
}
```

### SVG Injection Prevention

```html
<!-- ❌ Dangerous - SVG with script -->
<svg>
  <script>alert('xss')</script>
</svg>

<!-- ❌ Dangerous - onerror handler -->
<img src="x" onerror="alert(1)">

<!-- ✅ Safe - no script support in SVG -->
<svg>
  <rect fill="blue" />
</svg>

<!-- ✅ Safe - use external image with CSP -->
<img src="/safe-image.jpg" alt="Description" />
```

---

## 4. Inline Styles

### When Inline Styles Are Acceptable

```typescript
// ✅ Acceptable - static known values
element.style.color = '#0066cc';
element.style.fontSize = '16px';

// ✅ Acceptable - validated values from config
const config = { primaryColor: '#0066cc' };
element.style.backgroundColor = config.primaryColor;

// ❌ Dangerous - direct user input without validation
element.style.backgroundColor = req.query.color;
```

### Safe Dynamic Styles

```typescript
// ✅ Safe pattern - use CSS custom properties with validation
function setThemeColor(color: string) {
  // Validate hex color format
  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(color);
  
  if (isValidHex) {
    document.documentElement.style.setProperty('--theme-color', color);
  }
}

// ✅ Safe pattern - use class toggling
const THEMES = {
  light: { bg: '#ffffff', text: '#000000' },
  dark: { bg: '#0a0a0a', text: '#ffffff' },
};

function setTheme(themeName: 'light' | 'dark') {
  const theme = THEMES[themeName] || THEMES.light;
  document.documentElement.style.setProperty('--bg', theme.bg);
  document.documentElement.style.setProperty('--text', theme.text);
}
```

### CSS Custom Properties vs Classes

```typescript
// ❌ Danger: Direct style manipulation
element.style.setProperty('background-color', userInput);

// ✅ Better: Use data attributes and CSS
element.dataset.theme = userTheme; // validated theme name

// CSS
[data-theme="dark"] {
  --bg: #0a0a0a;
  --text: #ffffff;
}
```

### Class-Based Theming

```typescript
// ✅ Best practice - class-based theming
function applyTheme(theme: 'light' | 'dark' | 'high-contrast') {
  // Remove existing theme
  document.body.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');
  
  // Apply validated theme
  if (theme === 'light' || theme === 'dark' || theme === 'high-contrast') {
    document.body.classList.add(`theme-${theme}`);
  }
}

// CSS
.theme-light { --bg: #ffffff; --text: #000000; }
.theme-dark { --bg: #0a0a0a; --text: #ffffff; }
.theme-high-contrast { --bg: #000000; --text: #ffff00; }
```

---

## 5. Dynamic Values

### Form Input Validation

```typescript
// ❌ Never use form input directly in styles
input.addEventListener('input', (e) => {
  preview.style.fontSize = e.target.value + 'px'; // Can inject
});

// ✅ Validate and constrain
input.addEventListener('input', (e) => {
  const size = parseInt(e.target.value, 10);
  if (size >= 12 && size <= 72) {
    preview.style.fontSize = size + 'px';
  }
});
```

### Color Picker Security

```typescript
// ❌ Dangerous - arbitrary color injection
colorInput.addEventListener('input', (e) => {
  preview.style.color = e.target.value;
});

// ✅ Safe - hex validation
colorInput.addEventListener('input', (e) => {
  const hex = e.target.value;
  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    preview.style.color = hex;
  }
});

// ✅ Best - use color input with validation
<input type="color" onchange="handleColor(this.value)" />
```

### Background Image Validation

```typescript
// ❌ Dangerous
bgInput.addEventListener('input', (e) => {
  container.style.backgroundImage = `url(${e.target.value})`;
});

// ✅ Safe - URL validation
bgInput.addEventListener('input', (e) => {
  const url = e.target.value;
  if (isSafeUrl(url)) {
    container.style.backgroundImage = `url(${url})`;
  }
});
```

### Number/Size Validation

```typescript
// ❌ Dangerous - arbitrary number injection
input.addEventListener('input', (e) => {
  element.style.width = e.target.value + 'px';
});

// ✅ Safe - constrain to valid range
input.addEventListener('input', (e) => {
  const value = parseInt(e.target.value, 10);
  const clamped = Math.min(Math.max(value, 1), 1000);
  element.style.width = clamped + 'px';
});
```

---

## 6. CSP Considerations

### Content Security Policy (Modern Approach)

> ⚠️ **IMPORTANT:** The `unsafe-inline` directive weakens CSP protection. Use nonce or hash-based approach instead.

#### Nonce-Based CSP (Recommended)

```html
<!-- Server generates unique nonce per request -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
             script-src 'self' 'nonce-{server-generated-nonce}'; 
             style-src 'self' 'nonce-{server-generated-nonce}' https://fonts.googleapis.com; 
             font-src https://fonts.gstatic.com; 
             img-src 'self' https: data:;">
```

#### Server-Side Nonce Generation

```typescript
// Server (Node.js/Express example)
import crypto from 'crypto';

function addCSPHeaders(req, res, next) {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'`
  );
  res.locals.nonce = nonce;
  next();
}

// Inject nonce into scripts/styles in template
app.use((req, res, next) => {
  res.locals.cspNonce = res.locals.nonce;
  next();
});

// In your template (EJS/HBS/etc)
<script nonce="<%= cspNonce %>" src="/app.js"></script>
```

#### Hash-Based CSP (Alternative)

```html
<!-- For static inline scripts, use SHA-256 hash -->
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'sha256-{base64-encoded-sha256-of-script}'">

<!-- Generate hash -->
<!-- $ echo -n "console.log('hello')" | openssl dgst -sha256 -binary | base64 -->
```

#### Legacy CSP with unsafe-inline (Not Recommended)

```html
<!-- ❌ ONLY use if nonce/hash is not possible -->
<!-- This is weaker but still better than no CSP -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

### Safe External Resources

```html
<!-- ✅ Safe - Google Fonts with CSP -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">

<!-- ✅ Safe - self-hosted fonts -->
<link href="/fonts/inter.woff2" rel="preload" as="font" crossorigin>
```

### Inline Style Security

```html
<!-- ❌ Dangerous - user-controlled inline style -->
<div style="color: <%= user.color %>"></div>

<!-- ✅ Safe - predefined styles via class -->
<div class="color-<%= user.preference %>"></div>

<!-- ✅ Safe - CSS variables with validation -->
<style>
  :root {
    --theme-color: <%= sanitizeColor(user.color) %>;
  }
</style>
```

### Data URL Security

```html
<!-- ⚠️ Caution with data URLs -->
<!-- These can contain scripts in older browsers -->
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><script>alert(1)</script></svg>" />

<!-- ✅ Safer - only use for trusted formats -->
<img src="data:image/png;base64,iVBORw0KGgo..." alt="Description" />
```

---

## 7. Accessibility Security

### Focus Hijacking Prevention

```css
/* ❌ Never hide focus indicators without replacement */
button:focus {
  outline: none; /* Bad */
}

/* ✅ Always provide visible focus indicator */
button:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

### Hidden Content

```css
/* ❌ Screen reader ignores hidden content incorrectly */
.sr-only {
  display: none; /* Bad - also hides from screen readers */
}

/* ✅ Use proper screen reader only class */
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
```

### ARIA Security

```html
<!-- ❌ Dangerous - dynamic ARIA without sanitization -->
<div aria-describedby="<%= userInput %>"></div>

<!-- ✅ Safe - predefined ARIA relationships -->
<div aria-describedby="password-hint"></div>

<!-- ✅ Safe - validate dynamic ARIA -->
<div aria-describedby="<%= validateId(userInput) %>"></div>
```

### Link Security

```html
<!-- ❌ Dangerous - user input in href -->
<a href="<%= user.website %>">Website</a>

<!-- ✅ Safe - validate URL scheme -->
<a href="<%= safeUrl(user.website) %>">Website</a>
```

---

## 8. Checklist

### Pre-Development

- [ ] **XSS Prevention**
  - [ ] All user input is validated before rendering
  - [ ] HTML escaping functions are available
  - [ ] No `dangerouslySetInnerHTML` with unsanitized content
  - [ ] No `innerHTML` with user input

- [ ] **CSS Security**
  - [ ] No user input directly in styles
  - [ ] CSS variables use allowlists
  - [ ] URL validation for background images
  - [ ] SVG content is sanitized

- [ ] **CSP**
  - [ ] CSP meta tag configured
  - [ ] External resources are trusted
  - [ ] Inline styles are minimized

### Implementation

- [ ] **Dynamic Values**
  - [ ] Color inputs validated (hex format)
  - [ ] URL inputs validated (scheme allowlist)
  - [ ] Number inputs constrained (min/max)
  - [ ] Class names validated

- [ ] **Accessibility**
  - [ ] Focus indicators are visible
  - [ ] Screen reader content is accessible
  - [ ] ARIA attributes are sanitized
  - [ ] Links have safe destinations

- [ ] **Third-Party**
  - [ ] CDN resources are from trusted sources
  - [ ] Fonts are self-hosted or from verified CDN
  - [ ] Icons are from verified sources

### Review

- [ ] **Code Review**
  - [ ] No `eval()` for dynamic styles
  - [ ] No string concatenation in styles
  - [ ] All dynamic values are validated
  - [ ] No inline `<script>` injection

- [ ] **Testing**
  - [ ] XSS payload testing on all input fields
  - [ ] CSS injection testing (data:, javascript:, etc.)
  - [ ] CSP header testing
  - [ ] Focus indicator visibility testing

---

## Quick Reference

### Do

```typescript
// ✅ Always validate
element.style.color = validateHex(userColor);
element.className = validateClassName(userClass);

// ✅ Use allowlists
const ALLOWED = ['primary', 'secondary', 'danger'];
if (ALLOWED.includes(userChoice)) {
  element.classList.add(userChoice);
}

// ✅ Escape HTML
element.textContent = userName; // React
element.innerText = userName;   // Vanilla

// ✅ Validate URLs
if (/^https:\/\//.test(userUrl)) {
  link.href = userUrl;
}
```

### Don't

```typescript
// ❌ Never do this
element.innerHTML = userInput;
element.setAttribute('style', userStyles);
element.style.cssText = userStyles;
element.setAttribute('onclick', userFunction);
```

---

## Resources

- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [React Security](https://react.dev/learn/securing-classic-children-components)

---

Last updated: 2026-06-03 (v1.6.3)