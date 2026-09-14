# Topic 22 — Route Parameters & Navigation

## Subtopics

1. Dynamic Route Parameters
2. Reading Route Parameters with `ActivatedRoute`
3. `paramMap.get()`
4. Programmatic Navigation with `Router`
5. `router.navigate()`
6. Navigating with Route Parameters
7. Multiple Route Parameters
8. Query Parameters
9. Navigating with Query Parameters
10. Reading Query Parameters
11. Route Parameters vs Query Parameters
12. `snapshot`
13. Handling Missing Parameters
14. `Router` vs `ActivatedRoute`

---

# Where Does Each Piece Go?

This is the most important file map for this topic.

```text
app.routes.ts
│
├── Define normal routes
└── Define dynamic routes such as :id

component.ts
│
├── Inject Router
├── Inject ActivatedRoute
├── Read route parameters
├── Read query parameters
└── Navigate from TypeScript

component.html
│
├── Buttons that call navigation methods
└── routerLink navigation when appropriate
```

### Quick Reference

| What are you doing? | Where does it go? |
|---|---|
| Define `products/:id` | `app.routes.ts` |
| Capture a dynamic URL section | `app.routes.ts` |
| Inject `ActivatedRoute` | Component `.ts` |
| Read `id` from URL | Component `.ts` |
| Inject `Router` | Component `.ts` |
| Call `router.navigate()` | Component `.ts` |
| Button calls navigation method | Component `.html` |
| Define query parameters during navigation | Component `.ts` |
| Read query parameters | Component `.ts` |

---

# 1. Dynamic Route Parameters

## What problem does it solve?

Suppose we have many products:

```text
/products/10
/products/25
/products/100
```

We do not want to create:

```text
Product10Component
Product25Component
Product100Component
```

Instead, one component can handle all product IDs.

---

## Where do we add it?

📁 **File: `app.routes.ts`**

Dynamic routes are defined in the application's route configuration.

```ts
{
  path: 'products/:id',
  component: ProductDetailsComponent
}
```

The important part is:

```ts
:id
```

The `:` tells Angular:

> Whatever appears here is a dynamic value.

---

## Example

```text
Route definition:

products/:id
         ↓

Browser URL:

products/25
         ↓

id = "25"
```

Another URL:

```text
/products/100
```

gives:

```text
id = "100"
```

---

# 2. Reading Route Parameters with `ActivatedRoute`

Defining the parameter in `app.routes.ts` is only the first step.

Now the component needs to **read it**.

Angular provides:

```ts
ActivatedRoute
```

---

## Where do we add it?

📁 **File: the component `.ts` that receives the route**

Example:

```text
product-details.component.ts
```

Import it:

```ts
import { ActivatedRoute } from '@angular/router';
```

Inject it:

```ts
private route = inject(ActivatedRoute);
```

Complete location:

```ts
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent {

  private route = inject(ActivatedRoute);

}
```

So:

```text
app.routes.ts
     ↓
defines :id

ProductDetailsComponent.ts
     ↓
reads :id
```

---

# 3. Reading the Value with `paramMap.get()`

After injecting `ActivatedRoute`, read the parameter.

## Where?

📁 **Same component `.ts`**

```ts
const productId =
  this.route.snapshot.paramMap.get('id');
```

Example URL:

```text
/products/25
```

Result:

```ts
productId = "25";
```

---

## Why `'id'`?

Because the route was defined as:

```ts
path: 'products/:id'
```

Therefore:

```ts
paramMap.get('id')
```

must use the same name.

### Correct

```ts
path: 'products/:id'
```

```ts
paramMap.get('id')
```

### Incorrect

```ts
paramMap.get('productId')
```

unless the route itself was:

```ts
path: 'products/:productId'
```

---

# 4. Complete Route Parameter Flow

There are **two files involved**.

## File 1 — `app.routes.ts`

```ts
{
  path: 'products/:id',
  component: ProductDetailsComponent
}
```

## File 2 — `product-details.component.ts`

```ts
private route = inject(ActivatedRoute);

productId =
  this.route.snapshot.paramMap.get('id');
```

Flow:

```text
app.routes.ts
products/:id
      ↓

Browser
/products/25
      ↓

Angular matches route
      ↓

ProductDetailsComponent
      ↓

ActivatedRoute
      ↓

paramMap.get('id')
      ↓

"25"
```

---

# 5. Route Parameters Are Strings

