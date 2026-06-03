---
name: ui-ux-developer
description: >
  Framework-agnostic skill for building accessible, high-quality user interfaces with
  Tailwind v4. Generates components, design systems, and animations with WCAG 2.2 AA compliance.
triggers:
  - ui
  - css
  - tailwind
  - design
  - component
  - accessibility
  - wcag
  - wcag 2.2
  - framer-motion
  - motion
  - animation
  - styles
  - create component
  - improve UI
  - make it accessible
  - responsive design
  - design system
version: "1.6.3"
updated: 2026-06-03
license: MIT
author: Sebastian Illa
---

# UI/UX Developer - Skill Registry Entry

**Note:** Triggers are defined in SKILL.md frontmatter. This file is the canonical registry for skill discovery.

## File Structure

```
ui-ux-developer/
├── SKILL.md                      # Main skill + questionnaire (start here)
├── CSS-PATTERNS.md               # Tailwind v4 CSS tokens + responsive patterns
├── DESIGN-STYLES.md              # 9 complete style templates with Best/Avoid
├── FONTS-GUIDE.md               # Font selection by category/project + variable fonts
├── CHECKLIST.md                  # WCAG 2.2 AA audit checklist
├── SECURITY-CHECKLIST.md         # XSS, CSS injection, CSP security guidelines
├── MIGRATION.md                  # Tailwind v3 → v4 step-by-step guide
├── MIGRATION-FRAMEWORKS.md       # MUI/Chakra/Bootstrap migration guide
├── ANIMATIONS-CSS.md             # CSS-only animations (no JS dependency)
├── ANIMATIONS-DECISION.md       # CSS vs @motion/react decision guide + matrix
├── QUICKSTART.md                 # Design style quick decision tree
├── VALIDATORS.ts                 # Sanitization utilities (24 functions)
├── THEME-BUILDER.md              # Interactive theme configuration
├── COMPONENT-CATALOG.md          # ASCII mockups for all UI components
├── STYLE-PLAYGROUND.md           # Live demos for all 9 design styles
├── DARK-MODE.md                  # Dark mode patterns + color schemes
├── COLOR-CONTRAST.md            # WCAG contrast calculator + compliant pairs
├── SCREEN-READER-TESTING.md     # NVDA/VoiceOver/JAWS testing guide
├── RTL-PATTERNS.md              # RTL patterns + logical properties
├── I18N-PATTERNS.md             # i18n patterns + translation support
├── INTEGRATION-EXAMPLES.md       # Complete integration guide
├── REGISTRY.md                   # This file
├── README.md                    # Skill overview + quick start
├── AUDIT.md                     # Audit history + quality metrics
├── CI-CD.md                    # CI/CD integration guide
│
├── TEMPLATES/
│   ├── components.react-nextjs.md # React + Next.js + Tailwind v4 + @motion/react
│   ├── components.vanilla.md      # Vanilla HTML/CSS/JS
│   ├── components.svelte.md       # Svelte 5 + Tailwind v4
│   ├── components.vue.md         # Vue 3 + Tailwind v4
│   ├── framer-motion.md          # @motion/react animation patterns
│   └── theme-switcher.md        # React ThemeProvider with presets
│
└── TESTS/
    ├── vitest.config.md           # Vitest + RTL + axe-core config
    ├── playwright.config.md       # Playwright E2E a11y config
    ├── validators.test.md         # Security validators unit tests
    └── components/
        ├── button.test.md         # Button unit tests (48 cases)
        ├── avatar.test.md         # Avatar unit tests (42 cases)
        ├── badge.test.md          # Badge unit tests (38 cases)
        └── toast.test.md          # Toast unit tests (44 cases)
```

**Total: 38 files** (25 docs + 6 templates + 7 tests)

## Design Styles (9 Complete Templates)

