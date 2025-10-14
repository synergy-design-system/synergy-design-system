# Synergy End-to-End Tests

## Overview

This package contains end-to-end (E2E) tests for the Synergy Design System.  
It ensures that core UI components and forms work as expected across supported frameworks and browsers.

## What is Tested

- **Core Synergy Components:**  
  Accordion, Alert, Combobox, Input, OptGroup, Select, TabGroup, Validate, and more.
- **Forms and Validation:**  
  Demo forms, validation logic, and framework-specific behaviors.
- **App Shell and Global Sizing:**  
  Layout and sizing consistency.
- **Framework Integration:**  
  Angular, React, Vanilla JS, and Vue demos are built and tested.

Test files are located in `src/` and organized by component and feature.

## Supported Browsers

E2E tests are run using [Playwright](https://playwright.dev/) in the following browsers:

- **Chromium**
- **Firefox**
- **WebKit** (Safari)

Browser support is configured in `playwright.config.ts` and can be selected via CLI flags.

## Usage

### Install Dependencies

```bash
pnpm install
```

### Build Demo Projects

Before running tests, build the relevant demo project:

```bash
pnpm run prepare.angular
pnpm run prepare.react
pnpm run prepare.vanilla
pnpm run prepare.vue
```

### Run All Tests

```bash
pnpm test
```

- Builds all demo projects and runs all Playwright tests.

### Run Tests for a Specific Browser

```bash
pnpm test --project=chromium
pnpm test --project=firefox
pnpm test --project=webkit
```

- Runs tests only for the specified browser.

### Run Tests with UI

```bash
pnpm run test.ui
```

- Opens the Playwright test runner UI.

### Linting

```bash
pnpm run lint
```

- Runs all linting scripts.

```bash
pnpm run lint:js
```

- Runs JavaScript linting on the `src` directory.

## Scripts Reference

| Script               | Description                                      |
| -------------------- | ------------------------------------------------ |
| `pnpm test`          | Build all demos and run all E2E tests            |
| `pnpm test.ui`       | Run tests in Playwright UI                       |
| `pnpm run prepare.*` | Build a specific demo project                    |
| `pnpm run lint`      | Run all linting scripts                          |
| `pnpm run lint:js`   | Run JS linting on `src`                          |

## Directory Structure

- `src/` — Test specs and page objects
- `playwright.config.ts` — Playwright configuration
- `frameworks.config.ts` — Framework-specific test config
- `test-results/` — Test output and reports

## How to Add New Tests

1. Add your spec file to `src/` or a relevant subfolder.
2. If testing a new component, add a page object in `src/PageObjects/`.
3. Build the relevant demo project.
4. Run tests using the commands above.

## How Tests Are Run in CI

End-to-end tests are automatically executed in CI/CD using GitHub Actions.  
Tests are run in parallel using sharding and a browser matrix:

- **Browsers:** Tests run on Chromium, Firefox, and WebKit (Safari).
- **Sharding:** The test suite is split into multiple shards, each running a subset of tests in parallel for faster feedback.
- **Matrix:** Each shard is run for each browser, ensuring cross-browser coverage.

This setup ensures fast and reliable test results for every pull request.
