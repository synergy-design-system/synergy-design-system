<script setup lang="ts">
import { SynVueChart } from '@synergy-design-system/vue/chart';
import { charts } from '@synergy-design-system/demo-utilities';
</script>

<template>
  <SynVueChart :config="charts.gaugeChartConfigCallback" />
</template>
