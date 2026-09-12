# 21. Angular Routing

**Revision date:** Sep 12, 2026  
**Planned learning time:** 1–2 days

## Subtopics

- [x] Routes
- [x] `provideRouter`
- [x] `RouterOutlet`
- [x] `routerLink`
- [x] `routerLinkActive`
- [x] default / redirect / wildcard routes
- [x] child routes
- [x] lazy loading basics

---

# Part 1 — First Understand the Concept

## What is Routing?

An Angular application can contain many screens.

For example, imagine an online store:

```text
Home
Products
Reports
Page Not Found
```

Each screen may be represented by a different Angular component:

```text
HomeComponent
ProductsComponent
ReportsComponent
NotFoundComponent
```

But we need a way to answer:

> When the browser URL changes, which component should Angular show?

That is the purpose of **Angular Routing**.

Routing connects:

```text
URL
↓
Component
```

For example:

```text
/home
→ HomeComponent

/products
→ ProductsComponent

/reports
→ ReportsComponent
```

---

# Why Do We Need Routing?

Before routing, imagine doing this:

```html
@if (showHome) {
  <app-home></app-home>
}

@if (showProducts) {
  <app-products></app-products>
}
```

Then a button might change some component state:

```ts
showProducts = true;
```

That can change what appears on the screen.

But the browser URL may still remain:

```text
http://localhost:4200/
```

So the URL does not tell us which screen the user is viewing.

Routing gives screens meaningful URLs:

```text
/home
/products
/reports
```

Now the browser location represents the application screen.

---

# What Does Routing Give Us?

Conceptually:

```text
User wants Products
        ↓
URL becomes /products
        ↓
Angular checks routing rules
        ↓
Angular finds ProductsComponent
        ↓
ProductsComponent appears
```

This is the core idea.

Everything else in this topic helps Angular perform one part of that flow.

---

# What Pieces Do We Need?

For basic routing, Angular needs answers to several questions.

## Question 1

```text
Which component belongs to which URL?
```

We need:

```text
Routes
```

---

## Question 2

```text
How does Angular know about those routes?
```

We need:

```text
provideRouter(routes)
```

---

## Question 3

```text
Where should the matched component appear?
```

We need:

```text
RouterOutlet
```

---

## Question 4

```text
How does a user click something to navigate?
```

We need:

```text
routerLink
```

---

## Question 5

```text
How can navigation show which route is active?
```

We need:

```text
routerLinkActive
```

---

## Question 6

```text
What should happen at the root URL / ?
```

We can use:

```text
default route
or
redirect route
```

---

## Question 7

```text
What if the user enters a URL that does not exist?
```

We need:

```text
wildcard route
```

---

## Question 8

```text
What if one page has pages that belong underneath it?
```

Example:

```text
/products
/products/featured
```

We need:

```text
child routes
```

---

## Question 9

```text
What if a feature does not need to be loaded until the user visits it?
```

We can use:

```text
lazy loading
```

---

# Routing Map Before Code

Keep this map in mind:

```text
USER
↓
clicks navigation

routerLink
↓
changes URL

Routes
↓
find matching route

component / loadComponent
↓
choose or load component

RouterOutlet
↓
display component
```

And:

```text
provideRouter(routes)
→ makes the route configuration available to Angular
```

Now that we know **why these pieces exist**, we can see them working together.

---

# Part 2 — Complete Example

We will use a simple store.

The application has:

```text
Home
Products
Featured Products
Reports
Not Found
```

The URL behavior should be:

```text
/
→ redirect to /home

/home
→ HomeComponent

/products
→ ProductsComponent

/products/featured
→ FeaturedProductsComponent inside ProductsComponent

/reports
→ ReportsComponent loaded when needed

/anything-unknown
→ NotFoundComponent
```

The component structure is meaningful:

