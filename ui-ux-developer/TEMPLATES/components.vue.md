# Vue 3 Component Templates

Complete component templates for Vue 3 with Tailwind v4. Uses Composition API, TypeScript, and accessible design patterns.

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
npm install vue @vitejs/plugin-vue tailwindcss postcss autoprefixer
npm install @tailwindcss/typography
```

### Vite Configuration

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

### Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
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
/* src/assets/main.css */
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
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Generate unique ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Simple transition helper
 */
export const transition = {
  duration: 'duration-200',
  ease: 'ease-in-out',
};
```

---

## 2. Button Component

### Button.vue

```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  class: '',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-primary/50',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizes = {
  xs: 'h-8 px-2.5 text-xs gap-1',
  sm: 'h-9 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-8 text-base gap-2',
  icon: 'h-10 w-10',
};

function handleClick(event: MouseEvent) {
  emit('click', event);
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      variants[variant],
      sizes[size],
      class,
    ]"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
        opacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>
    <slot />
  </button>
</template>
```

### Button Usage

```vue
<script setup>
import Button from './Button.vue';
</script>

<template>
  <!-- Primary -->
  <Button variant="primary">Click me</Button>

  <!-- Sizes -->
  <Button size="sm">Small</Button>
  <Button size="lg">Large</Button>

  <!-- Loading -->
  <Button :loading="isLoading">Processing...</Button>

  <!-- Disabled -->
  <Button :disabled="true">Disabled</Button>

  <!-- With icon -->
  <Button>
    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
    Add Item
  </Button>
</template>
```

---

## 3. FormField Component

### FormField.vue

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { generateId } from '@/lib/utils';

interface Props {
  label: string;
  id?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => generateId('field'),
  required: false,
  class: '',
});

const errorId = computed(() => props.error ? `${props.id}-error` : undefined);
const hintId = computed(() => props.hint && !props.error ? `${props.id}-hint` : undefined);
const describedBy = computed(() => {
  const ids = [errorId.value, hintId.value].filter(Boolean);
  return ids.length ? ids.join(' ') : undefined;
});
</script>

<template>
  <div
    :class="['grid gap-2', error && 'text-destructive', class]"
    :data-state="error ? 'error' : 'valid'"
  >
    <!-- Label -->
    <label
      :for="id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {{ label }}
      <span v-if="required" class="text-destructive ml-0.5" aria-hidden="true">*</span>
    </label>

    <!-- Hint text -->
    <p v-if="hint && !error" :id="hintId" class="text-sm text-muted-foreground">
      {{ hint }}
    </p>

    <!-- Input slot -->
    <div class="relative">
      <slot :id="id" :aria-describedby="describedBy" :aria-invalid="!!error" :aria-required="required" />
    </div>

    <!-- Error message -->
    <p
      v-if="error"
      :id="errorId"
      role="alert"
      aria-live="polite"
      class="text-sm font-medium text-destructive flex items-center gap-1"
    >
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {{ error }}
    </p>
  </div>
</template>
```

### FormInput.vue

```vue
<script setup lang="ts">
interface Props {
  modelValue?: string;
  variant?: 'default' | 'error' | 'success';
  type?: 'text' | 'email' | 'password' | 'url' | 'tel';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  class: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const variants = {
  default: 'border-input focus-visible:ring-ring',
  error: 'border-destructive focus-visible:ring-destructive/50',
  success: 'border-success focus-visible:ring-success/50',
};

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :class="[
      'flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-base md:text-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors duration-200',
      variants[variant],
      class,
    ]"
    @input="handleInput"
  />
</template>
```

### FormField Usage

```vue
<script setup>
import { ref } from 'vue';
import FormField from './FormField.vue';
import FormInput from './FormInput.vue';
import Button from './Button.vue';

const email = ref('');
const emailError = ref('');

