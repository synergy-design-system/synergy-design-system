# @synergy-design-system/vue

This package provides [vue.js](https://vuejs.org/) wrappers for [Synergy Web Components](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/components).

This package aims to provide an improved developer experience in Vue applications:

- Provides two way data binding and `v-model`
- Autocompletion and Types
- Better custom event handling of `synergy` events

## Getting started

### 1. Package installation

Run the following steps to install the required packages.

```bash
# Install the base library and required css files
npm install --save @synergy-design-system/vue @synergy-design-system/tokens

# Optional: if icons shall be used, install the assets package
npm install --save @synergy-design-system/assets
```

> ⚠️ Note we do **not** ship Vue in this package.
> You will have to install it by yourself first!

### 2. Add the desired theme to your application

The components will not display correctly without the needed theme. Please include either light or dark theme in your application, for example in a newly installed Vue application:

```ts
// src/main.ts
// Add this line to enable the light theme for your application
import "@synergy-design-system/tokens/themes/light.css";

import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

### 3. Importing and rendering components

You may now use the components by importing them from the `@synergy-design-system/vue` package and rendering them in your own Vue components.

```html
<script setup lang="ts">
  // Note the name includes Vue here.
  // This is done because it would
  // clash with our native components otherwise
  import { SynVueButton } from "@synergy-design-system/vue";
</script>

<template>
  <SynVueButton type="submit"> Submit me </SynVueButton>
</template>
```

### 4. Usage of the components

All information about which components exist as well as the available properties, events and usage of a component, can be found at `components` in our [documentation](https://synergy-design-system.github.io/?path=/docs/components).
The documentation is written for no specific web framework but only vanilla html and javascript.

An example demo repository with the usage of the Vue wrapper components can be found [here](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/_private/vue-demo).

The naming of the components for Vue changes from kebab-case to PascalCase with an appended `Vue` after the `syn`.
`syn-button` becomes `SynVueButton`:

```html
<!-- Webcomponents example -->
<syn-button> My Button </syn-button>
```

```html
<!-- Vue wrapper example -->
<SynVueButton> My Button </SynVueButton>
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

```html
<!-- Vue wrapper example -->
<SynVueInput
  label="Nickname"
  help-text="What would you like people to call you?"
  required
/>
```

### 6. Usage of events

Custom events are named in the documentation as following: `syn-change`, `syn-clear`, ...
They stay the same for the Vue components:

```html
<SynVueButton
  @syn-blur="handleBlur"
  @syn-focus="handleFocus"
  @syn-invalid="handleInvalid"
>
  My Button
</SynVueButton>
```

If typescript is used, you can get the correct types for components and events from the `@synergy-design-system/components` package.

An example for how these types can be used in case of event handling, is shown below:

```html
<script setup lang="ts">
  import { SynVueInput } from "@synergy-design-system/vue";
  import type {
    SynChangeEvent,
    SynInput,
  } from "@synergy-design-system/components";

  const synChange = (e: SynChangeEvent) => {
    const input = e.target as SynInput;
    // Now we get access to all properties, methods etc. of the syn-input
    const surname = input.value;
    doSomething(surname);
  };
</script>

<template>
  <SynVueInput label="Surname" @syn-change="synChange" />
</template>
```

### 7. Usage of methods

Components can have methods (like `focus`, `click`, `stepUp`, etc. ), which trigger an action, if they are called.

In Vue they can be used by prefixing each method name with `call`.

`focus` -> `callFocus`, `click`-> `callClick`, ...

An example for calling such a method in a Vue component is shown here:

```html
<script setup lang="ts">
  import { SynVueInput, SynVueButton } from "@synergy-design-system/vue";
  import { ref } from "vue";

  const count = ref<InstanceType<typeof SynVueInput> | null>(null);

  const handleClick = () => {
    // Increment the count via calling the method
    count.value?.callStepUp();
  };
</script>

<template>
  <SynVueInput ref="count" label="My count" type="number" value="5" />
  <SynVueButton @click="handleClick"> Increment </SynVueButton>
</template>
```

### 8. Using two way databinding

We support [Vue two way data binding](https://vuejs.org/guide/components/v-model.html) for form components out of the box.
You may use it in one of the following ways:

```html
<script setup lang="ts">
  import { ref } from "vue";
  import {
    SynVueButton,
    SynVueCheckbox,
    SynVueTextarea,
    SynVueInput,
  } from "@synergy-design-system/vue";

  const formValues = ref({
    checkboxValue: false,
    inputValue: "",
    textAreaValue: "",
  });

  const submit = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLFormElement;

    const isValid = target.reportValidity();
    if (isValid) {
      const data = [...new FormData(target)]
        .map(v => {
          return `${v[0]}: ${v[1]}`;
        })
        .join(",\n")
        .trim();
      // Do something with the data
      console.log(data);
    }
  };
</script>

<template>
  <form @submit="submit">
    <SynVueInput
      label="Input Example"
      name="inputValue"
      required
      v-model="formValues.inputValue"
    />
    <SynVueTextarea v-model="formValues.textAreaValue" name="textAreaValue" />
    <SynVueCheckbox
      v-model="formValues.checkboxValue"
      required
      name="checkboxValue"
      >Agree</SynVueCheckbox
    >
  </form>
</template>
```

---

## Development

To create a new version of this package, proceed in the following way:

1. Check out the [Synergy Design System Repository](https://github.com/synergy-design-system/synergy).
2. Run `pnpm i -r` to install all dependencies.
3. Build the `@synergy-design-system/components` package (or run `pnpm build` in the project root to build everything).
4. Move to to `packages/_private/vue-demo` and use `pnpm start` to spin up a local vite project using Vue and typescript to validate the build.

> ⚠️ The build process will always try to sync this packages `package.json.version` field with the latest version from `@synergy-design-system/components`!
> Therefore, it is best to not alter the version string
