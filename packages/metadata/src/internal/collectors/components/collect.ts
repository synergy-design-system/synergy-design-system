/**
 * Placeholder collector for components.
 *
 * First pass:
 * - Read component manifest from packages/components/dist/custom-elements.json
 * - Resolve source files from packages/components/src/components/<tagNameWithoutPrefix>
 * - Keep scraped docs out of scope for now
 */
import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import type { CustomElementDeclaration, Module } from 'custom-elements-manifest/schema.d.ts';
import { type Result, ok } from '../../core/result.js';
import { type CollectError, createCollectError } from '../../core/errors.js';
import { type Context } from '../../core/context.js';
import { type ComponentsConfig } from './types.js';

/**
 * Raw component data from source files.
 */
export interface ComponentRaw {
  entries: ComponentRawEntry[];
}

export interface ComponentRawEntry {
  componentName: string;
  dependencies: string[];
  interfaceSnapshot: ComponentInterfaceSnapshot;
  since: string;
  sourceModulePath: string;
  sourceFiles: string[];
  status: 'stable' | 'beta' | 'experimental' | 'deprecated';
  summary: string;
}

export interface ComponentInterfaceSnapshot {
  attributes: ComponentInterfaceAttribute[];
  cssParts: NamedDescription[];
  dependencies: string[];
  documentation?: string;
  events: ComponentInterfaceEvent[];
  methods: ComponentInterfaceMethod[];
  properties: ComponentInterfaceProperty[];
  since: string;
  slots: NamedDescription[];
  sourceModulePath: string;
  status: 'stable' | 'beta' | 'experimental' | 'deprecated';
  summary: string;
  tagName: string;
}

export interface NamedDescription {
  description: string;
  name: string;
}

export interface ComponentInterfaceAttribute {
  default?: string;
  description: string;
  fieldName?: string;
  name: string;
  reflects: boolean;
  type?: string;
}

export interface ComponentInterfaceProperty {
  access: 'public' | 'readonly';
  default?: string;
  description: string;
  name: string;
  type?: string;
}

export interface ComponentInterfaceMethod {
  description: string;
  name: string;
  parameters: Array<{ name: string; type?: string }>;
  returnType?: string;
}

export interface ComponentInterfaceEvent {
  description: string;
  name: string;
  type?: string;
}

type ComponentsManifest = {
  modules?: Module[];
};

type SynCustomElementDeclaration = CustomElementDeclaration & {
  tagName: string;
};

const isObjectRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const getStringField = (value: unknown, key: string): string | undefined => {
  if (!isObjectRecord(value)) {
    return undefined;
  }

  const field = value[key];
  return typeof field === 'string' ? field : undefined;
};

const getBooleanField = (value: unknown, key: string): boolean | undefined => {
  if (!isObjectRecord(value)) {
    return undefined;
  }

  const field = value[key];
  return typeof field === 'boolean' ? field : undefined;
};

const getTypeText = (value: unknown): string | undefined => {
  if (!isObjectRecord(value)) {
    return undefined;
  }

  const type = value.type;
  if (!isObjectRecord(type)) {
    return undefined;
  }

  const text = type.text;
  return typeof text === 'string' ? text : undefined;
};

const toNamedDescription = (entry: unknown): NamedDescription | undefined => {
  if (!isObjectRecord(entry)) {
    return undefined;
  }

  const name = getStringField(entry, 'name');
  if (name === undefined) {
    return undefined;
  }

  return {
    description: getStringField(entry, 'description') ?? '',
    name,
  };
};

