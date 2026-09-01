# Day 21 — Angular Routing — Day 2

## Today’s scope

Yesterday, `/angular` displayed `AngularTopicsComponent` when we manually entered the URL.

Today we solve the next problem:

> How does the user navigate to a route by clicking inside the application?

Today we learn only:

```text
routerLink
routerLinkActive
```

Redirects, wildcard routes, child routes, and lazy loading are for later.

---

# 1. Why do we need `routerLink`?

Yesterday we defined:

```ts
{
  path: 'angular',
  component: AngularTopicsComponent
}
```

This tells Angular **what component belongs to `/angular`**.

But it does not create navigation for the user.

We still had to manually type:

```text
http://localhost:4200/angular
```

`routerLink` solves that problem.

```text
Route
→ defines the destination

routerLink
→ navigates the user to the destination
```

---

# 2. `routerLink` syntax

```html
<a routerLink="/angular">Angular</a>
```

Read it as:

```text
User clicks Angular
        ↓
routerLink="/angular"
        ↓
URL changes to /angular
        ↓
Routes checks path: 'angular'
        ↓
AngularTopicsComponent matches
        ↓
RouterOutlet displays it
```

Notice:

```ts
path: 'angular'
```

but:

```html
routerLink="/angular"
```

The route path is defined without the leading `/`. This `routerLink` uses `/angular` as an absolute route.

---

# 3. Importing `RouterLink`

In a standalone component:

```ts
import { RouterLink } from '@angular/router';
```

Then add it to the component imports:

```ts
@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {}
```

Now that component's HTML can use:

```html
<a routerLink="/angular">Angular</a>
```

Flow:

```text
RouterLink imported in TypeScript
        ↓
routerLink available in that component's HTML
```

---

# 4. Why do we need `routerLinkActive`?

Suppose the application has several navigation links:

```html
<a routerLink="/angular">Angular</a>
<a routerLink="/typescript">TypeScript</a>
<a routerLink="/csharp">C#</a>
```

The user may need to see which route is currently active.

`routerLinkActive` can add a CSS class when its route is active:

```html
<a
  routerLink="/angular"
  routerLinkActive="active">
  Angular
</a>
```

So:

```text
routerLink
→ GO to a route

routerLinkActive
→ MARK the link when that route is active
```

---

# 5. Importing `RouterLinkActive`

```ts
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';
```

Then:

```ts
@Component({
  imports: [
    RouterLink,
    RouterLinkActive
  ]
})
export class NavigationComponent {}
```

Now the HTML can use both.

---

# 6. What does `active` mean?

In:

```html
routerLinkActive="active"
```

`active` is a CSS class name.

Angular adds or removes that class depending on whether the route is active.

Example CSS:

```css
.active {
  font-weight: bold;
}
```

Angular decides **when the class is applied**. CSS decides **how it looks**.

Any new CSS needed by the Learning Hub will be handled during Practical Implementation.

---

# 7. `routerLink` vs `(click)`

Your Learning Hub currently uses behavior such as:

```html
<button (click)="angularTopics()">
  Angular
</button>
```

That means:

```text
click
 ↓
call angularTopics()
 ↓
component method runs
```

Routing navigation is different:

```html
<a routerLink="/angular">
  Angular
</a>
```

That means:

```text
click
 ↓
navigate to /angular
 ↓
route matches
 ↓
routed component displays
```

Memory:

```text
(click)
→ run a method

routerLink
→ navigate to a route
```

---

# 8. How Day 1 and Day 2 connect

Day 1:

```text
Routes
→ WHAT component belongs to the URL?

provideRouter(routes)
→ GIVE the routes to Angular

RouterOutlet
→ WHERE does the component appear?
```

Day 2:

```text
routerLink
→ HOW does the user navigate to the URL?

routerLinkActive
→ WHICH navigation link is active?
```

Complete flow:

```text
User clicks routerLink
        ↓
URL changes
        ↓
Routes finds matching path
        ↓
Component selected
        ↓
RouterOutlet displays component
        ↓
routerLinkActive can mark the active link
```

---

# 9. Developer Learning Hub connection

Yesterday:

```text
manually type /angular
        ↓
AngularTopicsComponent appears
```

Today we can move toward:

```text
click Angular navigation
        ↓
routerLink
        ↓
/angular
        ↓
AngularTopicsComponent appears
```

The actual Learning Hub code change belongs in the Practical Implementation.

---

# 10. Not part of today

```text
redirect routes
wildcard routes
child routes
lazy loading
```

These remain for later Routing blocks.

---

# Memory Rule

```text
Routes              → WHAT
provideRouter       → GIVE routes to Angular
RouterOutlet        → WHERE
routerLink          → GO
routerLinkActive    → MARK
```

For today's new concepts:

```text
routerLink       → GO

routerLinkActive → MARK
```
