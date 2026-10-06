import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildStyleRecovery,
  buildTemplateRecovery,
  getAvailableStyleNames,
  getAvailableTemplateNames,
} from '../../src/utilities/content-discovery.ts';

describe('content discovery', () => {
  it('returns deterministic style and template catalogs', async () => {
    const styles = await getAvailableStyleNames();
    const templates = await getAvailableTemplateNames();
    assert.deepEqual(styles, styles.toSorted((left, right) => left.localeCompare(right)));
    assert.deepEqual(templates, templates.toSorted((left, right) => left.localeCompare(right)));
    assert.ok(styles.length > 0);
    assert.ok(templates.length > 0);
  });

  it('preserves submitted values in scoped recovery payloads', async () => {
    const style = await buildStyleRecovery('unknown-style', 'Unknown style.');
    assert.equal(style.submittedValue, 'unknown-style');
    assert.equal(style.recovery.tool, 'styles-list');
    assert.equal(style.resource, 'synergy://styles/list');

    const template = await buildTemplateRecovery('unknown-template', 'Unknown template.');
    assert.equal(template.submittedValue, 'unknown-template');
    assert.equal(template.recovery.tool, 'template-list');
    assert.equal(template.resource, 'synergy://templates/list');
  });
});
