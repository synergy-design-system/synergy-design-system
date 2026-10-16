// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=42588-299431
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/radio-group/radio-group.component.ts
// component=SynRadioGroup
import figma from 'figma';
import type SynRadioGroup from '../../src/components/radio-group/radio-group.js';
import type { ValidProperties } from '../core/types.js';
import { readNestedProps, renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, 'syn-radio'),
  helpText: instance.getBoolean('help-text') ? instance.getString('\u21B3 content/help-text') : undefined,
  label: readNestedProps(instance, 'slot/label', nestedInstance => ({
    label: nestedInstance.getBoolean('label') ? nestedInstance.getString('\u21B3 content/label') : undefined,
  })),
} satisfies ValidProperties<SynRadioGroup>;
const { defaultSlot, helpText, label } = props;

export default {
  example: figma.code`
    <syn-radio-group
      ${renderAttribute('help-text', helpText)}
      ${renderAttribute('label', label.label)}
    >
      ${defaultSlot}
    </syn-radio-group>
  `,
  id: 'syn-radiogroup',
  imports: [
    'import { SynRadioGroup } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-radio-group--docs',
    },
  ],
};
