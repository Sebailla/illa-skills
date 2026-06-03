# UI/UX Developer - Quick Start Guide

Quick decision tree for choosing the right design style, components, and approach. Use this for fast decisions without reading the full documentation.

---

## 🎯 Design Style Decision Tree

### Step 1: What type of project?

```
START
  │
  ├─► SaaS / Dashboard
  │     └─► Go to: [Dashboard Styles](#-dashboard--saas)
  │
  ├─► Portfolio / Personal Site
  │     └─► Go to: [Portfolio Styles](#-portfolio--personal)
  │
  ├─► E-commerce
  │     └─► Go to: [E-commerce Styles](#-ecommerce)
  │
  ├─► Blog / Editorial
  │     └─► Go to: [Editorial Styles](#-blog--editorial)
  │
  ├─► Mobile App
  │     └─► Go to: [Mobile Styles](#-mobile-app)
  │
  └─► Landing Page / Marketing
        └─► Go to: [Landing Styles](#-landing--marketing)
```

---

## 📊 Dashboard / SaaS

**Best Styles:**
| Rank | Style | Why | Avoid When |
|------|-------|-----|------------|
| 🥇 1 | **Glassmorphism** | Modern, layered, great for data visualization | Heavy text, low-contrast |
| 🥈 2 | **Flat 2.0** | Clean, professional, fast | Creative portfolios |
| 🥉 3 | **Material** | Google-style, familiar patterns | iOS-only focus |

**Recommended Components:**
- Navigation (sidebar)
- Cards (stats, charts)
- Tables (data grids)
- Modals (forms, confirmations)
- Buttons (primary, secondary, icon)

**Quick Start:**
```tsx
// Dashboard layout
<Navigation variant="sidebar" />
<main className="flex-1 p-6">
  <StatsGrid data={stats} />
  <ChartsSection data={charts} />
</main>
```

---

## 🎨 Portfolio / Personal

**Best Styles:**
| Rank | Style | Why | Avoid When |
|------|-------|-----|------------|
| 🥇 1 | **Minimalism** | Clean, showcases work, premium feel | Dense information |
| 🥈 2 | **Brutalism** | Bold, memorable, creative | Corporate/professional |
| 🥉 3 | **Apple Human Interface** | Premium, clean, typography-focused | Mobile-heavy |

**Recommended Components:**
- Hero section
- Project cards (grid)
- Navigation (minimal)
- Contact form
- Typography (large headings)

**Quick Start:**
```tsx
// Portfolio layout
<Hero title={name} subtitle={tagline} />
<ProjectGrid projects={projects} />
<ContactForm />
```

---

## 🛒 E-commerce

**Best Styles:**
| Rank | Style | Why | Avoid When |
|------|-------|-----|------------|
| 🥇 1 | **Flat 2.0** | Clean product display, fast | Luxury/high-end |
| 🥈 2 | **Material** | Familiar, clear pricing | Fashion/creative |
| 🥉 3 | **Minimalism** | Premium products, focus on visuals | Budget options |

**Recommended Components:**
- Product cards
- Grid layouts
- Filters/sort
- Cart drawer
- Forms (checkout, auth)
- Badges (sale, new)

**Quick Start:**
```tsx
// E-commerce layout
<ProductGrid>
  <FilterSidebar />
  <ProductCard />
</ProductGrid>
<CartDrawer />
```

---

## 📝 Blog / Editorial

**Best Styles:**
| Rank | Style | Why | Avoid When |
|------|-------|-----|------------|
| 🥇 1 | **Minimalism** | Readable, typography-focused | Heavy UI elements |
| 🥈 2 | **Apple Human Interface** | Premium reading experience | Dense content |
| 🥉 3 | **Material** | Structured, familiar | Creative writing |

**Recommended Components:**
- Article layout
- Typography (prose)
- Image galleries
- Code blocks
- Comments section
- Author cards

**Quick Start:**
```tsx
// Blog layout
<ArticleHeader title={title} author={author} date={date} />
<Prose content={body} />
<AuthorCard author={author} />
<CommentsSection />
```

---

## 📱 Mobile App

