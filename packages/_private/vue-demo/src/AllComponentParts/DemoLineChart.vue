<script setup lang="ts">
import { SynVueChart } from '@synergy-design-system/vue/chart';
import { mockData } from '@synergy-design-system/demo-utilities';
import type { ChartConfigCallback } from '@synergy-design-system/components/components/chart/types.js';

const lineChartConfigObject: ChartConfigCallback = (handle) => {
  handle.baseConfig(mockData('generalChartConfig'))
    .seriesLine(mockData('lineChartSeriesData'))
    .legendShow();
};

</script>

<template>
  <SynVueChart :config="lineChartConfigObject" />
</template>
