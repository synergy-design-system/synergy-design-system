# Synergy GitHub Workflows Documentation

This document describes the purpose and dependencies of each workflow in the Synergy repository.

## Workflow Overview

| Workflow Name              | Purpose                                                                 | Dependencies / Triggers                |
|----------------------------|-------------------------------------------------------------------------|----------------------------------------|
| `chromatic-main.yml`       | Runs Chromatic visual regression tests for UI components.               | Depends on successful build; may be triggered after `quality-gate.yml`. |
| `e2e-nightly.yml`          | Runs nightly and manually triggered Chrome Beta tests for components and product E2E demos. | Scheduled on the default branch; manual runs can target selected branches. |
| `lint-changeset.yml`       | Ensures changesets are present and valid for dependency updates.        | Runs on PRs affecting dependencies; independent. |
| `lint-pr-title.yml`        | Checks PR titles for conventional commit compliance.                    | Runs on PR creation/update; independent. |
| `publish-docs.yml`         | Publishes documentation to the docs site (e.g., GitHub Pages).          | Triggered automatically when the "Release new version" workflow completes successfully on the main branch, or can be triggered manually via workflow_dispatch. |
| `quality-gate.yml`         | Main quality check: runs build, lint, tests, and E2E checks.            | Central workflow; other workflows may depend on its success. |
| `release.yml`              | Publishes new package versions to npm and creates GitHub releases.      | Runs on push to `main`; typically after PR merge and successful quality checks. |
| `docker-mcp.yml`           | Builds, smoke tests, and optionally publishes the MCP container.        | Feature-branch changes, manual runs, or calls from the Docker release workflow. |
| `docker-mcp-release.yml`   | Publishes the MCP container and deploys it to Azure Container Apps.      | Successful push-triggered "Release new version" runs on `main`; excludes manual and dry runs. |
| `size.yml`                 | Checks bundle size changes for affected packages.                       | Runs on PRs; independent. |
| `sync-figma-to-tokens.yml` | Syncs design tokens from Figma to the codebase.                         | Scheduled or manual trigger; independent. |

## Workflow Dependencies

- **`quality-gate.yml`** is the central workflow.  
  - Other workflows like `chromatic-main.yml`, and `release.yml` may be configured to run only after this workflow succeeds, ensuring code quality before visual regression, documentation publishing, or releases.
- **Linting workflows** (`lint-changeset.yml`, `lint-pr-title.yml`) and **size checks** (`size.yml`) are independent and run in parallel to ensure code standards and bundle size compliance.
- **`sync-figma-to-tokens.yml`** is typically scheduled or manually triggered and does not depend on other workflows.
- **`release.yml`** runs on push to `main`, usually after a PR is merged and quality checks have passed.
- **`publish-docs.yml`** is triggered automatically after successful completion of the release workflow or can be triggered manually to deploy documentation to GitHub Pages.

## Example Workflow Sequence

1. **PR Created/Updated**
    - `lint-pr-title.yml` checks PR title.
    - `lint-changeset.yml` checks for changesets.
    - `size.yml` checks bundle size.
2. **After `quality-gate.yml` succeeds**
    - `chromatic-main.yml` runs visual regression.
3. **After PR is merged to `main`**
    - `release.yml` publishes new versions and creates releases.
4. **After `release.yml` succeeds**
    - `publish-docs.yml` publishes documentation.

## Notes

- Some workflows may be triggered manually or on a schedule (e.g., `sync-figma-to-tokens.yml` and `e2e-nightly.yml`).
- For exact triggers and dependencies, review the `on:` and `needs:` sections in each workflow file.

## MCP deployment to Azure Container Apps

The automatic sequence is:

1. The package release on `main` succeeds.
2. `docker-mcp-release.yml` calls `docker-mcp.yml` to build and smoke test the container, then push it to GHCR (and optionally Docker Hub).
3. Only after the entire publish job succeeds, `deploy_mcp` updates the existing Azure Container App using the published GHCR image's digest.
4. Deployment waits up to 10 minutes for the new revision to become healthy. A failed update or readiness timeout fails the job; no automatic rollback is performed.

The digest identifies the exact pushed image, even if `latest` changes later. Failed or skipped publishing never triggers deployment. Automatic runs start only after successful push-triggered runs of "Release new version" on `main`; dry runs do not deploy. A manual run is also available on `main` to rebuild, publish and deploy the current MCP package without starting a package release. The release workflow serializes publishing and deployment with `cancel-in-progress: false`, so a new release does not cancel an active deployment. GitHub concurrency keeps only one pending run and does not guarantee queue order.

### One-time setup

Configure these **repository Actions variables** under **Settings > Secrets and variables > Actions > Variables**:

| Variable | Value |
|----------|-------|
| `AZURE_CLIENT_ID` | Client ID of the Microsoft Entra application used for deployment |
| `AZURE_TENANT_ID` | Azure directory (tenant) ID |
| `AZURE_SUBSCRIPTION_ID` | Subscription containing the Container App |
| `AZURE_CONTAINER_APP_NAME` | Existing Container App name |
| `AZURE_CONTAINER_APP_RESOURCE_GROUP` | Resource group containing the app |

No client secret is needed. Configure an OIDC federated credential on the Entra application with:

- Issuer: `https://token.actions.githubusercontent.com`
- Subject: `repo:synergy-design-system/synergy-design-system:ref:refs/heads/main`
- Audience: `api://AzureADTokenExchange`

Grant its service principal permission to update the app, for example **Container Apps Contributor** scoped to that Container App. The deployment job has `id-token: write` for OIDC; the publishing job does not need Azure access. If adding a GitHub environment to the deployment job, update the federated credential subject to match the environment.

The Container App must be able to pull from GHCR: public packages require no credentials; private packages require registry credentials configured in Azure independently of the workflow's Azure login. Use **Single** revision mode to automatically route traffic to a healthy new revision, and configure ingress to target port **9119**. The MCP endpoint is `/mcp`; `/` returns 404.

### Verify the first deployment

After merging the workflow changes, go to **Actions > Release MCP Docker Image > Run workflow** and select `main` to retry the current main version, or watch for a successful push-triggered run of "Release new version" on `main`. A manual run rebuilds and publishes the image before deploying; it does not start a package release. The publish job must finish before **Deploy MCP to Azure** starts. Its summary records the image digest and healthy revision. In the Azure portal, verify that this revision is active and receiving traffic, then connect an MCP client to `https://<app-hostname>/mcp`.

If authentication fails, check the OIDC subject and the three Azure identity variables. Authorization failures indicate missing Azure role assignments. Image pull failures usually indicate GHCR visibility or registry credential issues. For readiness failures, inspect the revision's container logs and ingress/probe settings in Azure.