const buildInterfaceSnapshot = (
  declaration: SynCustomElementDeclaration,
  sourceModulePath: string,
): ComponentInterfaceSnapshot => {
  const members = Array.isArray(declaration.members) ? declaration.members : [];

  const memberByName = new Map<string, unknown>();
  for (const member of members) {
    const name = getStringField(member, 'name');
    if (name) {
      memberByName.set(name, member);
    }
  }

  const attributes: ComponentInterfaceAttribute[] = (Array.isArray(declaration.attributes)
    ? declaration.attributes
    : [])
    .map((attribute): ComponentInterfaceAttribute | undefined => {
      if (!isObjectRecord(attribute)) {
        return undefined;
      }

      const name = getStringField(attribute, 'name');
      if (!name) {
        return undefined;
      }

      const fieldName = getStringField(attribute, 'fieldName');
      const member = fieldName ? memberByName.get(fieldName) : undefined;

      return {
        default: getStringField(attribute, 'default'),
        description: getStringField(attribute, 'description') ?? '',
        fieldName,
        name,
        reflects: getBooleanField(member, 'reflects') ?? false,
        type: getTypeText(attribute),
      };
    })
    .filter((item): item is ComponentInterfaceAttribute => item !== undefined);

  const properties: ComponentInterfaceProperty[] = members
    .map((member): ComponentInterfaceProperty | undefined => {
      if (!isObjectRecord(member) || getStringField(member, 'kind') !== 'field') {
        return undefined;
      }

      if (getStringField(member, 'privacy') === 'private') {
        return undefined;
      }

      if (getBooleanField(member, 'static') === true) {
        return undefined;
      }

      const name = getStringField(member, 'name');
      if (!name) {
        return undefined;
      }

      return {
        access: getBooleanField(member, 'readonly') ? 'readonly' : 'public',
        default: getStringField(member, 'default'),
        description: getStringField(member, 'description') ?? '',
        name,
        type: getTypeText(member),
      };
    })
    .filter((item): item is ComponentInterfaceProperty => item !== undefined);

  const methods: ComponentInterfaceMethod[] = members
    .map((member): ComponentInterfaceMethod | undefined => {
      if (!isObjectRecord(member) || getStringField(member, 'kind') !== 'method') {
        return undefined;
      }

      if (getStringField(member, 'privacy') === 'private') {
        return undefined;
      }

      const name = getStringField(member, 'name');
      if (!name) {
        return undefined;
      }

      const parameters = Array.isArray(member.parameters)
        ? member.parameters
          .map((parameter): { name: string; type?: string } | undefined => {
            if (!isObjectRecord(parameter)) {
              return undefined;
            }

            const parameterName = getStringField(parameter, 'name');
            if (!parameterName) {
              return undefined;
            }

            return {
              name: parameterName,
              type: getTypeText(parameter),
            };
          })
          .filter((item): item is { name: string; type?: string } => item !== undefined)
        : [];

      return {
        description: getStringField(member, 'description') ?? '',
        name,
        parameters,
        returnType: getTypeText(member),
      };
    })
    .filter((item): item is ComponentInterfaceMethod => item !== undefined);

  const events: ComponentInterfaceEvent[] = (Array.isArray(declaration.events) ? declaration.events : [])
    .map((event): ComponentInterfaceEvent | undefined => {
      if (!isObjectRecord(event)) {
        return undefined;
      }

      const name = getStringField(event, 'name');
      if (!name) {
        return undefined;
      }

      return {
        description: getStringField(event, 'description') ?? '',
        name,
        type: getStringField(event, 'eventName'),
      };
    })
    .filter((item): item is ComponentInterfaceEvent => item !== undefined);

  const slots = (Array.isArray(declaration.slots) ? declaration.slots : [])
    .map(toNamedDescription)
    .filter((item): item is NamedDescription => item !== undefined);

  const cssParts = (Array.isArray(declaration.cssParts) ? declaration.cssParts : [])
    .map(toNamedDescription)
    .filter((item): item is NamedDescription => item !== undefined);

  const summary = getStringField(declaration, 'summary') ?? '';
  const status = toStatus(getStringField(declaration, 'status'));
  const since = getStringField(declaration, 'since') ?? 'unknown';
  const dependencies = getStringArrayField(declaration, 'dependencies');

  return {
    attributes,
    cssParts,
    dependencies,
    documentation: getStringField(declaration, 'documentation'),
    events,
    methods,
    properties,
    since,
    slots,
    sourceModulePath,
    status,
    summary,
    tagName: declaration.tagName,
  };
};

