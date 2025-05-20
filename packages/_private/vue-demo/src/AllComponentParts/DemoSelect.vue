<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { SynVueButton, SynVueSelect, SynVueOption } from '@synergy-design-system/vue';
import { type SelectItem, mockAsyncData, mockData } from '@synergy-design-system/demo-utilities';

const levels = ref<SelectItem[]>([]);
const numericItems = mockData('selectItemsMixedId');

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

  <div>
    <SynVueSelect
      data-testid="select-805-single-select"
      help-text="Please tell us your skill level."
      label="Mixed integer and string values (Single Select)"
      :value=1
    >
      <SynVueOption v-for="item in numericItems" :value="item.id" :key="item.id"> {{ item.label }}</SynVueOption>
    </SynVueSelect>

    <SynVueSelect
      data-testid="select-805-multi-select"
      help-text="Please tell us your skill level."
      label="Mixed integer and string values (multi Select)"
      multiple
      :value="[1, 'three']"
    >
      <SynVueOption v-for="item in numericItems" :value="item.id" :key="item.id"> {{ item.label }}</SynVueOption>
    </SynVueSelect>
  </div>

  <SynVueSelect
    data-testid="select-540-delimiter"
    delimiter="|"
    help-text="This select uses a custom delimiter"
    label="Multiple with custom delimiter"
    multiple
    value="1|2"
  >
    <SynVueOption v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</SynVueOption>
  </SynVueSelect>

  <SynVueSelect
    data-testid="select-851-multiple"
    help-text="Normal value binding and async options"
    label="Multiple with async options"
    multiple
    value="1 2"
  >
    <SynVueOption v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</SynVueOption>
  </SynVueSelect>

</template>
