## Min Max

Use the min and max options to define the value range for the segment chart. This is useful when values share a known scale, such as a range from 0 to 1.

```html
<syn-chart id="segment-min-max"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#segment-min-max");
  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .seriesSegment({
          top: 80,
          min: -5,
          max: 20,
          data: [
            {
              value: -1,
              name: "January",
              label: formatter.unitFormatter("°C"),
            },
            {
              value: 2,
              name: "February",
              label: formatter.unitFormatter("°C"),
            },
            { value: 5, name: "March", label: formatter.unitFormatter("°C") },
            { value: 9, name: "April", label: formatter.unitFormatter("°C") },
            { value: 14, name: "May", label: formatter.unitFormatter("°C") },
            { value: 17, name: "June", label: formatter.unitFormatter("°C") },
            { value: 19, name: "July", label: formatter.unitFormatter("°C") },
            { value: 18, name: "August", label: formatter.unitFormatter("°C") },
            {
              value: 14,
              name: "September",
              label: formatter.unitFormatter("°C"),
            },
            {
              value: 10,
              name: "October",
              label: formatter.unitFormatter("°C"),
            },
            {
              value: 5,
              name: "November",
              label: formatter.unitFormatter("°C"),
            },
            {
              value: -0.5,
              name: "December",
              label: formatter.unitFormatter("°C"),
            },
          ],
          name: "Temperature",
        })
        .legendShow();
  });
</script>
```
