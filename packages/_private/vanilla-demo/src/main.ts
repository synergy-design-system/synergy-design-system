/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import history from 'history/browser';
import {
  type SynChangeEvent,
  type SynCombobox,
  type SynNavItem,
  type SynRange,
  type SynSwitch,
} from '@synergy-design-system/components';
import '@synergy-design-system/tokens/themes/dark.css';
import '@synergy-design-system/tokens/themes/light.css';
import '@synergy-design-system/components/index.css';
import '@synergy-design-system/styles';
import './app.css';
import { serialize } from '@synergy-design-system/components';

const nationalities: string[] = ['American', 'Australian', 'Brazilian', 'British', 'Canadian', 'Chinese', 'Dutch', 'French', 'German', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Russian', 'Spanish', 'Swedish', 'Turkish'];

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

const setActiveView = (pathname: string) => {
  document.querySelectorAll<HTMLDivElement>('.router-page').forEach((item) => {
    const active = item.dataset.route === pathname;
    item.dataset.active = active ? 'true' : 'false';
  });

  document.querySelectorAll<SynNavItem>('syn-nav-item').forEach((item) => {
    const current = item.href === pathname;
    item.current = current;
  });
};

const initRouting = async () => {
  history.listen(({ location }) => {
    const { pathname } = location;
    setActiveView(pathname);
  });

  await customElements.whenDefined('syn-nav-item');
  setActiveView(history.location.pathname);

  document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('syn-side-nav');
    root?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      const clickedNavItem = (e.target as HTMLElement).closest('syn-nav-item') as SynNavItem;

      if (clickedNavItem) {
        history.push(history.createHref(clickedNavItem.href));
      }
    });
  });
};

const initThemeSwitch = async () => {
  await customElements.whenDefined('syn-switch');

  const { body } = document;
  const elm = document.querySelector<SynSwitch>('#theme-switch');
  elm?.addEventListener('syn-change', (e: SynChangeEvent) => {
    const { checked } = e.target as SynSwitch;
    const theme = checked ? 'dark' : 'light';
    body.classList.remove('syn-theme-light', 'syn-theme-dark');
    body.classList.add(`syn-theme-${theme}`);
    elm.innerHTML = elm.dataset[`theme${capitalize(theme)}`] ?? '';
  });
};

const initApp = async () => {
  await Promise.allSettled([
    customElements.whenDefined('syn-button'),
    customElements.whenDefined('syn-range'),
  ]);

  const formatter = new Intl.NumberFormat('de-DE', {
    currency: 'EUR',
    maximumFractionDigits: 0,
    style: 'currency',
  });

  // Add a custom formatter for the donation field
  document
    .querySelector<SynRange>('#donations')!
    .tooltipFormatter = value => formatter.format(value);

  const form = document.querySelector('form')!;

  form.addEventListener('syn-change', () => {
    console.log(serialize(form));
  });

  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const formElm = e.target as HTMLFormElement;
    const isValid = formElm.checkValidity();

    const content = isValid
      ? 'Your data was successfully submitted'
      : 'Your data could not be submitted! Please provide all required information!';

    // eslint-disable-next-line no-alert
    alert(content);
  });
};

const initCombobox = () => {
  const nationalitiesEl = document.querySelector<SynCombobox>('#input-nationality')!;
  nationalitiesEl.getOption = (option, query) => {
    if (query) {
      const mark = document.createElement('mark');
      mark.textContent = query;
      option.innerHTML = option.getTextLabel().replace(new RegExp(query, 'i'), mark.outerHTML);
    }
    return option;
  };
  nationalities.forEach((nationality) => {
    const option = document.createElement('syn-option');
    option.innerText = nationality;
    option.value = nationality;
    nationalitiesEl.appendChild(option);
  });
};

const bootstrap = async () => {
  await initRouting();
  await initApp();
  await initThemeSwitch();
  initCombobox();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
