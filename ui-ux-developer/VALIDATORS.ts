/**
 * UI Security Validators
 * 
 * Utility functions for validating and sanitizing dynamic values
 * used in UI components. Part of ui-ux-developer skill.
 * 
 * @see SECURITY-CHECKLIST.md for usage patterns
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ============================================
// CLASS NAME VALIDATION
// ============================================

/**
 * Allowed class prefixes for user-provided class names
 * Extend this list as needed for your design system
 */
const ALLOWED_PREFIXES = [
  'bg-', 'text-', 'border-', 'rounded-', 'shadow-',
  'p-', 'px-', 'py-', 'pt-', 'pr-', 'pb-', 'pl-',
  'm-', 'mx-', 'my-', 'mt-', 'mr-', 'mb-', 'ml-',
  'flex-', 'grid-', 'block-', 'inline-', 'hidden-',
  'w-', 'h-', 'min-w-', 'min-h-', 'max-w-', 'max-h-',
  'gap-', 'space-',
] as const;

/**
 * Whitelist of specific safe classes
 */
const SAFE_CLASSES = new Set([
  'sr-only', 'sr-only-focusable', 'not-sr-only',
  'animate-', 'transition-', 'duration-', 'ease-',
  'hover:', 'focus:', 'active:', 'disabled:', 'group:',
]);

/**
 * Validates and sanitizes a single class name
 */
