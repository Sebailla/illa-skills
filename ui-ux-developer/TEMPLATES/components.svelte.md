# Svelte Component Templates

Complete component templates for Svelte with Tailwind v4. Uses Svelte 5 syntax with runes, SvelteKit patterns, and accessible design.

---

## Table of Contents

1. [Setup & Utilities](#1-setup--utilities)
2. [Button Component](#2-button-component)
3. [FormField Component](#3-formfield-component)
4. [Card Component](#4-card-component)
5. [Modal Component](#5-modal-component)
6. [Navigation Component](#6-navigation-component)
7. [Animation Patterns](#7-animation-patterns)
8. [Input Components](#8-input-components)

---

## 1. Setup & Utilities

### Required Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
npm install @tailwindcss/typography
```

### Tailwind Configuration (SvelteKit)

```javascript
// svelte.config.js or tailwind.config.js
import { sveltePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066cc',
          hover: '#0052a3',
          light: '#3b82f6',
          dark: '#1d4ed8',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

### CSS Entry Point

```css
/* src/app.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: #0066cc;
    --color-primary-hover: #0052a3;
  }
  
  html {
    font-family: 'Inter', system-ui, sans-serif;
  }
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Utility Functions

```typescript
// src/lib/utils.ts

/**
 * Combines class names with Tailwind
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Simple tween for basic animations
 */
export function tween(
  from: number,
  to: number,
  duration: number,
  callback: (value: number) => void
): () => void {
  const start = performance.now();
  const diff = to - from;
  
  function step(timestamp: number) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    
    callback(from + diff * eased);
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}
```

---

## 2. Button Component

### Button.svelte

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  
  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }
  
  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    type = 'button',
    class: className = '',
    onclick,
    children,
  }: Props = $props();
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 disabled:bg-primary/50',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  };
  
  const sizes = {
    xs: 'h-8 px-2.5 text-xs gap-1',
    sm: 'h-9 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-8 text-base gap-2',
  };
</script>

<button
  {type}
  disabled={disabled || loading}
  aria-busy={loading}
  class="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 {variants[variant]} {sizes[size]} {className}"
  onclick={onclick}
>
  {#if loading}
    <svg class="animate-spin size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
    </svg>
  {/if}
  {@render children()}
</button>

<style>
  /* Custom styles if needed */
</style>
```

### Button Usage

```svelte
<script>
  import Button from './Button.svelte';
</script>

<!-- Primary -->
<Button variant="primary">Click me</Button>

<!-- Sizes -->
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

<!-- Loading -->
<Button loading>Processing...</Button>

<!-- Disabled -->
<Button disabled>Disabled</Button>

<!-- With icon -->
<Button>
  {#snippet children()}
    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
    Add Item
  {/snippet}
</Button>
```

---

## 3. FormField Component

### FormField.svelte

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  
  interface Props {
    label: string;
    id: string;
    error?: string;
    hint?: string;
    required?: boolean;
    class?: string;
    children: Snippet;
  }
  
  let {
    label,
    id,
    error = $bindable(),
    hint,
    required = false,
    class: className = '',
    children,
  }: Props = $props();
  
  const errorId = $derived(error ? `${id}-error` : undefined);
  const hintId = $derived(hint && !error ? `${id}-hint` : undefined);
  const describedBy = $derived([errorId, hintId].filter(Boolean).join(' '));
</script>

<div class="grid gap-2 {className}" data-state={error ? 'error' : 'valid'}>
  <label
    for={id}
    class="text-sm font-medium leading-none"
  >
    {label}
    {#if required}
      <span class="text-destructive ml-0.5" aria-hidden="true">*</span>
    {/if}
  </label>
  
  {#if hint && !error}
    <p id={hintId} class="text-sm text-muted-foreground">
      {hint}
    </p>
  {/if}
  
  <div class="relative">
    {@render children({ id, 'aria-describedby': describedBy, 'aria-invalid': !!error, 'aria-required': required })}
  </div>
  
  {#if error}
    <p id={errorId} role="alert" aria-live="polite" class="text-sm font-medium text-destructive flex items-center gap-1">
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {error}
    </p>
  {/if}
</div>
```

### FormInput.svelte

```svelte
<script lang="ts">
  interface Props extends Omit<HTMLInputAttributes, 'class'> {
    variant?: 'default' | 'error' | 'success';
    class?: string;
  }
  
  let {
    variant = 'default',
    class: className = '',
    type = 'text',
    ...rest
  }: Props = $props();
  
  const variants = {
    default: 'border-input focus-visible:ring-ring',
    error: 'border-destructive focus-visible:ring-destructive/50',
    success: 'border-success focus-visible:ring-success/50',
  };
</script>

<input
  type={type}
  class="flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-base md:text-sm
         placeholder:text-muted-foreground
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
         disabled:cursor-not-allowed disabled:opacity-50
         transition-colors duration-200
         {variants[variant]} {className}"
  {...rest}
/>
```

### FormField Usage

```svelte
<script>
  import FormField from './FormField.svelte';
  import FormInput from './FormInput.svelte';
  
  let email = $state('');
  let emailError = $state('');
  
  function validateEmail() {
    if (!email.includes('@')) {
      emailError = 'Please enter a valid email';
    } else {
      emailError = '';
    }
  }
</script>

<FormField label="Email" id="email" required error={emailError}>
  {#snippet children({ id, 'aria-describedby': describedBy, 'aria-invalid': invalid, 'aria-required': req })}
    <FormInput
      type="email"
      placeholder="you@example.com"
      bind:value={email}
      onblur={validateEmail}
      aria-describedby={describedBy}
      aria-invalid={invalid}
      aria-required={req}
    />
  {/snippet}
</FormField>
```

---

## 4. Card Component

### Card.svelte

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  
  interface Props {
    variant?: 'default' | 'elevated' | 'outline' | 'ghost';
    interactive?: boolean;
    href?: string;
    class?: string;
    children: Snippet;
  }
  
  let {
    variant = 'default',
    interactive = false,
    href,
    class: className = '',
    children,
  }: Props = $props();
  
  const variants = {
    default: 'border bg-card text-card-foreground shadow-sm',
    elevated: 'shadow-md border-transparent',
    outline: 'border-2',
    ghost: 'border-transparent hover:bg-accent',
  };
</script>

{#if href}
  <a
    {href}
    class="rounded-xl border bg-card text-card-foreground shadow-sm transition-colors duration-200
           hover:shadow-md cursor-pointer {variants[variant]} {className}"
  >
    {@render children()}
  </a>
{:else}
  <div
    class="rounded-xl border bg-card text-card-foreground shadow-sm transition-colors duration-200
           {variants[variant]} {className}"
  >
    {@render children()}
  </div>
{/if}
```

### Card.svelte (Slots)

```svelte
<script lang="ts">
  interface Props {
    title: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    href?: string;
  }
  
  let {
    title,
    description,
    image,
    imageAlt = '',
    href,
  }: Props = $props();
</script>

{#snippet default()}
  {#if image}
    <img src={image} alt={imageAlt} class="w-full aspect-video object-cover" />
  {/if}
  <div class="p-6">
    <h3 class="text-xl font-semibold">{title}</h3>
    {#if description}
      <p class="mt-2 text-muted-foreground">{description}</p>
    {/if}
  </div>
{/snippet}

{#if href}
  <a {href} class="block rounded-xl border bg-card p-6 hover:shadow-md transition-shadow">
    {@render default()}
  </a>
{:else}
  <div class="rounded-xl border bg-card p-6">
    {@render default()}
  </div>
{/if}
```

---

## 5. Modal Component

### Modal.svelte

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  
  interface Props {
    open: boolean;
    title: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    onclose: () => void;
    children: Snippet;
    footer?: Snippet;
  }
  
  let {
    open = $bindable(),
    title,
    description,
    size = 'md',
    onclose,
    children,
    footer,
  }: Props = $props();
  
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-2xl',
    full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
  };
  
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      open = false;
      onclose();
    }
  }
  
  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      open = false;
      onclose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    onclick={handleBackdropClick}
  >
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
    
    <!-- Content -->
    <div class="relative w-full {sizes[size]} bg-background rounded-xl shadow-lg p-6 md:p-8">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 id="modal-title" class="text-lg font-semibold leading-none tracking-tight">
            {title}
          </h2>
          {#if description}
            <p class="mt-1.5 text-sm text-muted-foreground">
              {description}
            </p>
          {/if}
        </div>
        <button
          onclick={() => { open = false; onclose(); }}
          aria-label="Close dialog"
          class="rounded-sm opacity-70 hover:opacity-100 p-1 -mr-1"
        >
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Body -->
      <div class="grid gap-4">
        {@render children()}
      </div>
      
      <!-- Footer -->
      {#if footer}
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2 pt-4 mt-4 border-t">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}
```

### Modal Usage

```svelte
<script>
  import Modal from './Modal.svelte';
  import Button from './Button.svelte';
  
  let modalOpen = $state(false);
</script>

<Button onclick={() => modalOpen = true}>
  Open Modal
</Button>

<Modal
  bind:open={modalOpen}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  size="sm"
  onclose={() => console.log('Modal closed')}
>
  {#snippet children()}
    <p>This action cannot be undone.</p>
  {/snippet}
  {#snippet footer()}
    <Button variant="ghost" onclick={() => modalOpen = false}>
      Cancel
    </Button>
    <Button variant="destructive" onclick={() => modalOpen = false}>
      Delete
    </Button>
  {/snippet}
</Modal>
```

---

## 6. Navigation Component

### Navigation.svelte

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  
  interface NavItem {
    label: string;
    href: string;
    icon?: Snippet;
  }
  
  interface Props {
    items: NavItem[];
    class?: string;
  }
  
  let { items, class: className = '' }: Props = $props();
</script>

<!-- Skip link -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded">
  Skip to main content
</a>

<nav class="flex items-center gap-6 px-4 py-3 border-b {className}" aria-label="Main navigation">
  <!-- Logo -->
  <a href="/" class="font-semibold text-lg">Logo</a>
  
  <!-- Desktop nav -->
  <ul class="hidden md:flex items-center gap-1 flex-1">
    {#each items as item}
      {@const isActive = $page.url.pathname === item.href}
      <li>
        <a
          href={item.href}
          aria-current={isActive ? 'page' : undefined}
          class="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                 {isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}"
        >
          {#if item.icon}
            {@render item.icon()}
          {/if}
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<main id="main-content" tabindex="-1" class="flex-1">
  <slot />
</main>
```

---

## 8. Input Components

### TextInput.svelte

Standalone input component with variants for validation states.

```svelte
<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  interface Props extends Omit<HTMLInputAttributes, 'class'> {
    variant?: 'default' | 'error' | 'success';
    class?: string;
  }
  let {
    variant = 'default',
    class: className = '',
    type = 'text',
    ...rest
  }: Props = $props();


  const variantClasses = {
    default: 'border-input focus-visible:ring-ring',
    error: 'border-destructive focus-visible:ring-destructive/50',
    success: 'border-success focus-visible:ring-success/50',
  };
</script>

<input
  type={type}
  {...rest}
  class="flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-base md:text-sm
         placeholder:text-muted-foreground
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
         disabled:cursor-not-allowed disabled:opacity-50
         transition-colors duration-200
         {variantClasses[variant]} {className}"
/>
```

### TextInput with Search Icon

```svelte
<script>
  import { Search } from 'lucide-svelte';
  let value = $state('');
</script>


<div class="relative">
  <Search
    class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
    aria-hidden="true"
  />
  <input
    type="search"
    bind:value
    placeholder="Search..."
    class="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2
           text-base md:text-sm placeholder:text-muted-foreground
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
           disabled:cursor-not-allowed disabled:opacity-50"
    aria-label="Search"
  />
</div>
```

### FormTextarea.svelte

Multi-line text input component.
```svelte
<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  interface Props extends Omit<HTMLTextareaAttributes, 'class'> {
    variant?: 'default' | 'error' | 'success';
    class?: string;
  }
  let {
    variant = 'default',
    class: className = '',
    ...rest
  }: Props = $props();
  const variantClasses = {
    default: 'border-input focus-visible:ring-ring',
    error: 'border-destructive focus-visible:ring-destructive/50',
    success: 'border-success focus-visible:ring-success/50',
  };
</script>

<textarea
  {...rest}
  class="flex min-h-[80px] w-full rounded-lg border bg-background px-3 py-2 text-base md:text-sm
         placeholder:text-muted-foreground
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
         disabled:cursor-not-allowed disabled:opacity-50
         resize-y transition-colors duration-200
         {variantClasses[variant]} {className}"
/>
```

---


## 7. Animation Patterns

### Svelte Transitions

```svelte
<script>
  import { fade, fly, scale } from 'svelte/transition';
  
  let show = $state(false);
</script>

<!-- Fade -->
<button onclick={() => show = !show}>Toggle</button>

{#if show}
  <div transition:fade={{ duration: 300, delay: 100 }}>
    Fading content
  </div>
  
  <!-- Fly -->
  <div transition:fly={{ y: 20, duration: 300, delay: 200 }}>
    Flying content
  </div>
  
  <!-- Scale -->
  <div transition:scale={{ start: 0.95, duration: 200 }}>
    Scaling content
  </div>
{/if}
```

### Custom Transitions

```svelte
<script>
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  
  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });
  
  function simulateProgress() {
    progress.set(100);
  }
</script>

<div class="w-full bg-gray-200 rounded-full h-2">
  <div
    class="bg-primary h-2 rounded-full transition-all"
    style="width: {$progress}%"
  />
</div>

<button onclick={simulateProgress}>
  Start Progress
</button>
```

### Reduced Motion

```svelte
<script>
  import { fade, fly } from 'svelte/transition';
  import { reducedMotion } from 'svelte/motion';
  
  const duration = $derived($reducedMotion ? 0 : 300);
</script>

{#if show}
  <div
    in:fly={{ y: 20, duration }}
    out:fade={{ duration: $reducedMotion ? 0 : 200 }}
  >
    Respects reduced motion
  </div>
{/if}
```

---

## Component Index

```svelte
// index.svelte - Import all components

export { default as Button } from './Button.svelte';
export { default as FormField } from './FormField.svelte';
export { default as FormInput } from './FormInput.svelte';
export { default as Card } from './Card.svelte';
export { default as Modal } from './Modal.svelte';
export { default as Navigation } from './Navigation.svelte';
```

---

## Quick Reference

| Component | Svelte Feature | Tailwind |
|-----------|----------------|----------|
| Button | Snippets for content | CVA-like classes |
| FormField | `$bindable()` for two-way | Standard classes |
| Card | Conditional rendering | Variants object |
| Modal | `$state()` for open | Portal-like pattern |
| Navigation | `$page` store | Responsive |

---

Last updated: 2026-06-03 (v1.6.3)