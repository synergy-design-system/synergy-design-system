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
