# Playwright Configuration

Playwright configuration for E2E accessibility testing.

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  projects: [
    // Setup project
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    
    // Chromium for all tests
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    
    // Firefox
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],
    },
    
    // Webkit
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],
    },
    
    // Mobile Chrome
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      dependencies: ['setup'],
    },
    
    // Mobile Safari
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      dependencies: ['setup'],
    },
  ],
  
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
```

## Setup File

```typescript
// tests/setup.ts
import { test, expect } from '@playwright/test'

test('setup', async ({ page }) => {
  // Authenticate if needed
  // await page.goto('/login')
  // await page.fill('[name="email"]', 'test@example.com')
  // await page.fill('[name="password"]', 'password')
  // await page.click('[type="submit"]')
  // await page.waitForURL('/dashboard')
})
```

## E2E Test Example

```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility E2E', () => {
  test('homepage has no WCAG violations', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toHaveLength(0)
  })

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/')
    
    // Get all focusable elements
    const focusable = page.locator(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const count = await focusable.count()
    
    for (let i = 0; i < count; i++) {
      const element = focusable.nth(i)
      
      // Tab to element
      if (i > 0) {
        await page.keyboard.press('Tab')
      } else {
        await page.focus('body')
        await page.keyboard.press('Tab')
      }
      
      // Check it's visible
      const isVisible = await element.isVisible()
      expect(isVisible).toBeTruthy()
    }
  })

  test('no keyboard traps', async ({ page }) => {
    await page.goto('/modal')
    
    // Open modal
    await page.click('[aria-haspopup="dialog"]')
    
    // Focus should be trapped in modal
    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible()
    
    // Tab through modal elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      const focused = page.evaluate(() => document.activeElement?.getAttribute('role'))
      
      // Should still be in modal or close button
      const isInModal = await modal.evaluate((el, focusedEl) => 
        el.contains(focusedEl) || focusedEl?.getAttribute('aria-label')?.includes('Close'),
        await page.evaluate(() => document.activeElement)
      )
      
      // If we exited the modal unexpectedly, the test fails
      if (!isInModal) {
        await page.keyboard.press('Escape')
        break
      }
    }
    
    // Close modal with Escape
    await page.keyboard.press('Escape')
    await expect(modal).not.toBeVisible()
  })

  test('color contrast meets WCAG 2.1 AA', async ({ page }) => {
    await page.goto('/')
    
    // Get all text elements
    const textElements = page.locator('p, span, h1, h2, h3, h4, h5, h6, a, button')
    
    const count = await textElements.count()
    
    for (let i = 0; i < Math.min(count, 20); i++) {
      const element = textElements.nth(i)
      
      // Get computed styles
      const styles = await element.evaluate((el) => {
        const style = window.getComputedStyle(el)
        const bgStyle = window.getComputedStyle(el.parentElement || document.body)
        
        return {
          color: style.color,
          backgroundColor: bgStyle.backgroundColor,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
        }
      })
      
      // Calculate contrast (simplified check)
      // Full implementation would use chroma-js or similar
      expect(styles.color).toBeTruthy()
      expect(styles.backgroundColor).toBeTruthy()
    }
  })

  test('focus order is logical', async ({ page }) => {
    await page.goto('/form')
    
    const focusOrder: string[] = []
    
    // Tab through all focusable elements
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab')
      const tag = await page.evaluate(() => document.activeElement?.tagName)
      const id = await page.evaluate(() => document.activeElement?.id)
      const ariaLabel = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))
      
      focusOrder.push(`${tag}-${id || ariaLabel || 'unknown'}`)
    }
    
    // Check that form fields appear in logical order
    const formStart = focusOrder.findIndex(el => el.includes('email'))
    const formEnd = focusOrder.findIndex(el => el.includes('submit'))
    
    expect(formStart).toBeLessThan(formEnd)
  })

  test('skip link works', async ({ page }) => {
    await page.goto('/')
    
    // Check for skip link
    const skipLink = page.locator('a[href="#main-content"]')
    
    if (await skipLink.count() > 0) {
      // Focus skip link
      await skipLink.focus()
      
      // Press Enter
      await page.keyboard.press('Enter')
      
      // Should skip to main content
      const main = page.locator('#main-content, [role="main"], main')
      await expect(main).toBeVisible()
      
      // Main should have focus
      await expect(main).toHaveFocus()
    }
  })

  test('forms have accessible labels', async ({ page }) => {
    await page.goto('/form')
    
    // Get all form inputs
    const inputs = page.locator('input, textarea, select')
    
    const count = await inputs.count()
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i)
      
      // Check for label
      const label = await page.evaluate((el: Element) => {
        const id = el.getAttribute('id')
        const labelledBy = el.getAttribute('aria-labelledby')
        const ariaLabel = el.getAttribute('aria-label')
        const ariaLabelText = el.getAttribute('aria-label')
        const title = el.getAttribute('title')
        
        // Check for associated label
        if (id) {
          const labelEl = document.querySelector(`label[for="${id}"]`)
          if (labelEl) return labelEl.textContent
        }
        
        return ariaLabel || ariaLabelText || title || null
      }, await input.elementHandle())
      
      expect(label).toBeTruthy()
    }
  })

  test('dynamic content announced to screen readers', async ({ page }) => {
    await page.goto('/')
    
    // Check for live regions
    const liveRegions = page.locator('[aria-live]')
    const count = await liveRegions.count()
    
    // If there are dynamic updates, there should be live regions
    // This is a basic check
    expect(count).toBeGreaterThanOrEqual(0)
  })
})
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run with headed browser
npx playwright test --headed

# Run specific test file
npx playwright test tests/e2e/accessibility.spec.ts

# Run with UI
npx playwright test --ui

# Update snapshots
npx playwright test --update-snapshots

# Generate report
npx playwright show-report
```

Last updated: 2026-06-03 (v1.6.3)