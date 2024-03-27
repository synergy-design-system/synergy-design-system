/* eslint-disable no-param-reassign */
import {
  SynHeader,
  SynIcon,
  SynNavItem,
  SynSideNav,
} from '@synergy-design-system/react';
import { type FC, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { SynNavItem as SynNavItemTypes, SynSideNav as SynSideNavType } from '@synergy-design-system/components';
import { ThemeSwitch } from './ThemeSwitch';

export const Layout: FC = () => {
  const location = useLocation();
  const sideNavRef = useRef<SynSideNavType>(null);

  useEffect(() => {
    sideNavRef.current?.querySelectorAll('syn-nav-item').forEach((navItem: SynNavItemTypes) => {
      navItem.current = location.pathname === navItem.href;
    });
  }, [location]);
  return (
    <>
      <SynHeader>
        @synergy-design-system/react Form Demo
        {/* React does not support automatic slotting, so we have to create a slot element :( */}
        <div slot="meta-navigation" style={{ display: 'contents' }}>
          <ThemeSwitch />
        </div>
      </SynHeader>
      <div className="main">
        <SynSideNav rail ref={sideNavRef}>
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
};
