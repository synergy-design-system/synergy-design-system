#!/usr/bin/env node
import getChangesets from '@changesets/read';
import writeChangeset from '@changesets/write';
import { BRANCH_COMMIT_ICONS } from './constants.js';

/**
 * Ensures that the metadata package is included in changesets when other packages are being released.
 * This is necessary because metadata needs to be updated with the latest changelog metadata.
 */
export async function ensureMcpChangeset() {
  try {
    // Read existing changesets
    const changesets = await getChangesets(process.cwd());

    // Check if MCP is already included in any changeset
    const mcpIncluded = changesets.some(
      changeset => changeset.releases.some(
        release => release.name === '@synergy-design-system/metadata',
      ),
    );

    if (mcpIncluded) {
      console.log('Metadata are already included in existing changesets');
      return;
    }

    console.log('Metadata not found in changesets, creating automatic changeset...');

    /**
     * Created a changeset for MCP
     * @type {import('@changesets/types').Changeset}
     */
    const mcpChangeset = {
      releases: [
        {
          name: '@synergy-design-system/metadata',
          type: 'minor',
        },
        {
          name: '@synergy-design-system/mcp',
          type: 'minor',
        },
      ],
      summary: `chore: ${BRANCH_COMMIT_ICONS.feat} Update Metadata and MCP with latest metadata`,
    };

    // Write the changeset
    await writeChangeset(mcpChangeset, process.cwd());

    console.log('✅ Created automatic changeset for Metadata and MCP packages');
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
