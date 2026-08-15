# Components

A component represents **one piece of the Angular UI**.

Splitting the application into components keeps different parts of the UI easier to manage.

---

# Where Do We Use Components?

An Angular application is built from components.

```text
App Component
     ↓
AngularTopicsComponent
     ↓
its own UI
```

A component normally contains:

```text
Component
├── TypeScript → data + behavior
├── HTML       → UI
└── CSS        → styling
```

---

# `@Component`

```typescript
@Component({
  selector: 'app-angular-topics',
  imports: [],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css'
})
```

`@Component` connects the component configuration together.

---

# Important Parts

## `selector`

```typescript
selector: 'app-angular-topics'
```

creates a tag:

```html
<app-angular-topics></app-angular-topics>
```

## `templateUrl`

```text
points to the component HTML
```

## `styleUrl`

```text
points to the component CSS
```

## `imports`

```text
lists components/features
this standalone component needs
```

---

# Standalone Component

A standalone component declares the things it needs directly in:

```typescript
imports: []
```

For example:

```typescript
imports: [AngularTopicsComponent]
```

---

# Generate a Component

```bash
ng g c angular-topics
```

---

# Use One Component Inside Another

### TypeScript

Import the component:

```typescript
import { AngularTopicsComponent }
  from './angular-topics/angular-topics.component';
```

Add it:

```typescript
imports: [AngularTopicsComponent]
```

### HTML

Use its selector:

```html
<app-angular-topics></app-angular-topics>
```

Flow:

```text
App imports AngularTopicsComponent
            ↓
App HTML uses its selector
            ↓
AngularTopicsComponent appears
```

---

# Local Component State

A component can own its own data:

```typescript
title = "Angular Topics";
```

Its HTML can read it:

```html
<h1>{{ title }}</h1>
```

Think:

```text
AngularTopicsComponent
        ↓
owns title
        ↓
its template can display title
```

---

# Cheat Sheet

```text
TypeScript → data + behavior
HTML       → UI
CSS        → styling

selector
→ component tag

imports
→ things this component uses
```
