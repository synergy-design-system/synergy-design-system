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
    const accordionPath = path.join(
      metadataPackageDir,
      'data',
      'core',
      'component',
      'component:syn-accordion.json',
    );
    const alertPath = path.join(
      metadataPackageDir,
      'data',
      'core',
      'component',
      'component:syn-alert.json',
    );
    const reactSetupPath = path.join(
      metadataPackageDir,
      'data',
      'core',
      'setup',
      'setup:react-package.json',
    );
    const vueSetupPath = path.join(
      metadataPackageDir,
      'data',
      'core',
      'setup',
      'setup:vue-package.json',
    );

    await access(indexPath);
    await access(manifestPath);
    await access(coreEntitySchemaPath);
    await access(accordionPath);
    await access(alertPath);
    await access(reactSetupPath);
    await access(vueSetupPath);

    const indexJson = JSON.parse(await readFile(indexPath, 'utf8'));
    const manifestJson = JSON.parse(await readFile(manifestPath, 'utf8'));
    const accordionJson = JSON.parse(await readFile(accordionPath, 'utf8'));
    const alertJson = JSON.parse(await readFile(alertPath, 'utf8'));
    const reactSetupJson = JSON.parse(await readFile(reactSetupPath, 'utf8'));
    const vueSetupJson = JSON.parse(await readFile(vueSetupPath, 'utf8'));

    expect(indexJson).to.have.property('version', '1.0.0');
    expect(indexJson).to.have.property('entities').that.is.an('array').that.is.not.empty;
    expect(manifestJson).to.have.property('version', '1.0.0');
    expect(manifestJson).to.have.property('sources').that.is.an('array').that.is.not.empty;
    expect(accordionJson.custom).to.have.nested.property('frameworks.vue.componentName', 'SynVueAccordion');
    expect(accordionJson.custom).to.have.nested.property('frameworks.vue.packageName', '@synergy-design-system/vue');
    expect(accordionJson.custom).to.have.nested.property('frameworks.react.wrapper.componentName', 'SynAccordion');
    expect(accordionJson.custom).to.have.nested.property('frameworks.react.jsx.typeName', 'SynAccordionJSXElement');
    expect(accordionJson.sources).to.include('packages/vue/src/components/SynVueAccordion.vue');
    expect(accordionJson.sources).to.include('packages/react/src/components/accordion.ts');
    expect(alertJson.custom).to.have.nested.property('frameworks.react.jsx.typeName', 'SynAlertJSXElement');
    expect(alertJson.custom.frameworks.react.jsx.events).to.deep.include({
      name: 'syn-show',
      type: 'SynShowEvent',
    });
    expect(reactSetupJson).to.have.property('kind', 'setup');
    expect(reactSetupJson).to.have.property('package', 'react');
    expect(vueSetupJson).to.have.property('kind', 'setup');
    expect(vueSetupJson).to.have.property('package', 'vue');
  });
});
