<script setup lang="ts">
  import { SynVueChart } from '@synergy-design-system/vue/chart';
  import { mockData } from '@synergy-design-system/demo-utilities';
</script>

<template>
  <SynVueChart :config="mockData('lineChartConfig')" />
</template>
