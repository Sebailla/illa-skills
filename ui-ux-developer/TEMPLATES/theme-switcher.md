# Interactive Theme Switcher Component

React component for switching between light, dark, and custom themes. Includes presets, localStorage persistence, and system preference support.

**Version: 1.6.3
**Last updated:** 2026-06-03 (v1.6.3)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Basic Theme Switcher](#2-basic-theme-switcher)
3. [Advanced Theme Switcher](#3-advanced-theme-switcher)
4. [Theme Provider](#4-theme-provider)
5. [Theme Presets Panel](#5-theme-presets-panel)
6. [CSS Variables Reference](#6-css-variables-reference)

---

## 1. Overview

### Features

- Toggle between light and dark mode
- Support for custom theme presets
- System preference detection
- localStorage persistence
- Smooth transitions
- Accessibility support

### Component Hierarchy

```
ThemeProvider (context)
├── ThemeToggle (button)
├── ThemePresets (panel)
└── ThemeIndicator (visual)
```

---

## 2. Basic Theme Switcher

### Simple Toggle Button

```tsx
// components/theme-toggle.tsx
'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  // Use 'system' as initial to avoid hydration mismatch
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Initialize on client only to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  // Render placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Loading theme"
        className="w-14 h-8 bg-slate-200 dark:bg-slate-700 rounded-full"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
      className="
        relative w-14 h-8 
        bg-slate-200 dark:bg-slate-700
        rounded-full
        transition-colors duration-200
      "
    >
      {/* Toggle indicator */}
      <span
        className={`
          absolute top-1 w-6 h-6 
          bg-white rounded-full shadow-md
          flex items-center justify-center
          transition-all duration-200
          ${theme === 'light' ? 'left-1' : 'left-7'}
        `}
      >
        {theme === 'light' ? (
          <SunIcon className="w-4 h-4 text-amber-500" />
        ) : (
          <MoonIcon className="w-4 h-4 text-indigo-600" />
        )}
      </span>
    </button>
  );
}

// Simple icons (replace with your icon library)
function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
```

---

## 3. Advanced Theme Switcher

### Theme Switcher with Presets

```tsx
// components/theme-switcher.tsx
'use client';

import { useEffect, useState, createContext, useContext } from 'react';

// ============================================
// TYPES
// ============================================

type Theme = 'light' | 'dark' | 'system';
type Preset = 'slate' | 'zinc' | 'blue' | 'emerald' | 'violet' | 'orange';

interface ThemeContextValue {
  theme: Theme;
  preset: Preset;
  setTheme: (theme: Theme) => void;
  setPreset: (preset: Preset) => void;
  resolvedTheme: 'light' | 'dark';
}

interface PresetColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
}

// ============================================
// CONTEXT
// ============================================

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// ============================================
// PRESET COLORS
// ============================================

const PRESETS: Record<Preset, { light: PresetColors; dark: PresetColors }> = {
  slate: {
    light: {
      background: '0 0% 100%',
      foreground: '222 47% 11%',
      primary: '217 91% 60%',
      secondary: '210 40% 96%',
      accent: '210 40% 96%',
      muted: '210 40% 96%',
      border: '214 32% 91%',
    },
    dark: {
      background: '222 47% 11%',
      foreground: '210 40% 98%',
      primary: '217 91% 60%',
      secondary: '217 19% 27%',
      accent: '217 19% 27%',
      muted: '217 19% 27%',
      border: '217 19% 27%',
    },
  },
  zinc: {
    light: {
      background: '0 0% 100%',
      foreground: '240 5% 17%',
      primary: '240 4% 46%',
      secondary: '240 5% 96%',
      accent: '240 5% 96%',
      muted: '240 5% 96%',
      border: '240 6% 90%',
    },
    dark: {
      background: '240 6% 10%',
      foreground: '240 5% 98%',
      primary: '240 5% 64%',
      secondary: '240 4% 20%',
      accent: '240 4% 20%',
      muted: '240 4% 20%',
      border: '240 4% 20%',
    },
  },
  blue: {
    light: {
      background: '199 89% 97%',
      foreground: '221 83% 8%',
      primary: '199 89% 48%',
      secondary: '214 76% 96%',
      accent: '214 76% 96%',
      muted: '214 76% 96%',
      border: '214 76% 91%',
    },
    dark: {
      background: '222 47% 6%',
      foreground: '210 40% 98%',
      primary: '199 89% 55%',
      secondary: '217 27% 17%',
      accent: '217 27% 17%',
      muted: '217 27% 17%',
      border: '217 27% 20%',
    },
  },
  emerald: {
    light: {
      background: '160 60% 96%',
      foreground: '160 30% 10%',
      primary: '142 70% 45%',
      secondary: '160 40% 92%',
      accent: '160 40% 92%',
      muted: '160 40% 92%',
      border: '160 30% 88%',
    },
    dark: {
      background: '160 50% 6%',
      foreground: '160 30% 98%',
      primary: '142 70% 50%',
      secondary: '160 40% 15%',
      accent: '160 40% 15%',
      muted: '160 40% 15%',
      border: '160 40% 18%',
    },
  },
  violet: {
    light: {
      background: '270 50% 97%',
      foreground: '280 60% 10%',
      primary: '270 70% 55%',
      secondary: '270 40% 94%',
      accent: '270 40% 94%',
      muted: '270 40% 94%',
      border: '270 30% 90%',
    },
    dark: {
      background: '280 40% 6%',
      foreground: '270 50% 98%',
      primary: '270 75% 60%',
      secondary: '280 35% 15%',
      accent: '280 35% 15%',
      muted: '280 35% 15%',
      border: '280 35% 20%',
    },
  },
  orange: {
    light: {
      background: '30 100% 96%',
      foreground: '30 10% 15%',
      primary: '20 90% 55%',
      secondary: '30 80% 92%',
      accent: '30 80% 92%',
      muted: '30 80% 92%',
      border: '30 40% 86%',
    },
    dark: {
      background: '20 15% 8%',
      foreground: '30 50% 98%',
      primary: '20 90% 60%',
      secondary: '20 20% 15%',
      accent: '20 20% 15%',
      muted: '20 20% 15%',
      border: '20 20% 20%',
    },
  },
};

// ============================================
// THEME PROVIDER
// ============================================

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultPreset?: Preset;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultPreset = 'slate',
  storageKey = 'theme-preference',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [preset, setPreset] = useState<Preset>(defaultPreset);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Initialize from storage
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.preset) setPreset(parsed.preset);
      } catch {
        // Ignore parse errors
      }
    }
  }, [storageKey]);

  // Resolve theme (handle 'system')
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = theme === 'system' 
        ? (e.matches ? 'dark' : 'light')
        : theme;
      setResolvedTheme(resolved);
      applyTheme(resolved, preset);
    };

    handleChange(mediaQuery);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, preset]);

  // Persist to storage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ theme, preset }));
  }, [theme, preset, storageKey]);

  const applyTheme = (resolved: 'light' | 'dark', p: Preset) => {
    const colors = PRESETS[p][resolved];
    const root = document.documentElement;
    
    root.setAttribute('data-theme', resolved);
    root.setAttribute('data-preset', p);
    
    // Apply CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, preset, setTheme, setPreset, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================
// THEME SWITCHER COMPONENT
// ============================================

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const cycleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
  };

  const themeIcon = {
    light: <SunIcon className="w-5 h-5" />,
    dark: <MoonIcon className="w-5 h-5" />,
    system: <MonitorIcon className="w-5 h-5" />,
  };

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Current theme: ${theme}. Click to cycle.`}
      className="
        p-2.5 rounded-xl
        bg-slate-100 hover:bg-slate-200
        dark:bg-slate-800 dark:hover:bg-slate-700
        transition-colors duration-200
      "
    >
      {themeIcon[theme]}
    </button>
  );
}

// ============================================
// PRESET SELECTOR
// ============================================

interface PresetSelectorProps {
  className?: string;
}

export function PresetSelector({ className }: PresetSelectorProps) {
  const { preset, setPreset } = useTheme();
  const { resolvedTheme } = useTheme();
  
  const presets: { id: Preset; label: string; color: string }[] = [
    { id: 'slate', label: 'Slate', color: 'bg-slate-500' },
    { id: 'zinc', label: 'Zinc', color: 'bg-zinc-500' },
    { id: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { id: 'emerald', label: 'Emerald', color: 'bg-emerald-500' },
    { id: 'violet', label: 'Violet', color: 'bg-violet-500' },
    { id: 'orange', label: 'Orange', color: 'bg-orange-500' },
  ];

  return (
    <div className={`flex gap-2 ${className || ''}`}>
      {presets.map((p) => (
        <button
          key={p.id}
          onClick={() => setPreset(p.id)}
          aria-label={`Set theme to ${p.label}`}
          aria-pressed={preset === p.id}
          className={`
            w-8 h-8 rounded-full
            ${p.color}
            transition-all duration-200
            ${preset === p.id 
              ? 'ring-2 ring-offset-2 ring-offset-background scale-110' 
              : 'opacity-60 hover:opacity-100'
            }
          `}
          title={p.label}
        />
      ))}
    </div>
  );
}

// ============================================
// THEME INDICATOR (optional visual feedback)
// ============================================

export function ThemeIndicator() {
  const { theme, preset, resolvedTheme } = useTheme();
  
  return (
    <div className="
      text-xs font-medium
      text-slate-500 dark:text-slate-400
      flex items-center gap-2
    ">
      <span className="uppercase">{resolvedTheme}</span>
      <span className="text-slate-300 dark:text-slate-600">|</span>
      <span className="capitalize">{preset}</span>
      {theme === 'system' && (
        <>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="flex items-center gap-1">
            <MonitorIcon className="w-3 h-3" />
            System
          </span>
        </>
      )}
    </div>
  );
}

// ============================================
// ICONS
// ============================================

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
```

---

## 4. Theme Provider

### Full Implementation with CSS

```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from '@/components/theme-switcher';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" defaultPreset="slate" storageKey="theme-preference">
      {children}
    </ThemeProvider>
  );
}
```

### CSS Variables Setup

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base theme tokens */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 217 91% 60%;
  --radius: 0.5rem;
}

/* Dark mode */
[data-theme="dark"] {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --card: 222 47% 14%;
  --card-foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 217 19% 27%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217 19% 27%;
  --muted-foreground: 215 20% 65%;
  --accent: 217 19% 27%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62% 50%;
  --destructive-foreground: 0 0% 100%;
  --border: 217 19% 27%;
  --input: 217 19% 27%;
  --ring: 217 91% 60%;
}

/* Base styles */
@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 5. Theme Presets Panel

### Settings Panel with Theme Controls

```tsx
// components/theme-settings.tsx
'use client';

import { useState } from 'react';
import { ThemeSwitcher, PresetSelector, ThemeIndicator } from './theme-switcher';

export function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="theme-panel"
        className="
          p-2.5 rounded-xl
          bg-slate-100 hover:bg-slate-200
          dark:bg-slate-800 dark:hover:bg-slate-700
          transition-colors duration-200
        "
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      {/* Settings panel */}
      {isOpen && (
        <div
          id="theme-panel"
          role="dialog"
          aria-label="Theme settings"
          className="
            absolute right-0 mt-2 w-72
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            rounded-2xl shadow-xl
            p-4 space-y-4
            z-50
          "
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Theme</h3>
            <ThemeIndicator />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Mode
            </label>
            <div className="flex gap-2">
              <ThemeModeButton mode="light" />
              <ThemeModeButton mode="dark" />
              <ThemeModeButton mode="system" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Color Preset
            </label>
            <PresetSelector className="flex-wrap" />
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Theme mode button subcomponent
function ThemeModeButton({ mode }: { mode: 'light' | 'dark' | 'system' }) {
  const { theme, setTheme } = useTheme();
  const isActive = theme === mode;

  const icons = {
    light: <SunIcon className="w-4 h-4" />,
    dark: <MoonIcon className="w-4 h-4" />,
    system: <MonitorIcon className="w-4 h-4" />,
  };

  return (
    <button
      onClick={() => setTheme(mode)}
      aria-pressed={isActive}
      className={`
        flex-1 flex items-center justify-center gap-2
        px-3 py-2 rounded-lg text-sm font-medium
        transition-colors duration-200
        ${isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
        }
      `}
    >
      {icons[mode]}
      <span className="capitalize">{mode}</span>
    </button>
  );
}
```

---

## 6. CSS Variables Reference

### All Theme Tokens

```css
/* Semantic tokens (used in components) */
:root {
  /* Background */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  
  /* Card */
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  
  /* Popover */
  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;
  
  /* Primary */
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  
  /* Secondary */
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;
  
  /* Muted */
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  
  /* Accent */
  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;
  
  /* Destructive */
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  
  /* Border & Input */
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 217 91% 60%;
  
  /* Radius */
  --radius: 0.375rem;
}

/* Dark mode tokens */
[data-theme="dark"] {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --card: 222 47% 14%;
  --card-foreground: 210 40% 98%;
  --popover: 222 47% 14%;
  --popover-foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  --secondary: 217 19% 27%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217 19% 27%;
  --muted-foreground: 215 20% 65%;
  --accent: 217 19% 27%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62% 50%;
  --destructive-foreground: 0 0% 100%;
  --border: 217 19% 27%;
  --input: 217 19% 27%;
  --ring: 217 91% 60%;
}
```

### Using Tokens in Components

```tsx
// Example: Card component with theme tokens
function Card({ children, className }) {
  return (
    <div className={`
      bg-card text-card-foreground
      border border-border
      rounded-xl
      p-6
      shadow-sm
      ${className || ''}
    `}>
      {children}
    </div>
  );
}

// Example: Button with theme tokens
function Button({ children, variant = 'primary' }) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-transparent hover:bg-accent',
    ghost: 'bg-transparent hover:bg-accent',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  };

  return (
    <button className={`
      px-4 py-2 rounded-lg font-medium text-sm
      transition-colors duration-200
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
      disabled:opacity-50 disabled:pointer-events-none
      ${variants[variant]}
    `}>
      {children}
    </button>
  );
}
```

---

## Installation

```bash
# Install dependencies
npm install clsx tailwind-merge

# Copy components to your project
cp -r components/theme-switcher.tsx your-project/
cp -r components/theme-settings.tsx your-project/
```

---

## Usage Example

```tsx
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// app/page.tsx
import { ThemeSettings } from '@/components/theme-settings';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="font-bold">My App</div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <ThemeSettings />
        </div>
      </header>
      
      <main className="p-8">
        <h1 className="text-4xl font-bold">Welcome</h1>
      </main>
    </div>
  );
}
```

---

Last updated: 2026-06-03 (v1.6.3)