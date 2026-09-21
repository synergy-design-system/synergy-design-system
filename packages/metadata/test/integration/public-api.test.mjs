/* eslint-disable complexity */
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('public metadata api', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');

  /**
   * Keep runtime import path dynamic for integration tests, but type it statically
   * so editor IntelliSense understands the exported API surface.
   *
   * @returns {Promise<typeof import('../../dist/index.js')>}
   */
  const loadPublicApi = async () => {
    const modulePath = path.join(metadataPackageDir, 'dist', 'index.js');
    return import(modulePath);
  };

  const createComponentFixtureDataDir = async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'metadata-public-api-'));
    const coreDir = path.join(root, 'core', 'component');
    await mkdir(coreDir, { recursive: true });

    const component = {
      id: 'component:syn-fixture',
      kind: 'component',
      layers: {
        full: [{ layer: 'full', path: 'layers/full/component/component__syn-fixture.ts' }],
        interface: [{ layer: 'interface', path: 'layers/interface/component/component__syn-fixture.md' }],
      },
      name: 'Fixture',
      package: 'components',
      relations: [],
      since: '0.0.0',
      sources: [],
      status: 'experimental',
      tags: ['component', 'syn-fixture'],
    };

    const index = {
      builtAt: '2026-01-01T00:00:00.000Z',
      entities: [
        {
          corePath: 'data/core/component/component__syn-fixture.json',
          id: component.id,
          kind: component.kind,
          layers: {
            examples: 0,
            full: 1,
            interface: 1,
          },
          name: component.name,
          search: ['fixture', 'syn-fixture', 'component:syn-fixture'],
        },
      ],
      version: '1.0.0',
    };

    await writeFile(path.join(root, 'index.json'), JSON.stringify(index));
  await writeFile(path.join(coreDir, 'component__syn-fixture.json'), JSON.stringify(component));

    return {
      cleanup: async () => {
        await rm(root, {
          force: true,
          recursive: true,
        });
      },
      dataDir: root,
    };
  };

  it('exposes store-based queries over generated data', async () => {
    const { createMetadataStore } = await loadPublicApi();

    const store = createMetadataStore();

    const index = await store.getIndex();
    assert.strictEqual(index.version, '1.0.0');
    assert.strictEqual(typeof index.builtAt, 'string');

    const component = await store.getEntity('component:syn-accordion');
    assert.notStrictEqual(component, null);
    assert.strictEqual(component.kind, 'component');

    const setupEntity = await store.getEntity('setup:synergy-migrations');
    assert.notStrictEqual(setupEntity, null);
    assert.strictEqual(setupEntity.kind, 'setup');

    const setups = await store.findEntities({ kind: 'setup' });
    assert.ok(setups.length > 0);

    const migrationLayerFiles = await store.getDataForLayer('migrations', 'full');
    assert.ok(migrationLayerFiles.length > 0);

    const davinciPaths = migrationLayerFiles.flatMap(({ files }) => files.map(({ path: filePath }) => filePath));
    assert.ok(davinciPaths.some((filePath) => filePath.includes('/davinci/')));
  });

  it('exposes token helper queries with pagination and layer fallback metadata', async () => {
    const { getDataForTokens, getTokens } = await loadPublicApi();

    const allTokensResponse = await getTokens();
    assert.strictEqual(allTokensResponse.errors, undefined);
    assert.strictEqual(allTokensResponse.meta.resolvedLayer, 'full');
    assert.ok(allTokensResponse.data.length > 0);
    assert.ok(allTokensResponse.data.every((entity) => entity.kind === 'token'));

    const pagedTokensResponse = await getTokens({
      limit: 1,
      offset: 1,
    });
    assert.strictEqual(pagedTokensResponse.data.length, 1);
    assert.strictEqual(pagedTokensResponse.meta.total, allTokensResponse.meta.total);

    const fallbackResponse = await getTokens({
      layer: 'interface',
    });
    assert.strictEqual(fallbackResponse.errors, undefined);
    assert.strictEqual(fallbackResponse.meta.requestedLayer, 'interface');
    assert.strictEqual(fallbackResponse.meta.resolvedLayer, 'full');
    assert.ok(Array.isArray(fallbackResponse.meta.warnings) && fallbackResponse.meta.warnings.length > 0);

    const strictLayerErrorResponse = await getTokens({
      layer: 'interface',
      strictLayer: true,
    });
    assert.deepStrictEqual(strictLayerErrorResponse.data, []);
    assert.ok(Array.isArray(strictLayerErrorResponse.errors) && strictLayerErrorResponse.errors.length > 0);
    assert.strictEqual(strictLayerErrorResponse.errors?.[0]?.code, 'LAYER_NOT_AVAILABLE');

    const defaultDataResponse = await getDataForTokens();
    assert.strictEqual(defaultDataResponse.errors, undefined);
    assert.strictEqual(defaultDataResponse.data.format, 'css');
    assert.strictEqual(defaultDataResponse.data.theme, 'sick2025-light');
    assert.ok(defaultDataResponse.data.tokens.length > 0);
    assert.ok(defaultDataResponse.data.tokens.every((entry) => entry.path.endsWith('.css')));

    const cssThemeResponse = await getDataForTokens({
      format: 'css',
      theme: 'sick2018-dark',
    });
    assert.strictEqual(cssThemeResponse.errors, undefined);
    assert.strictEqual(cssThemeResponse.data.format, 'css');
    assert.strictEqual(cssThemeResponse.data.theme, 'sick2018-dark');
    assert.ok(cssThemeResponse.data.tokens.every((entry) => entry.theme === 'sick2018-dark'));

    const javascriptResponse = await getDataForTokens({
      format: 'javascript',
      theme: 'sick2018-dark',
    });
    assert.strictEqual(javascriptResponse.errors, undefined);
    assert.strictEqual(javascriptResponse.data.format, 'javascript');
    assert.strictEqual(javascriptResponse.data.theme, undefined);
    assert.ok(javascriptResponse.data.tokens.length > 0);
    assert.ok(javascriptResponse.data.tokens.every((entry) => entry.path.endsWith('.js') || entry.path.endsWith('.d.ts')));

    const sassResponse = await getDataForTokens({
      format: 'sass',
    });
    assert.strictEqual(sassResponse.errors, undefined);
    assert.strictEqual(sassResponse.data.format, 'sass');
    assert.ok(sassResponse.data.tokens.length > 0);
    assert.ok(sassResponse.data.tokens.every((entry) => entry.path.endsWith('.scss')));
  });

  it('exposes migration helper queries with pagination and layer fallback metadata', async () => {
    const { getMigrations } = await loadPublicApi();

    const allMigrationsResponse = await getMigrations();
    assert.strictEqual(allMigrationsResponse.errors, undefined);
    assert.strictEqual(allMigrationsResponse.meta.resolvedLayer, 'full');
    assert.ok(allMigrationsResponse.data.length > 0);
    assert.ok(allMigrationsResponse.data.every((entity) => entity.package === 'migrations'));

    const pagedMigrationsResponse = await getMigrations({
      limit: 1,
      offset: 0,
    });
    assert.strictEqual(pagedMigrationsResponse.data.length, 1);
    assert.strictEqual(pagedMigrationsResponse.meta.total, allMigrationsResponse.meta.total);

    const fallbackResponse = await getMigrations({
      layer: 'interface',
    });
    assert.strictEqual(fallbackResponse.errors, undefined);
    assert.strictEqual(fallbackResponse.meta.requestedLayer, 'interface');
    assert.strictEqual(fallbackResponse.meta.resolvedLayer, 'full');
    assert.ok(Array.isArray(fallbackResponse.meta.warnings) && fallbackResponse.meta.warnings.length > 0);

    const strictLayerErrorResponse = await getMigrations({
      layer: 'interface',
      strictLayer: true,
    });
    assert.deepStrictEqual(strictLayerErrorResponse.data, []);
    assert.ok(Array.isArray(strictLayerErrorResponse.errors) && strictLayerErrorResponse.errors.length > 0);
    assert.strictEqual(strictLayerErrorResponse.errors?.[0]?.code, 'LAYER_NOT_AVAILABLE');
  });

  it('exposes setup helper queries with package/framework composition and changelog filtering', async () => {
    const { getDataForSetup } = await loadPublicApi();

    const componentsResponse = await getDataForSetup({
      package: 'components',
    });
    assert.strictEqual(componentsResponse.errors, undefined);
    assert.notStrictEqual(componentsResponse.data, null);
    assert.ok(componentsResponse.data?.setups.some((entry) => entry.id === 'setup:components-package'));
    assert.ok(
      !componentsResponse.data?.setups.flatMap((entry) => entry.text).some((entry) => entry.path.toLowerCase().includes('changelog.md')),
    );
    assert.ok(
      !componentsResponse.data?.setups.flatMap((entry) => entry.text).some((entry) => entry.path.toLowerCase().includes('breaking_changes.md')),
    );
    assert.ok(
      !componentsResponse.data?.setups.flatMap((entry) => entry.text).some((entry) => entry.path.toLowerCase().includes('package.json')),
    );

    const reactComponentsResponse = await getDataForSetup({
      package: 'react',
    });
    assert.strictEqual(reactComponentsResponse.errors, undefined);
    assert.notStrictEqual(reactComponentsResponse.data, null);
    assert.ok(reactComponentsResponse.data?.setups.some((entry) => entry.id === 'setup:components-package'));
    assert.ok(reactComponentsResponse.data?.setups.some((entry) => entry.id === 'setup:react-package'));

    const angularResponse = await getDataForSetup({
      package: 'angular',
    });
    assert.strictEqual(angularResponse.errors, undefined);
    assert.notStrictEqual(angularResponse.data, null);
    assert.strictEqual(angularResponse.data?.setups.length, 5); // components + 4 angular modules
    assert.ok(angularResponse.data?.setups.some((entry) => entry.id === 'setup:components-package'));

    const withoutLimitationsResponse = await getDataForSetup({
      includeLimitations: false,
      package: 'components',
    });
    assert.strictEqual(withoutLimitationsResponse.errors, undefined);
    assert.notStrictEqual(withoutLimitationsResponse.data, null);
    assert.ok(
      !withoutLimitationsResponse.data?.setups.flatMap((entry) => entry.text).some((entry) => entry.path.toLowerCase().includes('limitations.md')),
    );
  });

  it('exposes style helper queries with pagination, id/name lookup, and layer handling', async () => {
    const { getDataForStyle, getStyleMetadata, listStyles } = await loadPublicApi();

    const allStylesResponse = await listStyles();
    assert.strictEqual(allStylesResponse.errors, undefined);
    assert.strictEqual(allStylesResponse.meta.resolvedLayer, 'full');
    assert.ok(allStylesResponse.data.length > 0);
    assert.ok(allStylesResponse.data.every((entity) => entity.kind === 'style'));

    const pagedStylesResponse = await listStyles({
      limit: 2,
      offset: 1,
    });
    assert.strictEqual(pagedStylesResponse.data.length, 2);
    assert.strictEqual(pagedStylesResponse.meta.total, allStylesResponse.meta.total);

    const fallbackResponse = await listStyles({
      layer: 'interface',
    });
    assert.strictEqual(fallbackResponse.errors, undefined);
    assert.strictEqual(fallbackResponse.meta.requestedLayer, 'interface');
    assert.strictEqual(fallbackResponse.meta.resolvedLayer, 'full');
    assert.ok(Array.isArray(fallbackResponse.meta.warnings) && fallbackResponse.meta.warnings.length > 0);

    const byIdResponse = await getStyleMetadata('style:syn-link-list');
    assert.strictEqual(byIdResponse.errors, undefined);
    assert.notStrictEqual(byIdResponse.data, null);
    assert.strictEqual(byIdResponse.data?.id, 'style:syn-link-list');

    const byModuleResponse = await getStyleMetadata('link-list');
    assert.strictEqual(byModuleResponse.errors, undefined);
    assert.strictEqual(byModuleResponse.data?.id, 'style:syn-link-list');

    const byUppercaseNameResponse = await getStyleMetadata('LINK-LIST');
    assert.strictEqual(byUppercaseNameResponse.errors, undefined);
    assert.strictEqual(byUppercaseNameResponse.data?.id, 'style:syn-link-list');

    const dataResponse = await getDataForStyle('link-list', { layer: 'examples' });
    assert.strictEqual(dataResponse.errors, undefined);
    assert.notStrictEqual(dataResponse.data, null);
    assert.strictEqual(dataResponse.data?.style, 'style:syn-link-list');
    assert.strictEqual(dataResponse.data?.layer, 'examples');
    assert.ok(Array.isArray(dataResponse.data?.examples));
    assert.ok(dataResponse.data?.examples?.[0]?.path.includes('.md'));

    const uppercaseDataResponse = await getDataForStyle('LINK-LIST', { layer: 'examples' });
    assert.strictEqual(uppercaseDataResponse.errors, undefined);
    assert.strictEqual(uppercaseDataResponse.data?.style, 'style:syn-link-list');

    const strictLayerErrorResponse = await getStyleMetadata('style:syn-link-list', {
      layer: 'interface',
      strictLayer: true,
    });
    assert.strictEqual(strictLayerErrorResponse.data, null);
    assert.ok(Array.isArray(strictLayerErrorResponse.errors) && strictLayerErrorResponse.errors.length > 0);
    assert.strictEqual(strictLayerErrorResponse.errors?.[0]?.code, 'LAYER_NOT_AVAILABLE');

    const notFoundResponse = await getStyleMetadata('this-does-not-exist');
    assert.strictEqual(notFoundResponse.data, null);
    assert.ok(Array.isArray(notFoundResponse.errors) && notFoundResponse.errors.length > 0);
    assert.strictEqual(notFoundResponse.errors?.[0]?.code, 'NOT_FOUND');
  });

  it('exposes component helper queries with pagination, id/name lookup, and layer handling', async () => {
    const {
      getComponentMetadata,
      getDataForComponent,
      getRulesForComponent,
      listComponentClusters,
      listComponents,
    } = await loadPublicApi();

    const allComponentsResponse = await listComponents();
    assert.strictEqual(allComponentsResponse.errors, undefined);
    assert.strictEqual(allComponentsResponse.meta.resolvedLayer, 'interface');
    assert.ok(allComponentsResponse.data.length > 0);
    assert.ok(allComponentsResponse.data.every((entity) => entity.kind === 'component'));

    const pagedComponentsResponse = await listComponents({
      limit: 2,
      offset: 1,
    });
    assert.strictEqual(pagedComponentsResponse.data.length, 2);
    assert.strictEqual(pagedComponentsResponse.meta.total, allComponentsResponse.meta.total);

    const clustersResponse = await listComponentClusters();
    assert.strictEqual(clustersResponse.errors, undefined);
    assert.ok(clustersResponse.data.length > 0);

    const clusterFilteredResponse = await listComponents({
      cluster: clustersResponse.data[0].id,
    });
    assert.strictEqual(clusterFilteredResponse.errors, undefined);
    assert.ok(clusterFilteredResponse.data.length > 0);
    assert.ok(
      clusterFilteredResponse.data.every((entity) => entity.custom?.clusters?.includes(clustersResponse.data[0].id)),
    );

    const fixture = await createComponentFixtureDataDir();
    try {
      const fallbackListResponse = await listComponents(
        {
          layer: 'examples',
        },
        {
          dataDir: fixture.dataDir,
        },
      );
      assert.strictEqual(fallbackListResponse.errors, undefined);
      assert.strictEqual(fallbackListResponse.meta.requestedLayer, 'examples');
      assert.strictEqual(fallbackListResponse.meta.resolvedLayer, 'full');
      assert.ok(Array.isArray(fallbackListResponse.meta.warnings) && fallbackListResponse.meta.warnings.length > 0);
    } finally {
      await fixture.cleanup();
    }

    const byIdResponse = await getComponentMetadata('component:syn-accordion');
    assert.strictEqual(byIdResponse.errors, undefined);
    assert.notStrictEqual(byIdResponse.data, null);
    assert.strictEqual(byIdResponse.data?.id, 'component:syn-accordion');

    const byTagNameResponse = await getComponentMetadata('syn-accordion');
    assert.strictEqual(byTagNameResponse.errors, undefined);
    assert.strictEqual(byTagNameResponse.data?.id, 'component:syn-accordion');

    const byUppercaseTagNameResponse = await getComponentMetadata('SYN-ACCORDION');
    assert.strictEqual(byUppercaseTagNameResponse.errors, undefined);
    assert.strictEqual(byUppercaseTagNameResponse.data?.id, 'component:syn-accordion');

    const withSourcesResponse = await getComponentMetadata('syn-accordion', {
      includeLayerRefs: true,
      includeSources: true,
      layer: 'full',
    });
    assert.strictEqual(withSourcesResponse.errors, undefined);
    assert.ok(!withSourcesResponse.data?.sources.some((source) => source.includes('.test.')));
    assert.ok(!withSourcesResponse.data?.layers?.full.some((ref) => ref.path.includes('.test.')));

    const withInterfaceSnapshot = await getComponentMetadata('syn-accordion', {
      includeInterfaceSnapshot: true,
    });
    assert.strictEqual(withInterfaceSnapshot.errors, undefined);
    assert.strictEqual(typeof withInterfaceSnapshot.data?.custom?.interfaceSnapshot, 'object');
    assert.strictEqual(withInterfaceSnapshot.data?.custom?.interfaceSnapshot?.tagName, 'syn-accordion');

    const fullLayerData = await getDataForComponent('syn-accordion', {
      framework: 'react',
      layer: 'full',
    });
    assert.strictEqual(fullLayerData.errors, undefined);
    assert.strictEqual(fullLayerData.data?.layer, 'full');
    assert.ok(Array.isArray(fullLayerData.data?.relevantLayerCode) && fullLayerData.data.relevantLayerCode.length > 0);
    assert.ok(!fullLayerData.data?.relevantLayerCode?.some((entry) => entry.path.includes('.test.')));

    const interfaceLayerData = await getDataForComponent('syn-accordion', {
      layer: 'interface',
    });
    assert.strictEqual(interfaceLayerData.errors, undefined);
    assert.strictEqual(interfaceLayerData.data?.layer, 'interface');
    assert.ok(Array.isArray(interfaceLayerData.data?.interface) && interfaceLayerData.data.interface.length > 0);
    assert.ok(interfaceLayerData.data?.interface?.every((entry) => entry.path.endsWith('.md')));

    const examplesLayerData = await getDataForComponent('syn-accordion', {
      layer: 'examples',
    });
    assert.strictEqual(examplesLayerData.errors, undefined);
    assert.strictEqual(examplesLayerData.data?.layer, 'examples');
    assert.ok(Array.isArray(examplesLayerData.data?.examples) && examplesLayerData.data.examples.length > 0);
    assert.ok(examplesLayerData.data?.examples?.every((entry) => entry.path.endsWith('.md')));

    const rulesLayerData = await getDataForComponent('syn-accordion', {
      layer: 'rules',
    });
    assert.strictEqual(rulesLayerData.errors, undefined);
    assert.strictEqual(rulesLayerData.data?.layer, 'rules');
    assert.ok(Array.isArray(rulesLayerData.data?.rules) && rulesLayerData.data.rules.length > 0);
    assert.ok(rulesLayerData.data?.rules?.every((entry) => entry.path.endsWith('.md')));
    assert.ok(rulesLayerData.data?.rules?.[0]?.content.includes('## Usage Guidelines'));

    const focusedRulesData = await getRulesForComponent('syn-accordion');
    assert.strictEqual(focusedRulesData.errors, undefined);
    assert.strictEqual(focusedRulesData.data?.layer, 'rules');
    assert.ok(Array.isArray(focusedRulesData.data?.rules) && focusedRulesData.data.rules.length > 0);
    assert.ok(focusedRulesData.data?.rules?.[0]?.content.includes('## Common Use Cases'));

    const strictLayerFixture = await createComponentFixtureDataDir();
    try {
      const strictLayerErrorResponse = await getComponentMetadata(
        'component:syn-fixture',
        {
          layer: 'examples',
          strictLayer: true,
        },
        {
          dataDir: strictLayerFixture.dataDir,
        },
      );

      assert.strictEqual(strictLayerErrorResponse.data, null);
      assert.ok(Array.isArray(strictLayerErrorResponse.errors) && strictLayerErrorResponse.errors.length > 0);
      assert.strictEqual(strictLayerErrorResponse.errors?.[0]?.code, 'LAYER_NOT_AVAILABLE');

      const missingRulesResponse = await getRulesForComponent('component:syn-fixture', {
        dataDir: strictLayerFixture.dataDir,
      });
      assert.strictEqual(missingRulesResponse.data, null);
      assert.ok(Array.isArray(missingRulesResponse.errors) && missingRulesResponse.errors.length > 0);
      assert.strictEqual(missingRulesResponse.errors?.[0]?.code, 'LAYER_NOT_AVAILABLE');
    } finally {
      await strictLayerFixture.cleanup();
    }

    const notFoundResponse = await getComponentMetadata('this-does-not-exist');
    assert.strictEqual(notFoundResponse.data, null);
    assert.ok(Array.isArray(notFoundResponse.errors) && notFoundResponse.errors.length > 0);
    assert.strictEqual(notFoundResponse.errors?.[0]?.code, 'NOT_FOUND');
  });

  it('exposes cluster helper queries with listing and component membership lookup', async () => {
    const { listComponentClusters, listComponentsByCluster } = await loadPublicApi();

    const clustersResponse = await listComponentClusters();
    assert.strictEqual(clustersResponse.errors, undefined);
    assert.ok(Array.isArray(clustersResponse.data) && clustersResponse.data.length > 0);
    assert.strictEqual(typeof clustersResponse.data[0].id, 'string');
    assert.strictEqual(typeof clustersResponse.data[0].name, 'string');
    assert.strictEqual(typeof clustersResponse.data[0].componentCount, 'number');
    assert.ok(Array.isArray(clustersResponse.data[0].componentIds));

    const firstCluster = clustersResponse.data[0];
    const membersResponse = await listComponentsByCluster(firstCluster.id);
    assert.strictEqual(membersResponse.errors, undefined);
    assert.ok(Array.isArray(membersResponse.data) && membersResponse.data.length > 0);
    assert.ok(membersResponse.data.every((entity) => entity.kind === 'component'));

    const strictLayerResponse = await listComponentsByCluster(firstCluster.id, {
      layer: 'examples',
      strictLayer: true,
    });
    if (strictLayerResponse.errors?.length) {
      assert.deepStrictEqual(strictLayerResponse.data, []);
      assert.strictEqual(strictLayerResponse.errors?.[0]?.code, 'LAYER_NOT_AVAILABLE');
    } else {
      assert.ok(Array.isArray(strictLayerResponse.data));
      assert.ok(strictLayerResponse.data.every((entity) => entity.kind === 'component'));
      assert.strictEqual(strictLayerResponse.meta.resolvedLayer, 'examples');
    }

    const notFoundResponse = await listComponentsByCluster('components-by-tag/does-not-exist');
    assert.deepStrictEqual(notFoundResponse.data, []);
    assert.ok(Array.isArray(notFoundResponse.errors) && notFoundResponse.errors.length > 0);
    assert.strictEqual(notFoundResponse.errors?.[0]?.code, 'NOT_FOUND');
  });

  it('exposes font helper queries with id/name lookup and layer handling', async () => {
    const { getFontMetadata, listFonts } = await loadPublicApi();

    const allFontsResponse = await listFonts();
    assert.strictEqual(allFontsResponse.errors, undefined);
    assert.strictEqual(allFontsResponse.meta.resolvedLayer, 'full');
    assert.ok(allFontsResponse.data.length > 0);
    assert.ok(allFontsResponse.data.every((entity) => entity.kind === 'utility'));
    assert.ok(allFontsResponse.data.every((entity) => entity.package === 'fonts'));

    const fallbackResponse = await listFonts({
      layer: 'interface',
    });
    assert.strictEqual(fallbackResponse.errors, undefined);
    assert.strictEqual(fallbackResponse.meta.requestedLayer, 'interface');
    assert.strictEqual(fallbackResponse.meta.resolvedLayer, 'full');
    assert.ok(Array.isArray(fallbackResponse.meta.warnings) && fallbackResponse.meta.warnings.length > 0);

    const strictLayerErrorResponse = await listFonts({
      layer: 'interface',
      strictLayer: true,
    });
    assert.deepStrictEqual(strictLayerErrorResponse.data, []);
    assert.ok(Array.isArray(strictLayerErrorResponse.errors) && strictLayerErrorResponse.errors.length > 0);
    assert.strictEqual(strictLayerErrorResponse.errors?.[0]?.code, 'LAYER_NOT_AVAILABLE');

    const byIdResponse = await getFontMetadata('utility:fonts-sick-intl');
    assert.strictEqual(byIdResponse.errors, undefined);
    assert.notStrictEqual(byIdResponse.data, null);
    assert.strictEqual(byIdResponse.data?.id, 'utility:fonts-sick-intl');

    const byShortIdResponse = await getFontMetadata('fonts-sick-intl');
    assert.strictEqual(byShortIdResponse.errors, undefined);
    assert.strictEqual(byShortIdResponse.data?.id, 'utility:fonts-sick-intl');

    const byUppercaseShortIdResponse = await getFontMetadata('FONTS-SICK-INTL');
    assert.strictEqual(byUppercaseShortIdResponse.errors, undefined);
    assert.strictEqual(byUppercaseShortIdResponse.data?.id, 'utility:fonts-sick-intl');

    const notFoundResponse = await getFontMetadata('this-does-not-exist');
    assert.strictEqual(notFoundResponse.data, null);
    assert.ok(Array.isArray(notFoundResponse.errors) && notFoundResponse.errors.length > 0);
    assert.strictEqual(notFoundResponse.errors?.[0]?.code, 'NOT_FOUND');
  });

  it('exposes asset helper queries with id/name lookup, layer handling, and icon search', async () => {
    const { getAssetMetadata, listAssets, searchIcons } = await loadPublicApi();

    // List all assets (logos + system-icons + icon sets)
    const allAssetsResponse = await listAssets();
    assert.strictEqual(allAssetsResponse.errors, undefined);
    assert.strictEqual(allAssetsResponse.meta.resolvedLayer, 'full');
    assert.ok(allAssetsResponse.data.length > 0);
    assert.ok(allAssetsResponse.data.every((entity) => entity.kind === 'asset'));

    // Pagination
    const pagedResponse = await listAssets({ limit: 2, offset: 1 });
    assert.strictEqual(pagedResponse.data.length, 2);
    assert.strictEqual(pagedResponse.meta.total, allAssetsResponse.meta.total);

    // Layer fallback (assets only have full layer)
    const fallbackResponse = await listAssets({ layer: 'interface' });
    assert.strictEqual(fallbackResponse.errors, undefined);
    assert.strictEqual(fallbackResponse.meta.requestedLayer, 'interface');
    assert.strictEqual(fallbackResponse.meta.resolvedLayer, 'full');
    assert.ok(Array.isArray(fallbackResponse.meta.warnings) && fallbackResponse.meta.warnings.length > 0);

    // strictLayer error
    const strictLayerErrorResponse = await listAssets({ layer: 'interface', strictLayer: true });
    assert.deepStrictEqual(strictLayerErrorResponse.data, []);
    assert.ok(Array.isArray(strictLayerErrorResponse.errors) && strictLayerErrorResponse.errors.length > 0);
    assert.strictEqual(strictLayerErrorResponse.errors?.[0]?.code, 'LAYER_NOT_AVAILABLE');

    // Lookup by full entity id
    const byIdResponse = await getAssetMetadata('asset:sick2018-icons');
    assert.strictEqual(byIdResponse.errors, undefined);
    assert.strictEqual(byIdResponse.data?.id, 'asset:sick2018-icons');

    // Lookup by short id
    const byShortIdResponse = await getAssetMetadata('sick2025-icons-fill');
    assert.strictEqual(byShortIdResponse.errors, undefined);
    assert.strictEqual(byShortIdResponse.data?.id, 'asset:sick2025-icons-fill');

    const byUppercaseShortIdResponse = await getAssetMetadata('SICK2025-ICONS-FILL');
    assert.strictEqual(byUppercaseShortIdResponse.errors, undefined);
    assert.strictEqual(byUppercaseShortIdResponse.data?.id, 'asset:sick2025-icons-fill');

    // Not found
    const notFoundResponse = await getAssetMetadata('this-does-not-exist');
    assert.strictEqual(notFoundResponse.data, null);
    assert.strictEqual(notFoundResponse.errors?.[0]?.code, 'NOT_FOUND');

    // searchIcons: search by icon name (partial)
    const byNameResponse = await searchIcons({ name: 'add' });
    assert.strictEqual(byNameResponse.errors, undefined);
    assert.ok(byNameResponse.data.length > 0);
    assert.ok(byNameResponse.data.every((r) => r.iconName.includes('add')));
    assert.ok(byNameResponse.data.every((r) => typeof r.assetId === 'string'));
    assert.ok(byNameResponse.data.every((r) => typeof r.theme === 'string' && r.theme.length > 0));
    assert.ok(byNameResponse.data.every((r) => typeof r.variant === 'string' && r.variant.length > 0));

    // searchIcons: search by category
    const byCategoryResponse = await searchIcons({ category: 'action' });
    assert.strictEqual(byCategoryResponse.errors, undefined);
    assert.ok(byCategoryResponse.data.length > 0);
    assert.ok(byCategoryResponse.data.every((r) => r.categories.some((c) => c.toLowerCase().includes('action'))));
    assert.ok(byCategoryResponse.data.every((r) => typeof r.theme === 'string' && r.theme.length > 0));
    assert.ok(byCategoryResponse.data.every((r) => typeof r.variant === 'string' && r.variant.length > 0));

    // searchIcons: search by tags
    const byTagsResponse = await searchIcons({ tags: ['rotate'] });
    assert.strictEqual(byTagsResponse.errors, undefined);
    assert.ok(byTagsResponse.data.length > 0);
    assert.ok(byTagsResponse.data.every((r) => r.tags.some((t) => t.includes('rotate'))));
    assert.ok(byTagsResponse.data.every((r) => typeof r.theme === 'string' && r.theme.length > 0));
    assert.ok(byTagsResponse.data.every((r) => typeof r.variant === 'string' && r.variant.length > 0));

    // searchIcons: scoped to a specific asset
    const scopedResponse = await searchIcons({ assetId: 'asset:sick2018-icons', name: 'add' });
    assert.ok(scopedResponse.data.every((r) => r.assetId === 'asset:sick2018-icons'));

    // searchIcons: pagination
    const allAddResponse = await searchIcons({ name: 'add' });
    const pagedIconResponse = await searchIcons({ name: 'add' }, { limit: 2, offset: 1 });
    assert.strictEqual(pagedIconResponse.data.length, 2);
    assert.strictEqual(pagedIconResponse.meta.total, allAddResponse.meta.total);

    // searchIcons: no results for unknown name returns empty data without error
    const noMatchResponse = await searchIcons({ name: 'zzz_this_icon_does_not_exist' });
    assert.strictEqual(noMatchResponse.errors, undefined);
    assert.deepStrictEqual(noMatchResponse.data, []);
    assert.strictEqual(noMatchResponse.meta.total, 0);
  });

  it('exposes template helper queries with list and data retrieval', async () => {
    const { listTemplates, getTemplateMetadata, getDataForTemplate } = await loadPublicApi();

    // List all templates
    const allTemplatesResponse = await listTemplates();
    assert.strictEqual(allTemplatesResponse.errors, undefined);
    assert.strictEqual(allTemplatesResponse.meta.resolvedLayer, 'examples');
    assert.ok(allTemplatesResponse.data.length > 0);
    assert.ok(allTemplatesResponse.data.every((entity) => entity.kind === 'template'));

    // Pagination
    const pagedResponse = await listTemplates({ limit: 2, offset: 0 });
    assert.ok(pagedResponse.data.length <= 2);
    assert.strictEqual(pagedResponse.meta.total, allTemplatesResponse.meta.total);

    // Lookup by full entity id
    const firstTemplateEntity = allTemplatesResponse.data[0];
    const byIdResponse = await getTemplateMetadata(firstTemplateEntity.id);
    assert.strictEqual(byIdResponse.errors, undefined);
    assert.strictEqual(byIdResponse.data?.id, firstTemplateEntity.id);
    assert.strictEqual(byIdResponse.data?.kind, 'template');

    // Lookup by short name (entity ID without 'template:' prefix)
    const shortName = firstTemplateEntity.id.replace('template:', '');
    const byNameResponse = await getTemplateMetadata(shortName);
    assert.strictEqual(byNameResponse.errors, undefined);
    assert.strictEqual(byNameResponse.data?.id, firstTemplateEntity.id);

    const byUppercaseNameResponse = await getTemplateMetadata(shortName.toUpperCase());
    assert.strictEqual(byUppercaseNameResponse.errors, undefined);
    assert.strictEqual(byUppercaseNameResponse.data?.id, firstTemplateEntity.id);

    // Not found
    const notFoundResponse = await getTemplateMetadata('this-does-not-exist');
    assert.strictEqual(notFoundResponse.data, null);
    assert.ok(Array.isArray(notFoundResponse.errors) && notFoundResponse.errors.length > 0);
    assert.strictEqual(notFoundResponse.errors?.[0]?.code, 'NOT_FOUND');

    // getDataForTemplate: retrieve examples layer content
    const dataResponse = await getDataForTemplate(shortName, { layer: 'examples' });
    assert.strictEqual(dataResponse.errors, undefined);
    assert.strictEqual(dataResponse.data?.layer, 'examples');
    assert.strictEqual(dataResponse.data?.template, firstTemplateEntity.id);
    assert.ok(Array.isArray(dataResponse.data?.examples));

    const uppercaseDataResponse = await getDataForTemplate(shortName.toUpperCase(), { layer: 'examples' });
    assert.strictEqual(uppercaseDataResponse.errors, undefined);
    assert.strictEqual(uppercaseDataResponse.data?.template, firstTemplateEntity.id);

    // Verify examples content is populated
    if (dataResponse.data?.examples && dataResponse.data.examples.length > 0) {
      assert.strictEqual(typeof dataResponse.data.examples[0].content, 'string');
      assert.ok(dataResponse.data.examples[0].path.includes('.md'));
    }
  });
});
