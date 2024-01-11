# @synergy-design-system/react

This package provides [React.js](https://react.dev/) wrappers for [Synergy Web Components](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/components).

This package aims for an improved UX when used in React applications:
- Auto-completion
- Event handling

## Getting started

### 1. Package installation

Run the following steps to install the required packages.

```bash
# Install the base library and required css files
npm install --save @synergy-design-system/react @synergy-design-system/tokens

# Only if not already installed
npm install --save react react-dom
```

> ⚠️ Note we do **not** ship react in this package.
> You will have to install React by yourself first!

### 2. Add the wanted theme to your application

The components will not display correctly without the needed theme. Please include either light or dark theme in your application, for example in a newly installed vite React application:

```tsx
// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// Add this line to enable the light theme for your application
import '@synergy-design-system/tokens/themes/light.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### 3. Importing and rendering components

You may now use the components by importing them from the `@synergy-design-system/react` package and rendering them in a react component.

```tsx
import { SynButton } from '@synergy-design-system/react';

export const MyButton = () => (
  <SynButton type="button" variant="filled">
    SynButton Example
  </SynButton>
);
```

## 4. Using component events

This library makes use of [@lit/react](https://lit.dev/docs/frameworks/react/) to wrap the existing Synergy Web Components.
All events will be automatically set up to work without the need to attach event listeners manually.
Just use them with the default react `onEVENT` prefix, where `EVENT` is the camelCased name of the event.

```tsx
import { SynButton } from '@synergy-design-system/react';

export const MyButton = () => (
  <SynButton
    onSynBlur={e => console.log('button blur event', e)}
    onSynFocus={e => console.log('button focus event', e)}
    onSynInvalid={e => console.log('button flagged as invalid', e)}
  >
    SynButton Example
  </SynButton>
);
```

---

## Development

To create a new version of this package, proceed in the following way:

1. Check out the [Synergy Design System Repository](https://github.com/synergy-design-system/synergy-design-system).
2. Run `pnpm i -r` to install all dependencies.
3. Build the `@synergy-design-system/components` package (or run `pnpm build` in the project root to build everything).
4. Move to to `packages/_private/react-demo` and use `pnpm start` to spin up a local vite project using react and typescript to validate the build.

> ⚠️ The build process will always try to sync this packages `package.json.version` field with the latest version from `@synergy-design-system/components`!
> Therefore, it is best to not alter the version string
