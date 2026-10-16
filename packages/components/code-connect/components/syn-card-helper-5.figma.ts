// url=https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=15025-22432&t=IhTCPgq8BxxTKH32-4
// source=https://github.com/synergy-design-system/synergy-design-system/blob/main/packages/components/src/components/card/card.component.ts
// component=SynCard
import figma from 'figma';

const instance = figma.selectedInstance;
const props = {
  headline: instance.getBoolean('headline') ? instance.getString('\u21B3 content/headline') : undefined,
  prefixIcon1: instance.getBoolean('\u21B3 suffix/option-1') ? instance.getInstanceSwap('\u21B3 <slot suffix-1>')?.executeTemplate().example : undefined,
  prefixIcon2: instance.getBoolean('\u21B3 suffix/option-2') ? instance.getInstanceSwap('\u21B3 <slot suffix-2>')?.executeTemplate().example : undefined,
  suffixIcon1: instance.getBoolean('\u21B3 preffix/option-1') ? instance.getInstanceSwap('\u21B3 <slot preffix-1>')?.executeTemplate().example : undefined,
  suffixIcon2: instance.getBoolean('\u21B3 preffix/option-2') ? instance.getInstanceSwap('\u21B3 <slot preffix-2>')?.executeTemplate().example : undefined,
  suffixIcon3: instance.getBoolean('\u21B3 preffix/option-3') ? instance.getInstanceSwap('\u21B3 <slot preffix-3>')?.executeTemplate().example : undefined,
  suffixIcon4: instance.getBoolean('\u21B3 preffix/option-4') ? instance.getInstanceSwap('\u21B3 <slot preffix-4>')?.executeTemplate().example : undefined,
};
const {
  headline, prefixIcon1, prefixIcon2, suffixIcon1, suffixIcon2, suffixIcon3, suffixIcon4,
} = props;

export default {
  example: figma.code`
    <div slot="header">
      ${prefixIcon1}
      ${prefixIcon2}
      ${headline}
      ${suffixIcon1}
      ${suffixIcon2}
      ${suffixIcon3}
      ${suffixIcon4}
    </div>
  `,
  id: 'syn-card-helper-5',
  imports: [],
  links: [],
};
