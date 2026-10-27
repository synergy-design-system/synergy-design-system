// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=49794-33275
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/pagination/pagination.component.ts
// component=SynPagination
import figma from 'figma';
import type SynPagination from '../../src/components/pagination/pagination.js';
import type { ValidProperties } from '../core/types.js';
import { renderAttribute } from '../core/template-helpers.js';

const instance = figma.selectedInstance;
const props = {
  currentPage: instance.getString('current-page'),
  disabled: instance.getBoolean('disabled'),
  divider: instance.getBoolean('divider'),
  pageSize: instance.getString('page-size'),
  pageSizeOptions: instance.getString('*page-size-options'),
  size: instance.getEnum('size', {
    large: 'large',
    medium: 'medium',
    'medium (default)': 'medium',
    small: 'small',
  }) ?? 'medium',
  totalItems: instance.getString('total-items'),
  variant: instance.getEnum('variant', {
    compact: 'compact',
    full: 'full',
  }) ?? 'full',
} satisfies ValidProperties<SynPagination>;

export default {
  example: figma.code`
    <syn-pagination
      ${renderAttribute('current-page', props.currentPage)}
      ${renderAttribute('disabled', props.disabled)}
      ${renderAttribute('divider', props.divider)}
      ${renderAttribute('page-size', props.pageSize)}
      ${renderAttribute('page-size-options', props.pageSizeOptions)}
      ${renderAttribute('size', props.size)}
      ${renderAttribute('total-items', props.totalItems)}
      ${renderAttribute('variant', props.variant)}
    ></syn-pagination>
  `,
  id: 'syn-pagination',
  imports: [
    "import '@synergy-design-system/components/components/pagination/pagination.js';",
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-pagination--docs',
    },
  ],
};
