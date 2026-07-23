## Default

```html
<span class="syn-heading--4x-large"> This is a default heading text </span>
```

---

## Available Headings

```html
<section class="heading-stories-list">
  <h6 class="syn-heading--medium">
    The quick brown fox jumped over the lazy dog.
  </h6>
  <h5 class="syn-heading--large">
    The quick brown fox jumped over the lazy dog.
  </h5>
  <h4 class="syn-heading--x-large">
    The quick brown fox jumped over the lazy dog.
  </h4>
  <h3 class="syn-heading--2x-large">
    The quick brown fox jumped over the lazy dog.
  </h3>
  <h2 class="syn-heading--3x-large">
    The quick brown fox jumped over the lazy dog.
  </h2>
  <h1 class="syn-heading--4x-large">
    The quick brown fox jumped over the lazy dog.
  </h1>
</section>
<style>
  section.heading-stories-list {
    display: flex;
    gap: var(--syn-spacing-medium);
    flex-direction: column;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
    }
  }
</style>
```
