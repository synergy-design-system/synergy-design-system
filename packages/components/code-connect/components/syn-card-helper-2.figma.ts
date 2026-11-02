// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=15368-59024
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/card/card.component.ts
// component=SynCard
import figma from 'figma';

const instance = figma.selectedInstance;
const props = {
  defaultSlot: instance.getBoolean('label') ? instance.getString('\u21B3 content/label') : undefined,
};
const { defaultSlot } = props;

export default {
  example: figma.code`
    <small>${defaultSlot}</small>
  `,
  id: 'syn-card-helper-2',
  imports: [],
  links: [],
};
