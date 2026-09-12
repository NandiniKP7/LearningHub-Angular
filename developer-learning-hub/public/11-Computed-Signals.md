# 11 — Computed Signals


## Overview — why computed state exists

You already know that a writable signal stores a value and can be changed with `set()` or `update()`. Now consider a shopping cart with a price and quantity. The total is not a separate fact that the user enters; it is calculated from those two values.

If we store the total in another writable signal, every price or quantity change must also update that total. Forgetting one update creates inconsistent state. A computed signal solves this by defining the calculation once.

```ts
price = signal(100);
quantity = signal(3);
total = computed(() => this.price() * this.quantity());
```

The source values are 100 and 3, so `total()` returns 300. When quantity becomes 4, Angular knows the calculation depends on quantity and can calculate 400 when the total is read. We change the source, not the calculated answer.

This topic explains how computed values are created, how Angular tracks dependencies, why they are read-only, and how to use them for filtering, totals, and counts.


## 1. computed() and derived state
```ts
import { computed, signal } from '@angular/core';

price = signal(100);
quantity = signal(3);
total = computed(() => this.price() * this.quantity());
```
Price and quantity are source state. Total is derived state. Its initial result is 300.

## 2. Complete component connection
```ts
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.html'
})
export class CartSummary {
  price = signal(100);
  quantity = signal(3);
  total = computed(() => this.price() * this.quantity());

  addOne() {
    this.quantity.update(current => current + 1);
  }
}
```
```html
<p>Quantity: {{ quantity() }}</p>
<p>Total: {{ total() }}</p>
<button (click)="addOne()">Add one</button>
```
Click → quantity changes → total is invalidated → the next read calculates the new total → UI displays it. No manual total update is needed.

## 3. Dependency tracking
Angular tracks signals read while the computed function executes. Both price and quantity are dependencies.

### Dynamic dependencies
```ts
showDetails = signal(false);
firstName = signal('John');
lastName = signal('Smith');

displayName = computed(() => {
  if (this.showDetails()) {
    return `${this.firstName()} ${this.lastName()}`;
  }
  return this.firstName();
});
```
When details are hidden, lastName is not read and is not a dependency of that execution. When shown, it becomes a dependency. Dependencies can change as branches change.

## 4. Lazy and memoized
A computed signal is lazy: its calculation runs when its value is read. Angular caches the result. Repeated reads can reuse the cached value when dependencies have not changed. A dependency change invalidates the calculation, which is recomputed when needed.

## 5. Read-only computed state
```ts
total = computed(() => this.price() * this.quantity());
```
Read `total()`, but do not call `total.set()` or `total.update()`. Change the source values. TypeScript infers a read-only `Signal<number>`. Computed functions should calculate values, not mutate their dependencies.

## 6. Filtered lists
```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

products = signal<Product[]>([
  { id: 1, name: 'Laptop', price: 900 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 70 }
]);

searchText = signal('');

filteredProducts = computed(() => {
  const query = this.searchText().toLowerCase();
  return this.products().filter(product =>
    product.name.toLowerCase().includes(query)
  );
});

onSearch(event: Event) {
  this.searchText.set((event.target as HTMLInputElement).value);
}
```
`filter()` creates a new array. `toLowerCase()` makes matching case-insensitive. `includes()` checks whether the name contains the query. An empty query matches every name.

```html
<input
  [value]="searchText()"
  (input)="onSearch($event)"
  placeholder="Search products"
/>

@for (product of filteredProducts(); track product.id) {
  <p>{{ product.name }}</p>
} @empty {
  <p>No matching products.</p>
}
```
The type assertion tells TypeScript that the event target is an input element. Flow: input event → writable searchText → computed filteredProducts → template. Filtering does not destroy the original list.

## 7. Totals and counts
```ts
completedTopics = signal(10);
totalTopics = signal(40);

remaining = computed(() =>
  this.totalTopics() - this.completedTopics()
);

progressPercentage = computed(() => {
  const total = this.totalTopics();
  return total === 0 ? 0 : this.completedTopics() / total * 100;
});
```
The zero guard prevents division by zero. Ten out of forty is 25%.

For a collection:
```ts
expensiveCount = computed(() =>
  this.products().filter(product => product.price > 50).length
);
```
The count updates when the source product signal receives a new array.

## 8. Signal vs computed
| Writable signal | Computed signal |
|---|---|
| Stores source state | Calculates derived state |
| `signal(initial)` | `computed(() => expression)` |
| set/update | Read-only |
| Search text, selection | Filtered list, total, count |

Store the smallest necessary set of source values. Derive the rest.

## 9. Common mistakes
Forgetting `()`; trying to set a computed signal; manually synchronizing duplicate totals; expecting arbitrary changes to a normal array to invalidate computed; using computed for logging or storage; assuming conditional dependencies are always tracked.

## Quick reference
```ts
source = signal(5);
doubled = computed(() => this.source() * 2);
doubled(); // 10
```

## Retrieval checkpoint
Identify source vs derived state; write a total and filtered list; explain read-only behavior; trace two dependencies; explain conditional dependency tracking.

**Coverage:** computed(), derived state, dependency tracking, read-only state, filtered/totals/counts, signal vs computed.

