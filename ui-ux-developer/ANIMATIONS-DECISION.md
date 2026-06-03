# Animation Decision Guide

When to use CSS-only animations vs `@motion/react` (JavaScript). Use this guide to make the right choice for your project.

---

## 🎯 Quick Decision Flowchart

```
Is animation user-triggered? (hover, focus, active)
  │
  ├─► YES
  │     │
  │     ├─► Is it simple? (color, transform, shadow)
  │     │     └─► YES → Use CSS transitions
  │     │
  │     └─► Is it complex? (choreography, timing)
  │           └─► YES → CSS keyframes
  │
  └─► NO (automatic/planned)
        │
        ├─► Is it on page load?
        │     └─► YES → CSS animations
        │
        ├─► Is it on scroll?
        │     └─► YES → @motion/react
        │
        ├─► Is it based on user interaction?
        │     └─► YES → @motion/react
        │
        └─► Is it gesture-based?
              └─► YES → @motion/react
```

---

## 📊 Comparison Table

| Feature | CSS Only | @motion/react |
|---------|----------|---------------|
| **Hover effects** | ✅ | ✅ |
| **Focus effects** | ✅ | ✅ |
| **Page load** | ✅ | ✅ |
| **Page transitions** | ✅ | ✅ |
| **Scroll-triggered** | ❌ | ✅ |
| **Drag & drop** | ❌ | ✅ |
| **Swipe gestures** | ❌ | ✅ |
| **Staggered animations** | ⚠️ | ✅ |
| **Exit animations** | ⚠️ | ✅ |
| **Layout animations** | ❌ | ✅ |
| **Reduced motion** | ✅ | ✅ |
| **Performance** | ✅ | ✅ |
| **Bundle size** | 0 KB | ~30 KB |
| **Dependencies** | None | React |

---

## ✅ Use CSS Only When...

### 1. Hover Effects
```css
.button:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease;
}
```

### 2. Focus States
```css
.button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### 3. Active/Press States
```css
.button:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}
```

### 4. Page Load Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.page-content {
  animation: fadeIn 0.3s ease-out;
}
```

### 5. Loading States
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

### 6. Toggle States
```css
.toggle-input:checked + .toggle-slider {
  background-color: var(--color-primary);
  transform: translateX(1.5rem);
  transition: transform 0.3s ease;
}
```

### 7. Accordion/Collapse
```css
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion[open] .accordion-content {
  max-height: 500px; /* or use JS for auto */
}
```

---

## ✅ Use @motion/react When...

### 1. Page Transitions
```tsx
// app/layout.tsx
import { motion, AnimatePresence } from '@motion/react'
import { usePathname } from 'next/navigation'

export default function Layout({ children }) {
  const pathname = usePathname()
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
```

### 2. Scroll Reveal
```tsx
import { motion, useInView } from '@motion/react'

function ScrollReveal({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
```

### 3. Staggered Lists
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

