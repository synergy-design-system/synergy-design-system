<script setup lang="ts">
import { ref } from 'vue';
import { serialize, highlightOptionRenderer } from '@synergy-design-system/components';
import {
  type FormStatus,
  currencyNumberFormatter,
  mockData,
  statusError,
  statusSuccess,
  statusWarning,
} from '@synergy-design-system/demo-utilities';

const nationalities = mockData('nationalities');

const testingFrameworks = mockData('testingFrameworks');

const initialFormData = mockData('initialFullFormData');

const formData = ref({
  ...initialFormData,
});

const formStatus = ref<FormStatus>(statusWarning);

const formRef = ref<HTMLFormElement>();

// Custom formatter for donations
const formatter = currencyNumberFormatter;

const reset = () => {
  formStatus.value = statusWarning;
  formData.value = {
    ...initialFormData,
  };
}

const submit = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();

  const formElement = e.target as HTMLFormElement;
  const isValid = formElement.checkValidity();

  formStatus.value = isValid ? statusSuccess : statusError;
}

const synChange = () => {
  const normalizedData = serialize(formRef.value!);

  // Log the normalized data
  console.log(normalizedData);
};
</script>

<template>
  <form
    @reset="reset"
    @submit="submit"
    @syn-change="synChange"
    v-syn-form-model="formData"
    ref="formRef"
  >

    <syn-alert
      v-if="formStatus.type !== 'warning'"
      class="form-validation-message"
      :open="true"
      :variant="formStatus.type"
    >
      <syn-icon slot="icon" :name="formStatus.icon" />
      {{ formStatus.message }}
    </syn-alert>

    <!-- PersonalInformation -->
    <syn-fieldset legend="Personal Information">

      <syn-radio-group
        id="radiogroup-gender"
        name="gender"
        label="Please tell us your gender"
        required
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
        :minlength="5"
        :maxlength="20"
        name="name"
        placeholder="Please insert a value for the regular text input (between 5 and 20 Characters)"
        required
        type="text"
      />

      <syn-input
        id="input-email"
        label="E-Mail"
        name="email"
        placeholder="Please insert your E-mail address"
        required
        type="email"
      />

      <syn-input
        id="input-phone"
        label="Phone"
        name="phone"
        placeholder="Please provide your phone number"
        required
        type="tel"
      />

      <syn-input
        id="input-date"
        label="Date of birth"
        name="date"
        type="date"
      />

      <syn-combobox
        id="input-nationality"
        label="Nationality"
        name="nationality"
        required
        :getOption="highlightOptionRenderer"
      >
        <syn-option v-for="nationality in nationalities" :key="nationality">
          {{ nationality }}
        </syn-option>
      </syn-combobox>

    </syn-fieldset>
    <!-- /PersonalInformation -->

    <syn-divider />

    <!-- Security -->
    <syn-fieldset legend="Security">
      <syn-input
        id="input-password"
        label="Provide a secure password"
        name="password"
        password-toggle
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        placeholder="Please provide at least one uppercase and lowercase letter and a number"
        required
        type="password"
        :value.prop="initialFormData.password"
        :defaultValue.prop="initialFormData.password"
      />

      <syn-input
        id="input-number"
        label="Please provide a fallback numeric value that may be used for password recovery"
        min="1000"
        max="9999"
        name="code"
        placeholder="Please choose a value with four digits, e.g. 1234"
        type="number"
      />
    </syn-fieldset>
    <!-- /Security -->

    <syn-divider />

    <!-- Topics -->
    <syn-fieldset legend="Topics">
      <syn-select
        clearable
        id="topics"
        label="I am interested in the following technologies"
        multiple
        name="topics"
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
        :getOption="highlightOptionRenderer"
        required
      >
        <syn-option v-for="framework in testingFrameworks" :key="framework.value" :value="framework.value">
          {{ framework.label }}
        </syn-option>
      </syn-combobox>
    </syn-fieldset>
    <!-- /Topics -->

    <syn-divider />

    <!-- Happiness -->
    <syn-fieldset id="happiness-fields" legend="Happiness">
      <syn-range
        id="happiness"
        label="How happy are you with the Synergy Design System?"
        :max="10"
        :min="0"
        name="happiness"
        :value.prop="initialFormData.happiness"
        :defaultValue.prop="initialFormData.happiness"
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
        :max="6000"
        :min="0"
        name="donations"
        restrict-movement
        :value.prop="initialFormData.donations"
        :defaultValue.prop="initialFormData.donations"
        :tooltipFormatter="(value: number) => formatter.format(value)"
      >
        <nav slot="ticks">
          <syn-range-tick>0 €</syn-range-tick>
          <syn-range-tick>6.000 €</syn-range-tick>
        </nav>
      </syn-range>
    </syn-fieldset>
    <!-- /.Happiness -->

    <syn-divider />

    <!-- Experience -->
    <syn-fieldset legend="Experience">
      <syn-radio-group
        id="experience"
        label="How experienced are you with the Synergy Design System?"
        name="experience"
        :value.prop="initialFormData.experience"
        :defaultValue.prop="initialFormData.experience"
      >
        <syn-radio :value.prop="0">I have never used it</syn-radio>
        <syn-radio :value.prop="1" id="experience-little">I have used it a little</syn-radio>
        <syn-radio :value.prop="2">I have used it a lot</syn-radio>
        <syn-radio :value.prop="3">I am a Synergy Design System expert</syn-radio>
        <syn-radio :value.prop="4">I am the creator of the Synergy Design System</syn-radio>
      </syn-radio-group>
    </syn-fieldset>
    <!-- /Experience -->

    <syn-divider />

    <!-- Marketing -->
    <syn-checkbox-group label="Please inform me about the following technologies">
      <syn-checkbox
        id="checkbox-newsletter-default"
        name="newsletterStandard"
      >
        Please subscribe me to the synergy newsletter
      </syn-checkbox>
      <syn-checkbox
        readonly
        id="checkbox-newsletter-ui"
        name="newsletterUI"
      >
        Please subscribe me to the synergy UI newsletter
      </syn-checkbox>

      <syn-checkbox
        id="checkbox-newsletter-angular"
        name="newsletterAngular"
      >
        Please subscribe me to all things related to angular
      </syn-checkbox>
      <syn-checkbox
        id="checkbox-newsletter-react"
        name="newsletterReact"
      >
        Please subscribe me to all things related to react
      </syn-checkbox>
      <syn-checkbox
        id="checkbox-newsletter-vanilla"
        name="newsletterVanilla"
      >
        Please subscribe me to all things related to vanilla.js
      </syn-checkbox>
      <syn-checkbox
        id="checkbox-newsletter-vue"
        name="newsletterVue"
      >
        Please subscribe me to all things related to vue
      </syn-checkbox>
      <syn-switch
        id="checkbox-newsletter-beta"
        name="newsletterBeta"
      >
        I am interested in the Synergy Beta Program
      </syn-switch>
      <syn-switch
        id="checkbox-newsletter-ux"
        name="newsletterUX"
        readonly
      >
        I am interested in the Synergy UX Program
      </syn-switch>
    </syn-checkbox-group>

    <syn-divider />

    <syn-fieldset legend="Please inform me about the following technologies">
      <syn-radio-group
        id="preferred-contact-method"
        label="Preferred contact method"
        name="preferredContactMethod"
        :value.prop="initialFormData.preferredContactMethod"
        :defaultValue.prop="initialFormData.preferredContactMethod"
      >
        <syn-radio-button value="email">E-Mail</syn-radio-button>
        <syn-radio-button value="phone" readonly>Phone</syn-radio-button>
        <syn-radio-button value="other">Other</syn-radio-button>
      </syn-radio-group>
    </syn-fieldset>
    <!-- /Marketing -->

    <syn-divider />

    <!-- AdditionalInformation -->
    <syn-fieldset legend="Additional Information">
      <syn-textarea
        id="additional-info"
        label="Comment"
        name="comment"
        placeholder="Please provide additional information that might be helpful for your inquiry"
        :rows="10"
      />
      <syn-file
        accept="image/*"
        droparea
        help-text="Please upload images only"
        id="screenshot"
        label="Optional Screenshot(s)"
        multiple
        name="files"
      />
    </syn-fieldset>
    <!-- /AdditionalInformation -->

    <syn-divider />

    <!-- Actions -->
    <div class="syn-submit-buttons">
      <syn-button variant="outline" type="reset">Reset</syn-button>
      <syn-button variant="filled" type="submit">Send</syn-button>
    </div>
    <!-- /Actions -->

  </form>
</template>


