# @synergy-design-system/browser-baseline

A utility package for managing fixed browser baselines across Synergy Design System major versions.

## Overview

This package provides a stable browser support baseline that gets frozen for each major version of Synergy. Instead of relying on dynamic queries like "baseline widely available" that change over time, each major version gets a fixed set of supported browsers determined at release time.

## Key Features

- 🔒 **Fixed baselines per major version** - ensures stability and predictability
- 🛠️ **CLI utility** for generating new baselines
- 📦 **TypeScript support** with JSDoc integration
- 🔍 **Type-safe baseline access** with autocomplete for valid version keys
- 🤖 **Auto-generated exports** for easy consumption

## Installation

This is a private package within the Synergy monorepo:

```json
{
  "dependencies": {
    "@synergy-design-system/browser-baseline": "workspace:*"
  }
}
```

## Usage

### Importing and Using Baselines

```javascript
import { getBaseline } from '@synergy-design-system/browser-baseline';

// Get baseline for a specific version
const v3Baseline = getBaseline('v3_0_0');
console.log(v3Baseline); // Array of browser strings

// TypeScript will autocomplete valid version keys
const baseline = getBaseline('v3_0_0'); // ✅ Valid
const invalid = getBaseline('invalid'); // ❌ TypeScript error
```

### Get all available baselines

```javascript
import { getAvailableBaselines } from '@synergy-design-system/browser-baseline';

// Get baseline for a specific version
const allBaselines = getAvailableBaselines();
console.log(allBaselines); // Array of versions
```

### Direct Import of Specific Baselines

```javascript 
import { v3_0_0, v4_0_0 } from '@synergy-design-system/browser-baseline';

// Use specific baselines directly
const myBrowsers = v3_0_0;
```

### Integration with Build Tools

```javascript
// In your eslint config
import { getBaseline } from '@synergy-design-system/browser-baseline';

export default {
  // ... other config
  settings: {
    polyfills: getBaseline('v3_0_0')
  }
};
```

```javascript
// In your browserslist config
import { getBaseline } from '@synergy-design-system/browser-baseline';

const browsers = getBaseline('v3_0_0');
// Convert to browserslist format as needed
```

## Creating New Baselines

### CLI Usage

Use the included CLI utility to create baselines for new versions:

```bash
# Create baseline for version 3.1.0 using default settings
node src/syn-create-baseline.js --version 3.1.0

# Create with custom baseline query  
node src/syn-create-baseline.js --baseline "last 2 versions" --version 3.1.0

# Create with custom output directory
node src/syn-create-baseline.js --path "./custom" --version 3.1.0

# Allow overwriting existing baselines
node src/syn-create-baseline.js --version 3.1.0 --allow-replace

# Show help
node src/syn-create-baseline.js --help
```

### CLI Options

| Option | Description | Required | Default |
|--------|-------------|----------|---------|
| `--version` | Version number (semver format) | ✅ | - |
| `--baseline` | Browserslist query to use | ❌ | `"baseline widely available"` |
| `--path` | Directory to store baseline files | ❌ | `"./src/baselines"` |
| `--allow-replace` | Allow overwriting existing files | ❌ | `false` |
| `--help`, `-h` | Show help information | ❌ | - |

### Programmatic API

```javascript
import { createBaseline, createBaselineForVersion } from './src/utilities/createBaseline.js';

// Create with all options
createBaseline({
  baseline: 'last 2 versions',
  path: './custom/path',
  version: '3.1.0'
});

// Create with defaults (only version required)
createBaselineForVersion('3.1.0');
```

## Architecture

### File Structure

```
src/
├── index.js              # Main API exports
├── config.js             # Default configuration
├── syn-create-baseline.js # CLI utility
├── types.d.ts            # TypeScript definitions
├── baselines/            # Generated baseline files
│   ├── index.js          # Auto-generated exports
│   └── 3.0.0.js          # Version-specific baseline
└── utilities/            # Helper functions
    ├── index.js          # Utility exports
    ├── createBaseline.js # Baseline generation logic
    ├── generateBaselineIndex.js
    └── generateConfig.js
```

### Key Concepts

**Fixed Baselines**: Each major version gets a frozen browser baseline that never changes, ensuring builds remain consistent throughout the version's lifetime.

**Version Mapping**: Baselines are stored as files named by semver (e.g., `3.0.0.js`) and exported with valid JavaScript identifiers (e.g., `v3_0_0`).

**Auto-generation**: The `baselines/index.js` file is automatically regenerated when new baselines are created, maintaining type safety.

## Configuration

Default configuration is in [`src/config.js`](src/config.js):

```javascript
export const usedBaseline = 'baseline widely available';
export const baselines = './src/baselines';
```

## Integration Examples

### ESLint Configuration

```javascript
import { getBaseline } from '@synergy-design-system/browser-baseline';

export default {
  settings: {
    polyfills: getBaseline('v3_0_0')
  }
};
```

### Stylelint Configuration  

```javascript
import { getBaseline } from '@synergy-design-system/browser-baseline';

export default {
  browsers: getBaseline('v3_0_0')
};
```

### Build Tools

```javascript
import { getBaseline } from '@synergy-design-system/browser-baseline';

// For Webpack, Vite, etc.
const supportedBrowsers = getBaseline('v3_0_0');
```

## Versioning Strategy

- **Major versions** (3.x, 4.x) get new baseline definitions
- **Minor versions** (3.1.x, 3.2.x) can optionally get updated baselines 
- **Patch versions** (3.1.1, 3.1.2) typically reuse existing baselines

Example version mapping:
- `v3_0_0` - Synergy 3.0 baseline (frozen at release)
- `v3_1_0` - Synergy 3.1 baseline (optional update)
- `v4_0_0` - Synergy 4.0 baseline (new major version)

## Development

### Building

```bash
pnpm run build    # Generate TypeScript definitions
```

### Linting

```bash  
pnpm run lint     # Run all linting
pnpm run lint:js  # JavaScript linting only
pnpm run lint:types # TypeScript checking only
```

### Creating New Versions

1. Run the CLI utility to generate baseline files
2. Commit the generated files to version control
3. Update consuming packages to use the new baseline

## Type Safety

The package provides full TypeScript support:

```typescript  
import { getBaseline } from '@synergy-design-system/browser-baseline';
import type { BaselineKeys } from '@synergy-design-system/browser-baseline';

// Type-safe version parameter
function useBaseline(version: BaselineKeys) {
  return getBaseline(version); // Fully typed
}
```

## License

This package is part of the Synergy Design System and follows the same licensing terms.
