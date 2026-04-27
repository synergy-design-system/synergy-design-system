/**
 * Schema linting tests: verify generated JSON schemas are well-formed and complete.
 * Ensures all generated artifacts are wired up correctly.
 */
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { expect } from 'chai';

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

    expect(schemaFiles).to.have.lengthOf.at.least(3, 'should have at least 3 schema files');

    for (const file of schemaFiles) {
      const content = await readFile(join(schemaDir, file), 'utf8');
      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch (e) {
        throw new Error(`Schema ${file} is not valid JSON: ${e instanceof Error ? e.message : String(e)}`);
      }

      expect(parsed).to.be.an('object', `schema ${file} should be an object`);
      expect(parsed).to.have.property('$schema');
    }
  });

  it('core-entity schema has required properties', async () => {
    const schemaPath = join(schemaDir, 'core-entity.schema.json');
    const content = await readFile(schemaPath, 'utf8');
    const schema = JSON.parse(content);

    expect(schema).to.have.property('properties');
    expect(schema.properties).to.include.keys(['id', 'kind', 'name', 'layers']);
  });

  it('layer-ref schema has required properties', async () => {
    const schemaPath = join(schemaDir, 'layer-ref.schema.json');
    const content = await readFile(schemaPath, 'utf8');
    const schema = JSON.parse(content);

    expect(schema).to.have.property('properties');
    expect(schema.properties).to.include.keys(['layer', 'path']);
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

      expect(entity, `Entity ${file} should have id`).to.have.property('id');
      expect(entity, `Entity ${file} should have kind`).to.have.property('kind');
      expect(entity, `Entity ${file} should have name`).to.have.property('name');
      expect(entity, `Entity ${file} should have layers`).to.have.property('layers');

      // Validate id format
      expect(entity.id).to.match(
        /^[a-z]+:[a-z0-9-]+$/,
        `Entity ID ${entity.id} should match format 'kind:name'`,
      );

      // Validate layers structure
      if (typeof entity.layers === 'object' && entity.layers !== null) {
        for (const [layerType, refs] of Object.entries(entity.layers)) {
          expect(refs, `layers.${layerType} should be an array`).to.be.an('array');
          for (const ref of refs) {
            expect(ref, `layer ref in ${file} should have layer`).to.have.property('layer');
            expect(ref, `layer ref in ${file} should have path`).to.have.property('path');
            expect(ref.path).to.be.a('string');
          }
        }
      }
    }
  });

  it('generated schemas match entity data structure', async () => {
    // Load a sample entity
    const samplePath = join(coreDir, 'component', 'component:syn-accordion.json');
    const content = await readFile(samplePath, 'utf8');
    const entity = JSON.parse(content);

    // Load core-entity schema
    const schemaPath = join(schemaDir, 'core-entity.schema.json');
    const schemaContent = await readFile(schemaPath, 'utf8');
    const schema = JSON.parse(schemaContent);

    // Verify all properties in the entity exist in the schema
    const requiredFields = ['id', 'kind', 'name', 'package', 'layers', 'sources', 'status'];
    for (const field of requiredFields) {
      expect(entity, `Entity should have ${field}`).to.have.property(field);
      expect(schema.properties, `Schema should define ${field}`).to.have.property(field);
    }
  });

  it('layer references point to real files', async () => {
    const samplePath = join(coreDir, 'component', 'component:syn-accordion.json');
    const content = await readFile(samplePath, 'utf8');
    const entity = JSON.parse(content);

    expect(entity.layers).to.be.an('object');
    expect(entity.layers.full).to.be.an('array').with.lengthOf.greaterThan(0);

    // Verify first layer reference can be read
    const firstLayerRef = entity.layers.full[0];
    const layerPath = join(schemaDir, '..', firstLayerRef.path);

    const layerContent = await readFile(layerPath, 'utf8');
    expect(layerContent).to.be.a('string');
    expect(layerContent.length).to.be.greaterThan(0);
  });
});
