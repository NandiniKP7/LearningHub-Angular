# Components

A component represents a piece of the UI.

```text
Component
├── TypeScript → data + behavior
├── HTML       → UI
└── CSS        → styling
```

## Component

```typescript
@Component({
  selector: 'app-angular-topics',
  imports: [],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css'
})
```

## Important Parts

```text
selector
→ component HTML tag

templateUrl
→ component HTML

styleUrl
→ component CSS

imports
→ dependencies the standalone component uses
```

## Generate Component

```bash
ng g c angular-topics
```

## Use Component in Another Component

Import:

```typescript
import { AngularTopicsComponent }
  from './angular-topics/angular-topics.component';
```

Add:

```typescript
imports: [AngularTopicsComponent]
```

Use selector:

```html
<app-angular-topics></app-angular-topics>
```

## Local State

```typescript
title = "Angular Topics";
```

The component template can use:

```html
<h1>{{ title }}</h1>
```

The property belongs to that component.

## Cheat Sheet

```text
TypeScript → data + behavior
HTML       → UI
CSS        → styling
selector   → component tag
```
