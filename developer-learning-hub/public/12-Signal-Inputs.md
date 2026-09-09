# 12 — Signal Inputs
**Revision date:** September 9, 2026
**Planned learning time:** 1–2 days


## Overview — receiving data from a parent

You already learned parent-to-child binding in Topic 8. A signal input is the same communication idea expressed through Angular's signal API.

Imagine a ProductList component owns a product name and ProductCard displays it. The parent decides which product is selected. The child should receive that value without taking ownership of it.

```ts
// Parent
selectedName = signal('Laptop');

// Child
productName = input.required<string>();
```

```html
<app-product-card [productName]="selectedName()"></app-product-card>
```

The parent reads its writable signal and passes the string. The child reads `productName()`. If the parent changes the selection, the child receives the new value. The child cannot call `set()` on its input because the parent owns the data.

This topic covers the input variations, parent binding, ownership, and how a child can calculate a value from its inputs using `computed()`.


## 1. `input()` and the complete parent-to-child connection
**product-card.ts**
```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html'
})
export class ProductCard {
  productName = input.required<string>();
}
```
**product-card.html**
```html
<p>{{ productName() }}</p>
```
**product-list.ts**
```ts
import { Component } from '@angular/core';
import { ProductCard } from './product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html'
})
export class ProductList {
  selectedName = 'Laptop';
}
```
**product-list.html**
```html
<app-product-card [productName]="selectedName"></app-product-card>
```
The parent owns selectedName. The binding passes its value to the child's input. The child reads productName().

## 2. Typed, default, required, and optional inputs
```ts
name = input('Unknown');                 // InputSignal<string>
quantity = input<number>(1);             // default 1
description = input<string>();           // string | undefined
productId = input.required<number>();    // required number
```
A default makes the binding optional. A required input must be supplied. An optional input without a default can be undefined, so handle that possibility.

```html
<app-product-card [productId]="42"></app-product-card>
```
Brackets evaluate 42 as a number. They do not turn it into a string.

### Typed object
```ts
export interface Product {
  id: number;
  name: string;
  price: number;
}
```
```ts
product = input.required<Product>();
```
Use a shared model file when both components need the type.

## 3. Parent binding from a writable signal
```ts
selectedName = signal('Laptop');
```
```html
<app-product-card [productName]="selectedName()"></app-product-card>
```
The parent reads its writable signal and passes the current string. The child receives it through a read-only input signal. When the parent changes selectedName, Angular supplies the new value.

## 4. Input signal vs writable signal
```ts
productName = input.required<string>(); // parent-owned data
isExpanded = signal(false);             // child-owned local state
```
Both are read with (). Only the writable signal has set/update.

```ts
this.productName.set('Mouse'); // invalid
```
If the child needs the parent to change something, emit an output and let the parent update its state. For independent local state, create a separate writable signal.

## 5. Computed from inputs
```ts
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.html'
})
export class PriceCard {
  price = input.required<number>();
  quantity = input(1);
  total = computed(() => this.price() * this.quantity());
}
```
```html
<p>Price: {{ price() }}</p>
<p>Quantity: {{ quantity() }}</p>
<p>Total: {{ total() }}</p>
```
Parent:
```html
<app-price-card [price]="100" [quantity]="3"></app-price-card>
```
The child receives 100 and 3; computed derives 300. If either input changes, the total can update. Do not manually set the computed value.

## 6. Ownership and object references
An input signal is read-only, but that does not deeply freeze an object passed through it. Avoid:
```ts
this.product().price = 0;
```
Instead, notify the parent through an output or derive a separate value. The parent remains responsible for updating its state.

## 7. Defaults, aliases, and transforms — concise revision
These were covered in Topic 8.
```ts
import { input, numberAttribute, booleanAttribute } from '@angular/core';

label = input('Untitled');
name = input('', { alias: 'productName' });
quantity = input(1, { transform: numberAttribute });
disabled = input(false, { transform: booleanAttribute });
```
Alias changes the public binding name; transform converts the incoming value before the child receives it. Static `quantity="3"` can become number 3. A bare disabled attribute is interpreted as true; omission uses the default false.

## 8. Common mistakes
Reading without (); setting an input; forgetting required bindings; confusing numeric property binding with static text; copying an input into writable state and expecting automatic synchronization; mutating parent-owned objects; forgetting the child import.

## Quick reference
```ts
value = input.required<string>();
optional = input('Default');
derived = computed(() => this.value().toUpperCase());
```

## Retrieval checkpoint
Write a complete parent/child connection; explain required vs default; pass a parent writable signal; derive a computed value from two inputs; explain why the child cannot set its input.

**Coverage:** input as signal, reading, typed/default/required, parent binding, input vs writable, computed from inputs.


## Additional reference — required inputs and initialization

A required input must be bound by the parent. Angular assigns input values during component initialization. Do not assume a required input already has a value in an ordinary field initializer that directly calls it. A computed field may safely define a calculation that reads the input when the computed value is evaluated.

For example:
```ts
product = input.required<Product>();
displayName = computed(() => this.product().name);
```
The computed function reads the input when evaluated, rather than eagerly copying the input into a separate writable property.

