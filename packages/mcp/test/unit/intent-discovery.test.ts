import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildIntentRecovery,
  discoverIntents,
  getIntentCategoryPrefix,
} from '../../src/utilities/intent-discovery.ts';

const phases = ['experimental'] as const;

describe('intent discovery', () => {
  it('lists categories in deterministic order', async () => {
    const result = await discoverIntents(undefined, [...phases]);
    assert.equal(result.level, 'categories');
    if (result.level !== 'categories') return;
    const ids = result.categories.map((category) => category.id);
    assert.deepEqual(ids, ids.toSorted((left, right) => left.localeCompare(right)));
    assert.ok(ids.includes('action'));
  });

  it('lists exact intents for a category', async () => {
    const result = await discoverIntents('action', [...phases]);
    assert.equal(result.level, 'intents');
    if (result.level !== 'intents') return;
    assert.equal(result.category.id, 'action');
    assert.ok(result.intents.some((intent) => intent.id === 'action.submit'));
    assert.ok(result.intents.every((intent) => intent.category === 'action'));
  });

  it('rejects unknown categories with authoritative categories', async () => {
    await assert.rejects(
      discoverIntents('form', [...phases]),
      /Unknown intent category "form".*action/,
    );
  });

  it('extracts only the category namespace', () => {
    assert.equal(getIntentCategoryPrefix('action.doesnotexist'), 'action');
    assert.equal(getIntentCategoryPrefix('FORM.submit'), 'form');
  });

  it('returns category intents for a known namespace without guessing', async () => {
    const recovery = await buildIntentRecovery(
      'action.doesnotexist',
      'Unknown intent.',
      [...phases],
    );
    assert.equal(recovery.submittedIntentId, 'action.doesnotexist');
    assert.equal(recovery.validationPerformed, false);
    assert.deepEqual(recovery.recovery.arguments, { category: 'action' });
    assert.ok(recovery.availableIntentIds?.includes('action.submit'));
    assert.ok(recovery.availableIntentIds?.every((intent) => intent.startsWith('action.')));
  });

  it('returns top-level categories for an unknown namespace', async () => {
    const recovery = await buildIntentRecovery('form.submit', 'Unknown intent.', [...phases]);
    assert.equal(recovery.submittedIntentId, 'form.submit');
    assert.deepEqual(recovery.recovery.arguments, {});
    assert.ok(recovery.availableCategoryIds?.includes('action'));
    assert.equal(recovery.availableIntentIds, undefined);
  });
});
