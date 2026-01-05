# @synergy-design-system/eslint-config-syn

Shared ESLint configuration for the Synergy Design System, built for ESLint 9+ flat config.

## Features

- 🎯 **Airbnb Base**: Built on top of Airbnb's JavaScript style guide
- 🎨 **@stylistic Plugin**: Modern code formatting with the ESLint Stylistic plugin
- 📦 **TypeScript Support**: Full TypeScript configuration with type-aware linting
- 🎭 **Playwright Tests**: Built-in test file configuration
- 🛠️ **Presets**: Reusable configuration presets for common scenarios
- ⚡ **ESLint 9**: Leverages ESLint's flat config system

## Installation

```bash
pnpm add -D @synergy-design-system/eslint-config-syn
```

## Usage

### Basic JavaScript

```javascript
import synergyConfig from '@synergy-design-system/eslint-config-syn';

export default [
  ...synergyConfig,
];
```

### TypeScript

```javascript
import tsConfig from '@synergy-design-system/eslint-config-syn/ts';

export default [
  ...tsConfig,
];
```

### TypeScript with Custom Project

```javascript
import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';

export default [
  ...createCustomConfig({
    project: './tsconfig.lint.json',
  }),
];
```

## Presets

### Scripts Preset

For build scripts and utility files:

```javascript
import tsConfig from '@synergy-design-system/eslint-config-syn/ts';
import scriptsPreset from '@synergy-design-system/eslint-config-syn/presets/scripts';

export default [
  ...tsConfig,
  scriptsPreset,
];
```

Enables:
- `import/no-extraneous-dependencies: off` - Import devDependencies
- `no-console: off` - Console logging in scripts

### Tests Preset

For Playwright test files:

```javascript
import tsConfig from '@synergy-design-system/eslint-config-syn/ts';
import testsPreset from '@synergy-design-system/eslint-config-syn/presets/tests';

export default [
  ...tsConfig,
  testsPreset,
];
```

**Note**: Requires `eslint-plugin-playwright` as a peer dependency.

Provides:
- Playwright plugin configuration
- Relaxed TypeScript rules for tests
- Test-specific rule overrides

### Complexity Preset

For projects needing custom complexity rules:

```javascript
import tsConfig from '@synergy-design-system/eslint-config-syn/ts';
import complexityPreset from '@synergy-design-system/eslint-config-syn/presets/complexity';

export default [
  ...tsConfig,
  {
    ...complexityPreset,
    rules: {
      ...complexityPreset.rules,
      complexity: ['error', { max: 15 }], // Override if needed
    },
  },
];
```

**Note**: Base config already includes `complexity: 10` and `max-len: 150`.

## Configuration Details

### Base Rules (JavaScript)

- **Complexity**: Maximum cyclomatic complexity of 10
- **Max Length**: 150 characters per line (ignoring comments and template literals)
- **Import Order**: Enforced grouping (builtin, external, internal)
- **No Default Exports**: Prefer named exports for better tree-shaking
- **Sorted Keys**: Alphabetical object key ordering (warn level)

### TypeScript Additions

- **Type-aware Linting**: Uses TypeScript's type checker for enhanced rules
- **@stylistic Rules**: JSX formatting, indentation, quotes, semicolons
- **No Unused Vars**: Error on unused variables (except those starting with `_`)
- **Shadow Prevention**: Prevents variable shadowing
- **Import Resolution**: TypeScript handles module resolution

### Style Rules

All formatting rules use `@stylistic` plugin to avoid conflicts with Prettier-like tools:

- `@stylistic/comma-dangle`: Trailing commas in multiline
- `@stylistic/indent`: 2 spaces (with lit-html template support)
- `@stylistic/quotes`: Single quotes with escape avoidance
- `@stylistic/semi`: Always require semicolons

## API

### `createCustomConfig(options)`

Factory function for TypeScript configuration with custom options.

**Options:**
- `parser` - Custom parser (default: `tseslint.parser`)
- `project` - Path to tsconfig for type-aware linting
- `projectService` - Use TypeScript's project service (default: `true` if no project)

**Returns:** ESLint flat config array

## Peer Dependencies

- `eslint`: ^9.17.0
- `eslint-plugin-playwright`: ^2.1.0 (optional, required for tests preset)

## Running ESLint

### In a Single Package

```bash
cd packages/your-package
pnpm eslint .
```

### Across All Packages

```bash
# From workspace root
pnpm -r --parallel --filter "./packages/**" run lint:js
```

### Fix Auto-fixable Issues

```bash
pnpm eslint . --fix
```

## Troubleshooting

### TypeScript Type-Aware Rules Not Working

Ensure you're using `createCustomConfig` with a `project` option pointing to your tsconfig:

```javascript
import { createCustomConfig } from '@synergy-design-system/eslint-config-syn/ts';

export default [
  ...createCustomConfig({
    project: './tsconfig.json',
  }),
];
```

### Playwright Plugin Not Found

The tests preset requires `eslint-plugin-playwright` as an optional peer dependency. Install it:

```bash
pnpm add -D eslint-plugin-playwright
```

### Rules Conflicting with Prettier

This config uses `@stylistic` plugin which is compatible with Prettier. If you experience conflicts, ensure Prettier is configured to defer to ESLint for style rules, or disable the conflicting Prettier rules.

## Contributing

This package is part of the Synergy Design System monorepo. To contribute:

1. Make changes to the shared config in `packages/_private/eslint-config-syn/`
2. Test across multiple packages before committing
3. Update documentation as needed

## License

MIT
