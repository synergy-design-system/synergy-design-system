// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=45275-115606
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/tag-group/tag-group.component.ts
// component=SynTagGroup
import figma from 'figma';
import type SynTagGroup from '../../src/components/tag-group/tag-group.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.findConnectedInstances(child => child.codeConnectId() === 'syn-tag', {
    traverseInstances: true,
  }).map(child => child.executeTemplate().example),
  label: instance.getBoolean('label') ? instance.getString('↳ content/label') : '',
  labelPosition: instance.getEnum('label-position', {
    start: 'start',
    top: 'top',
  }) ?? 'top',
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    'medium (default)': 'medium',
    small: 'small',
  }) ?? 'medium',
} satisfies ValidProperties<SynTagGroup>;

export default {
  example: figma.code`
    <syn-tag-group
      ${renderAttribute('label', props.label)}
      ${renderAttribute('label-position', props.labelPosition)}
      ${renderAttribute('size', props.size)}
    >
      ${props.defaultSlot}
    </syn-tag-group>
  `,
  id: 'syn-tag-group',
  imports: [
    "import '@synergy-design-system/components/components/tag-group/tag-group.js';",
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-tag-group--docs',
    },
  ],
};
