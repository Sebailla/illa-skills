# Framer Motion Patterns

Complete animation patterns using `@motion/react` (React 19 optimized). Covers page transitions, component animations, AnimatePresence, and reduced motion.

---

## Table of Contents

1. [Setup & Configuration](#1-setup--configuration)
2. [Basic Animations](#2-basic-animations)
3. [Page Transitions](#3-page-transitions)
4. [Component Animations](#4-component-animations)
5. [AnimatePresence Patterns](#5-animatepresence-patterns)
6. [Gesture Animations](#6-gesture-animations)
7. [Reduced Motion](#7-reduced-motion)
8. [Layout Animations](#8-layout-animations)
9. [Scroll Animations](#9-scroll-animations)
10. [Performance](#10-performance)

---

## 1. Setup & Configuration

### Installation

```bash
npm install @motion/react
```

> **Note:** `@motion/react` is the package name for Framer Motion v11+ (React 19 compatible).
> The deprecated `framer-motion` package name should NOT be used in new projects.

### Basic Setup

```tsx
// app/providers.tsx
'use client'

import { MotionConfig } from '@motion/react'
import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionConfig
      // Reduced motion preference
      reducedMotion="user"
      // Default transition
      transitions={{
        default: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      }}
    >
      {children}
    </MotionConfig>
  )
}
```

### Tailwind + Motion Integration

```tsx
// hooks/useMotionValue.ts
import { useMotionValue, useTransform } from '@motion/react'
import { useEffect } from 'react'

export function useScrollProgress() {
  const scrollY = useMotionValue(0)
  
  const progress = useTransform(scrollY, [0, 1000], [0, 1])
  
  return { scrollY, progress }
}

export function useParallax(value: ReturnType<typeof useMotionValue>, range: [number, number]) {
  return useTransform(value, [0, 500], range)
}
```

---

## 2. Basic Animations

### Simple Fade In

```tsx
// components/animations/FadeIn.tsx
'use client'

import { motion } from '@motion/react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className 
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        opacity: { duration: duration, delay: delay, ease: [0.4, 0, 0.2, 1] }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Slide Up

```tsx
// components/animations/SlideUp.tsx
'use client'

import { motion } from '@motion/react'

interface SlideUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function SlideUp({ children, delay = 0, className }: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.4, delay: delay },
        y: { duration: 0.4, delay: delay, ease: [0.4, 0, 0.2, 1] }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Scale In

```tsx
// components/animations/ScaleIn.tsx
'use client'

import { motion } from '@motion/react'

interface ScaleInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScaleIn({ children, delay = 0, className }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

## 3. Page Transitions

### Next.js App Router Pages

```tsx
// app/layout.tsx
'use client'

import { motion, AnimatePresence } from '@motion/react'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  )
}
```

### Page-Level Transitions

```tsx
// components/animations/PageTransition.tsx
'use client'

import { motion } from '@motion/react'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Usage in page
// app/dashboard/page.tsx
import { PageTransition } from '@/components/animations/PageTransition'

export default function DashboardPage() {
  return (
    <PageTransition>
      <h1>Dashboard</h1>
      {/* Page content */}
    </PageTransition>
  )
}
```

### Staggered Page Content

```tsx
// components/animations/StaggeredContent.tsx
'use client'

import { motion } from '@motion/react'
import { ReactNode } from 'react'

interface StaggeredContentProps {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
}

export function StaggeredContent({ 
  children, 
  staggerDelay = 0.05,
  className 
}: StaggeredContentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Usage
<StaggeredContent staggerDelay={0.1}>
  <h1>Title</h1>
  <p>Description</p>
  <button>Action</button>
</StaggeredContent>
```

---

## 4. Component Animations

### Button Hover/Press

```tsx
// components/ui/MotionButton.tsx
'use client'

import { motion } from '@motion/react'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface MotionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  whileHover?: Record<string, unknown>
  whileTap?: Record<string, unknown>
}

const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, whileHover = { scale: 1.02 }, whileTap = { scale: 0.98 }, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn('btn btn--primary', className)}
        whileHover={whileHover}
        whileTap={whileTap}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

MotionButton.displayName = 'MotionButton'

export { MotionButton }
```

### Card Hover

```tsx
// components/ui/MotionCard.tsx
'use client'

import { motion } from '@motion/react'
import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef, ReactNode } from 'react'

interface MotionCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  href?: string
  as?: 'div' | 'article' | 'section'
}

const MotionCard = forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, children, href, as = 'div', ...props }, ref) => {
    const Component = href ? motion.a : motion.div
    
    return (
      <Component
        ref={ref}
        className={cn('card card--interactive', className)}
        whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        href={href}
        {...(href ? {} : props)}
      >
        {children}
      </Component>
    )
  }
)

MotionCard.displayName = 'MotionCard'

export { MotionCard }
```

### Icon Animation

```tsx
// components/animations/AnimatedIcon.tsx
'use client'

import { motion } from '@motion/react'
import { cn } from '@/lib/utils'
import { SVGProps } from 'react'

interface AnimatedIconProps extends SVGProps<SVGSVGElement> {
  children: React.ReactNode
  hoverRotate?: number
  hoverScale?: number
}

export function AnimatedIcon({ 
  children, 
  className,
  hoverRotate = 15,
  hoverScale = 1.1,
  ...props 
}: AnimatedIconProps) {
  return (
    <motion.svg
      className={cn('cursor-pointer', className)}
      whileHover={{ 
        rotate: hoverRotate,
        scale: hoverScale
      }}
      whileTap={{ 
        rotate: -hoverRotate,
        scale: hoverScale * 0.9
      }}
      transition={{ 
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }}
      {...props}
    >
      {children}
    </motion.svg>
  )
}

// Usage
<AnimatedIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
  <path d="M12 5v14M5 12h14"/>
</AnimatedIcon>
```

---

## 5. AnimatePresence Patterns

### Modal with AnimatePresence

```tsx
// components/ui/AnimatedModal.tsx
'use client'

import { motion, AnimatePresence } from '@motion/react'
import { createPortal } from 'react-dom'
import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

interface AnimatedModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function AnimatedModal({ 
  open, 
  onClose, 
  children, 
  title 
}: AnimatedModalProps) {
  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl p-6"
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between mb-4">
                <h2 id="modal-title" className="text-lg font-semibold">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}
            
            {/* Content */}
            <div className="modal-content">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
```

### Toast Notifications

```tsx
// components/ui/ToastContainer.tsx
'use client'

import { motion, AnimatePresence } from '@motion/react'
import { useState, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  } as const

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => {
          const IconComponent = Icon[toast.type]
          
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 bg-white rounded-lg shadow-lg p-4 min-w-[300px]"
            >
              <IconComponent className={`size-5 text-${toast.type === 'success' ? 'green' : toast.type === 'error' ? 'red' : 'blue'}-500`} />
              <p className="flex-1 text-sm">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-label="Dismiss"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
```

### List Reorder

```tsx
// components/ui/DraggableList.tsx
'use client'

import { motion, Reorder, useDragControls } from '@motion/react'
import { useState } from 'react'

interface DraggableItemProps {
  item: { id: string; label: string }
}

function DraggableItem({ item }: DraggableItemProps) {
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm cursor-grab"
      whileDrag={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
    >
      <motion.div
        className="cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => controls.start(e)}
      >
        {/* Drag handle icon - inline SVG to avoid import dependency */}
        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="5" r="1.5" />
          <circle cx="9" cy="12" r="1.5" />
          <circle cx="9" cy="19" r="1.5" />
          <circle cx="15" cy="5" r="1.5" />
          <circle cx="15" cy="12" r="1.5" />
          <circle cx="15" cy="19" r="1.5" />
        </svg>
      </motion.div>
      <span className="flex-1">{item.label}</span>
    </Reorder.Item>
  )
}

export function DraggableList() {
  const [items, setItems] = useState([
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
  ])

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="flex flex-col gap-2"
    >
      {items.map(item => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </Reorder.Group>
  )
}
```

---

## 6. Gesture Animations

### Pan & Drag

```tsx
// components/animations/Draggable.tsx
'use client'

import { motion, useMotionValue, useTransform, PanInfo } from '@motion/react'
import { useRef } from 'react'

interface DraggableProps {
  children: React.ReactNode
  onDragEnd?: (x: number, y: number) => void
}

export function Draggable({ children, onDragEnd }: DraggableProps) {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (onDragEnd) {
      onDragEnd(info.point.x, info.point.y)
    }
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      x={x}
      y={y}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
      style={{ cursor: 'grab' }}
    >
      {children}
      <div ref={constraintsRef} className="w-[500px] h-[500px] absolute top-0 left-0" />
    </motion.div>
  )
}
```

### Swipe to Delete

```tsx
// components/ui/SwipeToDelete.tsx
'use client'

import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from '@motion/react'
import { useRef } from 'react'

interface SwipeToDeleteProps {
  children: React.ReactNode
  onDelete: () => void
}

export function SwipeToDelete({ children, onDelete }: SwipeToDeleteProps) {
  const x = useMotionValue(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100
    
    if (info.offset.x > threshold) {
      controls.start({ x: -500, opacity: 0 })
      setTimeout(onDelete, 200)
    } else {
      controls.start({ x: 0 })
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Delete background */}
      <div className="absolute inset-0 bg-red-500 flex items-center justify-end pr-4">
        <span className="text-white font-semibold">Delete</span>
      </div>
      
      {/* Swipeable card */}
      <motion.div
        ref={cardRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ x }}
        whileDrag={{ cursor: 'grabbing' }}
        className="bg-white relative z-10"
      >
        {children}
      </motion.div>
    </div>
  )
}
```

---

## 7. Reduced Motion

### Hook for Reduced Motion

```tsx
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return reducedMotion
}
```

### Reduced Motion Wrapper

```tsx
// components/animations/MotionWrapper.tsx
'use client'

import { motion, MotionConfig } from '@motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ReactNode } from 'react'

interface MotionWrapperProps {
  children: ReactNode
}

export function MotionWrapper({ children }: MotionWrapperProps) {
  const reducedMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      {children}
    </MotionConfig>
  )
}
```

### Conditional Animation

```tsx
// components/animations/ConditionalMotion.tsx
'use client'

