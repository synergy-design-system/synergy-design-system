// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=16910-25970
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/tooltip/tooltip.component.ts
// component=SynTooltip
import figma from 'figma';
import type SynTooltip from '../../src/components/tooltip/tooltip.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  content: instance.getString('content'),
} satisfies ValidProperties<SynTooltip>;
const { content } = props;

export default {
  example: figma.code`
    <syn-tooltip
      ${renderAttribute('content', content)}
    >
      <syn-button>
        Replace this component with the content that should activate the tooltip.
      </syn-button>
    </syn-tooltip>
  `,
  id: 'syn-tooltip',
  imports: [
    'import { SynTooltip } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tooltip--docs',
    },
  ],
};
