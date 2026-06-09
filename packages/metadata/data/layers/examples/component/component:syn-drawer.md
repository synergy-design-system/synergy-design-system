## Default

Drawers slide in from a container to expose additional options and information.

```html
<syn-drawer open="" label="Drawer">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <span slot="footer"> </span>
  <syn-button class="close-icon" slot="footer" variant="filled"
    >Close</syn-button
  >
  <span slot="footer"> </span>
  <script slot="footer">
    document.querySelector(".close-icon").addEventListener("click", (e) => {
      e.target.closest("syn-drawer").hide();
    });
  </script>
  <span slot="footer"> </span>
</syn-drawer>

<syn-button class="drawer-default-story-opener">Open Drawer</syn-button>
<script type="module">
  const openButtons = document.querySelectorAll(".drawer-default-story-opener");

  // Make sure to add each event only once!
  Array.from(openButtons).forEach((btn) => {
    if (!btn.classList.contains("story-loaded")) {
      const drawer = btn.parentElement.querySelector("syn-drawer");
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');

      btn.addEventListener("click", () => drawer.show());
      closeButton.addEventListener("click", () => drawer.hide());

      btn.classList.add("story-loaded");
    }
  });
</script>
```

---

## Slide In From Start

By default, drawers slide in from the end. To make the drawer slide in from the start, set the placement attribute to start.

```html
<syn-drawer
  label="Drawer"
  open=""
  placement="start"
  class="drawer-placement-start"
>
  This drawer slides in from the start.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-placement-start");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```

---

## Slide In From Top

To make the drawer slide in from the top, set the placement attribute to top.

```html
<syn-drawer label="Drawer" open="" placement="top" class="drawer-placement-top">
  This drawer slides in from the top.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-placement-top");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```

---

## Slide In From Bottom

To make the drawer slide in from the bottom, set the placement attribute to bottom.

```html
<syn-drawer
  label="Drawer"
  open=""
  placement="bottom"
  class="drawer-placement-bottom"
>
  This drawer slides in from the bottom.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-placement-bottom");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```

---

## Contained To An Element

By default, drawers slide out of their containing block, which is usually the viewport. To make a drawer slide out of a parent element, add the contained attribute to the drawer and apply position: relative to its parent.Unlike normal drawers, contained drawers are not modal. This means they do not show an overlay, they do not trap focus, and they are not dismissible with Escape. This is intentional to allow users to interact with elements outside of the drawer.

```html
<div
  style="
    position: relative;
    border: solid 2px var(--syn-panel-border-color);
    height: 300px;
    padding: 1rem;
    margin-bottom: 1rem;
  "
>
  The drawer will be contained to this box. This content won't shift or be
  affected in any way when the drawer opens.

  <syn-drawer
    label="Drawer"
    open=""
    contained=""
    class="drawer-contained"
    style="--size: 50%"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <syn-button slot="footer" variant="filled">Close</syn-button>
  </syn-drawer>
</div>

<syn-button>Toggle Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-contained");
  const openButton = drawer.parentElement.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => (drawer.open = !drawer.open));
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```

---

## Custom Size

Use the --size custom property to set the drawer’s size. This will be applied to the drawer’s width or height depending on its placement.

```html
<syn-drawer
  label="Drawer"
  open=""
  placement="start"
  class="drawer-custom-size"
  style="--size: 50vw"
>
  This drawer is always 50% of the viewport.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-custom-size");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```

---

## Scrolling

By design, a drawer’s height will never exceed 100% of its container. As such, drawers will not scroll with the page to ensure the header and footer are always accessible to the user.

```html
<syn-drawer label="Drawer" open="" placement="start" class="drawer-scrolling">
  <div>
    <p>Scroll down and give it a try! 👇</p>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
      sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
      dolor sit amet.
    </p>
  </div>
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-scrolling");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```

---

## Header Actions

The header shows a functional close button by default. You can use the header-actions slot to add additional icon buttons if needed.

```html
<syn-drawer
  label="Drawer"
  open=""
  placement="start"
  class="drawer-header-actions"
>
  <syn-icon-button
    class="new-window"
    slot="header-actions"
    name="open_in_new"
    label="Arrow Up"
  ></syn-icon-button>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-header-actions");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');
  const newWindowButton = drawer.querySelector(".new-window");

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
  newWindowButton.addEventListener("click", () => window.open(location.href));
</script>
```

---

## Preventing The Drawer From Closing

By default, drawers will close when the user clicks the close button, clicks the overlay, or presses the Escape key. In most cases, the default behavior is the best behavior in terms of UX. However, there are situations where this may be undesirable, such as when data loss will occur.To keep the drawer open in such cases, you can cancel the syn-request-close event. When canceled, the drawer will remain open and pulse briefly to draw the user’s attention to it.You can use event.detail.source to determine what triggered the request to close. This example prevents the drawer from closing when the overlay is clicked, but allows the close button or Escape to dismiss it.

```html
<syn-drawer label="Drawer" open="" class="drawer-deny-close">
  This drawer will not close when you click on the overlay.
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-deny-close");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());

  // Prevent the drawer from closing when the user clicks on the overlay
  drawer.addEventListener("syn-request-close", (event) => {
    if (event.detail.source === "overlay") {
      event.preventDefault();
    }
  });
</script>
```

---

## Customizing Initial Focus

By default, the drawer’s panel will gain focus when opened. This allows a subsequent tab press to focus on the first tabbable element in the drawer. If you want a different element to have focus, add the autofocus attribute to it as shown below.

```html
<syn-drawer label="Drawer" class="drawer-focus">
  <syn-input
    autofocus=""
    placeholder="I will have focus when the drawer is opened"
  ></syn-input>
  <syn-button slot="footer" variant="filled">Close</syn-button>
</syn-drawer>

<syn-button>Open Drawer</syn-button>

<script type="module">
  const drawer = document.querySelector(".drawer-focus");
  const input = drawer.querySelector("syn-input");
  const openButton = drawer.nextElementSibling;
  const closeButton = drawer.querySelector('syn-button[variant="filled"]');

  openButton.addEventListener("click", () => drawer.show());
  closeButton.addEventListener("click", () => drawer.hide());
</script>
```
