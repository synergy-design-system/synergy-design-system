<script setup lang="ts">
import { SynVueValidate, SynVueInput } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueValidate eager variant="inline" on="live">
    <SynVueInput
      label="Invalid input"
      type="email"
      value=""
      required
    />
  </SynVueValidate>
</template>
