# 20. Sharing Data / State with Services

## Subtopics
- shared state ownership
- signals in services
- private writable / public readonly pattern
- computed service state
- local vs shared state
- avoid duplicated state

## What it solves

Sometimes two different components need the **same state**.

Example:

```text
ProductCatalog
→ adds products

CartSummary
→ displays/removes products
```

Both need the same cart.

A shared service can become the single owner.

## Where do we use this?

| File | Job |
|---|---|
| Service `.ts` | Owns shared state |
| Component `.ts` | Injects service and requests changes |
| Component `.html` | Reads service state for display |

## Shared ownership

Avoid:

```text
ProductCatalog has its own cart[]
CartSummary has its own cart[]
```

Those are two separate sources of truth.

Prefer:

```text
ProductCatalog ─┐
                ├→ CartService owns cart
CartSummary ────┘
```

## Private writable / public readonly

```ts
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSignal =
    signal<string[]>([]);

  cartItems =
    this.cartItemsSignal.asReadonly();

}
```

Meaning:

```text
Service
→ can write

Components
→ can read
```

## Change state through service methods

```ts
addToCart(product: string): void {
  this.cartItemsSignal.update(items => [
    ...items,
    product
  ]);
}
```

```ts
removeFromCart(product: string): void {
  this.cartItemsSignal.update(items =>
    items.filter(item => item !== product)
  );
}
```

```ts
clearCart(): void {
  this.cartItemsSignal.set([]);
}
```

Components request what should happen:

```ts
this.cartService.addToCart(product);
```

The service controls how shared state changes.

## Computed service state

```ts
itemCount = computed(() =>
  this.cartItemsSignal().length
);
```

Do not store a second writable count if it can be derived from the cart array.

## Component example

```ts
export class CartSummaryComponent {
  cartService = inject(CartService);

  clear() {
    this.cartService.clearCart();
  }
}
```

```html
<p>Total: {{ cartService.itemCount() }}</p>

@for (
  item of cartService.cartItems();
  track item
) {
  <p>{{ item }}</p>
}
```

## Local vs shared state

```text
Only one component needs it
→ keep it local

Several unrelated components need the same state
→ consider a shared service
```

Do not move every signal into a service.

## Common mistakes
- Duplicating shared state in multiple components.
- Exposing the writable signal publicly.
- Letting components directly call `set()` on shared state.
- Storing derived values such as counts separately.
- Creating shared state when local state is enough.

## Quick reference

```ts
private valueSignal = signal(0);
value = this.valueSignal.asReadonly();

double = computed(() =>
  this.valueSignal() * 2
);

increment() {
  this.valueSignal.update(v => v + 1);
}
```

## Memory rule

**Service owns shared source state → components read it and call service methods → computed derives the rest.**
