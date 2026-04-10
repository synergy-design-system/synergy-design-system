/**
 * Enricher: Add framework wrapper metadata and package-level setup entities.
 */
import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import ts from 'typescript';
import { type Context } from '../../core/context.js';
import { type Result, ok } from '../../core/result.js';
import { type EnrichError, createEnrichError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type ComponentsConfig } from './types.js';

type FrameworkPackageJson = {
  name?: string;
  version?: string;
};

type FrameworkPackageInfo = Required<FrameworkPackageJson>;

type VueFrameworkMetadata = {
  componentName: string;
  exportPath: string;
  packageName: string;
  sourcePath: string;
};

type ReactWrapperMetadata = {
  componentName: string;
  exportPath: string;
  packageName: string;
  sourcePath: string;
};

type AngularWrapperMetadata = {
  componentName: string;
  exportPath: string;
  packageName: string;
  selector: string;
  sourcePath: string;
};

type ReactJsxEventMetadata = {
  name: string;
  type: string;
};

type ReactJsxMetadata = {
  componentName: string;
  documentation?: string;
  events: ReactJsxEventMetadata[];
  packageName: string;
  since?: string;
  sourcePath: string;
  status?: string;
  subpathExport: string;
  typeText: string;
  typeName: string;
};

const toTagNameFromComponentName = (componentName: string): string => componentName
  .replace(/^Syn(Vue)?/, '')
  .replace(/JSXElement$/, '')
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  .toLowerCase()
  .replace(/^/, 'syn-');

const toFrameworkPackageInfo = (
  packageJson: FrameworkPackageJson,
  fallbackName: string,
): FrameworkPackageInfo => ({
  name: packageJson.name ?? fallbackName,
  version: packageJson.version ?? 'unknown',
});

const normalizeJSDocComment = (comment: string | ts.NodeArray<ts.JSDocComment> | undefined): string | undefined => {
  if (typeof comment === 'string') {
    return comment.trim();
  }

  if (!comment) {
    return undefined;
  }

  const normalized = comment
    .map((part) => (typeof part === 'string' ? part : part.text))
    .join('')
    .trim();

  return normalized.length > 0 ? normalized : undefined;
};

const getJSDocTagValue = (node: ts.Node, tagName: string): string | undefined => {
  const tag = ts.getJSDocTags(node).find((currentTag) => currentTag.tagName.text === tagName);
  return tag ? normalizeJSDocComment(tag.comment) : undefined;
};

