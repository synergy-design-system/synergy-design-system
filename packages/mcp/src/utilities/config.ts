import { readFile } from 'node:fs/promises';
import { z } from 'zod';

/**
 * Zod schema for the synergy-mcp.json configuration file.
 * All fields are optional and fall back to built-in defaults when absent.
 */
export const McpRuntimeConfigSchema = z.object({
  /**
   * Whether to prepend AI guidance rules to tool responses.
   * Set to false to strip the rules preface from all tool outputs.
   * @default true
   */
  includeAiRules: z.boolean().default(true),

  /**
   * Per-tool default overrides.
   * Each key corresponds to a tool and contains the subset of that tool's
   * parameters that have configurable defaults.
   */
  tools: z.object({
    assetInfo: z.object({
      /**
       * Default iconset used when no iconset is provided by the caller.
       * @default 'current'
       */
      iconset: z.enum([
        'legacy', 'v2', 'synergy2018', 'brand2018', 'sick2018',
        'current', 'default', 'brand2025', 'sick2025', 'synergy2025', 'new', 'next', 'v3',
      ]).default('current'),
    }).default({ iconset: 'current' }),

    componentInfo: z.object({
      /**
       * Default framework when no framework is provided by the caller.
       * @default 'vanilla'
       */
      framework: z.enum(['react', 'vue', 'angular', 'vanilla']).default('vanilla'),
      /**
       * Default metadata layer when no layer is provided by the caller.
       * @default 'interface'
       */
      layer: z.enum(['full', 'examples', 'interface']).default('interface'),
    }).default({ framework: 'vanilla', layer: 'interface' }),

    davinciMigrationInfo: z.object({
      /**
       * Default migration package when none is provided by the caller.
       * @default 'components'
       */
      package: z.enum(['components', 'charts']).default('components'),
    }).default({ package: 'components' }),

    davinciMigrationList: z.object({
      /**
       * Default migration package when none is provided by the caller.
       * @default 'components'
       */
      package: z.enum(['components', 'charts']).default('components'),
    }).default({ package: 'components' }),

    migrationInfo: z.object({
      /**
       * Default Synergy package when none is provided by the caller.
       * @default 'components'
       */
      synergyPackage: z.enum(['assets', 'components', 'styles', 'tokens']).default('components'),
    }).default({ synergyPackage: 'components' }),

    migrationList: z.object({
      /**
       * Default Synergy package when none is provided by the caller.
       * @default 'components'
       */
      synergyPackage: z.enum(['assets', 'components', 'styles', 'tokens']).default('components'),
    }).default({ synergyPackage: 'components' }),

    setup: z.object({
      /**
       * Whether to include limitations in setup output by default.
       * @default true
       */
      includeLimitations: z.boolean().default(true),
    }).default({ includeLimitations: true }),

    tokenInfo: z.object({
      /**
       * Default token output type when none is provided by the caller.
       * @default 'css'
       */
      type: z.enum(['javascript', 'css', 'sass']).default('css'),
    }).default({ type: 'css' }),
  }).default({
    assetInfo: { iconset: 'current' },
    componentInfo: { framework: 'vanilla', layer: 'full' },
    davinciMigrationInfo: { package: 'components' },
    davinciMigrationList: { package: 'components' },
    migrationInfo: { synergyPackage: 'components' },
    migrationList: { synergyPackage: 'components' },
    setup: { includeLimitations: true },
    tokenInfo: { type: 'css' },
  }),
});

export type McpRuntimeConfig = z.infer<typeof McpRuntimeConfigSchema>;

/**
 * Built-in defaults — identical to parsing an empty object through the schema.
 */
const DEFAULT_CONFIG: McpRuntimeConfig = McpRuntimeConfigSchema.parse({});

let resolvedConfig: McpRuntimeConfig = DEFAULT_CONFIG;

/**
 * Loads the runtime configuration from a JSON file at the given path, validates
 * it against the schema, and caches the result.  Each configured field is
 * deep-merged with built-in defaults so partial configs are always safe.
 *
 * If no path is given, or if loading / validation fails, the built-in defaults
 * are (re-)applied and a warning is written to stderr.
 *
 * @param configPath Optional absolute or relative path to a synergy-mcp.json file.
 */
export const initializeRuntimeConfig = async (configPath?: string): Promise<void> => {
  if (!configPath) {
    resolvedConfig = DEFAULT_CONFIG;
    return;
  }

  try {
    const raw = await readFile(configPath, 'utf8');
    const parsed: unknown = JSON.parse(raw);
    resolvedConfig = McpRuntimeConfigSchema.parse(parsed);
  } catch (error) {
    process.stderr.write(
      `[synergy-mcp] Warning: Failed to load config from "${configPath}". Using built-in defaults.\n  Reason: ${error instanceof Error ? error.message : String(error)}\n`,
    );
    resolvedConfig = DEFAULT_CONFIG;
  }
};

/**
 * Returns the current runtime configuration.
 * Falls back to built-in defaults if {@link initializeRuntimeConfig} has not
 * been called yet.
 */
export const getRuntimeConfig = (): McpRuntimeConfig => resolvedConfig;
