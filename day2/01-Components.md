# Day 2 — Angular Components

## Concept

### What Problem Does a Component Solve?

Our application currently has one root component:

```text
App
├── app.ts
└── app.html
```

As the Learning Hub grows, putting every section inside `App` would make one component responsible for the entire application.

Angular lets us split the UI into smaller components.

```text
Learning Hub
├── App
├── Angular Topics
├── TypeScript Topics
└── C# / .NET Topics
```

A component represents one part of the application's UI.

---

## What Is a Component?

```text
Component
├── TypeScript → data + behavior
├── HTML       → UI
└── CSS        → styling
```

Angular connects these pieces using `@Component`.

```typescript
@Component({
  selector: 'app-angular-topics',
  imports: [],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css'
})
export class AngularTopicsComponent {}
```

---

## `@Component`

`@Component` tells Angular that the class is an Angular component.

---

## `selector`

```typescript
selector: 'app-angular-topics'
```

The selector gives the component an HTML name:

```html
<app-angular-topics></app-angular-topics>
```

```text
selector: 'app-angular-topics'
              ↓
<app-angular-topics></app-angular-topics>
```

---

## `templateUrl`

```typescript
templateUrl: './angular-topics.component.html'
```

This tells Angular which HTML file belongs to the component.

---

## `styleUrl`

```typescript
styleUrl: './angular-topics.component.css'
```

This points to the component's CSS file.

---

## `imports`

```typescript
imports: []
```

A standalone component lists other Angular dependencies/components it uses here.

---

# How Another Component Uses It

Creating `AngularTopicsComponent` is only the first step.

To display it inside the root `App`, three things connect together.

## 1. Child Component Defines a Selector

`angular-topics.component.ts`

```typescript
@Component({
  selector: 'app-angular-topics',
  ...
})
export class AngularTopicsComponent {}
```

This gives us:

```html
<app-angular-topics></app-angular-topics>
```

---

## 2. Root `App` Imports the Component

`app.ts`

```typescript
import { AngularTopicsComponent }
  from './angular-topics/angular-topics.component';
```

Then add it to the root component's imports:

```typescript
@Component({
  selector: 'app-root',
  imports: [AngularTopicsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
```

Think:

```text
App
 ↓
imports AngularTopicsComponent
 ↓
App is allowed to use its selector
```

---

## 3. Root HTML Uses the Selector

`app.html`

```html
<app-angular-topics></app-angular-topics>
```

Now Angular displays the child component's HTML inside the root component.

---

# Complete Component Connection

```text
AngularTopicsComponent
        │
        │ defines
        ▼
selector: 'app-angular-topics'
        │
        ▼
App imports AngularTopicsComponent
        │
        ▼
app.html uses
<app-angular-topics></app-angular-topics>
        │
        ▼
AngularTopicsComponent HTML appears
```

---

# Parent and Child — Now It Has a Real Meaning

Because `app.html` contains:

```html
<app-angular-topics></app-angular-topics>
```

the relationship is:

```text
App
PARENT
   │
   │ template contains
   ▼
AngularTopicsComponent
CHILD
```

### Memory Rule

> The component whose template contains another component's selector is the parent.

---

# Cheat Sheet

### Generate Component

```bash
ng g c angular-topics --type=component
```

### Child Selector

```typescript
selector: 'app-angular-topics'
```

### Import into Parent

```typescript
import { AngularTopicsComponent }
  from './angular-topics/angular-topics.component';
```

### Add to Parent `imports`

```typescript
imports: [AngularTopicsComponent]
```

### Use in Parent HTML

```html
<app-angular-topics></app-angular-topics>
```
