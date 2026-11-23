## Showing Values

Use the default slot to show a label inside the progress ring. To display the value correctly, you should keep to a minimum width of 85 pixels.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)"
>
  <syn-progress-ring value="50" class="progress-ring-values"
    >50%</syn-progress-ring
  >
  <div style="display: flex; gap: var(--syn-spacing-x-small)">
    <syn-button variant="outline">
      <syn-icon
        name="indeterminate"
        library="system"
        label="Decrease"
      ></syn-icon>
    </syn-button>
    <syn-button variant="outline">
      <syn-icon name="add" library="system" label="Increase"></syn-icon>
    </syn-button>
  </div>
</div>

<script type="module">
  const progressRing = document.querySelector(".progress-ring-values");
  const subtractButton = progressRing.nextElementSibling.firstElementChild;
  const addButton = subtractButton.nextElementSibling;

  addButton.addEventListener("click", () => {
    const value = Math.min(100, progressRing.value + 10);
    progressRing.value = value;
    progressRing.textContent = value + "%";
  });

  subtractButton.addEventListener("click", () => {
    const value = Math.max(0, progressRing.value - 10);
    progressRing.value = value;
    progressRing.textContent = value + "%";
  });
</script>
```
