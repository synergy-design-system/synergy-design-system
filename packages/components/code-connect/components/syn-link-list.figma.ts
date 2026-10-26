// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=29590-40206
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/styles/src/link-list/index.css
// component=SynLinkList
import figma from 'figma';

import { renderAttribute, renderChildren } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  className: [
    'syn-link-list',
    instance.getEnum('size', {
      large: 'syn-link-list--large',
      medium: 'syn-link-list--medium',
      small: 'syn-link-list--small',
    }),
    instance.getBoolean('horizontal') ? 'syn-link-list--horizontal' : undefined,
  ].filter(Boolean).join(' '),
  defaultSlot: renderChildren(instance, '*'),
};
const { className, defaultSlot } = props;

export default {
  example: figma.code`
    <nav
      ${renderAttribute('class', className)}
    >
      ${defaultSlot}
    </nav>
  `,
  id: 'syn-link-list',
  imports: [
    'import "@synergy-design-system/styles/dist/index.css";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/styles-syn-link-list--docs',
    },
  ],
};
