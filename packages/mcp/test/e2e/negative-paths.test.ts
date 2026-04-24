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

  it('component-info returns not-found message for unknown component', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-does-not-exist',
      },
      name: 'component-info',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(typedResponse.content.length > 0);
    const combined = typedResponse.content.map((entry) => entry.text).join('\n');
    assert.match(combined, /No metadata found|not found/i);
  });

  it('styles-info returns not-found message for unknown style', async () => {
    const response = await session.client.callTool({
      arguments: {
        style: 'syn-does-not-exist',
      },
      name: 'styles-info',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(typedResponse.content.length > 0);
    assert.match(typedResponse.content[0].text, /No style found/i);
  });

  it('migration-info returns not-found message for unknown document', async () => {
    const response = await session.client.callTool({
      arguments: {
        filename: 'does-not-exist.md',
        synergyPackage: 'components',
      },
      name: 'migration-info',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(typedResponse.content.length > 0);
    assert.match(typedResponse.content[0].text, /No migration document named/i);
  });
});
