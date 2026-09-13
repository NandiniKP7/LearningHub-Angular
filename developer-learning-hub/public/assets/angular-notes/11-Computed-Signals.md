# 11. Computed Signals

## Subtopics
- `computed()`
- derived state
- dependency tracking
- read-only computed state
- filtered lists / totals / counts
- signal vs computed

## What it solves

Some values should be **calculated from other signals**, not stored separately.

Example:

```text
price + quantity → total
```

If you store `total` separately, you must remember to update it every time a source changes.

`computed()` calculates it for you.

## Where do we use this?

Usually in component `.ts` or service `.ts`.

Templates read a computed signal with `()`.

## Basic syntax

```ts
import { computed, signal } from '@angular/core';

price = signal(100);
quantity = signal(3);

total = computed(() =>
  this.price() * this.quantity()
);
```

Read it:

```html
<p>Total: {{ total() }}</p>
```

## Source state vs derived state

```text
price     → source
quantity  → source
total     → derived
```

Change the sources. Do not manually change the computed value.

## Dependency tracking

Angular tracks the signals read inside the computed function.

```ts
fullName = computed(() =>
  `${this.firstName()} ${this.lastName()}`
);
```

Both signals are dependencies.

## Computed is read-only

This is valid:

```ts
total()
```

This is not:

```ts
total.set(500);
```

If the total should change, update `price` or `quantity`.

## Filtered list

```ts
searchText = signal('');

filteredProducts = computed(() => {
  const query = this.searchText().toLowerCase();

  return this.products().filter(product =>
    product.name.toLowerCase().includes(query)
  );
});
```

## Counts

```ts
completedCount = computed(() =>
  this.tasks().filter(task => task.completed).length
);
```

## Signal vs computed

| Writable signal | Computed signal |
|---|---|
| Stores source state | Calculates derived state |
| `signal(...)` | `computed(...)` |
| `set()` / `update()` | Read-only |
| Search text | Filtered results |
| Selected ID | Selected object |
| Quantity | Total |

## Common mistakes
- Trying to call `set()` on a computed signal.
- Storing duplicate state that can be calculated.
- Forgetting `()` when reading dependencies.
- Using `computed()` for side effects such as logging or storage.

## Quick reference

```ts
count = signal(5);
doubleCount = computed(() => this.count() * 2);
```

## Memory rule

**Store the source state. Compute the answer.**
