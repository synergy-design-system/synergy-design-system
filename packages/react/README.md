# @synergy-design-system/react

This package provides [React.js](https://react.dev/) wrappers for [Synergy Web Components](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/components).

This package aims for an improved UX when used in React applications:

- Auto-completion
- Event handling

> Note that with react@19 and above, react has full support for web-components.
> For those react versions, this package can be used by loading custom types,
> you **do not need to use the exported components** anymore.

## Getting started

### 1. Package installation

Run the following steps to install the required packages.

```bash
# Install the base library and required css files
npm install --save @synergy-design-system/react @synergy-design-system/tokens

# Optional: Install the styles utility package
npm install --save @synergy-design-system/styles

# Only if not already installed
npm install --save react react-dom

# Optional: if icons shall be used, install the assets package
npm install --save @synergy-design-system/assets
```

> ⚠️ Note we do **not** ship React in this package.
> You will have to install React by yourself first!

### 2. Add the desired theme to your application

The components will not display correctly without the needed theme. Please include either light or dark theme in your application, for example in a newly installed React application:

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// Add this line to enable the light theme for your application
import "@synergy-design-system/tokens/themes/light.css";
import "@synergy-design-system/components/index.css";

// Optional: Import the styles package
import "@synergy-design-system/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### 3. Using native Synergy components in react (only for react >= 19.0.0) in Typescript projects

React@19 finally shipped with official support for web components.
With this version of react, you are free to **use our native web components** directly in your application.

However, you will likely receive errors because our elements are not known to React as available (in react speech `intrinsic`) elements. This will also occur when using typescript. For this reason, we provide **type only wrappers** for all versions of react from version 19.0.0 onward.

Using synergy in a typescript project with React@19 can be easily achieved via one line of code. There is no need to import `@synergy-design-system/react` in your code directly anymore!

Just add the following definition to your projects typescript configuration file (e.g. `tsconfig.json`):

```json
{
  "compilerOptions": {
    "types": ["@synergy-design-system/react/types/latest"]
  }
}
```

This makes sure your project knows about our list of intrinsic elements. This will also enable **automatic type checks and auto completion for properties** for all synergy elements.

You may now use the components by importing them from the `@synergy-design-system/component` package and rendering them in a React component.

```tsx
// You may also load the complete bundle somewhere in your application,
// but directly including only needed components leads to smaller bundles.
import "@synergy-design-system/components/components/button/button.component.js";
import "@synergy-design-system/components/components/input/input.component.js";

export const MyButton = () => <syn-button type="submit">Submit me</syn-button>;
export const MyInput = () => (
  <syn-input name="my-input" onsyn-change={e => console.log(e)} required />
);
```

#### 3.1. Migrating from synergies react wrappers to native components

> Notice! Due to a [currently open bug in lits react wrapper in version 1.0.6](https://github.com/lit/lit/issues/4857), you will have to provide an override for the react types temporarily. This can be archived by adding the following override in your `package.json` file:
>
> ```
> "overrides": {
>   "@types/react": "^19.0.1"
> }
> ```

1. First make sure you have react@19 or higher installed in your project.
2. Upgrade `@synergy-design-system/react` to the latest version.
3. Add the required types to your typescript configuration (`compilerOptions.types=['@synergy-design-system/react/types/latest']`).
4. Run typescript to verify everything is still fine.
5. Replace occurrences of the old synergy components with their native counterpart (e.g. `<SynButton>` should be exchanged for `<syn-button>`). When using native synergy components, make sure to double check on event names (e.g. `<SynInput onSynInput={e => null} />` will become `<syn-input onsyn-input={e => null} />`).
6. When you are done, remove all occurrences of `@synergy-design-system/react` from your code.

---

### 4. Using the lit wrappers (required for react < 19.0.0, optional for react >= 19.0.0)

You may now use the components by importing them from the `@synergy-design-system/react` package and rendering them in a React component.

```tsx
import { SynButton, SynInput } from "@synergy-design-system/react";

export const MyButton = () => <SynButton type="submit">Submit me</SynButton>;
export const MyInput = () => (
  <SynInput name="my-input" onSynChange={e => console.log(e)} required />
);
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

The attribute namings of the components are the same as in the documentation.

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
