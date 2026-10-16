// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=20877-88538
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/details/details.component.ts
// component=SynDetails
import figma from 'figma';

const instance = figma.selectedInstance;
const props = {
  content: instance.getEnum('content', {
    text: instance.getString('\u21B3 content'),
  }),
  subheadline: instance.getBoolean('subheadline') ? instance.getString('\u21B3 subheadline') : undefined,
};
const { content, subheadline } = props;

export default {
  example: figma.code`
    <div>
      <h3>${subheadline}</h3>
      ${content}
    </div>
  `,
  id: 'syn-details-helper-1',
  imports: [],
};
