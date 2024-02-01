/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import {
  SynButton,
  SynCheckbox,
  SynDivider,
  SynInput,
  SynOptgroup,
  SynOption,
  SynRadio,
  SynRadioGroup,
  SynSelect,
  SynSwitch,
} from '@synergy-design-system/react';
import { Fieldset } from './Fieldset';
import { normalizeData } from './shared';
import { SynChangeEvent } from '@synergy-design-system/components';

export const App = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    code: '',
    date: '',
    email: '',
    gender: '',
    marketing: {
      angular: false,
      beta: false,
      react: false,
      standard: false,
      vanilla: false,
      vue: false,
    },
    name: '',
    password: 'abAB1234',
    phone: '',
    role: '',
    topics: '',
  });

  // This is needed, as shoelace does its event with `syn-` prefix
  // and react wont let us bind arbitary custom events :(
  useEffect(() => {
    const listener = (e: SynChangeEvent) => {
      console.log(e);
      const form = formRef.current as HTMLFormElement;

      // Log the normalized data
      console.log(normalizeData(new FormData(form)));
    };

    formRef.current?.addEventListener('syn-change', listener);
    return () => {
      formRef.current?.removeEventListener('syn-change', listener);
    };
  }, []);

  return (
    <form ref={formRef}>

      {/* PersonalInformation */}
      <Fieldset legend="Personal Information">

        <SynRadioGroup
          id="radiogroup-gender"
          name="gender"
          label="Please tell us your gender"
          required
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
          name="input-text"
          placeholder="Please insert a value for the regular text input (between 5 and 20 Characters)"
          required
          type="text"
        />

        <SynInput
          id="input-email"
          label="E-Mail"
          name="input-email"
          placeholder="Please insert your E-mail address"
          required
          type="email"
        />

        <SynInput
          id="input-phone"
          label="Phone"
          name="input-phone"
          placeholder="Please provide your phone number"
          required
          type="tel"
        />

        <SynInput
          id="input-date"
          label="Date of birth"
          name="input-date"
          placeholder="Please insert your E-mail address"
          type="date"
        />

      </Fieldset>
      {/* /PersonalInformation */}

      <SynDivider />

      {/* Security */}
      <Fieldset legend="Security">
        <SynInput
          id="input-password"
          label="Provide a secure password"
          name="input-password"
          password-toggle
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          placeholder="Please provide at least one uppercase and lowercase letter and a number"
          required
          type="password"
          value="abAB1234"
        />

        <SynInput
          id="input-number"
          label="Please provide a fallback numeric value that may be used for password recovery"
          min="1000"
          max="9999"
          name="input-number"
          placeholder="Please choose a value with four digits, e.g. 1234"
          type="number"
        />
      </Fieldset>
      {/* /Security */}

      <SynDivider />

      {/* Topics */}
      <Fieldset legend="Topics">
        <SynSelect
          clearable
          id="topics"
          label="I am interested in the following technologies"
          multiple
          name="select-topics"
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
      </Fieldset>
      {/* /Topics */}

      <SynDivider />

      {/* Marketing */}
      <Fieldset legend="Please inform me about the following technologies">
        <SynCheckbox
          id="checkbox-newsletter-default"
          name="checkbox-newsletter-default"
        >
          Please subscribe me to the synergy newsletter
        </SynCheckbox>
        <SynCheckbox
          id="checkbox-newsletter-angular"
          name="checkbox-newsletter-angular"
        >
          Please subscribe me to all things related to angular
        </SynCheckbox>
        <SynCheckbox
          id="checkbox-newsletter-react"
          name="checkbox-newsletter-react"
        >
          Please subscribe me to all things related to react
        </SynCheckbox>
        <SynCheckbox
          id="checkbox-newsletter-vanilla"
          name="checkbox-newsletter-vanilla"
        >
          Please subscribe me to all things related to vanilla.js
        </SynCheckbox>
        <SynCheckbox
          id="checkbox-newsletter-vue"
          name="checkbox-newsletter-vue"
        >
          Please subscribe me to all things related to vue
        </SynCheckbox>
        <SynSwitch
          id="checkbox-newsletter-beta"
          name="checkbox-newsletter-beta"
        >
          I am interested in the Synergy Beta Program
        </SynSwitch>
      </Fieldset>
      {/* /Marketing */}

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
