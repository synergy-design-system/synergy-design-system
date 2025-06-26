# About this folder

This folder holds all figma code connect files used to connect Synergy to Figma.

## Setting up code connect

1. Create a new Figma API token that has read permissions for boards and write permissions for `Code Connect`.
2. Run the following command in the root of the components package: `pnpm exec figma connect publish -t YOUR_FIGMA_TOKEN`.

## Current problems

- [ ] As our figma library has no `<syn-icon>` component, we are not able to directly render instances of `<syn-icon>` and must rely on icon instances. This can be seen in `button.figma.ts` where we are unable to conditionally show prefix or suffix slots.
- [ ] Dynamic Child instances with the same name cannot be distinguished when toggled with various boolean values. Examples for this are `accordion.figma.ts`.
- [ ] We will have to add all helper sub component instances and map their own props down via `figma.nestedProps`. This means adding the helper instance and defining the props twice.
- [ ] All component code **must** be placed in the `figma.connect` call. It is **not** possible to create factories as even the values of sub-properties **most** be defined in the same file. External code is forbidden. Even statements like `import { html as output } from '@figma/code-connect/html';` are invalid.
- [ ] You currently cannot use `figma.nestedProps` in `figma.className`, see syn-link. It is also not possible to join classNames or destructure them.
- [ ] `figma.enum` will always remove the default property. This makes it hard to use with `figma.className` as for example sizes have to be explicitly added for `syn-link`.
- [ ] Its not possible to map multiple values to a single enum type. In case of `syn-tooltip` with 4 boolean position sliders there is no way to map this to the property `position="top|bottom|left|right".



Skipped:

- syn-combobox (needs: syn-menu, syn-menu-item, syn-optgroup, syn-option)
- syn-header (needs: syn-prio-nav, syn-nav-item)
- syn-menu (needs: syn-menu-item, syn-menu-label)
- syn-prio-nav (needs: syn-nav-item)

---

## Progress

- [x] syn-accordion
- [x] syn-alert
- [x] syn-badge
- [x] syn-breadcrumb
- [x] syn-breadcrumb-item
- [x] syn-button
- [x] syn-card
- [x] syn-checkbox
- [ ] syn-combobox
- [x] syn-details
- [x] syn-dialog
- [x] syn-divider
- [x] syn-drawer
- [ ] syn-dropdown
- [x] syn-file
- [ ] syn-header
- [x] syn-icon-button
- [x] syn-input
- [x] syn-link
- [x] syn-link-list
- [ ] syn-menu
- [ ] syn-menu-item
- [ ] syn-menu-label
- [ ] syn-nav-item
- [ ] syn-optgroup
- [ ] syn-option
- [ ] syn-prio-nav
- [x] syn-progress-bar
- [x] syn-progress-ring
- [x] syn-radio
- [ ] syn-radio-group
- [ ] syn-range
- [ ] syn-range-tick
- [ ] syn-select
- [ ] syn-side-nav
- [x] syn-spinner
- [x] syn-switch
- [ ] syn-tab
- [ ] syn-tab-group
- [ ] syn-tab-panel
- [ ] syn-table-cell
- [x] syn-tag
- [x] syn-textarea
- [x] syn-tooltip
- [x] syn-validate
