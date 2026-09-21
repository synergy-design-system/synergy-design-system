<script setup lang="ts">
const closeDialog = (event: MouseEvent) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  target.closest('syn-dialog')?.hide();
};
</script>

<template>
  <syn-dialog
    :open="true"
    label="Dialog"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <syn-button
      @click="closeDialog"
      variant="filled"
      slot="footer"
    >
      Close
    </syn-button>
  </syn-dialog>
</template>
