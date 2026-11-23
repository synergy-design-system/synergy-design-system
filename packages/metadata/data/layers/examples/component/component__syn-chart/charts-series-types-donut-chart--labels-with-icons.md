## Labels With Icons

Use the label option to render a label for each segment, aligned by index with data. Each label is centered on its segment and placed outside the outer ring; provide a prefixIcon data URL alongside the label to render an icon before the label.

```html
<syn-chart id="donut-labels"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#donut-labels");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesDonut({
        data: [
          {
            value: 421,
            label: "Angular",
            prefixIcon:
              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTIgMkwyIDZsMS42IDEyLjlMMTIgMjJsOC40LTMuMUwyMiA2IDEyIDJ6bTAgMi4yIDcuNiAyLjctMS4yIDEwLjZMMTIgMTkuOGwtNi40LTIuM0w0LjQgNi45IDEyIDQuMnpNMTIgOWwtNCA5aDEuNmwuOC0yaDMuMmwuOCAySDE2bC00LTl6bTAgMi45IDEuMSAyLjdoLTIuMkwxMiAxMS45eiIvPjwvc3ZnPg==",
          },
          {
            value: 552,
            label: "React",
            prefixIcon:
              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMS40Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIiBmaWxsPSJjdXJyZW50Q29sb3IiIHN0cm9rZT0ibm9uZSIvPjxlbGxpcHNlIGN4PSIxMiIgY3k9IjEyIiByeD0iMTAiIHJ5PSI0LjIiLz48ZWxsaXBzZSBjeD0iMTIiIGN5PSIxMiIgcng9IjEwIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSg2MCAxMiAxMikiLz48ZWxsaXBzZSBjeD0iMTIiIGN5PSIxMiIgcng9IjEwIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjAgMTIgMTIpIi8+PC9zdmc+",
          },
          {
            value: 36,
            label: "Vue",
            prefixIcon:
              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMiAzaDQuMkwxMiAxM2w1LjgtMTBIMjJMMTIgMjEgMiAzeiIvPjxwYXRoIGQ9Ik04LjQgM2gzLjJMMTIgNS4xIDEzLjQgM2gzLjJMMTIgMTIuOSA4LjQgM3oiLz48L3N2Zz4=",
          },
        ],
      });
  });
</script>
```
