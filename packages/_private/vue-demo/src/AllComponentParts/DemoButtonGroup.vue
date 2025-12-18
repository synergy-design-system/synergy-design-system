<script setup lang="ts">
import { SynVueButtonGroup, SynVueButton } from '@synergy-design-system/vue';
import { computed } from 'vue';

const sizes = ['small', 'medium', 'large'] as const;
const variants = ['outline', 'filled'] as const;

const combinations = computed(() => {
  return sizes.flatMap(size =>
    variants.map(variant => ({
      size,
      variant,
      key: `${size}-${variant}`,
      label: `Button Group - Size: ${size}, Variant: ${variant}`
    }))
  );
});
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: var(--syn-spacing-medium);
    "
  >
    <SynVueButtonGroup label="Button Group - Default">
      <SynVueButton>Left</SynVueButton>
      <SynVueButton>Center (This Group will size adjust!)</SynVueButton>
      <SynVueButton>Right</SynVueButton>
    </SynVueButtonGroup>

    <SynVueButtonGroup
      v-for="combination in combinations"
      :key="combination.key"
      :size="combination.size"
      :variant="combination.variant"
      :label="combination.label"
    >
      <SynVueButton>Left</SynVueButton>
      <SynVueButton>Center</SynVueButton>
      <SynVueButton>Right</SynVueButton>
    </SynVueButtonGroup>
  </div>
</template>
