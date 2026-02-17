/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { highlightOptionRenderer, serialize } from '@synergy-design-system/components';
import type {
  SynCheckbox as NativeCheckbox,
  SynFile as NativeFile,
  SynChangeEvent,
} from '@synergy-design-system/components';
import {
  SynAlert,
  SynButton,
  SynCheckbox,
  SynCombobox,
  SynDivider,
  SynFile,
  SynIcon,
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
  SynValidate,
} from '@synergy-design-system/react';
import {
  type FormStatus,
  mockData,
  statusError,
  statusSuccess,
  statusWarning,
} from '@synergy-design-system/demo-utilities';
import { DemoFieldset } from './DemoFieldset.js';

type FormEnabledElements = HTMLElement & {
  checked?: boolean;
  name: string;
  value?: string;
};

const initialFormData = mockData('initialValidateFormData');
const testingFrameworks = mockData('testingFrameworks');

export const DemoFormValidate = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [formStatus, setFormStatus] = useState<FormStatus>(statusWarning);

  // This is needed, as shoelace does its event with `syn-` prefix
  // and react wont let us bind arbitrary custom events :(
  useEffect(() => {
    const form = formRef.current;

    const listener = (e: SynChangeEvent) => {
      const normalizedData = serialize(form as HTMLFormElement);

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

    form?.addEventListener('syn-change', listener);
    return () => {
      form?.removeEventListener('syn-change', listener);
    };
  }, []);

  return (
    <form
      encType="multipart/form-data"
      method="post"
      onReset={() => {
        setFormStatus(statusWarning);
        setFormData(initialFormData);
      }}
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();

        const formElement = e.target as HTMLFormElement;
        const isValid = formElement.checkValidity();

        setFormStatus(isValid ? statusSuccess : statusError);
      }}
      ref={formRef}
    >

      {formStatus.type !== 'warning' && (
        <SynAlert
          className="form-validation-message"
          open
          variant={formStatus.type}
        >
          <SynIcon slot="icon" name={formStatus.icon} />
          {formStatus.message}
        </SynAlert>
      )}

      {/* PersonalInformation */}
      <DemoFieldset legend="Personal Information">

        <SynValidate variant="inline">
          <SynRadioGroup
            id="radiogroup-gender"
            name="gender"
            label="Please tell us your gender"
            required
            value={formData.gender}
          >
            <SynRadio value="">invalid</SynRadio>
            <SynRadio value="f">Female</SynRadio>
            <SynRadio value="m">Male</SynRadio>
            <SynRadio value="other">Other</SynRadio>
          </SynRadioGroup>
        </SynValidate>

        <SynValidate variant="inline">
          <SynSelect
            id="select-role"
            label="Current position"
            name="role"
            required
            value={formData.role}
          >
            <SynOption value="">---</SynOption>
            <SynOptgroup label="Developers">
              <SynOption value="backend">Backend Developer</SynOption>
              <SynOption value="frontend">Frontend Developer</SynOption>
            </SynOptgroup>
            <SynOptgroup label="Other">
              <SynOption value="lead">Team Lead</SynOption>
              <SynOption value="other">Other (please specify in comment section below)</SynOption>
            </SynOptgroup>
          </SynSelect>
        </SynValidate>

        <SynValidate variant="inline">
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
        </SynValidate>

        <SynValidate variant="inline" on="live">
          <SynInput
            id="input-email"
            label="E-Mail"
            name="email"
            placeholder="Please insert your E-mail address"
            required
            value={formData.email}
            type="email"
          />
        </SynValidate>

        <SynValidate variant="inline" on="input blur">
          <SynInput
            id="input-date"
            label="Date of birth"
            name="date"
            value={formData.date}
            type="date"
          />
        </SynValidate>

        <SynValidate variant="inline" on="input blur">
          <SynCombobox
            id="input-nationality"
            label="Nationality"
            name="nationality"
            required
            value={formData.nationality}
            placeholder='Please choose your nationality'
            getOption={highlightOptionRenderer}
          >
            {(mockData('nationalities')).map(n => (
              <SynOption key={n}>
                {n}
              </SynOption>
            ))}
          </SynCombobox>
        </SynValidate>

      </DemoFieldset>
      {/* /PersonalInformation */}

      <SynDivider />

      {/* Security */}
      <DemoFieldset legend="Security">
        <SynValidate variant="inline" on="input blur">
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
        </SynValidate>

        <SynValidate variant="inline" on="input blur">
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
        </SynValidate>
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

        <syn-combobox
          id="testing-frameworks"
          label="Which testing frameworks do you use?"
          multiple
          name="testing"
          placeholder="Select testing frameworks"
          value={formData.testing}
          getOption={highlightOptionRenderer}
          required
        >
          {testingFrameworks.map((framework) => (
            <syn-option key={framework.value} value={framework.value}>
              {framework.label}
            </syn-option>
          ))}
        </syn-combobox>
      </DemoFieldset>
      {/* /Topics */}

      <SynDivider />

      {/* Happiness */}
      <DemoFieldset id="happiness-fields" legend="Happiness">
        <SynValidate variant="inline" on="input blur">
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
            <div slot="suffix">
              <SynInput
                name="happiness"
                type="number"
                value={formData.happiness}
                size="small"
                min={0}
                max={10}
              />
            </div>
          </SynRange>
        </SynValidate>

      </DemoFieldset>
      {/* /Happiness */}

      <SynDivider />

      {/* Marketing */}
      <DemoFieldset legend="Please inform me about the following technologies">
        <SynValidate variant="inline">
          <SynCheckbox
            checked={formData.newsletterStandard}
            id="checkbox-newsletter-default"
            name="newsletterStandard"
            required
          >
            Please subscribe me to the synergy newsletter
          </SynCheckbox>
        </SynValidate>

        <SynValidate variant="inline">
          <SynSwitch
            checked={formData.newsletterBeta}
            id="checkbox-newsletter-beta"
            name="newsletterBeta"
            required
          >
            I am interested in the Synergy Beta Program
          </SynSwitch>
        </SynValidate>
      </DemoFieldset>
      {/* /Marketing */}

      <SynDivider />

      { /* AdditionalInformation */ }
      <DemoFieldset legend="Additional Information">
        <SynValidate variant="inline" on="input blur">
          <SynTextarea
            id="additional-info"
            label="Comment"
            name="comment"
            placeholder="Please provide additional information that might be helpful for your inquiry"
            required
            rows={10}
          >
            {formData.comment}
          </SynTextarea>
        </SynValidate>
        <SynValidate variant="inline" on="input blur">
          <SynFile
            accept="image/*"
            droparea
            files={formData.files}
            id="screenshot"
            label="Optional Screenshot(s)"
            multiple
            name="files"
          />
        </SynValidate>
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
