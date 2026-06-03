# Validators Unit Tests

Unit tests for security validators covering XSS prevention, URL validation, color sanitization, and edge cases.

```typescript
// tests/validators.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  // Class name validators
  isValidClass,
  sanitizeClasses,
  cnSafe,
  
  // Color validators
  isValidColor,
  sanitizeColor,
  safeColor,
  
  // URL validators
  isSafeUrl,
  sanitizeUrl,
  isValidScheme,
  
  // ID/Slug validators
  sanitizeId,
  sanitizeSlug,
  
  // ARIA validators
  isValidAriaAttribute,
  sanitizeAriaRelation,
  
  // Size/Number validators
  clamp,
  sanitizeFontSize,
  sanitizeSpacing,
  sanitizePercentage,
  
  // Theme validators
  isValidTheme,
  getSafeTheme,
  
  // Escape utilities
  escapeHtml,
  escapeAttribute,
  escapeCss,
  
  // Composite validators
  validateStyles,
  validateComponentProps,
} from '@/lib/validators'

// ============================================
// XSS PAYLOAD TESTING
// ============================================

describe('XSS Prevention - escapeHtml', () => {
  describe('Basic HTML escaping', () => {
    it('escapes ampersand', () => {
      expect(escapeHtml('foo & bar')).toBe('foo &amp; bar')
    })
    
    it('escapes less-than', () => {
      expect(escapeHtml('<script>')).toBe('&lt;script&gt;')
    })
    
    it('escapes greater-than', () => {
      expect(escapeHtml('2 > 1')).toBe('2 &gt; 1')
    })
    
    it('escapes double quotes', () => {
      expect(escapeHtml('say "hello"')).toBe('say &quot;hello&quot;')
    })
    
    it('escapes single quotes', () => {
      expect(escapeHtml("it's fine")).toBe('it&#x27;s fine')
    })
  })
  
  describe('XSS Attack Payloads', () => {
    const xssPayloads = [
      '<script>alert(1)</script>',
      '<img src=x onerror=alert(1)>',
      '<svg onload=alert(1)>',
      '<iframe src="javascript:alert(1)">',
      '<body onload=alert(1)>',
      '<div onclick="alert(1)">',
      '<a href="javascript:alert(1)">',
      'javascript:alert(1)',
      '<script src="https://evil.com/xss.js"></script>',
      '<meta http-equiv="refresh" content="0;url=javascript:alert(1)">',
      '<object data="javascript:alert(1)">',
      '<embed src="javascript:alert(1)">',
      '"><script>alert(1)</script>',
      "'><script>alert(1)</script>",
      '<script>alert(String.fromCharCode(88,83,83))</script>',
      '<img src="x" onerror="&#97;&#108;&#101;&#114;&#116;&#40;&#49;&#41;">',
      '<svg><script>alert(1)</script></svg>',
      '<div style="background:url(javascript:alert(1))">',
      '<style>@import javascript:alert(1)</style>',
    ]
    
    it.each(xssPayloads)('escapes XSS payload: %s', (payload) => {
      const escaped = escapeHtml(payload)
      
      // Script tags should be escaped
      expect(escaped).not.toContain('<script')
      expect(escaped).not.toContain('</script')
      
      // javascript: scheme should be escaped
      expect(escaped).not.toContain('javascript:')
      
      // onerror/onload handlers should be neutralized
      expect(escaped).not.toContain('onerror=')
      expect(escaped).not.toContain('onload=')
    })
    
    it('escapes nested payloads', () => {
      const nested = '<div><script>alert(1)</script></div>'
      const escaped = escapeHtml(nested)
      
      expect(escaped).toBe('&lt;div&gt;&lt;script&gt;alert(1)&lt;/script&gt;&lt;/div&gt;')
      expect(escaped).not.toContain('<script>')
    })
    
    it('escapes encoded payloads', () => {
      // URL encoded
      expect(escapeHtml('%3Cscript%3E')).toBe('%3Cscript%3E') // Not decoded
      
      // HTML entities
      expect(escapeHtml('&lt;script&gt;')).toBe('&amp;lt;script&amp;gt;')
    })
  })
  
  describe('Safe content passthrough', () => {
    it('passes through plain text', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World')
    })
    
    it('passes through numbers', () => {
      expect(escapeHtml('12345')).toBe('12345')
    })
    
    it('passes through punctuation', () => {
      expect(escapeHtml('!@#$%^&*()')).toBe('!@#$%^&amp;*()')
    })
    
    it('handles empty string', () => {
      expect(escapeHtml('')).toBe('')
    })
    
    it('handles unicode', () => {
      expect(escapeHtml('日本語')).toBe('日本語')
      expect(escapeHtml('العربية')).toBe('العربية')
    })
  })
})

// ============================================
// ESCAPE UTILITIES
// ============================================

describe('escapeAttribute', () => {
  it('escapes for use in HTML attributes', () => {
    const input = 'onclick="alert(1)"'
    expect(escapeAttribute(input)).toBe('onclick=&quot;alert(1)&quot;')
  })
  
  it('handles double quotes in attribute values', () => {
    expect(escapeAttribute('value="test"')).toBe('value=&quot;test&quot;')
  })
  
  it('escapes less-than and greater-than', () => {
    expect(escapeAttribute('<div>')).toBe('&lt;div&gt;')
  })
})

describe('escapeCss', () => {
  it('removes dangerous CSS injection chars', () => {
    expect(escapeCss('color: red;')).toBe('color: red')
    expect(escapeCss('expression(alert(1))')).toBe('expressionalert(1)')
  })
  
  it('removes quotes and angle brackets', () => {
    expect(escapeCss('font-family: "Arial";')).toBe('font-family: Arial')
  })
  
  it('handles url injection', () => {
    expect(escapeCss('url("javascript:alert(1)")')).toBe('urljavascriptalert(1)')
  })
})

// ============================================
// COLOR VALIDATION
// ============================================

describe('isValidColor', () => {
  describe('Valid colors', () => {
    it('accepts 3-digit hex', () => {
      expect(isValidColor('#fff')).toBe(true)
      expect(isValidColor('#000')).toBe(true)
      expect(isValidColor('#abc')).toBe(true)
    })
    
    it('accepts 6-digit hex', () => {
      expect(isValidColor('#0066cc')).toBe(true)
      expect(isValidColor('#ffffff')).toBe(true)
      expect(isValidColor('#ABC123')).toBe(true)
    })
    
    it('accepts 8-digit hex (with alpha)', () => {
      expect(isValidColor('#0066ccff')).toBe(true)
      expect(isValidColor('#0066cc80')).toBe(true)
    })
    
    it('accepts rgb', () => {
      expect(isValidColor('rgb(0, 102, 204)')).toBe(true)
      expect(isValidColor('rgb( 0 , 102 , 204 )')).toBe(true)
    })
    
    it('accepts rgba', () => {
      expect(isValidColor('rgba(0, 102, 204, 0.5)')).toBe(true)
      expect(isValidColor('rgba(0, 102, 204, 1)')).toBe(true)
    })
    
    it('accepts hsl', () => {
      expect(isValidColor('hsl(210, 100%, 40%)')).toBe(true)
    })
    
    it('accepts hsla', () => {
      expect(isValidColor('hsla(210, 100%, 40%, 0.5)')).toBe(true)
    })
  })
  
  describe('Invalid colors', () => {
    it('rejects empty string', () => {
      expect(isValidColor('')).toBe(false)
    })
    
    it('rejects invalid hex formats', () => {
      expect(isValidColor('#GGG')).toBe(false)
      expect(isValidColor('#0066')).toBe(false)
      expect(isValidColor('0066cc')).toBe(false)
    })
    
    it('rejects rgb with invalid values', () => {
      expect(isValidColor('rgb(300, 0, 0)')).toBe(false)
      expect(isValidColor('rgb(-1, 0, 0)')).toBe(false)
    })
    
    it('rejects named colors without validation', () => {
      // Named colors not in our allowlist
      expect(isValidColor('red')).toBe(false)
      expect(isValidColor('blue')).toBe(false)
    })
    
    it('rejects CSS injection attempts', () => {
      expect(isValidColor('red; background: url(javascript:alert(1))')).toBe(false)
      expect(isValidColor('expression(alert(1))')).toBe(false)
    })
    
    it('rejects XSS in color values', () => {
      expect(isValidColor('<script>alert(1)</script>')).toBe(false)
      expect(isValidColor('" onload="alert(1)')).toBe(false)
    })
  })
})

describe('sanitizeColor', () => {
  it('returns valid colors unchanged', () => {
    expect(sanitizeColor('#0066cc')).toBe('#0066cc')
  })
  
  it('returns fallback for invalid colors', () => {
    expect(sanitizeColor('invalid')).toBe('#0066cc') // default fallback
  })
  
  it('uses custom fallback', () => {
    expect(sanitizeColor('invalid', '#ff0000')).toBe('#ff0000')
  })
  
  it('checks allowlist first', () => {
    const allowlist = ['#ff0000', '#00ff00', '#0000ff']
    expect(sanitizeColor('#ff0000', '#000000', allowlist)).toBe('#ff0000')
    expect(sanitizeColor('#ffffff', '#000000', allowlist)).toBe('#000000')
  })
})

describe('safeColor', () => {
  it('returns color if valid', () => {
    expect(safeColor('#0066cc')).toBe('#0066cc')
  })
  
  it('returns fallback if undefined', () => {
    expect(safeColor(undefined)).toBe('#0066cc')
  })
  
  it('returns fallback if invalid', () => {
    expect(safeColor('invalid', '#ff0000')).toBe('#ff0000')
  })
})

// ============================================
// URL VALIDATION
// ============================================

describe('isValidScheme', () => {
  it('accepts https', () => {
    expect(isValidScheme('https://example.com')).toBe(true)
  })
  
  it('accepts http', () => {
    expect(isValidScheme('http://example.com')).toBe(true)
  })
  
  it('accepts mailto', () => {
    expect(isValidScheme('mailto:test@example.com')).toBe(true)
  })
  
  it('accepts tel', () => {
    expect(isValidScheme('tel:+1234567890')).toBe(true)
  })
  
  it('rejects javascript scheme', () => {
    expect(isValidScheme('javascript:alert(1)')).toBe(false)
  })
  
  it('rejects data scheme', () => {
    expect(isValidScheme('data:text/html,<script>alert(1)</script>')).toBe(false)
  })
})

describe('isSafeUrl', () => {
  describe('Valid URLs', () => {
    it('accepts same-origin paths', () => {
      expect(isSafeUrl('/assets/images/logo.png')).toBe(true)
      expect(isSafeUrl('/images/avatar.jpg')).toBe(true)
      expect(isSafeUrl('/icons/settings.svg')).toBe(true)
    })
    
    it('accepts safe data URLs for images', () => {
      expect(isSafeUrl('data:image/png;base64,iVBORw0KGgo=')).toBe(true)
      expect(isSafeUrl('data:image/jpeg;base64,/9j/4AAQ==')).toBe(true)
      expect(isSafeUrl('data:image/webp;base64,UklGRlQ=')).toBe(true)
    })
    
    it('accepts Google Fonts URLs', () => {
      expect(isSafeUrl('https://fonts.googleapis.com/css2?family=Inter')).toBe(true)
      expect(isSafeUrl('https://fonts.gstatic.com/s/inter/v13/')).toBe(true)
    })
    
    it('accepts CDN URLs', () => {
      expect(isSafeUrl('https://cdn.jsdelivr.net/npm/lucide@latest/')).toBe(true)
    })
    
    it('accepts HTTPS external URLs', () => {
      expect(isSafeUrl('https://example.com/image.png')).toBe(true)
    })
  })
  
  describe('Invalid URLs', () => {
    it('rejects javascript scheme', () => {
      expect(isSafeUrl('javascript:alert(1)')).toBe(false)
      expect(isSafeUrl('javascript:void(0)')).toBe(false)
    })
    
    it('rejects data URLs with scripts', () => {
      expect(isSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false)
      expect(isSafeUrl('data:,<script>alert(1)</script>')).toBe(false)
    })
    
    it('rejects http (non-https) external URLs', () => {
      expect(isSafeUrl('http://example.com/image.png')).toBe(false)
    })
    
    it('rejects relative paths with parent traversal', () => {
      expect(isSafeUrl('/../../../etc/passwd')).toBe(false)
    })
    
    it('rejects SVG with embedded scripts', () => {
      expect(isSafeUrl('data:image/svg+xml,<svg onload=alert(1)>')).toBe(false)
    })
    
    it('rejects empty string', () => {
      expect(isSafeUrl('')).toBe(false)
    })
    
    it('rejects double-slash scheme', () => {
      expect(isSafeUrl('//example.com/malicious')).toBe(false)
    })
  })
  
  describe('Relative URL handling', () => {
    it('accepts absolute paths', () => {
      expect(isSafeUrl('/api/users')).toBe(true)
    })
    
    it('accepts root-relative paths', () => {
      expect(isSafeUrl('/assets/styles.css')).toBe(true)
    })
    
    it('rejects paths with suspicious patterns', () => {
      expect(isSafeUrl('/.well-known/something')).toBe(false)
    })
  })
})

describe('sanitizeUrl', () => {
  it('returns valid URLs unchanged', () => {
    expect(sanitizeUrl('/assets/image.png')).toBe('/assets/image.png')
  })
  
  it('returns empty string for invalid URLs', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBe('')
  })
  
  it('returns empty string for XSS attempts', () => {
    expect(sanitizeUrl('<img src=x onerror=alert(1)>')).toBe('')
  })
  
  it('uses custom fallback', () => {
    expect(sanitizeUrl('invalid', '/default.png')).toBe('/default.png')
  })
})

// ============================================
// ID/SLUG VALIDATION
// ============================================

describe('sanitizeId', () => {
  it('sanitizes valid IDs', () => {
    expect(sanitizeId('user-123')).toBe('user-123')
    expect(sanitizeId('myId')).toBe('myId')
    expect(sanitizeId('test_id')).toBe('test_id')
  })
  
  it('removes HTML/script tags', () => {
    expect(sanitizeId('<script>alert(1)</script>')).toBe('scriptalert1script')
  })
  
  it('converts spaces to hyphens', () => {
    expect(sanitizeId('my id')).toBe('my-id')
    expect(sanitizeId('user name')).toBe('user-name')
  })
  
  it('removes invalid characters', () => {
    expect(sanitizeId('user@id!')).toBe('userid')
  })
  
  it('converts to lowercase', () => {
    expect(sanitizeId('User-123')).toBe('user-123')
  })
  
  it('returns empty string for invalid IDs', () => {
    expect(sanitizeId('')).toBe('')
    expect(sanitizeId('123')).toBe('') // Can't start with number
    expect(sanitizeId('-test')).toBe('') // Can't start with hyphen
  })
  
  it('handles XSS attempts in IDs', () => {
    expect(sanitizeId('" onload="alert(1)')).toBe('onloadalert1')
    expect(sanitizeId('<img src=x>')).toBe('imgsrcx')
  })
})

describe('sanitizeSlug', () => {
  it('creates valid URL slugs', () => {
    expect(sanitizeSlug('Hello World')).toBe('hello-world')
    expect(sanitizeSlug('My Blog Post')).toBe('my-blog-post')
  })
  
  it('removes special characters', () => {
    expect(sanitizeSlug('Test@123!')).toBe('test123')
  })
  
  it('trims whitespace', () => {
    expect(sanitizeSlug('  hello  ')).toBe('hello')
  })
  
  it('collapses multiple hyphens', () => {
    expect(sanitizeSlug('foo---bar')).toBe('foo-bar')
  })
  
  it('removes leading/trailing hyphens', () => {
    expect(sanitizeSlug('-hello-')).toBe('hello')
  })
  
  it('handles unicode', () => {
    expect(sanitizeSlug('日本語')).toBe('')
    expect(sanitizeSlug('Test-日本語')).toBe('test')
  })
})

// ============================================
// CLASS NAME VALIDATION
// ============================================

describe('isValidClass', () => {
  describe('Valid classes', () => {
    it('accepts Tailwind color classes', () => {
      expect(isValidClass('bg-blue-500')).toBe(true)
      expect(isValidClass('text-gray-900')).toBe(true)
      expect(isValidClass('border-red-500')).toBe(true)
    })
    
    it('accepts spacing classes', () => {
      expect(isValidClass('p-4')).toBe(true)
      expect(isValidClass('m-2')).toBe(true)
      expect(isValidClass('gap-8')).toBe(true)
    })
    
    it('accepts flex/grid classes', () => {
      expect(isValidClass('flex')).toBe(true)
      expect(isValidClass('grid-cols-3')).toBe(true)
    })
    
    it('accepts state modifiers', () => {
      expect(isValidClass('hover:bg-blue-700')).toBe(true)
      expect(isValidClass('focus:ring-2')).toBe(true)
    })
    
    it('accepts safe utility classes', () => {
      expect(isValidClass('sr-only')).toBe(true)
      expect(isValidClass('animate-spin')).toBe(true)
    })
    
    it('accepts arbitrary values', () => {
      expect(isValidClass('bg-[#fff]')).toBe(true)
      expect(isValidClass('p-[20px]')).toBe(true)
    })
  })
  
  describe('Invalid classes', () => {
    it('rejects dangerous characters', () => {
      expect(isValidClass('bg-red" onload="alert(1)')).toBe(false)
      expect(isValidClass("<script>alert(1)</script>")).toBe(false)
    })
    
    it('rejects CSS injection attempts', () => {
      expect(isValidClass('color: red;')).toBe(false)
      expect(isValidClass('expression(alert(1))')).toBe(false)
    })
    
    it('rejects arbitrary value injection', () => {
      expect(isValidClass('bg-[expression(alert(1))]')).toBe(false)
      expect(isValidClass('bg-[javascript:alert(1)]')).toBe(false)
      expect(isValidClass('bg-[url(javascript:alert(1))]')).toBe(false)
      expect(isValidClass('text-[style=background:url(javascript:alert(1))]')).toBe(false)
      expect(isValidClass('w-[calc(100%_alert(1))]')).toBe(false)
    })
    
    it('rejects empty string', () => {
      expect(isValidClass('')).toBe(false)
    })
    
    it('rejects braces injection', () => {
      expect(isValidClass('bg-{alert(1)}')).toBe(false)
    })
    
    it('rejects semicolon injection', () => {
      expect(isValidClass('bg;alert(1);')).toBe(false)
    })
  })
})

describe('sanitizeClasses', () => {
  it('combines and sanitizes multiple inputs', () => {
    const result = sanitizeClasses('bg-blue-500', 'text-white', 'p-4')
    expect(result).toBe('bg-blue-500 text-white p-4')
  })
  
  it('filters invalid classes', () => {
    const result = sanitizeClasses('bg-blue-500', '<script>alert(1)</script>')
    expect(result).toBe('bg-blue-500')
  })
  
  it('handles undefined/null', () => {
    const result = sanitizeClasses('bg-blue-500', undefined, null)
    expect(result).toBe('bg-blue-500')
  })
})

describe('cnSafe', () => {
  it('works like cn() with validation', () => {
    const result = cnSafe('bg-blue-500', 'text-white')
    expect(result).toBe('bg-blue-500 text-white')
  })
  
  it('handles Tailwind conflicts', () => {
    const result = cnSafe('bg-blue-500', 'bg-red-500')
    // Should merge correctly via tailwind-merge
    expect(result).toContain('bg-blue-500')
    expect(result).toContain('bg-red-500')
  })
})

// ============================================
// ARIA VALIDATION
// ============================================

describe('isValidAriaAttribute', () => {
  describe('Valid ARIA attributes', () => {
    it('accepts common ARIA attributes', () => {
      expect(isValidAriaAttribute('aria-label')).toBe(true)
      expect(isValidAriaAttribute('aria-labelledby')).toBe(true)
      expect(isValidAriaAttribute('aria-describedby')).toBe(true)
      expect(isValidAriaAttribute('aria-hidden')).toBe(true)
    })
    
    it('accepts state attributes', () => {
      expect(isValidAriaAttribute('aria-expanded')).toBe(true)
      expect(isValidAriaAttribute('aria-selected')).toBe(true)
      expect(isValidAriaAttribute('aria-checked')).toBe(true)
      expect(isValidAriaAttribute('aria-disabled')).toBe(true)
    })
    
    it('accepts interactive attributes', () => {
      expect(isValidAriaAttribute('aria-controls')).toBe(true)
      expect(isValidAriaAttribute('aria-owns')).toBe(true)
    })
    
    it('accepts grid/table attributes', () => {
      expect(isValidAriaAttribute('aria-colcount')).toBe(true)
      expect(isValidAriaAttribute('aria-colindex')).toBe(true)
      expect(isValidAriaAttribute('aria-rowcount')).toBe(true)
      expect(isValidAriaAttribute('aria-rowindex')).toBe(true)
      expect(isValidAriaAttribute('aria-colspan')).toBe(true)
      expect(isValidAriaAttribute('aria-rowspan')).toBe(true)
    })
    
    it('accepts widget attributes', () => {
      expect(isValidAriaAttribute('aria-autocomplete')).toBe(true)
      expect(isValidAriaAttribute('aria-haspopup')).toBe(true)
      expect(isValidAriaAttribute('aria-multiline')).toBe(true)
      expect(isValidAriaAttribute('aria-placeholder')).toBe(true)
      expect(isValidAriaAttribute('aria-readonly')).toBe(true)
    })
    
    it('accepts live region attributes', () => {
      expect(isValidAriaAttribute('aria-live')).toBe(true)
      expect(isValidAriaAttribute('aria-atomic')).toBe(true)
      expect(isValidAriaAttribute('aria-relevant')).toBe(true)
    })
    
    it('accepts current and positioning attributes', () => {
      expect(isValidAriaAttribute('aria-current')).toBe(true)
      expect(isValidAriaAttribute('aria-posinset')).toBe(true)
      expect(isValidAriaAttribute('aria-setsize')).toBe(true)
    })
    
    it('accepts grid extended attributes', () => {
      expect(isValidAriaAttribute('aria-colindextext')).toBe(true)
      expect(isValidAriaAttribute('aria-rowindextext')).toBe(true)
      expect(isValidAriaAttribute('aria-colspan')).toBe(true)
      expect(isValidAriaAttribute('aria-rowspan')).toBe(true)
    })
    
    it('accepts drag and drop attributes', () => {
      expect(isValidAriaAttribute('aria-grabbed')).toBe(true)
      expect(isValidAriaAttribute('aria-dropeffect')).toBe(true)
    })
    
    it('accepts form and validation attributes', () => {
      expect(isValidAriaAttribute('aria-required')).toBe(true)
      expect(isValidAriaAttribute('aria-invalid')).toBe(true)
      expect(isValidAriaAttribute('aria-errormessage')).toBe(true)
      expect(isValidAriaAttribute('aria-readonly')).toBe(true)
    })
    
    it('accepts presentation attributes', () => {
      expect(isValidAriaAttribute('aria-sort')).toBe(true)
      expect(isValidAriaAttribute('aria-details')).toBe(true)
      expect(isValidAriaAttribute('aria-hidden')).toBe(true)
    })
    
    it('is case-insensitive', () => {
      expect(isValidAriaAttribute('ARIA-LABEL')).toBe(true)
      expect(isValidAriaAttribute('Aria-Label')).toBe(true)
    })
  })
  
  describe('Invalid ARIA attributes', () => {
    it('rejects non-ARIA attributes', () => {
      expect(isValidAriaAttribute('aria-invalid-value')).toBe(false)
      expect(isValidAriaAttribute('role')).toBe(false)
      expect(isValidAriaAttribute('id')).toBe(false)
    })
    
    it('rejects unknown ARIA attributes', () => {
      expect(isValidAriaAttribute('aria-custom')).toBe(false)
      expect(isValidAriaAttribute('aria-data')).toBe(false)
    })
  })
})

describe('sanitizeAriaRelation', () => {
  it('sanitizes multiple IDs', () => {
    expect(sanitizeAriaRelation('label-id hint-id')).toBe('label-id hint-id')
  })
  
  it('filters invalid IDs', () => {
    expect(sanitizeAriaRelation('<script>alert(1)</script>')).toBe('')
  })
  
  it('handles empty input', () => {
    expect(sanitizeAriaRelation('')).toBe('')
  })
})

// ============================================
// SIZE/NUMBER VALIDATION
// ============================================

describe('clamp', () => {
  it('clamps values within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })
  
  it('clamps values below minimum', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })
  
  it('clamps values above maximum', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })
  
  it('handles edge cases', () => {
    expect(clamp(0, 0, 10)).toBe(0)
    expect(clamp(10, 0, 10)).toBe(10)
  })
})

describe('sanitizeFontSize', () => {
  it('accepts valid font sizes', () => {
    expect(sanitizeFontSize(16)).toBe('16px')
    expect(sanitizeFontSize('14')).toBe('14px')
    expect(sanitizeFontSize(24)).toBe('24px')
  })
  
  it('rejects invalid font sizes', () => {
    expect(sanitizeFontSize(5)).toBe('16px') // too small, fallback
    expect(sanitizeFontSize(250)).toBe('16px') // too large, fallback
    expect(sanitizeFontSize(-1)).toBe('16px') // negative, fallback
  })
  
  it('uses custom fallback', () => {
    expect(sanitizeFontSize(5, '14px')).toBe('14px')
  })
})

describe('sanitizeSpacing', () => {
  it('accepts valid spacing', () => {
    expect(sanitizeSpacing(16)).toBe(16)
    expect(sanitizeSpacing('8')).toBe(8)
  })
  
  it('rejects invalid spacing', () => {
    expect(sanitizeSpacing(-5)).toBe(16) // negative, fallback
    expect(sanitizeSpacing(1500)).toBe(16) // too large, fallback
  })
})

describe('sanitizePercentage', () => {
  it('clamps values 0-100', () => {
    expect(sanitizePercentage(50)).toBe(50)
    expect(sanitizePercentage(150)).toBe(100)
    expect(sanitizePercentage(-10)).toBe(0)
  })
})

// ============================================
// THEME VALIDATION
// ============================================

describe('isValidTheme', () => {
  it('accepts valid themes', () => {
    expect(isValidTheme('light')).toBe(true)
    expect(isValidTheme('dark')).toBe(true)
    expect(isValidTheme('system')).toBe(true)
  })
  
  it('rejects invalid themes', () => {
    expect(isValidTheme('custom')).toBe(false)
    expect(isValidTheme('blue')).toBe(false)
    expect(isValidTheme('')).toBe(false)
  })
})

describe('getSafeTheme', () => {
  it('returns valid themes', () => {
    expect(getSafeTheme('light')).toBe('light')
    expect(getSafeTheme('dark')).toBe('dark')
    expect(getSafeTheme('system')).toBe('system')
  })
  
  it('returns fallback for invalid themes', () => {
    expect(getSafeTheme('custom')).toBe('light') // default fallback
    expect(getSafeTheme('invalid')).toBe('light')
  })
  
  it('uses custom fallback', () => {
    expect(getSafeTheme('custom', 'dark')).toBe('dark')
  })
  
  it('handles undefined', () => {
    expect(getSafeTheme(undefined)).toBe('light')
    expect(getSafeTheme(undefined, 'dark')).toBe('dark')
  })
})

// ============================================
// COMPOSITE VALIDATORS
// ============================================

describe('validateStyles', () => {
  it('validates safe styles', () => {
    const result = validateStyles(
      { color: '#0066cc', backgroundColor: '#ffffff' },
      ['color', 'backgroundColor']
    )
    expect(result.valid).toBe(true)
    expect(result.safe).toEqual({
      color: '#0066cc',
      backgroundColor: '#ffffff'
    })
  })
  
  it('rejects disallowed properties', () => {
    const result = validateStyles(
      { position: 'absolute' },
      ['color']
    )
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Property "position" not allowed')
  })
  
  it('rejects invalid colors', () => {
    const result = validateStyles(
      { color: '<script>alert(1)</script>' },
      ['color']
    )
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Invalid color value for "color"')
  })
  
  it('rejects unsafe URLs', () => {
    const result = validateStyles(
      { backgroundImage: 'url(javascript:alert(1))' },
      ['backgroundImage']
    )
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Unsafe URL for "backgroundImage"')
  })
})

describe('validateComponentProps', () => {
  it('validates component with valid props', () => {
    const result = validateComponentProps(
      { className: 'bg-blue-500 text-white', style: { color: '#0066cc' } },
      { classes: true, color: true }
    )
    expect(result.valid).toBe(true)
  })
  
  it('rejects invalid class names', () => {
    const result = validateComponentProps(
      { className: '<script>alert(1)</script>' },
      { classes: true }
    )
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('Invalid class'))).toBe(true)
  })
  
  it('rejects invalid URLs in props', () => {
    const result = validateComponentProps(
      { src: 'javascript:alert(1)' },
      { url: true }
    )
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Unsafe URL: javascript:alert(1)')
  })
  
  it('rejects invalid IDs', () => {
    const result = validateComponentProps(
      { id: '<script>alert(1)</script>' },
      { id: true }
    )
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('Invalid ID: <script>alert(1)</script>')
  })
})

// ============================================
// EDGE CASES
// ============================================

describe('Edge cases and boundary conditions', () => {
  it('handles very long input strings', () => {
    const long = 'a'.repeat(10000)
    expect(escapeHtml(long).length).toBe(10000)
  })
  
  it('handles unicode edge cases', () => {
    expect(escapeHtml('\u0000')).toBe('\u0000') // null character
    expect(escapeHtml('\u200B')).toBe('\u200B') // zero-width space
  })
  
  it('handles recursive HTML encoding', () => {
    const input = '&lt;script&gt;'
    const result = escapeHtml(input)
    expect(result).toBe('&amp;lt;script&amp;gt;')
  })
  
  it('handles mixed content', () => {
    expect(escapeHtml('Hello <b>World</b> &amp; Friends')).toBe(
      'Hello &lt;b&gt;World&lt;/b&gt; &amp;amp; Friends'
    )
  })
  
  it('handles numbers as input', () => {
    expect(isValidColor(123)).toBe(false) // coerces to string
    expect(sanitizeId(123 as any)).toBe('') // can't start with number
  })
  
  it('handles undefined and null', () => {
    expect(safeColor(undefined)).toBe('#0066cc')
    expect(safeColor(null as any, '#ff0000')).toBe('#ff0000')
    expect(sanitizeUrl('')).toBe('')
  })
})
```

---

## Run Tests

```bash
# Run validators tests only
npx vitest run tests/validators.test.ts

# Run with coverage
npx vitest run tests/validators.test.ts --coverage

# Watch mode
npx vitest tests/validators.test.ts --watch
```

---

## Test Coverage Targets

| Validator | Target Coverage |
|-----------|----------------|
| escapeHtml | 95% |
| escapeAttribute | 90% |
| escapeCss | 90% |
| isValidColor | 95% |
| isSafeUrl | 95% |
| sanitizeId | 90% |
| isValidClass | 90% |
| isValidAriaAttribute | 90% |
| validateStyles | 85% |
| validateComponentProps | 85% |

---

Last updated: 2026-06-03 (v1.6.3)