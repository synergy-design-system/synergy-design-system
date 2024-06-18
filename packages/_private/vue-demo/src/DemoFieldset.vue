<script setup lang="ts">
  defineProps<{
    legend?: string;
  }>();
</script>

<template>
  <fieldset class="syn-fieldset">
    <legend
      class="syn-legend"
      v-if="legend"
    >
      {{ legend }}
    </legend>
    <slot />
  </fieldset>
</template>

<style scoped>
.syn-legend {
  font: var(--syn-heading-large);
  margin-bottom: var(--syn-spacing-medium);
}

.syn-fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  gap: var(--syn-spacing-large);
  margin: 0 0 var(--syn-spacing-2x-large) 0;
  padding: 0;
}
</style>
