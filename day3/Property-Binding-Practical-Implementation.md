# Day 3 — Practical Implementation: Property Binding

## Learning Hub — Design Direction

The application we are gradually building toward:

```text
Developer Learning Hub
│
├── Angular      [button]
├── TypeScript   [button]
└── C#           [button]
        ↓
Select Angular
        ↓
Angular Topics
        ↓
Select a topic
        ↓
Concept / Q&A / Practical Implementation
```

We are **not building the entire design in Day 3**. Each Angular lesson will move the Learning Hub closer to this design.

## What We Accomplished Today

For Day 3, we moved toward that design while practicing **Property Binding**:

```text
Developer Learning Hub
│
├── Angular button
├── TypeScript button
├── C# button
│
└── AngularTopicsComponent
      ├── Angular image
      └── Current topic list
```

We:

1. Added **Angular, TypeScript, and C# buttons** to the main app.
2. Created a TypeScript boolean to control the buttons.
3. Used `[disabled]` Property Binding on the buttons.
4. Added an Angular image to `AngularTopicsComponent`.
5. Stored the image path in TypeScript.
6. Used `[src]` Property Binding to display the image.
7. Fixed the image path from `/public/Angular.png` to `/Angular.png`.
8. Kept `AngularTopicsComponent` visible for now. A later lesson will make the Angular button control when it appears.

## Day 3 Concept Used

```text
TypeScript value
      ↓
[property]
      ↓
HTML property
```

Examples from our Learning Hub:

```text
disabledButton → [disabled]
imageUrl       → [src]
```

---

## Goal

Use TypeScript values to control HTML properties with Angular Property Binding.


# Step 1 — Update `app.ts`

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularTopicsComponent } from "./angular-topics/angular-topics.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AngularTopicsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = "Developer Learning Hub";

  // ⭐ DAY 3
  disabledButton = false;
}
```

# Step 2 — Update `app.html`

```html
<h1>{{ title }}</h1>

<!-- ⭐ DAY 3 -->
<button [disabled]="disabledButton">Angular</button>
<button [disabled]="disabledButton">TypeScript</button>
<button [disabled]="disabledButton">C#</button>

<app-angular-topics></app-angular-topics>
```

```text
disabledButton
      ↓
[disabled]
      ↓
button enabled / disabled
```

# Step 3 — Update `angular-topics.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-topics',
  imports: [],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css',
})
export class AngularTopicsComponent {
  title = "Angular Topics";

  // ⭐ DAY 3
  imageUrl = "/Angular.png";
}
```

# Step 4 — Update `angular-topics.component.html`

```html
<h1>{{ title }}</h1>

<!-- ⭐ DAY 3 -->
<img class="angular-image" [src]="imageUrl" alt="angular-image">

<p>Application Architecture</p>
<p>String Interpolation</p>
<p>Components</p>
<p>Property Binding</p>
```

```text
imageUrl
   ↓
[src]
   ↓
image source
```

# Day 3 Result

```text
disabledButton → [disabled]
imageUrl       → [src]
```

> Image sizing is a styling change and can be handled separately in the component CSS.
