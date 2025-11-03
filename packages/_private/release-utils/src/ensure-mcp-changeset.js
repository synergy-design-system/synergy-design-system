#!/usr/bin/env node
import getChangesets from '@changesets/read';
import writeChangeset from '@changesets/write';
import { BRANCH_COMMIT_ICONS } from './constants.js';

/**
 * Ensures that the MCP package is included in changesets when other packages are being released.
 * This is necessary because MCP needs to be updated with the latest changelog metadata.
 */
export async function ensureMcpChangeset() {
  try {
    // Read existing changesets
    const changesets = await getChangesets(process.cwd());

    if (changesets.length === 0) {
      console.log('No changesets found, skipping MCP check');
      return;
    }

    // Check if MCP is already included in any changeset
    const mcpIncluded = changesets.some(
      changeset => changeset.releases.some(release => release.name === '@synergy-design-system/mcp'),
    );

    if (mcpIncluded) {
      console.log('MCP is already included in existing changesets');
      return;
    }

    console.log('MCP not found in changesets, creating automatic changeset...');

    /**
     * Created a changeset for MCP
     * @type {import('@changesets/types').Changeset}
     */
    const mcpChangeset = {
      releases: [{
        name: '@synergy-design-system/mcp',
        type: 'minor',
      }],
      summary: `chore: ${BRANCH_COMMIT_ICONS.feat} Update MCP with latest metadata`,
    };

    // Write the changeset
    await writeChangeset(mcpChangeset, process.cwd());

    console.log('✅ Created automatic changeset for MCP package');
  } catch (error) {
    console.error('❌ Error ensuring MCP changeset:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  ensureMcpChangeset()
    .then(console.log)
    .catch(console.error);
}
