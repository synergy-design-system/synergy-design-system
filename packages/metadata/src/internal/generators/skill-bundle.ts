/**
 * Generate a self-contained Synergy component skill bundle.
 *
 * Copies component metadata from the layers (interface, rules, examples)
 * into a portable skill folder that can be installed to .github/skills/
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createMetadataStore } from '../../public/index.js';

const SKILL_ROOT_MARKDOWN = `
---
name: synergy-component
description: 'Local Synergy Design System component reference without MCP. Use to understand component APIs, usage guidelines, examples, and best practices for your local development.'
---

# Synergy Component Skill

This skill provides offline, copyable documentation for Synergy Design System components.

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

### \`examples.md\`
Code samples showing common patterns and variations. Use this for understanding typical usage patterns.

## How to Use

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

interface SkillBundleOptions {
  outputPath: string;
  dataDir?: string;
}

/**
 * Generate a self-contained skill bundle at the specified path.
 * Creates:
 * - synergy-component/SKILL.md
 * - synergy-component/components/{component-name}/{interface,rules,examples}.md
 */
export async function generateSkillBundle(options: SkillBundleOptions): Promise<void> {
  const { outputPath, dataDir } = options;

  const skillPath = resolve(outputPath, 'synergy-component');
  const componentPath = join(skillPath, 'components');

  // Ensure output directory exists
  await mkdir(componentPath, { recursive: true });

  // Write root SKILL.md
  await writeFile(join(skillPath, 'SKILL.md'), SKILL_ROOT_MARKDOWN, 'utf-8');

  // Create metadata store to access component data
  const store = createMetadataStore({ dataDir });

  // Get all components from the components package
  const components = await store.findEntities({ kind: 'component', package: 'components' });

  // For each component, copy the layer files
  for (const entity of components) {
    const componentName = entity.id.replace('component:', '');
    const componentSkillPath = join(componentPath, componentName);

    await mkdir(componentSkillPath, { recursive: true });

    // Copy interface layer
    if (entity.layers?.interface) {
      for (const layerRef of entity.layers.interface) {
        try {
          const content = await store.readLayerFile(layerRef);
          await writeFile(join(componentSkillPath, 'interface.md'), content, 'utf-8');
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
          await writeFile(join(componentSkillPath, 'rules.md'), content, 'utf-8');
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
          await writeFile(join(componentSkillPath, 'examples.md'), content, 'utf-8');
          break; // Use only the first examples file per component
        } catch (err) {
          // Log but continue
          console.warn(`Failed to copy examples for ${componentName}:`, err);
        }
      }
    }
  }
}
