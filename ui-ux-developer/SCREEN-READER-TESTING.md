# Screen Reader Testing Guide

**Comprehensive guide for testing accessibility with NVDA, VoiceOver, and JAWS.**

**Version:** 1.6.1
**Last updated:** 2026-06-03

---

## Table of Contents

1. [Overview](#1-overview)
2. [NVDA (Windows)](#2-nvda-windows)
3. [VoiceOver (macOS/iOS)](#3-voiceover-macosios)
4. [JAWS (Windows)](#4-jaws-windows)
5. [Browser Compatibility](#5-browser-compatibility)
6. [Keyboard Shortcuts](#6-keyboard-shortcuts)
7. [Testing Checklist](#7-testing-checklist)

---

## 1. Overview

Screen readers are essential tools for users with visual impairments. Testing with multiple screen readers ensures your UI works for everyone.

### Supported Screen Readers

| Reader | Platform | Cost | Market Share |
|--------|----------|------|--------------|
| NVDA | Windows | Free | ~30% |
| JAWS | Windows | Commercial | ~40% |
| VoiceOver | macOS/iOS | Free | ~20% |
| Narrator | Windows | Free (built-in) | ~5% |

---

## 2. NVDA (Windows)

NonVisual Desktop Access (NVDA) is a free, open-source screen reader for Windows.

### Installation

1. Download from [nvaccess.org](https://www.nvaccess.org)
2. Run installer
3. Configure add-ons (optional but recommended)

### Essential Commands

#### Explore Mode (Virtual Cursor)

| Command | Action |
|---------|--------|
| Arrow Keys | Navigate line by line |
| Tab / Shift+Tab | Move between elements |
| Ctrl+Home | Jump to top |
| Ctrl+End | Jump to bottom |
| Up/Down Arrow | Read previous/next line |
| Insert+Down Arrow | Read current line |
| Q | Read paragraph |
| H | Jump to heading |
| 1-6 | Jump to heading level |

#### Focus Mode

| Command | Action |
|---------|--------|
| Tab / Shift+Tab | Navigate focusable elements |
| Enter | Activate links/buttons |
| Space | Press buttons |
| Arrow Keys | Navigate within widgets |

#### Navigation Quick Keys

| Key | Element |
|-----|---------|
| K | Next link |
| D | Next landmark region |
| L | Next list |
| I | Next list item |
| F | Next form field |
| T | Next table |
| M | Next math |

### Testing Checklist for NVDA

- [ ] All images have meaningful alt text
- [ ] Links make sense out of context ("click here" is bad)
- [ ] Form fields have labels
- [ ] Headings create a logical outline (h1 → h2 → h3)
- [ ] Dynamic content is announced
- [ ] Focus is managed in modals/dialogs
- [ ] Tables have headers and captions
- [ ] ARIA landmarks are correct

### Sample Testing Session

```bash
# Start NVDA
# Press Insert+D to read document from start
# Navigate with Tab through interactive elements
# Press Insert+F7 to open Elements List for overview
# Press Insert+Space to toggle focus/explore mode
```

---

## 3. VoiceOver (macOS/iOS)

Built-in screen reader for Apple devices.

### macOS Commands

| Command | Action |
|---------|--------|
| Cmd+F5 | Toggle VoiceOver |
| Tab / Shift+Tab | Next/previous element |
| VoiceOver+Right/Left | Next/previous item |
| VoiceOver+Space | Activate current element |
| VoiceOver+Up/Down | Read next/previous item |
| VoiceOver+U | Open rotor (quick navigation) |
| Ctrl+Option+Right | Next heading |
| Ctrl+Option+Left | Previous heading |

### iOS Commands

| Command | Action |
|---------|--------|
| Triple-tap Home/Swipe | Toggle VoiceOver |
| Swipe Right/Left | Next/previous item |
| Swipe Up/Down | Navigate within groups |
| Tap twice | Activate |
| Rotor (two-finger rotate) | Change navigation mode |

### Testing Checklist for VoiceOver

- [ ] All images have alt descriptions
- [ ] Buttons have accessibility labels
- [ ] Custom controls announce their purpose
- [ ] Reading order is logical
- [ ] Focus indicator is visible (when using Keyboard Navigation)
- [ ] Support for Dynamic Type
- [ ] Haptic feedback for actions

### Sample Testing Session (macOS)

```bash
# Enable VoiceOver: Cmd+F5
# Open rotor: VO+U, then navigate with left/right
# Check Elements: VO+F1 then open command browser
# Test navigation: Tab through all interactive elements
# Check reading: VO+Down Arrow for continuous reading
```

---

## 4. JAWS (Windows)

Job Access With Speech (JAWS) is a commercial screen reader for Windows.

### Essential Commands

| Command | Action |
|---------|--------|
| Tab / Shift+Tab | Navigate elements |
| Alt+Ctrl+Up/Down | Read next/previous paragraph |
| Alt+Ctrl+Left/Right | Read next/previous sentence |
| Alt+Ctrl+Home | Read from top |
| Insert+3 | Read status bar |
| Insert+F | Find form fields |
| Insert+T | Read table |
| Insert+Escape | Clear virtual cursor |

### Testing Checklist for JAWS

- [ ] All content is readable without virtual cursor
- [ ] Form fields are properly labeled
- [ ] Dynamic updates don't lose focus
- [ ] Tables are navigable
- [ ] Links are descriptive
- [ ] Skipping navigation is possible (skip links)

---

## 5. Browser Compatibility

| Screen Reader | Chrome | Firefox | Safari | Edge |
|---------------|--------|---------|--------|------|
| NVDA | ✓ | ✓ (best) | N/A | ✓ |
| JAWS | ✓ | ✓ | N/A | ✓ |
| VoiceOver | N/A | ✓ | ✓ (best) | N/A |
| Narrator | ✓ | ✓ | ✓ | ✓ |

### Recommended Combinations

- **NVDA + Firefox** (best free testing environment)
- **JAWS + Chrome** (common professional setup)
- **VoiceOver + Safari** (best macOS experience)

---

## 6. Keyboard Shortcuts to Test

Essential shortcuts every screen reader user relies on:

### Navigation

| Key | Common Action |
|-----|--------------|
| Tab | Next focusable element |
| Shift+Tab | Previous focusable element |
| Enter | Activate link/button |
| Space | Activate buttons / toggle checkboxes |
| Arrow Keys | Navigate within widgets |
| Escape | Close dialogs/menus |

### Testing Focus

| Key | Action |
|-----|--------|
| Ctrl+Home | Jump to top |
| Ctrl+End | Jump to end |
| Alt+1-9 | Jump to major sections |

---

## 7. Testing Checklist

### General Screen Reader Testing

- [ ] **Semantic HTML** — Use proper elements (button, nav, main, etc.)
- [ ] **ARIA Labels** — Only when semantic HTML insufficient
- [ ] **Reading Order** — Logical without visual layout
- [ ] **Focus Visibility** — Clear 3:1 contrast ratio minimum
- [ ] **Dynamic Content** — Use aria-live regions
- [ ] **Images** — Alt text conveys meaning
- [ ] **Links** — Descriptive text

### WCAG Success Criteria

| Criterion | Requirement |
|-----------|-------------|
| 1.1.1 (Non-text Content) | All non-text content has text alternative |
| 1.3.1 (Info and Relationships) | Information via structure markup |
| 2.1.1 (Keyboard) | All functionality keyboard accessible |
| 2.4.1 (Bypass Blocks) | Skip links or landmarks |
| 2.4.3 (Focus Order) | Logical focus order |
| 2.4.4 (Link Purpose) | Link purpose understandable |
| 2.4.6 (Headings and Labels) | Descriptive headings and labels |
| 2.4.7 (Focus Visible) | Visible focus indicator |

### Testing Tools

- [ ] **NVDA** (Windows) — Free testing
- [ ] **VoiceOver** (macOS) — Free testing
- [ ] **axe DevTools** — Automated a11y checking
- [ ] **Accessibility Insights** — Microsoft's browser extension

---

## Related Documentation

- [CHECKLIST.md](./CHECKLIST.md) — WCAG 2.2 AA audit checklist
- [CSS-PATTERNS.md](./CSS-PATTERNS.md) — Semantic CSS patterns
- [VALIDATORS.ts](./VALIDATORS.ts) — ARIA validation utilities
