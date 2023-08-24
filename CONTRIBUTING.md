# SICK Design System Contribution Guidelines

Thank you for investing your time to contribute to our project.
We want to make sure to provide our users with a set of feature rich, high quality and easy to use web-components.
To achieve this, we are using some common conventions when contributing features or components to this repository.

## Testing

All features and components must be automatically tested to catch regressions. Please write tests to validate your new features wherever you can. Also make sure to always provide storybook stories when authoring new components.

## Code conventions

We are enforcing common code conventions via `eslint` and `stylelint`. Please make sure your code meets those conventions by linting your files or your PR may not be approved. You may use your editors eslint integration or run `pnpm lint` in the package that you are working on. Linting of all packages is also possible by issuing `pnpm lint` in the root of this repository.

When writing components, use our defined list of design tokens for spacing, fonts or colors. As a rule of thumb, there should be no need to have a static color anywhere in your css code.

Components must be optimized for accessibility. Please use tools like AXE or Dev-Tools and have a look at the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) for further information.

## Contribution workflow:

If you want to contribute to this project, please [make sure that a similar issue does not exist yet](https://github.com/SickDesignSystem/sds/issues). If it does not exist, create a new issue, using one of our issue templates as a starting point. Create a new pull request, using `main` as source. Request a review when you are done with your changes. 

Please use the following message conventions for your commits:

`ICON COMMIT PREFIX(PKG) ISSUE_ID: DESCRIPTION`

where ICON and COMMIT PREFIX are one of the following:

|  Icon  | Used for      | Commit Prefix | Description
|:------:|:--------------|:--------------|:------------
|   🐛   | Bugs          | Fix           | Used when a bug was fixed
|   📚   | Documentation | Doc           | Used when adding or updating documentation
|   ✨   | Features      | Feat          | Feature was added
|   🚀   | Releases      | Rel           | Release was scheduled
|   ⛔   | Removals      | Del           | Used when a feature was removed

and PKG is the package in which changes are done:

- **design-tokens**: Design Tokens package
- **Core**: Web components package
- **lint**: EsLint or stylelint rules

Examples for valid commit messages:

```
🐛 Fix(design-tokens) #12: Fixed typo in README.md
✨ Feat(Core) #6: Support for pnpm and workspaces
📚 Doc(design-tokens) #14: Add installation instructions
🚀 Rel(design-tokens): v0.2.0
⛔ Del(design-tokens) #18: Removed less output from design-tokens (not needed)
```
