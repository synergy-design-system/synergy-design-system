// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=50279-41408
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/checkbox-group/checkbox-group.component.ts
// component=SynCheckboxGroup
import figma from 'figma';
import type SynCheckboxGroup from '../../src/components/checkbox-group/checkbox-group.js';
import type { ValidProperties } from '../core/types.js';
import { readNestedProps, renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const horizontal = instance.getBoolean('horizontal slot');
const slot = instance.getSlot(horizontal ? '<slot default> horizontal' : '<slot default> vertical ');
const props = {
  defaultSlot: slot?.connectedInstances.map(child => child.executeTemplate().example),
  helpText: instance.getBoolean('help-text') ? instance.getString('↳ content/help-text') : '',
  label: instance.getBoolean('label') ? readNestedProps(instance, 'slot/label', label => (
    label.getBoolean('label') ? label.getString('↳ content/label') : ''
  )) : '',
  layout: horizontal ? 'horizontal' : 'vertical',
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
} satisfies ValidProperties<SynCheckboxGroup>;

export default {
  example: figma.code`
    <syn-checkbox-group
      ${renderAttribute('help-text', props.helpText)}
      ${renderAttribute('label', props.label)}
      ${renderAttribute('layout', props.layout)}
      ${renderAttribute('size', props.size)}
    >
      ${props.defaultSlot}
    </syn-checkbox-group>
  `,
  id: 'syn-checkbox-group',
  imports: [
    "import '@synergy-design-system/components/components/checkbox-group/checkbox-group.js';",
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-checkbox-group--docs',
    },
  ],
};
