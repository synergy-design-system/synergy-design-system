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
import assert from 'node:assert/strict';
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
        'component__syn-accordion.json',
      );
      const alertPath = path.join(
        outputDir,
        'core',
        'component',
        'component__syn-alert.json',
      );
      const accordionInterfacePath = path.join(
        outputDir,
        'layers',
        'interface',
        'component',
        'component__syn-accordion.json',
      );
      const accordionInterfaceMarkdownPath = path.join(
        outputDir,
        'layers',
        'interface',
        'component',
        'component__syn-accordion.md',
      );
      const accordionRulesMarkdownPath = path.join(
        outputDir,
        'layers',
        'rules',
        'component',
        'component__syn-accordion.md',
      );
      const reactSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup__react-package.json',
      );
      const angularPackageSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup__angular-package.json',
      );
      const angularComponentsModuleSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup__angular-components-module.json',
      );
      const angularFormsModuleSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup__angular-forms-module.json',
      );
      const angularValidatorsModuleSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup__angular-validators-module.json',
      );
      const vueSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup__vue-package.json',
      );
      const tokensSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup__tokens-package.json',
      );
      const stylesSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup__styles-package.json',
      );
      const fontsSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup__fonts-package.json',
      );
      const assetsSetupPath = path.join(
        outputDir,
        'core',
        'setup',
        'setup__assets-package.json',
      );
      const sick2018IconsPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset__sick2018-icons.json',
      );
      const sick2025IconsFillPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset__sick2025-icons-fill.json',
      );
      const sick2025IconsOutlinePath = path.join(
        outputDir,
        'core',
        'asset',
        'asset__sick2025-icons-outline.json',
      );
      const sick2018LogosPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset__sick2018-logos.json',
      );
      const sick2025LogosPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset__sick2025-logos.json',
      );
      const sick2018SystemIconsPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset__sick2018-system-icons.json',
      );
      const sick2025SystemIconsPath = path.join(
        outputDir,
        'core',
        'asset',
        'asset__sick2025-system-icons.json',
      );
      const tokenFigmaArtifactPath = path.join(
        outputDir,
        'core',
        'token',
        'token__tokens-figma-variables-sick2018-dark-json.json',
      );
      const stylesLinkPath = path.join(
        outputDir,
        'core',
        'style',
        'style__syn-link.json',
      );
      const fontsArtifactPath = path.join(
        outputDir,
        'core',
        'utility',
        'utility__fonts-sick-intl.json',
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
      const accordionRulesMarkdown = await readFile(accordionRulesMarkdownPath, 'utf8');
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

      assert.strictEqual(indexJson.version, '1.0.0');
      assert.ok(Array.isArray(indexJson.entities) && indexJson.entities.length > 0);
      assert.strictEqual(manifestJson.version, '1.0.0');
      assert.ok(Array.isArray(manifestJson.sources) && manifestJson.sources.length > 0);
      assert.strictEqual(accordionJson.custom.frameworks?.vue?.componentName, 'SynVueAccordion');
      assert.strictEqual(accordionJson.custom.frameworks?.vue?.packageName, '@synergy-design-system/vue');
      assert.strictEqual(accordionJson.custom.frameworks?.react?.wrapper?.componentName, 'SynAccordion');
      assert.strictEqual(accordionJson.custom.frameworks?.react?.jsx?.typeName, 'SynAccordionJSXElement');
      assert.strictEqual(accordionJson.custom.frameworks?.angular?.componentName, 'SynAccordionComponent');
      assert.strictEqual(accordionJson.custom.frameworks?.angular?.selector, 'syn-accordion');
      assert.ok(!('interfaceSnapshot' in accordionJson.custom));
      assert.ok(accordionJson.layers.interface.some((ref) => ref.path === 'layers/interface/component/component__syn-accordion.json'));
      assert.ok(accordionJson.layers.rules.some((ref) => ref.path === 'layers/rules/component/component__syn-accordion.md'));
      assert.ok(accordionJson.sources.includes('packages/vue/src/components/SynVueAccordion.vue'));
      assert.ok(accordionJson.sources.includes('packages/react/src/components/accordion.ts'));
      assert.ok(accordionJson.sources.includes('packages/angular/components/accordion/accordion.component.ts'));
      assert.strictEqual(accordionInterfaceJson.tagName, 'syn-accordion');
      assert.strictEqual(typeof accordionInterfaceJson.summary, 'string');
      assert.strictEqual(accordionInterfaceJson.figmaComponentId, '20877-88547');
      assert.strictEqual(accordionInterfaceJson.figmaDocsId, '41094-279501');
      assert.ok(Array.isArray(accordionInterfaceJson.slots));
      assert.ok(Array.isArray(accordionInterfaceJson.attributes));
      assert.ok(Array.isArray(accordionInterfaceJson.properties));
      assert.ok(Array.isArray(accordionInterfaceJson.methods));
      assert.ok(Array.isArray(accordionInterfaceJson.events));
      assert.ok(Array.isArray(accordionInterfaceJson.cssParts));
      assert.ok(accordionInterfaceMarkdown.includes('# syn-accordion'));
      assert.ok(accordionInterfaceMarkdown.includes('[Figma Examples](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41094-279501)'));
      assert.ok(accordionInterfaceMarkdown.includes('[Figma Component](https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20877-88547)'));
      assert.ok(accordionInterfaceMarkdown.includes('## Available Properties'));
      assert.ok(accordionInterfaceMarkdown.includes('## Available CSS Parts'));
      assert.ok(accordionRulesMarkdown.includes('# syn-accordion'));
      assert.ok(accordionRulesMarkdown.includes('## Common Use Cases'));
      assert.ok(accordionRulesMarkdown.includes('## Usage Guidelines'));
      assert.ok(accordionRulesMarkdown.includes('## Accessibility'));
      assert.ok(accordionRulesMarkdown.includes('## Related Components'));
      assert.strictEqual(alertJson.custom.frameworks?.react?.jsx?.typeName, 'SynAlertJSXElement');
      assert.ok(alertJson.custom.frameworks.react.jsx.events.some(
        (event) => event.name === 'syn-show' && event.type === 'SynShowEvent',
      ));
      assert.strictEqual(angularPackageSetupJson.kind, 'setup');
      assert.strictEqual(angularPackageSetupJson.package, 'angular');
      assert.strictEqual(angularComponentsModuleSetupJson.kind, 'setup');
      assert.strictEqual(angularComponentsModuleSetupJson.package, 'angular');
      assert.strictEqual(angularFormsModuleSetupJson.kind, 'setup');
      assert.strictEqual(angularFormsModuleSetupJson.package, 'angular');
      assert.strictEqual(angularValidatorsModuleSetupJson.kind, 'setup');
      assert.strictEqual(angularValidatorsModuleSetupJson.package, 'angular');
      assert.strictEqual(reactSetupJson.kind, 'setup');
      assert.strictEqual(reactSetupJson.package, 'react');
      assert.strictEqual(vueSetupJson.kind, 'setup');
      assert.strictEqual(vueSetupJson.package, 'vue');
      assert.strictEqual(tokensSetupJson.kind, 'setup');
      assert.strictEqual(tokensSetupJson.package, 'tokens');
      assert.ok(tokensSetupJson.sources.includes('packages/tokens/README.md'));
      assert.ok(tokensSetupJson.sources.includes('packages/tokens/CHANGELOG.md'));
      assert.ok(tokensSetupJson.sources.includes('packages/tokens/package.json'));
      assert.ok(!tokensSetupJson.sources.includes('packages/tokens/src/figma-variables/output/sick2018-dark.json'));
      assert.strictEqual(tokenFigmaArtifactJson.kind, 'token');
      assert.strictEqual(tokenFigmaArtifactJson.package, 'tokens');
      assert.ok(tokenFigmaArtifactJson.layers.full.some((ref) => ref.path === 'layers/full/tokens/figma-variables/sick2018-dark.json'));
      assert.strictEqual(stylesSetupJson.kind, 'setup');
      assert.strictEqual(stylesSetupJson.package, 'styles');
      assert.ok(stylesSetupJson.sources.includes('packages/styles/README.md'));
      assert.ok(stylesSetupJson.sources.includes('packages/styles/CHANGELOG.md'));
      assert.ok(stylesSetupJson.sources.includes('packages/styles/package.json'));
      assert.strictEqual(stylesLinkJson.kind, 'style');
      assert.strictEqual(stylesLinkJson.package, 'styles');
      assert.deepStrictEqual(stylesLinkJson.sources, ['packages/styles/src/link/index.css']);
      assert.ok(stylesLinkJson.layers.full.some((ref) => ref.path === 'layers/full/styles/link/index.css'));
      assert.strictEqual(fontsSetupJson.kind, 'setup');
      assert.strictEqual(fontsSetupJson.package, 'fonts');
      assert.ok(fontsSetupJson.sources.includes('packages/fonts/README.md'));
      assert.ok(fontsSetupJson.sources.includes('packages/fonts/CHANGELOG.md'));
      assert.ok(fontsSetupJson.sources.includes('packages/fonts/package.json'));
      assert.strictEqual(fontsArtifactJson.kind, 'utility');
      assert.strictEqual(fontsArtifactJson.package, 'fonts');
      assert.ok(fontsArtifactJson.sources.includes('packages/fonts/src/sick-intl/font.css'));
      assert.ok(fontsArtifactJson.sources.includes('packages/fonts/src/sick-intl/LICENSE'));
      assert.ok(fontsArtifactJson.layers.full.some((ref) => ref.path === 'layers/full/fonts/sick-intl/font.css'));
      assert.ok(fontsArtifactJson.layers.full.some((ref) => ref.path === 'layers/full/fonts/sick-intl/LICENSE'));
      assert.strictEqual(assetsSetupJson.kind, 'setup');
      assert.strictEqual(assetsSetupJson.package, 'assets');
      assert.ok(assetsSetupJson.sources.includes('packages/assets/README.md'));
      assert.ok(assetsSetupJson.sources.includes('packages/assets/CHANGELOG.md'));
      assert.ok(assetsSetupJson.sources.includes('packages/assets/package.json'));
      // sick2018 icon set entity (registry)
      assert.strictEqual(sick2018IconsJson.kind, 'asset');
      assert.strictEqual(sick2018IconsJson.package, 'assets');
      assert.strictEqual(sick2018IconsJson.custom.theme, 'sick2018');
      assert.strictEqual(sick2018IconsJson.custom.variant, 'all');
      assert.ok(sick2018IconsJson.custom.iconCount > 0);
      assert.ok(!('iconNames' in sick2018IconsJson.custom));
      assert.ok(!('material' in sick2018IconsJson.custom));
      assert.deepStrictEqual(sick2018IconsJson.sources, ['packages/assets/src/sick2018/js/index.ts']);
      assert.ok(sick2018IconsJson.layers.full.some((ref) => ref.path === 'layers/full/assets/sick2018/js/index.ts'));
      // icons dict spot-check
      assert.strictEqual(typeof sick2018IconsJson.custom.icons, 'object');
      assert.ok(sick2018IconsJson.custom.icons['add'] != null);
      assert.ok(Array.isArray(sick2018IconsJson.custom.icons['add'].categories) && sick2018IconsJson.custom.icons['add'].categories.length > 0);
      assert.ok(Array.isArray(sick2018IconsJson.custom.icons['add'].tags) && sick2018IconsJson.custom.icons['add'].tags.length > 0);

      // sick2025 fill icon set entity (registry)
      assert.strictEqual(sick2025IconsFillJson.kind, 'asset');
      assert.strictEqual(sick2025IconsFillJson.custom.theme, 'sick2025');
      assert.strictEqual(sick2025IconsFillJson.custom.variant, 'fill');
      assert.ok(sick2025IconsFillJson.custom.iconCount > 0);
      assert.ok(!('iconNames' in sick2025IconsFillJson.custom));
      assert.ok(!('material' in sick2025IconsFillJson.custom));
      assert.deepStrictEqual(sick2025IconsFillJson.sources, ['packages/assets/src/sick2025/js/filled.ts']);
      assert.ok(sick2025IconsFillJson.layers.full.some((ref) => ref.path === 'layers/full/assets/sick2025/js/filled.ts'));
      // icons dict spot-check
      assert.strictEqual(typeof sick2025IconsFillJson.custom.icons, 'object');
      assert.ok(sick2025IconsFillJson.custom.icons['add'] != null);
      assert.ok(Array.isArray(sick2025IconsFillJson.custom.icons['add'].categories) && sick2025IconsFillJson.custom.icons['add'].categories.length > 0);
      assert.ok(Array.isArray(sick2025IconsFillJson.custom.icons['add'].tags) && sick2025IconsFillJson.custom.icons['add'].tags.length > 0);

      // sick2025 outline icon set entity (registry)
      assert.strictEqual(sick2025IconsOutlineJson.kind, 'asset');
      assert.strictEqual(sick2025IconsOutlineJson.custom.theme, 'sick2025');
      assert.strictEqual(sick2025IconsOutlineJson.custom.variant, 'outline');
      assert.ok(!('iconNames' in sick2025IconsOutlineJson.custom));
      assert.ok(!('material' in sick2025IconsOutlineJson.custom));
      assert.deepStrictEqual(sick2025IconsOutlineJson.sources, ['packages/assets/src/sick2025/js/outline.ts']);
      // icons dict spot-check
      assert.strictEqual(typeof sick2025IconsOutlineJson.custom.icons, 'object');
      assert.ok(sick2025IconsOutlineJson.custom.icons['add'] != null);
      assert.ok(Array.isArray(sick2025IconsOutlineJson.custom.icons['add'].categories) && sick2025IconsOutlineJson.custom.icons['add'].categories.length > 0);
      assert.ok(Array.isArray(sick2025IconsOutlineJson.custom.icons['add'].tags) && sick2025IconsOutlineJson.custom.icons['add'].tags.length > 0);

      // Logo entities — no sources, filenames in custom.files
      assert.strictEqual(sick2018LogosJson.kind, 'asset');
      assert.strictEqual(sick2018LogosJson.custom.category, 'logos');
      assert.strictEqual(sick2018LogosJson.custom.theme, 'sick2018');
      assert.ok(Array.isArray(sick2018LogosJson.custom.files) && sick2018LogosJson.custom.files.length > 0);
      assert.ok(sick2018LogosJson.custom.files.includes('logo-black.svg'));
      assert.deepStrictEqual(sick2018LogosJson.sources, []);

      assert.strictEqual(sick2025LogosJson.kind, 'asset');
      assert.strictEqual(sick2025LogosJson.custom.category, 'logos');
      assert.strictEqual(sick2025LogosJson.custom.theme, 'sick2025');
      assert.ok(Array.isArray(sick2025LogosJson.custom.files) && sick2025LogosJson.custom.files.length > 0);
      assert.deepStrictEqual(sick2025LogosJson.sources, []);

      // System-icon entities — no sources, filenames in custom.files
      assert.strictEqual(sick2018SystemIconsJson.kind, 'asset');
      assert.strictEqual(sick2018SystemIconsJson.custom.category, 'system-icons');
      assert.ok(sick2018SystemIconsJson.custom.files.includes('add.svg'));
      assert.ok(!('material' in sick2018SystemIconsJson.custom));
      assert.deepStrictEqual(sick2018SystemIconsJson.sources, []);

      assert.strictEqual(sick2025SystemIconsJson.kind, 'asset');
      assert.strictEqual(sick2025SystemIconsJson.custom.category, 'system-icons');
      assert.ok(sick2025SystemIconsJson.custom.files.includes('add.svg'));
      assert.ok(!('material' in sick2025SystemIconsJson.custom));
      assert.deepStrictEqual(sick2025SystemIconsJson.sources, []);
      assert.ok(indexJson.entities.some((entity) => entity.id === 'setup:tokens-package'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'token:tokens-figma-variables-sick2018-dark-json'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'setup:styles-package'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'style:syn-link'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'setup:fonts-package'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'utility:fonts-sick-intl'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'setup:assets-package'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'asset:sick2018-icons'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'asset:sick2025-icons-fill'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'asset:sick2025-icons-outline'));
      assert.ok(!indexJson.entities.some((entity) => entity.id === 'asset:sick2018-icon-add'));
      assert.ok(!indexJson.entities.some((entity) => entity.id === 'asset:sick2025-fill-icon-add'));
      assert.ok(!indexJson.entities.some((entity) => entity.id === 'asset:sick2025-outline-icon-add'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'asset:sick2018-logos'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'asset:sick2025-logos'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'asset:sick2018-system-icons'));
      assert.ok(indexJson.entities.some((entity) => entity.id === 'asset:sick2025-system-icons'));
    } finally {
      await rm(tempRoot, { force: true, recursive: true });
    }
  });
});
