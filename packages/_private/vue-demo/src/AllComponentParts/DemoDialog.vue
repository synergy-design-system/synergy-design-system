<script setup lang="ts">
import { SynVueDialog, SynVueButton } from '@synergy-design-system/vue';
</script>
<template>
  <SynVueDialog
    :open="false"
    label="Dialog"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <SynVueButton variant="filled" slot="footer">
      Close
    </SynVueButton>
  </SynVueDialog>
</template>
