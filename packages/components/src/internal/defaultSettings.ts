import type SynButton from '../components/button/button.component.js';
import type SynergyElement from './synergy-element.js';

type AllowedValueForDefaultSetting<Elm extends SynergyElement, Attr extends keyof Elm> = Elm[Attr];

type SynDefaultSettings = {
  size: {
    SynButton: AllowedValueForDefaultSetting<SynButton, 'size'>;
  },
};

export const settings: SynDefaultSettings = {
  size: {
    SynButton: 'large',
  },
};
