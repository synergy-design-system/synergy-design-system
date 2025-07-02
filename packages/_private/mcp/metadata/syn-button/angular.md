# How to use syn-button angular

## Example

### In a form

```ts
import { SynButtonComponent } from '@synergy-design-system/angular';

/**
 * Creates a form for angular
 */
@Component({
  selector: 'demo-application',
  template: `
    <form>
      <input />
      <syn-button type="submit">Submit me!</syn-button>
    </form>
  `,
})
class MyComponent {
}
```
