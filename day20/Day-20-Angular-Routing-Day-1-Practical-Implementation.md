# Day 20 — Angular Routing — Practical Implementation Guide

## Goal

Add the first working Angular route to the Developer Learning Hub.

Today’s route:

```text
/angular
```

should display:

```text
AngularTopicsComponent
```

Today’s routing flow:

```text
/angular
   ↓
app.routes.ts
   ↓
provideRouter(routes)
   ↓
<router-outlet>
   ↓
AngularTopicsComponent
```

---

# Files Used

```text
src/app/app.routes.ts
src/app/app.config.ts
src/app/app.component.ts
src/app/app.component.html
src/app/services/topicService.service.ts
```

---

# 1. Configure the route

## File

```text
src/app/app.routes.ts
```

Final code:

```ts
import { Routes } from '@angular/router';

import { AngularTopicsComponent } from './angular-topics/angular-topics.component';

export const routes: Routes = [
  {
    path: 'angular',
    component: AngularTopicsComponent
  }
];
```

### What this does

```ts
path: 'angular'
```

matches:

```text
/angular
```

and:

```ts
component: AngularTopicsComponent
```

tells Angular which component should be displayed.

Flow:

```text
/angular
   ↓
path: 'angular'
   ↓
AngularTopicsComponent
```

---

# 2. Verify `provideRouter(routes)`

## File

```text
src/app/app.config.ts
```

The project already had the correct routing setup:

```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
```

### Important line

```ts
provideRouter(routes)
```

This gives the route configuration from `app.routes.ts` to Angular.

```text
app.routes.ts
     ↓
routes
     ↓
provideRouter(routes)
     ↓
Angular Router
```

No change was required in this file.

---

# 3. Verify `RouterOutlet`

## File

```text
src/app/app.component.ts
```

The application already imported `RouterOutlet`:

```ts
import { RouterOutlet } from '@angular/router';
```

and already included it in the component imports:

```ts
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    AngularTopicsComponent,
    TopicNotes
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
```

No TypeScript change was required here.

---

# 4. Add `<router-outlet>`

## File

```text
src/app/app.component.html
```

The new line added was:

```html
<router-outlet></router-outlet>
```

It was placed after the technology buttons and before the existing `@if` logic.

Example location:

```html
<div class="technology-buttons">

  <!-- existing Angular, TypeScript and C# buttons -->

</div>

<router-outlet></router-outlet>

@if (selectedTechnology() === "AngularBasics") {
```

### What it does

`<router-outlet>` is the place where Angular inserts the component that matches the current route.

```text
/angular
   ↓
AngularTopicsComponent
   ↓
<router-outlet>
   ↓
component appears on screen
```

---

# 5. Existing state-based logic was kept

The current application still contains logic such as:

```html
@if (selectedTechnology() === "AngularBasics") {
```

and button click methods such as:

```ts
angularTopics() {
  this.selectedTechnology.set('AngularBasics');
  this.topicService.clearSelectedLearningTopic();
}
```

We intentionally did **not** replace this logic today.

Reason:

The Angular button still uses:

```html
(click)="angularTopics()"
```

Changing that button to navigate with Angular Routing would introduce the next routing concept:

```text
routerLink
```

That belongs to the next Routing learning block.

---

# 6. Debugging issue found during implementation

While running the application, Angular reported:

```text
Property 'clearSelectedLearningTopic'
does not exist on type 'TopicService'
```

The application already called:

```ts
this.topicService.clearSelectedLearningTopic();
```

but the service did not currently contain that method.

## Fix

In:

```text
src/app/services/topicService.service.ts
```

we restored:

```ts
clearSelectedLearningTopic() {
  this.learningTopic.set('');
}
```

Relevant service section:

```ts
private learningTopic = signal('');

selectedLearningTopic = this.learningTopic.asReadonly();

learningTopicUpdated(topic: string) {
  this.learningTopic.set(topic);
}

clearSelectedLearningTopic() {
  this.learningTopic.set('');
}

hasSelectedTopic = computed(
  () => this.selectedLearningTopic() !== ''
);
```

This debugging fix was from the previous shared-state implementation, not from Routing itself.

---

# 7. Testing the route

The route was tested by manually opening:

```text
http://localhost:4200/angular
```

Result:

```text
Developer Learning Hub
        ↓
Angular Topics displayed
```

This confirmed that the route worked successfully.

---

# Final Working Flow

```text
Browser opens /angular
        ↓
app.routes.ts
        ↓
path: 'angular'
        ↓
component: AngularTopicsComponent
        ↓
provideRouter(routes)
        ↓
Angular Router matches the route
        ↓
<router-outlet>
        ↓
AngularTopicsComponent appears
```

---

# What Was Learned Today

```text
Routes
→ connect a URL path to a component

provideRouter(routes)
→ gives the route configuration to Angular

RouterOutlet
→ marks where the routed component should appear
```

---

# What We Did NOT Learn Today

These are intentionally left for later Routing sessions:

```text
routerLink
routerLinkActive
redirect routes
wildcard routes
child routes
lazy loading
```

---

# Memory Rule

```text
URL
 ↓
Routes
 ↓
Component
 ↓
RouterOutlet
```

For today:

```text
/angular
 ↓
AngularTopicsComponent
 ↓
<router-outlet>
```
