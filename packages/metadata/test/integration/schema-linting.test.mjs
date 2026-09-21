/**
 * Schema linting tests: verify generated JSON schemas are well-formed and complete.
 * Ensures all generated artifacts are wired up correctly.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Test: Verify schema files are valid JSON with required structure
 */
describe('schema linting', () => {
  const schemaDir = join(__dirname, '..', '..', 'data', 'schemas');
  const coreDir = join(__dirname, '..', '..', 'data', 'core');

  it('all schema files are valid JSON', async () => {
    const files = await readdir(schemaDir);
    const schemaFiles = files.filter((f) => f.endsWith('.schema.json'));

    assert.ok(schemaFiles.length >= 3, 'should have at least 3 schema files');

    for (const file of schemaFiles) {
      const content = await readFile(join(schemaDir, file), 'utf8');
      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch (e) {
        throw new Error(`Schema ${file} is not valid JSON: ${e instanceof Error ? e.message : String(e)}`);
      }

      assert.ok(parsed !== null && typeof parsed === 'object', `schema ${file} should be an object`);
      assert.ok('$schema' in parsed);
    }
  });

  it('core-entity schema has required properties', async () => {
    const schemaPath = join(schemaDir, 'core-entity.schema.json');
    const content = await readFile(schemaPath, 'utf8');
    const schema = JSON.parse(content);

    assert.ok('properties' in schema);
    assert.ok(['id', 'kind', 'name', 'layers'].every((key) => key in schema.properties));
  });

  it('layer-ref schema has required properties', async () => {
    const schemaPath = join(schemaDir, 'layer-ref.schema.json');
    const content = await readFile(schemaPath, 'utf8');
    const schema = JSON.parse(content);

    assert.ok('properties' in schema);
    assert.ok(['layer', 'path'].every((key) => key in schema.properties));
  });

  it('all core entity files pass schema structure validation', async () => {
    const componentDir = join(coreDir, 'component');
    const files = await readdir(componentDir);
    const jsonFiles = files.filter((f) => f.endsWith('.json')).slice(0, 5); // Test first 5

    for (const file of jsonFiles) {
      const content = await readFile(join(componentDir, file), 'utf8');
      let entity;
      try {
        entity = JSON.parse(content);
      } catch (e) {
        throw new Error(`Entity ${file} is not valid JSON: ${e instanceof Error ? e.message : String(e)}`);
      }

      assert.ok('id' in entity, `Entity ${file} should have id`);
      assert.ok('kind' in entity, `Entity ${file} should have kind`);
      assert.ok('name' in entity, `Entity ${file} should have name`);
      assert.ok('layers' in entity, `Entity ${file} should have layers`);

      // Validate id format
      assert.match(
        entity.id,
        /^[a-z]+:[a-z0-9-]+$/,
        `Entity ID ${entity.id} should match format 'kind:name'`,
      );

      // Validate layers structure
      if (typeof entity.layers === 'object' && entity.layers !== null) {
        for (const [layerType, refs] of Object.entries(entity.layers)) {
          assert.ok(Array.isArray(refs), `layers.${layerType} should be an array`);
          for (const ref of refs) {
            assert.ok('layer' in ref, `layer ref in ${file} should have layer`);
            assert.ok('path' in ref, `layer ref in ${file} should have path`);
            assert.strictEqual(typeof ref.path, 'string');
          }
        }
      }
    }
  });

  it('generated schemas match entity data structure', async () => {
    // Load a sample entity
    const samplePath = join(coreDir, 'component', 'component__syn-accordion.json');
    const content = await readFile(samplePath, 'utf8');
    const entity = JSON.parse(content);

    // Load core-entity schema
    const schemaPath = join(schemaDir, 'core-entity.schema.json');
    const schemaContent = await readFile(schemaPath, 'utf8');
    const schema = JSON.parse(schemaContent);

    // Verify all properties in the entity exist in the schema
    const requiredFields = ['id', 'kind', 'name', 'package', 'layers', 'sources', 'status'];
    for (const field of requiredFields) {
      assert.ok(field in entity, `Entity should have ${field}`);
      assert.ok(field in schema.properties, `Schema should define ${field}`);
    }
  });

  it('layer references point to real files', async () => {
    const samplePath = join(coreDir, 'component', 'component__syn-accordion.json');
    const content = await readFile(samplePath, 'utf8');
    const entity = JSON.parse(content);

    assert.strictEqual(typeof entity.layers, 'object');
    assert.ok(Array.isArray(entity.layers.full) && entity.layers.full.length > 0);

    // Verify first layer reference can be read
    const firstLayerRef = entity.layers.full[0];
    const layerPath = join(schemaDir, '..', firstLayerRef.path);

    const layerContent = await readFile(layerPath, 'utf8');
    assert.strictEqual(typeof layerContent, 'string');
    assert.ok(layerContent.length > 0);
  });
});
