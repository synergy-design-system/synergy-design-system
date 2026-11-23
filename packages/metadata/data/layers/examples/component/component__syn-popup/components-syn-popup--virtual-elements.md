## Virtual Elements

In most cases, popups are anchored to an actual element.
Sometimes, it can be useful to anchor them to a non-element.
To do this, you can pass a VirtualElement to the anchor property.
A virtual element must contain a function called getBoundingClientRect() that returns
a object as shown below.
This example anchors a popup to the mouse cursor using a virtual element.
As such, a mouse is required to properly view it.

```html
<div class="popup-virtual-element">
  <syn-popup placement="right-start">
    <div class="circle"></div>
  </syn-popup>

  <syn-switch>Highlight mouse cursor</syn-switch>
</div>

<script type="module">
  const container = document.querySelector(".popup-virtual-element");
  const popup = container.querySelector("syn-popup");
  const circle = container.querySelector(".circle");
  const enabled = container.querySelector("syn-switch");
  let clientX = 0;
  let clientY = 0;

  // Set the virtual element as a property
  popup.anchor = {
    getBoundingClientRect() {
      return {
        width: 0,
        height: 0,
        x: clientX,
        y: clientY,
        top: clientY,
        left: clientX,
        right: clientX,
        bottom: clientY,
      };
    },
  };

  // Only activate the popup when the switch is checked
  enabled.addEventListener("syn-change", () => {
    popup.active = enabled.checked;
  });

  // Listen for the mouse to move
  document.addEventListener("mousemove", handleMouseMove);

  // Update the virtual element as the mouse moves
  function handleMouseMove(event) {
    clientX = event.clientX;
    clientY = event.clientY;

    // Reposition the popup when the virtual anchor moves
    if (popup.active) {
      popup.reposition();
    }
  }
</script>

<style>
  /* If you need to set a z-index, set it on the popup part like this */
  .popup-virtual-element syn-popup::part(popup) {
    z-index: 1000;
    pointer-events: none;
  }

  .popup-virtual-element .circle {
    width: 100px;
    height: 100px;
    border: solid 4px var(--syn-color-primary-600);
    border-radius: 50%;
    translate: -50px -50px;
    animation: 1s virtual-cursor infinite;
  }

  @keyframes virtual-cursor {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.1;
    }
  }
</style>
```
