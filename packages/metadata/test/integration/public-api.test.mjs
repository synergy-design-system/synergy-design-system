import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
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
    const { getTokens } = await loadPublicApi();

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

  it('exposes style helper queries with pagination, id/name lookup, and layer handling', async () => {
    const { getStyleMetadata, listStyles } = await loadPublicApi();

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
    const { getComponentMetadata, listComponents } = await loadPublicApi();

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
});
