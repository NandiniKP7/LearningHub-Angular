# 9. Child → Parent Communication with `output()`

**Revision date:** September 8, 2026 · **Planned learning time:** 1–2 days

## What problem does it solve?

A ProductCard has an Add to cart button. The child knows when the button is clicked, but the parent owns the shopping cart. The child needs to tell the parent what happened.

**Memory rule:** `output()` creates a message channel, `emit()` sends the message, and `$event` receives it in the parent template.

```text
ProductList (parent)
        ↑ message
ProductCard (child)
```

## 1. The complete basic connection

### Child TypeScript — creates and sends the event

```ts
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html'
})
export class ProductCard {
  added = output<string>();

  addToCart() {
    this.added.emit('Laptop');
  }
}
```

`output<string>()` means the child can send an event called `added` containing a string. `emit('Laptop')` sends that string.

### Child HTML — starts the action

```html
<button (click)="addToCart()">Add to cart</button>
```

The browser click calls the child method. The method then emits the event.

### Parent TypeScript — receives the message

```ts
import { Component } from '@angular/core';
import { ProductCard } from './product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html'
})
export class ProductList {
  onProductAdded(product: string) {
    console.log(product);
  }
}
```

The parent imports the child so it can use its selector. The parent method receives the string sent by the child.

### Parent HTML — listens to the child

```html
<app-product-card
  (added)="onProductAdded($event)">
</app-product-card>
```

`(added)` matches the child's output name. `$event` is the message the child emitted.

```text
Child HTML: user clicks Add
        ↓
Child TS: addToCart()
        ↓
Child TS: added.emit('Laptop')
        ↓
Parent HTML: (added)="onProductAdded($event)"
        ↓
Parent TS: onProductAdded('Laptop')
```

The child reports the action. The parent decides what to do with it.

## 2. What exactly is `$event`?

`$event` means the value received from the event.

For a custom output:

```ts
this.added.emit('Laptop');
```

```html
(added)="onProductAdded($event)"
```

Here `$event` is the string `'Laptop'`.

For a native browser event, such as `(input)`, `$event` is a browser Event object. Its type depends on which event is being handled.

**Memory rule:** Whatever the child emits becomes `$event` in the parent listener.

## 3. Typed payloads — sending more information

### The problem

The parent may need both the product ID and quantity. A string is not enough, so the child sends an object.

### Child TypeScript

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

`ProductAdded` describes the shape of the message. TypeScript checks that the emitted object contains the required fields and types.

### Child HTML

```html
<button (click)="addToCart()">Add to cart</button>
```

### Parent HTML

```html
<app-product-card
  (added)="onProductAdded($event)">
</app-product-card>
```

### Parent TypeScript

```ts
onProductAdded(product: ProductAdded) {
  console.log(product.id);
  console.log(product.quantity);
}
```

The interface must be available to the parent, for example by exporting it from a shared model file and importing it.

```text
Child emits { id: 101, quantity: 2 }
        ↓
Parent $event receives the object
        ↓
Parent method reads product.id and product.quantity
```

**The only difference:** `output<string>()` sends a string; `output<ProductAdded>()` sends an object.

### An event with no payload

If the parent only needs to know that something happened, use `void`:

```ts
closed = output<void>();

close() {
  this.closed.emit();
}
```

The parent can listen with `(closed)="onClosed()"`. No data needs to be sent.

## 4. Output alias — changing the public event name

### The problem

The child property is named `added`, but we want the parent to listen using `(productAdded)`.

### Child TypeScript

```ts
added = output<string>({
  alias: 'productAdded'
});

addToCart() {
  this.added.emit('Laptop');
}
```

The child still uses `added` inside its TypeScript.

### Parent HTML

```html
<app-product-card
  (productAdded)="onProductAdded($event)">
</app-product-card>
```

### Parent TypeScript

```ts
onProductAdded(product: string) {
  console.log(product);
}
```

```text
Child property: added
        ↓ alias
Public event name: productAdded
        ↓
Parent listens: (productAdded)
```

An alias changes only the public event name. It does not change the message or how `emit()` works. Most components do not need one.

## 5. Forwarding — passing an event through another component

### The problem

There are three components:

```text
ShoppingPage (grandparent)
        ↑
ProductList (parent)
        ↑
ProductCard (child)
```

ProductCard sends a message to ProductList. ShoppingPage also needs that message. The middle component must receive it and send it upward again.

### Step 1 — ProductCard sends

```ts
// ProductCard TypeScript
added = output<string>();

addToCart() {
  this.added.emit('Laptop');
}
```

```html
<!-- ProductCard HTML -->
<button (click)="addToCart()">Add to cart</button>
```

### Step 2 — ProductList receives and forwards

```ts
// ProductList TypeScript
productAdded = output<string>();

onChildAdded(name: string) {
  this.productAdded.emit(name);
}
```

```html
<!-- ProductList HTML -->
<app-product-card
  (added)="onChildAdded($event)">
</app-product-card>
```

ProductList receives `added`, then emits its own `productAdded` event. It must import ProductCard in its component imports.

### Step 3 — ShoppingPage listens

```html
<!-- ShoppingPage HTML -->
<app-product-list
  (productAdded)="onProductAdded($event)">
</app-product-list>
```

```ts
// ShoppingPage TypeScript
onProductAdded(name: string) {
  console.log(name);
}
```

ShoppingPage must import ProductList in its component imports.

```text
ProductCard: added.emit('Laptop')
        ↓
ProductList: onChildAdded('Laptop')
        ↓
ProductList: productAdded.emit('Laptop')
        ↓
ShoppingPage: onProductAdded('Laptop')
```

Custom Angular outputs do not automatically bubble through every ancestor. A middle component explicitly forwards an event when a higher component needs it.

**Memory rule:** Forwarding = receive, then emit again.

## 6. Input down, events up

Inputs and outputs work together.

```text
Parent owns product data
        ↓ input()
Child displays product
        ↓ user clicks
Child emits an event
        ↑ output()
Parent receives and updates its own data
```

The output does not automatically change an input. The parent decides how to update its data after receiving the event. If that data changes, Angular can pass the new value down through an input binding.

## Common mistakes

- Forgetting to import the child component in the parent's `imports`.
- Using a selector or output name that does not match.
- Calling `this.added('Laptop')` instead of `this.added.emit('Laptop')`.
- Confusing a custom output payload with a native browser Event.
- Expecting an output to automatically reach a grandparent.
- Trying to store changing state inside an output.

## Quick reference

```ts
// Child
added = output<string>();
this.added.emit('Laptop');
```

```html
<!-- Parent -->
<app-product-card
  (added)="onProductAdded($event)">
</app-product-card>
```

**Remember:** `output()` = channel · `emit()` = send · `$event` = received message · forwarding = receive and emit again.

## Retrieval checkpoint

Trace a click from child HTML to parent TypeScript. Explain what changes when the payload is an object, what an alias changes, and how a message reaches a grandparent. Then reconstruct the basic connection without looking at the examples.
