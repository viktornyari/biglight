# Design-to-Code Workflow Approach

## Design-to-Code Workflow

**Source**: Design tokens provided as JSON exported from Figma (`figma-tokens.json`).

**Approach**: Manual CSS variable mapping. Rather than building a complex automated processor, I manually extracted commonly used tokens and mapped them to CSS variables in `src/index.css`.

**Process**:
1. Extract tokens from JSON (Primitives, Aliases, Mapped values)
2. Resolve references (e.g., `{Colour.Brand.BrandA.Orange.Default}` → actual color values)
3. Map to CSS variables with theme support
4. Configure Tailwind to consume CSS variables
5. Build components using Preact + Tailwind + TypeScript

**Why CSS Variables?** Native browser support, runtime theme switching, seamless Tailwind integration, simple to maintain.

## Token Management

**Structure**:
- `tokens/figma-tokens.json`: Raw tokens from Figma
- `src/index.css`: CSS variables for Brand A & B themes
- `src/tokens/`: TypeScript helpers and type definitions (optional)

**Tokens Used**:
- Colors (Primary, Secondary, Tertiary, Error, Success, Warning, Neutral)
- Surface colors (Page background, hover states, action colors)
- Text colors (Headings, body, disabled, error)
- Border colors and radius values
- Spacing tokens

**Tokens Not Used**: Font families/weights, icon sizes, some responsive breakpoints.

## Theme Switching

**How It Works**:
1. CSS variables defined per theme in `src/index.css` using `[data-theme="brandA"]` and `[data-theme="brandB"]` selectors
2. Theme controlled by `data-theme` attribute on parent element
3. Components using Tailwind classes automatically pick up the correct theme values

**Example**:
```tsx
<div data-theme="brandA">
  <Button variant="primary">Brand A</Button>
</div>
```

Storybook includes a theme selector that updates the `data-theme` attribute for instant theme switching.

## What Happens When Tokens Change?

**Current Process (Manual)**:
1. Designer updates tokens in Figma
2. Export new JSON from Figma
3. Developer manually updates CSS variables in `src/index.css`:
   - Find changed token in JSON
   - Resolve references
   - Update corresponding CSS variable
   - Test both themes

**Limitations**: Manual process, risk of missing updates, no automatic validation.

**Production Alternatives**:
- **Automated Script**: Process JSON → resolve references → generate CSS variables automatically
- **Figma API Integration**: Sync tokens via API on CI/CD or scheduled jobs
- **Style Dictionary**: Industry-standard tool for complex token processing and multi-format output

## What You Would Do Differently

**With More Time**:
- Build automated token processing script with validation
- Add comprehensive testing (unit, visual regression, accessibility)
- Create better documentation (component APIs, token guidelines)
- Set up CI/CD pipeline with automated token sync and testing

**With Different Tools**:
- **Style Dictionary**: More robust token processing
- **Chromatic**: Visual regression testing
- **Figma API**: Automated token syncing
- **MDX**: Richer Storybook documentation

**In Production Environment**:
- Automated token sync from Figma with version control
- Comprehensive test suite with visual regression and accessibility compliance
- Dedicated design system documentation site
- Clear designer-developer collaboration process with change notifications

## Trade-offs and Limitations

**Not Production-Ready**:
1. **Manual Token Updates**: Requires developer intervention, risk of inconsistencies → Solution: Automated processing
2. **Limited Token Coverage**: Not all JSON tokens are mapped → Solution: Expand mapping or use automation
3. **No Token Validation**: No checks for missing tokens or invalid values → Solution: Add build-time validation
4. **No Visual Regression Testing**: Visual changes could go unnoticed → Solution: Chromatic/Percy integration
5. **Limited Accessibility Testing**: Basic ARIA attributes, not fully tested → Solution: Comprehensive a11y audit

**What Works Well**:
- Simple runtime theme switching via CSS variables
- Type-safe component APIs with TypeScript
- Clear component structure and Storybook integration
- No runtime token processing overhead
