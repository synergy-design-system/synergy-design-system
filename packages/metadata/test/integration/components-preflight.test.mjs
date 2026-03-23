import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { expect } from 'chai';
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

      expect(result.ok).to.equal(false);

      if (result.ok) {
        throw new Error('Expected collect to fail when manifest is missing');
      }

      expect(result.error.message).to.contain('Components manifest missing');
      expect(result.error.message).to.contain('pnpm --filter @synergy-design-system/components build');
      expect(result.error.details).to.have.property('manifestPath');
    } finally {
      await rm(tempRoot, { force: true, recursive: true });
    }
  });
});
