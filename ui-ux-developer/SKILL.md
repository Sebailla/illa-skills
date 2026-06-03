---
name: ui-ux-developer
description: >
  Framework-agnostic skill for building accessible, high-quality user interfaces with
  Tailwind v4. Generates components, design systems, and animations with WCAG 2.2 AA compliance.
  Validate colors as hex or Tailwind tokens. If hex, require 6-digit format. If provided
  colors fail WCAG contrast with body text, auto-adjust and log the adjustments.
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

# UI/UX Developer Skill

**Framework-agnostic skill for building accessible, high-quality user interfaces with Tailwind v4.**

---

## ⚠️ MANDATORY: Interactive Questionnaire (Obligatorio)

**ANTES de generar CUALQUIER cosa, debes hacer el cuestionario interactivo completo. / BEFORE generating anything, run the full interactive questionnaire.**

> 💡 **Quick Mode:** Si el proyecto ya existe en Engram con contexto previo, puedes usar el modo rápido.
> 1. Llama `mem_context({ scope: 'project' })`.
> 2. Si no hay contexto válido, ejecuta el cuestionario completo.
> 3. Si hay contexto válido, confirma con el usuario y valida los campos requeridos.
> 4. Si el usuario acepta y el contexto es completo, úsalo; si no, ejecuta el cuestionario completo.

### Quick Mode Decision Table

1. Call `mem_context({ scope: 'project' })`.
2. If result is null/undefined or malformed, treat as no context and run full questionnaire.
3. If multiple saved projects are returned, show a numbered list with project names and creation dates, and ask: "¿Cuál proyecto quieres usar?" / "Which project do you mean?".
4. If the selected context lacks required fields, ask the user to confirm reuse and re-collect missing fields.
5. If the user declines or validation fails, run the full questionnaire.
6. If the user accepts valid saved context, reuse it and still validate required fields.

### Quick Mode Flow

```typescript
const savedContexts = await mem_context({ scope: 'project' });

if (!savedContexts || !Array.isArray(savedContexts) || savedContexts.length === 0) {
  await runFullQuestionnaire();
  return;
}

const selectedContext = await chooseSavedProject(savedContexts, currentProject);
if (!selectedContext) {
  await runFullQuestionnaire();
  return;
}

const valid = validateRequiredFields(selectedContext);
if (!valid) {
  const confirmReuse = await ask_user_question({
    question: "El contexto guardado está incompleto. ¿Deseas usarlo y completar los campos faltantes?",
    options: [
      { label: "Sí, completar campos", value: "yes" },
      { label: "No, ejecutar cuestionario completo", value: "no" }
    ]
  });

  if (confirmReuse !== 'yes') {
    await runFullQuestionnaire();
    return;
  }
}

return selectedContext;
```

### Required quick-mode validation rules
- `projectType`, `designStyle`, `framework`, `brandTone`, `colorScheme`, `responsivePriority`, `componentPriority` must exist.
- `colors` values must be valid 6-digit hex or Tailwind tokens, and must meet WCAG contrast against body text.
- `fonts.body` must exist or be inferred from project type.
- `accessibility` must always be treated as true.
- If `mem_save` fails, retry up to 2 times; if it still fails, inform the user: "Unable to save project context — proceeding without saving. Continue?".

### Questions (in order)

```typescript
interface UIProjectContext {
  // 1. Project Type
  projectType: 'saas' | 'portfolio' | 'ecommerce' | 'blog' | 'dashboard' | 'landing' | 'mobile-app' | 'documentation' | 'community' | 'other';
  
  // 2. Design Style
  designStyle: 'glassmorphism' | 'minimalism' | 'brutalism' | 'neumorphism' | 'material-design' | 'apple-hi' | 'flat-2' | 'skeuomorphism' | 'custom';
  // If user input is outside enumerated options, respond: 'Value not recognized. Please choose one of: [list].' and offer the closest match.
  
  // 3. Framework
  framework: 'nextjs' | 'react' | 'vanilla' | 'svelte' | 'vue';
  
  // 4. Brand Personality
  brandTone: 'professional' | 'creative' | 'playful' | 'serious' | 'luxury' | 'friendly' | 'bold' | 'minimal';
  
  // 5. Target Audience
  audience: 'developers' | 'designers' | 'business' | 'consumers' | 'enterprise' | 'startups' | 'educators' | 'healthcare' | 'finance' | 'general';
  
  // 6. Visual Mood
  visualMood: 'modern' | 'classic' | 'bold' | 'soft' | 'dark' | 'light' | 'colorful' | 'monochrome';
  
  // 7. Default Color Scheme
  colorScheme: 'light' | 'dark' | 'system' | 'light+dark';   // 'system' = follow OS preference; 'light+dark' = provide two explicit palettes
  
  // 8. Primary Colors (optional - can auto-generate)
  colors: {
    primary?: string;      // Hex or Tailwind token; if hex, require 6-digit format.
    secondary?: string;
    accent?: string;
    dark?: string;
    light?: string;
    // If empty, auto-generate exactly 3 colors: primary, secondary, accent.
    // Each returned as hex with tonal variants: base, hover, active.
  };
  
  // 9. Font Categories
  fonts: {
    display?: string;      // Headlines, hero text
    body?: string;         // Paragraphs, UI text
    mono?: string;         // Code, technical
    // If empty, will suggest based on project type and audience
  };
  
  // 10. Responsive Priority
  responsivePriority: 'mobile-first' | 'desktop-first' | 'equal';
  
  // 11. Special Requirements
  specialRequirements: {
    animations?: boolean;      // @motion/react / CSS animations
    darkMode?: boolean;         // Dark theme support
    accessibility: true;        // WCAG 2.2 AA (always true and non-negotiable)
    motionPreference?: boolean; // Respect prefers-reduced-motion
    RTL?: boolean;             // Right-to-left languages
    internationalization?: boolean; // i18n support
  };
  
  // 12. Component Priority (which components to create first)
  componentPriority: ('button' | 'form' | 'modal' | 'navigation' | 'card' | 'table' | 'input' | 'typography' | 'layout' | 'all')[];
  
  // 13. Existing Project
  existingProject: {
    hasCode: boolean;
    framework?: string;
    techDebt?: string;
  };
}
```

