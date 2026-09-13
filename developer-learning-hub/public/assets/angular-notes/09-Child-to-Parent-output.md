# 9. Child → Parent Communication with `output()`

## Subtopics
- `output()`
- `emit()`
- parent event listener
- typed payloads
- `$event`
- input down / events up

## What it solves

A child component may know **that something happened**, while the parent owns the state that should change.

Example:

```text
ProductCard child
  Add clicked
      ↓ event
ProductList parent
  decides what to do
```

## Where do we use this?

| File | Job |
|---|---|
| Child `.ts` | Declares output and emits |
| Child `.html` | Starts the action |
| Parent `.html` | Listens to the output |
| Parent `.ts` | Handles the event |

## Complete connection

### Child TypeScript

```ts
import { Component, output } from '@angular/core';

export class ProductCard {
  added = output<string>();

  addToCart() {
    this.added.emit('Laptop');
  }
}
```

### Child HTML

```html
<button (click)="addToCart()">
  Add to cart
</button>
```

### Parent HTML

```html
<app-product-card
  (added)="onProductAdded($event)">
</app-product-card>
```

### Parent TypeScript

```ts
onProductAdded(product: string) {
  console.log(product);
}
```

Flow:

```text
Child click
  ↓
emit('Laptop')
  ↓
Parent (added)
  ↓
$event = 'Laptop'
  ↓
Parent method
```

## What is `$event`?

Whatever the child emits becomes `$event`.

```ts
this.added.emit('Laptop');
```

```html
(added)="onProductAdded($event)"
```

Here `$event` is `'Laptop'`.

## Typed object payload

```ts
interface ProductAdded {
  id: number;
  quantity: number;
}

added = output<ProductAdded>();

addToCart() {
  this.added.emit({
    id: 101,
    quantity: 2
  });
}
```

The parent receives a typed object.

## Event with no payload

```ts
closed = output<void>();

close() {
  this.closed.emit();
}
```

Parent:

```html
<app-dialog (closed)="onClosed()"></app-dialog>
```

## Input down, events up

```text
Parent → Child
input()

Child → Parent
output()
```

Inputs send data downward. Outputs report events upward.

## Common mistakes
- Forgetting to call `emit()`.
- Listening to the wrong output name.
- Forgetting `$event` when a payload is needed.
- Letting the child directly change state that belongs to the parent.

## Quick reference

```ts
selected = output<number>();

choose(id: number) {
  this.selected.emit(id);
}
```

```html
<app-child
  (selected)="onSelected($event)">
</app-child>
```

## Memory rule

**`output()` creates the event → `emit()` sends it → parent listener receives it as `$event`.**
