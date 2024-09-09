/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { serialize } from '@synergy-design-system/components';
import type {
  SynCheckbox as NativeCheckbox,
  SynFile as NativeFile,
  SynChangeEvent,
  SynCombobox as SynComboboxNativeElement,
  SynRange as SynRangeNativeElement,
} from '@synergy-design-system/components';
import {
  SynButton,
  SynCheckbox,
  SynCombobox,
  SynDivider,
  SynFile,
  SynInput,
  SynOptgroup,
  SynOption,
  SynRadio,
  SynRadioGroup,
  SynRange,
  SynRangeTick,
  SynSelect,
  SynSwitch,
  SynTextarea,
} from '@synergy-design-system/react';
import { DemoFieldset } from './DemoFieldset';

type FormEnabledElements = HTMLElement & {
  checked?: boolean;
  name: string;
  value?: string;
};

const initialFormData = {
  code: '',
  comment: '',
  date: '',
  donations: '2000 4000',
  email: '',
  files: undefined,
  gender: '',
  happiness: '5',
  name: '',
  nationality: '',
  newsletterAngular: false,
  newsletterBeta: false,
  newsletterReact: false,
  newsletterStandard: false,
  newsletterVanilla: false,
  newsletterVue: false,
  password: 'invalid',
  phone: '',
  role: '',
  topics: [],
};