## Where does this matter?

📁 **Component `.ts`**

For:

```text
/products/25
```

Angular gives:

```ts
"25"
```

not:

```ts
25
```

If you need a number:

```ts
const productId =
  Number(this.route.snapshot.paramMap.get('id'));
```

---

# 6. Programmatic Navigation with `Router`

Sometimes we want TypeScript code to change the route.

Angular provides:

```ts
Router
```

---

## Where do we add `Router`?

📁 **Component `.ts`**

Import:

```ts
import { Router } from '@angular/router';
```

Inject:

```ts
private router = inject(Router);
```

Example:

```ts
export class ProductsComponent {

  private router = inject(Router);

}
```

---

# 7. `router.navigate()`

Once `Router` is injected, navigation also happens inside the:

📁 **Component `.ts`**

Example:

```ts
goToProducts() {
  this.router.navigate(['/products']);
}
```

---

## Where does the click happen?

Usually the user action is in:

📁 **Component `.html`**

```html
<button (click)="goToProducts()">
  View Products
</button>
```

So two files work together:

```text
products.component.html
        ↓
button clicked
        ↓
goToProducts()

products.component.ts
        ↓
router.navigate()
        ↓
URL changes
```

---

# 8. Navigating with a Route Parameter

Suppose we want:

```text
/products/25
```

## Component `.ts`

```ts
openProduct(id: number) {
  this.router.navigate(['/products', id]);
}
```

If:

```ts
id = 25
```

Angular creates:

```text
/products/25
```

---

## Component `.html`

```html
<button (click)="openProduct(25)">
  Open Product
</button>
```

Flow:

```text
component.html
button click
      ↓

component.ts
openProduct(25)
      ↓

Router
      ↓

/products/25
```

---

# 9. Full Example — Which File Gets What?

## `app.routes.ts`

```ts
{
  path: 'products/:id',
  component: ProductDetailsComponent
}
```

This tells Angular:

> `/products/anything` should open `ProductDetailsComponent`.

---

## `products.component.ts`

```ts
private router = inject(Router);

openProduct(id: number) {
  this.router.navigate(['/products', id]);
}
```

This sends the user to the detail page.

---

## `products.component.html`

```html
<button (click)="openProduct(25)">
  Product 25
</button>
```

This starts the navigation.

---

## `product-details.component.ts`

```ts
private route = inject(ActivatedRoute);

productId =
  this.route.snapshot.paramMap.get('id');
```

This reads the ID from the URL.

---

## `product-details.component.html`

```html
<p>Product ID: {{ productId }}</p>
```

This displays the value.

---

# 10. Multiple Route Parameters

## Where do we define them?

📁 **`app.routes.ts`**

```ts
{
  path: 'users/:userId/orders/:orderId',
  component: OrderDetailsComponent
}
```

URL:

```text
/users/10/orders/500
```

Angular captures:

```text
userId = "10"
orderId = "500"
```

---

## Where do we read them?

📁 **`order-details.component.ts`**

```ts
const userId =
  this.route.snapshot.paramMap.get('userId');

const orderId =
  this.route.snapshot.paramMap.get('orderId');
```

Again:

```text
app.routes.ts
    ↓
defines parameters

component.ts
    ↓
reads parameters
```

---

# 11. Query Parameters

Query parameters look like:

```text
/products?category=laptop
```

They come after:

```text
?
```

Another example:

```text
/products?page=2
```

They are commonly used for:

```text
search
filter
sort
page
```

---

# 12. Navigating with Query Parameters

## Where?

📁 **Component `.ts`**

```ts
this.router.navigate(['/products'], {
  queryParams: {
    category: 'laptop'
  }
});
```

Angular creates:

```text
/products?category=laptop
```

Multiple values:

```ts
this.router.navigate(['/products'], {
  queryParams: {
    category: 'laptop',
    sort: 'price'
  }
});
```

Result:

```text
/products?category=laptop&sort=price
```

---

# 13. Reading Query Parameters

## Where?

📁 **Component `.ts`**

Use `ActivatedRoute`:

```ts
const category =
  this.route.snapshot.queryParamMap.get('category');
```

URL:

```text
/products?category=laptop
```

Result:

```ts
"laptop"
```

Notice the difference:

### Route parameter

```ts
paramMap.get('id')
```

### Query parameter

```ts
queryParamMap.get('category')
```

Both are read inside the **component `.ts`**.

