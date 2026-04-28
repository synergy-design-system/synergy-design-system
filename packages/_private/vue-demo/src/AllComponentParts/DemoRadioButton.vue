<script setup lang="ts">
import { SynVueRadioButton, SynVueRadioGroup } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueRadioGroup
    help-text="This is the help-text"
    label="This is a label"
  >
    <SynVueRadioButton value="1">Option 1</SynVueRadioButton>
    <SynVueRadioButton value="2">Option 2</SynVueRadioButton>
    <SynVueRadioButton value="3">Option 3</SynVueRadioButton>
  </SynVueRadioGroup>
</template>
