# 22. Route Parameters & Navigation

## Subtopics
- dynamic `:id` / `:topic`
- `ActivatedRoute`
- `paramMap`
- query parameters
- `Router`
- `navigate()`
- parameterized links
- invalid parameters

## What it solves

One component often needs to handle many similar URLs.

Example:

```text
/products/10
/products/25
/products/100
```

We do not need a separate component for every product.

A dynamic route captures the changing part of the URL.

## Where do we use this?

| What are we doing? | File |
|---|---|
| Define `:id` / `:topic` | `app.routes.ts` |
| Read current route | Destination component `.ts` |
| Navigate from TypeScript | Source component `.ts` |
| Trigger navigation | Component `.html` |
| Display route-driven data | Destination component `.html` |

## 1. Dynamic route parameter

`app.routes.ts`

```ts
{
  path: 'products/:id',
  component: ProductDetailsComponent
}
```

For:

```text
/products/25
```

Angular captures:

```text
id = "25"
```

The name after `:` is the parameter name.

## 2. Read a parameter with `ActivatedRoute`

Destination component `.ts`:

```ts
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';

private route = inject(ActivatedRoute);

productId =
  this.route.snapshot.paramMap.get('id');
```

The name in `get('id')` must match `:id`.

Route values are strings unless you convert them.

## 3. Multiple parameters

```ts
{
  path: 'users/:userId/orders/:orderId',
  component: OrderDetailsComponent
}
```

Read:

```ts
userId =
  this.route.snapshot.paramMap.get('userId');

orderId =
  this.route.snapshot.paramMap.get('orderId');
```

## 4. Navigate with `Router`

Source component `.ts`:

```ts
import { Router } from '@angular/router';

private router = inject(Router);
```

Navigate:

```ts
openProduct(id: number) {
  this.router.navigate([
    '/products',
    id
  ]);
}
```

If `id` is `25`:

```text
/products/25
```

## `Router` vs `ActivatedRoute`

```text
Router
→ GO to another route

ActivatedRoute
→ READ the current route
```

## 5. Parameterized links

You can also build dynamic links in HTML:

```html
<a [routerLink]="['/products', product.id]">
  View product
</a>
```

The array builds the URL from pieces.

## 6. Query parameters

Route parameter:

```text
/products/25
```

Usually answers:

```text
Which product?
```

Query parameter:

```text
/products?sort=price&page=2
```

Usually adds optional information such as filter, sort, search, or page.

Navigate:

```ts
this.router.navigate(['/products'], {
  queryParams: {
    sort: 'price',
    page: 2
  }
});
```

Read:

```ts
sort =
  this.route.snapshot.queryParamMap.get('sort');
```

## 7. Missing or invalid parameters

`paramMap.get()` can return:

```ts
string | null
```

Check before using it:

```ts
const id =
  this.route.snapshot.paramMap.get('id');

if (id) {
  // use id
}
```

A valid-looking parameter may still not match real data.

Example:

```text
/products/999999
```

The route matches, but your product lookup may return `undefined`.

Handle that safely with a message, redirect, or Not Found state.

## Complete flow

```text
Source component
   ↓ Router.navigate()

/products/25
   ↓ route matches products/:id

Destination component
   ↓ ActivatedRoute

paramMap.get('id')
   ↓

"25"
   ↓

find matching data
   ↓

display page
```

## Common mistakes
- Hard-coding a value instead of using `:id`.
- Calling `paramMap.get()` with the wrong parameter name.
- Confusing `Router` with `ActivatedRoute`.
- Forgetting route parameters are strings.
- Assuming every captured parameter matches real data.
- Using route parameters and query parameters for the same purpose.

## Quick reference

```ts
// app.routes.ts
path: 'products/:id'
```

```ts
// destination component
private route = inject(ActivatedRoute);

id =
  this.route.snapshot.paramMap.get('id');
```

```ts
// source component
private router = inject(Router);

this.router.navigate(['/products', id]);
```

```ts
// query parameter
this.route.snapshot.queryParamMap.get('sort');
```

## Memory rule

**`:` captures → `ActivatedRoute` reads → `Router` navigates.**
