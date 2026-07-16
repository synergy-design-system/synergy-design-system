<script setup lang="ts">
import { SynVueDialog, SynVueButton } from '@synergy-design-system/vue';
</script>
<template>
  <SynVueDialog
    :open="true"
    label="Dialog"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <SynVueButton
      @click="(e: MouseEvent) => (e.target as HTMLElement).closest('syn-dialog')?.hide()"
      variant="filled"
      slot="footer"
    >
      Close
    </SynVueButton>
  </SynVueDialog>
</template>
