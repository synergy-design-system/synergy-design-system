<script setup lang="ts">
import { SynVueFieldset, SynVueInput } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueFieldset
    description="This is a fieldset with a legend and description."
    legend="Fieldset Legend"
  >
    <SynVueInput label="Input 1" />
    <SynVueInput label="Input 2" />
    <SynVueInput label="Input 3" />
  </SynVueFieldset>
</template>
