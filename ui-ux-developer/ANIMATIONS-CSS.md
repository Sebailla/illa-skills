# CSS-Only Animations Guide

Pure CSS animation patterns for when `@motion/react` is not available. Covers transitions, keyframe animations, reduced motion, and interaction patterns without JavaScript animation libraries.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Transitions](#2-transitions)
3. [Keyframe Animations](#3-keyframe-animations)
4. [Hover Effects](#4-hover-effects)
5. [Page Transitions](#5-page-transitions)
6. [Loading States](#6-loading-states)
7. [Reduced Motion](#7-reduced-motion)
8. [Performance](#8-performance)

---

## 1. Overview

### When to Use CSS-Only Animations

✅ **Use CSS animations when:**
- No React/JavaScript framework available
- `@motion/react` is not installed
- Simple hover/focus states needed
- Performance is critical
- Accessibility is the focus

❌ **Use JavaScript animations when:**
- Complex choreography required
- Scroll-triggered animations
- Gesture-based interactions
- Physics-based animations
- Staggered list animations

### Fallback Strategy

```html
<!-- CSS-only animation with JS enhancement possibility -->
<div class="animate-fade-in" data-animate="fade">
  Content
</div>

<!-- If JS available, enhance with @motion/react -->
<script>
  if (window.motionAvailable) {
    enhanceAnimation('.animate-fade-in');
  }
</script>
```

---

## 2. Transitions

### Basic Transitions

```css
/* Button transition */
.btn {
  transition: background-color 0.2s ease,
              transform 0.1s ease,
              box-shadow 0.2s ease;
}

.btn:hover {
  background-color: #0052a3;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.btn:active {
  transform: translateY(0);
}
```

### Transition Properties

```css
/* All properties */
.everything {
  transition: all 0.3s ease;
}

/* Specific properties - better performance */
.optimal {
  transition: background-color 0.2s ease,
              color 0.2s ease,
              transform 0.15s ease,
              box-shadow 0.2s ease;
}
```

### Easing Functions

```css
/* Common easings */
.ease-default {
  transition: all 0.3s ease;
}

.ease-in {
  transition: all 0.3s ease-in;
}

.ease-out {
  transition: all 0.3s ease-out;
}

.ease-in-out {
  transition: all 0.3s ease-in-out;
}

/* Custom cubic-bezier */
.ease-bounce {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.ease-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Transform Origin

```css
/* Scale from center (default) */
.scale-default {
  transition: transform 0.2s ease;
}
.scale-default:hover {
  transform: scale(1.05);
}

/* Scale from top-left */
.scale-top-left {
  transform-origin: top left;
  transition: transform 0.2s ease;
}
.scale-top-left:hover {
  transform: scale(1.05);
}

/* Rotate from center */
.rotate-center {
  transform-origin: center;
  transition: transform 0.2s ease;
}
.rotate-center:hover {
  transform: rotate(45deg);
}
```

---

## 3. Keyframe Animations

### Basic Animations

```css
/* Fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* Slide up */
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
  animation: slideUp 0.3s ease-out forwards;
}

/* Scale in */
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
  animation: scaleIn 0.3s ease-out forwards;
}
```

### Animation Controls

```css
/* Run animation on mount */
.auto-run {
  animation: slideUp 0.3s ease-out forwards;
}

/* Delay before animation */
.delay-100 {
  animation-delay: 100ms;
}

.delay-200 {
  animation-delay: 200ms;
}

/* Stop at final state */
.fill-forwards {
  animation-fill-mode: forwards;
}

/* Run animation on hover */
.hover-animation:hover {
  animation: pulse 0.6s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
```

### Staggered Animations

```css
/* Container for staggered items */
.stagger-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Individual items with delay */
.stagger-item {
  opacity: 0;
  animation: slideUp 0.3s ease-out forwards;
}

.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 100ms; }
.stagger-item:nth-child(3) { animation-delay: 200ms; }
.stagger-item:nth-child(4) { animation-delay: 300ms; }
.stagger-item:nth-child(5) { animation-delay: 400ms; }

/* Alternative using --delay CSS variable */
.stagger-item-alt {
  opacity: 0;
  animation: slideUp 0.3s ease-out forwards;
  animation-delay: var(--delay, 0ms);
}
```

---

## 4. Hover Effects

### Button Hover

```css
/* Primary button */
.btn-primary {
  background-color: #0066cc;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease,
              transform 0.1s ease,
              box-shadow 0.2s ease;
}

.btn-primary:hover {
  background-color: #0052a3;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
}
```

### Card Hover

```css
/* Interactive card */
.card-interactive {
  transition: transform 0.2s ease,
              box-shadow 0.2s ease;
}

.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
              0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

### Link Hover

```css
/* Underline animation */
.link-animated {
  position: relative;
  text-decoration: none;
}

.link-animated::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.link-animated:hover::after {
  width: 100%;
}

/* Color transition */
.link-color {
  transition: color 0.2s ease;
}

.link-color:hover {
  color: #0052a3;
}
```

### Icon Animation

```css
/* Icon scale on hover */
.icon-hover {
  transition: transform 0.2s ease;
}

.icon-hover:hover {
  transform: scale(1.1);
}

/* Icon rotate on hover */
.icon-rotate:hover {
  transform: rotate(15deg);
}

/* Icon bounce on hover */
.icon-bounce:hover {
  animation: iconBounce 0.3s ease;
}

@keyframes iconBounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
```

### Image Hover

```css
/* Image zoom on container hover */
.img-container {
  overflow: hidden;
}

.img-container img {
  transition: transform 0.3s ease;
}

.img-container:hover img {
  transform: scale(1.05);
}

/* Image grayscale on hover */
.img-desaturate:hover img {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}
```

---

## 5. Page Transitions

### Route Transitions

```css
/* Using CSS animation on route change */
/* Requires JS to toggle classes */

/* Fade transition */
.page-enter {
  opacity: 0;
}

.page-enter-active {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.page-exit {
  opacity: 1;
}

.page-exit-active {
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Slide transition */
.page-slide-left-enter {
  opacity: 0;
  transform: translateX(20px);
}

.page-slide-left-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s ease;
}

.page-slide-left-exit {
  opacity: 1;
  transform: translateX(0);
}

.page-slide-left-exit-active {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease;
}
```

### Modal Overlay

```css
/* Modal backdrop */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease,
              visibility 0.2s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Modal content */
.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.95);
  opacity: 0;
  transition: transform 0.2s ease,
              opacity 0.2s ease;
}

.modal-content.active {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}
```

### Accordion

```css
/* CSS-only accordion */
.accordion-header {
  cursor: pointer;
  padding: 1rem;
  background-color: #f3f4f6;
  transition: background-color 0.2s ease;
}

.accordion-header:hover {
  background-color: #e5e7eb;
}

.accordion-icon {
  transition: transform 0.3s ease;
}

.accordion-header[aria-expanded="true"] .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-header[aria-expanded="true"] + .accordion-content {
  max-height: 500px; /* or use JS to auto-calculate */
}
```

### Tabs

```css
/* Tab container */
.tab-list {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.tab-button {
  padding: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease,
              color 0.2s ease;
}

.tab-button:hover {
  color: #0066cc;
}

.tab-button[aria-selected="true"] {
  border-bottom-color: #0066cc;
  color: #0066cc;
}

.tab-panel {
  padding: 1rem;
  display: none;
}

.tab-panel[aria-hidden="false"] {
  display: block;
}
```

---

## 6. Loading States

### Spinner

```css
/* CSS spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-top-color: #0066cc;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Sizes */
.spinner-sm { width: 16px; height: 16px; }
.spinner-md { width: 24px; height: 24px; }
.spinner-lg { width: 40px; height: 40px; }
```

### Pulse

```css
/* Pulse animation for loading placeholders */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Skeleton loader */
.skeleton {
  background: linear-gradient(
    90deg,
    #f3f4f6 0%,
    #e5e7eb 50%,
    #f3f4f6 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

### Progress Bar

```css
/* Progress bar */
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: #0066cc;
  transition: width 0.3s ease;
}

/* Indeterminate */
.progress-indeterminate .progress-bar-fill {
  width: 30%;
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}

@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}
```

### Skeleton

```css
/* Text skeleton */
.skeleton-text {
  height: 1em;
  background-color: #e5e7eb;
  border-radius: 4px;
  animation: pulse 2s ease-in-out infinite;
}

.skeleton-text-lg { height: 1.5em; width: 80%; }
.skeleton-text-md { height: 1em; width: 60%; }
.skeleton-text-sm { height: 0.875em; width: 40%; }

/* Avatar skeleton */
.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e5e7eb;
  animation: pulse 2s ease-in-out infinite;
}
```

---

## 7. Reduced Motion

### Global Reduced Motion

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

### Targeted Reduced Motion

```css
/* Remove animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up,
  .animate-scale-in,
  .spinner,
  .pulse,
  .skeleton {
    animation: none !important;
    opacity: 1 !important;
  }
}

/* Keep essential transitions */
@media (prefers-reduced-motion: reduce) {
  .btn:hover,
  .link-animated::after {
    /* Keep hover effects but make instant */
    transition: none !important;
  }
}
```

### Reduced Motion with Fallback

```css
/* Checkbox animation */
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-input {
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  transition: background-color 0.2s ease,
              border-color 0.2s ease;
}

.checkbox-input:checked {
  background-color: #0066cc;
  border-color: #0066cc;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}

@media (prefers-reduced-motion: reduce) {
  .checkbox-input {
    transition: none;
  }
}
```

### Toggle Animation

```css
/* Toggle switch */
.toggle {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #d1d5db;
  border-radius: 9999px;
  transition: background-color 0.3s ease;
}

.toggle-slider::before {
  content: '';
  position: absolute;
  height: 1.25rem;
  width: 1.25rem;
  left: 0.125rem;
  bottom: 0.125rem;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.toggle-input:checked + .toggle-slider {
  background-color: #0066cc;
}

.toggle-input:checked + .toggle-slider::before {
  transform: translateX(1.5rem);
}

@media (prefers-reduced-motion: reduce) {
  .toggle-slider,
  .toggle-slider::before {
    transition: none;
  }
}
```

---

## 8. Performance

### GPU Acceleration

```css
/* Use transform for animations - GPU accelerated */
.performance-good {
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.performance-good:hover {
  transform: translateX(10px);
}

/* Avoid animating these properties */
.performance-bad {
  /* These trigger layout recalc - AVOID */
  transition: width 0.3s ease,
              height 0.3s ease,
              top 0.3s ease,
              left 0.3s ease;
}
```

### Will Change

```css
/* Hint browser to optimize */
.optimized {
  will-change: transform, opacity;
}

/* Remove hint when animation completes */
.optimized.complete {
  will-change: auto;
}
```

### Composite Layers

```css
/* Promote to own layer */
.own-layer {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Use translate3d for GPU */
.gpu-accelerated {
  transform: translate3d(0, 0, 0);
}
```

### Debouncing (CSS Only)

```css
/* CSS-only debounce for hover states */
/* Note: This is limited - for true debounce use JS */

.slow-hover {
  transition: opacity 0.5s ease;
}

.slow-hover:hover {
  opacity: 0.8;
}
```

---

## Quick Reference

### Common Animations

```css
/* Fade */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* Slide */
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* Scale */
@keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

/* Spin */
@keyframes spin { to { transform: rotate(360deg); } }

/* Pulse */
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
```

### Common Transitions

```css
/* Properties that are cheap to animate */
transition: opacity 0.2s ease;
transition: transform 0.2s ease;
transition: background-color 0.2s ease;
transition: color 0.2s ease;
transition: border-color 0.2s ease;
transition: box-shadow 0.2s ease;

/* Properties that are expensive */
transition: width 0.2s ease;      /* AVOID */
transition: height 0.2s ease;     /* AVOID */
transition: top 0.2s ease;        /* AVOID */
transition: left 0.2s ease;       /* AVOID */
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Comparison with @motion/react

| Feature | CSS Only | @motion/react |
|---------|----------|---------------|
| Simple hover effects | ✅ | ✅ |
| Page transitions | ✅ | ✅ |
| Scroll animations | ❌ | ✅ |
| Gesture animations | ❌ | ✅ |
| Physics/spring | ❌ | ✅ |
| Layout animations | ❌ | ✅ |
| Exit animations | ❌ | ✅ |
| Orchestration | ❌ | ✅ |
| Reduced motion | ✅ | ✅ |

---

Last updated: 2026-06-03 (v1.6.3)