function validateEmail() {
  if (!email.value.includes('@')) {
    emailError.value = 'Please enter a valid email';
  } else {
    emailError.value = '';
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormField
      label="Email"
      id="email-field"
      required
      :error="emailError"
    >
      <template #default="{ id, aria-describedby, aria-invalid, aria-required }">
        <FormInput
          v-model="email"
          type="email"
          placeholder="you@example.com"
          :aria-describedby="aria-describedby"
          :aria-invalid="aria-invalid"
          :aria-required="aria-required"
          @blur="validateEmail"
        />
      </template>
    </FormField>

    <Button type="submit">Submit</Button>
  </form>
</template>
```

---

## 4. Card Component

### Card.vue

```vue
<script setup lang="ts">
interface Props {
  variant?: 'default' | 'elevated' | 'outline' | 'ghost';
  interactive?: boolean;
  href?: string;
  to?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  interactive: false,
  class: '',
});

const variants = {
  default: 'border bg-card text-card-foreground shadow-sm',
  elevated: 'shadow-md border-transparent',
  outline: 'border-2',
  ghost: 'border-transparent hover:bg-accent',
};
</script>

<template>
  <!-- As link -->
  <a
    v-if="href"
    :href="href"
    :class="[
      'block rounded-xl border bg-card text-card-foreground shadow-sm transition-colors duration-200',
      'hover:shadow-md cursor-pointer',
      variants[variant],
      class,
    ]"
  >
    <slot />
  </a>

  <!-- As router-link (Vue Router) -->
  <router-link
    v-else-if="to"
    :to="to"
    :class="[
      'block rounded-xl border bg-card text-card-foreground shadow-sm transition-colors duration-200',
      'hover:shadow-md cursor-pointer',
      variants[variant],
      class,
    ]"
  >
    <slot />
  </router-link>

  <!-- As div -->
  <div
    v-else
    :class="[
      'rounded-xl border bg-card text-card-foreground shadow-sm transition-colors duration-200',
      variants[variant],
      class,
    ]"
  >
    <slot />
  </div>
</template>
```

### Card Usage

```vue
<script setup>
import Card from './Card.vue';
</script>

<template>
  <!-- Simple card -->
  <Card>
    <div class="p-6">
      <h3 class="text-lg font-semibold">Card Title</h3>
      <p class="mt-2 text-muted-foreground">Card description</p>
    </div>
  </Card>

  <!-- Interactive link -->
  <Card href="/product/1" interactive>
    <img src="/product.jpg" alt="Product" class="w-full aspect-video object-cover" />
    <div class="p-6">
      <h3 class="text-lg font-semibold">Product Name</h3>
      <p class="mt-2 text-muted-foreground">$99</p>
    </div>
  </Card>

  <!-- Variants -->
  <Card variant="elevated">
    <div class="p-6">Elevated card</div>
  </Card>

  <Card variant="ghost">
    <div class="p-6">Ghost card</div>
  </Card>
</template>
```

---

## 5. Modal Component

### Modal.vue

```vue
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';

interface Props {
  modelValue: boolean;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closeOnBackdrop: true,
  closeOnEscape: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  close: [];
}>();

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-xl',
  xl: 'max-w-2xl',
  full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
};