export function isValidClass(className: string): boolean {
  // Must be non-empty
  if (!className || className.length === 0) return false;
  
  // Must not contain dangerous characters
  if (/[<>"'`]/.test(className)) return false;
  
  // Must not be a full CSS injection attempt
  if (className.includes(';') || className.includes('{}')) return false;
  
  // Check if it starts with an allowed prefix
  const startsWithAllowed = ALLOWED_PREFIXES.some(prefix => 
    className.startsWith(prefix) || className.startsWith(prefix.replace('-', ':'))
  );
  
  // Check if it's in the safe classes set
  const isSafe = Array.from(SAFE_CLASSES).some(safe => 
    className.startsWith(safe) || className === safe
  );
  
  // Allow Tailwind arbitrary values (e.g., bg-[#fff])
  const isArbitrary = /^\[.+\]$/.test(className);
  
  return startsWithAllowed || isSafe || isArbitrary;
}

/**
 * Sanitizes an array of class names
 */
export function sanitizeClasses(...inputs: ClassValue[]): string {
  const combined = clsx(inputs);
  const classes = combined.split(' ');
  
  const valid = classes.filter(isValidClass);
  
  return valid.join(' ');
}

/**
 * Merge classes with validation (replaces cn() utility)
 */
export function cnSafe(...inputs: ClassValue[]): string {
  return twMerge(sanitizeClasses(...inputs));
}

// ============================================
// COLOR VALIDATION
// ============================================

/**
 * Hex color regex patterns
 */
const HEX_3 = /^(#[0-9A-Fa-f]{3})$/;
const HEX_6 = /^(#[0-9A-Fa-f]{6})$/;
const HEX_8 = /^(#[0-9A-Fa-f]{8})$/;

/**
 * RGB color regex
 * Enforces 0-255 range for each component
 */
const RGB = /^rgb\(\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*\)$/i;
const RGBA = /^rgba\(\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*[\d.]+\s*\)$/i;

/**
 * HSL color regex
 */
const HSL = /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/i;
const HSLA = /^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*[\d.]+\s*\)$/i;

/**
 * Validates if a string is a valid CSS color
 */
export function isValidColor(color: string): boolean {
  if (!color) return false;
  
  return (
    HEX_3.test(color) ||
    HEX_6.test(color) ||
    HEX_8.test(color) ||
    RGB.test(color) ||
    RGBA.test(color) ||
    HSL.test(color) ||
    HSLA.test(color)
  );
}

/**
 * Sanitizes a color value with allowlist fallback
 */
export function sanitizeColor(
  input: string,
  fallback: string = '#0066cc',
  allowlist?: string[]
): string {
  // Check allowlist first
  if (allowlist && allowlist.includes(input)) {
    return input;
  }
  
  // Validate format
  if (isValidColor(input)) {
    return input;
  }
  
  // Return fallback if invalid
  return fallback;
}

/**
 * Ensures color has proper format with fallback
 */
export function safeColor(color: string | undefined, fallback = '#0066cc'): string {
  if (!color) return fallback;
  return isValidColor(color) ? color : fallback;
}

// ============================================
// URL VALIDATION
// ============================================

/**
 * Allowed URL schemes
 */
const ALLOWED_SCHEMES = ['https:', 'http:', 'mailto:', 'tel:'] as const;

/**
 * Allowed URL patterns for images and resources
 */
const ALLOWED_URL_PATTERNS = [
  // Same origin
  /^\/assets\//,
  /^\/images\//,
  /^\/icons\//,
  /^\/fonts\//,
  // Data URLs (images only)
  /^data:image\/(png|jpg|jpeg|gif|webp|svg\+xml);base64,/,
  /^data:image\/png;base64,/,
  /^data:image\/jpeg;base64,/,
  /^data:image\/webp;base64,/,
  // External (specific domains only - extend as needed)
  /^https:\/\/fonts\.googleapis\.com\//,
  /^https:\/\/fonts\.gstatic\.com\//,
  /^https:\/\/cdn\.jsdelivr\.net\//,
] as const;

/**
 * Validates URL scheme
 */
export function isValidScheme(url: string): boolean {
  try {
    const parsed = new URL(url, 'http://localhost');
    return ALLOWED_SCHEMES.includes(parsed.protocol as typeof ALLOWED_SCHEMES[number]);
  } catch {
    return false;
  }
}

/**
 * Validates URL against allowed patterns
 */
export function isSafeUrl(url: string): boolean {
  if (!url) return false;
  
  // Check scheme
  if (!isValidScheme(url)) {
    // Allow relative URLs
    if (url.startsWith('/') && !url.startsWith('//')) {
      return true;
    }
    return false;
  }
  
  // Check against allowed patterns
  return ALLOWED_URL_PATTERNS.some(pattern => pattern.test(url));
}

/**
 * Sanitizes URL with fallback
 */
export function sanitizeUrl(url: string, fallback = ''): string {
  return isSafeUrl(url) ? url : fallback;
}

// ============================================
// ID/SLUG VALIDATION
// ============================================

/**
 * Valid HTML ID pattern (CSS selector safe)
 */
const VALID_ID = /^[a-zA-Z][a-zA-Z0-9_-]*$/;

/**
 * Valid slug pattern (URL safe)
 */
const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Sanitizes an ID for use in HTML/DOM
 */
export function sanitizeId(id: string): string {
  if (!id) return '';
  
  // Remove any HTML/script tags
  const cleaned = id.replace(/[<>'"&]/g, '');
  
  // Replace spaces and special chars with hyphens
  const slugified = cleaned
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');
  
  // Validate format
  if (VALID_ID.test(slugified)) {
    return slugified;
  }
  
  // Return empty if invalid
  return '';
}

/**
 * Sanitizes a slug for URLs
 */
export function sanitizeSlug(slug: string): string {
  if (!slug) return '';
  
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ============================================
// ARIA VALIDATION
// ============================================

/**
 * Valid ARIA attribute names (WCAG 2.2 + common ARIA patterns)
 * @see https://www.w3.org/TR/wai-aria-1.2/#aria-attributes
 * @see https://www.w3.org/TR/wai-aria-1.2/#state_and_property_attributes
 */
const ARIA_ATTRIBUTES = new Set([
  // Labels and descriptions
  'aria-label', 'aria-labelledby', 'aria-describedby',
  
  // Widget attributes
  'aria-autocomplete', 'aria-haspopup', 'aria-multiline', 'aria-placeholder',
  'aria-readonly', 'aria-required', 'aria-sort',
  
  // Widget states
  'aria-checked', 'aria-disabled', 'aria-expanded', 'aria-grabbed',
  'aria-pressed', 'aria-selected', 'aria-invalid',
  
  // Live region attributes
  'aria-live', 'aria-relevant', 'aria-atomic',
  
  // Relationship attributes
  'aria-activedescendant', 'aria-controls', 'aria-owns',
  'aria-colcount', 'aria-colindex', 'aria-colindextext', 'aria-colspan',
  'aria-rowcount', 'aria-rowindex', 'aria-rowindextext', 'aria-rowspan',
  
  // Presentation and misc
  'aria-current', 'aria-details', 'aria-errormessage', 'aria-hidden',
  'aria-orientation', 'aria-posinset', 'aria-setsize',
  
  // Drag and drop
  'aria-dropeffect',
]);

/**
 * Validates ARIA attribute name
 */
export function isValidAriaAttribute(attr: string): boolean {
  return ARIA_ATTRIBUTES.has(attr.toLowerCase());
}

/**
 * Sanitizes ARIA relationship (labelledby, describedby, etc.)
 */
export function sanitizeAriaRelation(ids: string): string {
  if (!ids) return '';
  
  const idList = ids.split(/\s+/).map(sanitizeId).filter(Boolean);
  
  return idList.join(' ');
}

// ============================================
// SIZE/NUMBER VALIDATION
// ============================================

/**
 * Validates and clamps a numeric value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Validates font size (returns in px or rem)
 */
export function sanitizeFontSize(size: number | string, fallback = '16px'): string {
  const numValue = typeof size === 'string' ? parseInt(size, 10) : size;
  
  if (isNaN(numValue) || numValue < 8 || numValue > 200) {
    return fallback;
  }
  
  // Return with px unit
  return `${numValue}px`;
}

/**
 * Validates spacing/padding value
 */
export function sanitizeSpacing(spacing: number | string, fallback = 16): number {
  const numValue = typeof spacing === 'string' ? parseInt(spacing, 10) : spacing;
  
  if (isNaN(numValue) || numValue < 0 || numValue > 1000) {
    return fallback;
  }
  
  return numValue;
}

/**
 * Validates percentage value
 */
export function sanitizePercentage(value: number, fallback = 100): number {
  return clamp(value, 0, 100);
}

// ============================================
// THEME VALIDATION
// ============================================

/**
 * Valid theme names
 */
const VALID_THEMES = ['light', 'dark', 'system'] as const;
type ThemeName = typeof VALID_THEMES[number];

/**
 * Validates theme name
 */
export function isValidTheme(theme: string): theme is ThemeName {
  return VALID_THEMES.includes(theme as ThemeName);
}

/**
 * Gets safe theme value
 */
export function getSafeTheme(theme: string | undefined, fallback: ThemeName = 'light'): ThemeName {
  if (theme && isValidTheme(theme)) {
    return theme;
  }
  return fallback;
}

// ============================================
// ESCAPE UTILITIES
// ============================================

/**
 * Escapes HTML special characters
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;'); // Using hex entity instead of &#039;
}

/**
 * Escapes for use in HTML attributes
 */
export function escapeAttribute(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Escapes for use in CSS values
 */
export function escapeCss(unsafe: string): string {
  return unsafe
    .replace(/["'<>]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '')
    .replace(/}/g, '')
    .replace(/{/g, '');
}

// ============================================
// COMPOSITE VALIDATORS
// ============================================

/**
 * Validates a complete style object
 */
export interface StyleValidationResult {
  valid: boolean;
  safe: Record<string, string>;
  errors: string[];
}

/**
 * Validates inline styles object
 */
export function validateStyles(
  styles: Record<string, string>,
  safeProperties: string[]
): StyleValidationResult {
  const result: StyleValidationResult = {
    valid: true,
    safe: {},
    errors: [],
  };
  
  const allowedProps = new Set(safeProperties.map(p => p.toLowerCase()));
  
  for (const [prop, value] of Object.entries(styles)) {
    if (!allowedProps.has(prop.toLowerCase())) {
      result.errors.push(`Property "${prop}" not allowed`);
      continue;
    }
    
    // Validate specific property types
    if (prop === 'color' || prop === 'backgroundColor' || prop.includes('color')) {
      if (!isValidColor(value)) {
        result.errors.push(`Invalid color value for "${prop}"`);
        continue;
      }
    }
    
    if (prop.includes('url') || prop.includes('background')) {
      if (value && !isSafeUrl(value)) {
        result.errors.push(`Unsafe URL for "${prop}"`);
        continue;
      }
    }
    
    result.safe[prop] = value;
  }
  
  result.valid = result.errors.length === 0;
  return result;
}

/**
 * Validates complete component props
 */
export function validateComponentProps<T extends Record<string, unknown>>(
  props: T,
  rules: {
    classes?: ClassValue[];
    color?: string;
    url?: string;
    id?: string;
    aria?: string;
    theme?: string;
  }
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (rules.classes && props.className) {
    const classes = Array.isArray(props.className) 
      ? props.className.join(' ') 
      : String(props.className);
    classes.split(' ').forEach(cls => {
      if (!isValidClass(cls)) {
        errors.push(`Invalid class: ${cls}`);
      }
    });
  }
  
  if (rules.color && props.style) {
    const style = props.style as Record<string, string>;
    if (style.color && !isValidColor(style.color)) {
      errors.push(`Invalid color: ${style.color}`);
    }
  }
  
  if (rules.url && props.src) {
    if (!isSafeUrl(props.src as string)) {
      errors.push(`Unsafe URL: ${props.src}`);
    }
  }
  
  if (rules.id && props.id) {
    if (!sanitizeId(props.id as string)) {
      errors.push(`Invalid ID: ${props.id}`);
    }
  }
  
  if (rules.theme) {
    const theme = (props['data-theme'] || props.className) as string;
    if (theme && !isValidTheme(theme)) {
      errors.push(`Invalid theme: ${theme}`);
    }
  }
  
  return { valid: errors.length === 0, errors };
}

// ============================================
// EXPORTS
// ============================================

export {
  cnSafe as cn,
  sanitizeClasses,
  isValidClass,
  isValidColor,
  sanitizeColor,
  safeColor,
  isSafeUrl,
  sanitizeUrl,
  sanitizeId,
  sanitizeSlug,
  isValidAriaAttribute,
  sanitizeAriaRelation,
  clamp,
  sanitizeFontSize,
  sanitizeSpacing,
  sanitizePercentage,
  isValidTheme,
  getSafeTheme,
  escapeHtml,
  escapeAttribute,
  escapeCss,
  validateStyles,
  validateComponentProps,
};

// Last updated: 2026-06-03 (v1.6.0)