---

# 14. Route Parameter vs Query Parameter

## Route Parameter

Defined in:

📁 `app.routes.ts`

```ts
path: 'products/:id'
```

URL:

```text
/products/25
```

Usually answers:

> Which product?

---

## Query Parameter

Usually created/read from:

📁 Component `.ts`

URL:

```text
/products?sort=price
```

Usually answers:

> How should this page be filtered, sorted, searched, or displayed?

---

# 15. `snapshot`

You will see:

```ts
this.route.snapshot.paramMap.get('id');
```

## Where?

📁 **Component `.ts`**

`snapshot` gives the route information available when the component reads it.

For our current level:

```ts
snapshot.paramMap.get(...)
```

is enough.

Later we will learn how to react to parameters changing while the same component stays loaded.

---

# 16. Missing Parameters

This:

```ts
this.route.snapshot.paramMap.get('id')
```

returns:

```ts
string | null
```

because the parameter might not exist.

## Where do we handle this?

📁 **Component `.ts`**

Example:

```ts
const id =
  this.route.snapshot.paramMap.get('id');

if (id) {
  console.log(id);
}
```

---

# 17. `Router` vs `ActivatedRoute`

Both are used in:

📁 **Component `.ts`**

but they do opposite jobs.

## Router

```ts
private router = inject(Router);
```

Used to:

```text
GO somewhere
```

Example:

```ts
this.router.navigate(['/products', 25]);
```

---

## ActivatedRoute

```ts
private route = inject(ActivatedRoute);
```

Used to:

```text
READ where you currently are
```

Example:

```ts
this.route.snapshot.paramMap.get('id');
```

Memory rule:

```text
Router = GO

ActivatedRoute = READ
```

---

# File Responsibility Summary

## `app.routes.ts`

Use it for:

```text
Route definitions
Dynamic parameters
Which component belongs to which URL
```

Example:

```ts
{
  path: 'products/:id',
  component: ProductDetailsComponent
}
```

---

## Source Component `.ts`

Use it when navigating away from a component.

Example:

```text
ProductsComponent
```

```ts
private router = inject(Router);

openProduct(id: number) {
  this.router.navigate(['/products', id]);
}
```

---

## Source Component `.html`

Use it for the user action.

```html
<button (click)="openProduct(25)">
  Open
</button>
```

---

## Destination Component `.ts`

Use it to read the URL.

Example:

```text
ProductDetailsComponent
```

```ts
private route = inject(ActivatedRoute);

productId =
  this.route.snapshot.paramMap.get('id');
```

---

## Destination Component `.html`

Use it to display data when necessary.

```html
<p>{{ productId }}</p>
```

---

# Complete Architecture Picture

```text
app.routes.ts
│
│  path: 'products/:id'
│
└───────────────────────────────┐
                                │
products.component.html         │
│                               │
│ button click                  │
↓                               │
products.component.ts           │
│                               │
│ Router.navigate()             │
↓                               │
/products/25                    │
│                               │
│ Angular matches route ────────┘
↓
ProductDetailsComponent
│
│ ActivatedRoute
│
│ paramMap.get('id')
↓
"25"
│
↓
product-details.component.html
│
└── displays product information
```

---

# Topic 22 Syntax Reference

### `app.routes.ts`

```ts
path: 'products/:id'
```

### Component `.ts` — Read URL

```ts
private route = inject(ActivatedRoute);

const id =
  this.route.snapshot.paramMap.get('id');
```

### Component `.ts` — Navigate

```ts
private router = inject(Router);

this.router.navigate(['/products', id]);
```

### Component `.ts` — Query Parameters

```ts
this.router.navigate(['/products'], {
  queryParams: {
    sort: 'price'
  }
});
```

### Component `.ts` — Read Query Parameter

```ts
this.route.snapshot.queryParamMap.get('sort');
```

---

# Main Memory Picture

```text
DEFINE URL
app.routes.ts
     ↓

START NAVIGATION
component.html
     ↓

NAVIGATE
component.ts + Router
     ↓

URL changes
     ↓

READ URL
destination component.ts + ActivatedRoute
     ↓

USE / DISPLAY VALUE
destination component
```

## Final Memory Rule

```text
app.routes.ts
= DEFINE the URL

Router
= GO to a URL

ActivatedRoute
= READ the current URL

component.html
= user interaction / display

component.ts
= navigation and route-reading logic
```