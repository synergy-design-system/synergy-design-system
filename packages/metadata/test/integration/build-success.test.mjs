import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect } from 'chai';
import { execa } from 'execa';

describe('metadata build integration', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');

  it('builds and writes expected metadata artifacts', async () => {
    await execa('node', ['dist/cli/build.js'], {
      cwd: metadataPackageDir,
    });

    const indexPath = path.join(metadataPackageDir, 'data', 'index.json');
    const manifestPath = path.join(metadataPackageDir, 'data', 'manifest.json');
    const coreEntitySchemaPath = path.join(
      metadataPackageDir,
      'data',
      'schemas',
      'core-entity.schema.json',
    );

    await access(indexPath);
    await access(manifestPath);
    await access(coreEntitySchemaPath);

    const indexJson = JSON.parse(await readFile(indexPath, 'utf8'));
    const manifestJson = JSON.parse(await readFile(manifestPath, 'utf8'));

    expect(indexJson).to.have.property('version', '1.0.0');
    expect(indexJson).to.have.property('entities').that.is.an('array').that.is.not.empty;
    expect(manifestJson).to.have.property('version', '1.0.0');
    expect(manifestJson).to.have.property('sources').that.is.an('array').that.is.not.empty;
  });
});
