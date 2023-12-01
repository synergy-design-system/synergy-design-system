# Synergy Design System Contribution Guidelines

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

If you want to contribute to this project, please [make sure that a similar issue does not exist yet](https://github.com/SickDesignSystem/synergy/issues). If it does not exist, create a new issue, using one of our issue templates as a starting point. Create a new pull request, using `main` as source. Request a review when you are done with your changes.

## Semantic Release Process

In our development workflow, we use Semantic Release to automate the release process for each package. This approach ensures that releases are consistent, predictable, and based on the analysis of relevant commit messages.

### Commit Messages

When committing changes, use structured commit messages to ensure our automated tools can correctly interpret and act upon each change. Examples of valid commit messages include:

Please use the following message conventions for your commits:

`ICON COMMIT PREFIX(PKG) ISSUE_ID: DESCRIPTION`

where ICON and COMMIT PREFIX are one of the following:

| Icon | Used for      | Commit Prefix | Description                 | Release Type |
| :--: | :------------ | :------------ | :-------------------------- | :----------- |
|  ✨  | Features      | feat          | Add feature                 | Major        |
|  🐛  | Bugs          | fix           | Fix a bug                   | Minor        |
|  📚  | Documentation | docs          | Add or update documentation | –            |
|  🔧  | Chore         | chore         | Do something else           | –            |

Examples for valid commit messages:

```
fix(design-tokens) #12: Fixed typo in README.md
feat: ✨ Support for pnpm and workspaces
docs: 📚 Add installation instructions
re:
chore: 🔧 Removed less output from design-tokens (not needed)
```

## Release changes in framework wrapper packages

Framework wrappers (e.g., for Angular) are automatically released when there are changes in the components package, managed by Semantic Release. While most files in the framework packages are auto-generated during the `components` package build, there are cases where manual modifications are necessary (e.g., updating `angular/README.md` or `react/package.json`).

The `createChecksums` script is vital in these scenarios. It performs a dry run of an npm publish and updates `components/package.json` with the checksums of the framework packages' tarballs. This process ensures that even manual changes in the framework packages are reflected in the components package without requiring manual intervention.

### Example Workflow

1. Modify `{framework-name}/package.json` or other files that get published on npm but are not automatically managed by `components`.
2. Run `cd packages/components && pnpm create-checksums` or `(cd packages/components &&) pnpm build`.
3. The script updates `components/package.json` with the new npm tarball's checksums.
4. Commit these changes along with your original modifications, following our structured commit message format.
5. Semantic Release will then automatically handle the release process based on these changes.

### Automatic Checksum Verification and Update

We have implemented a check in our contribution guidelines to ensure the checksums are always correct. This check is automatically triggered after each release. If discrepancies are found, the checks fail. This process helps maintain the integrity and consistency of our release workflow, ensuring that manual changes are correctly accounted for in each release.
