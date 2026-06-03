# Design Styles Guide

Complete templates for 8 design styles. Each includes CSS variables, component patterns, and implementation guidelines.

---

## Table of Contents

1. [Glassmorphism](#1-glassmorphism)
2. [Minimalism](#2-minimalism)
3. [Brutalism](#3-brutalism)
4. [Neumorphism](#4-neumorphism)
5. [Material Design](#5-material-design)
6. [Apple Human Interface](#6-apple-human-interface)
7. [Flat 2.0](#7-flat-20)
8. [Skeuomorphism](#8-skeuomorphism)

---

## 1. Glassmorphism

### Description
Translucent, frosted-glass effect with blur and transparency. Creates depth through layered elements with subtle color tints.

### Use Cases
- Dashboard interfaces
- Cards and elevated surfaces
- Modal overlays
- Navigation headers

### CSS Variables (Tailwind v4)

```css
@theme {
  /* Glass Effect Colors */
  --color-glass-bg: rgba(255, 255, 255, 0.15);
  --color-glass-border: rgba(255, 255, 255, 0.25);
  --color-glass-hover: rgba(255, 255, 255, 0.2);
  --color-glass-shadow: rgba(0, 0, 0, 0.1);
  
  /* Glass Tints */
  --color-glass-tint-blue: rgba(59, 130, 246, 0.1);
  --color-glass-tint-purple: rgba(139, 92, 246, 0.1);
  --color-glass-tint-pink: rgba(236, 72, 153, 0.1);
  --color-glass-tint-green: rgba(34, 197, 94, 0.1);
  
  /* Background Gradients */
  --gradient-glass-bg: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0.05) 100%);
    
  /* Blur */
  --blur-glass: 12px;
  --blur-glass-heavy: 24px;
}

.glass {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--blur-glass));
  -webkit-backdrop-filter: blur(var(--blur-glass));
  border: 1px solid var(--color-glass-border);
  border-radius: 16px;
}

.glass-heavy {
  background: var(--color-glass-bg);
  backdrop-filter: blur(var(--blur-glass-heavy));
  -webkit-backdrop-filter: blur(var(--blur-glass-heavy));
  border: 1px solid var(--color-glass-border);
}
```

### Tailwind Classes

```html
<!-- Glass Card -->
<div class="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl shadow-lg">
  <!-- content -->
</div>

<!-- Glass Button -->
<button class="bg-white/20 backdrop-blur-md border border-white/30 
               hover:bg-white/30 active:bg-white/40 
               transition-all duration-300 rounded-xl px-6 py-3">
  Glass Button
</button>

<!-- Glass Navigation -->
<nav class="bg-slate-900/10 backdrop-blur-lg border-b border-white/10">
  <!-- nav items -->
</nav>
```

### Component Patterns

#### Glass Card
```html
<div class="
  relative
  overflow-hidden
  bg-gradient-to-br from-white/20 to-white/5
  backdrop-blur-xl
  border border-white/20
  rounded-2xl
  shadow-[0_8px_32px_rgba(0,0,0,0.1)]
  group
">
  <!-- Glow effect on hover -->
  <div class="
    absolute inset-0
    bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10
    opacity-0 group-hover:opacity-100
    transition-opacity duration-500
  "></div>
  
  <div class="relative p-6">
    <!-- content -->
  </div>
</div>
```

#### Glass Modal
```html
<div class="
  fixed inset-0 z-50
  flex items-center justify-center
  bg-black/50 backdrop-blur-sm
">
  <div class="
    relative
    w-full max-w-lg mx-4
    bg-white/10 backdrop-blur-2xl
    border border-white/20
    rounded-3xl
    shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
  ">
    <!-- Modal content -->
  </div>
</div>
```

### Animation Guidelines

```css
/* Glass hover animation */
.glass-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-item:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### Dark Mode Variant

```css
/* Light mode (default) */
:root {
  --glass-bg: rgba(255, 255, 255, 0.15);
  --glass-border: rgba(255, 255, 255, 0.25);
  --glass-shadow: rgba(0, 0, 0, 0.1);
  --glass-text: #0a0a0a;
  --glass-text-secondary: #525252;
}

/* Dark mode — prefers-color-scheme */
@media (prefers-color-scheme: dark) {
  :root {
    --glass-bg: rgba(15, 23, 42, 0.7);
    --glass-border: rgba(255, 255, 255, 0.1);
    --glass-shadow: rgba(0, 0, 0, 0.3);
    --glass-text: #f9fafb;
    --glass-text-secondary: #a3a3a3;
  }
}

.dark .glass {
  background: var(--glass-bg);
  border-color: var(--glass-border);
}

.glass-dark {
  background: rgba(15, 23, 42, 0.7);
  border-color: rgba(255, 255, 255, 0.1);
  color: #f9fafb;
}
```

### Dark Mode Tailwind Classes

```html
<div class="dark:bg-slate-900/70 dark:backdrop-blur-xl dark:border-white/10">
  <!-- content -->
</div>

<div class="glass glass-dark">
  <h3 class="glass-title">Title</h3>
  <p class="glass-description">Description</p>
</div>
```

### Best Paired With
- Light backgrounds with subtle color tints (blue, purple, pink, green)
- Minimal content with focus on transparency effects
- Dashboard interfaces with layered elements

### Avoid When
- Heavy text content (blur reduces readability)
- Print contexts (transparency does not translate)
- Low-contrast environments

---

---

## 2. Minimalism

### Description
Clean, uncluttered interfaces with focus on essential elements. Strong typography, generous whitespace, and subtle interactions.

### Use Cases
- Portfolio websites
- Product pages
- Editorial content
- Premium services

### CSS Variables (Tailwind v4)

```css
@theme {
  /* Minimal Palette - High Contrast */
  --color-min-text: #0a0a0a;
  --color-min-text-secondary: #525252;
  --color-min-surface: #ffffff;
  --color-min-surface-alt: #fafafa;
  --color-min-border: #e5e5e5;
  --color-min-accent: #000000;
  
  /* Spacing - Generous */
  --spacing-min-xs: 0.25rem;   /* 4px */
  --spacing-min-sm: 0.5rem;    /* 8px */
  --spacing-min-md: 1rem;      /* 16px */
  --spacing-min-lg: 2rem;       /* 32px */
  --spacing-min-xl: 4rem;       /* 64px */
  --spacing-min-2xl: 6rem;      /* 96px */
  
  /* Typography */
  --font-min-display: 'Inter', system-ui, sans-serif;
  --font-min-body: 'Inter', system-ui, sans-serif;
  
  /* Border Radius */
  --radius-min: 4px;
}
```

### Tailwind Classes

```html
<!-- Minimal Card -->
<div class="bg-white border border-gray-200 rounded p-6">
  <!-- content -->
</div>

<!-- Minimal Button -->
<button class="
  bg-black text-white px-6 py-3 rounded 
  hover:bg-gray-800 active:bg-gray-900
  transition-colors duration-200
  font-medium
">
  Action
</button>

<!-- Minimal Input -->
<input class="
  w-full border-b border-gray-300 pb-2
  bg-transparent
  focus:border-black focus:outline-none
  transition-colors duration-200
  placeholder:text-gray-400
" placeholder="Email address">
```

### Component Patterns

#### Minimal Card
```html
<div class="
  group
  bg-white border border-gray-100
  rounded-sm p-8
  hover:shadow-sm
  transition-shadow duration-300
">
  <div class="text-sm text-gray-500 mb-2">Category</div>
  <h3 class="text-xl font-semibold text-gray-900 mb-4">
    Card Title
  </h3>
  <p class="text-gray-600 leading-relaxed">
    Description text with generous line height.
  </p>
</div>
```

#### Minimal Typography
```html
<h1 class="
  text-5xl md:text-7xl
  font-semibold tracking-tight
  text-gray-900
  leading-[1.1]
  mb-8
">
  Large Headline
</h1>
<p class="
  text-lg md:text-xl
  text-gray-600
  leading-relaxed
  max-w-2xl
">
  Body text with comfortable reading width.
</p>
```

#### Minimal Navigation
```html
<nav class="
  flex items-center justify-between
  py-8
  border-b border-gray-100
">
  <div class="text-xl font-semibold">Logo</div>
  <ul class="flex gap-8">
    <li><a href="#" class="text-sm text-gray-600 hover:text-black">Link</a></li>
  </ul>
</nav>
```

### Animation Guidelines

```css
/* Minimal hover - subtle */
.minimal-hover {
  transition: all 0.2s ease;
}

.minimal-hover:hover {
  opacity: 0.8;
}

/* Underline animation */
.minimal-link {
  position: relative;
}

.minimal-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease;
}

.minimal-link:hover::after {
  width: 100%;
}
```

### Best Paired With
- High-quality imagery and photography
- Strong typographic hierarchy
- Generous whitespace and breathing room
- Premium/luxury products and services

### Avoid When
- Dense information displays
- Mobile apps with limited screen space
- Low-contrast or busy backgrounds
- Government/corporate formal requirements

---

## 3. Brutalism

### Description
Raw, bold, and unapologetic. Thick borders, stark contrasts, monospace fonts, and intentional "ugly" aesthetics.

### Use Cases
- Creative portfolios
- Fashion brands
- Bold statements
- Memes/Nostalgia

### CSS Variables (Tailwind v4)

```css
@theme {
  /* Brutal Palette */
  --color-brut-black: #000000;
  --color-brut-white: #ffffff;
  --color-brut-yellow: #ffff00;
  --color-brut-red: #ff0000;
  --color-brut-blue: #0000ff;
  
  /* Borders - Thick */
  --border-brut: 3px solid;
  --border-brut-heavy: 5px solid;
  
  /* Fonts */
  --font-brut-display: 'Space Mono', monospace;
  --font-brut-body: 'Space Mono', monospace;
}
```

### Tailwind Classes

```html
<!-- Brutal Card -->
<div class="
  bg-yellow-400 
  border-4 border-black 
  shadow-[8px_8px_0_black]
  p-8
  hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0_black]
  transition-all duration-100
">
  <!-- content -->
</div>

<!-- Brutal Button -->
<button class="
  bg-black text-white 
  border-4 border-black 
  px-8 py-4
  font-mono font-bold uppercase
  hover:bg-yellow-400 hover:text-black
  active:bg-red-500
  transition-colors duration-100
">
  BRUTAL
</button>

<!-- Brutal Border Box -->
<div class="border-4 border-black bg-white p-6">
  <h2 class="font-mono text-2xl font-bold uppercase">Title</h2>
</div>
```

### Component Patterns

#### Brutal Card
```html
<div class="
  relative
  bg-white
  border-4 border-black
  p-8
  shadow-[8px_8px_0_black]
  rotate-[-1deg]
  hover:rotate-0 hover:translate-x-1 hover:translate-y-1
  hover:shadow-[4px_4px_0_black]
  transition-all duration-150
">
  <div class="absolute top-0 right-0 bg-black text-white px-2 py-1 text-xs font-mono">
    NEW
  </div>
  <h3 class="font-mono text-2xl font-bold uppercase mb-4">TITLE</h3>
  <p class="font-mono">Content here</p>
</div>
```

#### Brutal Button Group
```html
<div class="
  flex flex-wrap gap-4
  p-4 border-4 border-black
">
  <button class="
    bg-yellow-400 border-4 border-black px-6 py-4 
    font-mono font-bold uppercase shadow-[4px_4px_0_black]
    hover:shadow-[2px_2px_0_black] hover:translate-x-[2px] hover:translate-y-[2px]
    active:shadow-none active:translate-x-[4px] active:translate-y-[4px]
  ">
    YES
  </button>
  <button class="
    bg-white border-4 border-black px-6 py-4 
    font-mono font-bold uppercase shadow-[4px_4px_0_black]
    hover:shadow-[2px_2px_0_black] hover:translate-x-[2px] hover:translate-y-[2px]
  ">
    NO
  </button>
</div>
```

#### Brutal Typography
```html
<div class="space-y-4">
  <h1 class="
    font-mono text-6xl md:text-8xl 
    font-bold uppercase
    tracking-tighter
    leading-none
    -rotate-2
  ">
    BRUTAL<br/>DESIGN
  </h1>
  <p class="
    font-mono text-xl
    max-w-xl
    border-l-4 border-black pl-4
  ">
    Bold statement with monospace typography.
  </p>
</div>
```

### Animation Guidelines

```css
/* Brutal hover - aggressive */
.brutal-click {
  transition: transform 0.1s, box-shadow 0.1s;
}

.brutal-click:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}

/* Marquee effect */
.brutal-marquee {
  overflow: hidden;
  border: 4px solid black;
}

.brutal-marquee-inner {
  display: flex;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### Best Paired With
- Creative portfolios and agencies
- Fashion and streetwear brands
- Bold statements and announcements
- Retro/nostalgia themed projects

### Avoid When
- Professional/corporate environments
- Healthcare or finance sectors
- Accessible designs (low contrast)
- Small screens with limited space

---

## 4. Neumorphism

> ⚠️ **Dark Mode Advisory:** Neumorphism relies on shadow contrast (light source from top-left). In dark mode, shadows lose their visual meaning as both highlight and shadow approach the same dark background tone. **Avoid in dark mode** or use a flat alternative style.

### Description
Soft, extruded UI elements that appear to float above the surface. Light source from top-left creates consistent shadows.

### Use Cases
- Health/Fitness apps
- Music players
- Settings interfaces
- Productivity tools

### CSS Variables (Tailwind v4)

```css
@theme {
  /* Neumorphic Base */
  --color-neum-bg: #e0e5ec;
  --color-neum-bg-dark: #d1d9e6;
  --color-neum-shadow-light: #ffffff;
  --color-neum-shadow-dark: #a3b1c6;
  
  /* Neumorphic Shadows */
  --shadow-neum-raised: 
    8px 8px 16px var(--color-neum-shadow-dark),
    -8px -8px 16px var(--color-neum-shadow-light);
    
  --shadow-neum-pressed: 
    inset 8px 8px 16px var(--color-neum-shadow-dark),
    inset -8px -8px 16px var(--color-neum-shadow-light);
    
  --shadow-neum-flat: 
    4px 4px 8px var(--color-neum-shadow-dark),
    -4px -4px 8px var(--color-neum-shadow-light);
}
```

### Tailwind Classes

```html
<!-- Neumorphic Card -->
<div class="
  bg-gray-200
  rounded-2xl
  shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]
  p-8
">
  <!-- content -->
</div>

<!-- Neumorphic Button -->
<button class="
  bg-gray-200
  rounded-xl
  px-8 py-4
  shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]
  hover:shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
  active:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]
  transition-all duration-200
">
  Button
</button>

<!-- Neumorphic Input -->
<input class="
  w-full px-6 py-4
  bg-gray-200
  rounded-xl
  shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]
  focus:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff]
  transition-all duration-200
  placeholder:text-gray-400
">
```

### Component Patterns

#### Neumorphic Card
```html
<div class="
  relative
  bg-[#e0e5ec]
  rounded-3xl
  p-8
  shadow-[12px_12px_24px_#a3b1c6,-12px_-12px_24px_#ffffff]
  before:absolute before:inset-4 before:rounded-2xl
  before:shadow-[inset_2px_2px_4px_#a3b1c6,inset_-2px_-2px_4px_#ffffff]
  before:bg-transparent
">
  <div class="relative">
    <!-- content -->
  </div>
</div>
```

#### Neumorphic Button States
```html
<!-- Default -->
<button class="
  bg-[#e0e5ec]
  rounded-2xl
  px-10 py-5
  shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]
  text-gray-700 font-medium
">
  Default
</button>

<!-- Hover -->
<button class="
  bg-[#e0e5ec]
  rounded-2xl
  px-10 py-5
  shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]
  text-gray-700 font-medium
  hover:shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff]
">
  Hover
</button>

<!-- Pressed -->
<button class="
  bg-[#e0e5ec]
  rounded-2xl
  px-10 py-5
  shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]
  text-gray-700 font-medium
">
  Pressed
</button>

<!-- Disabled -->
<button class="
  bg-[#e0e5ec]
  rounded-2xl
  px-10 py-5
  shadow-[4px_4px_8px_#a3b1c6,-4px_-4px_8px_#ffffff]
  text-gray-400 font-medium opacity-60
  cursor-not-allowed
">
  Disabled
</button>
```

#### Neumorphic Toggle
```html
<div class="flex items-center gap-4">
  <div class="
    w-16 h-8
    bg-[#e0e5ec]
    rounded-full
    shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]
    relative
  ">
    <div class="
      absolute top-1 left-1
      w-6 h-6
      bg-[#e0e5ec]
      rounded-full
      shadow-[2px_2px_4px_#a3b1c6,-2px_-2px_4px_#ffffff]
      transition-transform duration-300
      data-[state=checked]:translate-x-8
    "></div>
  </div>
  <span class="text-gray-600 font-medium">Enable feature</span>
</div>
```

### Animation Guidelines

```css
/* Neumorphic transition */
.neum-btn {
  transition: all 0.2s ease;
}

.neum-btn:hover {
  box-shadow: 
    10px 10px 20px var(--shadow-dark),
    -10px -10px 20px var(--shadow-light);
}

.neum-btn:active {
  box-shadow: 
    inset 6px 6px 12px var(--shadow-dark),
    inset -6px -6px 12px var(--shadow-light);
}
```

### Dark Mode Variant

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-neum-bg: #2d3748;
    --color-neum-bg-dark: #1a202c;
    --color-neum-shadow-light: #3d4a5c;
    --color-neum-shadow-dark: #1a202c;
  }
}
```

### Best Paired With
- Health and fitness apps
- Music players and audio interfaces
- Settings and preferences panels
- Productivity tools with soft aesthetics

### Avoid When
- High-contrast or accessibility-critical designs
- Mobile apps with small touch targets (shadows add visual noise)
- Complex data visualization (shadows reduce clarity)
- Dark mode interfaces (neumorphism is designed for light backgrounds)

---

## 5. Material Design

### Description
Google's design system with emphasis on depth, motion, and grid-based layouts. Uses shadows for elevation and bold colors.

### Use Cases
- Android apps
- SaaS dashboards
- Google-style products
- Content-heavy interfaces

### CSS Variables (Tailwind v4)

```css
@theme {
  /* Material Palette */
  --color-material-primary: #6200ee;
  --color-material-primary-dark: #3700b3;
  --color-material-secondary: #03dac6;
  --color-material-error: #b00020;
  --color-material-surface: #ffffff;
  --color-material-on-primary: #ffffff;
  --color-material-on-surface: #1c1b1f;
  
  /* Material Elevation */
  --shadow-material-1: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  --shadow-material-2: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  --shadow-material-3: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  --shadow-material-4: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  --shadow-material-5: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  
  /* Material Typography Scale */
  --text-material-display: 3.5rem;    /* 57sp */
  --text-material-headline: 2rem;     /* 32sp */
  --text-material-title: 1.5rem;     /* 24sp */
  --text-material-body: 1rem;        /* 16sp */
  --text-material-label: 0.875rem;   /* 14sp */
}
```

### Tailwind Classes

```html
<!-- Material Card (elevated) -->
<div class="
  bg-white
  rounded-lg
  shadow-md
  p-6
  hover:shadow-lg
  transition-shadow duration-300
">
  <!-- content -->
</div>

<!-- Material FAB -->
<button class="
  w-14 h-14
  bg-purple-600 text-white
  rounded-full
  shadow-md
  flex items-center justify-center
  hover:bg-purple-700
  active:bg-purple-800
  transition-colors duration-200
">
  <PlusIcon class="w-6 h-6" />
</button>

<!-- Material Text Field (outlined) -->
<div class="
  relative
  border border-gray-400 rounded
  focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-100
">
  <label class="
    absolute left-4 -top-2 bg-white px-1
    text-xs text-gray-600
  ">Email</label>
  <input class="w-full px-4 py-3 outline-none">
</div>
```

### Component Patterns

#### Material Button Variants
```html
<!-- Contained (Primary) -->
<button class="
  bg-purple-600 text-white
  px-6 py-3 rounded-md
  shadow-[0_2px_4px_rgba(98,0,238,0.2)]
  hover:bg-purple-700 hover:shadow-[0_4px_8px_rgba(98,0,238,0.3)]
  active:bg-purple-800 active:shadow-none
  transition-all duration-200
  font-medium
  tracking-wide
">
  Contained
</button>

<!-- Outlined -->
<button class="
  border-2 border-purple-600 text-purple-600
  px-6 py-3 rounded-md
  hover:bg-purple-50
  active:bg-purple-100
  transition-colors duration-200
  font-medium
">
  Outlined
</button>

<!-- Text -->
<button class="
  text-purple-600
  px-4 py-2 rounded-md
  hover:bg-purple-50
  active:bg-purple-100
  transition-colors duration-200
  font-medium
">
  Text
</button>
```

#### Material Card
```html
<div class="
  bg-white
  rounded-lg
  overflow-hidden
  shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]
  hover:shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]
  transition-shadow duration-300
">
  <div class="aspect-video bg-gray-200">
    <img src="..." class="object-cover w-full h-full">
  </div>
  <div class="p-4">
    <h3 class="text-lg font-medium text-gray-900">Title</h3>
    <p class="text-sm text-gray-600 mt-1">Description</p>
  </div>
</div>
```

#### Material Chip
```html
<div class="flex flex-wrap gap-2">
  <span class="
    inline-flex items-center
    px-3 py-1.5
    bg-purple-50 text-purple-700
    rounded-full text-sm font-medium
  ">
    Chip
    <button class="ml-1 hover:text-purple-900">×</button>
  </span>
  <span class="
    inline-flex items-center
    px-3 py-1.5
    border border-gray-300 text-gray-700
    rounded-full text-sm font-medium
  ">
    Outlined
  </span>
</div>
```

### Animation Guidelines

```css
/* Material ripple */
.material-ripple {
  position: relative;
  overflow: hidden;
}

.material-ripple::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  transform: scale(0);
  opacity: 1;
}

.material-ripple:active::after {
  transform: scale(2);
  opacity: 0;
  transition: transform 0.5s, opacity 0.5s;
}
```

### Best Paired With
- Android apps and Google products
- SaaS dashboards and admin panels
- Content-heavy applications
- Data-driven interfaces with cards and lists

### Avoid When
- iOS/macOS projects (use Apple HI instead)
- Highly creative/branded experiences (too corporate)
- Minimalist projects (Material is opinionated)
- Print or offline-first applications

---

## 6. Apple Human Interface

### Description
Apple's design principles emphasizing clarity, legibility, and subtle depth. Uses SF Pro, translucent surfaces, and systematic spacing.

### Use Cases
- macOS/iOS app mimics
- Premium products
- Clean interfaces
- Focus on typography

### CSS Variables (Tailwind v4)

```css
@theme {
  /* Apple SF Pro approximation with system fonts */
  --font-apple: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
  --font-apple-mono: 'SF Mono', 'Fira Code', monospace;
  
  /* Apple Palette */
  --color-apple-blue: #007aff;
  --color-apple-green: #34c759;
  --color-apple-indigo: #5856d6;
  --color-apple-orange: #ff9500;
  --color-apple-pink: #ff2d55;
  --color-apple-purple: #af52de;
  --color-apple-red: #ff3b30;
  --color-apple-yellow: #ffcc00;
  
  /* Apple Translucent */
  --color-apple-bg: rgba(255, 255, 255, 0.8);
  --color-apple-bg-dark: rgba(0, 0, 0, 0.4);
  --color-apple-surface: rgba(255, 255, 255, 0.72);
  --color-apple-surface-dark: rgba(255, 255, 255, 0.12);
  
  /* Apple Blur */
  --blur-apple: saturate(180%) blur(20px);
  
  /* Apple Spacing (8pt grid) */
  --space-apple-xs: 4px;
  --space-apple-sm: 8px;
  --space-apple-md: 16px;
  --space-apple-lg: 24px;
  --space-apple-xl: 32px;
  --space-apple-2xl: 48px;
  
  /* Apple Typography Scale */
  --text-apple-large-title: 2.625rem;
  --text-apple-title-1: 2rem;
  --text-apple-title-2: 1.5rem;
  --text-apple-title-3: 1.25rem;
  --text-apple-headline: 1.0625rem;
  --text-apple-body: 1rem;
  --text-apple-callout: 0.875rem;
  --text-apple-subhead: 0.75rem;
  --text-apple-footnote: 0.6875rem;
  --text-apple-caption: 0.625rem;
  
  /* Apple Border Radius */
  --radius-apple-sm: 6px;
  --radius-apple-md: 10px;
  --radius-apple-lg: 14px;
  --radius-apple-xl: 20px;
  --radius-apple-full: 9999px;
}
```

### Tailwind Classes

```html
<!-- Apple Window -->
<div class="
  bg-white/80 backdrop-blur-xl
  rounded-xl
  shadow-[0_8px_32px_rgba(0,0,0,0.12)]
  border border-white/20
">
  <!-- title bar -->
  <div class="flex items-center gap-2 px-4 py-3 border-b border-gray-200/50">
    <div class="flex gap-2">
      <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
      <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
    </div>
    <div class="flex-1 text-center text-xs text-gray-500">Window Title</div>
  </div>
  <!-- content -->
</div>

<!-- Apple Button (System) -->
<button class="
  px-4 py-2
  bg-blue-600 text-white
  rounded-lg
  text-sm font-medium
  hover:bg-blue-700
  active:bg-blue-800
  transition-colors duration-150
">
  Action
</button>

<!-- Apple Input -->
<input class="
  w-full px-4 py-3
  bg-gray-100/50
  rounded-lg
  text-sm
  placeholder:text-gray-400
  focus:outline-none focus:ring-2 focus:ring-blue-500/30
  border border-transparent
  focus:border-blue-500
">
```

### Component Patterns

#### Apple Button Styles
```html
<!-- Filled (Primary) -->
<button class="
  px-5 py-2.5
  bg-blue-600 text-white
  rounded-[10px]
  text-[15px] font-semibold
  hover:bg-blue-500
  active:bg-blue-700
  transition-colors duration-150
">
  Continue
</button>

<!-- Tinted (Secondary) -->
<button class="
  px-5 py-2.5
  bg-blue-600/10 text-blue-600
  rounded-[10px]
  text-[15px] font-semibold
  hover:bg-blue-600/20
  active:bg-blue-600/30
">
  View Plans
</button>

<!-- Separator -->
<div class="h-px bg-gray-200/60 my-6"></div>

<!-- Link Style -->
<button class="
  text-blue-600
  text-[15px]
  font-semibold
  hover:text-blue-700 hover:underline
">
  Learn more about accessibility →
</button>
```

#### Apple Segmented Control
```html
<div class="
  inline-flex
  p-1
  bg-gray-200/50
  rounded-lg
  backdrop-blur-sm
">
  <button class="
    px-4 py-2
    rounded-md
    text-sm font-medium
    bg-white shadow-sm
    text-gray-900
  ">
    Left
  </button>
  <button class="
    px-4 py-2
    rounded-md
    text-sm font-medium
    text-gray-600
    hover:text-gray-900
  ">
    Center
  </button>
  <button class="
    px-4 py-2
    rounded-md
    text-sm font-medium
    text-gray-600
    hover:text-gray-900
  ">
    Right
  </button>
</div>
```

#### Apple Toolbar (macOS style)
```html
<div class="
  flex items-center justify-between
  px-4 py-2
  bg-gray-100/30
  border-b border-gray-200/50
  backdrop-blur-sm
">
  <div class="flex items-center gap-2">
    <button class="p-2 hover:bg-gray-200/50 rounded">
      <Icon class="w-4 h-4" />
    </button>
    <div class="w-px h-4 bg-gray-300/50"></div>
    <button class="p-2 hover:bg-gray-200/50 rounded">
      <Icon class="w-4 h-4" />
    </button>
  </div>
  <div class="text-xs text-gray-500">11 items</div>
</div>
```

#### Apple Typography
```html
<!-- Large Title -->
<h1 class="
  text-[2.625rem] font-bold
  tracking-tight
  text-gray-900
">
  Large Title
</h1>

<!-- Title 2 -->
<h2 class="
  text-[1.5rem] font-semibold
  text-gray-900
">
  Title 2
</h2>

<!-- Body -->
<p class="
  text-base leading-relaxed
  text-gray-600
">
  Body text with comfortable reading.
</p>

<!-- Caption -->
<p class="
  text-[0.625rem] tracking-wide uppercase
  text-gray-500
">
  Caption
</p>
```

### Animation Guidelines

```css
/* Apple spring animation */
@keyframes apple-spring {
  0% { transform: scale(0.96); opacity: 0; }
  70% { transform: scale(1.02); }
  100% { transform: scale(1); opacity: 1; }
}

.apple-enter {
  animation: apple-spring 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Apple blur transition */
.apple-blur-transition {
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
}
```

### Best Paired With
- macOS/iOS app mimicking
- Premium products and services
- Clean, minimalist interfaces
- Apple ecosystem products

### Avoid When
- Cross-platform applications (Android users feel excluded)
- Low-end devices (translucency is expensive to render)
- Web-only projects (translucency has limited browser support)
- Projects without design team resources (Apple HI is demanding)

---

## 7. Flat 2.0

### Description
Modern flat design with subtle depth through color and layering. Removes skeuomorphism but adds back subtle shadows and gradients for hierarchy.

### Use Cases
- Modern web apps
- Landing pages
- Corporate sites
- Mobile-first designs

### CSS Variables (Tailwind v4)

```css
@theme {
  /* Flat 2.0 Palette - Vibrant but cohesive */
  --color-flat-primary: #2563eb;
  --color-flat-primary-light: #3b82f6;
  --color-flat-primary-dark: #1d4ed8;
  
  --color-flat-success: #10b981;
  --color-flat-warning: #f59e0b;
  --color-flat-error: #ef4444;
  --color-flat-info: #06b6d4;
  
  --color-flat-gray-50: #f9fafb;
  --color-flat-gray-100: #f3f4f6;
  --color-flat-gray-200: #e5e7eb;
  --color-flat-gray-300: #d1d5db;
  --color-flat-gray-400: #9ca3af;
  --color-flat-gray-500: #6b7280;
  --color-flat-gray-600: #4b5563;
  --color-flat-gray-700: #374151;
  --color-flat-gray-800: #1f2937;
  --color-flat-gray-900: #111827;
  
  /* Flat 2.0 Shadows - Subtle */
  --shadow-flat-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-flat-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-flat-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Border Radius - Slightly rounded */
  --radius-flat-sm: 4px;
  --radius-flat-md: 8px;
  --radius-flat-lg: 12px;
  --radius-flat-xl: 16px;
}
```

### Tailwind Classes

```html
<!-- Flat Card -->
<div class="
  bg-white
  rounded-lg
  shadow-sm border border-gray-100
  hover:shadow-md
  transition-shadow duration-200
">
  <!-- content -->
</div>

<!-- Flat Button (Primary) -->
<button class="
  bg-blue-600 text-white
  px-5 py-2.5 rounded-lg
  font-medium text-sm
  hover:bg-blue-700
  active:bg-blue-800
  transition-colors duration-200
  shadow-sm
">
  Primary
</button>

<!-- Flat Button (Secondary) -->
<button class="
  bg-gray-100 text-gray-700
  px-5 py-2.5 rounded-lg
  font-medium text-sm
  hover:bg-gray-200
  active:bg-gray-300
  transition-colors duration-200
">
  Secondary
</button>

<!-- Flat Input -->
<input class="
  w-full px-4 py-3
  bg-gray-50 border border-gray-200
  rounded-lg
  text-sm
  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
  focus:bg-white
  transition-all duration-200
">
```

### Component Patterns

#### Flat Card with Image
```html
<div class="
  bg-white
  rounded-xl
  overflow-hidden
  shadow-sm border border-gray-100
  hover:shadow-md
  transition-all duration-300
">
  <div class="aspect-video overflow-hidden">
    <img src="..." class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
  </div>
  <div class="p-5">
    <span class="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Category</span>
    <h3 class="text-lg font-semibold text-gray-900 mt-3">Title</h3>
    <p class="text-sm text-gray-600 mt-2">Description text</p>
    <div class="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
      <span class="text-xs text-gray-500">5 min read</span>
    </div>
  </div>
</div>
```

#### Flat Button Group
```html
<div class="
  inline-flex
  bg-gray-100
  rounded-lg
  p-1
">
  <button class="
    px-4 py-2
    bg-white shadow-sm
    rounded-md
    text-sm font-medium text-gray-900
  ">
    Day
  </button>
  <button class="
    px-4 py-2
    text-gray-600 text-sm font-medium
    hover:text-gray-900
  ">
    Week
  </button>
  <button class="
    px-4 py-2
    text-gray-600 text-sm font-medium
    hover:text-gray-900
  ">
    Month
  </button>
</div>
```

#### Flat Form
```html
<form class="space-y-5 max-w-md">
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
    <input class="
      w-full px-4 py-3
      bg-gray-50 border border-gray-200
      rounded-lg
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
      transition-all duration-200
    " placeholder="you@example.com">
  </div>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
    <input type="password" class="
      w-full px-4 py-3
      bg-gray-50 border border-gray-200
      rounded-lg
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
      transition-all duration-200
    " placeholder="••••••••">
  </div>
  <button class="
    w-full bg-blue-600 text-white
    py-3 rounded-lg font-medium
    hover:bg-blue-700
    active:bg-blue-800
    transition-colors duration-200
  ">
    Sign in
  </button>
</form>
```

### Animation Guidelines

```css
/* Flat hover - lift effect */
.flat-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.flat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

/* Flat button press */
.flat-btn:active {
  transform: scale(0.98);
}
```

### Best Paired With
- Modern web applications
- Landing pages and marketing sites
- Mobile-first responsive designs
- Corporate/business applications

### Avoid When
- Creative portfolios (too vanilla)
- Entertainment/gaming (Flat 2.0 lacks personality)
- Accessible designs requiring high contrast
- Projects needing strong brand identity

---

## 8. Skeuomorphism

### Description
Realistic but modern interpretation of physical materials. Subtle textures, shadows for depth, but clean and digital.

### Use Cases
- Music production
- Gaming interfaces
- Audio visualizers
- Vintage themes

### CSS Variables (Tailwind v4)

```css
@theme {
  /* Skeuomorphic Base */
  --color-skeu-bg: #e8e4df;
  --color-skeu-surface: #f5f3ef;
  --color-skeu-dark: #2c2416;
  --color-skeu-light: #ffffff;
  
  /* Wood tones */
  --color-wood-light: #d4a574;
  --color-wood-medium: #a67c52;
  --color-wood-dark: #8b5e3c;
  
  /* Metal tones */
  --color-metal-light: #d4d4d4;
  --color-metal-medium: #a3a3a3;
  --color-metal-dark: #737373;
  
  /* Skeuomorphic Shadows - Deep */
  --shadow-skeu-raised: 
    inset 0 1px 0 rgba(255,255,255,0.3),
    0 4px 8px rgba(0,0,0,0.3),
    0 1px 2px rgba(0,0,0,0.2);
    
  --shadow-skeu-pressed: 
    inset 0 2px 4px rgba(0,0,0,0.3),
    inset 0 1px 2px rgba(0,0,0,0.2);
    
  --shadow-skeu-inset: 
    inset 0 2px 4px rgba(0,0,0,0.2),
    inset 0 1px 0 rgba(255,255,255,0.1);
}
```

### Tailwind Classes

```html
<!-- Skeu Button (3D) -->
<button class="
  relative
  bg-gradient-to-b from-gray-200 to-gray-300
  rounded-lg
  px-8 py-4
  shadow-[0_4px_0_#717171,0_6px_8px_rgba(0,0,0,0.3)]
  active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
  active:translate-y-1
  transition-all duration-100
">
  Press Me
</button>

<!-- Skeu Input (Inset) -->
<input class="
  px-4 py-3
  bg-white
  rounded-lg
  shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]
  border border-gray-300
  focus:outline-none focus:ring-2 focus:ring-blue-500
">

<!-- Skeu Card (Embossed) -->
<div class="
  bg-gradient-to-b from-gray-100 to-gray-200
  rounded-xl
  p-6
  shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_4px_8px_rgba(0,0,0,0.1)]
">
  <!-- content -->
</div>
```

### Component Patterns

#### Skeu Button (Classic iOS style)
```html
<div class="space-y-4">
  <!-- Normal -->
  <button class="
    relative
    px-8 py-4
    bg-gradient-to-b from-[#f8f8f8] from-0% to-[#e8e8e8] 100%
    rounded-lg
    text-gray-700 font-medium text-sm
    shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.2)]
    border border-gray-300/50
    hover:from-[#fff] hover:to-[#f0f0f0]
    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]
    active:translate-y-px
    transition-all duration-100
  ">
    Normal Button
  </button>
  
  <!-- Blue (iTunes/App Store) -->
  <button class="
    relative
    px-8 py-4
    bg-gradient-to-b from-[#42a5f5] from-0% to-[#1e88e5] 100%
    rounded-lg
    text-white font-semibold text-sm
    shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_1px_3px_rgba(0,0,0,0.2)]
    border border-blue-600/50
    hover:from-[#64b5f6] hover:to-[#42a5f5]
    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
    transition-all duration-100
  ">
    Download
  </button>
</div>
```

#### Skeu Toggle Switch
```html
<div class="flex items-center gap-4">
  <button class="
    relative
    w-14 h-8
    rounded-full
    bg-gradient-to-b from-gray-300 to-gray-400
    shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
    data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
    data-[state=checked]:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
    transition-all duration-200
  ">
    <span class="
      absolute top-1 left-1
      w-6 h-6 rounded-full
      bg-gradient-to-b from-white to-gray-100
      shadow-[0_1px_3px_rgba(0,0,0,0.3)]
      transition-transform duration-200
      data-[state=checked]:translate-x-6
    "></span>
  </button>
  <span class="text-sm text-gray-700">Enabled</span>
</div>
```

#### Skeu Slider
```html
<div class="space-y-2">
  <label class="text-sm font-medium text-gray-700">Volume</label>
  <div class="
    relative
    h-8 px-2
  ">
    <!-- Track -->
    <div class="
      absolute top-1/2 -translate-y-1/2
      w-full h-2
      bg-gradient-to-b from-gray-300 to-gray-400
      rounded-full
      shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]
    "></div>
    
    <!-- Progress (filled) -->
    <div class="
      absolute top-1/2 -translate-y-1/2
      left-0 w-3/4 h-2
      bg-gradient-to-b from-blue-400 to-blue-500
      rounded-full
      shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]
    "></div>
    
    <!-- Thumb -->
    <div class="
      absolute top-1/2 -translate-y-1/2
      left-3/4 -ml-2
      w-6 h-6
      bg-gradient-to-b from-gray-100 to-gray-300
      rounded-full
      shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)]
      border border-gray-400/30
      cursor-grab
      active:cursor-grabbing
    "></div>
  </div>