**Best Styles:**
| Rank | Style | Why | Avoid When |
|------|-------|-----|------------|
| 🥇 1 | **Apple Human Interface** | iOS-native feel | Android-first |
| 🥈 2 | **Flat 2.0** | Cross-platform friendly | Premium/luxury |
| 🥉 3 | **Neumorphism** | Unique, touch-friendly | Low-contrast |

**Recommended Components:**
- Bottom navigation
- Cards (swipeable)
- Lists (virtualized)
- Forms (mobile-optimized)
- Touch targets (44px+)
- Modals (bottom sheets)

**Quick Start:**
```tsx
// Mobile layout
<BottomNav items={navItems} />
<Card variant="swipeable" />
<BottomSheet>
  <FormInput />
</BottomSheet>
```

---

## 🚀 Landing / Marketing

**Best Styles:**
| Rank | Style | Why | Avoid When |
|------|-------|-----|------------|
| 🥇 1 | **Glassmorphism** | Modern, eye-catching | Corporate/B2B |
| 🥈 2 | **Brutalism** | Bold, memorable, different | Conservative audiences |
| 🥉 3 | **Flat 2.0** | Clean, fast, conversion-focused | Premium |

**Recommended Components:**
- Hero section (large)
- Feature cards
- Testimonials
- CTA buttons (prominent)
- Pricing tables
- FAQ accordion

**Quick Start:**
```tsx
// Landing layout
<Hero variant="large" />
<FeaturesGrid />
<PricingTable />
<CTASection />
```

---

## 🔧 Quick Component Reference

### When to use what?

| Component | Use When | Avoid When |
|-----------|---------|------------|
| **Button** | Actions, CTAs | Navigation (use Link) |
| **Card** | Grouped content, clickable items | Dense data (use Table) |
| **Modal** | Focused tasks, confirmations | Long content (use Page) |
| **Form** | User input, data collection | Display-only (use Card) |
| **Table** | Large datasets, sortable | Few items (use Grid) |
| **Navigation** | Multi-page, persistent | Single page (use Tabs) |

---

## 🎨 Color Scheme Quick Picker

| Mood | Light Mode | Dark Mode |
|------|-----------|----------|
| **Professional** | Blue + Gray | Blue + Dark Gray |
| **Creative** | Purple + Pink | Purple + Black |
| **Luxury** | Gold + Black | Gold + Dark |
| **Friendly** | Green + Warm Gray | Green + Dark |
| **Bold** | Red + Black | Red + Dark |

---

## 🔄 Animation Decision (Quick)

| Animation Type | CSS Only | @motion/react |
|---------------|---------|--------------|
| Hover effects | ✅ | ✅ |
| Page transitions | ✅ | ✅ |
| Scroll animations | ❌ | ✅ |
| Drag/drop | ❌ | ✅ |
| Staggered lists | ❌ | ✅ |
| Hover states | ✅ | ✅ |
| Loading spinners | ✅ | ❌ |

See [ANIMATIONS-DECISION.md](./ANIMATIONS-DECISION.md) for full guide.

---

## 🚨 Common Mistakes

❌ **Don't use** Glassmorphism with heavy text (blur reduces readability)

❌ **Don't use** Skeuomorphism for modern apps (looks dated)

❌ **Don't use** Brutalism for healthcare/finance (too informal)

❌ **Don't use** Material for iOS-only apps (Apple HIG is better)

❌ **Don't skip** touch targets (minimum 44x44px)

❌ **Don't skip** reduced motion (use `prefers-reduced-motion`)

---

## 📋 Pre-Built Combos

### Dashboard SaaS
- Style: Glassmorphism
- Fonts: Inter + JetBrains Mono
- Colors: Blue primary, slate neutrals
- Components: Nav, Cards, Tables, Modals

### Creative Portfolio
- Style: Minimalism
- Fonts: Playfair Display + Inter
- Colors: Black/white with accent
- Components: Hero, Grid, Contact

### E-commerce
- Style: Flat 2.0
- Fonts: Poppins + Inter
- Colors: Vibrant with neutral backgrounds
- Components: Product cards, Cart, Filters

### Blog
- Style: Minimalism
- Fonts: Lora + Inter
- Colors: Warm neutrals, single accent
- Components: Prose, Author, Comments

---

Last updated: 2026-06-03 (v1.6.3)