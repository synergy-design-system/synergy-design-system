/* eslint-disable no-console */
import type { SynChangeEvent, SynSwitch } from '@synergy-design-system/components';
import '@synergy-design-system/styles';
import './app.css';
import '@synergy-design-system/components';

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

// We have to adjust the original form data
// so it is possible to send multiple values
// This prevents errors with select[multiple]
// that will send all three selected elements
// in form-data with the same name.
// This will make sure multiple uses "," as separator for multi values
const normalizeData = (data: FormData) => Array
  .from(data)
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  .map(([key, value]) => [key, value.toString()])
  .reduce((prev, curr) => {
    const [currKey, currVal] = curr;
    const finalValue = typeof prev[currKey] !== 'undefined'
      ? `${prev[currKey]},${currVal}`
      : currVal;

    return {
      ...prev,
      [currKey]: finalValue,
    };
  }, {} as Record<string, string>);

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
  await customElements.whenDefined('syn-button');

  const form = document.querySelector('form')!;

  form.addEventListener('syn-change', () => {
    console.log(normalizeData(new FormData(form)));
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

await initApp();
await initThemeSwitch();
