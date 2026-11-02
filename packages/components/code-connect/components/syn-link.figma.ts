// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=24700-39151
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/styles/src/link/index.css
// component=SynLink
import figma from 'figma';

import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  className: [
    'syn-link',
    instance.getBoolean('disabled') ? 'syn-link--disabled' : undefined,
    instance.getEnum('size', {
      large: 'syn-link--large',
      medium: 'syn-link--medium',
      small: 'syn-link--small',
    }),
  ].filter(Boolean).join(' '),
  defaultSlot: instance.getBoolean('content') ? instance.getString('\u21B3 content') : undefined,
};
const { className, defaultSlot } = props;

export default {
  example: figma.code`
    <a
      ${renderAttribute('class', className)}
      href="https://synergy-design-system.github.io/?path=/docs/styles-syn-link--docs"
    >
      ${defaultSlot}
    </a>
  `,
  id: 'syn-link',
  imports: [
    'import "@synergy-design-system/styles/dist/index.css";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/styles-syn-link--docs',
    },
  ],
};
