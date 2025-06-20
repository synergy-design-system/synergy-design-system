# About this folder

This folder holds all figma code connect files used to connect Synergy to Figma.

## Setting up code connect

1. Create a new Figma API token that has read permissions for boards and write permissions for `Code Connect`.
2. Run the following command in the root of the components package: `pnpm exec figma connect publish -t YOUR_FIGMA_TOKEN`.

## Current problems

- [ ] As our figma library has no `<syn-icon>` component, we are not able to directly render instances of `<syn-icon>` and must rely on icon instances. This can be seen in `button.figma.ts` where we are unable to conditionally show prefix or suffix slots.
- [ ] Dynamic Child instances with the same name cannot be distinguished when toggled with various boolean values. Examples for this are `accordion.figma.ts`.
