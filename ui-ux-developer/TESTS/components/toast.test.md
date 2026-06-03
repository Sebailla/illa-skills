# Toast Component — Unit Tests

Unit tests for Toast component with variants, positions, auto-dismiss, and accessibility tests.

**Framework:** React (apply patterns similarly to Vue/Svelte/Vanilla)
**Test Runner:** Vitest + React Testing Library

---

## Table of Contents

1. [Basic Rendering](#1-basic-rendering)
2. [Variants](#2-variants)
3. [Positions](#3-positions)
4. [Auto-Dismiss](#4-auto-dismiss)
5. [Actions](#5-actions)
6. [Groups and Stacking](#6-groups-and-stacking)
7. [Accessibility](#7-accessibility)

---

## 1. Basic Rendering

```typescript
describe('Toast', () => {
  describe('Basic rendering', () => {
    it('renders title correctly', () => {
      render(<Toast title="Notification" />);
      
      expect(screen.getByText('Notification')).toBeInTheDocument();
    });
    
    it('renders description when provided', () => {
      render(<Toast title="Title" description="Details here" />);
      
      expect(screen.getByText('Details here')).toBeInTheDocument();
    });
    
    it('applies default variant classes', () => {
      render(<Toast title="Default Toast" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toHaveClass('bg-white');
      expect(toast).toHaveClass('border');
    });
    
    it('renders with rounded corners', () => {
      render(<Toast title="Rounded" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toHaveClass('rounded-lg');
    });
    
    it('renders close button by default', () => {
      render(<Toast title="Closable" />);
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });
    
    it('renders with shadow by default', () => {
      render(<Toast title="Shadow" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toHaveClass('shadow-lg');
    });
    
    it('renders content within proper structure', () => {
      render(<Toast title="Structured" description="Desc" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toHaveAttribute('data-toast');
      
      const title = toast.querySelector('[data-toast-title]');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Structured');
    });
  });
});
```

---

## 2. Variants

```typescript
describe('Toast', () => {
  describe('Variants', () => {
    const variants = [
      { name: 'default', expectedClasses: ['bg-white', 'border-gray-200'] },
      { name: 'success', expectedClasses: ['bg-green-50', 'border-green-500'] },
      { name: 'warning', expectedClasses: ['bg-yellow-50', 'border-yellow-500'] },
      { name: 'error', expectedClasses: ['bg-red-50', 'border-red-500'] },
      { name: 'info', expectedClasses: ['bg-blue-50', 'border-blue-500'] },
    ] as const;
    
    variants.forEach(({ name, expectedClasses }) => {
      it(`renders ${name} variant correctly`, () => {
        render(<Toast title="Test" variant={name} />);
        
        const toast = screen.getByRole('status');
        expectedClasses.forEach(cls => {
          expect(toast).toHaveClass(cls);
        });
      });
    });
    
    it('applies left border indicator for variants', () => {
      render(<Toast title="With Border" variant="success" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toHaveClass('border-l-4');
    });
    
    it('renders variant icon when present', () => {
      render(<Toast title="Success" variant="success" />);
      
      const icon = container.querySelector('[data-toast-icon]');
      expect(icon).toBeInTheDocument();
    });
    
    it('icon color matches variant', () => {
      const iconColors: Record<string, string> = {
        success: 'text-green-500',
        warning: 'text-yellow-500',
        error: 'text-red-500',
        info: 'text-blue-500',
      };
      
      Object.entries(iconColors).forEach(([variant, expectedColor]) => {
        render(<Toast title="Icon Test" variant={variant as any} />);
        
        const icon = container.querySelector('[data-toast-icon]');
        expect(icon).toHaveClass(expectedColor);
      });
    });
  });
});
```

---

## 3. Positions

```typescript
describe('Toast', () => {
  describe('Positions', () => {
    const positions = [
      { name: 'top-right', expectedClasses: ['top-4', 'right-4'] },
      { name: 'top-left', expectedClasses: ['top-4', 'left-4'] },
      { name: 'bottom-right', expectedClasses: ['bottom-4', 'right-4'] },
      { name: 'bottom-left', expectedClasses: ['bottom-4', 'left-4'] },
      { name: 'top-center', expectedClasses: ['top-4', 'left-1/2', 'translate-x-1/2'] },
      { name: 'bottom-center', expectedClasses: ['bottom-4', 'left-1/2', 'translate-x-1/2'] },
    ] as const;
    
    positions.forEach(({ name, expectedClasses }) => {
      it(`renders at ${name} position correctly`, () => {
        render(<Toast title="Positioned" position={name as any} />);
        
        const toast = screen.getByRole('status');
        expectedClasses.forEach(cls => {
          expect(toast).toHaveClass(cls);
        });
      });
    });
    
    it('top positions have top spacing', () => {
      render(<Toast title="Top" position="top-right" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toHaveClass('top-4');
    });
    
    it('bottom positions have bottom spacing', () => {
      render(<Toast title="Bottom" position="bottom-right" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toHaveClass('bottom-4');
    });
    
    it('center positions are centered horizontally', () => {
      render(<Toast title="Center" position="top-center" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toHaveClass('left-1/2');
      expect(toast).toHaveClass('-translate-x-1/2');
    });
  });
});
```

---

## 4. Auto-Dismiss

```typescript
describe('Toast', () => {
  describe('Auto-dismiss', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    
    afterEach(() => {
      jest.useRealTimers();
    });
    
    it('auto-dismisses after default duration', () => {
      const onDismiss = jest.fn();
      render(<Toast title="Auto" onDismiss={onDismiss} />);
      
      // Default duration is typically 5000ms
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
    
    it('uses custom duration when provided', () => {
      const onDismiss = jest.fn();
      render(<Toast title="Custom" duration={3000} onDismiss={onDismiss} />);
      
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
    
    it('does not auto-dismiss when duration is 0', () => {
      const onDismiss = jest.fn();
      render(<Toast title="Persistent" duration={0} onDismiss={onDismiss} />);
      
      act(() => {
        jest.advanceTimersByTime(10000);
      });
      
      expect(onDismiss).not.toHaveBeenCalled();
    });
    
    it('pauses timer on hover', () => {
      const onDismiss = jest.fn();
      render(<Toast title="Pause" duration={5000} onDismiss={onDismiss} />);
      
      // Advance 2 seconds
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      // Hover over toast
      const toast = screen.getByRole('status');
      fireEvent.mouseEnter(toast);
      
      // Advance another 3 seconds while hovered
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      // Should not have dismissed yet
      expect(onDismiss).not.toHaveBeenCalled();
    });
    
    it('resumes timer after mouse leave', () => {
      const onDismiss = jest.fn();
      render(<Toast title="Resume" duration={5000} onDismiss={onDismiss} />);
      
      // Advance 2 seconds
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      const toast = screen.getByRole('status');
      fireEvent.mouseEnter(toast);
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      fireEvent.mouseLeave(toast);
      
      // Advance remaining 3 seconds
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
    
    it('shows progress bar during countdown', () => {
      render(<Toast title="Progress" duration={5000} />);
      
      const progressBar = container.querySelector('[data-toast-progress]');
      expect(progressBar).toBeInTheDocument();
      
      // Advance 2.5 seconds (50%)
      act(() => {
        jest.advanceTimersByTime(2500);
      });
      
      // Progress should be at ~50% (allow 2px tolerance for rounding)
      const widthValue = progressBar.style.width;
      const numericValue = parseFloat(widthValue.replace('%', ''));
      expect(numericValue).toBeGreaterThanOrEqual(48);
      expect(numericValue).toBeLessThanOrEqual(52);
    });
    
    it('pauses progress on hover', () => {
      render(<Toast title="Pause Progress" duration={5000} />);
      
      const progressBar = container.querySelector('[data-toast-progress]');
      
      // Advance 2 seconds
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      const toast = screen.getByRole('status');
      fireEvent.mouseEnter(toast);
      
      // Progress should freeze at ~40%
      const width = progressBar.style.width;
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      // Width should remain the same
      expect(progressBar.style.width).toBe(width);
    });
  });
});
```

---

## 5. Actions

```typescript
describe('Toast', () => {
  describe('Actions', () => {
    it('renders action button when provided', () => {
      render(
        <Toast 
          title="Action" 
          action={<button>Undo</button>}
        />
      );
      
      expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
    });
    
    it('renders multiple actions', () => {
      render(
        <Toast 
          title="Multi" 
          action={
            <>
              <button>Cancel</button>
              <button>Confirm</button>
            </>
          }
        />
      );
      
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });
    
    it('action buttons have correct styling', () => {
      render(
        <Toast 
          title="Styled Actions" 
          action={<button>Action</button>}
        />
      );
      
      const button = screen.getByRole('button', { name: 'Action' });
      expect(button).toHaveClass('font-medium');
      expect(button).toHaveClass('text-sm');
    });
    
    it('action calls onAction when clicked', () => {
      const handleAction = jest.fn();
      render(
        <Toast 
          title="Action Handler" 
          action={<button onClick={handleAction}>Do it</button>}
        />
      );
      
      fireEvent.click(screen.getByRole('button', { name: 'Do it' }));
      expect(handleAction).toHaveBeenCalledTimes(1);
    });
    
    it('close button calls onDismiss', () => {
      const onDismiss = jest.fn();
      render(<Toast title="Dismiss" onDismiss={onDismiss} />);
      
      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
    
    it('action does not trigger dismiss', () => {
      const onDismiss = jest.fn();
      render(
        <Toast 
          title="No Dismiss" 
          duration={5000}
          onDismiss={onDismiss}
          action={<button>Action</button>}
        />
      );
      
      fireEvent.click(screen.getByRole('button', { name: 'Action' }));
      
      // Should not have dismissed
      expect(onDismiss).not.toHaveBeenCalled();
    });
  });
});
```

---

## 6. Groups and Stacking

```typescript
describe('Toast', () => {
  describe('Groups and stacking', () => {
    it('renders multiple toasts in a group', () => {
      render(
        <ToastGroup>
          <Toast title="First" />
          <Toast title="Second" />
          <Toast title="Third" />
        </ToastGroup>
      );
      
      const toasts = screen.getAllByRole('status');
      expect(toasts).toHaveLength(3);
    });
    
    it('stacks toasts vertically', () => {
      render(
        <ToastGroup>
          <Toast title="Top" />
          <Toast title="Bottom" />
        </ToastGroup>
      );
      
      const toasts = screen.getAllByRole('status');
      const [top, bottom] = toasts;
      
      // Bottom toast should be below top toast
      expect(bottom.getBoundingClientRect().top).toBeGreaterThan(
        top.getBoundingClientRect().bottom
      );
    });
    
    it('limits visible toasts when max specified', () => {
      render(
        <ToastGroup maxVisible={2}>
          <Toast title="1" />
          <Toast title="2" />
          <Toast title="3" />
          <Toast title="4" />
        </ToastGroup>
      );
      
      const visibleToasts = container.querySelectorAll('[data-toast]:not([data-collapsed])');
      expect(visibleToasts).toHaveLength(2);
    });
    
    it('shows collapse indicator for hidden toasts', () => {
      render(
        <ToastGroup maxVisible={2}>
          <Toast title="Visible 1" />
          <Toast title="Visible 2" />
          <Toast title="Hidden" />
        </ToastGroup>
      );
      
      const collapseIndicator = container.querySelector('[data-toast-collapse]');
      expect(collapseIndicator).toBeInTheDocument();
      expect(collapseIndicator).toHaveTextContent('+1');
    });
    
    it('collapses older toasts when limit reached', () => {
      render(
        <ToastGroup maxVisible={2}>
          <Toast title="Oldest" />
          <Toast title="Middle" />
          <Toast title="Newest" />
        </ToastGroup>
      );
      
      const oldest = container.querySelector('[data-toast="Oldest"]');
      expect(oldest).toHaveAttribute('data-collapsed', 'true');
    });
    
    it('expands collapsed toasts on click', () => {
      render(
        <ToastGroup maxVisible={2}>
          <Toast title="1" />
          <Toast title="2" />
          <Toast title="3" />
        </ToastGroup>
      );
      
      const expandButton = container.querySelector('[data-toast-collapse]');
      fireEvent.click(expandButton);
      
      const allToasts = screen.getAllByRole('status');
      expect(allToasts).toHaveLength(3);
    });
    
    it('applies gap between stacked toasts', () => {
      render(
        <ToastGroup gap="md">
          <Toast title="Gap" />
          <Toast title="Test" />
        </ToastGroup>
      );
      
      const toasts = screen.getAllByRole('status');
      expect(toasts[0]).toHaveClass('mb-2');
    });
    
    it('supports different gap sizes', () => {
      const gaps: Record<string, string> = {
        sm: 'mb-1',
        md: 'mb-2',
        lg: 'mb-4',
      };
      
      Object.entries(gaps).forEach(([size, expectedClass]) => {
        const { container } = render(
          <ToastGroup gap={size as any}>
            <Toast title="1" />
            <Toast title="2" />
          </ToastGroup>
        );
        
        const toasts = container.querySelectorAll('[data-toast]');
        expect(toasts[0]).toHaveClass(expectedClass);
      });
    });
  });
});
```

---

## 7. Accessibility

```typescript
describe('Toast', () => {
  describe('Accessibility', () => {
    it('has role status for announcements', () => {
      render(<Toast title="Announcement" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toBeInTheDocument();
    });
    
    it('has aria-live attribute for screen readers', () => {
      render(<Toast title="Live" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });
    
    it('has aria-atomic for complete announcement', () => {
      render(<Toast title="Atomic" description="Details" />);
      
      const toast = screen.getByRole('status');
      expect(toast).toHaveAttribute('aria-atomic', 'true');
    });
    
    it('close button has accessible name', () => {
      render(<Toast title="Closable" />);
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toHaveAttribute('aria-label', expect.stringContaining('close'));
    });
    
    it('action buttons have descriptive text', () => {
      render(
        <Toast 
          title="File deleted" 
          action={<button>Undo</button>}
        />
      );
      
      const actionButton = screen.getByRole('button', { name: 'Undo' });
      expect(actionButton).toBeInTheDocument();
    });
    
    it('does not steal focus from page content', () => {
      render(<Toast title="Non-intrusive" />);
      
      const toast = screen.getByRole('status');
      expect(toast).not.toHaveAttribute('tabindex', '0');
    });
    
    it('toast group does not have focus trap', () => {
      render(
        <ToastGroup>
          <Toast title="1" />
          <Toast title="2" />
        </ToastGroup>
      );
      
      const group = container.querySelector('[data-toast-group]');
      expect(group).not.toHaveAttribute('role', 'dialog');
    });
    
    it('supports keyboard dismiss with Escape', () => {
      const onDismiss = jest.fn();
      render(<Toast title="Escape" onDismiss={onDismiss} />);
      
      const toast = screen.getByRole('status');
      fireEvent.keyDown(toast, { key: 'Escape' });
      
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
    
    it('progress bar is hidden from screen readers', () => {
      render(<Toast title="Progress" duration={5000} />);
      
      const progressBar = container.querySelector('[data-toast-progress]');
      expect(progressBar).toHaveAttribute('aria-hidden', 'true');
    });
    
    it('variant icons have aria-hidden when decorative', () => {
      render(<Toast title="Icon" variant="success" />);
      
      const icon = container.querySelector('[data-toast-icon]');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
    
    it('has focus indicator for interactive toasts', () => {
      render(<Toast title="Interactive" action={<button>Action</button>} />);
      
      const actionButton = screen.getByRole('button', { name: 'Action' });
      expect(actionButton).toHaveClass('focus-visible:ring-2');
    });
    
    it('supports prefers-reduced-motion', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
      }));
      
      render(<Toast title="Reduced" duration={5000} />);
      
      // Should not show progress bar
      const progressBar = container.querySelector('[data-toast-progress]');
      expect(progressBar).not.toBeInTheDocument();
    });
    
    it('has no axe violations for basic toast', async () => {
      const { container } = render(<Toast title="Accessible" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    
    it('has no axe violations for toast with actions', async () => {
      const { container } = render(
        <Toast 
          title="With Actions" 
          action={<button>Action</button>}
          description="More details"
        />
      );
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
export const renderToast = (props: ToastProps) => {
  return render(<Toast {...props} />);
};

export const renderToastGroup = (props: ToastGroupProps) => {
  return render(<ToastGroup {...props} />);
};

// Mock timers for auto-dismiss testing
export const advanceTimer = (ms: number) => {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
};

// Test fixtures
export const toastFixtures = {
  variants: ['default', 'success', 'warning', 'error', 'info'] as const,
  positions: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'] as const,
  durations: [0, 3000, 5000, 10000],
};
```

---

## Integration with axe-core

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Toast accessibility', () => {
  it('has no accessibility violations for basic toast', async () => {
    const { container } = render(<Toast title="Test" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('has no violations for toast with all features', async () => {
    const { container } = render(
      <Toast 
        title="Complete Toast" 
        description="With all features"
        variant="success"
        action={<button>Action</button>}
        duration={5000}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('has no violations for toast group', async () => {
    const { container } = render(
      <ToastGroup>
        <Toast title="First" />
        <Toast title="Second" variant="warning" />
      </ToastGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

Last updated: 2026-06-03 (v1.6.3)