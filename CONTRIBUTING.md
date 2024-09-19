# Synergy Contribution Guidelines

## Table of contents

- [Synergy Contribution Guidelines](#synergy-design-system-contribution-guidelines)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
  - [Getting started](#getting-started)
  - [Breaking changes](#breaking-changes)
  - [Quality assurance](#quality-assurance)
  - [Managing icons](#managing-icons)
  - [Update dependencies](#update-dependencies)
  - [Coding conventions](#coding-conventions)
    - [Ensure Accessibility](#ensure-accessibility)
    - [API](#api)
  - [Contribution workflow](#contribution-workflow)
  - [Semantic release process](#semantic-release-process)
    - [Pull requests and commits](#pull-requests-and-commits)
      - [Special command \[skip chromatic\]](#special-command-skip-chromatic)
      - [Assignees and reviewers](#assignees-and-reviewers)
  - [Issue tracking](#issue-tracking)

## Overview

Thank you for investing your time to contribute to this project.
We want to make sure to provide our users with a set of feature rich, high quality and easy to use web-components.
To achieve this, we are using some common conventions when contributing features or components to this repository.

## Getting started

- Familiarize yourself with the [Principles of the Synergy Design System](https://synergy-design-system.github.io/?path=/docs/principles-and-vision--docs), which serves as a reference for design guidelines, components, and patterns used in this project. Adhering to these principles will help maintain consistency and a cohesive user experience.

- Have a look at the [Storybook demos](https://synergy-design-system.github.io/?path=/docs/components-syn-button--docs) to get a better understanding of Synergy and its components.

- Synergy components are embedded in a monorepo structure with packages (e. g. `components`) managed by `pnpm` (instead of `npm`). Linting and formatting rules are centralized at root level. Packages have to be run individually (e.g. `cd packages/docs && pnpm start` to start the development server).

## Breaking changes

We build robust and extendable APIs, to avoid future breaking changes as much as possible.
We also ensure stable and reliable updates that align with semantic versioning. Breaking changes are documented prominently [including an update guide](https://synergy-design-system.github.io/?path=/docs/packages-components-breaking-changes--docs).

## Quality assurance

All features and components must be automatically tested to catch regressions. We write tests to validate new features. We always provide storybook stories when authoring new components.
Chromatic is used for checking visual differences. Open https://www.chromatic.com/build?appId=64f819d70a69cb8728e06daf to see and verify the latest changes.

## Managing icons

The single source of truth for the Synergy icons is Figma. All icons are fetched from Figma into the assets project when calling the according script. Read the assets [README](https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/assets/README.md) for further information.

## Update dependencies

We regularly check for updates of our dependencies. This ensures that Synergy should have less security issues and that it stays easily maintainable. We also use GitHubs dependabot which creates automatic PRs as soon dependencies have been updated.

The most important dependency [Shoelace](https://shoelace.style/) is not managed via `pnpm` but via [vendorism](https://github.com/mariohamann/vendorism).
We keep track of Shoelace and regularly integrate the latest versions from Shoelace using the `vendorism` scripts in `packages/components`. Read the components' [README](https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/README.md#local-setup) for further information.

## Coding conventions

We are enforcing common code conventions via `eslint` and `stylelint`. Please make sure your code meets those conventions by linting your files or your PR may not be approved. You may use your editors eslint integration or run `pnpm lint` in the package that you are working on. Linting of all packages is also possible by issuing `pnpm lint` in the root of this repository.

When writing components, use our defined list of design tokens for spacing, fonts or colors. As a rule of thumb, there should be no need to have a static color anywhere in your css code.

Components must be optimized for accessibility. Please use tools like AXE or Dev-Tools and have a look at the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) for further information.

## Formatting

Formatting rules are currently applied via `eslint` and `prettier`. You may format run `pnpm format` in the root of the repository to automatically format your code changes. Note that we are currently using `prettier` for non-code files only, `ts, tsx, js, jsx and vue` will be formatted using eslint.

### Ensure Accessibility

We use semantic HTML elements, ARIA landmarks, roles, states, and properties in components and storybook stories.
We implement tests to ensure that interactive elements can be navigated and activated using the keyboard (tab-index) and ensure the correct sequence of navigation.
We use descriptive text, labels, and instructions to provide context for non-text content.
We ensure that dynamic content changes are announced to screen readers with ARIA live regions.

### API

As stated in our goals, we focus on flexibility and adaptation. These goals are reached by providing proper APIs to our components. This means to prefer slots over attributes and to make use of CSS parts when meaningful.

## Contribution workflow

If you want to contribute to this project, please [make sure that a similar issue does not exist yet](https://github.com/synergy-design-system/synergy-design-system/issues). If it does not exist, create a new issue, using one of our issue templates as a starting point. Create a new pull request, using `main` as source. Request a review when you are done with your changes.

## Semantic release process

In our development workflow, we use Semantic Release to automate the release process for each package by filtering relevant commits. This approach ensures that releases are consistent and predictable.
`@synergy-design-system/vue`, `@synergy-design-system/react` and `@synergy-design-system/angular` always receive the version number of `@synergy-design-system/components` and are published together with it. To make this possible our patched version of `semantic-release-monorepo` takes care of analyzing relevant commits in either (!) of these packages.

### Pull requests and commits

When creating pull requests use structured PR titles. The title is generated from the GitHub issue title: the issue templates guarantee that the following structure "`prefix`:`icon` `text`" is used.
When merging do a squash and merge. The PR title is used as the single commit message, which keeps the Git history clean.
The `prefix` is processed when the PR is merged and decides about the release version. Depending on the title, merged PRs can also create a new Synergy version.

Title conventions for our PRs:

`PREFIX: ICON DESCRIPTION`

ICON and PREFIX are one of the following:

| Icon | Used for      | Commit Prefix | Description                 | Release Type |
| :--: | :------------ | :------------ | :-------------------------- | :----------- |
|  ✨  | Feature       | feat          | Add feature                 | Minor        |
|  🤔  | Bugs          | fix           | Fix a bug                   | Patch        |
|  📚  | Documentation | docs          | Add or update documentation | –            |
|  🔧  | Chore         | chore         | Do something else           | –            |

Examples for valid PR titles:

```
fix: 🤔 Fix accessibility in syn-button
feat: ✨ Add syn-radio
docs: 📚 Add installation instructions
chore: 🔧 Improve build scripts
```

If a change is breaking, be aware that the string "BREAKING CHANGE" must be part of the footer (!) of the final commit message when doing the squash and merge. A change is breaking if a dependant project need to adapt (e.g. API has changed).

Before merging make sure that all sections are filled out properly and that all DoD checkmarks are checked.

When committing changes use meaningful commit messages. Always imagine the perspective of an outsider: ask yourself, would he/she understand?

#### Special command [skip chromatic]

Orientated at [GitHub's commit commands to skip workflows](https://docs.github.com/en/actions/managing-workflow-runs/skipping-workflow-runs), we added a special command to skip Chromatic actions in PRs and commits on main to save screenshots. This should be used with care, as it is only needed in cases where the visual appearance of the components is not affected. For example, when updating the README or the CI configuration.

> Note: This command is only available for PRs and commits on main. It currently doesn't work for single commits on a PR.

#### Assignees and reviewers

When opening a PR, assign it to yourself and everyone who should be involved to the PR, at least one maintaining developer and if there are design related tasks a maintaining designer too. Design feedback is usually given via Chromatic.

## Issue tracking

When creating a new issue on GitHub we first decide which project to assign.

|            | synergy-design-system         | design                       | internal                                           |
| ---------- | ----------------------------- | ---------------------------- | -------------------------------------------------- |
| use for    | code changes in the mono repo | changes in the Figma designs | maintenance stuff like CI pipelines or orga topics |
| visibility | public                        | private                      | private                                            |

Continue with selecting a proper template from the list. The template helps to use a structured title and content. After the issue is created it needs to be refined in the team, so everybody has a common understanding and that it is clear what the exact outcome is desired. Before working on the implementation this refinement process needs to be performed by at least 2 team members, usually the whole team.

> Note: We don't mention the names of internal or external colleagues in issues or other documents hosted on GitHub, as our project is public and can be accessed by anybody. The same goes for internal projects or products. Tagging/mentioning colleagues using their GitHub profiles is fine, as they decided to be visible on GitHub.
