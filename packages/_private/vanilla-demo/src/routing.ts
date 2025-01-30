/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createBrowserHistory } from 'history';
import type { SynNavItem } from '@synergy-design-system/components';
import { noop } from './utils.js';
import {
  afterRenderDefaultForm,
  afterRenderValidateForm,
} from './form.js';
import { afterRenderAllComponents } from './all-components.js';

const history = createBrowserHistory();

const routes = [
  {
    afterLoad: noop,
    href: '/',
    page: 'index',
  },
  {
    afterLoad: afterRenderDefaultForm,
    href: '/contact-form',
    page: 'demoform',
  },
  {
    afterLoad: afterRenderValidateForm,
    href: '/contact-form-validate',
    page: 'demoform-validate',
  },
  {
    afterLoad: afterRenderAllComponents,
    href: '/all-components',
    page: 'all-components',
  },
];

export const routeTo = async (href: string, force: boolean = false) => {
  const { pathname } = history.location;

  const route = routes.find(r => r.href === href);
  if (!route) {
    return;
  }

  // Set the active view
  document.querySelectorAll('syn-nav-item').forEach((item) => {
    const current = item.href === pathname;
    item.current = current;
  });

  // No new navigation should take place if we are on the same "page",
  // unless the user forced it.
  if (!force && pathname === href) {
    return;
  }

  const res = await fetch(`/pages/${route.page}.txt`);
  const data = await res.text();

  // Update dom
  document.querySelector('main')!.innerHTML = data;

  history.push(history.createHref(href));

  // Run the callbacks after the page was loaded
  if (route.afterLoad) {
    await route.afterLoad();
  }
};

export const initRouting = async () => {
  history.listen(({ location }) => {
    const { pathname } = location;
    routeTo(pathname).then(() => {}).catch(console.error);
  });

  await customElements.whenDefined('syn-nav-item');

  // Initialize with the home page loaded
  routeTo(history.location.pathname, true).then(() => {}).catch(console.error);

  // Safari fix: Safari is firing DOMContentLoaded waaaay faster than chrome,
  // so we register for an event that already took place.
  // This is fixed by checking the readyState of the document now.
  const onReady = () => {
    // Allow the logo to be clickable
    document.querySelector('.custom-logo')?.addEventListener('click', e => {
      e.preventDefault();
      routeTo('/').then(() => {}).catch(console.error);
    });

    // Allow the side nav to be clickable
    const root = document.querySelector('syn-side-nav');
    root?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      const clickedNavItem = (e.target as HTMLElement).closest('syn-nav-item') as SynNavItem;

      if (clickedNavItem) {
        routeTo(clickedNavItem.href).then(() => {}).catch(console.error);
      }
    });
  };

  if (document.readyState !== 'loading') {
    onReady();
  } else {
    document.addEventListener('DOMContentLoaded', onReady);
  }
};
