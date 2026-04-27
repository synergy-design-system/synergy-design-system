import { access, readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

/**
 * @typedef {{ context: string; detail: string }} ValidationIssue
 */

/**
 * @typedef {{
 *   compile: (schema: unknown) => {
 *     (data: unknown): boolean;
 *     errors?: unknown;
 *   };
 * }} AjvLike
 */

const getOutputDir = () => process.env.SYNERGY_METADATA_OUTPUT_DIR?.trim() || 'data';

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
const isObjectRecord = (value) => (
  typeof value === 'object' && value !== null && !Array.isArray(value)
);

/**
 * @param {string} filePath
 * @returns {Promise<unknown>}
 */
const readJson = async (filePath) => {
  const content = await readFile(filePath, 'utf8');
  return JSON.parse(content);
};

/**
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
const collectJsonFilesRecursively = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  /** @type {string[]} */
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectJsonFilesRecursively(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
};

/**
 * @param {unknown} errors
 * @returns {string}
 */
const formatAjvErrors = (errors) => {
  if (!Array.isArray(errors) || errors.length === 0) {
    return 'unknown validation error';
  }

  return errors
    .map((error) => {
      if (!isObjectRecord(error)) {
        return 'unknown validation error';
      }

      const instancePath = typeof error.instancePath === 'string' ? error.instancePath : '';
      const message = typeof error.message === 'string' ? error.message : 'invalid value';
      return `${instancePath || '/'}: ${message}`;
    })
    .join('; ');
};

async function main() {
  const outputDir = resolve(process.cwd(), getOutputDir());
  const schemaDir = join(outputDir, 'schemas');
  const coreDir = join(outputDir, 'core');
  const manifestPath = join(outputDir, 'manifest.json');

  /** @type {ValidationIssue[]} */
  const issues = [];

  try {
    await access(schemaDir);
    await access(coreDir);
    await access(manifestPath);
  } catch {
    console.error('[schema-lint] Missing required metadata output files/folders. Run the metadata build first.');
    process.exit(1);
  }

  const coreEntitySchemaPath = join(schemaDir, 'core-entity.schema.json');
  const layerRefSchemaPath = join(schemaDir, 'layer-ref.schema.json');
  const manifestSchemaPath = join(schemaDir, 'manifest.schema.json');

  const [coreEntitySchema, layerRefSchema, manifestSchema] = await Promise.all([
    readJson(coreEntitySchemaPath),
    readJson(layerRefSchemaPath),
    readJson(manifestSchemaPath),
  ]);

  const ajvModule = await import('ajv/dist/2020.js');
  const ajvFormatsModule = await import('ajv-formats');

  /** @type {new (options?: { allErrors?: boolean; strict?: boolean; validateFormats?: boolean }) => AjvLike} */
  const Ajv2020 = /** @type {any} */ (ajvModule.default ?? ajvModule);

  const ajv = new Ajv2020({
    allErrors: true,
    strict: false,
    validateFormats: true,
  });

  /** @type {(ajv: unknown) => void} */
  const addFormats = /** @type {any} */ (ajvFormatsModule.default ?? ajvFormatsModule);
  addFormats(ajv);

  const validateCoreEntity = ajv.compile(coreEntitySchema);
  const validateLayerRef = ajv.compile(layerRefSchema);
  const validateManifest = ajv.compile(manifestSchema);

  const coreFiles = await collectJsonFilesRecursively(coreDir);

  for (const filePath of coreFiles) {
    const content = await readJson(filePath);
    const isCoreValid = validateCoreEntity(content);

    if (!isCoreValid) {
      issues.push({
        context: `core entity ${relative(outputDir, filePath)}`,
        detail: formatAjvErrors(validateCoreEntity.errors),
      });
      continue;
    }

    if (!isObjectRecord(content)) {
      continue;
    }

    const { layers } = content;
    if (!isObjectRecord(layers)) {
      continue;
    }

    for (const [layerName, refs] of Object.entries(layers)) {
      if (!Array.isArray(refs)) {
        issues.push({
          context: `core entity ${relative(outputDir, filePath)} layer ${layerName}`,
          detail: 'expected an array of layer refs',
        });
        continue;
      }

      for (const ref of refs) {
        const isLayerRefValid = validateLayerRef(ref);
        if (!isLayerRefValid) {
          issues.push({
            context: `core entity ${relative(outputDir, filePath)} layer ${layerName}`,
            detail: formatAjvErrors(validateLayerRef.errors),
          });
          continue;
        }

        if (!isObjectRecord(ref) || typeof ref.path !== 'string') {
          continue;
        }

        const layerFilePath = join(outputDir, ref.path);
        try {
          await access(layerFilePath);
        } catch {
          issues.push({
            context: `core entity ${relative(outputDir, filePath)} layer ${layerName}`,
            detail: `layer file missing: ${ref.path}`,
          });
        }
      }
    }
  }

  const manifest = await readJson(manifestPath);
  const isManifestValid = validateManifest(manifest);
  if (!isManifestValid) {
    issues.push({
      context: 'manifest.json',
      detail: formatAjvErrors(validateManifest.errors),
    });
  }

  if (issues.length > 0) {
    console.error(`[schema-lint] Found ${issues.length} validation issue(s):`);
    for (const issue of issues) {
      console.error(`- ${issue.context}: ${issue.detail}`);
    }
    process.exit(1);
  }

  console.log(`[schema-lint] OK: validated ${coreFiles.length} core entities, layer refs, and manifest against generated schemas`);
}

void main();
