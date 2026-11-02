// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=25215-36015
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/range/range.component.ts
// component=SynRange
import figma from 'figma';
import type SynRange from '../../src/components/range/range.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  disabled: instance.getBoolean('disabled'),
  helpText: instance.getBoolean('help-text') ? instance.getString('\u21B3 content/help-text') : undefined,
  label: instance.getBoolean('label') ? instance.getString('\u21B3 content/label') : undefined,
  prefixSlot: instance.getBoolean('prefix') ? instance.getInstanceSwap('\u21B3 <slot prefix>')?.executeTemplate().example : undefined,
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    small: 'small',
  }) ?? 'medium',
  suffixSlot: instance.getBoolean('suffix') ? instance.getInstanceSwap('\u21B3 <slot suffix>')?.executeTemplate().example : undefined,
  ticksSlot: instance.getBoolean('ticks') ? renderChildren(instance, '_helper/syn-range/ticks') : undefined,
  value: instance.getBoolean('multi-thumb') ? '0 50' : '50',
} satisfies ValidProperties<SynRange, [
  'prefix',
  'suffix',
  'suffix',
  'ticks',
]>;
const {
  disabled, helpText, label, size, ticksSlot, value, prefixSlot, suffixSlot,
} = props;

export default {
  example: figma.code`
    <syn-range
      ${renderAttribute('disabled', disabled)}
      ${renderAttribute('help-text', helpText)}
      ${renderAttribute('label', label)}
      ${renderAttribute('size', size)}
      ${renderAttribute('value', value)}
    >
      <span slot="prefix">
        ${prefixSlot}
      </span>
      <span slot="suffix">
        ${suffixSlot}
      </span>
      <nav slot="ticks">
        ${ticksSlot}
      </nav>
    </syn-range>
  `,
  id: 'syn-range',
  imports: [
    'import { SynRange } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-range--docs',
    },
  ],
};
