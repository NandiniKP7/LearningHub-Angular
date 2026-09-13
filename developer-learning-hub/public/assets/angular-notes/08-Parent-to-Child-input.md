# 8. Parent → Child Communication with `input()`

## Subtopics
- parent / child relationship
- `input()`
- reading signal inputs
- typed / default / required inputs
- aliases
- transforms
- parent binding → child
- input ownership

## What it solves

A reusable child component needs data from its parent.

Example:

```text
ProductList (parent)
   ↓ sends product
ProductCard (child)
   ↓ displays product
```

## Where do we use this?

| File | Job |
|---|---|
| Child `.ts` | Declares `input()` |
| Child `.html` | Reads the input with `()` |
| Parent `.ts` | Owns the value |
| Parent `.html` | Passes the value with `[inputName]` |

## Complete connection

### Child TypeScript

```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html'
})
export class ProductCard {
  name = input.required<string>();
}
```

### Child HTML

```html
<h3>{{ name() }}</h3>
```

### Parent TypeScript

```ts
productName = 'Laptop';
```

### Parent HTML

```html
<app-product-card
  [name]="productName">
</app-product-card>
```

Read the binding as:

```text
[child input] = "parent value"
```

## Required, default, and typed inputs

```ts
name = input.required<string>();  // parent must provide it
label = input('View');            // default value
quantity = input<number>(1);      // typed number
description = input<string>();    // may be undefined
```

## Passing an object

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

product = input.required<Product>();
```

The child can receive one typed object instead of many separate values.

## Aliases

```ts
productName = input.required<string>({
  alias: 'name'
});
```

Parent:

```html
<app-product-card [name]="productName"></app-product-card>
```

Inside the child, the property is still `productName()`.

## Transforms

Transforms convert incoming values.

```ts
import { input, numberAttribute } from '@angular/core';

quantity = input(1, {
  transform: numberAttribute
});
```

```html
<app-product-card quantity="3"></app-product-card>
```

The child receives the number `3`.

## Ownership

An input is parent-owned data.

The child reads it:

```ts
name()
```

The child does not call:

```ts
name.set(...)
```

If the child needs the parent to change something, use an output.

## Common mistakes
- Forgetting `()` when reading a signal input.
- Forgetting a required input in the parent.
- Thinking the left and right side of the binding must have the same name.
- Trying to change parent-owned input state inside the child.

## Quick reference

```ts
title = input.required<string>();
count = input(0);
```

```html
<app-child
  [title]="parentTitle"
  [count]="parentCount">
</app-child>
```

## Memory rule

**Parent owns the value → parent binds it → child receives it with `input()` → child reads it with `()`.**
