import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readSkillBody } from '../../dist/public/skills/shared.js';

describe('skill body loader', () => {
  it('loads all published Markdown skill bodies', async () => {
    for (const skill of ['component', 'templates', 'intents']) {
      const content = await readSkillBody(skill);
      assert.ok(content.length > 0);
      assert.match(content, /^#/);
    }
  });
});
