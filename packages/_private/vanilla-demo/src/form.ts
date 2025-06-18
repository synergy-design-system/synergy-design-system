/* eslint-disable no-console */
import {
  type SynChangeEvent,
  type SynCombobox,
  type SynRadioGroup,
  type SynRange,
  highlightOptionRenderer,
  serialize,
} from '@synergy-design-system/components';
import { currencyNumberFormatter, mockData } from '@synergy-design-system/demo-utilities';

const initCombobox = () => {
  const nationalitiesEl = document.querySelector<SynCombobox>('#input-nationality')!;
  nationalitiesEl.getOption = highlightOptionRenderer;
  mockData('nationalities').forEach((nationality) => {
    const option = document.createElement('syn-option');
    option.innerText = nationality;
    nationalitiesEl.appendChild(option);
  });
};

const setupForm = (formSelector: string) => {
  const form = document.querySelector<HTMLFormElement>(formSelector)!;

  if (!form) {
    return;
  }

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

export const afterRenderDefaultForm = async () => {
  const mockedInitialData = mockData('initialFullFormData');

  await Promise.allSettled([
    customElements.whenDefined('syn-button'),
    customElements.whenDefined('syn-range'),
  ]);

  // Add a custom formatter for the donation field
  document
    .querySelector<SynRange>('#donations')!
    .tooltipFormatter = value => currencyNumberFormatter.format(value);

  // Prepare the value properties of all experience fields
  const experienceRadioGroup = document.querySelector<SynRadioGroup>('#experience')!;
  experienceRadioGroup
    .querySelectorAll('syn-radio')
    .forEach((radio, index) => {
      // eslint-disable-next-line no-param-reassign
      radio.value = index;
    });
  // Fake the defaultValue. As this is typed as string, we need to fake cast it.
  // Without this line, the defaultValue would be set nothing and form reset will fail :(.
  experienceRadioGroup.defaultValue = (mockedInitialData.experience as unknown as string);
  experienceRadioGroup.value = mockedInitialData.experience;

  // Add custom highlighter for the combobox
  initCombobox();

  setupForm('#form-demo');
};

export const afterRenderValidateForm = async () => {
  await Promise.allSettled([
    customElements.whenDefined('syn-button'),
    customElements.whenDefined('syn-range'),
  ]);

  // Add custom highlighter for the combobox
  initCombobox();

  // Link the happiness slider to the input field
  const slider = document.querySelector<SynRange>('#happiness')!;
  const input = slider.querySelector('syn-input')!;

  input.setAttribute('value', slider.value!);

  slider.addEventListener('syn-input', (e: SynChangeEvent) => {
    const val = (e.target as SynRange).value!;
    input.value = val;
  });

  input.addEventListener('syn-input', e => {
    const val = (e.target as HTMLInputElement).value;
    slider.value = val;
  });

  setupForm('#form-demo-validate');
};
