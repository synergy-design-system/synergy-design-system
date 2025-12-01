# @synergy-design-system/fonts

This package provides the SICK Intl font family required for Synergy 3.0 and later versions. The font is distributed with pre-built CSS files for easy integration into any project.

## Installation

Install the fonts package as a dependency:

```bash
npm install --save @synergy-design-system/fonts
```

## Usage

### Basic Usage

Import the complete font family with all weights:

```javascript
// The default export will load SICKIntl automatically.
import '@synergy-design-system/fonts';

// You may also use a direct import instead.
// Use this if your bundler does not understand JavaScript module syntax
import '@synergy-design-system/fonts/src/SICKIntl/font.css';
```

This will load both Regular (400) and Semi Bold (600) font weights with proper `@font-face` declarations.

### CSS Import

If you prefer CSS imports, you can use:

```css
@import '@synergy-design-system/fonts/src/SICKIntl/font.css';
```

### Inline Base64 Version (Self-Contained)

For applications that need **fully self-contained CSS without external font file dependencies**, use the automatically generated inline version:

```javascript
import '@synergy-design-system/fonts/SICKIntl-inlined.css';
```

This version includes the font files as base64-encoded data URIs directly in the CSS, eliminating the need for separate font file hosting. **Note:** This increases CSS file size but removes external dependencies.

### Framework Examples

#### Vite

```javascript
// main.tsx
import '@synergy-design-system/fonts';
```

#### Angular

```json
// In angular.json
"styles": [
  "@synergy-design-system/fonts/src/SICKIntl/font.css",
]
```

### CSS Usage

After importing the fonts, use the `SICK Intl` font family in your CSS:

```css
body {
  font-family: 'SICK Intl', -apple-system, BlinkMacSystemFont, sans-serif;
}

.heading {
  font-family: 'SICK Intl';
  font-weight: 600; /* Semi Bold */
}

.body-text {
  font-family: 'SICK Intl';
  font-weight: 400; /* Regular */
}
```

## Available Font Weights

- **400 (Regular):** Used for body text and standard content
- **600 (Semi Bold):** Used for headings, emphasized text, and UI elements

## File Structure

```
dist/
├── sickintl-inline.css     # Base64 inline version (git ignored)
src/
└── SICKIntl/
    ├── font.css                # Default font face definitions
    ├── SICKIntl-Regular.woff2  # Regular font
    └── SICKIntl-SemiBold.woff2 # Semibild font
```

## Browser Support

The font files are provided in WOFF2 format, which is supported by:

- Chrome 36+
- Firefox 39+
- Safari 12+
- Edge 14+

For older browser support, consider using the CDN version or hosting additional font formats.

## CDN Alternative

If you prefer not to bundle fonts with your application, you can load them from the SICK CDN:

```css
@font-face {
  font-display: swap;
  font-family: 'SICK Intl';
  font-style: normal;
  font-weight: 400;
  src: url('https://www.sick.com/media/fonts/sickintl-v1/regular/SICKIntl-Regular.woff2')
    format('woff2');
}

@font-face {
  font-display: swap;
  font-family: 'SICK Intl';
  font-style: normal;
  font-weight: 600;
  src: url('https://www.sick.com/media/fonts/sickintl-v1/semibold/SICKIntl-Semibold.woff2')
    format('woff2');
}
```

## Performance Considerations

- **Standard version:** Loads font files separately, better for caching
- **Inline version:** Self-contained but larger CSS file size
- **CDN version:** Fastest initial load but requires network connectivity

---

## Development

This package uses PostCSS to generate multiple font distribution formats:

- Standard CSS with external font files
- Base64 inline CSS for self-contained usage
- Individual weight-specific CSS files

The inline version is automatically generated during build and includes the font files as data URIs.
