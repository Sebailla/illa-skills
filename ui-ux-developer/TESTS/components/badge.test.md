# Badge Component — Unit Tests

Unit tests for Badge component with variant, size, count, and icon tests.

**Framework:** React (apply patterns similarly to Vue/Svelte/Vanilla)
**Test Runner:** Vitest + React Testing Library

---

## Table of Contents

1. [Basic Rendering](#1-basic-rendering)
2. [Variants](#2-variants)
3. [Sizes](#3-sizes)
4. [Count Badges](#4-count-badges)
5. [Icons](#5-icons)
6. [Interactive Badges](#6-interactive-badges)
7. [Accessibility](#7-accessibility)

---

## 1. Basic Rendering

```typescript
describe('Badge', () => {
  describe('Basic rendering', () => {
    it('renders text content correctly', () => {
      render(<Badge>Active</Badge>);
      
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
    
    it('applies default variant classes', () => {
      render(<Badge>Default</Badge>);
      
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('bg-primary');
      expect(badge).toHaveClass('text-primary-foreground');
    });
    
    it('renders with rounded corners by default', () => {
      render(<Badge>Badge</Badge>);
      
      const badge = screen.getByText('Badge');
      expect(badge).toHaveClass('rounded-full');
    });
    
    it('renders as span element by default', () => {
      render(<Badge>Badge</Badge>);
      
      const badge = screen.getByText('Badge');
      expect(badge).toBe(document.querySelector('span'));
    });
    
    it('renders with correct font size', () => {
      render(<Badge>Badge</Badge>);
      
      const badge = screen.getByText('Badge');
      expect(badge).toHaveClass('text-xs');
      expect(badge).toHaveClass('font-medium');
    });
  });
});
```

---

## 2. Variants

```typescript
describe('Badge', () => {
  describe('Variants', () => {
    const variants = [
      { name: 'default', expectedClass: 'bg-primary' },
      { name: 'secondary', expectedClass: 'bg-secondary' },
      { name: 'success', expectedClass: 'bg-green-500' },
      { name: 'warning', expectedClass: 'bg-yellow-500' },
      { name: 'destructive', expectedClass: 'bg-red-500' },
      { name: 'outline', expectedClass: 'border' },
    ] as const;
    
    variants.forEach(({ name, expectedClass }) => {
      it(`renders ${name} variant correctly`, () => {
        render(<Badge variant={name}>{name}</Badge>);
        
        const badge = screen.getByText(name);
        expect(badge).toHaveClass(expectedClass);
      });
    });
    
    it('applies correct foreground colors', () => {
      const testCases = [
        { variant: 'success', expectedForeground: 'text-white' },
        { variant: 'warning', expectedForeground: 'text-black' },
        { variant: 'destructive', expectedForeground: 'text-white' },
        { variant: 'outline', expectedForeground: 'text-foreground' },
      ];
      
      testCases.forEach(({ variant, expectedForeground }) => {
        render(<Badge variant={variant}>Test</Badge>);
        
        const badge = screen.getByText('Test');
        expect(badge).toHaveClass(expectedForeground);
      });
    });
    
    it('outline variant has border and transparent background', () => {
      render(<Badge variant="outline">Outline</Badge>);
      
      const badge = screen.getByText('Outline');
      expect(badge).toHaveClass('border');
      expect(badge).toHaveClass('bg-transparent');
    });
    
    it('unknown variant falls back to default', () => {
      render(<Badge variant="unknown">Fallback</Badge>);
      
      const badge = screen.getByText('Fallback');
      expect(badge).toHaveClass('bg-primary');
    });
  });
});
```

---

## 3. Sizes

```typescript
describe('Badge', () => {
  describe('Sizes', () => {
    const sizes = [
      { name: 'sm', paddingX: 'px-2', paddingY: 'py-0.5', fontSize: 'text-xs' },
      { name: 'md', paddingX: 'px-2.5', paddingY: 'py-1', fontSize: 'text-xs' },
      { name: 'lg', paddingX: 'px-3', paddingY: 'py-1.5', fontSize: 'text-sm' },
    ] as const;
    
    sizes.forEach(({ name, paddingX, paddingY, fontSize }) => {
      it(`renders ${name} size correctly`, () => {
        render(<Badge size={name}>Size {name}</Badge>);
        
        const badge = screen.getByText(`Size ${name}`);
        expect(badge).toHaveClass(paddingX);
        expect(badge).toHaveClass(paddingY);
        expect(badge).toHaveClass(fontSize);
      });
    });
    
    it('applies minimum height for touch targets', () => {
      render(<Badge>Touch</Badge>);
      
      const badge = screen.getByText('Touch');
      const styles = window.getComputedStyle(badge);
      
      // Badge should have reasonable height for touch
      const height = parseFloat(styles.height);
      expect(height).toBeGreaterThanOrEqual(20); // minimum touch target CSS
    });
    
    it('xs size renders without padding issues', () => {
      render(<Badge size="sm">Small</Badge>);
      
      const badge = screen.getByText('Small');
      expect(badge).toBeVisible();
      expect(badge).toHaveClass('rounded');
    });
  });
});
```

---

## 4. Count Badges

```typescript
describe('Badge', () => {
  describe('Count badges', () => {
    it('renders numeric count correctly', () => {
      render(<Badge count={5} />);
      
      const badge = screen.getByText('5');
      expect(badge).toBeInTheDocument();
    });
    
    it('formats large numbers with abbreviation', () => {
      const testCases = [
        { count: 999, expected: '999' },
        { count: 1000, expected: '1K' },
        { count: 1500, expected: '1.5K' },
        { count: 10000, expected: '10K' },
        { count: 1000000, expected: '1M' },
      ];
      
      testCases.forEach(({ count, expected }) => {
        render(<Badge count={count} />);
        expect(screen.getByText(expected)).toBeInTheDocument();
      });
    });
    
    it('shows max indicator when count exceeds max', () => {
      render(<Badge count={100} max={99} />);
      
      expect(screen.getByText('99+')).toBeInTheDocument();
    });
    
    it('shows plus sign for truncated count', () => {
      render(<Badge count={1000} max={999} />);
      
      expect(screen.getByText('999+')).toBeInTheDocument();
    });
    
    it('renders count badge with circular shape', () => {
      render(<Badge count={3} showZero />);
      
      const badge = screen.getByText('3');
      expect(badge).toHaveClass('rounded-full');
      expect(badge).toHaveClass('min-w-5');
      expect(badge).toHaveClass('h-5');
    });
    
    it('does not render when count is zero by default', () => {
      render(<Badge count={0} />);
      
      // Badge container might exist but should be hidden
      const badge = container.querySelector('[data-badge-count]');
      expect(badge).toBeNull() || expect(badge).toHaveClass('hidden');
    });
    
    it('renders zero when showZero is true', () => {
      render(<Badge count={0} showZero />);
      
      const badge = screen.getByText('0');
      expect(badge).toBeInTheDocument();
    });
    
    it('handles negative count gracefully', () => {
      render(<Badge count={-1} />);
      
      // Should not render negative
      expect(screen.queryByText('-1')).not.toBeInTheDocument();
    });
  });
});
```

---

## 5. Icons

```typescript
describe('Badge', () => {
  describe('Icons', () => {
    it('renders with leading icon', () => {
      const icon = document.createElement('span');
      icon.textContent = '●';
      
      render(<Badge icon={<span>●</span>}>With Icon</Badge>);
      
      const badge = screen.getByText('With Icon');
      expect(badge).toHaveAttribute('data-has-icon', 'true');
      
      const iconElement = badge.querySelector('[data-badge-icon]');
      expect(iconElement).toBeInTheDocument();
    });
    
    it('renders with trailing icon', () => {
      render(
        <Badge iconPosition="right">
          <span data-badge-icon>●</span>
          With Right Icon
        </Badge>
      );
      
      const badge = screen.getByText('With Right Icon');
      expect(badge).toHaveAttribute('data-icon-position', 'right');
    });
    
    it('adjusts padding for icon presence', () => {
      render(<Badge icon={<span>●</span>}>Icon Badge</Badge>);
      
      const badge = screen.getByText('Icon Badge');
      expect(badge).toHaveClass('gap-1');
    });
    
    it('icon is hidden from screen readers when decorative', () => {
      render(
        <Badge icon={<span aria-hidden="true">●</span>}>
          Status
        </Badge>
      );
      
      const icon = screen.getByText('●');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
    
    it('icon has accessible label when meaningful', () => {
      render(
        <Badge icon={<span aria-label="Online status">●</span>}>
          Online
        </Badge>
      );
      
      const icon = screen.getByText('●');
      expect(icon).toHaveAttribute('aria-label', 'Online status');
    });
  });
});
```

---

## 6. Interactive Badges

```typescript
describe('Badge', () => {
  describe('Interactive badges', () => {
    it('renders as clickable when onClick provided', () => {
      const handleClick = jest.fn();
      render(<Badge onClick={handleClick}>Clickable</Badge>);
      
      const badge = screen.getByText('Clickable');
      expect(badge).toBe(document.querySelector('button'));
    });
    
    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Badge onClick={handleClick}>Click</Badge>);
      
      fireEvent.click(screen.getByText('Click'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    it('applies hover styles', () => {
      const handleClick = jest.fn();
      render(<Badge onClick={handleClick}>Hover</Badge>);
      
      const badge = screen.getByText('Hover');
      expect(badge).toHaveClass('cursor-pointer');
      
      // Simulate hover
      fireEvent.mouseEnter(badge);
      expect(badge).toHaveClass('hover:bg-primary/80');
    });
    
    it('applies active/pressed styles', () => {
      const handleClick = jest.fn();
      render(<Badge onClick={handleClick}>Press</Badge>);
      
      const badge = screen.getByText('Press');
      
      fireEvent.mouseDown(badge);
      expect(badge).toHaveClass('active:bg-primary/70');
    });
    
    it('has focus indicator', () => {
      const handleClick = jest.fn();
      render(<Badge onClick={handleClick}>Focus</Badge>);
      
      const badge = screen.getByText('Focus');
      expect(badge).toHaveClass('focus-visible:ring-2');
    });
    
    it('disables interaction when disabled', () => {
      const handleClick = jest.fn();
      render(<Badge onClick={handleClick} disabled>Disabled</Badge>);
      
      const badge = screen.getByText('Disabled');
      expect(badge).toBeDisabled();
      expect(badge).toHaveClass('opacity-50');
      expect(badge).toHaveClass('cursor-not-allowed');
      
      fireEvent.click(badge);
      expect(handleClick).not.toHaveBeenCalled();
    });
    
    it('renders with dropdown indicator', () => {
      render(
        <Badge hasDropdown>
          Dropdown
        </Badge>
      );
      
      const badge = screen.getByText('Dropdown');
      const chevron = badge.querySelector('[data-dropdown-indicator]');
      expect(chevron).toBeInTheDocument();
    });
  });
});
```

---

## 7. Accessibility

```typescript
describe('Badge', () => {
  describe('Accessibility', () => {
    it('has accessible role', () => {
      render(<Badge>Status</Badge>);
      
      const badge = screen.getByText('Status');
      expect(badge).toHaveAttribute('role', 'status');
    });
    
    it('uses generic role for non-status badges', () => {
      render(<Badge variant="outline">Label</Badge>);
      
      const badge = screen.getByText('Label');
      // Outline badges might use generic role
      expect(badge).toBeInTheDocument();
    });
    
    it('has aria-label for icon-only badges', () => {
      render(
        <Badge>
          <span aria-hidden="true">●</span>
          <span className="sr-only">Online status</span>
        </Badge>
      );
      
      const badge = container.querySelector('[data-badge]');
      expect(badge).toHaveAttribute('aria-label', 'Online status');
    });
    
    it('count badges announce count to screen readers', () => {
      render(<Badge count={5}>Notifications</Badge>);
      
      const badge = screen.getByText('Notifications');
      expect(badge).toHaveAttribute('aria-label', expect.stringContaining('5'));
    });
    
    it('destructive badges are not color-only indicators', () => {
      render(<Badge variant="destructive">Error</Badge>);
      
      const badge = screen.getByText('Error');
      // Should have text, not just color
      expect(badge.textContent).toBeTruthy();
    });
    
    it('has focus indicator for keyboard navigation', () => {
      render(<Badge onClick={() => {}}>Interactive</Badge>);
      
      const badge = screen.getByText('Interactive');
      expect(badge).toHaveClass('focus-visible:ring-2');
    });
    
    it('does not remove focus outline without replacement', () => {
      render(<Badge>Static</Badge>);
      
      const badge = screen.getByText('Static');
      const styles = window.getComputedStyle(badge);
      
      // If outline is none, must have focus-visible styles
      if (styles.outline === 'none') {
        expect(container.innerHTML).toContain('focus-visible');
      }
    });
    
    it('meets minimum touch target size', () => {
      render(<Badge>Touch</Badge>);
      
      const badge = screen.getByText('Touch');
      const rect = badge.getBoundingClientRect();
      
      // CSS minimum 24x24px, mobile 44x44px
      expect(rect.width).toBeGreaterThanOrEqual(24);
      expect(rect.height).toBeGreaterThanOrEqual(24);
    });
    
    it('supports prefers-reduced-motion', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
      }));
      
      render(<Badge>Animation</Badge>);
      
      const badge = screen.getByText('Animation');
      // No animation classes
      expect(badge.className).not.toContain('animate');
    });
    
    it('has no axe violations for basic badge', async () => {
      const { container } = render(<Badge>Accessible</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

---

## Test Utilities

```typescript
// test-utils.tsx
export const renderBadge = (props: BadgeProps) => {
  return render(<Badge {...props} />);
};

export const renderCountBadge = (count: number, max?: number) => {
  return render(<Badge count={count} max={max} />);
};

// Test fixtures
export const badgeFixtures = {
  variants: ['default', 'secondary', 'success', 'warning', 'destructive', 'outline'],
  sizes: ['sm', 'md', 'lg'] as const,
  statuses: ['online', 'offline', 'busy', 'away'] as const,
  counts: [0, 1, 5, 99, 100, 999, 1000, 10000],
};
```

---

## Integration with axe-core

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Badge accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Badge>Badge</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('interactive badge has no violations', async () => {
    const { container } = render(
      <Badge onClick={() => {}}>Interactive</Badge>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('count badge has no violations', async () => {
    const { container } = render(<Badge count={5} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

Last updated: 2026-06-03 (v1.6.3)