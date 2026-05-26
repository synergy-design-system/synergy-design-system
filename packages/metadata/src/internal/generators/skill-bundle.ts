/**
 * Generate a self-contained Synergy component skill bundle.
 *
 * Copies component metadata from the layers (interface, rules, examples)
 * into a portable skill folder that can be installed to .github/skills/
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createMetadataStore } from '../../public/index.js';

const COMPONENT_SKILL_BODY_MARKDOWN = `
# Synergy Component Skill

This skill provides offline, copyable documentation for Synergy Design System components.

> All files in this skill are generated from Synergy metadata and must not be edited manually.

## When to Use

- You are developing with Synergy components locally
- You want component guidance without running MCP
- You need to share component knowledge with your team via \`.github/skills/\`

## Structure

Each component includes three facets:

### \`interface.md\`
The component's API reference: properties, attributes, slots, methods, events, and type information. Use this for understanding what a component can do technically.

### \`rules.md\`
Usage guidelines, accessibility considerations, common use cases, and best practices. Use this for understanding *when* and *how* to use a component correctly.

> Rules are authoritative within the design system.
> Best practices are recommendations, not enforceable constraints, and may require extension based on product, platform, or regulatory needs.

### \`examples.md\`
Code samples showing common patterns and variations. Use this for understanding typical usage patterns.

## How to Use


### Precedence

> If there is any conflict between guidance in \`rules.md\` and examples shown in \`examples.md\`, always follow \`rules.md\`.

### Order of operations:

1. **Find a component**: Look in the \`components/\` folder for the component you need (e.g., \`syn-button/\`)
2. **Start with \`rules.md\`**: Understand the component's purpose and usage guidelines
3. **Reference \`interface.md\`**: Look up specific properties or attributes
4. **Check \`examples.md\`**: See code samples for your use case

## Installation

Copy this folder to your project's Copilot skills directory:

\`\`\`bash
# Option 1: Manual copy
cp -r synergy-component/ .github/skills/

# Option 2: Using the CLI (if metadata is installed)
npx @synergy-design-system/metadata install-skills --path .github/skills
\`\`\`

After installation, reference this skill with \`@synergy-component\` in Copilot chat for component guidance without leaving your editor.
`.trim();

const TEMPLATE_SKILL_BODY_MARKDOWN = `
# Synergy Templates Skill

This skill provides offline, copyable template examples for common layout and interaction patterns built with the Synergy Design System.

> All files in this skill are generated from Synergy metadata and must not be edited manually.

## Notes on Template Scope

- Templates are illustrative starting points and are not production‑ready implementations.
- They may omit edge cases, error handling, and accessibility refinements that must be addressed based on your product context and applicable standards.

## When to Use

- You are developing with Synergy templates locally
- You want concrete HTML starting points for common UI or layout patterns without running MCP
- You need to share template knowledge with your team via \`.github/skills/\`

## Structure

Templates are currently represented by a single file:

### \`examples.md\`
Code samples showing common layout and interaction patterns. Use this for understanding typical composition and setup patterns.

For component API details and usage rules, use the \`synergy-component\` skill.

## How to Use

1. **Find a template**: Look in the \`templates/\` folder for the template you need (e.g., \`forms/\`)
2. **Open \`examples.md\`**: Review the provided markdown and code snippets
3. **Copy and adapt**: Use the snippet as a starting point and adapt it for your product context

## Installation

Copy this folder to your project's Copilot skills directory:

\`\`\`bash
# Option 1: Manual copy
cp -r synergy-templates/ .github/skills/

# Option 2: Using the CLI (if metadata is installed)
npx @synergy-design-system/metadata install-skills --path .github/skills
\`\`\`

After installation, reference this skill with \`@synergy-templates\` in Copilot chat for template guidance without leaving your editor.

If a suitable template is not available, consider composing a solution from individual components following the guidance in \`synergy-component\`.
`.trim();

interface SkillFrontmatterMetadata {
  version: string;
  source: string;
  generatedAt: string;
  dataBuiltAt: string;
  schemaVersion: string;
  skillType: string;
  contentLayer: string;
}

function buildSkillRootMarkdown(
  name: string,
  description: string,
  metadata: SkillFrontmatterMetadata,
  body: string,
): string {
  return `
---
name: ${name}
description: '${description}'
metadata:
  skill-version: "${metadata.version}"
  source: "${metadata.source}"
  generated-at: "${metadata.generatedAt}"
  data-built-at: "${metadata.dataBuiltAt}"
  schema-version: "${metadata.schemaVersion}"
  skill-type: "${metadata.skillType}"
  content-layer: "${metadata.contentLayer}"
---

${body}
`.trim();
}

interface SkillBundleOptions {
  outputPath: string;
  dataDir?: string;
}

function readPackageVersion(packageJsonContent: string): string {
  const parsed: unknown = JSON.parse(packageJsonContent);

  if (
    typeof parsed !== 'object'
    || parsed === null
    || !('version' in parsed)
    || typeof parsed.version !== 'string'
  ) {
    throw new Error('Invalid package.json: missing string "version" field');
  }

  return parsed.version;
}

/**
 * Generate a self-contained skill bundle at the specified path.
 * Creates:
 * - synergy-component/SKILL.md
 * - synergy-component/components/{component-name}/{interface,rules,examples}.md
 */
