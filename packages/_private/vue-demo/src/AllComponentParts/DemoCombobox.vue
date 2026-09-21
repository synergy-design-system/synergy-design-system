<script setup lang="ts">
import type { SynCombobox } from '@synergy-design-system/components';
import { onMounted, ref } from 'vue';
import {
  type SelectItem,
  mockAsyncData,
  mockData,
  updateComboboxRegressions1265,
} from '@synergy-design-system/demo-utilities';

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
  <syn-combobox data-testid="combobox-797" value="option-2">
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-combobox>

  <syn-combobox :value="'2'" data-testid="combobox-level-813">
    <syn-option v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</syn-option>
  </syn-combobox>

  <form>
    <syn-combobox value="option-1" data-testid="combobox-form-813">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-combobox>
    <syn-button type="reset">reset</syn-button>
  </form>

  <syn-combobox data-testid="combobox-632" label="Keyboard Interaction test #632" :value="cb632Value"
    @syn-change="(e) => cb632Value = ((e.target as SynCombobox).value.toString())">
    <syn-option value="option-1">Lorem</syn-option>
    <syn-option value="option-2">ipsum</syn-option>
    <syn-option value="option-3">dolor</syn-option>
  </syn-combobox>

  <syn-combobox data-testid="combobox-626" label="'Restricted' feature #626" restricted>
    <syn-option value="option-1">Lorem</syn-option>
    <syn-option value="option-2">ipsum</syn-option>
    <syn-option value="option-3">dolor</syn-option>
  </syn-combobox>

  <syn-combobox data-testid="combobox-626-async" label="'Restricted' feature #626 async" restricted value="3">
    <syn-option v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</syn-option>
  </syn-combobox>

  <syn-combobox data-testid="combobox-847-multiple" help-text="Normal value binding and async options"
    label="Multiple with async options" multiple value="1 2">
    <syn-option v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</syn-option>
  </syn-combobox>

  <syn-combobox data-testid="combobox-1036-subsequently-changed-delimiter" label="Subsequently changed delimiter">
    <syn-option v-for="item in delimiterItems" :value="item.value" :key="item.value"> {{ item.label }}</syn-option>
  </syn-combobox>

  <syn-combobox data-testid="combobox-1056-async-delimiter-change-with-pre-value" value="Option 2"
    label="Async changed delimiter with pre value" restricted>
    <syn-option v-for="item in delimiterItems" :value="item.value" :key="item.value"> {{ item.label }}</syn-option>
  </syn-combobox>

  <syn-combobox data-testid="combobox-1056-async-delimiter-change-with-async-pre-value" :value.prop="asyncValue"
    label="Async changed delimiter with async pre value" restricted>
    <syn-option v-for="item in delimiterItems" :value="item.value" :key="item.value"> {{ item.label }}</syn-option>
  </syn-combobox>

  <syn-combobox data-testid="combobox-627-delimiter" delimiter="+" help-text="This combobox uses a custom delimiter"
    label="Multiple with custom delimiter" multiple value="1+2">
    <syn-option v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</syn-option>
  </syn-combobox>

  <syn-combobox data-testid="combobox-805-single" help-text="Please tell us your skill level."
    label="Mixed integer and string values (Single combobox)" :value=1>
    <syn-option v-for="item in numericItems" :value="item.value" :key="item.value"> {{ item.label }}</syn-option>
  </syn-combobox>

  <syn-combobox data-testid="combobox-805-multi" help-text="Please tell us your skill level."
    label="Mixed integer and string values (multi combobox)" multiple :value="[1, 'three']">
    <syn-option v-for="item in numericItems" :value="item.value" :key="item.value"> {{ item.label }}</syn-option>
  </syn-combobox>

   <syn-combobox
    data-testid="combobox-885-value-zero-string"
    label="Combobox should allow to select value of string(zero)"
    value="0"
  >
    <syn-option value="0">Zero (string)</syn-option>
  </syn-combobox>

  <syn-combobox
    data-testid="combobox-885-value-zero-number"
    label="Combobox should allow to select value of number(zero)"
    :value.prop="0"
  >
    <syn-option :value="0">Zero (numeric)</syn-option>
  </syn-combobox>

  <syn-combobox
    data-testid="combobox-1172-readonly-combobox"
    label="Readonly Combobox"
    readonly
    value="option-1"
  >
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-combobox>

  <syn-combobox
    data-testid="combobox-1265-dynamic-option-changes"
    label="Dynamic Option Changes"
    restricted
    value="option-2"
  >
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 2</syn-option>
  </syn-combobox>

  <syn-button data-testid="combobox-1265-dynamic-option-button" @click="updateComboboxRegressions1265">
    Dynamically change option 2 to "Changed Option 2"
  </syn-button>
</template>
