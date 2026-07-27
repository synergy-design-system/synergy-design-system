<script setup lang="ts">
import { ref } from 'vue';
import type SynInput from '@synergy-design-system/components/components/input/input.component.js';

const errorMessage = ref<string>('');
const inputRef = ref<SynInput>();

const setError = (message: string) => {
  errorMessage.value = message;
  Promise.resolve().then(() => {
    inputRef.value?.dispatchEvent(new CustomEvent('revalidate', { bubbles: true}));
  });
};

</script>

<template>
  <syn-validate eager variant="inline" on="live">
    <syn-input
      label="Invalid input"
      type="email"
      value=""
      required
    />
  </syn-validate>

  <syn-validate data-testid="validate-915" on="revalidate" variant="inline" :custom-validation-message="errorMessage">
    <syn-input
      label="Incorrect state with custom event #915" 
      @syn-change="setError('Invalid value')"
      ref="inputRef"
    />
  </syn-validate>
</template>