const hasExportModifier = (modifiers: ts.NodeArray<ts.ModifierLike> | undefined): boolean => modifiers?.some(
  (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
) ?? false;

const getAngularDecoratorConfig = (classNode: ts.ClassDeclaration): ts.ObjectLiteralExpression | undefined => {
  const decorators = ts.getDecorators(classNode);
  if (!decorators) {
    return undefined;
  }

  const componentDecorator = decorators.find((decorator) => {
    if (!ts.isCallExpression(decorator.expression)) {
      return false;
    }

    return ts.isIdentifier(decorator.expression.expression)
      && decorator.expression.expression.text === 'Component';
  });

  if (!componentDecorator || !ts.isCallExpression(componentDecorator.expression)) {
    return undefined;
  }

  const [configArg] = componentDecorator.expression.arguments;
  return configArg && ts.isObjectLiteralExpression(configArg) ? configArg : undefined;
};

const getAngularSelector = (sourceFile: ts.SourceFile): string | undefined => {
  for (const node of sourceFile.statements) {
    if (!ts.isClassDeclaration(node)) {
      continue;
    }

    const config = getAngularDecoratorConfig(node);
    if (!config) {
      continue;
    }

    const selectorProp = config.properties.find((property) => {
      if (!ts.isPropertyAssignment(property)) {
        return false;
      }

      return ts.isIdentifier(property.name)
        && property.name.text === 'selector';
    });

    if (!selectorProp || !ts.isPropertyAssignment(selectorProp)) {
      continue;
    }

    if (ts.isStringLiteral(selectorProp.initializer) || ts.isNoSubstitutionTemplateLiteral(selectorProp.initializer)) {
      return selectorProp.initializer.text;
    }
  }

  return undefined;
};

const getExportedClassName = (sourceFile: ts.SourceFile): string | undefined => {
  for (const node of sourceFile.statements) {
    if (!ts.isClassDeclaration(node) || !node.name || !hasExportModifier(node.modifiers)) {
      continue;
    }

    return node.name.text;
  }

  return undefined;
};

const getCanonicalComponentTag = (entity: CoreEntity): string | undefined => {
  if (entity.kind !== 'component') {
    return undefined;
  }

  return entity.tags.find((tag) => tag.startsWith('syn-'));
};

const appendSources = (entity: CoreEntity, sourcePaths: string[]): string[] => [
  ...new Set([...entity.sources, ...sourcePaths]),
].sort();

const appendTags = (entity: CoreEntity, tags: string[]): string[] => [
  ...new Set([...entity.tags, ...tags]),
].sort();

const buildVueWrapperMap = async (
  repoRoot: string,
  vuePackagePath: string,
): Promise<{
  packageInfo: FrameworkPackageInfo;
  wrappers: Map<string, VueFrameworkMetadata>;
}> => {
  const vueRoot = join(repoRoot, vuePackagePath);
  const componentsDir = join(vueRoot, 'src', 'components');
  const indexPath = join(vueRoot, 'src', 'index.ts');
  const packageJsonPath = join(vueRoot, 'package.json');

  await access(componentsDir);
  await access(indexPath);
  await access(packageJsonPath);

  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as FrameworkPackageJson;
  const files = await readdir(componentsDir, { withFileTypes: true });
  const wrappers = new Map<string, VueFrameworkMetadata>();

  files
    .filter((entry) => entry.isFile() && entry.name.endsWith('.vue'))
    .forEach((entry) => {
      const componentName = entry.name.replace(/\.vue$/, '');
      const tagName = toTagNameFromComponentName(componentName);
      const sourcePath = relative(repoRoot, join(componentsDir, entry.name));

      wrappers.set(tagName, {
        componentName,
        exportPath: relative(repoRoot, indexPath),
        packageName: packageJson.name ?? '@synergy-design-system/vue',
        sourcePath,
      });
    });

  return {
    packageInfo: toFrameworkPackageInfo(packageJson, '@synergy-design-system/vue'),
    wrappers,
  };
};

const buildReactWrapperMap = async (
  repoRoot: string,
  reactPackagePath: string,
): Promise<{
  packageInfo: FrameworkPackageInfo;
  wrappers: Map<string, ReactWrapperMetadata>;
}> => {
  const reactRoot = join(repoRoot, reactPackagePath);
  const componentsDir = join(reactRoot, 'src', 'components');
  const indexPath = join(reactRoot, 'src', 'index.ts');
  const packageJsonPath = join(reactRoot, 'package.json');

  await access(componentsDir);
  await access(indexPath);
  await access(packageJsonPath);

  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as FrameworkPackageJson;
  const files = await readdir(componentsDir, { withFileTypes: true });
  const wrappers = new Map<string, ReactWrapperMetadata>();

  await Promise.all(files
    .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
    .map(async (entry) => {
      const wrapperPath = join(componentsDir, entry.name);
      const sourceText = await readFile(wrapperPath, 'utf8');
      const sourceFile = ts.createSourceFile(wrapperPath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
      let componentName: string | undefined;
      let tagName: string | undefined;

      sourceFile.forEachChild((node) => {
        if (ts.isVariableStatement(node)) {
          node.declarationList.declarations.forEach((declaration) => {
            if (ts.isIdentifier(declaration.name) && declaration.name.text === 'tagName' && declaration.initializer && ts.isStringLiteral(declaration.initializer)) {
              tagName = declaration.initializer.text;
            }

            if (hasExportModifier(node.modifiers) && ts.isIdentifier(declaration.name)) {
              componentName = declaration.name.text;
            }
          });
        }
      });

      if (!componentName || !tagName) {
        return;
      }

      wrappers.set(tagName, {
        componentName,
        exportPath: relative(repoRoot, indexPath),
        packageName: packageJson.name ?? '@synergy-design-system/react',
        sourcePath: relative(repoRoot, wrapperPath),
      });
    }));

  return {
    packageInfo: toFrameworkPackageInfo(packageJson, '@synergy-design-system/react'),
    wrappers,
  };
};

const buildAngularWrapperMap = async (
  repoRoot: string,
  angularPackagePath: string,
): Promise<{
  packageInfo: FrameworkPackageInfo;
  wrappers: Map<string, AngularWrapperMetadata>;
}> => {
  const angularRoot = join(repoRoot, angularPackagePath);
  const componentsDir = join(angularRoot, 'components');
  const indexPath = join(angularRoot, 'index.ts');
  const packageJsonPath = join(angularRoot, 'package.json');

  await access(componentsDir);
  await access(indexPath);
  await access(packageJsonPath);

  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as FrameworkPackageJson;
  const componentFolders = await readdir(componentsDir, { withFileTypes: true });
  const wrappers = new Map<string, AngularWrapperMetadata>();

  await Promise.all(componentFolders
    .filter((entry) => entry.isDirectory())
    .map(async (entry) => {
      const wrapperPath = join(componentsDir, entry.name, `${entry.name}.component.ts`);

      try {
        await access(wrapperPath);
      } catch {
        return;
      }

      const sourceText = await readFile(wrapperPath, 'utf8');
      const sourceFile = ts.createSourceFile(wrapperPath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

      const componentName = getExportedClassName(sourceFile);
      const selector = getAngularSelector(sourceFile);
      if (!componentName || !selector || !selector.startsWith('syn-')) {
        return;
      }

      wrappers.set(selector, {
        componentName,
        exportPath: relative(repoRoot, indexPath),
        packageName: packageJson.name ?? '@synergy-design-system/angular',
        selector,
        sourcePath: relative(repoRoot, wrapperPath),
      });
    }));

  return {
    packageInfo: toFrameworkPackageInfo(packageJson, '@synergy-design-system/angular'),
    wrappers,
  };
};

const extractReactJsxEvents = (
  node: ts.TypeAliasDeclaration,
  sourceFile: ts.SourceFile,
): ReactJsxEventMetadata[] => {
  if (!ts.isTypeReferenceNode(node.type) || node.type.typeArguments?.length !== 2) {
    return [];
  }

  const [, eventsType] = node.type.typeArguments;
  if (!ts.isTupleTypeNode(eventsType)) {
    return [];
  }

  return eventsType.elements.flatMap((element) => {
    if (!ts.isTupleTypeNode(element) || element.elements.length < 2) {
      return [];
    }

    const [nameNode, typeNode] = element.elements;
    if (!ts.isLiteralTypeNode(nameNode) || !ts.isStringLiteral(nameNode.literal)) {
      return [];
    }

    return [{
      name: nameNode.literal.text,
      type: typeNode.getText(sourceFile),
    }];
  });
};

const buildReactJsxMap = async (
  repoRoot: string,
  reactPackagePath: string,
): Promise<Map<string, ReactJsxMetadata>> => {
  const jsxTypesPath = join(repoRoot, reactPackagePath, 'src', 'types', 'syn-jsx-elements.ts');
  await access(jsxTypesPath);

  const sourceText = await readFile(jsxTypesPath, 'utf8');
  const sourceFile = ts.createSourceFile(jsxTypesPath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const sourcePath = relative(repoRoot, jsxTypesPath);
  const jsxMap = new Map<string, ReactJsxMetadata>();

  sourceFile.forEachChild((node) => {
    if (!ts.isTypeAliasDeclaration(node) || !hasExportModifier(node.modifiers) || !node.name.text.endsWith('JSXElement')) {
      return;
    }

    const typeArguments = ts.isTypeReferenceNode(node.type) ? node.type.typeArguments : undefined;
    if (!typeArguments || typeArguments.length === 0) {
      return;
    }

    const [elementType] = typeArguments;
    const componentName = elementType.getText(sourceFile);
    const tagName = toTagNameFromComponentName(componentName);

    jsxMap.set(tagName, {
      componentName,
      documentation: getJSDocTagValue(node, 'documentation'),
      events: extractReactJsxEvents(node, sourceFile),
      packageName: '@synergy-design-system/react',
      since: getJSDocTagValue(node, 'since'),
      sourcePath,
      status: getJSDocTagValue(node, 'status'),
      subpathExport: './types/latest',
      typeName: node.name.text,
      typeText: node.getText(sourceFile),
    });
  });

  return jsxMap;
};

const createVueSetupEntity = (
  repoRoot: string,
  vuePackagePath: string,
  packageInfo: FrameworkPackageInfo,
): CoreEntity => {
  const vueRoot = join(repoRoot, vuePackagePath);
  const sources = [
    'README.md',
    'CHANGELOG.md',
    'LIMITATIONS.md',
    'package.json',
    'src/index.ts',
  ].map((filePath) => relative(repoRoot, join(vueRoot, filePath)));

  return {
    custom: {
      framework: 'vue',
      packageName: packageInfo.name,
      packageVersion: packageInfo.version,
    },
    id: 'setup:vue-package',
    kind: 'setup',
    layers: {},
    name: 'Vue Framework Package',
    package: 'vue',
    relations: [],
    since: packageInfo.version,
    sources,
    status: 'stable',
    tags: ['framework', 'setup', 'vue'],
  };
};

const createReactSetupEntity = (
  repoRoot: string,
  reactPackagePath: string,
  packageInfo: FrameworkPackageInfo,
): CoreEntity => {
  const reactRoot = join(repoRoot, reactPackagePath);
  const sources = [
    'README.md',
    'CHANGELOG.md',
    'LIMITATIONS.md',
    'package.json',
    'src/index.ts',
    'src/types/syn-jsx-elements.ts',
  ].map((filePath) => relative(repoRoot, join(reactRoot, filePath)));

  return {
    custom: {
      framework: 'react',
      packageName: packageInfo.name,
      packageVersion: packageInfo.version,
      subpathExports: ['.', './components/*', './types/latest'],
    },
    id: 'setup:react-package',
    kind: 'setup',
    layers: {},
    name: 'React Framework Package',
    package: 'react',
    relations: [],
    since: packageInfo.version,
    sources,
    status: 'stable',
    tags: ['framework', 'react', 'setup'],
  };
};

const createAngularSetupEntities = (
  repoRoot: string,
  angularPackagePath: string,
  packageInfo: FrameworkPackageInfo,
): CoreEntity[] => {
  const angularRoot = join(repoRoot, angularPackagePath);

  const toSource = (filePath: string): string => relative(repoRoot, join(angularRoot, filePath));

  return [
    {
      custom: {
        framework: 'angular',
        packageName: packageInfo.name,
        packageVersion: packageInfo.version,
        subpathExports: ['.', './components/*', './directives/*', './modules/*'],
      },
      id: 'setup:angular-package',
      kind: 'setup',
      layers: {},
      name: 'Angular Framework Package',
      package: 'angular',
      relations: [],
      since: packageInfo.version,
      sources: [
        toSource('README.md'),
        toSource('CHANGELOG.md'),
        toSource('LIMITATIONS.md'),
        toSource('package.json'),
        toSource('index.ts'),
      ],
      status: 'stable',
      tags: ['angular', 'framework', 'setup'],
    },
    {
      custom: {
        framework: 'angular',
        moduleClass: 'SynergyComponentsModule',
        packageName: packageInfo.name,
      },
      id: 'setup:angular-components-module',
      kind: 'setup',
      layers: {},
      name: 'Angular Components Module',
      package: 'angular',
      relations: [],
      since: packageInfo.version,
      sources: [
        toSource('modules/synergy/synergy.module.ts'),
        toSource('components/index.ts'),
      ],
      status: 'stable',
      tags: ['angular', 'framework', 'module', 'setup'],
    },
    {
      custom: {
        framework: 'angular',
        moduleClass: 'SynergyFormsModule',
        packageName: packageInfo.name,
        valueAccessors: ['SynDefaultValueAccessor', 'SynCheckedValueAccessor', 'SynFileValueAccessor'],
      },
      id: 'setup:angular-forms-module',
      kind: 'setup',
      layers: {},
      name: 'Angular Forms Module',
      package: 'angular',
      relations: [],
      since: packageInfo.version,
      sources: [
        toSource('modules/forms/forms.module.ts'),
      ],
      status: 'stable',
      tags: ['angular', 'forms', 'framework', 'module', 'setup'],
    },
    {
      custom: {
        framework: 'angular',
        moduleClass: 'SynergyValidatorsModule',
        packageName: packageInfo.name,
        validators: ['SynMinValidator', 'SynMaxValidator', 'SynCheckboxRequiredValidator'],
      },
      id: 'setup:angular-validators-module',
      kind: 'setup',
      layers: {},
      name: 'Angular Validators Module',
      package: 'angular',
      relations: [],
      since: packageInfo.version,
      sources: [
        toSource('directives/validators/validators.ts'),
      ],
      status: 'stable',
      tags: ['angular', 'framework', 'module', 'setup', 'validators'],
    },
  ];
};

const createComponentsSetupEntity = (
  repoRoot: string,
  componentPackagePath: string,
  packageInfo: FrameworkPackageInfo,
): CoreEntity => {
  const componentRoot = join(repoRoot, componentPackagePath);
  const sources = [
    'README.md',
    'CHANGELOG.md',
    'BREAKING_CHANGES.md',
    'LIMITATIONS.md',
    'package.json',
  ].map((filePath) => relative(repoRoot, join(componentRoot, filePath)));

  return {
    custom: {
      packageName: packageInfo.name,
      packageVersion: packageInfo.version,
    },
    id: 'setup:components-package',
    kind: 'setup',
    layers: {},
    name: 'Components Package',
    package: 'components',
    relations: [],
    since: packageInfo.version,
    sources,
    status: 'stable',
    tags: ['components', 'setup', 'web-components'],
  };
};

const createMigrationsSetupEntity = (
  repoRoot: string,
  componentPackagePath: string,
): CoreEntity => {
  const componentRoot = join(repoRoot, componentPackagePath);

  // Always include BREAKING_CHANGES.md from components
  const sources = [
    relative(repoRoot, join(componentRoot, 'BREAKING_CHANGES.md')),
  ];

  // Include version migration path guides from docs package (source of truth)
  const docsMigrationRoot = join(repoRoot, 'packages', 'docs', 'src', 'static', 'migration');
  const migrationGuides = [
    'index.md',
    'v2-2018-to-v2-2025.md',
    'v2-2018-to-v3-2018.md',
    'v2-2018-to-v3-2025.md',
    'v2-2025-to-v3-2025.md',
  ];
  for (const guide of migrationGuides) {
    sources.push(relative(repoRoot, join(docsMigrationRoot, guide)));
  }

  // Include DaVinci migration guide from metadata external-data
  const davinciMigrationPath = join(repoRoot, 'packages', 'metadata', 'external-data', 'davinci-migrations', 'components.md');
  sources.push(relative(repoRoot, davinciMigrationPath));

  return {
    custom: {
      migrationType: 'breaking',
      versions: ['3.0', '2.0', '1.0'],
    },
    id: 'setup:synergy-migrations',
    kind: 'setup',
    layers: {},
    name: 'Synergy Breaking Changes & Migrations',
    package: 'migrations',
    relations: [],
    since: '1.0.0',
    sources,
    status: 'stable',
    tags: ['breaking-changes', 'migrations', 'setup'],
  };
};

/**
 * Enrich component entities with framework wrapper metadata.
 */
export const enrich = async (
  records: CoreEntity[],
  config: ComponentsConfig,
  ctx: Context,
): Promise<Result<CoreEntity[], EnrichError>> => {
  const {
    angularPackagePath, packagePath, reactPackagePath, vuePackagePath,
  } = config;

  const repoRoot = resolve(ctx.workspaceRoot, '..', '..');

  try {
    let enrichedRecords = records;
    const setupEntities: CoreEntity[] = [];

    // Create components package setup entity
    if (packagePath) {
      const componentRoot = join(repoRoot, packagePath);
      const packageJsonPath = join(componentRoot, 'package.json');
      try {
        const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as FrameworkPackageJson;
        const packageInfo = toFrameworkPackageInfo(packageJson, '@synergy-design-system/components');
        setupEntities.push(createComponentsSetupEntity(repoRoot, packagePath, packageInfo));
        setupEntities.push(createMigrationsSetupEntity(repoRoot, packagePath));
      } catch {
        // If we can't read package.json, skip setup entities
      }
    }

    if (vuePackagePath) {
      const { packageInfo, wrappers } = await buildVueWrapperMap(repoRoot, vuePackagePath);
      enrichedRecords = enrichedRecords.map((record) => {
        const canonicalTag = getCanonicalComponentTag(record);
        if (!canonicalTag) {
          return record;
        }

        const wrapper = wrappers.get(canonicalTag);
        if (!wrapper) {
          return record;
        }

        const existingFrameworks = typeof record.custom?.frameworks === 'object' && record.custom?.frameworks !== null
          ? record.custom.frameworks as Record<string, unknown>
          : {};

        return {
          ...record,
          custom: {
            ...record.custom,
            frameworks: {
              ...existingFrameworks,
              vue: {
                componentName: wrapper.componentName,
                exportPath: wrapper.exportPath,
                packageName: wrapper.packageName,
                sourcePath: wrapper.sourcePath,
              },
            },
          },
          sources: appendSources(record, [wrapper.sourcePath]),
          tags: appendTags(record, ['vue']),
        };
      });

      setupEntities.push(createVueSetupEntity(repoRoot, vuePackagePath, packageInfo));
    }

    if (reactPackagePath) {
      const [{ packageInfo, wrappers }, jsxMap] = await Promise.all([
        buildReactWrapperMap(repoRoot, reactPackagePath),
        buildReactJsxMap(repoRoot, reactPackagePath),
      ]);

      enrichedRecords = enrichedRecords.map((record) => {
        if (record.kind !== 'component') {
          return record;
        }

        const canonicalTag = getCanonicalComponentTag(record);
        const wrapper = canonicalTag ? wrappers.get(canonicalTag) : undefined;
        const jsx = canonicalTag ? jsxMap.get(canonicalTag) : undefined;
        if (!wrapper && !jsx) {
          return record;
        }

        const existingFrameworks = typeof record.custom?.frameworks === 'object' && record.custom?.frameworks !== null
          ? record.custom.frameworks as Record<string, unknown>
          : {};

        return {
          ...record,
          custom: {
            ...record.custom,
            frameworks: {
              ...existingFrameworks,
              react: {
                ...(wrapper ? {
                  wrapper: {
                    componentName: wrapper.componentName,
                    exportPath: wrapper.exportPath,
                    packageName: wrapper.packageName,
                    sourcePath: wrapper.sourcePath,
                  },
                } : {}),
                ...(jsx ? {
                  jsx: {
                    componentName: jsx.componentName,
                    documentation: jsx.documentation,
                    events: jsx.events,
                    packageName: jsx.packageName,
                    since: jsx.since,
                    sourcePath: jsx.sourcePath,
                    status: jsx.status,
                    subpathExport: jsx.subpathExport,
                    typeName: jsx.typeName,
                    typeText: jsx.typeText,
                  },
                } : {}),
              },
            },
          },
          sources: appendSources(record, wrapper ? [wrapper.sourcePath] : []),
          tags: appendTags(record, ['react']),
        };
      });

      setupEntities.push(createReactSetupEntity(repoRoot, reactPackagePath, packageInfo));
    }

    if (angularPackagePath) {
      const { packageInfo, wrappers } = await buildAngularWrapperMap(repoRoot, angularPackagePath);

      enrichedRecords = enrichedRecords.map((record) => {
        const canonicalTag = getCanonicalComponentTag(record);
        if (!canonicalTag) {
          return record;
        }

        const wrapper = wrappers.get(canonicalTag);
        if (!wrapper) {
          return record;
        }

        const existingFrameworks = typeof record.custom?.frameworks === 'object' && record.custom?.frameworks !== null
          ? record.custom.frameworks as Record<string, unknown>
          : {};

        return {
          ...record,
          custom: {
            ...record.custom,
            frameworks: {
              ...existingFrameworks,
              angular: {
                componentName: wrapper.componentName,
                exportPath: wrapper.exportPath,
                packageName: wrapper.packageName,
                selector: wrapper.selector,
                sourcePath: wrapper.sourcePath,
              },
            },
          },
          sources: appendSources(record, [wrapper.sourcePath]),
          tags: appendTags(record, ['angular']),
        };
      });

      setupEntities.push(...createAngularSetupEntities(repoRoot, angularPackagePath, packageInfo));
    }

    return ok([...enrichedRecords, ...setupEntities]);
  } catch (error) {
    return {
      error: createEnrichError(
        'Failed to enrich components with framework metadata',
        'components',
        {
          angularPackagePath,
          cause: error instanceof Error ? error.message : String(error),
          reactPackagePath,
          vuePackagePath,
        },
      ),
      ok: false,
    };
  }
};
