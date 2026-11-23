import { describe, it } from 'node:test';
import { stylesListExamplesTool } from '@synergy-design-system/mcp/tools/styles-list-examples.js';
import { expectIndividuallyRegisteredExampleTool } from '../utilities/index.ts';

describe('styles-list-examples tool', () => {
  it('can be imported and registered independently', async () => {
    await expectIndividuallyRegisteredExampleTool(
      stylesListExamplesTool,
      'styles-list-examples',
      { style: 'syn-table' },
    );
  });
});
