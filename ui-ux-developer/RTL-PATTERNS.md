# RTL (Right-to-Left) Patterns

**Comprehensive guide for building RTL-aware user interfaces with Tailwind v4 and modern CSS.**

**Version:** 1.6.1
**Last updated:** 2026-06-03

---

## Table of Contents

1. [Overview](#1-overview)
2. [RTL Fundamentals](#2-rtl-fundamentals)
3. [CSS Logical Properties](#3-css-logical-properties)
4. [Tailwind v4 Logical Utilities](#4-tailwind-v4-logical-utilities)
5. [Common RTL Adaptations](#5-common-rtl-adaptations)
6. [Testing Checklist](#6-testing-checklist)

---

## 1. Overview

Right-to-left (RTL) languages include Arabic, Hebrew, Persian, Urdu, and others. Building RTL-aware interfaces ensures accessibility for over 400 million users worldwide.

### Supported Languages

| Language | Region | RTL |
|----------|--------|-----|
| Arabic | Middle East, North Africa | ✓ |
| Hebrew | Israel | ✓ |
| Persian (Farsi) | Iran, Afghanistan | ✓ |
| Urdu | Pakistan, India | ✓ |
| Pashto | Afghanistan, Pakistan | ✓ |

### Questionnaire Integration

When using the ui-ux-developer skill questionnaire (SKILL.md), answer "Yes" to RTL question (Q10) to enable RTL guidance.

---

## 2. RTL Fundamentals

### Setting Text Direction

**HTML attribute method:**

```html
<!-- Per-element -->
<p dir="rtl">النص العربي</p>

<!-- Document-wide -->
<html dir="rtl" lang="ar">
```

**CSS method:**

```css
/* Document direction */
[dir="rtl"] {
  direction: rtl;
}

/* Specific section */
.sidebar {
  direction: rtl;
}
```

### Directional Terms

| LTR Term | RTL Equivalent |
|----------|----------------|
| Left | Right |
| Right | Left |
| Start | End (logical) |
| End | Start (logical) |
| Before | After (logical) |
| After | Before (logical) |

---

## 3. CSS Logical Properties

Logical properties replace physical properties (left/right/top/bottom) with directional equivalents.

### Physical vs Logical

```css
/* Physical (LTR only) */
padding-left: 1rem;
margin-right: 2rem;
border-top: 1px solid #ccc;

/* Logical (RTL-aware) */
padding-inline-start: 1rem;
margin-inline-end: 2rem;
border-block-start: 1px solid #ccc;
```

### Logical Property Mapping

| Physical | Logical | Meaning |
|-----------|---------|---------|
| margin-left | margin-inline-start | Start margin |
| margin-right | margin-inline-end | End margin |
| padding-left | padding-inline-start | Start padding |
| padding-right | padding-inline-end | End padding |
| border-left | border-inline-start | Start border |
| border-right | border-inline-end | End border |
| top | block-start | Block start |
| bottom | block-end | Block end |
| left | inline-start | Inline start |
| right | inline-end | Inline end |

### Border Radius Logical Properties

```css
/* Physical */
border-top-left-radius: 50%;
border-bottom-right-radius: 50%;

/* Logical */
border-start-start-radius: 50%;  /* top-left in LTR, top-right in RTL */
border-end-end-radius: 50%;      /* bottom-right in LTR, bottom-left in RTL */
```

### Position Logical Properties

```css
/* Physical */
left: 0;
right: 0;
top: 0;
bottom: 0;

/* Logical */
inset-inline-start: 0;
inset-inline-end: 0;
inset-block-start: 0;
inset-block-end: 0;

/* Shorthand */
inset-inline: 0 100%;    /* horizontal position */
inset-block: 0 100%;     /* vertical position */
```

### Text Alignment

```css
/* Physical */
text-align: left;

/* Logical */
text-align: start;
```

---

## 4. Tailwind v4 Logical Utilities

Tailwind v4 provides logical properties as utilities.

### Inline Direction (Horizontal)

| Utility | CSS Output | Direction |
|---------|-----------|-----------|
| ms-* | margin-inline-start | Start margin |
| me-* | margin-inline-end | End margin |
| ps-* | padding-inline-start | Start padding |
| pe-* | padding-inline-end | End padding |
| ps-4 | padding-inline-start: 1rem | Start padding |

### Block Direction (Vertical)

| Utility | CSS Output | Direction |
|---------|-----------|-----------|
| mb-* | margin-block-start | Block start margin |
| mt-* | margin-block-end | Block end margin |
| pb-* | padding-block-start | Block start padding |
| pt-* | padding-block-end | Block end padding |

### Text Alignment

| Utility | CSS Output |
|---------|-----------|
| text-start | text-align: start |
| text-end | text-align: end |

### Border Radius

| Utility | CSS Output |
|---------|-----------|
| rounded-ss-* | border-start-start-radius |
| rounded-se-* | border-start-end-radius |
| rounded-es-* | border-end-start-radius |
| rounded-ee-* | border-end-end-radius |
| rounded-s-* | border-start-start-radius + border-start-end-radius |
| rounded-e-* | border-end-start-radius + border-end-end-radius |

### Example: RTL Card Component

```html
<!-- LTR: Icon on left, text center, arrow right -->
<!-- RTL: Icon on right, text center, arrow left -->

<div class="flex items-center gap-4 p-4">
  <!-- Use logical margin (ms-auto pushes to inline-end) -->
  <Icon class="text-gray-500" />
  <span class="flex-1">Card Title</span>
  <span class="ms-auto text-gray-400">→</span>
</div>
```

### Complete RTL Button Example

```html
<!-- LTR: Icon left, text, icon right -->
<!-- RTL: Icon right, text, icon left -->

<button class="
  flex items-center gap-2
  ps-4 pe-3           <!-- Logical padding -->
  rounded-s-lg        <!-- Start radius -->
  text-start         <!-- Text alignment -->
">
  <IconArrowRight class="me-2" />  <!-- rtl: me-2 = left margin in LTR, right margin in RTL -->
  <span>Action</span>
</button>
```

---

## 5. Common RTL Adaptations

### Icons and Symbols

Directional icons must flip in RTL:

| Icon | LTR Direction | RTL Direction |
|------|---------------|---------------|
| Arrow | → | ← |
| Chevron | > | < |
| Back button | ← Back | Back → |
| Progress | Left → Right | Right → Left |
| Timeline | Top → Bottom | Top → Bottom (same) |

```html
<!-- SVG flip for RTL using CSS -->
<svg class="rtl:rotate-180" viewBox="0 0 24 24">
  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
</svg>
```

### Navigation

```html
<!-- LTR: Logo left, nav center, actions right -->
<!-- RTL: Logo right, nav center, actions left -->

<nav class="flex justify-between items-center">
  <!-- Actions (pulled to inline-start) -->
  <div class="flex gap-4 me-auto">  <!-- me-auto = margin-inline-end: auto -->
    <a href="/en">EN</a>
    <a href="/profile">Profile</a>
  </div>
  
  <!-- Logo (pulled to inline-end) -->
  <Logo class="ms-auto" />
</nav>
```

### Sidebars and Layouts

```html
<!-- Sidebar positioning -->
<aside class="
  w-64
  me-4              <!-- LTR: margin-right, RTL: margin-left -->
">
  Sidebar content
</aside>

<!-- Main content -->
<main class="
  flex-1
  ms-4              <!-- LTR: margin-left, RTL: margin-right -->
">
  Main content
</main>
```

### Forms

```html
<!-- Labels and inputs adapt automatically with logical properties -->
<div class="flex flex-col gap-2">
  <label for="name">Name</label>
  <input id="name" type="text" class="w-full max-w-sm" />
</div>

<!-- Help text placement -->
<div class="flex flex-col gap-2">
  <label for="email">Email</label>
  <input id="email" type="email" />
  <span class="text-sm text-gray-500 ms-2">  <!-- Logical inline-start margin -->
    Help text here
  </span>
</div>
```

### Tables

```html
<!-- Text alignment in tables -->
<table>
  <thead>
    <tr>
      <th class="text-start">Name</th>       <!-- Aligned to logical start -->
      <th class="text-end">Date</th>          <!-- Aligned to logical end -->
      <th class="text-center">Actions</th>    <!-- Center stays same -->
    </tr>
  </thead>
</table>
```

### Progress Bars

```html
<!-- RTL-aware progress bar -->
<div class="relative h-2 bg-gray-200 rounded w-64">
  <div 
    class="absolute inset-block-start-0 h-full rounded"
    style="width: 75%"
  />
</div>
```

---

## 6. Testing Checklist

### RTL Testing Steps

1. [ ] **Add `dir="rtl"`** to HTML element
2. [ ] **Update `lang` attribute** (e.g., `lang="ar"`)
3. [ ] **Replace physical CSS** with logical properties
4. [ ] **Flip directional icons** (arrows, chevrons)
5. [ ] **Adjust text alignment** (use `text-start/end`)
6. [ ] **Test layout** with `display: direction` dev tools
7. [ ] **Test with actual RTL content** (Arabic, Hebrew)

### Browser DevTools

Quick RTL testing in Chrome/Firefox:

```javascript
// Toggle RTL in console
document.dir = 'rtl';  // or 'ltr'
document.documentElement.lang = 'ar';
```

### Common Mistakes to Avoid

| Mistake | Solution |
|---------|----------|
| Using `margin-left` instead of `ms-*` | Use logical properties |
| Hardcoding direction in CSS | Use logical properties |
| Icons not flipping | Use `rtl:rotate-180` transform |
| Text alignment `left/right` | Use `text-start/text-end` |
| Not setting lang attribute | Always set `lang="ar"` for Arabic |

### CSS Checklist

```css
/* ❌ Avoid physical properties for margins/padding */
.element {
  margin-left: 1rem;        /* BAD */
  margin-right: auto;       /* BAD */
  padding-left: 1rem;       /* BAD */
}

/* ✅ Use logical properties */
.element {
  margin-inline-start: 1rem;  /* GOOD */
  margin-inline-end: auto;    /* GOOD */
  padding-inline-start: 1rem;  /* GOOD */
}
```

### Tailwind Checklist

```html
<!-- ❌ Avoid physical utilities -->
<div class="ml-4 mr-auto pl-2 contents-center">

<!-- ✅ Use logical utilities -->
<div class="ms-4 me-auto ps-2 text-start text-end">
```

---

## Related Documentation

- [CSS-PATTERNS.md](./CSS-PATTERNS.md) — CSS patterns and utilities
- [MIGRATION.md](./MIGRATION.md) — Tailwind v3 to v4 migration
- [CHECKLIST.md](./CHECKLIST.md) — WCAG accessibility checklist
