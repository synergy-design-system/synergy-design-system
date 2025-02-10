<script setup lang="ts">
import { SynVueButton } from '@synergy-design-system/vue';
</script>

<template>
  <div
    style="display: flex; gap: var(--syn-spacing-medium);"
  >
    <SynVueButton variant="filled">Filled</SynVueButton>
    <SynVueButton variant="outline">Outline</SynVueButton>
    <SynVueButton variant="text">Text</SynVueButton>
  </div>
</template>