```text
AppComponent
│
├── navigation
│
└── main RouterOutlet
      │
      ├── HomeComponent
      │
      ├── ProductsComponent
      │      │
      │      └── child RouterOutlet
      │             └── FeaturedProductsComponent
      │
      ├── ReportsComponent
      │
      └── NotFoundComponent
```

---

# File 1 — Route Configuration

## `app.routes.ts`

```ts
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { FeaturedProductsComponent }
  from './featured-products/featured-products.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'featured',
        component: FeaturedProductsComponent
      }
    ]
  },

  {
    path: 'reports',
    loadComponent: () =>
      import('./reports/reports.component')
        .then(m => m.ReportsComponent)
  },

  {
    path: '**',
    component: NotFoundComponent
  }

];
```

At this point, just read the configuration as:

```text
''
→ redirect to home

home
→ HomeComponent

products
→ ProductsComponent

products + featured
→ child route

reports
→ load ReportsComponent when needed

**
→ NotFoundComponent
```

---

# File 2 — Give Routes to Angular

## `app.config.ts`

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

Connection:

```text
app.routes.ts
↓
routes
↓
provideRouter(routes)
↓
Angular Router
```

---

# File 3 — Root Component

## `app.component.ts`

```ts
import { Component } from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {}
```

---

# File 4 — Root Template

## `app.component.html`

```html
<h1>Simple Store</h1>

<nav>

  <a
    routerLink="/home"
    routerLinkActive="active">
    Home
  </a>

  <a
    routerLink="/products"
    routerLinkActive="active">
    Products
  </a>

  <a
    routerLink="/reports"
    routerLinkActive="active">
    Reports
  </a>

</nav>

<router-outlet></router-outlet>
```

The top navigation changes routes.

The outlet displays the matched top-level component.

---

# File 5 — Products Component

## `products.component.ts`

```ts
import { Component } from '@angular/core';

import {
  RouterLink,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './products.component.html'
})
export class ProductsComponent {}
```

## `products.component.html`

```html
<h2>Products</h2>

<p>Browse our products.</p>

<a routerLink="featured">
  View Featured Products
</a>

<router-outlet></router-outlet>
```

The second outlet exists because `featured` is a child of `products`.

---

# File 6 — Featured Products

## `featured-products.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html'
})
export class FeaturedProductsComponent {}
```

## `featured-products.component.html`

```html
<h3>Featured Products</h3>

<p>Laptop</p>
<p>Headphones</p>
```

---

# File 7 — Home

## `home.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {}
```

## `home.component.html`

```html
<h2>Home</h2>

<p>Welcome to the store.</p>
```

---

# File 8 — Reports

## `reports.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent {}
```

## `reports.component.html`

```html
<h2>Reports</h2>

<p>Store reports appear here.</p>
```

`ReportsComponent` is used as our lazy-loading example.

---

# File 9 — Not Found

## `not-found.component.ts`

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {}
```

## `not-found.component.html`

```html
<h2>Page Not Found</h2>

<p>The page you requested does not exist.</p>
```

---

# Part 3 — Follow the Example

Before explaining every keyword, trace what actually happens.

---

# Flow A — User Opens the Application

The browser opens:

```text
/
```

Angular checks:

```ts
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
```

So:

```text
/
↓
redirect
↓
/home
↓
home route matches
↓
HomeComponent
↓
AppComponent RouterOutlet
↓
Home page appears
```

---

# Flow B — User Clicks Products

The template contains:

```html
<a routerLink="/products">
  Products
</a>
```

The user clicks it.

Flow:

```text
Click Products
↓
routerLink="/products"
↓
URL becomes /products
↓
Angular checks Routes
↓
path: 'products' matches
↓
ProductsComponent
↓
main RouterOutlet
↓
Products page appears
```

---

# Flow C — User Clicks Featured Products

Inside `ProductsComponent`:

```html
<a routerLink="featured">
  View Featured Products
</a>
```

The current route is:

```text
/products
```

The child link adds:

```text
featured
```

So:

```text
/products/featured
```

Angular matches:

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

Rendering becomes:

