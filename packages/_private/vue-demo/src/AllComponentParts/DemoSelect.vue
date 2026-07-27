<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  type SelectItem,
  mockAsyncData,
  mockData,
  updateSelectRegressions1265,
} from '@synergy-design-system/demo-utilities';

const levels = ref<SelectItem[]>([]);
const numericItems = mockData('selectItemsMixedValue');
const delimiterItems = mockData('selectItemsWithSpace');
const asyncValue = ref<string>();

onMounted(async () => {
  const items = await mockAsyncData('selectItems');
  levels.value = items;
  asyncValue.value = await mockAsyncData('valueWithSpace');
});
</script>

<template>
  <syn-select :value="'2'" data-testid="select-level-813" label="Experience" help-text="Please tell us your skill level.">
    <syn-option v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</syn-option>
  </syn-select>
  
  <form>
    <syn-select value="option-1" data-testid="select-form-813">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
    <syn-button type="reset">reset</syn-button>
  </form>

  <div>
    <syn-select
      data-testid="select-805-single-select"
      help-text="Please tell us your skill level."
      label="Mixed integer and string values (Single Select)"
      :value=1
    >
      <syn-option v-for="item in numericItems" :value="item.value" :key="item.value"> {{ item.label }}</syn-option>
    </syn-select>

    <syn-select
      data-testid="select-805-multi-select"
      help-text="Please tell us your skill level."
      label="Mixed integer and string values (multi Select)"
      multiple
      :value="[1, 'three']"
    >
      <syn-option v-for="item in numericItems" :value="item.value" :key="item.value"> {{ item.label }}</syn-option>
    </syn-select>
  </div>

  <syn-select
    data-testid="select-540-delimiter"
    delimiter="|"
    help-text="This select uses a custom delimiter"
    label="Multiple with custom delimiter"
    multiple
    value="1|2"
  >
    <syn-option v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</syn-option>
  </syn-select>

  <syn-select
    data-testid="select-847-multiple"
    help-text="Normal value binding and async options"
    label="Multiple with async options"
    multiple
    value="1 2"
  >
    <syn-option v-for="level in levels" :value="level.value" :key="level.value"> {{ level.label }}</syn-option>
  </syn-select>

  <syn-select
    data-testid="select-885-value-zero-string"
    label="Select should allow to select value of string(zero)"
    value="0"
  >
    <syn-option value="0">Zero (string)</syn-option>
  </syn-select>

  <syn-select
    data-testid="select-885-value-zero-number"
    label="Select should allow to select value of number(zero)"
    :value="0"
  >
    <syn-option :value="0">Zero (numeric)</syn-option>
  </syn-select>

  <syn-select data-testid="select-1036-subsequently-changed-delimiter" label="Subsequently changed delimiter">
    <syn-option v-for="item in delimiterItems" :value="item.value" :key="item.value"> {{ item.label }}</syn-option>
  </syn-select>

  <syn-select
    data-testid="select-1056-async-delimiter-change-with-pre-value"
    value="Option 2"
    label="Async changed delimiter with pre value"
  >
    <syn-option v-for="item in delimiterItems" :value="item.value" :key="item.value"> {{ item.label }}</syn-option>
  </syn-select>

  <syn-select
    data-testid="select-1056-async-delimiter-change-with-async-pre-value"
    :value="asyncValue"
    label="Async changed delimiter with pre value"
  >
    <syn-option v-for="item in delimiterItems" :value="item.value" :key="item.value"> {{ item.label }}</syn-option>
  </syn-select>

  <syn-select
    data-testid="select-1177-readonly-select"
    label="Readonly Select"
    readonly
    value="option-1"
  >
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 3</syn-option>
  </syn-select>

  <syn-select
    data-testid="select-1265-dynamic-option-changes"
    label="Dynamic Option Changes"
    value="option-2"
  >
    <syn-option value="option-1">Option 1</syn-option>
    <syn-option value="option-2">Option 2</syn-option>
    <syn-option value="option-3">Option 2</syn-option>
  </syn-select>

  <syn-button data-testid="select-1265-dynamic-option-button" @click="updateSelectRegressions1265">
    Dynamically change option 2 to "Changed Option 2"
  </syn-button>
</template>