const getStringArrayField = (value: unknown, key: string): string[] => {
  if (!isObjectRecord(value)) {
    return [];
  }

  const field = value[key];
  if (!Array.isArray(field)) {
    return [];
  }

  return field.filter((item): item is string => typeof item === 'string');
};

const isSynCustomElementDeclaration = (
  declaration: unknown,
): declaration is SynCustomElementDeclaration => {
  if (!isObjectRecord(declaration)) {
    return false;
  }

  return declaration.kind === 'class' && typeof declaration.tagName === 'string';
};

const toStatus = (
  value: string | undefined,
): 'stable' | 'beta' | 'experimental' | 'deprecated' => {
  if (value === 'beta' || value === 'experimental' || value === 'deprecated') {
    return value;
  }

  return 'stable';
};

/**
 * Collector function: gather component metadata from source.
 * (Currently a stub that returns empty)
 */
export const collect = async (
  config: ComponentsConfig,
  ctx: Context,
): Promise<Result<ComponentRaw, CollectError>> => {
  ctx.logger?.info('ComponentsCollector: collecting from components manifest');

  const repoRoot = resolve(ctx.workspaceRoot, '..', '..');
  const componentsRoot = join(repoRoot, config.packagePath);
  const manifestPath = join(componentsRoot, 'dist', 'custom-elements.json');
  const componentsSourceRoot = join(componentsRoot, 'src', 'components');

  try {
    await access(manifestPath);
  } catch {
    return {
      error: createCollectError(
        'Components manifest missing. Build components package first (pnpm --filter @synergy-design-system/components build).',
        'components',
        {
          manifestPath,
        },
      ),
      ok: false,
    };
  }

  try {
    const manifestRaw = await readFile(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestRaw) as ComponentsManifest;

    const componentDeclarations = (manifest.modules ?? [])
      .flatMap((module) => {
        const modulePath = module.path ?? '';

        return (module.declarations ?? [])
          .filter(
            (declaration): declaration is SynCustomElementDeclaration => isSynCustomElementDeclaration(declaration),
          )
          .map((declaration) => ({
            declaration,
            modulePath,
          }));
      })
      .sort((a, b) => a.declaration.tagName.localeCompare(b.declaration.tagName));

    const entries = await Promise.all(componentDeclarations.map(async (item): Promise<ComponentRawEntry> => {
      const componentName = item.declaration.tagName;
      const tagNameWithoutPrefix = getStringField(item.declaration, 'tagNameWithoutPrefix')
        ?? componentName.replace(/^syn-/, '');
      const sourceDir = join(
        componentsSourceRoot,
        tagNameWithoutPrefix,
      );

      const files = await readdir(sourceDir, { withFileTypes: true });

      const sourceFiles = files
        .filter((file) => file.isFile())
        .map((file) => relative(repoRoot, join(sourceDir, file.name)))
        .sort();

      return {
        componentName,
        dependencies: getStringArrayField(item.declaration, 'dependencies'),
        interfaceSnapshot: buildInterfaceSnapshot(item.declaration, item.modulePath),
        since: getStringField(item.declaration, 'since') ?? 'unknown',
        sourceFiles,
        sourceModulePath: item.modulePath,
        status: toStatus(getStringField(item.declaration, 'status')),
        summary: getStringField(item.declaration, 'summary') ?? '',
      };
    }));

    ctx.logger?.info(`ComponentsCollector: collected ${entries.length} components`);
    return ok({ entries });
  } catch (error) {
    return {
      error: createCollectError('Failed to collect components metadata from source manifest', 'components', {
        cause: error instanceof Error ? error.message : String(error),
        manifestPath,
      }),
      ok: false,
    };
  }
};
