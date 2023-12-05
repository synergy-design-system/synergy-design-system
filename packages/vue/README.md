# @synergy-design-system/vue

This package provides [vue.js](https://vuejs.org/) wrappers for [Synergy Web Components](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/components).

This package aims to provide an improved developer experience in vue applications:

- Provides two way data binding and `v-model`
- Autocompletion and Types
- Better custom event handling of `synergy` events

## Getting started

### 1. Package installation

Run the following steps to install the required packages.

```bash
# Install the base library and required css files
npm install --save @synergy-design-system/vue @synergy-design-system/tokens
```

> ⚠️ Note we do **not** ship vue in this package.
> You will have to install it by yourself first!

### 2. Add the wanted theme to your application

The components will not display correctly without the needed theme. Please include either light or dark theme in your application, for example in a newly installed vue application:

```ts
// src/main.ts
// Add this line to enable the light theme for your application
import '@synergy-design-system/tokens/themes/light.css';

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 3. Importing and rendering components

You may now use the components by importing them from the `@synergy-design-system/vue` package and rendering them in your own vue components.

```html
<script setup lang="ts">
// Note the name includes Vue here.
// This is done because it would
// clash with our native components otherwise
import { SynVueButton } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueButton type="submit">
    Submit me
  </SynVueButton>
</template>
```

### 4. Using two way databinding

We support [vue two way data binding](https://vuejs.org/guide/components/v-model.html) for form components out of the box.
You may use it in one of the following ways:

```html
<script setup lang="ts">
import { ref } from 'vue';
import {
  SynVueButton,
  SynVueCheckbox,
  SynVueTextarea,
  SynVueInput,
} from '@synergy-design-system/vue';

const formValues = ref({
  checkboxValue: false,
  inputValue: '',
  textAreaValue: '',
});

const submit = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  const target = e.target as HTMLFormElement;

  const isValid = target.reportValidity();
  if (isValid) {
    const data = [...new FormData(target)]
      .map((v) => {
        return `${v[0]}: ${v[1]}`;
      })
      .join(',\n')
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
    <SynVueTextarea
      v-model="formValues.textAreaValue"
      name="textAreaValue"
    />
    <SynVueCheckbox
      v-model="formValues.checkboxValue"
      required
      name="checkboxValue"
    >Agree</SynVueCheckbox>
  </form>
</template>
```

---

## Development

To create a new version of this package, proceed in the following way:

1. Check out the [Synergy Design System Repository](https://github.com/synergy-design-system/synergy).
2. Run `pnpm i -r` to install all dependencies.
3. Build the `@synergy-design-system/components` package (or run `pnpm build` in the project root to build everything).
4. Move to to `packages/_private/vue-demo` and use `pnpm start` to spin up a local vite project using vue and typescript to validate the build.

> ⚠️ The build process will always try to sync this packages `package.json.version` field with the latest version from `@synergy-design-system/components`!
> Therefore, it is best to not alter the version string
