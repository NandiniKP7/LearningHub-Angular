# Topic 20 — Sharing Data / State with Services

**Revision date:** September 12, 2026  
**Planned learning time:** 1–2 days

# Why This Example Uses Two Different Components

Two components should not exist just to do the exact same job.

A more realistic shared-state example is a shopping cart:

```text
ProductCatalogComponent
→ shows products
→ user clicks "Add to Cart"

CartSummaryComponent
→ shows everything currently in the cart
→ shows cart count
→ can remove or clear items
```

These components have **different responsibilities**, but they need the **same cart state**.

That is a meaningful reason to use a shared service.

```text
ProductCatalogComponent
        ↓ add item

      CartService
      owns cart state

        ↓ read/remove
CartSummaryComponent
```

The service becomes the single owner of the cart.

---

# Complete Example First

We will use:

```text
cart.service.ts

product-catalog.component.ts
product-catalog.component.html

cart-summary.component.ts
cart-summary.component.html
```

The important relationship is:

```text
ProductCatalogComponent
→ requests cart changes

CartService
→ owns and updates cart state

CartSummaryComponent
→ reads current cart state
→ may request remove/clear actions
```

---

# File 1 — `cart.service.ts`

```ts
import {
  computed,
  Injectable,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Actual shared cart state.
  // Only CartService can directly write to it.
  private cartItemsSignal = signal<string[]>([]);

  // Components can read the cart,
  // but cannot directly call .set() or .update().
  cartItems = this.cartItemsSignal.asReadonly();

  // Derived state.
  itemCount = computed(() =>
    this.cartItemsSignal().length
  );

  // ProductCatalogComponent can request an add.
  addToCart(product: string): void {
    this.cartItemsSignal.update(items => [
      ...items,
      product
    ]);
  }

  // CartSummaryComponent can request a removal.
  removeFromCart(product: string): void {
    this.cartItemsSignal.update(items =>
      items.filter(item => item !== product)
    );
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
  }
}
```

For now, just recognize:

```text
cartItemsSignal
→ private writable source state

cartItems
→ public readonly state

addToCart()
→ controlled add

removeFromCart()
→ controlled remove

clearCart()
→ controlled reset

itemCount
→ computed derived state
```

---

# File 2 — Product Catalog Component

## `product-catalog.component.ts`

```ts
import { Component, inject } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html'
})
export class ProductCatalogComponent {

  cartService = inject(CartService);

  products = [
    'Laptop',
    'Headphones',
    'Mouse'
  ];

  addProduct(product: string): void {
    this.cartService.addToCart(product);
  }
}
```

## `product-catalog.component.html`

```html
<h2>Products</h2>

@for (product of products; track product) {
  <div>
    <span>{{ product }}</span>

    <button
      type="button"
      (click)="addProduct(product)">
      Add to Cart
    </button>
  </div>
}
```

Responsibility:

```text
ProductCatalogComponent
→ displays available products
→ receives user click
→ asks CartService to add product
```

It does **not** own the cart array.

---

# File 3 — Cart Summary Component

## `cart-summary.component.ts`

```ts
import { Component, inject } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent {

  cartService = inject(CartService);

  removeProduct(product: string): void {
    this.cartService.removeFromCart(product);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
```

## `cart-summary.component.html`

```html
<h2>Shopping Cart</h2>

<p>
  Total items:
  {{ cartService.itemCount() }}
</p>

@if (cartService.itemCount() === 0) {

  <p>Your cart is empty.</p>

} @else {

  @for (
    product of cartService.cartItems();
    track $index
  ) {
    <div>
      <span>{{ product }}</span>

      <button
        type="button"
        (click)="removeProduct(product)">
        Remove
      </button>
    </div>
  }

  <button
    type="button"
    (click)="clearCart()">
    Clear Cart
  </button>
}
```

Responsibility:

```text
CartSummaryComponent
→ displays current cart
→ displays item count
→ lets user remove an item
→ lets user clear cart
```

It does not own a second cart array.

It reads the one owned by `CartService`.

---

# Follow the Full Flow

## Step 1 — Application starts

The service starts with:

```ts
private cartItemsSignal = signal<string[]>([]);
```

So:

```text
CartService
→ []

ProductCatalogComponent
→ shows available products

CartSummaryComponent
→ shows "Your cart is empty"

itemCount()
→ 0
```