// Focus trap
const modalRef = ref<HTMLElement | null>(null);

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    nextTick(() => {
      const focusable = modalRef.value?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.[0]?.focus();
    });
  } else {
    document.body.style.overflow = '';
  }
});

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnEscape) {
    emit('update:modelValue', false);
    emit('close');
  }

  // Focus trap
  if (event.key === 'Tab' && modalRef.value) {
    const focusable = modalRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget && props.closeOnBackdrop) {
    emit('update:modelValue', false);
    emit('close');
  }
}

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
        @keydown="handleKeydown"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

        <!-- Content -->
        <div
          ref="modalRef"
          :class="['relative w-full bg-background rounded-xl shadow-lg p-6 md:p-8', sizes[size]]"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 id="modal-title" class="text-lg font-semibold leading-none tracking-tight">
                {{ title }}
              </h2>
              <p v-if="description" class="mt-1.5 text-sm text-muted-foreground">
                {{ description }}
              </p>
            </div>
            <button
              @click="emit('update:modelValue', false); emit('close')"
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
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2 pt-4 mt-4 border-t">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div:last-child,
.modal-leave-active > div:last-child {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from > div:last-child,
.modal-leave-to > div:last-child {
  transform: scale(0.95);
  opacity: 0;
}
</style>
```

### Modal Usage

```vue
<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';
import Button from './Button.vue';

const modalOpen = ref(false);
</script>

<template>
  <Button @click="modalOpen = true">
    Open Modal
  </Button>

  <Modal v-model="modalOpen" title="Confirm Action" description="Are you sure?" size="sm">
    <p>This action cannot be undone.</p>
    
    <template #footer>
      <Button variant="ghost" @click="modalOpen = false">Cancel</Button>
      <Button variant="destructive" @click="modalOpen = false">Delete</Button>
    </template>
  </Modal>
</template>
```

---

## 6. Navigation Component

### Navigation.vue

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

interface Props {
  items: NavItem[];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
});

const route = useRoute();

function isActive(href: string): boolean {
  return route.path === href;
}
</script>

<template>
  <!-- Skip link -->
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded">
    Skip to main content
  </a>

  <nav :class="['flex items-center gap-6 px-4 py-3 border-b', class]" aria-label="Main navigation">
    <!-- Logo -->
    <router-link to="/" class="font-semibold text-lg">
      Logo
    </router-link>

    <!-- Desktop nav -->
    <ul class="hidden md:flex items-center gap-1 flex-1">
      <li v-for="item in items" :key="item.href">
        <router-link
          :to="item.href"
          :aria-current="isActive(item.href) ? 'page' : undefined"
          :class="[
            'inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
            isActive(item.href)
              ? 'bg-accent text-accent-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50',
          ]"
        >
          {{ item.label }}
        </router-link>
      </li>
    </ul>

    <!-- Mobile menu button -->
    <slot name="mobile-actions" />
  </nav>

  <main id="main-content" tabindex="-1" class="flex-1">
    <slot />
  </main>
</template>
```

---

## 8. Input Components

### TextInput.vue

Standalone input component with variants for validation states.

```vue
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string;
  variant?: 'default' | 'error' | 'success';
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  class: '',
});


const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const variantClasses = {
  default: 'border-input focus-visible:ring-ring',
  error: 'border-destructive focus-visible:ring-destructive/50',
  success: 'border-success focus-visible:ring-success/50',
};


function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :class="[
      'flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-base md:text-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors duration-200',
      variantClasses[variant],
      class,
    ]"
    @input="handleInput"
  />
</template>
```

### TextInput with Search Icon

```vue
<script setup>
import { ref } from 'vue';
import { Search } from 'lucide-vue-next';

const value = ref('');
</script>

<template>
  <div class="relative">
    <Search
      class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
      aria-hidden="true"
    />
    <input
      type="search"
      v-model="value"
      placeholder="Search..."
      class="flex h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2
             text-base md:text-sm placeholder:text-muted-foreground
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
             disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Search"
    />
  </div>
</template>
```

### FormTextarea.vue

Multi-line text input component.
```vue
<script setup lang="ts">
interface Props {
  modelValue?: string;
  variant?: 'default' | 'error' | 'success';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  rows?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  placeholder: '',
  disabled: false,
  readonly: false,
  rows: 4,
  class: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const variantClasses = {
  default: 'border-input focus-visible:ring-ring',
  error: 'border-destructive focus-visible:ring-destructive/50',
  success: 'border-success focus-visible:ring-success/50',
};

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :rows="rows"
    :class="[
      'flex min-h-[80px] w-full rounded-lg border bg-background px-3 py-2 text-base md:text-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'resize-y transition-colors duration-200',
      variantClasses[variant],
      class,
    ]"
    @input="handleInput"
  />
</template>
```

---


## 7. Animation Patterns

### Vue Transitions

```vue
<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>

<template>
  <button @click="show = !show">Toggle</button>

  <Transition name="fade">
    <div v-if="show">
      Fading content
    </div>
  </Transition>

  <Transition name="slide-up" mode="out-in">
    <div v-if="show" key="content">
      Sliding content
    </div>
  </Transition>
</template>

<style scoped>
/* Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide up */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
```

### GSAP Integration (Optional)

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const cardRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (cardRef.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.from(cardRef.value, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
    });
  }
});
</script>

<template>
  <div ref="cardRef" class="p-6 bg-card rounded-xl">
    Animated card
  </div>
</template>
```

### Reduced Motion

```vue
<script setup>
import { ref, computed } from 'vue';

const prefersReducedMotion = ref(
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
);
</script>

<template>
  <Transition :duration="prefersReducedMotion ? 0 : 300">
    <div v-if="show">
      Respects reduced motion
    </div>
  </Transition>
</template>
```

---

## Component Index

```typescript
// src/components/index.ts

export { default as Button } from './Button.vue';
export { default as FormField } from './FormField.vue';
export { default as FormInput } from './FormInput.vue';
export { default as Card } from './Card.vue';
export { default as Modal } from './Modal.vue';
export { default as Navigation } from './Navigation.vue';
```

---

## Quick Reference

| Component | Vue Feature | Tailwind |
|-----------|------------|----------|
| Button | Slots, emit | CVA-like classes |
| FormField | Scoped slots, computed | Standard classes |
| Card | Conditional rendering | Variants object |
| Modal | Teleport, Transition | Portal pattern |
| Navigation | Vue Router integration | Responsive |

---

Last updated: 2026-06-03 (v1.6.3)