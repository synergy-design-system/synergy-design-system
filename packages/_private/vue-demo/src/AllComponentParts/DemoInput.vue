<script setup lang="ts">
import { SynVueInput, SynVueIcon } from '@synergy-design-system/vue';
</script>
<template>
  <SynVueInput
    placeholder="Disabled"
    help-text="Help Text"
    label="Label"
  >
    <SynVueIcon name="house" slot="prefix" />
    <SynVueIcon name="chat" slot="suffix" />
  </SynVueInput>
</template>
