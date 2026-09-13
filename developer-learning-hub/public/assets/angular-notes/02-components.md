# 3. Components

## Subtopics
- `@Component`
- class / template / styles
- selector
- `templateUrl` / `styleUrl`
- `imports`
- standalone components
- `ng generate component`
- using a child selector
- component responsibility
- local state / template scope

## What it solves

Angular applications are split into **components** so one file does not have to control the entire UI.

```text
Component
├── TypeScript → data + behavior
├── HTML       → what the user sees
└── CSS        → how it looks
```

## Where do we use this?

| File | Job |
|---|---|
| `*.component.ts` | Component class and configuration |
| `*.component.html` | UI |
| `*.component.css` | Component styles |
| Parent `.ts` | Import child when needed |
| Parent `.html` | Place child selector |

## Create a component

```bash
ng generate component product-card
```

Short form:

```bash
ng g c product-card
```

Typical files:

```text
product-card/
├── product-card.component.ts
├── product-card.component.html
└── product-card.component.css
```

## Component TypeScript

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  name = 'Laptop';
}
```

### Important parts

| Part | Meaning |
|---|---|
| `selector` | HTML tag used to place the component |
| `imports` | Template dependencies |
| `templateUrl` | Component HTML file |
| `styleUrl` | Component CSS file |
| class | Component data and behavior |

## Component HTML

```html
<h3>{{ name }}</h3>
```

The template can read properties owned by its component.

## Use a child component

### Parent TypeScript

```ts
@Component({
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {}
```

### Parent HTML

```html
<app-product-card></app-product-card>
```

Flow:

```text
Parent imports child
      ↓
Parent HTML uses child selector
      ↓
Child component renders
```

## Component responsibility

Good component boundaries describe a clear UI job:

```text
StorePage
├── Header
├── ProductList
│   └── ProductCard
└── Footer
```

Do not create a new component just to create more files.

## Local state

```ts
export class ProductCardComponent {
  isExpanded = false;
}
```

That state belongs to this component unless another part of the app genuinely needs to own it.

## Common mistakes
- Importing a child but forgetting to use its selector.
- Using the selector without importing the child.
- Putting unrelated responsibilities into one large component.
- Assuming one component can automatically access another component's properties.

## Quick reference

```ts
@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {}
```

```html
<app-user-card></app-user-card>
```

## Memory rule

**Component = TypeScript + HTML + CSS with one clear UI responsibility.**
