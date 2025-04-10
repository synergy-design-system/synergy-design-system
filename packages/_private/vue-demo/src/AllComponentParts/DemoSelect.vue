<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { SynVueButton, SynVueSelect, SynVueOption } from '@synergy-design-system/vue';
import { type SelectItem, mockAsyncData } from '@synergy-design-system/demo-utilities';
const levels = ref<SelectItem[]>([]);

onMounted(async () => {
  const items = await mockAsyncData('selectItems');
  levels.value = items;
});
</script>

<template>
  <SynVueSelect :value="'2'" data-testid="select-level-813">
    <SynVueOption v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</SynVueOption>
  </SynVueSelect>
  <form>
    <SynVueSelect value="option-1" data-testid="select-form-813">
      <SynVueOption value="option-1">Option 1</SynVueOption>
      <SynVueOption value="option-2">Option 2</SynVueOption>
      <SynVueOption value="option-3">Option 3</SynVueOption>
    </SynVueSelect>
    <SynVueButton type="reset">reset</SynVueButton>
  </form>
</template>