---

# Step 2 — User adds Laptop from Product Catalog

The user clicks:

```text
Laptop → Add to Cart
```

`ProductCatalogComponent` runs:

```ts
addProduct(product: string): void {
  this.cartService.addToCart(product);
}
```

For Laptop:

```ts
this.cartService.addToCart('Laptop');
```

Notice:

```text
ProductCatalogComponent
→ does NOT modify cartItemsSignal
```

It only requests:

```text
Please add Laptop.
```

The request goes to:

```ts
addToCart(product: string): void {
  this.cartItemsSignal.update(items => [
    ...items,
    product
  ]);
}
```

The service performs the actual write.

Now:

```text
CartService state
→ ['Laptop']
```

`CartSummaryComponent` reads:

```ts
cartService.cartItems()
```

and automatically sees:

```text
Laptop
```

It also reads:

```ts
cartService.itemCount()
```

and sees:

```text
1
```

---

# Step 3 — User Adds Headphones

The user clicks:

```text
Headphones → Add to Cart
```

Again:

```text
ProductCatalogComponent
→ calls cartService.addToCart('Headphones')
```

The service already has:

```text
['Laptop']
```

After the update:

```text
['Laptop', 'Headphones']
```

Now `CartSummaryComponent` displays:

```text
Laptop
Headphones

Total items: 2
```

The cart component did not need an event from the product component.

Both are connected through the same `CartService`.

---

# Step 4 — Cart Summary Removes Laptop

Now the user clicks:

```text
Remove Laptop
```

inside `CartSummaryComponent`.

That component calls:

```ts
this.cartService.removeFromCart('Laptop');
```

The service performs:

```ts
this.cartItemsSignal.update(items =>
  items.filter(item => item !== 'Laptop')
);
```

The shared state becomes:

```text
['Headphones']
```

Now every consumer of the cart sees:

```text
['Headphones']
```

And:

```text
itemCount()
→ 1
```

---

# Why Two Components Make Sense Here

They do different jobs.

## ProductCatalogComponent

```text
Purpose:
show things available to buy

Action:
request "add this product to cart"
```

## CartSummaryComponent

```text
Purpose:
show what is already in cart

Actions:
remove item
clear cart
display total count
```

## CartService

```text
Purpose:
own the shared cart state
control how cart changes
```

That is a realistic reason for sharing state.

---

# 1. Shared State Ownership

The cart should not exist as two different source arrays:

```ts
// Avoid this

// ProductCatalogComponent
cartItems = [];

// CartSummaryComponent
cartItems = [];
```

Those are separate arrays.

Instead:

```text
CartService
→ owns one cart
```

Both components use it.

```text
ProductCatalogComponent ─┐
                         ├→ CartService cart state
CartSummaryComponent ────┘
```

This is a **single source of truth**.

---

# 2. What Is Writable?

This is writable:

```ts
private cartItemsSignal = signal<string[]>([]);
```

Why writable?

Because the cart needs to change.

Products can be:

```text
added
removed
cleared
```

Who should directly write it?

```text
CartService
```

That is why it is:

```text
private + writable
```

---

# 3. What Is Readonly?

This is readonly:

```ts
cartItems =
  this.cartItemsSignal.asReadonly();
```

Why?

Components need to see the cart:

```ts
cartService.cartItems()
```

but they should not directly do:

```ts
cartService.cartItems.set(...)
```

or:

```ts
cartService.cartItems.update(...)
```

So:

```text
Service
→ READ + WRITE

Components
→ READ
```

---

# 4. If Components Cannot Write, How Do They Change the Cart?

They call service methods.

From the product catalog:

```ts
this.cartService.addToCart(product);
```

From the cart summary:

```ts
this.cartService.removeFromCart(product);
```

or:

```ts
this.cartService.clearCart();
```

The distinction is:

```text
Component
→ requests WHAT should happen

Service
→ controls HOW the state changes
```

---

# 5. Where Is the Data Actually Controlled?

Inside `CartService`.

Example:

```ts
addToCart(product: string): void {
  this.cartItemsSignal.update(items => [
    ...items,
    product
  ]);
}
```

Later, we could add a rule:

```ts
addToCart(product: string): void {

  if (this.cartItemsSignal().includes(product)) {
    return;
  }

  this.cartItemsSignal.update(items => [
    ...items,
    product
  ]);
}
```

