<script setup lang="ts">
import type {
  SynCheckbox as SynCheckboxType,
  SynInput as SynInputType,
} from '@synergy-design-system/components';
import SynButton from './SynButton.vue';
import SynCheckbox from './SynCheckbox.vue';
import SynInput from './SynInput.vue';

// Use this to bootstrap all components.
// Will result in larger bundles, but it is nice to get started before optimizing
import '@synergy-design-system/components';
// Single imports. Use this way for smaller bundles
// import '@synergy-design-system/components/components/button/button';
import { ref } from 'vue';

const btnRef = ref<typeof SynButton>();

const formValues = ref({
  givenName: '',
  // Prefilled only to demonstrate usage of v-model and settings up stuff by hand
  surName: 'Your Surname',
  email: '',
  tos: false,
});

const errorMessage = ref('');

const result = ref('');

const submit = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  const target = e.target as HTMLFormElement;

  const isValid = target.reportValidity();

  if (!isValid) {
    errorMessage.value = 'Please fill out all required form fields!';
    result.value = '';
    return;
  }

  errorMessage.value = '';
  
  const data = [...new FormData(target)]
    .map((v) => {
      return `${v[0]}: ${v[1]}`;
    })
    .join(',\n')
    .trim();
  result.value = data;
}

const clickSynButton = (...args: unknown[]) => {
  btnRef?.value?.callClick(...args);
}

const log = (...args: unknown[]) => console.log(...args);
</script>

<template>
  <form @submit="submit">

    <p class="error" v-if="errorMessage.length > 0">
      <strong>An error happened during registration!</strong><br />
      {{ errorMessage }}
    </p>

    <p class="success" v-if="result.length > 0">
      <strong>Thank you for your registration!</strong><br />
      <pre>{{ result }}</pre>
    </p>

    <fieldset>
      <legend>Personal Information</legend>
      
      <!-- Using v-model -->
      <SynInput
        label="Given Name"
        name="givenName"
        placeholder="Please insert your given name"
        required
        v-model="formValues.givenName"
      />

      <!-- Using direct listener binding -->
      <SynInput
        label="Surname"
        :value="formValues.surName"
        @syn-input="formValues.surName = ($event.target as SynInputType)!.value"
        name="surName"
        placeholder="Please insert your surname"
        required
      />

      <!-- Using labels as slot -->
      <SynInput
        :value="formValues.email"
        @syn-input="formValues.email = ($event.target as SynInputType)!.value"
        name="email"
        placeholder="Please insert your E-Mail address"
        type="email"
      >
        <span slot="label">E-Mail <em>(optional)</em></span>
      </SynInput>
    </fieldset>

    <!--
      Uncomment to use regular binding
    <SynCheckbox
      :checked="formValues.tos"
      @syn-change="formValues.tos = ($event.target as SynCheckboxType).checked"
      required
      name="tos"
    >
      I agree to to the <strong>T</strong>erms <strong>o</strong>f <strong>S</strong>ervice
    </SynCheckbox>
    -->

    <SynCheckbox
      v-model="formValues.tos"
      required
      name="tos"
    >
      I agree to to the <strong>T</strong>erms <strong>o</strong>f <strong>S</strong>ervice
    </SynCheckbox>

    <div class="buttons">
      <SynButton
        type="submit"
        variant="filled"
        @syn-blur="log"
        @syn-focus="log"
        ref="btnRef"
      >
        <!--
          There is currently no other way to do this.
          Also, template #prefix does not work on
          web-components, so we have to rely on docs here :(.
          <span slot="prefix">prefix</span>
        -->
        Submit
      </SynButton>

      <SynButton type="reset" variant="outline">
        Reset form
      </SynButton>

      <span @click="clickSynButton">Trigger the click method of Syn Button</span>
    </div>

</form>
</template>

<style scoped>
syn-input,
syn-checkbox {
  margin-bottom: 0.75rem;
}

.buttons {
  text-align: center;
}

.error,
.success {
  border-radius: .25rem;
  margin-bottom: .5rem;
  padding: .5rem;
}

.error {
  background: var(--syn-color-error-100);
  border-color: var(--syn-color-error-950);
  color: var(--syn-color-error-950);
}

.success {
  background: var(--syn-color-success-100);
  border-color: var(--syn-color-success-950);
  color: var(--syn-color-success-950);
}
</style>