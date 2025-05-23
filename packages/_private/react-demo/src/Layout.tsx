import {
  SynDivider,
  SynHeader,
  SynIcon,
  SynSideNav,
} from '@synergy-design-system/react';
import {
  type FC,
  useEffect,
  useState,
} from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { RouterLink } from './RouterLink';
import { SidenavSwitch } from './SidenavSwitch';
import { SizeSwitch } from './SizeSwitch';
import { ThemeSwitch } from './ThemeSwitch';

export const Layout: FC = () => {
  const location = useLocation();
  const [currentNavigationPath, setCurrentNavigationPath] = useState('/');

  useEffect(() => {
    setCurrentNavigationPath(location.pathname);
  }, [location]);

  return (
    <>
      <SynHeader label="@synergy-design-system/react Components Demo">
        <Link
          aria-label="Back to homepage"
          className="custom-logo"
          slot="logo"
          tabIndex={0}
          to="/"
        >
          <SynIcon name="logo-color" library="system" />
        </Link>

        <div className="meta-navigation" slot="meta-navigation">
          <SidenavSwitch />
          <syn-divider vertical />
          <SizeSwitch />
          <SynDivider vertical />
          <ThemeSwitch />
        </div>
      </SynHeader>

      <div className="main">
        <SynSideNav variant='rail'>
          <RouterLink href="/" current={currentNavigationPath === '/'}>
            Home
            <SynIcon name="home" slot="prefix" />
          </RouterLink>
          <RouterLink divider href="/contact-form" current={currentNavigationPath === '/contact-form'}>
            Contact Form
            <SynIcon name="contact_mail" slot="prefix" />
          </RouterLink>
          <RouterLink divider href="/contact-form-validate" current={currentNavigationPath === '/contact-form-validate'}>
            Contact Form (Validation)
            <SynIcon name="contact_emergency" slot="prefix" />
          </RouterLink>
          <RouterLink divider href="/all-components" current={currentNavigationPath === '/all-components'}>
            All Components
            <SynIcon name="grid_view" slot="prefix" />
          </RouterLink>
        </SynSideNav>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </>
  );
};
