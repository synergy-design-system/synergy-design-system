## Endless Scrolling

Listen for the syn-end-reached event to load additional options from a paged or async data source as the user scrolls close to the end of the listbox. The event is only emitted once per page: it won't fire again until you append new options, so it's safe to start a new request as soon as you receive it without tracking a loading flag yourself.

```html
<syn-combobox label="Option" class="endless-scrolling-combobox">
  <syn-spinner slot="prefix" style="display: none"></syn-spinner>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-combobox>

<script type="module">
  const comboboxes = document.querySelectorAll(".endless-scrolling-combobox");
  comboboxes.forEach((combobox) => {
    const loadingIndicator = combobox.querySelector("syn-spinner");
    let nextOption = 4;
    const maxOptions = 40;
    const pageSize = 10;

    // Replace the delay and generated data with your API request. Return each page as
    // { value, label } items, using whatever page or cursor parameter your API expects.
    const fetchNextPage = async (startIndex) => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const endIndex = Math.min(startIndex + pageSize, maxOptions + 1);

      return Array.from({ length: endIndex - startIndex }, (_, offset) => {
        const index = startIndex + offset;
        return {
          label: "Option " + index,
          value: "option-" + index,
        };
      });
    };

    // This handler runs for each syn-end-reached event. Adapt the end-of-data check and
    // request parameters to your API, then map its results to options and append the page.
    const loadNextPage = async () => {
      if (nextOption > maxOptions) {
        return;
      }

      loadingIndicator.style.display = "inline-block";
      const options = await fetchNextPage(nextOption);
      const fragment = document.createDocumentFragment();

      options.forEach(({ value, label }) => {
        const option = document.createElement("syn-option");
        option.value = value;
        option.textContent = label;
        fragment.appendChild(option);
      });

      combobox.appendChild(fragment);
      nextOption += options.length;
      loadingIndicator.style.display = "none";
    };

    // The combobox re-arms the sentinel after the new options are added.
    combobox.addEventListener("syn-end-reached", loadNextPage);
  });
</script>
```
