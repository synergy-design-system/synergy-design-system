<script setup lang="ts">
import { type SynDialog } from '@synergy-design-system/components';
import { SynVueDialog, SynVueButton } from '@synergy-design-system/vue';

const show = async (e: Event) => {
  const target = e.target as SynDialog;
  window.setTimeout(async () => {
    await target.show();
    console.log('show')
  }, 2000);
};
</script>
<template>
  <SynVueDialog
    open
    label="Dialog"
    @syn-after-hide="show"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <SynVueButton variant="filled" slot="footer">
      Close
    </SynVueButton>
  </SynVueDialog>
</template>
