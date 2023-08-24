# SICK Design System

Welcome to the home of the SICK Design System (**SDS**) 🎨.

> **Warning**! Documentation is currently work in progress and we will update it while providing the bits and pieces of packages as we see fit. A complete developer documentation will be part of [our way to version 1.0](https://github.com/orgs/SickDesignSystem/projects/2/views/11?sliceBy%5Bvalue%5D=Basic+Setup).

---

This repository provides a set of design-tokens, css styles, web-components and documentation that make it easy to use the SICK Design System in web based applications in a framework agnostic way.

The packages SDS consists of are mainly intended for usage in [SICK](https://www.sick.com) applications to ensure a unique look and feel across products, however you may also use them [for your own projects for free](./LICENSE) as well.

---

## Development environment

SDS uses a monorepo setup, using [node.js](https://nodejs.org) as a runtime and [pnpm](https://pnpm.io) for dependency management and build scripts. If not already installed, install and configure those tools.

1. `pnpm install --recursive` installs all dependencies.
2. `pnpm build` in the root directory forces a build all packages that provide a build job.
3. `pnpm lint` in the root directory will run all configured lint jobs.
