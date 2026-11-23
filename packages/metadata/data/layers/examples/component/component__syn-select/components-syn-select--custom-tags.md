## Custom Tags

When multiple options can be selected, you can provide custom tags by passing a function to the getTag property. Your function can return a string of HTML, a Lit Template, or an HTMLElement. The getTag() function will be called for each option. The first argument is an <syn-option> element and the second argument is the tag’s index (its position in the tag list).Remember that custom tags are rendered in a shadow root. To style them, you can use the style attribute in your template or you can add your own parts and target them with the ::part() selector.

```html
<syn-select
  clearable=""
  id="custom-tags-story"
  multiple=""
  placeholder="Select one"
  value="phone email"
>
  <syn-option value="email">
    <syn-icon slot="prefix" name="mail_outline"></syn-icon>
    Email
  </syn-option>
  <syn-option value="phone">
    <syn-icon slot="prefix" name="phone"></syn-icon>
    Phone
  </syn-option>
  <syn-option value="chat">
    <syn-icon slot="prefix" name="chat_bubble_outline"></syn-icon>
    Chat
  </syn-option>
</syn-select>

<script type="module">
  const select = document.querySelector("#custom-tags-story");

  select.getTag = (option, index) => {
    // Use the same icon used in the <syn-option>
    const optionElement = option.querySelector('syn-icon[slot="prefix"]');

    if (!optionElement) {
      return `
      <syn-tag removable>
      ${option.getTextLabel()}
      </syn-tag>
      `;
    }

    const { name } = optionElement;

    // You can return a string, a Lit Template, or an HTMLElement here
    return `
      <syn-tag removable>
        <syn-icon name="${name}"></syn-icon>
        ${option.getTextLabel()}
      </syn-tag>
    `;
  };
</script>
```
