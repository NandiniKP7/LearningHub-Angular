# 6. Two-Way Binding

## Subtopics
- `[(ngModel)]`
- `FormsModule`
- TypeScript ⇄ HTML
- initial values
- user edits update component state
- property vs event vs two-way binding

## What it solves

Sometimes an input should display a TypeScript value **and** update that value when the user types.

```text
TypeScript ⇄ HTML input
```

## Where do we use this?

| File | Job |
|---|---|
| Component `.ts` | Stores the value |
| Component `.html` | Uses `[(ngModel)]` |
| Component `.ts` imports | Adds `FormsModule` |

## Import `FormsModule`

```ts
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule]
})
export class ProfileComponent {
  displayName = 'Ada';
}
```

## Use `[(ngModel)]`

```html
<input [(ngModel)]="displayName">

<p>Preview: {{ displayName }}</p>
```

Initially:

```text
displayName = "Ada"
      ↓
input shows Ada
```

When the user types `Grace`:

```text
input changes
      ↓
ngModel updates displayName
      ↓
preview shows Grace
```

## Why `[()]`?

Think of it as the two directions together:

```text
[]  → value goes to HTML
()  → changes come back
[()] → both directions
```

Angular's `ngModel` combines those directions for form controls.

## Binding comparison

| Binding | Direction | Example |
|---|---|---|
| Interpolation | TS → text | `{{ name }}` |
| Property | TS → property | `[value]="name"` |
| Event | HTML → TS | `(input)="..."` |
| Two-way | TS ⇄ HTML | `[(ngModel)]="name"` |

## Common mistakes
- Forgetting `FormsModule`.
- Writing `[(ngModel)]="{{ name }}"`.
- Using a property that does not exist.
- Assuming every property automatically becomes two-way bound.

## Quick reference

```ts
name = 'Ada';
```

```html
<input [(ngModel)]="name">
<p>{{ name }}</p>
```

## Memory rule

**`[()]` = value goes to the input and user changes come back to TypeScript.**
