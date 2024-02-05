/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import {
  SynButton,
  type SynChangeEvent,
  SynCheckbox,
  SynDivider,
  SynInput,
  SynOptgroup,
  SynOption,
  SynRadio,
  SynRadioGroup,
  SynSelect,
  SynSwitch,
  SynTextarea,
} from '@synergy-design-system/react';
import { DemoFieldset } from './DemoFieldset';
import { normalizeData } from './shared';

type FormEnabledElements = HTMLElement & {
  checked?: boolean;
  name: string;
  value?: string;
};

const initialFormData = {
  code: '',
  comment: '',
  date: '',
  email: '',
  gender: '',
  name: '',
  newsletterAngular: false,
  newsletterBeta: false,
  newsletterReact: true,
  newsletterStandard: false,
  newsletterVanilla: false,
  newsletterVue: false,
  password: 'abAB1234',
  phone: '',
  role: '',
  topics: [],
};

export const DemoForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState(initialFormData);

  // This is needed, as shoelace does its event with `syn-` prefix
  // and react wont let us bind arbitary custom events :(
  useEffect(() => {
    const listener = (e: SynChangeEvent) => {
      const form = formRef.current as HTMLFormElement;

      const normalizedData = normalizeData(new FormData(form));

      // Log the normalized data
      console.log(normalizedData);

      // Set the field into state
      const element = e.target as FormEnabledElements;
      const { checked, name, value } = element;

      const finalValue = typeof checked !== 'undefined'
        ? checked
        : value;

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
          value={formData.topics.join(' ')}
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

      {/* Marketing */}
      <DemoFieldset legend="Please inform me about the following technologies">
        <SynCheckbox
          checked={formData.newsletterStandard}
          id="checkbox-newsletter-standard"
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
          label="Comment"
          name="comment"
          placeholder="Please provide additional information that might be helpful for your inquiry"
          rows={10}
        >
          {formData.comment}
        </SynTextarea>
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
