# UI/UX Developer Skill

**Framework-agnostic skill for building accessible, high-quality user interfaces with Tailwind v4.**

---

## 🎯 Overview

This skill provides a comprehensive toolkit for creating production-ready UI components with:
- **9 design styles** (Glassmorphism, Minimalism, Brutalism, Neumorphism, Material, Apple Human Interface, Flat 2.0, Skeuomorphism, Custom)
- **4 framework templates** (React/Next.js, Svelte, Vue, Vanilla)
- **WCAG 2.2 AA compliance** by default
- **Security-first** approach (XSS, CSS injection prevention)
- **Comprehensive testing** (Vitest + Playwright + axe-core)
- **Quick mode** for existing projects
- **RTL & i18n** support

---

## 📁 File Structure

```
ui-ux-developer/
├── SKILL.md                      # Main skill + questionnaire (start here)
├── CSS-PATTERNS.md               # Tailwind v4 CSS patterns
├── DESIGN-STYLES.md              # 9 complete style templates
├── FONTS-GUIDE.md                # Font selection guide
├── CHECKLIST.md                  # WCAG 2.2 AA audit checklist
├── SECURITY-CHECKLIST.md         # Security guidelines
├── MIGRATION.md                  # Tailwind v3 → v4 migration
├── MIGRATION-FRAMEWORKS.md       # MUI/Chakra/Bootstrap migration
├── ANIMATIONS-CSS.md             # CSS-only animations
├── ANIMATIONS-DECISION.md        # CSS vs @motion/react guide + matrix
├── QUICKSTART.md                 # Quick decision tree
├── VALIDATORS.ts                 # Security sanitization (24 functions)
├── THEME-BUILDER.md              # Interactive theme config
├── COMPONENT-CATALOG.md         # ASCII component mockups
├── STYLE-PLAYGROUND.md           # Live demos for all styles
├── DARK-MODE.md                  # Dark mode patterns
├── COLOR-CONTRAST.md            # WCAG contrast calculator
├── SCREEN-READER-TESTING.md     # NVDA/VoiceOver/JAWS guide
├── RTL-PATTERNS.md              # RTL patterns guide
├── I18N-PATTERNS.md             # i18n patterns + translation support
├── INTEGRATION-EXAMPLES.md       # Complete integration guide
├── REGISTRY.md                   # Skill registry entry
├── README.md                    # This file
├── AUDIT.md                     # Audit history + quality metrics
├── CI-CD.md                    # CI/CD integration guide
│
├── TEMPLATES/
│   ├── components.react-nextjs.md # React + Next.js
│   ├── components.vanilla.md      # Vanilla HTML/CSS
│   ├── components.svelte.md       # Svelte 5
│   ├── components.vue.md         # Vue 3
│   ├── framer-motion.md          # @motion/react patterns
│   └── theme-switcher.md        # ThemeProvider component
│
└── TESTS/
    ├── vitest.config.md           # Unit test config
    ├── playwright.config.md       # E2E test config
    ├── validators.test.md         # Security validator tests
    └── components/
        ├── button.test.md         # Button tests (48 cases)
        ├── avatar.test.md        # Avatar tests (42 cases)
        ├── badge.test.md          # Badge tests (38 cases)
        └── toast.test.md         # Toast tests (44 cases)
```

**Total: 38 files** (25 docs + 6 templates + 7 tests)

---

## 🚀 Quick Start

### 1. Start the Questionnaire

When asked to create UI components, start with the 13-question interactive questionnaire.
For existing projects with saved context, use **Quick Mode** for faster setup.

```typescript
interface UIProjectContext {
  projectType: 'saas' | 'portfolio' | 'ecommerce' | ...;
  designStyle: 'glassmorphism' | 'minimalism' | ...;
  framework: 'nextjs' | 'react' | 'vanilla' | 'svelte' | 'vue';
  // ... 13 questions total
}
```

### 2. Choose a Design Style

| Style | Best For | Complexity |
|-------|----------|------------|
| **Glassmorphism** | Dashboard, Premium | Medium |
| **Minimalism** | Portfolio, Clean | Low |
| **Brutalism** | Creative, Bold | Low |
| **Neumorphism** | Health, Soft | High |
| **Material Design** | SaaS, Enterprise | Medium |
| **Apple Human Interface** | Premium, macOS | Medium |
| **Flat 2.0** | Modern, Mobile | Low |
| **Skeuomorphism** | Games, Vintage | High |
| **Custom** | Brand guidelines | Variable |

### 3. Select Framework Template

All templates include:
- Button, Card, Input, Modal, Toast, Navigation
- Dark mode support
- Accessibility (WCAG 2.2 AA)
- Reduced motion support
- Security validators

---

## 📚 Key Documentation

