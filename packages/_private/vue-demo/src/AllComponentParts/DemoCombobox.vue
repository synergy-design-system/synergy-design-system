<script setup lang="ts">
import { SynVueButton, SynVueCombobox, SynVueOption } from '@synergy-design-system/vue';
import type { SynCombobox } from '@synergy-design-system/components';
import { ref } from 'vue';

const levels = ref<Array<{ value: string, label: string }>>([]);

const cb632Value = ref<string>('');

setTimeout(() => {
  levels.value = [
    { label: 'Novice', value: '1' },
    { label: 'Intermediate', value: '2' },
    { label: 'Advanced', value: '3' },
  ];
}, 0);
</script>

<template>
  <SynVueCombobox data-testid="combobox-797" value="option-2">
    <SynVueOption value="option-1">Option 1</SynVueOption>
    <SynVueOption value="option-2">Option 2</SynVueOption>
    <SynVueOption value="option-3">Option 3</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox :value="'2'" data-testid="combobox-level-813">
    <SynVueOption v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</SynVueOption>
  </SynVueCombobox>
  
  <form>
    <SynVueCombobox value="option-1" data-testid="combobox-form-813">
      <SynVueOption value="option-1">Option 1</SynVueOption>
      <SynVueOption value="option-2">Option 2</SynVueOption>
      <SynVueOption value="option-3">Option 3</SynVueOption>
    </SynVueCombobox>
    <SynVueButton type="reset">reset</SynVueButton>
  </form>

  <SynVueCombobox
    data-testid="combobox-632"
    label="Keyboard Interaction test #632"
    :value="cb632Value"
    @syn-change="(e) => cb632Value = ((e.target as SynCombobox).value)"
  >
    <SynVueOption value="option-1">Lorem</SynVueOption>
    <SynVueOption value="option-2">ipsum</SynVueOption>
    <SynVueOption value="option-3">dolor</SynVueOption>
  </SynVueCombobox>

</template>
