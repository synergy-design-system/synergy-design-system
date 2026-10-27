// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=50975-46749
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/fieldset/fieldset.component.ts
// component=SynFieldset
import figma from 'figma';
import type SynFieldset from '../../src/components/fieldset/fieldset.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: Array.from({ length: 10 }, (_unused, index) => instance.getSlot(`row ${index + 1}`))
    .flatMap(slot => slot?.connectedInstances.map(child => child.executeTemplate().example) ?? []),
  description: instance.getBoolean('description') ? instance.getString('↳ content/description') : '',
  disabled: instance.getBoolean('disabled'),
  layout: instance.getEnum('layout', {
    'one-column': 'one-column',
    'two-columns': 'two-columns',
  }) ?? 'one-column',
  legend: instance.getBoolean('legend') ? instance.getString('↳ content/legend') : '',
} satisfies ValidProperties<SynFieldset>;

export default {
  example: figma.code`
    <syn-fieldset
      ${renderAttribute('description', props.description)}
      ${renderAttribute('disabled', props.disabled)}
      ${renderAttribute('layout', props.layout)}
      ${renderAttribute('legend', props.legend)}
    >
      ${props.defaultSlot}
    </syn-fieldset>
  `,
  id: 'syn-fieldset',
  imports: [
    "import '@synergy-design-system/components/components/fieldset/fieldset.js';",
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-fieldset--docs',
    },
  ],
};
