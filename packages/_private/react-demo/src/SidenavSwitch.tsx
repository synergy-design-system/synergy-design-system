import { useEffect, useState } from 'react';
import { type SideNavTypes } from '@synergy-design-system/demo-utilities';
import { type SynSideNav } from '@synergy-design-system/components';

export const SidenavSwitch = () => {
  const [type, setType] = useState<SideNavTypes>('rail');

  useEffect(() => {
    const sideNav = document.querySelector('syn-side-nav');
    if (sideNav) {
      sideNav.variant = (type as SynSideNav['variant']);
    }
  }, [type]);

  return (
    <syn-button-group>
      <syn-tooltip content="Set sidenav to default">
        <syn-icon-button
          color={type === 'default' ? 'primary' : 'currentColor'}
          data-type="default"
          label="Set navigation to default"
          name="lunch_dining"
          size="small"
          onClick={() => setType('default')}
        />
      </syn-tooltip>
      <syn-tooltip content="Set sidenav to rail">
        <syn-icon-button
          color={type === 'rail' ? 'primary' : 'currentColor'}
          data-type="rail"
          label="Set navigation to rail"
          name="space_dashboard"
          size="small"
          onClick={() => setType('rail')}
        />
      </syn-tooltip>
      <syn-tooltip content="Set sidenav to sticky">
        <syn-icon-button
          color={type === 'sticky' ? 'primary' : 'currentColor'}
          data-type="sticky"
          label="Set navigation to sticky"
          name="preview"
          size="small"
          onClick={() => setType('sticky')}
        />
      </syn-tooltip>
    </syn-button-group>
  );
};
