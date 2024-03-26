import {
  SynHeader,
  SynIcon,
  SynNavItem,
  SynSideNav,
} from '@synergy-design-system/react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeSwitch } from './ThemeSwitch';

export const Layout: FC = () => (
  <>
    <SynHeader>
      @synergy-design-system/react Form Demo
      {/* React does not support automatic slotting, so we have to create a slot element :( */}
      <div slot="meta-navigation" style={{ display: 'contents' }}>
        <ThemeSwitch />
      </div>
    </SynHeader>
    <div className="main">
      <SynSideNav rail>
        <SynNavItem vertical href="/">
          Home
          <SynIcon name="home" slot="prefix" />
        </SynNavItem>
        <SynNavItem vertical divider href="/contact-form">
          Contact Form
          <SynIcon name="description" slot="prefix" />
        </SynNavItem>
      </SynSideNav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  </>
);
