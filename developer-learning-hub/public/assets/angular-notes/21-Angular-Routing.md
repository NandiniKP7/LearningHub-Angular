# 21. Angular Routing

## Subtopics
- `Routes`
- `provideRouter`
- `RouterOutlet`
- `routerLink`
- `routerLinkActive`
- default / redirect / wildcard routes
- child routes
- lazy loading basics

## What it solves

Routing connects a browser URL to the Angular component that should appear.

```text
URL
 ↓
route match
 ↓
component
 ↓
RouterOutlet
```

Without routing, one root component would have to manually decide which page to display.

## Where do we use this?

| File | Job |
|---|---|
| `app.routes.ts` | Defines URL → component rules |
| `app.config.ts` | Registers routes with Angular |
| Component `.html` | `routerLink`, `routerLinkActive`, `router-outlet` |
| Routed component `.ts` | Page component itself |

## 1. Define routes

`app.routes.ts`

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  }
];
```

Think:

```text
/home     → HomeComponent
/products → ProductsComponent
```

Do not include the leading `/` in the route `path`.

## 2. Register routes

`app.config.ts`

```ts
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

```text
Routes
→ define

provideRouter(routes)
→ register them with Angular
```

## 3. `RouterOutlet`

Angular may know which component matches the URL, but it also needs to know **where to display it**.

```html
<router-outlet></router-outlet>
```

Think:

```text
Routes
→ WHAT component?

RouterOutlet
→ WHERE should it appear?
```

A standalone component using it imports `RouterOutlet`.

## 4. `routerLink`

```html
<a routerLink="/home">Home</a>
<a routerLink="/products">Products</a>
```

`routerLink` tells Angular Router to navigate without reloading the entire application page.

A standalone component using it imports `RouterLink`.

## 5. `routerLinkActive`

```html
<a
  routerLink="/products"
  routerLinkActive="active">
  Products
</a>
```

When that route is active, Angular adds the `active` CSS class.

## 6. Root/default route

The root URL is:

```text
/
```

Angular represents it with:

```ts
path: ''
```

You can display a component directly:

```ts
{
  path: '',
  component: HomeComponent
}
```

## 7. Redirect

```ts
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
```

This changes `/` into `/home`.

```text
component
→ display here

redirectTo
→ send user somewhere else
```

## 8. Wildcard route

```ts
{
  path: '**',
  component: NotFoundComponent
}
```

`**` matches URLs that did not match earlier routes.

Keep the wildcard route last because Angular checks routes from top to bottom.

## 9. Child routes

```ts
{
  path: 'products',
  component: ProductsComponent,
  children: [
    {
      path: 'featured',
      component: FeaturedProductsComponent
    }
  ]
}
```

URLs:

```text
/products
/products/featured
```

For the child component to appear **inside** `ProductsComponent`, the parent template needs its own:

```html
<router-outlet></router-outlet>
```

Rendering:

```text
App RouterOutlet
   ↓
ProductsComponent
   ↓
Products RouterOutlet
   ↓
FeaturedProductsComponent
```

## 10. Lazy loading basics

Instead of importing a routed component immediately:

```ts
{
  path: 'reports',
  component: ReportsComponent
}
```

you can load it when its route is visited:

```ts
{
  path: 'reports',
  loadComponent: () =>
    import('./reports/reports.component')
      .then(m => m.ReportsComponent)
}
```

Think:

```text
component
→ component already referenced directly

loadComponent
→ load route component when needed
```

## Complete routing flow

```text
User clicks routerLink
        ↓
URL changes
        ↓
Routes finds match
        ↓
component / loadComponent chosen
        ↓
RouterOutlet displays it
```

## Common mistakes
- Putting `/` inside route `path`.
- Forgetting `provideRouter(routes)`.
- Forgetting `<router-outlet>`.
- Putting wildcard `**` before normal routes.
- Defining a child route but forgetting the parent's outlet.
- Confusing `routerLink` with `routerLinkActive`.

## Quick reference

```ts
export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component')
        .then(m => m.ProductsComponent)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
```

```html
<a routerLink="/products"
   routerLinkActive="active">
  Products
</a>

<router-outlet></router-outlet>
```

## Memory rule

**`Routes` define → `provideRouter` registers → `routerLink` navigates → `RouterOutlet` displays.**
