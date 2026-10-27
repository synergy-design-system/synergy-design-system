// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=45147-41625
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/alert/alert.component.ts
// component=SynAlert
import figma from 'figma';
import type SynAlert from '../../src/components/alert/alert.js';
import type { ValidProperties } from '../core/types.js';
import { readNestedProps, renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  closable: instance.getBoolean('closable'),
  defaultSlot: renderChildren(instance, '_helper/syn-alert/content'),
  iconSlot: instance.getBoolean('icon') ? figma.code`<syn-icon slot="icon" name="info"></syn-icon>` : figma.code`<span slot="icon"></span>`,
  variant: readNestedProps(instance, '_helper/color/syn-alert', nestedInstance => ({
    variant: nestedInstance.getEnum('variant', {
      critical: 'critical',
      danger: 'danger',
      error: 'error',
      neutral: 'neutral',
      primary: 'primary',
      success: 'success',
      warning: 'warning',
    }) ?? 'primary',
  })),
} satisfies ValidProperties<SynAlert, [
  'default',
  'icon',
]>;
const {
  closable, defaultSlot, iconSlot, variant,
} = props;

export default {
  example: figma.code`
    <syn-alert
      ${renderAttribute('closable', closable)}
      ${renderAttribute('variant', variant.variant)}
    >
      ${defaultSlot}
      ${iconSlot}
    </syn-alert>
  `,
  id: 'syn-alert',
  imports: [
    'import { SynAlert } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-alert--docs',
    },
  ],
};
