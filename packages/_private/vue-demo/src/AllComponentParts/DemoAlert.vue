<script setup lang="ts">
import { SynVueAlert, SynVueIcon } from '@synergy-design-system/vue';
</script>

<template>
  <div
    style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium);"
  >
    <SynVueAlert variant="primary" open>
      <SynVueIcon slot="icon" name="info" />
      <strong>This is super informative</strong>
      <br />
      You can tell by how pretty the alert is.
    </SynVueAlert>

    <SynVueAlert variant="success" open>
      <SynVueIcon slot="icon" name="check_circle" />
      <strong>Your changes have been saved</strong>
      <br />
      You can safely exit the app now.
    </SynVueAlert>

    <SynVueAlert variant="neutral" open>
      <SynVueIcon slot="icon" name="settings" />
      <strong>Your settings have been updated</strong>
      <br />
      Settings will take effect on next login.
    </SynVueAlert>

    <SynVueAlert variant="warning" open>
      <SynVueIcon slot="icon" name="warning" />
      <strong>Your session has ended</strong>
      <br />
      Please login again to continue.
    </SynVueAlert>

    <SynVueAlert variant="danger" open>
      <SynVueIcon slot="icon" name="error" />
      <strong>Your account has been deleted</strong>
      <br />
      We&apos;re very sorry to see you go!
    </SynVueAlert>
  </div>
</template>
