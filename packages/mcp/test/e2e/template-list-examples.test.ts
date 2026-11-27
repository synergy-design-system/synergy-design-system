import { describe, it } from 'node:test';
import { templateListExamplesTool } from '@synergy-design-system/mcp/tools/template-list-examples.js';
import { expectIndividuallyRegisteredExampleTool } from '../utilities/index.ts';

describe('template-list-examples tool', () => {
  it('can be imported and registered independently', async () => {
    await expectIndividuallyRegisteredExampleTool(
      templateListExamplesTool,
      'template-list-examples',
      { template: 'appshell' },
    );
  });
});