export async function generateSkillBundle(options: SkillBundleOptions): Promise<void> {
  const { outputPath, dataDir } = options;

  const packageJsonPath = new URL('../../../package.json', import.meta.url);
  const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
  const packageVersion = readPackageVersion(packageJsonContent);

  const componentSkillPath = resolve(outputPath, 'synergy-component');
  const componentPath = join(componentSkillPath, 'components');
  const templateSkillPath = resolve(outputPath, 'synergy-templates');
  const templatePath = join(templateSkillPath, 'templates');

  // Ensure output directory exists
  await mkdir(componentPath, { recursive: true });
  await mkdir(templatePath, { recursive: true });

  // Create metadata store to access component data
  const store = createMetadataStore({ dataDir });
  const index = await store.getIndex();
  const generatedAt = new Date().toISOString();

  // Write root SKILL.md
  await writeFile(
    join(componentSkillPath, 'SKILL.md'),
    buildSkillRootMarkdown(
      'synergy-component',
      'Local Synergy Design System component reference without MCP. Use to understand component APIs, usage guidelines, examples, and best practices for your local development.',
      {
        contentLayer: 'interface,rules,examples',
        dataBuiltAt: index.builtAt,
        generatedAt,
        schemaVersion: index.version,
        skillType: 'component-reference',
        source: 'synergy-design-system',
        version: packageVersion,
      },
      COMPONENT_SKILL_BODY_MARKDOWN,
    ),
    'utf-8',
  );
  await writeFile(
    join(templateSkillPath, 'SKILL.md'),
    buildSkillRootMarkdown(
      'synergy-templates',
      'Local Synergy Design System template reference without MCP. Use to explore implementation examples for common layout and interaction patterns for local development.',
      {
        contentLayer: 'examples',
        dataBuiltAt: index.builtAt,
        generatedAt,
        schemaVersion: index.version,
        skillType: 'template-reference',
        source: 'synergy-design-system',
        version: packageVersion,
      },
      TEMPLATE_SKILL_BODY_MARKDOWN,
    ),
    'utf-8',
  );

  // Get all components from the components package
  const components = await store.findEntities({ kind: 'component', package: 'components' });

  // For each component, copy the layer files
  for (const entity of components) {
    const componentName = entity.id.replace('component:', '');
    const componentFacetPath = join(componentPath, componentName);

    await mkdir(componentFacetPath, { recursive: true });

    // Copy interface layer
    if (entity.layers?.interface) {
      for (const layerRef of entity.layers.interface) {
        try {
          const content = await store.readLayerFile(layerRef);
          await writeFile(join(componentFacetPath, 'interface.md'), content, 'utf-8');
          break; // Use only the first interface file per component
        } catch (err) {
          // Log but continue
          console.warn(`Failed to copy interface for ${componentName}:`, err);
        }
      }
    }

    // Copy rules layer
    if (entity.layers?.rules) {
      for (const layerRef of entity.layers.rules) {
        try {
          const content = await store.readLayerFile(layerRef);
          await writeFile(join(componentFacetPath, 'rules.md'), content, 'utf-8');
          break; // Use only the first rules file per component
        } catch (err) {
          // Log but continue
          console.warn(`Failed to copy rules for ${componentName}:`, err);
        }
      }
    }

    // Copy examples layer
    if (entity.layers?.examples) {
      for (const layerRef of entity.layers.examples) {
        try {
          const content = await store.readLayerFile(layerRef);
          await writeFile(join(componentFacetPath, 'examples.md'), content, 'utf-8');
          break; // Use only the first examples file per component
        } catch (err) {
          // Log but continue
          console.warn(`Failed to copy examples for ${componentName}:`, err);
        }
      }
    }
  }

  // Get all templates discovered by metadata build and copy their examples layer
  const templates = await store.findEntities({ kind: 'template' });

  for (const entity of templates) {
    const templateName = entity.id.replace('template:', '');
    const templateExamplePath = join(templatePath, templateName);

    await mkdir(templateExamplePath, { recursive: true });

    if (entity.layers?.examples) {
      for (const layerRef of entity.layers.examples) {
        try {
          const content = await store.readLayerFile(layerRef);
          await writeFile(join(templateExamplePath, 'examples.md'), content, 'utf-8');
          break; // Use only the first examples file per template
        } catch (err) {
          // Log but continue
          console.warn(`Failed to copy template example for ${templateName}:`, err);
        }
      }
    }
  }
}
