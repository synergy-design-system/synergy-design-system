## Custom Styling

Customize individual segments with itemStyle, backgroundStyle and labelTextStyle. Both backgroundStyle and itemStyle can be either set on chart or on data item level, labelTextStyle can only be set to the data item level. The chart level styling is inherited by all segments, while on the data item level it overrides the chart level styling for that specific segment.

```html
<syn-chart id="segment-styling"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#segment-styling");

  const getColor = (token) => {
    return ComponentTokens[token]["light"];
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesSegment({
        data: [
          {
            value: 60,
            itemStyle: {
              color: getColor("SynNamurErrorColor"),
            },
            label: "one",
            labelTextStyle: {
              fill: getColor("SynNamurErrorColor"),
            },
          },
          {
            value: 30,
            itemStyle: {
              color: getColor("SynNamurWarningColor"),
              borderWidth: 1,
            },
            label: "two",
            labelTextStyle: {
              fill: getColor("SynNamurWarningColor"),
            },
          },
          {
            value: 50,
            backgroundStyle: {
              color: getColor("SynColorNeutral200"),
            },
            itemStyle: {
              borderColor: getColor("SynNamurErrorColor"),
              borderWidth: 3,
              color: getColor("SynNamurSuccessColor"),
            },
            label: "three",
            labelTextStyle: {
              fill: getColor("SynNamurSuccessColor"),
              fontSize: 24,
            },
          },
        ],
        itemStyle: {
          color: getColor("SynNamurNeutralColor"),
          borderColor: getColor("SynColorNeutral950"),
          borderWidth: 1,
        },
        backgroundStyle: {
          color: getColor("SynColorNeutral100"),
        },
        labelTextStyle: {
          fontSize: 12,
        },
      });
  });
</script>
```
