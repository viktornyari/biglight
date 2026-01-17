import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the raw tokens
const tokensPath = path.join(__dirname, '../tokens/figma-tokens.json');
const rawTokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

/**
 * Resolves token references like {Colour.Brand.BrandA.Orange.Default}
 * to their actual values by traversing the token structure
 */
function resolveReference(ref, tokens) {
  // Remove { } and split by dots
  const path = ref.replace(/[{}]/g, '').split('.');
  let current = tokens;
  
  for (const segment of path) {
    if (current && typeof current === 'object' && segment in current) {
      current = current[segment];
    } else {
      return null;
    }
  }
  
  // If we found a value object, return its value
  if (current && typeof current === 'object' && 'value' in current) {
    const value = current.value;
    // If it's another reference, resolve it recursively
    if (typeof value === 'string' && value.startsWith('{')) {
      return resolveReference(value, tokens);
    }
    return value;
  }
  
  return current;
}

/**
 * Flattens nested token structure into dot-notation keys
 */
function flattenTokens(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && 'value' in value && 'type' in value) {
      // This is a token
      let tokenValue = value.value;
      
      // Resolve references
      if (typeof tokenValue === 'string' && tokenValue.startsWith('{')) {
        tokenValue = resolveReference(tokenValue, rawTokens);
      }
      
      result[newKey] = {
        value: tokenValue,
        type: value.type
      };
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively flatten nested objects
      flattenTokens(value, newKey, result);
    }
  }
  
  return result;
}

/**
 * Extracts theme-specific tokens
 */
function extractThemeTokens(brand) {
  const brandKey = brand === 'BrandA' ? 'Alias colours/BrandA' : 'Alias colours/BrandB';
  const mappedKey = brand === 'BrandA' ? 'Mapped/BrandA' : 'Mapped/BrandB';
  
  // Get primitives
  const primitives = flattenTokens(rawTokens['Primitives/Default']);
  
  // Get brand aliases
  const aliases = flattenTokens(rawTokens[brandKey]);
  
  // Get mapped tokens
  const mapped = flattenTokens(rawTokens[mappedKey]);
  
  // Get responsive tokens (shared)
  const desktop = flattenTokens(rawTokens['Responsive/Desktop']);
  const mobile = flattenTokens(rawTokens['Responsive/Mobile']);
  
  // Resolve all references
  const allTokens = { ...primitives, ...aliases, ...mapped, ...desktop, ...mobile };
  const resolved = {};
  
  for (const [key, token] of Object.entries(allTokens)) {
    if (token.type === 'color' && typeof token.value === 'string' && token.value.startsWith('{')) {
      resolved[key] = resolveReference(token.value, rawTokens) || token.value;
    } else {
      resolved[key] = token.value;
    }
  }
  
  return resolved;
}

/**
 * Converts tokens to Tailwind CSS format
 */
function convertToTailwindFormat(tokens, brand) {
  const theme = {
    colors: {},
    spacing: {},
    fontSize: {},
    lineHeight: {},
    borderRadius: {},
    borderWidth: {},
    fontFamily: {},
    fontWeight: {},
  };
  
  // Process colors
  for (const [key, value] of Object.entries(tokens)) {
    if (typeof value === 'string' && (value.startsWith('#') || value.startsWith('rgb'))) {
      // Convert key path to Tailwind-friendly format
      const tailwindKey = key
        .replace(/Colour\./g, '')
        .replace(/\./g, '-')
        .toLowerCase();
      theme.colors[tailwindKey] = value;
    } else if (typeof value === 'number') {
      // Handle spacing, font sizes, etc.
      if (key.includes('Scale') || key.includes('Spacing')) {
        const spacingKey = key.replace(/.*\./, '').toLowerCase();
        theme.spacing[spacingKey] = `${value}px`;
      } else if (key.includes('Font-size') || key.includes('FontSize')) {
        const sizeKey = key.replace(/.*\./, '').toLowerCase();
        theme.fontSize[sizeKey] = [`${value}px`];
      } else if (key.includes('Line-height') || key.includes('LineHeight')) {
        const lineKey = key.replace(/.*\./, '').toLowerCase();
        theme.lineHeight[lineKey] = `${value}px`;
      } else if (key.includes('Radius') || key.includes('BorderRadius')) {
        const radiusKey = key.replace(/.*\./, '').toLowerCase();
        theme.borderRadius[radiusKey] = `${value}px`;
      } else if (key.includes('Width') || key.includes('BorderWidth')) {
        const widthKey = key.replace(/.*\./, '').toLowerCase();
        theme.borderWidth[widthKey] = `${value}px`;
      }
    } else if (typeof value === 'string' && !value.startsWith('#')) {
      // Font families and weights
      if (key.includes('Font family') || key.includes('FontFamily')) {
        const familyKey = key.replace(/.*\./, '').toLowerCase();
        theme.fontFamily[familyKey] = [value];
      } else if (key.includes('Font weight') || key.includes('FontWeight')) {
        const weightKey = key.replace(/.*\./, '').toLowerCase();
        theme.fontWeight[weightKey] = value;
      }
    }
  }
  
  return theme;
}

// Process both brands
const brandATokens = extractThemeTokens('BrandA');
const brandBTokens = extractThemeTokens('BrandB');

// Convert to Tailwind format
const brandATheme = convertToTailwindFormat(brandATokens, 'BrandA');
const brandBTheme = convertToTailwindFormat(brandBTokens, 'BrandB');

// Export processed tokens
const output = {
  brandA: {
    raw: brandATokens,
    tailwind: brandATheme,
  },
  brandB: {
    raw: brandBTokens,
    tailwind: brandBTheme,
  },
};

// Write to file
const outputPath = path.join(__dirname, '../src/tokens/processed-tokens.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log('✅ Tokens processed successfully!');
console.log(`📁 Output: ${outputPath}`);
