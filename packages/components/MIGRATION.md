# Migration guide for major version changes

This guide holds the required information for migrating from one version of `@synergy-design-system/components`.
As all our wrappers are based on this package, the changes also hold true for all wrapper packages.

> ⚠️ Migrations should always be done from one major version to the next.
> This means when moving from `@synergy-design-system@components` 1.x to 3.x,
> you will have to apply the changes form 1.x to 2.x first!

---

## Version 2.0

### `<syn-header>`

#### ⚠️ Removed default slot in favour of named slot "label".

**Associated Ticket(s)**:

- [#434](https://github.com/synergy-design-system/synergy-design-system/issues/434)

**Reason**:

The label was originally taken from the default `slot`.
However, this lead to problems as white space characters are also seen as slot contents, preventing the `label` property from working.

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

#### ⚠️ Removed props `show-burger-menu` and `burger-menu-visible` in favour of `burger-menu`.

**Associated Ticket(s)**:

- [#430](https://github.com/synergy-design-system/synergy-design-system/issues/430)

**Reason**:

The properties `show-burger-menu` and `burger-menu-visible` where hard to reason about and not aligned with design. They where replaced with an easier to use `burger-menu` property that has one of these different variants: `"hidden"`, `"closed"` or `"opened"`.

**Migration Steps**:

The deprecated properties have to be mapped to the new `burger-menu` property in the following way:

| `show-burger-menu` | `burger-menu-visible` | `burger-menu` |
| :----------------- | :-------------------- | :------------ |
| `false`            | `true`, `false`       | `"hidden"`    |
| `true`             | `true`                | `opened`      |
| `true`             | `false`               | `closed`      |

**Example (before)**:

```html
<syn-header show-burger-menu burger-menu-visible></syn-header>
```

**Example (after)**:

```html
<syn-header burger-menu="opened"></syn-header>
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
| `syn-burger-menu-show` | `syn-burger-menu-opened` | Emitted when the burger menu is opened |
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

  header.addEventListener("syn-burger-menu-opened", () => {
    console.log("Header is shown");
  });

  // New!
  header.addEventListener("syn-burger-menu-hidden", () => {
    console.log("Header is hidden");
  });
</script>
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
