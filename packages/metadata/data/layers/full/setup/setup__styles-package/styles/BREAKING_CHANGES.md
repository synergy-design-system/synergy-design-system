# Handling breaking changes between major versions

This guide holds the required information for migrating from one major version of `@synergy-design-system/styles` to the next.

> ⚠️ Migrations **must** always be done from one major version to the next to prevent issues (e.g. with types and property changes)
> This means when moving from `@synergy-design-system@styles` v1.x to v3.x,
> you will **have to apply** the changes from v1.x to v2.x first!

---

## Version 2.0

<h3 id="syn-var-fallbacks-v2">Variable fallbacks</h3>

#### ⚠️ Removed all fallback variables in styles

**Associated Ticket(s)**:

- [#1149](https://github.com/synergy-design-system/synergy-design-system/issues/1149)

**Reason**:

During the migration process of Synergy version 2 to version 3, we added a compatibility layer in the styles package that made it possible for users with misaligned versions of the styles and tokens package to still use the updated styles. This was achieved using fallbacks like this:

```css
/* Original code of @synergy-design-system/styles@1.x */
.syn-table-cell--border-start {
  border-inline-start: var(--syn-border-width-small) solid
    var(--syn-table-border-color, var(--syn-color-neutral-300));
}
```

This helped introduce Synergies new semantic layer without breaking the versioning. However, this also lead to increased bundle sizes.

As the styles and token packages both get new major versions, there is no more need for this deprecation layer in the styles:

```css
/* Original code of @synergy-design-system/styles@2.x */
.syn-table-cell--border-start {
  border-inline-start: var(--syn-border-width-small) solid
    var(--syn-table-border-color);
}
```

**Migration Steps**:

- Make sure to use the latest versions of `@synergy-design-system/styles` and `@synergy-design-system/tokens`.
- The styles package now declares a `peerDependency` on version 3 of `@synergy-design-system/tokens`. You may also remove the installation of `@synergy-design-system/tokens` that was manually needed before as this should be automatically fetched now.

**Example (before)**:

```json
{
  "dependencies": {
    "@synergy-design-system/styles": "^1.0.0",
    "@synergy-design-system/tokens": "2.11.0"
  }
}
```

**Example (after)**:

```json
{
  "dependencies": {
    "@synergy-design-system/styles": "^2.0.0"
  }
}
```

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
