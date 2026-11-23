## Footer

```html
<!-- footer -->
<style>
  .synergy-footer-demo {
    container-type: inline-size;
  }

  .footer-content {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: var(--syn-spacing-x-large);
    justify-content: space-between;
    padding: var(--syn-spacing-large) var(--syn-spacing-2x-large);
  }

  .copyright {
    font: var(--syn-body-small-bold);
    margin: 0;
  }

  @container (max-width: 640px) {
    .syn-link-list {
      flex-direction: column;
    }

    .footer-content {
      align-items: flex-start;
      flex-direction: column;
      padding: var(--syn-spacing-large) var(--syn-spacing-medium);
    }
  }
</style>
<footer class="synergy-footer-demo">
  <nav class="footer-content" aria-label="Footer navigation">
    <ul class="syn-link-list syn-link-list--small syn-link-list--horizontal">
      <li>
        <a
          class="syn-link syn-link--small syn-link--quiet"
          href="https://www.sick.com/imprint"
        >
          Imprint
        </a>
      </li>
      <li>
        <a
          class="syn-link syn-link--small syn-link--quiet"
          href="https://www.sick.com/tac"
        >
          Terms and conditions
        </a>
      </li>
      <li>
        <a
          class="syn-link syn-link--small syn-link--quiet"
          href="https://www.sick.com/terms-of-use"
        >
          Terms of use
        </a>
      </li>
      <li>
        <a
          class="syn-link syn-link--small syn-link--quiet"
          href="https://www.sick.com/dataprotection"
        >
          Privacy Policy
        </a>
      </li>
    </ul>
    <p class="copyright">© 2025 SICK AG</p>
  </nav>
</footer>
<!-- /footer -->
```
