# React/Next.js Component Templates

Complete component templates with Tailwind v4, Shadcn-like structure (slots, cn() utility), and @motion/react for animations.

---

## Table of Contents

1. [Setup & Utilities](#1-setup--utilities)
2. [Button Component](#2-button-component)
3. [FormField Component](#3-formfield-component)
4. [Modal/Dialog Component](#4-modaldialog-component)
5. [Card Component](#5-card-component)
6. [Navigation Component](#6-navigation-component)
7. [Input Components](#7-input-components)
8. [Animation Patterns](#8-animation-patterns)

---

## 1. Setup & Utilities

### Required Dependencies

```bash
npm install @motion/react @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
npm install -D @types/react
```

> **Note:** Use `@motion/react` only — the deprecated `framer-motion` package name should NOT be used.

### Tailwind Configuration (Next.js)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066cc',
          hover: '#0052a3',
          light: '#3b82f6',
          dark: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#6b7280',
          hover: '#4b5563',
          light: '#9ca3af',
          dark: '#374151',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
export default config
```

> **Tailwind v4:** If using Tailwind v4, use CSS-first configuration in `globals.css` instead of `tailwind.config.ts`. See `CSS-PATTERNS.md` for v4 configuration.

### CSS Entry Point

```css
/* src/app/globals.css */
@import "tailwindcss";

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... your design tokens */
  }
  
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### Utility Functions (cn - classnames)

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines clsx and tailwind-merge for proper Tailwind class handling
 * Handles Tailwind class conflicts automatically
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Security Validators

> ⚠️ **IMPORTANT:** For security-critical applications, use the validators from `VALIDATORS.ts`.
> See [SECURITY-CHECKLIST.md](../SECURITY-CHECKLIST.md) for usage patterns.

```typescript
// src/lib/validators.ts
// Copy from ui-ux-developer/VALIDATORS.ts or install via skill

// Basic usage in components:
import { cnSafe, sanitizeColor, isValidUrl } from '@/lib/validators'

// Safe className merging with validation
const safeClassName = cnSafe(
  baseClasses,
  userClasses // Only safe Tailwind classes pass through
)

// Safe color with fallback
const safeBgColor = sanitizeColor(userColor, '#0066cc')

// Safe URL validation
if (isValidUrl(imageUrl)) {
  // Render image
}
```

### Type Utilities

```typescript
// src/types/ui.ts

/**
 * Extracts the variant type from a component's variant prop
 */
export type VariantProps<T> = T extends { variants?: infer V } ? V : never

/**
 * Maps string union to readable labels
 */
export type Labeled<T extends string> = {
  [K in T]: K
}[T]

/**
 * Component size variants
 */
export type Size = 'sm' | 'md' | 'lg' | 'xl'

/**
 * Component intent variants
 */
export type Intent = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

/**
 * Reactive state for forms
 */
export type FormState<T> = {
  value: T
  error: string | undefined
  touched: boolean
}
```

---

## 2. Button Component

### Button Variants & Sizes

```typescript
// src/components/ui/button.tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type CVAProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion, MotionConfig } from '@motion/react'

/* ==========================================
   VARIANTS CONFIGURATION
   ========================================== */

const buttonVariants = cva(
  // Base classes - always applied
  `
    inline-flex items-center justify-center gap-2
    whitespace-nowrap rounded-lg
    text-sm font-medium
    transition-colors duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
  `,
  {
    variants: {
      variant: {
        // Primary - Main actions
        primary: `
          bg-primary text-primary-foreground
          hover:bg-primary/90
          focus-visible:ring-primary
          active:bg-primary/80
        `,
        // Secondary - Less prominent actions
        secondary: `
          bg-secondary text-secondary-foreground
          hover:bg-secondary/80
          focus-visible:ring-secondary
          active:bg-secondary/70
        `,
        // Outline - Bordered, transparent background
        outline: `
          border border-input bg-background
          hover:bg-accent hover:text-accent-foreground
          focus-visible:ring-primary
          active:bg-accent/80
        `,
        // Ghost - No background, subtle hover
        ghost: `
          hover:bg-accent hover:text-accent-foreground
          focus-visible:ring-primary
          active:bg-accent/80
        `,
        // Destructive - Dangerous actions
        destructive: `
          bg-destructive text-destructive-foreground
          hover:bg-destructive/90
          focus-visible:ring-destructive
          active:bg-destructive/80
        `,
        // Link - Text only with underline on hover
        link: `
          text-primary underline-offset-4
          hover:underline
          focus-visible:ring-primary
        `,
      },
      size: {
        // Extra small - Compact UI
        xs: `
          h-8 px-2.5 text-xs
          gap-1 [&_svg]:size-3.5
        `,
        // Small - Compact buttons
        sm: `
          h-9 px-3 text-xs
          gap-1.5 [&_svg]:size-4
        `,
        // Default - Standard size
        default: `
          h-10 px-4 py-2
          gap-2 [&_svg]:size-4
        `,
        // Large - Prominent actions
        lg: `
          h-12 px-8 text-base
          gap-2.5 [&_svg]:size-5
        `,
        // Icon only - Square button
        icon: `
          h-10 w-10
          gap-2 [&_svg]:size-5
        `,
        // Icon small
        'icon-sm': `
          h-8 w-8
          gap-1.5 [&_svg]:size-4
        `,
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

/* ==========================================
   COMPONENT INTERFACE
   ========================================== */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Use as child of Radix Slot for compound components */
  asChild?: boolean
  /** Show loading spinner and disable interactions */
  loading?: boolean
  /** Animation configuration */
  motionConfig?: MotionConfig
}

/* ==========================================
   COMPONENT IMPLEMENTATION
   ========================================== */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'default',
      asChild = false,
      loading = false,
      motionConfig,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    const buttonContent = (
      <>
        {loading && (
          <motion.svg
            {...motionConfig}
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <motion.circle
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.svg>
        )}
        {children}
      </>
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        data-loading={loading}
        {...props}
      >
        {buttonContent}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

/* ==========================================
   EXPORTS
   ========================================== */

export { Button, buttonVariants }
export type { ButtonProps }
```

### Button Usage Examples

```tsx
import { Button } from '@/components/ui/button'

// Basic usage
<Button variant="primary">Primary Button</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With icon
<Button>
  <PlusIcon />
  Add Item
</Button>

// Loading state
<Button loading>Submitting...</Button>

// Icon only
<Button variant="ghost" size="icon">
  <SettingsIcon />
  <span className="sr-only">Settings</span>
</Button>

// As child (for compound components)
<Button asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>

// Motion animation
<Button motionConfig={{ whileHover: { scale: 1.02 } }}>
  Hover me
</Button>
```

---

## 3. FormField Component

### FormField with Label, Hint, and Error

```typescript
// src/components/ui/form-field.tsx
import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from '@motion/react'

/* ==========================================
   TYPES
   ========================================== */

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Field label */
  label?: string
  /** Unique ID for the input */
  id: string
  /** Required indicator */
  required?: boolean
  /** Help text below label */
  hint?: string
  /** Error message */
  error?: string
  /** Children (usually an input) */
  children: React.ReactNode
}

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label for screen readers (when button/icon only) */
  'aria-label'?: string
}

/* ==========================================
   FORM FIELD COMPONENT
   ========================================== */

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      label,
      id,
      required,
      hint,
      error,
      children,
      ...props
    },
    ref
  ) => {
    // Generate IDs for accessibility
    const errorId = error ? `${id}-error` : undefined
    const hintId = hint ? `${id}-hint` : undefined
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

    return (
      <div
        ref={ref}
        className={cn(
          'grid gap-2',
          error && 'text-destructive',
          className
        )}
        data-state={error ? 'error' : 'valid'}
        {...props}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && (
              <span className="text-destructive ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input slot - accepts input, textarea, select */}
        <div className="relative">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement, {
                id,
                'aria-describedby': describedBy,
                'aria-invalid': error ? true : undefined,
                'aria-required': required,
              } as Record<string, unknown>)
            }
            return child
          })}
        </div>

        {/* Hint text */}
        {hint && !error && (
          <p id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}

        {/* Error message */}
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-sm font-medium text-destructive flex items-center gap-1"
          >
            <AlertCircleIcon className="size-4" aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'

/* ==========================================
   FORM INPUT COMPONENT
   ========================================== */

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `
            flex h-10 w-full rounded-lg
            border border-input
            bg-background px-3 py-2
            text-base md:text-sm
            ring-offset-background
            file:border-0 file:bg-transparent file:text-sm file:font-medium
            placeholder:text-muted-foreground
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            transition-colors duration-200
          `,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

FormInput.displayName = 'FormInput'

/* ==========================================
   FORM TEXTAREA COMPONENT
   ========================================== */

const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `
          flex min-h-[80px] w-full rounded-lg
          border border-input
          bg-background px-3 py-2
          text-base md:text-sm
          ring-offset-background
          placeholder:text-muted-foreground
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          resize-y
          transition-colors duration-200
        `,
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

FormTextarea.displayName = 'FormTextarea'

/* ==========================================
   EXPORTS
   ========================================== */

export { FormField, FormInput, FormTextarea }
export type { FormFieldProps, FormInputProps }
```

### FormField Usage Examples

```tsx
import { FormField, FormInput, FormTextarea } from '@/components/ui/form-field'
import { Button } from '@/components/ui/button'

// Basic form
<Form as="form" onSubmit={handleSubmit}>
  <FormField
    label="Email"
    id="email"
    required
    hint="We'll never share your email"
    error={errors.email}
  >
    <FormInput
      type="email"
      placeholder="you@example.com"
      autoComplete="email"
      {...register('email')}
    />
  </FormField>

  <FormField label="Message" id="message">
    <FormTextarea
      placeholder="Your message..."
      rows={4}
      {...register('message')}
    />
  </FormField>

  <Button type="submit">Send Message</Button>
</Form>

// With validation error
<FormField
  label="Password"
  id="password"
  error={errors.password?.message}
>
  <FormInput
    type="password"
    placeholder="••••••••"
    autoComplete="current-password"
    {...register('password')}
  />
</FormField>
```

### FormField with Security Validation

> For security-critical forms, integrate validators to sanitize user input.

```tsx
import { FormField, FormInput, FormTextarea } from '@/components/ui/form-field'
import { Button } from '@/components/ui/button'
import { sanitizeColor, isValidUrl, sanitizeId } from '@/lib/validators'
import { useState } from 'react'

// Custom hook for validated form
function useValidatedForm() {
  const [values, setValues] = useState({
    email: '',
    website: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (field: string, value: string): string => {
    switch (field) {
      case 'email':
        if (!value.includes('@')) return 'Invalid email format'
        if (!/^[^<>"']+$/.test(value)) return 'Email contains invalid characters'
        break
      case 'website':
        if (value && !isValidUrl(value)) return 'Invalid URL format'
        break
      case 'message':
        if (value.length > 1000) return 'Message too long (max 1000 chars)'
        // Check for injection attempts
        if (/[<>"']/.test(value)) return 'Message contains invalid characters'
        break
    }
    return ''
  }

  const handleChange = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }))
    const error = validate(field, value)
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const isValid = Object.values(errors).every(e => !e) && 
                  Object.values(values).every(v => v.length > 0)

  return { values, errors, handleChange, isValid }
}

// Usage
function ContactForm() {
  const { values, errors, handleChange, isValid } = useValidatedForm()

  return (
    <Form as="form" onSubmit={handleSubmit}>
      <FormField
        label="Email"
        id="email"
        required
        error={errors.email}
      >
        <FormInput
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="you@example.com"
        />
      </FormField>

      <FormField
        label="Website (optional)"
        id="website"
        hint="Must be a valid https:// URL"
        error={errors.website}
      >
        <FormInput
          type="url"
          value={values.website}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="https://example.com"
        />
      </FormField>

      <FormField
        label="Message"
        id="message"
        required
        error={errors.message}
      >
        <FormTextarea
          value={values.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={4}
          placeholder="Your message..."
        />
      </FormField>

      <Button type="submit" disabled={!isValid}>
        Send Message
      </Button>
    </Form>
  )
}
```

---

## 4. Modal/Dialog Component

### Dialog with AnimatePresence

```typescript
// src/components/ui/dialog.tsx
'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { cva, type CVAProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from '@motion/react'
import { X } from 'lucide-react'

/* ==========================================
   TYPES
   ========================================== */

export interface DialogProps {
  /** Open state */
  open: boolean
  /** Callback when dialog should close */
  onOpenChange: (open: boolean) => void
  /** Dialog content */
  children: React.ReactNode
}

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Title for dialog */
  title?: string
  /** Description text */
  description?: string
  /** Close button label */
  closeLabel?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export interface DialogActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/* ==========================================
   VARIANTS
   ========================================== */

const dialogContentVariants = cva(
  `
    fixed left-1/2 top-1/2 z-50
    -translate-x-1/2 -translate-y-1/2
    w-full max-w-lg
    bg-background rounded-xl
    border shadow-lg
    p-6 md:p-8
    grid gap-4
  `,
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

/* ==========================================
   DIALOG OVERLAY
   ========================================== */

const dialogOverlayVariants = cva(
  `
    fixed inset-0 z-40
    bg-black/50 backdrop-blur-sm
  `,
  {
    variants: {
      animation: {
        default: '',
        fade: 'opacity-50',
      },
    },
  }
)

/* ==========================================
   DIALOG COMPONENT
   ========================================== */

export function Dialog({
  open,
  onOpenChange,
  children,
}: DialogProps) {
  // Handle escape key
  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  // Lock body scroll when open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Focus trap
  const contentRef = React.useRef<HTMLDivElement>(null)

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className={dialogOverlayVariants({ animation: 'default' })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />

          {/* Dialog content */}
          <DialogContainer
            ref={contentRef}
            onOpenChange={onOpenChange}
          >
            {children}
          </DialogContainer>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

/* ==========================================
   DIALOG CONTAINER (Focus Trap)
   ========================================== */

const DialogContainer = React.forwardRef<
  HTMLDivElement,
  DialogContentProps & { onOpenChange: (open: boolean) => void }
>(
  (
    {
      className,
      title,
      description,
      closeLabel = 'Close dialog',
      size = 'md',
      children,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    const contentRef = React.useRef<HTMLDivElement>(null)

    // Focus trap logic
    React.useEffect(() => {
      const content = contentRef.current
      if (!content) return

      const focusableElements = content.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]

      firstFocusable?.focus()

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey && document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        } else if (!e.shiftKey && document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }

      content.addEventListener('keydown', handleTab)
      return () => content.removeEventListener('keydown', handleTab)
    }, [])

    return (
      <motion.div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        aria-describedby={description ? 'dialog-description' : undefined}
        className={cn(dialogContentVariants({ size }), className)}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        {...props}
      >
        {/* Header */}
        {title && (
          <div className="flex items-start justify-between gap-4">
            <div className="grid gap-1.5">
              <h2
                id="dialog-title"
                className="text-lg font-semibold leading-none tracking-tight"
              >
                {title}
              </h2>
              {description && (
                <p id="dialog-description" className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className={cn(
                `
                  absolute right-4 top-4
                  rounded-sm opacity-70
                  ring-offset-background
                  transition-opacity
                  hover:opacity-100
                  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                  disabled:pointer-events-none
                `,
                !title && 'top-4 right-4'
              )}
              aria-label={closeLabel}
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="grid gap-4">{children}</div>
      </motion.div>
    )
  }
)

DialogContainer.displayName = 'DialogContainer'

/* ==========================================
   DIALOG CONTENT (Wraps DialogContainer)
   ========================================== */

export function DialogContent({
  children,
  ...props
}: DialogContentProps & { onOpenChange: (open: boolean) => void }) {
  return <DialogContainer {...props}>{children}</DialogContainer>
}

/* ==========================================
   DIALOG ACTIONS
   ========================================== */

const DialogActions = React.forwardRef<
  HTMLDivElement,
  DialogActionsProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2 pt-4',
        className
      )}
      {...props}
    />
  )
})

DialogActions.displayName = 'DialogActions'

/* ==========================================
   EXPORTS
   ========================================== */

export { DialogContent, DialogActions }
export type { DialogContentProps, DialogActionsProps }
```

### Dialog Usage Examples

```tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogActions } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Dialog
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          title="Confirm Action"
          description="Are you sure you want to proceed?"
          closeLabel="Close dialog"
          size="sm"
        >
          <p>This action cannot be undone.</p>
          
          <DialogActions>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

---

## 5. Card Component

### Card with Slot Pattern

```typescript
// src/components/ui/card.tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type CVAProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion } from '@motion/react'

/* ==========================================
   CARD VARIANTS
   ========================================== */

const cardVariants = cva(
  `
    rounded-xl border bg-card
    text-card-foreground
    shadow-sm
    transition-colors duration-200
  `,
  {
    variants: {
      variant: {
        default: 'border-border',
        elevated: 'shadow-md border-transparent',
        outline: 'border-2',
        ghost: 'border-transparent hover:bg-accent',
      },
      interactive: {
        true: 'hover:shadow-md cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  }
)

/* ==========================================
   CARD TYPES
   ========================================== */

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean
}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

/* ==========================================
   CARD COMPONENT
   ========================================== */

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', interactive = false, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, interactive }), className)}
        data-interactive={interactive}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

/* ==========================================
   CARD HEADER
   ========================================== */

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

/* ==========================================
   CARD TITLE (Supports Radix Heading)
   ========================================== */

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h3'
    return (
      <Comp
        ref={ref}
        className={cn(
          'text-2xl font-semibold leading-none tracking-tight',
          className
        )}
        {...props}
      />
    )
  }
)
CardTitle.displayName = 'CardTitle'

/* ==========================================
   CARD DESCRIPTION
   ========================================== */

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

/* ==========================================
   CARD CONTENT
   ========================================== */

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

/* ==========================================
   CARD FOOTER
   ========================================== */

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

/* ==========================================
   INTERACTIVE CARD (with motion)
   ========================================== */

export interface InteractiveCardProps extends CardProps {
  href?: string
  onClick?: () => void
  motionConfig?: {
    whileHover?: Record<string, unknown>
    whileTap?: Record<string, unknown>
  }
}

const InteractiveCard = React.forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ href, onClick, motionConfig, className, variant = 'default', children, ...props }, ref) => {
    const content = (
      <Card
        ref={ref}
        variant={variant}
        interactive={true}
        className={className}
        onClick={onClick}
        asChild={false}
        {...props}
      >
        {children}
      </Card>
    )

    if (href) {
      return (
        <motion.div
          whileHover={motionConfig?.whileHover}
          whileTap={motionConfig?.whileTap}
        >
          <a href={href} className="block">
            {content}
          </a>
        </motion.div>
      )
    }

    if (onClick) {
      return (
        <motion.div
          whileHover={motionConfig?.whileHover}
          whileTap={motionConfig?.whileTap}
        >
          {content}
        </motion.div>
      )
    }

    return content
  }
)

InteractiveCard.displayName = 'InteractiveCard'

/* ==========================================
   EXPORTS
   ========================================== */

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  InteractiveCard,
}

export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
  InteractiveCardProps,
}
```

### Card Usage Examples

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>

// Interactive card (link)
<InteractiveCard href="/product/123" motionConfig={{ whileHover: { y: -4 } }}>
  <CardHeader>
    <Badge>New</Badge>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>Product description</CardDescription>
  </CardHeader>
  <CardContent>
    <img src="..." alt="Product" />
  </CardContent>
</InteractiveCard>

// Elevated variant
<Card variant="elevated">
  <CardContent>Elevated card</CardContent>
</Card>

// Ghost variant (hover effect)
<Card variant="ghost">
  <CardContent>Ghost card</CardContent>
</Card>
```

---

## 6. Navigation Component

### Navigation with Skip Link

```typescript
// src/components/ui/navigation.tsx
import * as React from 'react'
import { cva, type CVAProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion } from '@motion/react'

/* ==========================================
   TYPES
   ========================================== */

export interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: string | number
  children?: NavItem[]
}

export interface NavigationProps
  extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[]
  /** Current path for active state */
  currentPath?: string
  /** Mobile menu trigger */
  mobileMenuTrigger?: React.ReactNode
}

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
  badge?: string | number
}

/* ==========================================
   NAVIGATION VARIANTS
   ========================================== */

const navVariants = cva(
  `
    flex items-center gap-6
    px-4 py-3
    border-b
  `,
  {
    variants: {
      variant: {
        default: 'border-border bg-background',
        elevated: 'border-transparent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        solid: 'border-transparent bg-primary text-primary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const navLinkVariants = cva(
  `
    inline-flex items-center gap-2
    text-sm font-medium
    transition-colors duration-200
    rounded-md px-3 py-2
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none
  `,
  {
    variants: {
      state: {
        default: 'text-muted-foreground hover:text-foreground hover:bg-accent',
        active: 'text-foreground bg-accent font-medium',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
)

/* ==========================================
   SKIP LINK (Accessibility)
   ========================================== */

export function SkipLink({ href = '#main-content' }: { href?: string }) {
  return (
    <a
      href={href}
      className="
        absolute -top-10 left-4 z-50
        bg-primary text-primary-foreground
        px-4 py-2 rounded-md font-medium
        focus:top-4
        transition-top duration-200
      "
    >
      Skip to main content
    </a>
  )
}

/* ==========================================
   NAVIGATION COMPONENT
   ========================================== */

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  (
    {
      className,
      items,
      currentPath = '/',
      variant = 'default',
      mobileMenuTrigger,
      ...props
    },
    ref
  ) => {
    const [mobileOpen, setMobileOpen] = React.useState(false)

    return (
      <nav
        ref={ref}
        className={cn(navVariants({ variant }), className)}
        aria-label="Main navigation"
        {...props}
      >
        {/* Logo */}
        <div className="flex items-center gap-4">
          <a href="/" className="font-semibold text-lg">
            Logo
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              isActive={currentPath === item.href}
              badge={item.badge}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md hover:bg-accent"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuTrigger || <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="
                absolute top-full left-0 right-0
                bg-background border-b
                p-4 space-y-2
                md:hidden
              "
            >
              {items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  isActive={currentPath === item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    )
  }
)

Navigation.displayName = 'Navigation'

/* ==========================================
   NAV LINK
   ========================================== */

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, isActive = false, badge, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        className={cn(navLinkVariants({ state: isActive ? 'active' : 'default' }), className)}
        {...props}
      >
        {children}
        {badge && (
          <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </a>
    )
  }
)

NavLink.displayName = 'NavLink'

/* ==========================================
   EXPORTS
   ========================================== */

export { Navigation, NavLink, SkipLink }
export type { NavigationProps, NavLinkProps, NavItem }
```

---

## 7. Input Components

### Text Input with Variants

```typescript
// src/components/ui/input.tsx
import * as React from 'react'
import { cva, type CVAProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/* ==========================================
   INPUT VARIANTS
   ========================================== */

const inputVariants = cva(
  `
    flex h-10 w-full rounded-lg
    border border-input
    bg-background px-3 py-2
    text-base md:text-sm
    ring-offset-background
    placeholder:text-muted-foreground
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    transition-colors duration-200
  `,
  {
    variants: {
      variant: {
        default: 'border-input focus-visible:border-ring',
        error: 'border-destructive focus-visible:ring-destructive/50',
        success: 'border-success focus-visible:ring-success/50',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        default: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

/* ==========================================
   INPUT TYPES
   ========================================== */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof inputVariants> {}

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

/* ==========================================
   INPUT COMPONENT
   ========================================== */

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, leftIcon, rightIcon, type, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, size }),
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

/* ==========================================
   TEXTAREA COMPONENT
   ========================================== */

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          inputVariants({ variant, size }),
          'min-h-[80px] resize-y',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

/* ==========================================
   SELECT COMPONENT
   ========================================== */

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <select
        className={cn(inputVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'

/* ==========================================
   LABEL COMPONENT
   ========================================== */

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-destructive ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = 'Label'

/* ==========================================
   EXPORTS
   ========================================== */

export { Input, Textarea, Select, Label }
export type { InputProps, TextareaProps, SelectProps, LabelProps }
```

---

## 8. Animation Patterns

### @motion/react Patterns

```typescript
// src/lib/motion.ts
import { MotionConfig, motion } from '@motion/react'

/* ==========================================
   MOTION CONFIGURATION
   ========================================== */

// Default animation presets
export const PRESETS = {
  // Fade in
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  
  // Slide up
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  
  // Scale in
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  
  // Slide from left
  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  
  // Slide from right
  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
}

/* ==========================================
   TRANSITION PRESETS
   ========================================== */

export const TRANSITIONS = {
  // Fast spring
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  
  // Smooth ease
  smooth: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1],
  },
  
  // Bouncy
  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    bounce: 0.5,
  },
}

/* ==========================================
   REORDER ANIMATIONS
   ========================================== */

export function useReorderAnimation<T>(
  items: T[],
  onReorder: (newOrder: T[]) => void
) {
  const [selected, setSelected] = React.useState<T | null>(null)

  return {
    selected,
    setSelected,
    handleDragEnd: (newOrder: T[]) => {
      onReorder(newOrder)
      setSelected(null)
    },
  }
}

/* ==========================================
   REDUCED MOTION HOOK
   ========================================== */

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return reducedMotion
}

/* ==========================================
   ANIMATED LIST COMPONENT
   ========================================== */

interface AnimatedListProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedList({ children, className }: AnimatedListProps) {
  const reducedMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }}
        className={className}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={PRESETS.slideUp}
            transition={TRANSITIONS.spring}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </MotionConfig>
  )
}

/* ==========================================
   ANIMATE PRESENCE WRAPPER
   ========================================== */

interface AnimatePresenceProps {
  children: React.ReactNode
  mode?: 'wait' | 'sync' | 'popLayout'
}

export function AnimatePresenceWrapper({ children, mode = 'wait' }: AnimatePresenceProps) {
  return (
    <AnimatePresence mode={mode}>
      {children}
    </AnimatePresence>
  )
}
```

### Usage Examples

```tsx
import { motion, AnimatePresence } from '@motion/react'

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
>
  Content
</motion.div>

// With variants
<motion.div
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }}
  initial="hidden"
  animate="visible"
>
  Content
</motion.div>

// Hover animation
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Button
</motion.button>

// Staggered children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  }}
>
  {[1, 2, 3].map((i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      Item {i}
    </motion.div>
  ))}
</motion.div>

// AnimatePresence for mount/unmount
const [show, setShow] = useState(false)

<AnimatePresence>
  {show && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

---

## Component Index

```typescript
// src/components/ui/index.ts

export { Button, buttonVariants } from './button'
export type { ButtonProps } from './button'

export { FormField, FormInput, FormTextarea } from './form-field'
export type { FormFieldProps, FormInputProps } from './form-field'

export { Dialog, DialogContent, DialogActions } from './dialog'
export type { DialogProps, DialogContentProps, DialogActionsProps } from './dialog'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, InteractiveCard } from './card'
export type { CardProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps } from './card'

export { Navigation, NavLink, SkipLink } from './navigation'
export type { NavigationProps, NavLinkProps, NavItem } from './navigation'

export { Input, Textarea, Select, Label } from './input'
export type { InputProps, TextareaProps, SelectProps, LabelProps } from './input'

export { cn } from '@/lib/utils'
```

Last updated: 2026-06-03 (v1.6.3)