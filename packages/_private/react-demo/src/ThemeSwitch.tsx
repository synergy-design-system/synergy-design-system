import {
  getAvailableThemes,
  setThemeFromOptionString,
} from '@synergy-design-system/demo-utilities';
import type { SynSelect } from '@synergy-design-system/components';

export const ThemeSwitch = () => (
  <syn-select
    onsyn-change={e => {
      const value = (e.target as SynSelect).value as string;
      setThemeFromOptionString(value);
    }}
    placeholder="Select theme to use"
    size="small"
    value="2018-light"
  >
    {Object
      .entries(getAvailableThemes())
      .map(([key, theme]) => (
        <syn-optgroup label={`${theme.title}`} key={key}>
          {theme.modes.map(mode => (
            <syn-option value={`${theme.name}-${mode}`} key={mode}>
              {theme.title}
              -
              {mode}
            </syn-option>
          ))}
        </syn-optgroup>
      ))}
  </syn-select>
);
