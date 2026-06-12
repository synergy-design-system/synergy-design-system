# Chrome 149 Focus and Top-Layer Guide for App Teams

This guide explains why focus and popup behavior can break in newer Chrome versions, what symptoms to look for, and how app teams can harden their own code.

## Why this happens

Two browser changes can combine and cause regressions.

1. Top-layer behavior change
- Applies to native dialog, popover, and other top-layer UI.
- Pseudo-classes such as :focus-within, :hover, and :active do not propagate the same way across top-layer boundaries.
- Result: parent components can incorrectly think focus or hover left the component.

2. Programmatic focus policy tightening
- Browser may block focus() in contexts without valid user activation.
- Result: async focus calls can fail silently.

## Common symptoms

- A popup opens, then immediately closes when selecting an item.
- Focus jumps out of a dialog when interacting with nested popup content.
- Escape closes one layer but focus is not restored reliably.
- Keyboard navigation works inconsistently after async updates.
- Hover based keep-open menus collapse unexpectedly.

## Is this about positioned elements

Usually this is not about normal positioned elements alone.

- position absolute or fixed by itself is typically fine.
- The risky part is crossing a top-layer boundary.
- Top-layer examples: native dialog, native popover, popup systems that use them under the hood.

So if a component is both positioned and moved into top-layer behavior, it can be affected.

## Fast risk checklist

A component is high risk if it does two or more of the following:

- Uses popups or overlays that may render in top-layer.
- Uses :focus-within to enforce focus traps.
- Uses event.composedPath() only to decide inside vs outside focus.
- Uses document focusin listeners to auto-close overlays.
- Calls focus() inside async callbacks such as Promise then, requestAnimationFrame, or setTimeout.

## Mitigation patterns for application code

1. Do not rely only on :focus-within for focus trapping
- Add DOM containment checks against activeElement and shadow roots.
- Treat top-layer descendants as still logically inside your interaction flow.

2. Do not rely only on composedPath includes host
- Combine composedPath checks with contains checks when possible.
- For slotted or light DOM children, contains is often more reliable.

3. Prefer user-gesture-synchronous focus
- Move important focus() calls into direct click or key handlers.
- Minimize delayed focus in async chains.
- If async focus is required, include a fallback path.

4. Keep close logic defensive
- Before closing on focusin or mousedown, confirm the target is truly outside both trigger and popup content.
- Be careful when popup content is rendered by another root or top-layer container.

5. Use layered-close behavior
- Escape key: close innermost overlay first.
- Restore focus to a stable control after close.
- Avoid duplicate close handlers competing at multiple levels.

## Suggested fallback strategy

If programmatic focus fails:

- Keep UI state valid even without focus restoration.
- Provide visible selection feedback.
- Keep keyboard target reachable with one tab step.
- Log a development warning in non-production builds to detect blocked focus.

## Test matrix for app teams

Run these checks in Chrome 149+ and one non-Chrome browser.

1. Component inside native dialog
- Open popup
- Select an item
- Verify it does not instantly close unless expected
- Verify focus restoration

2. Component inside native popover
- Open nested popup content
- Tab through items
- Escape back out one layer at a time

3. Nested overlays
- Dialog containing dropdown/select/combobox
- Ensure no focus ping-pong between trap and nested overlay

4. Async updates
- Update options after fetch
- Ensure focus and keyboard behavior stay stable

## Advice to share with your own users

If users report random popup closes or focus jumps after a browser update:

- Ask whether the UI is inside dialog or popover containers.
- Ask whether the issue is Chrome specific.
- Ask whether async updates happen right before selection.
- Suggest updating to latest component package that includes top-layer focus fixes.

## Summary

Most regressions are caused by top-layer boundary semantics and stricter focus policy, not by basic positioning alone. Use defensive inside or outside checks, reduce reliance on :focus-within, and keep focus restoration tied to real user gestures.
