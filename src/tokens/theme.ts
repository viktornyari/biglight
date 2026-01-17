import processedTokens from './processed-tokens.json';

export type Theme = 'brandA' | 'brandB';

export interface TokenValue {
  value: string | number;
  type: string;
}

export interface ThemeTokens {
  raw: Record<string, string | number>;
  tailwind: {
    colors: Record<string, string>;
    spacing: Record<string, string>;
    fontSize: Record<string, string[]>;
    lineHeight: Record<string, string>;
    borderRadius: Record<string, string>;
    borderWidth: Record<string, string>;
    fontFamily: Record<string, string[]>;
    fontWeight: Record<string, string>;
  };
}

export const themes = processedTokens as {
  brandA: ThemeTokens;
  brandB: ThemeTokens;
};

/**
 * Get a token value by path for a specific theme
 * Example: getToken('brandA', 'Primary.Default') => '#fc4c02'
 */
export function getToken(theme: Theme, path: string): string | number | undefined {
  const themeTokens = themes[theme];
  return themeTokens.raw[path];
}

/**
 * Get a color token value
 */
export function getColor(theme: Theme, path: string): string {
  const value = getToken(theme, path);
  if (typeof value === 'string' && (value.startsWith('#') || value.startsWith('rgb'))) {
    return value;
  }
  return value?.toString() || '#000000';
}

/**
 * Get a spacing token value
 */
export function getSpacing(theme: Theme, path: string): string {
  const value = getToken(theme, path);
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value?.toString() || '0px';
}

/**
 * Get Tailwind-compatible class name for a color
 * This is a helper to generate class names that match our token structure
 */
export function getColorClass(theme: Theme, path: string): string {
  // Convert token path to Tailwind class
  // e.g., "Primary.Default" -> "primary-default"
  const className = path
    .replace(/Colour\./g, '')
    .replace(/\./g, '-')
    .toLowerCase();
  
  return className;
}