| Topic | File | Description |
|-------|------|-------------|
| **Tailwind v4** | `CSS-PATTERNS.md` | CSS-first configuration |
| **Migrating from v3** | `MIGRATION.md` | Step-by-step guide |
| **Design Styles** | `DESIGN-STYLES.md` | All 9 styles with code |
| **Live Demos** | `STYLE-PLAYGROUND.md` | Interactive examples |
| **Fonts** | `FONTS-GUIDE.md` | Selection + variable fonts |
| **Accessibility** | `CHECKLIST.md` | WCAG 2.2 AA checklist |
| **Screen Reader** | `SCREEN-READER-TESTING.md` | NVDA/VoiceOver/JAWS |
| **Security** | `SECURITY-CHECKLIST.md` | XSS prevention |
| **Animations** | `ANIMATIONS-CSS.md` | CSS-only patterns |
| **Animation Decision** | `ANIMATIONS-DECISION.md` | CSS vs @motion matrix |
| **Theme Builder** | `THEME-BUILDER.md` | Interactive config |
| **Dark Mode** | `DARK-MODE.md` | Color schemes + patterns |
| **Contrast** | `COLOR-CONTRAST.md` | WCAG calculator |
| **RTL** | `RTL-PATTERNS.md` | Logical properties |
| **i18n** | `I18N-PATTERNS.md` | Multi-language support |
| **Integration** | `INTEGRATION-EXAMPLES.md` | Full project setup |

---

## 🔧 Commands

| Command | Description |
|---------|-------------|
| `/ui-create <component>` | Create new component with full context |
| `/ui-audit <target>` | Audit existing UI |
| `/ui-improve <component>` | Improve component |
| `/ui-styles` | Show design styles |
| `/ui-fonts` | Font recommendations |
| `/ui-checklist` | WCAG checklist |

---

## 🧪 Testing

### Unit Tests (Vitest)

```bash
npm run test:unit
# or
npm run test:validators
```

### E2E Tests (Playwright)

```bash
npm run test:e2e
# or
npm run test:a11y
```

### Test Coverage

| Component | Tests | Coverage |
|-----------|-------|----------|
| Button | 48 test cases | ✅ |
| Avatar | 42 test cases | ✅ |
| Badge | 38 test cases | ✅ |
| Toast | 44 test cases | ✅ |
| Validators | 35 test cases | ✅ |

---

## 🛡️ Security Features

- **XSS Prevention**: All user input sanitized
- **CSS Injection**: Class validation with whitelist
- **Color Sanitization**: Safe color values
- **URL Validation**: Safe external links
- **ARIA Validation**: Correct attribute usage

See `VALIDATORS.ts` for all 24 security utilities.

---

## 🌐 Special Features

### RTL Support
For Arabic, Hebrew, and other RTL languages:
- CSS logical properties (margin-inline-start, etc.)
- Tailwind logical classes (ms-, me-, ps-, pe-)
- See `RTL-PATTERNS.md`

### i18n Support
For multi-language projects:
- Language-specific font stacks
- Dynamic string loading
- See `I18N-PATTERNS.md`

### Reduced Motion
Built-in support via `prefers-reduced-motion`:
- CSS media queries in all animation examples
- `@motion/react` MotionConfig with reducedMotion prop
- See `STYLE-PLAYGROUND.md` for `motion-reduce:` variants

### Container Queries
Modern responsive patterns:
- Browser support: Chrome 105+, Firefox 110+, Safari 16+
- Requires Tailwind v3.5+ with `@tailwindcss/container-queries`
- See `CSS-PATTERNS.md`

---

## 🎨 Design Tokens

### Color Scheme (CSS Variables)

```css
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 221.2 83.2% 53.3%;
--secondary: 220 14.3% 46.9%;
--accent: 220 13.7% 34.1%;
--muted: 210 40% 96.1%;
--border: 214.3 31.8% 91.4%;
```

### Typography

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-display: 'Space Grotesk', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 90+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |

---

## 📖 Learning Path

1. **Start**: Read `SKILL.md` (questionnaire + core principles)
2. **Design**: Choose style from `DESIGN-STYLES.md` or `STYLE-PLAYGROUND.md`
3. **Implement**: Use framework template from `TEMPLATES/`
4. **Customize**: Configure theme with `THEME-BUILDER.md`
5. **Test**: Run tests with `TESTS/` configs
6. **Audit**: Verify with `CHECKLIST.md`
7. **Integrate**: See `INTEGRATION-EXAMPLES.md` for complete project setup

---

## 🔗 Related Skills

- `pi-lens` - Code quality
- `cognitive-doc-design` - Documentation
- `gentle-ai` - SDD workflow

---

**Version:** 1.6.3
**Last Updated:** 2026-06-03
**Author:** Sebastian Illa
**Quality Score:** 9.9/10 ✅