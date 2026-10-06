import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readSkillBody, renderSkillBody } from '../../dist/public/skills/shared.js';

const templateContext = {
  CONTENT_LAYER: 'examples',
  DATA_BUILT_AT: '2026-01-01T00:00:00.000Z',
  DESCRIPTION: 'Fixture description',
  GENERATED_AT: '2026-01-02T00:00:00.000Z',
  NAME: 'fixture-skill',
  SCHEMA_VERSION: '1.0.0',
  SKILL_TYPE: 'fixture-reference',
  SKILL_VERSION: '4.0.0',
  SOURCE: 'fixture-source',
  SYNERGY_VERSION: '3.0.0',
};

describe('skill body loader', () => {
  it('loads all published Markdown skill bodies', async () => {
    for (const skill of ['component', 'templates', 'intents']) {
      const content = await readSkillBody(skill);
      assert.ok(content.length > 0);
      assert.match(content, /^#/);
    }
  });
});

describe('skill body rendering', () => {
  it('renders every supported variable without depending on authored prose', () => {
    for (const [key, value] of Object.entries(templateContext)) {
      assert.equal(renderSkillBody(`Before {{${key}}} after.`, templateContext), `Before ${value} after.`);
    }
  });

  it('replaces repeated placeholders and preserves other Markdown', () => {
    assert.equal(
      renderSkillBody('# Heading\n\n`{{SYNERGY_VERSION}}` and {{SYNERGY_VERSION}}.', templateContext),
      '# Heading\n\n`3.0.0` and 3.0.0.',
    );
    assert.equal(renderSkillBody('Plain Markdown.', templateContext), 'Plain Markdown.');
  });

  it('rejects unknown or unresolved placeholders', () => {
    assert.throws(() => renderSkillBody('{{UNKNOWN}}', templateContext), /Unknown skill template placeholder/);
    assert.throws(() => renderSkillBody('{{synergy-version}}', templateContext), /Unresolved skill template placeholders/);
  });
});
