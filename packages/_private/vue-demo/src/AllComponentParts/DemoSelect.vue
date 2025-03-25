<script setup lang="ts">
import { SynVueButton, SynVueSelect, SynVueOption } from '@synergy-design-system/vue';
import { ref } from 'vue';
const levels = ref<Array<{ value: string, label: string }>>([]);

setTimeout(() => {
  levels.value = [
    { label: 'Novice', value: '1' },
    { label: 'Intermediate', value: '2' },
    { label: 'Advanced', value: '3' },
  ];
}, 0);
</script>

<template>
  <SynVueSelect :value="'2'" id="level">
    <SynVueOption v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</SynVueOption>
  </SynVueSelect>
  <form>
    <SynVueSelect value="option-1" id="form">
      <SynVueOption value="option-1">Option 1</SynVueOption>
      <SynVueOption value="option-2">Option 2</SynVueOption>
      <SynVueOption value="option-3">Option 3</SynVueOption>
    </SynVueSelect>
    <SynVueButton type="reset">reset</SynVueButton>
  </form>
</template>