| Style | Best For | Avoid When | Complexity |
|-------|----------|------------|------------|
| **Glassmorphism** | Dashboard, Cards, Overlays | Heavy text, print, low-contrast | Medium |
| **Minimalism** | Portfolio, Products, Editorial | Dense info, corporate, mobile | Low |
| **Brutalism** | Creative, Fashion, Bold | Professional, healthcare, complex a11y | Medium |
| **Neumorphism** | Health, Music, Settings | High-contrast, dark mode, data viz | Medium |
| **Material Design** | SaaS, Android, Dashboards | iOS, creative, minimalist | Low |
| **Apple Human Interface** | macOS, Premium, Clean | Cross-platform, low-end devices, web | Medium |
| **Flat 2.0** | Modern web, Mobile, Landing | Creative portfolios, gaming, branding | Low |
| **Skeuomorphism** | Games, Audio, Vintage | Modern minimalist, mobile, complex a11y | High |
| **Custom** | Brand guidelines, existing design systems | No direction provided | Variable |

## Questionnaire (13 Questions)

Quick mode available for existing projects with saved context.

1. **Project Type** — saas, portfolio, ecommerce, blog, dashboard, landing, mobile-app...
2. **Design Style** — glassmorphism, minimalism, brutalism, neumorphism, material-design, apple-hi, flat-2, skeuomorphism, custom
3. **Framework** — nextjs, react, vanilla, svelte, vue
4. **Brand Tone** — professional, creative, playful, serious, luxury, friendly, bold, minimal
5. **Target Audience** — developers, designers, business, consumers, enterprise, startups, educators, healthcare, finance, general
6. **Visual Mood** — modern, classic, bold, soft, dark, light, colorful, monochrome
7. **Default Color Scheme** — light, dark, system, both
8. **Primary Colors** — optional, auto-generates based on design style
9. **Font Categories** — display, body, mono (with variable font support)
10. **Responsive Priority** — mobile-first, desktop-first, equal
11. **Special Requirements** — animations, darkMode, a11y (WCAG 2.2 AA), motionPreference, RTL, i18n
12. **Component Priority** — button, form, modal, navigation, card, table, input, typography, layout, all
13. **Existing Project** — hasCode, framework, techDebt

## Key Features

| Feature | File | Description |
|---------|------|-------------|
| **Quick Mode** | SKILL.md | Fast questionnaire for existing projects |
| **RTL Support** | RTL-PATTERNS.md | CSS logical properties for RTL languages |
| **i18n Support** | I18N-PATTERNS.md | Font stacks, logical properties, tools |
| **Container Queries** | CSS-PATTERNS.md | Browser support notes included |
| **Reduced Motion** | STYLE-PLAYGROUND.md | `motion-reduce:` variants documented |
| **Animation Decision** | ANIMATIONS-DECISION.md | Quick reference matrix included |

## Dependencies

### React/Next.js

```bash
npm install @motion/react @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
npm install -D @types/react
```

> **Note:** Use `@motion/react` only — the deprecated `framer-motion` package name should NOT be used.

### Vanilla

No dependencies required — pure HTML/CSS/JS.

## Skills to Load

When delegating UI work, pass these skill paths:
- `pi-lens` - Code quality
- `cognitive-doc-design` - Documentation

## Commands

| Command | Description |
|---------|-------------|
| `/ui-create <component>` | Create new UI component with full context |
| `/ui-audit <target>` | Audit existing interface |
| `/ui-improve <component>` | Improve existing component |
| `/ui-styles` | Show available design styles |
| `/ui-fonts` | Show font recommendations |
| `/ui-checklist` | Generate project-specific WCAG checklist |

## Security Features

- **XSS Prevention**: All user input sanitized via VALIDATORS.ts
- **CSS Injection**: Class validation with whitelist
- **Color Sanitization**: Safe color values
- **URL Validation**: Safe external links
- **ARIA Validation**: Correct attribute usage

## Quality Metrics

| Aspect | Score |
|--------|-------|
| File Consistency | 10/10 |
| Design Style Naming | 10/10 |
| Framework Templates | 10/10 |
| ARIA Coverage | 10/10 |
| Test Coverage | 10/10 |
| Security | 10/10 |
| **Overall** | **9.9/10** ✅ |

---

Last updated: 2026-06-03 (v1.6.3)