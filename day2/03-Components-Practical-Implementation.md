# Day 2 — Practical Implementation: Components

## Goal

Create `AngularTopicsComponent`, add simple topic content, then display that component inside the root `App`.

---

# Step 1 — Generate the Component

Run:

```bash
ng g c angular-topics --type=component
```

This creates:

```text
angular-topics/
├── angular-topics.component.ts
├── angular-topics.component.html
├── angular-topics.component.css
└── angular-topics.component.spec.ts
```

---

# Step 2 — Add Content to `angular-topics.component.html`

We added simple topic content first.

```html
<h1>{{ title }}</h1>

<p>Application Architecture</p>
<p>String Interpolation</p>
<p>Components</p>
```

At this stage, the component has its own HTML.

---

# Step 3 — Add the Title to `angular-topics.component.ts`

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
}
```

Now:

```text
angular-topics.component.ts
        ↓
title = "Angular Topics"
        ↓
angular-topics.component.html
        ↓
{{ title }}
```

---

# Step 4 — Import `AngularTopicsComponent` into `app.ts`

Full `app.ts`:

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// ⭐ DAY 2
import { AngularTopicsComponent } from "./angular-topics/angular-topics.component";

@Component({
  selector: 'app-root',

  // ⭐ DAY 2
  imports: [RouterOutlet, AngularTopicsComponent],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = "Developer Learning Hub";
}
```

What changed:

```text
1. Imported AngularTopicsComponent
2. Added AngularTopicsComponent to imports[]
```

---

# Step 5 — Add the Component Selector to `app.html`

Full `app.html`:

```html
<h1>{{ title }}</h1>

<!-- ⭐ DAY 2 -->
<app-angular-topics></app-angular-topics>
```

This line:

```html
<app-angular-topics></app-angular-topics>
```

comes from:

```typescript
selector: 'app-angular-topics'
```

---

# Step 6 — Component Flow

```text
ng g c angular-topics
        ↓
AngularTopicsComponent created
        ↓
Add title in angular-topics.component.ts
        ↓
Add topic HTML in angular-topics.component.html
        ↓
Import AngularTopicsComponent into app.ts
        ↓
Add AngularTopicsComponent to imports[]
        ↓
Use <app-angular-topics> in app.html
        ↓
Angular Topics section appears in browser
```

---

# Result

```text
Developer Learning Hub

Angular Topics

Application Architecture

String Interpolation

Components
```

![Day 2 Components Result](day-2-components-result.png)
