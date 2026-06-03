# UI/UX Audit Checklist

WCAG 2.2 AA compliance checklist for interface review. Use `/ui-audit` or this checklist for manual review.

---

## 🔍 Perceivable

### Images & Non-Text Content
- [ ] Informative images have descriptive alt text
- [ ] Decorative images have empty `alt=""` (not missing)
- [ ] Complex images (charts, infographics) have extended descriptions
- [ ] Icons have aria-label or visible text label
- [ ] CAPTCHAs have alternative access method

### Video & Audio
- [ ] Pre-recorded videos have synchronized captions
- [ ] Pre-recorded audio has text transcript
- [ ] Video has audio descriptions for visual-only information
- [ ] No auto-playing audio/content

### Color & Contrast
- [ ] Normal text: minimum 4.5:1 contrast ratio
- [ ] Large text (18pt+): minimum 3:1 contrast ratio
- [ ] UI components/graphics: minimum 3:1 contrast ratio
- [ ] Information NOT conveyed by color alone
- [ ] Color is NOT the only visual means of conveying info

### Text & Legibility
- [ ] Page readable at 200% zoom
- [ ] No text in images when real text works
- [ ] Text spacing can be overridden by user
- [ ] Line length (characters per line) is readable (50-80)

---

## ⌨️ Operable

### Keyboard Accessibility
- [ ] All functions accessible via keyboard
- [ ] Tab order follows logical reading sequence
- [ ] No keyboard traps (Tab/Shift+Tab exits all elements)
- [ ] Custom widgets (div/span) have explicit keyboard handling
- [ ] Skip navigation link present and functional

### Focus Visibility
- [ ] Visible focus indicator on all interactive elements
- [ ] Focus indicator NOT hidden by sticky headers/modals
- [ ] Focus visible at 200% zoom
- [ ] No `outline: none` without replacement

### Target Size
- [ ] Interactive targets minimum 24x24px CSS
- [ ] Mobile/touch targets minimum 44x44px
- [ ] Adequate spacing between targets

### Timing & Motion
- [ ] Auto-playing content can be paused/stopped
- [ ] Nothing blinks more than 3 times per second
- [ ] Time limits can be disabled/adjusted/extended
- [ ] Animations respect `prefers-reduced-motion`

---

## 💡 Understandable

### Language & Navigation
- [ ] Page declares language (`<html lang="en">`)
- [ ] Language changes within page are marked
- [ ] Navigation consistent across pages
- [ ] Navigation appears in same location
- [ ] Skip links functional

### Forms & Input
- [ ] All form fields have visible labels (not placeholder-only)
- [ ] Error messages identify specific fields
- [ ] Error messages explain what went wrong
- [ ] Labels are programmatically associated
- [ ] No duplicate data entry required
- [ ] Password managers not blocked

### Content Clarity
- [ ] Instructions don't rely on sensory characteristics
- [ ] Headings are descriptive
- [ ] Error prevention for forms (review before submit)
- [ ] Consistent identification of components

---

## 🔧 Robust

### HTML & Semantics
- [ ] Valid HTML (passes validator)
- [ ] Semantic HTML elements used (header, nav, main, footer)
- [ ] One H1 per page
- [ ] Headings follow logical hierarchy (no skipped levels)
- [ ] Landmarks properly used

### ARIA (When Needed)
- [ ] ARIA used only when native HTML insufficient
- [ ] ARIA roles, states, properties correct
- [ ] No invalid ARIA attributes
- [ ] Custom controls have accessible names

### Dynamic Content
- [ ] Status messages announced via `aria-live`
- [ ] Content updates announced to assistive tech
- [ ] DOM order reflects visual order

---

## 📱 Platform-Specific

### Mobile/Touch
- [ ] Touch targets ≥ 44x44px
- [ ] No hover-only content on touch devices
- [ ] Viewport zoom not disabled
- [ ] Scroll not trapped

### Screen Readers
- [ ] Reading order logical
- [ ] Images have alt text
- [ ] Form labels announced
- [ ] Dynamic content announced
- [ ] Page structure announced (headings, landmarks)

---

## ⚡ Quick Scan (5 minutes)

Run this before deeper audit:

```bash
# 1. Keyboard only
# - Can you reach every interactive element?
# - Can you exit every modal/dropdown?
# - Can you see where you are?

# 2. Zoom 200%
# - Is content readable?
# - Is anything hidden/cut off?

# 3. Color check
# - Is info conveyed without color?
# - Contrast seems okay visually?

# 4. Screen reader (quick)
# - NVDA/VoiceOver announces page structure
# - Forms have labels

# 5. axe-core
npx axe-cli https://yoursite.com
```

---

## 🚨 Critical Issues (Fix First)

1. Missing alt on informative images
2. No visible focus indicator
3. Missing form labels
4. Keyboard traps
5. Color-only information
6. Contrast < 3:1

---

## 📊 Severity Classification

| Severity | Impact | Example |
|----------|--------|---------|
| **Critical** | Users blocked | No form labels, keyboard trap |
| **High** | Significant difficulty | Contrast 2:1, missing alt |
| **Medium** | Usable with difficulty | Small touch targets |
| **Low** | Best practice | Missing skip links |

---

## Document Findings

```markdown
## Audit Report: {Page Name}

**Date:** YYYY-MM-DD
**Auditor:** {Name}
**WCAG Level:** AA

### Critical
| # | Issue | Location | WCAG | Fix |
|---|-------|----------|------|-----|
| 1 | Missing alt | img.logo | 1.1.1 | Add aria-label |

### High
...

### Medium
...

### Low
...

### Summary
- Total issues: N
- Critical: N
- High: N
- Medium: N
- Low: N
```

---

## Integration with axe-core

> 📖 **Related:** Para pruebas de screen reader, ver [SCREEN-READER-TESTING.md](./SCREEN-READER-TESTING.md)

```javascript
// In tests
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('button has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

```bash
# CLI scan
npx axe-cli https://yoursite.com

# GitHub Action
- name: Accessibility Scan
  uses: async-labs/axe-core-action@v2
```
---

Last updated: 2026-06-03 (v1.6.3)
