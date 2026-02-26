import { html } from 'lit';

export const TagGroup = () => html`
  <syn-tag-group label="Tag Group">
    <syn-tag removable>
      <syn-icon name="wallpaper"></syn-icon>
      Option
    </syn-tag>
    <syn-tag removable>
      <syn-icon name="wallpaper"></syn-icon>
      Option
    </syn-tag>
  </syn-tag-group>
`;