function List({ items }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map(i => (
        <motion.li key={i.id} variants={item}>
          {i.name}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### 4. Drag & Drop
```tsx
import { motion, Reorder } from '@motion/react'

function DraggableList({ items, onReorder }) {
  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={onReorder}
    >
      {items.map(item => (
        <Reorder.Item key={item.id} value={item}>
          {item.name}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
```

### 5. Swipe to Delete
```tsx
import { motion, useMotionValue } from '@motion/react'

function SwipeCard({ onDelete }) {
  const x = useMotionValue(0)
  
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) {
          onDelete()
        }
      }}
    >
      {children}
    </motion.div>
  )
}
```

### 6. Modal/Dialog with Exit
```tsx
import { motion, AnimatePresence } from '@motion/react'

function Modal({ open, onClose, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            role="dialog"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

### 7. Layout Animations
```tsx
function ExpandableGrid({ isGrid, items }) {
  return (
    <motion.div layout>
      {items.map(item => (
        <motion.div key={item.id} layoutId={item.id}>
          <Card />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

---

## ⚠️ Mixed Approach (CSS + @motion/react)

### When to Combine

Sometimes you need both. Use CSS for base states, @motion/react for enhanced interactions:

```tsx
// Button with CSS base + motion enhancement
function Button({ children, onClick }) {
  return (
    <motion.button
      // CSS handles base, hover, focus
      className="btn btn--primary"
      // @motion/react handles click animation
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
```

### Reduced Motion Handling

Both CSS and @motion/react should respect `prefers-reduced-motion`:

```css
/* CSS */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// @motion/react
import { MotionConfig } from '@motion/react'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Component />
    </MotionConfig>
  )
}

// Or with hook
import { useReducedMotion } from '@motion/react'

function Component() {
  const shouldReduce = useReducedMotion()
  
  return (
    <motion.div
      animate={shouldReduce ? {} : { x: 100 }}
    />
  )
}
```

---

## 📦 Bundle Size Consideration

| Approach | Size | Impact |
|----------|------|--------|
| **CSS only** | 0 KB | No impact |
| **@motion/react** | ~30 KB | Consider for mobile |

### Decision Matrix

| Scenario | Recommendation |
|-----------|----------------|
| **Static site / landing page** | CSS only |
| **React SPA with animations** | @motion/react |
| **Mobile-first** | CSS only (or lazy load @motion/react) |
| **Dashboard with complex UI** | @motion/react |
| **Blog / content site** | CSS only |
| **E-commerce** | @motion/react (for cart, transitions) |
| **Portfolio** | CSS only (or minimal @motion/react) |

---

## 🔧 Implementation Checklist

### CSS Only Setup
- [ ] Hover/focus/active states defined
- [ ] `prefers-reduced-motion` media query added
- [ ] Animation keyframes defined
- [ ] Easing functions defined

### @motion/react Setup
- [ ] `npm install @motion/react`
- [ ] `MotionConfig` wrapper at app root
- [ ] `reducedMotion` prop set to "user"
- [ ] Variants defined outside components
- [ ] AnimatePresence for exit animations

---

## 🚨 Common Mistakes

❌ **Using @motion/react for simple hover effects**
→ CSS transitions are faster and smaller

❌ **Not handling reduced motion**
→ Always include `prefers-reduced-motion` support

❌ **Animating layout properties (width, height)**
→ Causes reflow, use transform instead

❌ **Animating on page load without skeleton**
→ Use skeleton loaders while content loads

❌ **Over-animating**
→ Animations should enhance, not distract

❌ **Not testing on actual devices**
→ What works in DevTools may lag on real devices

---

## 📋 Quick Reference Matrix

| Scenario | CSS | @motion/react | Notes |
|----------|-----|---------------|-------|
| Button hover | ✅ | ❌ | Simple color/shadow |
| Card expand on click | ✅ | ✅ | CSS for basic, @motion for complex |
| Page load entrance | ✅ | ✅ | CSS keyframes preferred |
| Modal open/close | ✅ | ✅ | CSS fade, @motion for choreographed |
| Toast notification | ✅ | ✅ | @motion/react for AnimatePresence |
| Scroll reveal | ❌ | ✅ | Intersection Observer + @motion/react |
| Drag and drop | ❌ | ✅ | Gestures library |
| Skeleton loading | ✅ | ✅ | CSS shimmer preferred |
| Staggered list | ⚠️ | ✅ | @motion/react stagger |
| Layout animations | ❌ | ✅ | AnimatePresence for enter/exit |

### Reduced Motion Checklist

```css
/* CSS animations - respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// @motion/react - respect reduced motion
<MotionConfig reducedMotion="user">
  <App />
</MotionConfig>
```

---

## 📚 Resources

- [MDN: CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [MDN: CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
- [@motion/react Documentation](https://motion.dev/react)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

---

Last updated: 2026-06-03 (v1.6.3)