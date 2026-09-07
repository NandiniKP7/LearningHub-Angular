# Angular Routing — Day 4 Concept
## Child Routes + Lazy Loading Basics

## Today's Scope

```text
Child Routes
Lazy Loading Basics
```

These are the final two subtopics in our main **Routing** topic.

---

# 1. Child Routes

## What problem does it solve?

Sometimes one route belongs **inside another route**.

Example:

```text
/angular
/angular/basics
/angular/signals
```

Here `angular` is the parent route, while `basics` and `signals` are routes that belong under `angular`.

Instead of defining every URL as an unrelated top-level route, Angular lets us organize related routes using `children`.

## Basic Syntax

```ts
const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: 'details',
        component: ProductDetailsComponent
      }
    ]
  }
];
```

This creates:

```text
/products
/products/details
```

`path: 'products'` defines the parent path.

`component: ProductsComponent` defines the component for the parent route.

`children: [...]` defines routes that belong under the parent route.

`path: 'details'` is relative to its parent, so Angular combines them:

```text
products + details
        ↓
/products/details
```

---

## Where does a child component display?

The parent component needs its own:

```html
<router-outlet></router-outlet>
```

Example:

```html
<h2>Products</h2>

<router-outlet></router-outlet>
```

The application's main `<router-outlet>` displays the parent:

```text
AppComponent
    ↓
<router-outlet>
    ↓
ProductsComponent
```

Then the outlet inside `ProductsComponent` displays its child:

```text
ProductsComponent
    ↓
<router-outlet>
    ↓
ProductDetailsComponent
```

For `/products/details`:

```text
products
↓
ProductsComponent

details
↓
child of products
↓
ProductDetailsComponent
```

Rendering becomes:

```text
AppComponent
└── ProductsComponent
    └── ProductDetailsComponent
```

### Child Route Memory Rule

```text
children
→ routes that belong UNDER a parent route

Parent component's <router-outlet>
→ WHERE the child component displays
```

---

# 2. Lazy Loading Basics

## What problem does it solve?

As an application grows, loading code for every feature immediately can mean loading code the user does not need yet.

Lazy loading lets Angular load route-related code **when that route is needed**.

## Normal Route vs Lazy Route

A normal component route:

```ts
import { ReportsComponent } from './reports/reports.component';

{
  path: 'reports',
  component: ReportsComponent
}
```

The component is statically imported at the top.

A lazy-loaded standalone component:

```ts
{
  path: 'reports',
  loadComponent: () =>
    import('./reports/reports.component')
      .then(m => m.ReportsComponent)
}
```

There is no normal top-level `ReportsComponent` import for that route.

## Understanding `loadComponent`

```text
loadComponent
→ tells Angular this component should be loaded for the route

import('./reports/reports.component')
→ load that component file dynamically

.then(m => m.ReportsComponent)
→ after the file loads, give Angular the component class
```

You do not need to memorize the entire expression immediately.

The important distinction is:

```text
component:
→ directly reference the routed component

loadComponent:
→ load the component when that route is requested
```

## Lazy Loading Flow

```text
/reports
↓
route matches
↓
loadComponent
↓
load ReportsComponent
↓
display it in router-outlet
```

## Why use lazy loading?

It is useful for features that do not need to be loaded immediately, such as:

```text
Admin area
Reports
Settings
Large feature sections
```

Conceptually:

```text
Application starts
↓
load what is initially needed

User visits another feature
↓
load that feature when needed
```

---

# Learning Hub Connection

Our Learning Hub already has routes such as:

```text
/angular
/typescript
/csharp
```

Child routes could organize pages underneath a technology:

```text
/angular
/angular/topics
```

Lazy loading could allow a technology section to be loaded when the user navigates to it instead of directly importing every routed component up front.

The exact Learning Hub changes belong in today's **Practical Implementation**.

---

# Child Routes vs Lazy Loading

```text
Child Routes
→ organize routes into parent/child URL relationships

Lazy Loading
→ control WHEN route-related code is loaded
```

They can be used together, but they do not require each other.

---

# Today's Memory Rule

```text
children
→ routes UNDER another route

Child <router-outlet>
→ WHERE the child displays

component
→ directly reference the routed component

loadComponent
→ load the component when its route is needed
```

## Routing Day 4 Boundary

Today we are learning only the **basics** of child routes and lazy loading.

We are NOT adding route parameters, programmatic navigation, route guards, resolvers, or advanced lazy-loaded route configuration. Those belong to later topics.
