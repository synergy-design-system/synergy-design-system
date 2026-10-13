import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildComponentRecovery,
  getAvailableComponentNames,
} from '../../src/utilities/component-discovery.ts';

describe('component discovery', () => {
  it('returns component names in deterministic order', async () => {
    const names = await getAvailableComponentNames();
    assert.ok(names.includes('syn-button'));
    assert.deepEqual(names, names.toSorted((left, right) => left.localeCompare(right)));
  });

  it('returns authoritative recovery without changing the submitted component', async () => {
    const recovery = await buildComponentRecovery('button', 'Unknown component.');
    assert.equal(recovery.submittedComponent, 'button');
    assert.equal(recovery.operationPerformed, false);
    assert.equal(recovery.recovery.tool, 'component-list');
    assert.deepEqual(recovery.recovery.arguments, {});
    assert.equal(recovery.resource, 'synergy://components/list');
    assert.ok(recovery.availableComponentNames.includes('syn-button'));
  });
});
