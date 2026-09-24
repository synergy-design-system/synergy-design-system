import assert from 'node:assert/strict';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import {
  type ClientSession,
  createClientSession,
  toToolResponse,
} from '../utilities/index.ts';

let session: ClientSession;

describe('negative paths', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('component-info returns the component catalog for an unknown component', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-does-not-exist',
      },
      name: 'component-info',
    });
    const typedResponse = toToolResponse(response);

    const recovery = JSON.parse(typedResponse.content.at(-1)?.text ?? '{}') as {
      availableComponentNames: string[];
      operationPerformed: boolean;
      submittedComponent: string;
    };
    assert.equal(recovery.submittedComponent, 'syn-does-not-exist');
    assert.equal(recovery.operationPerformed, false);
    assert.ok(recovery.availableComponentNames.includes('syn-button'));
  });

  it('intent component tools recover from non-prefixed component values', async () => {
    const guideResponse = toToolResponse(await session.client.callTool({
      arguments: { component: 'button' },
      name: 'intent-component-guide',
    }));
    const guideRecovery = JSON.parse(guideResponse.content.at(-1)?.text ?? '{}') as {
      availableComponentNames: string[];
      submittedComponent: string;
    };
    assert.equal(guideRecovery.submittedComponent, 'button');
    assert.ok(guideRecovery.availableComponentNames.includes('syn-button'));

    const validationResponse = toToolResponse(await session.client.callTool({
      arguments: {
        component: 'button',
        intent: 'action.submit',
        markup: '<button type="submit">Send</button>',
      },
      name: 'intent-component-validate',
    }));
    const validationRecovery = JSON.parse(validationResponse.content.at(-1)?.text ?? '{}') as {
      operationPerformed: boolean;
      submittedComponent: string;
    };
    assert.equal(validationRecovery.submittedComponent, 'button');
    assert.equal(validationRecovery.operationPerformed, false);
  });

  it('styles-info returns recovery for unknown style', async () => {
    const response = await session.client.callTool({
      arguments: {
        style: 'syn-does-not-exist',
      },
      name: 'styles-info',
    });
    const typedResponse = toToolResponse(response);

    const recovery = JSON.parse(typedResponse.content[0]?.text ?? '{}') as {
      availableNames: string[];
      operationPerformed: boolean;
    };
    assert.equal(recovery.operationPerformed, false);
    assert.ok(recovery.availableNames.length > 0);
  });

  it('migration-info returns recovery for unknown document', async () => {
    const response = await session.client.callTool({
      arguments: {
        filename: 'does-not-exist.md',
        synergyPackage: 'components',
      },
      name: 'migration-info',
    });
    const typedResponse = toToolResponse(response);

    const recovery = JSON.parse(typedResponse.content[0]?.text ?? '{}') as {
      availableFilenames: string[];
      operationPerformed: boolean;
    };
    assert.equal(recovery.operationPerformed, false);
    assert.ok(recovery.availableFilenames.length > 0);
  });
});
