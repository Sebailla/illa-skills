# Fonts Guide

Comprehensive font selection guide organized by category and project type. Includes Google Fonts, variable fonts, and accessibility considerations.

---

## Table of Contents

1. [Quick Selection Guide](#1-quick-selection-guide)
2. [Display Fonts](#2-display-fonts)
3. [Body Fonts](#3-body-fonts)
4. [Mono Fonts](#4-mono-fonts)
5. [Handwriting Fonts](#5-handwriting-fonts)
6. [Project-Based Recommendations](#6-project-based-recommendations)
7. [Font Combinations](#7-font-combinations)
8. [Accessibility Guidelines](#8-accessibility-guidelines)

---

## 1. Quick Selection Guide

### By Brand Tone

| Tone | Display | Body | Mono |
|------|---------|------|------|
| **Professional** | Playfair Display, Lora | Source Serif Pro, Libre Baskerville | JetBrains Mono |
| **Creative** | Abril Fatface, Bebas Neue | Nunito, Quicksand | Fira Code |
| **Playful** | Fredoka One, Baloo 2 | Nunito, Poppins | Space Mono |
| **Serious** | IBM Plex Serif | IBM Plex Sans | IBM Plex Mono |
| **Luxury** | Cormorant Garamond | EB Garamond | Courier Prime |
| **Friendly** | Manrope, Outfit | Inter, DM Sans | Roboto Mono |
| **Bold** | Oswald, Anton | Barlow, Roboto Condensed | Oswald Mono |
| **Minimal** | Space Grotesk, DM Sans | Inter, Work Sans | SF Mono |

### By Audience

| Audience | Recommended Fonts | Why |
|----------|------------------|-----|
| **Developers** | JetBrains Mono, Fira Code, Source Code Pro | Monospace for code, ligatures |
| **Designers** | Playfair Display, Cormorant, Space Grotesk | Editorial, premium feel |
| **Business** | DM Sans, Manrope, IBM Plex Sans | Clean, professional |
| **Consumers** | Poppins, Nunito, Inter | Friendly, readable |
| **Enterprise** | IBM Plex Sans, Inter, Source Sans Pro | Reliable, scalable |
| **Startups** | Sora, Plus Jakarta Sans, Outfit | Modern, approachable |
| **Educators** | Merriweather, Source Serif Pro, Atkinson Hyperlegible | Legibility, readability |
| **Healthcare** | Atkinson Hyperlegible, Open Sans | Accessibility, clarity |
| **Finance** | IBM Plex Sans, DM Sans, Montserrat | Trust, precision |

### By Visual Mood

| Mood | Display | Body | Characteristics |
|------|---------|------|-----------------|
| **Modern** | Space Grotesk, Sora, Outfit | Inter, DM Sans | Geometric, clean |
| **Classic** | Playfair Display, Cormorant Garamond | EB Garamond, Lora | Serif, editorial |
| **Bold** | Bebas Neue, Anton, Oswald | Barlow, Work Sans | All-caps, heavy |
| **Soft** | Nunito, Quicksand, Fredoka | Nunito, Poppins | Rounded, friendly |
| **Dark** | Syne, Clash Display, Cabinet Grotesk | Satoshi, DM Sans | Dramatic, trendy |
| **Light** | Fraunces, Recoleta, Canela | Suisse Intl, Spectral | Elegant, airy |
| **Colorful** |Archivo Black, Poppins | Poppins, Mulish | Vibrant, playful |
| **Monochrome** | Space Mono, IBM Plex Mono | Space Mono, IBM Plex Sans | Technical, minimal |

---

## 2. Display Fonts

### Category: Elegant & Editorial

#### Playfair Display
```css
/* Elegant serif for headlines */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&display=swap');

font-family: 'Playfair Display', serif;
/* Weights: 400, 500, 600, 700, 800 */
/* Best for: Headlines, hero text, luxury brands */
```
- **Vibe**: Classic, elegant, high-fashion
- **Pair with**: Lora, Source Sans Pro, Inter
- **Projects**: Fashion, luxury, editorial, portfolio

#### Cormorant Garamond
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

font-family: 'Cormorant Garamond', serif;
/* Weights: 300, 400, 500, 600, 700 */
/* Italic variants available */
```
- **Vibe**: Refined, literary, timeless
- **Pair with**: Montserrat, Proza Libre
- **Projects**: Literary magazines, premium services

#### Lora
```css
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

font-family: 'Lora', serif;
```
- **Vibe**: Warm, readable, versatile
- **Pair with**: Nunito, Source Sans Pro
- **Projects**: Blogs, editorial, education

---

### Category: Modern & Geometric

#### Space Grotesk
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

font-family: 'Space Grotesk', sans-serif;
/* Weights: 300, 400, 500, 600, 700 */
/* Variable: yes */
```
- **Vibe**: Tech-forward, geometric, distinctive
- **Pair with**: Space Mono, Inter
- **Projects**: SaaS, tech, modern portfolios

#### Sora
```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');

font-family: 'Sora', sans-serif;
/* Weights: 300, 400, 500, 600, 700, 800 */
```
- **Vibe**: Contemporary, clean, premium
- **Pair with**: DM Sans, Satoshi
- **Projects**: Startups, fintech, modern products

#### Outfit
```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

font-family: 'Outfit', sans-serif;
```
- **Vibe**: Modern, versatile, friendly
- **Pair with**: Outfit Mono, Work Sans
- **Projects**: Agencies, portfolios, general

#### Plus Jakarta Sans
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap');

font-family: 'Plus Jakarta Sans', sans-serif;
```
- **Vibe**: Professional, warm, approachable
- **Pair with**: JetBrains Mono, Source Serif
- **Projects**: SaaS, business, portfolios

---

### Category: Bold & Impact

#### Bebas Neue
```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

font-family: 'Bebas Neue', sans-serif;
/* Single weight only - all caps recommended */
```
- **Vibe**: Bold, condensed, attention-grabbing
- **Pair with**: Barlow, Roboto
- **Projects**: Sports, entertainment, headlines

#### Clash Display
```css
/* Clash Display requires license - use via Fontshare */
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');

font-family: 'Clash Display', sans-serif;
```
- **Vibe**: Bold, contemporary, editorial
- **Pair with**: Satoshi, DM Sans
- **Projects**: Creative agencies, fashion

#### Archivo Black
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

font-family: 'Archivo Black', sans-serif;
```
- **Vibe**: Strong, industrial, impactful
- **Pair with**: Work Sans, Roboto
- **Projects**: Bold headlines, posters

#### Syne
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

font-family: 'Syne', sans-serif;
```
- **Vibe**: Artistic, experimental, modern
- **Pair with**: Space Mono, Inter
- **Projects**: Creative portfolios, art

---

### Category: Unique & Distinctive

#### Fraunces
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&display=swap');

font-family: 'Fraunces', serif;
/* Variable: yes (opsz axis) */
```
- **Vibe**: Quirky, expressive, warm
- **Pair with**: DM Sans, Inter
- **Projects**: Brands with personality

#### Abril Fatface
```css
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');

font-family: 'Abril Fatface', cursive;
```
- **Vibe**: Display, dramatic, vintage
- **Pair with**: Josefin Sans, Lato
- **Projects**: Headlines, posters, luxury

---

## 3. Body Fonts

### Category: Highly Readable

#### Inter
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100;0,14..32,200;0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,100;1,14..32,200;1,14..32,300;1,14..32,400;1,14..32,500;1,14..32,600;1,14..32,700;1,14..32,800;1,14..32,900&display=swap');

font-family: 'Inter', sans-serif;
/* Variable: yes (opsz axis) */
```
- **Vibe**: Neutral, clean, professional
- **Accessibility**: Excellent, designed for screens
- **Projects**: Universal, best for UI

#### Source Sans Pro
```css
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&display=swap');

font-family: 'Source Sans 3', sans-serif;
```
- **Vibe**: Professional, clear, versatile
- **Pair with**: Source Serif Pro, Source Code Pro
- **Projects**: Business, education, government

#### DM Sans
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400;1,9..40,500;1,9..40,700&display=swap');

font-family: 'DM Sans', sans-serif;
```
- **Vibe**: Modern, geometric, friendly
- **Pair with**: DM Mono, Playfair Display
- **Projects**: Startups, creative, portfolios

---

### Category: Friendly & Rounded

#### Nunito
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

font-family: 'Nunito', sans-serif;
```
- **Vibe**: Warm, friendly, approachable
- **Pair with**: Nunito Sans, JetBrains Mono
- **Projects**: Healthcare, education, family

#### Poppins
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&display=swap');

font-family: 'Poppins', sans-serif;
```
- **Vibe**: Geometric, friendly, modern
- **Pair with**: Nunito, Source Sans Pro
- **Projects**: Apps, creative, general

#### Manrope
```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');

font-family: 'Manrope', sans-serif;
```
- **Vibe**: Contemporary, sharp, professional
- **Pair with**: JetBrains Mono, Space Grotesk
- **Projects**: SaaS, fintech, tech

---

### Category: Professional & Corporate

#### IBM Plex Sans
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

font-family: 'IBM Plex Sans', sans-serif;
```
- **Vibe**: Technical, reliable, precise
- **Pair with**: IBM Plex Mono, IBM Plex Serif
- **Projects**: Enterprise, finance, technical

#### Work Sans
```css
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&display=swap');

font-family: 'Work Sans', sans-serif;
```
- **Vibe**: Professional, clean, versatile
- **Pair with**: Work Sans Mono, Playfair Display
- **Projects**: Corporate, business, general

#### Satoshi
```css
/* Via Fontshare - free */
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,900&display=swap');

font-family: 'Satoshi', sans-serif;
```
- **Vibe**: Modern, tech, premium
- **Pair with**: Cabinet Grotesk, Space Mono
- **Projects**: Modern startups, tech

---

### Category: Legibility & Accessibility

#### Atkinson Hyperlegible
```css
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap');

font-family: 'Atkinson Hyperlegible', sans-serif;
/* Designed specifically for low vision readers */
```
- **Vibe**: Accessible, clear, inclusive
- **Accessibility**: Excellent for vision impairments
- **Projects**: Healthcare, government, education

#### Lexend
```css
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap');

font-family: 'Lexend', sans-serif;
/* Designed for reading fluency */
```
- **Vibe**: Easy-to-read, reduced visual stress
- **Accessibility**: Excellent for dyslexia
- **Projects**: Education, long-form content

---

## 4. Mono Fonts

### Category: Code & Technical

#### JetBrains Mono
```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap');

font-family: 'JetBrains Mono', monospace;
/* Weights: 300, 400, 500, 600, 700, 800 */
```
- **Vibe**: Developer-focused, ligatures, clear
- **Best for**: Code editors, terminal, technical docs
- **Projects**: Dev tools, documentation, IDEs

#### Fira Code
```css
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');

font-family: 'Fira Code', monospace;
```
- **Vibe**: Technical, ligatures, popular
- **Best for**: Code, technical blogs
- **Projects**: Developer tools, tutorials

#### Source Code Pro
```css
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap');

font-family: 'Source Code Pro', monospace;
```
- **Vibe**: Professional, reliable, Adobe
- **Best for**: Code, documentation
- **Projects**: Enterprise, Adobe ecosystem

---

### Category: Display Mono

#### Space Mono
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

font-family: 'Space Mono', monospace;
```
- **Vibe**: Bold, tech, distinctive
- **Best for**: Headlines, logos, creative
- **Projects**: Creative, portfolios

#### IBM Plex Mono
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

font-family: 'IBM Plex Mono', monospace;
```
- **Vibe**: Technical, corporate, precise
- **Best for**: Code, data, terminals
- **Projects**: IBM ecosystem, enterprise

---

### Category: Creative Mono

#### DM Mono
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&display=swap');

font-family: 'DM Mono', monospace;
```
- **Vibe**: Clean, modern, friendly
- **Best for**: Code, labels, UI elements
- **Projects**: Modern, startups

#### Geist Mono
```css
/* Via Vercel - designed for Geist design system */
@import url('https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-mono/GeistMonoVF.woff');

font-family: 'Geist Mono', monospace;
```
- **Vibe**: Modern, Vercel, clean
- **Best for**: Code, tech docs
- **Projects**: Vercel ecosystem, modern

---

## 5. Variable Fonts (Best Practices)

### What Are Variable Fonts

Variable fonts contain multiple axes (weight, width, optical size) in a single file, allowing fluid typography without multiple file loads.

### Variable Font CSS — Correct Approach

> ⚠️ **IMPORTANT:** Variable fonts use `font-variation-settings` for axis control, not CSS custom properties in `font-family`.

```css
/* ═══════════════════════════════════════════════════════════════════
   WRONG — Treating variable font weights like static font weights
   ═══════════════════════════════════════════════════════════════════ */
:root {
  --font-weight-regular: 400;
  --font-weight-medium: 500; /* This does NOT work in font-family */
}
h1 {
  font-family: 'Inter Variable', system-ui, sans-serif var(--font-weight-regular);
  /*                                                             ↑ WRONG ↑ */
}

/* ═══════════════════════════════════════════════════════════════════
   CORRECT — Variable font usage
   ═══════════════════════════════════════════════════════════════════ */

/* 1. Self-hosted variable font with @font-face */
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;  /* Range of available weights */
  font-display: swap;
}

/* 2. Declare as CSS custom property */
:root {
  --font-sans: 'Inter Variable', system-ui, sans-serif;
}

/* 3. Use font-variation-settings for variablefont weight control */
.text-regular { font-variation-settings: 'wght' 400; }
.text-medium   { font-variation-settings: 'wght' 500; }
.text-semibold { font-variation-settings: 'wght' 600; }
.text-bold     { font-variation-settings: 'wght' 700; }


/* 4. Or use font-weight for Google Fonts static equivalents */
h1 {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 700;  /* Loads weight 700 static file */
}
```

See **THEME-BUILDER.md** for complete theme token examples with variable fonts.

### Display Variable Fonts

| Font | Axes | Weights | Notes |
|------|------|---------|-------|
| **Space Grotesk** | wght | 300–700 | Geometric, tech-forward |
| **Sora** | wght | 300–800 | Modern, clean |
| **Outfit** | wght | 300–900 | Versatile, friendly |
| **Syne** | wght | 400–800 | Artistic, experimental |
| **Fraunces** | wght, opsz | 300–900 | Optical size axis (9–144) |

```css
/* Google Fonts variable font import */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

/* Tailwind v4 @theme configuration */
@theme {
  --font-display: 'Space Grotesk', system-ui, sans-serif;
}

/* Use font-weight with Google Fonts (simplest) */
h1 {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-weight: 700;  /* Google Fonts loads matching static file */
}

/* Use font-variation-settings for self-hosted variable fonts */
@font-face {
  font-family: 'Space Grotesk Variable';
  src: url('/fonts/SpaceGrotesk-Variable.woff2') format('woff2-variations');
  font-weight: 300 700;
  font-display: swap;
}
h1 {
  font-family: 'Space Grotesk Variable', system-ui, sans-serif;
  font-variation-settings: 'wght' 700;  /* Fine-grained control */
}
```

### Body Variable Fonts

| Font | Axes | Weights | Notes |
|------|------|---------|-------|
| **Inter** | wght, opsz | 100–900, 9–144 | Optical size axis |
| **DM Sans** | wght, opsz | 300–800, 9–144 | Friendly, modern |
| **Atkinson Hyperlegible** | wght | 400, 700 | Accessibility focus |
| **Lexend** | wght | 300–700 | Designed for reading |
| **Manrope** | wght | 300–800 | Sharp, contemporary |

```css
/* Inter with optical sizing */
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

body {
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto; /* Enables optical sizing */
  font-size: 16px;
}

/* Fine-tune optical size */
.caption {
  font-size: 0.75rem;
  font-variation-settings: 'opsz' 12;
}

.headline {
  font-size: 3rem;
  font-variation-settings: 'opsz' 48;
}
```

### Mono Variable Fonts

| Font | Axes | Weights | Notes |
|------|------|---------|-------|
| **JetBrains Mono** | wght | 300–800 | Developer-focused |
| **Fira Code** | wght | 300–700 | Ligatures, popular |
| **IBM Plex Mono** | wght | 300–700 | Corporate, technical |
| **Source Code Pro** | wght | 300–800 | Adobe, professional |

```css
/* JetBrains Mono variable */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300..800;1,400..500&display=swap');

code {
  font-family: 'JetBrains Mono', monospace;
  font-variation-settings: 'wght' 400;
}

code strong {
  font-variation-settings: 'wght' 600;
}
```

### Variable Font Loading Strategy

> ⚠️ **IMPORTANT:** Variable fonts require `font-variation-settings` for axis control. Using CSS custom properties in `font-family` only works for static fonts.

```typescript
// ✅ CORRECT — Google Fonts with static fallback for variable font
h1 {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 600;  // Google Fonts maps to correct weight file
}

// ✅ CORRECT — Self-hosted variable font with font-variation-settings
@font-face {
  font-family: 'InterVariable';
  src: url('/fonts/InterVariable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
h1 {
  font-family: 'InterVariable', 'Inter', system-ui, sans-serif;
  font-variation-settings: 'wght' 620;  // Custom interpolation
}

// ❌ WRONG — Trying to use CSS variable for font-weight in font-family
h1 {
  font-family: 'InterVariable', var(--font-weight-regular);  // WRONG!
}
```

### Why Variable Fonts Matter

| Benefit | Impact |
|---------|--------|
| **Single file** | ~40% smaller than multiple weights |
| **Fluid weights** | Custom interpolation between weights |
| **Optical sizing** | Better legibility at small/large sizes |
| **Performance** | Fewer HTTP requests |
| **Flexibility** | Precise typography control |

### Variable Font Fallbacks

```css
/* Safe fallback for older browsers */
.headline {
  font-family: 'Inter', system-ui, sans-serif; /* Fallback static font */
  font-weight: 600;
}

/* Variable font support with @supports */
@supports (font-variation-settings: normal) {
  .headline {
    font-family: 'Inter Variable', 'Inter', system-ui, sans-serif;
    font-variation-settings: 'wght' 620;  /* Custom weight value */
  }
}
```

---

## 6. Handwriting Fonts

### Category: Casual & Friendly

#### Caveat
```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');

font-family: 'Caveat', cursive;
/* Weights: 400, 500, 600, 700 */
```
- **Vibe**: Casual, handwritten, friendly
- **Best for**: Notes, labels, personal
- **Projects**: Personal, creative

#### Kalam
```css
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');

font-family: 'Kalam', cursive;
```
- **Vibe**: Handwritten, warm, natural
- **Best for**: Quotes, callouts, playful
- **Projects**: Creative, personal

#### Patrick Hand
```css
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');

font-family: 'Patrick Hand', cursive;
```
- **Vibe**: Childlike, playful, friendly
- **Best for**: Playful elements, informal
- **Projects**: Kids, creative, informal

---

### Category: Elegant Handwriting

#### Cormorant
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');

font-family: 'Cormorant', serif;
```
- **Vibe**: Elegant, literary, refined
- **Best for**: Headlines, quotes, premium
- **Projects**: Luxury, editorial

#### Tangerine
```css
@import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap');

font-family: 'Tangerine', cursive;
/* Elegant script with large x-height */
```
- **Vibe**: Elegant, calligraphic, formal
- **Best for**: Invitations, luxury
- **Projects**: Weddings, premium

---

## 7. Project-Based Recommendations

### SaaS / Tech Startup

```css
/* Display: Space Grotesk or Sora */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* Body: Inter or DM Sans */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Code: JetBrains Mono */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

**Why**: Modern, tech-forward, highly legible, professional

---

### Portfolio / Creative

```css
/* Display: Clash Display or Syne */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap');

/* Body: Satoshi or Outfit */
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap');

/* Accent: Space Mono */
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
```

**Why**: Distinctive, creative, memorable

---

### E-commerce

```css
/* Display: Poppins or Plus Jakarta Sans */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

/* Body: Nunito or Inter */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

/* Sale/Labels: Bebas Neue */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
```

**Why**: Friendly, clear pricing, modern

---

### Blog / Editorial

```css
/* Display: Playfair Display or Lora */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

/* Body: Merriweather or Source Serif Pro */
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,500&display=swap');

/* Code: JetBrains Mono */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

**Why**: Highly readable, editorial feel, professional

---

### Dashboard / Admin

```css
/* Display: Outfit or Work Sans */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

/* Body: Inter or IBM Plex Sans */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap');

/* Data/Numbers: JetBrains Mono */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

**Why**: Clear data, professional, excellent for tables

---

### Healthcare / Medical

```css
/* Display: Atkinson Hyperlegible */
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap');

/* Body: Open Sans or Atkinson */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');

/* Data: Roboto Mono */
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap');
```

**Why**: Maximum legibility, accessibility focus, trustworthy

---

### Finance / Banking

```css
/* Display: IBM Plex Serif or DM Sans */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

/* Body: IBM Plex Sans or Source Sans Pro */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap');

/* Numbers: IBM Plex Mono */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap');
```

**Why**: Trust, precision, excellent number rendering

---

### Education / Learning Platform

```css
/* Display: Nunito or Poppins */
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

/* Body: Lexend or Source Serif Pro */
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500&display=swap');

/* Code: Fira Code */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');
```

**Why**: Friendly, dyslexia-friendly options, engaging

---

### Landing Page / Marketing

```css
/* Display: Clash Display or Syne */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap');

/* Body: Manrope or Outfit */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

/* Accent: Space Mono */
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
```

**Why**: Bold, modern, high-impact headlines

---

## 8. Font Combinations

### Classic Combinations

| # | Display | Body | Mono | Use Case |
|---|---------|------|------|----------|
| 1 | Playfair Display | Source Sans Pro | JetBrains Mono | Professional editorial |
| 2 | Cormorant Garamond | EB Garamond | Courier Prime | Literary, luxury |
| 3 | Roboto Slab | Roboto | Roboto Mono | Technical, reliable |
| 4 | Merriweather | Open Sans | Source Code Pro | Readable, accessible |

### Modern Combinations

| # | Display | Body | Mono | Use Case |
|---|---------|------|------|----------|
| 1 | Space Grotesk | Inter | JetBrains Mono | Tech, SaaS |
| 2 | Sora | DM Sans | DM Mono | Modern startup |
| 3 | Syne | Satoshi | Space Mono | Creative agency |
| 4 | Clash Display | Outfit | Fira Code | Bold, contemporary |

### Playful Combinations

| # | Display | Body | Mono | Use Case |
|---|---------|------|------|----------|
| 1 | Fredoka One | Nunito | Space Mono | Kids, fun |
| 2 | Baloo 2 | Quicksand | Fira Code | Family, friendly |
| 3 | Pacifico | Poppins | JetBrains Mono | Creative, casual |
| 4 | Abril Fatface | Josefin Sans | Space Mono | Vintage, bold |

### Minimal Combinations

| # | Display | Body | Mono | Use Case |
|---|---------|------|------|----------|
| 1 | Inter | Inter | Inter | Clean, minimal |
| 2 | DM Sans | DM Sans | DM Mono | Unified, simple |
| 3 | Work Sans | Work Sans | Work Sans | Corporate minimal |
| 4 | Manrope | Manrope | JetBrains Mono | Tech minimal |

---

## 9. Accessibility Guidelines

### Font Size Requirements

```css
/* WCAG AA minimum */
body {
  font-size: 16px;      /* Minimum for body text */
  line-height: 1.5;      /* Minimum for readability */
}

/* Large text (18pt+ or 14pt bold) */
.large-text {
  font-size: 1.125rem;  /* 18px */
  line-height: 1.4;
}

/* Minimum touch target text */
.touch-target {
  font-size: 0.875rem;  /* 14px */
}
```

### Line Length (Characters Per Line)

```css
/* Optimal reading width */
p, li, td {
  max-width: 65ch;      /* Characters, not pixels */
}

/* Narrow for emphasis */
blockquote {
  max-width: 45ch;
}

/* Wide for dashboards */
.data-cell {
  max-width: none;      /* Allow longer for data */
}
```

### Letter Spacing

```css
/* WCAG 1.4.12 - Text Spacing */
p, li, td, th {
  letter-spacing: normal;      /* Don't restrict */
  word-spacing: normal;        /* Don't restrict */
  line-height: 1.5 !important; /* Must allow user override */
}
```

### Contrast Requirements

```css
/* Body text: 4.5:1 minimum */
.text-normal {
  color: #1f2937;       /* gray-800 on white: 11:1 */
}

/* Large text: 3:1 minimum */
.text-large {
  color: #6b7280;        /* gray-500 on white: 4.5:1 */
}

/* UI components: 3:1 minimum */
.button-text {
  color: #4b5563;       /* gray-600 on white: 7:1 */
}
```

### Font Loading Strategy

```css
/* Use font-display: swap for performance */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;  /* Show fallback until loaded */
  font-weight: 400;
}

/* Variable fonts for optimization */
@font-face {
  font-family: 'VariableFont';
  src: url('/fonts/variable.woff2') format('woff2-variations');
  font-display: swap;
  font-weight: 100 900;  /* Full weight range */
}
```

### User Override Support

```css
/* Respect user browser settings - DO NOT override */
body {
  /* line-height: user choice */
  /* font-size: user choice */
}

/* Only set system fonts that don't override user preferences */
body {
  font-family: system-ui, -apple-system, sans-serif;
  /* Uses user's preferred system font */
}
```

---

## Font Checklist for Projects

### Pre-Development
- [ ] Define brand tone and personality
- [ ] Identify target audience and their needs
- [ ] Check accessibility requirements
- [ ] Research competitor font choices
- [ ] Select display font (headlines)
- [ ] Select body font (paragraphs)
- [ ] Select mono font (code/data)
- [ ] Test font combinations

### Technical
- [ ] Verify Google Fonts availability
- [ ] Check variable font support
- [ ] Optimize font loading (preload, display: swap)
- [ ] Test fallback fonts
- [ ] Verify contrast ratios
- [ ] Check line length on mobile

### Accessibility
- [ ] Test with browser zoom 200%
- [ ] Test with user-defined font size
- [ ] Verify screen reader compatibility
- [ ] Check for font-related seizures (flashing)
- [ ] Test prefers-reduced-motion compatibility

---

## CSS Variables Template

```css
@theme {
  /* Font Families */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  
  /* Font Sizes (using rem for accessibility) */
  --text-xs: 0.75rem;       /* 12px */
  --text-sm: 0.875rem;      /* 14px */
  --text-base: 1rem;        /* 16px */
  --text-lg: 1.125rem;       /* 18px */
  --text-xl: 1.25rem;        /* 20px */
  --text-2xl: 1.5rem;        /* 24px */
  --text-3xl: 1.875rem;      /* 30px */
  --text-4xl: 2.25rem;       /* 36px */
  --text-5xl: 3rem;          /* 48px */
  --text-6xl: 3.75rem;       /* 60px */
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

---

## Quick Reference

| Project Type | Display | Body | Mono |
|--------------|---------|------|------|
| SaaS | Space Grotesk | Inter | JetBrains Mono |
| Portfolio | Syne | DM Sans | Space Mono |
| E-commerce | Poppins | Nunito | JetBrains Mono |
| Blog | Playfair Display | Source Serif | JetBrains Mono |
| Dashboard | Outfit | IBM Plex Sans | IBM Plex Mono |
| Healthcare | Atkinson Hyperlegible | Atkinson Hyperlegible | Roboto Mono |
| Finance | DM Sans | IBM Plex Sans | IBM Plex Mono |
| Education | Nunito | Lexend | Fira Code |

---

Last updated: 2026-06-03 (v1.6.3)