```text
AppComponent
↓
main RouterOutlet
↓
ProductsComponent
↓
ProductsComponent's RouterOutlet
↓
FeaturedProductsComponent
```

So the screen can conceptually look like:

```text
Simple Store

Products

Browse our products.

View Featured Products

Featured Products
Laptop
Headphones
```

The parent remains visible.

The child appears inside the parent's outlet.

---

# Flow D — User Clicks Reports

The navigation contains:

```html
<a routerLink="/reports">
  Reports
</a>
```

The route is:

```ts
{
  path: 'reports',
  loadComponent: () =>
    import('./reports/reports.component')
      .then(m => m.ReportsComponent)
}
```

Flow:

```text
Click Reports
↓
/reports
↓
route matches
↓
loadComponent
↓
ReportsComponent loaded
↓
main RouterOutlet
↓
Reports appears
```

---

# Flow E — User Enters a Bad URL

Suppose:

```text
/banana
```

Angular checks the earlier routes.

Nothing matches.

Then:

```ts
{
  path: '**',
  component: NotFoundComponent
}
```

matches.

Flow:

```text
/banana
↓
no normal route
↓
**
↓
NotFoundComponent
↓
Page Not Found
```

Now that the example is connected, we can explain **what each routing piece is and why we need it**.

---

# Part 4 — What Each Piece Does

# 1. `Routes`

## Why do we need it?

Angular needs to know:

```text
Which URL belongs to which component?
```

Without route configuration, Angular does not know that:

```text
/products
```

should mean:

```text
ProductsComponent
```

So we define:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  }
];
```

Think:

```text
Routes
→ URL rules
```

---

## What does `path` mean?

```ts
path: 'products'
```

matches:

```text
/products
```

Inside route configuration, we do not write:

```ts
path: '/products'
```

Use:

```ts
path: 'products'
```

---

# 2. `provideRouter(routes)`

## Why do we need it?

Creating this:

```ts
export const routes: Routes = [...]
```

only creates route configuration.

Angular still needs to be told:

```text
Use these routes for this application.
```

That is why we use:

```ts
provideRouter(routes)
```

Usually in:

```text
app.config.ts
```

Example:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

Think:

```text
Routes
→ DEFINE

provideRouter(routes)
→ REGISTER / GIVE TO ANGULAR
```

---

# 3. `RouterOutlet`

## Why do we need it?

Suppose Angular matches:

```text
/products
→ ProductsComponent
```

Angular now knows **what** component to use.

But where should it appear in the HTML?

We need:

```html
<router-outlet></router-outlet>
```

Think:

```text
Routes
→ WHAT component?

RouterOutlet
→ WHERE should it display?
```

---

# Main RouterOutlet

In:

```text
AppComponent
```

we have:

```html
<router-outlet></router-outlet>
```

This can display top-level routed components such as:

```text
HomeComponent
ProductsComponent
ReportsComponent
NotFoundComponent
```

---

# Child RouterOutlet

`ProductsComponent` also has:

```html
<router-outlet></router-outlet>
```

Why another outlet?

Because:

```text
FeaturedProductsComponent
```

belongs inside:

```text
ProductsComponent
```

So:

```text
App outlet
→ ProductsComponent

Products outlet
→ FeaturedProductsComponent
```

The outlets have different responsibilities.

---

# 4. `routerLink`

## Why do we need it?

Defining a route:

```ts
{
  path: 'products',
  component: ProductsComponent
}
```

does not automatically create navigation.

The user still needs something to click.

Use:

```html
<a routerLink="/products">
  Products
</a>
```

Think:

```text
Routes
→ destination exists

routerLink
→ user navigates to destination
```

---

# `routerLink` vs `(click)`

A normal click handler:

```html
<button (click)="save()">
  Save
</button>
```

means:

```text
click
→ run method
```

A router link:

```html
<a routerLink="/products">
  Products
</a>
```

means:

```text
click
→ navigate
```

So:

```text
(click)
→ ACTION

