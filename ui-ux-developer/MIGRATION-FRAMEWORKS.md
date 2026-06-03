# Framework Migration Guide

Patterns for migrating from MUI (Material UI), Chakra UI, and Bootstrap to the ui-ux-developer skill patterns.

---

## Table of Contents

1. [Overview](#1-overview)
2. [MUI (Material UI)](#2-mui-material-ui)
3. [Chakra UI](#3-chakra-ui)
4. [Bootstrap](#4-bootstrap)
5. [Common Patterns](#5-common-patterns)

---

## 1. Overview

### Why Migrate?

| Reason | Description |
|--------|-------------|
| **Tailwind v4** | Modern CSS-first configuration |
| **Framework-agnostic** | React, Vue, Svelte, Vanilla |
| **WCAG 2.2 AA** | Accessibility-first by default |
| **Design styles** | 9 complete design styles |
| **Security** | XSS, CSS injection prevention |
| **Customization** | Full control over styling |

### Migration Strategy

1. **Audit current usage** — Identify all component usage
2. **Prioritize by frequency** — Start with most-used components
3. **Migrate iteratively** — One component at a time
4. **Test thoroughly** — Accessibility and functionality
5. **Remove old dependencies** — After migration complete

---

## 2. MUI (Material UI)

### Installation

```bash
# Remove MUI
npm uninstall @mui/material @emotion/react @emotion/styled

# Install new dependencies
npm install @motion/react @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
```

### Component Mapping

| MUI Component | ui-ux-developer Pattern |
|--------------|------------------------|
| `<Button>` | Button component with variants |
| `<Card>` | Card component with slots |
| `<TextField>` | Input + FormField components |
| `<Dialog>` | Modal component with focus trap |
| `<Menu>` | Dropdown component |
| `<Avatar>` | Avatar component |
| `<Chip>` | Badge component |
| `<Alert>` | Toast component |
| `<AppBar>` | Navigation component |
| `<Drawer>` | Sidebar navigation |
| `<Table>` | Table component |

### Button Migration

**MUI:**
```tsx
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

<Stack direction="row" spacing={2}>
  <Button variant="contained" color="primary">Primary</Button>
  <Button variant="outlined" color="secondary">Secondary</Button>
  <Button variant="text" color="error">Destructive</Button>
</Stack>
```

**ui-ux-developer:**
```tsx
import { Button } from '@/components/ui/button';

<div className="flex gap-2">
  <Button variant="primary">Primary</Button>
  <Button variant="outline">Secondary</Button>
  <Button variant="destructive">Destructive</Button>
</div>
```

### Card Migration

**MUI:**
```tsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

<Card>
  <CardContent>
    <Typography variant="h5">Title</Typography>
    <Typography variant="body2">Description</Typography>
  </CardContent>
  <CardActions>
    <Button>Action 1</Button>
    <Button>Action 2</Button>
  </CardActions>
</Card>
```

**ui-ux-developer:**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content</p>
  </CardContent>
  <CardFooter>
    <Button variant="ghost">Action 1</Button>
    <Button variant="primary">Action 2</Button>
  </CardFooter>
</Card>
```

### TextField Migration

**MUI:**
```tsx
import TextField from '@mui/material/TextField';

<TextField
  label="Email"
  variant="outlined"
  type="email"
  helperText="Enter your email"
  error={hasError}
  required
/>
```

**ui-ux-developer:**
```tsx
import { Input } from '@/components/ui/input';
import { FormField, FormLabel, FormHint, FormError } from '@/components/ui/form';

<FormField>
  <FormLabel htmlFor="email">
    Email <span aria-hidden="true">*</span>
  </FormLabel>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    aria-describedby="email-hint email-error"
    aria-invalid={hasError}
    required
  />
  <FormHint id="email-hint">Enter your email</FormHint>
  {hasError && <FormError id="email-error">Invalid email format</FormError>}
</FormField>
```

### Dialog Migration

**MUI:**
```tsx
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

<Dialog open={isOpen} onClose={handleClose}>
  <DialogTitle>Confirm Action</DialogTitle>
  <DialogContent>
    <p>Are you sure?</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </DialogActions>
</Dialog>
```

**ui-ux-developer:**
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/modal';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>Are you sure you want to proceed?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Theme Migration

**MUI Theme:**
```tsx
const theme = createTheme({
  palette: {
    primary: { main: '#0066cc' },
    secondary: { main: '#6b7280' },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
  },
});
```

**ui-ux-developer (THEME-BUILDER.md):**
```css
/* tokens.css */
:root {
  --color-primary: #0066cc;
  --color-secondary: #6b7280;
  --font-sans: 'Inter', system-ui, sans-serif;
  --radius: 0.5rem; /* 8px */
}

/* Tailwind v4 */
@theme {
  --color-primary: var(--color-primary);
  --font-sans: var(--font-sans);
  --radius-lg: var(--radius);
}
```

---

## 3. Chakra UI

### Installation

```bash
# Remove Chakra
npm uninstall @chakra-ui/react @emotion/react @emotion/styled framer-motion

# Install new dependencies
npm install @motion/react @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
```

### Component Mapping

| Chakra Component | ui-ux-developer Pattern |
|-----------------|------------------------|
| `<Button>` | Button component |
| `<Box>` | Generic div with classes |
| `<Flex>` | Flex container |
| `<Input>` | Input component |
| `<Textarea>` | Textarea component |
| `<Select>` | Select component |
| `<Modal>` | Modal component |
| `<Menu>` | Dropdown component |
| `<Tooltip>` | Tooltip (future) |
| `<Alert>` | Toast component |
| `<Avatar>` | Avatar component |
| `<Badge>` | Badge component |

### Button Migration

**Chakra:**
```tsx
import { Button, ButtonGroup } from '@chakra-ui/react';

<ButtonGroup>
  <Button colorScheme="blue">Primary</Button>
  <Button variant="outline">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button colorScheme="red">Destructive</Button>
</ButtonGroup>
```

**ui-ux-developer:**
```tsx
<div className="flex gap-2">
  <Button variant="primary">Primary</Button>
  <Button variant="outline">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
</div>
```

### Input Migration

**Chakra:**
```tsx
import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react';

<FormControl isInvalid={hasError} isRequired>
  <FormLabel>Email</FormLabel>
  <Input type="email" placeholder="you@example.com" />
  <FormErrorMessage>Invalid email</FormErrorMessage>
</FormControl>
```

**ui-ux-developer:**
```tsx
<FormField>
  <FormLabel htmlFor="email">
    Email <span aria-hidden="true">*</span>
  </FormLabel>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    aria-describedby="email-error"
    aria-invalid={hasError}
    required
  />
  {hasError && <FormError>Invalid email</FormError>}
</FormField>
```

### Modal Migration

**Chakra:**
```tsx
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button } from '@chakra-ui/react';

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>Content</ModalBody>
    <ModalFooter>
      <Button onClick={onClose}>Cancel</Button>
      <Button colorScheme="blue">Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

**ui-ux-developer:**
```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <button 
      className="absolute top-4 right-4" 
      aria-label="Close"
      onClick={() => setIsOpen(false)}
    >
      <XIcon />
    </button>
    <h2 className="text-lg font-semibold">Title</h2>
    <div>Content</div>
    <div className="flex gap-3 justify-end">
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </div>
  </DialogContent>
</Dialog>
```

### Theme Migration

**Chakra:**
```tsx
const theme = extendTheme({
  colors: {
    brand: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg',
      },
    },
  },
});
```

**ui-ux-developer (THEME-BUILDER.md):**
```css
:root {
  --color-brand-50: #eff6ff;
  --color-brand-500: #3b82f6;
  --color-brand-900: #1e3a8a;
  --font-sans: 'Inter', system-ui, sans-serif;
  --radius-button: var(--radius-lg);
}
```

---

## 4. Bootstrap

### Installation

```bash
# Remove Bootstrap
npm uninstall bootstrap

# Install new dependencies
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react
```

### Component Mapping

| Bootstrap Class | ui-ux-developer Pattern |
|----------------|------------------------|
| `btn btn-primary` | `<Button variant="primary">` |
| `btn btn-secondary` | `<Button variant="secondary">` |
| `btn btn-outline-*` | `<Button variant="outline">` |
| `btn btn-danger` | `<Button variant="destructive">` |
| `card` | `<Card>` |
| `form-control` | `<Input>` |
| `modal` | `<Dialog>` |
| `badge bg-*` | `<Badge variant="...">` |
| `alert alert-*` | `<Toast variant="...">` |

### Button Migration

**Bootstrap:**
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-outline-secondary">Outline</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-lg">Large</button>
```

**ui-ux-developer:**
```tsx
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Danger</Button>
<Button size="lg">Large</Button>
```

### Card Migration

**Bootstrap:**
```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Title</h5>
    <p class="card-text">Content</p>
    <a href="#" class="btn btn-primary">Action</a>
  </div>
</div>
```

**ui-ux-developer:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

### Form Migration

**Bootstrap:**
```html
<div class="mb-3">
  <label class="form-label">Email</label>
  <input type="email" class="form-control" placeholder="you@example.com">
  <div class="form-text">Helper text</div>
</div>
<div class="mb-3">
  <label class="form-label">Password</label>
  <input type="password" class="form-control is-invalid" />
  <div class="invalid-feedback">Error message</div>
</div>
```

**ui-ux-developer:**
```tsx
<FormField>
  <FormLabel htmlFor="email">Email</FormLabel>
  <Input id="email" type="email" placeholder="you@example.com" />
  <FormHint>Helper text</FormHint>
</FormField>

<FormField>
  <FormLabel htmlFor="password">Password</FormLabel>
  <Input id="password" type="password" className="border-destructive" />
  <FormError>Error message</FormError>
</FormField>
```

### Grid System Migration

**Bootstrap:**
```html
<div class="row">
  <div class="col-md-6">Left</div>
  <div class="col-md-6">Right</div>
</div>
```

**ui-ux-developer:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>Left</div>
  <div>Right</div>
</div>
```

### Alert Migration

**Bootstrap:**
```html
<div class="alert alert-success" role="alert">
  Success message!
</div>
<div class="alert alert-danger" role="alert">
  Error message!
</div>
```

**ui-ux-developer:**
```tsx
<Toast variant="success" title="Success" description="Operation completed">
  Success message!
</Toast>
<Toast variant="destructive" title="Error" description="Operation failed">
  Error message!
</Toast>
```

### Modal/Dialog Migration

**Bootstrap:**
```html
<div class="modal fade" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>Content</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

**ui-ux-developer:**
```tsx
import { Dialog, DialogContent, DialogActions } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

function Example() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="Title" description="Description">
          <p>Content</p>
          <DialogActions>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### Navigation Migration

**Bootstrap:**
```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Brand</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">About</a></li>
      </ul>
    </div>
  </div>
</nav>
```

**ui-ux-developer:**
```tsx
import { Navigation, NavLink, SkipLink } from '@/components/ui/navigation';

const items = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

<Navigation items={items} currentPath={pathname} />
```

---

## 5. Common Patterns

### CSS Variables Migration

**Before (MUI/Chakra/Bootstrap):**
```css
--primary-color: #0066cc;
--secondary-color: #6b7280;
--border-radius: 8px;
```

**After (ui-ux-developer):**
```css
:root {
  --color-primary: #0066cc;
  --color-secondary: #6b7280;
  --radius-button: 0.5rem; /* 8px */
}
```

### Responsive Design

**Before:**
```css
.col-md-6 { /* Bootstrap breakpoint */ }
@media (min-width: 768px) { /* md */ }
```

**After:**
```css
.grid {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```

### Spacing

**Before:**
```css
margin-bottom: 16px;
padding: 1rem;
gap: 8px;
```

**After:**
```css
mb-4; /* margin-bottom: 1rem */
p-4;  /* padding: 1rem */
gap-2; /* gap: 0.5rem */
```

### Color Mapping

| Bootstrap | Tailwind | Notes |
|-----------|---------|-------|
| `text-primary` | `text-primary` | Same |
| `text-muted` | `text-muted-foreground` | Semantic token |
| `bg-light` | `bg-muted` | Semantic token |
| `border` | `border` | Same |

---

## Migration Checklist

- [ ] Remove old framework dependencies
- [ ] Install new dependencies
- [ ] Create theme tokens (use THEME-BUILDER.md)
- [ ] Migrate Button component
- [ ] Migrate Card component
- [ ] Migrate Input/Form components
- [ ] Migrate Modal/Dialog
- [ ] Migrate remaining components
- [ ] Run accessibility tests
- [ ] Update documentation

---

## Testing After Migration

```bash
# Run accessibility tests
npm run test:a11y

# Run Playwright tests
npx playwright test

# Run Vitest
npm run test

# Check for console errors
npm run dev
```

---

Last updated: 2026-06-03 (v1.6.3)