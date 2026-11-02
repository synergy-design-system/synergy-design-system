// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=22460-32928
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/styles/src/tables/table-cell.css
// component=SynTableCell
import figma from 'figma';

import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  className: [
    'syn-table-cell',
    instance.getBoolean('alternating') ? 'syn-table-cell--alternating' : undefined,
    instance.getBoolean('header') ? 'syn-table-cell--header' : undefined,
    instance.getBoolean('shadow-start') ? 'syn-table-cell--shadow-start' : undefined,
    instance.getBoolean('shadow-end') ? 'syn-table-cell--shadow-end' : undefined,
    instance.getBoolean('shadow-top') ? 'syn-table-cell--shadow-top' : undefined,
    instance.getBoolean('shadow-bottom') ? 'syn-table-cell--shadow-bottom' : undefined,
    instance.getBoolean('divider-start') ? 'syn-table-cell--border-start' : undefined,
    instance.getBoolean('divider-end') ? 'syn-table-cell--border-end' : undefined,
    instance.getBoolean('divider-top') ? 'syn-table-cell--border-top' : undefined,
    instance.getBoolean('divider-bottom') ? 'syn-table-cell--border-bottom' : undefined,
  ].filter(Boolean).join(' '),
  defaultSlot: instance.getInstanceSwap('<slot>')?.executeTemplate().example,
};
const { className, defaultSlot } = props;

export default {
  example: figma.code`
    <td
      ${renderAttribute('class', className)}
    >
      ${defaultSlot}
    </td>
  `,
  id: 'syn-table-cell',
  imports: [
    'import "@synergy-design-system/styles/dist/index.css";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/styles-syn-table-cell--docs',
    },
  ],
};
