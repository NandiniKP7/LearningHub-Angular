# Angular Routing — Day 4 Practical Implementation Guide
## Child Routes + Lazy Loading Basics

## Goal

Update the Developer Learning Hub so:

```text
/
→ show the 3 technology buttons only

Click Angular
→ /angular
→ lazy-load AngularTopicsComponent

Click TypeScript
→ /typescript
→ lazy-load TypescriptTopicsComponent

Click C#
→ /csharp
→ lazy-load CsharpTopicsComponent

Invalid URL
→ NotFoundComponent
```

This practical covers:

```text
Child Routes
Lazy Loading Basics
```

---

# 1. Final Route Structure

Open:

```text
src/app/app.routes.ts
```

Use this structure:

```ts
import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    children: []
  },

  {
    path: 'angular',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./angular-topics/angular-topics.component')
            .then((m) => m.AngularTopicsComponent),
      },
    ],
  },

  {
    path: 'typescript',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./typescript-topics/typescript-topics.component')
            .then((m) => m.TypescriptTopicsComponent),
      },
    ],
  },

  {
    path: 'csharp',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./csharp-topics/csharp-topics.component')
            .then((m) => m.CsharpTopicsComponent),
      },
    ],
  },

  {
    path: '**',
    component: NotFoundComponent,
  },

];
```

---

# 2. Empty Root Route

```ts
{
  path: '',
  pathMatch: 'full',
  children: []
}
```

## Why we added it

Without this route:

```text
/
↓
no normal route matches
↓
**
↓
NotFoundComponent
```

But our Learning Hub home page should show only the existing technology buttons.

So this route handles:

```text
/
```

without loading another routed component.

The buttons already belong to `AppComponent`, so they remain visible.

---

# 3. Child Route Structure

Example:

```ts
{
  path: 'angular',

  children: [
    {
      path: '',
      ...
    }
  ]
}
```

Here:

```text
'angular'
→ parent route

''
→ child route
```

Angular combines them:

```text
angular + ''
↓
/angular
```

The same pattern is used for:

```text
/typescript
/csharp
```

## Why the child path is empty

We want:

```text
/angular
```

not:

```text
/angular/something
```

So the default child path is:

```ts
path: ''
```

---

# 4. Lazy Loading

Instead of importing the routed technology component directly at the top of `app.routes.ts`, use `loadComponent`.

Example:

```ts
loadComponent: () =>
  import('./angular-topics/angular-topics.component')
    .then((m) => m.AngularTopicsComponent)
```

## Flow

```text
Click Angular
↓
routerLink="/angular"
↓
parent path 'angular' matches
↓
child path '' matches
↓
loadComponent runs
↓
AngularTopicsComponent is loaded
↓
component displays in router-outlet
```

The same behavior applies to TypeScript and C#.

---

# 5. Remove Direct Imports

Because these components are now loaded through `loadComponent`, remove these imports from `app.routes.ts`:

```ts
import { AngularTopicsComponent } from './angular-topics/angular-topics.component';

import { TypescriptTopicsComponent } from './typescript-topics/typescript-topics.component';

import { CsharpTopicsComponent } from './csharp-topics/csharp-topics.component';
```

Keep:

```ts
import { Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
```

---

# 6. Existing Navigation Buttons

Your existing buttons already navigate to the routes.

Example:

```html
<button
  [disabled]="disabledButton"
  (click)="angularTopics()"
  routerLink="/angular"
  routerLinkActive="active">
  Angular
</button>
```

The other buttons use:

```html
routerLink="/typescript"
```

and:

```html
routerLink="/csharp"
```

So the overall flow is:

```text
Button
↓
routerLink
↓
route
↓
child route
↓
loadComponent
↓
component
↓
router-outlet
```

---

# 7. Wildcard Route

Keep the wildcard last:

```ts
{
  path: '**',
  component: NotFoundComponent
}
```

Why:

```text
known routes
↓
checked first

unknown route
↓
nothing matched
↓
**
↓
NotFoundComponent
```

---

# 8. Test the Implementation

Test these URLs:

```text
/
```

Expected:

```text
Technology buttons visible
No routed technology component loaded
```

Test:

```text
/angular
```

Expected:

```text
AngularTopicsComponent displays
```

Test:

```text
/typescript
```

Expected:

```text
TypescriptTopicsComponent displays
```

Test:

```text
/csharp
```

Expected:

```text
CsharpTopicsComponent displays
```

Test:

```text
/xyz
```

Expected:

```text
NotFoundComponent displays
```

---

# 9. What This Practical Demonstrates

## Child Routes

```text
parent route
↓
children
↓
default child path ''
```

Example:

```text
/angular
↓
parent: angular
↓
child: ''
```

## Lazy Loading

```text
route requested
↓
loadComponent
↓
dynamic import
↓
component loaded when needed
```

---

# Final Learning Hub Routing Flow

```text
App opens
↓
/

AppComponent stays visible
↓
3 technology buttons

Click Angular
↓
/angular
↓
child route ''
↓
lazy-load AngularTopicsComponent

Click TypeScript
↓
/typescript
↓
child route ''
↓
lazy-load TypescriptTopicsComponent

Click C#
↓
/csharp
↓
child route ''
↓
lazy-load CsharpTopicsComponent

Invalid URL
↓
**
↓
NotFoundComponent
```

---

# Memory Rule

```text
children
→ routes UNDER a parent route

path: ''
→ default child of that parent

loadComponent
→ load the routed component when the route is requested

**
→ fallback route

Wildcard
→ LAST
```

---

# Day 4 Completion

```text
Child Routes         ✅ Implemented
Lazy Loading Basics  ✅ Implemented
```

After the review questions, the main Angular **Routing** topic can be marked complete.
