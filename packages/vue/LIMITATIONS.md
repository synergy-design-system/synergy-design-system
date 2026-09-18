# Known Issues and limitations - Vue

> ⚠️ This file includes all known issues and limitations when using the Vue wrappers.
> There may be other interesting bits of information in the [components limitation documentation](https://synergy-design-system.github.io/?path=/docs/limitations-components--docs).

---

## Why is there a vue wrapper package in the first place?

### Meta information

- Framework version: Vue >= 3.0.0
- Synergy version: < 3.22.0

### Description

Vue 3 has solid support for custom elements, but for a long time the easiest integration path for many teams was still framework-specific wrappers. Wrappers provided a consistent Vue-first API and reduced setup friction around events, props, and two-way form handling.

### Cause

The main reason was not a technical impossibility of native usage. The native web components were already usable in Vue. The missing piece was a maintained and ergonomic TypeScript layer for native `syn-*` tags, including predictable typing and guidance for framework-specific binding patterns.

### Proposed Solution

#### Solution 1: Wrapper components

Use `@synergy-design-system/vue` wrappers when you:

- want a Vue component API
- need compatibility with existing wrapper-based code
- need automatic two way data binding

#### Solution 2: Native components + type support

Use native `syn-*` components directly when you:

- want to have a smaller bundle size
- do not need wrapper-provided automatic two-way binding (or prefer plugin-based binding via `SynModelPlugin`)

---

## Using Vitest for testing

### Meta information

- Framework version: Vue >= 3.0.0
- Synergy version: <= 2.11.6
- Issues: [#476](https://github.com/synergy-design-system/synergy-design-system/issues/476), [vitest#1388](https://github.com/vitest-dev/vitest/issues/1388)

### Description

When using `Vitest` for testing applications including `@synergy-design-system/vue`, there may be a `TypeError` with the message `TypeError: Unknown file extension ".vue"`.

### Cause

`@synergy-design-system/vue` shipped the raw `.vue` files in version 2.11.6 and below. This works fine for Vite based setups. However, Vitest **does not process external dependencies** by default.

> For newer versions of `@synergy-design-system/vue`, a precompiled version of the components is shipped.
> If you already had this bugfix applied, you may remove it.

### Proposed solution

Adjust Vitests [server.deps.inline](https://vitest.dev/config/#server-deps-inline) parameter to include `@synergy-design-system/vue`.

#### Solution

```typescript
// vitest.config.ts

// For vitest < 0.34.x and @synergy-design-system/vue <= 2.11.6
test: {
  deps: {
    inline: [/@synergy-design-system\/vue/];
  }
}

// For vitest > 0.34.x and @synergy-design-system/vue <= 2.11.6
test: {
  server: {
    deps: {
      inline: [/@synergy-design-system\/vue/];
    }
  }
}
```

---
