<script setup lang="ts">
import { SynVueSelect, SynVueOption } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueSelect label="Experience" help-text="Please tell us your skill level.">
    <SynVueOption value="1">Novice</SynVueOption>
    <SynVueOption value="2">Intermediate</SynVueOption>
    <SynVueOption value="3">Advanced</SynVueOption>
  </SynVueSelect>
</template>
