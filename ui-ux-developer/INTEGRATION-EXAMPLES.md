# Integration Examples

Complete examples showing how to integrate all ui-ux-developer skill pieces together: design tokens, components, tests, and CI/CD.

**Version:** 1.6.2
**Last updated:** 2026-06-03

---

## Table of Contents

1. [Overview](#1-overview)
2. [Design System Setup](#2-design-system-setup)
3. [Component Implementation](#3-component-implementation)
4. [Testing Pipeline](#4-testing-pipeline)
5. [CI/CD Integration](#5-cicd-integration)
6. [Real-World Example](#6-real-world-example)

---

## 1. Overview

This guide shows how all skill pieces fit together:

```
┌─────────────────────────────────────────────────────────┐
│                    SKILL.md (Start Here)                 │
│         Questionnaire → Project Context                   │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  DESIGN-STYLES.md                       │
│         Choose style → Get CSS variables               │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  CSS-PATTERNS.md                       │
│              Configure Tailwind v4                      │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│            TEMPLATES/components.*.md                   │
│              Generate components                        │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              TESTS/*.test.md + vitest.config            │
│                    Write tests                          │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    CI-CD.md                            │
│              Automate with GitHub Actions               │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Design System Setup

### Step 1: Project Context (SKILL.md)

```typescript
// User selects:
// - Project Type: saas
// - Design Style: flat-2
// - Framework: nextjs
// - Color Scheme: both (light + dark)

// Result: Generate design tokens
```

### Step 2: Configure Design Tokens (CSS-PATTERNS.md)

```css
/* src/app/globals.css */
@import "tailwindcss";

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

@theme {
  /* Primary (Blue) */
  --color-primary: 217 91% 60%;
  --color-primary-foreground: 0 0% 100%;
  
  /* Semantic Colors */
  --color-success: 142 71% 45%;
  --color-warning: 38 92% 50%;
  --color-destructive: 0 84% 60%;
  
  /* Surface */
  --color-background: 0 0% 100%;
  --color-foreground: 222 47% 11%;
  
  /* Font Families */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}

/* Dark mode */
.dark {
  color-scheme: dark;
  --color-background: 222 47% 11%;
  --color-foreground: 210 40% 98%;
}
```

### Step 3: Utility Functions

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 3. Component Implementation

### Button Component (TEMPLATES/components.react-nextjs.md)

```typescript
// src/components/ui/button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type CVAProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from '@motion/react';

const buttonVariants = cva(
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
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
```

### Card Component

```typescript
// src/components/ui/card.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline';
}

const cardVariants = {
  default: 'border bg-card rounded-xl',
  elevated: 'shadow-md bg-card rounded-xl',
  outline: 'border-2 bg-card rounded-xl',
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants[variant], className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-semibold', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export { Card, CardHeader, CardTitle };
```

---

## 4. Testing Pipeline

### Unit Tests (TESTS/components/button.test.md)

```typescript
// tests/components/button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'axe-core';
import { Button } from '@/components/ui/button';

expect.extend(toHaveNoViolations);

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it.each([
      ['primary', 'bg-primary'],
      ['outline', 'border'],
      ['ghost', 'hover:bg-accent'],
    ])('renders %s variant correctly', (variant, expectedClass) => {
      render(<Button variant={variant as any}>{variant}</Button>);
      expect(screen.getByRole('button').className).toContain(expectedClass.split(' ')[0]);
    });
  });

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Accessible Button</Button>);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
```

### Vitest Config (TESTS/vitest.config.md)

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Test Setup

```typescript
// tests/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia for dark mode
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: query.includes('dark'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })),
});
```

---

## 5. CI/CD Integration (CI-CD.md)

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:unit
      - uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json

  a11y-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:a11y

  build:
    runs-on: ubuntu-latest
    needs: [lint, unit-tests]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm run test:e2e
```

---

## 6. Real-World Example

### SaaS Dashboard Project

**Project:** Admin dashboard for a B2B SaaS product

**Setup:**
```typescript
// Context from SKILL.md questionnaire
{
  projectType: 'dashboard',
  designStyle: 'minimalism',
  framework: 'nextjs',
  brandTone: 'professional',
  audience: 'enterprise',
  colorScheme: 'both',
  specialRequirements: {
    accessibility: true,
    motionPreference: true,
  }
}
```

**Implementation Flow:**

1. **Design Tokens** → `globals.css`
   - Minimal palette (black/white/gray)
   - Blue primary accent
   - 8px spacing system

2. **Components** → `/src/components/ui/`
   - Button, Card, Input, Modal, Table
   - Consistent 4px border radius
   - Focus rings on all interactive elements

3. **Testing** → `/tests/`
   - axe-core for a11y
   - Coverage thresholds: 80%
   - Visual regression tests

4. **CI/CD** → GitHub Actions
   - Lint → Test → Build → Deploy
   - Accessibility audit on PR
   - Lighthouse CI for performance

### File Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Dashboard page
├── components/
│   └── ui/
│       ├── button.tsx       # Button component
│       ├── card.tsx         # Card component
│       ├── input.tsx        # Input component
│       ├── modal.tsx        # Modal component
│       └── table.tsx        # Table component
├── lib/
│   ├── utils.ts             # cn() utility
│   └── validators.ts        # Security validators
└── tests/
    ├── setup.ts             # Test setup
    └── components/
        ├── button.test.tsx
        ├── card.test.tsx
        └── modal.test.tsx

.github/
└── workflows/
    └── ci.yml               # CI/CD pipeline
```

### Commands Reference

```bash
# Development
npm run dev                  # Start dev server
npm run lint                 # Run ESLint
npm run typecheck            # Run TypeScript

# Testing
npm run test                 # Run all tests
npm run test:unit            # Unit tests only
npm run test:e2e             # E2E tests only
npm run test:a11y            # Accessibility tests

# Build
npm run build                # Production build
npm run preview              # Preview production build

# Coverage
npm run test:coverage        # Generate coverage report
```

---

## Quick Reference

| Resource | File | Purpose |
|----------|------|---------|
| Questionnaire | SKILL.md | Project setup |
| Design Styles | DESIGN-STYLES.md | Style selection |
| CSS Patterns | CSS-PATTERNS.md | Tailwind config |
| Templates | TEMPLATES/*.md | Component code |
| Validators | VALIDATORS.ts | Security |
| Tests | TESTS/*.test.md | Quality |
| CI/CD | CI-CD.md | Automation |

---

Last updated: 2026-06-03 (v1.6.3)