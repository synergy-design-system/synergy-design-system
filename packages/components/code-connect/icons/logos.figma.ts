// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=41-4000
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/icon/icon.component.ts
// component=SynIcon
import figma from 'figma';

const instance = figma.selectedInstance;
const theme = instance.getEnum('theme', {
  sick2018: 'sick2018',
  sick2025: 'sick2025',
}) ?? 'sick2025';
const color = instance.getEnum('color', {
  black: 'black',
  blue: 'blue',
  white: 'white',
}) ?? 'blue';
const variant = instance.getEnum('variant', {
  'claim-below': 'claim-below',
  'claim-right-bottom': 'claim-right-bottom',
  'claim-right-top': 'claim-right-top',
  logo: 'logo',
}) ?? 'logo';
const filename = theme === 'sick2018'
  ? `logo${variant === 'claim-below' ? '-claim' : ''}-${color === 'blue' ? 'color' : color}.svg`
  : `logo-${variant}-${color}.svg`;

export default {
  example: figma.code`<syn-icon src="node_modules/@synergy-design-system/assets/src/${theme}/logos/${filename}" label="SICK"></syn-icon>`,
  id: 'syn-icon-logo',
  imports: [
    "import '@synergy-design-system/components/components/icon/icon.js';",
  ],
  links: [
    {
      name: 'Documentation',
      url: 'https://synergy-design-system.github.io/?path=/docs/components-syn-icon--docs',
    },
  ],
  metadata: {
    nestable: true,
  },
};
