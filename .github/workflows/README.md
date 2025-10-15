# Synergy GitHub Workflows Documentation

This document describes the purpose and dependencies of each workflow in the Synergy repository.

## Workflow Overview

| Workflow Name              | Purpose                                                                 | Dependencies / Triggers                |
|----------------------------|-------------------------------------------------------------------------|----------------------------------------|
| `chromatic-main.yml`       | Runs Chromatic visual regression tests for UI components.               | Depends on successful build; may be triggered after `quality-gate.yml`. |
| `lint-changeset.yml`       | Ensures changesets are present and valid for dependency updates.        | Runs on PRs affecting dependencies; independent. |
| `lint-pr-title.yml`        | Checks PR titles for conventional commit compliance.                    | Runs on PR creation/update; independent. |
| `publish-docs.yml`         | Publishes documentation to the docs site (e.g., GitHub Pages).          | Depends on successful build and docs generation; may be triggered after `quality-gate.yml`. |
| `quality-gate.yml`         | Main quality check: runs build, lint, tests, and E2E checks.            | Central workflow; other workflows may depend on its success. |
| `size.yml`                 | Checks bundle size changes for affected packages.                       | Runs on PRs; independent. |
| `sync-figma-to-tokens.yml` | Syncs design tokens from Figma to the codebase.                         | Scheduled or manual trigger; independent. |

## Workflow Dependencies

- **`quality-gate.yml`** is the central workflow.  
  - Other workflows like `chromatic-main.yml` and `publish-docs.yml` may be configured to run only after this workflow succeeds, ensuring code quality before visual regression or documentation publishing.
- **Linting workflows** (`lint-changeset.yml`, `lint-pr-title.yml`) and **size checks** (`size.yml`) are independent and run in parallel to ensure code standards and bundle size compliance.
- **`sync-figma-to-tokens.yml`** is typically scheduled or manually triggered and does not depend on other workflows.
- **`chromatic-main.yml`** and **`publish-docs.yml`** may require a successful build and test run from `quality-gate.yml` before execution.

## Example Workflow Sequence

1. **PR Created/Updated**
    - `lint-pr-title.yml` checks PR title.
    - `lint-changeset.yml` checks for changesets.
    - `size.yml` checks bundle size.
    - `quality-gate.yml` runs build, lint, tests, and E2E.
2. **After `quality-gate.yml` succeeds**
    - `chromatic-main.yml` runs visual regression.
    - `publish-docs.yml` publishes documentation.

## Notes

- Some workflows may be triggered manually or on a schedule (e.g., `sync-figma-to-tokens.yml`).
- For exact triggers and dependencies, review the `on:` and `needs:` sections in each workflow file.

