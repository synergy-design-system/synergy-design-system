/* eslint-disable no-console */
import {
  type SynAlert,
  type SynChangeEvent,
  type SynCombobox,
  type SynRadioGroup,
  type SynRange,
  highlightOptionRenderer,
  serialize,
} from '@synergy-design-system/components';
import {
  type FormStatus,
  currencyNumberFormatter,
  mockData,
  statusError,
  statusSuccess,
  statusWarning,
} from '@synergy-design-system/demo-utilities';

const initCombobox = () => {
  const nationalitiesEl = document.querySelector<SynCombobox>('#input-nationality')!;
  nationalitiesEl.getOption = highlightOptionRenderer;
  mockData('nationalities').forEach((nationality) => {
    const option = document.createElement('syn-option');
    option.innerText = nationality;
    nationalitiesEl.appendChild(option);
  });

  // Initialize testingFrameworks combobox if it exists
  const testingFrameworksEl = document.querySelector<SynCombobox>('#testing-frameworks')!;
  testingFrameworksEl.getOption = highlightOptionRenderer;
  mockData('testingFrameworks').forEach((framework) => {
    const option = document.createElement('syn-option');
    option.value = framework.value;
    option.innerText = framework.label;
    testingFrameworksEl.appendChild(option);
  });
};

const updateStatusMessage = (parent: HTMLElement, status: FormStatus) => {
  const statusMessage = parent.querySelector<SynAlert>('.form-validation-message')!;
  statusMessage.variant = status.type;
  statusMessage.innerHTML = `
    <syn-icon slot="icon" name="${status.icon}"></syn-icon>
    ${status.message}
  `;
  statusMessage.open = status.type !== 'warning';
};

const setupForm = (formSelector: string) => {
  const form = document.querySelector<HTMLFormElement>(formSelector)!;

  if (!form) {
    return;
  }

  updateStatusMessage(form, statusWarning);

  form.addEventListener('syn-change', () => {
    console.log(serialize(form));
  });

  form.addEventListener('reset', () => {
    updateStatusMessage(form, statusWarning);
  });

  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const formElm = e.target as HTMLFormElement;
    const isValid = formElm.checkValidity();

    console.log(serialize(form));
    updateStatusMessage(form, isValid ? statusSuccess : statusError);
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

  // Setup donations to link them to the happiness slider
  const donations = document.querySelector<SynRange>('#donations')!;
  donations.tooltipFormatter = value => currencyNumberFormatter.format(value);

  const updateDonationReadonlyState = () => {
    donations.readonly = parseInt(slider.value!, 10) <= 5;
  };

  slider.addEventListener('syn-change', updateDonationReadonlyState);
  updateDonationReadonlyState();

  setupForm('#form-demo-validate');
};
