# Chrome 149 Focus & Top-Layer Changes: Impact on syn-select

## Summary

Chrome 149 introduced two significant spec changes that break focus management in Synergy components, particularly `syn-select`:

1. **`focus-without-user-activation` permissions policy** (Issue [#40095111](https://issues.chromium.org/issues/40095111)) - Blocks programmatic focus calls
2. **Top-layer pseudo-class propagation boundary** (Issue [#407769114](https://issues.chromium.org/issues/407769114)) - Pseudo-classes like `:focus-within` no longer bubble through top-layer boundaries

These changes break the close behavior and focus management of `syn-select` when used in dialogs/drawers and affect the general focus contract for Web Components.

## Related Issues

- **Chromium Issue #40095111**: "Implement and Ship Feature Policy for Programmatic Focus"
  - https://issues.chromium.org/issues/40095111
  - Shipped: Chrome 149 (as of May 2026)
  - W3C Explainer: https://github.com/w3c/webappsec-permissions-policy/pull/304

- **Chromium Issue #407769114**: "[css-ui] select:hover and select:active styles"
  - https://issues.chromium.org/issues/407769114
  - Shipped: Chrome 149 (Mar 21, 2026)
  - CSS Working Group Resolution: Pseudo-class propagation stops at top-layer boundaries

- **Synergy Issue #1297**: "Automatically closing selects in dialogs" (partial fix)
  - Current solution only checks for `syn-dialog`/`syn-drawer` containers and calls `modal?.activateExternal()`

## The Problem

### Current Synergy Solution (Line 318-325 in select.component.ts)

```typescript
private getContainingModalHost() {
  return this.closest('syn-dialog, syn-drawer') as
    | (HTMLElement & { modal?: { activateExternal(): void; deactivateExternal(): void } })
    | null;
}

// Later, when opening:
this.getContainingModalHost()?.modal?.activateExternal();

// When closing:
this.getContainingModalHost()?.modal?.deactivateExternal();
```

**Why this no longer works in Chrome 149:**

1. **Issue #40095111**: The `focus-without-user-activation` policy blocks programmatic `focus()` calls unless:
   - There's explicit user activation (click, keyboard event)
   - The permissions policy explicitly allows it
   - Focus targets an element within the same document/component tree

   The current code assumes `activateExternal()` creates a user activation context, but this doesn't fully account for:
   - Where the `focus()` call originates (the initiator frame's policy is checked, not the target's)
   - Async focus calls lose their activation context (e.g., `updateComplete.then(() => this.displayInput.focus())`)
   - Web Components with shadow DOM boundaries may be treated as separate contexts

2. **Issue #407769114**: The select's close mechanism (lines 342-350) relies on detecting focus escape:
   ```typescript
   private handleDocumentFocusIn = (event: KeyboardEvent) => {
     // Close when focusing out of the select
     const path = event.composedPath();
     if (this && !path.includes(this)) {
       this.hide();
     }
   };
   ```

   This relies on `:focus-within` pseudo-class state and composed path detection. However, when the popup is in the top-layer:
   - Pseudo-classes no longer propagate through the top-layer boundary
   - State tracking becomes unreliable
   - The component doesn't reliably detect when focus has left

## Impact on syn-select

### In Dialogs/Drawers (Issue #1297 scope)

- Focus may not move to the display input when the select opens
- Keyboard navigation might fail because focus tracking is unreliable
- The select may not close when focus leaves (because the event detection fails)
- Multiple focus calls in async chains (e.g., after `updateComplete`) are silently blocked

### General Usage

- Async focus calls throughout the component are affected:
  - Line 545: `updateComplete.then(() => { this.emit('syn-change'); this.emit('syn-input'); this.displayInput.focus(); })`
  - Line 575: `updateComplete.then(() => this.displayInput.focus());`
  - Line 626: `updateComplete.then(() => { this.emit('syn-remove'); this.displayInput.focus(); })`
  - Line 849: After animation completes, focus operations may be blocked

- The `isUserInput` flag (line 73) doesn't adequately track genuine user activation context

## Root Causes

### Issue 1: Focus Calls Lose User Activation Context

Focus calls in async chains (`setTimeout`, `updateComplete.then()`) are no longer considered as having user activation, even if they originated from a user interaction. The Chrome 149 policy evaluates activation at call-time, not at origin-time.

**Example:**
```typescript
// User clicks the select (has activation)
handleComboboxMouseDown(event: MouseEvent) {
  this.displayInput.focus({ preventScroll: true }); // ✓ Works
  
  // But later in an async callback:
  this.updateComplete.then(() => {
    this.displayInput.focus(); // ✗ Blocked by policy
  });
}
```

### Issue 2: Top-Layer Pseudo-Class Boundaries Break Focus Detection

Components relying on `:focus-within` pseudo-class propagation for close/hide behavior are affected. The popup being in the top-layer creates a boundary where focus state is no longer visible to ancestors.

**Example:**
```typescript
// This event may not fire correctly when focus enters the top-layer popup
private handleDocumentFocusIn = (event: KeyboardEvent) => {
  const path = event.composedPath(); // Path may be incomplete across top-layer
  if (this && !path.includes(this)) {
    this.hide(); // May not be called reliably
  }
};
```

### Issue 3: Web Components Context

Web Components with shadow DOM are evaluated as separate contexts by the focus policy. The permission policy checks where `focus()` is called (the initiator), not where it targets.

## Recommended Solutions

### Short-term Fix (Preserve Current Behavior)

1. **Track user activation more carefully**: Store a flag when user interaction starts, and maintain that context through async operations
   
   ```typescript
   private userActivationContext: boolean = false;
   
   private handleComboboxMouseDown(event: MouseEvent) {
     this.userActivationContext = true;
     // ... rest of handler
     
     this.updateComplete.then(() => {
       if (this.userActivationContext) {
         this.displayInput.focus();
       }
     });
   }
   ```

2. **Avoid unnecessary async focus calls**: Focus immediately after user interaction when possible, rather than deferring to `updateComplete`

3. **Use event-based close detection**: Replace pseudo-class based detection with explicit event listeners that work across top-layer boundaries

   ```typescript
   private handleDisplayInputBlur() {
     // Safer than relying on composed path detection
     this.hide();
   }
   ```

### Medium-term Fix (Proper Top-Layer Handling)

1. **Listen to `focusin`/`focusout` events** on the select itself instead of document-level listeners:
   ```typescript
   // More reliable than handleDocumentFocusIn with top-layer boundaries
   this.addEventListener('focusout', (event: FocusEvent) => {
     if (!this.contains(event.relatedTarget as Node)) {
       this.hide();
     }
   });
   ```

2. **Coordinate with syn-popup**: Ensure the popup component understands focus delegation through top-layer boundaries

3. **Document focus behavior**: Clarify when and why focus operations may fail due to browser policies

### Long-term Fix (Architectural Changes)

1. **Move focus management to form control layer**: Higher-level form control should handle focus, not individual components

2. **Implement focus delegation API**: Consider using the Permissions Policy delegation mechanism once standardized

3. **Reduce reliance on programmatic focus**: Make focus behavior opt-in or provide alternatives (e.g., scroll-into-view instead of focus)

## Testing Recommendations

1. **Test in Chrome 149+**: Verify all focus-related behavior
2. **Test dialogs**: Verify syn-select behavior when opened inside syn-dialog/syn-drawer
3. **Test keyboard navigation**: Verify arrow keys and Enter work for opening/closing
4. **Test async operations**: Verify focus works after animations, value changes, async data loading
5. **Test focus blur**: Verify select closes when focus leaves the component

## Browser Compatibility Notes

- **Chrome 149+**: Both issues apply
- **Chrome 148 and earlier**: These changes don't apply; current behavior works
- **Firefox, Safari**: Not affected by these Chrome-specific changes, but should be tested for general focus behavior

## References

- [Chromium Issue #40095111 - Programmatic Focus Policy](https://issues.chromium.org/issues/40095111)
- [W3C PR #304 - focus-without-user-activation](https://github.com/w3c/webappsec-permissions-policy/pull/304)
- [Chromium Issue #407769114 - Top-Layer Pseudo-Class Boundaries](https://issues.chromium.org/issues/407769114)
- [HTML Standard - Focus Steps](https://html.spec.whatwg.org/multipage/interaction.html#focus-update-steps)
- [Synergy Issue #1297 - Original Dialog Auto-Close Fix](./packages/components/src/components/select/select.component.ts#L318-L325)
