# Day 20 — Angular Routing — Day 1

## Today’s scope

Today we learn only the **basic routing foundation**:

```text
Routes
→ provideRouter(routes)
→ RouterOutlet
```

We are **not** learning `routerLink`, redirects, wildcard routes, child routes, or lazy loading today.

---

# 1. What problem does Routing solve?

Without routing, we can show different components using conditions such as:

```html
@if (showTopics) {
  <app-angular-topics></app-angular-topics>
}
```

But the browser URL does not represent that screen.

Angular Routing lets us connect a URL to a component.

Example:

```text
/angular
```

can display:

```text
AngularTopicsComponent
```

The basic flow is:

```text
Browser URL
    ↓
Routes
    ↓
Matching component
    ↓
RouterOutlet displays it
```

---

# 2. `Routes`

Angular uses a route configuration to decide which component belongs to which URL.

Import:

```ts
import { Routes } from '@angular/router';
```

Example:

```ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TopicsComponent } from './topics/topics.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'topics',
    component: TopicsComponent
  }
];
```

Read it like this:

```text
/        → HomeComponent
/topics  → TopicsComponent
```

Inside `path`, do not write the `/`.

Correct:

```ts
path: 'topics'
```

Not:

```ts
path: '/topics'
```

---

# 3. `provideRouter(routes)`

Defining routes is only the first step.

Angular must also be told to use them.

In a standalone Angular application, this normally happens in:

```text
app.config.ts
```

Example:

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

The important line is:

```ts
provideRouter(routes)
```

Meaning:

```text
our routes
   ↓
provideRouter(routes)
   ↓
Angular Router can use them
```

---

# 4. `RouterOutlet`

Angular now knows:

```text
URL → Component
```

But Angular still needs to know **where in the HTML to display that component**.

That is what `RouterOutlet` does.

Import it:

```ts
import { RouterOutlet } from '@angular/router';
```

Add it to the component imports:

```ts
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class App {}
```

Then place this in the HTML:

```html
<router-outlet></router-outlet>
```

Think of it as an empty display area:

```text
<router-outlet>
      ↓
Angular places the matched component here
```

---

# 5. Complete basic example

## `app.routes.ts`

```ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TopicsComponent } from './topics/topics.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'topics',
    component: TopicsComponent
  }
];
```

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

## `app.component.ts`

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class App {}
```

## `app.component.html`

```html
<h1>My Application</h1>

<router-outlet></router-outlet>
```

---

# 6. Full flow

If the browser URL is:

```text
/topics
```

Angular does this:

```text
/topics
   ↓
checks routes
   ↓
finds path: 'topics'
   ↓
component: TopicsComponent
   ↓
RouterOutlet
   ↓
TopicsComponent appears
```

---

# 7. Angular CLI commands

## Create a new Angular component

Full command:

```bash
ng generate component home
```

Short form:

```bash
ng g c home
```

Example for another routed component:

```bash
ng g c topics
```

If you want them inside a folder:

```bash
ng g c pages/home
ng g c pages/topics
```

Angular creates the component files for you.

Example:

```text
src/app/pages/home/
  home.component.ts
  home.component.html
  home.component.css
  home.component.spec.ts
```

---

# 8. What about `app.routes.ts`?

If your Angular project was created with routing enabled, you will normally already have:

```text
src/app/app.routes.ts
```

and:

```text
src/app/app.config.ts
```

You usually **edit `app.routes.ts` yourself** to add route definitions.

Example:

```ts
export const routes: Routes = [
  {
    path: 'topics',
    component: TopicsComponent
  }
];
```

You do not need to generate a new routing component.

---

# 9. Learning Hub connection

Later, the Developer Learning Hub can use URLs such as:

```text
/angular
```

instead of relying only on manual component-selection state.

We will do the actual Learning Hub changes during the **Practical Implementation**.

Today, only understand this:

```text
URL
 ↓
Routes
 ↓
Component
 ↓
RouterOutlet
```

---

# Memory Rule

```text
Routes
→ decide WHICH component belongs to a URL

provideRouter(routes)
→ gives those routes to Angular

RouterOutlet
→ decides WHERE the matched component appears
```

That is all you need for Routing Day 1.