routerLink
→ NAVIGATION
```

---

# 5. `routerLinkActive`

## Why do we need it?

Suppose navigation shows:

```text
Home
Products
Reports
```

If the user is currently on Products, it can be helpful to visually mark:

```text
Products ← current page
```

Use:

```html
<a
  routerLink="/products"
  routerLinkActive="active">
  Products
</a>
```

When the route is active, Angular applies:

```text
active
```

as a CSS class.

Then CSS might contain:

```css
.active {
  font-weight: bold;
}
```

Think:

```text
routerLink
→ GO

routerLinkActive
→ MARK CURRENT NAVIGATION
```

---

# 6. Default / Root Route

## Why do we need it?

What happens when the user opens:

```text
/
```

There is no text after the slash.

Angular represents the empty/root path as:

```ts
path: ''
```

We could directly show a component:

```ts
{
  path: '',
  component: HomeComponent
}
```

Meaning:

```text
/
→ HomeComponent
```

So:

```text
path: ''
→ ROOT URL
```

---

# 7. Redirect Route

## Why do we need it?

Sometimes we do not want `/` to be its own page.

We want:

```text
/
↓
/home
```

Use:

```ts
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
```

Meaning:

```text
User opens /
↓
Angular sends user to /home
```

---

# Direct Component vs Redirect

These are different.

```ts
{
  path: '',
  component: HomeComponent
}
```

means:

```text
/
→ display HomeComponent
```

Whereas:

```ts
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
```

means:

```text
/
→ change URL to /home
→ /home route displays HomeComponent
```

Memory:

```text
component
→ DISPLAY

redirectTo
→ SEND
```

---

# Why `pathMatch: 'full'`?

For our root redirect:

```ts
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}
```

we want the redirect only when the entire URL path is the empty root path.

For now, remember this common pattern together:

```text
root redirect
↓
path: ''
redirectTo: '...'
pathMatch: 'full'
```

---

# 8. Wildcard Route

## Why do we need it?

Users can enter URLs that our application does not recognize.

Example:

```text
/banana
```

Instead of leaving that URL without a normal application page, we can show:

```text
Page Not Found
```

Use:

```ts
{
  path: '**',
  component: NotFoundComponent
}
```

Think:

```text
**
→ anything not matched earlier
```

---

# Why Is Wildcard Last?

Angular checks route configuration in order.

Think:

```text
first matching route wins
```

Therefore:

```text
home
products
reports
**
```

The wildcard is the fallback.

Memory:

```text
Wildcard = fallback
Fallback = LAST
```

---

# 9. Child Routes

## Why do we need them?

Sometimes one screen logically belongs underneath another.

Example:

```text
/products
/products/featured
```

These are related.

```text
Products
└── Featured Products
```

So instead of treating `featured` as an unrelated top-level route, we can express the relationship:

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

Think:

```text
products
→ parent

featured
→ child
```

Angular combines them:

```text
/products/featured
```

---

# Why Does the Parent Need a RouterOutlet?

The child belongs **inside the parent route**.

So:

```text
AppComponent outlet
↓
ProductsComponent
```

and then:

```text
ProductsComponent outlet
↓
FeaturedProductsComponent
```

That produces:

```text
AppComponent
└── ProductsComponent
    └── FeaturedProductsComponent
```

This is the important child-route connection.

---

# 10. Lazy Loading Basics

## Why do we need it?

Imagine a large application with:

```text
Home
Products
Reports
Admin
Settings
```

The user may open the application and only use:

```text
Home
Products
```

Some larger feature code may not need to be loaded immediately.

Lazy loading lets Angular load route-related code when that route is needed.

---

# Normal Route

```ts
import { ReportsComponent }
  from './reports/reports.component';

{
  path: 'reports',
  component: ReportsComponent
}
```

Here the component is directly imported and referenced.

---

# Lazy Route

```ts
{
  path: 'reports',
  loadComponent: () =>
    import('./reports/reports.component')
      .then(m => m.ReportsComponent)
}
```

Conceptually:

```text
User does not visit /reports
→ Reports route component is not requested through this lazy route

