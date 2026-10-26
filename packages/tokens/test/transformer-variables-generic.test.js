import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import variablesData from '../src/figma-variables/variableTokens.json' with { type: 'json' };
import { transformFigmaVariables } from '../scripts/figma/transformer-variables-generic.js';

test('transforms legacy and composed colors with mode-specific aliases', () => {
  const data = /** @type {import('@figma/rest-api-spec').GetLocalVariablesResponse['meta']} */ (
    /** @type {unknown} */ (structuredClone(variablesData))
  );
  const overlay = data.variables['VariableID:36102:6165'];
  const opacity = data.variables['VariableID:17105:134540'];
  const palette = structuredClone(overlay);
  palette.id = 'test-palette';
  palette.name = '_test-palette';
  const opacityAlias = structuredClone(opacity);
  opacityAlias.id = 'test-opacity';
  opacityAlias.name = '_test-opacity';
  const collection = data.variableCollections[overlay.variableCollectionId];
  const [light, dark] = collection.modes;
  collection.modes = [light, dark];
  data.variables = {
    [overlay.id]: overlay,
    [opacity.id]: opacity,
    [palette.id]: palette,
    [opacityAlias.id]: opacityAlias,
  };
  const color = {
    a: 1,
    b: 0.6,
    g: 0.4,
    r: 0.2,
  };
  const outputDir = mkdtempSync(path.join(tmpdir(), 'synergy-colors-'));

  /** @param {unknown} value */
  const transform = (value) => {
    collection.modes.forEach((mode) => {
      overlay.valuesByMode[mode.modeId] = /** @type {any} */ (value);
      palette.valuesByMode[mode.modeId] = /** @type {any} */ (color);
      opacityAlias.valuesByMode[mode.modeId] = /** @type {any} */ ({
        id: opacity.id, type: 'VARIABLE_ALIAS',
      });
    });
    opacity.valuesByMode[light.modeId] = 50;
    opacity.valuesByMode[dark.modeId] = 0;
    transformFigmaVariables({
      collectionName: collection.name,
      outputDir,
      variablesData: /** @type {import('@figma/rest-api-spec').GetLocalVariablesResponse['meta']} */ (
        /** @type {unknown} */ (data)
      ),
    });
    return collection.modes.map(mode => JSON.parse(readFileSync(
      path.join(outputDir, `${mode.name.toLowerCase().replace(/\s+/g, '-')}.json`),
      'utf8',
    )).overlay.background.color.value);
  };

  try {
    assert.deepEqual(transform(color), ['#336699', '#336699']);
    assert.deepEqual(transform({ ...color, a: 0.25 }), [
      'rgba(51, 102, 153, 0.25)', 'rgba(51, 102, 153, 0.25)',
    ]);
    const composed = {
      color,
      opacity: { id: opacityAlias.id, type: 'VARIABLE_ALIAS' },
    };
    assert.deepEqual(transform(composed), [
      'rgba(51, 102, 153, 0.50)', 'rgba(51, 102, 153, 0.00)',
    ]);
    assert.deepEqual(transform({
      color: { id: palette.id, type: 'VARIABLE_ALIAS' },
      opacity: 0.25,
    }), ['rgba(51, 102, 153, 0.25)', 'rgba(51, 102, 153, 0.25)']);
    palette.valuesByMode[light.modeId] = /** @type {any} */ (composed);
    palette.valuesByMode[dark.modeId] = /** @type {any} */ (composed);
    overlay.valuesByMode[light.modeId] = /** @type {any} */ ({
      id: palette.id, type: 'VARIABLE_ALIAS',
    });
    overlay.valuesByMode[dark.modeId] = overlay.valuesByMode[light.modeId];
    transformFigmaVariables({
      collectionName: collection.name,
      outputDir,
      variablesData: /** @type {any} */ (data),
    });
    const output = JSON.parse(readFileSync(
      path.join(outputDir, `${light.name.toLowerCase().replace(/\s+/g, '-')}.json`),
      'utf8',
    ));
    assert.equal(output.overlay.background.color.value, 'rgba(51, 102, 153, 0.50)');
  } finally {
    rmSync(outputDir, { force: true, recursive: true });
  }
});
