# Changelog

### Item definitions

The following icons are used in commit messages and this changelog.

|  Icon  | Type          | Description
|:------:|:--------------|:----------------------------
|   🐛   | Bugs          | Used when a bug was fixed
|   📚   | Documentation | Used when adding or updating documentation
|   ✨   | Features      | Feature was added
|   🚀   | Releases      | Release was scheduled
|   ⛔   | Removals      | Used when a feature was removed

---

## 🚀 NEXT

### 📚 Documentation

- #17: Adjusted package.json author field

### 🐛 Bugs

- #11: Set default `ecmaVersion` to es2023 to prevent optional chaining false positives

### ✨ Features

- #7: Added core setup for eslint JavaScript and TypeScript versions.
- #8: Added lint job for checking the lint configuration against its own rules.
- #20: Removed `arrow-parens` rule as fasts template syntax uses it extensively
- #55: Rename package namespace to `@synergy-design-system`