---

## Commands

> ⚠️ **Note:** These are conceptual commands that guide the skill's behavior. They are not actual Pi slash commands. The skill responds to the user's natural language requests and follows these patterns internally.

### Component Creation (`/ui-create`)

**Creates new UI component with full context.**

Flow:
1. Trigger questionnaire (MANDATORY)
2. Load cached preferences from Engram (`mem_context`)
3. Ask missing questions
4. Save to Engram
5. Generate component based on context

### Component Audit (`/ui-audit`)

**Audits existing interface against WCAG and security checklist.**

```bash
/ui-audit
/ui-audit src/components/Button.tsx
/ui-audit --scope=full
```

### Component Improvement (`/ui-improve`)

**Improves existing component based on latest patterns.**

```bash
/ui-improve Button
/ui-improve --style=modernize
```

### Design Styles (`/ui-styles`)

**Shows available design styles or details for a specific style.**

See: `DESIGN-STYLES.md` for complete style templates

```bash
/ui-styles
/ui-styles glassmorphism
```

### Font Recommendations (`/ui-fonts`)

**Shows font recommendations for project type.**

See: `FONTS-GUIDE.md` for complete font selection guide

```bash
/ui-fonts
/ui-fonts --type=display
/ui-fonts --project=saas
```

### WCAG Checklist (`/ui-checklist`)

**Generates project-specific WCAG checklist.**

See: `CHECKLIST.md` for complete WCAG 2.2 AA audit checklist
> 🌐 **RTL Support:** Para proyectos con idiomas derecho-a-izquierda (árabe, hebreo), ver [RTL-PATTERNS.md](./RTL-PATTERNS.md)
> 🌐 **i18n Support:** Para proyectos con múltiples idiomas, usar CSS logical properties y considerar libraries como react-i18next.

---

## Core Principles

### 1. Accessibility First (WCAG 2.2 AA minimum)

**Never skip accessibility. Non-negotiable.**
- Contrast ratio: 4.5:1 (normal text), 3:1 (large text, UI components)
- Keyboard navigation: all interactive elements reachable
- Focus indicators: never remove without replacement
- Touch targets: minimum 24x24px CSS (44x44px for mobile)
- Semantic HTML over ARIA

### 2. Framework-Agnostic

Generate variants for each framework:
- React/Next.js (with Tailwind v4 + @motion/react)
- Vanilla HTML/CSS/JS
- Svelte 5 + Tailwind v4
- Vue 3 + Tailwind v4

### 3. Design Style Templates

9 complete styles included:
1. **Glassmorphism** - Translucent, frosted-glass effect
2. **Minimalism** - Clean, uncluttered interfaces
3. **Brutalism** - Raw, bold, thick borders
4. **Neumorphism** - Soft, extruded UI elements
5. **Material Design** - Google design system
6. **Apple Human Interface** - Apple design principles
7. **Flat 2.0** - Modern flat with subtle depth
8. **Skeuomorphism** - Realistic, subtle textures
9. **Custom** - Extracted from reference/brand guidelines

### 4. Font Selection Based on Context

Never use defaults unless no validated saved context exists. Always ask or analyze project type.

### 4.1. Rule precedence
- Accessibility requirements override user preferences.
- Use saved context only if it is validated and complete.
- Never use defaults only when no validated saved context exists.

---

## File Structure

