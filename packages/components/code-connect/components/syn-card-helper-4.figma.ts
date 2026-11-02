// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=15025-22467&t=IhTCPgq8BxxTKH32-4
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/card/card.component.ts
// component=SynCard
import figma from 'figma';

const instance = figma.selectedInstance;
const props = {
  content: instance.getString('content'),
  headline: instance.getBoolean('headline') ? instance.getString('\u21B3 content/headline') : undefined,
};
const { content, headline } = props;

export default {
  example: figma.code`
    <div>
      <h3>${headline}</h3>
      ${content}
    </div>
  `,
  id: 'syn-card-helper-4',
  imports: [],
  links: [],
};