Now duplicate products are blocked in one place.

Neither component needs to implement that rule separately.

That is a major reason services control shared state.

---

# 6. Does Every Component See Every Change?

If the components are using the same root-provided `CartService`, yes.

Example:

```text
ProductCatalogComponent
→ add Laptop

CartService
→ ['Laptop']

CartSummaryComponent
→ reads ['Laptop']


ProductCatalogComponent
→ add Headphones

CartService
→ ['Laptop', 'Headphones']

CartSummaryComponent
→ reads ['Laptop', 'Headphones']


CartSummaryComponent
→ remove Laptop

CartService
→ ['Headphones']

Any other component using CartService
→ also reads ['Headphones']
```

The service owns the current state.

---

# 7. What Does `computed()` Add?

The service stores:

```ts
cartItemsSignal
```

From that state we can calculate:

```text
number of cart items
```

So:

```ts
itemCount = computed(() =>
  this.cartItemsSignal().length
);
```

If cart is:

```text
[]
```

then count is:

```text
0
```

If cart is:

```text
['Laptop', 'Headphones']
```

then count is:

```text
2
```

---

# 8. Why Not Store the Count Separately?

Avoid:

```ts
private cartItemsSignal = signal<string[]>([]);
private itemCountSignal = signal(0);
```

Now adding one product requires:

```text
update cartItemsSignal
AND
update itemCountSignal
```

If one update is forgotten:

```text
cart = ['Laptop']
count = 0
```

The state is inconsistent.

Instead:

```ts
itemCount = computed(() =>
  this.cartItemsSignal().length
);
```

Memory:

```text
Store source state.
Derive calculated state.
```

---

# 9. Local State vs Shared State

Not everything belongs in `CartService`.

Suppose ProductCatalogComponent has:

```ts
searchText = signal('');
```

and the search field exists only in the catalog.

Keep it local.

```text
ProductCatalogComponent
→ searchText
```

But cart items are needed by multiple parts of the app:

```text
ProductCatalogComponent
→ adds

CartSummaryComponent
→ reads/removes

HeaderComponent
→ might later display cart count
```

That is a good candidate for shared service state.

---

# 10. Service State vs `input()` / `output()`

Use `input()` and `output()` when direct parent/child communication makes sense.

```text
Parent
→ input()
→ Child
```

```text
Child
→ output()
→ Parent
```

Use shared service state when several parts of the application need one common changing value.

```text
ProductCatalogComponent
        ↓
     CartService
        ↑
CartSummaryComponent
```

Neither component needs to be the direct parent of the other.

---

# Main Reference

| Part | Can write? | Used by | Purpose |
|---|---:|---|---|
| `cartItemsSignal` | Yes | `CartService` only | Real shared source state |
| `cartItems` | No | Components | Read latest cart |
| `addToCart()` | Method | Product catalog | Request an add |
| `removeFromCart()` | Method | Cart summary | Request a removal |
| `clearCart()` | Method | Cart summary | Request reset |
| `itemCount` | Computed | Any consumer | Derived count |

---

# Main Memory Rule

```text
Shared state
→ SERVICE OWNS

Actual source state
→ PRIVATE + WRITABLE

Components need the value
→ PUBLIC + READONLY

Component wants state changed
→ CALL SERVICE METHOD

Service method
→ performs .set() / .update()

Value can be calculated
→ COMPUTED
```

Or:

```text
Product Catalog asks.
Cart Service changes.
Cart Summary reads.
```

---

# Topic 20 Checklist

- [x] shared state ownership
- [x] signals in services
- [x] private writable/public readonly pattern
- [x] computed service state
- [x] local vs shared state
- [x] avoid duplicated state

---

# Retrieval Checkpoint

1. Why do `ProductCatalogComponent` and `CartSummaryComponent` need the same service?
2. Which class actually owns the cart?
3. When Product Catalog calls `addToCart('Laptop')`, who performs `.update()`?
4. What does Cart Summary see after Laptop is added?
5. Why is `cartItemsSignal` writable?
6. Why is `cartItemsSignal` private?
7. Why is `cartItems` readonly?
8. How does Cart Summary remove a product if it cannot directly write the signal?
9. Why is `itemCount` computed instead of another writable signal?
10. If catalog search text is used only in Product Catalog, should it be moved into `CartService`?