import { motion, useReducedMotion } from '@motion/react'
import { ReactNode } from 'react'

interface ConditionalMotionProps {
  children: ReactNode
  animation: { initial?: object; animate?: object; exit?: object }
}

export function ConditionalMotion({ children, animation }: ConditionalMotionProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
    >
      {children}
    </motion.div>
  )
}
```

### CSS Fallback for Reduced Motion

```css
/* Base reduced motion */
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

## 8. Layout Animations

### Layout Group (Shared Elements)

```tsx
// components/animations/LayoutExample.tsx
'use client'

import { motion, LayoutGroup } from '@motion/react'
import { useState } from 'react'

export function LayoutExample() {
  const [isList, setIsList] = useState(false)

  return (
    <LayoutGroup>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setIsList(false)}>Grid</button>
        <button onClick={() => setIsList(true)}>List</button>
      </div>

      <div className={isList ? 'flex flex-col gap-2' : 'grid grid-cols-3 gap-4'}>
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            layoutId={`card-${i}`}
            className="bg-blue-500 rounded-lg p-8"
            layout={true}
          >
            Card {i}
          </motion.div>
        ))}
      </div>
    </LayoutGroup>
  )
}
```

### Expand/Collapse Animation

```tsx
// components/animations/Expandable.tsx
'use client'

import { motion, AnimatePresence } from '@motion/react'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ExpandableProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function Expandable({ title, children, defaultOpen = false }: ExpandableProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50"
        aria-expanded={isOpen}
      >
        <span className="font-medium">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

---

## 9. Scroll Animations

### Scroll Reveal

```tsx
// components/animations/ScrollReveal.tsx
'use client'

