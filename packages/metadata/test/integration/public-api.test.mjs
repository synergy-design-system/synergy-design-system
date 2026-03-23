import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { expect } from 'chai';

describe('public metadata api', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');

  it('exposes store-based queries over generated data', async () => {
    const { createMetadataStore } = await import(path.join(metadataPackageDir, 'dist', 'index.js'));

    const store = createMetadataStore();

    const index = await store.getIndex();
    expect(index).to.have.property('version', '1.0.0');
    expect(index).to.have.property('builtAt').that.is.a('string');

    const component = await store.getEntity('component:syn-accordion');
    expect(component).to.not.equal(null);
    expect(component).to.have.property('kind', 'component');

    const setupEntity = await store.getEntity('setup:synergy-migrations');
    expect(setupEntity).to.not.equal(null);
    expect(setupEntity).to.have.property('kind', 'setup');

    const setups = await store.findEntities({ kind: 'setup' });
    expect(setups.length).to.be.greaterThan(0);

    const migrationLayerFiles = await store.getDataForLayer('migrations', 'full');
    expect(migrationLayerFiles.length).to.be.greaterThan(0);

    const davinciPaths = migrationLayerFiles.flatMap(({ files }) => files.map(({ path: filePath }) => filePath));
    expect(davinciPaths.some((filePath) => filePath.includes('/davinci/'))).to.equal(true);
  });
});
