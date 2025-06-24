import figma, { html } from '@figma/code-connect/html';
import type SynBreadcrumbItem from '../src/components/breadcrumb-item/breadcrumb-item.js';
import type { ValidProperties } from './core/types';

/**
 * @todos
 * - prefix and suffix slots should allow to set instances with slot="prefix" and slot="suffix"
 */

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=18458-27218', {
  example: ({
    defaultSlot,
    prefixSlot,
    suffixSlot,
  }) => html`
    <syn-breadcrumb-item
    >
      ${defaultSlot}
      <span slot="prefix">${prefixSlot}</span>
      <span slot="suffix">${suffixSlot}</span>
    </syn-breadcrumb-item>
  `,
  imports: [
    'import { SynBreadcrumbItem } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-breadcrumb-item--docs',
    },
  ],
  props: {
    defaultSlot: figma.string('↳ content/label'),
    prefixSlot: figma.boolean('prefix', {
      true: figma.instance('<slot prefix>'),
    }),
    suffixSlot: figma.boolean('suffix', {
      true: figma.instance('<slot suffix>'),
    }),
  } satisfies ValidProperties<SynBreadcrumbItem, ['default', 'prefix', 'suffix']>,
});
