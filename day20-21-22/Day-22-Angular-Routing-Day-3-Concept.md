# Day 22 — Angular Routing — Day 3

## Today’s scope

Today we learn only:

```text
Default route
Redirect route
Wildcard route
```

These solve two practical problems:

```text
What should happen when the user opens / ?

What should happen when the user enters a URL that does not exist?
```

We are **not** learning child routes or lazy loading today.

---

# 1. Why do we need these routes?

So far we have a route such as:

```ts
{
  path: 'angular',
  component: AngularTopicsComponent
}
```

That answers:

```text
/angular
   ↓
AngularTopicsComponent
```

But two situations are still unanswered.

### Situation 1

The user opens:

```text
http://localhost:4200/
```

There is nothing after `/`.

What should Angular display?

### Situation 2

The user enters:

```text
http://localhost:4200/abc
```

but our application has no `abc` route.

What should Angular do?

Default, redirect, and wildcard routes let us handle these situations deliberately.

---

# 2. Default route — what happens at `/`?

The application's root URL is:

```text
/
```

Inside Angular route configuration, the root path is represented by an empty string:

```ts
path: ''
```

Example:

```ts
{
  path: '',
  component: HomeComponent
}
```

Read it as:

```text
User opens /
     ↓
path: '' matches
     ↓
HomeComponent displays
```

So the empty path is not a mistake.

It means:

```text
the application's root/default URL
```

---

# 3. Why would we use a default route?

Suppose the application has:

```text
/
 /angular
 /typescript
 /csharp
```

We may want `/` to display a home page.

Then:

```ts
{
  path: '',
  component: HomeComponent
}
```

answers:

```text
What should the user see when they first open the application?
```

This is a **default/root route that directly displays a component**.

---

# 4. Redirect route — send one URL to another

Sometimes we do not want `/` to have its own component.

Instead, we may want:

```text
/
```

to automatically become:

```text
/angular
```

That is a redirect.

Example:

```ts
{
  path: '',
  redirectTo: 'angular',
  pathMatch: 'full'
}
```

Read it as:

```text
User opens /
     ↓
empty path matches
     ↓
redirect to /angular
     ↓
Angular checks the angular route
     ↓
AngularTopicsComponent displays
```

---

# 5. Why `redirectTo` instead of `component`?

Compare these two approaches.

### Display a component directly

```ts
{
  path: '',
  component: HomeComponent
}
```

Meaning:

```text
/ → HomeComponent
```

### Send the user somewhere else

```ts
{
  path: '',
  redirectTo: 'angular',
  pathMatch: 'full'
}
```

Meaning:

```text
/
 ↓
redirect
 ↓
/angular
```

So:

```text
component
→ display this component for the path

redirectTo
→ change navigation to another route
```

---

# 6. Why do we need `pathMatch: 'full'`?

Consider:

```ts
{
  path: '',
  redirectTo: 'angular',
  pathMatch: 'full'
}
```

The empty path is special because it can be considered a prefix of many URLs.

For this redirect, we want Angular to redirect only when the **whole URL path** matches the empty root path.

So:

```ts
pathMatch: 'full'
```

means:

```text
Only perform this redirect when the entire path matches.
```

For a root redirect, remember the pattern:

```ts
{
  path: '',
  redirectTo: 'angular',
  pathMatch: 'full'
}
```

---

# 7. Wildcard route — what if nothing matches?

Suppose our application knows:

```text
/angular
/typescript
/csharp
```

but the user enters:

```text
/banana
```

There is no `banana` route.

Angular provides the wildcard path:

```ts
'**'
```

Example:

```ts
{
  path: '**',
  component: NotFoundComponent
}
```

Read it as:

```text
Angular checks the routes
       ↓
nothing matched
       ↓
path: '**'
       ↓
NotFoundComponent
```

`**` means:

```text
match a URL that was not handled by an earlier route
```

---

# 8. Why do we need a wildcard route?

Without one, an invalid URL has no normal application route to display.

A wildcard lets us provide a controlled result such as:

```text
Page Not Found
```

Example:

```text
User enters /something-wrong
        ↓
no normal route matches
        ↓
wildcard **
        ↓
NotFoundComponent
        ↓
Page Not Found
```

---

# 9. Route order matters

Angular checks routes in order.

Think:

```text
first matching route wins
```

Example:

```ts
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'angular',
    pathMatch: 'full'
  },
  {
    path: 'angular',
    component: AngularTopicsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
```

The wildcard belongs at the **end**.

Why?

Because:

```ts
path: '**'
```

is designed to catch URLs that did not match the routes before it.

Mental flow:

```text
Check normal/default routes first
        ↓
Did one match?
   YES → use it
   NO
        ↓
Wildcard catches the unknown URL
```

---

# 10. Complete example

```ts
import { Routes } from '@angular/router';

import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'angular',
    pathMatch: 'full'
  },
  {
    path: 'angular',
    component: AngularTopicsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
```

Now:

```text
/
→ redirects to /angular

/angular
→ AngularTopicsComponent

/anything-else
→ NotFoundComponent
```

---

# 11. Angular CLI command

If we need a component for an invalid route, Angular CLI can create it.

Full command:

```bash
ng generate component not-found
```

Short form:

```bash
ng g c not-found
```

If the project keeps routed screens under `pages`:

```bash
ng g c pages/not-found
```

After Angular creates the component, it can be used in the wildcard route:

```ts
{
  path: '**',
  component: NotFoundComponent
}
```

---

# 12. How this connects to previous Routing days

## Day 1

```text
Routes              → WHAT
provideRouter        → GIVE routes to Angular
RouterOutlet         → WHERE
```

## Day 2

```text
routerLink           → GO
routerLinkActive     → MARK
```

## Day 3

```text
path: ''             → ROOT
redirectTo           → SEND somewhere else
path: '**'           → CATCH unknown URLs
```

Full idea:

```text
User navigates
      ↓
Angular checks routes
      ↓
matching route?
  YES → use it
  NO  → wildcard can catch it
      ↓
matched component
      ↓
RouterOutlet
```

---

# 13. Developer Learning Hub connection

The Learning Hub currently has:

```text
/angular
→ AngularTopicsComponent
```

During Practical Implementation, we can decide what should happen when someone opens:

```text
/
```

and what should happen when someone enters an invalid URL such as:

```text
/unknown
```

We will make those actual application changes during the practical rather than hiding them inside the concept lesson.

---

# Memory Rule

```text
path: ''
→ ROOT

redirectTo
→ SEND to another route

path: '**'
→ CATCH anything not matched earlier
```

And remember:

```text
Wildcard goes LAST.
```
