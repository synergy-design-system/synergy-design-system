## Custom Validity

Use the setCustomValidity() method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.

```html
<form class="custom-validity">
  <syn-checkbox name="checked" value="on">Check me</syn-checkbox>
  <syn-button type="submit" variant="filled">Submit</syn-button>
</form>
<style>
  .custom-validity {
    display: inline-flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>

<script type="module">
  const form = document.querySelector(".custom-validity");
  const checkbox = form.querySelector("syn-checkbox");
  const errorMessage = "Don't forget to check me!";

  // Update validity on change
  checkbox.addEventListener("syn-change", () => {
    checkbox.setCustomValidity(checkbox.checked ? "" : errorMessage);
  });

  // Handle submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("All fields are valid!");
  });
</script>
```
