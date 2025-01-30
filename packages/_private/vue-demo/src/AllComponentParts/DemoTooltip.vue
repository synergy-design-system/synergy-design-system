<script setup lang="ts">
import { SynVueTooltip, SynVueButton } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueTooltip content="This is a tooltip" :distance=13 open>
    <SynVueButton>Hover me</SynVueButton>
  </SynVueTooltip>
</template>
