# Handling breaking changes between major versions

This guide holds the required information for migrating from one major version of `@synergy-design-system/components` to the next.
As all our wrappers are based on this package, the changes also hold true for all wrapper packages.

> ⚠️ Migrations **must** always be done from one major version to the next to prevent issues (e.g. with types and property changes)
> This means when moving from `@synergy-design-system@components` v1.x to v3.x,
> you will **have to apply** the changes form v1.x to v2.x first!

---

## Version 2.0

### `<syn-header>`

#### ⚠️ Removed default slot in favor of named slot "label".

**Associated Ticket(s)**:

- [#434](https://github.com/synergy-design-system/synergy-design-system/issues/434)

**Reason**:

The label was originally taken from the default `slot`.
However, this lead to problems as white space characters are also seen as slot contents, preventing the `label` property from working properly.

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

The properties `show-burger-menu` and `burger-menu-visible` where hard to reason about and not aligned with design. They where replaced with an easier to use `burger-menu` property that has one of these different variants: `"hidden"`, `"closed"` or `"open"`.

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

| Slot Name (v1)        | Slot Name (v2)          | Description                            |
| ---------------------- | ------------------------ | -------------------------------------- |
| `show-burger-menu-icon` | `open-burger-menu-icon` | The icon which is shown if burger-menu=open |
| `hide-burger-menu-icon` | `closed-burger-menu-icon`   | The icon which is shown if burger-menu=closed |

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

### `<syn-prio-nav>`

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

<!-- USE THIS AS A TEMPLATE FOR ADDITIONAL MIGRATION STEPS

### `<syn-COMPONENT>`

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
