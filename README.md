# Synergy Design System

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./packages/docs/public/synergy_logo_dark.png" width="400">
  <img alt="Logo" src="./packages/docs/public/synergy_logo_light.png" width="400">
</picture>

Welcome to the home of the Synergy Design System. Synergy is the foundation to efficiently build a consistent digital landscape for SICK.

This project is mainly intended for usage in [SICK](https://www.sick.com) applications to ensure a unique look and feel across applications, however you may also use it [for your own projects for free](./LICENSE) as well.

## Documentation

The documentation is always up-to-date and can be found on https://synergy-design-system.github.io/ .

## Source code

The code resides on GitHub: https://github.com/synergy-design-system/synergy-design-system .

## Packages

This repository is comprised of several sub-packages.

| package    | description                                                                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| angular    | angular wrappers for better DX in Angular (auto generated)                                                                                                             |
| assets     | icons and logos                                                                                                                                                        |
| components | user interface components based on custom elements and lit                                                                                                             |
| docs       | storybook documentation showing all components and their properties in an interative environment                                                                       |
| mcp        | Source for the synergy MCP server                                                                                                                                      |
| react      | react wrappers for better DX in React (auto generated)                                                                                                                 |
| styles     | CSS Helper classes                                                                                                                                                     |
| tokens     | design tokens which contain basic design variables for colors, spacings, sizes, fonts etc. They are always in sync with the Figma library, and the base for CSS styles |
| vue        | vue wrappers for better DX in VueJS (auto generated)                                                                                                                   |

---

## Development environment

Synergy uses a monorepo setup, using [node.js](https://nodejs.org) as a runtime and [pnpm](https://pnpm.io) for dependency management and build scripts. We also use [corepack](https://pnpm.io/installation#using-corepack) to handle the current required versions of node and pnpm. If not already installed, install and configure these tools.

1. `pnpm install --recursive` installs all dependencies.
2. `pnpm build` in the root directory forces a build all packages that provide a build job.
3. `pnpm lint` in the root directory will run all configured lint jobs.

## Creating releases

Synergy uses [Changesets](https://github.com/changesets/changesets) for creating new releases.
Please use the corresponding scripts like `release.create` to create new changesets.
The Synergy CI/CD will automatically check for availability of a new changeset when it is run, making sure that all needed packages are included, too.

You may check which packages will be released via `pnpm release.status`.

### Manual releases

Run the following scripts in this order to create a new release (assuming you already have a valid changeset created!).

```bash
# Every command must be run in the project root!

# First, install everything
pnpm install -r

# Build the whole project
pnpm build

# Optional: Make sure the MCP server has latest data
pnpm -filter mcp build:all

# Creates changeset changelogs and bumps package.json files
pnpm changeset version

# Commit and push to main. Note the skip ci is crucial to not trigger an infinite loop!
git add .
git commit -m "chore: 🚀 version packages [skip ci]"

# Creates tags for all projects that where changed
pnpm changeset tag

# Push to main
git push origin main
git push --tags

# Finally, publish to npm registry
pnpm publish --recursive --access=public
```
