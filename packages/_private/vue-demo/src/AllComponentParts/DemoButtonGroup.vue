<script setup lang="ts">
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
    <syn-button-group label="Button Group - Default">
      <syn-button>Left</syn-button>
      <syn-button>Center (This Group will size adjust!)</syn-button>
      <syn-button>Right</syn-button>
    </syn-button-group>

    <syn-button-group
      v-for="combination in combinations"
      :key="combination.key"
      :size="combination.size"
      :variant="combination.variant"
      :label="combination.label"
    >
      <syn-button>Left</syn-button>
      <syn-button>Center</syn-button>
      <syn-button>Right</syn-button>
    </syn-button-group>
  </div>
</template>
