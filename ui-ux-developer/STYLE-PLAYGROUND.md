# Style Playground — Live Design Style Demos

Interactive demos and live code examples for all 9 design styles. Copy-paste ready, with visual previews and implementation guidance.

**Version:** 1.5.0
**Last updated:** 2026-06-03 (v1.6.3)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Glassmorphism](#2-glassmorphism)
3. [Minimalism](#3-minimalism)
4. [Brutalism](#4-brutalism)
5. [Neumorphism](#5-neumorphism)
6. [Material Design](#6-material-design)
7. [Apple Human Interface](#7-apple-human-interface)
8. [Flat 2.0](#8-flat-20)
9. [Skeuomorphism](#9-skeuomorphism)
10. [Custom](#10-custom)
11. [Theme Switcher](#11-theme-switcher)

---

## 1. Overview

> 📋 **Starting Point:** Si aún no conoces qué estilo necesitas, comienza con el [cuestionario en SKILL.md](./SKILL.md) para determinar el mejor estilo para tu proyecto.
> ✅ **Checklist:** Para verificar accesibilidad después de implementar, usa [CHECKLIST.md](./CHECKLIST.md)
> ♿ **Reduced Motion:** Para usuarios que prefieren menos movimiento, agregar `motion-reduce:` variants. Ver [ANIMATIONS-DECISION.md](./ANIMATIONS-DECISION.md) para más info.

### What is the Style Playground?

The Style Playground provides **copy-paste ready** live demos for each design style. Each demo includes:

- **Visual preview** (ASCII mockup)
- **Complete CSS** with Tailwind v4 classes
- **Interactive elements** (hover, focus, active states)
- **Component combinations** (cards, buttons, inputs together)

### How to Use

1. Choose your design style
2. Copy the CSS/HTML for your framework
3. Adjust colors to match your brand
4. Test responsiveness and accessibility

### Quick Comparison

| Style | Best For | Complexity | Performance |
|-------|----------|------------|-------------|
| **Glassmorphism** | Modern, premium | Medium | ⚡⚡⚡ |
| **Minimalism** | Clean, professional | Low | ⚡⚡⚡⚡ |
| **Brutalism** | Bold, edgy, memorable | Low | ⚡⚡⚡⚡ |
| **Neumorphism** | Soft, tactile, unique | High | ⚡⚡ |
| **Material Design** | Enterprise, familiar | Medium | ⚡⚡⚡ |
| **Apple Human Interface** | Premium, ecosystem | Medium | ⚡⚡⚡ |
| **Flat 2.0** | Modern, accessible | Low | ⚡⚡⚡⚡ |
| **Skeuomorphism** | Classic, intuitive | Low | ⚡⚡⚡ |
| **Custom** | Unique, brand-specific | Variable | Variable |

---

## 2. Glassmorphism

### Live Demo — Glass Card

```html
<!-- Glass Card Demo -->
<div class="
  relative
  overflow-hidden
  bg-gradient-to-br from-white/20 to-white/5
  backdrop-blur-xl
  border border-white/30
  rounded-3xl
  shadow-2xl
  p-8
">
  <!-- Background decoration -->
  <div class="
    absolute -top-20 -right-20 
    w-40 h-40 
    bg-gradient-to-br from-blue-500/20 to-purple-500/20 
    rounded-full blur-3xl
  "></div>
  <div class="
    absolute -bottom-20 -left-20 
    w-60 h-60 
    bg-gradient-to-tr from-pink-500/20 to-blue-500/20 
    rounded-full blur-3xl
  "></div>
  
  <!-- Content -->
  <div class="relative z-10">
    <div class="flex items-center gap-4 mb-4">
      <div class="
        w-12 h-12 
        bg-gradient-to-br from-blue-500 to-purple-500
        rounded-2xl
        flex items-center justify-center
        text-white font-bold
        shadow-lg
      ">G</div>
      <div>
        <h3 class="text-white font-semibold text-lg">Glassmorphism</h3>
        <p class="text-white/60 text-sm">Frosted glass effect</p>
      </div>
    </div>
    <p class="text-white/80 leading-relaxed">
      Translucent surfaces with blur create depth. Perfect for modern dashboards and premium interfaces.
    </p>
    <div class="flex gap-3 mt-6">
      <button class="
        px-5 py-2.5 
        bg-white/20 hover:bg-white/30
        backdrop-blur-md
        border border-white/20
        rounded-xl
        text-white text-sm font-medium
        transition-all duration-300
      ">Primary</button>
      <button class="
        px-5 py-2.5 
        bg-transparent hover:bg-white/10
        border border-white/20
        rounded-xl
        text-white/80 text-sm font-medium
        transition-all duration-300
      ">Secondary</button>
    </div>
  </div>
</div>
```

### Live Demo — Glass Button States

```html
<!-- Default State -->
<button class="
  bg-white/15 
  backdrop-blur-lg 
  border border-white/25 
  rounded-2xl 
  px-8 py-4 
  text-white 
  font-semibold 
  shadow-xl
  transition-all duration-300
">
  Glass Button
</button>

<!-- Hover State -->
<button class="
  bg-white/25 
  backdrop-blur-lg 
  border border-white/35 
  rounded-2xl 
  px-8 py-4 
  text-white 
  font-semibold 
  shadow-2xl
  hover:scale-105
  active:scale-95
  transition-all duration-300
">
  Hover Me
</button>

<!-- Focus State -->
<button class="
  bg-white/20 
  backdrop-blur-lg 
  border-2 border-white/40
  rounded-2xl 
  px-8 py-4 
  text-white 
  font-semibold 
  shadow-xl
  focus-visible:ring-4 focus-visible:ring-white/30
  transition-all duration-300
">
  Focus Visible
</button>

<!-- Disabled State -->
<button class="
  bg-white/5 
  backdrop-blur-md 
  border border-white/10 
  rounded-2xl 
  px-8 py-4 
  text-white/30 
  font-medium 
  cursor-not-allowed
">
  Disabled
</button>
```

### Live Demo — Glass Navigation Bar

```html
<nav class="
  fixed top-0 left-0 right-0 z-50
  bg-slate-900/30
  backdrop-blur-2xl
  border-b border-white/10
  px-6 py-4
">
  <div class="max-w-6xl mx-auto flex items-center justify-between">
    <!-- Logo -->
    <div class="flex items-center gap-3">
      <div class="
        w-10 h-10 
        bg-gradient-to-br from-blue-500/80 to-purple-500/80
        backdrop-blur-lg
        rounded-xl
        flex items-center justify-center
        text-white font-bold
        border border-white/20
        shadow-lg
      ">N</div>
      <span class="text-white font-semibold">NeoMycelio</span>
    </div>
    
    <!-- Nav Links -->
    <div class="hidden md:flex items-center gap-1">
      <a href="#" class="
        px-4 py-2 
        text-white/70 hover:text-white
        hover:bg-white/10
        rounded-xl
        transition-all duration-200
      ">Feed</a>
      <a href="#" class="
        px-4 py-2 
        text-white/70 hover:text-white
        hover:bg-white/10
        rounded-xl
        transition-all duration-200
      ">Atlas</a>
      <a href="#" class="
        px-4 py-2 
        text-white/70 hover:text-white
        hover:bg-white/10
        rounded-xl
        transition-all duration-200
      ">Blog</a>
    </div>
    
    <!-- User Avatar -->
    <div class="
      w-10 h-10 
      bg-gradient-to-br from-emerald-400 to-teal-500
      rounded-full
      border-2 border-white/30
      shadow-lg
    "></div>
  </div>
</nav>
```

### Glassmorphism Color Variations

```css
/* Blue Tint */
.bg-glass-blue {
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Purple Tint */
.bg-glass-purple {
  background: rgba(139, 92, 246, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Green Tint */
.bg-glass-green {
  background: rgba(34, 197, 94, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Pink Tint */
.bg-glass-pink {
  background: rgba(236, 72, 153, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

## 3. Minimalism

### Live Demo — Minimal Card

```html
<div class="
  bg-white
  border border-slate-200/50
  rounded-2xl
  p-8
  hover:border-slate-300
  transition-colors duration-200
">
  <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
    <span class="text-white font-bold">M</span>
  </div>
  <h3 class="text-slate-900 font-semibold text-xl mb-2">Minimalism</h3>
  <p class="text-slate-500 leading-relaxed mb-6">
    Clean lines, ample whitespace, and purposeful restraint. Every element earns its place.
  </p>
  <button class="
    px-6 py-3 
    bg-black hover:bg-slate-800
    text-white 
    rounded-xl 
    text-sm font-medium
    transition-colors duration-200
  ">
    Get Started
  </button>
</div>
```

### Live Demo — Minimal Input

```html
<div class="space-y-2">
  <label class="text-sm font-medium text-slate-700">Email</label>
  <input 
    type="email" 
    placeholder="name@example.com"
    class="
      w-full
      px-4 py-3
      bg-white
      border border-slate-200
      rounded-xl
      text-slate-900
      placeholder:text-slate-400
      focus:outline-none focus:border-slate-400 focus:ring-0
      transition-colors duration-200
    "
  />
</div>

<!-- Error State -->
<div class="space-y-2">
  <label class="text-sm font-medium text-slate-700">Password</label>
  <input 
    type="password" 
    value="abc"
    class="
      w-full
      px-4 py-3
      bg-white
      border border-red-500
      rounded-xl
      text-slate-900
      focus:outline-none focus:border-red-500
      transition-colors duration-200
    "
  />
  <p class="text-sm text-red-500">Password must be at least 8 characters</p>
</div>
```

### Minimal Button Variants

```html
<!-- Primary (Black) -->
<button class="
  px-6 py-3 
  bg-black text-white rounded-xl text-sm font-medium
  hover:bg-slate-800
  active:bg-slate-900
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2
">
  Primary
</button>

<!-- Secondary (Outline) -->
<button class="
  px-6 py-3 
  bg-transparent text-slate-700 border border-slate-300 rounded-xl text-sm font-medium
  hover:bg-slate-50 hover:border-slate-400
  active:bg-slate-100
">
  Secondary
</button>

<!-- Ghost -->
<button class="
  px-6 py-3 
  bg-transparent text-slate-600 rounded-xl text-sm font-medium
  hover:bg-slate-100 hover:text-slate-900
  active:bg-slate-200
">
  Ghost
</button>

<!-- Destructive -->
<button class="
  px-6 py-3 
  bg-red-600 text-white rounded-xl text-sm font-medium
  hover:bg-red-700
  active:bg-red-800
">
  Delete
</button>
```

### Minimal Navigation

```html
<nav class="flex items-center gap-8">
  <div class="font-bold text-slate-900">Logo</div>
  <div class="flex items-center gap-6">
    <a href="#" class="text-sm font-medium text-slate-900 hover:text-slate-600">Home</a>
    <a href="#" class="text-sm font-medium text-slate-500 hover:text-slate-900">About</a>
    <a href="#" class="text-sm font-medium text-slate-500 hover:text-slate-900">Work</a>
    <a href="#" class="text-sm font-medium text-slate-500 hover:text-slate-900">Contact</a>
  </div>
  <button class="ml-auto px-5 py-2.5 bg-black text-white rounded-xl text-sm font-medium">
    Start
  </button>
</nav>
```

---

## 4. Brutalism

### Live Demo — Brutal Card

```html
<div class="
  bg-yellow-400
  border-4 border-black
  rounded-none
  p-8
  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]
  hover:translate-x-[-4px] hover:translate-y-[-4px]
  transition-all duration-150
">
  <div class="inline-block bg-black text-yellow-400 px-3 py-1 text-xs font-bold mb-4">
    BRUTAL
  </div>
  <h3 class="text-2xl font-black text-black mb-2 uppercase tracking-tight">
    Bold Typography
  </h3>
  <p class="text-black/80 leading-snug mb-6 font-medium">
    Unapologetic design with harsh edges, raw shadows, and maximum contrast.
  </p>
  <button class="
    px-6 py-3 
    bg-black text-yellow-400 font-bold text-sm uppercase
    border-2 border-black
    hover:bg-yellow-400 hover:text-black
    transition-colors duration-100
  ">
    Click Me →
  </button>
</div>
```

### Brutal Button States

```html
<!-- Default -->
<button class="
  px-8 py-4 
  bg-black text-white 
  font-bold uppercase text-sm
  border-4 border-black
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
  hover:translate-x-[-2px] hover:translate-y-[-2px]
  active:shadow-none active:translate-x-0 active:translate-y-0
  transition-all duration-100
">
  Brutal Button
</button>

<!-- Hover -->
<button class="
  px-8 py-4 
  bg-yellow-400 text-black 
  font-bold uppercase text-sm
  border-4 border-black
  shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
  hover:translate-x-[-4px] hover:translate-y-[-4px]
  transition-all duration-100
">
  Hover Me
</button>

<!-- Focus -->
<button class="
  px-8 py-4 
  bg-pink-500 text-white 
  font-bold uppercase text-sm
  border-4 border-black
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-4
">
  Focus
</button>
```

### Brutal Form

```html
<form class="space-y-6 max-w-md">
  <div>
    <label class="block text-sm font-bold uppercase mb-2 tracking-wide">
      Name
    </label>
    <input 
      type="text"
      class="
        w-full px-4 py-4
        bg-white border-4 border-black
        text-lg font-bold
        placeholder:text-slate-400
        focus:outline-none focus:border-yellow-400
      "
      placeholder="John Doe"
    />
  </div>
  
  <div>
    <label class="block text-sm font-bold uppercase mb-2 tracking-wide">
      Email
    </label>
    <input 
      type="email"
      class="
        w-full px-4 py-4
        bg-white border-4 border-black
        text-lg font-bold
        focus:outline-none focus:border-yellow-400
      "
      placeholder="john@example.com"
    />
  </div>
  
  <button type="submit" class="
    w-full px-8 py-4 
    bg-black text-yellow-400 
    font-bold uppercase text-lg
    border-4 border-black
    shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
    hover:bg-yellow-400 hover:text-black
    transition-colors duration-100
  ">
    Submit →
  </button>
</form>
```

---

## 5. Neumorphism

### Live Demo — Neumorphic Card

```css
/* Neumorphism Base */
:root {
  --neu-bg: #e0e5ec;
  --neu-shadow-light: #ffffff;
  --neu-shadow-dark: #a3b1c6;
}

.neu-card {
  background: var(--neu-bg);
  border-radius: 24px;
  box-shadow: 
    20px 20px 60px var(--neu-shadow-dark),
    -20px -20px 60px var(--neu-shadow-light);
  padding: 2rem;
}
```

```html
<div class="
  bg-[#e0e5ec]
  rounded-3xl
  p-8
  shadow-[20px_20px_60px_#a3b1c6,-20px_-20px_60px_#ffffff]
">
  <div class="
    w-14 h-14 
    bg-[#e0e5ec]
    rounded-2xl
    shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]
    flex items-center justify-center
    mb-6
  ">
    <span class="text-2xl">✦</span>
  </div>
  <h3 class="text-slate-700 font-semibold text-xl mb-2">Neumorphism</h3>
  <p class="text-slate-500 leading-relaxed mb-6">
    Soft UI with subtle shadows creating depth without harsh edges.
  </p>
  <button class="
    px-6 py-3 
    bg-[#e0e5ec]
    rounded-xl
    text-slate-600 font-medium text-sm
    shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff]
    hover:shadow-[8px_8px_16px_#a3b1c6,-8px_-8px_16px_#ffffff]
    active:shadow-[inset_4px_4px_8px_#a3b1c6,inset_-4px_-4px_8px_#ffffff]
    transition-all duration-200
  ">
    Soft Button
  </button>
</div>
```

### Neumorphic Input

```html
<div class="
  bg-[#e0e5ec]
  rounded-2xl
  px-6 py-4
  shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]
">
  <input 
    type="text"
    placeholder="Neumorphic input..."
    class="
      w-full bg-transparent
      text-slate-600
      placeholder:text-slate-400
      outline-none
    "
  />
</div>
```

### Neumorphic Button States

```html
<!-- Default (Raised) -->
<button class="
  px-8 py-4 
  bg-[#e0e5ec]
  rounded-2xl
  text-slate-600 font-semibold
  shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff]
  transition-all duration-200
">
  Raised
</button>

<!-- Hover (More Raised) -->
<button class="
  px-8 py-4 
  bg-[#e0e5ec]
  rounded-2xl
  text-slate-600 font-semibold
  shadow-[14px_14px_28px_#a3b1c6,-14px_-14px_28px_#ffffff]
  hover:shadow-[16px_16px_32px_#a3b1c6,-16px_-16px_32px_#ffffff]
  transition-all duration-200
">
  Hover
</button>

<!-- Active (Pressed/Inset) -->
<button class="
  px-8 py-4 
  bg-[#e0e5ec]
  rounded-2xl
  text-slate-600 font-semibold
  shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff]
  transition-all duration-200
">
  Pressed
</button>

<!-- Disabled -->
<button class="
  px-8 py-4 
  bg-[#e0e5ec]
  rounded-2xl
  text-slate-400 font-medium
  opacity-60 cursor-not-allowed
">
  Disabled
</button>
```

---

## 6. Material Design

### Live Demo — Material Card

```html
<div class="
  bg-white
  rounded-lg
  overflow-hidden
  shadow-md
  hover:shadow-lg
  transition-shadow duration-200
">
  <div class="h-40 bg-gradient-to-br from-blue-500 to-blue-600"></div>
  <div class="p-6">
    <div class="
      inline-block px-3 py-1 
      bg-blue-100 text-blue-700 
      rounded-full text-xs font-medium uppercase
      mb-3
    ">
      Material
    </div>
    <h3 class="text-slate-900 font-medium text-lg mb-2">
      Material Design
    </h3>
    <p class="text-slate-500 text-sm leading-relaxed mb-4">
      Google's design system with depth, motion, and meaningful shadows.
    </p>
    <button class="
      px-5 py-2.5 
      bg-blue-600 hover:bg-blue-700
      text-white 
      rounded-md
      text-sm font-medium
      shadow-sm
      transition-colors duration-150
    ">
      Action
    </button>
  </div>
</div>
```

### Material Button Hierarchy

```html
<!-- Contained (Primary) -->
<button class="
  px-6 py-3 
  bg-blue-600 hover:bg-blue-700 active:bg-blue-800
  text-white 
  rounded-sm
  text-sm font-medium
  shadow-sm hover:shadow-md
  transition-all duration-150
">
  Contained
</button>

<!-- Outlined -->
<button class="
  px-6 py-3 
  bg-transparent hover:bg-blue-50
  text-blue-600 border border-blue-600 rounded-sm
  text-sm font-medium
  transition-colors duration-150
">
  Outlined
</button>

<!-- Text -->
<button class="
  px-6 py-3 
  bg-transparent hover:bg-blue-50
  text-blue-600 rounded-sm
  text-sm font-medium
  transition-colors duration-150
">
  Text
</button>

<!-- Toggle -->
<button class="
  px-6 py-3 
  bg-blue-50 text-blue-600 rounded-sm
  text-sm font-medium
  transition-colors duration-150
">
  Selected
</button>
```

### Material FAB (Floating Action Button)

```html
<button class="
  w-14 h-14
  bg-blue-600 hover:bg-blue-700
  text-white
  rounded-full
  shadow-lg hover:shadow-xl
  flex items-center justify-center
  transition-all duration-150
">
  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
  </svg>
</button>

<!-- Extended FAB -->
<button class="
  px-5 py-3 
  bg-blue-600 hover:bg-blue-700
  text-white
  rounded-full
  shadow-lg hover:shadow-xl
  flex items-center gap-3
  text-sm font-medium
  transition-all duration-150
">
  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
  </svg>
  New Item
</button>
```

---

## 7. Apple Human Interface

### Live Demo — Apple Card

```html
<div class="
  bg-white
  rounded-2xl
  overflow-hidden
  ring-1 ring-black/5
  hover:ring-black/10
  transition-all duration-300
">
  <div class="
    h-48 
    bg-gradient-to-br from-slate-100 to-slate-200
    flex items-center justify-center
  ">
    <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl shadow-xl"></div>
  </div>
  <div class="p-6">
    <h3 class="text-slate-900 font-semibold text-xl mb-1">Apple HI</h3>
    <p class="text-slate-500 text-sm mb-4">
      Refined, precise, with subtle depth and purposeful motion.
    </p>
    <button class="
      px-5 py-2.5 
      bg-blue-600 hover:bg-blue-500
      text-white 
      rounded-full
      text-sm font-medium
      transition-colors duration-200
    ">
      Learn More
    </button>
  </div>
</div>
```

### Apple Button Styles

```html
<!-- Standard (Rounded Rect) -->
<button class="
  px-6 py-2.5 
  bg-blue-600 hover:bg-blue-500 active:bg-blue-400
  text-white 
  rounded-full
  text-sm font-medium
  transition-colors duration-200
">
  Standard
</button>

<!-- Secondary -->
<button class="
  px-6 py-2.5 
  bg-transparent text-blue-600
  hover:bg-blue-50 active:bg-blue-100
  rounded-full
  text-sm font-medium
  transition-colors duration-200
">
  Secondary
</button>

<!-- Tertiary (Text Only) -->
<button class="
  px-4 py-2 
  bg-transparent text-blue-600
  hover:bg-blue-50 active:bg-blue-100
  rounded-lg
  text-sm font-medium
  transition-colors duration-200
">
  Tertiary
</button>

<!-- Destructive -->
<button class="
  px-6 py-2.5 
  bg-red-600 hover:bg-red-500 active:bg-red-400
  text-white 
  rounded-full
  text-sm font-medium
  transition-colors duration-200
">
  Delete
</button>
```

### Apple Segmented Control

```html
<div class="
  inline-flex
  bg-slate-100
  rounded-full
  p-1
">
  <button class="
    px-5 py-2 
    bg-white rounded-full
    text-slate-900 text-sm font-medium
    shadow-sm
    transition-all duration-200
  ">
    Day
  </button>
  <button class="
    px-5 py-2 
    text-slate-500 text-sm font-medium
    hover:text-slate-700
    transition-colors duration-200
  ">
    Week
  </button>
  <button class="
    px-5 py-2 
    text-slate-500 text-sm font-medium
    hover:text-slate-700
    transition-colors duration-200
  ">
    Month
  </button>
</div>
```

---

## 8. Flat 2.0

### Live Demo — Flat Card

```html
<div class="
  bg-white
  border border-slate-200
  rounded-xl
  p-6
  hover:border-blue-500
  transition-colors duration-200
">
  <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
    <span class="text-white font-bold text-lg">F</span>
  </div>
  <h3 class="text-slate-900 font-semibold text-lg mb-2">Flat 2.0</h3>
  <p class="text-slate-500 text-sm leading-relaxed mb-4">
    Modern flat design with subtle depth cues and accessible contrast.
  </p>
  <div class="flex items-center gap-2 text-sm text-blue-600 font-medium">
    Learn More
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </div>
</div>
```

### Flat Button Variants

```html
<!-- Primary -->
<button class="
  px-5 py-2.5 
  bg-blue-600 hover:bg-blue-700 active:bg-blue-800
  text-white rounded-lg text-sm font-medium
  transition-colors duration-150
">
  Primary
</button>

<!-- Secondary -->
<button class="
  px-5 py-2.5 
  bg-slate-100 hover:bg-slate-200 active:bg-slate-300
  text-slate-700 rounded-lg text-sm font-medium
  transition-colors duration-150
">
  Secondary
</button>

<!-- Accent -->
<button class="
  px-5 py-2.5 
  bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700
  text-white rounded-lg text-sm font-medium
  transition-colors duration-150
">
  Success
</button>

<!-- Outline -->
<button class="
  px-5 py-2.5 
  bg-transparent hover:bg-slate-50
  border border-slate-300 text-slate-700 rounded-lg text-sm font-medium
  transition-colors duration-150
">
  Outline
</button>
```

### Flat Input

```html
<div class="space-y-1.5">
  <label class="text-sm font-medium text-slate-700">Email</label>
  <input 
    type="email" 
    placeholder="name@example.com"
    class="
      w-full px-4 py-3
      bg-white border border-slate-300
      rounded-lg text-slate-900 text-sm
      placeholder:text-slate-400
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      transition-colors duration-150
    "
  />
</div>
```

---

## 9. Skeuomorphism

### Live Demo — Skeuomorphic Card

```html
<div class="
  bg-gradient-to-b from-[#d4d0c8] to-[#b8b4ac]
  rounded-lg
  p-6
  shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.3)]
">
  <div class="
    bg-white
    rounded border border-[#a0a0a0]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.1)]
    p-4 mb-4
  ">
    <h3 class="text-slate-800 font-bold text-lg mb-1">Skeuomorphism</h3>
    <p class="text-slate-500 text-sm">
      Realistic textures and depth
    </p>
  </div>
  <button class="
    w-full px-4 py-3
    bg-gradient-to-b from-[#4a90d9] to-[#357abd]
    text-white font-bold text-sm
    rounded
    shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.2)]
    hover:from-[#5a9fe9] hover:to-[#4588cb]
    active:from-[#357abd] active:to-[#4a90d9]
    transition-colors duration-100
  ">
    Push Me
  </button>
</div>
```

### Skeuomorphic Button

```html
<!-- Metal Button -->
<button class="
  px-8 py-4
  bg-gradient-to-b from-[#e8e8e8] to-[#c8c8c8]
  text-slate-700 font-bold text-sm
  rounded-md
  border border-[#a0a0a0]
  shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.2)]
  hover:from-[#f0f0f0] hover:to-[#d0d0d0]
  active:from-[#c8c8c8] active:to-[#e8e8e8]
  transition-colors duration-100
">
  Metal Button
</button>

<!-- Wood Button -->
<button class="
  px-8 py-4
  bg-gradient-to-b from-[#8b4513] to-[#5d2e0c]
  text-amber-100 font-bold text-sm uppercase tracking-wider
  rounded
  shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.4)]
  hover:from-[#9b5523] hover:to-[#6d3e1c]
  active:from-[#5d2e0c] active:to-[#8b4513]
  transition-colors duration-100
">
  Wooden Button
</button>
```

### Skeuomorphic Input

```html
<div class="
  px-4 py-3
  bg-gradient-to-b from-white to-[#f0f0f0]
  border border-[#888]
  rounded
  shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]
">
  <input 
    type="text"
    placeholder="Skeuomorphic input..."
    class="
      w-full bg-transparent
      text-slate-800 text-sm
      placeholder:text-slate-400
      outline-none
    "
  />
</div>
```

---

## 10. Custom

### Creating Your Custom Style

```css
/* Custom Style Template */
:root {
  /* ─── Your Brand Colors ─── */
  --color-primary: #your-primary;
  --color-secondary: #your-secondary;
  --color-accent: #your-accent;
  
  /* ─── Your Typography ─── */
  --font-sans: 'Your Font', sans-serif;
  
  /* ─── Your Radius ─── */
  --radius-sm: 0.25rem;
  --radius: 0.5rem;
  --radius-lg: 1rem;
  
  /* ─── Your Shadows ─── */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-lg: 0 4px 6px rgba(0,0,0,0.1);
}

/* Apply your custom classes */
.custom-card {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.5rem;
}

.custom-button {
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius);
  padding: 0.75rem 1.5rem;
  font-family: var(--font-sans);
  font-weight: 500;
  transition: all 0.2s;
}

.custom-button:hover {
  background: color-mix(in srgb, var(--color-primary), black 10%);
  transform: translateY(-1px);
}
```

---

## 11. Theme Switcher

### React Implementation

```tsx
import { useState, useEffect } from 'react';

// Theme context
type Theme = 'light' | 'dark' | 'system';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<Theme>('system');
  
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored) setTheme(stored);
  }, []);
  
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return <>{children}</>;
}

// Theme toggle component
function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  
  const toggle = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-slate-100"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

### CSS Variables for Theme

```css
/* Light Theme */
[data-theme="light"] {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;
}

/* Dark Theme */
[data-theme="dark"] {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 217 19% 27%;
  --secondary-foreground: 210 40% 98%;
}

/* Apply with Tailwind */
.bg-background { background-color: hsl(var(--background)); }
.text-foreground { color: hsl(var(--foreground)); }
.bg-primary { background-color: hsl(var(--primary)); }
.text-primary-foreground { color: hsl(var(--primary-foreground)); }
```

---

## Quick Reference

### Style → Component Mapping

| Style | Card | Button | Input | Navigation |
|-------|------|--------|-------|------------|
| Glassmorphism | glass-card | glass-button | glass-input | glass-nav |
| Minimalism | minimal-card | minimal-button | minimal-input | minimal-nav |
| Brutalism | brutal-card | brutal-button | brutal-input | brutal-nav |
| Neumorphism | neu-card | neu-button | neu-input | neu-nav |
| Material | material-card | material-button | material-input | material-nav |
| Apple HI | apple-card | apple-button | apple-input | apple-nav |
| Flat 2.0 | flat-card | flat-button | flat-input | flat-nav |
| Skeuomorphism | skeu-card | skeu-button | skeu-input | skeu-nav |
| Custom | custom-card | custom-button | custom-input | custom-nav |

---

Last updated: 2026-06-03 (v1.6.3)