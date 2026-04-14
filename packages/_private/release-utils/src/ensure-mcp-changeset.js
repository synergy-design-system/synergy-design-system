#!/usr/bin/env node
import getChangesets from '@changesets/read';
import writeChangeset from '@changesets/write';
import { BRANCH_COMMIT_ICONS } from './constants.js';

/**
 * Ensures metadata and MCP packages are included in changesets when other packages are being released.
 * This is necessary because both packages need to be updated with the latest changelog metadata.
 */
export async function ensureMcpChangeset() {
  try {
    const requiredPackages = [
      '@synergy-design-system/metadata',
      '@synergy-design-system/mcp',
    ];

    // Read existing changesets
    const changesets = await getChangesets(process.cwd());

    // Check which required packages are already included in any changeset
    const includedPackages = new Set(
      changesets.flatMap(changeset => changeset.releases.map(release => release.name)),
    );

    const missingPackages = requiredPackages.filter(pkg => !includedPackages.has(pkg));

    if (missingPackages.length === 0) {
      console.log('Metadata and MCP are already included in existing changesets');
      return;
    }

    console.log(
      `Missing package(s) in changesets: ${missingPackages.join(', ')}. Creating automatic changeset...`,
    );

    /**
     * Created a changeset for missing required packages
     * @type {import('@changesets/types').Changeset}
     */
    const mcpChangeset = {
      releases: missingPackages.map(name => ({
        name,
        type: 'minor',
      })),
      summary: `chore: ${BRANCH_COMMIT_ICONS.feat} Update Metadata and MCP with latest metadata`,
    };

    // Write the changeset
    await writeChangeset(mcpChangeset, process.cwd());

    console.log(`✅ Created automatic changeset for: ${missingPackages.join(', ')}`);
  } catch (error) {
    console.error('❌ Error ensuring Metadata and MCP changeset:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  ensureMcpChangeset()
    .then(console.log)
    .catch(console.error);
}
