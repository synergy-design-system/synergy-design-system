
## Default

Cards can be used to group related subjects in a container.

```html
<syn-card>
  <h3>Headline</h3>
  This are some happy employees, but not just any employees. These are SICK
  employees.

  <span slot="footer"> </span>
  <footer slot="footer">
    <small>Optional information</small>
    <nav>
      <syn-button
        variant="filled"
        size="small"
        title=""
        data-optional=""
        data-valid=""
        >More Info</syn-button
      >
    </nav>
  </footer>
  <span slot="footer"> </span>
  <style slot="footer">
    syn-card {
      max-width: 400px;
    }

    syn-card footer {
      align-items: center;
      color: var(--syn-color-neutral-800);
      display: flex;
      gap: var(--syn-spacing-x-small);
    }

    syn-card h3 {
      font: var(--syn-body-medium-bold) !important;
      margin: 0 0 var(--syn-spacing-x-small) !important;
    }

    syn-card small {
      font: var(--syn-body-x-small-regular);
    }

    syn-card footer nav {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      gap: var(--syn-spacing-x-small);
      justify-content: flex-end;
    }
  </style>
  <span slot="footer"> </span>
  <img
    slot="image"
    src="https://synergy-design-system.github.io/card-example.jpg"
    alt="Multiple persons having lunch in SICK Academy"
  />
</syn-card>

```

---

## Basic Card

Basic cards aren’t very exciting, but they can display any content you want them to.

```html
<syn-card class="card-basic">
  This is just a basic card. No image, no header, and no footer. Just your
  content.
</syn-card>
<style>
  .card-basic {
    max-width: 400px;
  }
</style>

```

---

## Card With Header

Headers can be used to display titles and more.

```html
<syn-card class="card-header">
  <div slot="header">
    Header Title
    <syn-icon-button
      color="neutral"
      name="share"
      label="Share"
      size="inherit"
    ></syn-icon-button>
  </div>

  This card has a header. You can put all sorts of things in it!
</syn-card>

<style>
  .card-header {
    max-width: 400px;
  }

  .card-header [slot="header"] {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .card-header h3 {
    margin: 0;
  }

  .card-header syn-icon-button {
    font-size: var(--syn-font-size-x-large);
  }
</style>

```

---

## Card With Footer

Footers can be used to display actions, summaries, or other relevant content.

```html
<syn-card class="card-footer">
  This card has a footer. You can put all sorts of things in it!

  <footer slot="footer">
    <small>Optional information</small>
    <nav>
      <syn-button
        variant="filled"
        size="small"
        title=""
        data-optional=""
        data-valid=""
        >Preview</syn-button
      >
    </nav>
  </footer>
  <style>
    syn-card {
      max-width: 400px;
    }

    syn-card footer {
      align-items: center;
      color: var(--syn-color-neutral-800);
      display: flex;
      gap: var(--syn-spacing-x-small);
    }

    syn-card h3 {
      font: var(--syn-body-medium-bold) !important;
      margin: 0 0 var(--syn-spacing-x-small) !important;
    }

    syn-card small {
      font: var(--syn-body-x-small-regular);
    }

    syn-card footer nav {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      gap: var(--syn-spacing-x-small);
      justify-content: flex-end;
    }
  </style>
</syn-card>

<style>
  .card-footer {
    max-width: 400px;
  }
</style>

```

---

## Images

Cards accept an image slot. The image is displayed atop the card and stretches to fit.

```html
<syn-card class="card-image">
  <img
    slot="image"
    src="https://synergy-design-system.github.io/card-example.jpg"
    alt="Multiple persons having lunch in SICK Academy"
  />
  This are some happy employees, but not just any employees. These are SICK
  employees.
</syn-card>

<style>
  .card-image {
    max-width: 400px;
  }
</style>

```

---

## Sharp Card

Use the sharp variant attribute for the Card to Use a different style.

```html
<syn-card class="sharp-card" sharp="">
  <img
    slot="image"
    src="https://synergy-design-system.github.io/card-example.jpg"
    alt="Multiple persons having lunch in SICK Academy"
  />
  This are some happy employees, but not just any employees. These are SICK
  employees.
</syn-card>

<style>
  .sharp-card {
    max-width: 400px;
  }
</style>

```
