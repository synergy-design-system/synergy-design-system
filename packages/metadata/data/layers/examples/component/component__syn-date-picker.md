## Default

No Description

```html
<syn-date-picker></syn-date-picker>
```

---

## Range

```html
<syn-date-picker
  label="Travel period"
  mode="range"
  value="2026-10-15 2026-10-20"
  clearable=""
></syn-date-picker>
```

---

## Multiple

```html
<syn-date-picker
  label="Selected days"
  mode="multiple"
  value="2026-10-15 2026-10-20"
  clearable=""
></syn-date-picker>
```

---

## Localization

```html
<div style="display: grid; gap: var(--syn-spacing-medium); max-width: 420px">
  <syn-date-picker
    value="2026-10-15"
    label="en-US"
    lang="en-US"
  ></syn-date-picker>

  <syn-date-picker
    value="2026-10-15"
    label="en-GB"
    lang="en-GB"
  ></syn-date-picker>

  <syn-date-picker
    value="2026-10-15"
    label="de-DE"
    lang="de-DE"
  ></syn-date-picker>

  <syn-date-picker
    value="2026-10-15"
    label="ja-JP"
    lang="ja-JP"
  ></syn-date-picker>
</div>
```

---

## Constraints

```html
<syn-date-picker
  label="Available travel dates"
  mode="range"
  min="2026-10-01"
  max="2026-12-31"
  min-range="3"
  max-range="14"
  disabled-weekdays="sat sun"
  disabled-dates="2026-12-25"
  value="2026-10-15 2026-10-20"
></syn-date-picker>
```

---

## Interaction States

```html
<div style="display: grid; gap: var(--syn-spacing-medium); max-width: 420px">
  <syn-date-picker
    label="Readonly date"
    readonly=""
    value="2026-10-15"
    clearable=""
  ></syn-date-picker>
  <syn-date-picker
    label="Disabled date"
    disabled=""
    value="2026-10-15"
    clearable=""
  ></syn-date-picker>
  <syn-date-picker
    label="Required date"
    required=""
    clearable=""
  ></syn-date-picker>
</div>
```

---

## Sizes

```html
<div style="display: grid; gap: var(--syn-spacing-medium); max-width: 420px">
  <syn-date-picker
    value="2026-10-15"
    clearable=""
    label="small"
    size="small"
  ></syn-date-picker>

  <syn-date-picker
    value="2026-10-15"
    clearable=""
    label="medium"
    size="medium"
  ></syn-date-picker>

  <syn-date-picker
    value="2026-10-15"
    clearable=""
    label="large"
    size="large"
  ></syn-date-picker>
</div>
```

---

## Right To Left

```html
<syn-date-picker
  label="Date"
  lang="ar"
  dir="rtl"
  value="2026-10-15"
  clearable=""
></syn-date-picker>
```

---

## Cancelable Changes

```html
<syn-date-picker
  label="Locked approval date"
  value="2026-10-15"
  clearable=""
></syn-date-picker>
```

---

## Form Reset

```html
<form>
  <syn-date-picker
    label="Appointment"
    name="appointment"
    value="2026-10-15"
    required=""
    clearable=""
  ></syn-date-picker>
  <syn-date-picker
    label="Travel period"
    name="travel"
    mode="range"
    clearable=""
  ></syn-date-picker>
  <syn-date-picker
    label="Selected days"
    name="days"
    mode="multiple"
    clearable=""
  ></syn-date-picker>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

---

## Demo

```html
<form name="something">
  <syn-date-picker clearable="" name="something" value="2024-06-06" required="">
    <span slot="label">Wurstbrot</span>
    <span slot="prefix">Prefix</span>
    <span slot="suffix">Sufix</span>
    <span slot="help-text">This is some help text.</span>
  </syn-date-picker>

  <syn-date-picker
    clearable=""
    name="something-else"
    mode="multiple"
    label="Multiple"
    help-text="Please select multiple dates"
  >
  </syn-date-picker>

  <syn-date-picker
    clearable=""
    name="something-even-elser"
    mode="range"
    label="Range"
    help-text="Please select a date range"
  >
  </syn-date-picker>
  <button type="submit">Submit</button>
</form>

<script>
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted");

    const fd = new FormData(event.target);
    for (const [key, value] of fd.entries()) {
      console.log(key, value);
    }
  });
</script>
```