```
ui-ux-developer/
├── SKILL.md                      # Main skill definition + questionnaire (13 questions)
├── CSS-PATTERNS.md               # Tailwind v4 CSS tokens + responsive patterns
├── DESIGN-STYLES.md              # 9 complete style templates with Best/Avoid
├── FONTS-GUIDE.md               # Font selection by category/project + variable fonts
├── CHECKLIST.md                  # WCAG 2.2 AA audit checklist
├── SECURITY-CHECKLIST.md         # XSS, CSS injection, CSP security guidelines
├── MIGRATION.md                  # Tailwind v3 → v4 step-by-step guide
├── MIGRATION-FRAMEWORKS.md       # MUI/Chakra/Bootstrap migration guide
├── ANIMATIONS-CSS.md             # CSS-only animations (no JS dependency)
├── ANIMATIONS-DECISION.md        # CSS vs @motion/react decision guide
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
├── INTEGRATION-EXAMPLES.md     # Complete integration guide
├── REGISTRY.md                   # Skill registry entry
├── README.md                    # Skill overview + quick start
├── AUDIT.md                     # Audit history + quality metrics (includes v1.6.2 audit report)
├── CI-CD.md                    # CI/CD integration guide (GitHub, GitLab, etc.)
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
        ├── button.test.md         # Button unit tests with a11y (47 cases)
        ├── avatar.test.md         # Avatar unit tests with a11y (42 cases)
        ├── badge.test.md          # Badge unit tests with a11y (38 cases)
        └── toast.test.md          # Toast unit tests with a11y (44 cases)
```

**Total: 37 files** (24 docs + 6 templates + 7 tests)

---

## Engram Memory Integration

### Save Project Context

```typescript
mem_save({
  title: `UI Project: ${projectName}`,
  type: 'project-context',
  topic_key: `ui-project/${projectName}`,
  content: {
    projectType,
    designStyle,
    framework,
    brandTone,
    colorScheme,
    colors,
    fonts,
    responsivePriority,
    specialRequirements,
    componentPriority,
    createdAt: new Date().toISOString()
  }
});
```

### Load Previous Context

```typescript
mem_context({ scope: 'project' });
// If project found, skip questionnaire for same project
```

### User Preferences

```typescript
mem_save({
  title: 'UI Skill Preferences',
  type: 'user-preference',
  topic_key: 'ui-skill/preferences',
  content: {
    preferredDesignStyle: string,
    preferredFramework: string,
    defaultColorScheme: 'light' | 'dark' | 'system' | 'both',
    fontPreferences: string[],
    responsivePriority: string,
    favoriteColors: string[],
  }
});
```

---

## Anti-Patterns to Avoid

❌ `outline: none` without replacement
❌ Color-only status indicators
❌ Missing `alt` on informative images
❌ `tabindex > 0`
❌ Click handlers without keyboard support
❌ Fixed text sizes (use rem/em)
❌ Content hiding with `display: none` (use `.sr-only`)
❌ Autoplay animations without controls
❌ Insufficient touch targets (< 24px)
❌ Using default fonts without project context
❌ Mixing `@motion/react` versions or import styles

---

## Skills to Load

For UI/UX tasks, load these skills before working:
- `pi-lens` - Code quality
- `cognitive-doc-design` - Documentation

---

## Dependencies

### React/Next.js

```bash
npm install @motion/react @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
npm install -D @types/react
```

### Vanilla

No dependencies required — pure HTML/CSS/JS.

> ⚠️ **Security:** For production applications, copy `VALIDATORS.ts` to your project and integrate form validation. See [SECURITY-CHECKLIST.md](./SECURITY-CHECKLIST.md).

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-06-01 | Initial release |
| 1.0.1 | 2026-06-02 | Fixed frontmatter, added Q7 (colorScheme), standardized @motion/react, fixed REGISTRY.md paths |
| 1.0.2 | 2026-06-02 | Fixed aria-required duplication in form-field, added Tailwind v4 warning to CSS-PATTERNS.md, added Best Paired With/Avoid When to all 8 styles, added variable fonts section to FONTS-GUIDE.md, created MIGRATION.md (v3→v4), ANIMATIONS-CSS.md (CSS-only animations), SECURITY-CHECKLIST.md (XSS/CSS security) |
| 1.0.3 | 2026-06-02 | Quick fixes: Quick Reference Table (added Avoid When column), AUDIT.md rewrite, VALIDATORS.ts created |
| 1.0.4 | 2026-06-02 | Validators integrated into templates, security examples added |
| 1.0.5 | 2026-06-02 | Feature Complete: Svelte/Vue templates, QUICKSTART.md, ANIMATIONS-DECISION.md, deleted orphan TEMPLATES/COMPONENTS.md, updated all file references |
| **1.1.0** | **2026-06-02** | **Security & QA: TESTS/validators.test.ts (XSS payloads, URLs, colors), fixed SVG aria-busy accessibility violation, added custom style template to DESIGN-STYLES.md, 9 styles total** |
| **1.2.0** | **2026-06-02** | **ARIA expansion (30+ attributes), CSP nonce-based approach, COMPONENT-CATALOG.md with ASCII mockups for 12 components** |
| **1.3.0** | **2026-06-02** | **Theme Builder documentation, variable fonts CSS fix, vanilla template complete** |
| **1.4.0** | **2026-06-02** | **Audit fixes: Naming standardized, ARIA tests expanded, structure updated, empty folders removed, triggers table removed from REGISTRY.md, audit files consolidated** |
| **1.5.0** | **2026-06-02** | **Live demos: STYLE-PLAYGROUND.md, DARK-MODE.md expanded patterns, theme-switcher.md component with presets** |

---

## License

MIT