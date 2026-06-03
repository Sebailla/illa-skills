# Component Catalog

ASCII mockups for all UI components. Use as reference when generating or auditing components.

> 💡 **Templates:** Para código real de estos componentes, ver [TEMPLATES/components.react-nextjs.md](./TEMPLATES/components.react-nextjs.md) y otros templates por framework.

---

## Table of Contents

1. [Button](#1-button)
2. [Card](#2-card)
3. [Modal/Dialog](#3-modaldialog)
4. [Input](#4-input)
5. [Form](#5-form)
6. [Navigation](#6-navigation)
7. [Table](#7-table)
8. [Badge](#8-badge)
9. [Avatar](#9-avatar)
10. [Toast/Notification](#10-tonotification)
11. [Tabs](#11-tabs)
12. [Dropdown](#12-dropdown)

---

## 1. Button

### States

```
┌─────────────────┐
│  Primary        │  ← Default
└─────────────────┘

┌─────────────────┐
│  Secondary      │  ← Secondary variant
└─────────────────┘

┌─────────────────┐
│  Outline        │  ← Outline variant
└─────────────────┘

┌─────────────────┐
│  Ghost          │  ← Ghost variant
└─────────────────┘

┌─────────────────┐
│  ⚠️ Destructive │  ← Destructive variant (red)
└─────────────────┘

[ Small ]  [ Medium ]  [ Large ]  [ Icon ]

┌─────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Loading │  │     Disabled    │  │  + New Item     │
└─────────┘  └─────────────────┘  └─────────────────┘
  ↳ spinner        ↳ grayed out       ↳ with icon
```

### Button Group

```
┌────┐ ┌────┐ ┌────┐ ┌────┐
│ 1  │ │ 2  │ │ 3  │ │ 4  │
└────┘ └────┘ └────┘ └────┘
      Segmented control
```

### Usage

```tsx
<Button variant="primary" size="md">Primary</Button>
<Button variant="destructive" loading>Delete</Button>
<Button variant="outline" icon={<PlusIcon />}>Add Item</Button>
```

---

## 2. Card

### Basic Card

```
┌──────────────────────────────────┐
│                                  │
│  ┌─────┐  Card Title             │
│  │ IMG │  Card description text  │
│  └─────┘  that spans multiple   │
│           lines here.            │
│                                  │
│  ┌────────────────────────────┐  │
│  │ Tags: Tag1 Tag2 Tag3       │  │
│  └────────────────────────────┘  │
│                                  │
│  Author • 2 min read • 2024-01  │
└──────────────────────────────────┘
```

### Interactive Card (Hover)

```
┌──────────────────────────────────┐
│  ╔════════════════════════════╗   │  ← Shadow increases
│  ║                          ║   │    on hover
│  ║     Card Title           ║   │
│  ║     Description...        ║   │
│  ║                          ║   │
│  ╚════════════════════════════╝   │
└──────────────────────────────────┘
              ↓
┌──────────────────────────────────┐
│  ██████████████████████████████████  ← Shadow: 0 4px 12px
│  █  Card Title                   █
│  █  Description...               █
│  █  ████████████████████████████ █
└──────────────────────────────────┘
```

### Variants

```
┌────────────┐  ┌────────────┐  ┌────────────┐
│   Default  │  │  Elevated  │  │   Ghost    │
│  border    │  │  no border  │  │  no shadow │
│  shadow-sm │  │  shadow-md  │  │  hover bg  │
└────────────┘  └────────────┘  └────────────┘
```

### Usage

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

---

## 3. Modal/Dialog

### Modal Overlay

```
                            ┌─────────────────────────────┐
                            │  ╔═══════════════════════╗  │
                            │  ║       Title      [X] ║  │
┌─────────────────────────── │  ╠═══════════════════════╣  │
│                           │  ║                       ║  │
│   Background              │  ║  Description text      ║  │
│   (blurred/dimmed)        │  ║  that explains what   ║  │
│                           │  ║  this dialog is for.  ║  │
│                           │  ║                       ║  │
│                           │  ╠═══════════════════════╣  │
│                           │  ║   [Cancel]  [Confirm]║  │
│                           │  ╚═══════════════════════╝  │
└─────────────────────────── └─────────────────────────────┘

         ↳ Backdrop: bg-black/50
```

### Modal Sizes

```
sm:   ┌─────────────────┐
      │  Title    [X]   │
      │  Content        │
      │  [Cancel] [OK]  │
      └─────────────────┘
      max-width: 24rem (384px)

md:   ┌─────────────────────────┐
      │  Title           [X]    │
      │  Content                │
      │  [Cancel]       [OK]    │
      └─────────────────────────┘
      max-width: 32rem (512px)

lg:   ┌───────────────────────────────┐
      │  Title               [X]    │
      │  Content                      │
      │  [Cancel]             [OK]    │
      └───────────────────────────────┘
      max-width: 48rem (768px)

full: ┌───────────────────────────────┐
      │  Title               [X]    │
      │                            │
      │  Content (full width)       │
      │                            │
      │  [Cancel]           [OK]    │
      └───────────────────────────────┘
      max-width: calc(100vw - 2rem)
```

### Usage

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent title="Confirm Action" description="Are you sure?">
    <p>Content goes here</p>
    <DialogActions>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="destructive" onClick={handleConfirm}>Confirm</Button>
    </DialogActions>
  </DialogContent>
</Dialog>
```

---

## 4. Input

### Text Input

```
┌─────────────────────────────────────┐
│                                     │
│  Label *                           │
│  ┌─────────────────────────────────┐│
│  │ Enter text here...              ││  ← placeholder
│  └─────────────────────────────────┘│
│  Hint text below label              │
│                                     │
└─────────────────────────────────────┘
```

### Input with Error

```
┌─────────────────────────────────────┐
│                                     │
│  Email *                           │
│  ┌─────────────────────────────────┐│
│  │ invalid-email                   ││  ← red border
│  └─────────────────────────────────┘│
│  ⚠️ Invalid email format           │  ← error message
│                                     │
└─────────────────────────────────────┘
```

### Input Variants

```
Default:    ┌──────────────────────────┐
            │ Default state          │
            └──────────────────────────┘

With Icon:  ┌──────────────────────────┐
            │ 🔍  Search...          │  ← left icon
            └──────────────────────────┘

            ┌──────────────────────────┐
            │ Show password    👁️      │  ← right icon
            └──────────────────────────┘

Disabled:   ┌──────────────────────────┐
            │ Disabled (grayed)      │
            └──────────────────────────┘

Loading:    ┌──────────────────────────┐
            │ Searching...  ⏳       │  ← loading indicator
            └──────────────────────────┘
```

### Input Sizes

```
xs:  ┌──────────┐  ← h-8, text-xs
sm:  ┌────────────┐  ← h-9, text-sm
md:  ┌──────────────┐  ← h-10, text-sm
lg:  ┌────────────────┐  ← h-12, text-base
```

### Usage

```tsx
<Input 
  type="email" 
  placeholder="you@example.com"
  label="Email"
  required
  error={errors.email}
  leftIcon={<MailIcon />}
/>
```

---

## 5. Form

### Basic Form Layout

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  First Name *                                          │
│  ┌────────────────────────────────┐                  │
│  │ John                           │                  │
│  └────────────────────────────────┘                  │
│                                                        │
│  Last Name *                                           │
│  ┌────────────────────────────────┐                  │
│  │ Doe                           │                  │
│  └────────────────────────────────┘                  │
│                                                        │
│  Email *                                              │
│  ┌────────────────────────────────┐                  │
│  │ john.doe@example.com           │                  │
│  └────────────────────────────────┘                  │
│                                                        │
│  ┌──────────────────────────────┐                      │
│  │ Write your message here...   │                      │
│  │                              │  ← textarea        │
│  │                              │                      │
│  └──────────────────────────────┘                      │
│                                                        │
│        ┌────────────────────────────────┐              │
│        │           Submit              │              │
│        └────────────────────────────────┘              │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Form with Inline Fields

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  ┌─────────────────┐  ┌─────────────────┐               │
│  │ First Name     │  │ Last Name      │               │
│  │ ┌─────────────┐│  │ ┌─────────────┐│               │
│  │ │ John        ││  │ │ Doe         ││               │
│  │ └─────────────┘│  │ └─────────────┘│               │
│  └─────────────────┘  └─────────────────┘               │
│                                                        │
│  ┌────────────────────────────────────┐              │
│  │ Email                              │              │
│  │ ┌──────────────────────────────────┐│              │
│  │ │ john.doe@example.com            ││              │
│  │ └──────────────────────────────────┘│              │
│  └────────────────────────────────────┘              │
│                                                        │
│  [                    Submit                    ]      │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Usage

```tsx
<form onSubmit={handleSubmit}>
  <FormField label="First Name" id="firstName" required error={errors.firstName}>
    <FormInput {...register('firstName')} />
  </FormField>
  <FormField label="Email" id="email" required error={errors.email}>
    <FormInput type="email" {...register('email')} />
  </FormField>
  <FormField label="Message" id="message">
    <FormTextarea {...register('message')} />
  </FormField>
  <Button type="submit">Submit</Button>
</form>
```

---

## 6. Navigation

### Top Navigation

```
┌─────────────────────────────────────────────────────────┐
│  Logo    Home   About   Services ▼   Blog   [Search] [👤]│
│                      ↳ Dropdown on hover                │
└─────────────────────────────────────────────────────────┘
   ↑ active
```

### Sidebar Navigation

```
┌─────────────┬───────────────────────────────────────────┐
│             │                                           │
│  📊 Dashboard│                                           │
│  📁 Projects │                                           │
│  👥 Team    │       Main Content Area                   │
│  ⚙️ Settings │                                           │
│             │                                           │
│             │                                           │
│  ────────── │                                           │
│  Help   ?   │                                           │
└─────────────┴───────────────────────────────────────────┘
  ↳ collapsible
```

### Navigation with Active State

```
┌─────────────┐
│ ● Dashboard │  ← active (filled bg + indicator)
│   Projects  │
│   Team      │
│   Settings  │
└─────────────┘

┌─────────────┐
│   Dashboard │
│   Projects  │
│ ● Team      │  ← active
│   Settings  │
└─────────────┘

  ↳ Indicator: left border or filled background
```

### Mobile Navigation

```
☰  Logo                              ← hamburger + logo

                ☰                    ← hamburger only

Bottom nav:
┌───┬───┬───┬───┬───┐
│ 🏠│ 🔍│ ➕│ 💬│ 👤│
├───┼───┼───┼───┼───┤
│Home│Search│Add│Chat│Profile│
└───┴───┴───┴───┴───┘
  ↳ 44px+ touch targets
```

### Usage

```tsx
<Navigation 
  items={navItems}
  currentPath={pathname}
  mobileMenuTrigger={<MenuIcon />}
/>

// With skip link
<a href="#main-content" className="skip-link">Skip to main content</a>
```

---

## 7. Table

### Basic Table

```
┌──────────────────────────────────────────────────────────┐
│  ☑  │ Name          │ Email              │ Role    │ ⋮ │
├─────┼───────────────┼────────────────────┼─────────┼───┤
│  ☑  │ John Doe      │ john@example.com   │ Admin   │ ⋮ │
│  ☐  │ Jane Smith    │ jane@example.com   │ User    │ ⋮ │
│  ☑  │ Bob Wilson    │ bob@example.com    │ Editor  │ ⋮ │
└─────┴───────────────┴────────────────────┴─────────┴───┘
        ↑ sortable              ↑ sortable
```

### Table with Pagination

```
┌──────────────────────────────────────────────────────────┐
│  Name          │ Email              │ Role    │ Actions │
├───────────────┼────────────────────┼─────────┼─────────┤
│  John Doe      │ john@example.com   │ Admin   │ ⋮ │
│  Jane Smith    │ jane@example.com   │ User    │ ⋮ │
│  Bob Wilson    │ bob@example.com    │ Editor  │ ⋮ │
└───────────────┴────────────────────┴─────────┴─────────┘
                                                        
Showing 1-10 of 156                      [◀ 1 2 3 ... 16 ▶]
```

### Table States

```
Empty:     ┌─────────────────────────────────┐
           │                                 │
           │     📭 No items found           │
           │                                 │
           │     Try adjusting your search   │
           │                                 │
           │        [Clear Filters]          │
           │                                 │
           └─────────────────────────────────┘

Loading:   ┌─────────────────────────────────┐
           │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
           │  ░░░░░░░░░░░░░░░░░░░░░░░░░░  │  ← skeleton
           │  ░░░░░░░░░░░░░░░░░░░░░░░░░░  │    loaders
           └─────────────────────────────────┘
```

### Usage

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
<Pagination total={156} page={page} onPageChange={setPage} />
```

---

## 8. Badge

### Badge Variants

```
Status badges:

┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ Pending │ │  Active │ │   Done  │ │ Warning │ │  Error  │
└─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘
 gray      blue       green      yellow     red

Count badges:

┌────┐   ┌─────┐   ┌──────┐
│ 3  │   │ 12  │   │ 156  │
└────┘   └─────┘   └──────┘
 small     medium    large

With icon:
┌────────────┐  ┌────────────┐
│ ● Online   │  │ ⚠️ Warning │
└────────────┘  └────────────┘
```

### Badge Sizes

```
xs:  ┌────┐  ← text-xs, px-1.5, py-0.5
sm:  ┌──────┐  ← text-xs, px-2, py-1
md:  ┌────────┐  ← text-sm, px-2.5, py-1
lg:  ┌──────────┐  ← text-base, px-3, py-1.5
```

### Usage

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">3</Badge>
<Badge variant="outline" icon={<OnlineIcon />}>Online</Badge>
```

---

## 9. Avatar

### Avatar Sizes

```
xs:  (24px)  ┌──┐
                 └──┘

sm:  (32px)  ┌────┐
               └────┘

md:  (40px)  ┌──────┐
               └──────┘

lg:  (48px)  ┌────────┐
               └────────┘

xl:  (64px)  ┌──────────┐
               └──────────┘

2xl: (96px) ┌────────────┐
               └────────────┘
```

### Avatar States

```
With image:
┌────────┐
│  👤   │  ← actual photo
└────────┘

Fallback (initials):
┌────────┐
│  JD   │  ← first + last name initials
└────────┘

Fallback (icon):
┌────────┐
│  👤   │  ← generic user icon
└────────┘

With status:
┌────────┐
│  JD ●  │  ← status dot (online/offline)
└────────┘

With border:
┌────────┐
│  JD    │  ← ring-2 ring-primary
└────────┘
```

### Avatar Group

```
┌──────────────────────────────────────┐
│  👤👤👤 +5                           │  ← stacked with count
└──────────────────────────────────────┘

┌────────┬────────┬────────┬────────┐
│  JD    │  JS    │  BW    │  +5    │
└────────┴────────┴────────┴────────┘
  overlap-8px
```

### Usage

```tsx
<Avatar src={user.avatar} alt={user.name} />
<Avatar name="John Doe" size="lg" />
<Avatar status="online" />
<AvatarGroup users={teamMembers} max={4} />
```

---

## 10. Toast/Notification

### Toast Position

```
Top-Right (default):
                    ┌─────────────────┐
                    │ ✓ Success!       │  ← toasts stack
                    └─────────────────┘
                    ┌─────────────────┐
                    │ ⚠️ Warning       │
                    └─────────────────┘

Center:
              ┌─────────────────┐
              │   ⏳ Loading...  │
              └─────────────────┘

Bottom-Right:
                    ┌─────────────────┐
                    │   ✓ Saved       │
                    └─────────────────┘
                    ┌─────────────────┐
                    │   ✕ Error       │
                    └─────────────────┘
```

### Toast Variants

```
┌────────────────────────────────────────┐
│ ✓ Success! Your changes were saved. [×]│  ← green left border
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ⚠️ Warning: Please review before submitting. [×]│  ← yellow
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ✕ Error: Something went wrong. Please try again. [×]│  ← red
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ℹ️ Info: New features available. [×]   │  ← blue
└────────────────────────────────────────┘
```

### Toast Anatomy

```
┌─────────────────────────────────────────┐
│ ● │ Title                    [×]        │  ← icon + title + close
│   │ Description text                    │  ← optional description
│   │                    [Action] [Action]│  ← optional actions
│   │ ████████████░░░░░░░░░░░░░░         │  ← progress bar (auto-dismiss)
└─────────────────────────────────────────┘
```

### Usage

```tsx
<ToastContainer>
  <Toast variant="success" title="Saved" description="Your changes were saved.">
    <ToastAction onClick={handleUndo}>Undo</ToastAction>
    <ToastClose />
  </Toast>
</ToastContainer>
```

---

## 11. Tabs

### Horizontal Tabs

```
┌─────────────────────────────────────────────────────────┐
│  Overview  │  Members  │  Settings  │  Billing  │        │
├────────────┴───────────┴────────────┴──────────┴────────┤
│                                                         │
│  Tab content goes here...                               │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
    ↑ active tab (border-bottom)
```

### Vertical Tabs

```
┌──────────────────────┬──────────────────────────────────┐
│                      │                                  │
│  ◉ Overview         │                                  │
│    Members           │       Tab content                │
│    Settings          │                                  │
│    Billing          │                                  │
│                      │                                  │
│                      │                                  │
└──────────────────────┴──────────────────────────────────┘
  ↑ active (bg fill)
```

### Tab States

```
Default:   Tab Name
Hover:     Tab Name (lighter bg on hover)
Active:    Tab Name (underline or filled bg)
Disabled:  Tab Name (opacity-50, no pointer)
```

### Usage

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="members">Members</TabsTrigger>
    <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Content...</TabsContent>
  <TabsContent value="members">Content...</TabsContent>
</Tabs>
```

---

## 12. Dropdown

### Dropdown Menu

```
┌────────────────────────────────┐
│  Option 1                     │  ← default item
├────────────────────────────────┤
│  ● Option 2 (selected)        │  ← with checkmark
├────────────────────────────────┤
│  Option 3                     │
├────────────────────────────────┤
│  ⚠️ Option 4 (warning)        │  ← danger variant
├────────────────────────────────┤
│  ───────────────────────────  │  ← separator
├────────────────────────────────┤
│  🖥️ Option 5 with icon       │
│  📁 Option 6 with icon        │
└────────────────────────────────┘
```

### Dropdown with Groups

```
┌────────────────────────────────┐
│  Recent                         │  ← group label
├────────────────────────────────┤
│  📁 Project Alpha               │
│  📁 Project Beta               │
├────────────────────────────────┤
│  All Projects                  │  ← link style
└────────────────────────────────┘
```

### Dropdown Trigger Variants

```
Button trigger:    ┌─────────────────┐
                    │ Actions  ▼      │
                    └─────────────────┘

Icon trigger:       [⚙️]  ← settings icon

Text trigger:       Actions ▼  ← plain text with chevron

Avatar trigger:     ┌──┐  ← avatar with chevron
                    └──┘ ▼
```

### Usage

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions ▼</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Quick Reference

### Component Checklist

When generating components, ensure:

- [ ] All interactive elements have `cursor: pointer` or appropriate cursor
- [ ] Focus states are visible
- [ ] Touch targets are ≥ 44px on mobile
- [ ] Loading states show spinners or skeletons
- [ ] Error states display messages clearly
- [ ] Empty states guide the user
- [ ] Disabled states are clearly marked
- [ ] Icons have `aria-hidden="true"` or labels

### Accessibility Checklist

- [ ] All inputs have associated labels
- [ ] Error messages are announced
- [ ] Modal traps focus correctly
- [ ] Dropdown closes on Escape
- [ ] Tables have proper headers
- [ ] Navigation is keyboard accessible

---

Last updated: 2026-06-03 (v1.6.3)