</div>
```

### Texture Overlays

```css
/* Subtle noise texture */
.skeu-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
}

/* Paper texture */
.skeu-paper {
  background-image: 
    linear-gradient(90deg, transparent 79px, rgba(0,0,0,0.05) 79px, rgba(0,0,0,0.05) 80px, transparent 80px),
    linear-gradient(rgba(0,0,0,0.05) 79px, transparent 79px);
  background-size: 100% 1.2em;
  background-position: 0 0.8em;
}
```

### Animation Guidelines

```css
/* Skeu click - press effect */
.skeu-press:active {
  transform: translateY(2px);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Skeu hover - subtle glow */
.skeu-glow:hover {
  box-shadow: 
    0 0 10px rgba(59, 130, 246, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);
}
```

### Best Paired With
- Music production software (DAWs, samplers)
- Gaming interfaces and HUDs
- Audio visualizers and players
- Vintage or retro-themed projects

### Avoid When
- Modern minimalist projects (too dated)
- Mobile apps (textures are expensive to render)
- Accessibility-critical designs
- High-performance applications

---

## 9. Custom

### Description
When no predefined style fits, use `custom` to implement a unique design system. Custom requires explicit direction from the user to extract key visual characteristics and translate them into CSS variables.

### Use Cases
- Existing design system or brand guidelines
- Specific reference URLs or mockups
- Proprietary design languages
- Highly customized niche applications

### CSS Variables (Tailwind v4)

```css
@theme {
  /* Custom Color Palette - derive from user input */
  --color-primary: var(--custom-primary, #0066cc);
  --color-secondary: var(--custom-secondary, #6b7280);
  --color-accent: var(--custom-accent, #8b5cf6);
  
  /* Custom Border Radius */
  --radius-sm: var(--custom-radius-sm, 4px);
  --radius-md: var(--custom-radius-md, 8px);
  --radius-lg: var(--custom-radius-lg, 16px);
  
  /* Custom Shadows */
  --shadow-custom: var(--custom-shadow, 0 4px 6px -1px rgb(0 0 0 / 0.1));
  
  /* Custom Typography */
  --font-display: var(--custom-font-display, 'Custom Display', serif);
  --font-body: var(--custom-font-body, 'Custom Body', sans-serif);
}
```

### Implementation Flow

**Step 1: Extract Design Characteristics**

When user selects `custom`, ask for one of:
- Reference URL (Figma, Dribbble, live site)
- Design system name (Material, Bootstrap, etc.)
- Color palette (hex codes or image)
- Typography stack (Google Fonts names)

**Step 2: Generate CSS Variables**

```typescript
interface CustomStyleConfig {
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  fontDisplay?: string;
  fontBody?: string;
  borderRadius?: 'sharp' | 'rounded' | 'pill';
  shadowStyle?: 'subtle' | 'medium' | 'heavy';
}

function generateCustomTheme(config: CustomStyleConfig) {
  return `
@theme {
  --color-primary: ${config.primaryColor};
  --color-secondary: ${config.secondaryColor || adjustBrightness(config.primaryColor, -20)};
  --color-accent: ${config.accentColor || adjustBrightness(config.primaryColor, +20)};
  
  /* Border Radius */
  --radius-sm: ${config.borderRadius === 'sharp' ? '0' : config.borderRadius === 'pill' ? '9999px' : '4px'};
  
  /* Typography */
  --font-display: '${config.fontDisplay || 'Inter'}', system-ui, sans-serif;
  --font-body: '${config.fontBody || 'Inter'}', system-ui, sans-serif;
}
  `.trim();
}
```

**Step 3: Apply to Components**

Use the custom prefix for all classes:
```html
<!-- All components use custom- prefix -->
<div class="custom-card">
  <h3 class="custom-title">Custom Title</h3>
  <p class="custom-description">Description</p>
  <button class="custom-button">Action</button>
</div>

<!-- With Tailwind -->
<button class="bg-[var(--color-primary)] text-[var(--color-text)] rounded-[var(--radius-md)] custom-button">
  Button
</button>
```

### Design Token Extraction

**From URL (Screenshot/Image)**

1. Use color picker to extract primary/secondary colors
2. Estimate border radius from corners
3. Identify typography from heading size/weight
4. Note shadow intensity and direction

**From Design System Name**

```typescript
const designSystemDefaults = {
  'material': {
    primary: '#6200ee',
    borderRadius: '4px',
    shadow: 'elevation-2',
    font: 'Roboto'
  },
  'bootstrap': {
    primary: '#0d6efd',
    borderRadius: '6px',
    shadow: 'box-shadow-sm',
    font: 'system-ui'
  },
  'tailwind': {
    primary: '#3b82f6',
    borderRadius: '8px',
    shadow: 'shadow-md',
    font: 'Inter'
  }
};
```

### Custom Component Pattern

```tsx
// Custom component with design tokens
const customButton = cva(
  `
    inline-flex items-center justify-center gap-2
    font-medium transition-all duration-200
    bg-[var(--color-primary)] text-white
    rounded-[var(--radius-md)] px-4 py-2
    hover:brightness-110 active:brightness-90
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
  `
);

// Custom card with CSS variables
const customCard = `
  bg-white rounded-[var(--radius-lg)]
  border border-gray-200
  shadow-[var(--shadow-custom)]
  p-6
  hover:shadow-lg transition-shadow duration-200
`;
```

### Dark Mode for Custom

```css
/* Custom dark mode with CSS variables */
[data-theme="dark"] {
  --color-primary: var(--color-primary-dark, #3b82f6);
  --color-text: var(--color-text-dark, #f9fafb);
  --color-bg: var(--color-bg-dark, #0f172a);
}

/* Apply via class or attribute */
.dark {
  color-scheme: dark;
}

[data-theme="dark"] {
  color-scheme: dark;
}
```

### Best Paired With
- Existing brand guidelines
- Design system documentation
- Reference mockups or screenshots
- Figma/CSS variables export

### Avoid When
- No design direction provided (use minimalism as fallback)
- Time constraints (predefined styles are faster)
- Team without design system experience

### Quick Reference

| Custom Style Input | Token Generation |
|-------------------|------------------|
| Color hex | `--color-primary: #hex` |
| Font name | `--font-display: 'Name', sans-serif` |
| Border radius | `--radius-md: value` |
| Shadow description | CSS box-shadow equivalent |
| Image/URL | Extract dominant colors, estimate others |

---

## Quick Reference Table

| Style | Best For | Avoid When | Complexity |
|-------|----------|------------|------------|
| **Glassmorphism** | Dashboard, Cards, Overlays | Heavy text, print, low-contrast | Medium |
| **Minimalism** | Portfolio, Products, Editorial | Dense info, corporate, mobile | Low |
| **Brutalism** | Creative, Fashion, Bold | Professional, healthcare, requires extra a11y effort | Medium |
| **Neumorphism** | Health, Music, Settings | Dark mode, data viz, high-contrast | Medium |
| **Material Design** | SaaS, Android, Dashboards | iOS, creative, minimalist | Low |
| **Apple Human Interface** | macOS, Premium, Clean | Cross-platform, low-end devices | Medium |
| **Flat 2.0** | Modern web, Mobile, Landing | Creative portfolios, gaming, branding | Low |
| **Skeuomorphism** | Games, Audio, Vintage | Modern minimalist, mobile, requires extra a11y effort | High |

---

## Applying to Components

When generating, always include:

```html
<!-- Style: {style-name} -->
<div class="..." data-style="{style-name}">
  <!-- Component with style-specific classes -->
</div>
```

```css
/* Style token reference */
[data-style="glassmorphism"] { /* Glass variables */ }
[data-style="minimalism"] { /* Minimal variables */ }
/* etc */
```

---

Last updated: 2026-06-03 (v1.6.3)