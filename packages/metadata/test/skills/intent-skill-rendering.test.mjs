import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  renderContentRulesChecklist,
  renderPropRulesChecklist,
  renderStructureChecklist,
} from '../../dist/public/skills/intent-skill.js';

describe('intent skill markdown rendering', () => {
  it('renders each property rule kind', () => {
    const output = renderPropRulesChecklist([
      { kind: 'requiredEquals', prop: 'type', value: 'submit', code: 'required', message: 'Use submit.' },
      { kind: 'forbidden', prop: 'disabled', code: 'forbidden', message: 'Do not disable it.' },
      { kind: 'recommendedEquals', prop: 'variant', value: 'primary', code: 'recommended', message: 'Prefer primary.' },
      { kind: 'warnWhenEquals', prop: 'loading', value: true, code: 'warning', message: 'Check loading state.' },
    ]);

    assert.match(output, /\*\*Required\*\*/);
    assert.match(output, /\*\*Forbidden\*\*/);
    assert.match(output, /\*\*Recommended\*\*/);
    assert.match(output, /\*\*Warning\*\*/);
    assert.match(output, /Use submit\./);
  });

  it('renders content sources and nested structure checks', () => {
    const content = renderContentRulesChecklist([
      {
        kind: 'requiredAnyContentSource',
        sources: [{ kind: 'prop', prop: 'label' }, { kind: 'slot', slot: 'label' }],
        code: 'content',
        message: 'Provide a label.',
      },
    ]);
    const structure = renderStructureChecklist({
      component: 'syn-card',
      children: [{ component: 'syn-button', role: 'action' }],
    });

    assert.match(content, /prop `label`/);
    assert.match(content, /slot `label`/);
    assert.match(structure, /syn-card/);
    assert.match(structure, /  - Use `syn-button`/);
  });

  it('handles empty guidance', () => {
    assert.equal(renderPropRulesChecklist(), '');
    assert.equal(renderContentRulesChecklist(), '');
    assert.equal(renderStructureChecklist(), '');
  });
});
