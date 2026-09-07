# Angular Routing — Day 2 + Day 3 Practical Implementation

## Goal

Update the Developer Learning Hub so the top technology buttons navigate using Angular routing, the root URL redirects to Angular, and unknown URLs show a Not Found page.

---

## Final Routing Behavior

```text
/             → redirect to /angular
/angular      → AngularTopicsComponent
/typescript   → TypescriptTopicsComponent
/csharp       → CsharpTopicsComponent
anything else → NotFoundComponent
```

---

# Day 2 — `routerLink` and `routerLinkActive`

## What changed

Before Day 2, the technology buttons mainly used `(click)` handlers to change application state.

Day 2 added Angular navigation directly to the buttons.

```text
Click Angular
   ↓
routerLink="/angular"
   ↓
URL changes to /angular
   ↓
Angular checks app.routes.ts
   ↓
AngularTopicsComponent displays in <router-outlet>
```

---

## `app.component.ts`

Add `RouterLink` and `RouterLinkActive` from Angular Router.

```ts
import { Component, inject, signal } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { TopicNotes } from './topic-notes/topic-notes.component';
import { TopicService } from './services/topicService.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    AngularTopicsComponent,
    TopicNotes
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  topicService = inject(TopicService);

  title = 'Developer Learning Hub';
  disabledButton = false;
  selectedTechnology = signal(' ');
  technology = 'Learn Angular';

  angularTopics() {
    this.selectedTechnology.set('AngularBasics');
    this.topicService.clearSelectedLearningTopic();
  }

  typeScriptTopics() {
    this.selectedTechnology.set('TypeScriptBasics');
  }

  cSharpTopics() {
    this.selectedTechnology.set('C#Basics');
  }
}
```

### New Angular imports

```ts
RouterLink
RouterLinkActive
```

- `RouterLink` navigates to a route.
- `RouterLinkActive` adds a CSS class when that route is active.

---

## `app.component.html`

```html
<section class="learning-hub">

  <h1>{{ title }}</h1>

  <div class="technology-buttons">

    <button
      [disabled]="disabledButton"
      (click)="angularTopics()"
      routerLink="/angular"
      routerLinkActive="active">
      Angular
    </button>

    <button
      [disabled]="disabledButton"
      (click)="typeScriptTopics()"
      routerLink="/typescript">
      TypeScript
    </button>

    <button
      [disabled]="disabledButton"
      (click)="cSharpTopics()"
      routerLink="/csharp">
      C#
    </button>

  </div>

  <router-outlet></router-outlet>

  @if (selectedTechnology() === "AngularBasics") {

    @if (!topicService.hasSelectedTopic()) {
      <app-angular-topics></app-angular-topics>
    }
    @else {
      <app-topic-notes></app-topic-notes>
    }

  }
  @else if (selectedTechnology() === "C#Basics") {
    <p>Learn C#</p>
  }
  @else if (selectedTechnology() === "TypeScriptBasics") {
    <p>Learn TypeScript</p>
  }
  @else {
    <p>Please select a technology</p>
  }

  <div class="learning-goal">
    <h3>What do you want to learn?</h3>

    <input [(ngModel)]="technology">

    <p>Current Goal: {{ technology }}</p>
  </div>

</section>
```

### Important

```html
routerLinkActive="active"
```

means:

> When this route is active, Angular adds a CSS class named `active`.

It does **not** mean Angular automatically knows what "active" should look like.

---

## `app.component.css`

```css
.active {
  font-weight: bold;
}
```

This makes the currently active Angular button visually different.

---

# Day 3 — Default, Redirect and Wildcard Routes

## Components created

The Learning Hub now has route destinations for TypeScript, C#, and invalid URLs.

CLI commands used:

```bash
ng g c typescript-topics
ng g c csharp-topics
ng g c not-found
```

---

## `app.routes.ts`

```ts
import { Routes } from '@angular/router';

import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { TypescriptTopicsComponent } from './typescript-topics/typescript-topics.component';
import { CsharpTopicsComponent } from './csharp-topics/csharp-topics.component';
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
    path: 'typescript',
    component: TypescriptTopicsComponent
  },

  {
    path: 'csharp',
    component: CsharpTopicsComponent
  },

  {
    path: '**',
    component: NotFoundComponent
  }

];
```

---

## Root Redirect

```ts
{
  path: '',
  redirectTo: 'angular',
  pathMatch: 'full'
}
```

### What it does

When the browser opens:

```text
/
```

Angular redirects to:

```text
/angular
```

### Flow

```text
/
↓
path: ''
↓
redirectTo: 'angular'
↓
/angular
↓
AngularTopicsComponent
```

`pathMatch: 'full'` means Angular should redirect only when the complete URL path is empty.

---

## Normal Routes

```ts
{
  path: 'angular',
  component: AngularTopicsComponent
},
{
  path: 'typescript',
  component: TypescriptTopicsComponent
},
{
  path: 'csharp',
  component: CsharpTopicsComponent
}
```

These connect each URL to the component Angular should display.

```text
/angular
→ AngularTopicsComponent

/typescript
→ TypescriptTopicsComponent

/csharp
→ CsharpTopicsComponent
```

---

## Wildcard Route

```ts
{
  path: '**',
  component: NotFoundComponent
}
```

`**` means:

> Match any URL that did not match an earlier route.

Example:

```text
/abc
↓
no normal route matches
↓
path: '**'
↓
NotFoundComponent
```

---

## Why the Wildcard Must Be Last

Angular checks routes from top to bottom and uses the first matching route.

Correct:

```text
''           → check
'angular'    → check
'typescript' → check
'csharp'     → check
'**'         → fallback
```

If `**` were placed first, it could catch URLs before Angular reaches the normal routes.

### Memory rule

```text
Wildcard = fallback
Fallback goes LAST
```

---

## `not-found.component.html`

Replace the generated placeholder content with:

```html
<h2>Page Not Found</h2>

<p>The page you requested does not exist.</p>
```

No additional CSS is required for this lesson.

---

# Combined Routing Flow

```text
User clicks Angular button
        ↓
routerLink="/angular"
        ↓
URL becomes /angular
        ↓
Angular checks routes
        ↓
path: 'angular' matches
        ↓
AngularTopicsComponent
        ↓
<router-outlet>
```

For the root URL:

```text
/
↓
path: ''
↓
redirectTo: 'angular'
↓
/angular
```

For an invalid URL:

```text
/unknown-page
↓
no normal route matches
↓
path: '**'
↓
NotFoundComponent
```

---

# What Day 2 and Day 3 Added

```text
Day 2
routerLink
→ navigate using template links

routerLinkActive
→ apply a CSS class when a route is active


Day 3
path: ''
→ represent the root URL

redirectTo
→ send the user to another route

pathMatch: 'full'
→ require the complete path to match

path: '**'
→ catch unmatched URLs
```

---

# Quick Memory Rule

```text
Routes
→ WHAT component belongs to a URL?

provideRouter(routes)
→ GIVE those routes to Angular

RouterOutlet
→ WHERE the matched component displays

routerLink
→ GO to a route

routerLinkActive
→ STYLE the active route link

path: ''
→ ROOT URL

redirectTo
→ SEND somewhere else

path: '**'
→ CATCH invalid URLs

Wildcard
→ ALWAYS LAST
```
