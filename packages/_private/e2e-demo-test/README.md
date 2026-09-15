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
- **Platform Contracts:**
  Browser behavior assumptions are tested against minimal fixtures in `platform-contract-demo`.

Test files are located in `src/` and organized by component and feature.

## Supported Browsers

E2E tests are run using [Playwright](https://playwright.dev/) in the following browsers:

- **Chromium**
- **Firefox**
- **WebKit** (Safari)
- **Chrome Beta** (Only nightly, via manual action trigger or when providing `PLAYWRIGHT_FUTURE_BROWSERS=true` in local tests)

Browser support is configured in `playwright.config.ts` and can be selected via CLI flags.

## Usage

### Install Dependencies

```bash
pnpm install

# Install or update all required browsers
pnpm exec playwright install

# For beta testing, may need sudo privileges!
pnpm exec playwright install chrome-beta
```

### Run All Tests

> Caution: This may be flaky with the latest version of react and chrome and its not guaranteed that this will work.

```bash
pnpm test
```

### Run Framework-specific Tests

```bash
# Run all tests for a specific framework
pnpm test.react    # Run React tests
pnpm test.angular  # Run Angular tests
pnpm test.vue      # Run Vue tests
pnpm test.vanilla  # Run Vanilla tests
pnpm test.platform # Run platform contract tests

# Run framework tests for a specific browser
pnpm test.react --project=chromium   # Run React tests in Chromium
pnpm test.angular --project=firefox  # Run Angular tests in Firefox
pnpm test.vue --project=webkit      # Run Vue tests in WebKit
```

- Builds and runs tests for the specified framework and browser.

### Run Future-browser Tests

Chrome Beta is available when future-browser projects are enabled:

```bash
PLAYWRIGHT_FUTURE_BROWSERS=true pnpm test.vanilla --project=chrome-beta
PLAYWRIGHT_FUTURE_BROWSERS=true pnpm test.platform --project=chrome-beta
```

Install Chrome Beta before running these tests locally or in CI:

```bash
pnpm exec playwright install chrome-beta
```

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

| Script              | Description                                       |
| ------------------- | ------------------------------------------------- |
| `pnpm test`         | Build and test all frameworks across all browsers |
| `pnpm test.react`   | Build and test React demo                         |
| `pnpm test.angular` | Build and test Angular demo                       |
| `pnpm test.platform` | Build and test platform contract fixtures        |
| `pnpm test.vue`     | Build and test Vue demo                           |
| `pnpm test.vanilla` | Build and test Vanilla JS demo                    |
| `pnpm test.ui`      | Run tests in Playwright UI                        |
| `pnpm run lint`     | Run all linting scripts                           |
| `pnpm run lint:js`  | Run JS linting on `src`                           |

## Directory Structure

- `src/` — Test specs and page objects
- `src/PlatformContracts/` — Browser/platform contract specs
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
Tests are run using a framework and browser matrix:

- **Frameworks:** Tests run for React, Angular, Vue, and Vanilla JS.
- **Browsers:** Each framework's tests run on Chromium, Firefox, and WebKit (Safari).
- **Matrix:** This creates 12 parallel test runs (4 frameworks × 3 browsers).

This setup ensures comprehensive testing across all supported frameworks and browsers for every pull request.

Future-browser E2E tests are executed by the nightly workflow on `main` and can also be triggered manually for any branch.
This workflow runs the same framework matrix against Chrome Beta to catch upcoming Chrome regressions before they reach the stable browser channel.

> There is no playwright version to test Firefox/Webkit betas!
> Playwright uses a patched Firefox build, and its WebKit build already tracks upstream WebKit changes.
