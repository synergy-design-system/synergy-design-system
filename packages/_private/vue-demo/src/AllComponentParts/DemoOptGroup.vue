<script setup lang="ts">
import { SynVueSelect, SynVueOptgroup, SynVueOption } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueSelect>
    <SynVueOptgroup label="Section 1">
      <SynVueOption value="1">Option 1</SynVueOption>
      <SynVueOption value="2">Option 2</SynVueOption>
      <SynVueOption value="3">Option 3</SynVueOption>
    </SynVueOptgroup>

    <SynVueOptgroup label="Section 2">
      <SynVueOption value="4">Option 4</SynVueOption>
    </SynVueOptgroup>
  </SynVueSelect>
</template>
