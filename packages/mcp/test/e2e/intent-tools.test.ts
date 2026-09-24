import assert from 'node:assert/strict';
import { unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import {
  type ClientSession,
  createClientSession,
  parseJsonContent,
  toToolResponse,
} from '../utilities/index.ts';

const writeTempConfig = async (content: unknown): Promise<string> => {
  const filePath = join(tmpdir(), `synergy-mcp-intent-tools-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  await writeFile(filePath, JSON.stringify(content), 'utf8');
  return filePath;
};

describe('intent tools', () => {
  let configPath: string;
  let session: ClientSession;

  before(async () => {
    configPath = await writeTempConfig({
      includeAiRules: false,
    });

    session = await createClientSession({ configPath });
  });

  after(async () => {
    await session.close();
    await unlink(configPath).catch(() => {
      /* ignore cleanup errors */
    });
  });

  it('lists intent categories', async () => {
    const response = await session.client.callTool({
      arguments: {
        includePhases: ['experimental'],
      },
      name: 'intent-categories-list',
    });

    const typed = toToolResponse(response);
    const categories = parseJsonContent<Array<{ id: string }>>(typed, 0);

    assert.ok(Array.isArray(categories));
    assert.ok(categories.some((category) => category.id === 'action'));
  });

  it('discovers intent categories and category intents', async () => {
    const categoryResponse = await session.client.callTool({
      arguments: { includePhases: ['experimental'] },
      name: 'intent-discover',
    });
    const categories = parseJsonContent<{
      categories: Array<{ id: string }>;
      level: string;
    }>(toToolResponse(categoryResponse), 0);
    assert.equal(categories.level, 'categories');
    assert.ok(categories.categories.some((category) => category.id === 'action'));

    const intentResponse = await session.client.callTool({
      arguments: { category: 'action', includePhases: ['experimental'] },
      name: 'intent-discover',
    });
    const intents = parseJsonContent<{
      category: { id: string };
      intents: Array<{ id: string; userGoal: string }>;
      level: string;
    }>(toToolResponse(intentResponse), 0);
    assert.equal(intents.level, 'intents');
    assert.equal(intents.category.id, 'action');
    assert.ok(intents.intents.some((intent) => intent.id === 'action.submit' && intent.userGoal.length > 0));
  });

  it('returns authoritative categories for an unknown discovery category', async () => {
    const response = await session.client.callTool({
      arguments: { category: 'form', includePhases: ['experimental'] },
      name: 'intent-discover',
    });
    const recovery = parseJsonContent<{
      availableCategoryIds: string[];
      error: string;
      requestedCategory: string;
    }>(toToolResponse(response), 0);
    assert.equal(recovery.requestedCategory, 'form');
    assert.match(recovery.error, /Unknown intent category "form"/);
    assert.ok(recovery.availableCategoryIds.includes('action'));
  });

  it('returns component guide for syn-button', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-button',
        framework: 'react-web-components',
        includePhases: ['experimental'],
      },
      name: 'intent-component-guide',
    });

    const typed = toToolResponse(response);
    const guide = parseJsonContent<{
      component: string;
      recommendedUsages: Array<{ intentId: string }>;
      supportedIntents: Array<{ id: string }>;
    }>(typed, 0);

    assert.equal(guide.component, 'syn-button');
    assert.ok(guide.supportedIntents.some((intent) => intent.id === 'action.submit'));
    assert.ok(guide.recommendedUsages.some((usage) => usage.intentId === 'action.submit'));
  });

  it('validates component usage for submit intent', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-button',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'action.submit',
        markup: '<syn-button href="#" type="submit" variant="filled">Send</syn-button>',
      },
      name: 'intent-component-validate',
    });

    const typed = toToolResponse(response);
    const validation = parseJsonContent<{
      issues: Array<{ code: string }>;
      valid: boolean;
    }>(typed, 0);

    assert.equal(validation.valid, false);
    assert.ok(validation.issues.some((issue) => issue.code === 'FORBIDDEN_PROP_HREF'));
  });

  it('uses metadata property defaults for action.primary when type is omitted in markup', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-button',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'action.primary',
        markup: '<syn-button variant="filled">Action</syn-button>',
      },
      name: 'intent-component-validate',
    });

    const typed = toToolResponse(response);
    const validation = parseJsonContent<{
      issues: Array<{ code: string }>;
      valid: boolean;
    }>(typed, 0);

    assert.equal(validation.valid, true);
    assert.ok(!validation.issues.some((issue) => issue.code === 'REQUIRED_PROP_BUTTON_TYPE'));
  });

  it('validates structure-aware confirmation dialog usage', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-dialog',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'structure.confirmation',
        markup: `
<syn-dialog open>
  Content
  <nav slot="footer">
    <syn-button variant="text">Abort</syn-button>
    <syn-button href="#" variant="filled">Delete this!</syn-button>
  </nav>
</syn-dialog>
`,
      },
      name: 'intent-component-validate',
    });

    const typed = toToolResponse(response);
    const validation = parseJsonContent<{
      issues: Array<{ code: string }>;
      valid: boolean;
    }>(typed, 0);

    assert.equal(validation.valid, false);
    assert.ok(validation.issues.some((issue) => issue.code === 'FORBIDDEN_CONFIRM_HREF'));
  });

  it('auto-derives structure from markup for validation', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-button',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'action.submit',
        markup: '<syn-button href="#" type="submit" variant="filled">Send</syn-button>',
      },
      name: 'intent-component-validate',
    });

    const typed = toToolResponse(response);
    const validation = parseJsonContent<{
      issues: Array<{ code: string }>;
      valid: boolean;
    }>(typed, 0);

    assert.equal(validation.valid, false);
    assert.ok(validation.issues.some((issue) => issue.code === 'FORBIDDEN_PROP_HREF'));
  });

  it('does not flag unexpected children for icon + text submit button content', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-button',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'action.submit',
        markup: `
<syn-button variant="filled" type="submit">
  <syn-icon slot="prefix" icon="submit" label=""></syn-icon>
  Send
</syn-button>
`,
      },
      name: 'intent-component-validate',
    });

    const typed = toToolResponse(response);
    const validation = parseJsonContent<{
      issues: Array<{ code: string }>;
      valid: boolean;
    }>(typed, 0);

    assert.equal(validation.valid, true);
    assert.ok(!validation.issues.some((issue) => issue.code === 'STRUCTURE_UNEXPECTED_CHILD'));
  });

  it('handles minimal markup and reports structural issues', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-dialog',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'structure.confirmation',
        markup: '<syn-dialog>I am the content</syn-dialog>',
      },
      name: 'intent-component-validate',
    });

    const typed = toToolResponse(response);
    const validation = parseJsonContent<{
      issues: Array<{ code: string }>;
      valid: boolean;
    }>(typed, 0);

    assert.equal(validation.valid, false);
    assert.ok(validation.issues.some((issue) => issue.code === 'STRUCTURE_NODE_MISSING'));
  });

  it('returns task recommendations for action.submit', async () => {
    const response = await session.client.callTool({
      arguments: {
        framework: 'react-web-components',
        includePhases: ['experimental'],
        taskId: 'action.submit',
      },
      name: 'intent-task-recommendations',
    });

    const typed = toToolResponse(response);
    const recommendations = parseJsonContent<{
      primaryRecommendation: { intentId: string; targetId: string } | null;
      taskId: string;
    }>(typed, 0);

    assert.equal(recommendations.taskId, 'action.submit');
    assert.ok(recommendations.primaryRecommendation);
    assert.equal(recommendations.primaryRecommendation?.intentId, 'action.submit');
  });

  it('returns renderable options for grouped link-list intent', async () => {
    const response = await session.client.callTool({
      arguments: {
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intentId: 'navigation.link-list.grouped',
      },
      name: 'intent-options',
    });

    const typed = toToolResponse(response);
    const options = parseJsonContent<{
      bestDefaultTargetId: string | null;
      renderableTargets: Array<{ targetId: string }>;
    }>(typed, 0);

    assert.equal(options.bestDefaultTargetId, 'style:syn-link-list');
    assert.ok(options.renderableTargets.some((target) => target.targetId === 'style:syn-link-list'));
  });

  it('accepts vue-web-components framework for intent options', async () => {
    const response = await session.client.callTool({
      arguments: {
        framework: 'vue-web-components',
        includePhases: ['experimental'],
        intentId: 'navigation.link-list.grouped',
      },
      name: 'intent-options',
    });

    const typed = toToolResponse(response);
    const options = parseJsonContent<{
      bestDefaultTargetId: string | null;
      renderableTargets: Array<{ targetId: string }>;
    }>(typed, 0);

    assert.equal(options.bestDefaultTargetId, 'style:syn-link-list');
    assert.ok(options.renderableTargets.some((target) => target.targetId === 'style:syn-link-list'));
  });

  it('returns error message for unknown intent options query', async () => {
    const response = await session.client.callTool({
      arguments: {
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intentId: 'intent.unknown',
      },
      name: 'intent-options',
    });

    const typed = toToolResponse(response);
    const recovery = parseJsonContent<{
      availableCategoryIds: string[];
      recovery: { arguments: Record<string, unknown>; tool: string };
      submittedIntentId: string;
      validationPerformed: boolean;
    }>(typed, 0);
    assert.equal(recovery.submittedIntentId, 'intent.unknown');
    assert.equal(recovery.validationPerformed, false);
    assert.equal(recovery.recovery.tool, 'intent-discover');
    assert.deepEqual(recovery.recovery.arguments, {});
    assert.ok(recovery.availableCategoryIds.includes('action'));
  });

  it('returns intents from a known category when validation receives an unknown intent', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-button',
        includePhases: ['experimental'],
        intent: 'action.doesnotexist',
        markup: '<syn-button>Action</syn-button>',
      },
      name: 'intent-component-validate',
    });
    const recovery = parseJsonContent<{
      availableIntentIds: string[];
      recovery: { arguments: { category: string }; tool: string };
      submittedIntentId: string;
      validationPerformed: boolean;
    }>(toToolResponse(response), 0);
    assert.equal(recovery.submittedIntentId, 'action.doesnotexist');
    assert.equal(recovery.validationPerformed, false);
    assert.deepEqual(recovery.recovery.arguments, { category: 'action' });
    assert.ok(recovery.availableIntentIds.includes('action.submit'));
    assert.ok(recovery.availableIntentIds.every((intent) => intent.startsWith('action.')));
  });

  it('returns bounded recovery for an unknown task intent', async () => {
    const response = await session.client.callTool({
      arguments: {
        includePhases: ['experimental'],
        taskId: 'action.doesnotexist',
      },
      name: 'intent-task-recommendations',
    });
    const recovery = parseJsonContent<{
      availableIntentIds: string[];
      validationPerformed: boolean;
    }>(toToolResponse(response), 0);
    assert.equal(recovery.validationPerformed, false);
    assert.ok(recovery.availableIntentIds.includes('action.submit'));
  });

  it('prepends deprecation guidance when the compatibility tool is called', async () => {
    const compatibilitySession = await createClientSession();
    try {
      const response = await compatibilitySession.client.callTool({
        arguments: { includePhases: ['experimental'] },
        name: 'intent-categories-list',
      });
      const typed = toToolResponse(response);
      assert.match(typed.content[0]?.text ?? '', /deprecated.*intent-discover/is);
    } finally {
      await compatibilitySession.close();
    }
  });

  it('flags empty submit button as invalid due to missing content', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-button',
        framework: 'react-web-components',
        includePhases: ['experimental'],
        intent: 'action.submit',
        markup: '<syn-button variant="filled" type="submit"></syn-button>',
      },
      name: 'intent-component-validate',
    });

    const typed = toToolResponse(response);
    const validation = parseJsonContent<{
      issues: Array<{ code: string; severity: string }>;
      valid: boolean;
    }>(typed, 0);

    assert.equal(validation.valid, false);
    assert.ok(validation.issues.some((issue) => issue.code === 'REQUIRED_CONTENT_BUTTON_LABEL'));
    assert.equal(
      validation.issues.find((issue) => issue.code === 'REQUIRED_CONTENT_BUTTON_LABEL')?.severity,
      'error',
    );
  });
});
