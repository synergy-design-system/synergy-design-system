## Contact Form

```html
<style>
  .synergy-form-demo {
    background: var(--syn-color-neutral-0);
    margin: 0 auto;
    padding: var(--syn-spacing-x-large);
    max-width: 750px;
  }

  h1 {
    font-size: var(--syn-font-size-3x-large);
    font-weight: var(--syn-font-weight-bold);
    margin: 0 0 var(--syn-spacing-medium) 0;
  }

  .synergy-form-demo > p {
    margin: 0 0 var(--syn-spacing-2x-large) 0;
  }

  em {
    font-size: var(--syn-font-size-x-small);
    font-style: normal;
  }

  fieldset {
    border: none;
    margin: 0 0 var(--syn-spacing-2x-large) 0;
    padding: 0;
  }

  fieldset legend {
    font-size: var(--syn-font-size-large);
    font-weight: var(--syn-font-weight-bold);
    line-height: var(--syn-line-height-normal);
    margin-bottom: var(--syn-spacing-medium);
  }

  fieldset legend + p {
    font-size: var(--syn-font-size-medium);
    margin: 0 0 var(--syn-font-size-large) 0;
  }

  .fields {
    container-type: inline-size;
    display: flex;
    flex-flow: wrap;
    margin-bottom: var(--syn-spacing-2x-large);
    gap: var(--syn-spacing-large) var(--syn-spacing-large);

    /* TODO: this two css properties can be removed, when this issue is fixed https://github.com/synergy-design-system/synergy-design-system/issues/612
    * It is fixed for the newest chrome and firefox versions, but not for safari :(
    */
    position: relative;
    z-index: 1;
  }

  .fields > * {
    flex-basis: 100%;
  }

  @container (min-width: 640px) {
    .fields > * {
      flex-basis: calc(50% - var(--syn-spacing-medium));
    }
  }

  /*
   * The form control inputs are using a css grid to be displayed.
   * We just let them flow automatically mobile and arrange them
   * in two columns when space is wide enough
   */
  #topics-wrapper {
    container-type: inline-size;
  }

  #topics {
    gap: var(--syn-spacing-x-small);
    display: grid;
  }

  @container (min-width: 640px) {
    #topics {
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
    }
  }

  .submit-actions {
    display: flex;
    justify-content: right;
    margin-bottom: var(--syn-spacing-2x-large);
  }
</style>
<div class="synergy-form-demo">
  <h1>Contact Form</h1>
  <p>
    Please fill in your personal information and let us know how we can help
    you.
  </p>

  <form method="post" id="syn-form-demo">
    <fieldset id="topics-wrapper">
      <legend>Topic</legend>
      <div id="topics">
        <syn-checkbox name="topic[0]" value="Inquiry/offer">
          Inquiry/offer
        </syn-checkbox>

        <syn-checkbox name="topic[1]" value="Orders/invoices">
          Orders/invoices
        </syn-checkbox>

        <syn-checkbox name="topic[2]" value="Returns/complaint">
          Returns/complaint
        </syn-checkbox>

        <syn-checkbox name="topic[3]" value="Documentation/CAD">
          Documentation/CAD
        </syn-checkbox>

        <syn-checkbox name="topic[4]" value="Accessories selection">
          Accessories selection
        </syn-checkbox>

        <syn-checkbox name="topic[5]" value="Application review">
          Application review
        </syn-checkbox>

        <syn-checkbox name="topic[6]" value="Commissioning support">
          Commissioning support
        </syn-checkbox>
      </div>
    </fieldset>

    <fieldset>
      <legend>Question</legend>
      <p>
        It is very helpful if the description is as precise as possible to
        enable us to process your enquiry correctly. When describing
        applications, please specify the material/dimensions/speed, if
        applicable.
      </p>

      <syn-textarea name="message" required="" label="Message"></syn-textarea>
    </fieldset>

    <fieldset>
      <legend>Contact Details</legend>
      <div class="fields">
        <syn-input name="customerNr" label="Customer Number"></syn-input>
        <syn-input
          name="companyName"
          required=""
          label="Company name"
        ></syn-input>
        <syn-input name="address" required="" label="Address"></syn-input>
        <syn-input name="zip" required="" label="Postal Code"></syn-input>
        <syn-input name="city" required="" label="City"></syn-input>

        <syn-select name="country" required="" label="Country">
          <syn-option value="0">Deutschland</syn-option>

          <syn-option value="1">USA</syn-option>

          <syn-option value="2">China</syn-option>
        </syn-select>

        <syn-combobox
          name="salesPerson"
          required=""
          label="Your reference contact"
        >
          <syn-option>Max Mustermann</syn-option>
          <syn-option>John Doe</syn-option>
          <syn-option>Jane Row</syn-option>
          <syn-option>Average Joe</syn-option>
        </syn-combobox>
        <syn-input type="tel" name="phone" label="Phone number"></syn-input>
        <syn-input type="tel" name="fax" label="Fax number"></syn-input>
        <syn-input
          type="email"
          name="mail"
          required=""
          label="E-Mail address"
        ></syn-input>
      </div>
      <syn-checkbox name="subscribeNewsletter">
        Yes, I would like to receive up-to-date and interesting information on
        solutions with products, systems and services from SICK by email on a
        regular basis. I can withdraw my consent at any time. To withdraw my
        consent, I can use the unsubscribe link in every newsletter / email at
        any time.
      </syn-checkbox>
    </fieldset>

    <div class="submit-actions">
      <syn-button type="submit" variant="filled">Send</syn-button>
    </div>

    <em>
      Fields marked * are required. Your data will be treated accordingly to
      <a href="#">Data protection</a>
      law.
    </em>
  </form>
</div>

<script type="module">
  const firstTopic = document.querySelector("syn-checkbox:first-child");
  const firstTopicError = "Please select at least one topic";

  customElements.whenDefined("syn-select").then(() => {
    firstTopic.setCustomValidity(firstTopicError);
  });

  const setValidationForTopics = () => {
    const hasCheckedElements =
      document.querySelectorAll("#topics syn-checkbox[checked]").length > 0;
    const validationMessage = hasCheckedElements ? "" : firstTopicError;
    firstTopic.setCustomValidity(validationMessage);
  };

  document
    .querySelector("form")
    .addEventListener("input", setValidationForTopics);

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);

    const hasOneTopicChecked = Array.from(fd).some(
      ([key, value]) => key.startsWith("topic[") && value,
    );

    // Set validation message for topics dependent if a topic was checked or not
    const topicValidity = hasOneTopicChecked ? "" : firstTopicError;
    firstTopic.setCustomValidity(topicValidity);

    if (e.target.reportValidity()) {
      console.log(...fd, hasOneTopicChecked);
    }
  });
</script>
```

