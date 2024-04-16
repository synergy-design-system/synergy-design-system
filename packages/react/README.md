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

# Optional: if icons shall be used, install the assets package
npm install --save @synergy-design-system/assets
```

> ⚠️ Note we do **not** ship React in this package.
> You will have to install React by yourself first!

### 2. Add the wanted theme to your application

The components will not display correctly without the needed theme. Please include either light or dark theme in your application, for example in a newly installed React application:

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// Add this line to enable the light theme for your application
import "@synergy-design-system/tokens/themes/light.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### 3. Importing and rendering components

You may now use the components by importing them from the `@synergy-design-system/react` package and rendering them in a React component.

```tsx
import { SynButton } from "@synergy-design-system/react";

export const MyButton = () => <SynButton type="submit">Submit me</SynButton>;
```

### 4. Usage of the components

All information about which components exist as well as the available properties, events and usage of a component, can be found at `components` in our [documentation](https://synergy-design-system.github.io/?path=/docs/components).
The documentation is written for no specific web framework but only vanilla html and javascript.

An example demo repository with the usage of the React wrapper components can be found [here](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/_private/react-demo).

The naming of the components for React changes from kebab-case to PascalCase.
`syn-button` becomes `SynButton`:

```html
<!-- Webcomponents example -->
<syn-button> My Button </syn-button>
```

```tsx
// React wrapper example
<SynButton> My Button </SynButton>
```

### 5. Usage of attributes

The attribute naming of the components are the same as in the documentation.

```html
<!-- Webcomponents example -->
<syn-input
  label="Nickname"
  help-text="What would you like people to call you?"
  required
></syn-input>
```

```tsx
// React wrapper example
<SynInput
  label="Nickname"
  help-text="What would you like people to call you?"
  required
/>
```

### 6. Usage of events

Custom events are named in the documentation as following: `syn-change`, `syn-clear`, ...

This library makes use of [@lit/react](https://lit.dev/docs/frameworks/react/) to wrap the existing Synergy Web Components.
All events will be automatically set up to work without the need to attach event listeners manually.
Just use them with the default React `onEVENT` prefix, where `EVENT` is the camelCased name of the event:

`syn-change`-> `onSynChange`, `syn-clear`-> `onSynClear`, ...

```tsx
import { SynButton } from "@synergy-design-system/react";

export const MyButton = () => (
  <SynButton
    onSynBlur={e => console.log("button blur event", e)}
    onSynFocus={e => console.log("button focus event", e)}
    onSynInvalid={e => console.log("button flagged as invalid", e)}
  >
    SynButton Example
  </SynButton>
);
```

If typescript is used, you can get the correct types for components and events from the `@synergy-design-system/components` package.

The components from the React wrapper and the types of the components package are called the same. Therefore there must be a renaming of e.g. the types.

An example for how these types can be used in case of event, is shown below:

```tsx
import { SynInput } from "@synergy-design-system/react";
import type {
  SynInput as SynInputType,
  SynChangeEvent,
} from "@synergy-design-system/components";

export const MyComponent = () => (
  <SynInput
    label="Surname"
    onSynChange={(e: SynChangeEvent) => {
      const input = e.target as SynInputType;
      // Now we get access to all properties, methods etc. of the syn-input
      const surname = input.value;
      doSomething(surname);
    }}
  />
);
```

### 7. Usage of methods

Components can have methods (like `focus`, `click`, `stepUp`, etc. ), which can trigger an action, if they are called.

An example for calling such a method in a React component is shown here:

```tsx
import { SynButton, SynInput } from "@synergy-design-system/react";
import type { SynInput as SynInputType } from "@synergy-design-system/components";
import { type FC, useRef } from "react";

export const Home: FC = () => {
  const count = useRef<SynInputType>(null);

  return (
    <>
      <SynInput ref={count} label="My count" type="number" value="5" />
      <SynButton
        onClick={() => {
          // Increment the count via calling the method
          count.current?.stepUp();
        }}
      >
        Increment
      </SynButton>
    </>
  );
};
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
