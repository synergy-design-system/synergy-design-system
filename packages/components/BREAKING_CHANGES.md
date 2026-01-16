# Handling breaking changes between major versions

This guide holds the required information for migrating from one major version of `@synergy-design-system/components` to the next.
As all our wrappers are based on this package, the changes also hold true for all wrapper packages.

> ⚠️ Migrations **must** always be done from one major version to the next to prevent issues (e.g. with types and property changes)
> This means when moving from `@synergy-design-system@components` v1.x to v3.x,
> you will **have to apply** the changes from v1.x to v2.x first!

---

## Version 3.0

> ⚠️ **Important**: When upgrading to Synergy v3.0, update all `@synergy-design-system/*` packages to their respective v3.x versions (or v2.x for `@synergy-design-system/assets`) to ensure compatibility.

<h3 id="syn-combobox-v3">`<syn-combobox>`</h3>

#### ⚠️ Removed deprecated attribute `hoist`

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

The `hoist` attribute was marked as deprecated in Synergy version 2.
As all major browsers now support the use of the [popover API](https://developer.mozilla.org/docs/Web/API/Popover_API), manually setting this is no longer needed.

**Migration Steps**:

- Remove all occurrences of the `hoist` property in your code.

**Example (before)**:

```html
<syn-combobox hoist></syn-combobox>
```

**Example (after)**:

```html
<syn-combobox></syn-combobox>
```

---

<h3 id="syn-dropdown-v3">`<syn-dropdown>`</h3>

#### ⚠️ Removed deprecated attribute `hoist`

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

The `hoist` attribute was marked as deprecated in Synergy version 2.
As all major browsers now support the use of the [popover API](https://developer.mozilla.org/docs/Web/API/Popover_API), manually setting this is no longer needed.

**Migration Steps**:

- Remove all occurrences of the `hoist` property in your code.

**Example (before)**:

```html
<syn-dropdown hoist></syn-dropdown>
```

**Example (after)**:

```html
<syn-dropdown></syn-dropdown>
```

---

<h3 id="syn-input-v3">`<syn-input>`</h3>

#### ⚠️ Changed default for `numeric-strategy` from "native" to "modern"

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)
- [#417](https://github.com/synergy-design-system/synergy-design-system/issues/417)

**Reason**:

When we [added the `numeric-strategy` field](https://github.com/synergy-design-system/synergy-design-system/issues/417) we could see that this would be a sane default.
To keep Synergy version 2 API stable, we chose to leave the default at `native` and make the `modern` version an opt in for interested projects.
This is now reversed for Synergy version 3: If you need the old behavior back, just set `numeric-strategy` to `native`.

> Be aware that the `modern` version may also adjust the width of a rendered `<syn-input>`
> For more information about this behavior, please have a look at [the known issues](https://synergy-design-system.github.io/?path=/docs/limitations-components--docs#syn-input-number-width).

**Migration Steps**:

- Remove `numeric-strategy="modern"` from your custom code as it is no longer needed.
- Optional: Remove `numeric-strategy="modern"` from Synergy Default Settings as this is now the default.

**Example (before)**:

```html
<syn-input
  type="number"
  numeric-strategy="modern"
  label="Should use modern"
></syn-input>
<syn-input type="number" label="Uses native as default"></syn-input>
```

**Example (after)**:

```html
<syn-input type="number" label="Should use modern"></syn-input>
<syn-input
  type="number"
  numeric-strategy="native"
  label="Uses native as default"
></syn-input>
```

---

<h3 id="syn-popup-v3">`<syn-popup>`</h3>

#### ⚠️ Removed deprecated attribute `strategy`

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

The `strategy` attribute was marked as deprecated in Synergy version 2.
As all major browsers now support the use of the [popover API](https://developer.mozilla.org/docs/Web/API/Popover_API), manually setting this is no longer needed.

**Migration Steps**:

- Remove all occurrences of the `strategy` property in your code.
- ⚠️ If your target audience uses outdated browsers that [do not support the Popover API](https://caniuse.com/?search=popover), think about providing a polyfill for this feature.

**Example (before)**:

```html
<syn-popup strategy="absolute"></syn-popup>

<syn-popup strategy="fixed"></syn-popup>
```

**Example (after)**:

```html
<syn-popup></syn-popup>

<syn-popup></syn-popup>
```

---

<h3 id="syn-select-v3">`<syn-select>`</h3>

#### ⚠️ Removed deprecated attribute `hoist`

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

The `hoist` attribute was marked as deprecated in Synergy version 2.
As all major browsers now support the use of the [popover API](https://developer.mozilla.org/docs/Web/API/Popover_API), manually setting this is no longer needed.

**Migration Steps**:

- Remove all occurrences of the `hoist` property in your code.

**Example (before)**:

```html
<syn-select hoist></syn-select>
```

**Example (after)**:

```html
<syn-select></syn-select>
```

---

<h3 id="syn-side-nav-v3">`<syn-side-nav>`</h3>

#### ⚠️ Removed deprecated attribute `rail`

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

The `rail` attribute was marked as deprecated in Synergy version 2.
In Synergy version 2.x, it was only left in as a fallback that triggered `variant="rail"` and already warned about the future deprecation.

**Migration Steps**:

- Exchange all occurrences of the `rail` property for `variant="rail"` in your code.

**Example (before)**:

```html
<syn-side-nav rail></syn-side-nav>
```

**Example (after)**:

```html
<syn-side-nav variant="rail"></syn-side-nav>
```

---

<h3 id="syn-tooltip-v3">`<syn-tooltip>`</h3>

#### ⚠️ Removed deprecated attribute `hoist`

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

The `hoist` attribute was marked as deprecated in Synergy version 2.
As all major browsers now support the use of the [popover API](https://developer.mozilla.org/docs/Web/API/Popover_API), manually setting this is no longer needed.

**Migration Steps**:

- Remove all occurrences of the `hoist` property in your code.

**Example (before)**:

```html
<syn-tooltip hoist></syn-tooltip>
```

**Example (after)**:

```html
<syn-tooltip></syn-tooltip>
```

---

<h3 id="defaultSettings-v3">`defaultSettings`</h3>

#### ⚠️ Deprecated `enableExperimentalSettingEmitEvents`

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

This feature is no longer experimental and was therefore flagged as `deprecated`.
It will continue to work in Synergy version 3, but calls the new function `enableSettingEmitEvents` underneath.

> We aim to remove this wrapper in Synergy version 4.

**Migration Steps**:

- Exchange all occurrences of `enableExperimentalSettingEmitEvents` with `enableSettingEmitEvents`.

**Example (before)**:

```javascript
import { enableExperimentalSettingEmitEvents } from "@synergy-design-system/components";
enableExperimentalSettingEmitEvents(true);
```

**Example (after)**:

```javascript
import { enableSettingEmitEvents } from "@synergy-design-system/components";
enableSettingEmitEvents(true);
```

---

<h3 id="syn-var-fallbacks-v3">Variable fallbacks</h3>

#### ⚠️ Removed all fallback variables in components

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

During the migration process of Synergy version 2 to version 3, we added a compatibility layer in the components that made it possible for users with misaligned versions of the components and tokens package to still use the updated styles. This was achieved using fallbacks like this:

```css
/* Original code of Synergy version 2 */
.alert--success {
  --variant-color-border: var(
    --syn-alert-success-color-border,
    var(--syn-panel-border-color)
  );
}
```

This helped introduce Synergies new semantic layer without breaking the software. However, this also lead to increased bundle sizes.

As the component and token packages are now version aligned, there is no more need for this deprecation layer in the components like this:

```css
/* Updated code of Synergy version 3 */
.alert--success {
  --variant-color-border: var(--syn-alert-success-color-border);
}
```

**Migration Steps**:

- Make sure you have matching versions of `@synergy-design-system/components` and `@synergy-design-system/tokens`.
- The components package now declares a `peerDependency` on the same version of `@synergy-design-system/tokens`. You may also remove the installation of `@synergy-design-system/tokens` that was manually needed before.

**Example (before)**:

```json
{
  "dependencies": {
    "@synergy-design-system/components": "^2.55.0",
    "@synergy-design-system/tokens": "2.11.0"
  }
}
```

**Example (after)**:

```json
{
  "dependencies": {
    "@synergy-design-system/components": "^3.0.0"
  }
}
```

---

<h3 id="icons-v3">`IconLibraries`</h3>

#### ⚠️ Deprecated icon migration utilities

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

Synergy version 2 exposes a couple of low level utilities for managing the migration from the legacy SICK 2018 icon set to the new SICK 2025 icons.
With Synergy version 3, the use of SICK 2018 icons is discouraged.
Because of this, the migration utilities are now flagged as `deprecated` and will be removed in a future Synergy release.

This applies to:

- `createMigrationLibrary`
- `migrateIconName`
- `migrateIconNameFilled`
- `migrationLibrary`
- `setupIcons`

**Migration Steps**:

Consider switching to the new SICK 2025 icons directly.
Update your icon names in markup to use the new naming convention instead of relying on the automatic migration layer.

> 📖 For a complete mapping of old to new icon names, see the [SICK 2025 icon migration guide](https://synergy-design-system.github.io/?path=/docs/migration-to-sick-2025--docs).

**Example (before)**:

```javascript
// Using the migration helper to automatically map old icon names
import { setupIcons } from "@synergy-design-system/components";
setupIcons("sick2025"); // Enables automatic name migration
```

```html
<!-- Old SICK 2018 icon names still work due to migration layer -->
<syn-icon name="access_alarm"></syn-icon>
<syn-icon name="app_settings_alt"></syn-icon>
```

**Example (after)**:

```javascript
// No setupIcons() call needed when using SICK 2025 icons with correct names
// Only keep setupIcons('sick2018') if you still need the old SICK 2018 iconset
```

```html
<!-- Use new SICK 2025 icon names directly -->
<syn-icon name="alarm"></syn-icon>
<syn-icon name="phonelink_setup"></syn-icon>
```

---

<h3 id="angular-v3">`@synergy-design-system/angular`</h3>

#### ⚠️ Removed support for outdated Angular versions

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

We have removed support for Angular Version 16 and 17.
Both angular versions are no longer actively maintained.

**Migration Steps**:

- Follow the [official angular update guide](https://angular.dev/update)
- If no upgrade is possible, we advise to stay on Synergy version 2.
- If you still want to upgrade, you may manually override the `peerDependencies` in the `@synergy-design-system/angular` package. Please have a look at your package managers documentation about how this can be achieved.

---

## Version 2.0

<h3 id="syn-header-v2">`<syn-header>`</h3>

#### ⚠️ Removed default slot in favor of named slot "label".

**Associated Ticket(s)**:

- [#434](https://github.com/synergy-design-system/synergy-design-system/issues/434)

**Reason**:

The label was originally taken from the default `slot`.
However, this led to problems as white space characters are also seen as slot contents, preventing the `label` property from working properly.

**Migration Steps**:

When using the slot to show the applications name, wrap it with an element that has its `slot` property pointing to `label`.

**Example (before)**:

```html
<syn-header> ApplicationName </syn-header>
```

**Example (after)**:

```html
<syn-header>
  <span slot="label">ApplicationName</span>
</syn-header>
```

#### ⚠️ Removed props `show-burger-menu` and `burger-menu-visible` in favor of `burger-menu`.

**Associated Ticket(s)**:

- [#430](https://github.com/synergy-design-system/synergy-design-system/issues/430)

**Reason**:

The properties `show-burger-menu` and `burger-menu-visible` were hard to reason about and not aligned with design. They were replaced with an easier to use `burger-menu` property that has one of these different variants: `"hidden"`, `"closed"` or `"open"`.

**Migration Steps**:

The deprecated properties have to be mapped to the new `burger-menu` property in the following way:

| `show-burger-menu` | `burger-menu-visible` | `burger-menu` |
| :----------------- | :-------------------- | :------------ |
| `false`            | `true`, `false`       | `"hidden"`    |
| `true`             | `true`                | `"open"`      |
| `true`             | `false`               | `"closed"`    |

**Example (before)**:

```html
<!-- Example 1: burger menu visible and open -->
<syn-header show-burger-menu burger-menu-visible></syn-header>

<!-- Example 2: burger menu visible and closed -->
<syn-header show-burger-menu></syn-header>

<!-- Example 3: burger menu hidden -->
<syn-header></syn-header>
```

**Example (after)**:

```html
<!-- Example 1: burger menu visible and open -->
<syn-header burger-menu="open"></syn-header>

<!-- Example 2: burger menu visible and closed -->
<syn-header burger-menu="closed"></syn-header>

<!-- Example 3: burger menu hidden -->
<syn-header></syn-header>
```

#### ⚠️ Removed events `syn-burger-menu-hide` and `syn-burger-menu-show`

**Associated Ticket(s)**:

- [#430](https://github.com/synergy-design-system/synergy-design-system/issues/430)

**Reason**:

After the deprecation of `show-burger-menu` and `burger-menu-visible`, it was clear that we have to align our event names to the provided new `burger-menu` property. Therefore, we chose to harmonize the event names and the available properties.

**Migration Steps**:

All occurrences of event listeners listening to `syn-burger-menu-hide` and `syn-burger-menu-show` must be changed to the corresponding new event names.

| Event Name (v1)        | Event Name (v2)          | Description                            |
| ---------------------- | ------------------------ | -------------------------------------- |
| `syn-burger-menu-hide` | `syn-burger-menu-closed` | Emitted when the burger menu is closed |
| `syn-burger-menu-show` | `syn-burger-menu-open`   | Emitted when the burger menu is opened |
| -                      | `syn-burger-menu-hidden` | Emitted when the burger menu is hidden |

**Example (before)**:

```html
<syn-header>Header</syn-header>
<script>
  const header = document.querySelector("syn-header");
  header.addEventListener("syn-burger-menu-hide", () => {
    console.log("Header is closed");
  });

  header.addEventListener("syn-burger-menu-show", () => {
    console.log("Header is shown");
  });
</script>
```

**Example (after)**:

```html
<syn-header>Header</syn-header>
<script>
  const header = document.querySelector("syn-header");
  header.addEventListener("syn-burger-menu-closed", () => {
    console.log("Header is closed");
  });

  header.addEventListener("syn-burger-menu-open", () => {
    console.log("Header is shown");
  });

  // New!
  header.addEventListener("syn-burger-menu-hidden", () => {
    console.log("Header is hidden");
  });
</script>
```

#### ⚠️ Removed slots `show-burger-menu-icon` and `hide-burger-menu-icon`

**Associated Ticket(s)**:

- [#430](https://github.com/synergy-design-system/synergy-design-system/issues/430)

**Reason**:

After the deprecation of `show-burger-menu` and `burger-menu-visible`, it was clear that we have to align our slot names to the provided new `burger-menu` property. Therefore, we chose to harmonize the slot names and the available properties.

**Migration Steps**:

All occurrences of the used slots `show-burger-menu-icon` and `hide-burger-menu-icon` must be changed to the corresponding new slot names.

| Slot Name (v1)          | Slot Name (v2)            | Description                                   |
| ----------------------- | ------------------------- | --------------------------------------------- |
| `show-burger-menu-icon` | `open-burger-menu-icon`   | The icon which is shown if burger-menu=open   |
| `hide-burger-menu-icon` | `closed-burger-menu-icon` | The icon which is shown if burger-menu=closed |

**Example (before)**:

```html
<syn-header label="Header" burger-menu="open">
  <syn-icon slot="show-burger-menu-icon" name="cancel"></syn-icon>
  <syn-icon slot="hide-burger-menu-icon" name="menu_open"></syn-icon>
</syn-header>
```

**Example (after)**:

```html
<syn-header label="Header" burger-menu="open">
  <syn-icon slot="open-burger-menu-icon" name="cancel"></syn-icon>
  <syn-icon slot="closed-burger-menu-icon" name="menu_open"></syn-icon>
</syn-header>
```

---

<h3 id="syn-prio-nav-v2">`<syn-prio-nav>`</h3>

#### ⚠️ Removed attribute `priority-menu-label` in favor of static translation

**Associated Ticket(s)**:

- [#407](https://github.com/synergy-design-system/synergy-design-system/issues/407)
- [#452](https://github.com/synergy-design-system/synergy-design-system/issues/452)

**Reason**:

For reasons of harmonization between different applications using Synergy, we decided that the label should always be "Menu" (or a translation thereof).
As the `<syn-prio-nav>` is the only component that would be using a property with fallback to a static translation, we do not want to create a precedence that is better handled as a feature usable for all component. The ability to handle translations on a per component base will therefore be provided with a holistic solution working for all components in the future.

Until this solution is provided, we will add documentation of how to provide custom translations in [#452](https://github.com/synergy-design-system/synergy-design-system/issues/452).

**Migration Steps**:

Remove `priority-menu-label` from all `<syn-prio-nav>` elements on the page. This is now always automatically set to "Menu" (or its translatable equivalent).

**Example (before)**:

```html
<!-- Example 1: Custom Label with content -->
<syn-prio-nav priority-menu-label="Something"></syn-prio-nav>

<!-- Example 2: There should be no label shown at all -->
<syn-prio-nav priority-menu-label=""></syn-prio-nav>
```

**Example (after)**:

```html
<!-- Example 1: Custom labels are not supported anymore -->
<syn-prio-nav></syn-prio-nav>

<!-- Example 2: There should be no label shown at all -->
<syn-prio-nav></syn-prio-nav>
<style>
  syn-prio-nav::part(priority-menu-label) {
    display: none;
  }
</style>
```

---

<h3 id="syn-side-nav-v2">`<syn-side-nav>`</h3>

#### ⚠️ Adjusted the open width of the side-nav

**Associated Ticket(s)**:

- [#479](https://github.com/synergy-design-system/synergy-design-system/issues/479)

**Reason**:

To better fit in case of mobile versions / smaller screen sizes, we decided to adjust the width of the opened `<syn-side-nav/>`, to be a bit narrower from 400px to 320px.

**Migration Steps**:
If for some reason the old width of 400px are desired, the css property `--side-nav-open-width` of the side navigation can be overwritten like shown in the following example.

**Example (before)**:

```html
<syn-side-nav open>
  <syn-nav-item current> Navigation Item </syn-nav-item>
  <syn-nav-item divider> Navigation Item </syn-nav-item>
  <syn-nav-item divider> Navigation Item </syn-nav-item>
</syn-side-nav>
```

**Example (after)**:

```html
<syn-side-nav open>
  <syn-nav-item current> Navigation Item </syn-nav-item>
  <syn-nav-item divider> Navigation Item </syn-nav-item>
  <syn-nav-item divider> Navigation Item </syn-nav-item>
</syn-side-nav>
<style>
  syn-side-nav {
    --side-nav-open-width: 400px;
  }
</style>
```

---

<h3 id="syn-card-v2">`<syn-card>`</h3>

#### ⚠️ Remove property `nested` in favor of `sharp`

**Associated Ticket(s)**:

- [#494](https://github.com/synergy-design-system/synergy-design-system/issues/494)

**Reason**:

The property `nested` leads to an incorrect context, because it implies that it can only be used, when nesting cards into each other. But rectangle cards can also be used without nesting.
Therefore the property is replaced with the property `sharp`.

**Migration Steps**:

The deprecated property has to be mapped to the new `sharp` property in the following way:

**Example (before)**:

```html
<syn-card>
  <div slot="header">Header</div>
  <syn-card nested>Nested content</syn-card>
</syn-card>
```

**Example (after)**:

```html
<syn-card>
  <div slot="header">Header</div>
  <syn-card sharp>Nested content</syn-card>
</syn-card>
```

---

<h3 id="angular-v2">`@synergy-design-system/angular`</h3>

#### ⚠️ Removed custom methods for element member methods.

**Associated Ticket(s)**:

- [#473](https://github.com/synergy-design-system/synergy-design-system/issues/473)

**Reason**:

During generation of the angular wrapper components, custom functions exposed from the web-components were automatically generated. We initially integrated those methods as a helper for better `DX` when using our angular wrappers. However, the inclusion lead to a couple of issues:

1. Developers thought they could call those methods safely during render, which may lead to problems as this was never intended to work.
2. We had do patch the components types to make it work correctly.
3. We had to rename all method callers to avoid overlaps when defining the components (e.g. if there was a property `size` and a member called `size` it would lead to name clashes, so the `size` method became `callSize`).
4. Most developers do not even need to call those methods, making them unneeded bloat in the first place.

It also makes it easier for developers that use `@synergy-design-system/components` in various frameworks, as the way of accessing the native elements methods are now the same across all three supported frameworks.

**Migration Steps**:

The native element still exposes its types and all of its native functionality. For example, instead of calling the method `callFocus()` on the wrapper, get the reference to the native Element and call its `focus()` method directly.

**Example (before)**:

```typescript
import { Component, ViewChild } from "@angular/core";
import {
  SynButtonComponent,
  SynInputComponent,
} from "@synergy-design-system/angular";

@Component({
  selector: "home",
  styleUrls: ["./home.styles.css"],
  template: `
    <syn-input #password label="Password" type="password"></syn-input>
    <syn-button (click)="(focusElement)">Focus the password field</syn-button>
  `,
})
export class Home {
  @ViewChild("password") password!: SynInputComponent;

  focusElement() {
    // Focus the element by calling the wrappers callFocus method
    this.password.callFocus();
  }
}
```

**Example (after)**:

```typescript
import { Component, ViewChild } from "@angular/core";
import {
  SynButtonComponent,
  SynInputComponent,
} from "@synergy-design-system/angular";

@Component({
  selector: "home",
  styleUrls: ["./home.styles.css"],
  template: `
    <syn-input #password label="Password" type="password"></syn-input>
    <syn-button (click)="focusElement()">Focus the password field</syn-button>
  `,
})
export class Home {
  @ViewChild("password") password!: SynInputComponent;

  focusElement() {
    // Focus the element by calling the native elements focus method
    this.password.nativeElement.focus();
  }
}
```

---

<h3 id="vue-v2">`@synergy-design-system/vue`</h3>

#### ⚠️ Removed custom methods for element member methods.

**Associated Ticket(s)**:

- [#473](https://github.com/synergy-design-system/synergy-design-system/issues/473)

**Reason**:

During generation of the vue wrapper components, custom functions exposed from the web-components were automatically generated. We initially integrated those methods as a helper for better `DX` when using our vue wrappers. However, the inclusion lead to a couple of issues:

1. Developers thought they could call those methods safely during render, which may lead to problems as this was never intended to work.
2. We had do patch the components types to make it work correctly.
3. We had to rename all method callers to avoid overlaps when defining the components (e.g. if there was a property `size` and a member called `size` it would lead to name clashes, so the `size` method became `callSize`).
4. Most developers do not even need to call those methods, making them unneeded bloat in the first place.

It also makes it easier for developers that use `@synergy-design-system/components` in various frameworks, as the way of accessing the native elements methods are now the same across all three supported frameworks.

**Migration Steps**:

The native element still exposes its types and all of its native functionality. For example, instead of calling the method `callFocus()` on the wrapper, get the reference to the native Element and call its `focus()` method directly.

**Example (before)**:

```html
<script setup lang="ts">
  import { SynVueButton, SynVueInput } from "@synergy-design-system/vue";
  import { ref } from "vue";

  const password = ref<InstanceType<typeof SynVueInput> | null>(null);

  const focusElement = () => {
    // Focus the element by calling the wrappers callFocus method
    password.value?.callFocus();
  };
</script>

<template>
  <SynVueInput ref="password" label="Password" type="password" />
  <SynVueButton @click="focusElement">Focus the password field</SynVueButton>
</template>
```

**Example (after)**:

```html
<script setup lang="ts">
  import { SynVueButton, SynVueInput } from "@synergy-design-system/vue";
  import { ref } from "vue";

  const password = ref<InstanceType<typeof SynVueInput> | null>(null);

  const focusElement = () => {
    // Focus the element by calling the native elements focus method
    password.value?.nativeElement?.focus();
  };
</script>

<template>
  <SynVueInput ref="password" label="Password" type="password" />
  <SynVueButton @click="focusElement">Focus the password field</SynVueButton>
</template>
```

---

<!-- USE THIS AS A TEMPLATE FOR ADDITIONAL MIGRATION STEPS

<h3 id="COMPONENT-VERSION">`<syn-COMPONENT>`</h3>

#### ⚠️ DESCRIBE THE CHANGE HERE

**Associated Ticket(s)**:

- [#1](https://github.com/synergy-design-system/synergy-design-system/issues/1)

**Reason**:

DESCRIBE THE REASON FOR THIS CHANGE

**Migration Steps**:

MIGRATION IN TEXT FORM

**Example (before)**:

```html
EXAMPLE BEFORE THE CHANGE
```

**Example (after)**:

```html
EXAMPLE AFTER THE CHANGE
```

---

-->
