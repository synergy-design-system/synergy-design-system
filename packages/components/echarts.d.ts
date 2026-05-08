/**
 * TODO: Workaround for typescript errors with echarts.
 * Echarts currently does not support TypeScript's `moduleResolution: NodeNext` (https://github.com/apache/echarts/issues/19992)
 * and is incompatible with TypeScript >= 5.8 (https://github.com/apache/echarts/issues/21086).
 * Remove once echarts resolves these issues with version 6.1.0.
 */

declare module 'echarts/core.js' {
  export * from 'echarts/types/src/export/core.d.ts';
}

declare module 'echarts/renderers.js' {
  export * from 'echarts/types/src/export/renderers.d.ts';
}

declare module 'echarts/core.js' {
    export * from 'echarts/types/src/export/core.d.ts';
}
declare module 'echarts/charts.js' {
    export * from 'echarts/types/src/export/charts.d.ts';
}
declare module 'echarts/components.js' {
    export * from 'echarts/types/src/export/components.d.ts';
}
declare module 'echarts/features.js' {
    export * from 'echarts/types/src/export/features.d.ts';
}
declare module 'echarts/option.js' {
    export * from 'echarts/types/src/export/option.d.ts';
}
declare module 'echarts/renderers.js' {
    export * from 'echarts/types/src/export/renderers.d.ts';
}
declare module 'echarts/api.js' {
    export * from 'echarts/types/src/export/api.d.ts';
}
