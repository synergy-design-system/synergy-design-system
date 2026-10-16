// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=9983-7947
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/drawer/drawer.component.ts
// component=SynDrawer
import figma from 'figma';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getString('value'),
};
const { defaultSlot } = props;

export default {
  example: figma.code`
    <h3 slot="label">${defaultSlot}</h3>
  `,
  id: 'syn-drawer-helper-1',
  imports: [],
  links: [],
};
