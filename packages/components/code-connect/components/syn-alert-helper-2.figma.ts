// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=16231-21242&t=uiGCtkXQsyEo930h-4
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/alert/alert.component.ts
// component=SynAlert
import figma from 'figma';

const instance = figma.selectedInstance;
const props = {
  headline: instance.getString('\u21B3 content/headline'),
  text: instance.getString('text'),
};
const { headline, text } = props;

export default {
  example: figma.code`
    <div>
      <h3>${headline}</h3>
      <p>${text}</p>
    </div>
  `,
  id: 'syn-alert-helper-2',
  imports: [],
  links: [],
};
