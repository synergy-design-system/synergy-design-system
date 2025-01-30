<script setup lang="ts">
import { SynVueRadioGroup, SynVueRadio } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueRadioGroup
    help-text="This is the help-text"
    label="This is a label"
  >
    <SynVueRadio value="1">Option</SynVueRadio>
    <SynVueRadio value="2">Option</SynVueRadio>
    <SynVueRadio value="3">Option</SynVueRadio>
  </SynVueRadioGroup>
</template>
