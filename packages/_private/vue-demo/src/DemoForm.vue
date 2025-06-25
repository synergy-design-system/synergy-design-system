<script setup lang="ts">
import { ref } from 'vue';
import {
  SynVueButton,
  SynVueCheckbox,
  SynVueCombobox,
  SynVueDivider,
  SynVueFile,
  SynVueInput,
  SynVueOptgroup,
  SynVueOption,
  SynVueRadio,
  SynVueRange,
  SynVueRangeTick,
  SynVueRadioGroup,
  SynVueSelect,
  SynVueSwitch,
  SynVueTextarea,
} from '@synergy-design-system/vue';
import { serialize, highlightOptionRenderer } from '@synergy-design-system/components';
import { currencyNumberFormatter, mockData } from '@synergy-design-system/demo-utilities';
import DemoFieldset from './DemoFieldset.vue';

const nationalities = mockData('nationalities');

const initialFormData = mockData('initialFullFormData');

const formData = ref({
  ...initialFormData,
});

const formRef = ref<HTMLFormElement>();

// Custom formatter for donations
const formatter = currencyNumberFormatter;

const reset = () => {
  formData.value = {
    ...initialFormData,
  };
}

const submit = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();

  const formElement = e.target as HTMLFormElement;
  const isValid = formElement.checkValidity();

  if (isValid) {
    // eslint-disable-next-line no-alert
    alert('Your data was successfully submitted');
  }
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
    ref="formRef"
  >
    <!-- PersonalInformation -->
    <DemoFieldset legend="Personal Information">

      <SynVueRadioGroup
        id="radiogroup-gender"
        name="gender"
        label="Please tell us your gender"
        required
        v-model="formData.gender"
      >
        <SynVueRadio value="f">Female</SynVueRadio>
        <SynVueRadio value="m">Male</SynVueRadio>
        <SynVueRadio value="other">Other</SynVueRadio>
      </SynVueRadioGroup>

      <SynVueSelect
        id="select-role"
        label="Current position"
        name="role"
        required
        v-model="formData.role"
      >
        <SynVueOptgroup label="Developers">
          <SynVueOption value="backend">Backend Developer</SynVueOption>
          <SynVueOption value="frontend">Frontend Developer</SynVueOption>
        </SynVueOptgroup>
        <SynVueOptgroup label="Other">
          <SynVueOption value="lead">Team Lead</SynVueOption>
          <SynVueOption value="other">Other (please specify in comment section below)</SynVueOption>
        </SynVueOptgroup>
      </SynVueSelect>

      <SynVueInput
        id="input-text"
        label="Name"
        :minlength="5"
        :maxlength="20"
        name="name"
        placeholder="Please insert a value for the regular text input (between 5 and 20 Characters)"
        required
        v-model="formData.name"
        type="text"
      />

      <SynVueInput
        id="input-email"
        label="E-Mail"
        name="email"
        placeholder="Please insert your E-mail address"
        required
        v-model="formData.email"
        type="email"
      />

      <SynVueInput
        id="input-phone"
        label="Phone"
        name="phone"
        placeholder="Please provide your phone number"
        required
        v-model="formData.phone"
        type="tel"
      />

      <SynVueInput
        id="input-date"
        label="Date of birth"
        name="date"
        v-model="formData.date"
        type="date"
      />

      <SynVueCombobox
        id="input-nationality"
        label="Nationality"
        name="nationality"
        required
        v-model="formData.nationality"
        :getOption="highlightOptionRenderer"
      >
        <SynVueOption v-for="nationality in nationalities" :key="nationality">
          {{ nationality }}
        </SynVueOption>
      </SynVueCombobox>

    </DemoFieldset>
    <!-- /PersonalInformation -->

    <SynVueDivider />

    <!-- Security -->
    <DemoFieldset legend="Security">
      <SynVueInput
        id="input-password"
        label="Provide a secure password"
        name="password"
        password-toggle
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        placeholder="Please provide at least one uppercase and lowercase letter and a number"
        required
        type="password"
        v-model="formData.password"
      />

      <SynVueInput
        id="input-number"
        label="Please provide a fallback numeric value that may be used for password recovery"
        min="1000"
        max="9999"
        name="code"
        placeholder="Please choose a value with four digits, e.g. 1234"
        type="number"
        v-model="formData.code"
      />
    </DemoFieldset>
    <!-- /Security -->

    <SynVueDivider />

    <!-- Topics -->
    <DemoFieldset legend="Topics">
      <SynVueSelect
        clearable
        id="topics"
        label="I am interested in the following technologies"
        multiple
        name="topics"
        v-model="formData.topics"
      >
        <SynVueOptgroup label="Frontend">
          <SynVueOption value="angular">Angular</SynVueOption>
          <SynVueOption value="react">React.js</SynVueOption>
          <SynVueOption value="vanilla">Vanilla.js</SynVueOption>
          <SynVueOption value="vue">Vue</SynVueOption>
        </SynVueOptgroup>
        <SynVueOptgroup label="Backend">
          <SynVueOption value="node">Node.js</SynVueOption>
          <SynVueOption value="Python">Python</SynVueOption>
        </SynVueOptgroup>
      </SynVueSelect>
    </DemoFieldset>
    <!-- /Topics -->

    <SynVueDivider />

    <!-- Happiness -->
    <DemoFieldset id="happiness-fields" legend="Happiness">
      <SynVueRange
        id="happiness"
        label="How happy are you with the Synergy Design System?"
        :max="10"
        :min="0"
        name="happiness"
        v-model="formData.happiness"
      >
        <nav slot="ticks">
          <SynVueRangeTick>🤮</SynVueRangeTick>
          <SynVueRangeTick>🥱</SynVueRangeTick>
          <SynVueRangeTick>😍</SynVueRangeTick>
        </nav>
      </SynVueRange>

      <SynVueRange
        id="donations"
        label="I would donate between"
        :max="6000"
        :min="0"
        name="donations"
        v-model="formData.donations"
        restrict-movement
        :tooltipFormatter="(value: number) => formatter.format(value)"
      >
        <nav slot="ticks">
          <SynVueRangeTick>0 €</SynVueRangeTick>
          <SynVueRangeTick>6.000 €</SynVueRangeTick>
        </nav>
      </SynVueRange>
    </DemoFieldset>
    <!-- /.Happiness -->

    <SynVueDivider />

    <!-- Experience -->
    <DemoFieldset legend="Experience">
      <SynVueRadioGroup
        id="experience"
        label="How experienced are you with the Synergy Design System?"
        name="experience"
        v-model="formData.experience"
      >
        <SynVueRadio :value=0>I have never used it</SynVueRadio>
        <SynVueRadio :value=1 id="experience-little">I have used it a little</SynVueRadio>
        <SynVueRadio :value=2>I have used it a lot</SynVueRadio>
        <SynVueRadio :value=3>I am a Synergy Design System expert</SynVueRadio>
        <SynVueRadio :value=4>I am the creator of the Synergy Design System</SynVueRadio>
      </SynVueRadioGroup>
    </DemoFieldset>
    <!-- /Experience -->

    <SynVueDivider />

    <!-- Marketing -->
    <DemoFieldset legend="Please inform me about the following technologies">
      <SynVueCheckbox
        id="checkbox-newsletter-default"
        name="newsletterStandard"
        v-model="formData.newsletterStandard"
      >
        Please subscribe me to the synergy newsletter
      </SynVueCheckbox>
      <SynVueCheckbox
        id="checkbox-newsletter-angular"
        name="newsletterAngular"
        v-model="formData.newsletterAngular"
      >
        Please subscribe me to all things related to angular
      </SynVueCheckbox>
      <SynVueCheckbox
        id="checkbox-newsletter-react"
        name="newsletterReact"
        v-model="formData.newsletterReact"
      >
        Please subscribe me to all things related to react
      </SynVueCheckbox>
      <SynVueCheckbox
        id="checkbox-newsletter-vanilla"
        name="newsletterVanilla"
        v-model="formData.newsletterVanilla"
      >
        Please subscribe me to all things related to vanilla.js
      </SynVueCheckbox>
      <SynVueCheckbox
        id="checkbox-newsletter-vue"
        name="newsletterVue"
        v-model="formData.newsletterVue"
      >
        Please subscribe me to all things related to vue
      </SynVueCheckbox>
      <SynVueSwitch
        id="checkbox-newsletter-beta"
        name="newsletterBeta"
        v-model="formData.newsletterBeta"
      >
        I am interested in the Synergy Beta Program
      </SynVueSwitch>
    </DemoFieldset>
    <!-- /Marketing -->

    <SynVueDivider />

    <!-- AdditionalInformation -->
    <DemoFieldset legend="Additional Information">
      <SynVueTextarea
        id="additional-info"
        label="Comment"
        name="comment"
        placeholder="Please provide additional information that might be helpful for your inquiry"
        :rows="10"
        v-model="formData.comment"
      />
      <SynVueFile
        accept="image/*"
        droparea
        help-text="Please upload images only"
        id="screenshot"
        label="Optional Screenshot(s)"
        multiple
        name="files"
        v-model="formData.files"
      />
    </DemoFieldset>
    <!-- /AdditionalInformation -->

    <SynVueDivider />

    <!-- Actions -->
    <div class="syn-submit-buttons">
      <SynVueButton variant="outline" type="reset">Reset</SynVueButton>
      <SynVueButton variant="filled" type="submit">Send</SynVueButton>
    </div>
    <!-- /Actions -->

  </form>
</template>

<style scoped>
form syn-divider {
  --spacing: var(--syn-spacing-2x-large);
}

form .syn-fieldset:last-of-type {
  margin-bottom: 0;
}

.syn-legend {
  font-size: var(--syn-font-size-large);
  margin-bottom: var(--syn-spacing-medium);
}

.syn-submit-buttons {
  align-items: center;
  border: none;
  display: flex;
  flex-direction: row;
  gap: var(--syn-spacing-large);
  margin: 0 0 var(--syn-spacing-2x-large) 0;
  padding: 0;
  justify-content: center;
}

/* Special overrides */
#happiness-fields syn-range nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#radiogroup-gender::part(form-control-input) {
  display: flex;
  gap: var(--syn-spacing-medium);
}

#input-nationality::part(listbox) {
  max-height: min(var(--auto-size-available-height), 300px);
}
</style>