---

## Multiple Files Upload Form

```html
<div class="synergy-upload-form-demo">
  <h1>Multiple files upload</h1>
  <form
    enctype="multipart/form-data"
    method="post"
    id="upload-multiple-form-docs"
  >
    <syn-file
      droparea=""
      name="files"
      multiple=""
      label="Select Files"
      help-text="Max file size is 500kb. Supported file types are .jgp, .png and .pdf"
    ></syn-file>

    <!-- File list: hidden until files are selected -->
    <ul class="uploaded-files" hidden=""></ul>

    <div class="submit-actions">
      <syn-button type="submit" variant="filled" disabled="">Upload</syn-button>
    </div>
  </form>
</div>

<style>
  .synergy-upload-form-demo {
    background: var(--syn-color-neutral-0);
    margin: 0 auto;
    padding: var(--syn-spacing-x-large);
    max-width: 750px;

    form {
      display: flex;
      flex-direction: column;
      gap: var(--syn-spacing-medium);
    }
  }

  h1 {
    font-size: var(--syn-font-size-3x-large);
    font-weight: var(--syn-font-weight-bold);
    margin: 0 0 var(--syn-spacing-medium) 0;
  }

  .uploaded-files {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;

    li {
      --indicator-color: var(--syn-input-icon-icon-clearable-color);

      align-items: center;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: var(--syn-spacing-small) 0;
      font: var(--syn-body-medium-regular);
      gap: var(--syn-spacing-small);
      min-height: 50px;
      position: relative;

      &.entry-success {
        --indicator-color: var(--syn-namur-success-color);

        pointer-events: none;
      }

      em {
        font: var(--syn-body-medium-regular);
        font-style: normal;
        flex: 1;
      }

      .uploaded-files--status {
        color: var(--indicator-color);
        text-align: end;
        width: var(--syn-spacing-large);
        font-size: var(--syn-font-size-large);
        position: absolute;
        right: 0;
        top: var(--syn-spacing-small);

        syn-icon-button {
          &::part(base) {
            font-size: var(--syn-spacing-large);
            padding: 0;
          }
        }
      }

      .uploaded-files--help-text {
        color: var(--syn-input-border-color-focus-error);
        display: block;
        font: var(--syn-body-small-regular);
        margin: var(--syn-spacing-x-small) 0;
      }

      /* Spinner surface is slightly larger as buttons have some padding applied */
      .uploaded-files--status:has(syn-spinner) {
        right: 2px;
      }

      syn-divider {
        width: 100%;
        margin: 0;
        position: absolute;
        bottom: 0;
      }
    }
  }

  .submit-actions {
    display: flex;
    justify-content: right;
    margin-top: var(--syn-spacing-2x-large);
  }
</style>

<script type="module">
  let entries = [
    {
      error: null,
      filename: "image.png",
      id: 1,
      state: "uploading",
    },
    {
      error: null,
      filename: "file-name",
      id: 2,
      state: "success",
    },
    {
      error: null,
      filename: "file-name",
      id: 3,
      state: "queued",
    },
    {
      error: "File exceeds size limit.",
      filename: "file-name-large",
      id: 4,
      state: "queued",
    },
  ];
  let entryId = entries.at(-1).id + 1;

  const formId = "#upload-multiple-form-" + "docs";
  const form = document.querySelector(formId);
  const fileInput = form.querySelector("syn-file");
  const fileList = form.querySelector(".uploaded-files");
  const submitButton = form.querySelector('syn-button[type="submit"]');

  const render = () => {
    fileList.innerHTML = "";
    if (entries.length === 0) {
      submitButton.setAttribute("disabled", "");
      fileList.hidden = true;
      return;
    }
    fileList.hidden = false;
    submitButton.removeAttribute("disabled");

    // If everything was uploaded, disable the upload button again to prevent confusion, as there are no more files to upload
    const allUploaded = entries.every((entry) => entry.state === "success");
    if (allUploaded) {
      submitButton.setAttribute("disabled", "");
    }

    entries.forEach((entry) => {
      const li = document.createElement("li");
      li.className = "entry-" + entry.state;

      const em = document.createElement("em");
      em.textContent = entry.filename;

      const divider = document.createElement("syn-divider");

      if (entry.error) {
        const helpSpan = document.createElement("span");
        helpSpan.className = "uploaded-files--help-text";
        helpSpan.textContent = entry.error;
        em.appendChild(helpSpan);
      }

      const statusSpan = document.createElement("span");
      statusSpan.className = "uploaded-files--status";

      if (entry.state === "uploading") {
        const spinner = document.createElement("syn-spinner");
        statusSpan.appendChild(spinner);
      } else {
        const btn = document.createElement("syn-icon-button");
        btn.setAttribute("library", "system");
        btn.setAttribute("size", "medium");

        if (entry.state === "success") {
          btn.setAttribute("name", "status-success");
          btn.setAttribute("label", "Upload successful");
          btn.setAttribute("tabindex", "-1");
          statusSpan.appendChild(btn);
        } else {
          // queued or error: show cancel / remove button
          btn.setAttribute("name", "x-lg");
          btn.setAttribute(
            "label",
            entry.state === "error" ? "Remove" : "Cancel upload",
          );
          btn.addEventListener("click", () => {
            entries = entries.filter((e) => e.id !== entry.id);
            console.log(entries);
            render();
          });
        }

        statusSpan.appendChild(btn);
      }

      li.appendChild(em);
      li.appendChild(statusSpan);
      li.appendChild(divider);
      fileList.appendChild(li);
    });
  };

  // Render first time
  render();

  // Populate list as "queued" whenever the user selects / drops files
  fileInput.addEventListener("syn-change", () => {
    const files = fileInput.files ? Array.from(fileInput.files) : [];
    entries = files.map((file) => ({
      error: null,
      filename: file.name,
      id: String(++entryId),
      state: "queued",
    }));
    render();
  });

  // Upload button: start fake uploads for all queued entries
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const queued = entries.filter(
      (entry) => entry.state !== "success" && entry.state !== "error",
    );
    if (queued.length === 0) return;

    // Immediately switch all queued entries to uploading
    queued.forEach((entry) => {
      entry.state = "uploading";
    });
    render();

    // Schedule outcomes:
    // - All but the last file succeed, staggered by 1.5s each
    // - The last file always fails after 3s (simulates a connection loss)
    queued.forEach((entry, i) => {
      const isLast = i === queued.length - 1;
      const delay = isLast ? 3000 : (i + 1) * 1500;

      setTimeout(() => {
        const target = entries.find((e) => e.id === entry.id);
        // Skip if the entry was removed (canceled) while uploading
        if (!target || target.state !== "uploading") return;

        if (isLast) {
          target.state = "queued";
          target.error = "Connection lost. Please try again.";
        } else {
          target.state = "success";
        }
        render();
      }, delay);
    });
  });
</script>
```
