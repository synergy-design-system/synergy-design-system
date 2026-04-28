## Single Instance

This example demonstrates the usage of a single instance of the <syn-tooltip> component. The tooltip is triggered by hovering over the info icon.

```html
<section>
  <article>
    <h2>Single instance tooltips</h2>
    <p>
      By default, you will have to wrap each element that needs a tooltip with a
      separate
      <code data-tooltip="something is in there">&lt;syn-tooltip&gt;</code>
      component. However, you may want to use a single tooltip instance for
      multiple elements. You can do so by using the <code>anchor</code> private
      attribute on any element that should trigger a tooltip and setup event
      listeners to update the tooltip content and anchor based on user
      interactions. The content of the tooltip will be taken from the value of
      the
      <code
        data-tooltip="This is just an example. You may draw the content from any attribute or property of the element."
        >data-tooltip</code
      >
      attribute. Have a look at this stories source code for an example of how
      to set this up. This can be added to any element, including those added
      dynamically after the initial setup.
    </p>

    <div style="display: flex; gap: 16px; flex-wrap: wrap">
      <syn-button
        data-tooltip="This will add a new button to the story. The new button will have a dynamically generated Tooltip"
        >Add a new button dynamically</syn-button
      >
      <syn-input
        data-tooltip="Custom Tooltip"
        placeholder="Hover me too"
      ></syn-input>
    </div>
  </article>
</section>

<!-- Global Tooltip instance. Make sure that it has trigger="manual" set. -->
<syn-tooltip id="global-tooltip" trigger="manual"></syn-tooltip>

<style>
  [data-tooltip] {
    cursor: help;
    text-decoration: underline dotted;
  }
</style>

<script type="module">
  /**
   * Installs singleton tooltip behavior for all descendants that use [data-tooltip].
   *
   * Why this utility is async:
   * - It can be called immediately, even before custom elements are fully defined.
   * - It waits for the tooltip component to become ready and only then binds listeners.
   *
   * Why there are multiple listeners:
   * - mouseover (capture): detects entering any current or future [data-tooltip] trigger.
   * - mouseout (capture): detects leaving the current trigger to hide or switch anchor.
   * - syn-after-show / syn-after-hide: serializes transitions to avoid open/close races.
   *
   * @param {HTMLElement} tooltipElement A <syn-tooltip trigger="manual"> instance.
   * @param {ParentNode} root Event delegation root. Defaults to document.
   * @returns {Promise<() => void>} Cleanup function that removes all listeners.
   */
  const setupTooltip = async (tooltipElement, root = document) => {
    if (!(tooltipElement instanceof HTMLElement)) {
      throw new TypeError("setupTooltip requires a tooltip DOM node.");
    }

    const cleanupKey = "__synSingletonTooltipCleanup__";
    if (typeof tooltipElement[cleanupKey] === "function") {
      tooltipElement[cleanupKey]();
    }

    await customElements.whenDefined("syn-tooltip");
    await tooltipElement.updateComplete;

    const delegatedRoot = root ?? document;
    let requestedAnchor = null;
    let transitionInFlight = false;

    const getTooltipTarget = (node) => {
      if (!(node instanceof Element)) {
        return null;
      }

      return node.closest("[data-tooltip]");
    };

    const getTooltipContent = (element) =>
      element.getAttribute("data-tooltip")?.trim() ?? "";

    const isSyncNeeded = () => {
      const currentAnchor =
        tooltipElement.anchor instanceof HTMLElement
          ? tooltipElement.anchor
          : null;

      if (requestedAnchor) {
        const nextContent = getTooltipContent(requestedAnchor);
        if (nextContent === "") {
          return tooltipElement.open;
        }

        return (
          !tooltipElement.open ||
          currentAnchor !== requestedAnchor ||
          tooltipElement.content !== nextContent
        );
      }

      return tooltipElement.open;
    };

    const syncTooltipState = () => {
      if (transitionInFlight) {
        return;
      }

      const currentAnchor =
        tooltipElement.anchor instanceof HTMLElement
          ? tooltipElement.anchor
          : null;

      if (requestedAnchor) {
        const nextContent = getTooltipContent(requestedAnchor);

        if (nextContent === "") {
          requestedAnchor = null;
        } else if (tooltipElement.open && currentAnchor !== requestedAnchor) {
          transitionInFlight = true;
          tooltipElement.open = false;
          return;
        } else {
          tooltipElement.content = nextContent;
          tooltipElement.anchor = requestedAnchor;

          if (!tooltipElement.open) {
            transitionInFlight = true;
            tooltipElement.open = true;
          }

          return;
        }
      }

      if (tooltipElement.open) {
        transitionInFlight = true;
        tooltipElement.open = false;
      }
    };

    const handleAfterShow = () => {
      transitionInFlight = false;
      if (isSyncNeeded()) {
        syncTooltipState();
      }
    };

    const handleAfterHide = () => {
      transitionInFlight = false;
      if (isSyncNeeded()) {
        syncTooltipState();
      }
    };

    const handleMouseOver = (event) => {
      const target = getTooltipTarget(event.target);
      const relatedTarget = getTooltipTarget(event.relatedTarget);

      if (!(target instanceof HTMLElement) || target === relatedTarget) {
        return;
      }

      if (getTooltipContent(target) === "") {
        return;
      }

      requestedAnchor = target;
      syncTooltipState();
    };

    const handleMouseOut = (event) => {
      const target = getTooltipTarget(event.target);
      const relatedTarget = getTooltipTarget(event.relatedTarget);

      if (
        !(target instanceof HTMLElement) ||
        target === relatedTarget ||
        requestedAnchor !== target
      ) {
        return;
      }

      requestedAnchor =
        relatedTarget instanceof HTMLElement ? relatedTarget : null;
      syncTooltipState();
    };

    tooltipElement.addEventListener("syn-after-show", handleAfterShow);
    tooltipElement.addEventListener("syn-after-hide", handleAfterHide);
    delegatedRoot.addEventListener("mouseover", handleMouseOver, true);
    delegatedRoot.addEventListener("mouseout", handleMouseOut, true);

    const cleanup = () => {
      tooltipElement.removeEventListener("syn-after-show", handleAfterShow);
      tooltipElement.removeEventListener("syn-after-hide", handleAfterHide);
      delegatedRoot.removeEventListener("mouseover", handleMouseOver, true);
      delegatedRoot.removeEventListener("mouseout", handleMouseOut, true);
      if (tooltipElement.open) {
        tooltipElement.open = false;
      }
    };

    tooltipElement[cleanupKey] = cleanup;
    return cleanup;
  };

  const globalTooltip = document.getElementById("global-tooltip");
  if (globalTooltip instanceof HTMLElement) {
    setupTooltip(globalTooltip).catch((error) => {
      console.error("Failed to initialize singleton tooltip setup.", error);
    });
  }

  // Demo-only dynamic content. This is intentionally outside setupTooltip.
  let cnt = 0;

  const demoButton = document.querySelector("syn-button");
  const demoContainer = document.querySelector("article");
  if (
    demoButton instanceof HTMLElement &&
    demoContainer instanceof HTMLElement
  ) {
    demoButton.addEventListener("click", () => {
      cnt = cnt + 1;
      const newElement = document.createElement("syn-button");
      newElement.textContent = "Dynamic Button#" + cnt;
      newElement.setAttribute(
        "data-tooltip",
        "Tooltip for dynamic button#" + cnt,
      );
      demoContainer.appendChild(newElement);
    });
  }
</script>
```