User visits /reports
→ route matches
→ loadComponent runs
→ ReportsComponent loads
→ component displays
```

---

# `component` vs `loadComponent`

This is the important beginner distinction:

```text
component:
→ directly reference routed component

loadComponent:
→ load routed component when route is requested
```

Do not worry about memorizing the complete dynamic import syntax yet.

First understand **why it exists**.

---

# Child Routes vs Lazy Loading

These solve different problems.

```text
Child Routes
→ WHERE a route belongs in the route hierarchy

Lazy Loading
→ WHEN route-related code is loaded
```

Example:

```text
/products/featured
```

is about hierarchy.

```text
/reports
→ load ReportsComponent when requested
```

is about loading strategy.

They can be used together, but they are not the same feature.

---

# Part 5 — What You Need to Remember

You do **not** need to memorize every line of the full example immediately.

For this revision, understand these responsibilities.

| Concept | Why we need it |
|---|---|
| `Routes` | Tell Angular which URLs exist and what they match |
| `provideRouter(routes)` | Give/register those routes with Angular |
| `RouterOutlet` | Tell Angular where routed content should appear |
| `routerLink` | Let the user navigate from the template |
| `routerLinkActive` | Mark navigation when its route is active |
| `path: ''` | Represent the root URL |
| `redirectTo` | Send one route to another |
| `pathMatch: 'full'` | Match the complete root path for the redirect |
| `path: '**'` | Handle unknown URLs |
| `children` | Represent routes that belong under another route |
| child `RouterOutlet` | Provide the display area for child content |
| `loadComponent` | Load a routed standalone component when needed |

---

# The Most Important Routing Flow

If you remember only one diagram, remember this:

```text
User clicks
↓
routerLink
↓
URL changes
↓
Routes checks URL
↓
matching route
↓
component / loadComponent
↓
RouterOutlet
↓
component appears
```

And before all of that:

```text
routes
↓
provideRouter(routes)
↓
Angular knows the routing configuration
```

---

# Root / Invalid URL Memory

```text
path: ''
→ ROOT

redirectTo
→ SEND

path: '**'
→ UNKNOWN URL FALLBACK

Wildcard
→ LAST
```

---

# Child Route Memory

```text
/products
→ ProductsComponent

/products/featured
→ ProductsComponent
   +
   FeaturedProductsComponent inside it
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

---

# Lazy Loading Memory

```text
component
→ use component directly

loadComponent
→ load component when route is requested
```

---

# Topic 21 Checklist

- [x] Routes
- [x] `provideRouter`
- [x] `RouterOutlet`
- [x] `routerLink`
- [x] `routerLinkActive`
- [x] default route
- [x] redirect route
- [x] wildcard route
- [x] child routes
- [x] lazy loading basics

---

# Retrieval Checkpoint

Answer from the concept, not by memorizing exact code.

1. Why does an Angular application need routing?

2. What problem does `Routes` solve?

3. Why do we need `provideRouter(routes)` after defining routes?

4. If Angular knows `/products` belongs to `ProductsComponent`, why do we still need `RouterOutlet`?

5. What is the difference between `routerLink` and `routerLinkActive`?

6. What does:

```ts
path: ''
```

represent?

7. What is the difference between directly displaying a component at `/` and redirecting `/` to `/home`?

8. Why does the wildcard route use:

```ts
path: '**'
```

and why should it be last?

9. Why is `/products/featured` a meaningful child route?

10. Why does `ProductsComponent` need its own `RouterOutlet`?

11. What problem does lazy loading solve?

12. What is the conceptual difference between:

```ts
component: ReportsComponent
```

and:

```ts
loadComponent: () => ...
```

13. Trace this in your own words:

```text
User clicks Products
↓
routerLink="/products"
↓
?
↓
?
↓
ProductsComponent appears
```
