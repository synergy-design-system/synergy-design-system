<script setup lang="ts">
import { SynVueValidate, SynVueInput } from '@synergy-design-system/vue';
import { ref } from 'vue';

const errorMessage = ref<string>('');
const inputRef = ref<InstanceType<typeof SynVueInput>>();

const setError = (message: string) => {
  errorMessage.value = message;
  Promise.resolve().then(() => {
    inputRef.value?.nativeElement?.dispatchEvent(new CustomEvent('revalidate', { bubbles: true}));
  });
};

</script>

<template>
  <SynVueValidate eager variant="inline" on="live">
    <SynVueInput
      label="Invalid input"
      type="email"
      value=""
      required
    />
  </SynVueValidate>

  <SynVueValidate data-testid="validate-915" on="revalidate" variant="inline" :custom-validation-message="errorMessage">
    <SynVueInput
      label="Incorrect state with custom event #915" 
      @syn-change="setError('Invalid value')"
      ref="inputRef"
    />
  </SynVueValidate>
</template>
