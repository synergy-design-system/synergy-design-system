// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=14127-697924&t=HVv51unRzmD4igDU-4
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/badge/badge.component.ts
// component=SynBadge
import figma from 'figma';
import type SynBadge from '../../src/components/badge/badge.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getString('*value'),
  variant: instance.getEnum('variant', {
    critical: 'critical',
    danger: 'danger',
    error: 'error',
    neutral: 'neutral',
    primary: 'primary',
    success: 'success',
    warning: 'warning',
  }) ?? 'primary',
} satisfies ValidProperties<SynBadge>;
const { defaultSlot, variant } = props;

export default {
  example: figma.code`
    <syn-badge
      ${renderAttribute('variant', variant)}
    >
      ${defaultSlot}
    </syn-badge>
  `,
  id: 'syn-badge',
  imports: [
    'import { SynBadge } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-badge--docs',
    },
  ],
};
