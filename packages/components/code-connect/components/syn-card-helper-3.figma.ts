// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=15025-22461
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/card/card.component.ts
// component=SynCard
import figma from 'figma';

import { renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: renderChildren(instance, 'syn-button'),
  label: renderChildren(instance, '_helper/syn-card/opt-info'),
};
const { defaultSlot, label } = props;

export default {
  example: figma.code`
    <div slot="footer">
      ${label}
      <nav>
        ${defaultSlot}
      </nav>
    </div>
  `,
  id: 'syn-card-helper-3',
  imports: [],
  links: [],
};
