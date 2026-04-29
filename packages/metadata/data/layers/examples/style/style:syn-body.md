## Default

```html
<span class="syn-body--2x-small"> This is a default body text </span>
```

---

## Available Body Text

```html
<section class="body-stories-list">
  <p class="syn-body--2x-small">
    The quick brown fox jumped over the lazy dog.
  </p>
  <p class="syn-body--x-small">The quick brown fox jumped over the lazy dog.</p>
  <p class="syn-body--small">The quick brown fox jumped over the lazy dog.</p>
  <p class="syn-body--medium">The quick brown fox jumped over the lazy dog.</p>
  <p class="syn-body--large">The quick brown fox jumped over the lazy dog.</p>
</section>
<style>
  section.body-stories-list {
    display: flex;
    gap: var(--syn-spacing-medium);
    flex-direction: column;

    p {
      margin: 0;
    }
  }
</style>
```
