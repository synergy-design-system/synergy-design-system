<script setup lang="ts">
import { ref } from 'vue';
import {
  SynVueButton,
  SynVueCombobox,
  SynVueCheckbox,
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
  SynVueValidate,
} from '@synergy-design-system/vue';
import { highlightOptionRenderer, serialize } from '@synergy-design-system/components';
import DemoFieldset from './DemoFieldset.vue';

const nationalities: string[] = ['American', 'Australian', 'Brazilian', 'British', 'Canadian', 'Chinese', 'Dutch', 'French', 'German', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Russian', 'Spanish', 'Swedish', 'Turkish'];

const initialFormData = {
  code: '',
  comment: '',
  date: '',
  email: '',
  files: undefined,
  gender: '',
  happiness: '5',
  name: '',
  nationality: '',
  newsletterBeta: false,
  newsletterStandard: false,
  password: 'invalid',
  role: '',
};

const formData = ref({
  ...initialFormData,
});

const formRef = ref<HTMLFormElement>();

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

      <SynVueValidate variant="inline">
        <SynVueRadioGroup
          id="radiogroup-gender"
          name="gender"
          label="Please tell us your gender"
          required
          v-model="formData.gender"
        >
          <SynVueRadio value="">invalid</SynVueRadio>
          <SynVueRadio value="f">Female</SynVueRadio>
          <SynVueRadio value="m">Male</SynVueRadio>
          <SynVueRadio value="other">Other</SynVueRadio>
        </SynVueRadioGroup>
      </SynVueValidate>

      <SynVueValidate variant="inline">
        <SynVueSelect
          id="select-role"
          label="Current position"
          name="role"
          required
          v-model="formData.role"
        >
          <SynVueOption value="">---</SynVueOption>
          <SynVueOptgroup label="Developers">
            <SynVueOption value="backend">Backend Developer</SynVueOption>
            <SynVueOption value="frontend">Frontend Developer</SynVueOption>
          </SynVueOptgroup>
          <SynVueOptgroup label="Other">
            <SynVueOption value="lead">Team Lead</SynVueOption>
            <SynVueOption value="other">Other (please specify in comment section below)</SynVueOption>
          </SynVueOptgroup>
        </SynVueSelect>
      </SynVueValidate>

    
      <SynVueValidate variant="inline">
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
      </SynVueValidate>

      <SynVueValidate variant="inline" on="live">
        <SynVueInput
          id="input-email"
          label="E-Mail"
          name="email"
          placeholder="Please insert your E-mail address"
          required
          v-model="formData.email"
          type="email"
        />
      </SynVueValidate>

      <SynVueValidate variant="inline" on="input blur">
        <SynVueInput
          id="input-date"
          label="Date of birth"
          name="date"
          v-model="formData.date"
          type="date"
        />
      </SynVueValidate>

      <SynVueValidate variant="inline" on="live">
        <SynVueCombobox
          id="input-nationality"
          label="Nationality"
          name="nationality"
          required
          v-model="formData.nationality"
          ref="nationalityRef"
          :getOption="highlightOptionRenderer"
        >
          <SynVueOption v-for="nationality in nationalities" :key="nationality">
            {{ nationality }}
          </SynVueOption>
        </SynVueCombobox>
      </SynVueValidate>

    </DemoFieldset>
    <!-- /PersonalInformation -->

    <SynVueDivider />

    <!-- Security -->
    <DemoFieldset legend="Security">
      <SynVueValidate variant="inline" on="input blur">
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
      </SynVueValidate>

      <SynVueValidate variant="inline" on="input blur">
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
      </SynVueValidate>
    </DemoFieldset>
    <!-- /Security -->

    <SynVueDivider />

    <!-- Happiness -->
    <DemoFieldset id="happiness-fields" legend="Happiness">
      <SynVueValidate variant="inline" on="live">
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
          <div slot="suffix">
            <SynVueInput
              name="happiness"
              type="number"
              v-model="formData.happiness"
              size="small"
              :min=0
              :max=10
            />
          </div>
        </SynVueRange>
      </SynVueValidate>
    </DemoFieldset>
    <!-- /.Happiness -->

    <SynVueDivider />

    <!-- Marketing -->
    <DemoFieldset legend="Please inform me about the following technologies">
      <SynVueValidate variant="inline">
        <SynVueCheckbox
          id="checkbox-newsletter-default"
          name="newsletterStandard"
          v-model="formData.newsletterStandard"
          required
        >
          Please subscribe me to the synergy newsletter
        </SynVueCheckbox>
      </SynVueValidate>
      <SynVueValidate variant="inline">
        <SynVueSwitch
          id="checkbox-newsletter-beta"
          name="newsletterBeta"
          v-model="formData.newsletterBeta"
          required
        >
          I am interested in the Synergy Beta Program
        </SynVueSwitch>
      </SynVueValidate>
    </DemoFieldset>
    <!-- /Marketing -->

    <SynVueDivider />

    <!-- AdditionalInformation -->
    <DemoFieldset legend="Additional Information">
      <SynVueValidate variant="inline" on="live">
        <SynVueTextarea
          id="additional-info"
          label="Comment"
          name="comment"
          placeholder="Please provide additional information that might be helpful for your inquiry"
          required
          :rows="10"
          v-model="formData.comment"
        />
      </SynVueValidate>
      <SynVueValidate variant="inline" on="live">
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
      </SynVueValidate>
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
