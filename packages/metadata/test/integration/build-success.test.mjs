import {
  access,
  mkdtemp,
  readFile,
  rm,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
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
      const accordionInterfacePath = path.join(
        outputDir,
        'layers',
        'interface',
        'component',
        'component:syn-accordion.json',
      );
      const accordionInterfaceMarkdownPath = path.join(
        outputDir,
        'layers',
        'interface',
        'component',
        'component:syn-accordion.md',
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
      const sick2018IconsPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset:sick2018-icons.json',
      );
      const sick2025IconsFillPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset:sick2025-icons-fill.json',
      );
      const sick2025IconsOutlinePath = path.join(
        outputDir,
        'core',
        'asset',
        'asset:sick2025-icons-outline.json',
      );
      const sick2018LogosPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset:sick2018-logos.json',
      );
      const sick2025LogosPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset:sick2025-logos.json',
      );
      const sick2018SystemIconsPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset:sick2018-system-icons.json',
      );
      const sick2025SystemIconsPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset:sick2025-system-icons.json',
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
        'style:syn-link.json',
      );
      const fontsArtifactPath = path.join(
        outputDir,
        'core',
        'utility',
        'utility:fonts-sick-intl.json',
      );

      await access(indexPath);
      await access(manifestPath);
      await access(coreEntitySchemaPath);
      await access(accordionPath);
      await access(alertPath);
      await access(accordionInterfacePath);
      await access(accordionInterfaceMarkdownPath);
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
      await access(sick2018IconsPath);
      await access(sick2025IconsFillPath);
      await access(sick2025IconsOutlinePath);
      await access(sick2018LogosPath);
      await access(sick2025LogosPath);
      await access(sick2018SystemIconsPath);
      await access(sick2025SystemIconsPath);
      await access(tokenFigmaArtifactPath);
      await access(stylesLinkPath);
      await access(fontsArtifactPath);

      const indexJson = JSON.parse(await readFile(indexPath, 'utf8'));
      const manifestJson = JSON.parse(await readFile(manifestPath, 'utf8'));
      const accordionJson = JSON.parse(await readFile(accordionPath, 'utf8'));
      const alertJson = JSON.parse(await readFile(alertPath, 'utf8'));
      const accordionInterfaceJson = JSON.parse(await readFile(accordionInterfacePath, 'utf8'));
      const accordionInterfaceMarkdown = await readFile(accordionInterfaceMarkdownPath, 'utf8');
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
      const sick2018IconsJson = JSON.parse(await readFile(sick2018IconsPath, 'utf8'));
      const sick2025IconsFillJson = JSON.parse(await readFile(sick2025IconsFillPath, 'utf8'));
      const sick2025IconsOutlineJson = JSON.parse(await readFile(sick2025IconsOutlinePath, 'utf8'));
      const sick2018LogosJson = JSON.parse(await readFile(sick2018LogosPath, 'utf8'));
      const sick2025LogosJson = JSON.parse(await readFile(sick2025LogosPath, 'utf8'));
      const sick2018SystemIconsJson = JSON.parse(await readFile(sick2018SystemIconsPath, 'utf8'));
      const sick2025SystemIconsJson = JSON.parse(await readFile(sick2025SystemIconsPath, 'utf8'));
      const tokenFigmaArtifactJson = JSON.parse(await readFile(tokenFigmaArtifactPath, 'utf8'));
      const stylesLinkJson = JSON.parse(await readFile(stylesLinkPath, 'utf8'));
      const fontsArtifactJson = JSON.parse(await readFile(fontsArtifactPath, 'utf8'));

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
      expect(accordionJson.custom).to.not.have.property('interfaceSnapshot');
      expect(accordionJson.layers.interface.some((ref) => ref.path === 'layers/interface/component/component:syn-accordion.json')).to.equal(true);
      expect(accordionJson.sources).to.include('packages/vue/src/components/SynVueAccordion.vue');
      expect(accordionJson.sources).to.include('packages/react/src/components/accordion.ts');
      expect(accordionJson.sources).to.include('packages/angular/components/accordion/accordion.component.ts');
      expect(accordionInterfaceJson).to.have.property('tagName', 'syn-accordion');
      expect(accordionInterfaceJson).to.have.property('summary').that.is.a('string');
      expect(accordionInterfaceJson).to.have.property('figmaComponentId', '41094-279501');
      expect(accordionInterfaceJson).to.have.property('slots').that.is.an('array');
      expect(accordionInterfaceJson).to.have.property('attributes').that.is.an('array');
      expect(accordionInterfaceJson).to.have.property('properties').that.is.an('array');
      expect(accordionInterfaceJson).to.have.property('methods').that.is.an('array');
      expect(accordionInterfaceJson).to.have.property('events').that.is.an('array');
      expect(accordionInterfaceJson).to.have.property('cssParts').that.is.an('array');
      expect(accordionInterfaceMarkdown).to.include('# syn-accordion');
      expect(accordionInterfaceMarkdown).to.include('## Available Properties');
      expect(accordionInterfaceMarkdown).to.include('## Available CSS Parts');
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
      expect(fontsArtifactJson).to.have.property('kind', 'utility');
      expect(fontsArtifactJson).to.have.property('package', 'fonts');
      expect(fontsArtifactJson.sources).to.include('packages/fonts/src/sick-intl/font.css');
      expect(fontsArtifactJson.sources).to.include('packages/fonts/src/sick-intl/LICENSE');
      expect(fontsArtifactJson.layers.full.some((ref) => ref.path === 'layers/full/fonts/sick-intl/font.css')).to.equal(true);
      expect(fontsArtifactJson.layers.full.some((ref) => ref.path === 'layers/full/fonts/sick-intl/LICENSE')).to.equal(true);
      expect(assetsSetupJson).to.have.property('kind', 'setup');
      expect(assetsSetupJson).to.have.property('package', 'assets');
      expect(assetsSetupJson.sources).to.include('packages/assets/README.md');
      expect(assetsSetupJson.sources).to.include('packages/assets/CHANGELOG.md');
      expect(assetsSetupJson.sources).to.include('packages/assets/package.json');
      // sick2018 icon set entity (registry)
      expect(sick2018IconsJson).to.have.property('kind', 'asset');
      expect(sick2018IconsJson).to.have.property('package', 'assets');
      expect(sick2018IconsJson.custom).to.have.property('theme', 'sick2018');
      expect(sick2018IconsJson.custom).to.have.property('variant', 'all');
      expect(sick2018IconsJson.custom).to.have.property('iconCount').that.is.greaterThan(0);
      expect(sick2018IconsJson.custom).to.not.have.property('iconNames');
      expect(sick2018IconsJson.custom).to.not.have.property('material');
      expect(sick2018IconsJson.sources).to.deep.equal(['packages/assets/src/sick2018/js/index.ts']);
      expect(sick2018IconsJson.layers.full.some((ref) => ref.path === 'layers/full/assets/sick2018/js/index.ts')).to.equal(true);
      // icons dict spot-check
      expect(sick2018IconsJson.custom.icons).to.be.an('object');
      expect(sick2018IconsJson.custom.icons['add']).to.exist;
      expect(sick2018IconsJson.custom.icons['add'].categories).to.be.an('array').that.is.not.empty;
      expect(sick2018IconsJson.custom.icons['add'].tags).to.be.an('array').that.is.not.empty;

      // sick2025 fill icon set entity (registry)
      expect(sick2025IconsFillJson).to.have.property('kind', 'asset');
      expect(sick2025IconsFillJson.custom).to.have.property('theme', 'sick2025');
      expect(sick2025IconsFillJson.custom).to.have.property('variant', 'fill');
      expect(sick2025IconsFillJson.custom).to.have.property('iconCount').that.is.greaterThan(0);
      expect(sick2025IconsFillJson.custom).to.not.have.property('iconNames');
      expect(sick2025IconsFillJson.custom).to.not.have.property('material');
      expect(sick2025IconsFillJson.sources).to.deep.equal(['packages/assets/src/sick2025/js/filled.ts']);
      expect(sick2025IconsFillJson.layers.full.some((ref) => ref.path === 'layers/full/assets/sick2025/js/filled.ts')).to.equal(true);
      // icons dict spot-check
      expect(sick2025IconsFillJson.custom.icons).to.be.an('object');
      expect(sick2025IconsFillJson.custom.icons['add']).to.exist;
      expect(sick2025IconsFillJson.custom.icons['add'].categories).to.be.an('array').that.is.not.empty;
      expect(sick2025IconsFillJson.custom.icons['add'].tags).to.be.an('array').that.is.not.empty;

      // sick2025 outline icon set entity (registry)
      expect(sick2025IconsOutlineJson).to.have.property('kind', 'asset');
      expect(sick2025IconsOutlineJson.custom).to.have.property('theme', 'sick2025');
      expect(sick2025IconsOutlineJson.custom).to.have.property('variant', 'outline');
      expect(sick2025IconsOutlineJson.custom).to.not.have.property('iconNames');
      expect(sick2025IconsOutlineJson.custom).to.not.have.property('material');
      expect(sick2025IconsOutlineJson.sources).to.deep.equal(['packages/assets/src/sick2025/js/outline.ts']);
      // icons dict spot-check
      expect(sick2025IconsOutlineJson.custom.icons).to.be.an('object');
      expect(sick2025IconsOutlineJson.custom.icons['add']).to.exist;
      expect(sick2025IconsOutlineJson.custom.icons['add'].categories).to.be.an('array').that.is.not.empty;
      expect(sick2025IconsOutlineJson.custom.icons['add'].tags).to.be.an('array').that.is.not.empty;

      // Logo entities — no sources, filenames in custom.files
      expect(sick2018LogosJson).to.have.property('kind', 'asset');
      expect(sick2018LogosJson.custom).to.have.property('category', 'logos');
      expect(sick2018LogosJson.custom).to.have.property('theme', 'sick2018');
      expect(sick2018LogosJson.custom.files).to.be.an('array').that.is.not.empty;
      expect(sick2018LogosJson.custom.files).to.include('logo-black.svg');
      expect(sick2018LogosJson.sources).to.deep.equal([]);

      expect(sick2025LogosJson).to.have.property('kind', 'asset');
      expect(sick2025LogosJson.custom).to.have.property('category', 'logos');
      expect(sick2025LogosJson.custom).to.have.property('theme', 'sick2025');
      expect(sick2025LogosJson.custom.files).to.be.an('array').that.is.not.empty;
      expect(sick2025LogosJson.sources).to.deep.equal([]);

      // System-icon entities — no sources, filenames in custom.files
      expect(sick2018SystemIconsJson).to.have.property('kind', 'asset');
      expect(sick2018SystemIconsJson.custom).to.have.property('category', 'system-icons');
      expect(sick2018SystemIconsJson.custom.files).to.include('add.svg');
      expect(sick2018SystemIconsJson.custom).to.not.have.property('material');
      expect(sick2018SystemIconsJson.sources).to.deep.equal([]);

      expect(sick2025SystemIconsJson).to.have.property('kind', 'asset');
      expect(sick2025SystemIconsJson.custom).to.have.property('category', 'system-icons');
      expect(sick2025SystemIconsJson.custom.files).to.include('add.svg');
      expect(sick2025SystemIconsJson.custom).to.not.have.property('material');
      expect(sick2025SystemIconsJson.sources).to.deep.equal([]);
      expect(indexJson.entities.some((entity) => entity.id === 'setup:tokens-package')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'token:tokens-figma-variables-sick2018-dark-json')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'setup:styles-package')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'style:syn-link')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'setup:fonts-package')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'utility:fonts-sick-intl')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'setup:assets-package')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'asset:sick2018-icons')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'asset:sick2025-icons-fill')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'asset:sick2025-icons-outline')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'asset:sick2018-icon-add')).to.equal(false);
      expect(indexJson.entities.some((entity) => entity.id === 'asset:sick2025-fill-icon-add')).to.equal(false);
      expect(indexJson.entities.some((entity) => entity.id === 'asset:sick2025-outline-icon-add')).to.equal(false);
      expect(indexJson.entities.some((entity) => entity.id === 'asset:sick2018-logos')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'asset:sick2025-logos')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'asset:sick2018-system-icons')).to.equal(true);
      expect(indexJson.entities.some((entity) => entity.id === 'asset:sick2025-system-icons')).to.equal(true);
    } finally {
      await rm(tempRoot, { force: true, recursive: true });
    }
  });
});
