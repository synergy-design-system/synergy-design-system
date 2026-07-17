<script setup lang="ts">
import { SynVueCheckbox, SynVueCheckboxGroup } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueCheckboxGroup
    help-text="This is a checkbox group with a label and description."
    label="Checkbox Group Legend"
  >
    <SynVueCheckbox>Checkbox 1</SynVueCheckbox>
    <SynVueCheckbox>Checkbox 2</SynVueCheckbox>
    <SynVueCheckbox>Checkbox 3</SynVueCheckbox>
  </SynVueCheckboxGroup>
</template>
