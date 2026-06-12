# Chrome 149 Top-Layer and Focus Policy: At-Risk Synergy Components

This document lists Synergy components that are likely to be affected by Chrome 149+ top-layer and focus behavior changes.

## Why these components are at risk

The highest-risk pattern is any component that combines two or more of:

- popup or overlay rendering (often via `syn-popup`, which may use native popover)
- document-level `focusin` listeners
- close-on-outside logic using only `event.composedPath()`
- imperative `focus()` restoration
- modal focus trap interactions

## Confirmed and high-probability components

1. `syn-select`
- File: `packages/components/src/components/select/select.component.ts`
- Risk patterns:
  - document `focusin` close behavior
  - `composedPath()` based inside/outside checks
  - imperative focus restoration
  - popup in top-layer context
- Status: patched for top-layer-safe focus detection.

2. `syn-dropdown`
- File: `packages/components/src/components/dropdown/dropdown.component.ts`
- Risk patterns:
  - popup overlay with open/close listeners
  - imperative trigger focus restoration
  - modal `activateExternal()` integration
- Status: behavior improved by shared modal fix; keep modal activation workaround.

3. `syn-combobox`
- File: `packages/components/src/components/combobox/combobox.component.ts`
- Risk patterns:
  - document `focusin` close behavior
  - `composedPath()` close checks
  - heavy imperative focus calls
  - popup/listbox behavior similar to select
- Status: high-priority candidate for same fix pattern as select.

4. `syn-menu` submenu flows
- Files:
  - `packages/components/src/components/menu/menu.component.ts`
  - `packages/components/src/components/menu-item/submenu-controller.ts`
- Risk patterns:
  - nested popups/submenus
  - composed-path based event target resolution
  - hover/focus behaviors sensitive to top-layer boundaries
- Status: monitor and validate with submenu scenarios.

5. Shared modal infrastructure (`syn-dialog`/`syn-drawer`)
- File: `packages/components/src/internal/modal.ts`
- Risk patterns:
  - focus trap logic previously relying on `:focus-within`
  - imperative focus enforcement
- Status: patched to avoid relying solely on `:focus-within` for top-layer interactions.

## Lower risk but worth regression checks

- Components using popup positioning without strong focus management may still be impacted by hover/focus style changes when nested in top-layer contexts.
- Any component that calls `focus()` in async callbacks (`setTimeout`, `requestAnimationFrame`, promise `then`) should be tested.

## User-facing symptoms to watch for

- popup closes immediately after selecting an option
- focus jumps out of dialog/drawer while interacting with nested popup content
- Escape closes wrong layer or focus is not restored
- keyboard navigation breaks after value updates
- submenu hover/focus behavior feels unstable

## Recommended temporary manual validation matrix

For each component below, validate in both:
- native `<dialog>`
- native popover (`popover="manual"`)

Component list:
1. `syn-select` (single and multiple)
2. `syn-combobox` (single and multiple if used)
3. `syn-dropdown` with `syn-menu`
4. `syn-menu` with nested submenu (`slot="submenu"`)

Checks:
1. open popup
2. select or navigate with keyboard
3. press Escape
4. tab to next control
5. verify focus remains logical and no immediate auto-close occurs

## Guidance for app teams

If your own app composes Synergy components inside dialogs/popovers and sees regressions in Chrome 149+:

- avoid relying only on `:focus-within` for focus trap decisions
- avoid relying only on `composedPath()` for inside/outside checks
- keep focus restoration tied to direct user gestures where possible
- validate nested overlay behavior explicitly (dialog -> select/dropdown/combobox -> submenu)
