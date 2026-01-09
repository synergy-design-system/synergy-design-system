# Handling breaking changes between major versions

This guide holds the required information for migrating from one major version of `@synergy-design-system/tokens` to the next.

> ⚠️ Migrations **must** always be done from one major version to the next to prevent issues (e.g. with types and property changes)
> This means when moving from `@synergy-design-system@tokens` v1.x to v3.x,
> you will **have to apply** the changes from v1.x to v2.x first!

---

## Version 3.0

<h3 id="theme-sick2025-v3">Theme: SICK 2025</h3>

#### ⚠️ New default theme SICK 2025

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

With the migration from Synergy version 2 to Synergy version 3, we are adjusting the default export.
The `light.css` and `dark.css` theme imports now point to `SICK 2025` instead of `SICK 2018`.

**Migration Steps**:

> These steps are only needed if you want to stay on `SICK 2018` **and** have imported `light.css` or `dark.css`!

- Make sure to load the `sick2018_light.css` or `sick2018_dark.css` files instead of `light.css` and `dark.css`.

**Example (before)**:

```css
/* Points to sick2018_light.css in version 2.x */
@import "@synergy-design-system/tokens/dist/themes/light.css";

/* Points to sick2018_dark.css in version 2.x */
@import "@synergy-design-system/tokens/dist/themes/dark.css";
```

**Example (after)**:

```css
/* Adjust to this path to still load the SICK 2018 theme in version 3.x */
@import "@synergy-design-system/tokens/dist/themes/sick2018_light.css";

/* Adjust to this path to still load the SICK 2018 theme in version 3.x */
@import "@synergy-design-system/tokens/dist/themes/sick2018_dark.css";
```

---

<h3 id="theme-sick2018-v3">Theme: SICK2018</h3>

#### ⚠️ Future deprecation of the SICK 2018 theme

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

The SICK 2018 themes were the primary themes for Synergy version 2.x.
With the release of Synergy version 3, new applications should use the SICK 2025 theme to be brand-compliant.

> We plan to keep the SICK 2018 theme available until at least the beginning of 2027.
> It will likely be removed in the first major release after 2027.

**Migration Steps**:

- Upgrade your application to use the new SICK 2025 theme.

---

<h3 id="token-studio-v3">Token Studio</h3>

#### ⚠️ Future deprecation of outdated token studio code

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

TokenStudio is a Figma solution that was used initially for syncing design tokens from Figma to Code.
With Synergy version 3, we are using Figma Variables for this task.
The original metadata housed in `src/figma-tokens` is no longer used for Synergy and will therefore be removed.

**Migration Steps**:

- If you still need them, copy the assets located in `src/figma-tokens` to a local destination

---

<!-- USE THIS AS A TEMPLATE FOR ADDITIONAL MIGRATION STEPS

<h3 id="change-VERSION">`Change`</h3>

#### ⚠️ DESCRIBE THE CHANGE HERE

**Associated Ticket(s)**:

- [#1](https://github.com/synergy-design-system/synergy-design-system/issues/1)

**Reason**:

DESCRIBE THE REASON FOR THIS CHANGE

**Migration Steps**:

MIGRATION IN TEXT FORM

**Example (before)**:

```css
EXAMPLE BEFORE THE CHANGE
```

**Example (after)**:

```css
EXAMPLE AFTER THE CHANGE
```

---

-->
