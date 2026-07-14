# Software Bill of Materials (SBOM)

This folder contains SBOM files for the packages in this repository.

## What is an SBOM?

A **Software Bill of Materials (SBOM)** is a formal, machine-readable inventory of the software components and dependencies that make up a piece of software. Think of it as an ingredient list for a software product — it identifies every open-source library, third-party module, and transitive dependency included in the project, along with metadata such as versions and licenses.

## Why is an SBOM needed?

SBOMs are increasingly required for security, compliance, and supply chain transparency reasons:

- **Vulnerability management** — When a new CVE is published, an SBOM lets you quickly determine whether your software is affected by a vulnerable dependency.
- **License compliance** — SBOMs surface the licenses of all included components, helping teams ensure they meet legal obligations.
- **Regulatory requirements** — Frameworks such as the EU Cyber Resilience Act (CRA) and US Executive Order 14028 mandate SBOMs for software distributed to certain sectors.
- **Supply chain security** — An SBOM provides auditability and transparency into what third-party code is shipped as part of the product.

## Format

The SBOMs in this folder use the [SPDX](https://spdx.dev/) format (JSON), which is one of the two major industry-standard SBOM formats alongside CycloneDX. Each package in the monorepo gets its own file (`<package-name>.json`).

## Generating the SBOMs

Run the following command from the repository root:

```bash
pnpm build:sbom
```

This uses `pnpm sbom` internally to generate one SPDX JSON file per package and writes the output to this folder.
