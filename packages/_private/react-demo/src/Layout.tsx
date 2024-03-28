import {
  SynHeader,
  SynIcon,
  SynSideNav,
} from '@synergy-design-system/react';
import {
  type FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import type { SynSideNav as SynSideNavType } from '@synergy-design-system/components';
import { RouterLink } from './RouterLink';
import { ThemeSwitch } from './ThemeSwitch';

export const Layout: FC = () => {
  const location = useLocation();
  const sideNavRef = useRef<SynSideNavType>(null);
  const [currentNavigationPath, setCurrentNavigationPath] = useState('/');

  useEffect(() => {
    setCurrentNavigationPath(location.pathname);
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
          <RouterLink vertical href="/" current={currentNavigationPath === '/'}>
            Home
            <SynIcon name="home" slot="prefix" />
          </RouterLink>
          <RouterLink vertical divider href="/contact-form" current={currentNavigationPath === '/contact-form'}>
            Contact Form
            <SynIcon name="description" slot="prefix" />
          </RouterLink>
        </SynSideNav>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
};
