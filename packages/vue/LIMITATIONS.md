# Known Issues and recipes - Vue

> ⚠️ This file includes all known issues and limitations when using our Angular wrappers.
> There may be other interesting bits of Information in our [components limitation documentation](https://synergy-design-system.github.io/?path=/docs/limitations-components--docs).

---

## Using vitest for testing

### Meta Information

- Framework version: Vue@3
- Synergy version: >= 1.1.0
- Issues: [#476](https://github.com/synergy-design-system/synergy-design-system/issues/476), [vitest#1388](https://github.com/vitest-dev/vitest/issues/1388)

### Description

When using `vitest` for testing applications including `@synergy-design-system/vue`, there may be a `TypeError` with the message `TypeError: Unknown file extension ".vue"`.

### Cause

`@synergy-design-system/vue` ships the raw `.vue` files. This works fine for Vite based setups. However, vitest **does not process external dependencies** by default.

### Proposed Solution

Adjust vitests [server.deps.inline](https://vitest.dev/config/#server-deps-inline) parameter to include `@synergy-design-system/vue`.

#### Solution:

```typescript
// vitest.config.ts

// For vitest < 0.34.x
test: {
  deps: {
    inline: [/@synergy-design-system\/vue/];
  }
}

// For vitest > 0.34.x
test: {
  server: {
    deps: {
      inline: [/@synergy-design-system\/vue/];
    }
  }
}
```

---
