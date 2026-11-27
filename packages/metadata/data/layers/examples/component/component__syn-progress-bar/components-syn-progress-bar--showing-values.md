## Showing Values

Use the default slot to show a value.

```html
<div
  style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium)"
>
  <syn-progress-bar value="60" class="progress-bar-values"
    >60%</syn-progress-bar
  >

  <div style="display: flex; gap: var(--syn-spacing-x-small)">
    <syn-button variant="outline" size="small">
      <syn-icon
        name="indeterminate"
        library="system"
        label="Decrease"
      ></syn-icon>
    </syn-button>
    <syn-button variant="outline" size="small">
      <syn-icon name="add" library="system" label="Increase"></syn-icon>
    </syn-button>
  </div>
</div>

<script type="module">
  const progressBar = document.querySelector(".progress-bar-values");
  const subtractButton = progressBar.nextElementSibling.firstElementChild;
  const addButton = subtractButton.nextElementSibling;

  addButton.addEventListener("click", () => {
    const value = Math.min(100, progressBar.value + 10);
    progressBar.value = value;
    progressBar.textContent = value + "%";
  });

  subtractButton.addEventListener("click", () => {
    const value = Math.max(0, progressBar.value - 10);
    progressBar.value = value;
    progressBar.textContent = value + "%";
  });
</script>
```
