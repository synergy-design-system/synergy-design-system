import { describe, it } from 'node:test';
import { componentListExamplesTool } from '@synergy-design-system/mcp/tools/component-list-examples.js';
import { expectIndividuallyRegisteredExampleTool } from '../utilities/index.ts';

describe('component-list-examples tool', () => {
  it('can be imported and registered independently', async () => {
    await expectIndividuallyRegisteredExampleTool(
      componentListExamplesTool,
      'component-list-examples',
      { component: 'syn-chart' },
    );
  });
});
