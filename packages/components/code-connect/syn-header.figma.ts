import figma, { html } from '@figma/code-connect/html';
import type SynHeader from '../src/components/header/header.js';
import type { ValidProperties } from './core/types';

// Synergy Web Component Connection
figma.connect('https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=10540-8581', {
  example: ({
    burgerMenu,
    labelSlot,
    logoSlot,
    metaNavigationSlot,
    navigationSlot,
  }) => html`
    <syn-header
      burger-menu=${burgerMenu}
    >
      <div slot="logo">${logoSlot}</div>
      <div slot="label">${labelSlot}</div>
      <nav slot="meta-navigation">${metaNavigationSlot}</nav>
      <nav slot="navigation">${navigationSlot}</nav>
    </syn-header>
  `,
  imports: [
    'import { SynHeader } from "@synergy-design-system/components";',
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-header--docs',
    },
  ],
  props: {
    burgerMenu: figma.boolean('burger-menu', {
      false: 'hidden',
      true: 'closed',
    }),
    labelSlot: figma.boolean('label', {
      true: figma.string('↳ content/label'),
    }),
    logoSlot: figma.instance('↳ <slot (logo)>'),
    metaNavigationSlot: figma.children('syn-icon-button'),
    navigationSlot: figma.boolean('*navigation', {
      true: figma.instance('↳ <slot nav>'),
    }),
  } satisfies ValidProperties<SynHeader, ['label', 'logo', 'navigation', 'metaNavigation']>,
});
