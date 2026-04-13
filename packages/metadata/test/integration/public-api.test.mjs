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
import { expect } from 'chai';

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
        full: [{ layer: 'full', path: 'layers/full/component/component:syn-fixture.ts' }],
        interface: [{ layer: 'interface', path: 'layers/interface/component/component:syn-fixture.md' }],
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
          corePath: 'data/core/component/component:syn-fixture.json',
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
    await writeFile(path.join(coreDir, 'component:syn-fixture.json'), JSON.stringify(component));

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

  it('exposes token helper queries with pagination and layer fallback metadata', async () => {
    const { getDataForTokens, getTokens } = await loadPublicApi();

    const allTokensResponse = await getTokens();
    expect(allTokensResponse.errors).to.equal(undefined);
    expect(allTokensResponse.meta.resolvedLayer).to.equal('full');
    expect(allTokensResponse.data.length).to.be.greaterThan(0);
    expect(allTokensResponse.data.every((entity) => entity.kind === 'token')).to.equal(true);

    const pagedTokensResponse = await getTokens({
      limit: 1,
      offset: 1,
    });
    expect(pagedTokensResponse.data.length).to.equal(1);
    expect(pagedTokensResponse.meta.total).to.equal(allTokensResponse.meta.total);

    const fallbackResponse = await getTokens({
      layer: 'interface',
    });
    expect(fallbackResponse.errors).to.equal(undefined);
    expect(fallbackResponse.meta.requestedLayer).to.equal('interface');
    expect(fallbackResponse.meta.resolvedLayer).to.equal('full');
    expect(fallbackResponse.meta.warnings).to.be.an('array').that.is.not.empty;

    const strictLayerErrorResponse = await getTokens({
      layer: 'interface',
      strictLayer: true,
    });
    expect(strictLayerErrorResponse.data).to.deep.equal([]);
    expect(strictLayerErrorResponse.errors).to.be.an('array').that.is.not.empty;
    expect(strictLayerErrorResponse.errors?.[0]?.code).to.equal('LAYER_NOT_AVAILABLE');

    const defaultDataResponse = await getDataForTokens();
    expect(defaultDataResponse.errors).to.equal(undefined);
    expect(defaultDataResponse.data.format).to.equal('css');
    expect(defaultDataResponse.data.theme).to.equal('sick2025-light');
    expect(defaultDataResponse.data.tokens.length).to.be.greaterThan(0);
    expect(defaultDataResponse.data.tokens.every((entry) => entry.path.endsWith('.css'))).to.equal(true);

    const cssThemeResponse = await getDataForTokens({
      format: 'css',
      theme: 'sick2018-dark',
    });
    expect(cssThemeResponse.errors).to.equal(undefined);
    expect(cssThemeResponse.data.format).to.equal('css');
    expect(cssThemeResponse.data.theme).to.equal('sick2018-dark');
    expect(cssThemeResponse.data.tokens.every((entry) => entry.theme === 'sick2018-dark')).to.equal(true);

    const javascriptResponse = await getDataForTokens({
      format: 'javascript',
      theme: 'sick2018-dark',
    });
    expect(javascriptResponse.errors).to.equal(undefined);
    expect(javascriptResponse.data.format).to.equal('javascript');
    expect(javascriptResponse.data.theme).to.equal(undefined);
    expect(javascriptResponse.data.tokens.length).to.be.greaterThan(0);
    expect(javascriptResponse.data.tokens.every((entry) => entry.path.endsWith('.js') || entry.path.endsWith('.d.ts'))).to.equal(true);

    const sassResponse = await getDataForTokens({
      format: 'sass',
    });
    expect(sassResponse.errors).to.equal(undefined);
    expect(sassResponse.data.format).to.equal('sass');
    expect(sassResponse.data.tokens.length).to.be.greaterThan(0);
    expect(sassResponse.data.tokens.every((entry) => entry.path.endsWith('.scss'))).to.equal(true);
  });

  it('exposes migration helper queries with pagination and layer fallback metadata', async () => {
    const { getMigrations } = await loadPublicApi();

    const allMigrationsResponse = await getMigrations();
    expect(allMigrationsResponse.errors).to.equal(undefined);
    expect(allMigrationsResponse.meta.resolvedLayer).to.equal('full');
    expect(allMigrationsResponse.data.length).to.be.greaterThan(0);
    expect(allMigrationsResponse.data.every((entity) => entity.package === 'migrations')).to.equal(true);

    const pagedMigrationsResponse = await getMigrations({
      limit: 1,
      offset: 0,
    });
    expect(pagedMigrationsResponse.data.length).to.equal(1);
    expect(pagedMigrationsResponse.meta.total).to.equal(allMigrationsResponse.meta.total);

    const fallbackResponse = await getMigrations({
      layer: 'interface',
    });
    expect(fallbackResponse.errors).to.equal(undefined);
    expect(fallbackResponse.meta.requestedLayer).to.equal('interface');
    expect(fallbackResponse.meta.resolvedLayer).to.equal('full');
    expect(fallbackResponse.meta.warnings).to.be.an('array').that.is.not.empty;

    const strictLayerErrorResponse = await getMigrations({
      layer: 'interface',
      strictLayer: true,
    });
    expect(strictLayerErrorResponse.data).to.deep.equal([]);
    expect(strictLayerErrorResponse.errors).to.be.an('array').that.is.not.empty;
    expect(strictLayerErrorResponse.errors?.[0]?.code).to.equal('LAYER_NOT_AVAILABLE');
  });

  it('exposes setup helper queries with package/framework composition and changelog filtering', async () => {
    const { getDataForSetup } = await loadPublicApi();

    const componentsResponse = await getDataForSetup({
      package: 'components',
    });
    expect(componentsResponse.errors).to.equal(undefined);
    expect(componentsResponse.data).to.not.equal(null);
    expect(componentsResponse.data?.setups.some((entry) => entry.id === 'setup:components-package')).to.equal(true);
    expect(
      componentsResponse.data?.setups.flatMap((entry) => entry.text).some((entry) => entry.path.toLowerCase().includes('changelog.md')),
    ).to.equal(false);
    expect(
      componentsResponse.data?.setups.flatMap((entry) => entry.text).some((entry) => entry.path.toLowerCase().includes('breaking_changes.md')),
    ).to.equal(false);
    expect(
      componentsResponse.data?.setups.flatMap((entry) => entry.text).some((entry) => entry.path.toLowerCase().includes('package.json')),
    ).to.equal(false);

    const reactComponentsResponse = await getDataForSetup({
      package: 'react',
    });
    expect(reactComponentsResponse.errors).to.equal(undefined);
    expect(reactComponentsResponse.data).to.not.equal(null);
    expect(reactComponentsResponse.data?.setups.some((entry) => entry.id === 'setup:components-package')).to.equal(true);
    expect(reactComponentsResponse.data?.setups.some((entry) => entry.id === 'setup:react-package')).to.equal(true);

    const angularResponse = await getDataForSetup({
      package: 'angular',
    });
    expect(angularResponse.errors).to.equal(undefined);
    expect(angularResponse.data).to.not.equal(null);
    expect(angularResponse.data?.setups.length).to.equal(5); // components + 4 angular modules
    expect(angularResponse.data?.setups.some((entry) => entry.id === 'setup:components-package')).to.equal(true);

    const withoutLimitationsResponse = await getDataForSetup({
      includeLimitations: false,
      package: 'components',
    });
    expect(withoutLimitationsResponse.errors).to.equal(undefined);
    expect(withoutLimitationsResponse.data).to.not.equal(null);
    expect(
      withoutLimitationsResponse.data?.setups.flatMap((entry) => entry.text).some((entry) => entry.path.toLowerCase().includes('limitations.md')),
    ).to.equal(false);
  });

  it('exposes style helper queries with pagination, id/name lookup, and layer handling', async () => {
    const { getDataForStyle, getStyleMetadata, listStyles } = await loadPublicApi();

    const allStylesResponse = await listStyles();
    expect(allStylesResponse.errors).to.equal(undefined);
    expect(allStylesResponse.meta.resolvedLayer).to.equal('full');
    expect(allStylesResponse.data.length).to.be.greaterThan(0);
    expect(allStylesResponse.data.every((entity) => entity.kind === 'style')).to.equal(true);

    const pagedStylesResponse = await listStyles({
      limit: 2,
      offset: 1,
    });
    expect(pagedStylesResponse.data.length).to.equal(2);
    expect(pagedStylesResponse.meta.total).to.equal(allStylesResponse.meta.total);

    const fallbackResponse = await listStyles({
      layer: 'interface',
    });
    expect(fallbackResponse.errors).to.equal(undefined);
    expect(fallbackResponse.meta.requestedLayer).to.equal('interface');
    expect(fallbackResponse.meta.resolvedLayer).to.equal('full');
    expect(fallbackResponse.meta.warnings).to.be.an('array').that.is.not.empty;

    const byIdResponse = await getStyleMetadata('style:syn-link-list');
    expect(byIdResponse.errors).to.equal(undefined);
    expect(byIdResponse.data).to.not.equal(null);
    expect(byIdResponse.data?.id).to.equal('style:syn-link-list');

    const byModuleResponse = await getStyleMetadata('link-list');
    expect(byModuleResponse.errors).to.equal(undefined);
    expect(byModuleResponse.data?.id).to.equal('style:syn-link-list');

    const byUppercaseNameResponse = await getStyleMetadata('LINK-LIST');
    expect(byUppercaseNameResponse.errors).to.equal(undefined);
    expect(byUppercaseNameResponse.data?.id).to.equal('style:syn-link-list');

    const dataResponse = await getDataForStyle('link-list', { layer: 'examples' });
    expect(dataResponse.errors).to.equal(undefined);
    expect(dataResponse.data).to.not.equal(null);
    expect(dataResponse.data?.style).to.equal('style:syn-link-list');
    expect(dataResponse.data?.layer).to.equal('examples');
    expect(dataResponse.data?.examples).to.be.an('array');
    expect(dataResponse.data?.examples?.[0]?.path).to.include('.md');

    const uppercaseDataResponse = await getDataForStyle('LINK-LIST', { layer: 'examples' });
    expect(uppercaseDataResponse.errors).to.equal(undefined);
    expect(uppercaseDataResponse.data?.style).to.equal('style:syn-link-list');

    const strictLayerErrorResponse = await getStyleMetadata('style:syn-link-list', {
      layer: 'interface',
      strictLayer: true,
    });
    expect(strictLayerErrorResponse.data).to.equal(null);
    expect(strictLayerErrorResponse.errors).to.be.an('array').that.is.not.empty;
    expect(strictLayerErrorResponse.errors?.[0]?.code).to.equal('LAYER_NOT_AVAILABLE');

    const notFoundResponse = await getStyleMetadata('this-does-not-exist');
    expect(notFoundResponse.data).to.equal(null);
    expect(notFoundResponse.errors).to.be.an('array').that.is.not.empty;
    expect(notFoundResponse.errors?.[0]?.code).to.equal('NOT_FOUND');
  });

  it('exposes component helper queries with pagination, id/name lookup, and layer handling', async () => {
    const {
      getComponentMetadata,
      getDataForComponent,
      listComponentClusters,
      listComponents,
    } = await loadPublicApi();

    const allComponentsResponse = await listComponents();
    expect(allComponentsResponse.errors).to.equal(undefined);
    expect(allComponentsResponse.meta.resolvedLayer).to.equal('interface');
    expect(allComponentsResponse.data.length).to.be.greaterThan(0);
    expect(allComponentsResponse.data.every((entity) => entity.kind === 'component')).to.equal(true);

    const pagedComponentsResponse = await listComponents({
      limit: 2,
      offset: 1,
    });
    expect(pagedComponentsResponse.data.length).to.equal(2);
    expect(pagedComponentsResponse.meta.total).to.equal(allComponentsResponse.meta.total);

    const clustersResponse = await listComponentClusters();
    expect(clustersResponse.errors).to.equal(undefined);
    expect(clustersResponse.data.length).to.be.greaterThan(0);

    const clusterFilteredResponse = await listComponents({
      cluster: clustersResponse.data[0].id,
    });
    expect(clusterFilteredResponse.errors).to.equal(undefined);
    expect(clusterFilteredResponse.data.length).to.be.greaterThan(0);
    expect(
      clusterFilteredResponse.data.every((entity) => entity.custom?.clusters?.includes(clustersResponse.data[0].id)),
    ).to.equal(true);

    const fallbackListResponse = await listComponents({
      layer: 'examples',
    });
    expect(fallbackListResponse.errors).to.equal(undefined);
    expect(fallbackListResponse.meta.requestedLayer).to.equal('examples');
    expect(fallbackListResponse.meta.resolvedLayer).to.equal('full');
    expect(fallbackListResponse.meta.warnings).to.be.an('array').that.is.not.empty;

    const byIdResponse = await getComponentMetadata('component:syn-accordion');
    expect(byIdResponse.errors).to.equal(undefined);
    expect(byIdResponse.data).to.not.equal(null);
    expect(byIdResponse.data?.id).to.equal('component:syn-accordion');

    const byTagNameResponse = await getComponentMetadata('syn-accordion');
    expect(byTagNameResponse.errors).to.equal(undefined);
    expect(byTagNameResponse.data?.id).to.equal('component:syn-accordion');

    const byUppercaseTagNameResponse = await getComponentMetadata('SYN-ACCORDION');
    expect(byUppercaseTagNameResponse.errors).to.equal(undefined);
    expect(byUppercaseTagNameResponse.data?.id).to.equal('component:syn-accordion');

    const withSourcesResponse = await getComponentMetadata('syn-accordion', {
      includeLayerRefs: true,
      includeSources: true,
      layer: 'full',
    });
    expect(withSourcesResponse.errors).to.equal(undefined);
    expect(withSourcesResponse.data?.sources.some((source) => source.includes('.test.'))).to.equal(false);
    expect(withSourcesResponse.data?.layers?.full.some((ref) => ref.path.includes('.test.'))).to.equal(false);

    const withInterfaceSnapshot = await getComponentMetadata('syn-accordion', {
      includeInterfaceSnapshot: true,
    });
    expect(withInterfaceSnapshot.errors).to.equal(undefined);
    expect(withInterfaceSnapshot.data?.custom?.interfaceSnapshot).to.be.an('object');
    expect(withInterfaceSnapshot.data?.custom?.interfaceSnapshot?.tagName).to.equal('syn-accordion');

    const fullLayerData = await getDataForComponent('syn-accordion', {
      framework: 'react',
      layer: 'full',
    });
    expect(fullLayerData.errors).to.equal(undefined);
    expect(fullLayerData.data?.layer).to.equal('full');
    expect(fullLayerData.data?.relevantLayerCode).to.be.an('array').that.is.not.empty;
    expect(fullLayerData.data?.relevantLayerCode?.some((entry) => entry.path.includes('.test.'))).to.equal(false);

    const interfaceLayerData = await getDataForComponent('syn-accordion', {
      layer: 'interface',
    });
    expect(interfaceLayerData.errors).to.equal(undefined);
    expect(interfaceLayerData.data?.layer).to.equal('interface');
    expect(interfaceLayerData.data?.interface).to.be.an('array').that.is.not.empty;
    expect(interfaceLayerData.data?.interface?.every((entry) => entry.path.endsWith('.md'))).to.equal(true);

    const examplesLayerData = await getDataForComponent('syn-accordion', {
      layer: 'examples',
    });
    expect(examplesLayerData.errors).to.equal(undefined);
    expect(examplesLayerData.data?.layer).to.equal('examples');
    expect(examplesLayerData.data?.examples).to.be.an('array').that.is.not.empty;
    expect(examplesLayerData.data?.examples?.every((entry) => entry.path.endsWith('.md'))).to.equal(true);

    const fixture = await createComponentFixtureDataDir();
    try {
      const strictLayerErrorResponse = await getComponentMetadata(
        'component:syn-fixture',
        {
          layer: 'examples',
          strictLayer: true,
        },
        {
          dataDir: fixture.dataDir,
        },
      );

      expect(strictLayerErrorResponse.data).to.equal(null);
      expect(strictLayerErrorResponse.errors).to.be.an('array').that.is.not.empty;
      expect(strictLayerErrorResponse.errors?.[0]?.code).to.equal('LAYER_NOT_AVAILABLE');
    } finally {
      await fixture.cleanup();
    }

    const notFoundResponse = await getComponentMetadata('this-does-not-exist');
    expect(notFoundResponse.data).to.equal(null);
    expect(notFoundResponse.errors).to.be.an('array').that.is.not.empty;
    expect(notFoundResponse.errors?.[0]?.code).to.equal('NOT_FOUND');
  });

  it('exposes cluster helper queries with listing and component membership lookup', async () => {
    const { listComponentClusters, listComponentsByCluster } = await loadPublicApi();

    const clustersResponse = await listComponentClusters();
    expect(clustersResponse.errors).to.equal(undefined);
    expect(clustersResponse.data).to.be.an('array').that.is.not.empty;
    expect(clustersResponse.data[0]).to.have.property('id').that.is.a('string');
    expect(clustersResponse.data[0]).to.have.property('name').that.is.a('string');
    expect(clustersResponse.data[0]).to.have.property('componentCount').that.is.a('number');
    expect(clustersResponse.data[0]).to.have.property('componentIds').that.is.an('array');

    const firstCluster = clustersResponse.data[0];
    const membersResponse = await listComponentsByCluster(firstCluster.id);
    expect(membersResponse.errors).to.equal(undefined);
    expect(membersResponse.data).to.be.an('array').that.is.not.empty;
    expect(membersResponse.data.every((entity) => entity.kind === 'component')).to.equal(true);

    const strictLayerResponse = await listComponentsByCluster(firstCluster.id, {
      layer: 'examples',
      strictLayer: true,
    });
    if (strictLayerResponse.errors?.length) {
      expect(strictLayerResponse.data).to.deep.equal([]);
      expect(strictLayerResponse.errors?.[0]?.code).to.equal('LAYER_NOT_AVAILABLE');
    } else {
      expect(strictLayerResponse.data).to.be.an('array');
      expect(strictLayerResponse.data.every((entity) => entity.kind === 'component')).to.equal(true);
      expect(strictLayerResponse.meta.resolvedLayer).to.equal('examples');
    }

    const notFoundResponse = await listComponentsByCluster('components-by-tag/does-not-exist');
    expect(notFoundResponse.data).to.deep.equal([]);
    expect(notFoundResponse.errors).to.be.an('array').that.is.not.empty;
    expect(notFoundResponse.errors?.[0]?.code).to.equal('NOT_FOUND');
  });

  it('exposes font helper queries with id/name lookup and layer handling', async () => {
    const { getFontMetadata, listFonts } = await loadPublicApi();

    const allFontsResponse = await listFonts();
    expect(allFontsResponse.errors).to.equal(undefined);
    expect(allFontsResponse.meta.resolvedLayer).to.equal('full');
    expect(allFontsResponse.data.length).to.be.greaterThan(0);
    expect(allFontsResponse.data.every((entity) => entity.kind === 'utility')).to.equal(true);
    expect(allFontsResponse.data.every((entity) => entity.package === 'fonts')).to.equal(true);

    const fallbackResponse = await listFonts({
      layer: 'interface',
    });
    expect(fallbackResponse.errors).to.equal(undefined);
    expect(fallbackResponse.meta.requestedLayer).to.equal('interface');
    expect(fallbackResponse.meta.resolvedLayer).to.equal('full');
    expect(fallbackResponse.meta.warnings).to.be.an('array').that.is.not.empty;

    const strictLayerErrorResponse = await listFonts({
      layer: 'interface',
      strictLayer: true,
    });
    expect(strictLayerErrorResponse.data).to.deep.equal([]);
    expect(strictLayerErrorResponse.errors).to.be.an('array').that.is.not.empty;
    expect(strictLayerErrorResponse.errors?.[0]?.code).to.equal('LAYER_NOT_AVAILABLE');

    const byIdResponse = await getFontMetadata('utility:fonts-sick-intl');
    expect(byIdResponse.errors).to.equal(undefined);
    expect(byIdResponse.data).to.not.equal(null);
    expect(byIdResponse.data?.id).to.equal('utility:fonts-sick-intl');

    const byShortIdResponse = await getFontMetadata('fonts-sick-intl');
    expect(byShortIdResponse.errors).to.equal(undefined);
    expect(byShortIdResponse.data?.id).to.equal('utility:fonts-sick-intl');

    const byUppercaseShortIdResponse = await getFontMetadata('FONTS-SICK-INTL');
    expect(byUppercaseShortIdResponse.errors).to.equal(undefined);
    expect(byUppercaseShortIdResponse.data?.id).to.equal('utility:fonts-sick-intl');

    const notFoundResponse = await getFontMetadata('this-does-not-exist');
    expect(notFoundResponse.data).to.equal(null);
    expect(notFoundResponse.errors).to.be.an('array').that.is.not.empty;
    expect(notFoundResponse.errors?.[0]?.code).to.equal('NOT_FOUND');
  });

  it('exposes asset helper queries with id/name lookup, layer handling, and icon search', async () => {
    const { getAssetMetadata, listAssets, searchIcons } = await loadPublicApi();

    // List all assets (logos + system-icons + icon sets)
    const allAssetsResponse = await listAssets();
    expect(allAssetsResponse.errors).to.equal(undefined);
    expect(allAssetsResponse.meta.resolvedLayer).to.equal('full');
    expect(allAssetsResponse.data.length).to.be.greaterThan(0);
    expect(allAssetsResponse.data.every((entity) => entity.kind === 'asset')).to.equal(true);

    // Pagination
    const pagedResponse = await listAssets({ limit: 2, offset: 1 });
    expect(pagedResponse.data.length).to.equal(2);
    expect(pagedResponse.meta.total).to.equal(allAssetsResponse.meta.total);

    // Layer fallback (assets only have full layer)
    const fallbackResponse = await listAssets({ layer: 'interface' });
    expect(fallbackResponse.errors).to.equal(undefined);
    expect(fallbackResponse.meta.requestedLayer).to.equal('interface');
    expect(fallbackResponse.meta.resolvedLayer).to.equal('full');
    expect(fallbackResponse.meta.warnings).to.be.an('array').that.is.not.empty;

    // strictLayer error
    const strictLayerErrorResponse = await listAssets({ layer: 'interface', strictLayer: true });
    expect(strictLayerErrorResponse.data).to.deep.equal([]);
    expect(strictLayerErrorResponse.errors).to.be.an('array').that.is.not.empty;
    expect(strictLayerErrorResponse.errors?.[0]?.code).to.equal('LAYER_NOT_AVAILABLE');

    // Lookup by full entity id
    const byIdResponse = await getAssetMetadata('asset:sick2018-icons');
    expect(byIdResponse.errors).to.equal(undefined);
    expect(byIdResponse.data?.id).to.equal('asset:sick2018-icons');

    // Lookup by short id
    const byShortIdResponse = await getAssetMetadata('sick2025-icons-fill');
    expect(byShortIdResponse.errors).to.equal(undefined);
    expect(byShortIdResponse.data?.id).to.equal('asset:sick2025-icons-fill');

    const byUppercaseShortIdResponse = await getAssetMetadata('SICK2025-ICONS-FILL');
    expect(byUppercaseShortIdResponse.errors).to.equal(undefined);
    expect(byUppercaseShortIdResponse.data?.id).to.equal('asset:sick2025-icons-fill');

    // Not found
    const notFoundResponse = await getAssetMetadata('this-does-not-exist');
    expect(notFoundResponse.data).to.equal(null);
    expect(notFoundResponse.errors?.[0]?.code).to.equal('NOT_FOUND');

    // searchIcons: search by icon name (partial)
    const byNameResponse = await searchIcons({ name: 'add' });
    expect(byNameResponse.errors).to.equal(undefined);
    expect(byNameResponse.data.length).to.be.greaterThan(0);
    expect(byNameResponse.data.every((r) => r.iconName.includes('add'))).to.equal(true);
    expect(byNameResponse.data.every((r) => typeof r.assetId === 'string')).to.equal(true);
    expect(byNameResponse.data.every((r) => typeof r.theme === 'string' && r.theme.length > 0)).to.equal(true);
    expect(byNameResponse.data.every((r) => typeof r.variant === 'string' && r.variant.length > 0)).to.equal(true);

    // searchIcons: search by category
    const byCategoryResponse = await searchIcons({ category: 'action' });
    expect(byCategoryResponse.errors).to.equal(undefined);
    expect(byCategoryResponse.data.length).to.be.greaterThan(0);
    expect(byCategoryResponse.data.every((r) => r.categories.some((c) => c.toLowerCase().includes('action')))).to.equal(true);
    expect(byCategoryResponse.data.every((r) => typeof r.theme === 'string' && r.theme.length > 0)).to.equal(true);
    expect(byCategoryResponse.data.every((r) => typeof r.variant === 'string' && r.variant.length > 0)).to.equal(true);

    // searchIcons: search by tags
    const byTagsResponse = await searchIcons({ tags: ['rotate'] });
    expect(byTagsResponse.errors).to.equal(undefined);
    expect(byTagsResponse.data.length).to.be.greaterThan(0);
    expect(byTagsResponse.data.every((r) => r.tags.some((t) => t.includes('rotate')))).to.equal(true);
    expect(byTagsResponse.data.every((r) => typeof r.theme === 'string' && r.theme.length > 0)).to.equal(true);
    expect(byTagsResponse.data.every((r) => typeof r.variant === 'string' && r.variant.length > 0)).to.equal(true);

    // searchIcons: scoped to a specific asset
    const scopedResponse = await searchIcons({ assetId: 'asset:sick2018-icons', name: 'add' });
    expect(scopedResponse.data.every((r) => r.assetId === 'asset:sick2018-icons')).to.equal(true);

    // searchIcons: pagination
    const allAddResponse = await searchIcons({ name: 'add' });
    const pagedIconResponse = await searchIcons({ name: 'add' }, { limit: 2, offset: 1 });
    expect(pagedIconResponse.data.length).to.equal(2);
    expect(pagedIconResponse.meta.total).to.equal(allAddResponse.meta.total);

    // searchIcons: no results for unknown name returns empty data without error
    const noMatchResponse = await searchIcons({ name: 'zzz_this_icon_does_not_exist' });
    expect(noMatchResponse.errors).to.equal(undefined);
    expect(noMatchResponse.data).to.deep.equal([]);
    expect(noMatchResponse.meta.total).to.equal(0);
  });

  it('exposes template helper queries with list and data retrieval', async () => {
    const { listTemplates, getTemplateMetadata, getDataForTemplate } = await loadPublicApi();

    // List all templates
    const allTemplatesResponse = await listTemplates();
    expect(allTemplatesResponse.errors).to.equal(undefined);
    expect(allTemplatesResponse.meta.resolvedLayer).to.equal('examples');
    expect(allTemplatesResponse.data.length).to.be.greaterThan(0);
    expect(allTemplatesResponse.data.every((entity) => entity.kind === 'template')).to.equal(true);

    // Pagination
    const pagedResponse = await listTemplates({ limit: 2, offset: 0 });
    expect(pagedResponse.data.length).to.be.at.most(2);
    expect(pagedResponse.meta.total).to.equal(allTemplatesResponse.meta.total);

    // Lookup by full entity id
    const firstTemplateEntity = allTemplatesResponse.data[0];
    const byIdResponse = await getTemplateMetadata(firstTemplateEntity.id);
    expect(byIdResponse.errors).to.equal(undefined);
    expect(byIdResponse.data?.id).to.equal(firstTemplateEntity.id);
    expect(byIdResponse.data?.kind).to.equal('template');

    // Lookup by short name (entity ID without 'template:' prefix)
    const shortName = firstTemplateEntity.id.replace('template:', '');
    const byNameResponse = await getTemplateMetadata(shortName);
    expect(byNameResponse.errors).to.equal(undefined);
    expect(byNameResponse.data?.id).to.equal(firstTemplateEntity.id);

    const byUppercaseNameResponse = await getTemplateMetadata(shortName.toUpperCase());
    expect(byUppercaseNameResponse.errors).to.equal(undefined);
    expect(byUppercaseNameResponse.data?.id).to.equal(firstTemplateEntity.id);

    // Not found
    const notFoundResponse = await getTemplateMetadata('this-does-not-exist');
    expect(notFoundResponse.data).to.equal(null);
    expect(notFoundResponse.errors).to.be.an('array').that.is.not.empty;
    expect(notFoundResponse.errors?.[0]?.code).to.equal('NOT_FOUND');

    // getDataForTemplate: retrieve examples layer content
    const dataResponse = await getDataForTemplate(shortName, { layer: 'examples' });
    expect(dataResponse.errors).to.equal(undefined);
    expect(dataResponse.data?.layer).to.equal('examples');
    expect(dataResponse.data?.template).to.equal(firstTemplateEntity.id);
    expect(dataResponse.data?.examples).to.be.an('array');

    const uppercaseDataResponse = await getDataForTemplate(shortName.toUpperCase(), { layer: 'examples' });
    expect(uppercaseDataResponse.errors).to.equal(undefined);
    expect(uppercaseDataResponse.data?.template).to.equal(firstTemplateEntity.id);
    
    // Verify examples content is populated
    if (dataResponse.data?.examples && dataResponse.data.examples.length > 0) {
      expect(dataResponse.data.examples[0]).to.have.property('content').that.is.a('string');
      expect(dataResponse.data.examples[0]).to.have.property('path').that.includes('.md');
    }
  });
});
