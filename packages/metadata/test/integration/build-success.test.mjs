import {
  access,
  mkdtemp,
  readFile,
  rm,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect } from 'chai';
import { execa } from 'execa';

describe('metadata build integration', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');

  it('builds and writes expected metadata artifacts', async () => {
    const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'metadata-build-test-'));

    try {
      const outputDir = path.join(tempRoot, 'data');

      await execa('node', ['dist/internal/cli/build.js'], {
        cwd: metadataPackageDir,
        env: {
          ...process.env,
          SYNERGY_METADATA_OUTPUT_DIR: outputDir,
        },
      });

      const indexPath = path.join(outputDir, 'index.json');
      const manifestPath = path.join(outputDir, 'manifest.json');
      const coreEntitySchemaPath = path.join(
        outputDir,
        'schemas',
        'core-entity.schema.json',
      );
      const accordionPath = path.join(
        outputDir,
        'core',
        'component',
        'component:syn-accordion.json',
      );
      const alertPath = path.join(
        outputDir,
        'core',
        'component',
        'component:syn-alert.json',
      );
      const reactSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup:react-package.json',
      );
      const angularPackageSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup:angular-package.json',
      );
      const angularComponentsModuleSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup:angular-components-module.json',
      );
      const angularFormsModuleSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup:angular-forms-module.json',
      );
      const angularValidatorsModuleSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup:angular-validators-module.json',
      );
      const vueSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup:vue-package.json',
      );
      const tokensSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup:tokens-package.json',
      );
      const stylesSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup:styles-package.json',
      );
      const fontsSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup:fonts-package.json',
      );
      const assetsSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup:assets-package.json',
      );
      const tokenFigmaArtifactPath = path.join(
        outputDir,
        'core',
        'token',
        'token:tokens-figma-variables-sick2018-dark-json.json',
      );
      const stylesLinkPath = path.join(
        outputDir,
        'core',
        'style',
        'style:styles-link.json',
      );

      await access(indexPath);
      await access(manifestPath);
      await access(coreEntitySchemaPath);
      await access(accordionPath);
      await access(alertPath);
      await access(angularPackageSetupPath);
      await access(angularComponentsModuleSetupPath);
      await access(angularFormsModuleSetupPath);
      await access(angularValidatorsModuleSetupPath);
      await access(reactSetupPath);
      await access(vueSetupPath);
      await access(tokensSetupPath);
      await access(stylesSetupPath);
      await access(fontsSetupPath);
      await access(assetsSetupPath);
      await access(tokenFigmaArtifactPath);
      await access(stylesLinkPath);

      const indexJson = JSON.parse(await readFile(indexPath, 'utf8'));
      const manifestJson = JSON.parse(await readFile(manifestPath, 'utf8'));
      const accordionJson = JSON.parse(await readFile(accordionPath, 'utf8'));
      const alertJson = JSON.parse(await readFile(alertPath, 'utf8'));
      const angularPackageSetupJson = JSON.parse(await readFile(angularPackageSetupPath, 'utf8'));
      const angularComponentsModuleSetupJson = JSON.parse(await readFile(angularComponentsModuleSetupPath, 'utf8'));
      const angularFormsModuleSetupJson = JSON.parse(await readFile(angularFormsModuleSetupPath, 'utf8'));
      const angularValidatorsModuleSetupJson = JSON.parse(await readFile(angularValidatorsModuleSetupPath, 'utf8'));
      const reactSetupJson = JSON.parse(await readFile(reactSetupPath, 'utf8'));
      const vueSetupJson = JSON.parse(await readFile(vueSetupPath, 'utf8'));
      const tokensSetupJson = JSON.parse(await readFile(tokensSetupPath, 'utf8'));
      const stylesSetupJson = JSON.parse(await readFile(stylesSetupPath, 'utf8'));
      const fontsSetupJson = JSON.parse(await readFile(fontsSetupPath, 'utf8'));
      const assetsSetupJson = JSON.parse(await readFile(assetsSetupPath, 'utf8'));
      const tokenFigmaArtifactJson = JSON.parse(await readFile(tokenFigmaArtifactPath, 'utf8'));
      const stylesLinkJson = JSON.parse(await readFile(stylesLinkPath, 'utf8'));

      expect(indexJson).to.have.property('version', '1.0.0');
      expect(indexJson).to.have.property('entities').that.is.an('array').that.is.not.empty;
      expect(manifestJson).to.have.property('version', '1.0.0');
      expect(manifestJson).to.have.property('sources').that.is.an('array').that.is.not.empty;
      expect(accordionJson.custom).to.have.nested.property('frameworks.vue.componentName', 'SynVueAccordion');
      expect(accordionJson.custom).to.have.nested.property('frameworks.vue.packageName', '@synergy-design-system/vue');
      expect(accordionJson.custom).to.have.nested.property('frameworks.react.wrapper.componentName', 'SynAccordion');
      expect(accordionJson.custom).to.have.nested.property('frameworks.react.jsx.typeName', 'SynAccordionJSXElement');
      expect(accordionJson.custom).to.have.nested.property('frameworks.angular.componentName', 'SynAccordionComponent');
      expect(accordionJson.custom).to.have.nested.property('frameworks.angular.selector', 'syn-accordion');
      expect(accordionJson.sources).to.include('packages/vue/src/components/SynVueAccordion.vue');
      expect(accordionJson.sources).to.include('packages/react/src/components/accordion.ts');
      expect(accordionJson.sources).to.include('packages/angular/components/accordion/accordion.component.ts');
      expect(alertJson.custom).to.have.nested.property('frameworks.react.jsx.typeName', 'SynAlertJSXElement');
      expect(alertJson.custom.frameworks.react.jsx.events).to.deep.include({
        name: 'syn-show',
        type: 'SynShowEvent',
      });
      expect(angularPackageSetupJson).to.have.property('kind', 'setup');
      expect(angularPackageSetupJson).to.have.property('package', 'angular');
      expect(angularComponentsModuleSetupJson).to.have.property('kind', 'setup');
      expect(angularComponentsModuleSetupJson).to.have.property('package', 'angular');
      expect(angularFormsModuleSetupJson).to.have.property('kind', 'setup');
      expect(angularFormsModuleSetupJson).to.have.property('package', 'angular');
      expect(angularValidatorsModuleSetupJson).to.have.property('kind', 'setup');
      expect(angularValidatorsModuleSetupJson).to.have.property('package', 'angular');
      expect(reactSetupJson).to.have.property('kind', 'setup');
      expect(reactSetupJson).to.have.property('package', 'react');
      expect(vueSetupJson).to.have.property('kind', 'setup');
      expect(vueSetupJson).to.have.property('package', 'vue');
      expect(tokensSetupJson).to.have.property('kind', 'setup');
      expect(tokensSetupJson).to.have.property('package', 'tokens');
      expect(tokensSetupJson.sources).to.include('packages/tokens/README.md');
      expect(tokensSetupJson.sources).to.include('packages/tokens/CHANGELOG.md');
      expect(tokensSetupJson.sources).to.include('packages/tokens/package.json');
      expect(tokensSetupJson.sources).to.not.include('packages/tokens/src/figma-variables/output/sick2018-dark.json');
      expect(tokenFigmaArtifactJson).to.have.property('kind', 'token');
      expect(tokenFigmaArtifactJson).to.have.property('package', 'tokens');
      expect(tokenFigmaArtifactJson.layers.full.some((ref) => ref.path === 'layers/full/tokens/figma-variables/sick2018-dark.json')).to.equal(true);
      expect(stylesSetupJson).to.have.property('kind', 'setup');
      expect(stylesSetupJson).to.have.property('package', 'styles');
      expect(stylesSetupJson.sources).to.include('packages/styles/README.md');
      expect(stylesSetupJson.sources).to.include('packages/styles/CHANGELOG.md');
      expect(stylesSetupJson.sources).to.include('packages/styles/package.json');
      expect(stylesLinkJson).to.have.property('kind', 'style');
      expect(stylesLinkJson).to.have.property('package', 'styles');
      expect(stylesLinkJson.sources).to.deep.equal(['packages/styles/src/link/index.css']);
      expect(stylesLinkJson.layers.full.some((ref) => ref.path === 'layers/full/styles/link/index.css')).to.equal(true);
      expect(fontsSetupJson).to.have.property('kind', 'setup');
      expect(fontsSetupJson).to.have.property('package', 'fonts');
      expect(fontsSetupJson.sources).to.include('packages/fonts/README.md');
      expect(fontsSetupJson.sources).to.include('packages/fonts/CHANGELOG.md');
      expect(fontsSetupJson.sources).to.include('packages/fonts/package.json');
      expect(assetsSetupJson).to.have.property('kind', 'setup');
      expect(assetsSetupJson).to.have.property('package', 'assets');
      expect(assetsSetupJson.sources).to.include('packages/assets/README.md');
      expect(assetsSetupJson.sources).to.include('packages/assets/CHANGELOG.md');
      expect(assetsSetupJson.sources).to.include('packages/assets/package.json');
      expect(indexJson.entities.some((entity) => entity.id === 'setup:tokens-package')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'token:tokens-figma-variables-sick2018-dark-json')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'setup:styles-package')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'style:styles-link')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'setup:fonts-package')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'setup:assets-package')).to.equal(true);
    } finally {
      await rm(tempRoot, { force: true, recursive: true });
    }
  });
});
