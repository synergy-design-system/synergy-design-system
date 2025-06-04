/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { highlightOptionRenderer, serialize } from '@synergy-design-system/components';
import { currencyNumberFormatter, mockData } from '@synergy-design-system/demo-utilities';
import type {
  SynChangeEvent,
  SynCheckbox,
  SynFile,
} from '@synergy-design-system/components';
import { DemoFieldset } from './DemoFieldset';

type FormEnabledElements = HTMLElement & {
  checked?: boolean;
  name: string;
  value?: string;
};

const initialFormData = mockData('initialFullFormData');

export const DemoForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState(initialFormData);

  // This is needed, as synergy does its event with `syn-` prefix
  // and react wont let us bind arbitrary custom events :(
  useEffect(() => {
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
        finalValue = (element as SynCheckbox).checked;
        break;
      case 'syn-file': finalValue = (element as SynFile).files; break;
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

        <syn-radio-group
          id="radiogroup-gender"
          name="gender"
          label="Please tell us your gender"
          required
          value={formData.gender}
        >
          <syn-radio value="f">Female</syn-radio>
          <syn-radio value="m">Male</syn-radio>
          <syn-radio value="other">Other</syn-radio>
        </syn-radio-group>

        <syn-select
          id="select-role"
          label="Current position"
          name="role"
          required
          value={formData.role}
        >
          <syn-optgroup label="Developers">
            <syn-option value="backend">Backend Developer</syn-option>
            <syn-option value="frontend">Frontend Developer</syn-option>
          </syn-optgroup>
          <syn-optgroup label="Other">
            <syn-option value="lead">Team Lead</syn-option>
            <syn-option value="other">Other (please specify in comment section below)</syn-option>
          </syn-optgroup>
        </syn-select>

        <syn-input
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

        <syn-input
          id="input-email"
          label="E-Mail"
          name="email"
          placeholder="Please insert your E-mail address"
          required
          value={formData.email}
          type="email"
        />

        <syn-input
          id="input-phone"
          label="Phone"
          name="phone"
          placeholder="Please provide your phone number"
          required
          value={formData.phone}
          type="tel"
        />

        <syn-input
          id="input-date"
          label="Date of birth"
          name="date"
          value={formData.date}
          type="date"
        />

        <syn-combobox
          id="input-nationality"
          label="Nationality"
          name="nationality"
          required
          value={formData.nationality}
          placeholder='Please choose your nationality'
          getOption={highlightOptionRenderer}
        >
          {mockData('nationalities').map(n => (
            <syn-option key={n}>
              {n}
            </syn-option>
          ))}
        </syn-combobox>

      </DemoFieldset>
      {/* /PersonalInformation */}

      <syn-divider />

      {/* Security */}
      <DemoFieldset legend="Security">
        <syn-input
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

        <syn-input
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

      <syn-divider />

      {/* Topics */}
      <DemoFieldset legend="Topics">
        <syn-select
          clearable
          id="topics"
          label="I am interested in the following technologies"
          multiple
          name="topics"
          value={formData.topics}
        >
          <syn-optgroup label="Frontend">
            <syn-option value="angular">Angular</syn-option>
            <syn-option value="react">React.js</syn-option>
            <syn-option value="vanilla">Vanilla.js</syn-option>
            <syn-option value="vue">Vue</syn-option>
          </syn-optgroup>
          <syn-optgroup label="Backend">
            <syn-option value="node">Node.js</syn-option>
            <syn-option value="Python">Python</syn-option>
          </syn-optgroup>
        </syn-select>
      </DemoFieldset>
      {/* /Topics */}

      <syn-divider />

      {/* Happiness */}
      <DemoFieldset id="happiness-fields" legend="Happiness">
        <syn-range
          id="happiness"
          label="How happy are you with the Synergy Design System?"
          max={10}
          min={0}
          name="happiness"
          value={formData.happiness}
        >
          <nav slot="ticks">
            <syn-range-tick>🤮</syn-range-tick>
            <syn-range-tick>🥱</syn-range-tick>
            <syn-range-tick>😍</syn-range-tick>
          </nav>
        </syn-range>

        <syn-range
          id="donations"
          label="I would donate between"
          max={6000}
          min={0}
          name="donations"
          restrict-movement
          tooltipFormatter={value => currencyNumberFormatter.format(value)}
          value={formData.donations}
        >
          <nav slot="ticks">
            <syn-range-tick>0 €</syn-range-tick>
            <syn-range-tick>6.000 €</syn-range-tick>
          </nav>
        </syn-range>

      </DemoFieldset>
      {/* /Happiness */}

      <syn-divider />

      {/* Marketing */}
      <DemoFieldset legend="Please inform me about the following technologies">
        <syn-checkbox
          checked={formData.newsletterStandard}
          id="checkbox-newsletter-default"
          name="newsletterStandard"
        >
          Please subscribe me to the synergy newsletter
        </syn-checkbox>
        <syn-checkbox
          checked={formData.newsletterAngular}
          id="checkbox-newsletter-angular"
          name="newsletterAngular"
        >
          Please subscribe me to all things related to angular
        </syn-checkbox>
        <syn-checkbox
          checked={formData.newsletterReact}
          id="checkbox-newsletter-react"
          name="newsletterReact"
        >
          Please subscribe me to all things related to react
        </syn-checkbox>
        <syn-checkbox
          checked={formData.newsletterVanilla}
          id="checkbox-newsletter-vanilla"
          name="newsletterVanilla"
        >
          Please subscribe me to all things related to vanilla.js
        </syn-checkbox>
        <syn-checkbox
          checked={formData.newsletterVue}
          id="checkbox-newsletter-vue"
          name="newsletterVue"
        >
          Please subscribe me to all things related to vue
        </syn-checkbox>
        <syn-switch
          checked={formData.newsletterBeta}
          id="checkbox-newsletter-beta"
          name="newsletterBeta"
        >
          I am interested in the Synergy Beta Program
        </syn-switch>
      </DemoFieldset>
      {/* /Marketing */}

      <syn-divider />

      { /* AdditionalInformation */ }
      <DemoFieldset legend="Additional Information">
        <syn-textarea
          id="additional-info"
          label="Comment"
          name="comment"
          placeholder="Please provide additional information that might be helpful for your inquiry"
          rows={10}
        >
          {formData.comment}
        </syn-textarea>
        <syn-file
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

      <syn-divider />

      {/* Actions */}
      <div className="syn-fieldset syn-submit-buttons">
        <syn-button variant="outline" type="reset">Reset</syn-button>
        <syn-button variant="filled" type="submit">Send</syn-button>
      </div>
      {/* /Actions */}

    </form>
  );
};
