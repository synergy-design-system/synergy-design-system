---
"@synergy-design-system/components": patch
---

fix: 🐛 `<syn-combobox>` multiple issues (#1358, #1362)

This release fixes multiple issues when using `<syn-combobox>`:
- Keeps the current typed value when restricted options are loaded asynchronously while the user is typing.
- Prevents automatic selection changes when options are added or updated asynchronously during user input.
- Prevents the listbox from reopening after selecting an option from dynamically created on-demand options.
- Shows all partial matches again when opening the combobox after the value was set programmatically.
