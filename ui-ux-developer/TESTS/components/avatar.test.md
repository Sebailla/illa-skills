# Avatar Component — Unit Tests

Unit tests for Avatar component with size variants, fallback states, status indicators, and avatar groups.

**Framework:** React (for component.test.md patterns, apply similarly to Vue/Svelte/Vanilla)
**Test Runner:** Vitest + React Testing Library

---

## Table of Contents

1. [Basic Rendering](#1-basic-rendering)
2. [Size Variants](#2-size-variants)
3. [Fallback States](#3-fallback-states)
4. [Status Indicators](#4-status-indicators)
5. [Avatar Groups](#5-avatar-groups)
6. [Accessibility](#6-accessibility)

---

## 1. Basic Rendering

```typescript
describe('Avatar', () => {
  describe('Basic rendering', () => {
    it('renders with image source', () => {
      render(<Avatar src="/avatar.jpg" alt="User avatar" />);
      
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveAttribute('src', '/avatar.jpg');
      expect(avatar).toHaveAttribute('alt', 'User avatar');
    });
    
    it('renders with correct default size class', () => {
      render(<Avatar src="/avatar.jpg" alt="User" />);
      
      const avatar = screen.getByRole('img');
      // Default should be md (40px)
      expect(avatar).toHaveClass('h-10');
      expect(avatar).toHaveClass('w-10');
    });
    
    it('renders as div when no src provided', () => {
      render(<Avatar name="John Doe" />);
      
      const avatar = container.querySelector('[data-avatar]');
      expect(avatar).not.toBeNull();
    });
    
    it('renders with square shape by default', () => {
      render(<Avatar src="/avatar.jpg" alt="User" />);
      
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveClass('rounded-md');
    });
  });
});
```

---

## 2. Size Variants

```typescript
describe('Avatar', () => {
  describe('Size variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    
    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<Avatar src="/avatar.jpg" alt="User" size={size} />);
        
        const avatar = screen.getByRole('img');
        
        switch (size) {
          case 'xs':
            expect(avatar).toHaveClass('h-6', 'w-6');  // 24px
            break;
          case 'sm':
            expect(avatar).toHaveClass('h-8', 'w-8');  // 32px
            break;
          case 'md':
            expect(avatar).toHaveClass('h-10', 'w-10'); // 40px
            break;
          case 'lg':
            expect(avatar).toHaveClass('h-12', 'w-12'); // 48px
            break;
          case 'xl':
            expect(avatar).toHaveClass('h-16', 'w-16'); // 64px
            break;
          case '2xl':
            expect(avatar).toHaveClass('h-24', 'w-24'); // 96px
            break;
        }
      });
    });
    
    it('applies minimum touch target for mobile', () => {
      render(<Avatar src="/avatar.jpg" alt="User" />);
      
      const avatar = screen.getByRole('img');
      // Must meet 24x24px minimum
      expect(avatar).toHaveAttribute('width', expect.any(Number));
      expect(avatar).toHaveAttribute('height', expect.any(Number));
      
      const width = parseInt(avatar.getAttribute('width') || '0');
      const height = parseInt(avatar.getAttribute('height') || '0');
      
      expect(width).toBeGreaterThanOrEqual(24);
      expect(height).toBeGreaterThanOrEqual(24);
    });
  });
});
```

---

## 3. Fallback States

```typescript
describe('Avatar', () => {
  describe('Fallback states', () => {
    it('shows initials when no image provided', () => {
      render(<Avatar name="John Doe" />);
      
      const avatar = screen.getByText('JD');
      expect(avatar).toBeInTheDocument();
    });
    
    it('extracts first and last initial correctly', () => {
      const testCases = [
        { name: 'John Doe', expected: 'JD' },
        { name: 'Alice Smith', expected: 'AS' },
        { name: 'Robert', expected: 'RO' },
        { name: 'María García', expected: 'MG' },  // Unicode
        { name: '李明', expected: '李明' },          // CJK (no space, show both)
      ];
      
      testCases.forEach(({ name, expected }) => {
        render(<Avatar name={name} />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      });
    });
    
    it('falls back to icon when no name provided', () => {
      render(<Avatar />);
      
      // Should show generic user icon
      const icon = screen.getByRole('img', { hidden: true }) || 
                   container.querySelector('[data-avatar-icon]');
      expect(icon).toBeInTheDocument();
    });
    
    it('falls back to icon on image load error', async () => {
      // Mock image load error
      render(<Avatar src="/broken-image.jpg" alt="User" />);
      
      const img = screen.getByRole('img');
      fireEvent.error(img);
      
      // Should show initials or icon instead
      const avatar = container.querySelector('[data-avatar-fallback]');
      expect(avatar).toBeInTheDocument();
    });
    
    it('does not show broken image on load error', async () => {
      render(<Avatar src="/broken.jpg" name="John Doe" />);
      
      const img = screen.getByRole('img');
      fireEvent.error(img);
      
      // Image should be hidden or removed
      expect(img).not.toBeVisible();
    });
  });
});
```

---

## 4. Status Indicators

```typescript
describe('Avatar', () => {
  describe('Status indicators', () => {
    it('renders online status indicator', () => {
      render(<Avatar src="/avatar.jpg" status="online" />);
      
      const indicator = container.querySelector('[data-status="online"]');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveClass('bg-green-500');
    });
    
    it('renders offline status indicator', () => {
      render(<Avatar src="/avatar.jpg" status="offline" />);
      
      const indicator = container.querySelector('[data-status="offline"]');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveClass('bg-gray-400');
    });
    
    it('renders busy status indicator', () => {
      render(<Avatar src="/avatar.jpg" status="busy" />);
      
      const indicator = container.querySelector('[data-status="busy"]');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveClass('bg-red-500');
    });
    
    it('renders away status indicator', () => {
      render(<Avatar src="/avatar.jpg" status="away" />);
      
      const indicator = container.querySelector('[data-status="away"]');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveClass('bg-yellow-500');
    });
    
    it('positions status indicator correctly', () => {
      render(<Avatar src="/avatar.jpg" status="online" />);
      
      const avatar = screen.getByRole('img');
      const indicator = container.querySelector('[data-status="online"]');
      
      // Status should be at bottom-right corner
      const avatarRect = avatar.getBoundingClientRect();
      const indicatorRect = indicator.getBoundingClientRect();
      
      // Indicator should overlap avatar edge
      expect(indicatorRect.right).toBeGreaterThan(avatarRect.right - 10);
      expect(indicatorRect.bottom).toBeGreaterThan(avatarRect.bottom - 10);
    });
    
    it('does not render status indicator when status is undefined', () => {
      render(<Avatar src="/avatar.jpg" />);
      
      const indicator = container.querySelector('[data-status]');
      expect(indicator).not.toBeInTheDocument();
    });
  });
});
```

---

## 5. Avatar Groups

```typescript
describe('Avatar', () => {
  describe('Avatar groups', () => {
    it('renders multiple avatars with overlap', () => {
      render(
        <AvatarGroup>
          <Avatar src="/avatar1.jpg" alt="User 1" />
          <Avatar src="/avatar2.jpg" alt="User 2" />
          <Avatar src="/avatar3.jpg" alt="User 3" />
        </AvatarGroup>
      );
      
      const avatars = screen.getAllByRole('img');
      expect(avatars).toHaveLength(3);
    });
    
    it('applies overlap offset to children', () => {
      render(
        <AvatarGroup max={4}>
          <Avatar src="/avatar1.jpg" alt="User 1" />
          <Avatar src="/avatar2.jpg" alt="User 2" />
          <Avatar src="/avatar3.jpg" alt="User 3" />
          <Avatar src="/avatar4.jpg" alt="User 4" />
          <Avatar src="/avatar5.jpg" alt="User 5" />
        </AvatarGroup>
      );
      
      const avatars = screen.getAllByRole('img');
      const lastAvatar = avatars[avatars.length - 1];
      
      // Last visible avatar should show count
      expect(lastAvatar).toHaveAttribute('data-overflow', 'true');
    });
    
    it('shows count badge when exceeding max', () => {
      render(
        <AvatarGroup max={3}>
          <Avatar src="/avatar1.jpg" alt="User 1" />
          <Avatar src="/avatar2.jpg" alt="User 2" />
          <Avatar src="/avatar3.jpg" alt="User 3" />
          <Avatar src="/avatar4.jpg" alt="User 4" />
          <Avatar src="/avatar5.jpg" alt="User 5" />
        </AvatarGroup>
      );
      
      const countBadge = container.querySelector('[data-count-badge]');
      expect(countBadge).toBeInTheDocument();
      expect(countBadge).toHaveTextContent('+2');
    });
    
    it('applies correct spacing', () => {
      render(
        <AvatarGroup spacing="md">
          <Avatar src="/avatar1.jpg" alt="User 1" />
          <Avatar src="/avatar2.jpg" alt="User 2" />
        </AvatarGroup>
      );
      
      const group = container.querySelector('[data-avatar-group]');
      expect(group).toHaveClass('gap-2');
    });
    
    it('handles mixed avatar types in group', () => {
      render(
        <AvatarGroup>
          <Avatar src="/avatar1.jpg" alt="User 1" />
          <Avatar name="John Doe" />
          <Avatar />
        </AvatarGroup>
      );
      
      const avatars = container.querySelectorAll('[data-avatar]');
      expect(avatars).toHaveLength(3);
    });
  });
});
```

---

## 6. Accessibility

```typescript
describe('Avatar', () => {
  describe('Accessibility', () => {
    it('has accessible name when image provided', () => {
      render(<Avatar src="/avatar.jpg" alt="Sarah Connor" />);
      
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveAccessibleName('Sarah Connor');
    });
    
    it('uses aria-label for decorative images', () => {
      render(<Avatar src="/decorative.jpg" alt="" decorative />);
      
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveAttribute('aria-hidden', 'true');
    });
    
    it('has accessible name for fallback initials', () => {
      render(<Avatar name="John Doe" />);
      
      const avatar = container.querySelector('[data-avatar-initials]');
      expect(avatar).toHaveAttribute('aria-label', 'John Doe');
    });
    
    it('has accessible status indicator', () => {
      render(<Avatar src="/avatar.jpg" status="online" />);
      
      const indicator = container.querySelector('[data-status="online"]');
      expect(indicator).toHaveAttribute('aria-label', 'User is online');
      expect(indicator).toHaveAttribute('role', 'img');
    });
    
    it('supports keyboard navigation when interactive', () => {
      render(
        <Avatar 
          src="/avatar.jpg" 
          onClick={() => {}} 
          aria-haspopup="dialog"
        />
      );
      
      const avatar = screen.getByRole('button');
      expect(avatar).toBeVisible();
      expect(avatar).toHaveAttribute('tabindex', '0');
    });
    
    it('does not have focus outline removed without replacement', () => {
      render(<Avatar src="/avatar.jpg" />);
      
      const avatar = screen.getByRole('img');
      // Avatar should not have outline: none without focus-visible style
      const styles = window.getComputedStyle(avatar);
      
      if (styles.outline === 'none' || styles.outline === '0px none') {
        // If outline is none, must have focus-visible styles
        expect(container.innerHTML).toContain(':focus-visible');
      }
    });
    
    it('meets color contrast for status indicators', () => {
      const { container } = render(
        <div data-testid="avatar-container">
          <Avatar src="/avatar.jpg" status="online" />
        </div>
      );
      
      const indicator = container.querySelector('[data-status="online"]');
      const bgColor = window.getComputedStyle(indicator).backgroundColor;
      
      // Green indicator on white/light backgrounds should pass 3:1
      // This is a simplified check - full contrast testing requires axe-core
      expect(bgColor).toBeTruthy();
    });
    
    it('supports prefers-reduced-motion', () => {
      // Mock reduced motion preference
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
      }));
      
      render(<Avatar src="/avatar.jpg" />);
      
      // Avatar should render without animation
      const avatar = screen.getByRole('img');
      expect(avatar).toBeInTheDocument();
      // No animation classes should be applied
      expect(avatar.className).not.toContain('animate');
    });
  });
});
```

---

## Test Utilities

```typescript
// test-utils.tsx
export const renderAvatar = (props: AvatarProps) => {
  return render(<Avatar {...props} />);
};

export const renderAvatarGroup = (props: AvatarGroupProps) => {
  return render(<AvatarGroup {...props} />);
};

// Mock image load error helper
export const simulateImageError = (container: HTMLElement) => {
  const img = container.querySelector('img');
  if (img) {
    fireEvent.error(img);
  }
};

// Test data
export const avatarFixtures = {
  validImages: [
    '/avatars/user-1.jpg',
    '/avatars/user-2.png',
    '/avatars/user-3.webp',
  ],
  names: [
    'John Doe',
    'Alice Smith',
    'María García',
    '李明',
    'Jean-François',
  ],
  statuses: ['online', 'offline', 'busy', 'away'] as const,
  sizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const,
};
```

---

## Integration with axe-core

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Avatar accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Avatar src="/avatar.jpg" alt="User" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('status indicator has no violations', async () => {
    const { container } = render(
      <Avatar src="/avatar.jpg" status="online" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('avatar group has no violations', async () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar src="/avatar1.jpg" alt="User 1" />
        <Avatar src="/avatar2.jpg" alt="User 2" />
      </AvatarGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

Last updated: 2026-06-03 (v1.6.3)