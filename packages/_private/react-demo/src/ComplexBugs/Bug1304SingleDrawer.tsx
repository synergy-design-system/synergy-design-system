import type { SynDrawer } from '@synergy-design-system/components';
import { useRef } from 'react';

export const Bug1304SingleDrawer = () => {
  const drawerRef = useRef<SynDrawer>(null);

  const openDrawer = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    drawerRef.current?.show();
  };

  return (
    <>
      <syn-button data-testid="single-btn-1304" onClick={openDrawer}>Open Drawer</syn-button>
      <syn-drawer ref={drawerRef}>
        <div style={{ display: 'flex' }}>
          <syn-select data-testid="first"><syn-option value="1">Test 1</syn-option><syn-option value="2">Test 2</syn-option><syn-option value="3">Test 3</syn-option></syn-select>
          <syn-select data-testid="second"><syn-option value="1">Test 1</syn-option><syn-option value="2">Test 2</syn-option><syn-option value="3">Test 3</syn-option></syn-select>
          <syn-dropdown>
            <syn-button slot="trigger" caret>Dropdown</syn-button>
            <syn-menu>
              <syn-menu-item value="undo">Undo</syn-menu-item>
              <syn-menu-item>
                Find
                <syn-menu slot="submenu">
                  <syn-menu-item value="find-next">Find Previous</syn-menu-item>
                </syn-menu>
              </syn-menu-item>
            </syn-menu>
          </syn-dropdown>
        </div>
      </syn-drawer>
    </>
  );
};
