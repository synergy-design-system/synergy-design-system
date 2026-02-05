<script setup lang="ts">
import { SynVueButton, SynVueCombobox, SynVueOption } from '@synergy-design-system/vue';
import type { SynCombobox } from '@synergy-design-system/components';
import { onMounted, ref } from 'vue';
import { type SelectItem, mockAsyncData, mockData } from '@synergy-design-system/demo-utilities';

const levels = ref<SelectItem[]>([]);
const numericItems = mockData('selectItemsMixedValue');
const cb632Value = ref<string>('');
const asyncValue = ref<string>('');
const delimiterItems = mockData('selectItemsWithSpace');

onMounted(async () => {

  const value = await mockAsyncData('valueWithSpace');
  asyncValue.value = value;
  const items = await mockAsyncData('selectItems', 10);
  levels.value = items;
});
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

  <SynVueCombobox data-testid="combobox-632" label="Keyboard Interaction test #632" :value="cb632Value"
    @syn-change="(e) => cb632Value = ((e.target as SynCombobox).value)">
    <SynVueOption value="option-1">Lorem</SynVueOption>
    <SynVueOption value="option-2">ipsum</SynVueOption>
    <SynVueOption value="option-3">dolor</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox data-testid="combobox-626" label="'Restricted' feature #626" restricted>
    <SynVueOption value="option-1">Lorem</SynVueOption>
    <SynVueOption value="option-2">ipsum</SynVueOption>
    <SynVueOption value="option-3">dolor</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox data-testid="combobox-626-async" label="'Restricted' feature #626 async" restricted value="3">
    <SynVueOption v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox data-testid="combobox-847-multiple" help-text="Normal value binding and async options"
    label="Multiple with async options" multiple value="1 2">
    <SynVueOption v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox data-testid="combobox-1036-subsequently-changed-delimiter" label="Subsequently changed delimiter">
    <SynVueOption v-for="item in delimiterItems" :value="item.value" :key="item.value"> {{ item.label }}</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox data-testid="combobox-1056-async-delimiter-change-with-pre-value" value="Option 2"
    label="Async changed delimiter with pre value" restricted>
    <SynVueOption v-for="item in delimiterItems" :value="item.value" :key="item.value"> {{ item.label }}</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox data-testid="combobox-1056-async-delimiter-change-with-async-pre-value" :value="asyncValue"
    label="Async changed delimiter with async pre value" restricted>
    <SynVueOption v-for="item in delimiterItems" :value="item.value" :key="item.value"> {{ item.label }}</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox data-testid="combobox-627-delimiter" delimiter="+" help-text="This combobox uses a custom delimiter"
    label="Multiple with custom delimiter" multiple value="1+2">
    <SynVueOption v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox data-testid="combobox-805-single" help-text="Please tell us your skill level."
    label="Mixed integer and string values (Single combobox)" :value=1>
    <SynVueOption v-for="item in numericItems" :value="item.value" :key="item.value"> {{ item.label }}</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox data-testid="combobox-805-multi" help-text="Please tell us your skill level."
    label="Mixed integer and string values (multi combobox)" multiple :value="[1, 'three']">
    <SynVueOption v-for="item in numericItems" :value="item.value" :key="item.value"> {{ item.label }}</SynVueOption>
  </SynVueCombobox>

   <SynVueCombobox
    data-testid="combobox-885-value-zero-string"
    label="Combobox should allow to select value of string(zero)"
    value="0"
  >
    <SynVueOption value="0">Zero (string)</SynVueOption>
  </SynVueCombobox>

  <SynVueCombobox
    data-testid="combobox-885-value-zero-number"
    label="Combobox should allow to select value of number(zero)"
    :value="0"
  >
    <SynVueOption :value="0">Zero (numeric)</SynVueOption>
  </SynVueCombobox>
</template>
