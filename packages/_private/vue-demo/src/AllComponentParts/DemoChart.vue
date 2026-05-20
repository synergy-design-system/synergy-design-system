<script setup lang="ts">
  import SynVueChart from '@synergy-design-system/vue/components/SynVueChart';
  import { mockData } from '@synergy-design-system/demo-utilities';
</script>

<template>
  <SynVueChart :option="mockData('lineChartOption')" />
</template>
