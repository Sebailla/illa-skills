# Button Component Tests

Unit tests for Button component with accessibility testing.

```typescript
// tests/components/button.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, AxeResults } from 'axe-core'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
    })

    it('renders with correct variant class', () => {
      render(<Button variant="primary">Primary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary')
    })

    it('renders with correct size class', () => {
      render(<Button size="lg">Large Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-12')
    })
  })

  describe('Variants', () => {
    it.each([
      ['primary', 'bg-primary'],
      ['secondary', 'bg-secondary'],
      ['outline', 'border'],
      ['ghost', 'hover:bg-accent'],
      ['destructive', 'bg-destructive'],
    ])('renders %s variant correctly', (variant, expectedClass) => {
      render(<Button variant={variant as any}>{variant}</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain(expectedClass.split(' ')[0])
    })
  })

  describe('Sizes', () => {
    it.each([
      ['xs', 'h-8'],
      ['sm', 'h-9'],
      ['default', 'h-10'],
      ['lg', 'h-12'],
      ['icon', 'h-10 w-10'],
    ])('renders %s size correctly', (size, expectedClass) => {
      render(<Button size={size as any}>Button</Button>)
      const button = screen.getByRole('button')
      expect(button.className).toContain(expectedClass.split(' ')[0])
    })
  })

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('has correct type attribute to prevent accidental form submission', () => {
      render(<Button>Submit</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('respects explicit type attribute', () => {
      render(<Button type="submit">Submit</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('respects reset type attribute', () => {
      render(<Button type="reset">Reset</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'reset')
    })

    it('renders loading state', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button', { name: /loading/i })
      expect(button).toHaveAttribute('aria-busy', 'true')
    })

    it('renders loading spinner icon', () => {
      render(<Button loading>Saving</Button>)
      const button = screen.getByRole('button')
      // Spinner should be present as sibling or child with animate-spin class
      const spinner = button.querySelector('.animate-spin, [data-spinner], svg')
      expect(spinner).toBeInTheDocument()
    })

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn()
      render(<Button loading onClick={handleClick}>Loading</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard navigation', async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Press Enter</Button>)
      const button = screen.getByRole('button')
      button.focus()
      await userEvent.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Accessible Button</Button>)
      const results: AxeResults = await axe(container)
      expect(results.violations).toHaveLength(0)
    })

    it('has accessible name for icon-only button', () => {
      render(
        <Button variant="ghost" size="icon" aria-label="Settings">
          <SettingsIcon />
        </Button>
      )
      const button = screen.getByRole('button', { name: /settings/i })
      expect(button).toBeInTheDocument()
    })

    it('has accessible busy state', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-busy', 'true')
    })

    it('has accessible disabled state', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it.each([
      ['primary'],
      ['secondary'],
      ['outline'],
      ['ghost'],
      ['destructive'],
    ])('variant %s has no accessibility violations', async (variant) => {
      const { container } = render(
        <Button variant={variant as any}>Button</Button>
      )
      const results = await axe(container)
      expect(results.violations).toHaveLength(0)
    })
  })

  describe('Touch Targets', () => {
    it('meets minimum touch target size', () => {
      render(<Button>Touch Target</Button>)
      const button = screen.getByRole('button')
      const rect = button.getBoundingClientRect()
      expect(rect.height).toBeGreaterThanOrEqual(44)
      expect(rect.width).toBeGreaterThanOrEqual(44)
    })
  })

  describe('Focus Management', () => {
    it('is focusable', () => {
      render(<Button>Focusable</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveFocus()
    })

    it('shows focus indicator', () => {
      render(<Button>Focus Indicator</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button.className).toMatch(/focus-visible/)
    })
  })

  describe('Responsive', () => {
    it('applies mobile styles at small breakpoints', () => {
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(max-width: 640px)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })) as any

      render(<Button>Mobile Button</Button>)
      const button = screen.getByRole('button')
      // Mobile buttons should have larger touch targets
      expect(button).toHaveClass('min-h-12')
    })
  })
})
```

```typescript
// tests/components/button.a11y.test.tsx
import { test, expect } from '@playwright/test'

test.describe('Button Accessibility', () => {
  test('keyboard accessible', async ({ page }) => {
    await page.goto('/components/button')
    
    // Tab to button
    await page.keyboard.press('Tab')
    const button = page.getByRole('button', { name: /primary button/i })
    await expect(button).toBeVisible()
    
    // Focus indicator visible
    await expect(button).toHaveFocus()
    
    // Activate with Enter
    await page.keyboard.press('Enter')
    
    // Activate with Space
    await page.keyboard.press('Tab')
    const secondButton = page.getByRole('button', { name: /secondary button/i })
    await secondButton.focus()
    await page.keyboard.press('Space')
  })

  test('no axe violations', async ({ page }) => {
    await page.goto('/components/button')
    
    const violations = await page.evaluate(() => {
      return import('axe-core').then(async (axe) => {
        const results = await axe.default.run(document)
        return results.violations
      })
    })
    
    expect(violations).toHaveLength(0)
  })

  test('touch targets meet WCAG 2.5.8', async ({ page }) => {
    await page.goto('/components/button')
    
    const buttons = page.getByRole('button')
    const count = await buttons.count()
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i)
      const box = await button.boundingBox()
      
      // Minimum 24x24px CSS, 44x44px for mobile
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(24)
        expect(box.width).toBeGreaterThanOrEqual(24)
      }
    }
  })
})
```

Last updated: 2026-06-03 (v1.6.3)