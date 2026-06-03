# i18n Patterns Guide

Quick reference for internationalization support in ui-ux-developer skill.

**Version:** 1.6.2
**Last updated:** 2026-06-03

---

## Table of Contents

1. [Overview](#1-overview)
2. [CSS Logical Properties](#2-css-logical-properties)
3. [Font Stacks](#3-font-stacks)
4. [Content Guidelines](#4-content-guidelines)
5. [Tools & Libraries](#5-tools--libraries)

---

## 1. Overview

i18n support in ui-ux-developer is achieved through:

| Aspect | Approach |
|--------|----------|
| **Layout** | CSS logical properties (`margin-inline-start`, not `margin-left`) |
| **Typography** | Language-specific font stacks |
| **Content** | Dynamic string loading from translation files |
| **Direction** | `dir` attribute + Tailwind logical utilities |

### Quick Checklist

- [ ] Use CSS logical properties for margins, padding, borders
- [ ] Include language-specific fonts in font stack
- [ ] Extract hardcoded strings to translation files
- [ ] Test with longer text (German, French)
- [ ] Test with RTL languages (Arabic, Hebrew)

---

## 2. CSS Logical Properties

### Instead of Physical Properties

| ❌ Physical | ✅ Logical |
|-------------|-----------|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `border-left` | `border-inline-start` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |
| `float: left` | `float: inline-start` |
| `float: right` | `float: inline-end` |

### Tailwind Logical Classes

```html
<!-- Physical (avoid) -->
<div class="ml-4 mr-2 pl-4">

<!-- Logical (preferred) -->
<div class="ms-4 me-2 ps-4">
```

| Physical | Logical | Description |
|----------|---------|-------------|
| `ml-4` | `ms-4` | margin-start |
| `mr-4` | `me-4` | margin-end |
| `pl-4` | `ps-4` | padding-start |
| `pr-4` | `pe-4` | padding-end |
| `text-left` | `text-start` | text alignment |
| `text-right` | `text-end` | text alignment |

### Full Logical Property Reference

```css
/* Margins */
margin-block: /* top + bottom */
margin-block-start: /* top */
margin-block-end: /* bottom */
margin-inline: /* left + right */
margin-inline-start: /* left (LTR) / right (RTL) */
margin-inline-end: /* right (LTR) / left (RTL) */

/* Padding */
padding-block: /* top + bottom */
padding-inline: /* left + right */

/* Borders */
border-block: /* top + bottom */
border-inline: /* left + right */
border-block-start: /* top */
border-block-end: /* bottom */
border-inline-start: /* left (LTR) / right (RTL) */
border-inline-end: /* right (LTR) / left (RTL) */

/* Positioning */
inset-block: /* top + bottom */
inset-inline: /* left + right */
```

### Tailwind v4 Logical Utilities

```html
<!-- Border -->
<button class="border-s-2 border-s-primary">Left border</button>
<button class="border-e-2 border-e-primary">Right border</button>

<!-- Rounded -->
<div class="rounded-s-lg">Start rounded</div>
<div class="rounded-e-lg">End rounded</div>

<!-- Text -->
<p class="text-start">Left (LTR) / Right (RTL)</p>
<p class="text-end">Right (LTR) / Left (RTL)</p>

<!-- Float -->
<div class="float-start">Float start</div>
<div class="float-end">Float end</div>
```

---

## 3. Font Stacks

### Language-Specific Stacks

```css
/* Default (Latin) */
--font-body: 'Inter', system-ui, sans-serif;

/* Arabic */
--font-body: 'Noto Sans Arabic', 'Inter', system-ui, sans-serif;

/* Japanese */
--font-body: 'Noto Sans JP', 'Hiragino Sans', sans-serif;

/* Chinese */
--font-body: 'Noto Sans SC', 'PingFang SC', sans-serif;

/* Korean */
--font-body: 'Noto Sans KR', 'Malgun Gothic', sans-serif;

/* Hebrew */
--font-body: 'Heebo', 'Noto Sans Hebrew', sans-serif;
```

### Google Fonts for Multi-Language

```html
<!-- Arabic -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet">

<!-- Hebrew -->
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&display=swap" rel="stylesheet">

<!-- Japanese -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">

<!-- Chinese Simplified -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">

<!-- Chinese Traditional -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap" rel="stylesheet">
```

### Variable Font for CJK

```css
/* Noto Sans SC with variable weight */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap');

:root {
  --font-body: 'Noto Sans SC', system-ui, sans-serif;
  font-family: var(--font-body);
  font-variation-settings: 'wght' 400;
}
```

---

## 4. Content Guidelines

### Text Length Considerations

| Language | Relative Length | Notes |
|----------|----------------|-------|
| English | 100% (baseline) | - |
| German | ~30% longer | Compound words |
| French | ~20% longer | Articles |
| Spanish | ~25% longer | Articles |
| Russian | ~10% longer | Cyrillic |
| Arabic | ~20% shorter | Logographic |
| Chinese | ~50% shorter | Single characters |

### UI Text Best Practices

```typescript
// ❌ Hardcoded (bad)
const greeting = 'Hello, ' + name;

// ✅ i18n key (good)
const greeting = t('greeting', { name }); // "Hello, {name}"

// ❌ Fixed width (bad)
width: 120px;

// ✅ Flexible (good)
min-width: 60px;
max-width: 200px;
white-space: normal;
```

### Responsive Text

```css
/* Container adapts to content */
.card {
  width: 100%;
  max-width: 320px;
  min-width: 200px;
}

/* Flexible text containers */
.input-field {
  width: 100%;
  min-width: 0; /* Allows shrink */
}

/* Button adapts to content */
.button {
  padding-inline: var(--space-4);
  white-space: nowrap;
}
```

---

## 5. Tools & Libraries

### Recommended i18n Libraries

| Framework | Library | Notes |
|-----------|---------|-------|
| React/Next.js | [react-i18next](https://react.i18next.com/) | Full-featured |
| React/Next.js | [next-intl](https://next-intl-docs.vercel.app/) | SSR optimized |
| Vue | [vue-i18n](https://vue-i18n.intlify.dev/) | Official Vue i18n |
| Svelte | [svelte-i18n](https://github.com/kaisermann/svelte-i18n) | Lightweight |

### Basic react-i18next Setup

```typescript
// i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';
import he from './locales/he.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      he: { translation: he },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

### Translation File Structure

```json
// locales/en.json
{
  "greeting": "Hello, {name}",
  "button": {
    "submit": "Submit",
    "cancel": "Cancel"
  },
  "form": {
    "email": "Email address",
    "required": "This field is required"
  }
}

// locales/ar.json
{
  "greeting": "مرحبا، {name}",
  "button": {
    "submit": "إرسال",
    "cancel": "إلغاء"
  },
  "form": {
    "email": "البريد الإلكتروني",
    "required": "هذا الحقل مطلوب"
  }
}
```

### Dynamic Direction

```typescript
// Components/DirectionProvider.tsx
import { useTranslation } from 'react-i18next';

function DirectionProvider({ children }) {
  const { language } = useTranslation();
  const dir = ['ar', 'he', 'fa', 'ur'].includes(language) ? 'rtl' : 'ltr';
  
  return (
    <div dir={dir} lang={language}>
      {children}
    </div>
  );
}
```

### Tailwind RTL Config

```typescript
// tailwind.config.ts
export default {
  direction: 'ltr', // or 'rtl' based on default language
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // Logical utilities work automatically
}
```

---

## Integration with SKILL.md

When the questionnaire includes `internationalization: true`:

1. **Font Stack:** Include language-specific fonts
2. **Layout:** Use CSS logical properties throughout
3. **Spacing:** Test with longer/shorter translations
4. **Components:** Ensure text containers are flexible

```typescript
// In questionnaire
if (specialRequirements.internationalization) {
  // Include Noto Sans for multi-script support
  // Use logical properties for margins/padding
  // Test with RTL languages (Arabic, Hebrew)
  // Ensure form validation messages are translated
}
```

---

Last updated: 2026-06-03 (v1.6.3)