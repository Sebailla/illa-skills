# Color Contrast Guide

**Comprehensive guide for meeting WCAG contrast requirements with interactive calculator.**

**Version:** 1.6.1
**Last updated:** 2026-06-03

---

## Table of Contents

1. [Overview](#1-overview)
2. [WCAG Requirements](#2-wcag-requirements)
3. [Contrast Formula](#3-contrast-formula)
4. [Interactive Calculator](#4-interactive-calculator)
5. [Compliant Combinations](#5-compliant-combinations)
6. [Testing Checklist](#6-testing-checklist)

---

## 1. Overview

Color contrast is critical for users with low vision, color blindness, or those viewing in challenging conditions (bright sunlight, aging displays).

### Why Contrast Matters

- **4.5:1** minimum for normal text (WCAG AA)
- **3:1** minimum for large text (WCAG AA)
- Low contrast causes eye strain and exclusion

---

## 2. WCAG Requirements

### Contrast Ratio Levels

| Level | Normal Text | Large Text | UI Components |
|-------|-------------|------------|--------------|
| **AAA** | 7:1 | 4.5:1 | 3:1 |
| **AA** | 4.5:1 | 3:1 | 3:1 |
| **Fail** | < 4.5:1 | < 3:1 | < 3:1 |

### What Counts as "Large Text"

- **18pt+** (24px+) regular weight
- **14pt+** (18.5px+) bold weight
- Logos and UI icons (enforced UI component rules)

### UI Component Contrast

Buttons, inputs, sliders, and other UI components require **3:1** minimum against adjacent colors (not just background).

---

## 3. Contrast Formula

WCAG uses relative luminance and a contrast ratio formula.

### Relative Luminance Calculation

```
L = 0.2126 * R + 0.7152 * G + 0.0722 * B

Where R, G, B are normalized:
- If RsRGB <= 0.03928: R = RsRGB / 12.92
- Else: R = ((RsRGB + 0.055) / 1.055) ^ 2.4

Same for G and B
```

### Contrast Ratio Formula

```
Contrast = (L1 + 0.05) / (L2 + 0.05)

Where L1 is the lighter color's luminance
And L2 is the darker color's luminance
```

### Quick Reference

| Ratio | Example | WCAG Level |
|-------|---------|------------|
| 21:1 | Black on White | AAA |
| 7:1 | Dark gray on white | AAA |
| 4.5:1 | Gray on white | AA |
| 3:1 | Light gray on white | AA (large text) |
| 2:1 | Light gray on light gray | Fail |

---

## 4. Interactive Calculator

Copy this HTML file for a standalone contrast calculator:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Color Contrast Calculator</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 600px;
      margin: 2rem auto;
      padding: 1rem;
      background: #f5f5f5;
    }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    .calculator {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    label { font-size: 0.875rem; font-weight: 500; }
    input[type="color"] {
      width: 100%;
      height: 48px;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      cursor: pointer;
    }
    input[type="text"] {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      font-family: monospace;
    }
    .preview {
      display: flex;
      gap: 1rem;
      margin: 1.5rem 0;
    }
    .preview-box {
      flex: 1;
      padding: 1.5rem;
      border-radius: 0.5rem;
      text-align: center;
      font-size: 1rem;
    }
    .result {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-radius: 0.5rem;
      font-weight: 600;
    }
    .pass { background: #d4edda; color: #155724; }
    .fail { background: #f8d7da; color: #721c24; }
    .ratio { font-size: 1.5rem; }
    .formula {
      margin-top: 1.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 0.5rem;
      font-family: monospace;
      font-size: 0.875rem;
      white-space: pre-wrap;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    th, td {
      padding: 0.5rem;
      border: 1px solid #ddd;
      text-align: center;
    }
    th { background: #f8f9fa; }
    .good { background: #d4edda; }
    .warning { background: #fff3cd; }
    .bad { background: #f8d7da; }
  </style>
</head>
<body>
  <h1>🎨 WCAG Color Contrast Calculator</h1>
  
  <div class="calculator">
    <div class="inputs">
      <div class="input-group">
        <label for="fg">Foreground (Text)</label>
        <input type="color" id="fg" value="#1a1a1a">
        <input type="text" id="fgText" value="#1a1a1a">
      </div>
      <div class="input-group">
        <label for="bg">Background</label>
        <input type="color" id="bg" value="#ffffff">
        <input type="text" id="bgText" value="#ffffff">
      </div>
    </div>
    
    <div class="preview">
      <div class="preview-box" id="previewFg" style="background: #1a1a1a; color: #ffffff;">
        Normal Text (16px)
      </div>
      <div class="preview-box" id="previewBg" style="background: #ffffff; color: #1a1a1a;">
        Normal Text (16px)
      </div>
    </div>
    
    <div class="result" id="result">
      <span>Contrast Ratio</span>
      <span class="ratio" id="ratio">21:1</span>
    </div>
    
    <div class="formula" id="formula"></div>
  </div>
  
  <script>
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ] : [0, 0, 0];
    }
    
    function getLuminance(rgb) {
      const [r, g, b] = rgb.map(c => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    
    function getContrast(rgb1, rgb2) {
      const l1 = getLuminance(rgb1);
      const l2 = getLuminance(rgb2);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }
    
    function calculate() {
      const fg = document.getElementById('fg').value;
      const bg = document.getElementById('bg').value;
      const fgRgb = hexToRgb(fg);
      const bgRgb = hexToRgb(bg);
      const ratio = getContrast(fgRgb, bgRgb);
      
      document.getElementById('fgText').value = fg;
      document.getElementById('bgText').value = bg;
      document.getElementById('previewFg').style.background = fg;
      document.getElementById('previewFg').style.color = bg;
      document.getElementById('previewBg').style.background = bg;
      document.getElementById('previewBg').style.color = fg;
      document.getElementById('ratio').textContent = ratio.toFixed(2) + ':1';
      
      const resultEl = document.getElementById('result');
      if (ratio >= 7) {
        resultEl.className = 'result pass';
        resultEl.innerHTML = '<span>AAA ✅</span><span class="ratio">' + ratio.toFixed(2) + ':1</span>';
      } else if (ratio >= 4.5) {
        resultEl.className = 'result pass';
        resultEl.innerHTML = '<span>AA ✅</span><span class="ratio">' + ratio.toFixed(2) + ':1</span>';
      } else if (ratio >= 3) {
        resultEl.className = 'result pass';
        resultEl.innerHTML = '<span>AA (Large) ✅</span><span class="ratio">' + ratio.toFixed(2) + ':1</span>';
      } else {
        resultEl.className = 'result fail';
        resultEl.innerHTML = '<span>Fail ❌</span><span class="ratio">' + ratio.toFixed(2) + ':1</span>';
      }
      
      // Formula breakdown
      const fgLum = getLuminance(fgRgb).toFixed(4);
      const bgLum = getLuminance(bgRgb).toFixed(4);
      document.getElementById('formula').textContent = 
        'Formula: (L1 + 0.05) / (L2 + 0.05)\n' +
        'Foreground RGB: ' + fgRgb.join(', ') + '\n' +
        'Foreground Luminance: ' + fgLum + '\n' +
        'Background RGB: ' + bgRgb.join(', ') + '\n' +
        'Background Luminance: ' + bgLum + '\n' +
        'Result: ' + ratio.toFixed(4);
    }
    
    // Event listeners
    document.getElementById('fg').addEventListener('input', calculate);
    document.getElementById('bg').addEventListener('input', calculate);
    document.getElementById('fgText').addEventListener('change', (e) => {
      document.getElementById('fg').value = e.target.value;
      calculate();
    });
    document.getElementById('bgText').addEventListener('change', (e) => {
      document.getElementById('bg').value = e.target.value;
      calculate();
    });
    
    // Initial calculation
    calculate();
  </script>
</body>
</html>
```

### Calculator Features

- **Color picker inputs** for foreground and background
- **Live preview** of text samples
- **Real-time ratio** calculation
- **WCAG level indicator** (AAA, AA, Fail)
- **Formula breakdown** showing luminance calculation

---

## 5. Compliant Combinations

### Tailwind Default Colors (All AA Compliant)

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| gray-900 (#111827) | white (#fff) | 16.1:1 | AAA |
| gray-800 (#1f2937) | white (#fff) | 14.7:1 | AAA |
| gray-700 (#374151) | white (#fff) | 11.8:1 | AAA |
| gray-600 (#4b5563) | white (#fff) | 8.6:1 | AAA |
| gray-500 (#6b7280) | white (#fff) | 5.7:1 | AAA |
| gray-400 (#9ca3af) | white (#fff) | 3.1:1 | AA (Large) |
| white (#fff) | gray-900 (#111827) | 16.1:1 | AAA |
| white (#fff) | gray-800 (#1f2937) | 14.7:1 | AAA |
| white (#fff) | gray-700 (#374151) | 11.8:1 | AAA |
| white (#fff) | blue-600 (#2563eb) | 4.7:1 | AA |

### Common Brand Colors

| Combination | Ratio | WCAG Level |
|-------------|-------|------------|
| #FF0000 on White | 4.0:1 | AA (borderline) |
| #00FF00 on White | 7.0:1 | AA (borderline) |
| #0000FF on White | 8.6:1 | AA |
| #FFFF00 on White | 1.1:1 | Fail |
| #FFFFFF on #000000 | 21:1 | AAA |
| #808080 on White | 4.5:1 | AA |

### Safe Diverging Color Scales (Tailwind)

For body text on backgrounds:

| Background | Min Foreground | Ratio |
|------------|---------------|-------|
| slate-50 | slate-900 | 15:1 |
| gray-50 | gray-900 | 15:1 |
| zinc-50 | zinc-900 | 15:1 |
| neutral-50 | neutral-900 | 15:1 |
| stone-50 | stone-900 | 15:1 |
| red-50 | red-900 | 10:1 |
| orange-50 | orange-900 | 10:1 |
| green-50 | green-900 | 10:1 |
| blue-50 | blue-900 | 10:1 |

---

## 6. Testing Checklist

### Design Phase

- [ ] **Check all primary text** against backgrounds (4.5:1+)
- [ ] **Check secondary text** (descriptions, captions)
- [ ] **Check large text** (headings, callouts) (3:1+)
- [ ] **Verify button contrast** (3:1+ for UI components)
- [ ] **Check form inputs** against borders and labels
- [ ] **Test icon contrast** where icons convey meaning

### Development Phase

- [ ] **Automated testing** with axe-core or Accessibility Insights
- [ ] **Manual testing** with contrast calculator
- [ ] **Browser dev tools** (Chrome has built-in contrast checker)
- [ ] **Test edge cases** (hover states, focus rings, error states)

### Automated Tools

| Tool | Platform | Features |
|------|----------|----------|
| **axe DevTools** | Browser Extension | WCAG AA/AAA |
| **Accessibility Insights** | Browser Extension | Guided testing |
| **Color Oracle** | Desktop App | Color blindness simulation |
| **Stark** | Figma/Browser | Contrast checker |
| **Wave** | Browser Extension | Visual feedback |

### Code Validation

```typescript
// Example: Validate contrast in component
const validateContrast = (fg: string, bg: string): boolean => {
  const ratio = getContrastRatio(fg, bg);
  return ratio >= 4.5;  // WCAG AA for normal text
};

// Usage
if (!validateContrast(textColor, bgColor)) {
  console.warn('Insufficient color contrast');
}
```

---

## Related Tools

### Online Calculators

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Colors](https://accessible-colors.com/)
- [Coolors Contrast Checker](https://coolors.co/accessibility-checker)

### Browser DevTools

- **Chrome**: Inspect element → Styles → Color picker shows contrast ratio
- **Firefox**: Accessibility panel shows contrast issues

### Design Plugins

- **Figma**: Stark, Contrast, A11y
- **Sketch**: Contrast
- **Adobe XD**: Accessibility dialog

---

## Related Documentation

- [CSS-PATTERNS.md](./CSS-PATTERNS.md) — Color system patterns
- [CHECKLIST.md](./CHECKLIST.md) — WCAG 2.2 AA checklist
- [DARK-MODE.md](./DARK-MODE.md) — Dark mode contrast considerations
