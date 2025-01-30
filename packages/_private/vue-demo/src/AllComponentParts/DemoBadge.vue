<script setup lang="ts">
import { SynVueBadge } from '@synergy-design-system/vue';
</script>

<template>
  <div
    style="display: flex; gap: var(--syn-spacing-large);"
  >
    <SynVueBadge variant="primary">primary</SynVueBadge>
    <SynVueBadge variant="success">success</SynVueBadge>
    <SynVueBadge variant="neutral">neutral</SynVueBadge>
    <SynVueBadge variant="warning">warning</SynVueBadge>
    <SynVueBadge variant="danger">danger</SynVueBadge>
  </div>
</template>