const nationalities: string[] = ['American', 'Australian', 'Brazilian', 'British', 'Canadian', 'Chinese', 'Dutch', 'French', 'German', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Russian', 'Spanish', 'Swedish', 'Turkish'];
const formatter = new Intl.NumberFormat('de-DE', {
  currency: 'EUR',
  maximumFractionDigits: 0,
  style: 'currency',
});

export const DemoForm = () => {
  const donationsRef = useRef<SynRangeNativeElement>(null);
  const nationalityRef = useRef<SynComboboxNativeElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState(initialFormData);

  // This is needed, as shoelace does its event with `syn-` prefix
  // and react wont let us bind arbitary custom events :(
  useEffect(() => {
    nationalityRef.current!.getOption = (option, queryString) => {
      if (queryString) {
        const mark = document.createElement('mark');
        mark.textContent = queryString;
        // eslint-disable-next-line no-param-reassign
        option.innerHTML = option.getTextLabel().replace(new RegExp(queryString, 'i'), mark.outerHTML);
      }
      return option;
    };

    // Add a custom formatter for the donation field
    donationsRef.current!.tooltipFormatter = value => formatter.format(value);

    const listener = (e: SynChangeEvent) => {
      const form = formRef.current as HTMLFormElement;

      const normalizedData = serialize(form);

      // Log the normalized data
      console.log(normalizedData);

      // Set the field into state
      const element = e.target as FormEnabledElements;
      const { name, value } = element;

      let finalValue;

      switch (element.tagName.toLocaleLowerCase()) {
      case 'syn-checkbox':
      case 'syn-switch':
        finalValue = (element as NativeCheckbox).checked;
        break;
      case 'syn-file': finalValue = (element as NativeFile).files; break;
      default: finalValue = value;
      }

      setFormData((curr) => ({
        ...curr,
        [name]: finalValue,
      }));
    };

    formRef.current?.addEventListener('syn-change', listener);
    return () => {
      formRef.current?.removeEventListener('syn-change', listener);
    };
  }, []);

  return (
    <form
      encType="multipart/form-data"
      method="post"
      onReset={() => {
        setFormData(initialFormData);
      }}
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();

        const formElement = e.target as HTMLFormElement;
        const isValid = formElement.checkValidity();

        const content = isValid
          ? 'Your data was successfully submitted'
          : 'Your data could not be submitted! Please provide all required information!';

        // eslint-disable-next-line no-alert
        alert(content);
      }}
      ref={formRef}
    >

      {/* PersonalInformation */}
      <DemoFieldset legend="Personal Information">

        <SynRadioGroup
          id="radiogroup-gender"
          name="gender"
          label="Please tell us your gender"
          required
          value={formData.gender}
        >
          <SynRadio value="f">Female</SynRadio>
          <SynRadio value="m">Male</SynRadio>
          <SynRadio value="other">Other</SynRadio>
        </SynRadioGroup>

        <SynSelect
          id="select-role"
          label="Current position"
          name="role"
          required
          value={formData.role}
        >
          <SynOptgroup label="Developers">
            <SynOption value="backend">Backend Developer</SynOption>
            <SynOption value="frontend">Frontend Developer</SynOption>
          </SynOptgroup>
          <SynOptgroup label="Other">
            <SynOption value="lead">Team Lead</SynOption>
            <SynOption value="other">Other (please specify in comment section below)</SynOption>
          </SynOptgroup>
        </SynSelect>

        <SynInput
          id="input-text"
          label="Name"
          minlength={5}
          maxlength={20}
          name="name"
          placeholder="Please insert a value for the regular text input (between 5 and 20 Characters)"
          required
          value={formData.name}
          type="text"
        />

        <SynInput
          id="input-email"
          label="E-Mail"
          name="email"
          placeholder="Please insert your E-mail address"
          required
          value={formData.email}
          type="email"
        />

        <SynInput
          id="input-phone"
          label="Phone"
          name="phone"
          placeholder="Please provide your phone number"
          required
          value={formData.phone}
          type="tel"
        />

        <SynInput
          id="input-date"
          label="Date of birth"
          name="date"
          value={formData.date}
          type="date"
        />

        <SynCombobox
          id="input-nationality"
          label="Nationality"
          name="nationality"
          required
          value={formData.nationality}
          placeholder='Please choose your nationality'
          ref={nationalityRef}
        >
          {nationalities.map(n => (
            <SynOption
              value={n}
              key={n}
            >
              {n}
            </SynOption>
          ))}
        </SynCombobox>

      </DemoFieldset>
      {/* /PersonalInformation */}

      <SynDivider />

      {/* Security */}
      <DemoFieldset legend="Security">
        <SynInput
          id="input-password"
          label="Provide a secure password"
          name="password"
          password-toggle
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          placeholder="Please provide at least one uppercase and lowercase letter and a number"
          required
          type="password"
          value={formData.password}
        />

        <SynInput
          id="input-number"
          label="Please provide a fallback numeric value that may be used for password recovery"
          min="1000"
          max="9999"
          name="code"
          placeholder="Please choose a value with four digits, e.g. 1234"
          type="number"
          value={formData.code}
        />
      </DemoFieldset>
      {/* /Security */}

      <SynDivider />

      {/* Topics */}
      <DemoFieldset legend="Topics">
        <SynSelect
          clearable
          id="topics"
          label="I am interested in the following technologies"
          multiple
          name="topics"
          value={formData.topics}
        >
          <SynOptgroup label="Frontend">
            <SynOption value="angular">Angular</SynOption>
            <SynOption value="react">React.js</SynOption>
            <SynOption value="vanilla">Vanilla.js</SynOption>
            <SynOption value="vue">Vue</SynOption>
          </SynOptgroup>
          <SynOptgroup label="Backend">
            <SynOption value="node">Node.js</SynOption>
            <SynOption value="Python">Python</SynOption>
          </SynOptgroup>
        </SynSelect>
      </DemoFieldset>
      {/* /Topics */}

      <SynDivider />

      {/* Happiness */}
      <DemoFieldset id="happiness-fields" legend="Happiness">
        <SynRange
          id="happiness"
          label="How happy are you with the Synergy Design System?"
          max={10}
          min={0}
          name="happiness"
          value={formData.happiness}
        >
          <nav slot="ticks">
            <SynRangeTick>🤮</SynRangeTick>
            <SynRangeTick>🥱</SynRangeTick>
            <SynRangeTick>😍</SynRangeTick>
          </nav>
        </SynRange>

        <SynRange
          id="donations"
          label="I would donate between"
          max={6000}
          min={0}
          name="donations"
          value={formData.donations}
          ref={donationsRef}
        >
          <nav slot="ticks">
            <SynRangeTick>0 €</SynRangeTick>
            <SynRangeTick>6.000 €</SynRangeTick>
          </nav>
        </SynRange>

      </DemoFieldset>
      {/* /Happiness */}

      <SynDivider />

      {/* Marketing */}
      <DemoFieldset legend="Please inform me about the following technologies">
        <SynCheckbox
          checked={formData.newsletterStandard}
          id="checkbox-newsletter-default"
          name="newsletterStandard"
        >
          Please subscribe me to the synergy newsletter
        </SynCheckbox>
        <SynCheckbox
          checked={formData.newsletterAngular}
          id="checkbox-newsletter-angular"
          name="newsletterAngular"
        >
          Please subscribe me to all things related to angular
        </SynCheckbox>
        <SynCheckbox
          checked={formData.newsletterReact}
          id="checkbox-newsletter-react"
          name="newsletterReact"
        >
          Please subscribe me to all things related to react
        </SynCheckbox>
        <SynCheckbox
          checked={formData.newsletterVanilla}
          id="checkbox-newsletter-vanilla"
          name="newsletterVanilla"
        >
          Please subscribe me to all things related to vanilla.js
        </SynCheckbox>
        <SynCheckbox
          checked={formData.newsletterVue}
          id="checkbox-newsletter-vue"
          name="newsletterVue"
        >
          Please subscribe me to all things related to vue
        </SynCheckbox>
        <SynSwitch
          checked={formData.newsletterBeta}
          id="checkbox-newsletter-beta"
          name="newsletterBeta"
        >
          I am interested in the Synergy Beta Program
        </SynSwitch>
      </DemoFieldset>
      {/* /Marketing */}

      <SynDivider />

      { /* AdditionalInformation */ }
      <DemoFieldset legend="Additional Information">
        <SynTextarea
          id="additional-info"
          label="Comment"
          name="comment"
          placeholder="Please provide additional information that might be helpful for your inquiry"
          rows={10}
        >
          {formData.comment}
        </SynTextarea>
        <SynFile
          accept="image/*"
          droparea
          help-text="Please upload images only"
          files={formData.files}
          id="screenshot"
          label="Optional Screenshot(s)"
          multiple
          name="files"
        />
      </DemoFieldset>

      { /* /AdditionalInformation */ }

      <SynDivider />

      {/* Actions */}
      <div className="syn-fieldset syn-submit-buttons">
        <SynButton variant="outline" type="reset">Reset</SynButton>
        <SynButton variant="filled" type="submit">Send</SynButton>
      </div>
      {/* /Actions */}

    </form>
  );
};
