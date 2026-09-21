import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { collect } from '../../dist/internal/collectors/components/collect.js';

describe('components collector preflight', () => {
  it('returns actionable error when custom-elements manifest is missing', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-collector-test-'));

    try {
      await mkdir(path.join(tempRoot, 'packages', 'components', 'src', 'components'), {
        recursive: true,
      });

      const result = await collect(
        { packagePath: 'packages/components' },
        {
          signal: undefined,
          workspaceRoot: path.join(tempRoot, 'packages', 'metadata'),
        },
      );

      assert.strictEqual(result.ok, false);

      if (result.ok) {
        throw new Error('Expected collect to fail when manifest is missing');
      }

      assert.ok(result.error.message.includes('Components manifest missing'));
      assert.ok(result.error.message.includes('pnpm --filter @synergy-design-system/components build'));
      assert.ok('manifestPath' in result.error.details);
    } finally {
      await rm(tempRoot, { force: true, recursive: true });
    }
  });
});
