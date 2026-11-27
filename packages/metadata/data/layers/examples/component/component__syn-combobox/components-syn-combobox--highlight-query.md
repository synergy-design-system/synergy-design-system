## Highlight Query

The filtered options shown in the list can be customized by passing a function to the getOption property. Your function can return a string of HTML, a Lit Template, or an HTMLElement. The getOption() function will be called for each option. The first argument is an <syn-option> element and the second argument is the query string.Remember that the options are rendered in a shadow root. To style them, you can use the style attribute in your template or you can add your own parts and target them with the ::part() selector. Note: Be sure you trust the content you are outputting! Passing unsanitized user input to getOption() can result in XSS vulnerabilities.

```html
<syn-combobox label="Preferred color" value="g" getoption="highlight">
  <syn-option value="Black">Black</syn-option>
  <syn-option value="Blue">Blue</syn-option>
  <syn-option value="Brown">Brown</syn-option>
  <syn-option value="Green">Green</syn-option>
  <syn-option value="Grey">Grey</syn-option>
  <syn-option value="Light_Green">Light Green</syn-option>
  <syn-option value="Magenta">Magenta</syn-option>
  <syn-option value="Orange">Orange</syn-option>
  <syn-option value="Pink">Pink</syn-option>
  <syn-option value="Purple">Purple</syn-option>
  <syn-option value="Red">Red</syn-option>
  <syn-option value="White">White</syn-option>
  <syn-option value="Yellow">Yellow</syn-option>
</syn-combobox>
```