import { motion, useInView } from '@motion/react'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  direction = 'up',
  delay = 0,
  className 
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const initial = {
    up: { opacity: 0, y: 50 },
    down: { opacity: 0, y: -50 },
    left: { opacity: 0, x: 50 },
    right: { opacity: 0, x: -50 }
  }

  return (
    <motion.div
      ref={ref}
      initial={initial[direction]}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial[direction]}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Usage
<ScrollReveal direction="up" delay={0.2}>
  <h1>Scroll to reveal</h1>
</ScrollReveal>
```

### Parallax Effect

```tsx
// components/animations/Parallax.tsx
'use client'

import { motion, useScroll, useTransform } from '@motion/react'
import { useRef } from 'react'

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
```

---

## 10. Performance

### Lazy Animation Import

```tsx
// components/animations/LazyAnimation.tsx
'use client'

import { lazy, Suspense } from 'react'
import { motion } from '@motion/react'

// Lazy load heavy animations
const AnimatedChart = lazy(() => import('./AnimatedChart'))

export function LazyAnimationWrapper() {
  return (
    <Suspense fallback={<motion.div className="skeleton" />}>
      <AnimatedChart />
    </Suspense>
  )
}
```

### Will Change Optimization

```tsx
// components/animations/OptimizedMotion.tsx
'use client'

import { motion } from '@motion/react'

export function OptimizedMotion({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // Optimize for animations
      style={{ willChange: 'transform, opacity' }}
      // Use GPU
      transformTemplate={(value) => `translate3d(${value.x}px, ${value.y}px, 0)`}
    >
      {children}
    </motion.div>
  )
}
```

### Animation Variants (Memory Optimization)

```tsx
// Define variants outside component to avoid recreation
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  },
  exit: { opacity: 0, scale: 0.95 }
}

function CardAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
```

---

## Quick Reference

### Common Transitions

```tsx
// Default
transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}

// Spring (bouncy)
transition={{ type: 'spring', stiffness: 300, damping: 30 }}

// Staggered children
transition={{ staggerChildren: 0.1 }}

// Exit only
transition={{ duration: 0.2 }}
```

### Common Animations

```tsx
// Fade
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}

// Slide up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Scale
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}

// Rotate
initial={{ rotate: -10 }}
animate={{ rotate: 0 }}
```

### Reduced Motion Support

```tsx
// In MotionConfig
<MotionConfig reducedMotion="user">

// Or via hook
const shouldAnimate = !useReducedMotion()

// Conditional rendering
{shouldAnimate ? (
  <motion.div animate={{...}} />
) : (
  <div>{children}</div>
)}
```

Last updated: 2026-06-03 (v1.6.3)